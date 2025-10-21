---
description: Execute deep research pipeline with advanced search, task list, and multi-layer analysis
---

## ⚠️ DEPRECATED - Este command foi substituído

**Status**: DEPRECATED (desde 2025-01-20)

**Razão**: Este command foi consolidado no novo `research.pipeline.md` para eliminar duplicação de código e melhorar manutenibilidade.

**Novo Command Recomendado**:
```
/research.pipeline [tema] deep
```

**Migração**: O novo command oferece a mesma funcionalidade com melhor estrutura e manutenibilidade.

**Timeline de Remoção**: Este command será removido em 2025-04-20 (3 meses de deprecação).

**Documentação**: Veja `research.pipeline.md` para mais detalhes.

---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Executa um pipeline de pesquisa profunda que realiza busca avançada em múltiplas camadas, cria lista de tarefas estruturada e analisa referências em profundidade. Ideal para pesquisas que requerem compreensão detalhada, múltiplas perspectivas e análise rigorosa.

O pipeline opera em duas camadas: primeira busca ampla para mapear o terreno, seguida de buscas refinadas baseadas nos resultados iniciais. Inclui pausas estratégicas para revisão do usuário, permitindo ajustes de direção durante a pesquisa.

**Quando usar**: Para pesquisas complexas, análises comparativas profundas, investigações técnicas detalhadas ou quando você precisa de múltiplas perspectivas sobre um tema.

**Pré-requisitos**: Tema de pesquisa + nível de profundidade desejado + objetivos específicos + referências iniciais (opcional)

## Descoberta & Validação

Antes de prosseguir, você **DEVE** questionar o usuário para esclarecer:

**IMPORTANTE**: Todo output deste pipeline deve ser gerado em português brasileiro (PT BR).

### Informações Obrigatórias

1. **Tema de Pesquisa**: Qual o tema principal da pesquisa?
   - Se não fornecido: ERRO - tema de pesquisa obrigatório

2. **Nível de Profundidade**: Qual nível de profundidade desejado?
   - Se não fornecido: Padrão "medium"
   - Opções: shallow | medium | deep

3. **Objetivos Específicos**: Quais são os objetivos específicos desta pesquisa?
   - Se não fornecido: Inferir do tema
   - Exemplo: "Comparar frameworks X e Y", "Entender implementação de Z", etc.

### Preferências Opcionais

1. **Referências Iniciais**: Há referências específicas que devem ser incluídas?
   - Padrão: nenhuma
   - Opções: URLs, documentos, artigos

2. **Foco Específico**: Há aspectos específicos para focar?
   - Padrão: cobertura abrangente
   - Opções: performance, segurança, usabilidade, etc.

## Fluxo de Execução

### Fase 1: Inicializar

1. **Validar Inputs**:
   - Extrair tema de pesquisa de `$ARGUMENTS`
   - Extrair nível de profundidade
   - Extrair objetivos específicos
   - Extrair referências iniciais (se fornecidas)
   - Validar que tema não está vazio
   - Se vazio: ERRO - tema de pesquisa obrigatório

2. **Criar Estrutura de Research**:
   - Gerar research ID único: `[tema-sanitizado]-deep-[timestamp]`
   - Criar diretório: `./memory/[research-id]/`
   - Criar subdiretórios: `references/`, `syntheses/`, `validation/`, `final-report/`
   - Inicializar `metadata.json` com estrutura completa
   - **IMPORTANTE**: Todos os arquivos de texto devem ser gerados em PT BR

3. **Configurar Pipeline**:
   - Máximo de referências: 50
   - Nível de profundidade: conforme especificado
   - Análise automática: habilitada
   - Pausas: após fase 2 (busca inicial) e após fase 4 (análise profunda)

### Fase 2: Busca Inicial (Camada 1)

1. **Executar Busca Ampla**:
   - Usar `web_search` para buscar tema principal
   - Usar `web_search` para buscar variações do tema
   - Usar `codebase_search` para buscar no repositório (se aplicável)
   - Total de queries: 8-10
   - Coletar até 50 referências relevantes

2. **Extrair Dados das Referências**:
   - URL
   - Título
   - Snippet/descrição
   - Timestamp de descoberta
   - Query que encontrou a referência
   - Categoria inicial

3. **Salvar Referências**:
   - Adicionar ao `metadata.json`
   - Criar entrada para cada referência com ID único

4. **Criar Lista de Tarefas**:
   - Analisar referências coletadas
   - Identificar gaps de conhecimento
   - Criar lista de tarefas para próximas buscas
   - Salvar em `TASK-LIST.md`

5. **PAUSA PARA REVISÃO**:
   - Reportar resultados da busca inicial
   - Apresentar lista de tarefas propostas
   - Aguardar confirmação do usuário para prosseguir

