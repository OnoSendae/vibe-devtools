---
description: Analisar profundamente referências top-scored, gerar relatórios detalhados para cada
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Executar análise profunda de cada referência top-scored, gerando relatórios detalhados individuais seguindo template `template.research-reference-analysis.md`. Este command acessa cada URL, extrai conteúdo, identifica findings, citações importantes, avalia criticamente e documenta tudo de forma estruturada e rastreável.

O output são múltiplos arquivos markdown (um por referência) salvos em `./memory/[RESEARCH_ID]/references/`, com metadados atualizados linkando a cada relatório. **TRIGGER** síntese incremental a cada N referências (configurável, padrão 10).

**Quando usar**: Após `/research.score`, quando referências foram pontuadas e top percentage aprovado.

**Pré-requisitos**: 
- Research com status "scored"
- Referências pontuadas com top percentage identificado

## Fluxo de Execução

### Fase 1: Carregar e Preparar

1. **Parsear Argumentos**:
   - Extrair research_id
   - Flags opcionais: `--ref-ids` (analisar IDs específicos), `--no-synthesis` (pular sínteses incrementais)

2. **Carregar Metadados**:
   - Validar status == "scored"
   - Extrair referências com `scoring.totalScore ≥ threshold`
   - Obter configuração de síntese (`synthesisInterval`, padrão 10)

3. **Filtrar Referências para Análise**:
   - SE `--ref-ids` fornecido: Analisar apenas esses IDs
   - SE NÃO: Analisar todas com `analysis.status == "pending"` ou sem análise
   - Ordenar por score (maior primeiro)

4. **Carregar Template**:
   - Path: `research/templates/template.research-reference-analysis.md`
   - Usar como base para relatórios

### Fase 2: Analisar Cada Referência

Para cada referência selecionada:

#### 2.1 Preparar Análise

1. **Marcar como In Progress**:
   ```json
   reference.analysis = {
     "status": "in_progress",
     "startedAt": "[TIMESTAMP]"
   };
   ```
   - Salvar metadata (para rastreamento)

2. **Acessar URL** (simulado):
   - Análise baseada em: URL, título, snippet, categoria
   - Nota: Acesso real a URLs pode ser limitado, usar informações disponíveis

#### 2.2 Análise Detalhada

1. **Executive Summary**:
   - Resumir conteúdo principal em 3-5 linhas
   - Identificar contribuição única desta fonte

2. **Key Findings** (mínimo 2, máximo 5):
   - Para cada finding:
     * Título claro
     * Descrição detalhada
     * Evidência (do snippet ou inferida)
     * Significância (por que importa)
     * Confidence Level (Very High/High/Medium/Low)

3. **Important Quotes**:
   - Extrair 2-4 citações relevantes do snippet
   - Adicionar contexto de cada citação

4. **Critical Evaluation**:
   
   **Strengths** (2-3):
   - Pontos fortes identificados
   
   **Limitations** (1-3):
   - Limitações ou fraquezas
   
   **Potential Biases**:
   - Vieses possíveis (comercial, temporal, geográfico)
   
   **Credibility Assessment**:
   - Reiterar avaliação de credibilidade
   - Reasoning detalhado

5. **Connections & Cross-References**:
   - Identificar outras referências relacionadas
   - Citar fontes mencionadas (para snowballing)
   - Avaliar alinhamento com objetivo da pesquisa

6. **Actionable Insights**:
   - Insights práticos derivados
   - Ações recomendadas

7. **Gaps & Questions**:
   - Perguntas levantadas mas não respondidas
   - Gaps de informação
   - Áreas para investigação futura

#### 2.3 Preencher Template

1. **Substituir Placeholders**:
   ```markdown
   # Reference Analysis: [REFERENCE_TITLE]
   
   **Reference ID**: [REF_ID]
   **Research**: [RESEARCH_ID]
   **Analyzed**: [TIMESTAMP]
   **Analyst**: ai
   
   ## Reference Metadata
   
   **URL**: [URL]
   **Source Type**: [CATEGORY]
   **Author(s)**: [EXTRACTED_OR_UNKNOWN]
   **Publication Date**: [EXTRACTED_OR_UNKNOWN]
   **Discovery Method**: [SOURCE]
   **Score**: [TOTAL_SCORE]/10
     - Credibility: [SCORE]/10
     - Relevance: [SCORE]/10
     - Recency: [SCORE]/10
     - Depth: [SCORE]/10
     - Authority: [SCORE]/10
   **Tags**: [TAGS]
   
   [... resto do template preenchido ...]
   ```

