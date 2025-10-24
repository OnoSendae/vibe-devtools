---
description: Executar pipeline de pesquisa expert orquestrando workflow completo de deep research com máxima automação
---

## ⚠️ DEPRECATED - Este command foi substituído

**Status**: DEPRECATED (desde 2025-01-20)

**Razão**: Este command foi consolidado no novo `research.pipeline.md` para eliminar duplicação de código e melhorar manutenibilidade.

**Novo Command Recomendado**:
```
/research.pipeline [tema] expert
```

**Migração**: O novo command oferece a mesma funcionalidade com melhor estrutura e manutenibilidade.

**Timeline de Remoção**: Este command será removido em 2025-04-20 (3 meses de deprecação).

**Documentação**: Veja `research.pipeline.md` para mais detalhes.

---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

**IMPORTANTE - REGRA DE IDIOMA**: Você **DEVE** responder SEMPRE em português brasileiro (PT-BR). Todo texto, instruções, relatórios e outputs devem estar em PT-BR. Apenas código, nomes de arquivos, paths e variáveis devem permanecer em inglês.

Executa um pipeline de pesquisa expert que orquestra todo o fluxo de Deep Research, executando o máximo possível de passos sem intervenção. Ideal para pesquisas que requerem máxima profundidade, rigor acadêmico e compreensão completa de um tema complexo.

O pipeline executa múltiplas iterações de busca, análise e síntese, criando uma estrutura de diretórios completa, artefatos intermediários detalhados, lista de tarefas estruturada e métricas de qualidade. Opera em modo interativo ou configurável, permitindo ao usuário escolher o nível de automação desejado.

**Quando usar**: Para pesquisas acadêmicas, análises comparativas complexas, investigações técnicas profundas, revisões de literatura ou quando você precisa da compreensão mais completa possível sobre um tema.

**Pré-requisitos**: Tema de pesquisa + nível de profundidade + objetivos específicos + referências iniciais + critérios de qualidade

## Descoberta & Validação

Antes de prosseguir, você **DEVE** questionar o usuário para esclarecer:

### Informações Obrigatórias

1. **Tema de Pesquisa**: Qual o tema principal da pesquisa?
   - Se não fornecido: ERRO - tema de pesquisa obrigatório

2. **Nível de Profundidade**: Qual nível de profundidade desejado?
   - Se não fornecido: Padrão "deep"
   - Opções: medium | deep | expert

3. **Objetivos Específicos**: Quais são os objetivos específicos desta pesquisa?
   - Se não fornecido: Inferir do tema
   - Exemplo: "Revisão de literatura sobre X", "Análise comparativa de Y e Z", etc.

4. **Critérios de Qualidade**: Quais critérios definem uma pesquisa completa?
   - Se não fornecido: Padrão "acadêmico rigoroso"
   - Opções: acadêmico rigoroso | técnico prático | balanceado

### Preferências Opcionais

1. **Referências Iniciais**: Há referências específicas que devem ser incluídas?
   - Padrão: nenhuma
   - Opções: URLs, documentos, artigos, papers

2. **Foco Específico**: Há aspectos específicos para focar?
   - Padrão: cobertura abrangente
   - Opções: performance, segurança, usabilidade, arquitetura, etc.

3. **Modo de Execução**: Qual modo de execução preferido?
   - Padrão: configurável
   - Opções: interativo | configurável | automático

4. **Métricas de Qualidade**: Quais métricas devem ser rastreadas?
   - Padrão: completude, profundidade, diversidade de fontes
   - Opções: adicionar métricas customizadas

## Fluxo de Execução

### Fase 1: Inicializar e Configurar

1. **Validar Inputs**:
   - Extrair tema de pesquisa de `$ARGUMENTS`
   - Extrair nível de profundidade
   - Extrair objetivos específicos
   - Extrair critérios de qualidade
   - Extrair referências iniciais (se fornecidas)
   - Extrair modo de execução
   - Validar que tema não está vazio
   - Se vazio: ERRO - tema de pesquisa obrigatório

2. **Criar Estrutura de Research Completa**:
   - Gerar research ID único: `[tema-sanitizado]-expert-[timestamp]`
   - Criar diretório: `./memory/[research-id]/`
   - Criar subdiretórios completos:
     * `references/` - análises individuais
     * `syntheses/` - sínteses incrementais e final
     * `validation/` - relatórios de validação
     * `final-report/` - relatório final completo
     * `tasks/` - lista de tarefas estruturada
     * `metrics/` - métricas de qualidade
   - Inicializar `metadata.json` com estrutura completa
   - Inicializar `README.md` com descrição da pesquisa

