---
description: Gerar prompts de alta qualidade adaptados ao contexto e necessidades específicas
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Gerar e salvar prompts de excelência para IA (Gemini, Claude, ChatGPT) que sejam claros, específicos, contextualizados e acionáveis. Este command analisa a solicitação do usuário, busca contexto relevante do projeto, identifica gaps de informação e gera prompts estruturados que maximizam a qualidade das respostas da IA.

O command é genérico e adapta-se a qualquer tipo de tarefa: geração de código, análise, planejamento, documentação, refatoração, debugging, etc. Utiliza template embutido flexível que se ajusta ao contexto, gerando prompts únicos completos e detalhados ou estruturados em seções conforme necessário. Os prompts gerados são salvos automaticamente em `.cursor/commands/` com nomenclatura padronizada `[domain].[feature].prompt.md` para reutilização futura.

**Quando usar**: Sempre que precisar de um prompt de alta qualidade para IA, especialmente para tarefas complexas, quando precisar de contexto específico do projeto, ou quando a solicitação inicial for vaga e precisar ser refinada.

**Pré-requisitos**: 
- Solicitação ou descrição da tarefa (texto ou path para arquivo)
- Projeto existente (para contexto)
- Template de prompt embutido (gerenciado pelo command)
- Diretório `.cursor/commands/` existente

## Descoberta & Validação

Para inputs complexos ou vagos, você **DEVE** questionar o usuário:

### Informações Obrigatórias

1. **Tipo de Tarefa**: O que você quer que a IA faça?
   - Se vazio: ERRO - Perguntar "Qual tarefa você quer que eu transforme em prompt?"
   - Se texto: Usar como base para análise
   - Se path: Carregar arquivo como contexto adicional

2. **Formato do Prompt**: Como você prefere o prompt gerado?
   - Padrão: Automático (completo e detalhado OU estruturado em seções)
   - Opções: Completo | Estruturado | Ambos
   - Se não claro: Questionar usuário

3. **Contexto Necessário**: Que contexto do projeto incluir?
   - Padrão: Arquivos relacionados + Documentação existente
   - Opções: Mínimo | Médio | Completo
   - Se não especificado: Usar padrão

### Preferências Opcionais

1. **Nível de Detalhe**: Quanto detalhamento no prompt?
   - Padrão: Alto (máxima qualidade)
   - Opções: Médio | Alto | Muito Alto

2. **Exemplos**: Incluir exemplos de output esperado?
   - Padrão: Sim (se relevante)
   - Opções: Sim | Não | Apenas se complexo

3. **Restrições**: Há restrições ou guidelines específicas?
   - Padrão: Nenhuma
   - Se mencionado: Incluir em seção de Constraints

## Fluxo de Execução

### Fase 1: Analisar Entrada

1. **Parsear Solicitação**:
   - SE entrada vazia: ERRO - Perguntar tarefa
   - SE entrada é path: Carregar arquivo + usar como contexto
   - SE entrada é texto: Usar como descrição da tarefa
   - SE entrada contém múltiplas linhas: Parsear para extrair componentes

2. **Identificar Tipo de Tarefa**:
   - Classificar em categorias:
     * Criação (código, docs, specs, tests)
     * Análise (code review, performance, security)
     * Refatoração (melhorias, otimizações)
     * Debugging (identificar e corrigir bugs)
     * Planejamento (arquitetura, design, roadmap)
     * Documentação (explicar, documentar)
     * Transformação (converter, migrar)
     * Validação (testar, verificar)
     * Outro

3. **Extrair Elementos-Chave**:
   - Objetivo principal
   - Entidades/componentes envolvidos
   - Requisitos explícitos
   - Restrições mencionadas
   - Output esperado (se claro)
   - Contexto adicional necessário

### Fase 2: Buscar Contexto

