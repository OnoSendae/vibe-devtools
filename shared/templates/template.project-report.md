<!-- 
  PROPÓSITO: Template para relatório consolidado de análise de projeto
  USADO POR: analyzer.project.md
  OUTPUT: vibes/clarify/projects/project-report-[PROJECT_NAME]-[TIMESTAMP].md
-->

# Project Analysis Report: [PROJECT_NAME]

**Analyzed at**: [TIMESTAMP]
**Project Path**: [PROJECT_PATH]
**Analyzed by**: ai

---

## 📊 Executive Summary

**Project Type**: [PROJECT_TYPE]
**Domain**: [DOMAIN]
**Primary Language**: [PRIMARY_LANGUAGE]
**Status**: [STATUS]

**Quick Stats**:
- Dependencies: [N] declared, [STATUS]
- Files: [N] total ([N] source, [N] tests)
- Documentation: [PRESENT|PARTIAL|ABSENT]
- Tests: [CONFIGURED|NOT_CONFIGURED]
- Build Tools: [BUILD_TOOLS]

**Overall Assessment**: [ASSESSMENT_SUMMARY]

---

## 🎯 Project Overview

### What is this project?

[PROJECT_DESCRIPTION]

### Purpose and Goals

[PURPOSE_DESCRIPTION]

### Target Audience

[TARGET_AUDIENCE]

### Main Features

1. [FEATURE_1]
2. [FEATURE_2]
3. [FEATURE_3]
4. [FEATURE_N]

---

## 🛠️ Technology Stack

### Languages

| Language | Usage | Files |
|----------|-------|-------|
| [LANGUAGE_1] | [USAGE_1] | [N] |
| [LANGUAGE_2] | [USAGE_2] | [N] |

### Frameworks & Libraries

**Core Frameworks**:
- [FRAMEWORK_1] ([VERSION])
- [FRAMEWORK_2] ([VERSION])

**Key Libraries**:
- [LIBRARY_1] ([VERSION]) - [PURPOSE]
- [LIBRARY_2] ([VERSION]) - [PURPOSE]
- [LIBRARY_3] ([VERSION]) - [PURPOSE]

### Development Tools

- **Package Manager**: [PACKAGE_MANAGER] ([VERSION])
- **Build Tool**: [BUILD_TOOL] ([VERSION])
- **Test Framework**: [TEST_FRAMEWORK] ([VERSION])
- **Linter**: [LINTER] ([VERSION])
- **Formatter**: [FORMATTER] ([VERSION])

---

## 🏗️ Architecture

### Architecture Pattern

[ARCHITECTURE_PATTERN]

<!-- Example: Clean Architecture, MVC, Layered, Microservices, Monolith -->

### Directory Structure

```
[PROJECT_ROOT]/
├── [DIR_1]/          # [DESCRIPTION_1]
│   ├── [SUBDIR_1]/   # [DESCRIPTION]
│   └── [SUBDIR_2]/   # [DESCRIPTION]
├── [DIR_2]/          # [DESCRIPTION_2]
├── [DIR_3]/          # [DESCRIPTION_3]
└── [DIR_N]/          # [DESCRIPTION_N]
```

### Entry Points

- **Main Entry**: [MAIN_ENTRY_FILE]
- **Purpose**: [ENTRY_PURPOSE]
- **Initialization Flow**: [INIT_FLOW]

### Key Modules/Components

1. **[MODULE_1]**
   - Location: [PATH]
   - Purpose: [PURPOSE]
   - Dependencies: [DEPENDENCIES]

2. **[MODULE_2]**
   - Location: [PATH]
   - Purpose: [PURPOSE]
   - Dependencies: [DEPENDENCIES]

---

## 📦 Dependencies

### Status Summary

**Total Dependencies**: [N]
- Production: [N]
- Development: [N]

**Installation Status**: [INSTALLED|NOT_INSTALLED|PARTIAL]