2. **Validar Completude**:
   - Todos placeholders preenchidos
   - Todas seções obrigatórias presentes
   - Mínimo de findings/quotes atingido

#### 2.4 Salvar Relatório

1. **Gerar Filename**:
   ```javascript
   const filename = `${reference.id}-${slugify(reference.title).substring(0, 50)}.md`;
   // Ex: REF-001-react-native-biometrics-official-docs.md
   ```

2. **Salvar Arquivo**:
   - Path: `./memory/[RESEARCH_ID]/references/[FILENAME]`
   - Encoding: UTF-8

3. **Atualizar Metadata da Referência**:
   ```json
   reference.analysis = {
     "status": "completed",
     "reportPath": "references/[FILENAME]",
     "keyFindings": [
       "Finding 1 summary",
       "Finding 2 summary"
     ],
     "quotes": [
       {
         "text": "Quote text",
         "context": "Quote context"
       }
     ],
     "analyzedAt": "[TIMESTAMP]"
   };
   ```

#### 2.5 Checkpoint de Síntese

**A cada `synthesisInterval` referências analisadas**:

1. **Verificar Contador**:
   ```javascript
   const analyzedCount = metadata.references.filter(
     r => r.analysis?.status === "completed"
   ).length;
   
   if (analyzedCount % synthesisInterval === 0) {
     // Trigger síntese incremental
   }
   ```

2. **Executar Síntese Incremental**:
   - Chamar `/research.synthesize [RESEARCH_ID] --incremental`
   - Aguardar conclusão
   - Continuar análise

3. **Log Progress**:
   ```markdown
   📊 Progresso: [X]/[TOTAL] referências analisadas ([X]%)
   ✅ Síntese incremental [N] gerada
   ```

### Fase 3: Consolidar Resultados

1. **Calcular Estatísticas**:
   ```javascript
   const stats = {
     totalAnalyzed: analyzedReferences.length,
     totalFindings: sum(refs.map(r => r.analysis.keyFindings.length)),
     totalQuotes: sum(refs.map(r => r.analysis.quotes.length)),
     averageConfidence: average(findings.map(f => confidenceToNumber(f))),
     categoriesAnalyzed: groupBy(refs, 'categories')
   };
   ```

2. **Identificar Padrões Preliminares**:
   - Tópicos recorrentes
   - Tecnologias mais mencionadas
   - Consensos emergentes

3. **Gerar Índice de Referências Analisadas**:
   ```markdown
   # References Analyzed - [RESEARCH_NAME]
   
   **Research ID**: [RESEARCH_ID]
   **Total Analyzed**: [N] / [TOTAL_TOP]
   **Last Updated**: [TIMESTAMP]
   
   ## By Score
   
   | Rank | ID | Title | Score | Report |
   |------|-----|-------|-------|--------|
   | 1 | REF-023 | [Title] | 9.4/10 | [Link](REF-023-...md) |
   | 2 | REF-045 | [Title] | 9.1/10 | [Link](REF-045-...md) |
   ...
   
   ## By Category
   
   ### Documentation ([N] refs)
   - [REF-XXX] - [Title] ([Score])
   
   ### Tutorial ([N] refs)
   - [REF-YYY] - [Title] ([Score])
   
   ...
   ```

4. **Salvar Índice**:
   - Path: `./memory/[RESEARCH_ID]/references/_index.md`

### Fase 4: Atualizar Metadados

1. **Atualizar Status e Estatísticas**:
   ```json
   {
     "status": "analyzing",
     "updated": "[TIMESTAMP]",
     "statistics": {
       "totalReferences": 87,
       "scoredReferences": 87,
       "analyzedReferences": 17
     },
     "notes": [
       ...existing,
       {
         "timestamp": "[TIMESTAMP]",
         "author": "ai",
         "content": "Analysis completed: 17/17 top refs analyzed, 3 syntheses generated"
       }
     ]
   }
   ```

2. **Salvar Metadata**:
   - Backup antes de salvar
   - Pretty-print JSON

### Fase 5: Síntese Final

