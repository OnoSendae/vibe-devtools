---
description: Execute simple research pipeline with basic search and analytical report
---

## ⚠️ DEPRECATED - Este command foi substituído

**Status**: DEPRECATED (desde 2025-01-20)

**Razão**: Este command foi consolidado no novo `research.pipeline.md` para eliminar duplicação de código e melhorar manutenibilidade.

**Novo Command Recomendado**:
```
/research.pipeline [tema] simple
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

Executa um pipeline de pesquisa simples que realiza busca básica na web, coleta referências relevantes e gera relatório analítico consolidado. Ideal para pesquisas rápidas e objetivas que precisam de resposta imediata sem profundidade excessiva.

O pipeline automatiza completamente o processo: busca, análise e geração de relatório. Não requer intervenção do usuário durante a execução, tornando-o adequado para pesquisas que precisam de resposta rápida e objetiva.

**Quando usar**: Para pesquisas rápidas, validação de conceitos, comparações simples ou quando você precisa de uma visão geral sem profundidade excessiva.

**Pré-requisitos**: Nenhum

## Fluxo de Execução

### Fase 1: Inicializar

1. **Validar Input**:
   - Extrair tema de pesquisa de `$ARGUMENTS`
   - Validar que tema não está vazio
   - Se vazio: ERRO - tema de pesquisa obrigatório

2. **Criar Estrutura de Research**:
   - Gerar research ID único: `[tema-sanitizado]-[timestamp]`
   - Criar diretório: `./memory/[research-id]/`
   - Criar subdiretórios: `references/`, `syntheses/`, `validation/`, `final-report/`
   - Inicializar `metadata.json` com estrutura básica

3. **Configurar Pipeline**:
   - Máximo de referências: 20
   - Nível de profundidade: superficial
   - Análise automática: habilitada
   - Pausas: desabilitadas

### Fase 2: Buscar Referências

1. **Executar Busca na Web**:
   - Usar `web_search` para buscar tema principal
   - Usar `web_search` para buscar variações do tema
   - Total de queries: 3-5
   - Coletar até 20 referências relevantes

2. **Extrair Dados das Referências**:
   - URL
   - Título
   - Snippet/descrição
   - Timestamp de descoberta
   - Query que encontrou a referência

3. **Salvar Referências**:
   - Adicionar ao `metadata.json`
   - Criar entrada para cada referência com ID único (REF-001, REF-002, etc.)

### Fase 3: Analisar Referências

1. **Análise Superficial**:
   - Para cada referência coletada:
     * Identificar categoria (documentação, tutorial, blog, etc.)
     * Extrair tags relevantes
     * Avaliar relevância superficial (0-10)
     * Identificar pontos-chave principais

2. **Priorizar Referências**:
   - Ordenar por relevância
   - Identificar top 5 referências mais relevantes
   - Marcar para análise mais profunda

3. **Análise Profunda das Top 5**:
   - Para cada referência priorizada:
     * Ler conteúdo completo
     * Extrair descobertas principais
     * Identificar citações relevantes
     * Avaliar confiabilidade
     * Gerar análise detalhada em `references/REF-XXX-analysis.md`

### Fase 4: Sintetizar Descobertas

1. **Criar Síntese Inicial**:
   - Consolidar descobertas das top 5 referências
   - Identificar temas comuns
   - Extrair insights principais
   - Gerar `syntheses/initial-synthesis.md`

2. **Gerar Relatório Final**:
   - **Visão Geral**: Resumo executivo da pesquisa
   - **Descobertas Principais**: Top 5 insights
   - **Referências Analisadas**: Lista com scores
   - **Conclusões**: Síntese final
   - **Próximos Passos**: Sugestões (se aplicável)
   - Salvar em `final-report/RESEARCH-REPORT.md`

### Fase 5: Validar e Reportar

1. **Validar Output**:
   - Verificar que relatório foi gerado
   - Verificar que estrutura de diretórios está completa
   - Verificar que metadata.json está atualizado

2. **Portões de Qualidade**:
   - [ ] Mínimo 10 referências coletadas
   - [ ] Top 5 referências analisadas em profundidade
   - [ ] Relatório final gerado e estruturado
   - [ ] Metadata.json completo

3. **Reportar Resultados**:
   ```markdown
   ## ✅ Pesquisa Simples Concluída

   **Research ID**: [research-id]
   **Tema**: [tema]
   **Status**: completed

   ### Resumo

   - Referências coletadas: [N]
   - Referências analisadas em profundidade: 5
   - Tempo de execução: [tempo]

   ### Descobertas Principais

   1. [Descoberta 1]
   2. [Descoberta 2]
   3. [Descoberta 3]

   ### Artefatos Criados

   - Relatório final: `./memory/[research-id]/final-report/RESEARCH-REPORT.md`
   - Metadata: `./memory/[research-id]/metadata.json`
   - Análises: `./memory/[research-id]/references/`

   ### Próximos Passos

   1. Revisar relatório final
   2. Se precisar de mais profundidade, execute `/research.deep.pipeline [tema]`
   3. Se precisar de pesquisa expert, execute `/research.expert.pipeline [tema]`
   ```

## Princípios Operacionais

### Padrões de Qualidade

- **Velocidade**: Pipeline deve completar em tempo mínimo
- **Objetividade**: Foco em respostas diretas e práticas
- **Automação**: Zero intervenção do usuário durante execução
- **Eficiência**: Priorizar quantidade controlada de referências

### Tratamento de Erros

- **Se tema vazio**: ERRO com mensagem clara + exemplo de uso
- **Se busca retornar < 5 referências**: WARNING + continuar com o que foi encontrado
- **Se análise falhar**: Continuar com referências restantes + reportar falhas
- **Se erro crítico**: Abortar + salvar progresso parcial

### Restrições

- Máximo 20 referências coletadas
- Análise profunda limitada a top 5
- Sem pausas para revisão do usuário
- Sem validação cruzada entre referências
- Sem scoring detalhado de referências

## Exemplos

### Exemplo 1: Input Bom → Output

```
Input: /research.simple.pipeline "TypeScript decorators best practices"

