# Template Universal de Commands

<!-- 
  PROPÓSITO: Template base para criar commands excelentes seguindo framework QUEST
  USADO POR: maker.command.md
  OUTPUT: .cursor/commands/[command-name].md
  VERSÃO: 1.0
  BASEADO EM: Guia Universal de Commands Excelentes (Framework QUEST)
-->

**Criado**: $DATE
**Tipo de Command**: [COMMAND_TYPE]

---

```markdown
---
description: [COMMAND_VERB] [WHAT_IT_DOES]
---

<!-- 
  ORIENTAÇÃO: 
  - description deve ser 1 frase clara: verbo + o que faz
  - Exemplo: "Analyze code quality and generate improvement report"
  - Exemplo: "Create new feature branch with complete specification structure"
  - Mantenha < 80 caracteres
-->

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

<!-- 
  ORIENTAÇÃO: Esta seção é padrão em todos os commands
  - Sempre use exatamente este texto
  - $ARGUMENTS é substituído em runtime
-->

## Objetivo

[DESCRIPTION_PARAGRAPH_1]

[DESCRIPTION_PARAGRAPH_2]

**Quando usar**: [WHEN_TO_USE]

**Pré-requisitos**: [PREREQUISITES_OR_NONE]

<!-- 
  ORIENTAÇÃO: 
  - Parágrafo 1: O que este command faz (2-4 linhas)
  - Parágrafo 2: Detalhe técnico ou contexto adicional (2-4 linhas)
  - Quando usar: Descreva o contexto ideal de uso
  - Pré-requisitos: Liste pré-requisitos necessários ou "Nenhum"
  
  EXEMPLO:
  "Este command analisa a qualidade do código-fonte, identificando problemas,
  code smells e oportunidades de melhoria. Gera relatório estruturado com
  métricas e recomendações priorizadas.
  
  A análise é executada em múltiplas dimensões: complexidade, duplicação,
  testabilidade, segurança e performance. Usa tanto análise estática quanto
  verificação de padrões estabelecidos no projeto.
  
  **Quando usar**: Após implementar features ou antes de code review
  **Pré-requisitos**: Código-fonte no repositório Git"
-->

## Descoberta & Validação

<!-- 
  [REMOVE IF UNUSED] Esta seção é OPCIONAL
  - Incluir SE inputs do usuário podem ser ambíguos ou incompletos
  - Incluir SE command precisa de decisões/configurações do usuário
  - REMOVER SE inputs são sempre claros via $ARGUMENTS
-->

Antes de prosseguir, você **DEVE** questionar o usuário para esclarecer:

### Informações Obrigatórias

1. **[INFO_1_NAME]**: [QUESTION_1]?
   - Se não fornecido: [DEFAULT_VALUE_OR_ERROR_ACTION]

2. **[INFO_2_NAME]**: [QUESTION_2]?
   - Se não fornecido: [DEFAULT_VALUE_OR_ERROR_ACTION]

<!-- 
  ORIENTAÇÃO:
  - Liste APENAS informações realmente necessárias
  - Max 3-4 informações obrigatórias
  - Cada uma deve ter ação clara se não fornecida (default ou erro)
  
  EXEMPLO:
  1. **Diretório Alvo**: Qual diretório analisar?
     - Se não fornecido: ERRO - caminho do diretório obrigatório
  
  2. **Formato de Output**: Formato do relatório?
     - Se não fornecido: Padrão "markdown"
-->

### Preferências Opcionais

1. **[PREFERENCE_1_NAME]**: [QUESTION_1]?
   - Padrão: [SENSIBLE_DEFAULT]
   - Opções: [OPTION_A] | [OPTION_B] | [OPTION_C]

2. **[PREFERENCE_2_NAME]**: [QUESTION_2]?
   - Padrão: [SENSIBLE_DEFAULT]

<!-- 
  ORIENTAÇÃO:
  - Preferências que melhoram UX mas têm defaults sensatos
  - SEMPRE forneça default claro
  - Liste opções se houver escolhas específicas
  
  EXEMPLO:
  1. **Nível de Severidade**: Qual nível mínimo de problemas reportar?
     - Padrão: medium
     - Opções: low | medium | high | critical
  
  2. **Incluir Sugestões**: Incluir sugestões de correção?
     - Padrão: sim
-->

## Fluxo de Execução

<!-- 
  ORIENTAÇÃO: 
  - Divida em 4-7 fases lógicas
  - Nomeie cada fase claramente (Fase 1: Inicializar, Fase 2: [Tarefa Principal], etc.)
  - Use sub-items numerados ou bullets para detalhar passos
  - Primeira fase SEMPRE valida pré-requisitos
  - Última fase SEMPRE reporta conclusão
-->

### Fase 1: Inicializar

<!-- 
  ORIENTAÇÃO: Setup, validação de pré-requisitos, load de contexto
-->

1. **Validar Pré-requisitos**:
   - [PREREQUISITE_CHECK_1]
   - [PREREQUISITE_CHECK_2]
   - Se ausente: [ERROR_ACTION]

2. **Carregar Contexto**:
   - [CONTEXT_LOAD_1]
   - [CONTEXT_LOAD_2]

3. **Parse da Entrada**:
   - Extrair [DATA_1] de $ARGUMENTS
   - Validar [VALIDATION_RULE]

<!-- 
  EXEMPLO:
  1. **Validar Pré-requisitos**:
     - Verificar que repositório Git existe
     - Verificar diretório source acessível
     - Se ausente: ERRO com mensagem clara
  
  2. **Carregar Contexto**:
     - Carregar configuração do projeto de .config.json
     - Carregar regras de qualidade de código de .quality-rules.yml
  
  3. **Parse da Entrada**:
     - Extrair diretório alvo de $ARGUMENTS
     - Validar que diretório existe e é legível
-->

### Fase 2: [MAIN_TASK_NAME]

<!-- 
  ORIENTAÇÃO: 
  - Esta é a fase principal do command
  - Nomeie de acordo com o propósito (ex: "Analisar Código", "Gerar Spec", "Executar Testes")
  - Detalhe a lógica core passo-a-passo
-->

1. [STEP_1_DESCRIPTION]:
   - [SUB_STEP_1A]
   - [SUB_STEP_1B]

2. [STEP_2_DESCRIPTION]:
   - [SUB_STEP_2A]
   - [SUB_STEP_2B]

3. [STEP_3_DESCRIPTION]:
   - [SUB_STEP_3A]
   - [SUB_STEP_3B]

<!-- 
  EXEMPLO:
  1. Escanear arquivos source:
     - Recursivamente encontrar todos arquivos .js, .ts
     - Excluir diretórios node_modules, dist
     - Construir lista de arquivos com metadados
  
  2. Analisar cada arquivo:
     - Parse AST (Abstract Syntax Tree)
     - Detectar métricas de complexidade
     - Identificar code smells
     - Extrair dados de cobertura de testes
  
  3. Agregar resultados:
     - Combinar métricas por arquivo
     - Calcular estatísticas a nível de projeto
     - Priorizar issues por severidade
-->

### Fase 3: [SECONDARY_TASK_OR_PROCESSING]

<!-- 
  [REMOVE IF UNUSED] Fase adicional se necessário
  - Use para processamento secundário
  - Ou para transformação de dados
  - REMOVER se command tem apenas 1 tarefa principal
-->

1. [PROCESSING_STEP_1]
2. [PROCESSING_STEP_2]

### Fase 4: Validar

<!-- 
  ORIENTAÇÃO: Quality checks, validações de output, error handling
-->

1. **Validar Output**:
   - [VALIDATION_CHECK_1]
   - [VALIDATION_CHECK_2]
   - Se falhar: [FAILURE_ACTION]

2. **Portões de Qualidade**:
   - [ ] [QUALITY_CRITERION_1]
   - [ ] [QUALITY_CRITERION_2]
   - [ ] [QUALITY_CRITERION_3]

3. **Tratamento de Erros**:
   - Se [ERROR_CONDITION_1]: [RECOVERY_ACTION_1]
   - Se [ERROR_CONDITION_2]: [RECOVERY_ACTION_2]

<!-- 
  EXEMPLO:
  1. **Validar Output**:
     - Verificar que todos arquivos foram analisados
     - Verificar métricas estão dentro de intervalos válidos
     - Se falhar: Reportar quais arquivos falharam + razão
  
  2. **Portões de Qualidade**:
     - [ ] Todas as métricas obrigatórias coletadas
     - [ ] Relatório segue estrutura esperada
     - [ ] Nenhum erro de análise ocorreu
  
  3. **Tratamento de Erros**:
     - Se arquivo ilegível: Pular com warning
     - Se erro de parse: Logar erro + continuar com próximo arquivo
     - Se falha crítica: Abortar com erro detalhado
-->

### Fase 5: Output

<!-- 
  ORIENTAÇÃO: Geração de outputs, escrita de arquivos, reporte de conclusão
-->

1. **Gerar Output**:
   - [OUTPUT_GENERATION_1]
   - [OUTPUT_GENERATION_2]
   - Escrever em: [OUTPUT_PATH]

2. **Reportar Resultados**:
   ```markdown
   ## [REPORT_TITLE]
   
   **Status**: [SUCCESS_OR_FAILURE]
   
   ### Resumo
   
   - [METRIC_1]: [VALUE]
   - [METRIC_2]: [VALUE]
   - [METRIC_3]: [VALUE]
   
   ### Artefatos Criados
   
   - [ARTIFACT_1_PATH]
   - [ARTIFACT_2_PATH]
   
   ### Próximos Passos
   
   1. [SUGGESTED_ACTION_1]
   2. [SUGGESTED_ACTION_2]
   
   <!-- [REMOVE IF UNUSED] Mensagem de Commit Sugerida -->
   **Mensagem de commit sugerida**:
   ```
   [COMMIT_TYPE]([SCOPE]): [COMMIT_MESSAGE]
   
   - [CHANGE_1]
   - [CHANGE_2]
   ```
   ```
   ```

