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

### Setup

```bash
pnpm install

# ⚠️ Se aparecer warning sobre "Ignored build scripts: esbuild"
# É seguro ignorar - feature de segurança do pnpm
# Ou aprovar: pnpm approve-builds esbuild
```

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

## 🚀 Publishing (Changesets Workflow)

Este projeto usa [Changesets](https://github.com/changesets/changesets) para versioning e publicação **completamente automáticos**.

### 🎯 Fluxo Simples

```bash
# 1. Fazer mudanças
vi packages/basic/README.md

# 2. Criar changeset (descreve a mudança)
pnpm changeset
# → Seleciona package
# → Escolhe tipo: patch/minor/major
# → Escreve resumo

# 3. Commit e push
git add .
git commit -m "docs: update README"
git push origin main

# 4. Workflow automático:
# → Cria PR "Version Packages"
# → Mostra preview de versions

# 5. Mergear PR quando pronto
# → Publica no npm automaticamente
# → Cria GitHub Releases
# → Atualiza CHANGELOGs
# → ✅ DONE!
```

### 📋 Guia Rápido

**Atualizar docs (patch):**
```bash
pnpm changeset
# basic → patch → "Fix typos in README"
git push
```

**Nova feature (minor):**
```bash
pnpm changeset
# research → minor → "Add new research command"
git push
```

**Breaking change (major):**
```bash
pnpm changeset
# cli → major → "BREAKING: change command syntax"
git push
```

### 📖 Documentação Completa

Ver [CI/CD Guide](./docs/CI-CD-GUIDE.md) para:
- Fluxo detalhado
- Troubleshooting
- Múltiplos packages
- Configuração de secrets

### ⚠️ Workflows Antigos (Deprecated)

Os workflows manuais (`publish.yml`, `publish-cli.yml`) ainda existem para emergências, mas **USE CHANGESETS** para publicações normais.

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
