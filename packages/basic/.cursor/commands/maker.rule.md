---
description: Gera rules especializadas para .cursor/rules/ baseadas em boas práticas, stack tecnológico e princípios do projeto.
---

A entrada do usuário pode ser fornecida diretamente pelo agente ou como argumento do comando - você **DEVE** considerá-la antes de prosseguir com o prompt (se não estiver vazia).

Entrada do usuário:

$ARGUMENTS

Objetivo: Criar rules (regras) de alta qualidade para orientar AI agents no Cursor, baseadas em análise do projeto, stack tecnológico, arquitetura detectada e princípios estabelecidos na constitution. Rules geradas devem ser específicas, testáveis e aplicáveis ao contexto do projeto.

Este comando é ideal quando:
- Projeto precisa de rules customizadas para tech stack específico
- Constitution estabelece princípios que precisam de rules detalhadas
- Padrões de código precisam ser codificados para AI
- Onboarding de AI agents em projeto existente
- Migração ou evolução de arquitetura

OPERAÇÃO DE ESCRITA: Este comando cria arquivos `.mdc` em `.cursor/rules/`

Autoridade: Rules geradas devem estar alinhadas com constitution (se existir). Constitution prevalece sobre rules em caso de conflito.

Etapas de execução:

1. **Análise do Contexto do Projeto**:
   - Detecte stack tecnológico:
     * package.json → JavaScript/TypeScript + frameworks
     * pubspec.yaml → Flutter/Dart
     * requirements.txt / pyproject.toml → Python
     * go.mod → Go
     * Cargo.toml → Rust
     * pom.xml / build.gradle → Java
   
   - Detecte arquitetura (heurística):
     * Estrutura de pastas sugere pattern?
     * Clean Architecture: `domain/`, `data/`, `presentation/`
     * MVC: `models/`, `views/`, `controllers/`
     * Feature-first: `features/*/`
     * Layered: `api/`, `business/`, `data/`
   
   - Identifique frameworks e libraries principais:
     * React, Vue, Angular (frontend)
     * Flutter, React Native (mobile)
     * Express, FastAPI, Django (backend)
     * BLoC, Redux, MobX (state management)
   
   - Detecte stage do projeto:
     * Early: < 1000 LOC, estrutura simples
     * Growth: 1000-10000 LOC, arquitetura emergindo
     * Mature: > 10000 LOC, patterns consolidados

2. **Carregamento de Constitution e Princípios**:
   - Carregue `vibes/configs/constitution.md` (se existir)
     * Parse princípios estabelecidos
     * Identifique valores e prioridades
     * Extraia constraints arquiteturais
     * Note padrões de governança
   
   - Carregue rules existentes de `.cursor/rules/`:
     * Liste todas rules atuais
     * Identifique categorias (naming, architecture, testing, etc.)
     * Note gaps de coverage
     * Evite duplicação

3. **Definição de Necessidade de Rules**:
   - Parse entrada do usuário ($ARGUMENTS):
     * Rule específica pedida? (ex: "rule para naming conventions")
     * Categoria geral? (ex: "rules para Flutter")
     * Baseado em problema? (ex: "AI está gerando código inconsistente")
   
   - SE entrada vazia ou vaga:
     * Recomende rules baseado em análise:
       - Stack detectado → rules para esse stack
       - Arquitetura detectada → rules de organização
       - Constitution → rules que implementam princípios
     * Apresente opções ao usuário:
       ```
       Detectei: Flutter + BLoC + Clean Architecture
       
       Rules recomendadas:
       1. flutter-folder-structure (organização de features)
       2. bloc-naming-conventions (padrões de BLoC)
       3. clean-arch-dependencies (regras de camadas)
       4. dart-code-style (conventions Dart)
       
       Gerar: [todas / escolher números / customizar]
       ```

