---
description: Executar pipeline de pesquisa configurável orquestrando core commands
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Executar pipeline de pesquisa completo orquestrando os core commands com configuração de profundidade e automação. Este command simplifica o processo de pesquisa fornecendo 3 modos pré-configurados (simple, deep, expert) que executam automaticamente a sequência completa de commands necessários.

O pipeline orquestra: inicialização, busca, scoring, análise, síntese e validação (conforme modo selecionado), gerando todos os artefatos necessários sem necessidade de executar cada command manualmente.

**Quando usar**: Quando você quer automação completa sem precisar executar cada command manualmente.

**Quando NÃO usar**: Quando você precisa de controle fino sobre cada etapa (use core commands diretamente).

**Pré-requisitos**: Nenhum (pipeline cria tudo automaticamente)

## Descoberta & Validação

Antes de executar, você **DEVE** validar:

### Informações Obrigatórias

1. **Tema de Pesquisa**: Qual o tema principal da pesquisa?
   - Se não fornecido: ERRO - "Tema de pesquisa obrigatório"

2. **Modo**: Qual modo usar?
   - Se não fornecido: ERRO - "Modo obrigatório (simple/deep/expert)"
   - Opções: `simple` | `deep` | `expert`

### Preferências Opcionais

1. **Configurações Customizadas**: Sobrescrever configurações padrão?
   - `--max-refs N`: Máximo de referências (padrão: conforme modo)
   - `--top-percent N`: Percentual para análise (padrão: conforme modo)
   - `--no-pause`: Desabilitar todas as pausas
   - `--custom-config [PATH]`: Arquivo JSON com configuração customizada

## Fluxo de Execução

### Fase 1: Validar e Configurar

1. **Parsear Argumentos**:
   - Extrair tema de pesquisa (primeiro argumento)
   - Extrair modo (segundo argumento: simple/deep/expert)
   - Extrair flags opcionais: `--max-refs`, `--top-percent`, `--no-pause`, `--custom-config`
   - Validar que tema e modo foram fornecidos

2. **Carregar Configuração do Modo**:
   ```javascript
   const configs = {
     simple: {
       maxRefs: 20,
       topPercent: 0.25,
       pauseAfterSearch: false,
       pauseAfterScore: false,
       pauseAfterAnalyze: false,
       includeValidation: false,
       includeMetrics: false,
       description: "Pesquisa rápida com 20 refs, 5 análises, sem pausas"
     },
     deep: {
       maxRefs: 50,
       topPercent: 0.20,
       pauseAfterSearch: true,
       pauseAfterScore: true,
       pauseAfterAnalyze: false,
       includeValidation: true,
       includeMetrics: false,
       description: "Pesquisa média com 50 refs, 20% análises, 2 pausas"
     },
     expert: {
       maxRefs: 100,
       topPercent: 0.20,
       pauseAfterSearch: true,
       pauseAfterScore: true,
       pauseAfterAnalyze: true,
       includeValidation: true,
       includeMetrics: true,
       description: "Pesquisa completa com 100+ refs, validação e métricas"
     }
   };
   
   const config = configs[mode];
   ```

3. **Aplicar Configurações Customizadas**:
   - Se `--max-refs` fornecido: Sobrescrever `config.maxRefs`
   - Se `--top-percent` fornecido: Sobrescrever `config.topPercent`
   - Se `--no-pause` fornecido: Desabilitar todas as pausas
   - Se `--custom-config` fornecido: Carregar e mesclar configuração

4. **Validar Configuração Final**:
   - Max refs: Min 10, Max 200
   - Top percent: Min 0.05 (5%), Max 0.50 (50%)
   - Validar que configuração é coerente

### Fase 2: Executar Core Commands Sequencialmente

#### 2.1 Inicializar Pesquisa

**Command**: `/research.initialize [tema]`

**O que faz**:
- Gera research ID único
- Cria estrutura de diretórios
- Inicializa metadata.json
- Define objetivo da pesquisa

**Output esperado**:
- Research ID gerado
- Estrutura de diretórios criada
- Metadata.json inicializado

**Log**:
```markdown
[1/7] Inicializando pesquisa...
✅ Research ID: [RESEARCH_ID]
```

#### 2.2 Buscar Referências

**Command**: `/research.search [research-id] --max-refs [config.maxRefs]`

**O que faz**:
- Busca referências na web (web_search)
- Coleta até maxRefs referências
- Salva em metadata.json
- Gera estatísticas de busca

