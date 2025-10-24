# Example: Criar Command de Busca e Pesquisa Profunda

Este example demonstra como usar `/maker.command` para criar commands de busca, pesquisa profunda e análise de sistema.

---

## 🎯 Objetivo

Criar três commands usando o `maker.command`:

1. **search.simple** - Busca simples em arquivos
2. **research.deep** - Pesquisa profunda com análise acadêmica
3. **analyzer.system** - Análise completa do sistema

---

## Example 1: Command de Busca Simples

### Passo 1: Invocar o Maker

```
/maker.command
```

### Passo 2: Responder às Perguntas de Descoberta

O maker vai questionar:

```markdown
## Descoberta & Validação

1. **Propósito**: O que este command deve fazer?
   [x] Buscar em arquivos
   
2. **Inputs**: De onde vêm os dados?
   [x] User input direto (termo de busca)
   [x] Arquivos existentes (codebase)
   
3. **Outputs**: O que deve ser produzido?
   [x] Report/análise (resultados formatados)
   
4. **Automação**: Há operações repetitivas?
   [ ] Não (grep já faz o trabalho)
   
5. **Template**: Existe template ou precisa criar?
   [ ] Não precisa de template (output dinâmico)
   
6. **Validação**: Como saber se está correto?
   - Critérios: Encontrar todas as ocorrências, sem duplicatas
```

### Passo 3: Fornecer Contexto

```
Propósito: Buscar termo em arquivos do projeto, filtrar por tipo, 
           exibir resultados com contexto e estatísticas.

Inputs: Termo de busca (string), tipo de arquivo opcional

Outputs: Lista de arquivos com matches, linhas encontradas, 
         estatísticas (total, por diretório)
```

### Passo 4: O Maker Gera o Command

O `maker.command` vai:

1. ✅ Carregar `template.commands.md`
2. ✅ Carregar commands de referência (search.*, grep patterns)
3. ✅ Preencher template com contexto fornecido
4. ✅ Criar `search.simple.md` em `.cursor/commands/`

### Output Gerado: `search.simple.md`

```markdown
---
description: Buscar termo em arquivos do projeto com filtros e estatísticas
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir.

## Objetivo

Buscar termo em arquivos do projeto, permitindo filtros por tipo de arquivo,
exibindo resultados com contexto e estatísticas de ocorrências.

**Quando usar**: Quando precisa encontrar código, texto ou patterns específicos
no projeto rapidamente.

**Pré-requisitos**: 
- Projeto com arquivos para buscar
- Termo de busca definido

## Descoberta & Validação

### Informações Obrigatórias

1. **Termo de Busca**: O que buscar?
   - Se vazio: ERRO - Perguntar e aguardar

2. **Filtros**: Onde buscar?
   - Tipo de arquivo (opcional): js, md, py, etc
   - Diretórios específicos (opcional)
   - Padrão: Todo o projeto

## Fluxo de Execução

### Fase 1: Validar Input

1. **Parsear Argumentos**:
   - Extrair termo de busca
   - Extrair tipo de arquivo (se fornecido)
   - Extrair paths específicos (se fornecidos)

2. **Validar**:
   - Termo não vazio
   - Tipo de arquivo válido (se fornecido)
   - Paths existem (se fornecidos)

### Fase 2: Executar Busca

1. **Usar grep tool**:
   ```javascript
   grep({
     pattern: termo,
     type: tipoArquivo,
     path: pathEspecifico
   })
   ```

2. **Processar Resultados**:
   - Agrupar por arquivo
   - Contar ocorrências
   - Extrair contexto (linhas antes/depois)

### Fase 3: Formatar Output

1. **Estatísticas**:
   - Total de matches
   - Total de arquivos
   - Distribuição por diretório

2. **Resultados**:
   - Lista por arquivo
   - Linhas com match
   - Contexto ao redor

### Fase 4: Exibir

1. **Format**:
   ```markdown
   🔍 Busca: "{termo}"
   
   📊 Estatísticas:
   - Matches: X
   - Arquivos: Y
   - Diretórios: Z
   
   📄 Resultados:
   
   **arquivo1.js** (5 matches):
   - Linha 10: contexto com *match* destacado
   - Linha 42: outro contexto
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Performance**: Usar grep (rápido) não codebase_search
- **Contexto**: Sempre mostrar linhas ao redor do match
- **Estatísticas**: Sempre incluir resumo quantitativo