1. **Identificar Arquivos Relacionados**:
   - Analisar solicitação para identificar:
     * Tecnologias mencionadas (React, Node, Python, etc)
     * Componentes/arquivos específicos
     * Domínios/áreas do projeto
   
   - Buscar arquivos relevantes:
     ```bash
     # Exemplos de busca contextual
     # Se menciona "component": buscar .tsx, .jsx, .vue
     # Se menciona "API": buscar routes, controllers, handlers
     # Se menciona "test": buscar .test.js, .spec.ts
     ```

2. **Carregar Documentação Existente**:
   - README.md (se existir)
   - Documentação em docs/
   - Arquivos de configuração relevantes
   - Comentários em arquivos relacionados
   - Regras/guidelines do projeto

3. **Analisar Padrões do Projeto**:
   - Convenções de nomenclatura
   - Estrutura de diretórios
   - Arquitetura utilizada
   - Stack tecnológico
   - Estilo de código (se aplicável)

4. **Identificar Dependências e Relacionamentos**:
   - Componentes que interagem
   - APIs/serviços utilizados
   - Bibliotecas/frameworks
   - Integrações externas

### Fase 3: Avaliar Complexidade

1. **Determinar Nível de Complexidade**:
   - **Simples**: Tarefa única, bem definida, contexto mínimo necessário
   - **Média**: Múltiplas etapas, algum contexto necessário, interações entre componentes
   - **Complexa**: Tarefa ambígua, múltiplos componentes, contexto extenso, decisões necessárias

2. **Decidir Necessidade de Questionamento**:
   - **Simples**: Prosseguir diretamente
   - **Média**: Prosseguir, mas validar entendimento
   - **Complexa**: Questionar usuário antes de gerar prompt

3. **Se Complexa, Questionar**:
   - Apresente 2-3 perguntas específicas:
     * "Qual é o objetivo específico que você quer alcançar?"
     * "Há restrições técnicas ou de design que devo considerar?"
     * "Qual formato de output você espera?"
   - Aguarde respostas antes de prosseguir

### Fase 4: Escolher Formato do Prompt

1. **Avaliar Formato Ideal**:
   - **Completo e Detalhado**: Para tarefas específicas, bem definidas
   - **Estruturado em Seções**: Para tarefas complexas, múltiplos requisitos
   - **Ambos**: Para máxima flexibilidade

2. **Se Usuário Não Especificou**:
   - Inferir do tipo de tarefa:
     * Criação simples → Completo
     * Análise/Planejamento → Estruturado
     * Tarefa ambígua → Estruturado
   - Validar com usuário se não óbvio

### Fase 5: Gerar Prompt

1. **Usar Template Embutido**:
   - Carregar template de prompt genérico (embutido abaixo)
   - Adaptar estrutura conforme tipo de tarefa
   - Preencher todas as seções relevantes

2. **Construir Seção de Contexto**:
   - **Background**: Contexto do projeto e situação atual
   - **Current State**: Estado atual relevante
   - **Relevant Files**: Arquivos relacionados (com caminhos e resumos)
   - **Dependencies**: Bibliotecas, frameworks, APIs utilizadas
   - **Conventions**: Padrões e convenções do projeto

3. **Construir Seção de Objetivo**:
   - **Primary Goal**: Objetivo principal (1-2 frases)
   - **Specific Task**: Tarefa específica a ser executada
   - **Expected Outcome**: Resultado esperado
   - **Success Criteria**: Critérios de sucesso

4. **Construir Seção de Requisitos**:
   - **Functional Requirements**: O que deve fazer
   - **Non-Functional Requirements**: Performance, segurança, UX
   - **Constraints**: Restrições técnicas, de design, de tempo
   - **Dependencies**: O que depende de outros componentes

5. **Construir Seção de Instruções**:
   - **Step-by-Step Guidance**: Passos a seguir (se aplicável)
   - **Key Considerations**: Pontos importantes a considerar
   - **Best Practices**: Boas práticas a aplicar
   - **Common Pitfalls**: Erros comuns a evitar

