---
description: Criar ou atualizar a constituição do projeto garantindo sincronização com templates e commands
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Gerenciar a constituição do projeto em `vibes/configs/constitution.md`, garantindo que todos os princípios, governança e regras não-negociáveis estejam documentados e propagados através de todos os templates, commands e artefatos dependentes. A constituição é a fonte autoritativa de verdade para guiar decisões técnicas e arquiteturais de todo o projeto.

Este command cria ou atualiza a constituição, valida conformidade de templates e commands existentes, propaga mudanças necessárias e gera relatório completo de sincronização. Usa versionamento semântico (MAJOR.MINOR.PATCH) para rastrear evolução dos princípios.

**Quando usar**: Ao iniciar projeto (criar constituição), ao adicionar/modificar princípios (emendar), ou validar alinhamento de artefatos com princípios estabelecidos.

**Pré-requisitos**: 
- Diretório `vibes/memory/` existente
- Template de constituição em `vibes/structure/templates/governance/constitution.md` (opcional)
- Princípios a adicionar/modificar OU modo de validação

Etapas de execução:

1. **Validação de Pré-requisitos**:
   - Verifique existência do diretório `vibes/memory/`
   - Verifique existência do arquivo `vibes/configs/constitution.md`
   - Se arquivo não existir, crie estrutura de diretórios
   - Verifique existência do diretório `vibes/structure/templates/`
   - Verifique existência do diretório `.cursor/commands/`
   - Liste todos os templates em `vibes/structure/templates/`
   - Liste todos os commands em `.cursor/commands/`
   - Se argumento fornecido, parse para extrair:
     * Modo: criar, atualizar, emendar, validar
     * Número de princípios desejados
     * Princípios específicos a adicionar/modificar
     * Seções customizadas
     * Tipo de bump de versão (major, minor, patch)

2. **Carregamento de Contexto**:
   - Carregue conteúdo atual de `vibes/configs/constitution.md`
   - Parse estrutura do template:
     * Identificar placeholders: `[PROJECT_NAME]`, `[PRINCIPLE_N_NAME]`, etc.
     * Identificar versão atual: `[CONSTITUTION_VERSION]`
     * Identificar datas: `[RATIFICATION_DATE]`, `[LAST_AMENDED_DATE]`
     * Identificar seções: Core Principles, Governance, etc.
   - Carregue contexto do projeto:
     * README.md para nome e descrição do projeto
     * package.json para tecnologias e dependências
     * .cursor/rules/ para regras técnicas existentes
     * Constituição anterior (se existir histórico)
   - Identifique valores já preenchidos vs placeholders pendentes

3. **Análise da Entrada do Usuário**:
   - Se modo "criar":
     * Determine número de princípios (padrão: 5)
     * Colete princípios da entrada ou pergunte interativamente
     * Derive nome do projeto do contexto
     * Defina data de ratificação como hoje
     * Defina versão inicial como 1.0.0
   
   - Se modo "atualizar" ou "emendar":
     * Identifique princípios a modificar
     * Identifique princípios a adicionar
     * Identifique princípios a remover
     * Determine tipo de bump de versão:
       - MAJOR: Remoção/redefinição incompatível
       - MINOR: Novo princípio ou expansão material
       - PATCH: Clarificações e refinamentos
     * Atualize LAST_AMENDED_DATE para hoje
   
   - Se modo "validar":
     * Verificar consistência com templates
     * Verificar consistência com commands
     * Verificar que não há placeholders não resolvidos
     * Gerar relatório de conformidade

4. **Derivação e Validação de Valores**:
   
   A. **Valores de Projeto**:
      - `[PROJECT_NAME]`:
        * Extrair de package.json (field "name")
        * Ou README.md (primeiro heading)
        * Ou perguntar ao usuário
        * Formato: Nome legível (ex: "MyApp")
   
   B. **Princípios** (para cada princípio 1-N):
      - `[PRINCIPLE_N_NAME]`:
        * Nome curto e memorável (ex: "Library-First")
        * Use numeração romana se preferido (ex: "I. Library-First")
      
      - `[PRINCIPLE_N_DESCRIPTION]`:
        * Descrição clara e não-negociável
        * Use bullet points para múltiplas regras
        * Inclua racional se não óbvio
        * Deve ser testável e verificável
        * Evite linguagem vaga ("deveria" → "DEVE")
   
   C. **Seções Adicionais**:
      - `[SECTION_N_NAME]`: Nome da seção (ex: "Security Requirements")
      - `[SECTION_N_CONTENT]`: Conteúdo detalhado
   
   D. **Governança**:
      - `[GOVERNANCE_RULES]`:
        * Procedimento de emenda
        * Política de versionamento
        * Revisão de conformidade
        * Enforcement e exceções
        * Referência a guidance files
   
   E. **Metadados**:
      - `[CONSTITUTION_VERSION]`: Formato MAJOR.MINOR.PATCH
      - `[RATIFICATION_DATE]`: Formato ISO YYYY-MM-DD
      - `[LAST_AMENDED_DATE]`: Formato ISO YYYY-MM-DD