3. **Atualizar Estado** *(opcional)*:
   - [STATE_UPDATE_ACTION]

<!-- 
  EXEMPLO:
  1. **Gerar Output**:
     - Preencher template de relatório com métricas
     - Gerar gráficos/visualizações (se habilitado)
     - Escrever em: ./reports/quality-report-2024-01-15.md
  
  2. **Reportar Resultados**:
     [Mostrar exemplo de estrutura de relatório]
  
  3. **Atualizar Estado**:
     - Atualizar timestamp .last-analysis
     - Cache de resultados para comparação
-->

## Princípios Operacionais

<!-- 
  ORIENTAÇÃO: Regras de comportamento, standards, constraints do command
-->

### Padrões de Qualidade

- **[STANDARD_1_NAME]**: [STANDARD_1_DESCRIPTION]
- **[STANDARD_2_NAME]**: [STANDARD_2_DESCRIPTION]
- **[STANDARD_3_NAME]**: [STANDARD_3_DESCRIPTION]

<!-- 
  EXEMPLO:
  - **Precisão**: Todas as métricas devem ser verificáveis e rastreáveis à fonte
  - **Completude**: Relatório deve cobrir todas as dimensões especificadas
  - **Clareza**: Issues devem incluir contexto, localização e severidade
-->

### Tratamento de Erros

