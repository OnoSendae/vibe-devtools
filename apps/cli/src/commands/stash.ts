import chalk from 'chalk';
import { StashManager } from '../stash/stash-manager.js';

export async function stashListCommand(): Promise<void> {
    const manager = new StashManager();
    const stashes = await manager.list();

    if (stashes.length === 0) {
        console.log(chalk.gray('No stashes found'));
        return;
    }

    console.log('');
    console.log(chalk.bold('Stashes:'));
    console.log('');

    for (const stash of stashes) {
        console.log(chalk.cyan(`stash{${stash.stash_id}}`), chalk.gray('-'), stash.package || 'manual');
        console.log(chalk.gray(`  ${stash.reason} • ${new Date(stash.timestamp).toLocaleString()} • ${stash.files.length} files`));
        console.log('');
    }

    console.log(chalk.gray(`Total: ${stashes.length} stashes`));
    console.log('');
}

export async function stashShowCommand(stashId: string): Promise<void> {
    const id = parseInt(stashId, 10);
    if (isNaN(id)) {
        throw new Error('Invalid stash ID');
    }

    const manager = new StashManager();
    const stash = await manager.show(id);

    console.log('');
    console.log(chalk.bold(`Stash {${stash.stash_id}}`));
    console.log('');
    console.log(chalk.gray('Timestamp:'), new Date(stash.timestamp).toLocaleString());
    console.log(chalk.gray('Reason:'), stash.reason);

    if (stash.package) {
        console.log(chalk.gray('Package:'), stash.package);
    }

    if (stash.version_old) {
        console.log(chalk.gray('Version (old → new):'), `${stash.version_old} → ${stash.version_new}`);
    }

    console.log('');
    console.log(chalk.bold('Files:'));

    for (const file of stash.files) {
        console.log(chalk.gray('  -'), file.path, chalk.dim(`(${formatSize(file.size)})`));
    }

    console.log('');
}

export async function stashApplyCommand(stashId: string): Promise<void> {
    const id = parseInt(stashId, 10);
    if (isNaN(id)) {
        throw new Error('Invalid stash ID');
    }

    const manager = new StashManager();
    await manager.apply(id);

    console.log('');
    console.log(chalk.green(`✓ Stash {${id}} applied successfully`));
    console.log(chalk.gray('  Stash kept in history'));
    console.log('');
}

export async function stashPopCommand(stashId: string): Promise<void> {
    const id = parseInt(stashId, 10);
    if (isNaN(id)) {
        throw new Error('Invalid stash ID');
    }

    const manager = new StashManager();
    await manager.pop(id);

    console.log('');
    console.log(chalk.green(`✓ Stash {${id}} applied and removed`));
    console.log('');
}

export async function stashRemoveCommand(stashId: string, options: { force?: boolean } = {}): Promise<void> {
    const id = parseInt(stashId, 10);
    if (isNaN(id)) {
        throw new Error('Invalid stash ID');
    }

    if (!options.force) {
        const manager = new StashManager();
        const stash = await manager.show(id);

        console.log('');
        console.log(chalk.yellow('⚠️  About to remove stash:'));
        console.log(chalk.gray('  Package:'), stash.package || 'manual');
        console.log(chalk.gray('  Files:'), stash.files.length);
        console.log('');

        const prompts = await import('prompts');
        const response = await prompts.default({
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure?',
            initial: false
        });

        if (!response.confirm) {
            console.log(chalk.gray('Cancelled'));
            return;
        }
    }

    const manager = new StashManager();
    await manager.remove(id);

    console.log('');
    console.log(chalk.green(`✓ Stash {${id}} removed`));
    console.log('');
}

export async function stashDiffCommand(stashId: string, _options: { editor?: boolean } = {}): Promise<void> {
    const id = parseInt(stashId, 10);
    if (isNaN(id)) {
        throw new Error('Invalid stash ID');
    }

    const manager = new StashManager();
    const results = await manager.diff(id);

    if (results.length === 0) {
        console.log(chalk.green('No differences found'));
        return;
    }

    console.log('');
    console.log(chalk.bold('Differences:'));
    console.log('');

    for (const result of results) {
        const icon = result.status === 'added' ? '+' : 'M';
        const color = result.status === 'added' ? chalk.green : chalk.yellow;
        console.log(color(`  ${icon} ${result.file}`));
    }

    console.log('');
}

export async function stashSaveCommand(files?: string[]): Promise<void> {
    let filesToStash: string[] = files || [];

    if (filesToStash.length === 0) {
        const prompts = await import('prompts');
        const response = await prompts.default({
            type: 'text',
            name: 'files',
            message: 'Enter file paths to stash (comma-separated):',
            validate: (value: string) => value.trim().length > 0 || 'Please enter at least one file'
        });

        if (!response.files) {
            console.log(chalk.gray('Cancelled'));
            return;
        }

        filesToStash = response.files.split(',').map((f: string) => f.trim());
    }

    const existingFiles: string[] = [];
    for (const file of filesToStash) {
        const fs = await import('node:fs');
        if (fs.existsSync(file)) {
            existingFiles.push(file);
        } else {
            console.log(chalk.yellow(`⚠️  File not found: ${file}`));
        }
    }

    if (existingFiles.length === 0) {
        console.log(chalk.red('No valid files to stash'));
        return;
    }

    const manager = new StashManager();
    const filesToStashMap = new Map(
        existingFiles.map(f => [f, f])
    );

    const stashId = await manager.create(filesToStashMap, {
        reason: 'manual'
    });

    console.log('');
    console.log(chalk.green(`✓ Stash {${stashId}} created`));
    console.log(chalk.gray(`  Files: ${existingFiles.length}`));
    console.log('');

    for (const file of existingFiles) {
        console.log(chalk.gray('  -'), file);
    }

    console.log('');
}

export async function stashClearCommand(options: { force?: boolean } = {}): Promise<void> {
    const manager = new StashManager();
    const stashes = await manager.list();

    if (stashes.length === 0) {
        console.log(chalk.gray('No stashes to clear'));
        return;
    }

    if (!options.force) {
        console.log('');
        console.log(chalk.yellow(`⚠️  About to remove ${stashes.length} stashes`));
        console.log('');

        const prompts = await import('prompts');
        const response = await prompts.default({
            type: 'text',
            name: 'confirm',
            message: 'Type "yes" to confirm:',
            validate: (value: string) => value === 'yes' || 'Please type "yes" to confirm'
        });

        if (response.confirm !== 'yes') {
            console.log(chalk.gray('Cancelled'));
            return;
        }
    }

    await manager.clear(true);

    console.log('');
    console.log(chalk.green(`✓ ${stashes.length} stashes cleared`));
    console.log('');
}

function formatSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes}B`;
    }
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)}KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

