import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

export class HashCalculator {
    async calculateFile(filePath: string): Promise<string> {
        if (!existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const buffer = await fs.readFile(filePath);
        const hash = crypto.createHash('sha256');
        hash.update(buffer);
        return hash.digest('hex');
    }

    async calculateDirectory(dirPath: string): Promise<Map<string, string>> {
        const hashes = new Map<string, string>();

        if (!existsSync(dirPath)) {
            throw new Error(`Directory not found: ${dirPath}`);
        }

        const stats = statSync(dirPath);
        if (!stats.isDirectory()) {
            throw new Error(`Path is not a directory: ${dirPath}`);
        }

        await this.processDirectory(dirPath, dirPath, hashes);
        return hashes;
    }

    async validate(filePath: string, expectedHash: string): Promise<boolean> {
        try {
            const actualHash = await this.calculateFile(filePath);
            return actualHash === expectedHash;
        } catch {
            return false;
        }
    }

    private async processDirectory(
        basePath: string,
        currentPath: string,
        hashes: Map<string, string>
    ): Promise<void> {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            const relativePath = path.relative(basePath, fullPath);

            if (entry.isDirectory()) {
                await this.processDirectory(basePath, fullPath, hashes);
            } else if (entry.isFile()) {
                const hash = await this.calculateFile(fullPath);
                hashes.set(relativePath, hash);
            }
        }
    }
}

