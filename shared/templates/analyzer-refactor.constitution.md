# Analyzer Refactor Constitution

## Core Principles

### I. Contexto Sobre Mudança

**Entender antes de mudar**

Refatoração DEVE ser precedida por compreensão profunda do código existente. Mudanças sem contexto levam a regressões, bugs sutis e perda de conhecimento implícito.

**Regras**:
- SEMPRE ler e entender o propósito do código antes de sugerir mudanças
- SEMPRE identificar o domínio e caso de uso antes de refatorar
- SEMPRE considerar o histórico e razões para decisões anteriores
- SEMPRE validar que refatoração não quebra comportamento existente
- NUNCA assumir que código "feio" está errado sem investigar
- NUNCA refatorar sem entender testes existentes
- NUNCA ignorar comentários que explicam decisões de design

**Racional**: Código legado muitas vezes contém lógica de negócio crítica e edge cases importantes. Refatoração sem contexto destroi conhecimento acumulado.

### II. Níveis de Intensidade Progressivos

**Refatoração em camadas incrementais**

Mudanças DEVEM ser propostas em três níveis de intensidade crescente, permitindo escolha baseada em risco, esforço e retorno.

**Regras**:

**Nível Básico (Organização)**:
- APENAS mudanças que NÃO alteram lógica
- Foco em legibilidade: nomenclatura, formatação, estrutura de arquivo
- Conservador e de baixo risco
- Executável por qualquer desenvolvedor
- Exemplos: renomear variáveis, extrair constantes, reorganizar imports

**Nível Médio (Patterns e Boas Práticas)**:
- Introdução de design patterns consolidados
- Eliminação de code smells conhecidos
- Aplicação de princípios DRY, KISS, YAGNI
- Requer conhecimento de patterns
- Risco moderado, benefício significativo
- Exemplos: Strategy Pattern, Repository Pattern, extrair métodos duplicados

**Nível Avançado (SOLID e Excelência)**:
- Aplicação rigorosa de princípios SOLID
- Otimização algorítmica (complexidade O(n²) → O(n))
- Arquitetura limpa e desacoplada
- Clean Code em nível avançado
- Requer expertise técnica
- Alto esforço, máximo benefício de longo prazo
- Exemplos: separar responsabilidades (SRP), inversão de dependências, algoritmos eficientes

**Racional**: Nem todo código precisa do mesmo nível de refatoração. Níveis permitem balancear risco, esforço e retorno de forma pragmática.

### III. Justificação Técnica Obrigatória

**Toda sugestão DEVE ser fundamentada**

Refatorações DEVEM incluir justificativa técnica sólida explicando POR QUÊ a mudança melhora o código, não apenas O QUÊ mudar.

**Regras**:
- SEMPRE explicar o problema específico que a refatoração resolve
- SEMPRE citar princípios, patterns ou boas práticas aplicados
- SEMPRE documentar benefícios concretos (manutenibilidade, performance, testabilidade)
- SEMPRE incluir trade-offs (prós e contras) para níveis médio e avançado
- SEMPRE estimar esforço de implementação
- SEMPRE fornecer código antes/depois com contexto suficiente
- NUNCA sugerir mudanças "porque sim" ou "porque é melhor"
- NUNCA omitir justificativas técnicas

**Racional**: Justificações permitem que desenvolvedores aprendam princípios, tomem decisões informadas e entendam o valor da refatoração.

### IV. Código Antes/Depois Sempre

**Mostrar, não apenas dizer**

Sugestões DEVEM incluir código original e código refatorado lado a lado com contexto suficiente para compreensão.

**Regras**:
- SEMPRE incluir snippet do código atual com linhas de contexto
- SEMPRE incluir código refatorado completo e funcional
- SEMPRE referenciar arquivo e linha específica
- SEMPRE preservar contexto (imports, dependências relacionadas)
- SEMPRE usar syntax highlighting apropriado
- NUNCA usar pseudocódigo vago
- NUNCA omitir partes críticas do código
- NUNCA assumir que leitor inferirá mudanças

**Racional**: Desenvolvedores precisam ver exatamente o que mudar e como implementar. Abstrações vagas não são acionáveis.

### V. Priorização por Impacto vs Esforço

**Maximizar retorno sobre investimento**

Sugestões DEVEM ser priorizadas usando matriz de impacto (benefício) vs esforço (custo), destacando quick wins.

