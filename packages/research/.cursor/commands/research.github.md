---
description: Pesquisar e detalhar projetos do GitHub analisando documentação e código-fonte
---

## Entrada do Usuário

```text
$ARGUMENTS
```

Você **DEVE** considerar a entrada do usuário antes de prosseguir (se não estiver vazia).

## Objetivo

Pesquisar e detalhar projetos do GitHub através de análise profunda de documentação e código-fonte. Este command acessa diretamente repositórios via URL raw do GitHub, GitHub API e web_search, extraindo informações sobre estrutura, stack tecnológica, qualidade, dependências e padrões arquiteturais, gerando relatório markdown detalhado e customizável.

A análise ocorre em dois níveis: (1) documentação geral (README, CONTRIBUTING, docs/) e (2) arquivos técnicos chave (package.json, requirements.txt, tsconfig.json, etc). O relatório adapta-se automaticamente ao tipo de projeto detectado (JavaScript, Python, Go, etc) e profundidade solicitada.

**Quando usar**: Ao precisar entender rapidamente um projeto open-source, avaliar tecnologias, estudar arquitetura de referência ou documentar dependências externas.

**Pré-requisitos**: 
- URL válida do repositório GitHub OU nome no formato owner/repo
- Template de relatório em `vibes/structure/templates/`

## Descoberta & Validação

Antes de analisar, você **DEVE** validar e esclarecer:

### Informações Obrigatórias

1. **Repositório**: Qual repositório analisar?
   - Se não fornecido: ERRO - "Especifique URL ou owner/repo"
   - Formatos aceitos:
     * URL completa: `https://github.com/facebook/react`
     * owner/repo: `facebook/react`
   - Validar que repositório é público e acessível

2. **Profundidade**: Qual nível de análise?
   - Se não fornecido: Padrão "detailed" (detalhado)
   - Opções:
     * `executive` - Visão geral (1-2 páginas)
     * `detailed` - Análise completa (múltiplas páginas)
     * `custom` - Usuário especifica seções

### Preferências Opcionais

1. **Seções Customizadas**: Quais seções incluir? (se profundidade = custom)
   - Padrão: Todas as seções
   - Opções: overview | tech-stack | structure | dependencies | quality | architecture | examples
   
2. **Formato de Output**: Apenas markdown ou JSON também?
   - Padrão: Apenas markdown
   - Override: `--json` adiciona metadata estruturado

3. **Salvar Relatório**: Onde salvar?
   - Padrão: `./memory/github/[REPO_NAME]-[TIMESTAMP].md`
   - Override: `--output [PATH]` especifica caminho customizado

## Fluxo de Execução

### Fase 1: Validar e Parsear Input

1. **Parsear Argumentos**:
   - Extrair URL ou owner/repo de $ARGUMENTS
   - Extrair flags: `--depth`, `--json`, `--output`, `--sections`
   - Validar que ao menos repositório foi fornecido

2. **Normalizar URL**:
   - SE formato owner/repo → converter para URL completa
   - SE URL completa → extrair owner e repo name
   - Remover trailing slashes, .git, etc
   
   ```javascript
   // Exemplos de normalização:
   "facebook/react" → owner: "facebook", repo: "react"
   "https://github.com/vercel/next.js/" → owner: "vercel", repo: "next.js"
   "https://github.com/microsoft/TypeScript.git" → owner: "microsoft", repo: "TypeScript"
   ```

3. **Validar Acessibilidade**:
   - Tentar acessar `https://raw.githubusercontent.com/[OWNER]/[REPO]/main/README.md`
   - SE 404 → tentar branch `master`, `develop`
   - SE ainda 404 → ERRO - "Repositório não encontrado ou não é público"
   - Identificar branch padrão para próximos acessos

### Fase 2: Análise de Documentação Geral

1. **Identificar Arquivos de Documentação**:
   - Arquivos obrigatórios a buscar:
     * README.md (ou README.rst, README.txt)
     * CONTRIBUTING.md
     * LICENSE (ou LICENSE.txt, LICENSE.md)
     * CHANGELOG.md (ou HISTORY.md, RELEASES.md)
     * CODE_OF_CONDUCT.md
     * SECURITY.md
   
   - Diretórios de documentação:
     * docs/
     * documentation/
     * wiki/ (se existir)

