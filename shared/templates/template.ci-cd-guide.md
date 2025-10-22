# CI/CD Guide - [PROJECT_NAME]

**Criado**: [DATE]
**Versão**: [VERSION]
**Workflows**: GitHub Actions

---

## Overview

Este projeto utiliza **GitHub Actions** para automação de CI/CD. Os workflows incluem:

- **CI Pipeline**: Lint, test, build em cada push/PR
- **Publish Pipeline**: Publicação automática de pacotes
- **[ADDITIONAL_WORKFLOWS]**: [DESCRIPTION]

---

## Workflows Configurados

### 1. CI Pipeline (`.github/workflows/ci.yml`)

**Trigger**:
- Push em branches: `[BRANCHES]`
- Pull Requests para: `[BRANCHES]`

**Jobs**:
- `lint`: ESLint, Prettier, TypeScript check
- `test`: Unit tests + coverage
- `build`: Compilação de artefatos

**Node Versions**: `[NODE_VERSIONS]`

**Cache Strategy**: `[PACKAGE_MANAGER]` dependencies

**Duração típica**: ~[DURATION] minutos

---

### 2. Publish Pipeline (`.github/workflows/publish.yml`)

**Trigger**:
- Push em branch `main` (após merge)
- Manual via workflow_dispatch

**Jobs**:
- `detect-changes`: Identifica packages alterados
- `publish`: Publica para npm com provenance

**Publish Targets**:
- [x] npm Registry (público)
- [ ] GitHub Packages
- [ ] Docker Hub
- [ ] [OTHER_TARGETS]

**Versioning Strategy**: [CHANGESETS / SEMANTIC_RELEASE / MANUAL]

---

### 3. [WORKFLOW_3_NAME] (`.github/workflows/[WORKFLOW_3_FILE]`)

**Trigger**: [TRIGGER_DESCRIPTION]

**Jobs**: [JOBS_DESCRIPTION]

---

## Como Fazer Release

### Monorepo (Changesets)

1. **Criar Changeset**:
   ```bash
   [PACKAGE_MANAGER] changeset
   ```
   Seguir prompts:
   - Selecionar packages alterados
   - Escolher tipo de bump (major, minor, patch)
   - Escrever descrição da mudança

2. **Commit Changeset**:
   ```bash
   git add .changeset/
   git commit -m "chore: add changeset for [FEATURE]"
   git push
   ```

3. **Merge PR**:
   - Changesets bot criará PR de release automaticamente
   - Review e merge do release PR
   - Workflows publicarão automaticamente após merge

4. **Verificar Publicação**:
   - Ver em: https://github.com/[ORG]/[REPO]/actions
   - Verificar npm: `npm view @[ORG]/[PACKAGE]`

### Single Package (Semantic Release)

1. **Fazer Commits Convencionais**:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

2. **Push para Main**:
   ```bash
   git push origin main
   ```

3. **Semantic Release Automático**:
   - Analisa commits
   - Determina versão (major/minor/patch)
   - Gera CHANGELOG
   - Cria tag Git
   - Publica para npm

---

## Secrets e Configuração

### GitHub Secrets Necessários

