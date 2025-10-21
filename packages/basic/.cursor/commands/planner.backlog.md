---
description: Transformar ideias de projetos em especificações de backlog detalhadas com quebra de features, análise de tradeoffs e caminhos de implementação
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Transformar ideias de projetos de software em especificações de backlog detalhadas, quebrando-as em features menores, explorando caminhos de implementação, analisando tradeoffs e possibilidades técnicas para facilitar a execução do projeto. Este command cria backlogs estruturados que servem como base para planejamento e implementação.

A análise produzida decompõe projetos em features incrementais, identifica dependências, estima complexidade, analisa riscos técnicos e fornece caminhos alternativos de implementação com justificativas. O backlog gerado é executável, priorizado e fundamentado em análise técnica.

**Quando usar**: Quando você tem uma ideia de projeto não estruturada e precisa transformá-la em um backlog executável com análise técnica, estimativas de complexidade e priorização de features.

**Pré-requisitos**: Ideia ou descrição do projeto (em texto ou arquivo markdown). Nenhum outro pré-requisito técnico necessário.

## Descoberta & Validação

Antes de gerar o backlog, você **DEVE** questionar o usuário para esclarecer:

### Informações Obrigatórias

1. **Fonte da Ideia**: Como você está fornecendo a ideia?
   - Se arquivo: Validar que existe e carregar conteúdo
   - Se texto direto: Usar como descrição
   - Se vazio: ERRO - Perguntar "Qual ideia de projeto você quer especificar?"

2. **Escopo Desejado**: Quanto detalhe você precisa?
   - Padrão: Completo (MVP + enhancements + advanced)
   - Opções: MVP apenas | Completo | Exploratório
   - Se estimativa MVP > 1 dia: Alertar e sugerir cortes

3. **Contexto Técnico**: Há stack ou tecnologias já definidas?
   - Se não fornecido: Inferir ou sugerir com justificativa
   - Se fornecido: Validar viabilidade e sugerir alternativas

### Preferências Opcionais

1. **Framework de Priorização**: Qual framework usar?
   - Padrão: Value/Effort (Priority Score = Value / Effort)
   - Opções: MoSCoW | RICE | Value/Effort

2. **Profundidade de Análise**: Quanto detalhe de tradeoffs?
   - Padrão: Completa (pelo menos 3 tradeoffs)
   - Opções: Rápida (1-2 tradeoffs) | Completa (3+) | Profunda (5+)

3. **Nível de Granularidade de Tasks**: MVP deve ter tasks?
   - Padrão: Sim (gerar tasks para features MVP)
   - Opções: Sim | Não (só features)

## Fluxo de Execução

### Fase 1: Validar Entrada

1. **Validar Fonte**:
   - SE entrada contiver caminho de arquivo:
     * Validar que arquivo existe
     * Carregar conteúdo completo
     * Identificar se é uma única ideia ou lista de ideias
   - SE entrada for texto direto:
     * Usar como descrição da ideia
   - SE entrada estiver vazia:
     * Perguntar: "Qual ideia de projeto você quer especificar?"
     * Aguardar resposta antes de continuar

2. **Parse de Configurações**:
   - Extrair preferências de escopo, framework, profundidade
   - Aplicar defaults sensatos se não fornecidos

### Fase 2: Analisar Ideia

1. **Extrair Informações-Chave**:
   - Nome/título do projeto
   - Descrição geral (o que é)
   - Problema que resolve
   - Usuário/público-alvo
   - Features mencionadas (explícitas ou implícitas)
   - Stack tecnológica sugerida (se houver)
   - Complexidade aparente

2. **Identificar Gaps de Informação**:
   - Quais aspectos não estão claros?
   - Que premissas precisam ser feitas?
   - Que decisões técnicas estão em aberto?
   - SE gaps críticos: Fazer perguntas específicas (max 3)

### Fase 3: Decompor em Features

1. **Identificar Features**:
   - Decomponha projeto em features independentes e incrementais
   - Para cada feature, defina:
     * Nome descritivo
     * Descrição técnica
     * Valor entregue ao usuário
     * Dependências (outras features necessárias antes)
     * Complexidade técnica (Simple/Medium/Complex)
     * Estimativa de esforço (horas)