2. **Acessar README.md**:
   - URL: `https://raw.githubusercontent.com/[OWNER]/[REPO]/[BRANCH]/README.md`
   - Parse markdown para extrair:
     * Título do projeto
     * Descrição/tagline
     * Badges (build status, coverage, version)
     * Seções principais (Features, Installation, Usage)
     * Links importantes
     * Screenshots/demos (se houver)

3. **Acessar Documentação Adicional**:
   - Para cada arquivo da lista:
     * Tentar acessar via raw.githubusercontent.com
     * Se existir: Extrair informações relevantes
     * Se não existir: Marcar como "não disponível"
   
4. **Explorar docs/ (se existir)**:
   - Listar arquivos em docs/ via GitHub API:
     * GET `https://api.github.com/repos/[OWNER]/[REPO]/contents/docs`
   - Identificar estrutura de documentação
   - Listar principais arquivos/seções

### Fase 3: Análise de Arquivos Técnicos

1. **Detectar Stack Tecnológica**:
   
   **JavaScript/Node.js**:
   - Buscar: `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
   - Parse package.json:
     * name, version, description
     * scripts (build, test, start)
     * dependencies e devDependencies
     * engines (versão Node)
   
   **TypeScript**:
   - Buscar: `tsconfig.json`
   - Parse configurações TypeScript
   
   **Python**:
   - Buscar: `requirements.txt`, `setup.py`, `pyproject.toml`, `Pipfile`
   - Extrair dependências
   
   **Go**:
   - Buscar: `go.mod`, `go.sum`
   - Extrair módulos
   
   **Rust**:
   - Buscar: `Cargo.toml`
   - Parse metadata e dependências
   
   **Java/Kotlin**:
   - Buscar: `pom.xml`, `build.gradle`, `build.gradle.kts`
   - Extrair dependências Maven/Gradle
   
   **Ruby**:
   - Buscar: `Gemfile`, `Gemfile.lock`
   
   **PHP**:
   - Buscar: `composer.json`

2. **Analisar Configurações de Build/Tooling**:
   - CI/CD: `.github/workflows/`, `.travis.yml`, `.circleci/`, `Jenkinsfile`
   - Docker: `Dockerfile`, `docker-compose.yml`
   - Linters: `.eslintrc`, `.prettierrc`, `pylint.cfg`
   - Tests: `jest.config.js`, `vitest.config.ts`, `pytest.ini`

3. **Identificar Entry Points**:
   - JavaScript: `src/index.js`, `index.js`, `main.js`, `app.js`
   - TypeScript: `src/index.ts`, `src/main.ts`
   - Python: `__main__.py`, `setup.py`
   - Go: `main.go`
   - Rust: `src/main.rs`, `src/lib.rs`

4. **Acessar Arquivos Chave**:
   - Para cada arquivo identificado:
     * Fetch via raw.githubusercontent.com
     * Parse conteúdo (JSON, YAML, TOML conforme formato)
     * Extrair metadados relevantes
     * Identificar padrões e configurações importantes

### Fase 4: Análise de Estrutura do Projeto

1. **Obter Árvore de Diretórios** (via GitHub API):
   - GET `https://api.github.com/repos/[OWNER]/[REPO]/git/trees/[BRANCH]?recursive=1`
   - Parse resposta para listar todos arquivos/diretórios
   - Limitar a 1000 itens (limite do GitHub)

2. **Identificar Estrutura de Pastas**:
   - Diretórios principais (src/, lib/, dist/, build/, tests/, docs/)
   - Convenções detectadas:
     * Monorepo (packages/, apps/)
     * Modular (modules/, components/)
     * Feature-based (features/)
   - Profundidade da estrutura

3. **Estatísticas de Arquivos**:
   - Total de arquivos
   - Distribuição por tipo (extensões)
   - Tamanho aproximado do projeto
   - Arquivos maiores (se info disponível)

### Fase 5: Coleta de Metadados via GitHub API

1. **Informações do Repositório**:
   - GET `https://api.github.com/repos/[OWNER]/[REPO]`
   - Extrair:
     * Descrição oficial
     * Stars, forks, watchers
     * Issues abertas
     * Data de criação, último update
     * Linguagem principal
     * License
     * Topics/tags
     * Homepage URL

