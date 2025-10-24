---
description: Validar findings cruzando fontes, gerar relatório final completo e marcar pesquisa como concluída
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Executar validação cruzada de todos os findings da pesquisa, mapear consensos e divergências com nível de confiança, identificar vieses, e gerar relatório final completo e multi-parte seguindo `template.research-report.md`. Este é o command final do pipeline, consolidando toda a pesquisa em documento compreensivo e acionável.

O output é um relatório final extenso dividido em capítulos salvos em `./memory/[RESEARCH_ID]/final-report/`, um arquivo consolidado completo (FULL-REPORT.md), e metadata atualizado com status "completed".

**Quando usar**: Após `/research.synthesize --final`, quando todas referências foram analisadas e síntese final gerada.

**Pré-requisitos**: 
- Research com síntese final completa
- Todas referências top-scored analisadas
- Status "synthesizing" ou "analyzing"

## Fluxo de Execução

### Fase 1: Carregar Dados Consolidados

1. **Parsear Argumentos**:
   - Research ID (obrigatório)
   - Flags: `--skip-chapters` (gerar apenas FULL-REPORT), `--format json` (gerar também JSON)

2. **Carregar Metadados**:
   - Validar research existe
   - Validar status (deve ter síntese final)
   - Extrair todas informações necessárias

3. **Carregar Artefatos**:
   - **Síntese Final**: `syntheses/SYNTH-FINAL.md`
   - **Sínteses Incrementais**: `syntheses/SYNTH-00*.md`
   - **Análises Individuais**: Todos arquivos em `references/`
   - **Scoring Report**: `scoring-report.md`

4. **Agregar Dados Completos**:
   ```javascript
   const researchData = {
     objective: metadata.objective,
     allReferences: metadata.references,
     analyzedReferences: refs.filter(r => r.analysis?.status === 'completed'),
     allFindings: extractAllFindings(),
     allQuotes: extractAllQuotes(),
     patterns: extractPatterns(),
     consensus: extractConsensusPoints(),
     divergences: extractDivergences(),
     gaps: extractGaps()
   };
   ```

### Fase 2: Validação Cruzada

#### 2.1 Mapear Consensus Points

1. **Identificar Findings Convergentes**:
   - Comparar findings de todas as refs
   - Agrupar por similaridade semântica
   - Identificar statements repetidos/similares

2. **Calcular Nível de Confiança**:
   ```javascript
   for (const consensusTopic of topics) {
     const supportingRefs = findSupportingRefs(consensusTopic);
     const avgCredibility = average(supportingRefs.map(r => r.scoring.dimensions.credibility));
     const coverage = supportingRefs.length / totalAnalyzedRefs;
     
     let confidenceLevel;
     if (coverage >= 0.7 && avgCredibility >= 8) {
       confidenceLevel = 'very_high';
     } else if (coverage >= 0.5 && avgCredibility >= 6) {
       confidenceLevel = 'high';
     } else if (coverage >= 0.3) {
       confidenceLevel = 'medium';
     } else {
       confidenceLevel = 'low';
     }
     
     consensusPoints.push({
       finding: consensusTopic,
       supportingReferences: supportingRefs.map(r => r.id),
       confidenceLevel: confidenceLevel
     });
   }
   ```

3. **Documentar Cada Consenso**:
   ```markdown
   ### Consensus 1: Native Modules Preferred
   
   **Finding**: Native modules are strongly recommended for biometric
   authentication due to security concerns
   
   **Supporting References**: 
   - REF-023 (9.4/10): "Native implementation is crucial for security"
   - REF-045 (9.1/10): "JavaScript-only solutions are inherently less secure"
   - REF-067 (7.8/10): "Platform-specific native code recommended"
   
   **Confidence Level**: Very High
   - Coverage: 88% (15/17 refs)
   - Avg Credibility: 8.7/10
   
   **Implication**: Strongly adopt native module approach for production apps
   ```