**Regras**:
- SEMPRE calcular prioridade: `priority = (severity × impact) / effort`
- SEMPRE identificar quick wins (baixo esforço, alto impacto)
- SEMPRE ordenar sugestões por prioridade calculada
- SEMPRE estimar esforço realista: LOW (<2h), MEDIUM (2-8h), HIGH (>8h)
- SEMPRE avaliar impacto em: manutenibilidade, performance, testabilidade, escalabilidade
- NUNCA priorizar arbitrariamente sem cálculo
- NUNCA omitir estimativas de esforço

**Racional**: Tempo de desenvolvimento é limitado. Priorização permite maximizar valor entregue com recursos disponíveis.

### VI. Princípios SOLID no Centro

**SOLID como guia de excelência**

Análise avançada DEVE avaliar rigorosamente os cinco princípios SOLID e propor soluções que os respeitem.

**Regras**:

**S - Single Responsibility Principle**:
- Classe/função DEVE ter uma única razão para mudar
- Identificar violações: classes com múltiplas responsabilidades
- Sugerir: separação em classes/módulos coesos

**O - Open/Closed Principle**:
- Código DEVE ser aberto para extensão, fechado para modificação
- Identificar: switches/ifs que crescem com novos casos
- Sugerir: polimorfismo, strategy pattern, plugins

**L - Liskov Substitution Principle**:
- Subtipos DEVEM ser substituíveis por tipos base sem quebrar código
- Identificar: subclasses que violam contratos da classe base
- Sugerir: redesign de hierarquia ou composição

**I - Interface Segregation Principle**:
- Clientes NÃO DEVEM depender de interfaces que não usam
- Identificar: interfaces "gordas" com muitos métodos
- Sugerir: separação em interfaces menores e coesas

**D - Dependency Inversion Principle**:
- Depender de abstrações, NÃO de implementações concretas
- Identificar: acoplamento direto a classes concretas
- Sugerir: injeção de dependências, interfaces, abstração

**Racional**: SOLID representa décadas de conhecimento destilado. Código que respeita SOLID é manutenível, testável e escalável.

### VII. Algoritmos Eficientes São Obrigatórios

**Performance por design, não por acaso**

Análise avançada DEVE identificar algoritmos ineficientes e propor soluções com melhor complexidade assintótica.

**Regras**:
- SEMPRE analisar complexidade: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)
- SEMPRE identificar loops aninhados (candidatos a O(n²))
- SEMPRE considerar estruturas de dados mais eficientes:
  * Array para acesso indexado O(1)
  * Hash Map/Set para lookup O(1)
  * Tree para dados ordenados O(log n)
  * Heap para prioridades O(log n)
- SEMPRE sugerir algoritmos consolidados quando aplicável:
  * Binary search em vez de linear search
  * Hash map em vez de loops aninhados
  * Memoization/DP para recursão com subproblemas repetidos
  * Two pointers para problemas de arrays
- NUNCA aceitar O(n²) quando O(n) é possível
- NUNCA ignorar performance em código crítico
- NUNCA otimizar prematuramente (balancear legibilidade e performance)

**Racional**: Algoritmos ineficientes causam problemas de escalabilidade. Complexidade importa mais que micro-otimizações.

### VIII. Clean Code Não É Opcional

**Código limpo é código profissional**

Análise avançada DEVE aplicar rigorosamente princípios de Clean Code de Uncle Bob.

**Regras**:

**Funções**:
- Pequenas (< 20 linhas idealmente)
- Fazem uma coisa só
- Nível de abstração consistente
- Sem side effects ocultos
- Nomes revelam intenção

**Classes**:
- Coesas (relacionadas ao mesmo propósito)
- Baixo acoplamento (poucas dependências externas)
- Encapsulamento adequado

**Nomenclatura**:
- Nomes revelam intenção: `calculateUserAge()` não `calc()`
- Nomes pronunciáveis e buscáveis
- Sem prefixos húngaros ou codificações

**Comentários**:
- Código DEVE ser auto-explicativo
- Comentários explicam "por que", não "o que"
- Sem código comentado (usar Git)
- Sem comentários óbvios ou redundantes

**Error Handling**:
- Usar exceções, não códigos de erro
- Contextualizar exceções
- Não retornar null (usar Optional/Maybe)

**Racional**: Clean Code reduz débito técnico, facilita onboarding e permite evolução sustentável do sistema.

## Análise e Diagnóstico

### Code Smells a Identificar

**Long Method**: Funções > 50 linhas → Extrair métodos
**Large Class**: Classes > 500 linhas → Separar responsabilidades
**Long Parameter List**: > 5 parâmetros → Objetos de configuração
**Duplicated Code**: Blocos repetidos → DRY
**Dead Code**: Código não usado → Remover
**Speculative Generality**: Código "por precaução" → YAGNI
**Feature Envy**: Método usa mais dados de outra classe → Mover método
**Data Clumps**: Grupos de dados sempre juntos → Criar objeto
**Primitive Obsession**: Excesso de primitivos → Value objects
**Switch Statements**: Switches grandes → Polimorfismo