2. **Estatísticas de Contribuição**:
   - GET `https://api.github.com/repos/[OWNER]/[REPO]/contributors`
   - Top contributors (primeiros 10)
   - Total de contributors

3. **Releases e Versões**:
   - GET `https://api.github.com/repos/[OWNER]/[REPO]/releases/latest`
   - Última release (versão, data, changelog)
   - Cadência de releases (se múltiplas releases)

4. **Issues e PRs Recentes**:
   - GET `https://api.github.com/repos/[OWNER]/[REPO]/issues?state=open&sort=updated&per_page=5`
   - Issues mais recentes ou relevantes
   - Identificar tópicos recorrentes

### Fase 6: Análise de Qualidade e Padrões

1. **Indicadores de Qualidade**:
   - Presença de testes (test/, __tests__/, *.test.*, *.spec.*)
   - Presença de CI/CD
   - Cobertura de código (se badge no README)
   - Documentação (README completo, docs/, código comentado)
   - Licença presente
   - Contributing guidelines
   - Code of Conduct
   - Security policy

2. **Padrões de Código Detectados**:
   - Linters configurados
   - Formatters (Prettier, Black, etc)
   - Type checking (TypeScript, mypy)
   - Pre-commit hooks
   - Conventional commits (se detectável)

3. **Arquitetura e Patterns**:
   - Padrão de arquitetura (se identificável):
     * MVC, MVP, MVVM
     * Clean Architecture
     * Microservices
     * Monolithic
   - Estrutura de pastas sugere padrões
   - Dependências sugerem frameworks/abordagens

### Fase 7: Gerar Relatório Estruturado

1. **Carregar Template Apropriado**:
   - SE profundidade = executive → template simplificado
   - SE profundidade = detailed → template completo
   - SE profundidade = custom → template modular
   
   Template base: `research/templates/template.research-report.md`

2. **Preencher Seções do Relatório**:
   
   **Seção: Visão Geral** *(sempre incluir)*
   ```markdown
   # [REPO_NAME] - Análise de Projeto GitHub
   
   **Repositório**: [URL]
   **Owner**: [OWNER]
   **Analisado em**: [TIMESTAMP]
   
   ## Resumo Executivo
   
   [DESCRIÇÃO_DO_README]
   
   **Linguagem Principal**: [LANGUAGE]
   **Licença**: [LICENSE]
   **Stars**: [N] | **Forks**: [N] | **Issues Abertas**: [N]
   
   **Última Release**: [VERSION] ([DATE])
   **Última Atualização**: [DATE]
   ```
   
   **Seção: Stack Tecnológica** *(sempre incluir)*
   ```markdown
   ## Stack Tecnológica
   
   **Linguagem(ns)**: [LANGUAGES]
   **Framework(s)**: [FRAMEWORKS]
   **Runtime**: [RUNTIME] (ex: Node.js 18+)
   
   ### Dependências Principais
   
   - [DEPENDENCY_1] - [VERSÃO] - [DESCRIÇÃO]
   - [DEPENDENCY_2] - [VERSÃO] - [DESCRIÇÃO]
   ...
   
   ### DevDependencies
   
   - [DEV_DEP_1]
   - [DEV_DEP_2]
   ...
   ```
   
   **Seção: Estrutura do Projeto** *(se profundidade != executive)*
   ```markdown
   ## Estrutura do Projeto
   
   **Total de Arquivos**: [N]
   **Diretórios Principais**:
   ```
   [TREE_STRUCTURE]
   ```
   
   **Convenções Identificadas**:
   - [CONVENTION_1]
   - [CONVENTION_2]
   ```
   
   **Seção: Análise de Qualidade** *(sempre incluir)*
   ```markdown
   ## Análise de Qualidade
   
   **Indicadores de Qualidade**:
   - [✅/❌] Testes automatizados
   - [✅/❌] CI/CD configurado
   - [✅/❌] Linter/Formatter
   - [✅/❌] TypeScript/Type checking
   - [✅/❌] Documentação completa
   - [✅/❌] Contributing guidelines
   - [✅/❌] Security policy
   - [✅/❌] Licença presente
   
   **Score de Qualidade**: [X]/8 ⭐
   ```
   
   **Seção: Arquitetura** *(se profundidade = detailed)*
   ```markdown
   ## Arquitetura
   
   **Padrão Detectado**: [PATTERN_OR_UNKNOWN]
   **Entry Points**: [FILES]
   
   **Organização**:
   [DESCRIÇÃO_DA_ESTRUTURA]
   ```
   
   **Seção: Comunidade e Atividade** *(sempre incluir)*
   ```markdown
   ## Comunidade e Atividade
   
   **Contributors**: [N] total
   **Top Contributors**:
   1. [USER_1] - [N] commits
   2. [USER_2] - [N] commits
   ...
   
   **Atividade Recente**:
   - Última atualização: [DATE]
   - Commits (último mês): [N]
   - Issues abertas: [N]
   - PRs abertas: [N]
   ```
   
   **Seção: Instalação e Uso** *(se profundidade != executive)*
   ```markdown
   ## Instalação e Uso
   
   ### Instalação
   
   ```bash
   [INSTALLATION_COMMANDS_FROM_README]
   ```
   
   ### Comandos Principais
   
   ```bash
   [MAIN_SCRIPTS_FROM_PACKAGE_JSON]
   ```
   ```
   
   **Seção: Recursos e Links** *(sempre incluir)*
   ```markdown
   ## Recursos e Links
   
   - **Repositório**: [GITHUB_URL]
   - **Homepage**: [HOMEPAGE_URL]
   - **Documentação**: [DOCS_URL]
   - **Issues**: [ISSUES_URL]
   - **Releases**: [RELEASES_URL]
   
   **Topics**: [TOPIC_1], [TOPIC_2], ...
   ```