### Tratamento de Erros

- **Se termo vazio**: ERRO - Perguntar e aguardar
- **Se nenhum match**: Informar "0 resultados encontrados"
- **Se tipo inválido**: Avisar e buscar em todos

### Restrições

- SEMPRE usar grep tool (performance)
- SEMPRE mostrar estatísticas
- SEMPRE incluir contexto ao redor
- NUNCA limitar resultados sem avisar
- NUNCA omitir estatísticas

## Exemplos

### Input Bom → Output

```
Input: /search.simple "async function"

Output:
🔍 Busca: "async function"

📊 Estatísticas:
- Matches: 42
- Arquivos: 15
- Diretórios: src/, lib/, tests/

📄 Resultados:

**src/api/users.js** (3 matches):
- Linha 10: async function getUser(id) {
- Linha 25: async function createUser(data) {
- Linha 40: async function updateUser(id, data) {

[... mais resultados ...]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

- [ ] Termo de busca validado
- [ ] grep tool utilizado
- [ ] Estatísticas calculadas
- [ ] Resultados formatados
- [ ] Contexto incluído
- [ ] Erros tratados
```

---

## Example 2: Command de Pesquisa Profunda

### Passo 1: Invocar o Maker

```
/maker.command "Criar command de pesquisa profunda acadêmica com scoring e síntese"
```

### Passo 2: Respostas Condensadas

```
Propósito: Pesquisar tópico com rigor acadêmico, scorear relevância, 
           sintetizar achados e gerar relatório estruturado

Inputs: 
- Tópico de pesquisa
- Profundidade (simple/deep/expert)
- Filtros opcionais (data, tipo fonte)

Outputs:
- Referências coletadas com scores
- Síntese dos achados
- Relatório final em markdown
- Metadata JSON

Automação:
- SIM: Scoring automático de relevância
- SIM: Geração de relatório via template

Template:
- Precisa criar: template.research-report.md

Validação:
- Mínimo X referências encontradas
- Score médio > threshold
- Síntese com N parágrafos
- Relatório completo
```

### Passo 3: Maker Analisa e Propõe

```markdown
## Avaliação de Script

Identifiquei:

1. **Scoring de Referências**: 
   - Frequência: Cada pesquisa
   - Complexidade: Alta (multiple criteria)
   - Erro-prone: Sim (cálculos complexos)
   
**Recomendação**: Criar script `scorer.references.sh`
**Razão**: Cálculo consistente de scores, reutilizável

**Trade-offs**:
| Com Script | Sem Script |
|-------------|-------------|
| ✅ Scoring consistente | ✅ Estrutura mais simples |
| ✅ Reutilizável | ✅ Sem dep de bash |
| ❌ Manutenção extra | ❌ Cálculo manual (erros) |

Devo criar script? (Sim)

---

## Avaliação de Template

**Tipo de Output**: Estruturado

**Estrutura necessária**:
```
# Research Report: [TOPIC]

## Metadata
- Depth: [DEPTH]
- Date: [DATE]
- References: [COUNT]

## Top References (scored)
[Lista com scores]

## Synthesis
[Parágrafos]

## Recommendations
[Next steps]
```

**Decisão**: Criar template `template.research-report.md`
```

### Passo 4: Output Gerado

O maker cria:

1. ✅ Command: `research.deep.md`
2. ✅ Script: `vibes/scripts/bash/scorer.references.sh`
3. ✅ Template: `vibes/structure/templates/template.research-report.md`

