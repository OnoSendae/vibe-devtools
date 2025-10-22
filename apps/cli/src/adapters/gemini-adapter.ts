import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

const execAsync = promisify(exec);

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
            prompts: '.gemini/prompts'
        };
    }

    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        const geminiDir = path.join(targetDir, '.gemini/prompts');

        const cursorCommands = path.join(vibe.path, '.cursor/commands');

        if (existsSync(cursorCommands)) {
            await this.mergeDirectories(cursorCommands, geminiDir);
        }
    }

    async uninstall(vibe: VibePackage): Promise<void> {
        console.log(`Uninstalling ${vibe.name} from Gemini CLI...`);
    }
}