**Lock Files**:
- [LOCK_FILE_1]: [PRESENT|ABSENT]
- [LOCK_FILE_2]: [PRESENT|ABSENT]

### Production Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| [DEP_1] | [VERSION] | [PURPOSE] |
| [DEP_2] | [VERSION] | [PURPOSE] |
| [DEP_3] | [VERSION] | [PURPOSE] |

### Development Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| [DEV_DEP_1] | [VERSION] | [PURPOSE] |
| [DEV_DEP_2] | [VERSION] | [PURPOSE] |

### Missing or Outdated

[LIST_MISSING_OR_OUTDATED_DEPENDENCIES]

<!-- Example:
- ⚠️ `package-name` is outdated (current: 1.0.0, latest: 2.0.0)
- ❌ `another-package` is missing
-->

---

## ⚙️ Configuration

### Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| [CONFIG_1] | [PURPOSE] | [PRESENT|ABSENT] |
| [CONFIG_2] | [PURPOSE] | [PRESENT|ABSENT] |
| [CONFIG_3] | [PURPOSE] | [PRESENT|ABSENT] |

### Environment Variables

**Required Variables** (from `.env.example` or code analysis):

- `[VAR_1]`: [DESCRIPTION]
- `[VAR_2]`: [DESCRIPTION]
- `[VAR_3]`: [DESCRIPTION]

**Status**: [CONFIGURED|NOT_CONFIGURED|PARTIAL]

### Build Configuration

**Build Tool**: [BUILD_TOOL]
**Configuration File**: [CONFIG_FILE]

**Build Targets**:
- Development: [DEV_COMMAND]
- Production: [PROD_COMMAND]

**Output Directory**: [OUTPUT_DIR]

---

## 📜 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| [SCRIPT_1] | `[COMMAND_1]` | [PURPOSE_1] |
| [SCRIPT_2] | `[COMMAND_2]` | [PURPOSE_2] |
| [SCRIPT_3] | `[COMMAND_3]` | [PURPOSE_3] |

---

## 📁 Code Structure

### File Statistics

| Category | Count |
|----------|-------|
| Total Files | [N] |
| Source Files | [N] |
| Test Files | [N] |
| Config Files | [N] |

### File Types

| Extension | Count | Usage |
|-----------|-------|-------|
| [EXT_1] | [N] | [USAGE] |
| [EXT_2] | [N] | [USAGE] |
| [EXT_3] | [N] | [USAGE] |

### Code Organization

**Structure Pattern**: [PATTERN]

<!-- Example: Domain-driven, Feature-based, Layer-based -->

**Key Directories**:
- `[DIR_1]`: [DESCRIPTION]
- `[DIR_2]`: [DESCRIPTION]
- `[DIR_3]`: [DESCRIPTION]

---

## 🧪 Quality & Tooling

### Testing

**Test Framework**: [TEST_FRAMEWORK]
**Configuration**: [CONFIG_FILE]

**Test Coverage**: [COVERAGE_INFO]

**Test Commands**:
- Run tests: `[TEST_COMMAND]`
- Coverage: `[COVERAGE_COMMAND]`

### Linting & Formatting

**Linter**: [LINTER]
- Configuration: [LINTER_CONFIG]
- Command: `[LINT_COMMAND]`

**Formatter**: [FORMATTER]
- Configuration: [FORMATTER_CONFIG]
- Command: `[FORMAT_COMMAND]`

### Type Safety

**Type System**: [TYPESCRIPT|FLOW|NONE]
**Configuration**: [TSCONFIG_OR_FLOWCONFIG]

### CI/CD

**CI Platform**: [CI_PLATFORM]
**Configuration**: [CI_CONFIG_FILE]

**Workflows**:
- [WORKFLOW_1]: [DESCRIPTION]
- [WORKFLOW_2]: [DESCRIPTION]

### Git Hooks

