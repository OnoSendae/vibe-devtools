---
description: Gerar síntese incremental ou final integrando findings de múltiplas referências
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Sintetizar informações de múltiplas referências analisadas, identificando padrões, consensos, divergências e gaps. Este command pode operar em modo incremental (síntese parcial a cada N refs) ou final (consolidação completa), gerando relatórios estruturados seguindo `template.research-synthesis.md`.

O output é um arquivo de síntese markdown salvo em `./memory/[RESEARCH_ID]/syntheses/` com padrões identificados, recomendações para próximos passos, e insights preliminares. Sínteses incrementais guiam a pesquisa; síntese final prepara validação.

**Quando usar**: 
- **Incremental**: Automaticamente durante `/research.analyze` a cada N referências
- **Final**: Após todas referências analisadas, antes de `/research.validate`

**Pré-requisitos**: 
- Research com referências analisadas (`analysis.status == "completed"`)
- Mínimo 2 referências para síntese incremental, todas para final

## Fluxo de Execução

### Fase 1: Determinar Modo e Carregar Contexto

1. **Parsear Argumentos**:
   - Research ID (obrigatório)
   - Flags: `--incremental` ou `--final`
   - SE ambos omitidos: Inferir automaticamente
     * SE todas refs analisadas → --final
     * SE parcial → --incremental

2. **Carregar Metadados**:
   - Validar research existe
   - Extrair referências com `analysis.status == "completed"`
   - Identificar sínteses existentes

3. **Determinar Escopo**:
   
   **Se Incremental**:
   - Identificar últimas N referências analisadas desde última síntese
   - Padrão: últimas 10 (ou `synthesisInterval`)
   
   **Se Final**:
   - Sintetizar TODAS as referências analisadas
   - Consolidar todas sínteses incrementais anteriores

### Fase 2: Carregar Análises das Referências

1. **Identificar Referências no Escopo**:
   ```javascript
   const refsToSynthesize = mode === 'incremental' 
     ? getReferencesAnalyzedSinceLastSynthesis()
     : getAllAnalyzedReferences();
   ```

2. **Carregar Relatórios de Análise**:
   - Para cada referência no escopo:
     * Path: `./memory/[ID]/references/[FILENAME]`
     * Extrair: findings, quotes, evaluations, gaps
     * Parse estrutura markdown

3. **Agregar Dados**:
   ```javascript
   const aggregatedData = {
     allFindings: [],
     allQuotes: [],
     categories: {},
     technologies: [],
     methodologies: [],
     consensusPoints: [],
     divergences: [],
     gaps: []
   };
   ```

### Fase 3: Identificar Padrões

1. **Análise de Frequência**:
   - Quais conceitos aparecem em múltiplas refs?
   - Quais tecnologias mais mencionadas?
   - Quais metodologias recorrentes?
   
   ```javascript
   const patterns = [];
   
   // Identificar conceitos recorrentes
   const conceptFrequency = countConceptOccurrences(allFindings);
   
   for (const [concept, count] of conceptFrequency) {
     if (count >= 3) {  // Aparece em 3+ refs
       patterns.push({
         name: concept,
         prevalence: count,
         supportingRefs: getRefsThatMentioned(concept),
         significance: assessSignificance(concept, objective)
       });
     }
   }
   ```

2. **Categorizar Padrões**:
   - **Técnicos**: Implementações, arquiteturas, algoritmos
   - **Metodológicos**: Abordagens, processos, workflows
   - **Conceituais**: Princípios, teorias, frameworks
   - **Práticos**: Best practices, casos de uso, pitfalls

3. **Avaliar Confidence de Cada Padrão**:
   - **Very High**: 70%+ refs mencionam + alta credibilidade
   - **High**: 50-70% refs mencionam + credibilidade moderada
   - **Medium**: 30-50% refs mencionam
   - **Low**: <30% refs mencionam

### Fase 4: Identificar Temas Emergentes

