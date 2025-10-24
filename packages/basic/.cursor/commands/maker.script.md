---
description: Create, validate, optimize, and refactor high-quality bash scripts with consistent architecture
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Este command cria, valida, otimiza e refatora scripts bash de altíssima qualidade e performance. Foca em simplicidade, objetividade e solução direta de problemas sem malabarismos desnecessários. Garante consistência arquitetural através de padrões bem definidos e validação rigorosa.

Scripts gerados seguem arquitetura consistente com shebang correto, strict mode, error handling robusto, output JSON quando necessário, e código limpo e auto-explicativo. Performance é otimizada usando recursos nativos do bash, evitando subshells desnecessários e operações custosas.

**Quando usar**: 
- Criar novos scripts bash para automação de tarefas
- Validar scripts existentes contra padrões de qualidade
- Otimizar scripts legados para performance e manutenibilidade
- Refatorar scripts com problemas arquiteturais
- Gerar scripts para operações repetitivas (file system, git, build, etc.)

**Pré-requisitos**: 
- Contexto claro do problema a resolver (texto ou arquivos de referência)
- Definição de operações necessárias (file system, git, data processing, etc.)
- Critérios de qualidade desejados (se não especificados, usa padrões do projeto)

## Descoberta & Validação

Antes de prosseguir, você **DEVE** questionar o usuário para esclarecer:

### Informações Obrigatórias

1. **Propósito do Script**: O que o script deve fazer? (1 frase clara)
   - Se não fornecido: ERRO - propósito obrigatório para criar script adequado

2. **Contexto e Entrada**: Qual é o contexto do problema? (texto ou arquivos)
   - Se não fornecido: ERRO - contexto necessário para entender requisitos

3. **Operações Necessárias**: Que operações o script deve executar?
   - Se não fornecido: Questione usuário sobre operações específicas
   - Opções: file system, git, text processing, data formats, network, package management, build, deployment, monitoring, security

### Preferências Opcionais

1. **Modo de Operação**: Como o script será usado?
   - Padrão: standalone (executável direto)
   - Opções: standalone | library (sourced) | helper (called by other tools)

2. **Output Format**: Formato de saída desejado?
   - Padrão: both (JSON + human-readable)
   - Opções: json | human | both

3. **Performance vs Simplicidade**: Balance desejado?
   - Padrão: balanced (simples mas eficiente)
   - Opções: maximum_simplicity | balanced | maximum_performance

4. **Operações Específicas**: Há operações específicas a incluir/excluir?
   - Padrão: Usar configuração de `vibes/configs/script-maker.json`
   - Opções: Especificar lista customizada

## Fluxo de Execução

### Fase 1: Inicializar

1. **Validar Pré-requisitos**:
   - Verificar que entrada do usuário foi fornecida
   - Verificar que propósito do script está claro
   - Se ausente: Apresentar Perguntas de Descoberta e AGUARDAR

2. **Carregar Contexto**:
   - Carregar `.cursor/rules/script-architecture.mdc` (rule de arquitetura)
   - Carregar `vibes/configs/script-maker.json` (configuração de operações)
   - Carregar scripts bash existentes em `vibes/scripts/` para referência
   - Carregar `vibes/memory/constitution.md` (se existir) para princípios do projeto

3. **Parse da Entrada**:
   - Extrair propósito do script de $ARGUMENTS
   - Extrair contexto (texto ou arquivos de referência)
   - Extrair operações necessárias (ou inferir do propósito)
   - Extrair preferências (ou usar defaults)

### Fase 2: Analisar Requisitos

1. **Identificar Operações Necessárias**:
   - Analisar propósito para inferir operações
   - Consultar configuração para verificar operações habilitadas
   - Listar operações específicas necessárias
   - Validar que operações estão habilitadas na config

2. **Determinar Arquitetura**:
   - Definir estrutura de arquivo (shebang, strict mode, etc.)
   - Definir funções necessárias (pequenas e focadas)
   - Definir variáveis e constantes
   - Definir fluxo de execução principal

3. **Identificar Padrões de Qualidade**:
   - Aplicar rule de arquitetura (script-architecture.mdc)
   - Aplicar configuração de qualidade (script-maker.json)
   - Definir critérios de validação específicos
   - Identificar anti-patterns a evitar

### Fase 3: Criar Script

1. **Estruturar Arquivo**:
   - Escrever shebang: `#!/usr/bin/env bash`
   - Adicionar strict mode: `set -euo pipefail`
   - Definir constantes (readonly) no topo
   - Definir variáveis globais (se necessário)