**SE todas referências analisadas**:

1. **Executar Síntese Final**:
   - Chamar `/research.synthesize [RESEARCH_ID] --final`
   - Aguardar conclusão

2. **Atualizar Status**:
   ```json
   {
     "status": "synthesizing"
   }
   ```

### Fase 6: Reportar Conclusão

1. **Gerar Relatório de Análise**:
   ```markdown
   ✅ Análise Profunda Concluída!
   
   **Research**: [RESEARCH_NAME]
   **Research ID**: [RESEARCH_ID]
   
   ## Resultados da Análise
   
   **Referências Analisadas**: [N] / [TOTAL_TOP] ([X]%)
   
   **Estatísticas**:
   - Total de Findings: [N]
   - Total de Citações: [N]
   - Relatórios Gerados: [N] arquivos
   
   ## Sínteses Geradas
   
   **Mini-Sínteses**: [N] sínteses incrementais
   1. SYNTH-001: Após REF-001 a REF-010
   2. SYNTH-002: Após REF-011 a REF-017
   
   **Síntese Final**: SYNTH-FINAL.md (consolidação completa)
   
   ## Distribuição por Categoria
   
   | Category | Analyzed | Avg Score | Key Findings |
   |----------|----------|-----------|--------------|
   | documentation | [N] | [AVG] | [N] |
   | tutorial | [N] | [AVG] | [N] |
   | academic | [N] | [AVG] | [N] |
   | blog | [N] | [AVG] | [N] |
   
   ## Principais Padrões Identificados
   
   1. **[Pattern 1]**: [Brief description]
   2. **[Pattern 2]**: [Brief description]
   3. **[Pattern 3]**: [Brief description]
   
   ## Arquivos Gerados
   
   **Relatórios Individuais**: `./memory/[ID]/references/`
   - [N] arquivos markdown
   
   **Índice**: `./memory/[ID]/references/_index.md`
   
   **Sínteses**: `./memory/[ID]/syntheses/`
   - [N] mini-sínteses
   - 1 síntese final
   
   ## Próximos Passos
   
   ### Passo 1: Validação Cruzada
   ```
   /research.validate [RESEARCH_ID]
   ```
   
   Validar findings cruzando fontes, identificar consensos e divergências, gerar relatório final completo.
   
   **Estimativa**: ~[X] minutos
   
   ---
   
   **Quer iniciar validação automaticamente?** (sim/não)
   ```

2. **Perguntar Próximo Passo**:
   - "Quer que eu execute /research.validate agora?"
   - SE sim: Chamar research.validate
   - SE não: Finalizar

## Princípios Operacionais

### Padrões de Qualidade

- **Profundidade**: Análises DEVEM ser completas e detalhadas
- **Rastreabilidade**: Cada finding/quote DEVE ser rastreável à fonte
- **Objetividade**: Avaliação crítica DEVE ser equilibrada (strengths + limitations)
- **Estrutura Consistente**: TODOS os relatórios DEVEM seguir mesmo template
- **Síntese Progressiva**: SEMPRE executar sínteses incrementais

### Tratamento de Erros

- **Se research_id inválido**: ERRO
- **Se status != "scored"**: ERRO - "Execute /research.score primeiro"
- **Se nenhuma referência top**: ERRO - "Nenhuma referência para analisar"
- **Se análise falha**: Marcar `analysis.status = "failed"`, continuar com próxima
- **Se erro ao salvar relatório**: ERRO - Verificar permissões/espaço
- **Se síntese falha**: Log warning mas continuar análise

### Restrições

- SEMPRE analisar referências em ordem de score (maior→menor)
- SEMPRE usar template oficial
- SEMPRE preencher TODAS as seções obrigatórias
- SEMPRE salvar relatório individual por referência
- SEMPRE executar sínteses incrementais (a menos que --no-synthesis)
- SEMPRE atualizar metadata após cada análise
- SEMPRE gerar índice consolidado
- NUNCA pular referências sem razão clara
- NUNCA usar análise superficial ou incompleta
- NUNCA deixar placeholders vazios nos relatórios

### Otimizações

- **Batch Metadata Updates**: Atualizar metadata a cada N refs (não uma por uma)
- **Parallel Processing**: Se possível, analisar múltiplas refs em paralelo
- **Caching**: Cache informações comuns (autor patterns, domain reputation)