#### 2.2 Mapear Divergências

1. **Identificar Contradições**:
   - Findings que se contradizem
   - Recomendações opostas
   - Avaliações divergentes de mesma tecnologia/abordagem

2. **Analisar Contextos**:
   ```javascript
   for (const divergence of divergences) {
     const perspectives = groupByPerspective(divergence);
     
     for (const perspective of perspectives) {
       analyzeContext({
         temporalContext: extractPublicationDates(perspective.refs),
         technicalContext: extractTechnologies(perspective.refs),
         domainContext: extractDomains(perspective.refs),
         potentialBiases: identifyBiases(perspective.refs)
       });
     }
   }
   ```

3. **Determinar Resolução**:
   - **Resolved**: Divergência explicada por contexto diferente
   - **Unresolved**: Genuína discordância sem resolução clara
   - **Requires more data**: Precisa de mais pesquisa

#### 2.3 Identificar Vieses

1. **Tipos de Vieses a Detectar**:
   - **Comercial**: Refs favorecendo produtos específicos
   - **Temporal**: Informação desatualizada
   - **Geográfico**: Foco em regiões específicas
   - **Tecnológico**: Preferência por stacks específicos
   - **Confirmação**: Apenas evidências que suportam hipótese
   - **Publicação**: Viés de seleção de fontes

2. **Para Cada Viés Identificado**:
   ```markdown
   ### Bias: Commercial Bias Toward Library X
   
   **Type**: Commercial
   
   **Description**: 3 referências favorecem Library X sem mencionar
   alternativas, todas publicadas por empresa que mantém Library X
   
   **Affected References**: REF-012, REF-034, REF-056
   
   **Impact**: Baixo - Outras 14 refs fornecem perspectiva balanceada
   
   **Mitigation**: Cross-reference com refs independentes
   ```

### Fase 3: Responder Pergunta de Pesquisa

1. **Restate Pergunta Central**:
   - Da `objective.question`

2. **Formular Resposta Completa**:
   - Baseado em todos findings validados
   - Incorporar consensos (alta confiança primeiro)
   - Mencionar divergências relevantes
   - Citar evidências específicas

3. **Avaliar Confiança na Resposta**:
   ```javascript
   const answerConfidence = calculateConfidence({
     consensusStrength: percentageHighConfidenceConsensus,
     evidenceQuality: avgCredibilityOfSources,
     coverage: percentageObjectiveCovered,
     divergenceResolution: percentageDivergencesResolved
   });
   ```

4. **Documentar Caveats**:
   - Limitações da resposta
   - Áreas de incerteza
   - Condições aplicáveis

### Fase 4: Gerar Recomendações Finais

1. **Recomendações Acionáveis** (3-7):
   - Baseadas em high-confidence findings
   - Priorizadas (High/Medium/Low)
   - Com effort estimado
   - Com expected outcomes

2. **Para Cada Recomendação**:
   ```markdown
   #### Recommendation 1: Adopt Native Biometric Modules
   
   **Priority**: High
   
   **Description**: Implement biometric auth using platform-native
   modules (react-native-biometrics or similar) instead of JS-only
   
   **Rationale**: 88% refs strongly recommend, security significantly
   better, industry standard
   
   **Expected Outcome**: 
   - More secure authentication
   - Better platform integration
   - Compliance with security standards
   
   **Implementation Effort**: Medium (2-3 weeks)
   
   **Dependencies**: 
   - Native development expertise
   - Platform-specific setup
   ```

3. **Pesquisas Futuras Necessárias**:
   - Gaps não preenchidos
   - Áreas emergentes
   - Follow-up questions

### Fase 5: Gerar Capítulos do Relatório

1. **Carregar Template**:
   - Path: `research/templates/template.research-report.md`

