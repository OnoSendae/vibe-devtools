# Guia de Contribuição

Obrigado pelo interesse em contribuir para o **Vibe DevTools**! Este documento detalha como você pode participar e ajudar a melhorar o ecosystem.

---

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Features](#sugerindo-features)
- [Contribuindo com Código](#contribuindo-com-código)
- [Criando Vibes](#criando-vibes)
- [Processo de Pull Request](#processo-de-pull-request)
- [Padrões de Código](#padrões-de-código)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Testes](#testes)
- [Commit Messages](#commit-messages)
- [Processo de Review](#processo-de-review)

---

## Código de Conduta

Este projeto adota o [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). Ao participar, você concorda em respeitar este código.

Por favor, reporte comportamentos inaceitáveis para [clebercleberhensel@gmail.com](mailto:clebercleberhensel@gmail.com).

---

## Como Posso Contribuir?

Existem várias formas de contribuir:

### 1. Reportar Bugs 🐛

Encontrou um bug? [Abra um issue](https://github.com/OnoSendae/vibe-devtools/issues/new?template=bug_report.md).

### 2. Sugerir Features ✨

Tem uma ideia? [Abra uma discussion](https://github.com/OnoSendae/vibe-devtools/discussions) ou [crie um feature request](https://github.com/OnoSendae/vibe-devtools/issues/new?template=feature_request.md).

### 3. Melhorar Documentação 📚

Documentação nunca é demais! Corrija typos, adicione exemplos ou expanda guias.

### 4. Contribuir com Código 💻

Implemente features, corrija bugs ou melhore performance.

### 5. Criar Vibes 🎨

A maior contribuição: **crie e compartilhe vibes customizados**!

---

## Reportando Bugs

### Antes de Reportar

- Verifique a [lista de issues](https://github.com/OnoSendae/vibe-devtools/issues) para ver se já foi reportado
- Tente reproduzir com a versão mais recente
- Colete informações de debug (versões, logs, screenshots)

### Como Reportar

Use o [template de bug report](https://github.com/OnoSendae/vibe-devtools/issues/new?template=bug_report.md).

**Informações essenciais**:
- Versão da CLI (`vdt --version`)
- Versão do package afetado
- Sistema operacional e versão
- Node.js version (`node -v`)
- Passos para reproduzir
- Comportamento esperado vs atual
- Logs de erro (se houver)

**Exemplo bom**:
```markdown
## Bug Report

**Versões**:
- vibe-devtools: 0.4.1
- @vibe-devtools/basic: 1.0.1
- Node.js: 20.10.0
- OS: macOS 14.0

**Passos para reproduzir**:
1. `vdt install @vibe-devtools/basic`
2. Observar erro: "EACCES: permission denied"

**Esperado**: Instalação bem-sucedida
**Atual**: Erro de permissão

**Logs**:
\`\`\`
Error: EACCES: permission denied, mkdir '~/.vibes'
\`\`\`
```

---

## Sugerindo Features

### Antes de Sugerir

- Verifique se já existe issue/discussion sobre isso
- Verifique o [roadmap](./README.md#-roadmap) para ver se está planejado
- Pense bem no **problema** que a feature resolve (não só na solução)

### Como Sugerir

Use o [template de feature request](https://github.com/OnoSendae/vibe-devtools/issues/new?template=feature_request.md).

**Estrutura boa**:
```markdown
## Feature Request

**Problema**: Como desenvolvedor, perco tempo repetindo X toda vez

**Solução proposta**: Criar command /do.x que automatiza isso

**Alternativas consideradas**: 
- Fazer manualmente (atual)
- Usar script bash (não reutilizável)

**Benefícios**:
- Economia de 30 min/dia
- Consistência 100%
- Reutilizável em todos os projetos
```

---

## Contribuindo com Código

### Workflow Geral

```bash
1. Fork o repositório
2. Clone seu fork
3. Crie uma branch
4. Desenvolva
5. Teste
6. Commit (conventional commits)
7. Push
8. Abra Pull Request
```

### Passo a Passo Detalhado

#### 1. Fork e Clone

```bash
# Fork via GitHub UI

# Clone seu fork
git clone https://github.com/SEU-USERNAME/vibe-devtools.git
cd vibe-devtools

# Adicione upstream
git remote add upstream https://github.com/onosendae/vibe-devtools.git
```

#### 2. Criar Branch

```bash
# Sincronize com upstream
git checkout main
git pull upstream main

# Crie branch descritiva
git checkout -b feat/add-list-all-command
git checkout -b fix/symlink-windows-issue
git checkout -b docs/improve-readme
```

**Convenção de nomes**:
- `feat/` - Nova feature
- `fix/` - Bug fix
- `docs/` - Documentação
- `refactor/` - Refactoring
- `test/` - Testes
- `chore/` - Manutenção

#### 3. Desenvolver

```bash
# Instalar dependências
pnpm install

# Desenvolver sua mudança
# ... código aqui ...

# Build
pnpm build

# Testar localmente
cd apps/cli
npm link
vdt --version  # Testar CLI
```

#### 4. Criar Changeset

**OBRIGATÓRIO** para qualquer mudança que afeta packages publicados:

```bash
pnpm changeset

# Selecione packages afetados
# Escolha tipo de mudança:
#   - patch: Bug fixes, typos
#   - minor: Nova feature (backward compatible)
#   - major: Breaking changes

# Escreva descrição clara da mudança
```

**Exemplo**:
```bash
$ pnpm changeset
🦋  Which packages would you like to include?
◉ @vibe-devtools/basic
◯ @vibe-devtools/research
◯ vibe-devtools

🦋  What kind of change is this for @vibe-devtools/basic?
◯ patch
◉ minor
◯ major

🦋  Please enter a summary for this change:
Add /list.all command to show all available commands
```

#### 5. Commit

```bash
git add .
git commit -m "feat(cli): add list all command"
```

Veja [Commit Messages](#commit-messages) para convenções.

#### 6. Push e PR

```bash
git push origin feat/add-list-all-command
```

Abra Pull Request no GitHub seguindo o [template](#processo-de-pull-request).

---

## Criando Vibes

A **melhor forma de contribuir** é criar vibes que estendem o ecosystem!

### Estrutura Mínima

```
my-vibe/
├── vibe.json              # Manifest
├── package.json           # NPM metadata
├── README.md              # Documentação
├── .cursor/
│   ├── commands/          # Commands do vibe
│   │   └── my-command.md
│   └── rules/             # Rules (opcional)
│       └── my-rules.mdc
└── templates/             # Templates (opcional)
    └── my-template.md
```

### vibe.json

```json
{
  "name": "my-vibe",
  "version": "1.0.0",
  "description": "My awesome vibe description",
  "author": "Your Name",
  "license": "MIT",
  "symlinks": {
    ".cursor/commands": ".cursor/commands",
    ".cursor/rules": ".cursor/rules",
    "templates": "templates"
  },
  "commands": [
    {
      "name": "my-command",
      "category": "automation",
      "description": "Does something awesome"
    }
  ]
}
```

### package.json

```json
{
  "name": "@yourorg/my-vibe",
  "version": "1.0.0",
  "description": "My awesome vibe",
  "keywords": ["vibe-devtools", "vibe", "automation"],
  "files": [
    ".cursor/",
    "templates/",
    "README.md",
    "vibe.json"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### Testar Localmente

```bash
# Instalar do diretório local
vdt install ./my-vibe

# Verificar
vdt list

# Usar
# /my-command
```

### Publicar

```bash
cd my-vibe
npm publish
```

### Compartilhar

Após publicar:
1. Adicione tag `vibe-devtools` no npm
2. Crie issue no repo principal linkando seu vibe
3. Compartilhe no Discord/Twitter/Discussions

---

## Processo de Pull Request

### Template de PR

Ao abrir PR, preencha completamente o template:

```markdown
## Descrição

Descreva claramente o que muda e por quê.

## Tipo de Mudança

- [ ] Bug fix (patch)
- [ ] Nova feature (minor)
- [ ] Breaking change (major)
- [ ] Documentação

## Mudanças Específicas

- Lista de mudanças pontuais
- Arquivos principais afetados
- Comportamentos novos/modificados

## Checklist

- [ ] Código segue padrões do projeto
- [ ] Changeset criado (se aplicável)
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Testado localmente
- [ ] Build passa sem erros
- [ ] Nenhum lint warning

## Testing

Como testar suas mudanças:
\`\`\`bash
vdt install ./packages/basic
# testar...
\`\`\`

## Screenshots

(Se aplicável)
```

### Critérios de Aprovação

Para PR ser aprovada:

✅ **Code Quality**:
- Segue [padrões de código](#padrões-de-código)
- Sem lint errors/warnings
- Build passa

✅ **Testes**:
- Testes existentes passam
- Novos testes para nova funcionalidade
- Coverage não diminui

✅ **Documentação**:
- README atualizado (se feature nova)
- Inline comments (quando necessário)
- CHANGELOG via changeset

✅ **Changeset**:
- Criado para mudanças em packages
- Descrição clara
- Tipo correto (patch/minor/major)

✅ **Commits**:
- Seguem [Conventional Commits](#commit-messages)
- Mensagens claras e descritivas

### Processo de Review

1. **Automated Checks**: CI roda build + tests
2. **Code Review**: Maintainer revisa código
3. **Feedback**: Mudanças solicitadas (se necessário)
4. **Iteração**: Você aplica feedback
5. **Aprovação**: Maintainer aprova
6. **Merge**: Squash and merge para `main`

**Tempo de resposta esperado**: 1-3 dias úteis

---

## Padrões de Código

### TypeScript Style

- **Naming**:
  - `camelCase` para variáveis e funções
  - `PascalCase` para classes e interfaces
  - `UPPER_SNAKE_CASE` para constantes
  - `kebab-case` para arquivos

- **Imports**: Ordenados (built-in → external → internal)

```typescript
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { installVibe } from '../installers/vibe-installer';
import { logger } from '../utils/logger';
```

- **Types**: Preferir interfaces para objetos, types para unions/primitives

```typescript
interface VibeConfig {
  name: string;
  version: string;
}

type Status = 'pending' | 'success' | 'error';
```

- **Error Handling**: Sempre tratar erros explicitamente

```typescript
try {
  await installVibe(source);
} catch (error) {
  if (error instanceof VibeInstallError) {
    logger.error(error.message);
  } else {
    logger.error('Unexpected error', error);
  }
  throw error;
}
```

### Markdown (Commands/Rules)

- Seguir [template universal](./shared/templates/template.commands.md)
- Frontmatter YAML válido
- Seções obrigatórias presentes
- Examples realistas

### Organização de Arquivos

```
apps/cli/src/
├── commands/          # Commands do CLI
│   ├── install.ts
│   └── list.ts
├── installers/        # Lógica de instalação
│   └── vibe-installer.ts
└── utils/             # Utilitários
    ├── logger.ts
    └── symlink-manager.ts
```

---

## Estrutura do Projeto

### Monorepo (pnpm workspaces)

```
vibes-ecosystem/
├── apps/
│   └── cli/                    # vibe-devtools CLI
│       ├── src/
│       ├── dist/
│       └── package.json
│
├── packages/
│   ├── basic/                  # @vibe-devtools/basic
│   ├── research/               # @vibe-devtools/research
│   └── [future packages...]
│
├── shared/
│   ├── templates/              # Templates compartilhados
│   └── schemas/                # JSON schemas
│
├── docs/                       # Documentação
├── .github/workflows/          # CI/CD
└── package.json                # Monorepo root
```

### Packages Principais

| Package | Descrição | Path |
|---------|-----------|------|
| `vibe-devtools` | CLI | `apps/cli/` |
| `@vibe-devtools/basic` | Foundation kit | `packages/basic/` |
| `@vibe-devtools/research` | Research kit | `packages/research/` |

---

## Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js**: 18.x ou superior
- **pnpm**: 8.x ou superior
- **Git**: 2.x ou superior

### Setup

```bash
# Clone
git clone https://github.com/SEU-USERNAME/vibe-devtools.git
cd vibe-devtools

# Instalar pnpm (se não tiver)
npm install -g pnpm

# Instalar dependências
pnpm install

# Build todos packages
pnpm build

# Linkar CLI localmente
cd apps/cli
npm link

# Testar
vdt --version
```

### Scripts Principais

```bash
# Build all
pnpm build

# Build watch mode
pnpm build --watch

# Lint
pnpm lint

# Fix lint
pnpm lint:fix

# Test (quando implementado)
pnpm test

# Criar changeset
pnpm changeset
```

### Desenvolvimento da CLI

```bash
cd apps/cli

# Build
npm run build

# Watch mode
npm run dev

# Link globalmente
npm link

# Testar
vdt install ./../../packages/basic
```

### Desenvolvimento de Package

```bash
cd packages/basic

# Editar commands
vi .cursor/commands/maker.command.md

# Testar
vdt install .
# No Cursor: /maker.command
```

---

## Testes

### Testes Manuais (Atual)

Por enquanto, testes são manuais:

```bash
# CLI
vdt install @vibe-devtools/basic
vdt list
vdt uninstall basic

# Packages
cd my-project
vdt install @vibe-devtools/basic
# Testar commands no Cursor
```

### Testes Automatizados (Futuro)

Planejado:
- Unit tests (Vitest)
- Integration tests
- E2E tests

**Contribuições de testes são super bem-vindas!**

---

## Commit Messages

Seguimos [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `refactor`: Refactoring
- `test`: Testes
- `chore`: Manutenção
- `ci`: CI/CD
- `perf`: Performance

### Scopes

- `cli`: CLI tool
- `basic`: Basic package
- `research`: Research package
- `docs`: Documentation
- `workflow`: GitHub Actions

### Examples

```bash
# Feature
feat(cli): add list all command

# Bug fix
fix(cli): resolve symlink permission error on Windows

# Documentation
docs(basic): improve maker.command examples

# Breaking change
feat(cli)!: change install command API

BREAKING CHANGE: install command now requires explicit source type
```

---

## Processo de Review

### Para Reviewers

Ao revisar PR, verificar:

**Funcionalidade**:
- [ ] Mudança resolve issue/feature request?
- [ ] Testes passam?
- [ ] Sem side effects indesejados?

**Código**:
- [ ] Segue padrões do projeto?
- [ ] Fácil de entender?
- [ ] Comentários onde necessário?
- [ ] Sem código morto?

**Documentação**:
- [ ] README atualizado?
- [ ] Exemplos adicionados?
- [ ] Changeset criado?

**Performance**:
- [ ] Sem regressões de performance?
- [ ] Uso eficiente de recursos?

### Feedback Construtivo

Ao dar feedback:
- ✅ Seja específico: "Função X poderia usar async/await" vs "Código ruim"
- ✅ Explique o porquê: "Isso melhora legibilidade porque..."
- ✅ Sugira soluções: "Que tal refatorar usando Y?"
- ❌ Evite julgamentos: "Você não sabe fazer isso?"

### Approval

Para aprovar:
```markdown
LGTM! 🚀

Código limpo, testes passam, documentação completa.
```

Para solicitar mudanças:
```markdown
Quase lá! Algumas sugestões:

1. **performance.ts:45** - Considere usar Map ao invés de objeto para lookup
2. **README.md** - Adicionar exemplo de uso
3. **Changeset** - Falta criar changeset

Após essas mudanças, aprovo! 👍
```

---

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [MIT License](./LICENSE).

---

## Dúvidas?

- **GitHub Discussions**: https://github.com/onosendae/vibe-devtools/discussions
- **Email**: clebercleberhensel@gmail.com

---

**Obrigado por contribuir para tornar o Vibe DevTools ainda melhor! 🚀✨**