2. **Implementar Funções**:
   - Criar função `usage()` para help
   - Criar função `validate_input()` para validação
   - Criar função `output_json()` para JSON output
   - Criar funções específicas para operações (pequenas e focadas)
   - Criar função `main()` como entry point

3. **Implementar Lógica Principal**:
   - Parse de argumentos
   - Validação de inputs
   - Execução de operações
   - Tratamento de erros
   - Output formatado

4. **Otimizar Performance**:
   - Substituir external commands por native bash quando possível
   - Minimizar subshells e command substitutions
   - Usar arrays ao invés de string manipulation
   - Cache de outputs quando usado múltiplas vezes
   - Evitar loops desnecessários

5. **Adicionar Error Handling**:
   - Validar todos os inputs
   - Usar trap para cleanup (se necessário)
   - Fornecer mensagens de erro claras e contextuais
   - Usar exit codes apropriados (0=success, 1=error, 2=misuse)

### Fase 4: Validar

1. **Validar Output**:
   - Verificar que script segue rule de arquitetura
   - Verificar que script segue configuração de qualidade
   - Verificar que todas operações necessárias estão implementadas
   - Se falhar: Reportar problemas específicos e corrigir

2. **Portões de Qualidade**:
   - [ ] Script tem shebang correto
   - [ ] Script usa strict mode (`set -euo pipefail`)
   - [ ] Todas as funções usam variáveis locais
   - [ ] Todas as variáveis são quotadas
   - [ ] Script usa `[[ ]]` para conditionals
   - [ ] Script tem função `usage()`
   - [ ] Script tem função `output_json()` (se necessário)
   - [ ] Script valida todos os inputs
   - [ ] Script tem error handling robusto
   - [ ] Script evita todos os anti-patterns listados
   - [ ] Script não excede 300 linhas (ou justificado)
   - [ ] Script não tem mais de 3 níveis de nesting
   - [ ] Script é auto-explicativo (sem comentários desnecessários)

3. **Tratamento de Erros**:
   - Se operação não habilitada na config: ERRO + sugerir habilitar
   - Se propósito vago: Questione usuário com Perguntas de Descoberta
   - Se contexto insuficiente: Solicite mais informações
   - Se anti-pattern detectado: Reportar e sugerir correção

### Fase 5: Output

1. **Gerar Script**:
   - Escrever script completo em `vibes/scripts/[nome-script].sh`
   - Dar permissão de execução: `chmod +x script.sh`
   - Validar sintaxe: `bash -n script.sh`

