import chalk from 'chalk';
import Table from 'cli-table3';
import { AdapterRegistry, AgentDetector } from '../adapters/index.js';

export async function agentsListCommand(): Promise<void> {
    const adapters = AdapterRegistry.getAllAdapters();

    console.log(chalk.bold('\n📦 Agentes Suportados por Vibe DevTools\n'));

    const table = new Table({
        head: ['Agente', 'Status', 'Paths'],
        style: {
            head: ['cyan']
        }
    });

    for (const adapter of adapters) {
        const paths = adapter.getTargetPaths();
        const pathsStr = Object.entries(paths)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n');

        table.push([
            adapter.getName(),
            'Suportado ✓',
            pathsStr || 'N/A'
        ]);
    }

    console.log(table.toString());
    console.log(chalk.dim('\nUse `vdt agents detect` para ver quais estão instalados\n'));
}

export async function agentsDetectCommand(): Promise<void> {
    const adapters = AdapterRegistry.getAllAdapters();
    const detector = new AgentDetector(adapters);

    console.log(chalk.bold('\n🔍 Detectando agentes instalados...\n'));

    const detected = await detector.detectAll();

    if (detected.length === 0) {
        console.log(chalk.yellow('⚠️  Nenhum agente detectado'));
        console.log(chalk.dim('\nInstale um dos agentes suportados:'));
        console.log(chalk.dim('  - Cursor: https://cursor.sh'));
        console.log(chalk.dim('  - Gemini CLI: https://ai.google.dev/gemini-api/docs/cli'));
        console.log(chalk.dim('  - Claude Code: https://claude.ai/code\n'));
        return;
    }

    const table = new Table({
        head: ['Agente', 'Status', 'Paths Detectados'],
        style: {
            head: ['cyan']
        }
    });

    for (const agent of detected) {
        const pathsStr = Object.entries(agent.paths)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n');

        table.push([
            agent.name,
            chalk.green('✓ Instalado'),
            pathsStr || 'N/A'
        ]);
    }

    console.log(table.toString());
    console.log(chalk.green(`\n✓ ${detected.length} agente(s) detectado(s)\n`));
    console.log(chalk.dim(`Ao usar 'vdt install', vibes serão instalados para: ${detected.map(a => a.name).join(', ')}\n`));
}