3. **Configurar Pipeline**:
   - Máximo de referências: 100+
   - Nível de profundidade: conforme especificado
   - Análise automática: habilitada
   - Pausas: conforme modo de execução
   - Métricas: habilitadas
   - Validação cruzada: habilitada

### Fase 2: Busca Inicial Multi-Camada

1. **Camada 1: Busca Ampla**:
   - Usar `web_search` para buscar tema principal
   - Usar `web_search` para buscar variações do tema
   - Usar `codebase_search` para buscar no repositório (se aplicável)
   - Total de queries: 10-15
   - Coletar até 100 referências relevantes

2. **Camada 2: Busca Especializada**:
   - Identificar sub-temas do tema principal
   - Para cada sub-tema:
     * Formular query específica
     * Executar busca focada
     * Coletar referências especializadas
   - Total de queries: 10-15
   - Coletar até 50 referências adicionais

3. **Camada 3: Busca de Referências**:
   - Analisar referências coletadas
   - Identificar citações e referências cruzadas
   - Buscar referências mencionadas
   - Total de queries: 5-10
   - Coletar até 30 referências adicionais

4. **Extrair e Organizar Dados**:
   - Para cada referência coletada:
     * URL
     * Título
     * Snippet/descrição
     * Timestamp de descoberta
     * Query que encontrou a referência
     * Categoria inicial
     * Camada de descoberta
   - Salvar todas as referências em `metadata.json`

### Fase 3: Scoring e Priorização Avançada

1. **Scoring Multi-Dimensional**:
   - Para cada referência:
     * Credibilidade (0-10)
     * Relevância (0-10)
     * Recência (0-10)
     * Profundidade (0-10)
     * Autoridade (0-10)
     * Originalidade (0-10)
     * Aplicabilidade (0-10)
   - Calcular score total ponderado
   - Identificar outliers (muito alta ou muito baixa)

2. **Categorização Avançada**:
   - Agrupar referências por categoria
   - Identificar gaps de cobertura
   - Mapear distribuição de fontes
   - Gerar `metrics/category-distribution.json`

3. **Priorização Inteligente**:
   - Identificar top 20% para análise profunda
   - Identificar referências complementares
   - Identificar referências para validação cruzada
   - Gerar `TASK-LIST.md` com tarefas estruturadas

4. **PAUSA (se modo interativo)**:
   - Reportar resultados da busca
   - Apresentar distribuição de categorias
   - Apresentar lista de tarefas proposta
   - Aguardar confirmação do usuário

### Fase 4: Análise Profunda Iterativa

1. **Iteração 1: Análise das Top Referências**:
   - Para cada referência priorizada:
     * Ler conteúdo completo
     * Extrair descobertas principais
     * Identificar citações relevantes
     * Avaliar confiabilidade e limitações
     * Identificar contradições
     * Gerar análise detalhada em `references/REF-XXX-analysis.md`
   - Total: 20-30 análises

2. **Iteração 2: Análise de Referências Complementares**:
   - Para cada referência complementar:
     * Análise similar à iteração 1
     * Foco em preencher gaps identificados
     * Gerar análises em `references/`
   - Total: 15-25 análises

3. **Iteração 3: Análise de Validação**:
   - Para referências selecionadas para validação:
     * Análise focada em verificação
     * Comparar com descobertas principais
     * Identificar consistências/inconsistências
     * Gerar análises em `references/`
   - Total: 10-15 análises

4. **Análise Comparativa**:
   - Comparar descobertas entre todas as referências
   - Identificar consensos e divergências
   - Mapear relações entre conceitos
   - Identificar padrões e tendências
   - Gerar `syntheses/comparative-analysis.md`

5. **PAUSA (se modo interativo)**:
   - Reportar progresso da análise
   - Apresentar descobertas principais até o momento
   - Apresentar contradições identificadas
   - Aguardar confirmação do usuário

### Fase 5: Síntese Incremental

1. **Sínteses por Grupo**:
   - Para cada grupo de 10 referências analisadas:
     * Consolidar descobertas
     * Identificar temas comuns
     * Extrair insights principais
     * Identificar gaps
     * Gerar `syntheses/synthesis-XXX.md`

2. **Sínteses por Categoria**:
   - Para cada categoria de referências:
     * Consolidar descobertas da categoria
     * Identificar padrões específicos
     * Extrair insights categorizados
     * Gerar `syntheses/category-XXX-synthesis.md`

