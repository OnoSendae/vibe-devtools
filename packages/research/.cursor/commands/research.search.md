---
description: Executar busca ampla de referências usando web_search
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Executar busca inicial ampla na web para coletar referências relevantes sobre o objetivo da pesquisa. Este command utiliza web_search para maximizar cobertura, gera queries inteligentes a partir do objetivo, e armazena todas as referências encontradas nos metadados JSON.

O output é uma lista de referências (até max configurado, padrão 100) com URLs, títulos, snippets e metadados básicos. Cada referência recebe um ID único (REF-001, REF-002, ...) e é salva em `./memory/[RESEARCH_ID]/metadata.json`.

**Quando usar**: Logo após `/research.initialize`, quando a pesquisa foi inicializada e está pronta para buscar fontes.

**Pré-requisitos**: 
- Research inicializada (`/research.initialize` executado)
- metadata.json existe em `./memory/[RESEARCH_ID]/`

## Descoberta & Validação

Antes de buscar, você **DEVE** validar:

### Informações Obrigatórias

1. **Research ID**: Qual pesquisa deve ser buscada?
   - Se fornecido em $ARGUMENTS: Usar
   - Se não fornecido: ERRO - "Especifique research ID"

2. **Pesquisa Existe**: Research foi inicializada?
   - Validar que `./memory/[RESEARCH_ID]/` existe
   - Validar que `metadata.json` existe e é válido
   - Se não existe: ERRO - "Research não encontrada, execute /research.initialize primeiro"

### Preferências Opcionais

1. **Max Referências**: Quantas referências buscar?
   - Padrão: Usar valor de `configuration.maxReferencesInitial` do metadata.json
   - Override: `--max-refs N` em $ARGUMENTS
   - Min: 10, Max: 200

2. **Queries Customizadas**: Usar queries específicas além das geradas?
   - Padrão: Gerar queries automaticamente do objetivo
   - Override: `--queries "query1" "query2"` em $ARGUMENTS

## Fluxo de Execução

### Fase 1: Carregar Contexto da Pesquisa

1. **Parsear Argumentos**:
   - Extrair research_id de $ARGUMENTS (primeiro argumento)
   - Extrair flags: `--max-refs`, `--queries`
   - Validar que research_id foi fornecido

2. **Carregar Metadados**:
   - Path: `./memory/[RESEARCH_ID]/metadata.json`
   - Validar que arquivo existe
   - Parse JSON e validar estrutura
   - Extrair:
     * `objective.question` (pergunta central)
     * `objective.scope` (escopo)
     * `inputSources[].extractedKeywords` (palavras-chave)
     * `configuration.maxReferencesInitial` (max refs)
     * `status` (deve ser "initialized")

3. **Validar Status**:
   - SE status != "initialized": Avisar que pesquisa já está em andamento
   - Perguntar: "Pesquisa já tem status '[STATUS]'. Re-executar busca? (sim/não)"
   - SE não: ABORT
   - SE sim: Continuar (merge com referências existentes)

### Fase 2: Gerar Queries de Busca Inteligentes

1. **Estratégia de Queries**:
   - Gerar múltiplas queries para cobrir diferentes ângulos
   - Usar variações da pergunta central
   - Incluir palavras-chave importantes
   - Considerar escopo e contexto

2. **Tipos de Queries**:
   
   **Query Principal** (da pergunta):
   - Usar pergunta central diretamente ou reformulada
   
   **Queries de Palavras-Chave**:
   - Combinar 2-3 palavras-chave principais
   - Ex: "biometric authentication react native"
   
   **Queries de Contexto**:
   - Adicionar contexto do escopo
   - Ex: "biometric authentication mobile apps 2025"
   
   **Queries de Especificidade**:
   - Buscar aspectos específicos
   - Ex: "face ID implementation iOS"
   - Ex: "touch ID android security"
   
   **Queries de Casos de Uso**:
   - Buscar exemplos práticos
   - Ex: "biometric auth tutorial react native"
   - Ex: "biometric authentication case study"

3. **Gerar 5-8 Queries**:
   ```javascript
   const queries = [
     objective.question,  // Query principal
     `${keyword1} ${keyword2} ${keyword3}`,  // Keywords
     `${keyword1} ${scopeContext}`,  // Com contexto
     `${keyword1} tutorial`,  // Tutorial/guias
     `${keyword1} best practices`,  // Best practices
     `${keyword1} case study`,  // Casos reais
     `${keyword1} ${keyword2} comparison`,  // Comparações
     `${keyword1} documentation`  // Documentação oficial
   ];
   ```

