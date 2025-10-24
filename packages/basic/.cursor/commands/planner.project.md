---
description: Planejar projeto a partir de objetivo, gerar JSON de tasks e executar script para criar arquivos automaticamente
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Planejar projetos de software a partir de objetivo ou arquivos de contexto, gerando estrutura completa de tasks executáveis. Este command unifica planejamento e geração de tasks em um único fluxo automatizado: analisa o contexto, quebra em tasks estruturadas, cria JSON, chama script para gerar arquivos, sincroniza com Trello/Slack e salva memory do planejamento.

O output é um conjunto de tasks prontas para execução em `vibes/tasks/[FEATURE_ID]/`, com feature ID único, índices organizados, sincronização automática com ferramentas externas e registro do planejamento em `vibes/memory/` para histórico e referência.

**Quando usar**: Quando você tem um objetivo de projeto (upgrade, feature, migration, refactoring) e quer gerar tasks executáveis prontas para implementação em um único comando.

**Pré-requisitos**: 
- Script `generator.task.cjs` em `vibes/scripts/`
- Template de task em `vibes/structure/templates/template.task.md`
- Objetivo claro OU arquivos de contexto (análises, backlogs, docs)

## Descoberta & Validação

Antes de planejar, você **DEVE** validar e questionar:

### Informações Obrigatórias

1. **Fonte do Input**: Como você está fornecendo o projeto?
   - Se vazio: ERRO - Perguntar "Qual projeto você quer planejar?"
   - Se texto: Usar como objetivo
   - Se path(s): Carregar arquivo(s) como contexto

2. **Tipo de Projeto**: Qual categoria?
   - Se não claro: Inferir de palavras-chave
   - Opções: upgrade | migration | feature | refactoring | bugfix | architecture
   - Padrão: feature

3. **Auto-geração**: Executar script automaticamente?
   - Padrão: true (executa `generator.task.js`)
   - Se `--auto-generate false` nos args: apenas gera JSON

### Preferências Opcionais

1. **Feature ID**: Nome customizado para namespace?
   - Padrão: Gerar automaticamente do objetivo
   - Formato: kebab-case, máx 20 chars

2. **Profundidade**: Quantas tasks gerar?
   - Padrão: Completo (todas as fases)
   - Opções: MVP apenas | Completo | Detalhado

## Fluxo de Execução

### Fase 1: Validar e Carregar Contexto

1. **Parsear Argumentos**:
   - Extrair flags: `--auto-generate`, `--feature-id`, `--depth`
   - Separar texto do objetivo de paths de arquivos
   - Validar que ao menos um input existe

2. **Carregar Contexto de Arquivos** (se paths fornecidos):
   - Para cada path em `$ARGUMENTS`:
     * Validar que arquivo existe
     * Carregar conteúdo completo
     * Identificar tipo: análise | backlog | doc | spec
   - Consolidar todos os contextos carregados

3. **Determinar Objetivo**:
   - SE texto direto: Usar como objetivo
   - SE apenas arquivos: Extrair objetivo dos arquivos
   - SE ambos: Combinar (texto como foco + arquivos como contexto)

4. **Validar Necessidade de Backup (Princípio IX)**:
   - SE projeto é refactor estrutural OU migration OU architecture
   - SE projeto afeta > 10 arquivos
   - SE projeto modifica dependências críticas
   - **ENTÃO** incluir task de backup na Fase 1 do plano:
     * Task: "TASK-000: Criar backup antes de [operation]"
     * Prioridade: P0 (crítico)
     * Método: Git branch OU commit OU tar
     * Validação: Confirmar backup criado antes de prosseguir

**Racional**: Princípio IX garante que feature plans completos que envolvem operações drásticas incluam backup como primeira task obrigatória.

### Fase 2: Gerar Feature ID

1. **Criar Feature ID Único**:
   - Remover palavras comuns (implementar, criar, fazer, upgrade, etc)
   - Extrair palavras-chave principais
   - Converter para kebab-case
   - Truncar para máximo 20 caracteres
   
   **Exemplos**:
   ```
   "Upgrade React Native 0.62 para 0.76" → upgrade-rn-076
   "Migrar React Navigation 7.x" → migrate-nav-7
   "Implementar autenticação biométrica" → auth-biometria
   "Refatorar componentes para Pressable" → refactor-pressable
   ```

