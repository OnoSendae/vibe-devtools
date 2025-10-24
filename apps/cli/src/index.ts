#!/usr/bin/env node

import { Command } from 'commander';
import { installCommand } from './commands/install.js';
import { listCommand } from './commands/list.js';
import { uninstallCommand } from './commands/uninstall.js';
import { agentsListCommand, agentsDetectCommand } from './commands/agents.js';
import { updateCommand } from './commands/update.js';
import {
    stashListCommand,
    stashShowCommand,
    stashApplyCommand,
    stashPopCommand,
    stashRemoveCommand,
    stashDiffCommand,
    stashSaveCommand,
    stashClearCommand
} from './commands/stash.js';

const program = new Command();

program
    .name('vdt')
    .description('Vibe DevTools - Agent Orchestration for Development')
    .version('0.4.0');

program
    .command('install')
    .description('Install a vibe package from GitHub, npm or local path')
    .argument('<source>', 'Source: github:user/repo, @org/name, or ./path')
    .option('--conflict <strategy>', 'Conflict resolution: skip, override, rename', 'skip')
    .option('--agent <agents>', 'Target specific agents (comma-separated)', '')
    .option('--dry-run', 'Preview changes without installing', false)
    .action(installCommand);

program
    .command('list')
    .description('List all installed vibe packages')
    .option('--agent <agent>', 'Filter by agent', '')
    .action(listCommand);

program
    .command('update')
    .description('Update a vibe package to a new version')
    .argument('<package>', 'Package name to update')
    .option('--version <version>', 'Specific version to update to')
    .option('--latest', 'Update to latest version', false)
    .option('--dry-run', 'Preview changes without updating', false)
    .action(updateCommand);

program
    .command('uninstall')
    .description('Uninstall a vibe package')
    .argument('<name>', 'Vibe package name to uninstall')
    .option('--force', 'Skip confirmation prompt', false)
    .option('--agent <agents>', 'Uninstall from specific agents only', '')
    .action(uninstallCommand);

const agentsCmd = program
    .command('agents')
    .description('Manage AI agents');

agentsCmd
    .command('list')
    .description('List all supported agents')
    .action(agentsListCommand);

agentsCmd
    .command('detect')
    .description('Detect which agents are installed')
    .action(agentsDetectCommand);

const stashCmd = program
    .command('stash')
    .description('Manage file stashes');

stashCmd
    .command('list')
    .description('List all stashes')
    .action(stashListCommand);

stashCmd
    .command('show')
    .description('Show stash details')
    .argument('<stash-id>', 'Stash ID to show')
    .action(stashShowCommand);

stashCmd
    .command('apply')
    .description('Apply stash (keep in history)')
    .argument('<stash-id>', 'Stash ID to apply')
    .action(stashApplyCommand);

stashCmd
    .command('pop')
    .description('Apply and remove stash')
    .argument('<stash-id>', 'Stash ID to pop')
    .action(stashPopCommand);

stashCmd
    .command('remove')
    .description('Remove a stash')
    .argument('<stash-id>', 'Stash ID to remove')
    .option('--force', 'Skip confirmation', false)
    .action(stashRemoveCommand);

stashCmd
    .command('diff')
    .description('Show diff between stash and current files')
    .argument('<stash-id>', 'Stash ID to diff')
    .option('--editor', 'Open in editor', false)
    .action(stashDiffCommand);

stashCmd
    .command('save')
    .description('Create manual stash')
    .argument('[files...]', 'Files to stash')
    .action(stashSaveCommand);

stashCmd
    .command('clear')
    .description('Clear all stashes')
    .option('--force', 'Skip confirmation', false)
    .action(stashClearCommand);

program.parse();