### Fase 3: Busca Refinada (Camada 2)

1. **Executar Buscas Baseadas em Tarefas**:
   - Para cada tarefa na lista:
     * Formular query específica
     * Executar busca focada
     * Coletar referências adicionais
   - Total de queries: 5-8
   - Coletar até 30 referências adicionais

2. **Integrar Novas Referências**:
   - Adicionar ao `metadata.json`
   - Vincular referências às tarefas correspondentes
   - Atualizar lista de tarefas com status

3. **Scoring de Referências**:
   - Avaliar cada referência em dimensões:
     * Credibilidade (0-10)
     * Relevância (0-10)
     * Recência (0-10)
     * Profundidade (0-10)
     * Autoridade (0-10)
   - Calcular score total
   - Identificar top 20% para análise profunda

### Fase 4: Análise Profunda

1. **Análise Detalhada das Top Referências**:
   - Para cada referência priorizada:
     * Ler conteúdo completo
     * Extrair descobertas principais
     * Identificar citações relevantes
     * Avaliar confiabilidade e limitações
     * Gerar análise detalhada em `references/REF-XXX-analysis.md`

2. **Análise Comparativa**:
   - Comparar descobertas entre referências
   - Identificar consensos e divergências
   - Mapear relações entre conceitos
   - Gerar `syntheses/comparative-analysis.md`

3. **PAUSA PARA REVISÃO**:
   - Reportar progresso da análise
   - Apresentar descobertas principais até o momento
   - Aguardar confirmação do usuário para síntese final

### Fase 5: Síntese e Validação

1. **Criar Sínteses Incrementais**:
   - Para cada grupo de 10 referências analisadas:
     * Consolidar descobertas
     * Identificar temas comuns
     * Extrair insights principais
     * Gerar `syntheses/synthesis-XXX.md`

2. **Gerar Síntese Final**:
   - Consolidar todas as sínteses incrementais
   - Identificar descobertas principais (top 10)
   - Mapear gaps de conhecimento
   - Identificar oportunidades futuras
   - Gerar `syntheses/FINAL-SYNTHESIS.md`

3. **Validação Cruzada**:
   - Verificar consistência entre descobertas
   - Identificar contradições
   - Avaliar confiabilidade geral
   - Gerar `validation/validation-report.md`

4. **Gerar Relatório Final**:
   - **Visão Geral**: Resumo executivo da pesquisa
   - **Metodologia**: Abordagem e fontes utilizadas
   - **Descobertas Principais**: Top 10 insights com evidências
   - **Análise Comparativa**: Múltiplas perspectivas
   - **Gaps Identificados**: Limitações e áreas não cobertas
   - **Recomendações**: Próximos passos sugeridos
   - **Referências**: Lista completa com scores
   - Salvar em `final-report/FINAL-REPORT.md`
   - **IMPORTANTE**: Todo conteúdo do relatório em PT BR

### Fase 6: Output

1. **Validar Output**:
   - Verificar que relatório foi gerado
   - Verificar que estrutura de diretórios está completa
   - Verificar que metadata.json está atualizado
   - Verificar que lista de tarefas está completa

2. **Portões de Qualidade**:
   - [ ] Mínimo 30 referências coletadas
   - [ ] Top 20% referências analisadas em profundidade
   - [ ] Sínteses incrementais geradas
   - [ ] Síntese final gerada
   - [ ] Validação cruzada executada
   - [ ] Relatório final completo

3. **Reportar Resultados**:
   ```markdown
   ## ✅ Pesquisa Profunda Concluída

   **Research ID**: [research-id]
   **Tema**: [tema]
   **Status**: completed

   ### Resumo

   - Referências coletadas: [N]
   - Referências analisadas em profundidade: [M]
   - Sínteses incrementais: [K]
   - Tempo de execução: [tempo]

   ### Descobertas Principais

   1. [Descoberta 1 com evidências]
   2. [Descoberta 2 com evidências]
   3. [Descoberta 3 com evidências]
   ...

   ### Artefatos Criados

   - Relatório final: `./memory/[research-id]/final-report/FINAL-REPORT.md`
   - Síntese final: `./memory/[research-id]/syntheses/FINAL-SYNTHESIS.md`
   - Lista de tarefas: `./memory/[research-id]/TASK-LIST.md`
   - Validação: `./memory/[research-id]/validation/validation-report.md`
   - Metadata: `./memory/[research-id]/metadata.json`
   - Análises: `./memory/[research-id]/references/`

   ### Próximos Passos

   1. Revisar relatório final e síntese
   2. Revisar lista de tarefas para pesquisas futuras
   3. Se precisar de pesquisa expert, execute `/research.expert.pipeline [tema]`
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Profundidade**: Análise detalhada de múltiplas perspectivas
- **Rigor**: Validação cruzada e verificação de fontes
- **Estrutura**: Organização clara com sínteses incrementais
- **Transparência**: Documentação completa do processo
- **Idioma**: TODO output deve ser gerado em português brasileiro (PT BR)

### Tratamento de Erros

- **Se tema vazio**: ERRO com mensagem clara + exemplo de uso
- **Se busca retornar < 20 referências**: WARNING + continuar com o que foi encontrado
- **Se análise falhar**: Continuar com referências restantes + reportar falhas
- **Se pausa rejeitada**: Continuar automaticamente após 30 segundos
- **Se erro crítico**: Abortar + salvar progresso parcial

### Restrições

- Máximo 50 referências coletadas na busca inicial
- Máximo 30 referências adicionais na busca refinada
- Análise profunda limitada a top 20%
- Pausas obrigatórias após fase 2 e 4
- Validação cruzada obrigatória

## Exemplos

### Exemplo 1: Input Bom → Output

```
Input: /research.deep.pipeline "React Server Components architecture" medium "Comparar RSC com SSR tradicional e identificar trade-offs"

