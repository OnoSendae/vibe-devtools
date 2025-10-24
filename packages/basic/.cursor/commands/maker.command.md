---
description: Gerar novos commands especialistas seguindo framework QUEST e padrões de excelência
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Criar commands especialistas de alta qualidade que seguem o **Framework QUEST** e os padrões de excelência identificados. Este command guia a criação de novos commands através de questionamento estruturado, análise de contexto, engenharia de estrutura, solidificação com templates e validação completa.

**Quando usar**: Ao criar qualquer novo command para o sistema, garantindo consistência, qualidade e integração perfeita.

**Princípio Central**: Commands são conversas estruturadas entre humano e agente, não scripts rígidos.

## Descoberta & Validação

Antes de criar o command, você **DEVE** questionar o usuário para entender completamente os requisitos:

### Informações Obrigatórias

1. **Propósito**: O que este command deve fazer? (1 frase clara)
   - [ ] Criar algo novo
   - [ ] Transformar dados existentes
   - [ ] Validar/analisar
   - [ ] Automatizar processo
   - [ ] Outro: _______

2. **Inputs**: De onde vêm os dados?
   - [ ] User input direto
   - [ ] Arquivos existentes (quais?)
   - [ ] API/serviço externo
   - [ ] Output de outro command
   - [ ] Outro: _______

3. **Outputs**: O que deve ser produzido?
   - [ ] Arquivo estruturado (tipo?)
   - [ ] Múltiplos arquivos
   - [ ] Modificação de existente
   - [ ] Report/análise
   - [ ] Outro: _______

4. **Automação**: Há operações repetitivas que devem ser automatizadas?
   - [ ] Sim → Descreva: _______
   - [ ] Não
   - [ ] Talvez → Avaliar durante criação

5. **Template**: Existe template de output ou precisamos criar?
   - [ ] Template existe: _______
   - [ ] Precisa criar novo
   - [ ] Não precisa de template

6. **Validação**: Como saber se o resultado está correto?
   - Critérios: _______

7. **Contexto**: Há referências, docs ou exemplos existentes?
   - Arquivos: _______
   - URLs: _______
   - Nenhum

### Preferências Opcionais

1. **Nome do command**: Como deve se chamar?
   - Padrão: Inferir do propósito
   - domain name: `planner.feature.md`, `maker.rule.md`
   - Formato: kebab-case (ex: `analyzer.project.md`, `exec.implement.md`)

2. **Integração**: Com quais commands existentes deve integrar?
   - Padrão: Analisar contexto para identificar

## Fluxo de Execução

### Fase 1: Questionar Primeiro (QUEST - Q)

**Apresente as Perguntas de Descoberta acima ao usuário** e aguarde respostas claras.

**Por que questionar primeiro?**
- ✅ Evita retrabalho
- ✅ Esclarece expectativas
- ✅ Identifica gaps cedo
- ✅ Descobre requisitos ocultos

**Se $ARGUMENTS estiver vazio ou vago**:
- Faça perguntas de esclarecimento específicas (max 3)
- Aguarde respostas antes de prosseguir
- NUNCA assuma requisitos sem confirmação

**Se $ARGUMENTS estiver claro**:
- Confirme entendimento com o usuário
- Liste requisitos extraídos
- Peça validação antes de prosseguir

### Fase 2: Entender Contexto (QUEST - U)

Após obter respostas claras, busque e analise contexto relevante:

1. **Carregar Template de Command** *(OBRIGATÓRIO)*:
   - Carregue `vibes/structure/templates/template.commands.md`
   - Este é o ÚNICO template para criar commands
   - Estude a estrutura completa e guidance comments
   - Identifique seções obrigatórias vs opcionais

2. **Carregar Governança**:
   - Carregue `vibes/structure/commands/constitution.md` (se existir)
   - Parse princípios e regras estabelecidas
   - Identifique padrões de qualidade obrigatórios
   - Extraia restrições e governança aplicáveis

