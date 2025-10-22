# Creating New Adapters for Vibe DevTools

**Version**: v0.4.0  
**Date**: 2025-10-22  
**Audience**: Developers extending Vibe DevTools

---

## 🎯 Overview

This guide shows how to create adapters for new AI agents in Vibe DevTools.

**What is an Adapter?**
- Encapsulates agent-specific installation logic
- Detects if agent is installed
- Maps vibe packages to agent's file structure

**Why Create Adapters?**
- Extend Vibe DevTools to new AI agents
- Enable community to add support for emerging tools
- Standardized way to handle different agents

---

## 📐 Architecture

### Adapter Pattern

```typescript
BaseAdapter (Abstract)
    ↑
    │ extends
    │
┌───┴──────┬──────────┬──────────┬──────────┐
│          │          │          │          │
Cursor  Gemini    Claude    Continue  YourAdapter
```

**All adapters**:
1. Extend `BaseAdapter`
2. Implement required methods
3. Register in `AdapterRegistry`

---

## 🛠️ Step-by-Step Guide

### Step 1: Research the Target Agent

**Questions to Answer**:
- ✅ Where does the agent discover commands? (path)
- ✅ What format does it use? (markdown, JSON, etc)
- ✅ How to detect if installed? (executable, directory, env var)
- ✅ Any special requirements? (config files, auth, etc)

**Example Research**:
```markdown
Agent: Aider
- Commands: Via CLI flags (no file-based discovery)
- Format: Command-line arguments
- Detection: `aider --version` command exists
- Special: Not file-based, different approach needed
```

---

### Step 2: Create Adapter File

**Location**: `src/adapters/your-agent-adapter.ts`

**Template**:
```typescript
import { existsSync } from 'node:fs';
import path from 'node:path';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

export class YourAgentAdapter extends BaseAdapter {
    getName(): string {
        return 'your-agent';
    }
    
    async detect(): Promise<boolean> {
        // TODO: Implement detection logic
        return false;
    }
    
    getTargetPaths(): TargetPaths {
        // TODO: Return target paths for this agent
        return {
            commands: '.your-agent/commands',
            rules: '.your-agent/rules'
        };
    }
    
    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        // TODO: Implement installation logic
    }
    
    async uninstall(vibe: VibePackage): Promise<void> {
        // TODO: Implement uninstall logic
    }
}
```

---

### Step 3: Implement Detection

**Goal**: Determine if agent is installed on the system

**Strategies**:

1. **Check Executable**:
```typescript
async detect(): Promise<boolean> {
    try {
        await execAsync('your-agent --version');
        return true;
    } catch {
        return false;
    }
}
```

2. **Check Directory**:
```typescript
async detect(): Promise<boolean> {
    return existsSync('.your-agent/') ||
           existsSync(path.join(os.homedir(), '.your-agent'));
}
```

3. **Check Application**:
```typescript
async detect(): Promise<boolean> {
    const paths = [
        '/Applications/YourAgent.app',
        'C:\\Program Files\\YourAgent',
        process.env.YOUR_AGENT_PATH
    ];
    
    return paths.some(p => p && existsSync(p));
}
```

4. **Combined**:
```typescript
async detect(): Promise<boolean> {
    return await this.checkExecutable() ||
           this.checkDirectory() ||
           this.checkApplication();
}

private async checkExecutable(): Promise<boolean> {
    try {
        await execAsync('your-agent --version');
        return true;
    } catch {
        return false;
    }
}

private checkDirectory(): boolean {
    return existsSync('.your-agent/');
}

private checkApplication(): boolean {
    return existsSync('/Applications/YourAgent.app');
}
```

---

### Step 4: Implement getTargetPaths()

**Goal**: Define where files should be installed for this agent

**Examples**:

**Markdown-based** (similar to Cursor):
```typescript
getTargetPaths(): TargetPaths {
    return {
        commands: '.your-agent/commands',
        rules: '.your-agent/rules'
    };
}
```

**Prompt-based** (similar to Gemini):
```typescript
getTargetPaths(): TargetPaths {
    return {
        prompts: '.your-agent/prompts'
    };
}
```

**Config-based** (JSON):
```typescript
getTargetPaths(): TargetPaths {
    return {
        config: '.vscode/your-agent/config.json'
    };
}
```

---

### Step 5: Implement install()

**Goal**: Install vibe package for this agent

**Pattern 1: Direct Copy** (Same format as Cursor):
```typescript
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
```

**Pattern 2: From Cursor** (Convert Cursor format):
```typescript
async install(vibe: VibePackage, targetDir: string): Promise<void> {
    const yourAgentDir = path.join(targetDir, '.your-agent/commands');
    const cursorCommands = path.join(vibe.path, '.cursor/commands');
    
    if (existsSync(cursorCommands)) {
        await this.mergeDirectories(cursorCommands, yourAgentDir);
    }
}
```