6. **Construir Seção de Output**:
   - **Format**: Formato de output esperado
   - **Structure**: Estrutura do resultado
   - **Examples**: Exemplos de output (se útil)
   - **Validation**: Como validar se está correto

7. **Adicionar Seções Opcionais**:
   - **Examples** (se tarefa complexa ou ambígua)
   - **Edge Cases** (se relevante)
   - **Testing** (se geração de código)
   - **Documentation** (se aplicável)

### Fase 6: Validar Prompt Gerado

1. **Checklist de Qualidade**:
   - [ ] Contexto suficiente para IA entender
   - [ ] Objetivo claro e específico
   - [ ] Requisitos completos e não-ambíguos
   - [ ] Instruções acionáveis
   - [ ] Output esperado bem definido
   - [ ] Sem ambiguidades ou vaguidão
   - [ ] Exemplos quando útil
   - [ ] Restrições explícitas
   - [ ] Critérios de sucesso mensuráveis

2. **Verificar Clareza**:
   - Prompt é compreensível sem contexto adicional?
   - IA consegue executar tarefa sem perguntas?
   - Há instruções suficientes para evitar erros comuns?

3. **Verificar Completude**:
   - Todas as informações necessárias presentes?
   - Contexto relevante incluído?
   - Nenhum detalhe crítico faltando?

4. **Verificar Especificidade**:
   - Prompt é específico o suficiente?
   - Evita generalidades vagas?
   - Inclui detalhes técnicos quando necessário?

### Fase 7: Gerar Nome do Arquivo e Salvar Prompt

1. **Gerar Nome do Arquivo**:
   - Extrair `domain` do tipo de tarefa:
     * Criação → `maker`
     * Análise → `analyzer`
     * Refatoração → `refactor`
     * Debugging → `debug`
     * Planejamento → `planner`
     * Documentação → `docs`
     * Transformação → `transform`
     * Validação → `validator`
     * Outro → `general`
   
   - Extrair `feature` do objetivo principal:
     * Remover palavras comuns (criar, fazer, implementar, etc)
     * Extrair palavras-chave principais
     * Converter para kebab-case
     * Máximo 30 caracteres
     * Descritivo e único
   
   - Formato final: `[domain].[feature].prompt.md`
   
   - Exemplos:
     ```
     "Criar componente de formulário de login" → maker.login-form.prompt.md
     "Analisar performance da API" → analyzer.api-performance.prompt.md
     "Refatorar sistema de autenticação" → refactor.auth-system.prompt.md
     "Debuggar erro de conexão" → debug.connection-error.prompt.md
     ```

2. **Validar Unicidade do Nome**:
   - Verificar se arquivo já existe:
     ```bash
     ls .cursor/commands/ | grep "[domain].[feature].prompt.md"
     ```
   - Se existir:
     * Adicionar sufixo numérico: `[domain].[feature].prompt-v2.md`
     * OU perguntar ao usuário se sobrescrever

3. **Salvar Prompt com Metadados**:
   - Criar arquivo em: `.cursor/commands/[domain].[feature].prompt.md`
   - Formato do arquivo:
     ```markdown
     ---
     description: [DESCRIÇÃO_BREVE_DO_PROMPT]
     type: [TIPO_DE_TAREFA]
     domain: [DOMAIN]
     feature: [FEATURE]
     created: [TIMESTAMP_ISO_8601]
     ---
     
     # [NOME_DO_PROMPT]
     
     **Tipo de Tarefa**: [CATEGORIA]
     **Formato**: [COMPLETO|ESTRUTURADO|AMBOS]
     **Complexidade**: [SIMPLES|MÉDIA|COMPLEXA]
     **Contexto**: [RESUMO_DO_CONTEXTO]
     
     ---
     
     ## Prompt para IA
     
     [PROMPT_GERADO_AQUI]
     
     ---
     
     ## Metadados Adicionais
     
     ### Arquivos Relacionados
     - [Lista de arquivos com caminhos]
     
     ### Dependências
     - [Lista de dependências]
     
     ### Padrões do Projeto
     - [Lista de padrões aplicados]
     
     ---
     
     ## Como Usar
     
     1. Copie o prompt acima
     2. Cole na IA (Gemini, Claude, ChatGPT)
     3. Ajuste se necessário
     4. Execute a tarefa
     
     ## Validação
     
     - [ ] Prompt validado com checklist de qualidade
     - [ ] Contexto suficiente incluído
     - [ ] Objetivo claro e específico
     - [ ] Critérios de sucesso definidos
     ```
   
   - Encoding: UTF-8
   - Validar que arquivo foi criado

