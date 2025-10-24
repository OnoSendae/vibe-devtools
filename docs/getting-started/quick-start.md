# Quick Start Guide

Bem-vindo ao Vibe DevTools! Este guia te levará de zero a produtivo em **5 minutos**.

---

## 🚀 Setup Rápido (2 minutos)

### Método A: Instalação Global

```bash
# 1. Instalar CLI
npm install -g vibe-devtools

# 2. Instalar vibes essenciais
vdt install @vibe-devtools/basic
vdt install @vibe-devtools/research

# 3. Verificar
vdt list

# ✅ Pronto!
```

### Método B: Via npx (Zero Instalação)

```bash
# Instalar vibes (sempre versão latest)
npx vibe-devtools install @vibe-devtools/basic
npx vibe-devtools install @vibe-devtools/research

# Verificar
npx vibe-devtools list

# ✅ Ainda mais rápido!
```

---

## 🎯 Primeiro Uso (3 minutos)

### 1. Abrir Cursor

Abra seu projeto no Cursor (ou IDE com IA).

### 2. Invocar Primeiro Command

Digite no chat do Cursor:

```
/maker.command
```

### 3. Ver a Mágica Acontecer

O Cursor vai perguntar:

> "Qual o objetivo do command que você quer criar?"

Responda algo como:

```
Analisar performance de componentes React
```

### 4. Command Criado! 🎉

Em ~2 minutos, você terá um command profissional criado em `.cursor/commands/performance.analyze.md`.

---

## 💡 Casos de Uso Práticos

### Caso 1: Planejar Projeto Complexo

**Cenário**: Você precisa migrar de Redux para Zustand

**Solução**:
```
/planner.project "Migrar de Redux para Zustand"
```

**Resultado em 5 min**:
- ✅ 30-50 tasks atômicas criadas
- ✅ Organizadas por prioridade
- ✅ Dependências mapeadas
- ✅ Pronto para executar

**Economia**: ~4-6 horas de planning manual

---

### Caso 2: Pesquisa Profunda

**Cenário**: Você precisa decidir entre GraphQL vs tRPC

**Solução**:
```
/research.deep.pipeline "GraphQL vs tRPC for TypeScript 2025"
```

**Resultado em 30 min**:
- ✅ 30-50 fontes analisadas
- ✅ Top 20% com análise profunda
- ✅ Comparação detalhada
- ✅ Recomendação fundamentada
- ✅ Report de 10-15 páginas

**Economia**: ~4-6 horas de pesquisa manual

---

### Caso 3: Criar Command Customizado

**Cenário**: Você quer automatizar validação de PR

**Solução**:
```
/maker.command "Validar PR: lint, test, coverage, conflicts"
```

**Resultado em 2 min**:
- ✅ Command profissional criado
- ✅ Framework QUEST aplicado
- ✅ Error handling incluído
- ✅ Pronto para usar

**Economia**: ~2-3 horas de desenvolvimento

---

## 🎨 Explorar Comandos Disponíveis

### Basic Kit (8 commands)

```
/maker.command       - Criar commands customizados
/maker.rule          - Criar rules/prompts
/maker.script        - Criar scripts executáveis
/maker.prompt        - Criar prompts reutilizáveis

/planner.project     - Planejar projetos (gera tasks)
/planner.backlog     - Gerar backlogs estruturados

/constitution        - Definir governança do projeto

/vibe.manager        - Gerenciar vibes, tasks, Trello, Slack
```

### Research Kit (12 commands)

```
/research.simple.pipeline   - Pesquisa rápida (5-10 min)
/research.deep.pipeline     - Pesquisa profunda (30-40 min)
/research.expert.pipeline   - Revisão acadêmica (1-2h)

/research.search            - Busca avançada
/research.analyze           - Análise profunda
/research.synthesize        - Síntese de descobertas
/research.validate          - Validação cruzada

[+ 5 commands auxiliares]
```

---

## 📚 Workflow Completo Exemplo

Vamos fazer um workflow real do início ao fim:

### Objetivo: Implementar autenticação biométrica

#### Passo 1: Pesquisar (30 min)

```
/research.deep.pipeline "biometric authentication React Native 2025"
```

**Output**:
- Report de 12 páginas
- 8 bibliotecas analisadas
- Recomendação: `react-native-biometrics`