5. **Determinação de Bump de Versão**:
   - Analise mudanças propostas:
     * Princípios removidos → MAJOR bump
     * Princípios redefinidos (incompatíveis) → MAJOR bump
     * Princípios adicionados → MINOR bump
     * Seções expandidas materialmente → MINOR bump
     * Clarificações de texto → PATCH bump
     * Correções de typo → PATCH bump
   
   - Se ambíguo:
     * Liste mudanças identificadas
     * Proponha tipo de bump com racional
     * Aguarde confirmação do usuário (se interativo)
   
   - Calcule nova versão:
     * Parse versão atual (ex: "2.1.3")
     * Aplique bump apropriado
     * Exemplo MAJOR: 2.1.3 → 3.0.0
     * Exemplo MINOR: 2.1.3 → 2.2.0
     * Exemplo PATCH: 2.1.3 → 2.1.4

6. **Construção da Constituição Atualizada**:
   - Substitua todos os placeholders com valores concretos
   - Para princípios:
     * Use formatação consistente (### para nomes)
     * Bullet points para regras múltiplas
     * Separação clara entre princípios
   
   - Para governança:
     * Seja explícito sobre processo de emenda
     * Referencie este command como mecanismo de atualização
     * Especifique quem pode propor emendas
   
   - Validações de qualidade:
     * Nenhum placeholder `[...]` não explicado restante
     * Datas no formato ISO correto
     * Versão no formato semântico correto
     * Princípios declarativos e testáveis
     * Linguagem precisa (DEVE/DEVERIA/PODE)
     * Markdown válido e bem formatado

7. **Análise de Impacto em Templates**:
   - Para cada template em `vibes/structure/templates/`:
     
     A. **Leia conteúdo do template**
     
     B. **Identifique referências à constituição**:
        - Menções a princípios específicos
        - Referências a governança
        - Restrições ou regras derivadas
        - Validações baseadas em princípios
     
     C. **Detecte inconsistências**:
        - Princípios mencionados que não existem mais
        - Regras conflitantes
        - Validações desatualizadas
     
     D. **Determine necessidade de atualização**:
        - ✅ Consistente - nenhuma ação necessária
        - ⚠️ Revisar - pode precisar atualização
        - 🔴 Desatualizado - atualização obrigatória
     
     E. **Se atualização obrigatória**:
        - Identifique seções específicas a modificar
        - Prepare diff ou mudanças necessárias
        - Atualize template mantendo estrutura
        - Preserve placeholders e comentários de orientação

8. **Análise de Impacto em Commands**:
   - Para cada command em `.cursor/commands/`:
     
     A. **Leia conteúdo do command**
     
     B. **Identifique referências à constituição**:
        - Menções a princípios no objetivo
        - Validações baseadas em regras
        - Critérios de qualidade derivados
        - Referências explícitas a constitution.md
     
     C. **Detecte inconsistências**:
        - Referências a princípios removidos
        - Regras que conflitam com nova constituição
        - Comandos específicos de agente (ex: "CLAUDE") quando deveria ser genérico
     
     D. **Determine necessidade de atualização**:
        - ✅ Consistente
        - ⚠️ Revisar
        - 🔴 Desatualizado
     
     E. **Se atualização obrigatória**:
        - Atualize referências a princípios
        - Atualize validações e critérios
        - Preserve estrutura e fluxo do command

9. **Análise de Impacto em Documentação**:
   - Verifique arquivos de documentação:
     * `.cursor/README.md`
     * `README.md` (raiz do projeto)
     * `docs/` (se existir)
     * `.cursor/README.md` (se existir)
   
   - Identifique menções à constituição ou princípios
   - Detecte inconsistências
   - Atualize se necessário mantendo tom e estrutura

10. **Propagação de Mudanças**:
    - Execute atualizações em ordem:
      1. Constituição (`vibes/configs/constitution.md`)
      2. Templates obrigatórios (🔴 Desatualizados)
      3. Commands obrigatórios (🔴 Desatualizados)
      4. Documentação principal
    
    - Para cada arquivo atualizado:
      * Use search_replace para mudanças precisas
      * Preserve formatação e estrutura
      * Valide que mudança foi aplicada corretamente
    
    - Mantenha log de mudanças:
      * Arquivo modificado
      * Tipo de mudança (atualizar referência, remover seção, etc.)
      * Diff resumido

11. **Geração de Relatório de Impacto de Sincronização**:
    - Crie relatório estruturado:
    
    ```markdown
    # Relatório de Sincronização da Constituição
    
    **Data**: [TIMESTAMP]
    **Versão**: [OLD_VERSION] → [NEW_VERSION]
    **Tipo de Bump**: [MAJOR/MINOR/PATCH]
    
    ## 📝 Mudanças na Constituição
    
    ### Princípios Adicionados
    - [PRINCIPLE_NAME]: [BREVE_DESCRIÇÃO]
    
    ### Princípios Modificados
    - [PRINCIPLE_NAME]: [OLD_TITLE] → [NEW_TITLE]
    - Mudanças: [DESCRIÇÃO]
    
    ### Princípios Removidos
    - [PRINCIPLE_NAME]: [RAZÃO]
    
    ### Seções Adicionadas/Modificadas
    - [SECTION_NAME]: [DESCRIÇÃO]
    
    ## 🔄 Impacto em Templates
    
    | Template | Status | Ação |
    |----------|--------|------|
    | template-1.md | ✅ Consistente | Nenhuma |
    | template-2.md | 🔴 Atualizado | Referência X → Y |
    | template-3.md | ⚠️ Revisar | Pode precisar atualização manual |
    
    ## 🔄 Impacto em Commands
    
    | Command | Status | Ação |
    |---------|--------|------|
    | command-1.md | ✅ Consistente | Nenhuma |
    | command-2.md | 🔴 Atualizado | Critério X → Y |
    
    ## 🔄 Impacto em Documentação
    
    | Documento | Status | Ação |
    |-----------|--------|------|
    | README.md | ✅ Consistente | Nenhuma |
    | .cursor/README.md | 🔴 Atualizado | Seção Y atualizada |
    
    ## ⚠️ TODOs Pendentes
    
    - [ ] TODO([FIELD_NAME]): [EXPLICAÇÃO]
    - [ ] Revisar manualmente: [ARQUIVO]
    
    ## ✅ Validações Executadas
    
    - ✅ Nenhum placeholder não explicado
    - ✅ Datas no formato ISO correto
    - ✅ Versão no formato semântico
    - ✅ Princípios testáveis e declarativos
    - ✅ Templates sincronizados
    - ✅ Commands sincronizados
    ```

12. **Prepend Relatório na Constituição**:
    - Adicione relatório como comentário HTML no topo do arquivo:
    
    ```html
    <!--
    ÚLTIMA ATUALIZAÇÃO: [TIMESTAMP]
    VERSÃO: [NEW_VERSION]
    MUDANÇAS: [RESUMO_BREVE]
    
    Ver histórico completo em vibes/configs/constitution-history.md
    -->
    ```
    
    - Mantenha histórico de versões (opcional):
      * Crie/atualize `vibes/configs/constitution-history.md`
      * Adicione entrada com timestamp, versão, mudanças

13. **Validação Final**:
    - Verifique constituição atualizada:
      * ✅ Nenhum placeholder `[...]` não resolvido
      * ✅ Versão corresponde ao relatório
      * ✅ Datas no formato ISO YYYY-MM-DD
      * ✅ Princípios declarativos e testáveis
      * ✅ Governança clara e executável
      * ✅ Markdown válido
    
    - Verifique arquivos atualizados:
      * ✅ Templates críticos atualizados
      * ✅ Commands críticos atualizados
      * ✅ Documentação principal atualizada
    
    - Se qualquer validação falhar:
      * Identifique problema específico
      * Corrija imediatamente
      * Re-valide até passar

14. **Reporte de Conclusão**:

    ### ✨ Constituição Atualizada com Sucesso
    
    **Versão**: [OLD_VERSION] → [NEW_VERSION] ([BUMP_TYPE])
    **Data de Emenda**: [LAST_AMENDED_DATE]
    **Status**: ✅ Sincronizada
    
    **Mudanças Principais**:
    - [Mudança 1]
    - [Mudança 2]
    - [Mudança 3]
    
    **Princípios**:
    - Total: X princípios ativos
    - Adicionados: X
    - Modificados: X
    - Removidos: X
    
    **Arquivos Atualizados**:
    - 📜 Constituição: `vibes/configs/constitution.md`
    - 📋 Templates: X arquivos
    - ⚙️ Commands: X arquivos
    - 📖 Documentação: X arquivos
    
    **Status de Sincronização**:
    - ✅ Templates: X/Y sincronizados
    - ✅ Commands: X/Y sincronizados
    - ⚠️ Revisão Manual: X arquivos
    
    **TODOs Pendentes**:
    - [ ] [TODO_1]
    - [ ] [TODO_2]
    
    **Relatório Completo**:
    - Ver: `vibes/configs/constitution.md` (comentário no topo)
    - Histórico: `vibes/configs/constitution-history.md` (se existe)
    
    **Próximos Passos Sugeridos**:
    1. Revisar constituição atualizada: `cat vibes/configs/constitution.md`
    2. Revisar templates atualizados: `ls vibes/structure/templates/`
    3. Testar commands atualizados (se aplicável)
    4. Comunicar mudanças ao time
    5. Atualizar processos de revisão para verificar conformidade
    
    **Mensagem de Commit Sugerida**:
    ```
    docs: emendar constituição para v[NEW_VERSION]
    
    - [Mudança 1]
    - [Mudança 2]
    - Atualizar templates e commands para conformidade
    
    BREAKING CHANGE: [Se MAJOR bump, descrever incompatibilidades]
    ```

Regras de comportamento:

- **SEMPRE** valide existência de `vibes/configs/constitution.md` antes de prosseguir
- **SEMPRE** derive valores do contexto do projeto quando possível
- **SEMPRE** use formato ISO YYYY-MM-DD para datas
- **SEMPRE** use versionamento semântico MAJOR.MINOR.PATCH
- **SEMPRE** propague mudanças para templates e commands dependentes
- **SEMPRE** gere relatório de impacto de sincronização
- **SEMPRE** valide que nenhum placeholder não explicado permanece
- **SEMPRE** use linguagem precisa e declarativa (DEVE/DEVERIA/PODE)
- **SEMPRE** torne princípios testáveis e verificáveis
- **SEMPRE** use caminhos absolutos em operações de arquivo
- **NUNCA** deixe placeholders `[...]` sem preencher (exceto se TODO explícito)
- **NUNCA** use linguagem vaga ou ambígua em princípios
- **NUNCA** quebre estrutura markdown do template
- **NUNCA** remova comentários de orientação úteis
- **NUNCA** sobrescreva constituição sem gerar relatório
- SE entrada do usuário vaga, faça perguntas de esclarecimento (max 3)
- SE bump de versão ambíguo, proponha racional e aguarde confirmação
- SE campo desconhecido, insira `TODO([FIELD]): explicação` e justifique
- SE template crítico desatualizado, atualize obrigatoriamente
- SE command desatualizado, atualize se crítico, senão sinalize para revisão manual
- LIMITE perguntas interativas a informações essenciais
- PRIORIZE derivação de contexto sobre perguntas ao usuário
- Constituição é fonte de verdade - se conflito, constituição prevalece
- Versionamento semântico é obrigatório e não-negociável
- Mudanças incompatíveis requerem MAJOR bump sempre

Heurísticas de decisão de bump:

**MAJOR bump** (X.0.0):
- Remoção de qualquer princípio
- Redefinição incompatível de princípio existente
- Mudança de governança que afeta processo de emenda
- Mudanças que invalidam artefatos existentes

**MINOR bump** (x.Y.0):
- Adição de novo princípio
- Adição de nova seção
- Expansão material de princípio existente
- Orientação nova que não quebra compatibilidade

**PATCH bump** (x.y.Z):
- Clarificação de texto sem mudança semântica
- Correção de typos
- Melhoria de formatação
- Refinamento de redação
- Correção de referências quebradas

Critérios de qualidade da constituição:

- **Clareza**: Princípios imediatamente compreensíveis
- **Testabilidade**: Cada princípio pode ser verificado objetivamente
- **Completude**: Nenhum placeholder não explicado
- **Consistência**: Alinhamento com templates e commands
- **Versionamento**: Histórico de mudanças rastreável
- **Governança**: Processo de emenda claro e executável
- **Declaratividade**: Uso de DEVE/DEVERIA/PODE apropriadamente
- **Não-ambiguidade**: Linguagem precisa sem espaço para interpretação múltipla

Contexto específico do projeto:

- Sistema `.cursor` para análise e upgrade de React Native
- Templates em `vibes/structure/templates/` para diversos tipos de análise
- Commands em `.cursor/commands/` para automação de tarefas
- Constituição em `vibes/configs/constitution.md` como fonte de verdade
- Princípios devem guiar decisões técnicas e arquiteturais
- Governança deve ser clara para permitir evolução controlada

Contexto: $ARGUMENTS