**Output esperado**:
- Referências coletadas e salvas
- Estatísticas de busca
- Distribuição por categoria

**PAUSA** (se `config.pauseAfterSearch == true`):
```markdown
⏸️ PAUSA: Revisar resultados da busca?

**Referências encontradas**: [N]
**Distribuição por categoria**:
- documentation: [N]
- blog: [N]
- tutorial: [N]
- academic: [N]

**Continuar com análise?** (sim/não)
```

**Log**:
```markdown
[2/7] Buscando referências...
✅ [N] referências encontradas
```

#### 2.3 Scoring e Priorização

**Command**: `/research.score [research-id] --top-percent [config.topPercent]`

**O que faz**:
- Pontua todas as referências (0-10)
- Calcula 5 dimensões (credibilidade, relevância, recência, profundidade, autoridade)
- Identifica top % para análise
- Gera relatório de scoring

**Output esperado**:
- Todas as referências pontuadas
- Top % identificado
- Relatório de scoring
- Estatísticas de distribuição

**PAUSA** (se `config.pauseAfterScore == true`):
```markdown
⏸️ PAUSA: Aprovar lista de referências para análise?

**Top [X]% selecionado**: [N] referências
**Score threshold**: ≥ [THRESHOLD]/10

**Top 5 Referências**:
1. [TITLE] - [SCORE]/10
2. [TITLE] - [SCORE]/10
3. [TITLE] - [SCORE]/10
4. [TITLE] - [SCORE]/10
5. [TITLE] - [SCORE]/10

**Continuar com análise profunda?** (sim/não)
```

**Log**:
```markdown
[3/7] Scoring e priorização...
✅ [N] referências pontuadas
✅ Top [X]% identificado: [N] referências
```

#### 2.4 Análise Profunda

**Command**: `/research.analyze [research-id]`

**O que faz**:
- Analisa referências top-scored em profundidade
- Gera relatório individual para cada referência
- Executa sínteses incrementais (a cada 10 refs)
- Identifica key findings, quotes e avaliações

**Output esperado**:
- Análises individuais salvas em `references/`
- Sínteses incrementais geradas
- Índice de referências analisadas
- Estatísticas de análise

**PAUSA** (se `config.pauseAfterAnalyze == true`):
```markdown
⏸️ PAUSA: Revisar progresso da análise?

**Referências analisadas**: [N]/[TOTAL]
**Sínteses incrementais**: [N]
**Key findings identificados**: [N]

**Continuar com síntese final?** (sim/não)
```

**Log**:
```markdown
[4/7] Análise profunda...
✅ [N] análises completas
✅ [N] sínteses incrementais geradas
```

#### 2.5 Síntese Final

**Command**: `/research.synthesize [research-id] --final`

**O que faz**:
- Consolida todas as análises
- Identifica padrões e consensos
- Mapeia divergências e gaps
- Gera síntese final consolidada

**Output esperado**:
- Síntese final salva em `syntheses/SYNTH-FINAL.md`
- Padrões identificados
- Consensos mapeados
- Gaps documentados

**Log**:
```markdown
[5/7] Síntese final...
✅ Síntese final consolidada
✅ [N] padrões identificados
✅ [N] consensos mapeados
```

#### 2.6 Validação Cruzada (se `config.includeValidation == true`)

**Command**: `/research.validate [research-id]`

**O que faz**:
- Executa validação cruzada de findings
- Identifica vieses
- Mapeia consensos e divergências com confidence
- Gera relatório final completo multi-parte

**Output esperado**:
- Relatório de validação
- Consensos com confidence levels
- Divergências analisadas
- Vieses identificados
- Relatório final completo (9 capítulos)

**Log**:
```markdown
[6/7] Validação cruzada...
✅ [N] consensos identificados
✅ [N] divergências mapeadas
✅ [N] vieses detectados
✅ Relatório final gerado
```

#### 2.7 Métricas de Qualidade (se `config.includeMetrics == true`)

**Command**: Gerar métricas de qualidade

**O que faz**:
- Calcula scores de qualidade (completude, profundidade, diversidade, recência, confiabilidade)
- Gera score geral (0-10)
- Salva métricas em JSON
- Cria relatório de métricas

**Output esperado**:
- Métricas de qualidade calculadas
- Score geral
- Arquivo `metrics/quality-metrics.json`
- Relatório de métricas

**Log**:
```markdown
[7/7] Métricas de qualidade...
✅ Score geral: [SCORE]/10
✅ Métricas salvas
```