2. **Validar Unicidade**:
   ```bash
   # Verificar se feature_id já existe
   if [ -d "vibes/tasks/$FEATURE_ID" ]; then
     # Feature já existe - perguntar estratégia
   fi
   ```

3. **Se Colisão Detectada**:
   - Mostrar aviso com número de tasks existentes
   - Perguntar estratégia:
     * MERGE: Adicionar novas tasks
     * REPLACE: Sobrescrever (com backup)
     * ABORT: Cancelar
     * RENAME: Usar novo feature_id
   - Executar estratégia escolhida

### Fase 3: Analisar e Planejar Tasks

1. **Identificar Tipo de Plano**:
   - upgrade: Atualização de versão
   - migration: Mudança de lib/API
   - feature: Nova funcionalidade
   - refactoring: Melhoria de código
   - bugfix: Correção
   - architecture: Mudança estrutural

2. **Definir Fases Naturais**:
   
   **Para upgrades**:
   - Fase 0: Prerequisites & Blockers
   - Fase 1: Preparação (backup, branch)
   - Fase 2: Atualizar dependências
   - Fase 3: Código nativo
   - Fase 4: Código JS
   - Fase 5: Validação
   
   **Para features**:
   - Fase 0: Prerequisites & Blockers
   - Fase 1: Setup inicial
   - Fase 2: Implementação core
   - Fase 3: Integração
   - Fase 4: Testes
   - Fase 5: Documentação

3. **Quebrar em Tasks**:
   - Para cada fase, listar tasks necessárias
   - Cada task deve ter:
     * ID único (TASK-001, TASK-002, ...)
     * Título claro
     * Descrição
     * Prioridade (P0-P4)
     * Categoria (environment, config, code, native, validation)
     * Dependências (quais tasks antes)
     * Bloqueia (quais tasks depois)
     * Arquivos afetados
     * Passos de implementação
     * Critérios de validação
     * Tempo estimado

4. **Priorizar Tasks**:
   - **P0 (BLOCKER)**: Impede qualquer progresso
   - **P1 (CRITICAL)**: Bloqueia funcionalidade principal
   - **P2 (HIGH)**: Importante para conclusão
   - **P3 (MEDIUM)**: Recomendado mas não bloqueante
   - **P4 (LOW)**: Nice to have

### Fase 4: Criar JSON Estruturado

1. **Preparar Metadata**:
   ```json
   {
     "metadata": {
       "featureId": "upgrade-rn-076",
       "featureName": "Upgrade React Native 0.76",
       "sourcePlan": "objetivo do usuário",
       "sourceType": "execution-plan",
       "planObjective": "...",
       "planType": "upgrade",
       "totalTasks": 42,
       "totalPhases": 6,
       "estimatedComplexity": "HIGH",
       "riskLevel": "MEDIUM",
       "timestamp": "2025-10-15T..."
     }
   }
   ```

2. **Estruturar Tasks**:
   ```json
   {
     "tasks": [
       {
         "number": 1,
         "title": "Título da task",
         "priority": "P0",
         "category": "setup",
         "phase": 0,
         "estimatedTime": "10 min",
         "description": "Descrição completa...",
         "contextDescription": "Contexto adicional...",
         "affectedFiles": ["src/domain/", "src/application/"],
         "dependsOn": [],
         "blocks": ["TASK-002"],
         "implementationSteps": "1. Passo 1\n2. Passo 2",
         "implementationChecklist": "- [ ] Item 1\n- [ ] Item 2",
         "validation": "Como validar...",
         "notes": "Notas adicionais..."
       }
     ]
   }
   ```

3. **Validar JSON**:
   - Todos os campos obrigatórios presentes
   - IDs únicos
   - Dependências válidas (não circulares)
   - Prioridades corretas

### Fase 5: Executar Script (Condicional)

1. **Verificar Flag `--auto-generate`**:
   - SE não fornecida OU `true`: Executar script
   - SE `false`: Pular para Fase 7 (salvar memory apenas)

2. **Criar Pasta Temporária**:
   ```bash
   mkdir -p vibes/tasks/.temp
   ```

3. **Salvar JSON**:
   ```bash
   echo '$JSON_DATA' > vibes/tasks/.temp/serialize-[FEATURE_ID].json
   ```