2. **Reportar Resultados**:
   ```markdown
   ## ✅ Script Criado com Sucesso
   
   **Script**: [nome-script].sh
   **Localização**: `vibes/scripts/[nome-script].sh`
   
   ### Resumo
   
   - **Propósito**: [descrição]
   - **Operações**: [lista de operações]
   - **Linhas de código**: [número]
   - **Funções**: [número]
   - **Performance**: [otimizado/balanceado/simples]
   
   ### Arquitetura
   
   - ✅ Shebang correto
   - ✅ Strict mode habilitado
   - ✅ Error handling robusto
   - ✅ JSON output disponível
   - ✅ Input validation completa
   - ✅ Sem anti-patterns
   
   ### Uso
   
   ```bash
   # Executar script
   vibes/scripts/[nome-script].sh [args]

   # Executar com JSON output
   vibes/scripts/[nome-script].sh --json [args]
   
   # Ver ajuda
   vibes/scripts/[nome-script].sh --help
   ```
   
   ### Operações Implementadas
   
   [Lista detalhada de operações com descrição]
   
   ### Performance
   
   [Métricas de performance se aplicável]
   
   ### Próximos Passos
   
   1. Testar script com inputs de exemplo
   2. Validar comportamento esperado
   3. Integrar em workflow se necessário
   4. Adicionar testes se aplicável
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Simplicidade**: Sempre prefira a solução mais simples e direta
- **Performance**: Use recursos nativos do bash, evite external commands desnecessários
- **Manutenibilidade**: Código auto-explicativo, sem comentários desnecessários
- **Confiabilidade**: Validação rigorosa de inputs e error handling robusto
- **Consistência**: Sempre segue rule de arquitetura e configuração do projeto

### Tratamento de Erros

- **Se propósito vago**: Apresente Perguntas de Descoberta e AGUARDE respostas
- **Se contexto insuficiente**: Solicite mais informações ou arquivos de referência
- **Se operação não habilitada**: ERRO + instruções para habilitar na config
- **Se anti-pattern detectado**: Reportar específico + sugerir correção
- **Se script muito complexo**: Sugerir refatoração em múltiplos scripts menores

### Restrições

- SEMPRE use strict mode (`set -euo pipefail`)
- SEMPRE valide todos os inputs
- SEMPRE forneça error messages claros e contextuais
- SEMPRE use variáveis locais em funções
- SEMPRE quote variáveis
- SEMPRE use `[[ ]]` para conditionals
- SEMPRE evite anti-patterns listados na rule
- NUNCA use `eval` ou `source` com user input
- NUNCA use backticks (use `$()`)
- NUNCA use `ls` em scripts (use globs ou `find`)
- NUNCA use `cat` com arquivo único (use `< file`)
- NUNCA exceda 300 linhas sem justificativa
- NUNCA exceda 3 níveis de nesting

### Regras de Comportamento

- SEMPRE questione antes de assumir requisitos
- SEMPRE carregue rule de arquitetura e configuração
- SEMPRE valide contra portões de qualidade
- SEMPRE otimize para performance quando possível
- SEMPRE prefira simplicidade sobre complexidade
- NUNCA crie scripts sem propósito claro
- NUNCA ignore anti-patterns
- NUNCA crie scripts sem error handling

## Scripts

### validate-script.sh

**Propósito**: Validar script existente contra padrões de qualidade

**Localização**: `vibes/scripts/validate-script.sh`

**Uso**:
```bash
vibes/scripts/validate-script.sh [script-path] --json
```

**Output** (JSON):
```json
{
  "script": "/path/to/script.sh",
  "valid": true,
  "issues": [],
  "warnings": [],
  "metrics": {
    "lines": 150,
    "functions": 5,
    "max_nesting": 2
  },
  "compliance": {
    "shebang": true,
    "strict_mode": true,
    "local_variables": true,
    "quoted_variables": true,
    "error_handling": true
  }
}
```

**Códigos de Erro**:
- `0`: Script válido
- `1`: Script tem issues críticos
- `2`: Script tem warnings

### optimize-script.sh

**Propósito**: Otimizar script existente para performance

**Localização**: `vibes/scripts/optimize-script.sh`

**Uso**:
```bash
vibes/scripts/optimize-script.sh [script-path] --json
```

**Output** (JSON):
```json
{
  "script": "/path/to/script.sh",
  "optimizations": [
    {
      "type": "subshell_elimination",
      "description": "Replaced $(command) with native bash",
      "line": 45,
      "before": "result=$(command)",
      "after": "result=value"
    }
  ],
  "performance_gain": "15%",
  "backup": "/path/to/script.sh.backup"
}
```

**Códigos de Erro**:
- `0`: Otimização bem-sucedida
- `1`: Erro durante otimização
- `2`: Script não pode ser otimizado

## Templates

### script-template.sh

**Propósito**: Template base para novos scripts bash

**Localização**: `vibes/scripts/templates/script-template.sh`

**Usado para**: Criação de novos scripts

**Estrutura**:
- Shebang e strict mode *(obrigatório)*
- Constantes e variáveis globais *(obrigatório)*
- Função usage() *(obrigatório)*
- Função validate_input() *(obrigatório)*
- Função output_json() *(opcional - se JSON output)*
- Funções específicas de operações *(obrigatório)*
- Função main() *(obrigatório)*
- Chamada main "$@" *(obrigatório)*

## Exemplos

### Exemplo 1: Input Bom → Output

```
Input: 
"Preciso de um script que processe arquivos JSON em um diretório,
extraia campos específicos e gere um relatório em formato JSON.
O script deve validar que os arquivos são JSON válidos e reportar
erros claros se houver problemas."

Output:
✅ Script Criado com Sucesso

**Script**: process-json-files.sh
**Localização**: `vibes/scripts/bash/process-json-files.sh`

### Resumo

- **Propósito**: Processar arquivos JSON, extrair campos e gerar relatório
- **Operações**: file system, data formats (JSON)
- **Linhas de código**: 127
- **Funções**: 6
- **Performance**: Otimizado

### Arquitetura

- ✅ Shebang correto
- ✅ Strict mode habilitado
- ✅ Error handling robusto
- ✅ JSON output disponível
- ✅ Input validation completa
- ✅ Sem anti-patterns