3. **Carregar Commands de Referência**:
   - Identifique pelo menos 3 commands similares ao propósito desejado:
     * Para análise → `analyzer.*.md`
     * Para geração/planejamento → `planner.*.md`
     * Para execução → `exec.implement.md`
     * Para notificação → `notify.*.md`
     * Para criação → `maker.*.md`
     * Para governança → `constitution.md`

4. **Extrair Padrões**:
   - Estrutura de frontmatter
   - Seção de User Input padrão
   - Formato de Goal/Outline
   - Discovery Questions (se presentes)
   - Execution Workflow (fases numeradas)
   - Operating Principles
   - Error Handling
   - Examples (good e bad)
   - Quality Checklist

5. **Identificar Infraestrutura**:
   - Scripts bash existentes em `vibes/scripts/bash/`
   - Templates existentes em `vibes/structure/templates/`
   - Padrões de nomenclatura e organização
   - Convenções de paths e estrutura de diretórios

### Fase 3: Engenheirar Estrutura (QUEST - E)

Com contexto claro, engenheira a estrutura do novo command:

1. **Avaliar Necessidade de Script**:

   Identifique operações repetitivas/complexas e questione o usuário:

   ```markdown
   ## Avaliação de Script
   
   Identifiquei as seguintes operações:
   
   1. **[Operação 1]**: [Descrição]
      - Frequência: [Quão frequente]
      - Complexidade: [Alta/Média/Baixa]
      - Erro-prone se manual: [Sim/Não]
   
   **Recomendação**: [Criar script / Não precisa de script]
   **Razão**: [Explicar por quê]
   
   **Trade-offs**:
   
   | Com Script | Sem Script |
   |-------------|----------------|
   | ✅ Execução mais rápida | ✅ Estrutura mais simples |
   | ✅ Reutilizável | ✅ Sem dependência de bash |
   | ✅ À prova de erros | ✅ Mais flexível |
   | ❌ Carga de manutenção | ❌ Mais lento |
   | ❌ Conhecimento de bash necessário | ❌ Erros potenciais |
   
   **Pergunta**: Devo criar script bash para automatizar essas operações? (sim/não/talvez)
   ```

   **Critérios para Script**:
   
   | Criar Script Se... | Não Criar Se... |
   |-------------------|-----------------|
   | Operações de file system (mkdir, cp, mv) | Geração de conteúdo |
   | Operações Git (branch, commit) | Preenchimento de template |
   | Cálculos/validação de paths | Lógica de decisão |
   | Extração de JSON/dados | Processamento de linguagem natural |
   | Repetido em múltiplos commands | Único a este command |
   | Erro-prone se manual | Simples e claro |

2. **Avaliar Necessidade de Template**:

   Avalie necessidade de template e questione o usuário:

   ```markdown
   ## Avaliação de Template
   
   **Tipo de Output**: [Estruturado/Não-estruturado]
   
   **Estrutura necessária**:
   ```
   [Mostrar estrutura esperada]
   ```
   
   **Decisão**:
   - [ ] Usar template existente: [path]
   - [ ] Criar novo template: [nome proposto]
   - [ ] Não precisa de template (output dinâmico)
   
   **Pergunta**: Este output deve seguir um template estruturado? 
   Se sim, tenho template existente ou criamos novo?
   ```

   **Quando criar template**:
   - ✅ Output tem estrutura fixa
   - ✅ Múltiplas seções obrigatórias/opcionais
   - ✅ Reutilizável em múltiplos usos
   - ✅ Precisa guidance para preenchimento

   **Quando NÃO criar template**:
   - ❌ Output é livre/dinâmico
   - ❌ Uma única vez
   - ❌ Estrutura varia muito por caso

