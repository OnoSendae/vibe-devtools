# @vibes/basic

> Ferramentas fundacionais para construir e planejar no ecossistema Vibes

## 🎯 Visão Geral

O `@vibes/basic` é o **meta-vibe** do ecossistema - o pacote que permite construir MAIS vibes. Ele fornece ferramentas essenciais para criar commands, rules, scripts e planejar projetos completos.

**Princípio Central**: Se você quer criar qualquer coisa no ecossistema Vibes, comece instalando o `basic`.

## 🚀 Instalação

```bash
npx vibes install basic
```

Ou via npm:

```bash
npm install -g @vibes/basic
```

## 📦 O Que Está Incluído?

### 🔧 Makers - Ferramentas de Construção

Commands para **criar** mais ferramentas:

- **`/maker.command`** - Cria novos commands usando Framework QUEST
- **`/maker.rule`** - Cria rules (.mdc) baseadas em best practices
- **`/maker.script`** - Cria scripts bash/node auxiliares
- **`/maker.prompt`** - Cria prompts reutilizáveis

### 📋 Planners - Ferramentas de Planejamento

Commands para **organizar** o trabalho:

- **`/planner.project`** - Planeja projetos completos com geração automática de tasks
- **`/planner.backlog`** - Gera backlogs estruturados de features

### ⚖️ Governance - Constituição do Projeto

- **`/constitution`** - Cria e gerencia a constituição do projeto

### 🎛️ Management - Gestão do Ecossistema

- **`/vibe.manager`** - Gerencia vibes, memory, tasks, Trello e Slack

## 🎓 Como Usar

### Cenário 1: Novo Projeto

```bash
# 1. Instalar basic
npx vibes install basic

# 2. Criar constituição (princípios do projeto)
/constitution create

# 3. Planejar primeira feature
/planner.project "Implementar autenticação de usuário"

# 4. Criar command customizado
/maker.command "Command para gerar componentes React"

# 5. Criar rules do projeto
/maker.rule "React component patterns"
```

### Cenário 2: Criar Novo Vibe

```bash
# 1. Instalar basic
npx vibes install basic

# 2. Criar commands do novo vibe
/maker.command "Research command para buscar papers"
/maker.command "Research command para sintetizar achados"

# 3. Criar rules do vibe
/maker.rule "Research citation standards"

# 4. Criar scripts de automação
/maker.script "Extract paper metadata"

# 5. Agrupar tudo em @vibes/research
# (copiar commands/rules/scripts para estrutura do vibe)

# 6. Publicar
npx vibes publish research
```

## 📚 Examples

O pacote inclui exemplos práticos em `examples/`:

### 1. **Criar Command de Busca**
`examples/maker-command-search.md` - Como criar um command de busca profunda

### 2. **Associar Commands + Scripts**
`examples/maker-script-integration.md` - Como integrar commands com scripts bash/node

### 3. **Associar Rules aos Commands**
`examples/maker-rule-integration.md` - Como criar rules que guiam commands específicos

## 🏗️ Estrutura do Pacote

```
@vibes/basic/
├── .cursor/
│   ├── commands/                 # Commands fundacionais
│   │   ├── maker.command.md
│   │   ├── maker.rule.md
│   │   ├── maker.script.md
│   │   ├── maker.prompt.md
│   │   ├── planner.project.md
│   │   ├── planner.backlog.md
│   │   ├── constitution.md
│   │   └── vibe.manager.md
│   └── rules/                    # Rules para guiar os makers/planners
│       ├── commands.mdc
│       ├── rules.mdc
│       └── planning.mdc
├── templates/                    # Templates essenciais
│   ├── template.commands.md      # Template UNIVERSAL de commands
│   └── template.task.md          # Template de tasks
├── scripts/                      # Scripts auxiliares
│   └── generator.task.cjs        # Gera tasks a partir de JSON
├── examples/                     # Exemplos práticos
│   ├── maker-command-search.md
│   ├── maker-script-integration.md
│   └── maker-rule-integration.md
├── constitution.md               # Constituição do basic
├── README.md                     # Este arquivo
├── package.json                  # Manifesto npm
└── vibe.json                     # Manifesto vibe
```

## 🎯 Conceitos-Chave

### Framework QUEST

Todos os makers seguem o Framework QUEST:

- **Q**uestion: Questionar primeiro (entender requisitos)
- **U**nderstand: Entender contexto (carregar referências)
- **E**ngineer: Engenheirar estrutura (design e planejamento)
- **S**olidify: Solidificar com templates (gerar artefatos)
- **T**est: Testar e iterar (validar qualidade)

### Templates Universais

O `@vibes/basic` usa templates universais que garantem:

- ✅ Consistência entre commands
- ✅ Completude de documentação
- ✅ Qualidade e padrões
- ✅ Integração perfeita

### Meta-Vibe Philosophy

O `basic` é um **meta-vibe** porque:

1. **Se Auto-Constrói**: Commands do basic podem criar MAIS commands
2. **É Fundacional**: Todo outro vibe pode ser construído a partir dele
3. **É Educacional**: Examples mostram como construir vibes

## 🔄 Workflow Típico

```
Install @vibes/basic
       ↓
Use /maker.command
       ↓
Create custom commands
       ↓
Use /maker.rule
       ↓
Create project rules
       ↓
Use /planner.project
       ↓
Generate tasks
       ↓
Build your vibe!
```

## 🤝 Contribuindo

Para criar novos vibes:

1. Instale o `@vibes/basic`
2. Use os makers para criar commands/rules
3. Organize em estrutura de vibe (veja `vibe.json`)
4. Publique via npm ou GitHub

## 📄 Licença

MIT

## 🔗 Links

- [Documentação Completa](https://github.com/vibes-org/basic)
- [Criar Novo Vibe](https://github.com/vibes-org/basic/docs/creating-vibes.md)
- [Examples](https://github.com/vibes-org/basic/tree/main/examples)
- [Ecosystem](https://github.com/vibes-org)

---

**@vibes/basic** - O começo de tudo 🚀

