import prompts from 'prompts';
import chalk from 'chalk';
import type { Conflict } from './conflict-detector.js';

export type ConflictResolution =
    | 'overwrite'
    | 'stash-and-overwrite'
    | 'cancel';

export interface ResolutionOptions {
    showDiff?: boolean;
    openInEditor?: boolean;
}

export class ConflictResolver {
    async prompt(conflicts: Conflict[]): Promise<ConflictResolution> {
        console.log('');
        console.log(chalk.yellow('⚠️  Conflicts detected'), chalk.gray(`(${conflicts.length} files)`));
        console.log('');

        for (let i = 0; i < conflicts.length; i++) {
            const conflict = conflicts[i];
            const relativePath = conflict.destPath;

            console.log(chalk.bold(`  ${i + 1}. ${relativePath}`));
            console.log(chalk.gray(`     Local:   ${conflict.existingHash.substring(0, 12)}...`), chalk.dim(`(${this.formatSize(conflict.existingSize)})`));
            console.log(chalk.gray(`     Package: ${conflict.incomingHash.substring(0, 12)}...`), chalk.dim(`(${this.formatSize(conflict.incomingSize)})`));
            console.log('');
        }

        const response = await prompts({
            type: 'select',
            name: 'resolution',
            message: 'How to resolve conflicts?',
            choices: [
                {
                    title: 'Overwrite with package version',
                    value: 'overwrite' as ConflictResolution,
                    description: 'Replace local files with package files (no backup)'
                },
                {
                    title: 'Stash local and install package',
                    value: 'stash-and-overwrite' as ConflictResolution,
                    description: 'Save local files to stash, then install package'
                },
                {
                    title: 'Cancel installation',
                    value: 'cancel' as ConflictResolution,
                    description: 'Abort the installation'
                }
            ],
            initial: 1
        });

        if (!response.resolution) {
            return 'cancel';
        }

        return response.resolution;
    }

    async showDiff(_conflict: Conflict, _inline: boolean): Promise<void> {
        throw new Error('Not implemented yet - will be implemented in TASK-022');
    }

    async openInEditor(_conflict: Conflict): Promise<void> {
        throw new Error('Not implemented yet - will be implemented in TASK-023');
    }

    private formatSize(bytes: number): string {
        if (bytes < 1024) {
            return `${bytes}B`;
        }
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)}KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    }
}