3. **Adicionar Metadata JSON** (se flag --json):
   ```json
   {
     "repository": {
       "owner": "[OWNER]",
       "name": "[REPO]",
       "url": "[URL]",
       "analyzedAt": "[ISO_TIMESTAMP]"
     },
     "metadata": {
       "stars": N,
       "forks": N,
       "language": "[LANGUAGE]",
       "license": "[LICENSE]",
       "topics": ["topic1", "topic2"]
     },
     "techStack": {
       "languages": ["lang1", "lang2"],
       "frameworks": ["framework1"],
       "dependencies": [...]
     },
     "quality": {
       "score": X,
       "hasTests": true,
       "hasCI": true,
       "hasLinter": true
     }
   }
   ```

### Fase 8: Salvar e Validar

1. **Validar Relatório Gerado**:
   - [ ] Todas as seções obrigatórias presentes
   - [ ] Nenhum placeholder [CAPS] não preenchido
   - [ ] Markdown válido
   - [ ] Links funcionais
   - [ ] Dados coerentes (sem "undefined", "null")

2. **Determinar Path de Output**:
   - SE `--output` fornecido → usar path especificado
   - SENÃO → `./memory/github/[REPO_NAME]-[TIMESTAMP].md`
   - Criar diretórios se não existirem

3. **Salvar Relatório**:
   - Escrever arquivo markdown
   - SE `--json` → salvar JSON em `[PATH].json`
   - Validar que arquivo foi criado com sucesso

4. **Salvar Metadata JSON** (sempre, interno):
   - Path: `./memory/github/[REPO_NAME]-metadata.json`
   - Contém todos os dados brutos para referência

### Fase 9: Reportar Conclusão

1. **Gerar Resumo**:
   ```markdown
   ✅ Análise do Repositório Concluída!
   
   **Repositório**: [OWNER]/[REPO]
   **URL**: [GITHUB_URL]
   
   ## Informações Principais
   
   **Linguagem**: [LANGUAGE]
   **Stars**: [N] ⭐
   **Licença**: [LICENSE]
   **Score de Qualidade**: [X]/8
   
   ## Arquivos Analisados
   
   **Documentação**:
   - ✅ README.md
   - [✅/❌] CONTRIBUTING.md
   - [✅/❌] LICENSE
   - [✅/❌] CHANGELOG.md
   
   **Arquivos Técnicos**:
   - [✅/❌] package.json
   - [✅/❌] tsconfig.json
   - [✅/❌] Dockerfile
   - [✅/❌] CI/CD configs
   
   ## Stack Identificada
   
   - [TECH_1]
   - [TECH_2]
   - [TECH_3]
   
   ## Relatório Salvo
   
   **Path**: [OUTPUT_PATH]
   **Formato**: Markdown [+ JSON se --json]
   **Tamanho**: [N] KB
   
   ## Próximos Passos
   
   1. Revisar relatório: `cat [OUTPUT_PATH]`
   2. Explorar documentação: [DOCS_URL]
   3. Clonar para análise local: `git clone [REPO_URL]`
   ```