3. **Síntese Intermediária**:
   - Consolidar todas as sínteses de grupos
   - Consolidar todas as sínteses de categorias
   - Identificar descobertas principais
   - Mapear gaps de conhecimento
   - Gerar `syntheses/INTERMEDIATE-SYNTHESIS.md`

4. **PAUSA (se modo interativo)**:
   - Reportar progresso da síntese
   - Apresentar síntese intermediária
   - Aguardar confirmação do usuário

### Fase 6: Validação Cruzada

1. **Validação de Consistência**:
   - Verificar consistência entre descobertas
   - Identificar contradições
   - Avaliar confiabilidade de cada descoberta
   - Gerar `validation/consistency-report.md`

2. **Validação de Completude**:
   - Verificar cobertura dos objetivos
   - Identificar gaps remanescentes
   - Avaliar profundidade alcançada
   - Gerar `validation/completeness-report.md`

3. **Validação de Qualidade**:
   - Avaliar qualidade das fontes
   - Verificar diversidade de perspectivas
   - Avaliar recência das informações
   - Gerar `validation/quality-report.md`

4. **Validação Final**:
   - Consolidar todos os relatórios de validação
   - Gerar score de qualidade geral
   - Gerar `validation/FINAL-VALIDATION.md`

### Fase 7: Síntese Final

1. **Consolidar Todas as Sínteses**:
   - Integrar sínteses incrementais
   - Integrar sínteses por categoria
   - Integrar análise comparativa
   - Gerar `syntheses/FINAL-SYNTHESIS.md`

2. **Gerar Relatório Final Completo**:
   - **Executive Summary**: Resumo executivo (1 página)
   - **Introdução**: Contexto e objetivos
   - **Metodologia**: Abordagem e fontes utilizadas
   - **Descobertas Principais**: Top 15 insights com evidências
   - **Análise Comparativa**: Múltiplas perspectivas detalhadas
   - **Gaps Identificados**: Limitações e áreas não cobertas
   - **Recomendações**: Próximos passos e ações sugeridas
   - **Referências**: Lista completa com scores e categorias
   - **Anexos**: Métricas, validações, análises detalhadas
   - Salvar em `final-report/FULL-REPORT.md`

3. **Gerar Métricas de Qualidade**:
   - Completude: [score]
   - Profundidade: [score]
   - Diversidade de fontes: [score]
   - Recência: [score]
   - Confiabilidade: [score]
   - Score geral: [score]
   - Salvar em `metrics/quality-metrics.json`

### Fase 8: Output

1. **Validar Output**:
   - Verificar que relatório foi gerado
   - Verificar que estrutura de diretórios está completa
   - Verificar que metadata.json está atualizado
   - Verificar que lista de tarefas está completa
   - Verificar que métricas foram calculadas
   - Verificar que validações foram executadas

2. **Portões de Qualidade**:
   - [ ] Mínimo 100 referências coletadas
   - [ ] Mínimo 45 referências analisadas em profundidade
   - [ ] Sínteses incrementais geradas
   - [ ] Sínteses por categoria geradas
   - [ ] Síntese final gerada
   - [ ] Validação cruzada completa executada
   - [ ] Relatório final completo gerado
   - [ ] Métricas de qualidade calculadas
   - [ ] Score de qualidade >= 7.0

