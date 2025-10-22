# CI/CD Guide - Vibe DevTools

**Sistema de Release Automático com Changesets**

## 📋 Overview

Este monorepo usa [Changesets](https://github.com/changesets/changesets) para gerenciar versões, changelogs e publicações no npm de forma **completamente automática**.

### Fluxo Completo

```
1. Dev faz mudanças → Cria changeset
   ↓
2. Push para main → CI roda (build + test)
   ↓
3. Changesets bot cria PR "Version Packages"
   ↓
4. Merge do PR → Workflow publica automaticamente
   ↓
5. ✅ Packages no npm + GitHub Releases criadas
```

---

## 🚀 Como Publicar um Package

### Passo 1: Fazer Mudanças

```bash
# Exemplo: atualizar README do basic
vi packages/basic/README.md

# ou: adicionar nova feature
vi packages/research/.cursor/commands/new-command.md
```

### Passo 2: Criar Changeset

```bash
pnpm changeset
```

Prompts:
1. **Which packages?** → Selecione os packages alterados (space para selecionar, enter para confirmar)
2. **Change type?** → patch / minor / major (ver seção abaixo)
3. **Summary** → Descreva a mudança (será incluída no CHANGELOG)

Exemplo:
```bash
$ pnpm changeset

? Which packages would you like to include? 
  ◉ @vibe-devtools/basic
  ◯ @vibe-devtools/research
  ◯ vibe-devtools

? Which packages should have a major bump?
  ◯ @vibe-devtools/basic

? Which packages should have a minor bump?
  ◯ @vibe-devtools/basic

? Which packages should have a patch bump?
  ◉ @vibe-devtools/basic

? Please enter a summary for this change:
Fix documentation typos in README

```

Isso cria: `.changeset/random-name-here.md`

### Passo 3: Commit e Push

```bash
git add .
git commit -m "docs: fix typos in basic README"
git push origin main
```

### Passo 4: Aguardar PR Automático

**O que acontece automaticamente:**

1. **CI roda** (build + test) - ~2 minutos
2. **Changesets bot** detecta o changeset
3. **PR "Version Packages"** é criado/atualizado
   - Mostra exatamente quais versions serão bumped
   - Mostra preview do CHANGELOG
   - Pode acumular múltiplos changesets

**Exemplo de PR gerado:**
```
Title: chore: version packages

Changes:
- @vibe-devtools/basic: 1.0.0 → 1.0.1
  * Fix documentation typos in README
```

### Passo 5: Mergear PR

Quando estiver pronto para publicar:

1. Revisar o PR "Version Packages"
2. Aprovar e mergear
3. **Workflow automático:**
   - ✅ Bumps versions em `package.json`
   - ✅ Atualiza `CHANGELOG.md`
   - ✅ Publica no npm
   - ✅ Cria GitHub Releases
   - ✅ Tags git

**Total: ~3-5 minutos do merge até disponível no npm**

---

## 📊 Tipos de Bump

### Patch (1.0.0 → 1.0.1)

**Quando usar:**
- Bugfixes
- Atualizações de documentação (README, docs)
- Pequenas melhorias
- Typos
- Refactorings internos

**Exemplo:**
```bash
pnpm changeset
# Select: basic
# Type: patch
# Summary: "Fix typo in installation guide"
```

### Minor (1.0.0 → 1.1.0)

**Quando usar:**
- Novas features
- Novos commands
- Novas capabilities
- **Sem** breaking changes

**Exemplo:**
```bash
pnpm changeset
# Select: research
# Type: minor
# Summary: "Add new research.github command"
```

### Major (1.0.0 → 2.0.0)

**Quando usar:**
- Breaking changes
- Remoção de features
- Mudanças incompatíveis

**Exemplo:**
```bash
pnpm changeset
# Select: cli
# Type: major
# Summary: "BREAKING: change install command syntax from 'vdt install' to 'vibes add'"
```

---

## 🔧 Workflows do GitHub Actions

### 1. Build & Test (`build.yml` + `test.yml`)

**Trigger**: Push ou PR em `main`

**Jobs**:
- Build all packages
- Validate vibe packages
- Test CLI

**Não publica** - apenas valida código.

### 2. Release (`release.yml`) ⭐ **PRINCIPAL**

**Trigger**: Push em `main`

**O que faz:**

1. **Se há changesets pendentes:**
   - Cria/atualiza PR "Version Packages"
   - Mostra preview de versions e changelogs

2. **Se PR "Version Packages" foi merged:**
   - Aplica version bumps
   - Atualiza CHANGELOGs
   - **Publica todos os packages alterados no npm**
   - **Cria GitHub Releases** para cada package
   - **Cria tags git**

**Este é o workflow que você vai usar 99% do tempo.**

### 3. Publish Manual (`publish.yml`, `publish-cli.yml`) ⚠️ DEPRECATED

**Status**: Mantidos para compatibilidade, mas **USE CHANGESETS**

Esses workflows antigos:
- Requerem bump manual de versão
- Não criam releases automaticamente
- Não geram changelogs

**Apenas use se:**
- Emergência (changesets quebrado)
- Hotfix crítico
- Rollback manual

---

## 🎯 Cenários Comuns

### Cenário 1: Update README (Patch)

```bash
# 1. Editar
vi packages/basic/README.md

# 2. Changeset
pnpm changeset
# basic → patch → "Update installation instructions"

# 3. Push
git add .
git commit -m "docs: update basic README"
git push

# 4. Aguardar PR → Mergear
# 5. ✅ basic 1.0.0 → 1.0.1 publicado automaticamente
```

### Cenário 2: Nova Feature (Minor)

```bash
# 1. Adicionar feature
vi packages/research/.cursor/commands/new-command.md

# 2. Changeset
pnpm changeset
# research → minor → "Add research.github command"

# 3. Push
git add .
git commit -m "feat: add github research command"
git push

# 4. Aguardar PR → Mergear
# 5. ✅ research 1.0.0 → 1.1.0 publicado
```

### Cenário 3: Múltiplos Packages

```bash
# 1. Fazer mudanças em basic E research
vi packages/basic/README.md
vi packages/research/templates/new-template.md

# 2. Um changeset para ambos
pnpm changeset
# Selecionar: basic (space) + research (space) + enter
# basic → patch
# research → minor
# Summary: "Update docs and add template"

# 3. Push
git add .
git commit -m "feat: updates to basic and research"
git push

# 4. PR mostrará:
#    - basic: 1.0.0 → 1.0.1
#    - research: 1.0.0 → 1.1.0

# 5. Merge → Ambos publicados juntos
```

### Cenário 4: Múltiplos Changesets (Acumular)

```bash
# Dev 1: adiciona feature
pnpm changeset  # research → minor
git push

# Dev 2: fixa bug
pnpm changeset  # research → patch
git push

# PR "Version Packages" atualiza automaticamente:
#    research: 1.0.0 → 1.1.0 (minor wins over patch)
#    Changelog inclui ambas mudanças

# Quando pronto: merge → publica 1.1.0 com tudo junto
```

---

## 🛠️ Comandos Úteis

### Ver Status

```bash
# Ver changesets pendentes
pnpm changeset status

# Output:
# @vibe-devtools/basic: patch
# @vibe-devtools/research: minor
```

### Testar Localmente (Sem Publicar)

```bash
# Ver como ficaria o bump
pnpm changeset version

# ⚠️ Isso MODIFICA package.json localmente
# Use apenas para preview, depois:
git reset --hard HEAD
```

### Validar Package Antes de Publicar

```bash
cd packages/basic
npm pack --dry-run

# Mostra o que será incluído no package
```

---

## 🔐 Configuração de Secrets

### NPM_TOKEN (Obrigatório)

**Como criar:**

```bash
# 1. Login no npm
npm login

# 2. Criar token (tipo automation)
npm token create --type=automation

# Output: npm_xxxxxxxxxxxxxxxxxxxxx

# 3. Adicionar no GitHub
# Repo → Settings → Secrets → Actions → New secret
# Name: NPM_TOKEN
# Value: [token copiado]
```

**Verificar permissões:**
- ✅ Read and write access
- ✅ Automation token (não expira)
- ✅ Acesso à org @vibe-devtools

### GITHUB_TOKEN (Automático)

Já disponível em todos os workflows. Usado para:
- Criar PRs
- Criar Releases
- Criar tags

---

## 📁 Estrutura de Arquivos

### Changesets

```
.changeset/
├── config.json              # Configuração do changesets
├── README.md                # Este guia (resumido)
└── random-name-here.md      # Changesets pendentes (criados por `pnpm changeset`)
```

### Changelogs (Gerados Automaticamente)

```
packages/basic/
└── CHANGELOG.md             # Histórico de mudanças

packages/research/
└── CHANGELOG.md

apps/cli/
└── CHANGELOG.md
```

### Workflows

```
.github/workflows/
├── release.yml              # ⭐ Principal - versioning + publish
├── build.yml                # CI - build validation
├── test.yml                 # CI - test validation
├── publish.yml              # ⚠️ Deprecated - manual publish
├── publish-cli.yml          # ⚠️ Deprecated - manual CLI
└── publish-packages.yml     # ⚠️ Deprecated - manual packages
```

---

## 🐛 Troubleshooting

### PR "Version Packages" não foi criado

**Problema**: Fez changeset + push, mas PR não apareceu

**Checklist**:
- [ ] Changesetexiste em `.changeset/*.md`?
  ```bash
  ls -la .changeset/
  ```
- [ ] CI passou? Ver [Actions](https://github.com/onosendae/vibe-devtools/actions)
- [ ] Branch é `main`? Changesets só funciona em main
- [ ] Aguardou ~2 minutos? Pode demorar um pouco

**Debug**:
```bash
# Ver changesets pendentes
pnpm changeset status

# Se houver changesets, deveria criar PR
```

### Publicação falhou

**Erro comum**: `npm ERR! 403 Forbidden`

**Causa**: NPM_TOKEN inválido ou expirado

**Solução**:
```bash
# Criar novo token
npm token create --type=automation

# Atualizar secret no GitHub
```

**Erro comum**: `npm ERR! 409 Conflict - version already exists`

**Causa**: Tentando publicar versão que já existe

**Solução**: Versão já está publicada, nada a fazer!

### CHANGELOG não gerou corretamente

**Problema**: CHANGELOG.md vazio ou incorreto

**Causa**: Changesets precisa de mensagens descritivas

**Solução**:
```bash
# Ao criar changeset, escrever mensagem clara:
pnpm changeset
# Summary: "Add new command for X" ✅
# Não: "updates" ❌
```

---

## 📚 Referências

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning (semver)](https://semver.org/)
- [GitHub Actions - Publishing Packages](https://docs.github.com/en/actions/publishing-packages)
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements)

---

## ✅ Checklist de Release

Antes de mergear PR "Version Packages":

- [ ] CI passou (build + test)
- [ ] Versions corretas (patch/minor/major adequados)
- [ ] CHANGELOG entries fazem sentido
- [ ] Mudanças testadas localmente
- [ ] Breaking changes documentados (se major)
- [ ] NPM_TOKEN válido (ver GitHub Secrets)

Após merge:

- [ ] Workflow "Release" completou (~3-5 min)
- [ ] Packages apareceram no npm:
  - https://www.npmjs.com/package/@vibe-devtools/basic
  - https://www.npmjs.com/package/@vibe-devtools/research
  - https://www.npmjs.com/package/vibe-devtools
- [ ] GitHub Releases criadas
- [ ] Tags git criadas

---

**Dúvidas?** Ver `.changeset/README.md` ou abrir issue.

**Sistema ativo desde**: 2025-10-22
**Maintainer**: @cleberhensel

