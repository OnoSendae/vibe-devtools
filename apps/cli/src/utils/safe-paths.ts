import path from 'node:path';
import os from 'node:os';

export function getCriticalSystemPaths(): string[] {
    const platform = process.platform;

    if (platform === 'win32') {
        const systemRoot = process.env.SystemRoot || 'C:\\Windows';
        const programFiles = process.env['ProgramFiles'] || 'C:\\Program Files';
        const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
        const drives = ['C:\\', 'D:\\', 'E:\\'];

        return [
            ...drives,
            systemRoot,
            path.join(systemRoot, 'System32'),
            programFiles,
            programFilesX86,
            'C:\\Windows',
            'C:\\Program Files',
            'C:\\Program Files (x86)'
        ];
    }

    if (platform === 'darwin') {
        return [
            '/',
            '/usr',
            '/etc',
            '/var',
            '/System',
            '/Library',
            '/bin',
            '/sbin',
            '/opt',
            '/private/etc',
            '/private/var',
            '/private/tmp',
            '/Applications'
        ];
    }

    return [
        '/',
        '/usr',
        '/etc',
        '/var',
        '/bin',
        '/sbin',
        '/opt',
        '/boot',
        '/lib',
        '/lib64',
        '/sys',
        '/proc',
        '/dev',
        '/root'
    ];
}

export function isCriticalSystemDirectory(targetPath: string): boolean {
    const resolved = path.resolve(targetPath);
    const criticalPaths = getCriticalSystemPaths();

    return criticalPaths.some(critical => {
        const resolvedCritical = path.resolve(critical);

        if (resolved === resolvedCritical) {
            return true;
        }

        const normalizedResolved = resolved + path.sep;
        const normalizedCritical = resolvedCritical + path.sep;

        return normalizedResolved.startsWith(normalizedCritical);
    });
}

export function isUserHomeDirectory(targetPath: string): boolean {
    const resolved = path.resolve(targetPath);
    const homeDir = os.homedir();

    return resolved === homeDir;
}

export function getSafeInstallMessage(targetPath: string): string {
    if (isUserHomeDirectory(targetPath)) {
        return 'Installing in home directory is not recommended. Please run from a project directory.';
    }

    if (isCriticalSystemDirectory(targetPath)) {
        return 'Cannot install in critical system directory. Please run from a safe project directory.';
    }

    return '';
}