4. **Se Queries Customizadas Fornecidas**:
   - Adicionar às queries geradas (não substituir)
   - Priorizar queries customizadas

### Fase 3: Executar Buscas

1. **Estratégia de Busca**:
   
   **Use `web_search` para todas as queries**:
   - Queries gerais e amplas
   - Conteúdo acadêmico e técnico
   - Documentação e tutoriais
   - Queries específicas
   - Resultados recentes

2. **Executar Busca por Query**:
   ```javascript
   for (const query of queries) {
     // Executar busca
     const results = await web_search(query);
     
     // Processar resultados
     processResults(results);
     
     // Verificar limite
     if (totalReferences >= maxReferences) break;
   }
   ```

3. **Processamento de Resultados**:
   - Para cada resultado de busca:
     * Extrair: título, URL, snippet/description
     * Verificar duplicatas (URL já existe)
     * Gerar ID único: REF-001, REF-002, ...
     * Adicionar à lista de referências
     * Incrementar contador

4. **Evitar Duplicatas**:
   ```javascript
   const existingUrls = new Set(
     metadata.references.map(ref => ref.url)
   );
   
   if (!existingUrls.has(newUrl)) {
     // Adicionar referência
   }
   ```

5. **Respeitar Limites**:
   - Parar quando atingir `maxReferencesInitial`
   - Priorizar diversidade de fontes
   - Se uma query retorna muitos resultados, limitar a 15-20 por query

### Fase 4: Enriquecer Referências

1. **Para Cada Referência Coletada**:
   - Adicionar timestamp de descoberta
   - Identificar categoria preliminar (do URL):
     * `.edu` → academic
     * `docs.`, `documentation` → documentation
     * `medium.com`, `dev.to` → blog
     * `youtube.com` → video
     * Padrões conhecidos → tutorial, news, etc.
   - Extrair domínio/autor se possível
   - Adicionar fonte de busca (qual tool + query)

2. **Estrutura da Referência**:
   ```json
   {
     "id": "REF-001",
     "title": "[Title from search result]",
     "url": "[URL]",
     "snippet": "[Snippet/description]",
     "discoveredAt": "[ISO 8601 timestamp]",
     "source": "web_search",
     "discoveryQuery": "[Query que encontrou esta ref]",
     "categories": ["preliminary-category"],
     "tags": []
   }
   ```

3. **Extrair Tags Preliminares**:
   - De palavras no título e snippet
   - Palavras-chave relevantes
   - Tecnologias mencionadas
   - Limitar a 5-8 tags por referência

### Fase 5: Atualizar Metadados

1. **Carregar Metadata Atual**:
   - Re-read `metadata.json` (pode ter sido alterado)
   - Parse JSON

2. **Atualizar Campos**:
   ```json
   {
     "status": "searching",
     "updated": "[NEW_TIMESTAMP]",
     "searchPhase": {
       "totalReferencesFound": 87,
       "searchQueries": [
         {
           "query": "biometric auth react native",
           "tool": "web_search",
           "resultsCount": 15,
           "timestamp": "2025-10-15T..."
         },
         ...
       ],
       "completedAt": "[TIMESTAMP]"
     },
     "references": [
       // Array com todas as referências
     ],
     "statistics": {
       "totalReferences": 87,
       "scoredReferences": 0,
       "analyzedReferences": 0
     },
     "notes": [
       ...existing,
       {
         "timestamp": "[TIMESTAMP]",
         "author": "ai",
         "content": "Search completed: 87 references found from 6 queries"
       }
     ]
   }
   ```

3. **Salvar Metadados Atualizados**:
   - Path: `./memory/[RESEARCH_ID]/metadata.json`
   - Pretty-print JSON (indent: 2)
   - Validar antes de salvar

### Fase 6: Gerar Resumo da Busca

1. **Calcular Estatísticas**:
   - Total de referências encontradas
   - Referências por categoria preliminar
   - Queries executadas (sucesso vs falhas)
   - Duplicatas evitadas

