export interface StashFile {
    path: string;
    hash: string;
    size: number;
    relativePath: string;
}

export interface StashMetadata {
    stash_id: number;
    timestamp: string;
    reason: 'install' | 'update' | 'manual';
    package?: string;
    version_old?: string;
    version_new?: string;
    files: StashFile[];
}

export interface StashIndex {
    stashes: StashMetadata[];
    next_id: number;
}

export interface ApplyOptions {
    force?: boolean;
}

export interface DiffResult {
    file: string;
    status: 'added' | 'removed' | 'modified';
    diff?: string;
}