1. **Agrupar Findings por Tema**:
   - Usar similaridade semântica
   - Agrupar findings relacionados
   - Identificar temas que atravessam múltiplas refs

2. **Avaliar Maturidade dos Temas**:
   - **Well-established**: Consenso forte, múltiplas fontes high-authority
   - **Emerging**: Mencionado por várias fontes mas ainda evoluindo
   - **Speculative**: Poucas menções, baixa confidence

### Fase 5: Mapear Consensos e Divergências

#### 5.1 Consensos

1. **Identificar Pontos de Acordo**:
   - Comparar findings entre referências
   - Identificar statements similares/idênticos
   - Verificar se conclusões convergem

2. **Para Cada Consenso**:
   ```markdown
   - **Statement**: "Biometric auth improves security significantly"
   - **Agreement among**: REF-023, REF-045, REF-067 (3 sources)
   - **Strength**: Strong (all high-credibility, similar findings)
   - **Implication**: Adoção recomendada para apps sensíveis
   ```

3. **Calcular Strength**:
   - **Strong**: 70%+ refs concordam + alta credibilidade
   - **Moderate**: 50-70% concordam
   - **Weak**: <50% concordam

#### 5.2 Divergências

1. **Identificar Contradições**:
   - Comparar findings que se contradizem
   - Identificar diferentes perspectivas sobre mesmo tópico
   - Analisar contextos diferentes

2. **Para Cada Divergência**:
   ```markdown
   ### Divergence: Best Library for Biometric Auth
   
   **Perspective A**: react-native-biometrics is the best
   - Supported by: REF-023, REF-045 (2 sources)
   - Key Argument: Official support, better maintenance
   
   **Perspective B**: expo-local-authentication is better
   - Supported by: REF-089 (1 source)
   - Key Argument: Easier setup, cross-platform
   
   **Analysis**: Context matters - Perspective A para apps native,
   Perspective B para apps Expo-managed.
   
   **Resolution Status**: Resolved (context-dependent)
   ```

3. **Analisar Razões**:
   - Contextos diferentes?
   - Temporal (informação desatualizada)?
   - Metodológico (abordagens diferentes)?
   - Viés (comercial, regional)?

### Fase 6: Identificar Gaps de Informação

1. **Perguntas Não Respondidas**:
   - Agregar "Questions Raised" de todas as refs
   - Identificar perguntas recorrentes
   - Priorizar por relevância ao objetivo

2. **Áreas Sub-cobertas**:
   - Aspectos do objetivo com poucas referências
   - Tópicos mencionados mas não explorados
   - Lacunas na análise

3. **Priorizar Gaps**:
   - **High**: Essencial para responder pergunta central
   - **Medium**: Importante mas não bloqueante
   - **Low**: Nice to have

### Fase 7: Gerar Recomendações

#### 7.1 Ajustes de Busca

**Se Incremental e gaps identificados**:

1. **Recomendar Novas Queries**:
   ```markdown
   ### Recommended Searches
   
   1. "react-native biometric security vulnerabilities"
      - Rationale: Gap em análise de segurança
      - Expected outcome: Identificar riscos
   
   2. "Face ID iOS implementation performance"
      - Rationale: Performance não bem coberta
      - Expected outcome: Benchmarks e best practices
   ```

2. **Ajustar Priorização**:
   - Aumentar prioridade para certos tipos de refs
   - Diminuir para áreas já bem cobertas

#### 7.2 Snowballing Targets

**Se Final**:

1. **Identificar Citações Recorrentes**:
   - Fontes citadas por múltiplas refs
   - Papers/docs mencionados frequentemente

2. **Priorizar para Busca**:
   ```markdown
   1. "Apple Biometrics Security Whitepaper" (cited by REF-023, REF-045, REF-067)
   2. "Android Biometric Authentication Guidelines" (cited by REF-089, REF-101)
   ```