### Fase 3: Consolidar e Reportar

1. **Gerar Relatório Consolidado**:
   ```markdown
   🎉 Pipeline [MODE] Concluído com Sucesso!
   
   **Research ID**: [RESEARCH_ID]
   **Tema**: [TEMA]
   **Modo**: [MODE]
   **Tempo de execução**: [TEMPO]
   
   ## Resumo
   
   **Referências**:
   - Encontradas: [N]
   - Pontuadas: [N]
   - Analisadas: [N] (top [X]%)
   
   **Análise**:
   - Key Findings: [N]
   - Citações: [N]
   - Padrões: [N]
   - Consensos: [N]
   - Divergências: [N]
   
   **Artefatos Gerados**:
   - Análises individuais: `references/` ([N] arquivos)
   - Sínteses: `syntheses/` ([N] arquivos)
   - Validação: `validation/` ([N] arquivos)
   - Relatório final: `final-report/FULL-REPORT.md`
   - Métricas: `metrics/quality-metrics.json` (se expert)
   
   ## Próximos Passos
   
   1. Revisar relatório final: `cat ./memory/[ID]/final-report/FULL-REPORT.md`
   2. Explorar análises individuais: `ls ./memory/[ID]/references/`
   3. Revisar sínteses: `ls ./memory/[ID]/syntheses/`
   
   ## Como Usar os Resultados
   
   **Ler Relatório Completo**:
   ```bash
   cat ./memory/[ID]/final-report/FULL-REPORT.md
   ```
   
   **Ver Executive Summary**:
   ```bash
   head -50 ./memory/[ID]/final-report/01-executive-summary.md
   ```
   
   **Explorar por Capítulo**:
   ```bash
   ls ./memory/[ID]/final-report/
   ```
   ```

2. **Apresentar Resultados**:
   - Research ID
   - Modo usado
   - Tempo de execução
   - Estatísticas finais
   - Links para artefatos
   - Próximos passos

## Princípios Operacionais

### Padrões de Qualidade

- **Orquestração**: Apenas orquestrar core commands, não duplicar lógica
- **Configurabilidade**: Modos claramente definidos e customizáveis
- **Transparência**: Usuário vê exatamente quais commands são executados
- **Flexibilidade**: Pode interromper e continuar manualmente se necessário
- **Consistência**: Sempre executar core commands na ordem correta

### Tratamento de Erros

- **Se tema não fornecido**: ERRO - "Tema de pesquisa obrigatório"
- **Se modo inválido**: ERRO - "Modo inválido. Use: simple, deep ou expert"
- **Se core command falhar**: Parar pipeline e reportar erro específico
- **Se pausa rejeitada**: Continuar automaticamente após 30 segundos
- **Se configuração inválida**: ERRO com sugestão de valores válidos
- **Se research ID já existe**: Perguntar estratégia (CONTINUE/RENAME/REPLACE/ABORT)

### Restrições

- SEMPRE executar core commands na ordem correta
- SEMPRE usar configurações do modo selecionado
- SEMPRE reportar progresso de cada etapa
- SEMPRE validar que core commands foram executados com sucesso
- NUNCA duplicar lógica dos core commands
- NUNCA pular validações obrigatórias
- NUNCA assumir que core commands funcionarão sem validação

### Otimizações

- **Progress Tracking**: Reportar progresso de cada etapa
- **Error Recovery**: Continuar pipeline mesmo se alguns comandos falharem (quando possível)
- **Configuration Validation**: Validar configuração antes de executar
- **Timeout Handling**: Timeout de 30 segundos para pausas

## Exemplos

### Exemplo 1: Modo Simple

```
Input: /research.pipeline "TypeScript decorators best practices" simple

Output:
🚀 Iniciando Pipeline Simple...

**Tema**: TypeScript decorators best practices
**Modo**: simple
**Configuração**: 20 refs, 25% análise, sem pausas

[1/4] Inicializando pesquisa...
✅ Research ID: typescript-decorators-best-practices-20250120

[2/4] Buscando referências...
✅ 18 referências encontradas

[3/4] Scoring e priorização...
✅ 18 referências pontuadas
✅ Top 25% identificado: 5 referências

[4/4] Análise profunda...
✅ 5 análises completas
✅ 1 síntese final gerada

🎉 Pipeline Simple Concluído!

**Research ID**: typescript-decorators-best-practices-20250120
**Tempo**: ~3 minutos

**Referências**:
- Encontradas: 18
- Pontuadas: 18
- Analisadas: 5 (top 25%)

**Artefatos**: ./memory/typescript-decorators-best-practices-20250120/
```

