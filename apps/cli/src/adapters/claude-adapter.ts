import { existsSync } from 'node:fs';
import path from 'node:path';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

export class ClaudeAdapter extends BaseAdapter {
    getName(): string {
        return 'claude';
    }

    async detect(): Promise<boolean> {
        const paths = [
            '/Applications/Claude Code.app',
            'C:\\Program Files\\Claude Code',
            process.env.CLAUDE_CODE_PATH
        ];

        return paths.some(p => p && existsSync(p)) ||
            existsSync('.claude/');
    }

    getTargetPaths(): TargetPaths {
        return {
            commands: '.claude/commands',
            rules: '.claude/rules'
        };
    }

    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        const targets = this.getTargetPaths();

        for (const [type, targetPath] of Object.entries(targets)) {
            if (!targetPath) continue;

            const sourcePath = path.join(vibe.path, '.cursor', type);
            const destPath = path.join(targetDir, targetPath);

            if (existsSync(sourcePath)) {
                await this.mergeDirectories(sourcePath, destPath);
            }
        }
    }

    async uninstall(vibe: VibePackage): Promise<void> {
        console.log(`Uninstalling ${vibe.name} from Claude Code...`);
    }
}

