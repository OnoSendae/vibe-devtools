# Changesets

Este projeto usa [Changesets](https://github.com/changesets/changesets) para gerenciar versões e changelogs.

## Como Usar

### 1. Criar um Changeset

Após fazer mudanças em um package, crie um changeset:

```bash
pnpm changeset
```

Siga os prompts:
1. Selecione quais packages mudaram
2. Escolha o tipo de bump (patch/minor/major)
3. Escreva um resumo das mudanças

Isso cria um arquivo em `.changeset/` que descreve suas mudanças.

### 2. Commit o Changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for X"
git push
```

### 3. Versioning Automático

Quando você faz push para `main`:

1. **Changesets bot** cria/atualiza um PR "Version Packages"
2. O PR mostra exatamente quais versions serão bumped
3. Quando você merge o PR:
   - Versions são atualizadas
   - CHANGELOGs são gerados
   - Packages são publicados no npm
   - GitHub Releases são criadas

## Tipos de Bump

- **patch** (1.0.0 → 1.0.1): Bugfixes, docs, small changes
- **minor** (1.0.0 → 1.1.0): New features, non-breaking changes
- **major** (1.0.0 → 2.0.0): Breaking changes

## Exemplos

### Exemplo 1: Fix em basic

```bash
# Faz mudanças no basic
vi packages/basic/README.md

# Cria changeset
pnpm changeset
# → Select: basic
# → Type: patch
# → Summary: "Fix typos in documentation"

# Commit
git add .
git commit -m "docs: fix typos in basic README"
git push
```

### Exemplo 2: Nova feature em research

```bash
# Adiciona nova feature
vi packages/research/.cursor/commands/new-command.md

# Cria changeset
pnpm changeset
# → Select: research
# → Type: minor
# → Summary: "Add new research command for X"

# Commit
git add .
git commit -m "feat: add new research command"
git push
```

### Exemplo 3: Breaking change na CLI

```bash
# Faz breaking change
vi apps/cli/src/index.ts

# Cria changeset
pnpm changeset
# → Select: cli
# → Type: major
# → Summary: "BREAKING: change command syntax"

# Commit
git add .
git commit -m "feat!: breaking change in CLI"
git push
```

## Workflow

```
1. Dev faz mudanças
   ↓
2. Dev cria changeset
   ↓
3. Dev faz push
   ↓
4. Changesets bot cria PR "Version Packages"
   ↓
5. Reviewer aprova e faz merge
   ↓
6. Workflow automático publica packages
   ↓
7. ✅ Packages publicados no npm + GitHub Releases criadas
```

## Comandos Úteis

```bash
# Criar changeset
pnpm changeset

# Ver status dos changesets
pnpm changeset status

# Aplicar changesets (bump versions) - local only
pnpm changeset version

# Publicar packages - local only (use GitHub Actions)
pnpm changeset publish
```

## Arquivos Gerados

- `.changeset/*.md` - Changesets pendentes
- `packages/*/CHANGELOG.md` - Changelogs gerados
- `apps/*/CHANGELOG.md` - Changelogs gerados

## Regras

- ✅ SEMPRE crie um changeset para mudanças publicáveis
- ✅ Escreva resumos claros e descritivos
- ✅ Use o tipo correto (patch/minor/major)
- ❌ NUNCA bump versions manualmente
- ❌ NUNCA publique localmente (use GitHub Actions)


