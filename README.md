# Vibe DevTools - Agent Orchestration for Development

**Meta-framework for Vibe-Driven Development (VDD)**

CLI tool + Ecosystem of packages for orchestrating AI agents (Cursor, Copilot, Gemini) with commands, rules, and executable scripts.

---

## 🚀 Quick Start

### Install CLI

```bash
npm install -g vibe-devtools
```

### Install Packages

```bash
# Foundation tools (makers, planners)
vdt install @vibe-devtools/basic

# Research pipelines (simple, deep, expert)
vdt install @vibe-devtools/research

# List installed
vdt list
```

---

## 📦 Ecosystem

### CLI Tool

- **vibe-devtools** - CLI for installing and managing vibe packages
  - Commands: `install`, `list`, `uninstall`
  - Aliases: `vdt` or `vibe-devtools`
  - NPM: https://www.npmjs.com/package/vibe-devtools

### Official Packages

- **@vibe-devtools/basic** - Foundation tools (makers, planners, constitution)
- **@vibe-devtools/research** - Research pipelines (simple, deep, expert)
- **@vibe-devtools/podcast** - Podcast generation (coming soon)
- **@vibe-devtools/content** - Content creation (coming soon)

---

## 🏗️ Architecture

```
vibe-devtools (CLI)
├── Installs packages to ~/.vibes/
├── Creates symlinks to project
└── Manages global manifest

Packages (@vibe-devtools/*)
├── Commands (.cursor/commands/)
├── Rules (.cursor/rules/)
├── Templates (vibes/structure/templates/)
└── Scripts (vibes/scripts/)
```

---

## 📂 Repository Structure

```
vibe-devtools/
├── apps/
│   └── cli/                  # vibe-devtools CLI source
├── packages/
│   ├── basic/                # @vibe-devtools/basic
│   ├── research/             # @vibe-devtools/research
│   ├── podcast/              # @vibe-devtools/podcast (future)
│   └── content/              # @vibe-devtools/content (future)
├── .github/
│   └── workflows/            # CI/CD automation
├── docs/                     # Documentation
└── shared/                   # Shared utilities
```

---

## 🔧 Development

### Build CLI

```bash
cd apps/cli
npm install
npm run build
npm link  # Test locally
```

### Test Package

```bash
cd packages/basic
vdt install .  # Install from local path
```

### Run Tests

```bash
npm test
```

---

## 🚀 Publishing

### CLI (vibe-devtools)

```bash
# Manual
cd apps/cli
npm version patch
npm publish

# Automated (via tag)
git tag v0.3.0
git push origin v0.3.0
# GitHub Actions publishes automatically
```

### Packages (@vibe-devtools/*)

```bash
# Manual
cd packages/basic
npm publish

# Automated (via tag)
git tag packages/basic/v1.0.1
git push origin packages/basic/v1.0.1
# GitHub Actions publishes automatically

# Or via workflow dispatch
# Go to Actions → Publish packages → Run workflow → Select package
```

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

## 👤 Author

**Cleber Hensel** (@cleberhensel)  
**Organization**: Ono Sendae (@onosendae)

---

## 🔗 Links

- **NPM CLI**: https://www.npmjs.com/package/vibe-devtools
- **NPM Org**: https://www.npmjs.com/org/vibe-devtools
- **GitHub**: https://github.com/onosendae/vibe-devtools
- **Documentation**: https://vibe-devtools.dev (coming soon)

---

*Building the future of AI-assisted development* ✨