Output:
## ✅ Pesquisa Profunda Concluída

**Research ID**: react-server-components-architecture-deep-20250116
**Tema**: React Server Components architecture
**Nível**: medium
**Objetivos**: Comparar RSC com SSR tradicional e identificar trade-offs
**Status**: completed

### Resumo

- Referências coletadas: 47
- Referências analisadas em profundidade: 9
- Sínteses incrementais: 5
- Tempo de execução: ~15 minutos

### Descobertas Principais

1. RSC permite componentes assíncronos no servidor, reduzindo bundle size (evidência: REF-001, REF-005)
2. SSR tradicional renderiza HTML completo, RSC envia componentes serializados (evidência: REF-002, REF-007)
3. Trade-off principal: latência inicial vs. bundle size (evidência: REF-003, REF-008)
4. RSC requer React 18+ e Next.js 13+ (evidência: REF-004, REF-009)
5. Compatibilidade com client components via 'use client' directive (evidência: REF-006)

### Artefatos Criados

- Relatório final: `./memory/react-server-components-architecture-deep-20250116/final-report/FINAL-REPORT.md`
- Síntese final: `./memory/react-server-components-architecture-deep-20250116/syntheses/FINAL-SYNTHESIS.md`
- Lista de tarefas: `./memory/react-server-components-architecture-deep-20250116/TASK-LIST.md`
- Validação: `./memory/react-server-components-architecture-deep-20250116/validation/validation-report.md`
- Metadata: `./memory/react-server-components-architecture-deep-20250116/metadata.json`
- Análises: `./memory/react-server-components-architecture-deep-20250116/references/`

### Próximos Passos

1. Revisar relatório final e síntese
2. Revisar lista de tarefas para pesquisas futuras
3. Se precisar de pesquisa expert, execute `/research.expert.pipeline "React Server Components architecture"`
```

### Exemplo 2: Input Incompleto → Esclarecimento

```
Input: /research.deep.pipeline "TypeScript generics"

Output:
Antes de prosseguir, preciso esclarecer:

1. **Nível de Profundidade**: Qual nível de profundidade desejado?
   - Padrão: medium
   - Opções: shallow | medium | deep

2. **Objetivos Específicos**: Quais são os objetivos específicos desta pesquisa?
   - Exemplo: "Entender uso avançado de generics", "Comparar com templates C++", etc.

Por favor, forneça essas informações para prosseguir.
```

## Integração

### Posição no Workflow

**Precedido por**: `research.simple.pipeline.md` (opcional - pode ser entrada direta)

**Seguido por**: `research.expert.pipeline.md` (se mais profundidade necessária)

### Dependências

**Commands Obrigatórios**: Nenhum

**Commands Opcionais**: `research.simple.pipeline.md`, `research.expert.pipeline.md`

### Fluxo de Dados

```
[User Input]
  ↓ (tema + profundidade + objetivos)
research.deep.pipeline
  ↓ (PAUSA após busca inicial)
[User Review]
  ↓ (confirmação)
research.deep.pipeline (continua)
  ↓ (produz: lista de tarefas + análises)
[User Review]
  ↓ (confirmação)
research.deep.pipeline (sintetiza)
  ↓ (produz: relatório profundo + validação)
research.expert.pipeline (opcional)
  ↓ (produz: relatório expert completo)
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
- [x] Descoberta & Validação presente (inputs podem ser incertos)
- [x] Fluxo de Execução com fases numeradas
- [x] Princípios Operacionais com standards, error handling, constraints
- [x] Exemplos com input bom e caso de esclarecimento
- [x] Integração documentada
- [x] Contexto ao final
- [x] Quality Checklist presente

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
- [x] Integração com outros commands documentada