**Pattern 3: Transpile** (Convert format):
```typescript
async install(vibe: VibePackage, targetDir: string): Promise<void> {
    const configPath = path.join(targetDir, '.your-agent/config.json');
    const cursorCommands = path.join(vibe.path, '.cursor/commands');
    
    const commands = await this.transpileMarkdownToJSON(cursorCommands);
    
    await fs.writeFile(
        configPath,
        JSON.stringify({ commands }, null, 2)
    );
}

private async transpileMarkdownToJSON(dir: string): Promise<any[]> {
    const files = await fs.readdir(dir);
    const commands = [];
    
    for (const file of files) {
        if (!file.endsWith('.md')) continue;
        
        const content = await fs.readFile(path.join(dir, file), 'utf-8');
        const { frontmatter, body } = this.parseMarkdown(content);
        
        commands.push({
            name: path.basename(file, '.md'),
            description: frontmatter.description,
            prompt: body
        });
    }
    
    return commands;
}
```

---

### Step 6: Implement uninstall()

**Basic Implementation**:
```typescript
async uninstall(vibe: VibePackage): Promise<void> {
    console.log(`Uninstalling ${vibe.name} from YourAgent...`);
}
```

**Full Implementation** (if needed):
```typescript
async uninstall(vibe: VibePackage): Promise<void> {
    const targets = this.getTargetPaths();
    
    for (const [, targetPath] of Object.entries(targets)) {
        if (!targetPath) continue;
        
        const destPath = path.join(process.cwd(), targetPath);
        
        if (existsSync(destPath)) {
            await fs.rm(destPath, { recursive: true });
        }
    }
}
```

---

### Step 7: Register Adapter

**File**: `src/adapters/index.ts`

**Add Export**:
```typescript
export { YourAgentAdapter } from './your-agent-adapter.js';
```

**Register**:
```typescript
import { YourAgentAdapter } from './your-agent-adapter.js';

AdapterRegistry.register(new YourAgentAdapter());
```

---

### Step 8: Test Adapter

**Unit Test** (optional but recommended):
```typescript
import { YourAgentAdapter } from '../your-agent-adapter.js';

describe('YourAgentAdapter', () => {
    let adapter: YourAgentAdapter;
    
    beforeEach(() => {
        adapter = new YourAgentAdapter();
    });
    
    test('getName returns correct name', () => {
        expect(adapter.getName()).toBe('your-agent');
    });
    
    test('getTargetPaths returns correct paths', () => {
        const paths = adapter.getTargetPaths();
        expect(paths.commands).toBe('.your-agent/commands');
    });
    
    // Add more tests...
});
```

**Manual Test**:
```bash
# Build
npm run build

# Test detection
vdt agents detect
# Should show your agent if installed

# Test installation
mkdir test-project && cd test-project
vdt install @vibe-devtools/basic
# Check if .your-agent/ directory created
ls -la .your-agent/

# Test commands
# Open your agent and verify commands appear
```

---

## 📚 Complete Example: Continue.dev Adapter

```typescript
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { BaseAdapter, TargetPaths, VibePackage } from './base-adapter.js';

export class ContinueAdapter extends BaseAdapter {
    getName(): string {
        return 'continue';
    }
    
    async detect(): Promise<boolean> {
        return existsSync('.vscode/continue') ||
               existsSync(path.join(os.homedir(), '.continue'));
    }
    
    getTargetPaths(): TargetPaths {
        return {
            config: '.vscode/continue/config.json'
        };
    }
    
    async install(vibe: VibePackage, targetDir: string): Promise<void> {
        const configPath = path.join(
            targetDir,
            '.vscode/continue/config.json'
        );
        
        await fs.mkdir(path.dirname(configPath), { recursive: true });
        
        let config: any = {};
        if (existsSync(configPath)) {
            const existing = await fs.readFile(configPath, 'utf-8');
            config = JSON.parse(existing);
        }
        
        const cursorCommands = path.join(vibe.path, '.cursor/commands');
        if (!existsSync(cursorCommands)) return;
        
        if (!config.slashCommands) config.slashCommands = [];
        
        const files = await fs.readdir(cursorCommands);
        for (const file of files) {
            if (!file.endsWith('.md')) continue;
            
            const content = await fs.readFile(
                path.join(cursorCommands, file),
                'utf-8'
            );
            
            const command = this.transpileToSlashCommand(file, content);
            config.slashCommands.push(command);
        }
        
        await fs.writeFile(
            configPath,
            JSON.stringify(config, null, 2)
        );
    }
    
    async uninstall(vibe: VibePackage): Promise<void> {
        console.log(`Uninstalling ${vibe.name} from Continue.dev...`);
    }
    
    private transpileToSlashCommand(
        filename: string,
        content: string
    ): any {
        const { frontmatter, body } = this.parseMarkdown(content);
        
        return {
            name: path.basename(filename, '.md'),
            description: frontmatter.description || 'Command',
            prompt: body
        };
    }
    
    private parseMarkdown(content: string): {
        frontmatter: any;
        body: string;
    } {
        const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (!match) {
            return { frontmatter: {}, body: content };
        }
        
        const frontmatter: any = {};
        const lines = match[1].split('\n');
        
        for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                frontmatter[key.trim()] = valueParts.join(':').trim();
            }
        }
        
        return {
            frontmatter,
            body: match[2].trim()
        };
    }
}
```