3. **Projetar Estrutura do Command**:

   **Carregue o template universal**:
   - Path: `vibes/structure/templates/template.commands.md`
   - Este é o ÚNICO template de referência para criar commands
   - Siga EXATAMENTE a estrutura definida

   **Preencha os placeholders**:
   - Substitua todos os `[CAPS_PLACEHOLDER]` com valores específicos
   - Use guidance comments para entender como preencher cada seção
   - Avalie todas as seções `[REMOVE IF UNUSED]`:
     * Se aplicável: Preencha com conteúdo
     * Se não aplicável: REMOVA a seção completamente

   **Seções do template**:
   - ✅ Frontmatter (description)
   - ✅ User Input (padrão)
   - ✅ Goal (2-3 parágrafos + quando usar + prerequisites)
   - ⚠️ Discovery & Validation (opcional - se inputs incertos)
   - ✅ Execution Workflow (fases numeradas)
   - ✅ Operating Principles (standards + error handling + constraints)
   - ⚠️ Scripts (opcional - se usa bash scripts)
   - ⚠️ Templates (opcional - se usa templates)
   - ✅ Examples (good + error, mínimo)
   - ⚠️ Integration (opcional - se parte de workflow)
   - ✅ Context (padrão)
   - ✅ Quality Checklist (validação final)

   **Importante**:
   - NUNCA invente estrutura diferente do template
   - SEMPRE use o template como base
   - APENAS preencha e adapte o template existente

### Fase 4: Solidificar com Templates (QUEST - S)

**Se template necessário** (conforme decisão da Fase 3), crie-o com excelência:

1. **Criar Estrutura do Template**:

   ```markdown
   # [NOME DO TEMPLATE]

   <!-- 
     PROPÓSITO: [Para que serve este template]
     USADO POR: [Qual(is) command(s)]
     OUTPUT: [Onde vai a versão preenchida]
   -->

   **Criado**: [DATA]
   **Versão**: [VERSÃO]

   ## Metadados *(preenchimento automático)*

   **[CAMPO 1]**: [PLACEHOLDER ou $VARIÁVEL]
   **[CAMPO 2]**: [PLACEHOLDER ou $VARIÁVEL]

   ---

   ## [NOME DA SEÇÃO 1] *(obrigatório)*

   <!--
     ORIENTAÇÃO: [Como preencher esta seção]
     EXEMPLO: [Mostrar exemplo se complexo]
   -->

   [Estrutura de conteúdo com placeholders]

   ---

   ## [NOME DA SEÇÃO 2] *(opcional - incluir se [condição])*

   <!--
     QUANDO INCLUIR: [Critérios]
     ORIENTAÇÃO: [Instruções]
   -->

   [Estrutura de conteúdo]

   ---

   ## Checklist de Qualidade

   Antes de considerar isto completo:

   - [ ] Todas as seções obrigatórias preenchidas
   - [ ] Nenhum [PLACEHOLDER] restante
   - [ ] Todas as opções avaliadas (não usadas removidas)
   - [ ] Segue convenções do projeto
   ```

2. **Elementos de Template a Usar**:

   | Elemento | Quando Usar | Exemplo |
   |---------|-------------|---------|
   | `[CAPS_PLACEHOLDER]` | IA ou usuário preenche | `[NOME_DA_FEATURE]` |
   | `$VARIAVEL` | Variável de runtime | `$ARGUMENTS` |
   | `*(obrigatório)*` | Deve estar presente | `## Visão Geral *(obrigatório)*` |
   | `*(opcional)*` | Condicional | `## Avançado *(opcional)*` |
   | `<!-- ORIENTAÇÃO -->` | Instruções | `<!-- Preencha com 3-5 frases -->` |
   | `[REMOVE IF UNUSED]` | Múltiplas opções | `<!-- [REMOVE IF UNUSED] Opção A -->` |

3. **Salvar Template**:
   - Path: `vibes/structure/templates/[nome-template].md`
   - Valide estrutura antes de salvar

### Fase 5: Testar & Iterar (QUEST - T)

Valide o command criado antes de finalizar:

1. **Verificação de Conformidade com Template**:

   Compare command gerado com template universal:
   
   - [ ] Todas as seções obrigatórias presentes
   - [ ] Nenhum placeholder `[CAPS]` não preenchido
   - [ ] Seções `[REMOVE IF UNUSED]` avaliadas (preenchidas ou removidas)
   - [ ] Guidance comments removidos do output final
   - [ ] Estrutura idêntica ao template (exceto seções opcionais removidas)