### Exemplo 2: Modo Deep

```
Input: /research.pipeline "React Server Components architecture" deep

Output:
🚀 Iniciando Pipeline Deep...

**Tema**: React Server Components architecture
**Modo**: deep
**Configuração**: 50 refs, 20% análise, 2 pausas

[1/6] Inicializando pesquisa...
✅ Research ID: react-server-components-architecture-deep-20250120

[2/6] Buscando referências...
✅ 47 referências encontradas

⏸️ PAUSA: Revisar resultados da busca?

**Referências encontradas**: 47
**Distribuição por categoria**:
- documentation: 15
- blog: 18
- tutorial: 10
- academic: 4

**Continuar com análise?** (sim/não)
> sim
✅ Confirmação recebida

[3/6] Scoring e priorização...
✅ 47 referências pontuadas
✅ Top 20% identificado: 9 referências

⏸️ PAUSA: Aprovar lista de referências para análise?

**Top 20% selecionado**: 9 referências
**Score threshold**: ≥ 7.2/10

**Top 5 Referências**:
1. React Server Components - Official Docs - 9.4/10
2. RSC Deep Dive Tutorial - 8.9/10
3. Server Components Best Practices - 8.7/10
4. RSC vs SSR Comparison - 8.5/10
5. Implementing RSC Guide - 8.3/10

**Continuar com análise profunda?** (sim/não)
> sim
✅ Confirmação recebida

[4/6] Análise profunda...
✅ 9 análises completas
✅ 1 síntese incremental gerada

[5/6] Síntese final...
✅ Síntese final consolidada
✅ 4 padrões identificados
✅ 3 consensos mapeados

[6/6] Validação cruzada...
✅ 3 consensos identificados
✅ 1 divergência mapeada
✅ Relatório final gerado

🎉 Pipeline Deep Concluído!

**Research ID**: react-server-components-architecture-deep-20250120
**Tempo**: ~15 minutos

**Referências**:
- Encontradas: 47
- Pontuadas: 47
- Analisadas: 9 (top 20%)

**Análise**:
- Key Findings: 27
- Citações: 18
- Padrões: 4
- Consensos: 3
- Divergências: 1

**Artefatos**: ./memory/react-server-components-architecture-deep-20250120/
```

### Exemplo 3: Modo Expert

```
Input: /research.pipeline "Large Language Models fine-tuning techniques" expert

Output:
🚀 Iniciando Pipeline Expert...

**Tema**: Large Language Models fine-tuning techniques
**Modo**: expert
**Configuração**: 100 refs, 20% análise, validação completa, métricas

[1/7] Inicializando pesquisa...
✅ Research ID: large-language-models-fine-tuning-techniques-expert-20250120

[2/7] Buscando referências...
✅ 127 referências encontradas

⏸️ PAUSA: Revisar resultados da busca?

**Referências encontradas**: 127
**Distribuição por categoria**:
- documentation: 23
- blog: 31
- tutorial: 18
- academic: 45
- other: 10

**Continuar com análise?** (sim/não)
> sim
✅ Confirmação recebida

[3/7] Scoring e priorização...
✅ 127 referências pontuadas
✅ Top 20% identificado: 25 referências

⏸️ PAUSA: Aprovar lista de referências para análise?

**Top 20% selecionado**: 25 referências
**Score threshold**: ≥ 7.8/10

**Top 5 Referências**:
1. Fine-tuning LLMs - Survey Paper - 9.6/10
2. LoRA: Low-Rank Adaptation - Official Paper - 9.4/10
3. RLHF Best Practices - 9.1/10
4. Prompt Tuning for LLMs - 8.9/10
5. QLoRA: Efficient Fine-tuning - 8.7/10

**Continuar com análise profunda?** (sim/não)
> sim
✅ Confirmação recebida

[4/7] Análise profunda...
✅ 25 análises completas
✅ 3 sínteses incrementais geradas

⏸️ PAUSA: Revisar progresso da análise?

**Referências analisadas**: 25/25
**Sínteses incrementais**: 3
**Key findings identificados**: 87

**Continuar com síntese final?** (sim/não)
> sim
✅ Confirmação recebida

[5/7] Síntese final...
✅ Síntese final consolidada
✅ 8 padrões identificados
✅ 12 consensos mapeados
✅ 5 gaps documentados

[6/7] Validação cruzada...
✅ 12 consensos identificados (9 high-confidence)
✅ 3 divergências mapeadas (2 resolved)
✅ 1 viés detectado (low impact)
✅ Relatório final gerado

[7/7] Métricas de qualidade...
✅ Score geral: 8.3/10
✅ Métricas salvas

🎉 Pipeline Expert Concluído!

**Research ID**: large-language-models-fine-tuning-techniques-expert-20250120
**Tempo**: ~45 minutos

**Referências**:
- Encontradas: 127
- Pontuadas: 127
- Analisadas: 25 (top 20%)

**Análise**:
- Key Findings: 87
- Citações: 54
- Padrões: 8
- Consensos: 12 (9 high-confidence)
- Divergências: 3 (2 resolved)

**Métricas de Qualidade**:
- Completude: 8.5/10
- Profundidade: 8.7/10
- Diversidade de fontes: 8.2/10
- Recência: 8.0/10
- Confiabilidade: 8.1/10
- **Score Geral**: 8.3/10

**Artefatos**: ./memory/large-language-models-fine-tuning-techniques-expert-20250120/
```

