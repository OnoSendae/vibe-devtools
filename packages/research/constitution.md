# Research Constitution

**Versão**: 1.0  
**Data**: 2025-01-16  
**Escopo**: Sistema de Pesquisa Profunda

---

## Princípios Fundamentais

### 1. Rigor Acadêmico
- Todas as afirmações DEVEM ser baseadas em evidências verificáveis
- Fontes DEVEM ser rastreáveis e citadas
- Validação cruzada é obrigatória para findings principais
- Metodologia DEVE ser transparente e replicável

### 2. Objetividade
- Análises DEVEM ser imparciais e balanceadas
- Vieses DEVEM ser identificados e documentados
- Múltiplas perspectivas DEVEM ser consideradas
- Limitações DEVEM ser claramente declaradas

### 3. Transparência
- Metodologia DEVEM ser documentada completamente
- Decisões DEVEM ser justificadas com reasoning
- Processo DEVE ser rastreável através de metadados
- Fontes DEVEM ser acessíveis e verificáveis

### 4. Qualidade
- Score mínimo de qualidade: 7.0/10
- Mínimo de fontes por pesquisa: 10
- Validação cruzada obrigatória
- Revisão de qualidade em cada fase

---

## Regras de Pesquisa

### Scoring de Referências

#### Dimensões Obrigatórias (5)
1. **Credibility** (25%): Autoridade e confiabilidade da fonte
2. **Relevance** (30%): Alinhamento com objetivo da pesquisa
3. **Recency** (15%): Atualidade da informação
4. **Depth** (20%): Profundidade e completude do conteúdo
5. **Authority** (10%): Credenciais do autor/organização

#### Critérios de Scoring
- **Range**: 0-10 (precisão: 1 casa decimal)
- **Pesos fixos**: Não alterar sem justificativa
- **Reasoning obrigatório**: Documentar por que cada score
- **Top percentage**: 20% para análise profunda (configurável)

### Análise de Referências

#### Requisitos Mínimos
- Mínimo 2 findings por referência
- Mínimo 2 citações importantes
- Avaliação crítica completa (strengths + limitations)
- Confidence level para cada finding

#### Avaliação Crítica
- Identificar pontos fortes
- Identificar limitações
- Identificar vieses potenciais
- Avaliar credibilidade geral

### Síntese de Findings

#### Sínteses Incrementais
- Gerar a cada 10 referências analisadas
- Identificar padrões com 3+ evidências
- Documentar gaps de informação
- Mapear consensos e divergências

#### Síntese Final
- Consolidar todas as sínteses incrementais
- Identificar top 10 insights principais
- Gerar recomendações acionáveis
- Documentar limitações e gaps

### Validação Cruzada

#### Consensos
- Identificar pontos de acordo entre fontes
- Calcular nível de confiança (very_high, high, medium, low)
- Documentar evidências de suporte
- Avaliar implicações

#### Divergências
- Identificar contradições entre fontes
- Analisar contextos diferentes
- Avaliar possíveis razões
- Determinar status (resolved, unresolved, requires_more_data)

#### Vieses
- Identificar vieses comerciais
- Identificar vieses temporais
- Identificar vieses geográficos
- Identificar vieses tecnológicos
- Avaliar impacto na pesquisa

---

## Convenções de Nomenclatura

### Research IDs
- Formato: kebab-case
- Máximo: 30 caracteres
- Exemplos: `auth-methods-2025`, `deep-learning-nlp`
- Não usar termos genéricos: `research`, `test`, `temp`

### Reference IDs
- Formato: `REF-XXX` (XXX = número sequencial com 3+ dígitos)
- Exemplos: `REF-001`, `REF-023`, `REF-145`
- Sequencial: Não pular números

### Synthesis IDs
- Incremental: `SYNTH-XXX` (XXX = número sequencial com 3 dígitos)
- Final: `SYNTH-FINAL`
- Exemplos: `SYNTH-001`, `SYNTH-002`, `SYNTH-FINAL`

### Timestamps
- Formato: ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- Timezone: UTC
- Exemplo: `2025-01-16T14:30:45.123Z`

### Scores
- Range: 0-10
- Precisão: 1 casa decimal
- Exemplo: `7.5`, `9.2`, `6.0`
- Weighted average obrigatório

---

## Idiomas e Localização

### Código e Estrutura
- **Código**: Inglês
- **Nomes de arquivos**: Inglês (kebab-case)
- **Variáveis**: Inglês (camelCase ou snake_case)
- **Comentários em código**: Inglês

### Conteúdo e Outputs
- **Relatórios**: Português brasileiro (PT-BR)
- **Análises**: Português brasileiro (PT-BR)
- **Documentação**: Português brasileiro (PT-BR)
- **Mensagens ao usuário**: Português brasileiro (PT-BR)

### Exceções
- **Citações**: Idioma original
- **Títulos de artigos**: Idioma original
- **Nomes próprios**: Forma original

---

## Estrutura de Diretórios

### Diretório Base
```
./memory/[research-id]/
```

### Subdiretórios Obrigatórios
- `references/` - Análises individuais de referências
- `syntheses/` - Sínteses incrementais e final
- `validation/` - Relatórios de validação cruzada
- `final-report/` - Relatório final completo