3. **Reportar Resultados**:
   ```markdown
   ## ✅ Pesquisa Expert Concluída

   **Research ID**: [research-id]
   **Tema**: [tema]
   **Status**: completed

   ### Resumo

   - Referências coletadas: [N]
   - Referências analisadas em profundidade: [M]
   - Sínteses incrementais: [K]
   - Sínteses por categoria: [L]
   - Tempo de execução: [tempo]
   - Score de qualidade: [score]/10

   ### Descobertas Principais

   1. [Descoberta 1 com evidências e confiabilidade]
   2. [Descoberta 2 com evidências e confiabilidade]
   3. [Descoberta 3 com evidências e confiabilidade]
   ...

   ### Métricas de Qualidade

   - Completude: [score]/10
   - Profundidade: [score]/10
   - Diversidade de fontes: [score]/10
   - Recência: [score]/10
   - Confiabilidade: [score]/10
   - **Score Geral**: [score]/10

   ### Artefatos Criados

   - Relatório final: `./memory/[research-id]/final-report/FULL-REPORT.md`
   - Síntese final: `./memory/[research-id]/syntheses/FINAL-SYNTHESIS.md`
   - Validação final: `./memory/[research-id]/validation/FINAL-VALIDATION.md`
   - Lista de tarefas: `./memory/[research-id]/TASK-LIST.md`
   - Métricas: `./memory/[research-id]/metrics/quality-metrics.json`
   - Metadata: `./memory/[research-id]/metadata.json`
   - Análises: `./memory/[research-id]/references/`
   - Sínteses: `./memory/[research-id]/syntheses/`

   ### Próximos Passos

   1. Revisar relatório final completo
   2. Revisar métricas de qualidade
   3. Revisar validações para identificar gaps
   4. Revisar lista de tarefas para pesquisas futuras
   5. Considerar publicar ou compartilhar resultados
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Idioma**: SEMPRE responder em português brasileiro (PT-BR)
- **Rigor Acadêmico**: Análise profunda e validação cruzada
- **Completude**: Cobertura abrangente do tema
- **Transparência**: Documentação completa de todo o processo
- **Reprodutibilidade**: Metodologia clara e replicável
- **Qualidade**: Score mínimo de 7.0/10

### Tratamento de Erros

- **Se tema vazio**: ERRO com mensagem clara em PT-BR + exemplo de uso
- **Se busca retornar < 50 referências**: WARNING em PT-BR + continuar com o que foi encontrado
- **Se análise falhar**: Continuar com referências restantes + reportar falhas em PT-BR
- **Se pausa rejeitada**: Continuar automaticamente após 60 segundos (modo interativo)
- **Se score de qualidade < 7.0**: WARNING em PT-BR + sugerir iteração adicional
- **Se erro crítico**: Abortar + salvar progresso parcial + reportar erro detalhado em PT-BR
- **Se output gerado em inglês**: ERRO - regra de idioma violada, regerar em PT-BR

### Restrições

- **OBRIGATÓRIO**: Todos os outputs, relatórios e mensagens em português brasileiro (PT-BR)
- Máximo 100+ referências coletadas
- Mínimo 45 referências analisadas em profundidade
- Validação cruzada obrigatória
- Métricas de qualidade obrigatórias
- Score mínimo de qualidade: 7.0/10
- Modo automático: máximo 3 pausas
- Modo interativo: pausas após cada fase principal
- Modo configurável: pausas conforme configuração

### Regras de Comportamento

- SEMPRE responder em português brasileiro (PT-BR)
- SEMPRE gerar métricas de qualidade
- SEMPRE executar validação cruzada completa
- SEMPRE documentar todo o processo
- NUNCA pular validações
- NUNCA omitir evidências em descobertas
- SEMPRE reportar contradições identificadas
- NUNCA gerar outputs em inglês

## Exemplos

### Exemplo 1: Input Bom → Output

```
Input: /research.expert.pipeline "Large Language Models fine-tuning techniques" deep "Revisão de literatura sobre técnicas de fine-tuning de LLMs" "acadêmico rigoroso" interativo

Output:
## ✅ Pesquisa Expert Concluída

**Research ID**: large-language-models-fine-tuning-techniques-expert-20250116
**Tema**: Large Language Models fine-tuning techniques
**Nível**: deep
**Objetivos**: Revisão de literatura sobre técnicas de fine-tuning de LLMs
**Critérios**: acadêmico rigoroso
**Modo**: interativo
**Status**: completed

### Resumo

- Referências coletadas: 127
- Referências analisadas em profundidade: 51
- Sínteses incrementais: 12
- Sínteses por categoria: 8
- Tempo de execução: ~45 minutos
- Score de qualidade: 8.3/10

### Descobertas Principais

1. Fine-tuning supervisionado (SFT) é a técnica mais comum, com 85% das implementações (evidência: REF-001, REF-015, REF-032; confiabilidade: alta)
2. LoRA (Low-Rank Adaptation) reduz custos em 90% mantendo 95% da performance (evidência: REF-003, REF-018, REF-041; confiabilidade: muito alta)
3. RLHF (Reinforcement Learning from Human Feedback) melhora alinhamento mas requer infraestrutura complexa (evidência: REF-007, REF-022, REF-048; confiabilidade: alta)
4. Prompt tuning é eficaz para modelos grandes (>10B parâmetros) mas limitado para modelos pequenos (evidência: REF-012, REF-027; confiabilidade: média)
5. QLoRA combina quantização e LoRA para fine-tuning em GPUs limitadas (evidência: REF-019, REF-034; confiabilidade: alta)

