import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StashLogger } from '../logger.js';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

describe('StashLogger', () => {
    let logger: StashLogger;
    let tempDir: string;
    let logPath: string;

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'logger-test-'));
        logPath = path.join(tempDir, 'test.log');
        logger = new StashLogger(logPath);
    });

    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    describe('log', () => {
        it('should append log entry to file', async () => {
            await logger.log({
                timestamp: new Date().toISOString(),
                operation: 'create',
                stash_id: 0,
                files_count: 3,
                success: true
            });

            expect(existsSync(logPath)).toBe(true);
            const content = await fs.readFile(logPath, 'utf-8');
            expect(content).toContain('"operation":"create"');
            expect(content).toContain('"stash_id":0');
        });

        it('should append multiple entries', async () => {
            await logger.log({
                timestamp: new Date().toISOString(),
                operation: 'create',
                files_count: 1,
                success: true
            });

            await logger.log({
                timestamp: new Date().toISOString(),
                operation: 'apply',
                stash_id: 0,
                files_count: 1,
                success: true
            });

            const content = await fs.readFile(logPath, 'utf-8');
            const lines = content.trim().split('\n');
            expect(lines.length).toBe(2);
        });

        it('should create log directory if not exists', async () => {
            const deepPath = path.join(tempDir, 'deep', 'nested', 'test.log');
            const deepLogger = new StashLogger(deepPath);

            await deepLogger.log({
                timestamp: new Date().toISOString(),
                operation: 'create',
                files_count: 1,
                success: true
            });

            expect(existsSync(deepPath)).toBe(true);
        });
    });

    describe('getLogs', () => {
        it('should return empty array for non-existent log', async () => {
            const logs = await logger.getLogs();
            expect(logs).toEqual([]);
        });

        it('should return all log entries', async () => {
            await logger.log({
                timestamp: new Date().toISOString(),
                operation: 'create',
                files_count: 1,
                success: true
            });

            await logger.log({
                timestamp: new Date().toISOString(),
                operation: 'apply',
                stash_id: 0,
                files_count: 1,
                success: true
            });

            const logs = await logger.getLogs();
            expect(logs.length).toBe(2);
            expect(logs[0].operation).toBe('create');
            expect(logs[1].operation).toBe('apply');
        });

        it('should limit results when specified', async () => {
            for (let i = 0; i < 10; i++) {
                await logger.log({
                    timestamp: new Date().toISOString(),
                    operation: 'create',
                    files_count: 1,
                    success: true
                });
            }

            const logs = await logger.getLogs(5);
            expect(logs.length).toBe(5);
        });
    });
});

