import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { installFromGitHub, type VibeManifest } from '../installers/github-installer.js';
import { createSymlink, getVibesHome, getVibePackageDir } from '../utils/symlink-manager.js';

interface GlobalManifest {
    version: string;
    installedVibes: Record<string, {
        version: string;
        source: string;
        installedAt: string;
        symlinks: Record<string, string>;
    }>;
    projects: Record<string, {
        vibes: string[];
        linkedAt: string;
    }>;
}

function detectSource(source: string): 'github' | 'npm' | 'local' {
    if (source.startsWith('github:') || source.includes('github.com')) {
        return 'github';
    }

    if (source.startsWith('./') || source.startsWith('/') || source.startsWith('~')) {
        return 'local';
    }

    return 'npm';
}

async function ensureVibesDir(): Promise<void> {
    const vibesHome = getVibesHome();

    if (!existsSync(vibesHome)) {
        await fs.mkdir(vibesHome, { recursive: true });
        await fs.mkdir(path.join(vibesHome, 'packages'), { recursive: true });
        await fs.mkdir(path.join(vibesHome, 'cache'), { recursive: true });
        await fs.mkdir(path.join(vibesHome, 'logs'), { recursive: true });
    }
}

async function loadGlobalManifest(): Promise<GlobalManifest> {
    const manifestPath = path.join(getVibesHome(), 'vibes.json');

    if (!existsSync(manifestPath)) {
        const defaultManifest: GlobalManifest = {
            version: '1.0',
            installedVibes: {},
            projects: {}
        };

        await fs.writeFile(manifestPath, JSON.stringify(defaultManifest, null, 2));
        return defaultManifest;
    }

    const content = await fs.readFile(manifestPath, 'utf-8');
    return JSON.parse(content) as GlobalManifest;
}

async function saveGlobalManifest(manifest: GlobalManifest): Promise<void> {
    const manifestPath = path.join(getVibesHome(), 'vibes.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
}

async function createVibeSymlinks(
    vibeName: string,
    vibeVersion: string,
    vibeManifest: VibeManifest,
    projectRoot: string
): Promise<Record<string, string>> {
    const vibeDir = getVibePackageDir(vibeName, vibeVersion);
    const symlinksCreated: Record<string, string> = {};

    if (!vibeManifest.symlinks) {
        return symlinksCreated;
    }

    for (const [destination, source] of Object.entries(vibeManifest.symlinks)) {
        const sourcePath = path.join(vibeDir, source);
        const destPath = path.join(projectRoot, destination);

        if (!existsSync(sourcePath)) {
            console.warn(chalk.yellow(`Warning: Source path does not exist: ${sourcePath}`));
            continue;
        }

        try {
            await createSymlink(sourcePath, destPath, {
                force: false,
                type: 'dir',
                fallbackCopy: true
            });

            symlinksCreated[destPath] = sourcePath;
        } catch (error) {
            console.warn(chalk.yellow(`Warning: Failed to create symlink: ${(error as Error).message}`));
        }
    }

    return symlinksCreated;
}

export async function installCommand(
    source: string
): Promise<void> {
    const spinner = ora('Installing vibe...').start();

    try {
        await ensureVibesDir();

        const sourceType = detectSource(source);

        if (sourceType !== 'github' && sourceType !== 'local') {
            spinner.fail(chalk.red('npm and local sources not yet implemented. Use GitHub URL.'));
            return;
        }

        spinner.text = 'Downloading vibe...';

        let manifest: VibeManifest;
        let installedPath: string;

        if (sourceType === 'github') {
            const result = await installFromGitHub(source);
            manifest = result.manifest;
            installedPath = result.installedPath;
        } else {
            const absolutePath = path.resolve(source);
            const vibeJsonPath = path.join(absolutePath, 'vibe.json');

            if (!existsSync(vibeJsonPath)) {
                throw new Error('vibe.json not found in directory');
            }

            const vibeJsonContent = await fs.readFile(vibeJsonPath, 'utf-8');
            manifest = JSON.parse(vibeJsonContent) as VibeManifest;

            installedPath = getVibePackageDir(manifest.name, manifest.version);

            await fs.mkdir(installedPath, { recursive: true });
            await fs.cp(absolutePath, installedPath, { recursive: true });
        }

        spinner.text = 'Creating symlinks...';

        const projectRoot = process.cwd();
        const symlinks = await createVibeSymlinks(
            manifest.name,
            manifest.version,
            manifest,
            projectRoot
        );

        spinner.text = 'Updating manifest...';

        const globalManifest = await loadGlobalManifest();

        globalManifest.installedVibes[manifest.name] = {
            version: manifest.version,
            source: source,
            installedAt: new Date().toISOString(),
            symlinks
        };

        if (!globalManifest.projects[projectRoot]) {
            globalManifest.projects[projectRoot] = {
                vibes: [],
                linkedAt: new Date().toISOString()
            };
        }

        if (!globalManifest.projects[projectRoot].vibes.includes(manifest.name)) {
            globalManifest.projects[projectRoot].vibes.push(manifest.name);
        }

        await saveGlobalManifest(globalManifest);

        spinner.succeed(chalk.green('Vibe installed successfully!'));

        console.log('');
        console.log(chalk.bold('📦 Installed:'), chalk.cyan(`${manifest.name}@${manifest.version}`));
        console.log(chalk.bold('📂 Location:'), installedPath);
        console.log(chalk.bold('🔗 Symlinks:'), Object.keys(symlinks).length);
        console.log('');
        console.log(chalk.gray('Run'), chalk.cyan(`vibes list`), chalk.gray('to see all installed vibes'));

    } catch (error) {
        spinner.fail(chalk.red(`Installation failed: ${(error as Error).message}`));
        throw error;
    }
}

