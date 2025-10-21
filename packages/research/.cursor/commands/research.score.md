---
description: Avaliar e pontuar referências em 5 dimensões, identificar top 20% para análise profunda
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Avaliar e pontuar todas as referências encontradas na busca, aplicando scoring multi-dimensional (0-10) em credibilidade, relevância, recência, profundidade e autoridade. Este command analisa cada referência, extrai fatores de qualidade do conteúdo de entrada, calcula score ponderado, e identifica o top 20% para análise profunda subsequente.

O output é metadados atualizados com scores para todas as referências, estatísticas de distribuição, e lista priorizada para análise. **PAUSA** após scoring para aprovação humana (configurável), permitindo ajustes antes de investir tempo em análise profunda.

**Quando usar**: Logo após `/research.search`, quando referências foram coletadas e precisam ser priorizadas.

**Pré-requisitos**: 
- Research com status "searching" ou "initialized"
- Referências encontradas (`metadata.references` populado)

## Descoberta & Validação

Antes de pontuar, você **DEVE** validar:

### Informações Obrigatórias

1. **Research ID**: Qual pesquisa pontuar?
   - Se fornecido em $ARGUMENTS: Usar
   - Se não fornecido: ERRO

2. **Referências Existem**: Há referências para pontuar?
   - Validar que `metadata.references` não está vazio
   - Se vazio: ERRO - "Nenhuma referência para pontuar, execute /research.search primeiro"

### Preferências Opcionais

1. **Top Percentage**: Qual % analisar profundamente?
   - Padrão: 20% (top 20%)
   - Override: `--top-percent N` em $ARGUMENTS
   - Min: 5%, Max: 50%

2. **Skip Pause**: Pular pausa de aprovação?
   - Padrão: Pausar após scoring (configuração do metadata)
   - Override: `--no-pause` em $ARGUMENTS
   - Use apenas se confia 100% no scoring automático

3. **Score Threshold**: Score mínimo para análise?
   - Padrão: Usar top percentage
   - Override: `--min-score N` (0-10)
   - Se fornecido, sobrescreve top percentage

## Fluxo de Execução

### Fase 1: Carregar e Validar

1. **Parsear Argumentos**:
   - Extrair research_id (primeiro argumento)
   - Extrair flags: `--top-percent`, `--no-pause`, `--min-score`
   - Validar argumentos

2. **Carregar Metadados**:
   - Path: `./memory/[RESEARCH_ID]/metadata.json`
   - Parse JSON e validar
   - Extrair:
     * `objective` (para avaliar relevância)
     * `references` (array para pontuar)
     * `configuration.topPercentageForAnalysis`
     * `configuration.pauseAfterScoring`
     * `inputSources[].extractedKeywords`

3. **Validar Pre-requisitos**:
   - Status deve ser "searching" ou "initialized"
   - Array `references` não vazio (min 1 referência)
   - Se falhar: ERRO com mensagem clara

### Fase 2: Extrair Fatores de Scoring do Objetivo

1. **Analisar Objetivo da Pesquisa**:
   - Extrair palavras-chave críticas de `objective.question`
   - Extrair contexto de `objective.scope`
   - Identificar tecnologias, metodologias mencionadas
   - Identificar restrições temporais (ex: "últimos 2 anos")

2. **Criar Perfil de Relevância**:
   ```javascript
   const relevanceProfile = {
     keywords: ['keyword1', 'keyword2', ...],  // Must-have
     technologies: ['tech1', 'tech2'],          // Tecnologias específicas
     domains: ['domain1', 'domain2'],           // Domínios desejados
     temporalFocus: 'recent|current|historical', // Foco temporal
     contentTypes: ['tutorial', 'documentation', 'academic'], // Tipos preferidos
     excludePatterns: ['pattern1']              // Padrões a evitar
   };
   ```

3. **Definir Pesos de Dimensões**:
   ```javascript
   const weights = {
     credibility: 0.25,  // 25%
     relevance: 0.30,    // 30% (mais importante)
     recency: 0.15,      // 15%
     depth: 0.20,        // 20%
     authority: 0.10     // 10%
   };
   ```

### Fase 3: Pontuar Cada Referência

Para cada referência em `metadata.references`:

#### 3.1 Avaliar Credibilidade (0-10)

**Fatores**:
- **Domínio confiável**: `.edu`, `.gov`, docs oficiais → 8-10
- **Domínio conhecido**: GitHub, Medium, Dev.to → 6-8
- **Domínio desconhecido**: → 3-6
- **Domínios suspeitos**: Spam patterns → 0-2

