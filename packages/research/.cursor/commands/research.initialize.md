---
description: Inicializar deep research com objetivo claro, criar estrutura e metadados
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Inicializar uma pesquisa profunda (deep research) criando estrutura completa de diretórios, definindo objetivo claro, critérios de sucesso e gerando metadados estruturados. Este command estabelece as fundações para todo o pipeline de pesquisa, extrai palavras-chave da entrada e configura parâmetros de busca.

O output é um research ID único, estrutura de diretórios em `./memory/[RESEARCH_ID]/` e arquivo de metadados JSON com objetivo, scope e configurações. Este command é SEMPRE o primeiro passo do pipeline de deep research.

**Quando usar**: Ao iniciar qualquer pesquisa profunda sobre um tópico, seja a partir de texto livre, perguntas específicas ou arquivos de referência.

**Pré-requisitos**: 
- Templates em `vibes/structure/templates/`
- Input claro (texto ou arquivos .md)

## Descoberta & Validação

Antes de inicializar, você **DEVE** questionar o usuário para entender completamente:

### Informações Obrigatórias

1. **Pergunta de Pesquisa**: Qual a pergunta central que esta pesquisa deve responder?
   - Se não fornecido: Extrair de $ARGUMENTS ou PERGUNTAR
   - Formato: Pergunta clara, específica, pesquisável (10-500 chars)

2. **Escopo da Pesquisa**: Quais são os limites e foco?
   - Se não fornecido: Inferir de $ARGUMENTS e confirmar com usuário
   - Exemplo: "Apenas tecnologias JavaScript", "Últimos 3 anos", "Foco em empresas B2B"

3. **Critérios de Sucesso**: Como saber se a pesquisa foi bem-sucedida?
   - Se não fornecido: Sugerir 3 critérios baseados no objetivo
   - Exemplo: "Identificar top 5 soluções", "Mapear pros/cons", "Encontrar casos de uso"

### Preferências Opcionais

1. **Research ID**: Nome customizado para identificar esta pesquisa?
   - Padrão: Gerar automaticamente das palavras-chave
   - Formato: kebab-case, max 30 chars
   - Exemplo: "auth-methods-2025", "nlp-transformers"

2. **Configuração de Busca**:
   - **Max referências inicial**: Quantas buscar? (Padrão: 100, Max: 200)
   - **Top % para análise**: Qual percentual analisar? (Padrão: 20%, Min: 5%)
   - **Pausar após scoring**: Pausar para aprovar lista? (Padrão: sim)

3. **Contexto Adicional**: Há motivação ou contexto específico?
   - Opcional mas recomendado para pesquisas mais precisas

## Fluxo de Execução

### Fase 1: Validar e Processar Input

1. **Parsear Argumentos**:
   - Extrair texto livre vs paths de arquivos
   - Identificar flags: `--research-id`, `--max-refs`, `--top-percent`, `--no-pause`
   - Validar que pelo menos um input existe

2. **Carregar Arquivos de Contexto** (se paths fornecidos):
   - Para cada path em $ARGUMENTS:
     * Validar que arquivo existe e é .md
     * Carregar conteúdo completo
     * Identificar tipo de conteúdo
   - Consolidar todos em contexto unificado

3. **Extrair Informações Chave**:
   - SE texto livre: Usar como base
   - SE arquivos: Extrair objetivo dos arquivos
   - SE ambos: Combinar (texto como foco principal)

### Fase 2: Definir Objetivo da Pesquisa

1. **Formular Pergunta Central**:
   - Analisar input e extrair pergunta principal
   - Refinar para ser:
     * Clara e específica
     * Pesquisável (pode ser respondida por fontes externas)
     * Focada (não muito ampla)
     * Acionável (leva a insights práticos)
   
   **Exemplos de Boas Perguntas**:
   - ✅ "Quais são os métodos mais eficazes de autenticação biométrica para apps mobile em 2025?"
   - ✅ "Como implementar rate limiting em APIs RESTful sem impactar performance?"
   - ❌ "Qual a melhor tecnologia?" (muito vaga)
   - ❌ "Como funciona tudo sobre IA?" (muito ampla)

