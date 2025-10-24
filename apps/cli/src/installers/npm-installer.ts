import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { getVibesHome, getVibePackageDir } from '../utils/symlink-manager.js';

const execAsync = promisify(exec);

export interface VibeManifest {
    name: string;
    version: string;
    description?: string;
    symlinks?: Record<string, string>;
    agentTargets?: Record<string, any>;
    dependencies?: Record<string, string>;
    [key: string]: unknown;
}

export interface InstallResult {
    manifest: VibeManifest;
    installedPath: string;
}

function parseNpmSource(source: string): { packageName: string; version?: string } {
    const parts = source.split('@');

    if (source.startsWith('@')) {
        if (parts.length === 3) {
            return {
                packageName: `@${parts[1]}`,
                version: parts[2]
            };
        }
        return {
            packageName: `@${parts[1]}`,
            version: undefined
        };
    }

    return {
        packageName: parts[0],
        version: parts[1]
    };
}

export async function installFromNpm(source: string): Promise<InstallResult> {
    const { packageName, version } = parseNpmSource(source);
    const packageSpec = version ? `${packageName}@${version}` : packageName;

    const cacheDir = path.join(getVibesHome(), 'cache', 'npm');
    await fs.mkdir(cacheDir, { recursive: true });

    const tempDir = path.join(cacheDir, `temp-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    try {
        const { stdout } = await execAsync(
            `npm pack ${packageSpec} --json`,
            { cwd: tempDir }
        );

        const packResult = JSON.parse(stdout);
        const tarballFilename = packResult[0].filename;

        const extractDir = path.join(tempDir, 'extracted');
        await fs.mkdir(extractDir, { recursive: true });

        await execAsync(
            `tar -xzf ${tarballFilename} -C extracted`,
            { cwd: tempDir }
        );

        const packageDir = path.join(extractDir, 'package');
        const vibeJsonPath = path.join(packageDir, 'vibe.json');

        if (!existsSync(vibeJsonPath)) {
            throw new Error(`Package ${packageName} is not a valid vibe (missing vibe.json)`);
        }

        const vibeJsonContent = await fs.readFile(vibeJsonPath, 'utf-8');
        const manifest = JSON.parse(vibeJsonContent) as VibeManifest;

        const installedPath = getVibePackageDir(manifest.name, manifest.version);

        if (existsSync(installedPath)) {
            await fs.rm(installedPath, { recursive: true, force: true });
        }

        await fs.mkdir(path.dirname(installedPath), { recursive: true });
        await fs.cp(packageDir, installedPath, { recursive: true });

        await fs.rm(tempDir, { recursive: true, force: true });

        return {
            manifest,
            installedPath
        };

    } catch (error) {
        await fs.rm(tempDir, { recursive: true, force: true }).catch(() => { });
        throw new Error(`Failed to install from npm: ${(error as Error).message}`);
    }
}