### Design Patterns Aplicáveis

Identificar oportunidades para patterns consolidados:

- **Strategy**: Múltiplos algoritmos intercambiáveis
- **Factory**: Criação complexa de objetos
- **Observer**: Notificações de mudanças
- **Decorator**: Adicionar comportamento dinamicamente
- **Repository**: Abstração de dados
- **Dependency Injection**: Inversão de controle
- **Builder**: Construção passo-a-passo
- **Command**: Encapsular operações
- **Template Method**: Algoritmo com passos customizáveis
- **Adapter**: Integrar interfaces incompatíveis

### Métricas de Qualidade

Avaliar código usando métricas objetivas:

- **Complexidade Ciclomática**: < 10 por função (idealmente < 5)
- **Profundidade de Aninhamento**: < 4 níveis
- **Acoplamento (Coupling)**: Baixo (poucas dependências)
- **Coesão (Cohesion)**: Alta (responsabilidades relacionadas)
- **Cobertura de Testes**: > 80% (crítico > 95%)
- **Duplicação**: < 5% do código

## Boas Práticas de Sugestão

### Estrutura de Sugestão

Toda sugestão DEVE seguir formato consistente:

```markdown
### [ID]: [Título Descritivo]

**Severidade**: [Low|Medium|High]
**Categoria**: [Organization|Code Smell|Design|Architecture|Performance|SOLID]
**Localização**: [file]:[line] ou [file]:[line-range]

**Código Atual**:
```[lang]
[código original com contexto]
```

**Problema**: [Descrição clara do problema]

**Solução Proposta**: [Descrição da solução]

**Código Refatorado**:
```[lang]
[código refatorado completo]
```

**Justificativa Técnica**:
- [Por que esta mudança?]
- [Que princípio/pattern aplica?]
- [Referências]

**Benefícios**:
- [Benefício 1]
- [Benefício 2]

**Trade-offs** (Médio/Avançado):
- Prós: [...]
- Contras: [...]

**Esforço Estimado**: [Low|Medium|High]
```

### Níveis de Severidade

- **Low**: Não afeta funcionalidade, apenas legibilidade
- **Medium**: Afeta manutenibilidade, pode causar bugs futuros
- **High**: Afeta performance, segurança ou viola princípios críticos

### Estimativa de Esforço

- **Low**: < 2 horas (renomear, extrair constante, reorganizar)
- **Medium**: 2-8 horas (aplicar pattern, extrair classes, refatorar módulo)
- **High**: > 8 horas (redesign arquitetural, migração algoritmos, separação camadas)

## Restrições e Limitações

### Quando NÃO Refatorar

- Código que funciona em produção sem problemas e não será modificado
- Sistemas legados sem testes (criar testes primeiro)
- Código que será descontinuado em breve
- Refatoração cosmética sem benefício tangível

### Refatoração Segura

- SEMPRE ter testes antes de refatorar (ou criar testes primeiro)
- SEMPRE refatorar em passos pequenos e incrementais
- SEMPRE executar testes após cada passo
- SEMPRE fazer commit após cada refatoração bem-sucedida
- SEMPRE usar ferramentas de refatoração automática quando disponíveis (IDE)

### Exceções aos Princípios

Princípios são guias, não dogmas. Exceções justificadas são aceitáveis:

- Performance crítica pode justificar código mais complexo
- Código temporário (prototypes) pode ser mais pragmático
- Integração com APIs legadas pode violar princípios
- Mas SEMPRE documentar exceções e justificativas

## Governança

Esta constitution é a **fonte autoritativa** para análise de refatoração.

**Hierarquia de Autoridade**:
1. Constitution (este arquivo) - Mais alta
2. Language-specific rules (vibes/rules/development/languages/)
3. Project-specific conventions
4. Preferências individuais - Mais baixa

**Processo de Emenda**:
- Constitution pode evoluir baseada em aprendizados
- Emendas devem ser documentadas com justificativa
- Mudanças devem manter espírito dos princípios core

**Exceções**:
- Exceções aos princípios podem ser feitas quando bem justificadas
- Justificativa DEVE ser documentada em comentário de código
- Exceções recorrentes devem levar a revisão de princípios

---

**Version**: 1.0.0
**Ratified**: 2025-10-16
**Last Amended**: 2025-10-16
**Project**: Vibe-Driven Development Kit - Analyzer Refactor
**Maintainer**: Sistema de Commands .cursor