2. **Definir Escopo**:
   - Limites temporais (ex: últimos 2 anos, estado atual)
   - Limites tecnológicos (ex: apenas React, excluir backend)
   - Limites de domínio (ex: apenas healthcare, apenas B2B)
   - Limites geográficos (se relevante)

3. **Estabelecer Critérios de Sucesso**:
   - Mínimo 2, máximo 5 critérios
   - Devem ser verificáveis
   - Exemplos:
     * "Identificar pelo menos 5 soluções viáveis"
     * "Mapear prós e contras de cada abordagem"
     * "Encontrar 3+ casos de uso reais"
     * "Determinar ROI típico da implementação"

4. **Apresentar ao Usuário e Confirmar**:
   ```markdown
   ## Objetivo da Pesquisa Definido
   
   **Pergunta Central**: [QUESTION]
   
   **Escopo**:
   - [SCOPE_1]
   - [SCOPE_2]
   
   **Critérios de Sucesso**:
   - [ ] [CRITERION_1]
   - [ ] [CRITERION_2]
   - [ ] [CRITERION_3]
   
   **Prosseguir com esta definição?** (sim/ajustar)
   ```
   
   - Aguardar confirmação ou ajustes

### Fase 3: Gerar Research ID

1. **Extrair Palavras-Chave**:
   - Da pergunta central
   - Do escopo
   - Do contexto de entrada
   - Remover stop words (implementar, criar, como, qual, etc)
   - Manter 2-4 palavras mais significativas

2. **Gerar ID Único**:
   - Combinar palavras-chave em kebab-case
   - Adicionar sufixo se necessário (ano, versão)
   - Truncar para max 30 caracteres
   - Validar unicidade
   
   **Exemplos**:
   ```
   "Métodos de autenticação biométrica" → auth-biometric-methods
   "Rate limiting em APIs REST" → api-rate-limiting
   "Deep learning para NLP" → deep-learning-nlp
   ```

3. **Validar Unicidade**:
   ```bash
   if [ -d "./memory/$RESEARCH_ID" ]; then
     # Research ID já existe
   fi
   ```

4. **Se Colisão Detectada**:
   - Mostrar pesquisa existente (status, data)
   - Perguntar estratégia:
     * CONTINUE: Retomar pesquisa existente
     * RENAME: Usar novo ID (sugerir: [ID]-v2, [ID]-2025)
     * REPLACE: Sobrescrever (com backup)
     * ABORT: Cancelar
   - Executar estratégia escolhida

### Fase 4: Criar Estrutura de Diretórios

1. **Criar Diretório Base**:
   ```bash
   BASE_DIR="./memory/$RESEARCH_ID"
   mkdir -p "$BASE_DIR"
   ```

2. **Criar Subdiretórios**:
   ```bash
   mkdir -p "$BASE_DIR/references"      # Análises individuais de referências
   mkdir -p "$BASE_DIR/syntheses"       # Sínteses incrementais
   mkdir -p "$BASE_DIR/validation"      # Relatórios de validação
   mkdir -p "$BASE_DIR/final-report"    # Relatório final e capítulos
   ```

3. **Criar README de Navegação**:
   ```markdown
   # Research: [RESEARCH_NAME]
   
   **Research ID**: [RESEARCH_ID]
   **Created**: [TIMESTAMP]
   **Status**: initialized
   
   ## Structure
   
   - `metadata.json` - Metadados completos da pesquisa
   - `references/` - Análises individuais de cada referência
   - `syntheses/` - Sínteses incrementais e final
   - `validation/` - Relatório de validação cruzada
   - `final-report/` - Relatório final completo
   
   ## Next Steps
   
   1. `/research.search [RESEARCH_ID]` - Buscar referências
   2. `/research.score [RESEARCH_ID]` - Scoring e priorização
   3. `/research.analyze [RESEARCH_ID]` - Análise profunda
   4. `/research.synthesize [RESEARCH_ID]` - Síntese incremental
   5. `/research.validate [RESEARCH_ID]` - Validação e relatório final
   ```