### Exemplo 4: Configuração Customizada

```
Input: /research.pipeline "API performance optimization" deep --max-refs 75 --top-percent 0.15

Output:
🚀 Iniciando Pipeline Deep (Customizado)...

**Tema**: API performance optimization
**Modo**: deep (customizado)
**Configuração**: 75 refs (customizado), 15% análise (customizado), 2 pausas

[1/6] Inicializando pesquisa...
✅ Research ID: api-performance-optimization-deep-20250120

[2/6] Buscando referências...
✅ 73 referências encontradas

⏸️ PAUSA: Revisar resultados da busca?
> sim

[3/6] Scoring e priorização...
✅ 73 referências pontuadas
✅ Top 15% identificado: 11 referências (customizado)

⏸️ PAUSA: Aprovar lista de referências para análise?
> sim

[4/6] Análise profunda...
✅ 11 análises completas

[5/6] Síntese final...
✅ Síntese final consolidada

[6/6] Validação cruzada...
✅ Relatório final gerado

🎉 Pipeline Deep (Customizado) Concluído!

**Tempo**: ~18 minutos
**Configuração customizada aplicada**: max-refs=75, top-percent=0.15
```

## Integração

### Posição no Workflow

**Precedido por**: Nenhum (ponto de entrada)

**Seguido por**: 
- Core commands individuais (se interrompido)
- Análise manual dos resultados

### Dependências

**Commands Obrigatórios**: Todos os core commands
- `/research.initialize` - Inicialização
- `/research.search` - Busca de referências
- `/research.score` - Scoring e priorização
- `/research.analyze` - Análise profunda
- `/research.synthesize` - Síntese final
- `/research.validate` - Validação cruzada (se expert/deep)

**Commands Opcionais**: Nenhum

### Fluxo de Dados

```
[User Input: tema + modo]
       ↓
  /research.pipeline ← VOCÊ ESTÁ AQUI
       ↓
  /research.initialize
       ↓ (produz: Research ID)
  /research.search
       ↓ (produz: Referências)
  /research.score
       ↓ (produz: Referências pontuadas)
  /research.analyze
       ↓ (produz: Análises individuais)
  /research.synthesize
       ↓ (produz: Síntese final)
  /research.validate (se expert/deep)
       ↓ (produz: Relatório final)
  [Métricas se expert]
       ↓ (produz: Métricas de qualidade)
  [Relatório Final Consolidado]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

### Execução
- [ ] Modo validado (simple/deep/expert)
- [ ] Configurações carregadas corretamente
- [ ] Configurações customizadas aplicadas
- [ ] Todos os core commands executados com sucesso
- [ ] Pausas respeitadas (se configuradas)
- [ ] Erros tratados adequadamente

### Output
- [ ] Research ID gerado
- [ ] Estrutura de diretórios criada
- [ ] Artefatos gerados conforme modo
- [ ] Relatório consolidado apresentado
- [ ] Próximos passos sugeridos
- [ ] Links para artefatos funcionais

### Qualidade
- [ ] Pipeline completo sem erros
- [ ] Tempo de execução reportado
- [ ] Estatísticas finais apresentadas
- [ ] Configurações aplicadas corretamente
- [ ] Progresso reportado em cada etapa

