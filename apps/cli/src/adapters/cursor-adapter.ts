import { existsSync } from 'node:fs';
import path from 'node:path';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

export class CursorAdapter extends BaseAdapter {
    getName(): string {
        return 'cursor';
    }

    async detect(): Promise<boolean> {
        const paths = [
            '/Applications/Cursor.app',
            'C:\\Program Files\\Cursor',
            process.env.CURSOR_PATH
        ];

        return paths.some(p => p && existsSync(p)) ||
            existsSync('.cursor/');
    }

    getTargetPaths(): TargetPaths {
        return {
            commands: '.cursor/commands',
            rules: '.cursor/rules'
        };
    }

    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        const targets = this.getTargetPaths();

        for (const [, targetPath] of Object.entries(targets)) {
            if (!targetPath) continue;

            const sourcePath = path.join(vibe.path, targetPath);
            const destPath = path.join(targetDir, targetPath);

            if (existsSync(sourcePath)) {
                await this.mergeDirectories(sourcePath, destPath);
            }
        }
    }

    async uninstall(vibe: VibePackage): Promise<void> {
        console.log(`Uninstalling ${vibe.name} from Cursor...`);
    }
}