2. **Estatísticas da Análise**:
   - Tempo de execução
   - Arquivos acessados
   - Dados coletados
   - Erros encontrados (se houver)

## Princípios Operacionais

### Padrões de Qualidade

- **Completude**: Analisar TODOS os arquivos relevantes disponíveis
- **Precisão**: Extrair dados reais, não assumir ou inventar informações
- **Adaptabilidade**: Relatório DEVE adaptar-se ao tipo de projeto detectado
- **Clareza**: Relatório DEVE ser legível e bem estruturado
- **Rastreabilidade**: SEMPRE documentar fonte de cada informação

### Tratamento de Erros

- **Se repositório não encontrado**: ERRO - "Repositório '[OWNER]/[REPO]' não encontrado ou não é público"
- **Se branch padrão não detectado**: Tentar main, master, develop (nessa ordem)
- **Se arquivo não encontrado**: Marcar como "não disponível" e continuar
- **Se GitHub API rate limit**: Avisar e continuar com dados já coletados
- **Se parse falhar**: Log erro mas não interromper análise completa
- **Se nenhum dado coletado**: ERRO - "Não foi possível coletar dados suficientes do repositório"

### Restrições

- SEMPRE validar que repositório é público antes de prosseguir
- SEMPRE tentar múltiplos branches (main, master, develop)
- SEMPRE usar raw.githubusercontent.com para arquivos de texto
- SEMPRE usar GitHub API para metadados e árvore de arquivos
- SEMPRE respeitar rate limits do GitHub API (avisar usuário se atingido)
- SEMPRE validar JSON antes de parse
- SEMPRE marcar dados não disponíveis (não inventar)
- NUNCA assumir estrutura se não detectada
- NUNCA criar informações falsas ou placeholder data
- NUNCA expor tokens ou credenciais no relatório

### Otimizações

- **Caching**: Considerar cache de dados de API (opcional, future)
- **Parallel Fetching**: Buscar múltiplos arquivos em paralelo quando possível
- **Lazy Loading**: Carregar apenas o necessário baseado em profundidade
- **Error Recovery**: Continuar análise mesmo se alguns arquivos falharem

## Templates

### template.research-report.md

**Propósito**: Template base para relatórios de análise de projetos GitHub

**Localização**: `research/templates/template.research-report.md`

**Usado para**: Output de `/research.github`

**Estrutura**:
- Visão Geral *(obrigatório)*
- Stack Tecnológica *(obrigatório)*
- Estrutura do Projeto *(opcional - se detailed)*
- Análise de Qualidade *(obrigatório)*
- Arquitetura *(opcional - se detailed)*
- Comunidade e Atividade *(obrigatório)*
- Instalação e Uso *(opcional - se detailed)*
- Recursos e Links *(obrigatório)*

## Exemplos

### Exemplo 1: URL Completa → Relatório Detalhado

```
Input: /research.github https://github.com/facebook/react

Output:
✅ Análise do Repositório Concluída!

**Repositório**: facebook/react
**URL**: https://github.com/facebook/react

## Informações Principais

**Linguagem**: JavaScript
**Stars**: 220k ⭐
**Licença**: MIT
**Score de Qualidade**: 8/8

## Arquivos Analisados

**Documentação**:
- ✅ README.md
- ✅ CONTRIBUTING.md
- ✅ LICENSE
- ✅ CHANGELOG.md

**Arquivos Técnicos**:
- ✅ package.json
- ✅ tsconfig.json
- ✅ CI/CD (.github/workflows/)

## Stack Identificada

- JavaScript (ES6+)
- Node.js 16+
- Rollup (bundler)
- Jest (testing)

## Relatório Salvo

**Path**: ./memory/github/react-2025-10-15T15-30.md
**Formato**: Markdown
**Tamanho**: 15 KB

Próximos passos: `cat ./memory/github/react-2025-10-15T15-30.md`
```

### Exemplo 2: owner/repo com Profundidade Executive

