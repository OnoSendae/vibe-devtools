# @vibe-devtools/research

**Academic-Grade Research Pipelines for AI Agents**

[![npm version](https://img.shields.io/npm/v/@vibe-devtools/research.svg)](https://www.npmjs.com/package/@vibe-devtools/research)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistema completo de research workflows com rigor acadêmico - de pesquisas simples a investigações expert com 100+ referências, análise profunda e validação cruzada. ([O que é um vibe?](#-o-que-é-um-vibe))

---

## 🎯 O Que é Research?

**@vibe-devtools/research** é um kit de **pipelines de pesquisa** que transforma agentes de IA em **pesquisadores profissionais**. Com rigor acadêmico, validação cruzada e outputs estruturados, permite investigações desde rápidas (5 min) até expert (1-2h) com qualidade excepcional.

### Por Que Research?

Pesquisa manual é:
- ⏰ Demorada (horas/dias)
- 📊 Inconsistente (depende de quem faz)
- 🔀 Desorganizada (informações espalhadas)
- ❌ Não validada (sem cross-check)

**Com Research Kit**:
- ⚡ Rápida (5 min - 2h)
- 📋 Consistente (sempre mesmo padrão)
- 🗂️ Estruturada (outputs organizados)
- ✅ Validada (cross-check automático)

---

## 📘 O Que é um Vibe?

**Vibe** (ou **vibe package**) é um **pacote de comandos, rules e scripts** que estende as capacidades de agentes de IA como Cursor, GitHub Copilot e Gemini CLI.

### Research como Vibe

O **@vibe-devtools/research** é um vibe especializado em **investigação e análise**:

```
Research Vibe =
  📚 12 Commands    → Pipelines, search, analyze, synthesize
  📐 4 Rules        → Research quality, analysis, synthesis
  📊 4 Templates    → Reports, metadata, analysis, synthesis
  ⚙️ Scripts        → Setup e automação
```

### Como Funciona

**1. Instalação**:
```bash
vdt install @vibe-devtools/research
```

**2. O que acontece**:
- 📥 Download do vibe do NPM
- 📂 Armazena em `~/.vibes/packages/research@1.0.0/`
- 🔗 Symlinks para `.cursor/commands/`, `.cursor/rules/`
- 📋 Templates para `research/templates/`
- ✅ 12 commands ficam disponíveis no Cursor

**3. Uso no Cursor**:
```bash
# Pipelines completos:
/research.simple.pipeline "Quick topic"
/research.deep.pipeline "Detailed investigation"
/research.expert.pipeline "Academic research"

# Commands individuais:
/research.search "Find references"
/research.analyze "Deep dive into sources"
/research.synthesize "Consolidate findings"
```

### Storage e Reuso

```
Global (instala uma vez):
~/.vibes/packages/research@1.0.0/
  ├── .cursor/commands/ (12 commands)
  ├── .cursor/rules/ (4 rules)
  └── templates/ (4 templates)

Projeto A:
  .cursor/commands/ → symlink para global

Projeto B:
  .cursor/commands/ → symlink para global

Projeto C:
  .cursor/commands/ → symlink para global
```

**Instala uma vez, reutiliza infinitamente!** 🔄

### Como Research Vibe Foi Criado

Este vibe foi criado usando **@vibe-devtools/basic**:

```bash
# 1. Com basic instalado
/maker.command "Research pipeline simples"
/maker.command "Research pipeline profundo"
/maker.command "Research pipeline expert"
# ... (12 commands criados)

# 2. Organizar em package
# 3. Publicar como @vibe-devtools/research
# 4. Agora qualquer um pode instalar!
```

**Isso demonstra o poder do ecosystem**: Basic cria vibes → Vibes criam valor → Mais vibes são criados → Network effect! 🌐

[↑ Voltar ao topo](#vibe-devtoolsresearch)

---

## 📦 Instalação

### Método 1: Via CLI Instalada (Recomendado)

```bash
# 1. Instalar CLI globalmente
npm install -g vibe-devtools

# 2. Instalar research
vdt install @vibe-devtools/research

# 3. Pronto!
```

### Método 2: Via npx (Zero Instalação) ⭐

```bash
# Instalar diretamente sem ter a CLI
npx vibe-devtools install @vibe-devtools/research

# Pronto! Sem pré-requisito de CLI global.
```

### 🔥 Qual Escolher?

- **CLI Global**: Se vai fazer várias pesquisas (recomendado)
- **npx**: Para testar pipelines ou uso esporádico
- **Pro tip**: Use npx para experimentar, depois instale CLI se gostar

---

## ✨ O Que Você Ganha

### 12 Commands de Research

| Command | Tipo | Tempo | Referências | Output |
|---------|------|-------|-------------|--------|
| **research.simple.pipeline** | Pipeline Rápido | 5-10 min | 5-10 refs | Quick report |
| **research.deep.pipeline** | Pipeline Profundo | 20-40 min | 20-50 refs | Deep analysis |
| **research.expert.pipeline** | Pipeline Expert | 1-2h | 100+ refs | Academic-grade |
| **research.initialize** | Setup | 1 min | - | Estrutura de dirs |
| **research.search** | Busca | 2-5 min | 10-50 refs | Lista de refs |
| **research.score** | Scoring | 2-5 min | - | Refs priorizadas |
| **research.analyze** | Análise | 5-15 min | 1-10 refs | Análises profundas |
| **research.synthesize** | Síntese | 5-10 min | - | Síntese consolidada |
| **research.validate** | Validação | 5-10 min | - | Cross-validation |
| **research.integration** | Integração | 2 min | - | Merge de researches |
| **research.github** | GitHub Expert | 30-60 min | Repos | Análise de repositórios |

### 4 Rules de Qualidade

| Rule | Propósito |
|------|-----------|
| **research.mdc** | Guidelines gerais de research |
| **analysis.mdc** | Padrões para análise profunda |
| **search.mdc** | Best practices de busca |
| **synthesis.mdc** | Como sintetizar descobertas |

### Templates Profissionais

- **template.research-metadata.json** - Metadata estruturado
- **template.research-reference-analysis.md** - Análise individual
- **template.research-report.md** - Relatório final
- **template.research-synthesis.md** - Síntese de descobertas

---

## 🏗️ Arquitetura

### Research Pipelines (3 Níveis)

```
Simple Pipeline (5-10 min)
├── Busca rápida (5-10 refs)
├── Scoring básico
├── Análise top 3
├── Síntese direta
└── Quick report

Deep Pipeline (20-40 min)
├── Busca multi-camada (20-50 refs)
├── Scoring multi-dimensional
├── Análise top 20%
├── Síntese incremental
├── Validação básica
└── Deep report

Expert Pipeline (1-2h)
├── Busca exaustiva (100+ refs)
├── Scoring completo (7 dimensões)
├── Análise profunda (45+ refs)
├── Sínteses por categoria
├── Validação cruzada completa
├── Gaps analysis
└── Academic-grade report (30+ páginas)
```

### Estrutura de Outputs

```
vibes/memory/researches/[research-id]/
│
├── metadata.json               # Metadata estruturado
├── README.md                   # Overview da research
├── EXECUTIVE-SUMMARY.md        # Resumo executivo
│
├── references/                 # Análises individuais
│   ├── REF-001-analysis.md
│   ├── REF-002-analysis.md
│   └── ...
│
├── syntheses/                  # Sínteses incrementais
│   ├── synthesis-001.md
│   ├── synthesis-category-X.md
│   └── FINAL-SYNTHESIS.md
│
├── validation/                 # Validações cruzadas
│   ├── consistency-report.md
│   ├── completeness-report.md
│   └── FINAL-VALIDATION.md
│
├── final-report/               # Relatório final
│   └── FULL-REPORT.md          # 10-30+ páginas
│
├── tasks/                      # Tasks geradas (se aplicável)
└── metrics/                    # Métricas de qualidade
    └── quality-metrics.json
```

### Scoring Multi-Dimensional

Cada referência é avaliada em **7 dimensões**:

| Dimensão | Peso | O que mede |
|----------|------|------------|
| **Credibilidade** | 15% | Confiabilidade da fonte |
| **Relevância** | 25% | Alinhamento com tema |
| **Recência** | 15% | Quão atual é a informação |
| **Profundidade** | 15% | Nível de detalhe |
| **Autoridade** | 10% | Expertise da fonte |
| **Originalidade** | 10% | Insights únicos |
| **Aplicabilidade** | 10% | Utilidade prática |

**Score Total**: 0-10 (ponderado)

Top 20% das referências são priorizadas para análise profunda.

---

## 📖 Commands em Detalhes

### Pipelines (Uso Principal)

#### `/research.simple.pipeline`

Pipeline rápido para pesquisas urgentes.

**Quando usar**:
- Pesquisas rápidas (overview de tema)
- Validação de hipótese
- Research preliminar

**Input**: `"Tema da pesquisa"`

**Output** (5-10 min):
- 5-10 referências coletadas
- Top 3 analisadas
- Síntese direta
- Quick report (3-5 páginas)

**Exemplo**:
```bash
/research.simple.pipeline "React Server Components best practices"

# Output:
# - 8 referências encontradas
# - Top 3 analisadas
# - Síntese: 3 descobertas principais
# - Report: vibes/memory/researches/react-server-components-simple-20251021/
```

---

#### `/research.deep.pipeline`

Pipeline profundo para investigações sérias.

**Quando usar**:
- Análise comparativa
- Decisões técnicas importantes
- Investigação de problema complexo

**Input**: `"Tema" "Objetivos" "Critérios"`

**Output** (20-40 min):
- 20-50 referências coletadas
- Top 20% analisadas (4-10 refs)
- Síntese incremental
- Validação básica
- Deep report (10-15 páginas)

**Exemplo**:
```bash
/research.deep.pipeline "State management solutions for React Native" "Comparar Redux, Zustand, Jotai" "Performance e developer experience"

# Output:
# - 32 referências coletadas
# - 7 analisadas profundamente
# - 3 sínteses incrementais
# - Validação de consistência
# - Report: 12 páginas com análise comparativa
```

---

#### `/research.expert.pipeline`

Pipeline expert para pesquisas acadêmicas.

**Quando usar**:
- Pesquisa acadêmica
- Revisão de literatura
- Investigação exaustiva
- Tomada de decisão crítica

**Input**: `"Tema" "Profundidade" "Objetivos" "Critérios"`

**Output** (1-2h):
- 100+ referências coletadas
- 45+ analisadas em profundidade
- Sínteses por categoria
- Validação cruzada completa
- Gaps analysis
- Expert report (30+ páginas)

**Exemplo**:
```bash
/research.expert.pipeline "Large Language Models fine-tuning techniques" deep "Revisão de literatura sobre técnicas de fine-tuning de LLMs" "acadêmico rigoroso"

# Output:
# - 127 referências coletadas
# - 51 analisadas profundamente
# - 12 sínteses incrementais
# - 8 sínteses por categoria
# - Validação cruzada completa
# - Score de qualidade: 8.3/10
# - Report: 35 páginas com:
#   * Executive summary
#   * Metodologia
#   * 15 descobertas principais
#   * Análise comparativa
#   * Gaps identificados
#   * Recomendações
#   * Anexos
```

---

### Commands Individuais (Uso Avançado)

#### `/research.search`

Busca e coleta referências.

**Input**: Tema + queries específicas
**Output**: Lista de referências com URLs, snippets, scores

---

#### `/research.analyze`

Analisa referências em profundidade.

**Input**: URLs ou referências a analisar
**Output**: Análises detalhadas em `references/`

---

#### `/research.synthesize`

Sintetiza descobertas.

**Input**: Referências analisadas
**Output**: Síntese consolidada

---

#### `/research.validate`

Valida consistência e completude.

**Input**: Sínteses geradas
**Output**: Relatório de validação cruzada

---

## 💡 Casos de Uso & Exemplos

### Exemplo 1: Research Rápida para Decisão Técnica

**Cenário**: Escolher entre GraphQL e tRPC para novo projeto

```bash
# Quick research
/research.simple.pipeline "GraphQL vs tRPC for TypeScript backend 2025"

# Output em 8 minutos:
# 
# 📊 Research Concluída
# ID: graphql-vs-trpc-simple-20251021
# Referências: 9
# Analisadas: 3
# 
# 🎯 Descobertas Principais:
# 1. tRPC mais popular em 2025 (evidência: 3 refs, score 9.2)
# 2. GraphQL melhor para APIs públicas (evidência: 2 refs, score 8.5)
# 3. tRPC mais fácil setup (evidência: 3 refs, score 9.0)
# 
# 💡 Recomendação: tRPC para API interna TypeScript
# 
# 📂 Report: vibes/memory/researches/graphql-vs-trpc-simple-20251021/
#    - EXECUTIVE-SUMMARY.md
#    - references/ (3 análises)
#    - final-report/FULL-REPORT.md (5 páginas)
```

**Resultado**:
- ✅ Decisão técnica fundamentada em 8 minutos
- ✅ 3 fontes analisadas
- ✅ Report para compartilhar com equipe
- ✅ **80% faster que research manual**

---

### Exemplo 2: Investigação Profunda Pre-Migration

**Cenário**: Preparar migration de React Navigation 6 → 7

```bash
# Deep research
/research.deep.pipeline "React Navigation 7 migration guide breaking changes best practices" "Identificar breaking changes e migration path" "Completude e aplicabilidade prática"

# Output em 35 minutos:
#
# 📊 Research Profunda Concluída
# ID: react-navigation-7-migration-deep-20251021
# Referências: 38
# Analisadas: 8 (top 21%)
#
# 🎯 Top 10 Descobertas:
# 1. Breaking: Native Stack Navigator API mudou (score 9.8)
# 2. New: Static type safety melhorada (score 9.5)
# 3. Migration: Automated codemod disponível (score 9.7)
# 4. Performance: 30% faster rendering (score 8.9)
# 5. Breaking: Screen options renamed (score 9.2)
# ...
#
# ⚠️ Risks Identificados:
# - Dependência @react-navigation/native-stack
# - Custom navigators precisam refactor
# - TypeScript types breaking
#
# 📋 Migration Checklist Gerada:
# - [ ] Atualizar dependencies
# - [ ] Rodar codemod
# - [ ] Atualizar screen options
# - [ ] Testar navegação
# - [ ] Atualizar tipos TS
#
# 📂 Report: 14 páginas com migration step-by-step
```

**Resultado**:
- ✅ Migration plan completo
- ✅ Risks identificados antecipadamente
- ✅ Checklist pronto para executar
- ✅ **Economia de 4-6 horas** de research manual

---

### Exemplo 3: Revisão de Literatura Acadêmica

**Cenário**: Paper sobre "AI-assisted software development trends 2025"

```bash
# Expert research
/research.expert.pipeline "AI-assisted software development tools and methodologies 2025" expert "Comprehensive literature review of AI coding tools, vibe coding, copilot usage, and developer productivity" "acadêmico rigoroso"

# Output em 1h45min:
#
# 📊 Research Expert Concluída
# ID: ai-assisted-dev-2025-expert-20251021
# Qualidade: 9.2/10 ✅
#
# 📈 Estatísticas:
# - Referências coletadas: 143
# - Analisadas profundamente: 52
# - Sínteses incrementais: 14
# - Sínteses por categoria: 9
# - Validação cruzada: 100% consistente
#
# 🎯 Top 15 Descobertas (com evidências):
# 1. GitHub Copilot adoption: 1.3M+ users em 2025
#    Evidência: 5 refs (Microsoft, Stack Overflow Survey)
#    Confiabilidade: Muito Alta (9.5/10)
#
# 2. Vibe Coding emergiu como paradigma dominante
#    Evidência: 8 refs (Karpathy, DataCamp, Google Cloud)
#    Confiabilidade: Muito Alta (9.8/10)
#
# 3. Productivity gain: 35-55% em tarefas repetitivas
#    Evidência: 7 refs (Studies, Surveys)
#    Confiabilidade: Alta (8.2/10)
#
# ... (12 mais descobertas)
#
# 📊 Análise Comparativa:
# - Cursor vs Copilot vs Gemini (tabela detalhada)
# - Metodologias: Vibe Coding vs TDD vs Traditional
# - Impacto por tipo de tarefa
#
# ⚠️ Gaps Identificados:
# - Estudos longitudinais (>6 meses)
# - Impacto em equipes grandes (>50 devs)
# - Security implications (limitado)
#
# 💡 Recomendações:
# - Adotar vibe coding para prototyping
# - Manter TDD para core logic
# - Investir em prompts de alta qualidade
#
# 📂 Report: 38 páginas
# - Executive Summary (2 páginas)
# - Metodologia (3 páginas)
# - Descobertas (15 páginas)
# - Análise Comparativa (8 páginas)
# - Gaps e Recomendações (5 páginas)
# - Referências Anotadas (5 páginas)
#
# 📁 Estrutura:
# vibes/memory/researches/ai-assisted-dev-2025-expert-20251021/
# ├── metadata.json
# ├── EXECUTIVE-SUMMARY.md
# ├── references/ (52 análises)
# ├── syntheses/ (23 sínteses)
# ├── validation/ (4 reports)
# ├── final-report/FULL-REPORT.md (38 páginas)
# └── metrics/quality-metrics.json
```

**Resultado**:
- ✅ Literature review acadêmica em <2h
- ✅ 143 referências processadas e validadas
- ✅ 38 páginas de análise profunda
- ✅ Pronto para publicar como paper/blog
- ✅ **Equivalente a 2-3 semanas** de research manual

---

## 🔧 Detalhes Técnicos

### Algoritmo de Scoring

```typescript
function calculateScore(reference: Reference): number {
  const weights = {
    credibilidade: 0.15,
    relevancia: 0.25,
    recencia: 0.15,
    profundidade: 0.15,
    autoridade: 0.10,
    originalidade: 0.10,
    aplicabilidade: 0.10
  };
  
  let total = 0;
  for (const [dimension, weight] of Object.entries(weights)) {
    total += reference.scores[dimension] * weight;
  }
  
  return total; // 0-10
}
```

### Busca Multi-Camada

```
Camada 1: Busca Ampla
├── Query principal
├── Variações do tema
├── Sinônimos e termos relacionados
└── Coletar 50-100 refs

Camada 2: Busca Especializada
├── Sub-temas identificados
├── Queries focadas
├── Referências de nicho
└── Coletar 30-50 refs adicionais

Camada 3: Busca de Referências
├── Citações das refs coletadas
├── Referências cruzadas
├── "Cited by" e "References"
└── Coletar 20-30 refs finais
```

### Validação Cruzada

```
Para cada descoberta:
1. Identificar referências que suportam
2. Calcular nível de consenso
3. Identificar contradições
4. Avaliar confiabilidade

Score de confiança:
- Muito Alta: 3+ refs independentes concordam
- Alta: 2 refs independentes
- Média: 1 ref sólida
- Baixa: Apenas 1 ref ou questionável
```

---

## 🎯 Configuração

Via `vibe.json` > `config`:

```json
{
  "config": {
    "defaultDepth": "deep",
    "maxReferences": 100,
    "topPercentage": 0.2
  }
}
```

### Parâmetros Configuráveis

| Parâmetro | Default | Descrição |
|-----------|---------|-----------|
| `defaultDepth` | `deep` | Profundidade padrão (simple/deep/expert) |
| `maxReferences` | `100` | Máximo de refs a coletar |
| `topPercentage` | `0.2` | % de refs para análise profunda |

---

## 📊 Métricas de Qualidade

Toda research expert gera métricas:

```json
{
  "completude": 9.0,
  "profundidade": 9.0,
  "diversidade_fontes": 10.0,
  "recencia": 10.0,
  "confiabilidade": 10.0,
  "score_geral": 9.6
}
```

**Portões de Qualidade** (Expert):
- ✅ Mínimo 100 refs coletadas
- ✅ Mínimo 45 refs analisadas
- ✅ Score geral >= 7.0
- ✅ Validação cruzada 100%
- ✅ Zero contradições não resolvidas

---

## 🔬 Metodologia Científica

### Princípios

1. **Rigor Acadêmico**: Padrões de research paper
2. **Validação Cruzada**: Múltiplas fontes independentes
3. **Transparência**: Metodologia documentada
4. **Reprodutibilidade**: Processo repetível
5. **Completude**: Cobertura abrangente

### Citations

Todas as descobertas incluem:
- **Evidência**: Quais referências suportam
- **Score de Confiabilidade**: Alta/Média/Baixa
- **Consenso**: % de refs que concordam
- **Contradições**: Identificadas e documentadas

### Output Formats

- **Markdown**: Human-readable reports
- **JSON**: Machine-readable metadata
- **Structured**: Hierarquia de diretórios organizada

---

## 🚀 Workflows Avançados

### Combining com Basic

```bash
# 1. Research sobre tema
/research.deep.pipeline "Microservices architecture patterns"

# 2. Planejar implementação baseado em research
/planner.project vibes/memory/researches/microservices-deep-*/final-report/FULL-REPORT.md

# 3. Gera tasks de implementação
# vibes/tasks/implement-microservices/

# 4. Executar
/exec.implement implement-microservices
```

**Resultado**: De research a implementação em workflow único!

---

## 🤝 Contributing

Research workflows são complexos - contribuições são valiosas!

**Áreas para contribuir**:
- Novos commands de research
- Algoritmos de scoring melhorados
- Integração com mais sources (arXiv, Google Scholar)
- Templates adicionais
- Pipelines customizados

---

## 📄 License

MIT License - Veja [LICENSE](./LICENSE)

---

## 🔗 Links

- **NPM**: https://www.npmjs.com/package/@vibe-devtools/research
- **CLI**: https://www.npmjs.com/package/vibe-devtools
- **Org**: https://www.npmjs.com/org/vibe-devtools
- **GitHub**: https://github.com/onosendae/vibe-devtools

---

## 🎓 Research Quality Guarantee

Todo research expert pipeline garante:

✅ **Completude >= 9.0/10**  
✅ **Profundidade >= 9.0/10**  
✅ **Diversidade de fontes >= 9.0/10**  
✅ **Score geral >= 7.0/10**  
✅ **Validação cruzada 100%**

**Se não atingir**: Pipeline falha e reporta gaps.

---

*@vibe-devtools/research - Academic-grade research in minutes, not weeks* 🔬✨

**Part of the Vibe DevTools Ecosystem by Ono Sendae**
