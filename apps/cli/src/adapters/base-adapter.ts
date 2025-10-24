import fs from 'node:fs/promises';
import { existsSync, lstatSync } from 'node:fs';
import path from 'node:path';

export interface TargetPaths {
    commands?: string;
    rules?: string;
    prompts?: string;
    instructions?: string;
    [key: string]: string | undefined;
}

export interface VibePackage {
    name: string;
    version: string;
    path: string;
    agentTargets?: Record<string, TargetPaths>;
    symlinks?: Record<string, string>;
}

export abstract class BaseAdapter {
    abstract getName(): string;

    abstract detect(): Promise<boolean>;

    abstract getTargetPaths(): TargetPaths;

    abstract install(vibe: VibePackage, targetDir: string): Promise<void>;

    abstract uninstall(vibe: VibePackage): Promise<void>;

    protected async symlinkOrCopy(source: string, dest: string): Promise<void> {
        if (!existsSync(source)) {
            return;
        }

        await fs.mkdir(path.dirname(dest), { recursive: true });

        try {
            if (existsSync(dest)) {
                const stats = lstatSync(dest);
                if (stats.isSymbolicLink()) {
                    await fs.unlink(dest);
                }
            }

            await fs.symlink(source, dest);
        } catch {
            await fs.copyFile(source, dest);
        }
    }

    protected async mergeDirectories(
        sourceDir: string,
        destDir: string
    ): Promise<number> {
        if (!existsSync(sourceDir)) {
            return 0;
        }

        let filesCreated = 0;

        await fs.mkdir(destDir, { recursive: true });

        const entries = await fs.readdir(sourceDir, { withFileTypes: true });

        for (const entry of entries) {
            const sourcePath = path.join(sourceDir, entry.name);
            const destPath = path.join(destDir, entry.name);

            if (entry.isDirectory()) {
                filesCreated += await this.mergeDirectories(sourcePath, destPath);
            } else if (entry.isFile()) {
                const created = await this.copyFileWithBackup(sourcePath, destPath);
                if (created) filesCreated++;
            }
        }

        return filesCreated;
    }

    protected async copyFileWithBackup(
        source: string,
        dest: string
    ): Promise<boolean> {
        if (!existsSync(dest)) {
            await fs.copyFile(source, dest);
            return true;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const backupPath = `${dest}.backup-${timestamp}`;

        await fs.copyFile(dest, backupPath);
        await fs.copyFile(source, dest);

        return true;
    }
}