### Fase 5: Gerar Metadados Estruturados

1. **Carregar Template de Metadados**:
   - Path: `research/templates/template.research-metadata.json`
   - Usar como base para estrutura

2. **Preencher Metadados Completos**:
   ```json
   {
     "researchId": "[GENERATED_ID]",
     "objective": {
       "question": "[CENTRAL_QUESTION]",
       "scope": "[SCOPE_DESCRIPTION]",
       "context": "[ADDITIONAL_CONTEXT]",
       "successCriteria": [
         "[CRITERION_1]",
         "[CRITERION_2]",
         "[CRITERION_3]"
       ]
     },
     "status": "initialized",
     "created": "[ISO_8601_TIMESTAMP]",
     "updated": "[ISO_8601_TIMESTAMP]",
     "inputSources": [
       {
         "type": "text|markdown|file",
         "content": "[CONTENT_OR_PATH]",
         "extractedKeywords": ["keyword1", "keyword2"]
       }
     ],
     "references": [],
     "statistics": {
       "totalReferences": 0,
       "scoredReferences": 0,
       "analyzedReferences": 0
     },
     "paths": {
       "baseDir": "./memory/[RESEARCH_ID]",
       "metadataFile": "./memory/[RESEARCH_ID]/metadata.json",
       "referencesDir": "./memory/[RESEARCH_ID]/references",
       "synthesisDir": "./memory/[RESEARCH_ID]/syntheses",
       "finalReportDir": "./memory/[RESEARCH_ID]/final-report"
     },
     "configuration": {
       "maxReferencesInitial": 100,
       "topPercentageForAnalysis": 0.2,
       "pauseAfterScoring": true,
       "synthesisInterval": 10
     },
     "notes": [
       {
         "timestamp": "[ISO_8601_TIMESTAMP]",
         "author": "ai",
         "content": "Research initialized successfully"
       }
     ]
   }
   ```

3. **Salvar Metadados**:
   - Path: `./memory/[RESEARCH_ID]/metadata.json`
   - Formato: JSON pretty-printed (indent: 2 spaces)
   - Validar contra schema antes de salvar

### Fase 6: Validar Estrutura

1. **Portões de Qualidade**:
   - [ ] Research ID único gerado
   - [ ] Pergunta central clara e específica
   - [ ] Escopo bem definido
   - [ ] Critérios de sucesso estabelecidos
   - [ ] Estrutura de diretórios criada
   - [ ] Metadados JSON válidos e salvos
   - [ ] README criado

2. **Validar Metadados**:
   - Verificar que JSON é válido
   - Verificar que todos campos obrigatórios estão presentes
   - Verificar que valores estão dentro de constraints (ex: researchId max 30 chars)

3. **Tratamento de Erros**:
   - Se diretório não pôde ser criado: ERRO com mensagem clara + permissões
   - Se metadados inválidos: Corrigir e salvar novamente
   - Se colisão de ID: Já tratado na Fase 3

### Fase 7: Reportar e Preparar Próximos Passos

