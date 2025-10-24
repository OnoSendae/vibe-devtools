# Example: Integração de Rules com Commands

Este example demonstra como usar `/maker.rule` para criar rules que guiam commands específicos, garantindo qualidade, consistência e boas práticas.

---

## 🎯 Objetivo

Aprender a:

1. Criar rules (.mdc) que guiam commands
2. Estruturar rules com seções obrigatórias
3. Fazer commands referenciarem rules
4. Criar rules específicas vs gerais
5. Validar compliance de outputs com rules

---

## Conceito: Rules vs Commands

### Rules São

- 📜 **Declarativas** - O QUE fazer, não COMO
- 🎯 **Prescritivas** - DEVE, SHOULD, MAY
- ✅ **Testáveis** - Objetivamente verificáveis
- 🔄 **Reutilizáveis** - Aplicam a múltiplos commands

### Commands São

- ⚙️ **Imperativos** - COMO fazer
- 🔀 **Procedurais** - Passo-a-passo
- 🧠 **Decisórios** - If/else, validações
- 🎯 **Específicos** - Uma tarefa bem definida

### Relação

```
Rule: "Code DEVE ter max 50 linhas por função"
         ↓
Command: /maker.typescript
         ↓ (lê rule, aplica)
Output: Funções com max 50 linhas ✅
```

---

## Example 1: Rule para Command de Code Generation

### Cenário

Você tem command `/maker.typescript` que gera código TypeScript. Quer garantir:

- ✅ Código segue boas práticas
- ✅ Naming conventions consistentes
- ✅ Estrutura de arquivos padronizada
- ✅ Type safety obrigatório

---

### Passo 1: Criar Rule com `/maker.rule`

```
/maker.rule "TypeScript code generation standards para maker.typescript"
```

#### Maker Questiona

```markdown
1. **Stack Detectado**: TypeScript, Node.js

2. **Categoria**: Code Structure

3. **Princípio**: Qual valor essa rule implementa?
   → Type Safety, Código Limpo, Manutenibilidade

4. **Guidance**: O que AI deve fazer?
   → Gerar código TypeScript com types explícitos, funções pequenas, naming claro

5. **Examples**: Precisa de code examples?
   → SIM - Good vs Bad examples
```

#### Output: `.cursor/rules/typescript-code-generation.mdc`

```markdown
# TypeScript: Code Generation Standards

## Principle

Código TypeScript gerado DEVE ser type-safe, limpo, testável e seguir convenções modernas do ecossistema.

## Guidance

Ao gerar código TypeScript usando `/maker.typescript` ou similar:

### DO (Fazer)

- **Type Everything Explicitly**:
  - Declare tipos para todas as funções (params + return)
  - Use interfaces para objetos complexos
  - Evite `any` (use `unknown` quando necessário)
  - Prefira `type` aliases para unions/intersections
  
- **Keep Functions Small**:
  - Máximo 50 linhas por função
  - Uma responsabilidade por função
  - Extract helpers se necessário
  
- **Use Modern Syntax**:
  - async/await (não callbacks)
  - Const/let (nunca var)
  - Arrow functions onde apropriado
  - Optional chaining (?.) e nullish coalescing (??)
  
- **File Organization**:
  - Um export principal por arquivo
  - Imports agrupados (external, internal, types)
  - Naming: kebab-case para arquivos, PascalCase para classes, camelCase para funções

- **Error Handling**:
  - Custom error classes que extends Error
  - Try-catch em async functions
  - Never swallow errors silently

### DON'T (Não Fazer)

- ❌ Usar `any` sem justificativa
- ❌ Criar funções > 50 linhas
- ❌ Omitir return types
- ❌ Usar `var` ou callbacks aninhados
- ❌ Deixar erros sem tratamento

## Examples

### ✅ Good

```typescript
interface UserData {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(userId: string): Promise<UserData> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    const data: UserData = await response.json();
    return data;
  } catch (error) {
    logger.error('User fetch failed', { userId, error });
    throw new UserFetchError('Could not fetch user', { cause: error });
  }
}