4. **Executar Script**:
   ```bash
   cat vibes/tasks/.temp/serialize-[FEATURE_ID].json | \
     node vibes/scripts/generator.task.cjs
   ```

5. **Validar Resultado**:
   - Script retorna JSON com resultado
   - Verificar `errors` array vazio
   - Verificar `summary.total` == tasks esperadas
   - Validar que arquivos foram criados

6. **Limpar Temporário**:
   ```bash
   rm vibes/tasks/.temp/serialize-[FEATURE_ID].json
   ```

### Fase 6: Criar Índices

1. **Índice Específico da Feature**:
   - Criar `vibes/tasks/[FEATURE_ID]/_index.md`
   - Conteúdo:
     ```markdown
     # Task Index - [FEATURE_NAME]
     
     **Feature ID**: [FEATURE_ID]
     **Plan Type**: [TYPE]
     **Objective**: [OBJECTIVE]
     **Generated at**: [TIMESTAMP]
     
     **Total Tasks**: [N]
     **Estimated Time**: [TOTAL_TIME]
     
     ## 📊 Progress
     
     - **Completed**: 0/[N] (0%)
     - **In Progress**: 0
     - **Pending**: [N]
     
     ## 📋 Tasks by Priority
     
     ### P0 - Blocker ([N] tasks)
     - [ ] [task-ID-001](p0-bloqueador/task-[ID]-001-*.md)
     
     ### P1 - Critical ([N] tasks)
     - [ ] [task-ID-003](p1-critico/task-[ID]-003-*.md)
     ```

2. **Índice Consolidado**:
   - SE `vibes/tasks/_index.md` não existe: Criar novo
   - SE já existe: Atualizar (append nova feature)
   - Conteúdo:
     ```markdown
     # Task Index - Consolidado
     
     **Features Ativas**: X
     **Total Tasks**: X
     **Last Updated**: [TIMESTAMP]
     
     ## 📊 Resumo por Feature
     
     | Feature ID | Nome | Tasks | P0 | P1 | P2 | P3 | P4 | Progress |
     |------------|------|-------|----|----|----|----|-----|----------|
     | [ID] | [NAME] | [N] | X | X | X | X | X | 0% 🔴 |
     ```

### Fase 7: Sincronizar Trello e Slack

**⚠️ APENAS se `--auto-generate != false`**

1. **Obter Listas do Trello**:
   - Use `mcp_trello_get_lists`
   - Identifique `list_id` da lista "backlog"

2. **Criar Cards**:
   - Para cada task gerada:
     * Use `mcp_trello_add_card_to_list`
     * Nome: `[TASK_ID] - [TITLE]`
     * Descrição: Metadata da task
     * Labels: Priority (P0-P4)

3. **Persistir Estado**:
   - Criar `vibes/tasks/.sync-state.json`
   - Mapear `task_id → card_id`