**Hook Manager**: [HUSKY|NONE]
**Pre-commit**: [CONFIGURED|NOT_CONFIGURED]
**Pre-push**: [CONFIGURED|NOT_CONFIGURED]

---

## 📚 Documentation Analysis

### Existing Documentation

| Document | Status | Quality |
|----------|--------|---------|
| README.md | [PRESENT|ABSENT] | [GOOD|PARTIAL|POOR] |
| CONTRIBUTING.md | [PRESENT|ABSENT] | [GOOD|PARTIAL|POOR] |
| docs/ directory | [PRESENT|ABSENT] | [GOOD|PARTIAL|POOR] |
| API docs | [PRESENT|ABSENT] | [GOOD|PARTIAL|POOR] |
| Code comments | [PRESENT|ABSENT] | [GOOD|PARTIAL|POOR] |

### Documentation Gaps

[LIST_DOCUMENTATION_GAPS]

<!-- Example:
- ❌ Setup instructions missing
- ⚠️ API documentation incomplete
- ❌ Architecture decision records absent
-->

### Documentation Quality Assessment

[ASSESSMENT]

<!-- Example:
- README exists but lacks detailed setup instructions
- Code comments are sparse
- No architecture documentation
-->

---

## ✅ To-Do List: Rodar o Projeto

### Pré-requisitos

1. [ ] Verificar ambiente: `/analyzer.pre-requirements`
2. [ ] Instalar [TOOL_1] (versão [VERSION_1])
   ```bash
   [INSTALL_COMMAND_1]
   ```
3. [ ] Instalar [TOOL_2] (versão [VERSION_2])
   ```bash
   [INSTALL_COMMAND_2]
   ```

### Setup Inicial

1. [ ] Clonar repositório
   ```bash
   git clone [REPO_URL]
   cd [PROJECT_NAME]
   ```

2. [ ] Instalar dependências
   ```bash
   [INSTALL_DEPENDENCIES_COMMAND]
   ```

3. [ ] Configurar variáveis de ambiente
   ```bash
   cp .env.example .env
   ```
   - [ ] Editar `.env` e preencher:
     * `[VAR_1]` = [DESCRIPTION]
     * `[VAR_2]` = [DESCRIPTION]
     * `[VAR_3]` = [DESCRIPTION]

4. [ ] [ADDITIONAL_SETUP_STEP]
   ```bash
   [SETUP_COMMAND]
   ```

### Build

1. [ ] Executar build
   ```bash
   [BUILD_COMMAND]
   ```

2. [ ] Validar que build completou sem erros

### Execução

1. [ ] Iniciar projeto
   ```bash
   [START_COMMAND]
   ```

2. [ ] Validar que projeto está rodando
   - [ ] [VALIDATION_STEP_1]
   - [ ] [VALIDATION_STEP_2]

### Troubleshooting (se necessário)

1. [ ] Limpar cache e rebuild
   ```bash
   [CLEAN_COMMAND]
   [BUILD_COMMAND]
   ```

2. [ ] Reinstalar dependências
   ```bash
   [CLEAN_DEPS_COMMAND]
   [INSTALL_COMMAND]
   ```

3. [ ] Verificar logs de erro
   ```bash
   [LOG_COMMAND]
   ```

4. [ ] Consultar [TROUBLESHOOTING_RESOURCE]

---

## 🚀 To-Do List: Contribuir como Dev

### Setup de Desenvolvimento

1. [ ] Configurar IDE
   - [ ] Instalar [IDE_NAME]
   - [ ] Instalar extensões recomendadas:
     * [EXTENSION_1]
     * [EXTENSION_2]
     * [EXTENSION_3]

2. [ ] Configurar Git
   ```bash
   git config user.name "[YOUR_NAME]"
   git config user.email "[YOUR_EMAIL]"
   ```

3. [ ] Instalar Git hooks (se configurado)
   ```bash
   [HOOKS_INSTALL_COMMAND]
   ```