4. **Geração de Rule Baseada em Best Practices**:
   - Para cada rule a gerar:
     
     **A. Pesquise best practices**:
     - Busque guidelines oficiais:
       * Flutter: flutter.dev/docs/development/ui/layout
       * React: react.dev/learn/thinking-in-react
       * Python: PEP 8, PEP 257
       * TypeScript: typescript-eslint
     
     - Identifique padrões comuns:
       * Naming conventions
       * File organization
       * Code structure
       * Testing patterns
       * Documentation standards
     
     **B. Estruture rule em seções**:
     ```markdown
     # [Category]: [Rule Name]
     
     ## Principle
     [Qual princípio ou valor essa rule implementa]
     
     ## Guidance
     [Instruções específicas para AI]
     
     ### DO (Fazer)
     - [Padrão correto 1]
     - [Padrão correto 2]
     
     ### DON'T (Não Fazer)
     - [Anti-pattern 1]
     - [Anti-pattern 2]
     
     ## Examples
     
     ### ✅ Good
     ```[language]
     [exemplo de código correto]
     ```
     
     ### ❌ Bad
     ```[language]
     [exemplo de código incorreto]
     ```
     
     ## Rationale
     [Por que essa rule existe, contexto, tradeoffs]
     
     ## Enforcement
     [Como validar: linter, code review, CI/CD]
     
     ## References
     - [Link para doc oficial]
     - [Link para discussion]
     ```
     
     **C. Customize para contexto**:
     - Adapte examples ao domain do projeto
     - Referencie constitution se aplicável
     - Adicione project-specific constraints
     - Inclua exceptions se necessário

5. **Categorização e Organização**:
   - Determine categoria da rule:
     * `architecture/` - Padrões arquiteturais
     * `naming/` - Convenções de nomenclatura
     * `testing/` - Padrões de testes
     * `documentation/` - Regras de documentação
     * `security/` - Práticas de segurança
     * `performance/` - Otimizações e benchmarks
     * `accessibility/` - A11y guidelines
     * `[framework]/` - Rules específicas do framework
   
   - Determine escopo da rule:
     * Global: `.cursor/rules/[category]/[name].mdc`
     * Scoped: `[directory]/.cursor/rules/[name].mdc`
   
   - Nomeie arquivo:
     * Formato: `[scope]-[aspect].mdc`
     * Exemplo: `flutter-widget-structure.mdc`
     * Exemplo: `react-hooks-patterns.mdc`
     * Kebab-case, descritivo, único

6. **Validação de Qualidade da Rule**:
   - Checklist de qualidade:
     * ✅ Princípio claro e fundamentado
     * ✅ Guidance específica (não vaga)
     * ✅ Examples concretos (código real)
     * ✅ DO e DON'T bem definidos
     * ✅ Rationale explica o "por quê"
     * ✅ Testável/verificável objetivamente
     * ✅ Alinhada com constitution
     * ✅ Sem ambiguidades
     * ✅ Actionable para AI agent
     * ✅ Mantível e evoluível
   
   - Validações técnicas:
     * Markdown válido
     * Code blocks com syntax highlighting correto
     * Links funcionais
     * Placeholders resolvidos
     * Formatação consistente

7. **Escrita da Rule**:
   - Crie arquivo em `.cursor/rules/[category]/[name].mdc`
   - Use caminhos absolutos
   - Preserve formatação e estrutura
   - Valide escrita bem-sucedida

8. **Integração e Documentação**:
   - Atualize index de rules (se existir):
     * `.cursor/rules/README.md`
     * Adicione entrada na tabela/lista
     * Inclua categoria, propósito, quando usar
   
   - Verifique consistência:
     * Nova rule conflita com existentes?
     * Complementa ou duplica?
     * Integra bem no conjunto?
   
   - Sugira rules complementares:
     * Baseado em pattern detectado
     * Gaps de coverage ainda existentes

9. **Testing da Rule (Opcional mas Recomendado)**:
   - Sugira teste de validação:
     ```
     Para testar rule [name]:
     1. Invoque AI agent (Cursor chat ou inline)
     2. Peça para gerar código relevante
     3. Verifique se AI seguiu rule
     4. Se não: Refine guidance ou examples
     ```
   
   - Identifique métricas de sucesso:
     * Compliance rate (% de vezes que AI segue)
     * Clarity (devs entendem facilmente?)
     * Maintainability (fácil de atualizar?)

