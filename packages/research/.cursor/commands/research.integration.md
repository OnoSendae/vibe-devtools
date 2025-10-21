---
description: Guia de integração inteligente para os 3 níveis de pesquisa pipeline
---

## Visão Geral

Este documento descreve a integração inteligente entre os 3 níveis de pesquisa pipeline:
- `research.simple.pipeline.md` - Pesquisa simples e rápida
- `research.deep.pipeline.md` - Pesquisa profunda e estruturada
- `research.expert.pipeline.md` - Pesquisa expert e completa

## Matriz de Decisão

### Quando Usar Cada Nível

| Critério | Simple | Deep | Expert |
|----------|--------|------|--------|
| **Tempo disponível** | < 5 min | 10-20 min | 30-60 min |
| **Profundidade necessária** | Superficial | Média-Alta | Muito Alta |
| **Complexidade do tema** | Simples | Moderada | Complexa |
| **Objetivo** | Visão geral rápida | Análise detalhada | Compreensão completa |
| **Referências esperadas** | 10-20 | 30-50 | 100+ |
| **Análises profundas** | 5 | 20-30 | 45+ |
| **Validação cruzada** | Não | Sim | Sim + Métricas |
| **Intervenção do usuário** | Nenhuma | Pausas estratégicas | Configurável |

## Fluxos de Integração

### Fluxo 1: Progressão Linear

```
Simple → Deep → Expert
```

**Quando usar**: Quando você não tem certeza da profundidade necessária.

**Exemplo**:
1. Inicie com `/research.simple.pipeline "tema"` para visão geral rápida
2. Se precisar de mais detalhes, execute `/research.deep.pipeline "tema"` com objetivos específicos
3. Se precisar de máxima profundidade, execute `/research.expert.pipeline "tema"` com critérios rigorosos

### Fluxo 2: Entrada Direta

```
[User] → Deep/Expert
```

**Quando usar**: Quando você já sabe a profundidade necessária.

**Exemplo**:
- Para análise técnica detalhada: `/research.deep.pipeline "tema" medium "objetivos específicos"`
- Para pesquisa acadêmica: `/research.expert.pipeline "tema" deep "revisão de literatura" "acadêmico rigoroso"`

### Fluxo 3: Iteração Incremental

```
Simple → [Review] → Deep → [Review] → Expert
```

**Quando usar**: Quando você quer revisar progresso e ajustar direção.

**Exemplo**:
1. Execute Simple para visão geral
2. Revise relatório e identifique gaps
3. Execute Deep com objetivos específicos baseados nos gaps
4. Revise relatório Deep e identifique áreas que precisam de mais profundidade
5. Execute Expert nas áreas específicas

## Comparação Detalhada

### Inputs

| Input | Simple | Deep | Expert |
|-------|--------|------|--------|
| Tema de pesquisa | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório |
| Nível de profundidade | ❌ Não | ✅ Obrigatório | ✅ Obrigatório |
| Objetivos específicos | ❌ Não | ✅ Obrigatório | ✅ Obrigatório |
| Referências iniciais | ❌ Não | ⚠️ Opcional | ⚠️ Opcional |
| Critérios de qualidade | ❌ Não | ❌ Não | ✅ Obrigatório |

### Outputs

| Output | Simple | Deep | Expert |
|--------|--------|------|--------|
| Relatório consolidado | ✅ Básico | ✅ Detalhado | ✅ Completo |
| Artefatos intermediários | ❌ Não | ✅ Sim | ✅ Sim |
| Estrutura de diretórios | ✅ Básica | ✅ Completa | ✅ Muito Completa |
| Lista de tarefas | ❌ Não | ✅ Sim | ✅ Sim |
| Métricas de qualidade | ❌ Não | ❌ Não | ✅ Sim |
| Validação cruzada | ❌ Não | ✅ Sim | ✅ Sim + Métricas |
| Sínteses incrementais | ❌ Não | ✅ Sim | ✅ Sim + Por Categoria |

### Automação

| Aspecto | Simple | Deep | Expert |
|---------|--------|------|--------|
| Nível de automação | Totalmente automático | Semi-automático | Configurável |
| Pausas para revisão | ❌ Não | ✅ Sim (2 pausas) | ⚠️ Configurável |
| Intervenção do usuário | Zero | Mínima | Configurável |
| Tempo de execução | 3-5 min | 10-20 min | 30-60 min |

## Exemplos Práticos

### Exemplo 1: Validação Rápida de Conceito

**Cenário**: Você quer validar rapidamente se TypeScript decorators são uma boa escolha para seu projeto.

**Solução**: 
```bash
/research.simple.pipeline "TypeScript decorators best practices"
```

**Resultado**: Relatório básico em 3-5 minutos com visão geral e principais considerações.

### Exemplo 2: Análise Comparativa de Tecnologias

**Cenário**: Você precisa decidir entre React Server Components e SSR tradicional.

**Solução**:
```bash
/research.deep.pipeline "React Server Components vs SSR" medium "Comparar RSC com SSR tradicional, identificar trade-offs e casos de uso"
```

**Resultado**: Análise detalhada em 10-15 minutos com múltiplas perspectivas, lista de tarefas e validação cruzada.

### Exemplo 3: Revisão de Literatura Acadêmica

**Cenário**: Você precisa escrever um paper sobre fine-tuning de LLMs.

**Solução**:
```bash
/research.expert.pipeline "Large Language Models fine-tuning techniques" deep "Revisão de literatura sobre técnicas de fine-tuning de LLMs" "acadêmico rigoroso" interativo
```

