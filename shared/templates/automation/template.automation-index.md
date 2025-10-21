# Template: Index da Feature

<!-- 
  PROPÓSITO: Template para gerar arquivo index.json centralizado com toda a estrutura da feature
  USADO POR: maker.automation.md
  OUTPUT: vibes/automations/domain/[feature_id]/index.json
-->

**Criado**: 2025-01-17
**Versão**: 1.0.0

## Estrutura do JSON

```json
{
  "metadata": {
    "featureId": "[FEATURE_ID]",
    "featureName": "[FEATURE_NAME]",
    "description": "[DESCRIPTION]",
    "version": "1.0.0",
    "createdAt": "[ISO_8601_TIMESTAMP]",
    "createdBy": "[AUTHOR]",
    "lastUpdated": "[ISO_8601_TIMESTAMP]",
    "tags": ["[TAG1]", "[TAG2]"],
    "priority": "[LOW|MEDIUM|HIGH|CRITICAL]",
    "status": "[draft|active|deprecated]"
  },
  "structure": {
    "basePath": "vibes/automations/domain/[FEATURE_ID]",
    "files": {
      "script": "script.[nome].js",
      "environment": "environment.json",
      "testData": "test.data.json",
      "selectors": "selectors.json",
      "index": "index.json"
    },
    "directories": {
      "pageObjects": "page-objects/",
      "fixtures": "fixtures/",
      "utils": "utils/"
    }
  },
  "dependencies": {
    "commons": {
      "components": ["[COMPONENT_1]", "[COMPONENT_2]"],
      "helpers": ["[HELPER_1]", "[HELPER_2]"]
    },
    "external": ["[LIBRARY_1]", "[LIBRARY_2]"]
  },
  "testSuites": [
    {
      "id": "[SUITE_ID]",
      "name": "[SUITE_NAME]",
      "description": "[DESCRIPTION]",
      "file": "script.[nome].js",
      "scenarios": [
        {
          "id": "[SCENARIO_ID]",
          "name": "[SCENARIO_NAME]",
          "type": "[positive|negative|edge]",
          "description": "[DESCRIPTION]",
          "steps": [
            {
              "action": "[ACTION]",
              "target": "[TARGET]",
              "data": "[DATA_REFERENCE]",
              "expected": "[EXPECTED_RESULT]"
            }
          ]
        }
      ]
    }
  ],
  "pages": {
    "[PAGE_NAME]": {
      "url": "[PAGE_URL]",
      "elements": ["[ELEMENT_1]", "[ELEMENT_2]"],
      "actions": ["[ACTION_1]", "[ACTION_2]"],
      "validations": ["[VALIDATION_1]", "[VALIDATION_2]"]
    }
  },
  "data": {
    "testData": {
      "file": "test.data.json",
      "users": ["[USER_TYPE_1]", "[USER_TYPE_2]"],
      "scenarios": ["[SCENARIO_1]", "[SCENARIO_2]"],
      "products": ["[PRODUCT_1]", "[PRODUCT_2]"]
    },
    "fixtures": {
      "file": "fixtures/",
      "items": ["[FIXTURE_1]", "[FIXTURE_2]"]
    }
  },
  "selectors": {
    "file": "selectors.json",
    "strategy": "data-testid-first",
    "pages": ["[PAGE_1]", "[PAGE_2]"],
    "components": ["[COMPONENT_1]", "[COMPONENT_2]"],
    "common": ["[COMMON_1]", "[COMMON_2]"]
  },
  "environment": {
    "file": "environment.json",
    "baseUrl": "[BASE_URL]",
    "browsers": ["[BROWSER_1]", "[BROWSER_2]"],
    "timeout": 30000,
    "headless": false
  },
  "execution": {
    "command": "npx playwright test vibes/automations/domain/[FEATURE_ID]/script.[nome].js",
    "options": {
      "headed": "--headed",
      "debug": "--debug",
      "ui": "--ui",
      "trace": "--trace on"
    },
    "reporting": {
      "html": true,
      "json": true,
      "screenshots": true,
      "videos": true
    }
  },
  "documentation": {
    "readme": "README.md",
    "changelog": "CHANGELOG.md",
    "examples": "examples/"
  }
}
```

## Seções do Template

### 1. Metadados *(obrigatório)*

```json
"metadata": {
  "featureId": "[FEATURE_ID]",
  "featureName": "[FEATURE_NAME]",
  "description": "[DESCRIPTION]",
  "version": "1.0.0",
  "createdAt": "[ISO_8601_TIMESTAMP]",
  "createdBy": "[AUTHOR]",
  "lastUpdated": "[ISO_8601_TIMESTAMP]",
  "tags": ["[TAG1]", "[TAG2]"],
  "priority": "[LOW|MEDIUM|HIGH|CRITICAL]",
  "status": "[draft|active|deprecated]"
}
```

**Orientação**:
- featureId: Identificador único (ex: "login-flow")
- featureName: Nome legível (ex: "Login Flow")
- description: Descrição breve do que a automação faz
- version: Versão semântica (começar com 1.0.0)
- createdAt: Timestamp ISO 8601 de criação
- createdBy: Nome do autor
- lastUpdated: Timestamp da última atualização
- tags: Tags para categorização (ex: ["auth", "critical", "e2e"])
- priority: Prioridade da automação
- status: Status atual (draft, active, deprecated)

### 2. Estrutura de Arquivos *(obrigatório)*

```json
"structure": {
  "basePath": "vibes/automations/domain/[FEATURE_ID]",
  "files": {
    "script": "script.[nome].js",
    "environment": "environment.json",
    "testData": "test.data.json",
    "selectors": "selectors.json",
    "index": "index.json"
  },
  "directories": {
    "pageObjects": "page-objects/",
    "fixtures": "fixtures/",
    "utils": "utils/"
  }
}
```

