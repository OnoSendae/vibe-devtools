#!/usr/bin/env node

import { Command } from 'commander';
import { installCommand } from './commands/install.js';
import { listCommand } from './commands/list.js';
import { uninstallCommand } from './commands/uninstall.js';
import { agentsListCommand, agentsDetectCommand } from './commands/agents.js';

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
    .action(installCommand);

program
    .command('list')
    .description('List all installed vibe packages')
    .option('--agent <agent>', 'Filter by agent', '')
    .action(listCommand);

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

program.parse();