### Fase 8: Gerar Insights Preliminares

**Se Final**:

1. **Insights Acionáveis**:
   - Baseado em padrões e consensos
   - Findings de alta confidence
   - Aplicáveis ao objetivo da pesquisa

2. **Para Cada Insight**:
   ```markdown
   ### Insight: Use Native Modules for Critical Security
   
   **Finding**: All high-scored refs recommend native modules
   for sensitive biometric operations
   
   **Evidence**: REF-023, REF-045, REF-067, REF-089
   
   **Confidence**: Very High
   
   **Implications**: 
   - Avoid JS-only solutions for auth
   - Invest in native development
   - Platform-specific implementations needed
   ```

### Fase 9: Preencher Template e Salvar

1. **Carregar Template**:
   - Path: `research/templates/template.research-synthesis.md`

2. **Preencher Seções**:
   - Substituir todos placeholders
   - Preencher com dados agregados
   - Incluir referências específicas

3. **Gerar Filename**:
   ```javascript
   const filename = mode === 'incremental'
     ? `SYNTH-${String(synthesisCount + 1).padStart(3, '0')}-mini.md`
     : `SYNTH-FINAL.md`;
   ```

4. **Salvar Síntese**:
   - Path: `./memory/[ID]/syntheses/[FILENAME]`

### Fase 10: Atualizar Metadados

1. **Adicionar Síntese ao Metadata**:
   ```json
   {
     "synthesis": {
       "miniSyntheses": [
         {
           "synthesisId": "SYNTH-001",
           "referencesIncluded": ["REF-001", "REF-002", ...],
           "keyPatterns": ["Pattern 1", "Pattern 2"],
           "gaps": ["Gap 1"],
           "contradictions": ["Divergence 1"],
           "reportPath": "syntheses/SYNTH-001-mini.md",
           "createdAt": "[TIMESTAMP]"
         }
       ],
       "finalSynthesis": {
         "reportPath": "syntheses/SYNTH-FINAL.md",
         "chapterPaths": [],
         "completedAt": "[TIMESTAMP]"
       }
     }
   }
   ```

2. **Salvar Metadata**:
   - Backup primeiro
   - Pretty-print JSON

### Fase 11: Reportar

**Se Incremental**:
```markdown
📊 Síntese Incremental [N] Gerada

**Refs Incluídas**: [X] referências (REF-XXX a REF-YYY)
**Padrões Identificados**: [N]
**Gaps Encontrados**: [N]
**Divergências**: [N]

**Próximo**: Continuar análise até [N] refs
```

**Se Final**:
```markdown
✅ Síntese Final Gerada!

**Research**: [RESEARCH_NAME]

## Consolidação Completa

**Total de Referências**: [N]
**Padrões Identificados**: [N]
**Consensos**: [N]
**Divergências**: [N]
**Insights**: [N]

## Principais Findings

1. [Insight 1]
2. [Insight 2]
3. [Insight 3]

## Arquivo

**Síntese Final**: `./memory/[ID]/syntheses/SYNTH-FINAL.md`

## Próximo Passo

/research.validate [RESEARCH_ID]

Gerar relatório final completo com validação cruzada.

Quer iniciar validação automaticamente? _
```

## Princípios Operacionais

### Padrões de Qualidade

- **Objetividade**: Síntese DEVE ser baseada em evidências das refs
- **Rastreabilidade**: Cada padrão/consenso DEVE citar refs específicas
- **Análise Crítica**: SEMPRE identificar divergências e gaps
- **Utilidade**: Sínteses DEVEM guiar próximos passos da pesquisa

### Tratamento de Erros

- **Se < 2 refs analisadas**: ERRO - "Mínimo 2 refs necessário para síntese"
- **Se modo não especificado**: Inferir automaticamente
- **Se refs não encontradas**: ERRO - "Nenhuma ref analisada"
- **Se erro ao carregar análise**: Log warning, pular ref

