import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createTwoFilesPatch } from 'diff';
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

    async showDiff(conflict: Conflict, inline: boolean): Promise<void> {
        const existingContent = await fs.readFile(conflict.destPath, 'utf-8');
        const incomingContent = await fs.readFile(conflict.sourcePath, 'utf-8');

        const patch = createTwoFilesPatch(
            conflict.destPath,
            conflict.destPath,
            existingContent,
            incomingContent,
            'Local',
            'Package'
        );

        if (!inline) {
            console.log(patch);
            return;
        }

        console.log('');
        console.log(chalk.bold(`Diff: ${conflict.destPath}`));
        console.log('');

        const lines = patch.split('\n');
        for (const line of lines) {
            if (line.startsWith('+') && !line.startsWith('+++')) {
                console.log(chalk.green(line));
            } else if (line.startsWith('-') && !line.startsWith('---')) {
                console.log(chalk.red(line));
            } else if (line.startsWith('@@')) {
                console.log(chalk.cyan(line));
            } else {
                console.log(chalk.gray(line));
            }
        }

        console.log('');
    }

    async openInEditor(conflict: Conflict): Promise<void> {
        const editor = this.detectEditor();

        if (!editor) {
            console.log(chalk.yellow('⚠️  No editor detected'));
            console.log(chalk.gray('Set EDITOR environment variable or install VSCode'));
            return;
        }

        const { command, args } = this.getEditorCommand(editor, conflict);

        return new Promise((resolve, reject) => {
            const proc = spawn(command, args, { stdio: 'inherit' });

            proc.on('exit', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Editor exited with code ${code}`));
                }
            });

            proc.on('error', (err) => {
                reject(err);
            });
        });
    }

    private detectEditor(): string | null {
        if (process.env.EDITOR) {
            return process.env.EDITOR;
        }

        const editors = ['code', 'subl', 'vim', 'nano'];

        for (const editor of editors) {
            try {
                const { execSync } = require('node:child_process');
                execSync(`which ${editor}`, { stdio: 'ignore' });
                return editor;
            } catch {
                continue;
            }
        }

        return null;
    }

    private getEditorCommand(editor: string, conflict: Conflict): { command: string; args: string[] } {
        if (editor === 'code' || editor.endsWith('code')) {
            return {
                command: 'code',
                args: ['--diff', conflict.destPath, conflict.sourcePath]
            };
        }

        if (editor === 'subl' || editor.endsWith('sublime_text')) {
            return {
                command: 'subl',
                args: [conflict.destPath, conflict.sourcePath]
            };
        }

        return {
            command: editor,
            args: [conflict.destPath]
        };
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