#### Passo 2: Planejar (5 min)

```
/planner.project "Implementar autenticação biométrica usando react-native-biometrics"
```

**Output**:
- 25 tasks geradas
- 5 fases: Setup, iOS, Android, UI, Tests
- Tasks em `vibes/tasks/auth-biometria/`

#### Passo 3: Criar Commands Customizados (5 min)

```
/maker.command "Configurar biometria no iOS"
/maker.command "Configurar biometria no Android"
/maker.command "Testar biometria em device"
```

**Output**:
- 3 commands específicos criados
- Prontos para uso imediato

#### Passo 4: Executar Tasks (implementação)

Agora execute task por task, usando os commands que criou!

**Total setup**: ~40 minutos  
**Resultado**: Semanas de trabalho estruturadas e prontas  
**ROI**: 🚀🚀🚀

---

## 🎯 Próximos Passos

Agora que você tem o básico:

### Nível Iniciante (Semana 1)

1. ✅ Explorar todos os 8 commands do basic
2. ✅ Fazer 2-3 pesquisas com research
3. ✅ Planejar um projeto pequeno
4. ✅ Ler [Guia de Uso de Packages](../guides/using-packages.md)

### Nível Intermediário (Mês 1)

1. ✅ Criar 3-5 commands customizados
2. ✅ Integrar com Trello/Slack via `/vibe.manager`
3. ✅ Estabelecer constitution do projeto
4. ✅ Ler [Guia de Criação de Vibes](../guides/creating-vibes.md)

### Nível Avançado (Mês 3+)

1. ✅ Criar seu próprio vibe package
2. ✅ Publicar no npm
3. ✅ Compartilhar com a comunidade
4. ✅ Contribuir com vibes-ecosystem

---

## 💡 Dicas Pro

### Dica 1: Alias para npx

Se usar npx, crie alias:

```bash
# Adicionar ao ~/.zshrc ou ~/.bashrc
alias vdt="npx vibe-devtools"
alias vibes="npx vibe-devtools"

# Recarregar
source ~/.zshrc

# Usar
vdt install @vibe-devtools/basic
```

### Dica 2: Explorar Templates

Vibes instalam templates em `vibes/structure/templates/`. Explore:

```bash
ls -la vibes/structure/templates/

# Ver template de command
cat vibes/structure/templates/template.commands.md

# Ver template de task
cat vibes/structure/templates/template.task.md
```

### Dica 3: Customizar após Instalar

Vibes são pontos de partida! Customize livremente:

```bash
# Editar command instalado
vi .cursor/commands/maker.command.md

# Adicionar seus exemplos
# Modificar workflow
# Adaptar ao seu contexto
```

### Dica 4: Usar vibe.manager

Para overview completo:

```
/vibe.manager
```

Mostra:
- Vibes instalados
- Memory disponível
- Tasks pendentes
- Status de integrações

### Dica 5: Ler Exemplos

Cada vibe tem exemplos em `examples/`:

```bash
cat packages/basic/examples/maker-command-search.md
cat packages/research/examples/basic-research-example.md
```

---

## 🆘 Problemas?

### Commands não aparecem

```bash
# 1. Verificar instalação
vdt list

# 2. Verificar symlinks
ls -la .cursor/commands/

# 3. Reiniciar Cursor
# Cmd/Ctrl + Shift + P → "Reload Window"
```

### Erro de permissão

```bash
# Windows: Executar como Admin ou habilitar Developer Mode
# macOS/Linux: Verificar permissões em ~/.vibes/
```

### Vibe não instala

```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
vdt install @vibe-devtools/basic
```

Mais troubleshooting: [Installation Guide](./installation.md#troubleshooting)

---

## 📖 Documentação Completa

- 📦 [Usando Packages](../guides/using-packages.md)
- 🏗️ [Criando Vibes](../guides/creating-vibes.md)
- 🎨 [Adaptadores](../guides/adapters.md)
- 📚 [API da CLI](../api/cli.md)

---

## 🎉 Pronto!

Você agora sabe o essencial para ser produtivo com Vibe DevTools.

**Próximo desafio**:
```
/planner.project "seu próximo projeto aqui"
```

Boa sorte e divirta-se! 🚀✨

