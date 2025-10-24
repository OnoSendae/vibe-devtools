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

export async function stashSaveCommand(_files?: string[]): Promise<void> {
    throw new Error('Not implemented yet - will be implemented in TASK-039');
}

export async function stashClearCommand(_options: { force?: boolean } = {}): Promise<void> {
    throw new Error('Not implemented yet - will be implemented in TASK-040');
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