4. **Apresentar Resultado**:
   ```markdown
   ## ✅ Prompt Gerado e Salvo com Sucesso
   
   **Arquivo**: `.cursor/commands/[domain].[feature].prompt.md`
   **Tipo de Tarefa**: [CATEGORIA]
   **Formato**: [COMPLETO|ESTRUTURADO|AMBOS]
   **Complexidade**: [SIMPLES|MÉDIA|COMPLEXA]
   
   ### Prompt para IA:
   
   [PROMPT_GERADO_AQUI]
   
   ### Contexto Incluído:
   
   - Arquivos relacionados: [N] arquivos
   - Documentação: [SIM|NÃO]
   - Padrões do projeto: [SIM|NÃO]
   - Exemplos: [SIM|NÃO]
   
   ### Arquivo Salvo:
   
   📄 `.cursor/commands/[domain].[feature].prompt.md`
   
   **Metadados**:
   - Descrição: [DESCRIÇÃO]
   - Tipo: [TIPO]
   - Domain: [DOMAIN]
   - Feature: [FEATURE]
   - Criado: [TIMESTAMP]
   
   ### Como Usar:
   
   **Opção 1: Usar arquivo salvo**
   ```bash
   # Copiar conteúdo do arquivo
   cat .cursor/commands/[domain].[feature].prompt.md
   ```
   
   **Opção 2: Usar diretamente**
   1. Copie o prompt acima
   2. Cole na IA (Gemini, Claude, ChatGPT)
   3. Ajuste se necessário
   4. Execute a tarefa
   
   ### Próximos Passos:
   
   - [ ] Validar prompt com IA
   - [ ] Ajustar se necessário (editar arquivo salvo)
   - [ ] Executar tarefa
   - [ ] Validar resultado
   - [ ] Reutilizar prompt salvo para tarefas similares
   
   ### Comando para Editar:
   
   ```bash
   # Editar prompt salvo
   code .cursor/commands/[domain].[feature].prompt.md
   # ou
   vim .cursor/commands/[domain].[feature].prompt.md
   ```
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Especificidade**: Prompts DEVEM ser específicos e não-vagos
- **Contextualização**: Contexto relevante DEVE ser incluído
- **Clareza**: Objetivo e requisitos DEVEM ser imediatamente compreensíveis
- **Completude**: Todas as informações necessárias DEVEM estar presentes
- **Acionabilidade**: Instruções DEVEM ser executáveis sem ambiguidade
- **Testabilidade**: Critérios de sucesso DEVEM ser verificáveis

### Tratamento de Erros

- **Se entrada vazia**: ERRO - Perguntar tarefa e AGUARDAR
- **Se entrada muito vaga**: Questionar com 2-3 perguntas específicas
- **Se arquivo não encontrado**: Avisar e prosseguir sem contexto do arquivo
- **Se contexto insuficiente**: Documentar limitação no prompt
- **Se formato não especificado**: Inferir do tipo de tarefa e validar

### Restrições

- SEMPRE salvar prompt em `.cursor/commands/[domain].[feature].prompt.md`
- SEMPRE gerar nome do arquivo seguindo padrão `[domain].[feature].prompt.md`
- SEMPRE incluir metadados no arquivo (description, type, domain, feature, created)
- SEMPRE validar unicidade do nome antes de salvar
- SEMPRE incluir contexto relevante do projeto
- SEMPRE validar prompt com checklist de qualidade
- SEMPRE questionar para inputs complexos ou vagos
- SEMPRE incluir critérios de sucesso
- SEMPRE evitar ambiguidade
- SEMPRE incluir exemplos quando útil
- NUNCA gerar prompts genéricos sem contexto
- NUNCA omitir informações críticas
- NUNCA assumir conhecimento que IA não tem
- NUNCA usar linguagem vaga ou ambígua
- NUNCA sobrescrever arquivo existente sem confirmação do usuário

## Template de Prompt Embutido

### Template Genérico de Prompt

```markdown
## Contexto