**Orientação**:
- basePath: Caminho base da feature
- files: Mapeamento de arquivos principais
- directories: Diretórios adicionais (se houver)

### 3. Dependências *(obrigatório)*

```json
"dependencies": {
  "commons": {
    "components": ["[COMPONENT_1]", "[COMPONENT_2]"],
    "helpers": ["[HELPER_1]", "[HELPER_2]"]
  },
  "external": ["[LIBRARY_1]", "[LIBRARY_2]"]
}
```

**Orientação**:
- commons: Componentes e helpers reutilizados de commons/
- external: Bibliotecas externas necessárias

### 4. Test Suites *(obrigatório)*

```json
"testSuites": [
  {
    "id": "[SUITE_ID]",
    "name": "[SUITE_NAME]",
    "description": "[DESCRIPTION]",
    "file": "script.[nome].js",
    "scenarios": [
      {
        "id": "[SCENARIO_ID]",
        "name": "[SCENARIO_NAME]",
        "type": "[positive|negative|edge]",
        "description": "[DESCRIPTION]",
        "steps": [
          {
            "action": "[ACTION]",
            "target": "[TARGET]",
            "data": "[DATA_REFERENCE]",
            "expected": "[EXPECTED_RESULT]"
          }
        ]
      }
    ]
  }
]
```

**Orientação**:
- Documentar todas as suites de teste
- Cada suite tem cenários
- Cada cenário tem steps detalhados
- Tipos: positive (sucesso), negative (erro), edge (casos limites)

### 5. Páginas *(obrigatório)*

```json
"pages": {
  "[PAGE_NAME]": {
    "url": "[PAGE_URL]",
    "elements": ["[ELEMENT_1]", "[ELEMENT_2]"],
    "actions": ["[ACTION_1]", "[ACTION_2]"],
    "validations": ["[VALIDATION_1]", "[VALIDATION_2]"]
  }
}
```

**Orientação**:
- Mapear todas as páginas usadas
- Listar elementos principais
- Listar ações disponíveis
- Listar validações realizadas

### 6. Dados *(obrigatório)*

```json
"data": {
  "testData": {
    "file": "test.data.json",
    "users": ["[USER_TYPE_1]", "[USER_TYPE_2]"],
    "scenarios": ["[SCENARIO_1]", "[SCENARIO_2]"],
    "products": ["[PRODUCT_1]", "[PRODUCT_2]"]
  },
  "fixtures": {
    "file": "fixtures/",
    "items": ["[FIXTURE_1]", "[FIXTURE_2]"]
  }
}
```

**Orientação**:
- Referenciar arquivo de dados de teste
- Listar tipos de usuários disponíveis
- Listar cenários de teste
- Listar produtos (se aplicável)
- Listar fixtures (se aplicável)

### 7. Seletores *(obrigatório)*

```json
"selectors": {
  "file": "selectors.json",
  "strategy": "data-testid-first",
  "pages": ["[PAGE_1]", "[PAGE_2]"],
  "components": ["[COMPONENT_1]", "[COMPONENT_2]"],
  "common": ["[COMMON_1]", "[COMMON_2]"]
}
```

**Orientação**:
- Referenciar arquivo de seletores
- Documentar estratégia de seleção
- Listar páginas com seletores
- Listar componentes com seletores
- Listar elementos comuns

### 8. Ambiente *(obrigatório)*

```json
"environment": {
  "file": "environment.json",
  "baseUrl": "[BASE_URL]",
  "browsers": ["[BROWSER_1]", "[BROWSER_2]"],
  "timeout": 30000,
  "headless": false
}
```

**Orientação**:
- Referenciar arquivo de ambiente
- Documentar configurações principais
- Listar navegadores suportados

### 9. Execução *(obrigatório)*

```json
"execution": {
  "command": "npx playwright test vibes/automations/domain/[FEATURE_ID]/script.[nome].js",
  "options": {
    "headed": "--headed",
    "debug": "--debug",
    "ui": "--ui",
    "trace": "--trace on"
  },
  "reporting": {
    "html": true,
    "json": true,
    "screenshots": true,
    "videos": true
  }
}
```

**Orientação**:
- Comando base de execução
- Opções de execução disponíveis
- Tipos de relatórios gerados

### 10. Documentação *(opcional)*

```json
"documentation": {
  "readme": "README.md",
  "changelog": "CHANGELOG.md",
  "examples": "examples/"
}
```

**Orientação**:
- Referenciar arquivos de documentação
- README principal
- CHANGELOG de versões
- Exemplos de uso

## Checklist de Qualidade

Antes de considerar o index.json completo:

- [ ] Metadados preenchidos (featureId, nome, descrição, etc)
- [ ] Estrutura de arquivos documentada
- [ ] Dependências listadas (commons e external)
- [ ] Test suites documentadas com cenários
- [ ] Páginas mapeadas com elementos e ações
- [ ] Dados referenciados (testData, fixtures)
- [ ] Seletores referenciados
- [ ] Ambiente configurado
- [ ] Comandos de execução documentados
- [ ] Documentação referenciada
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Todas as referências de arquivos corretas
- [ ] Hierarquia completa documentada

## Benefícios

### Centralização
- Toda a informação da feature em um único arquivo
- Fácil de localizar e navegar
- Reduz fragmentação de documentação

### Programabilidade
- Fácil de parsear com scripts
- Permite automação de tarefas
- Facilita geração de relatórios

### Manutenibilidade
- Atualização em um único lugar
- Menos arquivos para manter
- Menos risco de inconsistência

### Navegação
- Hierarquia completa visível
- Dependências claras
- Estrutura de arquivos explícita

