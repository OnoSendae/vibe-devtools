# @vibe-devtools/basic

**Foundation Tools for Vibe-Driven Development**

[![npm version](https://img.shields.io/npm/v/@vibe-devtools/basic.svg)](https://www.npmjs.com/package/@vibe-devtools/basic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Meta-[vibe](#-o-que-é-um-vibe) que fornece ferramentas fundacionais para criar e gerenciar o ecossistema Vibes - makers, planners, constitution e management tools.

---

## 🎯 O Que é Basic?

**@vibe-devtools/basic** é o **kit fundacional** do ecosystem Vibe DevTools. É um **meta-vibe** - um vibe que permite criar outros vibes, planejar projetos, gerenciar tasks e estabelecer governança através de constituições.

### Por Que Basic?

Este é o **primeiro package** que você deve instalar. Ele fornece as ferramentas essenciais para:

- 🏗️ **Criar** novos commands, rules, scripts e prompts
- 📋 **Planejar** projetos complexos com geração automática de tasks
- 📜 **Governar** projetos com constituições e princípios
- 🔧 **Gerenciar** vibes, memory, tasks e integrações (Trello/Slack)

**É a base para tudo no Vibe DevTools.**

---

## 📘 O Que é um Vibe?

**Vibe** (ou **vibe package**) é um **pacote de comandos, rules e scripts** que estende as capacidades de agentes de IA como Cursor, GitHub Copilot e Gemini CLI.

### Conceito Central

Um vibe é como um **"skill pack"** ou **"extension"** que você instala para dar novas capacidades ao seu agente de IA:

```
Vibe Package =
  📝 Commands      → O que o agente pode fazer
  📐 Rules         → Como o agente deve fazer
  ⚙️ Scripts       → Automações executáveis
  📋 Templates     → Estruturas reutilizáveis
```

### Como Funciona

**1. Estrutura de um Vibe**:
```
my-vibe-package/
├── vibe.json                   # ← Manifest (define o vibe)
├── .cursor/
│   ├── commands/               # ← Commands do Cursor
│   │   ├── my-command.md
│   │   └── another-command.md
│   └── rules/                  # ← Rules/prompts
│       └── my-rules.mdc
├── templates/                  # ← Templates reutilizáveis
└── scripts/                    # ← Scripts executáveis
```

**2. Instalação via VDT**:
```bash
vdt install @vibe-devtools/basic

# O que acontece:
# ✅ Download do vibe
# ✅ Armazena em ~/.vibes/packages/basic@1.0.0/
# ✅ Cria symlinks para .cursor/commands/ e .cursor/rules/
# ✅ Commands ficam disponíveis no Cursor
```

**3. Uso no Cursor**:
```
# Agora você pode invocar:
/maker.command
/planner.project
/constitution
# ... todos os 8 commands do basic!
```

### Vibe vs NPM Package

| Aspecto | NPM Package | Vibe Package |
|---------|-------------|--------------|
| **Propósito** | Código JS/TS | Commands + Rules para IA |
| **Instalação** | node_modules/ | ~/.vibes/ + symlinks |
| **Uso** | `import/require` | Cursor commands |
| **Escopo** | Por projeto | Global (reuso) |
| **Conteúdo** | .js/.ts files | .md commands, .mdc rules |

### Meta-Vibe (Basic é um!)

**Basic** é especial - é um **meta-vibe**:

```
Vibe Normal:
  Fornece commands prontos
  (ex: research → /research.deep.pipeline)

Meta-Vibe (Basic):
  Fornece commands que CRIAM outros commands!
  /maker.command → cria novos commands
  /maker.rule → cria novas rules
  
  → Permite criar infinitos vibes novos!
```

### Ecosystem de Vibes

```
@vibe-devtools/basic (meta)
    ↓ (cria)
@vibe-devtools/research
@vibe-devtools/podcast
@yourorg/custom-vibe
    ↓ (todos usam)
Cursor/Copilot/Gemini
```

**Basic é o "vibe que cria vibes"** - daí ser foundational! 🏗️

[↑ Voltar ao topo](#vibe-devtoolsbasic)

---

## 📦 Instalação

### Método 1: Via CLI Instalada (Recomendado)

```bash
# 1. Instalar CLI globalmente
npm install -g vibe-devtools

# 2. Instalar basic
vdt install @vibe-devtools/basic

# 3. Pronto!
```

### Método 2: Via npx (Zero Instalação) ⭐

```bash
# Instalar diretamente sem ter a CLI
npx vibe-devtools install @vibe-devtools/basic

# Pronto! Sem pré-requisito de CLI global.
```

### 🔥 Qual Escolher?

- **CLI Global**: Se vai usar vários vibes frequentemente
- **npx**: Para experimentar ou instalação única
- **Pro tip**: Use npx para testar, depois instale CLI se gostar

---

## ✨ O Que Você Ganha

### 8 Commands Poderosos

| Command | Categoria | Descrição |
|---------|-----------|-----------|
| **maker.command** | Maker | Criar commands usando Framework QUEST |
| **maker.rule** | Maker | Criar rules baseadas em best practices |
| **maker.script** | Maker | Criar scripts auxiliares executáveis |
| **maker.prompt** | Maker | Criar prompts reutilizáveis |
| **planner.project** | Planner | Planejar projetos com auto-geração de tasks |
| **planner.backlog** | Planner | Gerar backlogs estruturados |
| **constitution** | Governance | Gerenciar constituição do projeto |
| **vibe.manager** | Management | Gerenciar vibes, memory, tasks, Trello/Slack |

### 3 Rules Essenciais

| Rule | Propósito |
|------|-----------|
| **commands.mdc** | Guidelines para criar commands de qualidade |
| **planning.mdc** | Best practices para planning atômico |
| **rules.mdc** | Como criar rules efetivas |

### Templates & Scripts

- **template.commands.md** - Template universal para commands
- **template.task.md** - Template para tasks executáveis
- **generator.task.cjs** - Script para gerar tasks de JSON

---

## 🏗️ Arquitetura

### Estrutura do Package

```
@vibe-devtools/basic/
│
├── .cursor/
│   ├── commands/               # 8 commands
│   │   ├── maker.command.md
│   │   ├── maker.rule.md
│   │   ├── maker.script.md
│   │   ├── maker.prompt.md
│   │   ├── planner.project.md
│   │   ├── planner.backlog.md
│   │   ├── constitution.md
│   │   └── vibe.manager.md
│   │
│   └── rules/                  # 3 rules
│       ├── commands.mdc
│       ├── planning.mdc
│       └── rules.mdc
│
├── templates/                  # Templates reutilizáveis
│   ├── template.commands.md
│   └── template.task.md
│
├── scripts/                    # Scripts executáveis
│   └── generator.task.cjs
│
├── examples/                   # Exemplos de uso
│   ├── maker-command-search.md
│   ├── maker-rule-integration.md
│   └── maker-script-integration.md
│
├── vibe.json                   # Manifest do vibe
├── package.json                # NPM metadata
├── constitution.md             # Princípios do basic
└── README.md                   # Este arquivo
```

### Symlinks Criados no Projeto

Quando você instala basic via `vdt install @vibe-devtools/basic`:

```
your-project/
├── .cursor/
│   ├── commands/               # ← Merged do basic
│   │   ├── maker.command.md
│   │   ├── planner.project.md
│   │   └── ...
│   └── rules/                  # ← Merged do basic
│       ├── commands.mdc
│       └── ...
│
└── vibes/
    ├── structure/
    │   └── templates/          # ← Symlinked/copied
    │       ├── template.commands.md
    │       └── template.task.md
    └── scripts/                # ← Symlinked/copied
        └── generator.task.cjs
```

---

## 📖 Commands em Detalhes

### Categoria: Makers (Criação)

#### `/maker.command`

Cria commands profissionais usando o **Framework QUEST**.

**O que faz**:
- Gera structure completa de command (frontmatter, sections, examples)
- Aplica template universal obrigatório
- Valida completude (checklist de qualidade)
- Salva em `.cursor/commands/`

**Input**: Objetivo do command
**Output**: Arquivo .md pronto para usar

---

#### `/maker.rule`

Cria rules/prompts baseadas em best practices.

**O que faz**:
- Gera rules para Cursor/Copilot
- Aplica padrões de qualidade
- Valida syntax e estrutura
- Salva em `.cursor/rules/`

---

#### `/maker.script`

Cria scripts auxiliares executáveis.

**O que faz**:
- Gera scripts bash/node/python
- Adiciona shebang e permissões
- Documenta uso e dependências
- Salva em `vibes/scripts/`

---

#### `/maker.prompt`

Cria prompts reutilizáveis.

**O que faz**:
- Gera prompts estruturados
- Aplica técnicas de prompt engineering
- Cria variações e exemplos
- Salva em `vibes/prompts/`

---

### Categoria: Planners (Planejamento)

#### `/planner.project`

Planeja projetos completos com auto-geração de tasks.

**O que faz**:
- Analisa objetivo ou arquivos de contexto
- Quebra em tasks atômicas e priorizadas
- Gera JSON estruturado
- Executa `generator.task.cjs` automaticamente
- Cria tasks em `vibes/tasks/[feature-id]/`
- Sincroniza com Trello e Slack
- Salva memory do planejamento

**Input**: Objetivo ou paths de arquivos
**Output**: 10-100+ tasks prontas para execução

---

#### `/planner.backlog`

Gera backlogs estruturados.

**O que faz**:
- Cria backlog de features/epics
- Organiza por prioridade e categoria
- Gera estimativas de complexidade
- Salva em `vibes/plans/backlog/`

---

### Categoria: Governance

#### `/constitution`

Cria e gerencia constituição do projeto.

**O que faz**:
- Gera constitution.md com princípios
- Define regras e guidelines
- Valida alinhamento
- Sincroniza com documentação

---

### Categoria: Management

#### `/vibe.manager`

Gerencia vibes, memory, tasks e integrações.

**O que faz**:
- Lista vibes instalados
- Gerencia memory (ideas, researches, assistant)
- Sincroniza Trello (boards, cards, lists)
- Gerencia Slack (channels, messages)
- Organiza tasks e planejamentos

---

## 💡 Casos de Uso & Exemplos

### Exemplo 1: Criar Um Command Novo

**Cenário**: Você quer criar um command para análise de performance

```bash
# Instalar basic (se ainda não tiver)
vdt install @vibe-devtools/basic

# No Cursor, invocar o maker
/maker.command

# IA pergunta:
# "Qual o objetivo do command?"

# Você responde:
# "Analisar performance de componentes React e gerar relatório com métricas"

# IA cria:
# .cursor/commands/performance.analyze.md
# 
# Com estrutura completa:
# - Frontmatter
# - User Input section
# - Objetivo
# - Discovery & Validation
# - Execution Workflow (5 fases)
# - Operating Principles
# - Examples (2 mínimo)
# - Context section
# - Quality Checklist

# Pronto! Command criado e validado
```

**Resultado**:
- ✅ Command profissional em 2 minutos
- ✅ Framework QUEST aplicado automaticamente
- ✅ Documentação completa incluída
- ✅ Pronto para usar: `/performance.analyze`

---

### Exemplo 2: Planejar Projeto Complexo

**Cenário**: Upgrade de React Native 0.62 → 0.76

```bash
# Invocar planner
/planner.project "Upgrade React Native para 0.76"

# IA analisa e gera:
# - Feature ID: upgrade-rn-076
# - 42 tasks em 6 fases
# - Tasks categorizadas (P0-P4)
# - Dependências mapeadas

# Output:
# vibes/tasks/upgrade-rn-076/
# ├── _index.md                    # Índice geral
# ├── p0-bloqueador/
# │   ├── task-001-criar-backup.md
# │   └── task-002-criar-branch.md
# ├── p1-critico/
# │   ├── task-003-atualizar-packagejson.md
# │   ├── task-004-atualizar-dependencies.md
# │   └── ... (6 mais)
# ├── p2-alto/
# │   └── ... (15 tasks)
# └── ...

# Trello: 42 cards criados automaticamente
# Slack: Notificação enviada
# Memory: vibes/memory/plan-upgrade-rn-076-*.md

# Próximo passo:
/exec.implement upgrade-rn-076
```

**Resultado**:
- ✅ Projeto complexo quebrado em 42 tasks atômicas
- ✅ Prioridades claras (P0 = blocker, P1 = critical)
- ✅ Estimativas de tempo (total ~18h)
- ✅ Sincronizado com Trello para tracking
- ✅ Pronto para execução incremental

---

### Exemplo 3: Governança com Constitution

**Cenário**: Estabelecer princípios de desenvolvimento no projeto

```bash
# Invocar constitution
/constitution

# IA pergunta sobre princípios do projeto
# Você define:
# - Princípio I: Zero Breaking Changes
# - Princípio II: Test-Driven Development
# - Princípio III: Code Review Obrigatório
# - ...

# IA gera:
# constitution.md
#
# Com estrutura completa:
# - Preâmbulo
# - Princípios fundamentais (I-X)
# - Guidelines de implementação
# - Enforcement e validações
# - Exceções permitidas

# Synced com:
# - .cursor/rules/constitution.mdc (regras do Cursor)
# - vibes/docs/governance/ (documentação)

# Commands passam a validar contra constituição!
```

**Resultado**:
- ✅ Princípios claros e documentados
- ✅ Enforcement automático via rules
- ✅ Alinhamento de equipe
- ✅ Decisões consistentes

---

## 🔧 Internals & Código

### generator.task.cjs

Script Node.js que gera arquivos markdown de tasks a partir de JSON.

**Como funciona**:

```javascript
// 1. Lê JSON do stdin
const input = await readStdin();
const { metadata, tasks } = JSON.parse(input);

// 2. Para cada task
for (const task of tasks) {
  // 3. Carrega template
  const template = await fs.readFile('template.task.md');
  
  // 4. Substitui placeholders
  const content = template
    .replace('{{TITLE}}', task.title)
    .replace('{{PRIORITY}}', task.priority)
    // ... todos os campos
  
  // 5. Gera path baseado em prioridade
  const folder = `vibes/tasks/${metadata.featureId}/${priorityFolder}/`;
  const filename = `task-${metadata.featureId}-${pad(task.number)}-${slug}.md`;
  
  // 6. Salva arquivo
  await fs.writeFile(path.join(folder, filename), content);
}

// 7. Retorna resultado
console.log(JSON.stringify({ created, errors, summary }));
```

**Input** (via stdin):
```json
{
  "metadata": {
    "featureId": "upgrade-rn-076",
    "featureName": "Upgrade React Native 0.76",
    "totalTasks": 42
  },
  "tasks": [
    {
      "number": 1,
      "title": "Criar backup do projeto",
      "priority": "P0",
      "category": "setup",
      "phase": 0,
      "estimatedTime": "5 min",
      "description": "...",
      "affectedFiles": ["package.json"],
      "dependsOn": [],
      "blocks": ["TASK-002"],
      "implementationSteps": "...",
      "implementationChecklist": "...",
      "validation": "..."
    }
  ]
}
```

**Output**:
```json
{
  "created": [
    "vibes/tasks/upgrade-rn-076/p0-bloqueador/task-upgrade-rn-076-001-criar-backup.md"
  ],
  "errors": [],
  "summary": {
    "total": 42,
    "byPriority": {"P0": 3, "P1": 8, "P2": 15, "P3": 12, "P4": 4},
    "byCategory": {"setup": 3, "config": 8, "code": 20, "validation": 11}
  }
}
```

---

### Templates

#### template.commands.md

Template universal para todos os commands no ecosystem.

**Seções obrigatórias**:
1. Frontmatter YAML (description)
2. Entrada do Usuário (`$ARGUMENTS`)
3. Objetivo (2-3 parágrafos + quando usar + pré-requisitos)
4. Discovery & Validation (perguntas de esclarecimento)
5. Execution Workflow (fases numeradas)
6. Operating Principles (standards, errors, constraints)
7. Examples (mínimo 2)
8. Context (`$ARGUMENTS`)
9. Quality Checklist

**Por que template universal**:
- ✅ Consistência entre todos os commands
- ✅ Documentação automática
- ✅ Fácil manutenção
- ✅ Novos commands seguem padrões

---

#### template.task.md

Template para tasks executáveis geradas pelo planner.

**Frontmatter** (metadata):
```yaml
---
featureId: upgrade-rn-076
taskId: upgrade-rn-076-003
priority: P1
category: config
phase: 1
estimatedTime: 45 min
---
```

**Seções**:
- Metadata (Feature, Priority, Category, Phase, Time)
- Context (Por que esta task existe)
- Description (O que fazer)
- Affected Files (Arquivos a modificar)
- Dependencies (Depends On, Blocks)
- Implementation Steps (Passo a passo)
- Implementation Checklist (Checklist executável)
- Validation (Como validar conclusão)
- Notes (Informações adicionais)

---

## 💡 Casos de Uso & Exemplos

### Exemplo 1: Workflow Completo de Criação

**Cenário**: Criar ecosystem completo para podcast generation

```bash
# 1. Instalar basic
vdt install @vibe-devtools/basic

# 2. Criar constitution do projeto
/constitution

# Define princípios:
# I. Qualidade > Quantidade
# II. Automação > Manual
# III. Rigor > Rapidez

# 3. Planejar features principais
/planner.project "Sistema de geração de podcasts multi-speaker"

# Gera 25 tasks em vibes/tasks/podcast-generator/

# 4. Criar commands customizados
/maker.command "Gerar roteiro de podcast a partir de tema"

# Creates: .cursor/commands/podcast.generate-script.md

# 5. Criar rule para qualidade
/maker.rule "Guidelines para geração de podcasts de alta qualidade"

# Creates: .cursor/rules/podcast-quality.mdc

# 6. Gerenciar tudo
/vibe.manager

# Dashboard interativo:
# - Vibes: basic (installed)
# - Memory: 3 items
# - Tasks: 25 pending
# - Trello: Synced
```

**Resultado em 10 minutos**:
- ✅ Constitution estabelecida
- ✅ 25 tasks planejadas
- ✅ 1 command customizado
- ✅ 1 rule de qualidade
- ✅ Tudo sincronizado e organizado

---

### Exemplo 2: Meta-Vibe (Criar Seu Próprio Vibe)

**Cenário**: Criar vibe package para content generation

```bash
# 1. Usar maker para criar commands
/maker.command "Generate blog post from topic"
/maker.command "Generate social media content"
/maker.command "Generate newsletter from articles"

# 2. Criar rule específica
/maker.rule "Content generation best practices"

# 3. Organizar em package
mkdir -p my-content-vibe/.cursor/{commands,rules}
mv .cursor/commands/generate-* my-content-vibe/.cursor/commands/
mv .cursor/rules/content-* my-content-vibe/.cursor/rules/

# 4. Criar vibe.json
cat > my-content-vibe/vibe.json << 'EOF'
{
  "name": "content",
  "version": "1.0.0",
  "description": "Content generation toolkit",
  "symlinks": {
    ".cursor/commands": ".cursor/commands",
    ".cursor/rules": ".cursor/rules"
  },
  "commands": [
    {"name": "generate.blog", "category": "content"},
    {"name": "generate.social", "category": "content"},
    {"name": "generate.newsletter", "category": "content"}
  ]
}
EOF

# 5. Testar localmente
vdt install ./my-content-vibe

# 6. Publicar
cd my-content-vibe
npm init -y
npm publish

# Agora qualquer um pode:
# vdt install @yourorg/content
```

**Resultado**:
- ✅ Vibe customizado criado com basic
- ✅ 3 commands + 1 rule
- ✅ Testado localmente
- ✅ Publicado no NPM
- ✅ **Basic se pagou sozinho!**

---

### Exemplo 3: Planejamento de Migration Complexa

**Cenário**: Migrar de Redux para Zustand em app grande

```bash
# 1. Criar backlog primeiro
/planner.backlog "Migration Redux → Zustand"

# IA gera epics:
# Epic 1: Setup Zustand
# Epic 2: Migrate Auth Store
# Epic 3: Migrate User Store
# ...

# 2. Planejar Epic 1 em detalhes
/planner.project vibes/plans/backlog/migrate-zustand-epic-1.md

# Gera tasks:
# - TASK-001: Install Zustand
# - TASK-002: Create store structure
# - TASK-003: Migrate first slice
# - ... (12 tasks)

# 3. Executar tasks
/exec.implement migrate-zustand-epic-1

# IA implementa task por task, validando cada uma

# 4. Repetir para outros epics
/planner.project vibes/plans/backlog/migrate-zustand-epic-2.md
/exec.implement migrate-zustand-epic-2

# 5. Acompanhar progresso
/vibe.manager

# Dashboard mostra:
# - Epic 1: 12/12 tasks (100% ✅)
# - Epic 2: 5/15 tasks (33% 🟡)
# - Epic 3: 0/18 tasks (0% ⏸️)
```

**Resultado**:
- ✅ Migration complexa quebrada em epics gerenciáveis
- ✅ Cada epic planejado detalhadamente
- ✅ Execução incremental e validada
- ✅ Progress tracking em tempo real
- ✅ **Projeto grande virou gerenciável!**

---

## 📊 Statistics & Impact

### Produtividade

- **Commands criados**: 2-5 min cada (vs 30-60 min manual)
- **Planning**: 5-10 min (vs 2-4 horas manual)
- **Quality**: 95%+ compliance com padrões
- **Reuso**: Templates aplicados automaticamente

### Ecosystem Impact

**Basic é o meta-vibe**:
- Permite criar infinitos outros vibes
- Cada novo vibe multiplica capacidades
- Network effect: quanto mais vibes, mais valor

**Exemplos de vibes criados com basic**:
- `research` (já existe)
- `podcast` (em desenvolvimento)
- `content` (planejado)
- `testing`, `deployment`, `monitoring` (futuros)

---

## 🔧 Customização

### Modificar Templates

```bash
# Templates estão em:
vibes/structure/templates/

# Editar template de command
vi vibes/structure/templates/template.commands.md

# Próximo command criado usará template atualizado
/maker.command "New command"
```

### Configuração

Via `vibe.json` > `config`:

```json
{
  "config": {
    "enableMakers": true,
    "enablePlanners": true,
    "defaultPlanner": "planner.project",
    "defaultMaker": "maker.command"
  }
}
```

---

## 🤝 Contributing

Este é um **meta-package** - contribuições são especialmente valiosas!

**Áreas para contribuir**:
- Novos makers (maker.test, maker.component, etc)
- Novos planners (planner.sprint, planner.epic, etc)
- Templates adicionais
- Scripts utilitários
- Melhorias no generator.task.cjs

---

## 📄 License

MIT License - Veja [LICENSE](./LICENSE)

---

## 🔗 Links

- **NPM**: https://www.npmjs.com/package/@vibe-devtools/basic
- **CLI**: https://www.npmjs.com/package/vibe-devtools
- **Org**: https://www.npmjs.com/org/vibe-devtools
- **GitHub**: https://github.com/onosendae/vibe-devtools

---

*@vibe-devtools/basic - The foundation of Vibe-Driven Development* ✨

**Part of the Vibe DevTools Ecosystem by Ono Sendae**
