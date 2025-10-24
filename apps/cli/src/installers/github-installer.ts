import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { getVibePackageDir } from '../utils/symlink-manager.js';

const execAsync = promisify(exec);

export interface GitHubSource {
    user: string;
    repo: string;
    ref?: string;
}

export interface VibeManifest {
    name: string;
    version: string;
    description?: string;
    symlinks?: Record<string, string>;
    dependencies?: Record<string, string>;
    hooks?: {
        postInstall?: string;
    };
    [key: string]: unknown;
}

export function parseGitHubUrl(source: string): GitHubSource {
    let url = source;
    let ref: string | undefined;

    if (source.includes('#')) {
        [url, ref] = source.split('#');
    }

    url = url.replace('github:', '').replace('https://github.com/', '');

    const [user, repo] = url.split('/');

    if (!user || !repo) {
        throw new Error(`Invalid GitHub URL: ${source}`);
    }

    return { user, repo: repo.replace('.git', ''), ref };
}

export async function cloneRepository(
    source: GitHubSource,
    tempDir: string
): Promise<void> {
    const url = `https://github.com/${source.user}/${source.repo}`;
    const refFlag = source.ref ? `--branch ${source.ref}` : '';

    const command = `git clone --depth 1 ${refFlag} ${url} ${tempDir}`;

    try {
        await execAsync(command);
    } catch (error) {
        throw new Error(`Failed to clone repository: ${(error as Error).message}`);
    }
}

export async function readVibeManifest(dir: string): Promise<VibeManifest> {
    const manifestPath = path.join(dir, 'vibe.json');

    if (!existsSync(manifestPath)) {
        throw new Error('vibe.json not found in repository');
    }

    const content = await fs.readFile(manifestPath, 'utf-8');

    try {
        return JSON.parse(content) as VibeManifest;
    } catch (error) {
        throw new Error(`Invalid vibe.json: ${(error as Error).message}`);
    }
}

export function validateVibe(manifest: VibeManifest): void {
    if (!manifest.name) {
        throw new Error('vibe.json missing required field: name');
    }

    if (!manifest.version) {
        throw new Error('vibe.json missing required field: version');
    }

    if (!/^[a-z0-9-]+$/.test(manifest.name)) {
        throw new Error('vibe.json name must be lowercase alphanumeric with dashes');
    }

    if (!/^\d+\.\d+\.\d+/.test(manifest.version)) {
        throw new Error('vibe.json version must follow semver (x.y.z)');
    }
}

export async function copyToStorage(
    sourceDir: string,
    manifest: VibeManifest
): Promise<string> {
    const targetDir = getVibePackageDir(manifest.name, manifest.version);

    if (existsSync(targetDir)) {
        throw new Error(`Vibe ${manifest.name}@${manifest.version} already installed`);
    }

    await fs.mkdir(targetDir, { recursive: true });
    await fs.cp(sourceDir, targetDir, { recursive: true });

    return targetDir;
}

export async function installFromGitHub(source: string): Promise<{
    manifest: VibeManifest;
    installedPath: string;
}> {
    const githubSource = parseGitHubUrl(source);
    const tempDir = path.join(os.tmpdir(), `vibe-${Date.now()}`);

    try {
        await cloneRepository(githubSource, tempDir);

        const manifest = await readVibeManifest(tempDir);
        validateVibe(manifest);

        const installedPath = await copyToStorage(tempDir, manifest);

        return { manifest, installedPath };
    } finally {
        if (existsSync(tempDir)) {
            await fs.rm(tempDir, { recursive: true, force: true });
        }
    }
}

