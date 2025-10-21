# Research - Sistema de Pesquisa Profunda

Sistema completo de pesquisa profunda com metodologia acadêmica, validação cruzada e múltiplos níveis de profundidade.

---

## 🎯 Visão Geral

Research é um sistema especializado em conduzir pesquisas profundas sobre qualquer tópico, utilizando metodologia acadêmica rigorosa, validação cruzada de fontes e múltiplas perspectivas.

### Características Principais

- ✅ **3 Níveis de Profundidade**: Simple, Deep e Expert
- ✅ **Validação Cruzada**: Consensos e divergências mapeados
- ✅ **Score de Qualidade**: Avaliação multi-dimensional
- ✅ **Sínteses Incrementais**: Progressão estruturada
- ✅ **Relatórios Completos**: Documentação acadêmica
- ✅ **Análise de GitHub**: Projetos open-source

---

## 📦 Instalação

### Via CLI vibes (Recomendado)

```bash
npx vibes install github:vibes-org/research
```

### Via Local (Desenvolvimento)

```bash
npx vibes install ./research
```

**O que acontece**:
- Vibe é copiado para `~/.vibes/packages/research@2.0.0/`
- Commands ficam disponíveis em `.cursor/commands/`
- Templates ficam acessíveis em `research/templates/`

---

## 🚀 Quick Start

### Pesquisa Rápida (3-5 minutos)
```bash
/research.pipeline "TypeScript decorators best practices" simple
```

### Pesquisa Profunda (10-20 minutos)
```bash
/research.pipeline "React Server Components vs SSR" deep
```

### Pesquisa Expert (30-60 minutos)
```bash
/research.pipeline "Large Language Models fine-tuning techniques" expert
```

### Configurações Customizadas
```bash
# Customizar número de referências e percentual
/research.pipeline "tema" deep --max-refs 75 --top-percent 0.15

# Desabilitar pausas
/research.pipeline "tema" expert --no-pause
```

---

## 📊 Níveis de Pesquisa

### Simple Mode
- **Objetivo**: Visão geral rápida
- **Referências**: 20
- **Análises**: Top 25% (5 refs)
- **Tempo**: 3-5 minutos
- **Uso**: Validação de conceitos, comparações simples
- **Pausas**: Nenhuma

### Deep Mode
- **Objetivo**: Análise detalhada
- **Referências**: 50
- **Análises**: Top 20% (10 refs)
- **Tempo**: 10-20 minutos
- **Uso**: Pesquisas complexas, múltiplas perspectivas
- **Pausas**: 2 (após busca e scoring)

### Expert Mode
- **Objetivo**: Compreensão completa
- **Referências**: 100+
- **Análises**: Top 20% (20+ refs)
- **Tempo**: 30-60 minutos
- **Uso**: Revisões de literatura, rigor acadêmico
- **Pausas**: 3 (após busca, scoring e análise)
- **Extras**: Validação completa + métricas de qualidade

---

## 📁 Estrutura

```
research/
├── .cursor/
│   ├── commands/          # 11 commands especialistas
│   └── rules/             # Rules de governança
├── constitution.md        # Princípios e regras
├── README.md              # Este arquivo
├── docs/                  # Documentação adicional
└── scripts/               # Scripts de processamento
```

---

## 🔧 Commands Disponíveis

### Pipeline Command (1)
- `research.pipeline.md` - Pipeline configurável com 3 modos (simple/deep/expert)

### Core Commands (6)
- `research.initialize.md` - Inicializar pesquisa
- `research.search.md` - Buscar referências
- `research.score.md` - Pontuar referências
- `research.analyze.md` - Analisar profundamente
- `research.synthesize.md` - Sintetizar findings
- `research.validate.md` - Validar e gerar relatório final

### Utilitários (1)
- `research.github.md` - Análise de projetos GitHub

### Documentação (1)
- `research.integration.md` - Guia de integração

### ⚠️ Deprecated (3)
- `research.simple.pipeline.md` - ⚠️ Use `/research.pipeline [tema] simple`
- `research.deep.pipeline.md` - ⚠️ Use `/research.pipeline [tema] deep`
- `research.expert.pipeline.md` - ⚠️ Use `/research.pipeline [tema] expert`

**Nota**: Old pipeline commands ainda funcionam mas serão removidos em 2025-04-20.

---

## 📖 Workflow Completo

### 1. Inicializar
```bash
/research.initialize "Como implementar autenticação biométrica em React Native?"
```

**Output**: Research ID + estrutura de diretórios + metadados

### 2. Buscar Referências
```bash
/research.search [research-id]
```

**Output**: 100 referências coletadas de múltiplas fontes

### 3. Pontuar Referências
```bash
/research.score [research-id]
```

**Output**: Referências pontuadas (0-10) + top 20% identificado

### 4. Analisar Profundamente
```bash
/research.analyze [research-id]
```

**Output**: Análises detalhadas + sínteses incrementais

### 5. Sintetizar
```bash
/research.synthesize [research-id] --final
```

**Output**: Síntese final consolidada

### 6. Validar
```bash
/research.validate [research-id]
```

**Output**: Relatório final completo + validação cruzada

---

## 🎓 Metodologia

### Scoring Multi-Dimensional
Cada referência é avaliada em 5 dimensões:

1. **Credibility** (25%): Autoridade e confiabilidade
2. **Relevance** (30%): Alinhamento com objetivo
3. **Recency** (15%): Atualidade da informação
4. **Depth** (20%): Profundidade do conteúdo
5. **Authority** (10%): Credenciais do autor

### Validação Cruzada
- Mapeamento de consensos entre fontes
- Identificação de divergências
- Análise de vieses
- Níveis de confiança

### Sínteses Incrementais
- Progressão a cada 10 referências
- Identificação de padrões
- Documentação de gaps
- Ajustes de direção