class UserFetchError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'UserFetchError';
  }
}
```

### ❌ Bad

```typescript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}
```

**Problemas**:
- ❌ Sem tipos (params, return)
- ❌ Sem error handling
- ❌ Sem validação de response

## Rationale

**Type Safety**: TypeScript sem types é JavaScript com overhead. Types previnem bugs em tempo de desenvolvimento.

**Small Functions**: Funções pequenas são mais fáceis de testar, entender e reutilizar.

**Modern Syntax**: async/await é mais legível que promises, optional chaining previne erros de null/undefined.

**Error Handling**: Erros bem tratados facilitam debugging e melhoram UX.

## Enforcement

### Automated

- TSC: `npx tsc --noEmit` (type checking)
- ESLint: `@typescript-eslint/explicit-function-return-type`
- ESLint: `@typescript-eslint/no-explicit-any`

### Manual

- Code Review: Verificar functions > 50 linhas
- PR Template: Checklist de compliance

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Clean Code TypeScript](https://github.com/labs42io/clean-code-typescript)
```

---

### Passo 2: Integrar Rule no Command

#### Command: `maker.typescript.md`

```markdown
## Fluxo de Execução

### Fase 1: Carregar Governança

1. **Carregar Rule de TypeScript**:
   - Ler `.cursor/rules/typescript-code-generation.mdc`
   - Parse princípios:
     * Type Everything Explicitly
     * Keep Functions Small
     * Modern Syntax
     * Error Handling
   - Extrair DOs e DON'Ts
   - Carregar Examples (Good vs Bad)

### Fase 2: Gerar Código

1. **Aplicar Princípios**:
   - Para cada função gerada:
     * ✅ Adicionar types explícitos (params + return)
     * ✅ Validar tamanho < 50 linhas
     * ✅ Usar async/await (não callbacks)
     * ✅ Adicionar error handling
   
2. **Validar contra Rule**:
   - Verificar compliance:
     * Nenhum `any` usado
     * Todas functions tipadas
     * Error handling presente
     * Syntax moderno

### Fase 3: Validar Output

1. **Checklist de Compliance**:
   ```markdown
   Rule Compliance Check:
   - [ ] Todos os tipos explícitos
   - [ ] Nenhuma função > 50 linhas
   - [ ] async/await usado
   - [ ] Error handling presente
   - [ ] File naming correto
   ```

2. **Se Non-Compliance Detectado**:
   - Reportar violação específica
   - Referência à rule
   - Sugerir correção

## Princípios Operacionais

### Restrições

- SEMPRE carregar `.cursor/rules/typescript-code-generation.mdc`
- SEMPRE validar compliance antes de finalizar
- SEMPRE usar tipos explícitos
- NUNCA gerar código que viola a rule
- NUNCA usar `any` sem justificativa documentada
```

---

## Example 2: Rule para Command de Research

### Cenário

Command `/research.deep` precisa garantir:

- ✅ Referências citadas corretamente
- ✅ Síntese acadêmicamente rigorosa
- ✅ Metadata completa
- ✅ Sources confiáveis

---

### Passo 1: Criar Rule

```
/maker.rule "Academic research standards para research commands"
```

#### Output: `.cursor/rules/research-academic-standards.mdc`

```markdown
# Research: Academic Standards

## Principle

Pesquisas DEVEM seguir rigor acadêmico: sources confiáveis, citações corretas, síntese objetiva e metadata completa.

## Guidance

### DO

- **Source Selection**:
  - Priorizar: Academic journals, .edu, .gov, known authorities
  - Verificar data de publicação (preferir últimos 5 anos)
  - Cross-reference informações (mínimo 3 sources)
  
- **Citation Format**:
  - Incluir: Author, Title, Year, URL
  - Usar formato consistente (APA-like)
  - Citar diretamente quando quoting
  
- **Synthesis**:
  - Objetivo e imparcial
  - Múltiplas perspectivas
  - Evidence-based (não opinião)
  - Distinguir facts de interpretations
  
- **Metadata**:
  - Timestamp de research
  - Query original
  - Profundidade (simple/deep/expert)
  - Total de referências
  - Score médio de relevância

### DON'T

- ❌ Usar sources não verificáveis
- ❌ Omitir citações
- ❌ Síntese opinativa ou tendenciosa
- ❌ Misturar facts com interpretações
- ❌ Metadata incompleta

## Examples

### ✅ Good Citation

```markdown
## References

[1] Smith, J. (2023). "Modern AI Research Methods". *Journal of AI Research*, 45(2). 
    Retrieved from https://example.edu/papers/ai-methods
    Score: 92/100 (Recent, Academic, High Citations)

[2] Johnson, M. et al. (2024). "Deep Learning Applications". *Nature AI*, 12(1).
    Retrieved from https://nature.com/articles/ai-2024
    Score: 95/100 (Recent, High Authority, Peer-Reviewed)
```

### ❌ Bad Citation

```markdown
## References

- Some blog post about AI
- Article I found on Google
```

**Problemas**:
- ❌ Sem author, data, URL
- ❌ Sources não verificáveis
- ❌ Sem score de relevância

### ✅ Good Synthesis

```markdown
## Synthesis