4. **Notificar Slack**:
   - Use `mcp_slack_slack_post_message` (#vibe-devtools)
   - Formato:
     ```
     🎉 **Nova Feature Criada: [FEATURE_NAME]**
     
     📦 Feature ID: `[FEATURE_ID]`
     📝 Tasks Geradas: [N] tasks
     📊 Distribuição: P0: X, P1: X, P2: X, P3: X, P4: X
     
     🔗 Board: [TRELLO_URL]
     📂 Tasks: `vibes/tasks/[FEATURE_ID]/`
     
     ▶️ Próximo: `/exec.implement [FEATURE_ID]`
     ```

5. **Tratamento de Erros**:
   - SE Trello falhar: Log erro mas continue
   - SE Slack falhar: Log erro mas continue
   - Tasks locais sempre são criadas

### Fase 8: Salvar Memory do Planejamento

1. **Gerar Documento de Memory**:
   ```markdown
   # Planning Memory: [FEATURE_NAME]
   
   **Feature ID**: [FEATURE_ID]
   **Planned at**: [TIMESTAMP]
   **Type**: [PLAN_TYPE]
   
   ## Objective
   
   [OBJETIVO_ORIGINAL]
   
   ## Context
   
   **Sources**:
   - [ARQUIVO_1]
   - [ARQUIVO_2]
   
   **Key Points**:
   - [PONTO_1]
   - [PONTO_2]
   
   ## Planning Summary
   
   **Total Tasks**: [N]
   **Phases**: [N]
   **Complexity**: [LEVEL]
   **Risk**: [LEVEL]
   
   **Distribution**:
   - P0 (Blocker): X tasks
   - P1 (Critical): X tasks
   - P2 (High): X tasks
   - P3 (Medium): X tasks
   - P4 (Low): X tasks
   
   ## Key Decisions
   
   - **Decision 1**: [DECISÃO]
   - **Decision 2**: [DECISÃO]
   
   ## Risks Identified
   
   - **Risk 1**: [RISCO] - Mitigation: [MITIGAÇÃO]
   
   ## Tasks Created
   
   Tasks saved in: `vibes/tasks/[FEATURE_ID]/`
   
   See full task list: `vibes/tasks/[FEATURE_ID]/_index.md`
   ```

2. **Salvar Memory**:
   - Path: `vibes/memory/plan-[FEATURE_ID]-[TIMESTAMP].md`
   - Encoding: UTF-8

### Fase 9: Validar e Reportar

1. **Validações Finais**:
   - [ ] Feature ID único gerado
   - [ ] JSON estruturado criado
   - [ ] Script executado (se auto-generate)
   - [ ] Tasks criadas em `vibes/tasks/[FEATURE_ID]/`
   - [ ] Índices criados (`_index.md`)
   - [ ] Trello/Slack sincronizados (se auto-generate)
   - [ ] Memory salva em `vibes/memory/`

2. **Reportar Conclusão**:
   ```markdown
   ✅ Planejamento e Geração Concluídos!
   
   **Feature**: [FEATURE_NAME]
   **Feature ID**: [FEATURE_ID]
   **Type**: [PLAN_TYPE]
   
   **Tasks Geradas**: [N] tasks
   - P0 (Blocker): X tasks → vibes/tasks/[ID]/p0-bloqueador/
   - P1 (Critical): X tasks → vibes/tasks/[ID]/p1-critico/
   - P2 (High): X tasks → vibes/tasks/[ID]/p2-alto/
   - P3 (Medium): X tasks → vibes/tasks/[ID]/p3-medio/
   - P4 (Low): X tasks → vibes/tasks/[ID]/p4-baixo/
   
   **Arquivos Criados**:
   - Tasks: `vibes/tasks/[FEATURE_ID]/` ([N] arquivos)
   - Índice Feature: `vibes/tasks/[FEATURE_ID]/_index.md`
   - Índice Geral: `vibes/tasks/_index.md`
   - Memory: `vibes/memory/plan-[FEATURE_ID]-[TIMESTAMP].md`
   - Sync State: `vibes/tasks/.sync-state.json`
   
   **Integrações**:
   - ✅ Trello: X cards criados (lista "backlog")
   - ✅ Slack: Notificação enviada (#vibe-devtools)
   
   **Próximos Passos**:
   1. Revisar índice: cat vibes/tasks/[FEATURE_ID]/_index.md
   2. Ver memory: cat vibes/memory/plan-[FEATURE_ID]-*.md
   3. Iniciar execução: /exec.implement [FEATURE_ID]
   
   **Mensagem de commit sugerida**:
   ```
   feat(tasks): add [feature-name] tasks
   
   - Feature ID: [FEATURE_ID]
   - Total tasks: [N]
   - Plan type: [TYPE]
   - Memory saved in vibes/memory/
   ```
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Automatização**: Script DEVE ser executado por padrão (opt-out via flag)
- **Atomicidade**: Tasks DEVEM ser independentes e incrementais
- **Rastreabilidade**: Cada task DEVE ter origem clara (feature_id)
- **Completude**: JSON DEVE ter todos os campos obrigatórios
- **Unicidade**: Feature ID DEVE ser único (validar colisões)
- **Persistência**: Memory DEVE ser salva em `vibes/memory/`

### Tratamento de Erros

- **Se input vazio**: ERRO - Perguntar objetivo e AGUARDAR
- **Se feature_id colide**: Apresentar opções (MERGE/REPLACE/ABORT/RENAME) e AGUARDAR
- **Se script falhar**: Reportar erro detalhado mas salvar JSON e memory
- **Se Trello falhar**: Log warning mas continuar (não bloquear)
- **Se Slack falhar**: Log warning mas continuar (não bloquear)
- **Se template não existe**: Criar template básico automaticamente

### Restrições

- SEMPRE gerar feature_id único e descritivo (kebab-case, max 20 chars)
- SEMPRE validar colisões antes de criar tasks
- SEMPRE criar JSON estruturado completo
- SEMPRE salvar memory em `vibes/memory/`
- SEMPRE usar `_index.md` (minúsculo) para índices
- SEMPRE executar script por padrão (unless `--auto-generate false`)
- SEMPRE sincronizar Trello/Slack após criar tasks (se auto-generate)
- NUNCA sobrescrever tasks sem estratégia confirmada (MERGE/REPLACE)
- NUNCA usar feature_id genérico (evitar: "tasks", "plan", "temp")
- NUNCA deixar placeholders vazios no JSON
- NUNCA omitir memory do planejamento

## Scripts

### generator.task.cjs

**Propósito**: Gerar arquivos markdown de tasks a partir de JSON estruturado

**Localização**: `vibes/scripts/generator.task.cjs`

**Uso**:
```bash
cat serialize-[FEATURE_ID].json | node vibes/scripts/generator.task.cjs
```

**Input** (JSON via stdin):
```json
{
  "metadata": {
    "featureId": "...",
    "featureName": "...",
    "sourcePlan": "...",
    "sourceType": "...",
    "planObjective": "...",
    "timestamp": "..."
  },
  "tasks": [
    { "number": 1, "title": "...", ... }
  ]
}
```

**Output** (JSON):
```json
{
  "created": ["task-001.md", "task-002.md", ...],
  "errors": [],
  "summary": {
    "total": 35,
    "byPriority": { "P0": 2, "P1": 9, ... },
    "byCategory": { "setup": 2, ... }
  }
}
```

**Códigos de Erro**:
- `0`: Sucesso
- `1`: JSON inválido
- `2`: Template não encontrado
- `3`: Erro ao criar arquivos

## Templates

### template.task.md

**Propósito**: Template para geração de tasks individuais

**Localização**: `vibes/structure/templates/template.task.md`

**Usado para**: Output do script `generator.task.js`

**Estrutura**:
- Frontmatter YAML com metadata *(obrigatório)*
- Task: [TITLE] *(obrigatório)*
- Metadata section *(obrigatório)*
- Context *(obrigatório)*
- Description *(obrigatório)*
- Affected Files *(obrigatório)*
- Dependencies *(obrigatório)*
- Implementation Steps *(obrigatório)*
- Implementation Checklist *(obrigatório)*
- Validation *(obrigatório)*
- Notes *(opcional)*

## Exemplos

### Exemplo 1: Objetivo Simples → Tasks Geradas

```
Input: /planner.project "Upgrade React Native 0.62 para 0.76"

Output:
✅ Planejamento e Geração Concluídos!

**Feature**: Upgrade React Native 0.76
**Feature ID**: upgrade-rn-076
**Type**: upgrade

**Tasks Geradas**: 42 tasks
- P0 (Blocker): 3 tasks
- P1 (Critical): 8 tasks
- P2 (High): 15 tasks
- P3 (Medium): 12 tasks
- P4 (Low): 4 tasks

**Arquivos Criados**:
- Tasks: `vibes/tasks/upgrade-rn-076/` (42 arquivos)
- Índice Feature: `vibes/tasks/upgrade-rn-076/_index.md`
- Memory: `vibes/memory/plan-upgrade-rn-076-2025-10-15T14-30.md`

**Integrações**:
- ✅ Trello: 42 cards criados
- ✅ Slack: Notificação enviada

Próximo: /exec.implement upgrade-rn-076
```

### Exemplo 2: Múltiplos Arquivos de Contexto

```
Input: /planner.project vibes/plans/diagnostics/diag-*.md vibes/backlog/auth-backlog.md

Output:
✅ Planejamento e Geração Concluídos!

**Feature**: Autenticação Biométrica
**Feature ID**: auth-biometria

Contexto carregado:
- diagnostico-prereqs-2025-10-15.md
- diagnostico-projeto-2025-10-15.md
- auth-backlog.md

**Tasks Geradas**: 18 tasks
- P0: 2, P1: 5, P2: 7, P3: 3, P4: 1

Memory salva: `vibes/memory/plan-auth-biometria-2025-10-15T15-10.md`
```

### Exemplo 3: Apenas JSON (sem executar script)

```
Input: /planner.project "Migrar Navigation 7.x" --auto-generate false

Output:
✅ Planejamento Concluído (JSON gerado)!

**Feature**: Migrate Navigation 7.x
**Feature ID**: migrate-nav-7

**JSON Criado**: `vibes/tasks/.temp/serialize-migrate-nav-7.json`

⚠️ Script NÃO foi executado (--auto-generate false)

**Para gerar tasks manualmente**:
cat vibes/tasks/.temp/serialize-migrate-nav-7.json | \
  node vibes/scripts/generator.task.cjs

Memory salva: `vibes/memory/plan-migrate-nav-7-2025-10-15T16-20.md`
```

### Exemplo 4: Colisão de Feature ID

```
Input: /planner.project "Implementar System Analyzer"

Output:
⚠️ Colisão Detectada!

Feature ID "rn-analyzer" já existe com 32 tasks.
Última task: task-rn-analyzer-032-docs-readme.md

Estratégias disponíveis:
1. MERGE: Adicionar novas tasks (033, 034, ...)
2. REPLACE: Sobrescrever TODAS (backup criado)
3. ABORT: Cancelar
4. RENAME: Usar novo ID (sugestão: rn-analyzer-v2)

Escolha [1-4]: _
```

## Integração

### Posição no Workflow

**Precedido por**: 
- Ideias ou objetivos definidos
- Análises/diagnósticos existentes
- Backlogs estruturados

**Seguido por**: 
- `/exec.implement [FEATURE_ID]` (executar tasks)
- `/exec.implement` (auto-detect próxima task)

### Dependências

**Commands Obrigatórios**: Nenhum (standalone)

**Commands Opcionais**: 
- `/planner.backlog` (gerar backlog antes de planejar)
- `/analyzer` (analisar contexto antes de planejar)

**Scripts Obrigatórios**:
- `vibes/scripts/generator.task.cjs`

**Templates Obrigatórios**:
- `vibes/structure/templates/template.task.md`

### Fluxo de Dados

```
[Objetivo/Arquivos]
       ↓
  /planner.project ← VOCÊ ESTÁ AQUI
       ↓
 [JSON estruturado + Memory salva]
       ↓
 [generator.task.js]
       ↓
 [Tasks em vibes/tasks/[FEATURE_ID]/]
       ↓
 [Sincronização Trello/Slack]
       ↓
  /exec.implement
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar o planejamento completo, verifique:

### Estrutura
- [ ] Feature ID único gerado (kebab-case, max 20 chars)
- [ ] Colisões de feature_id tratadas (se existirem)
- [ ] JSON estruturado completo com metadata + tasks
- [ ] Todos os campos obrigatórios presentes no JSON
- [ ] Tasks organizadas por prioridade (P0-P4)
- [ ] Dependências entre tasks validadas (sem ciclos)

### Geração de Arquivos
- [ ] Script executado com sucesso (se auto-generate)
- [ ] Tasks criadas em `vibes/tasks/[FEATURE_ID]/`
- [ ] Subpastas criadas (p0-bloqueador, p1-critico, etc)
- [ ] Índice específico criado (`_index.md`)
- [ ] Índice consolidado atualizado (`_index.md`)
- [ ] Nenhum placeholder vazio nos arquivos gerados

### Integrações
- [ ] Trello sincronizado (cards criados)
- [ ] Slack notificado (mensagem enviada)
- [ ] Estado persistido (`.sync-state.json`)
- [ ] Erros de integração não bloquearam criação

### Memory
- [ ] Memory do planejamento salva em `vibes/memory/`
- [ ] Nome do arquivo: `plan-[FEATURE_ID]-[TIMESTAMP].md`
- [ ] Conteúdo completo (objetivo, decisões, riscos, tasks)
- [ ] Referências aos arquivos de tasks criadas

### Qualidade
- [ ] Tasks são atômicas e incrementais
- [ ] Estimativas de tempo presentes
- [ ] Critérios de validação claros
- [ ] Passos de implementação detalhados
- [ ] Categorias apropriadas (environment, config, code, etc)