### Background
[Contexto do projeto, situação atual, domínio]

### Current State
[Estado atual relevante para a tarefa]

### Relevant Files
[Lista de arquivos relacionados com caminhos e resumos breves]

### Dependencies
[Bibliotecas, frameworks, APIs utilizadas]

### Conventions
[Padrões e convenções do projeto a seguir]

---

## Objetivo

### Primary Goal
[Objetivo principal em 1-2 frases]

### Specific Task
[Tarefa específica a ser executada]

### Expected Outcome
[Resultado esperado]

### Success Criteria
[Critérios de sucesso mensuráveis]

---

## Requisitos

### Functional Requirements
- [Requisito funcional 1]
- [Requisito funcional 2]
- [Requisito funcional 3]

### Non-Functional Requirements
- [Requisito não-funcional 1]
- [Requisito não-funcional 2]

### Constraints
- [Restrição 1]
- [Restrição 2]

### Dependencies
- [Dependência 1]
- [Dependência 2]

---

## Instruções

### Step-by-Step Guidance
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

### Key Considerations
- [Consideração importante 1]
- [Consideração importante 2]

### Best Practices
- [Boas práticas 1]
- [Boas práticas 2]

### Common Pitfalls
- [Erro comum 1]
- [Erro comum 2]

---

## Output

### Format
[Formato de output esperado]

### Structure
[Estrutura do resultado]

### Examples
[Exemplos de output esperado]

### Validation
[Como validar se está correto]

---

## Exemplos

[Exemplos adicionais se tarefa complexa]

---

## Edge Cases

[Casos extremos a considerar]

---

## Testing

[Como testar se geração de código]

---

## Documentation

[Documentação necessária]
```

## Exemplos

### Exemplo 1: Geração de Componente React

```
Input: "Criar componente de formulário de login com validação"

Output:
✅ Prompt Gerado e Salvo com Sucesso

Arquivo: .cursor/commands/maker.login-form.prompt.md
Tipo de Tarefa: Criação (Componente React)
Formato: Estruturado
Complexidade: Média

### Prompt para IA:

## Contexto

### Background
Projeto React com TypeScript, usando React Hook Form para formulários e Zod para validação de schemas.

### Current State
- Sistema de autenticação já implementado
- API de login disponível em `/api/auth/login`
- Componentes de UI base já existem (Button, Input, Card)

### Relevant Files
- `src/components/Button.tsx` - Botão base reutilizável
- `src/components/Input.tsx` - Input base reutilizável
- `src/api/auth.ts` - Função `loginUser(email, password)`
- `src/schemas/auth.schema.ts` - Schemas Zod para validação

### Dependencies
- React 18.2.0
- TypeScript 5.0.0
- React Hook Form 7.45.0
- Zod 3.22.0
- Tailwind CSS 3.3.0

### Conventions
- Componentes em PascalCase
- Props tipadas com TypeScript
- Styling com Tailwind CSS
- Validação com Zod schemas

---

## Objetivo

### Primary Goal
Criar componente de formulário de login funcional com validação de campos e integração com API.

### Specific Task
Implementar componente `LoginForm.tsx` que:
1. Renderiza campos de email e senha
2. Valida inputs com Zod schema
3. Exibe erros de validação
4. Chama API de login ao submeter
5. Gerencia estados de loading e erro

