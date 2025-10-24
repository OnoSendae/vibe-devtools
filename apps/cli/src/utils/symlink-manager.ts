import fs from 'node:fs/promises';
import { existsSync, lstatSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface SymlinkOptions {
    force?: boolean;
    type?: 'dir' | 'file';
    fallbackCopy?: boolean;
}

export async function createSymlink(
    target: string,
    linkPath: string,
    options: SymlinkOptions = {}
): Promise<void> {
    const { force = false, type = 'dir', fallbackCopy = true } = options;

    const absoluteTarget = path.resolve(target);
    const absoluteLink = path.resolve(linkPath);

    if (!existsSync(absoluteTarget)) {
        throw new Error(`Target does not exist: ${absoluteTarget}`);
    }

    try {
        if (existsSync(absoluteLink)) {
            const stats = lstatSync(absoluteLink);
            if (!force) {
                throw new Error(`${absoluteLink} already exists. Use force: true to override.`);
            }

            if (stats.isSymbolicLink()) {
                await fs.unlink(absoluteLink);
            } else if (stats.isDirectory()) {
                await fs.rm(absoluteLink, { recursive: true });
            } else {
                await fs.unlink(absoluteLink);
            }
        }
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
        }
    }

    await fs.mkdir(path.dirname(absoluteLink), { recursive: true });

    try {
        await fs.symlink(absoluteTarget, absoluteLink, type);
    } catch (error) {
        const err = error as NodeJS.ErrnoException;

        if (fallbackCopy && (err.code === 'EPERM' || err.code === 'ENOSYS')) {
            await fs.cp(absoluteTarget, absoluteLink, { recursive: true });
        } else {
            throw error;
        }
    }
}

export async function removeSymlink(linkPath: string): Promise<void> {
    const absoluteLink = path.resolve(linkPath);

    if (!existsSync(absoluteLink)) {
        return;
    }

    const stats = lstatSync(absoluteLink);

    if (stats.isSymbolicLink()) {
        await fs.unlink(absoluteLink);
    } else if (stats.isDirectory()) {
        await fs.rm(absoluteLink, { recursive: true });
    } else {
        await fs.unlink(absoluteLink);
    }
}

export async function validateSymlink(linkPath: string): Promise<boolean> {
    try {
        const absoluteLink = path.resolve(linkPath);

        if (!existsSync(absoluteLink)) {
            return false;
        }

        const stats = lstatSync(absoluteLink);
        return stats.isSymbolicLink() || stats.isDirectory() || stats.isFile();
    } catch {
        return false;
    }
}

export function getVibesHome(): string {
    return path.join(os.homedir(), '.vibes');
}

export function getVibesPackagesDir(): string {
    return path.join(getVibesHome(), 'packages');
}

export function getVibePackageDir(name: string, version: string): string {
    return path.join(getVibesPackagesDir(), `${name}@${version}`);
}