2. **Criar Relatório Visual**:
   ```markdown
   ## 📊 Estatísticas da Busca
   
   **Total de Referências**: [N]
   
   **Por Categoria** (preliminar):
   - academic: [N]
   - documentation: [N]
   - blog: [N]
   - tutorial: [N]
   - news: [N]
   - other: [N]
   
   **Queries Executadas**: [N]
   - Sucesso: [N]
   - Sem resultados: [N]
   ```

3. **Top 10 Referências** (preview):
   - Listar título + URL das 10 primeiras
   - Dar overview do que foi encontrado

### Fase 7: Validar e Reportar

1. **Validações Finais**:
   - [ ] Pelo menos 10 referências encontradas (mínimo viável)
   - [ ] Nenhuma URL duplicada
   - [ ] Todas referências têm ID único
   - [ ] Metadata JSON válido
   - [ ] Status atualizado para "searching" → "scored" aguardando

2. **Reportar Conclusão**:
   ```markdown
   ✅ Busca Concluída com Sucesso!
   
   **Research**: [RESEARCH_NAME]
   **Research ID**: [RESEARCH_ID]
   
   ## Resultados da Busca
   
   **Total de Referências Encontradas**: [N]
   
**Queries Executadas**: [N] queries
1. "[QUERY_1]" → [N] resultados
2. "[QUERY_2]" → [N] resultados
3. "[QUERY_3]" → [N] resultados
...

## Distribuição

**Por Categoria** (preliminar):
   - academic: [N]
   - documentation: [N]
   - blog: [N]
   - tutorial: [N]
   - other: [N]
   
   ## Preview (Top 10)
   
   1. **[TITLE_1]**
      - [URL_1]
      - [SNIPPET_1_PREVIEW]
   
   2. **[TITLE_2]**
      - [URL_2]
      - [SNIPPET_2_PREVIEW]
   
   ...
   
   ## Próximos Passos
   
   ### Passo 1: Scoring e Priorização
   ```
   /research.score [RESEARCH_ID]
   ```
   
   Avaliar e pontuar todas as [N] referências (0-10) em 5 dimensões:
   - Credibilidade, Relevância, Recência, Profundidade, Autoridade
   
   Identificar top 20% para análise profunda.
   
   **Configuração**: Pausar após scoring para aprovação? [SIM/NÃO]
   
   ---
   
   **Metadados salvos em**: `./memory/[RESEARCH_ID]/metadata.json`
   
   **Quer iniciar scoring automaticamente?** (sim/não)
   ```

3. **Perguntar Execução Automática**:
   - "Quer que eu execute /research.score agora?"
   - SE sim: Chamar research.score na sequência
   - SE não: Apenas reportar conclusão

## Princípios Operacionais

### Padrões de Qualidade

- **Diversidade**: Usar múltiplas queries para cobertura ampla
- **Relevância**: Queries DEVEM ser alinhadas com objetivo da pesquisa
- **Deduplicação**: SEMPRE verificar e evitar referências duplicadas
- **Rastreabilidade**: SEMPRE documentar fonte e query de cada referência
- **Completude**: Buscar até limite configurado (a menos que queries esgotadas)

### Tratamento de Erros

- **Se research_id não fornecido**: ERRO - "Especifique research ID: /research.search [ID]"
- **Se research não existe**: ERRO - "Research '[ID]' não encontrada. Execute /research.initialize primeiro"
- **Se metadata.json inválido**: ERRO - "Metadados corrompidos" + sugestão de re-inicializar
- **Se query falha**: Log warning mas continuar com próxima query
- **Se todas queries falham**: ERRO - "Nenhuma query retornou resultados" + sugestão de refinar objetivo
- **Se encontrou < 10 referências**: WARNING - "Apenas [N] referências encontradas (mínimo recomendado: 10)"
- **Se ferramenta não disponível**: Fallback para outra ferramenta disponível

### Restrições

- SEMPRE usar research_id existente (validar antes)
- SEMPRE gerar IDs únicos sequenciais (REF-001, REF-002, ...)
- SEMPRE evitar duplicatas de URL
- SEMPRE documentar fonte de cada referência
- SEMPRE salvar metadados atualizados após busca
- SEMPRE usar múltiplas queries para diversidade
- SEMPRE respeitar limite de maxReferencesInitial
- NUNCA sobrescrever referências existentes (merge)
- NUNCA executar sem metadata.json válido
- NUNCA usar queries genéricas demais ("best", "good", "how to")

### Otimizações

