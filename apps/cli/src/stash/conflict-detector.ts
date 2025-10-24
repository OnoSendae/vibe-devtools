import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { HashCalculator } from './hash-calculator.js';

export interface Conflict {
    destPath: string;
    sourcePath: string;
    existingHash: string;
    incomingHash: string;
    existingSize: number;
    incomingSize: number;
    existingMtime: Date;
}

export class ConflictDetector {
    private readonly hashCalculator: HashCalculator;

    constructor() {
        this.hashCalculator = new HashCalculator();
    }

    async detectAll(
        symlinks: Record<string, string>,
        projectRoot: string,
        vibeDir: string
    ): Promise<Conflict[]> {
        const conflicts: Conflict[] = [];

        for (const [destination, source] of Object.entries(symlinks)) {
            const destPath = path.join(projectRoot, destination);
            const sourcePath = path.join(vibeDir, source);

            if (!existsSync(destPath)) {
                continue;
            }

            if (!existsSync(sourcePath)) {
                continue;
            }

            const areSame = await this.compareFiles(destPath, sourcePath);

            if (!areSame) {
                const destStats = statSync(destPath);
                const sourceStats = statSync(sourcePath);

                const existingHash = await this.calculateHash(destPath);
                const incomingHash = await this.calculateHash(sourcePath);

                conflicts.push({
                    destPath,
                    sourcePath,
                    existingHash,
                    incomingHash,
                    existingSize: destStats.size,
                    incomingSize: sourceStats.size,
                    existingMtime: destStats.mtime
                });
            }
        }

        return conflicts;
    }

    async calculateHash(filePath: string): Promise<string> {
        const stats = statSync(filePath);

        if (stats.isDirectory()) {
            const hashes = await this.hashCalculator.calculateDirectory(filePath);
            const allHashes = Array.from(hashes.values()).join('');
            return this.hashCalculator.calculateFile(Buffer.from(allHashes) as any) || allHashes.substring(0, 64);
        }

        return this.hashCalculator.calculateFile(filePath);
    }

    async compareFiles(fileA: string, fileB: string): Promise<boolean> {
        if (!existsSync(fileA) || !existsSync(fileB)) {
            return false;
        }

        const statsA = statSync(fileA);
        const statsB = statSync(fileB);

        if (statsA.size !== statsB.size) {
            return false;
        }

        const hashA = await this.calculateHash(fileA);
        const hashB = await this.calculateHash(fileB);

        return hashA === hashB;
    }
}