---

## 📊 Outputs

### Estrutura de Diretórios
```
./memory/[research-id]/
├── metadata.json              # Metadados completos
├── README.md                  # Navegação
├── references/                # Análises individuais
│   ├── REF-001-[title].md
│   ├── REF-002-[title].md
│   └── _index.md
├── syntheses/                 # Sínteses
│   ├── SYNTH-001-mini.md
│   ├── SYNTH-002-mini.md
│   └── SYNTH-FINAL.md
├── validation/                # Validação
│   └── validation-report.md
└── final-report/              # Relatório final
    ├── 01-executive-summary.md
    ├── 02-methodology.md
    ├── 03-findings.md
    ├── 04-analysis.md
    ├── 05-discussion.md
    ├── 06-recommendations.md
    ├── 07-limitations.md
    ├── 08-references.md
    ├── 09-appendices.md
    └── FULL-REPORT.md
```

### Metadados JSON
- Objetivo e escopo da pesquisa
- Status e progresso
- Referências coletadas
- Estatísticas agregadas
- Configurações

---

## 🔍 Análise de GitHub

Analise projetos open-source em detalhes:

```bash
/research.github facebook/react --depth detailed
```

**Output**:
- Stack tecnológica completa
- Estrutura do projeto
- Qualidade e padrões
- Comunidade e atividade
- Recomendações

---

## 📚 Documentação

### Guias Principais
- `constitution.md` - Princípios e regras
- `GUIA-MIGRACAO.md` - Guia de migração para novo pipeline
- `ANALISE-COMMANDS-MELHORIAS.md` - Análise completa dos commands
- `PLANEJAMENTO-REORGANIZACAO.md` - Planejamento de reorganização

### Templates
- `template.research-metadata.json` - Schema de metadados
- `template.research-report.md` - Estrutura de relatório
- `template.research-reference-analysis.md` - Análise individual
- `template.research-synthesis.md` - Sínteses

---

## 🎯 Quando Usar Cada Nível

### Use Simple Quando:
- ✅ Você precisa de resposta rápida
- ✅ Tema é simples ou bem conhecido
- ✅ Você quer validar um conceito rapidamente
- ✅ Você tem < 5 minutos disponíveis

### Use Deep Quando:
- ✅ Você precisa de análise detalhada
- ✅ Tema é moderadamente complexo
- ✅ Você quer múltiplas perspectivas
- ✅ Você tem 10-20 minutos disponíveis

### Use Expert Quando:
- ✅ Você precisa de máxima profundidade
- ✅ Tema é muito complexo
- ✅ Você quer rigor acadêmico
- ✅ Você tem 30-60 minutos disponíveis

---

## 🔗 Integração

### Com Outros Commands
- **maker.command**: Criar commands baseados em findings
- **planner.feature**: Planejar features baseadas em insights
- **exec.implement**: Implementar soluções baseadas em recomendações
- **analyzer.project**: Analisar projetos com metodologia

### Com Ferramentas Externas
- **web_search**: Busca geral na web
- **web_search**: Busca específica e recente
- **web_search**: Busca local
- **codebase_search**: Busca no repositório

---

## 📈 Métricas de Qualidade

### Score de Qualidade (0-10)
- **Completude**: Cobertura do objetivo
- **Profundidade**: Nível de análise
- **Diversidade**: Variedade de fontes
- **Recência**: Atualidade das fontes
- **Confiabilidade**: Credibilidade das fontes

### Critérios de Aprovação
- Score geral ≥ 7.0/10
- Mínimo 10 referências analisadas
- Validação cruzada completa
- Relatório final gerado

---

## 🛠️ Dependências

### Templates (obrigatórios)
- `vibes/structure/templates/template.research-metadata.json`
- `vibes/structure/templates/template.research-report.md`
- `vibes/structure/templates/template.research-reference-analysis.md`
- `vibes/structure/templates/template.research-synthesis.md`

### Output (obrigatório)
- `./memory/[research-id]/`

### Scripts (opcional)
- `vibes/scripts/bash/merge-research-report.sh`

---

## 🎓 Princípios

### Rigor Acadêmico
- Todas afirmações baseadas em evidências
- Fontes rastreáveis e citadas
- Validação cruzada obrigatória

### Objetividade
- Análises imparciais
- Vieses identificados
- Múltiplas perspectivas

### Transparência
- Metodologia documentada
- Decisões justificadas
- Processo rastreável

### Qualidade
- Score mínimo: 7.0/10
- Validação completa
- Revisão em cada fase

---

## 📞 Suporte

### Problemas Comuns
- Ver `docs/workflow.md` para fluxo detalhado
- Ver `docs/examples.md` para exemplos práticos
- Ver `constitution.md` para princípios e regras

### Contribuindo
- Siga princípios em `constitution.md`
- Use templates oficiais
- Documente mudanças

---

## 📝 Licença

Este sistema é parte do projeto Vibe e segue os mesmos termos de licença.

---

## 🆕 Novidades (2025-01-20)

### Novo Command: `research.pipeline.md`
- ✅ **Consolidação**: Um único command para todos os modos
- ✅ **Configurabilidade**: Flags customizadas (`--max-refs`, `--top-percent`, `--no-pause`)
- ✅ **Sem duplicação**: Usa core commands diretamente
- ✅ **Melhor manutenção**: Mudanças centralizadas

### Migração
- ⚠️ **Old commands deprecated**: Serão removidos em 2025-04-20
- 📖 **Guia de migração**: Veja `GUIA-MIGRACAO.md`
- 🔄 **Compatibilidade**: Old commands ainda funcionam

---

**Versão**: 2.0  
**Última Atualização**: 2025-01-20  
**Status**: ✅ Operacional com nova estrutura