Output:
## ✅ Pesquisa Simples Concluída

**Research ID**: typescript-decorators-best-practices-20250116
**Tema**: TypeScript decorators best practices
**Status**: completed

### Resumo

- Referências coletadas: 18
- Referências analisadas em profundidade: 5
- Tempo de execução: ~3 minutos

### Descobertas Principais

1. Decorators são experimental feature do TypeScript
2. Padrão recomendado: usar @experimentalDecorators flag
3. Melhores práticas incluem: tipagem forte, composição, metadata
4. Frameworks como NestJS e TypeORM usam decorators extensivamente
5. Performance impact mínimo quando usado corretamente

### Artefatos Criados

- Relatório final: `./memory/typescript-decorators-best-practices-20250116/final-report/RESEARCH-REPORT.md`
- Metadata: `./memory/typescript-decorators-best-practices-20250116/metadata.json`
- Análises: `./memory/typescript-decorators-best-practices-20250116/references/`

### Próximos Passos

1. Revisar relatório final
2. Se precisar de mais profundidade, execute `/research.deep.pipeline "TypeScript decorators best practices"`
3. Se precisar de pesquisa expert, execute `/research.expert.pipeline "TypeScript decorators best practices"`
```

### Exemplo 2: Input Vazio → Erro

```
Input: /research.simple.pipeline

Output:
❌ ERRO: Tema de pesquisa obrigatório

Contexto:
- Command: research.simple.pipeline
- Argumentos fornecidos: nenhum

Razão:
- Tema de pesquisa é obrigatório para iniciar a pesquisa

Sugestão:
- Forneça o tema de pesquisa como argumento
- Exemplo: /research.simple.pipeline "seu tema aqui"

Próxima Ação:
- Execute novamente com tema de pesquisa
- Exemplo: /research.simple.pipeline "React hooks performance"
```

## Integração

### Posição no Workflow

**Precedido por**: Nenhum (ponto de entrada)

**Seguido por**: `research.deep.pipeline.md` ou `research.expert.pipeline.md` (se mais profundidade necessária)

### Dependências

**Commands Obrigatórios**: Nenhum

**Commands Opcionais**: `research.deep.pipeline.md`, `research.expert.pipeline.md`

### Fluxo de Dados

```
[User Input]
  ↓ (tema de pesquisa)
research.simple.pipeline
  ↓ (produz: relatório básico + metadata)
[User Review]
  ↓ (decisão: continuar ou não)
research.deep.pipeline (opcional)
  ↓ (produz: relatório avançado)
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
- [x] Fluxo de Execução com fases numeradas
- [x] Princípios Operacionais com standards, error handling, constraints
- [x] Exemplos com input bom e caso de erro
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