2. **Validação de Estrutura do Command**:

   - [ ] Frontmatter YAML válido
   - [ ] Seção User Input presente (texto padrão)
   - [ ] Goal completo (2-3 parágrafos + quando usar + prerequisites)
   - [ ] Discovery & Validation (se inputs podem ser incertos)
   - [ ] Execution workflow em fases (4-7 fases)
   - [ ] Operating principles definidos (standards + error + constraints)
   - [ ] Error handling explícito para casos conhecidos
   - [ ] Examples (mínimo: good input + error case)
   - [ ] Seção Context ao final
   - [ ] Quality Checklist presente

3. **Portões de Qualidade**:

   - [ ] **Clareza**: Propósito imediatamente compreensível
   - [ ] **Completude**: Todos os passos necessários documentados
   - [ ] **Consistência**: Segue padrões de commands existentes
   - [ ] **Robustez**: Tratamento de erros adequado
   - [ ] **Integrabilidade**: Encaixa-se no workflow existente
   - [ ] **Testabilidade**: Comportamento verificável

4. **Testes de Validação** (Walkthrough Mental):

   **Caminho Feliz**:
   - Input ideal → Command executa → Output esperado? ✅

   **Pré-requisitos Ausentes**:
   - Input sem pré-requisitos → Erro claro + sugestão? ✅

   **Input Inválido**:
   - Input malformado → Validação + mensagem útil? ✅

   **Casos Extremos**:
   - Input vazio → Comportamento definido? ✅
   - Input muito grande → Sem crash? ✅

5. **Conformidade com Governança**:

   - [ ] Segue princípios da constitution (se existir)
   - [ ] Respeita padrões estabelecidos
   - [ ] Não viola restrições conhecidas

### Fase 6: Gerar & Salvar

1. **Criar Infraestrutura de Suporte**:

   **Se script bash necessário**:
   - Crie em `vibes/scripts/bash/[nome-script].sh`
   - Inclua: shebang, error handling, output JSON
   - Valide: sintaxe, permissões, funcionalidade

   **Se template necessário**:
   - Já criado na Fase 4
   - Valide: estrutura, placeholders, orientações

2. **Escrever Arquivo do Command**:

   - Path: `.cursor/commands/[domain].[nome-command].md`
   - Formato: kebab-case (ex: `analyzer.project.md`, `planner.task.md`)
   - Verificar: Não sobrescreve existente sem confirmação

3. **Formatar & Polir**:

   - Formatação markdown consistente
   - Numeração para execution workflow
   - Bullet points para listas
   - Tabelas para opções/comparações
   - Linhas < 100 chars quando possível
   - Uma linha em branco entre seções
   - Sem trailing whitespace

### Fase 7: Reportar & Documentar

1. **Gerar Relatório de Conclusão**:

   ```markdown
   ## ✅ Command Criado com Sucesso

   **Command**: [nome-command]
   **Arquivo**: `.cursor/commands/[domain].[nome-command].md`

   ### Artefatos Criados:

   - Arquivo do command: [path]
   - Script(s): [path(s)] (se houver)
   - Template(s): [path(s)] (se houver)

   ### Resumo do Command:

   **Propósito**: [1 frase]
   **Inputs**: [Resumo]
   **Outputs**: [Resumo]

   ### Pontos de Integração:

   - **Usado após**: [Command(s) anterior(es)]
   - **Alimenta**: [Próximo(s) command(s)]
   - **Dependências**: [Outros commands/scripts/templates]

   ### Exemplo de Uso:

   ```
   /[domain].[nome-command] [exemplo de input]
   ```

   Output esperado:
   ```
   [Exemplo de output]
   ```

   ### Próximos Passos:

   1. Revisar arquivo do command para precisão
   2. Testar com inputs de exemplo
   3. Integrar na documentação de workflow
   4. Compartilhar com time (se aplicável)

   ### Mensagem de Commit Sugerida:

   ```
   feat(commands): add [domain].[nome-command] command

   - Implementa [funcionalidade chave]
   - Segue framework QUEST
   - Inclui [scripts/templates] para [propósito]
   ```
   ```

2. **Atualizar Documentação** (Opcional):

   Se houver README de commands, considere adicionar entrada:
   - Nome do command
   - Descrição breve
   - Quando usar
   - Link para arquivo