2. **Dividir em Capítulos**:
   ```javascript
   const chapters = [
     '01-executive-summary.md',
     '02-methodology.md',
     '03-findings.md',
     '04-analysis.md',
     '05-discussion.md',
     '06-recommendations.md',
     '07-limitations.md',
     '08-references.md',
     '09-appendices.md'
   ];
   ```

3. **Para Cada Capítulo**:
   - Extrair seção correspondente do template
   - Preencher com dados da pesquisa
   - Salvar em `final-report/[CHAPTER_FILE]`

4. **Capítulos Específicos**:

**01-executive-summary.md**:
- Parágrafo executivo
- Top 3-5 findings
- Confiança/completeness/aplicabilidade

**02-methodology.md**:
- Processo completo
- Queries executadas
- Scoring methodology
- Validation approach

**03-findings.md**:
- Primary findings (3-5 detalhados)
- Secondary findings
- Unexpected discoveries

**04-analysis.md**:
- Padrões identificados
- Consensus areas
- Divergent perspectives
- Evidence quality

**05-discussion.md**:
- Resposta à pergunta central
- Interpretação contextual
- Implicações teóricas/práticas

**06-recommendations.md**:
- Actionable recommendations
- Further research needed

**07-limitations.md**:
- Methodological limitations
- Data limitations
- Interpretation limitations

**08-references.md**:
- High-impact refs (top 10)
- All refs by category
- Statistics

**09-appendices.md**:
- Timeline
- Full statistics
- Artifacts location
- Glossary

### Fase 6: Gerar Relatório Consolidado

1. **Executar Script de Merge**:
   ```bash
   vibes/scripts/bash/merge-research-report.sh \
     ./memory/[RESEARCH_ID]/final-report
   ```

2. **Validar FULL-REPORT.md**:
   - Todos capítulos incluídos
   - Estrutura coerente
   - TOC atualizado
   - Formatação consistente

3. **Gerar Versão JSON** (opcional):
   - Estrutura de dados JSON
   - Facilita processamento posterior
   - Path: `final-report/FULL-REPORT.json`

### Fase 7: Criar Relatório de Validação

1. **Gerar validation-report.md**:
   ```markdown
   # Validation Report: [RESEARCH_NAME]
   
   **Research ID**: [RESEARCH_ID]
   **Validated**: [TIMESTAMP]
   
   ## Validation Summary
   
   **Consensus Points**: [N] identified
   - Very High Confidence: [N]
   - High Confidence: [N]
   - Medium Confidence: [N]
   - Low Confidence: [N]
   
   **Divergences**: [N] identified
   - Resolved: [N]
   - Unresolved: [N]
   - Requires more data: [N]
   
   **Biases**: [N] identified
   - Commercial: [N]
   - Temporal: [N]
   - Other: [N]
   
   **Overall Confidence in Findings**: [LEVEL]
   
   [... detalhes completos ...]
   ```

2. **Salvar em**:
   - Path: `./memory/[ID]/validation/validation-report.md`

### Fase 8: Atualizar Metadados Finais

1. **Atualizar Campos**:
   ```json
   {
     "status": "completed",
     "updated": "[TIMESTAMP]",
     "validation": {
       "consensus": [...],
       "divergences": [...],
       "biases": [...],
       "reportPath": "validation/validation-report.md",
       "completedAt": "[TIMESTAMP]"
     },
     "synthesis": {
       "finalSynthesis": {
         "reportPath": "syntheses/SYNTH-FINAL.md",
         "chapterPaths": [
           "final-report/01-executive-summary.md",
           ...
         ],
         "completedAt": "[TIMESTAMP]"
       }
     },
     "paths": {
       ...existing,
       "finalReportFile": "final-report/FULL-REPORT.md"
     },
     "notes": [
       ...existing,
       {
         "timestamp": "[TIMESTAMP]",
         "author": "ai",
         "content": "Research completed successfully. Final report generated with [N] findings, [N] recommendations."
       }
     ]
   }
   ```