### Expected Outcome
Componente funcional, tipado, validado e pronto para uso.

### Success Criteria
- ✅ Campos validados corretamente
- ✅ Erros exibidos claramente
- ✅ Loading state durante submissão
- ✅ Erro de API tratado
- ✅ TypeScript sem erros
- ✅ Estilizado com Tailwind

---

## Requisitos

### Functional Requirements
- Formulário com campos: email (obrigatório, formato válido) e senha (obrigatório, min 6 chars)
- Validação em tempo real (onChange) e ao submeter
- Mensagens de erro claras e específicas
- Botão de submit desabilitado durante loading
- Chamada à função `loginUser` ao submeter

### Non-Functional Requirements
- Performance: Renderização otimizada
- Acessibilidade: Labels, aria-labels, navegação por teclado
- UX: Feedback visual de loading e erros

### Constraints
- Usar componentes base existentes (Button, Input)
- Seguir convenções de nomenclatura do projeto
- Não adicionar novas dependências
- TypeScript strict mode

### Dependencies
- `loginUser` de `src/api/auth.ts`
- `loginSchema` de `src/schemas/auth.schema.ts`
- Componentes base de `src/components/`

---

## Instruções

### Step-by-Step Guidance
1. Importar dependências necessárias (React Hook Form, Zod, componentes base)
2. Definir tipo de props do componente
3. Configurar React Hook Form com resolver Zod
4. Implementar campos de formulário (email, senha)
5. Adicionar validação e exibição de erros
6. Implementar função de submit com chamada à API
7. Adicionar estados de loading e erro
8. Estilizar com Tailwind CSS

### Key Considerations
- Usar `useForm` do React Hook Form
- Integrar Zod com `@hookform/resolvers/zod`
- Tratar erros de API adequadamente
- Acessibilidade: usar `<label>` e `aria-invalid`

### Best Practices
- Validação declarativa com Zod
- Estados de loading e erro claros
- Componente reutilizável e testável
- Código limpo e bem organizado

### Common Pitfalls
- Não validar formato de email
- Esquecer de desabilitar botão durante loading
- Não tratar erros de API
- Mensagens de erro vagas

---

## Output

### Format
Arquivo TypeScript React Component: `src/components/LoginForm.tsx`

### Structure
```typescript
// Imports
// Types
// Component
// Export
```

### Examples
```typescript
// Exemplo de uso esperado
<LoginForm onSuccess={(user) => console.log(user)} />
```

### Validation
- TypeScript compila sem erros
- Formulário valida corretamente
- API é chamada com dados corretos
- Erros são tratados adequadamente
```

### Contexto Incluído:
- Arquivos relacionados: 4 arquivos
- Documentação: Não
- Padrões do projeto: Sim
- Exemplos: Sim

### Arquivo Salvo:

📄 `.cursor/commands/maker.login-form.prompt.md`

**Metadados**:
- Descrição: Criar componente de formulário de login com validação
- Tipo: Criação (Componente React)
- Domain: maker
- Feature: login-form
- Criado: 2025-01-15T14:30:00Z

### Como Usar:

**Opção 1: Usar arquivo salvo**
```bash
# Copiar conteúdo do arquivo
cat .cursor/commands/maker.login-form.prompt.md
```

**Opção 2: Usar diretamente**
1. Copie o prompt acima
2. Cole na IA (Gemini, Claude, ChatGPT)
3. Ajuste se necessário
4. Execute a tarefa

### Próximos Passos:

- [ ] Validar prompt com IA
- [ ] Ajustar se necessário (editar arquivo salvo)
- [ ] Implementar componente
- [ ] Testar validação e integração
- [ ] Reutilizar prompt salvo para tarefas similares

### Comando para Editar:

```bash
# Editar prompt salvo
code .cursor/commands/maker.login-form.prompt.md
# ou
vim .cursor/commands/maker.login-form.prompt.md
```
```

