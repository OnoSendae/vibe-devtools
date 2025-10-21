import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import { getVibesHome, getVibePackageDir, removeSymlink } from '../utils/symlink-manager.js';

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

async function loadGlobalManifest(): Promise<GlobalManifest> {
    const manifestPath = path.join(getVibesHome(), 'vibes.json');
    const content = await fs.readFile(manifestPath, 'utf-8');
    return JSON.parse(content) as GlobalManifest;
}

async function saveGlobalManifest(manifest: GlobalManifest): Promise<void> {
    const manifestPath = path.join(getVibesHome(), 'vibes.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
}

export async function uninstallCommand(
    name: string,
    options: { force?: boolean }
): Promise<void> {
    const manifest = await loadGlobalManifest();

    if (!manifest.installedVibes[name]) {
        console.log(chalk.red(`Vibe '${name}' is not installed.`));
        return;
    }

    const vibeInfo = manifest.installedVibes[name];

    if (!options.force) {
        const response = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `Uninstall ${chalk.cyan(name)}@${vibeInfo.version}?`,
            initial: false
        });

        if (!response.confirm) {
            console.log(chalk.gray('Cancelled.'));
            return;
        }
    }

    const spinner = ora('Uninstalling vibe...').start();

    try {
        spinner.text = 'Removing symlinks...';

        for (const linkPath of Object.keys(vibeInfo.symlinks || {})) {
            try {
                await removeSymlink(linkPath);
            } catch (error) {
                console.warn(chalk.yellow(`Warning: Failed to remove symlink: ${linkPath}`));
            }
        }

        spinner.text = 'Moving to trash...';

        const packageDir = getVibePackageDir(name, vibeInfo.version);
        const trashDir = path.join(getVibesHome(), 'packages', '.trash', `${name}@${vibeInfo.version}-${Date.now()}`);

        if (existsSync(packageDir)) {
            await fs.mkdir(path.dirname(trashDir), { recursive: true });
            await fs.rename(packageDir, trashDir);
        }

        spinner.text = 'Updating manifest...';

        delete manifest.installedVibes[name];

        for (const project of Object.values(manifest.projects)) {
            project.vibes = project.vibes.filter(v => v !== name);
        }

        await saveGlobalManifest(manifest);

        spinner.succeed(chalk.green('Vibe uninstalled successfully!'));

        console.log('');
        console.log(chalk.bold('🗑️  Uninstalled:'), chalk.cyan(`${name}@${vibeInfo.version}`));
        console.log(chalk.bold('📂 Backup:'), chalk.gray(trashDir));
        console.log('');

    } catch (error) {
        spinner.fail(chalk.red(`Uninstall failed: ${(error as Error).message}`));
        throw error;
    }
}

