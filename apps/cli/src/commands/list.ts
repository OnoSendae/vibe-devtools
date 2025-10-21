import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import Table from 'cli-table3';
import { getVibesHome } from '../utils/symlink-manager.js';

interface GlobalManifest {
    version: string;
    installedVibes: Record<string, {
        version: string;
        source: string;
        installedAt: string;
    }>;
}

export async function listCommand(): Promise<void> {
    const manifestPath = path.join(getVibesHome(), 'vibes.json');

    if (!existsSync(manifestPath)) {
        console.log(chalk.yellow('No vibes installed yet.'));
        console.log('');
        console.log(chalk.gray('Install your first vibe:'));
        console.log(chalk.cyan('  vibes install github:vibes-org/research'));
        return;
    }

    const content = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(content) as GlobalManifest;

    const vibes = Object.entries(manifest.installedVibes);

    if (vibes.length === 0) {
        console.log(chalk.yellow('No vibes installed yet.'));
        return;
    }

    const table = new Table({
        head: ['Name', 'Version', 'Source', 'Installed At'].map(h => chalk.cyan(h)),
        style: { head: [], border: [] }
    });

    vibes.forEach(([name, info]) => {
        table.push([
            chalk.bold(name),
            info.version,
            info.source,
            new Date(info.installedAt).toLocaleDateString()
        ]);
    });

    console.log('');
    console.log(chalk.bold('📦 Installed Vibes'));
    console.log('');
    console.log(table.toString());
    console.log('');
    console.log(chalk.gray(`Total: ${vibes.length} vibe${vibes.length !== 1 ? 's' : ''}`));
    console.log('');
}

