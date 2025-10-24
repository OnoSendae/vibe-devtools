# Example: Integração de Commands + Scripts

Este example demonstra como usar `/maker.script` para criar scripts auxiliares e integrá-los perfeitamente com commands.

---

## 🎯 Objetivo

Aprender a:

1. Identificar quando criar scripts vs lógica inline
2. Usar `/maker.script` para gerar scripts robustos
3. Integrar scripts com commands via `run_terminal_cmd`
4. Processar outputs de scripts (JSON, plain text)
5. Tratar erros de scripts adequadamente

---

## Conceito: Commands vs Scripts

### Commands Fazem

- ✅ Orquestração de fluxo
- ✅ Tomada de decisão
- ✅ Geração de conteúdo
- ✅ Interação com IA
- ✅ Validação de lógica complexa

### Scripts Fazem

- ✅ Operações de file system (mkdir, cp, mv, rm)
- ✅ Parsing de arquivos estruturados (JSON, YAML)
- ✅ Cálculos e transformações de dados
- ✅ Operações Git (branch, commit, diff)
- ✅ Execuções repetitivas e error-prone

---

## Example 1: Script de Análise de Dependências

### Cenário

Você tem um command `analyzer.dependencies` que precisa:

1. Ler `package.json`
2. Listar dependências
3. Verificar versões outdated
4. Calcular score de atualização
5. Retornar JSON estruturado

**Problema**: Fazer tudo isso inline no command é:
- ❌ Verbose
- ❌ Error-prone
- ❌ Não reutilizável

**Solução**: Criar script `analyzer.dependencies.sh`!

---

### Passo 1: Criar o Script com `/maker.script`

```
/maker.script "Analisar dependências de package.json e retornar JSON com versões, outdated e score"
```

#### Maker Questiona

```markdown
1. **Linguagem**: bash ou node?
   → bash (operações file system simples)

2. **Inputs**: Quais argumentos?
   → Path para package.json (opcional, default: ./package.json)

3. **Output**: Formato?
   → JSON estruturado:
   {
     "dependencies": [...],
     "devDependencies": [...],
     "outdated": [...],
     "score": 0-100
   }

4. **Dependências**: Comandos externos?
   → jq (parsing JSON)
   → npm outdated (check versions)

5. **Erro**: Como tratar?
   → Exit code != 0 se package.json não existe
   → JSON com erro se npm outdated falha
```

#### Output: `vibes/scripts/bash/analyzer.dependencies.sh`

```bash
#!/usr/bin/env bash

set -euo pipefail

PACKAGE_JSON="${1:-./package.json}"

if [[ ! -f "$PACKAGE_JSON" ]]; then
  echo '{"error": "package.json not found", "path": "'"$PACKAGE_JSON"'"}' >&2
  exit 1
fi

dependencies=$(jq -r '.dependencies // {} | to_entries | map({name: .key, version: .value})' "$PACKAGE_JSON")
dev_dependencies=$(jq -r '.devDependencies // {} | to_entries | map({name: .key, version: .value})' "$PACKAGE_JSON")

outdated_output=$(npm outdated --json 2>/dev/null || echo '{}')
outdated=$(echo "$outdated_output" | jq -r 'to_entries | map({name: .key, current: .value.current, latest: .value.latest})')

total_deps=$(echo "$dependencies" | jq 'length')
outdated_count=$(echo "$outdated" | jq 'length')

if (( total_deps == 0 )); then
  score=100
else
  score=$(( 100 - (outdated_count * 100 / total_deps) ))
fi

jq -n \
  --argjson deps "$dependencies" \
  --argjson devDeps "$dev_dependencies" \
  --argjson outdated "$outdated" \
  --argjson score "$score" \
  '{
    dependencies: $deps,
    devDependencies: $devDeps,
    outdated: $outdated,
    score: $score,
    timestamp: now | todate
  }'

exit 0
```

---

### Passo 2: Integrar no Command

#### Command: `analyzer.dependencies.md`