```
Input: /research.github vercel/next.js --depth executive

Output:
✅ Análise do Repositório Concluída!

**Repositório**: vercel/next.js
**URL**: https://github.com/vercel/next.js

## Informações Principais

**Linguagem**: TypeScript
**Stars**: 120k ⭐
**Licença**: MIT
**Score de Qualidade**: 8/8

Relatório executivo (2 páginas) salvo em:
./memory/github/next.js-2025-10-15T15-35.md
```

### Exemplo 3: Repositório Não Encontrado

```
Input: /research.github nonexistent/repo

Output:
❌ ERRO: Repositório não encontrado

**Repositório**: nonexistent/repo
**URL**: https://github.com/nonexistent/repo

**Contexto**:
- Tentando acessar README.md via raw.githubusercontent.com
- Branches tentados: main, master, develop

**Razão**:
- Repositório não existe ou não é público
- OU você não tem permissões para acessá-lo

**Sugestão**:
- Verifique se o nome do repositório está correto
- Verifique se o repositório é público
- Tente acessar o repositório manualmente no navegador

**Próxima Ação**:
- Use formato: owner/repo (ex: facebook/react)
- OU URL completa: https://github.com/owner/repo
```

### Exemplo 4: Análise Custom com JSON

```
Input: /research.github microsoft/TypeScript --depth custom --sections overview,tech-stack,quality --json

Output:
✅ Análise do Repositório Concluída!

**Repositório**: microsoft/TypeScript
**Seções**: Overview, Tech Stack, Quality (custom)

Arquivos salvos:
- Markdown: ./memory/github/TypeScript-2025-10-15T15-40.md
- JSON: ./memory/github/TypeScript-2025-10-15T15-40.json

Metadados JSON disponíveis para processamento automatizado.
```

## Integração

### Posição no Workflow

**Precedido por**: 
- Necessidade de entender projeto externo
- Research de tecnologias
- Avaliação de dependências

**Seguido por**: 
- `/research.analyze` (análise profunda se necessário)
- Decisão de adoção/integração
- Documentação de dependências

### Dependências

**Commands Obrigatórios**: Nenhum (standalone)

**Commands Opcionais**: 
- `/research.initialize` (se parte de pesquisa maior)
- `/research.search` (buscar projetos similares)

**Tools Necessários**:
- `web_search` (opcional - para contexto adicional)
- `read_file` (para acessar templates)

**Templates Obrigatórios**:
- `research/templates/template.research-report.md`

### Fluxo de Dados

```
[URL ou owner/repo]
       ↓
  /research.github ← VOCÊ ESTÁ AQUI
       ↓
[Análise via GitHub API + raw files]
       ↓
[Relatório markdown + JSON metadata]
       ↓
[Uso/Integração no projeto]
```

## Contexto

$ARGUMENTS

## Checklist de Qualidade

Antes de considerar a análise completa, verifique:

### Acesso e Validação
- [ ] Repositório validado (público e acessível)
- [ ] Branch padrão detectado (main/master/develop)
- [ ] README.md acessado com sucesso
- [ ] GitHub API respondeu (metadados básicos)

### Coleta de Dados
- [ ] Documentação principal analisada (README, LICENSE, etc)
- [ ] Stack tecnológica identificada (linguagem, frameworks)
- [ ] Dependências extraídas (se aplicável)
- [ ] Estrutura de projeto mapeada
- [ ] Metadados coletados (stars, forks, contributors)

### Relatório
- [ ] Template apropriado usado (executive/detailed/custom)
- [ ] Todas seções obrigatórias presentes
- [ ] Nenhum placeholder [CAPS] não preenchido
- [ ] Dados reais (não inventados ou assumidos)
- [ ] Markdown válido e bem formatado
- [ ] Links funcionais

### Output
- [ ] Relatório salvo no path correto
- [ ] JSON metadata salvo (se --json)
- [ ] Arquivo validado (existe e é legível)
- [ ] Resumo gerado e apresentado
- [ ] Próximos passos sugeridos

### Qualidade
- [ ] Score de qualidade calculado (0-8)
- [ ] Indicadores de qualidade verificados
- [ ] Arquitetura identificada (se possível)
- [ ] Comunidade e atividade documentadas
- [ ] Recursos e links completos