**Resultado**: Pesquisa completa em 30-60 minutos com 100+ referências, métricas de qualidade, validação cruzada completa e relatório acadêmico.

### Exemplo 4: Progressão Iterativa

**Cenário**: Você quer explorar um tema novo e ajustar profundidade conforme aprende.

**Solução**:
```bash
# Passo 1: Visão geral
/research.simple.pipeline "WebAssembly performance optimization"

# Passo 2: Revisar relatório e identificar que precisa de mais detalhes sobre SIMD
/research.deep.pipeline "WebAssembly SIMD optimization" medium "Entender uso de SIMD em WebAssembly para otimização de performance"

# Passo 3: Revisar relatório e identificar que precisa de análise completa de técnicas
/research.expert.pipeline "WebAssembly performance optimization techniques" deep "Análise completa de técnicas de otimização de performance em WebAssembly" "técnico prático" configurável
```

**Resultado**: Progressão incremental de conhecimento com ajustes de direção baseados em descobertas.

## Recomendações de Uso

### Use Simple Quando:
- ✅ Você precisa de resposta rápida
- ✅ Tema é simples ou bem conhecido
- ✅ Você quer validar um conceito rapidamente
- ✅ Você tem < 5 minutos disponíveis
- ✅ Profundidade superficial é suficiente

### Use Deep Quando:
- ✅ Você precisa de análise detalhada
- ✅ Tema é moderadamente complexo
- ✅ Você quer múltiplas perspectivas
- ✅ Você tem 10-20 minutos disponíveis
- ✅ Você quer lista de tarefas para próximos passos

### Use Expert Quando:
- ✅ Você precisa de máxima profundidade
- ✅ Tema é muito complexo
- ✅ Você quer rigor acadêmico
- ✅ Você tem 30-60 minutos disponíveis
- ✅ Você precisa de métricas de qualidade
- ✅ Você quer validação cruzada completa
- ✅ Você está preparando material acadêmico ou profissional

## Integração com Outros Commands

### Commands que Podem Alimentar Research Pipelines

- `maker.command.md` - Gerar commands baseados em pesquisa
- `planner.feature.md` - Planejar features baseadas em pesquisa
- `analyzer.project.md` - Analisar projetos baseados em pesquisa

### Commands que Podem Usar Resultados de Research

- `exec.implement.md` - Implementar soluções baseadas em pesquisa
- `maker.rule.md` - Criar regras baseadas em descobertas
- `notify.report.md` - Reportar descobertas

## Estrutura de Diretórios

### Simple
```
./memory/[research-id]/
├── metadata.json
├── references/
│   └── REF-XXX-analysis.md (top 5)
├── final-report/
│   └── RESEARCH-REPORT.md
```

### Deep
```
./memory/[research-id]/
├── metadata.json
├── README.md
├── TASK-LIST.md
├── references/
│   └── REF-XXX-analysis.md (top 20%)
├── syntheses/
│   ├── initial-synthesis.md
│   └── FINAL-SYNTHESIS.md
├── validation/
│   └── validation-report.md
└── final-report/
    └── FINAL-REPORT.md
```

### Expert
```
./memory/[research-id]/
├── metadata.json
├── README.md
├── TASK-LIST.md
├── references/
│   └── REF-XXX-analysis.md (45+)
├── syntheses/
│   ├── synthesis-001.md
│   ├── synthesis-002.md
│   ├── ...
│   ├── category-XXX-synthesis.md
│   ├── comparative-analysis.md
│   ├── INTERMEDIATE-SYNTHESIS.md
│   └── FINAL-SYNTHESIS.md
├── validation/
│   ├── consistency-report.md
│   ├── completeness-report.md
│   ├── quality-report.md
│   └── FINAL-VALIDATION.md
├── metrics/
│   ├── category-distribution.json
│   └── quality-metrics.json
└── final-report/
    └── FULL-REPORT.md
```

## Métricas de Qualidade

### Simple
- Número de referências coletadas
- Número de referências analisadas
- Tempo de execução

### Deep
- Número de referências coletadas
- Número de referências analisadas
- Número de sínteses incrementais
- Tempo de execução
- Completude da lista de tarefas

### Expert
- Número de referências coletadas
- Número de referências analisadas
- Número de sínteses incrementais
- Número de sínteses por categoria
- Score de completude (0-10)
- Score de profundidade (0-10)
- Score de diversidade de fontes (0-10)
- Score de recência (0-10)
- Score de confiabilidade (0-10)
- **Score geral (0-10)**
- Tempo de execução

## Troubleshooting

### Problema: Simple não retorna informação suficiente

**Solução**: Execute Deep com objetivos específicos baseados nos gaps identificados.

### Problema: Deep não cobre todos os aspectos

**Solução**: Execute Expert com critérios de qualidade mais rigorosos.

### Problema: Expert está demorando muito

**Solução**: Use modo configurável ou automático para reduzir pausas.

### Problema: Não sei qual nível usar

**Solução**: Comece com Simple e progrida conforme necessário.

## Próximos Passos

1. Teste cada nível com um tema de sua escolha
2. Experimente diferentes fluxos de integração
3. Ajuste configurações conforme suas necessidades
4. Crie templates personalizados baseados em seus usos comuns
5. Integre com outros commands do sistema

## Conclusão

Os 3 níveis de pesquisa pipeline oferecem flexibilidade e poder para diferentes necessidades de pesquisa. A integração inteligente entre eles permite progressão incremental de conhecimento, ajuste de direção baseado em descobertas e máxima eficiência no uso do tempo.

**Princípio Fundamental**: Comece simples, aprofunde conforme necessário.

