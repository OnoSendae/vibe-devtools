import { BaseAdapter } from './base-adapter.js';

export class AdapterRegistry {
    private static adapters = new Map<string, BaseAdapter>();

    static register(adapter: BaseAdapter): void {
        this.adapters.set(adapter.getName(), adapter);
    }

    static getAdapter(name: string): BaseAdapter | undefined {
        return this.adapters.get(name);
    }

    static getAllAdapters(): BaseAdapter[] {
        return Array.from(this.adapters.values());
    }

    static hasAdapter(name: string): boolean {
        return this.adapters.has(name);
    }

    static clear(): void {
        this.adapters.clear();
    }
}

