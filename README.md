# Vibes Ecosystem

Mono-repo for vibes CLI and agentic workflow packages.

## 🏗️ Structure

```
vibes-ecosystem/
├── apps/           # Applications
│   └── cli/        # vibes-cli (package manager)
├── packages/       # Publishable vibes
│   ├── research/   # @vibes/research
│   ├── basic/      # @vibes/basic
│   └── automation/ # @vibes/automation (coming soon)
├── shared/         # Shared resources
│   ├── templates/  # Universal templates
│   ├── scripts/    # Shared scripts
│   └── docs/       # Documentation
├── docs/           # Ecosystem docs
└── tools/          # Development tools
```

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Build All

```bash
pnpm build
```

### Test CLI

```bash
cd apps/cli
node dist/index.js --help
```

## 📦 Packages

### @vibes/research
Research workflows with academic rigor.

### @vibes/basic
Foundation for creating more vibes.

### vibes-cli
CLI tool to install and manage vibes.

## 🛠️ Development

### Work on CLI

```bash
pnpm --filter vibes-cli dev
```

### Publish Package

```bash
pnpm --filter @vibes/research publish
```

## 📚 Documentation

- [Creating Vibes](./docs/creating-vibes.md)
- [Workspace Strategy](./docs/workspace-strategy.md)
- [Migration Guide](./docs/migration-guide.md)

## 🤝 Contributing

See CONTRIBUTING.md

## 📝 License

MIT © Vibes Team