**Verificações**:
```javascript
let credibilityScore = 5; // Base

if (url.includes('.edu') || url.includes('.gov')) {
  credibilityScore += 3;
} else if (isOfficialDocs(url)) {
  credibilityScore += 4;
} else if (isKnownPlatform(url)) {  // GitHub, StackOverflow, etc
  credibilityScore += 2;
}

if (hasSSL(url)) credibilityScore += 1;
if (isDomainReputated(url)) credibilityScore += 1;

credibilityScore = Math.min(10, credibilityScore);
```

**Reasoning**: Documentar por que este score

#### 3.2 Avaliar Relevância (0-10)

**Fatores**:
- **Keywords match**: Quantos keywords do objetivo aparecem?
- **Title alignment**: Título alinhado com pergunta?
- **Snippet quality**: Snippet menciona conceitos-chave?
- **Category match**: Categoria alinha com tipo buscado?

**Cálculo**:
```javascript
let relevanceScore = 0;

// Keywords no título e snippet
const keywordMatches = countKeywordMatches(
  title + ' ' + snippet,
  relevanceProfile.keywords
);
relevanceScore += Math.min(5, keywordMatches);

// Tecnologias mencionadas
const techMatches = countMatches(
  title + ' ' + snippet,
  relevanceProfile.technologies
);
relevanceScore += Math.min(3, techMatches);

// Alinhamento semântico
const semanticAlignment = assessSemanticAlignment(
  title + ' ' + snippet,
  objective.question
);
relevanceScore += semanticAlignment; // 0-2

relevanceScore = Math.min(10, relevanceScore);
```

**Reasoning**: Documentar keywords encontrados e alinhamento

#### 3.3 Avaliar Recência (0-10)

**Fatores**:
- **Data de publicação**: Se disponível no snippet/URL
- **Domínio atualizado**: Sites ativamente mantidos
- **Conteúdo evergreen vs temporal**: Alguns tópicos não exigem recência

**Heurísticas**:
```javascript
let recencyScore = 5; // Base (assume moderadamente recente)

// Tentar extrair ano de URL ou snippet
const year = extractYear(url, snippet);

if (year) {
  const currentYear = 2025;
  const age = currentYear - year;
  
  if (age === 0) recencyScore = 10;      // Este ano
  else if (age === 1) recencyScore = 9;  // Ano passado
  else if (age === 2) recencyScore = 7;  // 2 anos
  else if (age <= 5) recencyScore = 5;   // 3-5 anos
  else if (age <= 10) recencyScore = 3;  // 6-10 anos
  else recencyScore = 1;                 // >10 anos
}

// Ajustar se tópico é evergreen
if (isEvergreenTopic(objective)) {
  recencyScore += 2; // Menos penalidade por idade
}

recencyScore = Math.min(10, recencyScore);
```

**Reasoning**: Documentar ano e lógica

#### 3.4 Avaliar Profundidade (0-10)

**Fatores**:
- **Snippet length**: Snippets longos → mais conteúdo
- **Keywords diversity**: Mais keywords → mais completo
- **Content indicators**: "tutorial", "guide", "comprehensive" → profundo
- **Domain patterns**: Documentação oficial → geralmente profunda

**Cálculo**:
```javascript
let depthScore = 3; // Base (assume básico)

// Snippet length
if (snippet.length > 200) depthScore += 2;
else if (snippet.length > 100) depthScore += 1;

// Indicadores de profundidade no título/snippet
const depthIndicators = [
  'tutorial', 'guide', 'comprehensive', 'complete',
  'in-depth', 'detailed', 'deep dive', 'advanced'
];
const hasIndicators = depthIndicators.some(ind => 
  (title + snippet).toLowerCase().includes(ind)
);
if (hasIndicators) depthScore += 3;

// Tipo de conteúdo
if (categories.includes('documentation')) depthScore += 2;
if (categories.includes('academic')) depthScore += 3;
if (categories.includes('tutorial')) depthScore += 2;

depthScore = Math.min(10, depthScore);
```

**Reasoning**: Documentar indicadores encontrados

#### 3.5 Avaliar Autoridade (0-10)

**Fatores**:
- **Autor conhecido**: Experts da área
- **Organização reputada**: Empresas/universidades conhecidas
- **Domínio autoritativo**: Sites referência da área
- **Citations/popularity**: Se detectável (ex: GitHub stars)