### Restrições

- SEMPRE citar refs específicas para padrões/consensos
- SEMPRE identificar divergências (não só consensos)
- SEMPRE documentar gaps encontrados
- SEMPRE gerar recomendações para próximos passos
- SEMPRE usar template oficial
- NUNCA inventar padrões sem evidências
- NUNCA omitir divergências importantes

## Templates

### template.research-synthesis.md

**Propósito**: Estrutura para sínteses incrementais e final

**Localização**: `research/templates/template.research-synthesis.md`

**Seções Obrigatórias**:
- Key Patterns
- Consensus Points
- Divergences
- Information Gaps
- Recommendations

## Exemplos

### Exemplo 1: Síntese Incremental

```
Input: /research.synthesize rn-biometric-auth --incremental

Output:
📊 Gerando Síntese Incremental...

**Refs no Escopo**: REF-001 a REF-010 (10 referências)

✅ Síntese SYNTH-001 Gerada!

**Padrões Identificados**: 4
1. Native modules preferred for security
2. Face ID/Touch ID most common methods
3. Fallback authentication essential
4. Platform-specific implementations needed

**Consensos**: 3 strong, 2 moderate
**Divergências**: 1 (library choice)
**Gaps**: 5 (security vulnerabilities, performance benchmarks, ...)

**Arquivo**: syntheses/SYNTH-001-mini.md

**Recomendações**:
- Buscar mais sobre "biometric security vulnerabilities"
- Priorizar refs sobre performance

Continuando análise...
```

### Exemplo 2: Síntese Final

```
Input: /research.synthesize rn-biometric-auth --final

Output:
✅ Síntese Final Gerada!

**Research**: Autenticação Biométrica em React Native

## Consolidação Completa

**Total de Referências**: 17 analisadas
**Padrões Identificados**: 8
**Consensos**: 12 (9 strong, 3 moderate)
**Divergências**: 3
**Insights**: 6 high-confidence

## Principais Insights

1. **Native modules essential**: 94% refs agree (Very High confidence)
2. **Security > Convenience tradeoff**: Consistent across all sources
3. **Platform parity challenging**: Android/iOS differences significant

## Gaps Remanescentes

- Biometric spoofing mitigation (High priority)
- Accessibility considerations (Medium priority)

## Arquivo

**Síntese Final**: syntheses/SYNTH-FINAL.md

Próximo: /research.validate rn-biometric-auth

Quer iniciar validação automaticamente? _
```

## Integração

### Posição no Workflow

**Precedido por**: `/research.analyze` (análise profunda)

**Seguido por**: 
- **Se Incremental**: Mais análise
- **Se Final**: `/research.validate`

### Dependências

**Commands Obrigatórios**: 
- `/research.analyze` (precisa de refs analisadas)

**Templates Obrigatórios**:
- `research/templates/template.research-synthesis.md`

### Fluxo de Dados

```
/research.analyze
       ↓ (produz: Relatórios individuais)
  /research.synthesize --incremental ← CHAMADO AUTOMATICAMENTE
       ↓ (padrões parciais)
  [Mais análise...]
       ↓
  /research.synthesize --final ← APÓS TODAS REFS
       ↓ (consolidação completa)
  /research.validate
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

### Execução
- [ ] Modo determinado (incremental/final)
- [ ] Refs no escopo identificadas
- [ ] Análises carregadas

### Síntese
- [ ] Padrões identificados com evidências
- [ ] Consensos mapeados com strength
- [ ] Divergências analisadas
- [ ] Gaps documentados
- [ ] Recomendações geradas

### Output
- [ ] Template preenchido completamente
- [ ] Refs citadas para cada finding
- [ ] Arquivo salvo em syntheses/
- [ ] Metadata atualizado

### Qualidade
- [ ] Análise objetiva (não especulativa)
- [ ] Rastreabilidade completa
- [ ] Utilidade para próximos passos