- **Se [ERROR_CONDITION_1]**: [ACTION_1]
- **Se [ERROR_CONDITION_2]**: [ACTION_2]
- **Se [ERROR_CONDITION_3]**: [ACTION_3]

<!-- 
  EXEMPLO:
  - **Se diretório não encontrado**: ERRO com mensagem clara + sugestão
  - **Se configuração ausente**: Usar defaults sensatos + avisar usuário
  - **Se análise falhar**: Fornecer resultados parciais + detalhes do erro
-->

### Restrições

- [CONSTRAINT_1]
- [CONSTRAINT_2]
- [CONSTRAINT_3]

<!-- 
  EXEMPLO:
  - Tamanho máximo de arquivo: 1MB (pular arquivos maiores com warning)
  - Apenas analisar arquivos rastreados pelo Git
  - Nunca modificar arquivos source (operação somente-leitura)
-->

### Regras de Comportamento

<!-- 
  [REMOVE IF UNUSED] Regras específicas de comportamento
  - Use para casos especiais ou edge cases
  - REMOVER se não houver regras específicas além do padrão
-->

- [BEHAVIOR_RULE_1]
- [BEHAVIOR_RULE_2]

<!-- 
  EXEMPLO:
  - SEMPRE pergunte antes de escrever arquivos fora da raiz do projeto
  - NUNCA analise arquivos em .gitignore
  - Se usuário interromper: Salvar resultados parciais antes de sair
-->

## Scripts

<!-- 
  [REMOVE IF UNUSED] Esta seção é OPCIONAL
  - Incluir SE command usa scripts bash helper
  - REMOVER SE command não precisa de scripts
-->