### Subdiretórios Opcionais
- `metrics/` - Métricas de qualidade (expert)
- `tasks/` - Lista de tarefas estruturada (deep/expert)

### Arquivos Obrigatórios
- `metadata.json` - Metadados completos da pesquisa
- `README.md` - Navegação e próximos passos

---

## Status da Pesquisa

### Estados Possíveis
1. **initialized** - Pesquisa inicializada, pronta para busca
2. **searching** - Busca de referências em andamento
3. **scored** - Referências pontuadas, aguardando análise
4. **analyzing** - Análise profunda em andamento
5. **synthesizing** - Síntese em andamento
6. **validating** - Validação cruzada em andamento
7. **completed** - Pesquisa concluída
8. **paused** - Pesquisa pausada pelo usuário
9. **cancelled** - Pesquisa cancelada

### Transições Válidas
```
initialized → searching → scored → analyzing → synthesizing → validating → completed
     ↓            ↓          ↓          ↓             ↓              ↓
  paused      paused     paused     paused        paused        paused
     ↓            ↓          ↓          ↓             ↓              ↓
 cancelled  cancelled  cancelled  cancelled     cancelled     cancelled
```

---

## Configurações Padrão

### Busca Inicial
- Máximo de referências: 100 (range: 10-200)
- Queries geradas: 5-8
- Ferramentas: web_search

### Scoring
- Top percentage: 20% (range: 5-50%)
- Pausar após scoring: true (configurável)
- Score mínimo: 7.0 (configurável)

### Análise
- Síntese a cada: 10 referências (range: 1-50)
- Mínimo de findings: 2
- Mínimo de citações: 2

### Validação
- Score mínimo de qualidade: 7.0/10
- Validação cruzada: obrigatória
- Relatório multi-parte: obrigatório

---

## Ferramentas de Busca

### web_search
- **Uso**: Queries gerais e amplas
- **Conteúdo**: Acadêmico, técnico, documentação
- **Limite**: 10-20 resultados por query

### web_search (MCP)
- **Uso**: Queries específicas e recentes
- **Conteúdo**: Resultados frescos, diversidade de fontes
- **Limite**: 10-20 resultados por query

### codebase_search
- **Uso**: Busca no repositório local
- **Conteúdo**: Código, documentação interna
- **Quando usar**: Pesquisas sobre o próprio projeto

---

## Qualidade e Validação

### Score de Qualidade (0-10)
- **Completude**: Cobertura do objetivo (0-2)
- **Profundidade**: Nível de análise (0-2)
- **Diversidade de fontes**: Variedade de perspectivas (0-2)
- **Recência**: Atualidade das fontes (0-2)
- **Confiabilidade**: Credibilidade das fontes (0-2)

### Critérios de Aprovação
- Score geral ≥ 7.0/10
- Mínimo 10 referências analisadas
- Validação cruzada completa
- Relatório final gerado

### Rejeição de Pesquisa
- Score < 5.0/10
- Menos de 5 referências analisadas
- Validação cruzada incompleta
- Metadados corrompidos

---

## Tratamento de Erros

### Erros Críticos
- Research ID não encontrado
- Metadata JSON corrompido
- Diretório base não existe
- Template não encontrado

**Ação**: Abortar pesquisa + reportar erro detalhado

### Erros Não-Críticos
- Referência individual falha
- Query retorna 0 resultados
- Análise parcial incompleta
- Síntese com gaps

**Ação**: Log warning + continuar com resto

### Warnings
- Menos de 10 referências encontradas
- Score médio < 6.0
- Divergências não resolvidas
- Gaps significativos

**Ação**: Reportar + sugerir ações

---

## Princípios de Integração

### Com Outros Sistemas
- **Input**: Aceita texto livre, arquivos .md, URLs
- **Output**: Estrutura padronizada em `./memory/`
- **Formato**: JSON (metadados) + Markdown (relatórios)

### Com Commands Externos
- **maker.command**: Usar findings para criar commands
- **planner.feature**: Usar insights para planejar features
- **exec.implement**: Usar recomendações para implementar
- **analyzer.project**: Usar metodologia para analisar projetos

---

## Revisão e Evolução

### Revisão Periódica
- Constitution deve ser revisada a cada 6 meses
- Regras devem ser atualizadas conforme feedback
- Convenções devem ser validadas com uso real

### Processo de Mudança
1. Proposta de mudança documentada
2. Discussão e validação
3. Implementação e testes
4. Documentação atualizada
5. Comunicação de mudanças

---

## Glossário

- **Research**: Pesquisa profunda sobre um tópico
- **Reference**: Fonte de informação coletada
- **Finding**: Descoberta ou insight de uma referência
- **Synthesis**: Consolidação de múltiplas referências
- **Consensus**: Acordo entre múltiplas fontes
- **Divergence**: Contradição entre fontes
- **Bias**: Viés ou distorção na informação
- **Snowballing**: Busca de referências citadas
- **Scoring**: Avaliação e pontuação de referências
- **Validation**: Validação cruzada de findings

---

**Última Atualização**: 2025-01-16  
**Próxima Revisão**: 2025-07-16  
**Versão**: 1.0