**Cálculo**:
```javascript
let authorityScore = 5; // Base

// Organizações conhecidas
const authoritativeOrgs = [
  'mozilla.org', 'w3.org', 'github.com', 'reactnative.dev',
  'microsoft.com', 'google.com', 'aws.amazon.com'
];
if (authoritativeOrgs.some(org => url.includes(org))) {
  authorityScore += 3;
}

// Academic
if (url.includes('.edu') || categories.includes('academic')) {
  authorityScore += 2;
}

// Padrões de autoridade no título
const authorityPatterns = ['official', 'documentation', 'reference'];
if (authorityPatterns.some(p => title.toLowerCase().includes(p))) {
  authorityScore += 2;
}

authorityScore = Math.min(10, authorityScore);
```

**Reasoning**: Documentar fonte de autoridade

#### 3.6 Calcular Score Total Ponderado

```javascript
const totalScore = (
  (credibilityScore * weights.credibility) +
  (relevanceScore * weights.relevance) +
  (recencyScore * weights.recency) +
  (depthScore * weights.depth) +
  (authorityScore * weights.authority)
);

// Arredondar para 1 casa decimal
const finalScore = Math.round(totalScore * 10) / 10;
```

#### 3.7 Atualizar Referência com Scoring

```javascript
reference.scoring = {
  totalScore: finalScore,
  dimensions: {
    credibility: credibilityScore,
    relevance: relevanceScore,
    recency: recencyScore,
    depth: depthScore,
    authority: authorityScore
  },
  reasoning: `
    Credibility (${credibilityScore}/10): [Reasoning]
    Relevance (${relevanceScore}/10): [Reasoning]
    Recency (${recencyScore}/10): [Reasoning]
    Depth (${depthScore}/10): [Reasoning]
    Authority (${authorityScore}/10): [Reasoning]
  `,
  scoredAt: new Date().toISOString()
};
```

### Fase 4: Calcular Estatísticas

1. **Ordenar Referências por Score**:
   ```javascript
   const sortedRefs = metadata.references.sort(
     (a, b) => b.scoring.totalScore - a.scoring.totalScore
   );
   ```

2. **Calcular Distribuição**:
   ```javascript
   const stats = {
     totalReferences: sortedRefs.length,
     scoredReferences: sortedRefs.length,
     averageScore: average(sortedRefs.map(r => r.scoring.totalScore)),
     medianScore: median(sortedRefs.map(r => r.scoring.totalScore)),
     referencesByScore: {
       high: sortedRefs.filter(r => r.scoring.totalScore >= 7.0).length,
       medium: sortedRefs.filter(r => r.scoring.totalScore >= 4.0 && r.scoring.totalScore < 7.0).length,
       low: sortedRefs.filter(r => r.scoring.totalScore < 4.0).length
     }
   };
   ```

3. **Identificar Top Percentage**:
   ```javascript
   const topPercent = configuration.topPercentageForAnalysis;
   const topCount = Math.ceil(sortedRefs.length * topPercent);
   
   const topRefs = sortedRefs.slice(0, topCount);
   const thresholdScore = topRefs[topRefs.length - 1].scoring.totalScore;
   
   stats.topScoredCount = topCount;
   stats.scoreThreshold = thresholdScore;
   ```

### Fase 5: Gerar Relatório de Scoring

1. **Criar Relatório Detalhado**:
   ```markdown
   ## 📊 Scoring Completo
   
   **Research**: [RESEARCH_NAME]
   **Research ID**: [RESEARCH_ID]
   **Scored at**: [TIMESTAMP]
   
   ### Estatísticas
   
   **Total Scored**: [N] referências
   **Average Score**: [AVG]/10
   **Median Score**: [MEDIAN]/10
   
   **Distribuição**:
   - High (≥7.0): [N] ([X]%)  ████████████
   - Medium (4.0-6.9): [N] ([X]%)  ████████
   - Low (<4.0): [N] ([X]%)  ████
   
   ### Top [X]% para Análise Profunda
   
   **Count**: [N] referências
   **Threshold Score**: ≥ [THRESHOLD]/10
   
   #### Top 10 Referências
   
   1. **[TITLE]** - Score: [SCORE]/10
      - URL: [URL]
      - Reasoning: [BRIEF_REASONING]
      - Dimensions: C:[X] R:[X] Rec:[X] D:[X] A:[X]
   
   2. **[TITLE]** - Score: [SCORE]/10
      ...
   
   ### Dimensões - Médias
   
   | Dimension | Avg Score | Std Dev |
   |-----------|-----------|---------|
   | Credibility | [AVG]/10 | [STD] |
   | Relevance | [AVG]/10 | [STD] |
   | Recency | [AVG]/10 | [STD] |
   | Depth | [AVG]/10 | [STD] |
   | Authority | [AVG]/10 | [STD] |
   
   ### Categorias no Top [X]%
   
   | Category | Count | Percentage |
   |----------|-------|------------|
   | documentation | [N] | [X]% |
   | tutorial | [N] | [X]% |
   | academic | [N] | [X]% |
   | blog | [N] | [X]% |
   | other | [N] | [X]% |
   ```