```markdown
## Fluxo de Execução

### Fase 1: Validar Projeto

1. **Detectar package.json**:
   ```javascript
   const packagePath = path.join(process.cwd(), 'package.json');
   if (!fs.existsSync(packagePath)) {
     throw new Error('No package.json found');
   }
   ```

### Fase 2: Executar Script de Análise

1. **Chamar script**:
   ```javascript
   run_terminal_cmd({
     command: 'bash vibes/scripts/bash/analyzer.dependencies.sh ./package.json',
     is_background: false,
     explanation: 'Analyzing project dependencies'
   })
   ```

2. **Processar output**:
   - Script retorna JSON via stdout
   - Parse JSON para objeto
   - Validar estrutura esperada

### Fase 3: Processar Resultados

1. **Extrair dados**:
   ```javascript
   const result = JSON.parse(scriptOutput);
   
   const totalDeps = result.dependencies.length;
   const outdatedCount = result.outdated.length;
   const score = result.score;
   ```

2. **Gerar insights**:
   - Score < 70 → ⚠️ "Muitas deps outdated"
   - Score >= 70 < 90 → 📊 "Deps razoavelmente atualizadas"
   - Score >= 90 → ✅ "Deps muito atualizadas"

### Fase 4: Formatar Report

1. **Exibir**:
   ```markdown
   📦 Análise de Dependências
   
   Score: ${score}/100 ${emoji}
   
   **Total**: ${totalDeps} dependências
   **Outdated**: ${outdatedCount} (${percentage}%)
   
   ### 🔴 Dependências Desatualizadas
   
   | Package | Current | Latest |
   |---------|---------|--------|
   ${outdated.map(d => `| ${d.name} | ${d.current} | ${d.latest} |`).join('\n')}
   ```

## Scripts

### analyzer.dependencies.sh

**Propósito**: Analisar dependências de package.json

**Localização**: `vibes/scripts/bash/analyzer.dependencies.sh`

**Uso**:
```bash
bash vibes/scripts/bash/analyzer.dependencies.sh [path/to/package.json]
```

**Input**: Path para package.json (opcional, default: ./package.json)

**Output** (JSON via stdout):
```json
{
  "dependencies": [...],
  "devDependencies": [...],
  "outdated": [...],
  "score": 85,
  "timestamp": "2025-10-21T15:30:00Z"
}
```

**Exit Codes**:
- `0`: Sucesso
- `1`: package.json não encontrado
```

---

## Example 2: Script de Setup de Tasks

### Cenário

Command `planner.project` precisa criar estrutura de diretórios e arquivos para tasks.

**Operações**:

1. Criar `vibes/tasks/[FEATURE_ID]/`
2. Criar subpastas (p0-bloqueador, p1-critico, etc)
3. Copiar template task
4. Validar estrutura criada
5. Retornar summary JSON

**Problema**: Fazer isso inline = muitos `mkdir`, `cp`, validações.

**Solução**: Script `setup.tasks-structure.sh`!

---

### Passo 1: Criar Script

```
/maker.script "Criar estrutura de diretórios para tasks com feature ID e validação"
```

#### Output: `vibes/scripts/bash/setup.tasks-structure.sh`

```bash
#!/usr/bin/env bash

set -euo pipefail

FEATURE_ID="$1"
BASE_DIR="${2:-vibes/tasks}"

if [[ -z "$FEATURE_ID" ]]; then
  echo '{"error": "FEATURE_ID required"}' >&2
  exit 1
fi

FEATURE_DIR="$BASE_DIR/$FEATURE_ID"

if [[ -d "$FEATURE_DIR" ]]; then
  echo '{"error": "Feature already exists", "path": "'"$FEATURE_DIR"'"}' >&2
  exit 2
fi

mkdir -p "$FEATURE_DIR"/{p0-bloqueador,p1-critico,p2-alto,p3-medio,p4-baixo}

created_dirs=()
for priority_dir in "$FEATURE_DIR"/p*; do
  if [[ -d "$priority_dir" ]]; then
    created_dirs+=("$(basename "$priority_dir")")
  fi
done

jq -n \
  --arg feature "$FEATURE_ID" \
  --arg path "$FEATURE_DIR" \
  --argjson dirs "$(printf '%s\n' "${created_dirs[@]}" | jq -R . | jq -s .)" \
  '{
    featureId: $feature,
    path: $path,
    directories: $dirs,
    timestamp: now | todate
  }'

exit 0
```