---

## ✅ Checklist

Before submitting your adapter:

### Code Quality
- [ ] Extends `BaseAdapter`
- [ ] All methods implemented
- [ ] TypeScript strict mode passes
- [ ] No unused imports or variables
- [ ] Follows existing code style

### Functionality
- [ ] `detect()` accurately identifies agent
- [ ] `getTargetPaths()` returns correct paths
- [ ] `install()` works without errors
- [ ] `uninstall()` cleans up properly
- [ ] Handles errors gracefully

### Testing
- [ ] Manual testing completed
- [ ] Works with at least one vibe package
- [ ] No conflicts with other adapters
- [ ] Documented test results

### Documentation
- [ ] Added to `index.ts` exports
- [ ] Registered in `AdapterRegistry`
- [ ] README updated (optional)
- [ ] Comments for complex logic

---

## 🚀 Contributing

### Pull Request Process

1. **Fork repo**
2. **Create adapter** following this guide
3. **Test thoroughly**
4. **Create PR** with:
   - Adapter implementation
   - Test results
   - Documentation updates
   - Example usage

### PR Template

```markdown
## New Adapter: [Agent Name]

**Agent**: [Name and link]
**Format**: Markdown / JSON / Other
**Detection**: Executable / Directory / Application

### Implementation
- [x] Adapter created
- [x] Detection implemented
- [x] Installation tested
- [x] Registered in registry

### Testing
- [x] Manual testing completed
- [x] Works with basic package
- [x] Works with research package
- [x] No conflicts with existing adapters

### Documentation
- [x] Code comments added
- [ ] README updated (optional)
- [ ] Testing guide included

### Screenshots
[Optional: screenshots of agent with vibe commands]
```

---

## 📊 Adapter Complexity Matrix

| Agent Type | Complexity | Time | Example |
|------------|-----------|------|---------|
| Markdown (same as Cursor) | LOW | 30min | Claude Code |
| Markdown (different path) | LOW | 1h | Gemini CLI |
| JSON config | MEDIUM | 2h | Continue, Cody |
| Custom format | HIGH | 3-4h | Custom |
| CLI-only (no files) | VERY HIGH | 4-6h | Aider |

---

## 🎯 Best Practices

### 1. Graceful Detection

```typescript
async detect(): Promise<boolean> {
    try {
        await execAsync('agent --version');
        return true;
    } catch {
        // Don't throw, return false
        return false;
    }
}
```

### 2. Error Handling

```typescript
async install(vibe: VibePackage, targetDir: string): Promise<void> {
    try {
        await this.mergeDirectories(sourcePath, destPath);
    } catch (error) {
        console.warn(`Warning: Failed to install for ${this.getName()}`);
        // Don't throw - let other adapters continue
    }
}
```

### 3. Backward Compatibility

```typescript
async install(vibe: VibePackage, targetDir: string): Promise<void> {
    const targets = vibe.agentTargets?.[this.getName()] ||
                    this.getDefaultTargets(vibe);
    
    // Use vibe.agentTargets if available (v2.0)
    // Fallback to default behavior (v1.0)
}
```

### 4. Documentation

```typescript
export class YourAgentAdapter extends BaseAdapter {
    getName(): string {
        return 'your-agent';
    }
    
    async detect(): Promise<boolean> {
        return await this.checkExecutable() ||
               this.checkApplication();
    }
    
    private async checkExecutable(): Promise<boolean> {
        try {
            await execAsync('your-agent --version');
            return true;
        } catch {
            return false;
        }
    }
}
```

---

## 💡 Tips

1. **Start Simple**: Begin with detection and basic install
2. **Test Early**: Test each method as you implement
3. **Reuse Code**: Use `BaseAdapter` helpers (mergeDirectories, etc)
4. **Study Examples**: Look at CursorAdapter, GeminiAdapter
5. **Ask for Help**: Open issue or PR draft for feedback

---

## 📖 References

- **BaseAdapter**: `src/adapters/base-adapter.ts`
- **Cursor Example**: `src/adapters/cursor-adapter.ts`
- **Gemini Example**: `src/adapters/gemini-adapter.ts`
- **Claude Example**: `src/adapters/claude-adapter.ts`
- **Design Doc**: `/vibe/vibes/memory/designs/multi-agent-adapter-architecture.md`

---

**Happy Adapter Creating!** 🚀

If you create an adapter for a new agent, please share it with the community via PR!