| Secret | Propósito | Como Obter |
|--------|-----------|------------|
| `NPM_TOKEN` | Publicar no npm | [npm.com/settings/tokens](https://www.npmjs.com/settings/[USER]/tokens) |
| [OTHER_SECRET] | [PURPOSE] | [HOW_TO_GET] |

**Adicionar secrets em**: `Settings → Secrets and variables → Actions → New repository secret`

### npm Account Setup

1. **Criar Token de Automação**:
   - Acessar: https://www.npmjs.com/settings/[USER]/tokens
   - Criar token tipo "Automation"
   - Permissions: Read and write
   - Copiar token (só aparece uma vez)

2. **Habilitar 2FA**:
   - Obrigatório para publicação
   - Acessar: https://www.npmjs.com/settings/[USER]/tfa

3. **Habilitar Provenance** (Recomendado):
   - Workflows já configurados com `--provenance`
   - Melhora security e transparency
   - Docs: https://docs.npmjs.com/generating-provenance-statements

---

## Branch Protection Rules

**Para branch `main`** (Recomendado):

```
✅ Require a pull request before merging
  ✅ Require approvals: 1
  ✅ Dismiss stale pull request approvals

✅ Require status checks to pass before merging
  ✅ Require branches to be up to date
  ✅ Status checks required:
     - lint
     - test
     - build

✅ Require conversation resolution before merging

✅ Require linear history

❌ Do not allow bypassing the above settings
```

**Configurar em**: `Settings → Branches → Branch protection rules → Add rule`

---

## Debugging Workflows

### Ver Logs de Workflow

1. Acessar: `https://github.com/[ORG]/[REPO]/actions`
2. Clicar no workflow falhado
3. Clicar no job falhado
4. Expandir step com erro

### Reproduzir Localmente

**Instalar act** (GitHub Actions local runner):
```bash
brew install act  # macOS
# ou: https://github.com/nektos/act
```

**Executar job localmente**:
```bash
act -j lint
act -j test
act -j build
```

### Erros Comuns

| Erro | Causa Provável | Solução |
|------|----------------|---------|
| `npm ERR! 404 Not Found` | Package não existe ou nome incorreto | Verificar `name` em package.json |
| `Error: No ESLint configuration found` | Config ESLint ausente | Criar `.eslintrc.js` ou adicionar em package.json |
| `401 Unauthorized` | NPM_TOKEN inválido | Gerar novo token e atualizar secret |
| `ENOENT: no such file` | Build não executou | Adicionar step de build antes |
| `Test suite failed to run` | Setup de test incorreto | Verificar jest.config.js e dependencies |

### Reexecutar Workflow Falhado

1. Ir para workflow falhado
2. Clicar "Re-run jobs" → "Re-run failed jobs"
3. Ou: "Re-run all jobs" (se mudou secrets/config)

---

## Performance e Otimização

### Caching

Workflows usam cache para acelerar builds:

```yaml
- uses: actions/setup-node@v4
  with:
    cache: '[PACKAGE_MANAGER]'
```

**Cache hit**: ~30 segundos para restore
**Cache miss**: ~2-3 minutos para install

### Paralelização

Jobs independentes rodam em paralelo:

```
lint ────┐
         ├─→ (aguardar todos)
test ────┤
         │
build ───┘
```

### Matrix Builds

Testar em múltiplas versões Node:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

Custo: 2x tempo de build (mas detecta incompatibilidades)

---

## Monitoramento

### Visualizar Status

- **Badge de Status**:
  ```markdown
  ![CI](https://github.com/[ORG]/[REPO]/workflows/CI/badge.svg)
  ```

- **GitHub Actions Tab**: Ver todos os runs
- **Email Notifications**: Configurar em Settings → Notifications

### Métricas

- **Success Rate**: % de workflows com sucesso
- **Duração Média**: Tempo médio de execução
- **Frequência**: Quantos workflows/dia

Ver em: `Actions → [Workflow] → [Menu ⋯] → View workflow runs`

---

## Troubleshooting

### Workflow Não Triggou

**Verificar**:
- [ ] Push foi para branch configurada em `on.push.branches`
- [ ] Paths modificados correspondem a `on.push.paths` (se configurado)
- [ ] Workflow file está em `.github/workflows/` (não `_github`)
- [ ] YAML é válido (sem erros de syntax)

**Validar YAML localmente**:
```bash
yamllint .github/workflows/*.yml
```

### Workflow Lento

**Causas comuns**:
- Cache miss (dependencies baixados do zero)
- Matrix builds muito largos
- Tests lentos (sem otimização)

**Otimizações**:
- Habilitar caching se ausente
- Reduzir matrix (testar apenas LTS)
- Paralelizar tests (jest --maxWorkers)

### Publish Não Funciona

**Verificar**:
- [ ] NPM_TOKEN válido e com permissões
- [ ] Versão em package.json foi incrementada
- [ ] Package name disponível no registry
- [ ] 2FA configurado no npm account
- [ ] Provenance habilitado (workflow com `id-token: write`)

---

## Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Changesets Docs](https://github.com/changesets/changesets)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [act (Local Runner)](https://github.com/nektos/act)

---

## Suporte

**Dúvidas ou problemas?**

1. Verificar esta documentação
2. Consultar logs de workflow no GitHub
3. Executar localmente com `act`
4. Abrir issue no repositório

---

_Última atualização: [DATE]_