2. **Organizar por Camadas**:
   - **MVP (Minimum Viable Product)**: Features essenciais para o core
   - **Enhancement**: Features que melhoram a experiência
   - **Advanced**: Features avançadas ou experimentais
   - **Nice-to-have**: Features opcionais

3. **Validar Incrementalidade**:
   - Verificar que features não são monolíticas
   - Garantir que cada feature entrega valor individual
   - Ajustar granularidade se necessário

### Fase 4: Analisar Caminhos Técnicos

1. **Identificar Decisões Técnicas**:
   - Para cada caminho técnico identificado:
     * Opção A: Nome do caminho
       - Tecnologias envolvidas
       - Prós
       - Contras
       - Esforço estimado
       - Quando escolher
     * Opção B: Nome alternativo
       - Tecnologias envolvidas
       - Prós
       - Contras
       - Esforço estimado
       - Quando escolher

2. **Decisões Típicas**:
   - Frontend: React vs Vue vs Vanilla
   - Backend: BaaS (Firebase/Supabase) vs API própria
   - State: Context vs Redux vs Zustand
   - Styling: CSS puro vs Tailwind vs styled-components
   - Database: SQLite vs PostgreSQL vs NoSQL

3. **Validar Análise**:
   - Pelo menos 2 caminhos alternativos analisados
   - Cada caminho tem prós E contras
   - Recomendação baseada no contexto do projeto

### Fase 5: Analisar Tradeoffs e Riscos

1. **Identificar Tradeoffs Principais**:
   - **Escopo vs Tempo**: O que cortar para entregar mais rápido?
   - **Qualidade vs Velocidade**: Onde aceitar "good enough"?
   - **Flexibilidade vs Simplicidade**: Código genérico ou específico?
   - **Features vs Performance**: Quais features pesam mais?
   
   Para cada tradeoff:
   - Contexto do tradeoff
   - Opção A vs Opção B
   - Recomendação baseada no contexto
   - Impacto de cada escolha

2. **Identificar Riscos Técnicos**:
   - Dependências externas (APIs, libs, services)
   - Complexidade algorítmica
   - Performance concerns
   - Compatibilidade (browsers, devices)
   - Segurança e privacidade
   - Escala e limites
   
   Para cada risco:
   - Probabilidade (Low/Medium/High)
   - Impacto (Low/Medium/High)
   - Estratégia de mitigação
   - Plano B se risco se materializar

### Fase 6: Priorizar Features

1. **Aplicar Framework de Priorização**:
   - Para cada feature, calcular:
     * Value score (1-10): Quanto valor entrega?
     * Effort score (1-10): Quanto esforço requer?
     * Priority score: Value / Effort

2. **Ordenar e Organizar**:
   - Ordenar features por priority score
   - Criar roadmap sugerido com fases:
     * Fase 1: MVP (Day 1)
     * Fase 2: Enhancement (se houver tempo)
     * Fase 3: Advanced (futuro)

3. **Validar MVP**:
   - Verificar que MVP é executável em 1 dia
   - SE estimativa > 1 dia: Alertar e sugerir cortes
   - Garantir que MVP entrega valor real

### Fase 7: Gerar Tasks Executáveis (MVP)

1. **Quebrar Features MVP em Tasks**:
   - Para cada feature do MVP:
     * Setup inicial
     * Implementação core
     * UI/UX
     * Integração
     * Testing
     * Deploy

2. **Estruturar Tasks**:
   - Cada task deve ter:
     * Título claro
     * Descrição técnica
     * Critério de conclusão
     * Dependências
     * Estimativa (minutos/horas)

### Fase 8: Gerar Especificação

1. **Carregar Template**:
   - Validar que `vibes/structure/templates/template-backlog-detalhado.md` existe
   - SE não existe: Usar estrutura padrão

2. **Preencher Template**:
   - Sumário executivo
   - Visão do produto
   - Features decompostas (MVP, Enhancement, Advanced)
   - Análise de caminhos técnicos
   - Análise de tradeoffs
   - Riscos e mitigações
   - Priorização e roadmap
   - Backlog de tasks (MVP)
   - Recomendações finais