## Princípios Operacionais

### Padrões de Qualidade

- **Questionar Primeiro**: SEMPRE questione antes de assumir
- **Carregar Contexto**: Carregue pelo menos 3 commands de referência
- **Consistência**: Siga estrutura e padrões existentes
- **Governança**: Respeite constitution.md quando existir
- **Validação**: Teste mentalmente todos os casos
- **Clareza**: Propósito e fluxo imediatamente compreensíveis
- **Completude**: Todos os passos e tratamentos documentados

### Tratamento de Erros

- **Se $ARGUMENTS vazio/vago**: Apresente Perguntas de Descoberta e AGUARDE
- **Se command similar existe**: Sugira extensão ao invés de duplicação
- **Se nome conflita**: Alerte e sugira alternativa
- **Se governança existe**: Valide conformidade antes de gerar
- **Se template/script necessário**: Questione usuário sobre criação
- **Se pré-requisito ausente**: Documente claramente no command

### Restrições

- SEMPRE use Framework QUEST completo (Q → U → E → S → T)
- SEMPRE carregue template universal como ÚNICA referência
- SEMPRE use `vibes/structure/templates/template.commands.md` como base
- SEMPRE preencha todos os placeholders [CAPS]
- SEMPRE avalie seções [REMOVE IF UNUSED] (usar ou remover)
- SEMPRE remova guidance comments do output final
- SEMPRE inclua seção Discovery & Validation se inputs incertos
- SEMPRE inclua Examples (good e bad)
- SEMPRE inclua Quality Checklist ao final
- SEMPRE valide contra command excellence checklist
- NUNCA sobrescreva commands sem confirmação explícita
- NUNCA crie commands ambíguos ou unclear
- NUNCA omita error handling
- NUNCA use placeholders não documentados
- NUNCA invente estrutura diferente do template
- NUNCA viole princípios da constitution

### Padrão de Questionamento Progressivo

Camada 1 (Core - Obrigatório):
- Propósito do command
- Inputs esperados
- Outputs desejados

Camada 2 (Contexto - Condicional):
- Se mencionou arquivos → formato específico?
- Se mencionou automação → que operações?
- Se mencionou validação → quais critérios?

Camada 3 (Preferências - Opcional):
- Nome do command
- Scripts desejados
- Templates necessários
- Nível de validação

## Templates

### Template de Mensagem de Erro

Ao encontrar problemas, use:

```markdown
❌ ERRO: [O que deu errado]

**Contexto**:
- [Contexto relevante]
- [O que foi tentado]

**Razão**:
- [Por que falhou]

**Sugestão**:
- [Como corrigir]
- [Exemplo de input/estado correto]

**Próxima Ação**:
- [Passo específico para resolver]
```

## Exemplos

### Input Bom → Output

```
Input: 
"Preciso de um command que analise performance de APIs, 
extraindo métricas de logs e gerando relatório estruturado"

Output:
✅ Apresenta Perguntas de Descoberta
✅ Carrega commands de referência (analyzer.md, etc)
✅ Propõe script para parsing de logs (com justificativa)
✅ Propõe template para relatório (mostra estrutura)
✅ Cria command completo seguindo QUEST
✅ Gera artefatos de suporte
✅ Fornece relatório abrangente
```

### Input Vago → Esclarecimento

```
Input: "crie um command de teste"

Output:
"Antes de criar o command, preciso entender melhor:

1. **Tipo de teste**: Que tipo de teste este command deve fazer?
   - [ ] Testes unitários
   - [ ] Testes de integração
   - [ ] Validação de qualidade
   - [ ] Outro: _______

2. **Inputs**: O que será testado?
   - [ ] Código fonte
   - [ ] Arquivos de config
   - [ ] APIs
   - [ ] Outro: _______

3. **Outputs**: O que deve ser gerado?
   - [ ] Report de cobertura
   - [ ] Lista de falhas
   - [ ] Métricas
   - [ ] Outro: _______

Por favor, forneça mais detalhes para eu criar o command adequado."
```

## Contexto

$ARGUMENTS


