export { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';
export { AgentDetector, DetectedAgent } from './agent-detector.js';
export { AdapterRegistry } from './adapter-registry.js';
export { CursorAdapter } from './cursor-adapter.js';
export { GeminiAdapter } from './gemini-adapter.js';
export { ClaudeAdapter } from './claude-adapter.js';

import { AdapterRegistry } from './adapter-registry.js';
import { CursorAdapter } from './cursor-adapter.js';
import { GeminiAdapter } from './gemini-adapter.js';
import { ClaudeAdapter } from './claude-adapter.js';

AdapterRegistry.register(new CursorAdapter());
AdapterRegistry.register(new GeminiAdapter());
AdapterRegistry.register(new ClaudeAdapter());