## Templates

### template.research-reference-analysis.md

**Propósito**: Estrutura para análise individual de referência

**Localização**: `research/templates/template.research-reference-analysis.md`

**Seções Obrigatórias**:
- Executive Summary
- Key Findings (min 2)
- Critical Evaluation
- Connections & Cross-References

## Exemplos

### Exemplo 1: Análise Bem-Sucedida

```
Input: /research.analyze rn-biometric-auth

Output:
Analisando referências top-scored...

[1/17] REF-023 - React Native Biometrics Official Docs (9.4/10)
  ✅ Análise completa → REF-023-rn-biometrics-official-docs.md
  
[2/17] REF-045 - Implementing Face ID Tutorial (9.1/10)
  ✅ Análise completa → REF-045-implementing-face-id-tutorial.md
  
...

[10/17] REF-067 - Biometric Security Best Practices (7.8/10)
  ✅ Análise completa → REF-067-biometric-security-best-practices.md
  📊 Síntese incremental SYNTH-001 gerada (10 refs)
  
...

[17/17] REF-089 - TouchID Android Implementation (7.2/10)
  ✅ Análise completa → REF-089-touchid-android-implementation.md
  📊 Síntese incremental SYNTH-002 gerada (7 refs)
  📊 Síntese final SYNTH-FINAL gerada

✅ Análise Profunda Concluída!

**Referências Analisadas**: 17/17 (100%)
**Total de Findings**: 67
**Total de Citações**: 42
**Sínteses**: 2 incrementais + 1 final

Próximo: /research.validate rn-biometric-auth

Quer iniciar validação automaticamente? _
```

### Exemplo 2: Análise Parcial com Falha

```
Input: /research.analyze api-perf-optimization

Output:
Analisando referências...

[1/12] REF-015 - Node.js Performance Tuning Guide (8.9/10)
  ✅ Análise completa
  
[2/12] REF-029 - Database Query Optimization (8.7/10)
  ❌ FALHA: Análise incompleta (timeout)
  ⚠️ Marcado como failed, continuando...
  
[3/12] REF-033 - Caching Strategies Comparison (8.5/10)
  ✅ Análise completa
  
...

✅ Análise Parcialmente Concluída

**Sucessos**: 11/12 (92%)
**Falhas**: 1 (REF-029)

**Próximo**: Revisar REF-029 manualmente ou re-executar:
```
/research.analyze api-perf-optimization --ref-ids REF-029
```
```

## Integração

### Posição no Workflow

**Precedido por**: `/research.score` (scoring e priorização)

**Seguido por**: `/research.validate` (validação cruzada e relatório final)

### Dependências

**Commands Obrigatórios**: 
- `/research.score` (precisa de refs pontuadas)

**Commands Relacionados**:
- `/research.synthesize` (chamado automaticamente durante análise)

**Templates Obrigatórios**:
- `research/templates/template.research-reference-analysis.md`
- `research/templates/template.research-synthesis.md` (para sínteses)

### Fluxo de Dados

```
/research.score
       ↓ (produz: Top refs pontuadas)
  /research.analyze ← VOCÊ ESTÁ AQUI
       ↓ (produz: Relatórios + Sínteses)
       ├─> /research.synthesize (incremental)
       └─> /research.synthesize (final)
  /research.validate
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

### Execução
- [ ] Research ID validado
- [ ] Status == "scored" verificado
- [ ] Top refs identificadas
- [ ] Template carregado

### Análise
- [ ] Todas refs top analisadas (ou falhas documentadas)
- [ ] Relatório individual gerado por ref
- [ ] Todas seções obrigatórias preenchidas
- [ ] Findings identificados (min 2 por ref)
- [ ] Avaliação crítica completa

### Sínteses
- [ ] Sínteses incrementais geradas (a cada N refs)
- [ ] Síntese final gerada
- [ ] Padrões preliminares identificados

### Outputs
- [ ] Relatórios salvos em references/
- [ ] Índice consolidado criado (_index.md)
- [ ] Metadata atualizado (analysis status, paths)
- [ ] Estatísticas calculadas

### Qualidade
- [ ] Análises profundas (não superficiais)
- [ ] Rastreabilidade completa
- [ ] Avaliação crítica equilibrada
- [ ] Pronto para validação cruzada