4. [ ] Configurar linter/formatter na IDE
   - [ ] [LINTER_SETUP_STEP]
   - [ ] [FORMATTER_SETUP_STEP]

### Workflow de Desenvolvimento

1. [ ] Criar branch para feature/fix
   ```bash
   git checkout -b [BRANCH_TYPE]/[BRANCH_NAME]
   ```
   <!-- Example: feature/add-login, fix/button-crash -->

2. [ ] Fazer alterações no código
   - [ ] Seguir padrões de código do projeto
   - [ ] Adicionar/atualizar testes
   - [ ] Atualizar documentação se necessário

3. [ ] Executar testes
   ```bash
   [TEST_COMMAND]
   ```

4. [ ] Executar linter
   ```bash
   [LINT_COMMAND]
   ```

5. [ ] Executar formatter
   ```bash
   [FORMAT_COMMAND]
   ```

6. [ ] Validar build
   ```bash
   [BUILD_COMMAND]
   ```

### Commit e Push

1. [ ] Adicionar arquivos modificados
   ```bash
   git add [FILES]
   ```

2. [ ] Commit com mensagem descritiva
   ```bash
   git commit -m "[TYPE]: [DESCRIPTION]"
   ```
   <!-- Types: feat, fix, docs, style, refactor, test, chore -->

3. [ ] Push da branch
   ```bash
   git push origin [BRANCH_NAME]
   ```

### Code Review e Merge

1. [ ] Criar Pull Request
   - [ ] Preencher descrição completa
   - [ ] Linkar issues relacionadas
   - [ ] Adicionar reviewers

2. [ ] Aguardar code review
   - [ ] Responder comentários
   - [ ] Fazer alterações solicitadas

3. [ ] Merge após aprovação
   - [ ] Resolver conflitos se necessário
   - [ ] Validar CI passou

4. [ ] Deletar branch após merge
   ```bash
   git branch -d [BRANCH_NAME]
   git push origin --delete [BRANCH_NAME]
   ```

### Padrões de Código

1. [ ] Seguir convenções de nomenclatura:
   - [NAMING_CONVENTION_1]
   - [NAMING_CONVENTION_2]

2. [ ] Adicionar testes para novas features:
   - [ ] Testes unitários
   - [ ] Testes de integração (se aplicável)

3. [ ] Documentar código complexo:
   - [ ] Comentários explicativos
   - [ ] JSDoc/TSDoc (se aplicável)

4. [ ] Seguir estilo de commit:
   - [COMMIT_STYLE] (ex: Conventional Commits)

---

## 🎯 Recommended Next Steps

### Immediate Actions (Priority 1)

1. **[ACTION_1]**
   - Why: [REASON]
   - How: [STEPS]

2. **[ACTION_2]**
   - Why: [REASON]
   - How: [STEPS]

### Improvements (Priority 2)

1. **[IMPROVEMENT_1]**
   - Current State: [STATE]
   - Desired State: [DESIRED]
   - Benefit: [BENEFIT]

2. **[IMPROVEMENT_2]**
   - Current State: [STATE]
   - Desired State: [DESIRED]
   - Benefit: [BENEFIT]

### Long-term (Priority 3)

1. **[LONG_TERM_1]**
   - Description: [DESCRIPTION]
   - Impact: [IMPACT]

2. **[LONG_TERM_2]**
   - Description: [DESCRIPTION]
   - Impact: [IMPACT]

---

## 🔗 Additional Resources

- **Repository**: [REPO_URL]
- **Documentation**: [DOCS_URL]
- **Issue Tracker**: [ISSUES_URL]
- **CI/CD**: [CI_URL]
- **Project Board**: [PROJECT_BOARD_URL]

---

## 📝 Notes

[ADDITIONAL_NOTES]

<!-- Any additional observations, warnings, or context that doesn't fit above -->

---

**Generated by**: `/analyzer.project`
**Timestamp**: [TIMESTAMP]
**Version**: 1.0