3. **Salvar Arquivo**:
   - Gerar nome: `[nome-do-projeto]-backlog.md`
   - Caminho: `backlog/[nome-do-projeto]-backlog.md`
   - Encoding: UTF-8

### Fase 9: Validar Qualidade

1. **Verificar Completude**:
   - [ ] Pelo menos 3 features no MVP
   - [ ] Análise de pelo menos 2 caminhos técnicos alternativos
   - [ ] Pelo menos 3 tradeoffs documentados
   - [ ] Riscos identificados com mitigações
   - [ ] Tasks executáveis para começar

2. **Verificar Clareza**:
   - Desenvolvedor consegue começar a implementar?
   - Decisões técnicas estão justificadas?
   - Escopo está bem definido?
   - Priorização está clara?

3. **Verificar Realismo**:
   - Estimativas são baseadas em complexidade real?
   - MVP é executável em 1 dia (ou alerta foi dado)?
   - Dependencies estão identificadas?

### Fase 10: Reportar Conclusão

Apresente sumário da análise:

```markdown
✅ Backlog criado com sucesso!

**Projeto**: [NOME_DO_PROJETO]
**Arquivo**: backlog/[nome-projeto]-backlog.md

**Features Identificadas**:
- MVP: X features (executável em Y horas)
- Enhancement: X features
- Advanced: X features

**Caminhos Técnicos Analisados**: X opções
**Tradeoffs Documentados**: X análises
**Riscos Identificados**: X riscos (X high, X medium, X low)

**Estimativa Total MVP**: X horas

**Recomendação Técnica Principal**:
[Breve recomendação da stack/abordagem principal]

**Próximos Passos**:
1. Revisar backlog: cat backlog/[nome-projeto]-backlog.md
2. Escolher feature do MVP para especificar
3. Criar spec: /planner.specify [feature escolhida]
4. OU criar plano direto: /planner.project backlog/[nome-projeto]-backlog.md

**Mensagem de commit sugerida**:
```
feat: add detailed backlog for [project-name]

- MVP: X features (Y hours)
- Enhancement: X features
- Analyzed X technical paths
- Documented X tradeoffs
```
```

## Princípios Operacionais

### Padrões de Qualidade

- **Incrementalidade**: Features DEVEM ser incrementais, não monolíticas
- **Justificação**: Recomendações técnicas DEVEM ter prós E contras
- **Realismo**: Estimativas DEVEM ser baseadas em complexidade real
- **Priorização**: Features DEVEM ser priorizadas por valor/esforço
- **Completude**: Backlog DEVE ter pelo menos 3 features MVP, 2 caminhos técnicos, 3 tradeoffs
- **Clareza**: Backlog DEVE permitir que desenvolvedor comece imediatamente

### Tratamento de Erros

- **Se input vazio**: ERRO - Perguntar "Qual ideia de projeto você quer especificar?" e AGUARDAR
- **Se ideia muito vaga**: Fazer perguntas específicas (max 3) para clarificar
- **Se escopo muito grande**: Alertar e sugerir simplificação ou fases
- **Se stack não especificada**: Sugerir com justificativa baseada no projeto
- **Se estimativa MVP > 1 dia**: Alertar e sugerir cortes específicos
- **Se múltiplas ideias no arquivo**: Processar uma por vez (perguntar qual)

### Restrições

- SEMPRE decomponha em features incrementais (não monolíticas)
- SEMPRE forneça pelo menos 2 caminhos técnicos alternativos
- SEMPRE justifique recomendações técnicas com prós/contras
- SEMPRE estime complexidade baseada em experiência (seja realista)
- SEMPRE identifique dependências entre features
- SEMPRE priorize features por valor/esforço
- SEMPRE documente tradeoffs principais (mínimo 3)
- SEMPRE identifique riscos técnicos com mitigações
- SEMPRE gere tasks executáveis (não abstratas)
- SEMPRE mantenha escopo do MVP enxuto (executável em 1 dia se possível)
- NUNCA assuma requisitos não mencionados sem perguntar
- NUNCA recomende tecnologias que você não conhece bem
- NUNCA subestime complexidade técnica
- NUNCA inclua features "nice-to-have" no MVP
- NUNCA deixe decisões técnicas críticas em aberto

