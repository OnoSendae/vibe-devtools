import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HashCalculator } from '../hash-calculator.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

describe('HashCalculator', () => {
    let hashCalculator: HashCalculator;
    let tempDir: string;

    beforeEach(async () => {
        hashCalculator = new HashCalculator();
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'hash-test-'));
    });

    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    describe('calculateFile', () => {
        it('should calculate hash for a file', async () => {
            const testFile = path.join(tempDir, 'test.txt');
            await fs.writeFile(testFile, 'test content', 'utf-8');

            const hash = await hashCalculator.calculateFile(testFile);

            expect(hash).toBeTruthy();
            expect(hash.length).toBe(64);
        });

        it('should throw error for non-existent file', async () => {
            const testFile = path.join(tempDir, 'nonexistent.txt');

            await expect(hashCalculator.calculateFile(testFile)).rejects.toThrow('File not found');
        });

        it('should return same hash for same content', async () => {
            const file1 = path.join(tempDir, 'file1.txt');
            const file2 = path.join(tempDir, 'file2.txt');
            const content = 'identical content';

            await fs.writeFile(file1, content, 'utf-8');
            await fs.writeFile(file2, content, 'utf-8');

            const hash1 = await hashCalculator.calculateFile(file1);
            const hash2 = await hashCalculator.calculateFile(file2);

            expect(hash1).toBe(hash2);
        });

        it('should return different hash for different content', async () => {
            const file1 = path.join(tempDir, 'file1.txt');
            const file2 = path.join(tempDir, 'file2.txt');

            await fs.writeFile(file1, 'content A', 'utf-8');
            await fs.writeFile(file2, 'content B', 'utf-8');

            const hash1 = await hashCalculator.calculateFile(file1);
            const hash2 = await hashCalculator.calculateFile(file2);

            expect(hash1).not.toBe(hash2);
        });
    });

    describe('calculateDirectory', () => {
        it('should calculate hashes for all files in directory', async () => {
            await fs.writeFile(path.join(tempDir, 'file1.txt'), 'content 1', 'utf-8');
            await fs.writeFile(path.join(tempDir, 'file2.txt'), 'content 2', 'utf-8');

            const hashes = await hashCalculator.calculateDirectory(tempDir);

            expect(hashes.size).toBe(2);
            expect(hashes.has('file1.txt')).toBe(true);
            expect(hashes.has('file2.txt')).toBe(true);
        });

        it('should handle nested directories', async () => {
            const subDir = path.join(tempDir, 'subdir');
            await fs.mkdir(subDir);
            await fs.writeFile(path.join(subDir, 'nested.txt'), 'nested', 'utf-8');
            await fs.writeFile(path.join(tempDir, 'root.txt'), 'root', 'utf-8');

            const hashes = await hashCalculator.calculateDirectory(tempDir);

            expect(hashes.size).toBe(2);
            expect(hashes.has('root.txt')).toBe(true);
            expect(hashes.has('subdir/nested.txt')).toBe(true);
        });

        it('should throw error for non-existent directory', async () => {
            await expect(
                hashCalculator.calculateDirectory(path.join(tempDir, 'nonexistent'))
            ).rejects.toThrow('Directory not found');
        });

        it('should throw error if path is not a directory', async () => {
            const testFile = path.join(tempDir, 'file.txt');
            await fs.writeFile(testFile, 'content', 'utf-8');

            await expect(
                hashCalculator.calculateDirectory(testFile)
            ).rejects.toThrow('Path is not a directory');
        });
    });

    describe('validate', () => {
        it('should return true for matching hash', async () => {
            const testFile = path.join(tempDir, 'test.txt');
            await fs.writeFile(testFile, 'content', 'utf-8');

            const hash = await hashCalculator.calculateFile(testFile);
            const isValid = await hashCalculator.validate(testFile, hash);

            expect(isValid).toBe(true);
        });

        it('should return false for non-matching hash', async () => {
            const testFile = path.join(tempDir, 'test.txt');
            await fs.writeFile(testFile, 'content', 'utf-8');

            const isValid = await hashCalculator.validate(testFile, 'wrong-hash');

            expect(isValid).toBe(false);
        });

        it('should return false for non-existent file', async () => {
            const testFile = path.join(tempDir, 'nonexistent.txt');

            const isValid = await hashCalculator.validate(testFile, 'any-hash');

            expect(isValid).toBe(false);
        });
    });
});