Multiple studies [1, 2, 3] demonstrate that deep learning models perform 
significantly better on image classification tasks when trained with 
augmented datasets. Smith (2023) found a 15% accuracy improvement, while 
Johnson et al. (2024) reported 18% gains. However, Wang (2023) notes 
that computational costs increase proportionally.

**Key Finding**: Data augmentation improves accuracy but increases training time.
**Evidence**: Consistent across 3 independent studies.
**Caveat**: Trade-off between accuracy and compute cost.
```

### ❌ Bad Synthesis

```markdown
## Synthesis

I think deep learning is really cool and everyone should use data augmentation 
because it makes models better. Some guy said it works great.
```

**Problemas**:
- ❌ Opinativo ("I think", "really cool")
- ❌ Sem citações
- ❌ Sem evidence quantitativa
- ❌ Informal

## Rationale

Academic rigor garante:
- Reprodutibilidade (outros podem verificar)
- Credibilidade (sources confiáveis)
- Objetividade (facts, não opiniões)
- Rastreabilidade (metadata completa)

## Enforcement

### Automated

- Source validator: Verificar .edu/.gov/known authorities
- Citation parser: Validar formato
- Metadata checker: Campos obrigatórios presentes

### Manual

- Peer review: Verificar síntese objetiva
- Source audit: Validar qualidade das fontes

## References

- [APA Citation Style](https://apastyle.apa.org/)
- [Academic Writing Guide](https://writing.wisc.edu/handbook/)
```

---

### Passo 2: Integrar no Command

#### Command: `research.deep.md`

```markdown
## Fluxo de Execução

### Fase 1: Carregar Standards

1. **Carregar Rule de Research**:
   - Ler `.cursor/rules/research-academic-standards.mdc`
   - Parse requirements:
     * Source selection criteria
     * Citation format
     * Synthesis standards
     * Metadata obrigatória

### Fase 2: Buscar Referências

1. **Aplicar Filtros de Source**:
   ```javascript
   const sources = searchResults.filter(result => {
     // Aplicar rule: Priorizar .edu, .gov, authorities
     const domain = new URL(result.url).hostname;
     const isAcademic = domain.endsWith('.edu') || domain.endsWith('.gov');
     const isKnownAuthority = KNOWN_AUTHORITIES.includes(domain);
     const isRecent = result.year >= (currentYear - 5);
     
     return isAcademic || isKnownAuthority || isRecent;
   });
   ```

2. **Cross-Reference**:
   - Verificar informação em >= 3 sources
   - Preferir consensus

### Fase 3: Formatar Citações

1. **Aplicar Citation Format da Rule**:
   ```javascript
   function formatCitation(ref, index) {
     // Rule: Author, Title, Year, URL, Score
     return `[${index + 1}] ${ref.author} (${ref.year}). "${ref.title}". ` +
            `*${ref.publication}*. Retrieved from ${ref.url}\n` +
            `    Score: ${ref.score}/100 (${ref.scoreReason})`;
   }
   ```

### Fase 4: Gerar Síntese

1. **Validar Objetividade**:
   - Evitar: "I think", "should", "obviously"
   - Usar: "Studies show", "Evidence indicates", "Research demonstrates"
   - Sempre citar sources [1, 2, 3]

2. **Separar Facts de Interpretations**:
   ```markdown
   **Fact**: Study X found Y result [1].
   **Interpretation**: This suggests Z may occur under A conditions.
   ```

### Fase 5: Adicionar Metadata

1. **Compliance com Rule**:
   ```javascript
   const metadata = {
     timestamp: new Date().toISOString(),
     query: originalQuery,
     depth: 'deep',
     totalReferences: references.length,
     averageScore: calculateAvgScore(references),
     sourceTypes: categorizeSourceTypes(references)
   };
   ```

### Fase 6: Validar Compliance

1. **Checklist**:
   ```markdown
   Rule Compliance Check:
   - [ ] Sources são .edu/.gov/authorities
   - [ ] Mínimo 3 sources
   - [ ] Citations com formato correto
   - [ ] Síntese objetiva (sem opinião)
   - [ ] Metadata completa
   ```

2. **Se Non-Compliance**:
   - Identificar violação
   - Corrigir antes de finalizar
```

---

## Example 3: Rule Geral para Todos Commands

### Cenário

Quer garantir que TODOS commands sigam padrões gerais:

- ✅ Markdown válido
- ✅ Frontmatter presente
- ✅ Seção "Contexto" ao final
- ✅ Checklist de qualidade
- ✅ Examples incluídos