### Uso

```bash
# Executar script
vibes/scripts/bash/process-json-files.sh ./data --fields name,email

# Executar com JSON output
vibes/scripts/bash/process-json-files.sh --json ./data --fields name,email

# Ver ajuda
vibes/scripts/bash/process-json-files.sh --help
```

### Operações Implementadas

1. **Validação de diretório**: Verifica que diretório existe e é legível
2. **Busca de arquivos JSON**: Usa find para localizar arquivos .json
3. **Validação de JSON**: Verifica sintaxe JSON de cada arquivo
4. **Extração de campos**: Extrai campos especificados usando jq
5. **Agregação de dados**: Combina resultados de todos os arquivos
6. **Geração de relatório**: Output em JSON ou texto formatado

### Performance

- Usa find nativo ao invés de ls
- Cache de resultados de validação
- Processamento em batch quando possível
- Sem subshells desnecessários
```

### Exemplo 2: Pré-requisitos Ausentes → Erro

```
Input: "crie um script"

Output:
❌ ERRO: Propósito do script não especificado

Contexto:
- Tentando criar script sem propósito claro
- Command requer propósito específico para gerar script adequado

Razão:
- Propósito é obrigatório para determinar operações necessárias
- Sem propósito, não é possível criar script funcional

Sugestão:
- Forneça propósito claro em 1 frase
- Exemplo: "Script que processa arquivos JSON e gera relatório"
- Exemplo: "Script que automatiza deploy em produção"
- Exemplo: "Script que valida estrutura de projeto"

Próxima Ação:
- Reexecute command com propósito específico
- Exemplo: /maker.script "criar script que processa arquivos JSON..."
```

### Exemplo 3: Operação Não Habilitada → Erro

```
Input:
"Preciso de um script que faça deploy automático usando Docker
e Kubernetes, incluindo health checks e rollback automático."

Output:
❌ ERRO: Operações de deployment não estão habilitadas

Contexto:
- Script requer operações: docker, k8s, deployment
- Configuração atual: deployment.enabled = false

Razão:
- Operações de deployment são sensíveis e desabilitadas por padrão
- Requer habilitação explícita para segurança

Sugestão:
- Edite `vibes/configs/script-maker.json`
- Altere `deployment.enabled` de `false` para `true`
- Reexecute command

Próxima Ação:
- Abra `vibes/configs/script-maker.json`
- Localize seção "deployment"
- Altere "enabled": false para "enabled": true
- Salve arquivo
- Reexecute: /maker.script [seu input]
```

## Integração

### Posição no Workflow

**Precedido por**: Nenhum (standalone)

**Seguido por**: Outros commands que usam scripts gerados

### Dependências

**Commands Obrigatórios**: Nenhum

**Commands Opcionais**: 
- `exec.implement.md` (usar scripts gerados em implementação)
- `analyzer.project.md` (validar scripts existentes)

### Fluxo de Dados

```
User Input (propósito + contexto)
  ↓
maker.script
  ↓ (produz: script.sh)
exec.implement (opcional)
  ↓ (usa: script.sh)
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar este command completo, verifique:

### Estrutura
- [x] Frontmatter com description clara e concisa
- [x] Seção Entrada do Usuário presente
- [x] Objetivo com 2-3 parágrafos explicativos
- [x] Quando usar e Pré-requisitos documentados
- [x] Descoberta & Validação com Perguntas de Descoberta
- [x] Fluxo de Execução com fases numeradas
- [x] Princípios Operacionais com standards, error handling, constraints
- [x] Scripts helper documentados
- [x] Templates documentados
- [x] Exemplos com input bom e caso de erro
- [x] Integração documentada

### Qualidade de Conteúdo
- [x] Propósito do command imediatamente compreensível
- [x] Todos os passos de execução documentados
- [x] Error handling explícito para casos conhecidos
- [x] Exemplos realistas e úteis
- [x] Nenhum placeholder [CAPS] não preenchido
- [x] Seções [REMOVE IF UNUSED] avaliadas (usadas ou removidas)

### Consistência
- [x] Segue estrutura do template universal
- [x] Usa terminologia consistente com outros commands
- [x] Referências a paths e arquivos estão corretas
- [x] Scripts e templates referenciados existem ou serão criados
- [x] Integração com outros commands documentada

### Governança
- [x] Respeita princípios da constitution.md
- [x] Não viola constraints estabelecidos
- [x] Segue padrões de qualidade do projeto