**Estrutura do command** inclui:

- Fase 1: Validar inputs (tópico, profundidade)
- Fase 2: Buscar referências (web_search)
- Fase 3: Scorear relevância (via script)
- Fase 4: Sintetizar achados (análise de IA)
- Fase 5: Gerar relatório (via template)
- Fase 6: Salvar em memory

---

## Example 3: Command de Análise de Sistema

### Passo 1: Invocar

```
/maker.command "Analisar sistema completo: dependências, arquitetura, issues, tech debt"
```

### Passo 2: Respostas

```
Propósito: Análise holística do sistema - deps, arquitetura, problemas, 
           tech debt, sugestões de melhorias

Inputs:
- Diretório raiz do projeto (detectado automaticamente)
- Foco opcional (deps, arch, debt)

Outputs:
- Relatório multi-seção:
  * Dependências (versões, vulnerabilidades, outdated)
  * Arquitetura (pattern detectado, violações)
  * Issues (linter errors, code smells)
  * Tech Debt (TODOs, FIXMEs, deprecated code)
  * Recommendations (ações priorizadas)
  
Automação:
- SIM: Análise de package.json/requirements.txt
- SIM: Detecção de pattern arquitetural
- SIM: Extração de TODOs/FIXMEs
- SIM: Priorização de recommendations

Template:
- Criar: template.system-analysis-report.md

Validação:
- Todas as seções preenchidas
- Pelo menos 3 recommendations
- Dados quantitativos (números, %)
```

### Passo 3: Maker Gera Command Complexo

```markdown
## Avaliação de Script

Identificadas múltiplas operações automatizáveis:

1. **Análise de Dependências**:
   - Script: `analyzer.dependencies.sh`
   - Função: Parse package.json, check versions, vulnerabilities
   
2. **Extração de TODOs/FIXMEs**:
   - Script: `extractor.tech-debt.sh`
   - Função: Grep patterns, count, categorizar

3. **Detecção de Arquitetura**:
   - Script: `detector.architecture.sh`
   - Função: Analisar estrutura de pastas, inferir pattern

**Recomendação**: Criar 3 scripts especializados

Isso permite:
- Reutilização em outros analyzers
- Manutenção independente
- Testing isolado
```

### Passo 4: Output Final

O maker cria:

1. ✅ Command: `analyzer.system.md`
2. ✅ Scripts (3):
   - `analyzer.dependencies.sh`
   - `extractor.tech-debt.sh`
   - `detector.architecture.sh`
3. ✅ Template: `template.system-analysis-report.md`

---

## 🎓 Lições Aprendidas

### 1. **Questionamento é Crucial**

O maker SEMPRE questiona primeiro. Isso evita:

- ❌ Commands vagos
- ❌ Outputs inconsistentes
- ❌ Retrabalho

### 2. **Scripts para Automação**

Quando criar scripts:

- ✅ Operações repetitivas
- ✅ Cálculos complexos
- ✅ File system operations
- ✅ Parsing de dados estruturados

Quando NÃO criar:

- ❌ Geração de texto/conteúdo
- ❌ Lógica de decisão
- ❌ Uma única vez

### 3. **Templates para Consistência**

Templates garantem:

- ✅ Estrutura previsível
- ✅ Seções completas
- ✅ Fácil comparação entre reports

### 4. **Validação Sempre**

Commands DEVEM validar:

- ✅ Inputs antes de processar
- ✅ Outputs antes de salvar
- ✅ Dependências antes de executar

---

## 📚 Próximos Examples

- **Example 2**: `maker-script-integration.md` - Como integrar commands + scripts
- **Example 3**: `maker-rule-integration.md` - Como criar rules para guiar commands

---

**Dica**: Use sempre `/maker.command` para criar novos commands. Ele garante qualidade, consistência e completude!