1. **Gerar Relatório de Conclusão**:
   ```markdown
   ✅ Pesquisa Inicializada com Sucesso!
   
   **Research ID**: [RESEARCH_ID]
   **Research Name**: [RESEARCH_NAME]
   
   ## Objetivo Definido
   
   **Pergunta Central**: [QUESTION]
   
   **Escopo**:
   - [SCOPE_1]
   - [SCOPE_2]
   
   **Critérios de Sucesso**:
   - [ ] [CRITERION_1]
   - [ ] [CRITERION_2]
   - [ ] [CRITERION_3]
   
   ## Estrutura Criada
   
   **Base Directory**: `./memory/[RESEARCH_ID]/`
   
   **Arquivos**:
   - ✅ metadata.json (metadados completos)
   - ✅ README.md (navegação)
   - ✅ references/ (vazio, aguardando search)
   - ✅ syntheses/ (vazio, aguardando analysis)
   - ✅ validation/ (vazio, aguardando validation)
   - ✅ final-report/ (vazio, aguardando final report)
   
   ## Configuração
   
   - **Max referências (busca inicial)**: [N]
   - **Top % para análise profunda**: [X]%
   - **Pausar após scoring**: [SIM/NÃO]
   - **Síntese a cada**: [N] referências
   
   ## Próximos Passos
   
   ### Passo 1: Buscar Referências
   ```
   /research.search [RESEARCH_ID]
   ```
   
   Executa busca ampla na web (web_search), coletando até [N] referências relevantes.
   
   ### Passo 2: Scoring e Priorização
   ```
   /research.score [RESEARCH_ID]
   ```
   
   Avalia e prioriza referências encontradas (0-10), identifica top [X]% para análise profunda.
   
   ### Passo 3: Análise Profunda
   ```
   /research.analyze [RESEARCH_ID]
   ```
   
   Analisa em profundidade as referências top-scored, gerando relatórios detalhados.
   
   ---
   
   **Quer iniciar automaticamente a busca?** (sim/não)
   ```

2. **Perguntar Execução Automática**:
   - "Quer que eu execute automaticamente /research.search agora?" 
   - SE sim: Chamar research.search na sequência
   - SE não: Apenas reportar conclusão

## Princípios Operacionais

### Padrões de Qualidade

- **Clareza**: Pergunta de pesquisa DEVE ser clara e específica
- **Mensurabilidade**: Critérios de sucesso DEVEM ser verificáveis
- **Rastreabilidade**: Todos inputs DEVEM ser documentados em metadados
- **Unicidade**: Research ID DEVE ser único (validar colisões)
- **Estrutura Consistente**: Sempre criar mesma estrutura de diretórios

### Tratamento de Erros

- **Se input vazio**: ERRO - Apresentar perguntas de descoberta e AGUARDAR
- **Se pergunta vaga**: Refinar interativamente com usuário até ter clareza
- **Se research_id colide**: Apresentar opções (CONTINUE/RENAME/REPLACE/ABORT) e AGUARDAR
- **Se diretório não pode ser criado**: ERRO com mensagem clara + sugestão de permissões
- **Se metadados inválidos**: Corrigir automaticamente ou reportar problema específico
- **Se usuário rejeita objetivo**: Iterar até aceitação

### Restrições

- SEMPRE gerar research ID único (kebab-case, max 30 chars)
- SEMPRE validar colisões antes de criar estrutura
- SEMPRE confirmar objetivo com usuário antes de prosseguir
- SEMPRE criar estrutura completa de diretórios
- SEMPRE salvar metadados JSON válidos
- SEMPRE extrair e documentar palavras-chave do input
- NUNCA sobrescrever pesquisa existente sem confirmação explícita (REPLACE)
- NUNCA usar research_id genérico (evitar: "research", "test", "temp")
- NUNCA prosseguir sem pergunta de pesquisa clara
- NUNCA deixar metadados incompletos ou inválidos

## Templates

### template.research-metadata.json

**Propósito**: Schema completo de metadados para deep research

**Localização**: `research/templates/template.research-metadata.json`

**Usado para**: Estrutura de metadata.json de cada pesquisa

**Estrutura**: JSON Schema completo com todos os campos obrigatórios e opcionais

## Exemplos

### Exemplo 1: Input Texto Simples → Research Inicializada

```
Input: /research.initialize "Como implementar autenticação biométrica em apps React Native?"

Output:
✅ Pesquisa Inicializada com Sucesso!

**Research ID**: rn-biometric-auth
**Research Name**: Autenticação Biométrica em React Native

## Objetivo Definido

**Pergunta Central**: Como implementar autenticação biométrica em aplicativos React Native?

**Escopo**:
- Foco em React Native (Android e iOS)
- Métodos: Face ID, Touch ID, impressão digital
- Últimos 2 anos de soluções

**Critérios de Sucesso**:
- [ ] Identificar bibliotecas mais usadas
- [ ] Mapear implementação para iOS e Android
- [ ] Encontrar casos de uso reais

## Estrutura Criada

Base: `./memory/rn-biometric-auth/`

## Próximos Passos

1. /research.search rn-biometric-auth

Quer iniciar automaticamente a busca? (sim/não)
```