---

### Passo 2: Integrar no Command

#### Command: `planner.project.md`

```markdown
### Fase 4: Criar Estrutura de Diretórios

1. **Executar script de setup**:
   ```javascript
   run_terminal_cmd({
     command: `bash vibes/scripts/bash/setup.tasks-structure.sh ${featureId}`,
     is_background: false,
     explanation: 'Creating task directory structure'
   })
   ```

2. **Validar resultado**:
   ```javascript
   const setupResult = JSON.parse(scriptOutput);
   
   if (setupResult.error) {
     throw new Error(`Setup failed: ${setupResult.error}`);
   }
   
   const { featureId, path, directories } = setupResult;
   
   // Validar que todas as prioridades foram criadas
   const expectedDirs = ['p0-bloqueador', 'p1-critico', 'p2-alto', 'p3-medio', 'p4-baixo'];
   const allCreated = expectedDirs.every(dir => directories.includes(dir));
   
   if (!allCreated) {
     throw new Error('Some priority directories were not created');
   }
   ```

3. **Prosseguir com geração de tasks**:
   - Estrutura validada ✅
   - Pode criar tasks em cada pasta
```

---

## Example 3: Script de Cálculo de Scores

### Cenário

Command `research.score` precisa calcular score de relevância de múltiplas referências baseado em critérios complexos.

**Cálculo**:

```
score = (
  keywords_match * 0.3 +
  date_recency * 0.2 +
  source_authority * 0.25 +
  citation_count * 0.15 +
  relevance_semantic * 0.1
) * 100
```

**Problema**: Fazer isso inline = erro de cálculo fácil, não reutilizável.

**Solução**: Script `scorer.references.sh`!

---

### Passo 1: Criar Script

```
/maker.script "Calcular score de relevância de referências acadêmicas via critérios weighted"
```

#### Output: `vibes/scripts/bash/scorer.references.sh`

```bash
#!/usr/bin/env bash

set -euo pipefail

REFERENCES_JSON="$1"

if [[ ! -f "$REFERENCES_JSON" ]]; then
  echo '{"error": "References file not found"}' >&2
  exit 1
fi

calculate_score() {
  local keywords_match="$1"
  local date_recency="$2"
  local source_authority="$3"
  local citation_count="$4"
  local relevance_semantic="$5"
  
  local score=$(echo "scale=2; ($keywords_match * 0.3 + $date_recency * 0.2 + $source_authority * 0.25 + $citation_count * 0.15 + $relevance_semantic * 0.1) * 100" | bc)
  
  printf "%.0f" "$score"
}

jq -c '.references[]' "$REFERENCES_JSON" | while IFS= read -r ref; do
  keywords=$(echo "$ref" | jq -r '.keywords_match // 0')
  recency=$(echo "$ref" | jq -r '.date_recency // 0')
  authority=$(echo "$ref" | jq -r '.source_authority // 0')
  citations=$(echo "$ref" | jq -r '.citation_count // 0')
  semantic=$(echo "$ref" | jq -r '.relevance_semantic // 0')
  
  score=$(calculate_score "$keywords" "$recency" "$authority" "$citations" "$semantic")
  
  echo "$ref" | jq --argjson score "$score" '. + {score: $score}'
done | jq -s '{references: ., timestamp: now | todate}'

exit 0
```

---

### Passo 2: Integrar no Command