### Exemplo 2: Análise de Performance

```
Input: "Analisar performance da API de busca de produtos"

Output:
✅ Prompt Gerado e Salvo com Sucesso

Arquivo: .cursor/commands/analyzer.api-performance.prompt.md
Tipo de Tarefa: Análise (Performance)
Formato: Estruturado
Complexidade: Complexa

### Prompt para IA:

## Contexto

### Background
API REST em Node.js/Express que busca produtos de e-commerce. Sistema em produção com 10k+ produtos no banco de dados PostgreSQL.

### Current State
- Endpoint: `GET /api/products/search?q={query}`
- Query faz full-text search em tabela products
- Média de latência: 800ms (alvo: <200ms)
- Pico de requisições: 100 req/s

### Relevant Files
- `src/routes/products.routes.js` - Rotas de produtos
- `src/controllers/products.controller.js` - Controller de busca
- `src/models/Product.js` - Model de produto
- `src/middleware/performance.js` - Middleware de métricas

### Dependencies
- Node.js 18.x
- Express 4.18.x
- PostgreSQL 14.x
- Sequelize ORM 6.x

### Conventions
- Logs estruturados com Winston
- Métricas com Prometheus
- Código em JavaScript (sem TypeScript)

---

## Objetivo

### Primary Goal
Identificar gargalos de performance na API de busca de produtos e propor otimizações para reduzir latência de 800ms para <200ms.

### Specific Task
Analisar endpoint de busca considerando:
1. Eficiência de queries SQL
2. Uso de índices
3. Cache
4. Estrutura de dados
5. Algoritmo de busca

### Expected Outcome
Relatório de análise com:
- Gargalos identificados
- Métricas de performance
- Recomendações priorizadas
- Estimativa de impacto

### Success Criteria
- ✅ Gargalos claramente identificados
- ✅ Métricas coletadas e analisadas
- ✅ Recomendações acionáveis
- ✅ Priorização baseada em impacto
- ✅ Estimativa de melhoria de latência

---

## Requisitos

### Functional Requirements
- Analisar query SQL atual
- Verificar uso de índices
- Avaliar estratégias de cache
- Identificar N+1 queries
- Analisar plano de execução

### Non-Functional Requirements
- Análise não deve impactar produção
- Relatório em 24 horas
- Recomendações implementáveis

### Constraints
- Não pode alterar estrutura de dados existente (sem breaking changes)
- Orçamento limitado (priorizar otimizações de baixo custo)
- Manter compatibilidade com clientes atuais

### Dependencies
- Acesso a logs de produção
- Métricas de Prometheus
- Schema do banco de dados

---

## Instruções

### Step-by-Step Guidance
1. Analisar query SQL atual e EXPLAIN ANALYZE
2. Verificar índices existentes e eficiência
3. Identificar queries N+1 ou ineficientes
4. Avaliar estratégias de cache (Redis)
5. Analisar volume de dados e crescimento
6. Propor otimizações priorizadas
7. Estimar impacto de cada otimização

### Key Considerations
- Full-text search pode ser otimizado com GIN indexes
- Cache pode reduzir latência drasticamente
- Paginação pode melhorar UX
- Connection pooling pode ser limitante

### Best Practices
- Começar com otimizações de baixo custo
- Medir antes e depois de mudanças
- Considerar trade-offs (consistência vs performance)
- Documentar decisões

### Common Pitfalls
- Over-indexing (muitos índices)
- Cache invalidation complexa
- Otimização prematura
- Ignorar N+1 queries

---

## Output

### Format
Relatório Markdown: `performance-analysis-products-search.md`

### Structure
```markdown
# Análise de Performance: API de Busca de Produtos

## Resumo Executivo
[TL;DR com principais findings e recomendações]

## Métricas Atuais
[Latência, throughput, recursos]

## Gargalos Identificados
[Lista de problemas com evidências]

## Recomendações
[Otimizações priorizadas com estimativa de impacto]