### Métricas de Qualidade

- Completude: 8.5/10
- Profundidade: 8.7/10
- Diversidade de fontes: 8.2/10
- Recência: 8.0/10
- Confiabilidade: 8.1/10
- **Score Geral**: 8.3/10

### Artefatos Criados

- Relatório final: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/final-report/FULL-REPORT.md`
- Síntese final: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/syntheses/FINAL-SYNTHESIS.md`
- Validação final: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/validation/FINAL-VALIDATION.md`
- Lista de tarefas: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/TASK-LIST.md`
- Métricas: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/metrics/quality-metrics.json`
- Metadata: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/metadata.json`
- Análises: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/references/`
- Sínteses: `./memory/large-language-models-fine-tuning-techniques-expert-20250116/syntheses/`

### Próximos Passos

1. Revisar relatório final completo
2. Revisar métricas de qualidade
3. Revisar validações para identificar gaps
4. Revisar lista de tarefas para pesquisas futuras
5. Considerar publicar ou compartilhar resultados
```

### Exemplo 2: Input Incompleto → Esclarecimento

```
Input: /research.expert.pipeline "GraphQL"

Output:
Antes de prosseguir, preciso esclarecer:

1. **Nível de Profundidade**: Qual nível de profundidade desejado?
   - Padrão: deep
   - Opções: medium | deep | expert

2. **Objetivos Específicos**: Quais são os objetivos específicos desta pesquisa?
   - Exemplo: "Revisão de literatura sobre GraphQL", "Comparar GraphQL com REST", etc.

3. **Critérios de Qualidade**: Quais critérios definem uma pesquisa completa?
   - Padrão: acadêmico rigoroso
   - Opções: acadêmico rigoroso | técnico prático | balanceado

4. **Modo de Execução**: Qual modo de execução preferido?
   - Padrão: configurável
   - Opções: interativo | configurável | automático

Por favor, forneça essas informações para prosseguir.
```

## Integração

### Posição no Workflow

**Precedido por**: `research.simple.pipeline.md` ou `research.deep.pipeline.md` (opcional)

**Seguido por**: Nenhum (ponto final)

### Dependências

**Commands Obrigatórios**: Nenhum

**Commands Opcionais**: `research.simple.pipeline.md`, `research.deep.pipeline.md`

### Fluxo de Dados

```
[User Input]
  ↓ (tema + profundidade + objetivos + critérios + modo)
research.expert.pipeline
  ↓ (PAUSA após busca - se interativo)
[User Review]
  ↓ (confirmação)
research.expert.pipeline (continua)
  ↓ (produz: análises profundas)
[User Review]
  ↓ (confirmação)
research.expert.pipeline (sintetiza)
  ↓ (produz: sínteses incrementais)
[User Review]
  ↓ (confirmação)
research.expert.pipeline (valida)
  ↓ (produz: validação cruzada)
research.expert.pipeline (finaliza)
  ↓ (produz: relatório expert completo + métricas)
[User Review Final]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar este command completo, verifique:

### Estrutura
- [x] Frontmatter com description clara e concisa em PT-BR
- [x] Seção Entrada do Usuário presente
- [x] Objetivo com 2-3 parágrafos explicativos em PT-BR
- [x] Quando usar e Pré-requisitos documentados
- [x] Descoberta & Validação presente (inputs podem ser incertos)
- [x] Fluxo de Execução com fases numeradas
- [x] Princípios Operacionais com standards, error handling, constraints
- [x] Regras de Comportamento presentes com regra de idioma PT-BR
- [x] Exemplos com input bom e caso de esclarecimento
- [x] Integração documentada
- [x] Contexto ao final
- [x] Quality Checklist presente

### Qualidade de Conteúdo
- [x] Propósito do command imediatamente compreensível
- [x] Todos os passos de execução documentados
- [x] Error handling explícito para casos conhecidos
- [x] Exemplos realistas e úteis
- [x] Nenhum placeholder [CAPS] não preenchido
- [x] Seções [REMOVE IF UNUSED] avaliadas (usadas ou removidas)
- [x] Regra de idioma PT-BR claramente definida e reforçada

### Consistência
- [x] Segue estrutura do template universal
- [x] Usa terminologia consistente com outros commands
- [x] Referências a paths e arquivos estão corretas
- [x] Integração com outros commands documentada
- [x] Idioma PT-BR aplicado consistentemente em todo o arquivo

