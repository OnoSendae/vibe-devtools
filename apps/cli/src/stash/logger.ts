import fs from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface StashLogEntry {
    timestamp: string;
    operation: 'create' | 'apply' | 'pop' | 'remove' | 'clear';
    stash_id?: number;
    package?: string;
    files_count: number;
    success: boolean;
    error?: string;
}

export class StashLogger {
    private readonly logPath: string;
    private readonly maxSize: number = 10 * 1024 * 1024;

    constructor(logPath?: string) {
        const logsDir = path.join(os.homedir(), '.vibes', 'logs');
        this.logPath = logPath ?? path.join(logsDir, 'stash.log');
    }

    async log(entry: StashLogEntry): Promise<void> {
        await this.ensureLogDir();
        await this.rotateIfNeeded();

        const logEntry = {
            ...entry,
            timestamp: entry.timestamp || new Date().toISOString()
        };

        const line = JSON.stringify(logEntry) + '\n';
        await fs.appendFile(this.logPath, line, 'utf-8');
    }

    async getLogs(limit?: number): Promise<StashLogEntry[]> {
        if (!existsSync(this.logPath)) {
            return [];
        }

        const content = await fs.readFile(this.logPath, 'utf-8');
        const lines = content.trim().split('\n').filter(line => line.length > 0);

        const entries = lines.map(line => JSON.parse(line) as StashLogEntry);

        if (limit && limit > 0) {
            return entries.slice(-limit);
        }

        return entries;
    }

    private async rotateIfNeeded(): Promise<void> {
        if (!existsSync(this.logPath)) {
            return;
        }

        const stats = statSync(this.logPath);
        if (stats.size > this.maxSize) {
            const oldPath = this.logPath + '.old';
            if (existsSync(oldPath)) {
                await fs.unlink(oldPath);
            }
            await fs.rename(this.logPath, oldPath);
        }
    }

    private async ensureLogDir(): Promise<void> {
        const logDir = path.dirname(this.logPath);
        if (!existsSync(logDir)) {
            await fs.mkdir(logDir, { recursive: true });
        }
    }
}

