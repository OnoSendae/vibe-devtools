# Constituição do @vibes/basic

**Versão**: 1.0.0  
**Ratificada em**: 2025-10-21  
**Última Emenda**: 2025-10-21  

---

## Preâmbulo

Este documento estabelece os princípios fundacionais, não-negociáveis e arquiteturais do `@vibes/basic`. Todos os commands, rules, scripts e templates DEVEM seguir estes princípios.

O `@vibes/basic` é o **meta-vibe** do ecossistema - o pacote que permite construir MAIS vibes. Como tal, tem responsabilidade especial de exemplificar excelência, consistência e clareza.

---

## Princípios Fundamentais

### I. Meta-First

**@vibes/basic DEVE ser auto-referencial e auto-construível.**

- DEVE incluir ferramentas para criar commands (maker.command)
- DEVE incluir ferramentas para criar rules (maker.rule)
- DEVE incluir ferramentas para planejar (planner.project)
- DEVE usar seus próprios makers e planners para evoluir
- DEVE servir como exemplo de excelência para outros vibes
- NUNCA DEVE depender de vibes externos para suas funções core

**Racional**: Se o `basic` não pode se construir, não pode construir outros vibes.

---

### II. Framework QUEST Obrigatório

**Todos os makers DEVEM seguir o Framework QUEST.**

Estrutura obrigatória:

1. **Q**uestion: Questionar primeiro (entender requisitos completos)
2. **U**nderstand: Entender contexto (carregar referências e padrões)
3. **E**ngineer: Engenheirar estrutura (design antes de implementação)
4. **S**olidify: Solidificar com templates (gerar artefatos consistentes)
5. **T**est: Testar e iterar (validar qualidade antes de finalizar)

- DEVE questionar ANTES de assumir
- DEVE carregar pelo menos 3 comandos de referência (fase U)
- DEVE validar contra templates universais (fase S)
- DEVE executar checklist de qualidade (fase T)
- NUNCA DEVE pular fases do QUEST
- NUNCA DEVE criar artefatos sem questionamento prévio

**Racional**: Qualidade consistente requer processo consistente.

---

### III. Templates Universais

**Template único por tipo de artefato.**

- DEVE existir UM template universal para commands: `template.commands.md`
- DEVE existir UM template universal para tasks: `template.task.md`
- TODOS os makers DEVEM usar estes templates como ÚNICA referência
- NUNCA DEVE criar variações ou templates ad-hoc
- NUNCA DEVE permitir estruturas divergentes do template

**Racional**: Consistência absoluta = predictabilidade absoluta.

---

### IV. Examples como Educação

**Examples DEVEM ensinar, não apenas demonstrar.**

Cada example DEVE conter:

- Contexto claro (por que este example existe)
- Passo-a-passo completo
- Output esperado
- Explicações inline (não apenas código)
- Conexões com outros examples (quando aplicável)
- Anti-patterns (o que NÃO fazer)

DEVE haver examples para:

- Criar commands (search, análise, research)
- Integrar commands + scripts
- Associar rules aos commands
- Casos edge e tratamento de erros

**Racional**: O basic é educacional - deve ensinar o ecossistema.

---

### V. Dependências Zero

**@vibes/basic DEVE ser completamente standalone.**

- NUNCA DEVE depender de outros vibes
- PODE depender de bibliotecas npm padrão (Node.js core)
- DEVE funcionar imediatamente após instalação
- DEVE incluir TODOS os templates necessários
- DEVE incluir TODOS os scripts necessários

**Racional**: Fundação não pode ter fundação externa.

---

### VI. Retrocompatibilidade

**Mudanças DEVEM preservar compatibilidade sempre que possível.**

- MAJOR bump (X.0.0): Apenas para breaking changes inevitáveis
- MINOR bump (x.Y.0): Novas features, mantém compatibilidade
- PATCH bump (x.y.Z): Bug fixes e melhorias menores
- DEVE documentar breaking changes explicitamente
- DEVE fornecer migration guides para MAJOR bumps
- NUNCA DEVE quebrar templates sem aviso e path de migração

**Racional**: Vibes construídos com basic não devem quebrar sem aviso.

---

### VII. Simplicidade Sobre Feature Creep

**Commands DEVEM fazer UMA coisa bem.**

- DEVE preferir múltiplos commands simples vs um complexo
- DEVE evitar flags e opções excessivas
- DEVE ter defaults sensatos (Convention over Configuration)
- DEVE documentar fluxo principal claramente
- NUNCA DEVE ter mais de 10 flags/opções por command
- NUNCA DEVE tornar simple tasks complicadas

**Racional**: Ferramentas fundacionais devem ser fáceis de usar.

---

### VIII. Validação Obrigatória

**Todos os artefatos gerados DEVEM ser validados.**

Validações obrigatórias:

- Markdown válido (syntax)
- Placeholders resolvidos (nenhum `[CAPS]` não intencional)
- Estrutura conforme template
- Frontmatter válido (YAML)
- Paths corretos
- Referências válidas

DEVE falhar loudly se validação falhar.  
NUNCA DEVE gerar artefato inválido silenciosamente.

**Racional**: Garbage in, garbage out. Prevenir é melhor que corrigir.

---

### IX. Documentação Inline

**Code DEVE ser auto-explicativo; guidance comments DEVEM educar.**

- Templates DEVEM incluir guidance comments
- Scripts DEVEM incluir comentários de propósito
- Commands DEVEM incluir seção "Quando usar"
- Examples DEVEM ter explicações inline
- NUNCA DEVE exigir documentação externa para uso básico

**Racional**: Ferramentas devem se explicar.

---

### X. Integração Opcional

**Integrações externas (Trello/Slack) DEVEM ser opcionais.**

- DEVE funcionar completamente offline
- DEVE falhar gracefully se integração indisponível
- DEVE permitir opt-out via flags
- NUNCA DEVE bloquear operação por falha de integração
- NUNCA DEVE exigir configuração externa para uso básico

**Racional**: Ferramentas fundacionais devem ser universais.

---

## Governança

### Processo de Emenda

Emendar esta constituição:

1. Propor mudança via Pull Request
2. Descrever racional e impacto
3. Atualizar versão (MAJOR se breaking)
4. Atualizar commands/templates afetados
5. Documentar migration (se MAJOR bump)

### Enforcement

- Code reviews DEVEM verificar compliance com princípios
- CI DEVE validar templates e estrutura
- Examples DEVEM refletir princípios

### Exceções

Exceções aos princípios:

- DEVEM ser documentadas explicitamente
- DEVEM incluir racional forte
- DEVEM ser temporárias quando possível
- DEVEM ter plano de regularização

---

## Versionamento

**Semântico (MAJOR.MINOR.PATCH)**

- **MAJOR**: Breaking changes (remoção de commands, mudança de templates)
- **MINOR**: Novos commands, novas features
- **PATCH**: Bug fixes, documentação, refinamentos

Toda emenda DEVE bumpar a versão apropriadamente.

---

## Referências

- Framework QUEST: Documentado em `maker.command.md`
- Template Universal: `templates/template.commands.md`
- Examples: `examples/`
- Vibe Manifest: `vibe.json`

---

**Esta constituição é a fonte de verdade para @vibes/basic.**

Em caso de conflito entre código/docs e constituição, **constituição prevalece**.

---

_Ratificada em 2025-10-21 pela Vibes Team._