### Exemplo 2: Input com Arquivo de Contexto

```
Input: /research.initialize vibes/plans/analysis/api-performance-issues.md --max-refs 150

Output:
✅ Pesquisa Inicializada com Sucesso!

**Research ID**: api-perf-optimization
**Research Name**: Otimização de Performance de APIs

Contexto carregado:
- api-performance-issues.md (2.3 KB)

## Objetivo Definido

**Pergunta Central**: Quais são as técnicas mais eficazes para otimizar performance de APIs REST em produção?

**Escopo**:
- APIs REST em Node.js e Python
- Foco em backend performance
- Técnicas aplicáveis a alta escala

**Critérios de Sucesso**:
- [ ] Identificar top 10 técnicas de otimização
- [ ] Mapear impacto de cada técnica (benchmarks)
- [ ] Encontrar tradeoffs e limitações

## Configuração

- Max referências: 150 (customizado)
- Top % para análise: 20%
- Síntese a cada: 10 referências

Próximo: /research.search api-perf-optimization
```

### Exemplo 3: Colisão de Research ID

```
Input: /research.initialize "Deep learning para NLP"

Output:
⚠️ Colisão Detectada!

Research ID "deep-learning-nlp" já existe:
- **Status**: completed
- **Criado**: 2025-10-10
- **Referências**: 87 encontradas, 18 analisadas
- **Relatório final**: Disponível

Estratégias disponíveis:
1. CONTINUE: Retomar pesquisa existente (se incompleta)
2. RENAME: Usar novo ID (sugestão: deep-learning-nlp-v2, deep-learning-nlp-2025)
3. REPLACE: Sobrescrever TUDO (backup será criado)
4. ABORT: Cancelar

Escolha [1-4]: _
```

## Integração

### Posição no Workflow

**Precedido por**: Nenhum (primeiro command do pipeline)

**Seguido por**: `/research.search [RESEARCH_ID]` (busca de referências)

### Dependências

**Commands Obrigatórios**: Nenhum (standalone)

**Commands Opcionais**: 
- `/planner.project` (pode gerar arquivos de análise que alimentam research)

**Templates Obrigatórios**:
- `research/templates/template.research-metadata.json`

### Fluxo de Dados

```
[Objetivo/Pergunta/Arquivos]
       ↓
  /research.initialize ← VOCÊ ESTÁ AQUI
       ↓
[Research ID + Estrutura + Metadados]
       ↓
  /research.search
       ↓
  [Pipeline continua...]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar a inicialização completa, verifique:

### Objetivo
- [ ] Pergunta central clara e específica (10-500 chars)
- [ ] Escopo bem definido (limites claros)
- [ ] Critérios de sucesso estabelecidos (2-5 critérios verificáveis)
- [ ] Confirmação do usuário obtida

### Research ID
- [ ] ID único gerado (kebab-case, max 30 chars)
- [ ] Colisões verificadas e resolvidas
- [ ] ID descritivo e significativo
- [ ] Não usa termos genéricos

### Estrutura
- [ ] Diretório base criado (`./memory/[ID]/`)
- [ ] Subdiretórios criados (references, syntheses, validation, final-report)
- [ ] README.md de navegação criado
- [ ] Permissões adequadas

### Metadados
- [ ] metadata.json criado e salvo
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Todos campos obrigatórios presentes
- [ ] Valores dentro de constraints
- [ ] Inputs documentados com palavras-chave extraídas
- [ ] Configurações definidas (max-refs, top-percent, etc)

### Qualidade
- [ ] Objetivo alinhado com input do usuário
- [ ] Estrutura consistente com template
- [ ] Documentação clara de próximos passos
- [ ] Pronto para iniciar /research.search

