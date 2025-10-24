import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

const execAsync = promisify(exec);

interface MarkdownParsed {
    frontmatter: Record<string, string>;
    body: string;
}

function parseMarkdown(content: string): MarkdownParsed {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return {
            frontmatter: {},
            body: content.trim()
        };
    }

    const frontmatterText = match[1];
    const body = match[2].trim();

    const frontmatter: Record<string, string> = {};
    const lines = frontmatterText.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();

        frontmatter[key] = value;
    }

    return { frontmatter, body };
}

function escapeToml(str: string): string {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t');
}

function mdToToml(mdContent: string): string {
    const { frontmatter, body } = parseMarkdown(mdContent);

    const description = frontmatter.description || 'Custom command';

    let prompt = body;
    prompt = prompt.replace(/\$ARGUMENTS/g, '{{args}}');
    prompt = prompt.replace(/^#{1,6}\s+/gm, '');

    return `description = "${escapeToml(description)}"

prompt = """
${prompt}
"""`;
}

export class GeminiAdapter extends BaseAdapter {
    getName(): string {
        return 'gemini';
    }

    async detect(): Promise<boolean> {
        try {
            await execAsync('gemini --version');
            return true;
        } catch {
            return existsSync('.gemini/') ||
                existsSync(path.join(os.homedir(), '.config/gemini'));
        }
    }

    getTargetPaths(): TargetPaths {
        return {
            commands: '.gemini/commands'
        };
    }

    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        const commandsDir = path.join(targetDir, '.gemini/commands');
        const cursorCommands = path.join(vibe.path, '.cursor/commands');

        await fs.mkdir(commandsDir, { recursive: true });

        if (existsSync(cursorCommands)) {
            const files = await fs.readdir(cursorCommands);

            for (const file of files) {
                if (!file.endsWith('.md')) continue;

                const mdPath = path.join(cursorCommands, file);
                const mdContent = await fs.readFile(mdPath, 'utf-8');

                const tomlContent = mdToToml(mdContent);

                const tomlFilename = file.replace(/\.md$/, '.toml');
                const tomlPath = path.join(commandsDir, tomlFilename);

                await fs.writeFile(tomlPath, tomlContent);
            }
        }

        await this.consolidateContext(vibe, targetDir);
    }

    private async consolidateContext(
        vibe: VibePackage,
        targetDir: string
    ): Promise<void> {
        const rulesDir = path.join(vibe.path, '.cursor/rules');

        if (!existsSync(rulesDir)) return;

        const contextPath = path.join(targetDir, '.gemini/GEMINI.md');
        let contextContent = `# Vibe Context: ${vibe.name}\n\n`;

        const ruleFiles = await fs.readdir(rulesDir);

        for (const file of ruleFiles) {
            const rulePath = path.join(rulesDir, file);
            const ruleContent = await fs.readFile(rulePath, 'utf-8');

            contextContent += `## ${file}\n\n${ruleContent}\n\n`;
        }

        await fs.writeFile(contextPath, contextContent);
    }

    async uninstall(vibe: VibePackage): Promise<void> {
        console.log(`Uninstalling ${vibe.name} from Gemini CLI...`);
    }
}

