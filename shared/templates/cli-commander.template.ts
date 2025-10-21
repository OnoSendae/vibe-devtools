#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import pkg from './package.json';

const program = new Command();

program
    .name('{{CLI_NAME}}')
    .description(chalk.cyan('{{CLI_DESCRIPTION}}'))
    .version(pkg.version);

{ { COMMANDS_DEFINITION } }

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