### [SCRIPT_NAME_1].sh

**Propósito**: [SCRIPT_PURPOSE]

**Localização**: `vibes/scripts/bash/[SCRIPT_NAME_1].sh`

**Uso**:
```bash
vibes/scripts/bash/[SCRIPT_NAME_1].sh [ARGS] --json
```

**Output** (JSON):
```json
{
  "[FIELD_1]": "[VALUE_OR_PATH]",
  "[FIELD_2]": "[VALUE_OR_PATH]",
  "[FIELD_3]": "[VALUE_OR_PATH]"
}
```

**Códigos de Erro**:
- `0`: Sucesso
- `1`: [ERROR_TYPE_1]
- `2`: [ERROR_TYPE_2]

<!-- 
  EXEMPLO:
  ### check-prerequisites.sh
  
  **Propósito**: Validar estrutura de diretório de feature e arquivos obrigatórios
  
  **Uso**:
  ```bash
  vibes/scripts/bash/check-prerequisites.sh feature-name --json
  ```
  
  **Output** (JSON):
  ```json
  {
    "FEATURE_DIR": "/absolute/path/to/feature",
    "SPEC_FILE": "/absolute/path/to/spec.md",
    "STATUS": "ready"
  }
  ```
-->

## Templates

<!-- 
  [REMOVE IF UNUSED] Esta seção é OPCIONAL
  - Incluir SE command cria outputs estruturados via templates
  - Referenciar templates existentes OU descrever template a ser criado
  - REMOVER SE command não usa templates
-->

### [TEMPLATE_NAME].md

**Propósito**: [TEMPLATE_PURPOSE]

**Localização**: `vibes/structure/templates/[TEMPLATE_NAME].md`

**Usado para**: [USAGE_DESCRIPTION]

**Estrutura**:
- Seção 1: [SECTION_1_NAME] *(obrigatório)*
- Seção 2: [SECTION_2_NAME] *(opcional)*
- Seção 3: [SECTION_3_NAME] *(obrigatório)*

<!-- 
  EXEMPLO:
  ### quality-report-template.md
  
  **Propósito**: Estrutura para relatórios de análise de qualidade de código
  
  **Localização**: `vibes/structure/templates/quality-report-template.md`
  
  **Usado para**: Output de análise de qualidade de código
  
  **Estrutura**:
  - Visão Geral: Resumo do projeto e métricas *(obrigatório)*
  - Issues: Lista detalhada de problemas encontrados *(obrigatório)*
  - Recomendações: Sugestões de melhoria priorizadas *(opcional)*
  - Tendências: Comparação com análises anteriores *(opcional)*
-->

## Exemplos

<!-- 
  ORIENTAÇÃO: SEMPRE inclua pelo menos 2 exemplos:
  - 1 exemplo de input bom → output esperado
  - 1 exemplo de input ruim → erro claro
  - Mais exemplos se command tiver múltiplos modos/opções
-->

### Exemplo 1: Input Bom → Output

```
Input: [EXAMPLE_GOOD_INPUT]

Output:
[EXAMPLE_GOOD_OUTPUT]
```

<!-- 
  EXEMPLO:
  ```
  Input: /analyze-code ./src --format=markdown
  
  Output:
  ✅ Análise de código completa
  
  Analisados: 42 arquivos, 3.521 linhas de código
  
  Score de Qualidade: 8.2/10
  
  Issues Encontrados:
  - Alto: 2
  - Médio: 8
  - Baixo: 15
  
  Relatório salvo em: ./reports/quality-report-2024-01-15.md
  
  Próximos passos:
  1. Revisar issues de alta severidade
  2. Executar /fix-issues para aplicar correções automáticas
  ```
-->

### Exemplo 2: Pré-requisitos Ausentes → Erro

```
Input: [EXAMPLE_BAD_INPUT_OR_STATE]

Output:
❌ ERRO: [ERROR_DESCRIPTION]

Contexto:
- [CONTEXT_INFO]

Razão:
- [REASON]

Sugestão:
- [HOW_TO_FIX]

Próxima Ação:
- [SPECIFIC_COMMAND_OR_STEP]
```