- **Query Throttling**: Não executar mais queries se já atingiu limite
- **Result Deduplication**: Verificar duplicatas em tempo real
- **Batch Processing**: Processar resultados em batch para eficiência

## Exemplos

### Exemplo 1: Busca Bem-Sucedida

```
Input: /research.search rn-biometric-auth

Output:
✅ Busca Concluída com Sucesso!

**Research**: Autenticação Biométrica em React Native
**Research ID**: rn-biometric-auth

## Resultados da Busca

**Total de Referências Encontradas**: 87

**Queries Executadas**: 6 queries
1. "Como implementar autenticação biométrica em apps React Native?" → 15 resultados
2. "biometric authentication react native" → 18 resultados
3. "face ID touch ID react native" → 14 resultados
4. "react native biometrics tutorial" → 12 resultados
5. "biometric auth mobile security" → 16 resultados
6. "react native biometric authentication case study" → 12 resultados

## Distribuição

**Por Categoria** (preliminar):
- documentation: 23
- blog: 31
- tutorial: 18
- academic: 9
- other: 6

## Preview (Top 10)

1. **React Native Biometrics - Official Documentation**
   - https://reactnative.dev/docs/biometrics
   - Complete guide to implementing Face ID and Touch ID...

2. **Implementing Face ID in React Native Apps**
   - https://medium.com/@dev/face-id-rn
   - Step-by-step tutorial for iOS Face ID integration...

...

Próximo: /research.score rn-biometric-auth

Quer iniciar scoring automaticamente? _
```

### Exemplo 2: Research Não Encontrada

```
Input: /research.search api-optimization

Output:
❌ ERRO: Research não encontrada

**Research ID**: api-optimization

**Contexto**:
- Tentando buscar referências para research 'api-optimization'
- Diretório não existe: ./memory/api-optimization/

**Razão**:
- Research não foi inicializada

**Sugestão**:
- Execute /research.initialize primeiro para criar a pesquisa
- Exemplo: /research.initialize "Como otimizar performance de APIs?"

**Próxima Ação**:
```
/research.initialize "Como otimizar performance de APIs REST?"
```
```

### Exemplo 3: Re-executar Busca

```
Input: /research.search deep-learning-nlp

Output:
⚠️ Research já tem status 'scoring'

**Research**: Deep Learning para NLP
**Status atual**: scoring
**Referências existentes**: 95

Esta pesquisa já passou pela fase de busca.

**Re-executar busca?** (sim/não)
- SIM: Buscar novas referências (merge com existentes)
- NÃO: Cancelar e continuar com próximo passo

Escolha: _
```

## Integração

### Posição no Workflow

**Precedido por**: `/research.initialize` (inicialização)

**Seguido por**: `/research.score` (scoring e priorização)

### Dependências

**Commands Obrigatórios**: 
- `/research.initialize` (deve ser executado antes)

**Commands Opcionais**: Nenhum

**Tools Necessários**:
- `web_search` tool

### Fluxo de Dados

```
/research.initialize
       ↓ (produz: Research ID + Metadata)
  /research.search ← VOCÊ ESTÁ AQUI
       ↓ (produz: Lista de referências)
  /research.score
       ↓
  [Pipeline continua...]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar a busca completa, verifique:

### Execução
- [ ] Research ID validado (existe)
- [ ] Metadata carregado com sucesso
- [ ] Queries inteligentes geradas (5-8 queries)
- [ ] Todas queries executadas (ou até atingir limite)

### Resultados
- [ ] Mínimo 10 referências encontradas
- [ ] Cada referência tem ID único (REF-XXX)
- [ ] Cada referência tem URL única (sem duplicatas)
- [ ] Cada referência tem título, URL, snippet
- [ ] Cada referência documentada (fonte + query)
- [ ] Categoria preliminar atribuída

### Metadados
- [ ] Status atualizado para "searching"
- [ ] searchPhase preenchido (queries, resultados, timestamp)
- [ ] Array references populado
- [ ] statistics.totalReferences atualizado
- [ ] Note adicionada sobre conclusão da busca
- [ ] Metadata salvo com sucesso

### Qualidade
- [ ] Diversidade de fontes (não só um domínio)
- [ ] Relevância das referências ao objetivo
- [ ] Queries alinhadas com objetivo da pesquisa
- [ ] Preview das top 10 referências gerado
- [ ] Relatório estatístico completo