## Templates

### template-backlog-detalhado.md

**Propósito**: Estrutura padrão para backlogs gerados

**Localização**: `vibes/structure/templates/template-backlog-detalhado.md`

**Usado para**: Output do comando /planner.backlog

**Estrutura**:
- Sumário Executivo *(obrigatório)*
- Visão do Produto *(obrigatório)*
- Features Decompostas (MVP/Enhancement/Advanced) *(obrigatório)*
- Análise de Caminhos Técnicos *(obrigatório)*
- Análise de Tradeoffs *(obrigatório)*
- Riscos e Mitigações *(obrigatório)*
- Priorização e Roadmap *(obrigatório)*
- Backlog de Tasks (MVP) *(opcional - se granularidade solicitada)*
- Recomendações Finais *(obrigatório)*

## Exemplos

### Exemplo 1: Ideia Simples → Backlog Detalhado

```
Input: /planner.backlog "App de Pomodoro com sons ambiente"

Output:
✅ Backlog criado com sucesso!

**Projeto**: Pomodoro Ambient Soundscapes
**Arquivo**: backlog/pomodoro-ambient-backlog.md

**Features Identificadas**:
- MVP: 3 features (6 horas)
  * Timer funcional (25min/5min breaks)
  * Sound player (3-5 sons ambiente)
  * Settings básico (volume, timer presets)
- Enhancement: 2 features
  * Presets de sessão customizados
  * Estatísticas de produtividade
- Advanced: 2 features
  * Sincronização cross-device
  * Custom soundscapes (user upload)

**Caminhos Técnicos Analisados**: 3 opções
1. Frontend: React (recomendado - componentes prontos, leve)
2. Audio: Howler.js vs Web Audio API (Howler mais simples)
3. State: Context API (suficiente para MVP, sem overhead)

**Tradeoffs Documentados**: 4 análises
- React vs Vanilla JS (velocidade dev vs bundle size)
- Howler.js vs Web Audio API (simplicidade vs controle)
- Local storage vs Backend (MVP rápido vs sync cross-device)
- PWA vs Native (alcance vs performance)

**Riscos Identificados**: 3 riscos
- Audio playback issues em iOS Safari (Medium/High)
- Timer drift em background tabs (Low/Medium)
- Sound file size vs load time (Medium/Medium)

**Estimativa Total MVP**: 6 horas

**Recomendação Técnica Principal**:
React + Howler.js + Context API + Local Storage
Razão: MVP em 1 dia, stack simples, sem backend necessário

**Próximos Passos**:
1. cat backlog/pomodoro-ambient-backlog.md
2. /planner.specify "Timer funcional feature"
```

### Exemplo 2: Arquivo Markdown Existente

```
Input: /planner.backlog vibes/backlog/01-generative-art-gallery.md

Output:
✅ Backlog gerado de arquivo existente!

**Projeto**: Generative Art Gallery
**Arquivo**: backlog/generative-art-gallery-backlog.md

Arquivo original carregado: vibes/backlog/01-generative-art-gallery.md
Conceitos extraídos: 8 features mencionadas
Features organizadas:
- MVP: 4 features (1 dia)
- Enhancement: 3 features
- Advanced: 1 feature

Caminhos técnicos analisados: 3 opções
- Canvas Rendering: p5.js vs canvas-sketch vs Three.js
- State: Redux vs Zustand (recomendado Zustand - simpler)
- Export: Client-side vs Server-side rendering

**Próximos Passos**:
1. Revisar análise completa
2. /planner.specify backlog/generative-art-gallery-backlog.md
```

### Exemplo 3: Input Vago → Esclarecimento

```
Input: /planner.backlog "fazer um app legal"

Output:
⚠️ Input muito vago!

Antes de gerar o backlog, preciso entender melhor:

1. **Tipo de app**: Web? Mobile? Desktop? CLI?
2. **Problema principal**: Que problema específico resolve?
3. **Público-alvo**: Quem vai usar? Para quê?

**Exemplos de inputs melhores**:
- "App web de pomodoro com sons ambiente para foco"
- "CLI para gerar paletas de cores de imagens"
- "Mobile app para rastrear hábitos com gamificação"

Por favor, forneça uma descrição mais específica da ideia.
```

