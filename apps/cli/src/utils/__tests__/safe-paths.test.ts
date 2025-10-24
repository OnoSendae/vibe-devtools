import { describe, it, expect, afterEach } from 'vitest';
import { getCriticalSystemPaths, isCriticalSystemDirectory, isUserHomeDirectory } from '../safe-paths.js';
import os from 'node:os';
import path from 'node:path';

describe('safe-paths', () => {
    const originalPlatform = process.platform;

    afterEach(() => {
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        });
    });

    describe('getCriticalSystemPaths', () => {
        it('returns Windows paths on win32', () => {
            Object.defineProperty(process, 'platform', {
                value: 'win32'
            });

            const paths = getCriticalSystemPaths();

            expect(paths).toContain('C:\\');
            expect(paths.some(p => p.includes('Windows'))).toBe(true);
            expect(paths.some(p => p.includes('Program Files'))).toBe(true);
        });

        it('returns macOS paths on darwin', () => {
            Object.defineProperty(process, 'platform', {
                value: 'darwin'
            });

            const paths = getCriticalSystemPaths();

            expect(paths).toContain('/');
            expect(paths).toContain('/System');
            expect(paths).toContain('/Library');
            expect(paths).toContain('/Applications');
        });

        it('returns Linux paths on linux', () => {
            Object.defineProperty(process, 'platform', {
                value: 'linux'
            });

            const paths = getCriticalSystemPaths();

            expect(paths).toContain('/');
            expect(paths).toContain('/usr');
            expect(paths).toContain('/etc');
            expect(paths).toContain('/var');
        });
    });

    describe('isCriticalSystemDirectory', () => {
        it('detects root directory as critical', () => {
            const isRootCritical = isCriticalSystemDirectory('/');
            expect(isRootCritical).toBe(true);
        });

        it('detects subdirectories of critical paths', () => {
            if (process.platform === 'darwin' || process.platform === 'linux') {
                expect(isCriticalSystemDirectory('/usr/local')).toBe(true);
                expect(isCriticalSystemDirectory('/etc/config')).toBe(true);
            }
        });

        it('allows safe project directories', () => {
            const homeDir = os.homedir();
            const projectDir = path.join(homeDir, 'projects', 'my-app');

            expect(isCriticalSystemDirectory(projectDir)).toBe(false);
        });

        it('normalizes paths correctly', () => {
            if (process.platform === 'darwin' || process.platform === 'linux') {
                expect(isCriticalSystemDirectory('/usr/../usr')).toBe(true);
            }
        });
    });

    describe('isUserHomeDirectory', () => {
        it('detects user home directory', () => {
            const homeDir = os.homedir();
            expect(isUserHomeDirectory(homeDir)).toBe(true);
        });

        it('allows subdirectories of home', () => {
            const homeDir = os.homedir();
            const subDir = path.join(homeDir, 'projects');

            expect(isUserHomeDirectory(subDir)).toBe(false);
        });
    });

    describe('cross-platform compatibility', () => {
        it('handles paths with different separators', () => {
            const userDir = path.join(os.homedir(), 'projects', 'app');

            const result = isCriticalSystemDirectory(userDir);

            expect(typeof result).toBe('boolean');
        });

        it('resolves relative paths', () => {
            const relativePath = './some/project';
            const resolvedCheck = isCriticalSystemDirectory(relativePath);

            expect(typeof resolvedCheck).toBe('boolean');
        });
    });
});