2. **Salvar Relatório**:
   - Path: `./memory/[RESEARCH_ID]/scoring-report.md`
   - Markdown format

### Fase 6: Pausa para Aprovação (Condicional)

**SE `configuration.pauseAfterScoring == true` E `--no-pause` NÃO fornecido**:

1. **Apresentar Resumo ao Usuário**:
   ```markdown
   ⏸️ APROVAÇÃO NECESSÁRIA
   
   **[N] referências pontuadas**
   **Top [X]% identificado**: [N] referências (score ≥ [THRESHOLD])
   
   ### Top 5 Referências Selecionadas:
   
   1. [TITLE] - [SCORE]/10
   2. [TITLE] - [SCORE]/10
   3. [TITLE] - [SCORE]/10
   4. [TITLE] - [SCORE]/10
   5. [TITLE] - [SCORE]/10
   
   ### Ações Disponíveis:
   
   1. **APPROVE**: Prosseguir com análise profunda destas [N] referências
   2. **ADJUST**: Ajustar threshold ou percentage
      - Opções: `--top-percent N` ou `--min-score N`
   3. **REVIEW**: Revisar lista completa antes de decidir
      - Ver: `./memory/[ID]/scoring-report.md`
   4. **MANUAL**: Marcar manualmente quais analisar
   
   **Escolha [1-4]**: _
   ```

2. **Processar Escolha**:
   - **APPROVE**: Atualizar metadata e prosseguir
   - **ADJUST**: Re-calcular top refs com novos parâmetros
   - **REVIEW**: Mostrar relatório completo e aguardar
   - **MANUAL**: Permitir seleção manual de IDs

**SE `pauseAfterScoring == false` OU `--no-pause` fornecido**:
- Pular aprovação, usar top percentage automaticamente

### Fase 7: Atualizar Metadados

1. **Atualizar Campos**:
   ```json
   {
     "status": "scored",
     "updated": "[TIMESTAMP]",
     "references": [
       // Array com todas refs + scoring
     ],
     "statistics": {
       "totalReferences": 87,
       "scoredReferences": 87,
       "analyzedReferences": 0,
       "averageScore": 6.3,
       "topScoredCount": 17,
       "scoreThreshold": 7.2,
       "referencesByScore": {
         "high": 24,
         "medium": 51,
         "low": 12
       }
     },
     "notes": [
       ...existing,
       {
         "timestamp": "[TIMESTAMP]",
         "author": "ai",
         "content": "Scoring completed: 87 refs scored, top 17 (20%) identified for analysis"
       }
     ]
   }
   ```

2. **Salvar Metadados**:
   - Pretty-print JSON
   - Backup anterior antes de salvar

### Fase 8: Reportar e Preparar Próximo Passo

1. **Reportar Conclusão**:
   ```markdown
   ✅ Scoring Concluído!
   
   **Research**: [RESEARCH_NAME]
   
   ## Resultados
   
   **Total Scored**: [N] referências
   **Average Score**: [AVG]/10
   
   **Top [X]% Selecionado**: [N] referências
   **Score Threshold**: ≥ [THRESHOLD]/10
   
   ## Distribuição
   
   - High (≥7.0): [N] ([X]%)
   - Medium (4.0-6.9): [N] ([X]%)
   - Low (<4.0): [N] ([X]%)
   
   ## Próximos Passos
   
   ### Passo 1: Análise Profunda
   ```
   /research.analyze [RESEARCH_ID]
   ```
   
   Analisar em profundidade as [N] referências top-scored, gerando relatórios detalhados para cada uma.
   
   **Estimativa de tempo**: ~[X] minutos ([N] refs × 2-3 min/ref)
   
   **Sínteses incrementais**: A cada 10 referências analisadas
   
   ---
   
   **Relatório completo**: `./memory/[ID]/scoring-report.md`
   
   **Quer iniciar análise profunda automaticamente?** (sim/não)
   ```

