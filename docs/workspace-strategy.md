# Workspace Strategy

**Date**: 2025-10-21  
**Version**: 1.0

---

## 🏗️ Architecture: Hybrid Multi-Workspace

### Overview

O ecossistema vibes usa **2 workspaces separados**:

1. **vibe/** - Toolkit pessoal (privado)
2. **vibes-ecosystem/** - Monorepo público (distribuível)

---

## 📂 Workspace 1: Toolkit (vibe/)

**Propósito**: Ambiente pessoal de desenvolvimento e exploração

```
vibe/
└── vibes/
    ├── memory/         # Histórico pessoal, ideias, pesquisas
    ├── tasks/          # Tasks de trabalho ativas
    ├── structure/      # Commands/rules/templates pessoais
    └── scripts/        # Automações pessoais
```

**Características**:
- ✅ Privado (não precisa ser público)
- ✅ Exploração livre
- ✅ Rascunhos e testes
- ✅ Memory persistente
- ✅ Git independente

---

## 📦 Workspace 2: Monorepo (vibes-ecosystem/)

**Propósito**: Distribuição pública de vibes e CLI

```
vibes-ecosystem/
├── apps/cli/           # vibes-cli (package manager)
├── packages/
│   ├── research/       # @vibes/research
│   ├── basic/          # @vibes/basic
│   └── automation/     # futuro
├── shared/
│   ├── templates/      # Single source of truth
│   ├── scripts/        # Compartilhados
│   └── docs/           # Documentação
└── .github/workflows/  # CI/CD
```

**Características**:
- ✅ Público (open-source)
- ✅ Packages publicáveis no npm
- ✅ CI/CD automatizado
- ✅ pnpm workspaces
- ✅ Git independente

---

## 🔄 Development Workflow

### Criar Novo Vibe

**1. Começar no Toolkit** (exploração livre):
```bash
cd vibe/vibes/structure/
mkdir commands/my-new-vibe
# Criar e testar commands
```

**2. Testar Localmente**:
```bash
# Usar commands em .cursor/
/my-vibe.action "test"
```

**3. Quando Maduro, Mover para Monorepo**:
```bash
# Criar package
mkdir vibes-ecosystem/packages/my-vibe
cp -r vibe/vibes/structure/my-vibe/* vibes-ecosystem/packages/my-vibe/

# Adicionar manifestos
# Criar vibe.json e package.json
```

**4. Publicar**:
```bash
cd vibes-ecosystem
pnpm --filter @vibes/my-vibe publish
```

---

## 🔗 Compartilhamento de Resources

### Templates

**Source of Truth**: `vibes-ecosystem/shared/templates/`

**Toolkit acessa via**:
- Cópia local em `vibe/vibes/structure/templates/`
- Ou symlink se quiser sincronização automática

### Scripts

**Source of Truth**: `vibes-ecosystem/shared/scripts/`

**Packages incluem via**:
- Copiar para package específico
- Ou referenciar shared/ diretamente

### Memory

**Estratégia**:
- Memory local: `packages/*/memory/`
- Memory centralizado: `~/.vibe/memory/[vibe].[type].[feature].[timestamp].md`
- Symlinks bidirecionais conforme necessário

---

## 🛠️ Multi-Root Workspace (VS Code)

Arquivo: `vibes-development.code-workspace`

Permite trabalhar em ambos simultaneamente:
```
Workspace
├─ 🛠️ Toolkit (vibe)
└─ 📦 Ecosystem (vibes-ecosystem)
```

**Abrir**:
```bash
code vibes-development.code-workspace
```

---

## 📊 Comparação

| Aspecto | Toolkit (vibe/) | Monorepo (vibes-ecosystem/) |
|---------|-----------------|----------------------------|
| **Versionamento** | Git independente | Git independente |
| **Visibilidade** | Privado | Público |
| **Propósito** | Exploração | Distribuição |
| **Memory** | Persistente pessoal | Exemplos e demos |
| **Commands** | Rascunhos e testes | Produção |
| **Publishing** | N/A | npm registry |

---

## 🎯 Best Practices

### DO
- ✅ Explorar livremente no toolkit
- ✅ Testar bem antes de mover para monorepo
- ✅ Manter toolkit como ambiente de rascunho
- ✅ Usar monorepo apenas para código maduro
- ✅ Sincronizar templates/scripts quando necessário

### DON'T
- ❌ Publicar código não testado
- ❌ Misturar memory pessoal com exemplos de package
- ❌ Criar dependências entre toolkit e monorepo
- ❌ Duplicar desnecessariamente

---

**Version**: 1.0  
**Last Updated**: 2025-10-21