2. **Salvar Metadata**:
   - Backup final
   - Pretty-print JSON

### Fase 9: Gerar Relatório de Conclusão

```markdown
🎉 Pesquisa Concluída com Sucesso!

**Research**: [RESEARCH_NAME]
**Research ID**: [RESEARCH_ID]
**Duration**: [DAYS/HOURS]

## Estatísticas Finais

**Referências**:
- Encontradas: [N]
- Pontuadas: [N]
- Analisadas: [N] (top [X]%)

**Análise**:
- Key Findings: [N]
- Citações Extraídas: [N]
- Padrões Identificados: [N]

**Síntese**:
- Mini-Sínteses: [N]
- Síntese Final: ✅

**Validação**:
- Consensos: [N] ([N] high-confidence)
- Divergências: [N] ([N] resolved)
- Vieses Identificados: [N]

## Principais Achados

1. **[Finding 1]**: [Brief description]
2. **[Finding 2]**: [Brief description]
3. **[Finding 3]**: [Brief description]

## Resposta à Pergunta Central

**Pergunta**: [OBJECTIVE_QUESTION]

**Resposta**: [1-2 parágrafos sumarizando resposta]

**Confidence**: [LEVEL] ([X]% dos critérios de sucesso atingidos)

## Top 3 Recomendações

1. [Recommendation 1 title]
2. [Recommendation 2 title]
3. [Recommendation 3 title]

## Arquivos Gerados

**Relatório Final** (Multi-parte):
```
./memory/[RESEARCH_ID]/final-report/
├── 01-executive-summary.md
├── 02-methodology.md
├── 03-findings.md
├── 04-analysis.md
├── 05-discussion.md
├── 06-recommendations.md
├── 07-limitations.md
├── 08-references.md
├── 09-appendices.md
└── FULL-REPORT.md  ← Relatório consolidado completo
```

**Outros Artefatos**:
- Análises individuais: `references/` ([N] arquivos)
- Sínteses: `syntheses/` ([N] arquivos)
- Validação: `validation/validation-report.md`
- Metadados: `metadata.json`

## Como Usar os Resultados

**Ler Relatório Completo**:
```bash
cat ./memory/[RESEARCH_ID]/final-report/FULL-REPORT.md
```

**Ver Executive Summary**:
```bash
head -50 ./memory/[RESEARCH_ID]/final-report/01-executive-summary.md
```

**Explorar por Capítulo**:
```bash
ls ./memory/[RESEARCH_ID]/final-report/
```

**Processar JSON** (se gerado):
```bash
jq . ./memory/[RESEARCH_ID]/final-report/FULL-REPORT.json
```

## Próximos Passos Sugeridos

1. **Review humano** do relatório final
2. **Implementar top recommendations** identificadas
3. **Compartilhar findings** com stakeholders
4. **Planejar follow-up research** para gaps remanescentes

---

**Status**: ✅ COMPLETED
**Quality**: [ASSESSMENT]

**Mensagem de commit sugerida**:
```
docs(research): complete [research-name] deep research

- Research ID: [RESEARCH_ID]
- Duration: [TIME]
- References analyzed: [N]
- Key findings: [N]
- Full report: ./memory/[ID]/final-report/FULL-REPORT.md
```
```

## Princípios Operacionais

### Padrões de Qualidade

- **Completude**: Relatório DEVE cobrir todas seções obrigatórias
- **Rastreabilidade**: Todas afirmações DEVEM citar referências específicas
- **Objetividade**: Validação DEVE ser imparcial e baseada em evidências
- **Acionabilidade**: Recomendações DEVEM ser práticas e implementáveis
- **Transparência**: Limitações e vieses DEVEM ser claramente documentados

### Tratamento de Erros