```markdown
### Fase 3: Calcular Scores

1. **Preparar input JSON**:
   ```javascript
   const referencesInput = {
     references: references.map(r => ({
       title: r.title,
       keywords_match: calculateKeywordMatch(r, keywords),
       date_recency: calculateRecency(r.date),
       source_authority: getSourceAuthority(r.source),
       citation_count: normalizeCitations(r.citations),
       relevance_semantic: r.semanticScore
     }))
   };
   
   fs.writeFileSync('/tmp/refs-input.json', JSON.stringify(referencesInput));
   ```

2. **Executar script**:
   ```javascript
   run_terminal_cmd({
     command: 'bash vibes/scripts/bash/scorer.references.sh /tmp/refs-input.json',
     is_background: false
   })
   ```

3. **Processar scored references**:
   ```javascript
   const scored = JSON.parse(scriptOutput);
   const sortedRefs = scored.references.sort((a, b) => b.score - a.score);
   const topRefs = sortedRefs.slice(0, 20); // Top 20
   ```
```

---

## 🎓 Padrões de Integração

### Padrão 1: Input via Argumentos

**Quando**: Inputs simples (strings, números, paths)

```javascript
run_terminal_cmd({
  command: `bash script.sh "${arg1}" "${arg2}"`,
  is_background: false
})
```

### Padrão 2: Input via Arquivo Temporário

**Quando**: Inputs complexos (JSON, arrays, objects)

```javascript
fs.writeFileSync('/tmp/input.json', JSON.stringify(data));

run_terminal_cmd({
  command: 'bash script.sh /tmp/input.json',
  is_background: false
})

fs.unlinkSync('/tmp/input.json'); // Cleanup
```

### Padrão 3: Input via stdin

**Quando**: Streaming ou pipes

```javascript
run_terminal_cmd({
  command: `echo '${JSON.stringify(data)}' | bash script.sh`,
  is_background: false
})
```

### Padrão 4: Output JSON Estruturado

**Sempre** retornar JSON de scripts para fácil parsing:

```bash
jq -n --arg value "$result" '{result: $value, timestamp: now | todate}'
```

No command:

```javascript
const output = JSON.parse(scriptOutput);
const { result, timestamp } = output;
```

---

## ⚠️ Tratamento de Erros

### No Script

```bash
#!/usr/bin/env bash

set -euo pipefail  # Exit on error, undefined var, pipe failure

if [[ ! -f "$INPUT_FILE" ]]; then
  echo '{"error": "File not found", "path": "'"$INPUT_FILE"'"}' >&2
  exit 1
fi

# ... processamento ...

if (( some_error_condition )); then
  echo '{"error": "Processing failed", "reason": "details"}' >&2
  exit 2
fi

exit 0
```

### No Command

```javascript
let scriptResult;

try {
  scriptResult = await run_terminal_cmd({
    command: 'bash script.sh input.json',
    is_background: false
  });
} catch (error) {
  // Script falhou (exit code != 0)
  logger.error('Script execution failed', { error });
  
  // Tentar parsear erro do stderr
  try {
    const errorData = JSON.parse(error.stderr);
    throw new ScriptError(errorData.error, { details: errorData });
  } catch {
    throw new ScriptError('Script failed', { error });
  }
}

// Processar output
try {
  const data = JSON.parse(scriptResult.stdout);
  // ... usar data ...
} catch (parseError) {
  throw new Error('Failed to parse script output');
}
```

---

## 📚 Checklist de Integração

### Ao Criar Script

- [ ] Shebang correto (`#!/usr/bin/env bash`)
- [ ] Error handling (`set -euo pipefail`)
- [ ] Validação de inputs
- [ ] Output JSON estruturado
- [ ] Exit codes documentados
- [ ] Cleanup de temporários

### Ao Integrar no Command

- [ ] Validar que script existe antes de chamar
- [ ] Preparar inputs corretamente
- [ ] Tratar erros de execução
- [ ] Validar output do script
- [ ] Cleanup após uso
- [ ] Documentar script na seção "Scripts"

---

## 🚀 Próximos Passos

- **Example 1**: `maker-command-search.md` - Criar commands
- **Example 3**: `maker-rule-integration.md` - Integrar rules com commands

---

**Dica**: Use scripts para operações repetitivas e error-prone. Deixe a lógica de decisão e orquestração para o command!