<!-- 
  EXEMPLO:
  ```
  Input: /analyze-code ./naoexiste
  
  Output:
  ❌ ERRO: Diretório não encontrado
  
  Contexto:
  - Tentando analisar: ./naoexiste
  - Diretório atual: /project/root
  
  Razão:
  - Diretório não existe ou não é acessível
  
  Sugestão:
  - Verifique se o caminho do diretório está correto
  - Verifique se você tem permissões de leitura
  
  Próxima Ação:
  - Use caminho absoluto ou caminho relativo da raiz do projeto
  - Exemplo: /analyze-code ./src
  ```
-->

### Exemplo 3: [ADDITIONAL_EXAMPLE_NAME]

<!-- 
  [REMOVE IF UNUSED] Exemplos adicionais
  - Adicione SE command tem múltiplos modos
  - REMOVER SE 2 exemplos são suficientes
-->

```
Input: [EXAMPLE_3_INPUT]

Output:
[EXAMPLE_3_OUTPUT]
```

## Integração

<!-- 
  [REMOVE IF UNUSED] Esta seção é OPCIONAL
  - Incluir SE command faz parte de workflow com outros commands
  - Descreva ordem de execução e dependências
  - REMOVER SE command é standalone
-->

### Posição no Workflow

**Precedido por**: [PREVIOUS_COMMAND_OR_NONE]

**Seguido por**: [NEXT_COMMAND_OR_NONE]

### Dependências

**Commands Obrigatórios**: [COMMAND_1], [COMMAND_2]

**Commands Opcionais**: [COMMAND_3], [COMMAND_4]

### Fluxo de Dados

```
[PREVIOUS_COMMAND] 
  ↓ (produz: [ARTIFACT])
[THIS_COMMAND]
  ↓ (produz: [ARTIFACT])
[NEXT_COMMAND]
```

<!-- 
  EXEMPLO:
  ### Posição no Workflow
  
  **Precedido por**: exec.implement.md (implementação completa)
  
  **Seguido por**: planner.specify.md (criar spec de melhoria)
  
  ### Dependências
  
  **Commands Obrigatórios**: Nenhum (standalone)
  
  **Commands Opcionais**: fix-issues.md (aplicar correções automáticas)
  
  ### Fluxo de Dados
  
  ```
  exec.implement
    ↓ (produz: código implementado)
  analyze-code
    ↓ (produz: relatório de qualidade)
  fix-issues (opcional)
    ↓ (produz: código melhorado)
  ```
-->

## Contexto

$ARGUMENTS

<!-- 
  ORIENTAÇÃO: Esta seção é padrão em todos os commands
  - Sempre inclua ao final
  - $ARGUMENTS é substituído em runtime
-->

## Checklist de Qualidade

<!-- 
  ORIENTAÇÃO: Checklist para validar que command está completo
  - Use para auto-validação durante criação
  - Garante que nenhuma seção crítica foi esquecida
-->

Antes de considerar este command completo, verifique:

### Estrutura
- [ ] Frontmatter com description clara e concisa
- [ ] Seção Entrada do Usuário presente
- [ ] Objetivo com 2-3 parágrafos explicativos
- [ ] Quando usar e Pré-requisitos documentados
- [ ] Descoberta & Validação (se inputs podem ser ambíguos)
- [ ] Fluxo de Execução com fases numeradas
- [ ] Princípios Operacionais com standards, error handling, constraints
- [ ] Exemplos com pelo menos input bom e caso de erro

### Qualidade de Conteúdo
- [ ] Propósito do command imediatamente compreensível
- [ ] Todos os passos de execução documentados
- [ ] Error handling explícito para casos conhecidos
- [ ] Exemplos realistas e úteis
- [ ] Nenhum placeholder [CAPS] não preenchido
- [ ] Seções [REMOVE IF UNUSED] avaliadas (usadas ou removidas)

### Consistência
- [ ] Segue estrutura deste template
- [ ] Usa terminologia consistente com outros commands
- [ ] Referências a paths e arquivos estão corretas
- [ ] Scripts e templates referenciados existem
- [ ] Integração com outros commands documentada (se aplicável)

### Governança
- [ ] Respeita princípios da constitution.md (se existir)
- [ ] Não viola constraints estabelecidos
- [ ] Segue padrões de qualidade do projeto

---

## Metadados do Template

**Versão**: 1.0
**Framework**: QUEST (Question, Understand, Engineer, Solidify, Test)
**Última Atualização**: 2024-01-15
**Mantido Por**: maker.command.md

**Changelog**:
- 1.0 (2024-01-15): Template inicial baseado no Guia de Excelência de Commands
```


