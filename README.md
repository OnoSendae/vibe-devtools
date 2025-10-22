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

### 📋 Método Recomendado (Automático)

**Para atualizar READMEs ou fazer patches:**

```bash
# Usar helper script (recomendado)
./scripts/publish-helper.sh

# Ou manualmente:
cd packages/basic
npm version patch  # 1.0.0 → 1.0.1
cd ../research
npm version patch
cd ../..

git add .
git commit -m "chore: bump packages to 1.0.1"
git push origin main

# GitHub Actions publica automaticamente! 🚀
```

**O workflow detecta mudanças em `package.json` e publica automaticamente.**

### 📦 Via Tags (Releases Importantes)

```bash
# Para releases com tag git:
cd packages/basic
npm version minor  # 1.0.0 → 1.1.0
cd ../..

git add .
git commit -m "feat: add new features to basic"
git tag packages/basic/v1.1.0
git push origin main
git push origin packages/basic/v1.1.0

# GitHub Actions publica via tag! 🚀
```

### 🎯 Via Workflow Dispatch (Manual)

1. Ir para [GitHub Actions](https://github.com/onosendae/vibe-devtools/actions)
2. Selecionar "Publish Packages to NPM"
3. Click "Run workflow"
4. Escolher package: `basic`, `research`, ou `all`
5. Click "Run workflow"

### 📖 Documentação Completa

Ver [Workflows Guide](.github/workflows/WORKFLOWS-GUIDE.md) para detalhes completos sobre:
- Como cada workflow funciona
- Quando usar cada método
- Troubleshooting
- Best practices

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
