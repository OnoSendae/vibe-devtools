import { BaseAdapter } from './base-adapter.js';

export interface DetectedAgent {
    name: string;
    adapter: BaseAdapter;
    paths: Record<string, string | undefined>;
}

export class AgentDetector {
    private adapters: BaseAdapter[];

    constructor(adapters: BaseAdapter[]) {
        this.adapters = adapters;
    }

    async detectAll(): Promise<DetectedAgent[]> {
        const detected: DetectedAgent[] = [];

        for (const adapter of this.adapters) {
            try {
                const isInstalled = await adapter.detect();

                if (isInstalled) {
                    detected.push({
                        name: adapter.getName(),
                        adapter: adapter,
                        paths: adapter.getTargetPaths()
                    });
                }
            } catch (error) {
                console.warn(`Warning: Failed to detect ${adapter.getName()}: ${error}`);
            }
        }

        return detected;
    }

    async detectCursor(): Promise<boolean> {
        const adapter = this.getAdapter('cursor');
        return adapter ? await adapter.detect() : false;
    }

    async detectGemini(): Promise<boolean> {
        const adapter = this.getAdapter('gemini');
        return adapter ? await adapter.detect() : false;
    }

    async detectClaude(): Promise<boolean> {
        const adapter = this.getAdapter('claude');
        return adapter ? await adapter.detect() : false;
    }

    private getAdapter(name: string): BaseAdapter | undefined {
        return this.adapters.find(a => a.getName() === name);
    }
}