2. **Perguntar Execução Automática**:
   - "Quer que eu execute /research.analyze agora?"
   - SE sim: Chamar research.analyze
   - SE não: Apenas reportar

## Princípios Operacionais

### Padrões de Qualidade

- **Objetividade**: Scoring DEVE ser baseado em critérios claros e documentados
- **Transparência**: Reasoning de cada score DEVE ser documentado
- **Consistência**: Mesmos critérios aplicados a todas referências
- **Rastreabilidade**: Scores e reasoning DEVEM ser salvos em metadata
- **Validação Humana**: SEMPRE pausar para aprovação (a menos que explicitamente desabilitado)

### Tratamento de Erros

- **Se research_id não fornecido**: ERRO
- **Se research não existe**: ERRO
- **Se nenhuma referência**: ERRO - "Execute /research.search primeiro"
- **Se referências já pontuadas**: AVISAR - "Re-scoring?" (sim/não)
- **Se erro ao calcular score**: Log warning, usar score padrão 5.0
- **Se metadata corrompido**: ERRO - Sugerir backup/restauração

### Restrições

- SEMPRE pontuar TODAS as referências (não pular)
- SEMPRE calcular todas 5 dimensões
- SEMPRE calcular score ponderado
- SEMPRE documentar reasoning
- SEMPRE ordenar por score (maior → menor)
- SEMPRE calcular estatísticas completas
- SEMPRE identificar top percentage
- SEMPRE pausar para aprovação (a menos que --no-pause)
- SEMPRE salvar scoring-report.md
- NUNCA sobrescrever scores sem confirmação (se re-scoring)
- NUNCA usar scores arbitrários sem reasoning

## Exemplos

### Exemplo 1: Scoring Bem-Sucedido

```
Input: /research.score rn-biometric-auth

Output:
✅ Scoring Concluído!

**Research**: Autenticação Biométrica em React Native

## Resultados

**Total Scored**: 87 referências
**Average Score**: 6.3/10

**Top 20% Selecionado**: 17 referências
**Score Threshold**: ≥ 7.2/10

## Distribuição

- High (≥7.0): 24 (28%)  ████████
- Medium (4.0-6.9): 51 (59%)  ███████████████
- Low (<4.0): 12 (14%)  ████

## Top 5 Referências

1. **React Native Biometrics Official Docs** - 9.4/10
   - Credibility: 10, Relevance: 10, Recency: 9, Depth: 9, Authority: 9

2. **Implementing Face ID Tutorial** - 8.9/10
   - Credibility: 8, Relevance: 10, Recency: 10, Depth: 8, Authority: 8

...

Próximo: /research.analyze rn-biometric-auth

Quer iniciar análise profunda automaticamente? _
```

### Exemplo 2: Ajuste de Threshold

```
Input: /research.score api-perf-optimization --min-score 8.0

Output:
✅ Scoring Concluído!

**Total Scored**: 142 referências
**Average Score**: 5.9/10

**Score Threshold Customizado**: ≥ 8.0/10
**Selecionado**: 12 referências (8.5% do total)

⚠️ Threshold alto pode limitar análise.
Recomendação: Considere --min-score 7.0 para 25 referências (18%)

Prosseguir com threshold 8.0? (sim/ajustar)
```

## Integração

### Posição no Workflow

**Precedido por**: `/research.search` (busca de referências)

**Seguido por**: `/research.analyze` (análise profunda)

### Dependências

**Commands Obrigatórios**: 
- `/research.search` (deve ter referências)

**Commands Opcionais**: Nenhum

### Fluxo de Dados

```
/research.search
       ↓ (produz: Referências)
  /research.score ← VOCÊ ESTÁ AQUI
       ↓ (produz: Referências pontuadas + Top list)
  /research.analyze
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar scoring completo:

### Execução
- [ ] Research ID validado
- [ ] Metadata carregado
- [ ] Todas referências pontuadas (100%)
- [ ] 5 dimensões calculadas para cada
- [ ] Scores ponderados calculados
- [ ] Reasoning documentado

### Resultados
- [ ] Referências ordenadas por score
- [ ] Estatísticas calculadas (avg, median, distribuição)
- [ ] Top percentage identificado
- [ ] Threshold definido
- [ ] Relatório gerado e salvo

### Aprovação
- [ ] Pausa executada (se configurado)
- [ ] Usuário aprovou OU --no-pause usado
- [ ] Ajustes aplicados (se solicitados)

### Metadados
- [ ] Status atualizado para "scored"
- [ ] statistics completo
- [ ] Scores salvos em metadata
- [ ] Note adicionada

