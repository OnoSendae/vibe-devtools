# Criando Seus Próprios Vibes

Guia completo para criar, testar e publicar vibes customizados.

---

## Índice

- [O Que é um Vibe?](#o-que-é-um-vibe)
- [Estrutura Mínima](#estrutura-mínima)
- [Criando Seu Primeiro Vibe](#criando-seu-primeiro-vibe)
- [Testando Localmente](#testando-localmente)
- [Publicando](#publicando)
- [Boas Práticas](#boas-práticas)
- [Exemplos](#exemplos)

---

## O Que é um Vibe?

Um **vibe** (ou vibe package) é um pacote de:

```
📝 Commands      → O que o agente pode fazer
📐 Rules         → Como o agente deve fazer
📋 Templates     → Estruturas reutilizáveis
⚙️ Scripts       → Automações executáveis
```

É como um "skill pack" que você instala para dar novas capacidades ao seu agente de IA.

---

## Estrutura Mínima

### Diretórios

```
my-vibe/
├── vibe.json              # Manifest (OBRIGATÓRIO)
├── package.json           # NPM metadata (para publicar)
├── README.md              # Documentação
├── .cursor/
│   ├── commands/          # Commands do vibe
│   │   └── my-command.md
│   └── rules/             # Rules (opcional)
│       └── my-rules.mdc
├── templates/             # Templates (opcional)
│   └── my-template.md
└── scripts/               # Scripts (opcional)
    └── my-script.sh
```

### Arquivos Obrigatórios

#### 1. vibe.json

```json
{
  "name": "my-vibe",
  "version": "1.0.0",
  "description": "My awesome vibe description",
  "author": "Your Name <you@email.com>",
  "license": "MIT",
  "symlinks": {
    ".cursor/commands": ".cursor/commands",
    ".cursor/rules": ".cursor/rules",
    "templates": "templates",
    "scripts": "scripts"
  },
  "commands": [
    {
      "name": "my-command",
      "category": "automation",
      "description": "Does something awesome"
    }
  ],
  "rules": [
    {
      "name": "my-rules",
      "description": "My custom rules"
    }
  ]
}
```

**Campos**:
- `name`: Nome do vibe (kebab-case)
- `version`: Semver (1.0.0)
- `description`: Descrição curta
- `symlinks`: Mapeamento de diretórios
- `commands`: Lista de commands (para documentação)
- `rules`: Lista de rules (opcional)

#### 2. package.json (para publicar)

```json
{
  "name": "@yourorg/my-vibe",
  "version": "1.0.0",
  "description": "My awesome vibe",
  "keywords": ["vibe-devtools", "vibe", "automation"],
  "author": "Your Name",
  "license": "MIT",
  "files": [
    ".cursor/",
    "templates/",
    "scripts/",
    "README.md",
    "vibe.json"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

**Importante**:
- `files`: Lista o que será publicado no npm
- `publishConfig.access`: "public" para packages @scoped

---

## Criando Seu Primeiro Vibe

Vamos criar um vibe de exemplo: **testing-tools**

### Passo 1: Criar Estrutura

```bash
# Criar diretórios
mkdir -p testing-tools/.cursor/{commands,rules}
mkdir -p testing-tools/templates
mkdir -p testing-tools/scripts

cd testing-tools
```

### Passo 2: Criar vibe.json

```bash
cat > vibe.json << 'EOF'
{
  "name": "testing-tools",
  "version": "1.0.0",
  "description": "Automated testing workflows",
  "author": "Your Name",
  "license": "MIT",
  "symlinks": {
    ".cursor/commands": ".cursor/commands",
    ".cursor/rules": ".cursor/rules",
    "templates": "templates"
  },
  "commands": [
    {
      "name": "test.run",
      "category": "testing",
      "description": "Run tests with coverage"
    }
  ]
}
EOF
```

### Passo 3: Criar Command

```bash
cat > .cursor/commands/test.run.md << 'EOF'
---
description: Run tests with coverage and generate report
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir.

## Objetivo

Executar testes automatizados com cobertura de código e gerar relatórios.

**Quando usar**: Antes de commits, PRs, ou deploys.

**Pré-requisitos**:
- Testes configurados (Jest, Vitest, etc)
- Scripts de teste em package.json

## Fluxo de Execução

### Fase 1: Validar Setup

1. Verificar se existe `package.json`
2. Verificar se existe script `test`
3. Verificar se coverage está configurado

### Fase 2: Executar Testes

1. Rodar `npm test` ou equivalente
2. Capturar output
3. Parsear resultados

### Fase 3: Gerar Report

1. Analisar coverage
2. Formatar resultados
3. Mostrar summary

### Fase 4: Validar Threshold

1. Verificar coverage mínimo
2. FAIL se abaixo de threshold
3. SUCCESS se passou

## Princípios Operacionais

### Padrões de Qualidade

- **Coverage**: Mínimo 80%
- **Report**: Sempre gerar HTML

### Tratamento de Erros

- Se testes falham: Mostrar quais e por quê
- Se sem coverage: Warning mas continuar

### Restrições

- SEMPRE rodar todos os testes
- SEMPRE gerar coverage report
- NUNCA pular testes sem avisar

## Exemplos

### Exemplo 1: Run Básico

```
Input: /test.run

Output:
✅ Testes: 42/42 passed
📊 Coverage: 87%
📄 Report: coverage/index.html
```

### Exemplo 2: Com Threshold

```
Input: /test.run --min-coverage 90

Output:
❌ Coverage 87% abaixo de threshold 90%
📋 Arquivos com baixa coverage:
   - src/utils/helper.ts: 65%
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

- [ ] Testes executados
- [ ] Coverage calculado
- [ ] Report gerado
- [ ] Threshold validado
- [ ] Output formatado
EOF
```

### Passo 4: Criar README

```bash
cat > README.md << 'EOF'
# Testing Tools Vibe

Automated testing workflows for better code quality.

## Installation

```bash
vdt install @yourorg/testing-tools
```

## Commands

- `/test.run` - Run tests with coverage

## Usage

```
/test.run
/test.run --min-coverage 90
```

## License

MIT
EOF
```

### Passo 5: Criar package.json

```bash
cat > package.json << 'EOF'
{
  "name": "@yourorg/testing-tools",
  "version": "1.0.0",
  "description": "Automated testing workflows",
  "keywords": ["vibe-devtools", "vibe", "testing"],
  "author": "Your Name",
  "license": "MIT",
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
EOF
```

---

## Testando Localmente

### Método 1: Via vdt install

```bash
# Do diretório do seu vibe
cd testing-tools

# Instalar localmente no projeto de teste
cd ../my-test-project
vdt install ../testing-tools

# Verificar
vdt list
ls -la .cursor/commands/
```

### Método 2: Via Symlink Manual

```bash
# Copiar para ~/.vibes/packages/
cp -r testing-tools ~/.vibes/packages/testing-tools@1.0.0

# Criar symlinks manualmente
ln -s ~/.vibes/packages/testing-tools@1.0.0/.cursor/commands/test.run.md .cursor/commands/
```

### Testar no Cursor

1. Abrir projeto de teste no Cursor
2. Invocar `/test.run`
3. Verificar se funciona corretamente
4. Iterar e melhorar

---

## Publicando

### Passo 1: Preparar para Publicação

```bash
# Verificar arquivos
ls -la

# Verificar package.json
cat package.json

# Verificar README
cat README.md
```

### Passo 2: Criar Conta npm (se não tiver)

```bash
npm adduser
```

### Passo 3: Publicar

```bash
# Login (se necessário)
npm login

# Publicar
npm publish

# Output:
# + @yourorg/testing-tools@1.0.0
```

### Passo 4: Verificar Publicação

```bash
# Ver no npm
npm view @yourorg/testing-tools

# Testar instalação
vdt install @yourorg/testing-tools
```

---

## Boas Práticas

### Nomenclatura

**Vibes**:
- ✅ `testing-tools`
- ✅ `api-development`
- ✅ `deploy-automation`
- ❌ `my-vibe`
- ❌ `tools`

**Commands**:
- ✅ `/category.action` (ex: `/test.run`)
- ✅ `/verb.object` (ex: `/generate.api`)
- ❌ `/command`
- ❌ `/do-stuff`

### Documentação

**README deve ter**:
- Descrição clara do vibe
- Instalação
- Lista de commands
- Exemplos de uso
- Licença

**Commands devem ter**:
- Frontmatter com description
- Seção User Input
- Objetivo claro
- Workflow em fases
- Exemplos práticos
- Checklist de qualidade

### Versionamento

Seguir [Semver](https://semver.org/):

- **Patch** (1.0.1): Bug fixes, typos
- **Minor** (1.1.0): Nova feature (backward compatible)
- **Major** (2.0.0): Breaking changes

### Keywords npm

Sempre incluir:
```json
{
  "keywords": [
    "vibe-devtools",
    "vibe",
    "[seu-domínio]"
  ]
}
```

Isso ajuda descoberta!

---

## Exemplos

### Exemplo 1: API Development Vibe

```
api-development/
├── vibe.json
├── package.json
├── README.md
├── .cursor/commands/
│   ├── api.generate-endpoint.md
│   ├── api.generate-tests.md
│   ├── api.generate-docs.md
│   └── api.deploy.md
└── templates/
    ├── endpoint-template.ts
    └── test-template.spec.ts
```

### Exemplo 2: Deploy Automation Vibe

```
deploy-automation/
├── vibe.json
├── package.json
├── .cursor/commands/
│   ├── deploy.staging.md
│   ├── deploy.production.md
│   └── deploy.rollback.md
├── scripts/
│   ├── pre-deploy.sh
│   └── post-deploy.sh
└── templates/
    └── ci-cd-config.yml
```

### Exemplo 3: Code Quality Vibe

```
code-quality/
├── vibe.json
├── .cursor/
│   ├── commands/
│   │   ├── lint.fix.md
│   │   ├── format.all.md
│   │   └── security.scan.md
│   └── rules/
│       └── code-standards.mdc
└── scripts/
    └── quality-report.js
```

---

## Compartilhar com a Comunidade

### 1. Publicar no npm

```bash
npm publish
```

### 2. Criar Issue no Repo Principal

Abra issue usando [template Custom Vibe](https://github.com/onosendae/vibe-devtools/issues/new?template=custom_vibe.md).

### 3. Compartilhar em Social Media

- Twitter/X com hashtag #vibedevtools
- LinkedIn
- Dev.to
- Reddit (r/javascript, r/typescript)

### 4. Adicionar ao Awesome List

(Futuramente teremos awesome-vibes list)

---

## Avançado

### Multi-Command Vibes

Organize commands por categoria:

```
.cursor/commands/
├── api.generate.md
├── api.test.md
├── api.deploy.md
├── db.migrate.md
└── db.seed.md
```

### Rules Complexas

```
.cursor/rules/
├── api-standards.mdc
├── database-conventions.mdc
└── testing-guidelines.mdc
```

### Scripts Executáveis

```bash
#!/bin/bash
# scripts/quality-check.sh

echo "Running quality checks..."
npm run lint
npm run test
npm run type-check
```

### Templates Reutilizáveis

```markdown
<!-- templates/api-endpoint.md -->

# Endpoint: {{ENDPOINT_NAME}}

## Route

`{{METHOD}} /api/{{PATH}}`

## Handler

```typescript
export async function {{HANDLER_NAME}}(req, res) {
  // Implementation
}
```
```

---

## Recursos

- 📚 [Template Universal de Commands](https://github.com/onosendae/vibe-devtools/blob/main/shared/templates/template.commands.md)
- 🎨 [Vibes Oficiais como Referência](https://github.com/onosendae/vibe-devtools/tree/main/packages)
- 💬 [Discussions](https://github.com/onosendae/vibe-devtools/discussions)

---

**Crie, publique e compartilhe seus vibes! 🚀**