10. **Reporte de Conclusão**:
    
    ```markdown
    ## ✅ Rule(s) Gerada(s) com Sucesso
    
    ### Contexto Detectado
    - Stack: [linguagens e frameworks]
    - Arquitetura: [pattern detectado]
    - Stage: [early/growth/mature]
    - Constitution: [existe / não existe]
    
    ### Rule Criada
    - **Nome**: [category]/[name].mdc
    - **Caminho**: `.cursor/rules/[category]/[name].mdc`
    - **Categoria**: [category]
    - **Propósito**: [resumo de 1 linha]
    - **Baseada em**: [official docs / best practices / constitution]
    
    ### Estrutura da Rule
    - Princípio: ✅
    - Guidance (DO/DON'T): ✅
    - Examples (Good/Bad): ✅
    - Rationale: ✅
    - Enforcement: ✅
    
    ### Validações
    - ✅ Alinhada com constitution
    - ✅ Não conflita com rules existentes
    - ✅ Testável e específica
    - ✅ Examples são concretos
    - ✅ Markdown válido
    
    ### Rules Complementares Sugeridas
    1. [rule-name-1] - [motivo]
    2. [rule-name-2] - [motivo]
    
    ### Como Testar
    [Instruções de teste específicas]
    
    ### Próximos Passos
    1. Testar rule com AI agent
    2. Refinar based on compliance
    3. Gerar rules complementares (se aplicável)
    4. Atualizar constitution se necessário
    
    ### Mensagem de Commit
    ```
    feat: add [category]/[name] rule
    
    - [Descrição da rule]
    - Based on [official docs / best practices]
    - Covers [aspecto coberto]
    ```
    ```

Regras de comportamento específicas:

- SEMPRE analise projeto antes de gerar rule genérica
- SEMPRE base rules em official docs quando disponível
- SEMPRE inclua examples concretos (código real, não pseudo)
- SEMPRE valide alignment com constitution
- SEMPRE use linguagem declarativa (MUST, SHOULD, MAY)
- SEMPRE torne rules testáveis e objetivas
- SEMPRE explique rationale (o "por quê")
- SEMPRE sugira enforcement mechanism
- NUNCA crie rules vagas ou subjetivas
- NUNCA duplique rules existentes
- NUNCA crie rules que conflitam com constitution
- NUNCA use examples genéricos ou triviais
- NUNCA omita DO e DON'T
- NUNCA deixe guidance ambígua
- SE rule for controversa, documente tradeoffs
- SE múltiplas approaches válidas, liste options
- SE rule aplicar apenas a subset do projeto, use scoped rule
- SE constitution não existir, considere invocar /constitution primeiro

Tipos de rules suportados:

**1. Naming Conventions**:
- File naming
- Variable naming
- Function naming
- Class naming
- Component naming

**2. Code Structure**:
- File organization
- Module structure
- Component composition
- Layer boundaries (Clean Arch, etc.)

**3. Testing Patterns**:
- Test file organization
- Test naming
- Coverage requirements
- Mocking strategies

**4. Documentation**:
- Code comments (when and how)
- API documentation
- README standards
- Inline documentation

**5. Security**:
- Authentication patterns
- Authorization rules
- Data validation
- Secrets management

**6. Performance**:
- Optimization guidelines
- Caching strategies
- Lazy loading patterns
- Bundle size limits

**7. Accessibility**:
- WCAG compliance
- Semantic HTML
- ARIA attributes
- Keyboard navigation

**8. Framework-Specific**:
- React hooks patterns
- Flutter widget composition
- Django views organization
- FastAPI route structure

Heurísticas de geração:

**Para rules de naming**:
- Seja específico (não "use camelCase", mas "functions MUST use camelCase, classes MUST use PascalCase")
- Dê examples de cada caso
- Explique exceptions

**Para rules de architecture**:
- Diagrams em ASCII art se útil
- Dependency direction clara (A → B, nunca B → A)
- Import rules específicas

**Para rules de testing**:
- Coverage thresholds numéricos
- What to test (não just "test everything")
- Test file location and naming

**Para rules de documentation**:
- When to document (public APIs, complex logic)
- When NOT to document (self-explanatory code)
- Format and structure

Contexto: $ARGUMENTS

