# vibe-devtools

CLI tool to install and manage vibes (agentic command packages)

[![npm version](https://badge.fury.io/js/vibe-devtools.svg)](https://www.npmjs.com/package/vibe-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 What are Vibes?

**Vibes** are modular packages of agentic workflows that include:
- **Commands**: Structured prompts for AI tools (Cursor, Claude, Gemini)
- **Rules**: Governance and best practices
- **Templates**: Data normalization and output structures
- **Scripts**: Automated workflows for agentic processes

Think of vibes as **npm packages for AI workflows**.

---

## 🚀 Quick Start

### Install a Vibe

```bash
npx vibes install github:vibes-org/research
```

### List Installed Vibes

```bash
npx vibes list
```

### Uninstall a Vibe

```bash
npx vibes uninstall research
```

---

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g vibe-devtools
```

Then use without npx:

```bash
vibes install research
vibes list
```

### One-time Use (npx)

```bash
npx vibes install <source>
```

---

## 📚 Commands

### `vibes install <source>`

Install a vibe from GitHub, npm or local path.

**Examples**:

```bash
# From GitHub (user/repo)
vibes install github:vibes-org/research

# From GitHub with version tag
vibes install github:vibes-org/research#v2.0.0

# From local directory
vibes install ./my-vibe

# From npm (future)
vibes install @vibes/research
```

**Options**:
- `--conflict <strategy>` - Conflict resolution: skip, override, rename (default: skip)

---

### `vibes list`

List all installed vibes with version, source and install date.

**Example**:

```bash
vibes list
```

**Output**:
```
📦 Installed Vibes

┌──────────┬─────────┬────────────┬──────────────┐
│ Name     │ Version │ Source     │ Installed At │
├──────────┼─────────┼────────────┼──────────────┤
│ research │ 2.0.0   │ ./research │ 10/21/2025   │
└──────────┴─────────┴────────────┴──────────────┘

Total: 1 vibe
```

---

### `vibes uninstall <name>`

Uninstall a vibe and move to trash.

**Example**:

```bash
vibes uninstall research
```

**Options**:
- `--force` - Skip confirmation prompt

**Note**: Backup is kept in `~/.vibes/packages/.trash/` for 30 days.

---

## 🏗️ How It Works

### Storage

Vibes are stored globally in `~/.vibes/packages/`:

```
~/.vibes/
├── vibes.json              # Global manifest
├── vibes.lock.json         # Lock file (future)
├── packages/               # Installed vibes
│   └── research@2.0.0/
├── cache/                  # Download cache
└── logs/                   # Operation logs
```

### Symlinks

When you install a vibe, CLI creates symlinks in your project:

```
your-project/
├── .cursor/
│   ├── commands/  → ~/.vibes/packages/research@2.0.0/.cursor/commands/
│   └── rules/     → ~/.vibes/packages/research@2.0.0/.cursor/rules/
└── research/
    └── templates/ → ~/.vibes/packages/research@2.0.0/templates/
```

**Cross-platform**:
- **macOS/Linux**: Native symlinks
- **Windows**: Junctions or physical copy (automatic fallback)

---

## 📋 Vibe Structure

Every vibe must have a `vibe.json` manifest:

```json
{
  "name": "research",
  "version": "2.0.0",
  "description": "Research agentic workflows",
  "type": "workflow",
  "symlinks": {
    ".cursor/commands": ".cursor/commands",
    ".cursor/rules": ".cursor/rules",
    "research/templates": "templates"
  },
  "dependencies": {
    "@vibes/core": "^1.0.0"
  }
}
```

---

## 🎨 Official Vibes

### @vibes/research

Deep research workflows with academic rigor.

```bash
vibes install github:vibes-org/research
```

**Commands**:
- `/research.pipeline` - Configurable pipeline (simple/deep/expert)
- `/research.initialize` - Initialize research
- `/research.search` - Search references
- `/research.score` - Score references
- `/research.analyze` - Deep analysis
- `/research.synthesize` - Synthesize findings
- `/research.validate` - Validate and generate report

**Use cases**: Research topics, validate concepts, literature reviews

---

## 🛠️ Creating Your Own Vibes

### Minimum Structure

```
my-vibe/
├── vibe.json           # Required manifest
├── .cursor/
│   ├── commands/       # AI commands
│   └── rules/          # Governance rules
├── templates/          # Output templates
└── README.md           # Documentation
```

### vibe.json Example

```json
{
  "name": "my-vibe",
  "version": "1.0.0",
  "description": "My custom vibe",
  "symlinks": {
    ".cursor/commands": ".cursor/commands"
  }
}
```

### Test Locally

```bash
vibes install ./my-vibe
```

### Share on GitHub

1. Push to GitHub
2. Others can install: `vibes install github:you/my-vibe`

---

## 🔧 Troubleshooting

### Command not found

**Problem**: `vibes: command not found`

**Solution**:
```bash
npm install -g vibe-devtools
# or use npx
npx vibes <command>
```

### Symlink permission denied (Windows)

**Problem**: Cannot create symlinks on Windows

**Solution**: CLI automatically falls back to junction or copy. No action needed.

### Vibe not found

**Problem**: `vibe.json not found in repository`

**Solution**: Ensure repository has `vibe.json` in root directory.

### Already installed

**Problem**: `Vibe research@2.0.0 already installed`

**Solution**: 
```bash
vibes uninstall research
vibes install <source>
```

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT © Vibes Team

---

## 🔗 Links

- **GitHub**: https://github.com/vibes-org/vibe-devtools
- **NPM**: https://www.npmjs.com/package/vibe-devtools
- **Documentation**: https://github.com/vibes-org/vibe-devtools/wiki
- **Official Vibes**: https://github.com/vibes-org

---

## 💡 Tips

1. **Start simple**: Install `@vibes/research` to see what's possible
2. **Customize**: After install, you can modify commands/rules freely
3. **Share**: Create your own vibes and share with the community
4. **Update**: Keep vibes up-to-date with `vibes update` (coming soon)

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-21