## Plano de Implementação
[Roadmap de implementação]

## Anexos
[Queries, logs, métricas detalhadas]
```

### Examples
[Exemplos de queries otimizadas, configuração de cache, etc]

### Validation
- Relatório completo e acionável
- Métricas verificáveis
- Recomendações priorizadas
- Estimativas realistas
```

### Contexto Incluído:
- Arquivos relacionados: 4 arquivos
- Documentação: Não
- Padrões do projeto: Sim
- Exemplos: Sim

### Arquivo Salvo:

📄 `.cursor/commands/analyzer.api-performance.prompt.md`

**Metadados**:
- Descrição: Analisar performance da API de busca de produtos
- Tipo: Análise (Performance)
- Domain: analyzer
- Feature: api-performance
- Criado: 2025-01-15T14:35:00Z

### Como Usar:

**Opção 1: Usar arquivo salvo**
```bash
# Copiar conteúdo do arquivo
cat .cursor/commands/analyzer.api-performance.prompt.md
```

**Opção 2: Usar diretamente**
1. Copie o prompt acima
2. Cole na IA (Gemini, Claude, ChatGPT)
3. Ajuste se necessário
4. Execute a análise

### Próximos Passos:

- [ ] Validar prompt com IA
- [ ] Ajustar se necessário (editar arquivo salvo)
- [ ] Executar análise
- [ ] Revisar relatório gerado
- [ ] Implementar otimizações
- [ ] Reutilizar prompt salvo para análises similares

### Comando para Editar:

```bash
# Editar prompt salvo
code .cursor/commands/analyzer.api-performance.prompt.md
# ou
vim .cursor/commands/analyzer.api-performance.prompt.md
```
```

### Exemplo 3: Input Vago → Questionamento

```
Input: "Preciso de ajuda com autenticação"

Output:
Antes de gerar o prompt, preciso entender melhor sua necessidade:

1. **O que você quer fazer com autenticação?**
   - [ ] Implementar sistema de autenticação do zero
   - [ ] Adicionar novo método de auth (OAuth, 2FA, etc)
   - [ ] Refatorar autenticação existente
   - [ ] Debuggar problema de autenticação
   - [ ] Melhorar segurança de autenticação
   - [ ] Outro: _______

2. **Qual é o contexto do seu projeto?**
   - [ ] Novo projeto (não tem auth ainda)
   - [ ] Projeto existente com auth básica
   - [ ] Projeto existente com auth complexa
   - [ ] Não tenho certeza

3. **Que tipo de autenticação você precisa?**
   - [ ] Email/senha simples
   - [ ] OAuth (Google, GitHub, etc)
   - [ ] JWT tokens
   - [ ] Session-based
   - [ ] 2FA/MFA
   - [ ] Outro: _______

Por favor, forneça essas informações para eu gerar um prompt preciso e útil.
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar o prompt completo, verifique:

### Análise
- [ ] Tipo de tarefa identificado corretamente
- [ ] Elementos-chave extraídos
- [ ] Complexidade avaliada
- [ ] Questionamento feito se necessário

### Contexto
- [ ] Arquivos relacionados identificados
- [ ] Documentação carregada (se existir)
- [ ] Padrões do projeto analisados
- [ ] Dependências mapeadas

### Prompt Gerado
- [ ] Contexto suficiente incluído
- [ ] Objetivo claro e específico
- [ ] Requisitos completos
- [ ] Instruções acionáveis
- [ ] Output esperado bem definido
- [ ] Exemplos quando útil
- [ ] Restrições explícitas
- [ ] Critérios de sucesso mensuráveis

### Qualidade
- [ ] Sem ambiguidade
- [ ] Linguagem clara e precisa
- [ ] Estrutura lógica
- [ ] Informações verificáveis
- [ ] Pronto para uso direto

### Apresentação
- [ ] Formato claro
- [ ] Contexto incluído documentado
- [ ] Como usar explicado
- [ ] Próximos passos sugeridos

