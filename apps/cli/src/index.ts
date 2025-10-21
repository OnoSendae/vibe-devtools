#!/usr/bin/env node

import { Command } from 'commander';
import { installCommand } from './commands/install.js';
import { listCommand } from './commands/list.js';
import { uninstallCommand } from './commands/uninstall.js';

const program = new Command();

program
    .name('vibes')
    .description('CLI tool to install and manage vibes (agentic command packages)')
    .version('1.0.0');

program
    .command('install')
    .description('Install a vibe from GitHub, npm or local path')
    .argument('<source>', 'Source: github:user/repo, @vibes/name, or ./path')
    .option('--conflict <strategy>', 'Conflict resolution: skip, override, rename', 'skip')
    .action(installCommand);

program
    .command('list')
    .description('List all installed vibes')
    .action(listCommand);

program
    .command('uninstall')
    .description('Uninstall a vibe')
    .argument('<name>', 'Vibe name to uninstall')
    .option('--force', 'Skip confirmation prompt', false)
    .action(uninstallCommand);

program.parse();