### Exemplo 4: MVP Muito Grande → Alerta

```
Input: /planner.backlog "Plataforma completa de e-commerce com IA, pagamentos, inventory, shipping, analytics..."

Output:
⚠️ Escopo muito grande detectado!

**Estimativa inicial do MVP**: ~40 horas (5 dias)
**Recomendação**: Simplificar escopo ou dividir em fases

**Sugestões de corte para MVP executável em 1 dia**:

Opção 1 - Core Transaction Flow (8h):
- Product listing (mock data)
- Shopping cart (local storage)
- Checkout flow (mock payment)

Opção 2 - Admin + Catalog (8h):
- Admin panel para produtos
- Product CRUD
- Basic listing público

Opção 3 - Payment Integration Focus (8h):
- Single product checkout
- Payment integration (Stripe)
- Order confirmation

**Pergunta**: Qual opção de MVP prefere? Ou quer manter escopo completo (5 dias)?
```

## Integração

### Posição no Workflow

**Precedido por**: 
- Ideias soltas ou não estruturadas
- Brainstorming inicial
- Nenhum (standalone)

**Seguido por**: 
- `/planner.specify` (criar spec detalhada da feature escolhida)
- `/planner.project` (criar plano técnico direto do backlog)
- `/planner.task` (se plano técnico já existe)

### Dependências

**Commands Obrigatórios**: Nenhum (standalone)

**Commands Opcionais**: 
- `/analyzer` (explorar gaps e oportunidades antes de gerar backlog)

### Fluxo de Dados

```
[Ideia não estruturada]
       ↓
  /planner.backlog ← VOCÊ ESTÁ AQUI
       ↓
 [backlog com features priorizadas]
       ↓
  ESCOLHER feature do MVP
       ↓
  /planner.specify [feature escolhida]
       ↓
 [spec.md detalhada]
       ↓
  /planner.project [spec.md]
       ↓
 [plan.md técnico]
       ↓
  /planner.task [plan.md]
       ↓
 [tasks/*.md]
       ↓
  /exec.implement
```

**Alternativa - Direto para Plano**:
```
[Ideia não estruturada]
       ↓
  /planner.backlog
       ↓
 [backlog completo]
       ↓
  /planner.project [backlog.md]
       ↓
 [plan.md com TODAS features]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar o backlog completo, verifique:

### Estrutura do Backlog
- [ ] Pelo menos 3 features no MVP
- [ ] Análise de pelo menos 2 caminhos técnicos alternativos
- [ ] Pelo menos 3 tradeoffs documentados
- [ ] Riscos identificados com mitigações
- [ ] Tasks executáveis para começar (se granularidade solicitada)
- [ ] Roadmap com fases (MVP, Enhancement, Advanced)

### Qualidade de Análise
- [ ] Features são incrementais (não monolíticas)
- [ ] Cada feature entrega valor individual
- [ ] Decisões técnicas justificadas (prós E contras)
- [ ] Estimativas realistas baseadas em complexidade
- [ ] Priorização clara (MVP vs enhancement)
- [ ] Tradeoffs têm análise completa (contexto, opções, impacto)
- [ ] Riscos têm probabilidade, impacto e mitigação

### Executabilidade
- [ ] Desenvolvedor consegue começar imediatamente
- [ ] MVP é executável em 1 dia (ou alerta foi dado)
- [ ] Dependencies entre features identificadas
- [ ] Tasks MVP têm critérios de conclusão claros
- [ ] Recomendação técnica é clara e justificada

### Consistência
- [ ] Segue template de backlog (se existe)
- [ ] Usa terminologia consistente
- [ ] Salvo em `backlog/[nome-projeto]-backlog.md`
- [ ] Encoding UTF-8
- [ ] Markdown válido

### Actionability
- [ ] Próximo command sugerido (`/planner.specify` ou `/planner.project`)
- [ ] Mensagem de commit sugerida incluída
- [ ] Caminho claro para implementação