- **Se research_id inválido**: ERRO
- **Se síntese final não existe**: ERRO - "Execute /research.synthesize --final primeiro"
- **Se erro ao gerar capítulo**: Log erro, tentar próximo capítulo
- **Se merge script falha**: Gerar FULL-REPORT manualmente (concatenação)
- **Se metadata corrompido**: ERRO - Backup antes de validar

### Restrições

- SEMPRE executar validação cruzada completa
- SEMPRE identificar e documentar vieses
- SEMPRE gerar relatório multi-parte (capítulos)
- SEMPRE criar FULL-REPORT consolidado
- SEMPRE atualizar status para "completed"
- SEMPRE documentar limitações claramente
- NUNCA omitir divergências importantes
- NUNCA fazer afirmações sem referências
- NUNCA deixar gaps sem documentar

## Scripts

### merge-research-report.sh

**Propósito**: Merge capítulos em relatório consolidado

**Localização**: `vibes/scripts/bash/merge-research-report.sh`

**Uso**:
```bash
vibes/scripts/bash/merge-research-report.sh [REPORT_DIR]
```

**Output**: `[REPORT_DIR]/FULL-REPORT.md`

## Templates

### template.research-report.md

**Propósito**: Estrutura do relatório final completo

**Localização**: `research/templates/template.research-report.md`

**Seções**: 9 capítulos + appendices

## Exemplos

### Exemplo 1: Validação Bem-Sucedida

```
Input: /research.validate rn-biometric-auth

Output:
🔍 Executando Validação Cruzada...

✅ Consensos Identificados: 12 (9 high-confidence)
✅ Divergências Analisadas: 3 (2 resolved)
✅ Vieses Detectados: 1 (low impact)

📝 Gerando Relatório Final...

[1/9] Executive Summary ✅
[2/9] Methodology ✅
[3/9] Findings ✅
[4/9] Analysis ✅
[5/9] Discussion ✅
[6/9] Recommendations ✅
[7/9] Limitations ✅
[8/9] References ✅
[9/9] Appendices ✅

🔗 Merging capítulos...

✅ FULL-REPORT.md gerado (15,234 palavras)

🎉 Pesquisa Concluída com Sucesso!

**Research**: Autenticação Biométrica em React Native
**Duration**: 2.5 horas

**Principais Achados**: 6 high-confidence findings
**Recomendações**: 5 actionable recommendations

**Relatório**: ./memory/rn-biometric-auth/final-report/FULL-REPORT.md

Status: ✅ COMPLETED
```

## Integração

### Posição no Workflow

**Precedido por**: `/research.synthesize --final`

**Seguido por**: Nenhum (fim do pipeline)

### Dependências

**Commands Obrigatórios**: Todos anteriores do pipeline

**Scripts Obrigatórios**:
- `vibes/scripts/bash/merge-research-report.sh`

**Templates Obrigatórios**:
- `research/templates/template.research-report.md`

### Fluxo de Dados

```
/research.synthesize --final
       ↓ (produz: Síntese consolidada)
  /research.validate ← VOCÊ ESTÁ AQUI (FINAL)
       ↓ (produz: Relatório final completo)
  [FIM DO PIPELINE]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

### Validação
- [ ] Consensos mapeados com confidence
- [ ] Divergências analisadas e contextualizadas
- [ ] Vieses identificados e documentados
- [ ] Pergunta central respondida
- [ ] Confidence em resposta calculado

### Relatório
- [ ] 9 capítulos gerados
- [ ] FULL-REPORT consolidado criado
- [ ] Todas seções obrigatórias presentes
- [ ] Citações em todas afirmações
- [ ] Recomendações acionáveis

### Metadados
- [ ] Status atualizado para "completed"
- [ ] Validation section preenchida
- [ ] Paths de relatório salvos
- [ ] Note final adicionada

### Qualidade
- [ ] Relatório completo e compreensivo
- [ ] Rastreabilidade total
- [ ] Limitações documentadas
- [ ] Pronto para uso/compartilhamento