---

### Passo 1: Criar Rule Geral

```
/maker.rule "General command structure standards"
```

#### Output: `.cursor/rules/commands.mdc`

```markdown
# Commands: Structure Standards

## Principle

TODOS commands DEVEM seguir estrutura universal definida em `template.commands.md`.

## Guidance

### DO

- **Frontmatter YAML**:
  ```yaml
  ---
  description: Uma linha clara do que o command faz
  ---
  ```

- **User Input Section** (obrigatória):
  ```markdown
  ## Entrada do Usuário
  
  ```text
  $ARGUMENTS
  ```
  
  Você **DEVE** considerar a entrada do usuário antes de prosseguir.
  ```

- **Goal Section** (completa):
  - O que o command faz (2-3 parágrafos)
  - Quando usar
  - Pré-requisitos

- **Execution Workflow** (fases numeradas):
  - Fase 1: Validar
  - Fase 2-N: Processar
  - Fase N+1: Reportar

- **Examples** (mínimo Good + Error):
  - Input bom → Output esperado
  - Input com erro → Tratamento

- **Context Section** (ao final):
  ```markdown
  ## Contexto
  
  $ARGUMENTS
  ```

- **Quality Checklist** (validação final):
  ```markdown
  ## Checklist de Qualidade
  
  - [ ] Input validado
  - [ ] Outputs gerados
  - [ ] Erros tratados
  ```

### DON'T

- ❌ Omitir frontmatter
- ❌ Omitir seção Context
- ❌ Omitir examples
- ❌ Usar estrutura diferente do template

## Enforcement

Ao usar `/maker.command`:

1. DEVE carregar `template.commands.md`
2. DEVE usar template como ÚNICA referência
3. DEVE validar todas seções obrigatórias presentes
4. DEVE remover placeholders não usados

## References

- Template Universal: `vibes/structure/templates/template.commands.md`
- Framework QUEST: `maker.command.md`
```

---

### Passo 2: Aplicar em Todos Makers

```markdown
# Todos makers (maker.command, maker.rule, etc)

## Fase: Solidify with Templates

1. **Carregar Rule de Commands**:
   - Ler `.cursor/rules/commands.mdc`
   - Validar compliance com template universal

2. **Validar Estrutura**:
   - [ ] Frontmatter presente
   - [ ] User Input section
   - [ ] Goal completo
   - [ ] Execution Workflow
   - [ ] Examples
   - [ ] Context section
   - [ ] Quality Checklist
```

---

## 🎓 Padrões de Integração

### Padrão 1: Rule Específica por Command

**Exemplo**: `typescript-code-generation.mdc` → `maker.typescript`

```
.cursor/rules/typescript-code-generation.mdc
       ↓ (loaded by)
maker.typescript.md
       ↓ (applies)
Generated TypeScript code ✅
```

### Padrão 2: Rule Geral para Categoria

**Exemplo**: `research-academic-standards.mdc` → `research.*`

```
.cursor/rules/research-academic-standards.mdc
       ↓ (loaded by)
research.deep.md
research.simple.md
research.expert.md
       ↓ (all apply)
Academic-quality research ✅
```

### Padrão 3: Rule Universal para Todos

**Exemplo**: `commands.mdc` → ALL commands

```
.cursor/rules/commands.mdc
       ↓ (loaded by)
maker.command.md (enforces structure)
       ↓ (generates)
ANY command with consistent structure ✅
```

---

## 📚 Checklist de Criação de Rules

### Estrutura

- [ ] Seção **Principle** (o QUE e POR QUÊ)
- [ ] Seção **Guidance** (DO e DON'T)
- [ ] Seção **Examples** (Good e Bad com code)
- [ ] Seção **Rationale** (justificativa)
- [ ] Seção **Enforcement** (como validar)
- [ ] Seção **References** (links oficiais)

### Qualidade

- [ ] Declarativa (não imperativa)
- [ ] Testável (objetivamente verificável)
- [ ] Específica (não vaga)
- [ ] Consistente com constitution
- [ ] Examples são code real (não pseudo)

### Integração

- [ ] Command referencia rule
- [ ] Command carrega rule
- [ ] Command valida compliance
- [ ] Command reporta violações

---

## 🚀 Próximos Examples

- **Example 1**: `maker-command-search.md` - Criar commands
- **Example 2**: `maker-script-integration.md` - Integrar scripts

---

**Dica**: Rules garantem consistência. Crie rules para padrões que DEVEM ser seguidos, não apenas sugestões!

