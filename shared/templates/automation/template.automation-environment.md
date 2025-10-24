# Template: Configuração de Ambiente

<!-- 
  PROPÓSITO: Template para gerar arquivo de configuração de ambiente e metadados
  USADO POR: maker.automation.md
  OUTPUT: vibes/automations/domain/[feature_id]/environment.json
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
    "tags": ["[TAG1]", "[TAG2]"],
    "priority": "[LOW|MEDIUM|HIGH|CRITICAL]"
  },
  "environment": {
    "baseUrl": "[BASE_URL]",
    "apiUrl": "[API_URL]",
    "timeout": 30000,
    "retries": 2,
    "headless": false,
    "browsers": ["chromium", "firefox", "webkit"],
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  },
  "urls": {
    "[PAGE_NAME]": "[FULL_URL]",
    "[PAGE_NAME_2]": "[FULL_URL_2]"
  },
  "endpoints": {
    "[ENDPOINT_NAME]": {
      "method": "[GET|POST|PUT|DELETE]",
      "path": "[PATH]",
      "headers": {
        "[HEADER_NAME]": "[HEADER_VALUE]"
      }
    }
  },
  "credentials": {
    "[USER_TYPE]": {
      "username": "[USERNAME_REFERENCE]",
      "password": "[PASSWORD_REFERENCE]",
      "note": "Usar variáveis de ambiente: USERNAME_[TYPE], PASSWORD_[TYPE]"
    }
  },
  "schemas": {
    "[SCHEMA_NAME]": {
      "type": "object",
      "properties": {
        "[PROPERTY_NAME]": {
          "type": "[string|number|boolean|object|array]",
          "required": true,
          "description": "[DESCRIPTION]"
        }
      }
    }
  },
  "validations": {
    "[VALIDATION_NAME]": {
      "type": "[ELEMENT_VISIBLE|TEXT_MATCH|URL_MATCH|COUNT]",
      "selector": "[SELECTOR]",
      "expectedValue": "[EXPECTED_VALUE]",
      "timeout": 5000
    }
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
  "tags": ["[TAG1]", "[TAG2]"],
  "priority": "[LOW|MEDIUM|HIGH|CRITICAL]"
}
```

**Orientação**:
- featureId: Identificador único da feature (ex: "login-flow")
- featureName: Nome legível da feature (ex: "Login Flow")
- description: Descrição breve do que a automação faz
- version: Versão semântica (começar com 1.0.0)
- createdAt: Timestamp ISO 8601 (ex: "2025-01-17T10:30:00Z")
- createdBy: Nome do autor
- tags: Tags para categorização (ex: ["auth", "critical", "e2e"])
- priority: Prioridade da automação

### 2. Configuração de Ambiente *(obrigatório)*

```json
"environment": {
  "baseUrl": "[BASE_URL]",
  "apiUrl": "[API_URL]",
  "timeout": 30000,
  "retries": 2,
  "headless": false,
  "browsers": ["chromium", "firefox", "webkit"],
  "viewport": {
    "width": 1920,
    "height": 1080
  }
}
```

**Orientação**:
- baseUrl: URL base da aplicação (ex: "https://app.example.com")
- apiUrl: URL base da API (ex: "https://api.example.com/v1")
- timeout: Timeout padrão em ms (30000 = 30s)
- retries: Número de tentativas em caso de falha
- headless: Executar sem UI (false para debug)
- browsers: Lista de navegadores para testar
- viewport: Resolução da viewport

### 3. URLs *(obrigatório)*

```json
"urls": {
  "[PAGE_NAME]": "[FULL_URL]",
  "[PAGE_NAME_2]": "[FULL_URL_2]"
}
```

**Orientação**:
- Criar entrada para cada página/rota
- Usar chave descritiva (ex: "login", "dashboard", "checkout")
- URL completa ou relativa à baseUrl
- Exemplo:
  ```json
  "urls": {
    "login": "/login",
    "dashboard": "/dashboard",
    "checkout": "/checkout"
  }
  ```

### 4. Endpoints *(opcional - incluir se há integração com API)*

```json
"endpoints": {
  "[ENDPOINT_NAME]": {
    "method": "[GET|POST|PUT|DELETE]",
    "path": "[PATH]",
    "headers": {
      "[HEADER_NAME]": "[HEADER_VALUE]"
    }
  }
}
```

**Orientação**:
- Documentar endpoints de API usados
- Incluir método HTTP
- Incluir path completo
- Incluir headers necessários
- Exemplo:
  ```json
  "endpoints": {
    "login": {
      "method": "POST",
      "path": "/api/auth/login",
      "headers": {
        "Content-Type": "application/json"
      }
    }
  }
  ```

### 5. Credenciais *(obrigatório - referências, não valores)*

```json
"credentials": {
  "[USER_TYPE]": {
    "username": "[USERNAME_REFERENCE]",
    "password": "[PASSWORD_REFERENCE]",
    "note": "Usar variáveis de ambiente: USERNAME_[TYPE], PASSWORD_[TYPE]"
  }
}
```

**Orientação**:
- NUNCA incluir credenciais reais no JSON
- Usar referências a variáveis de ambiente
- Documentar como obter credenciais
- Exemplo:
  ```json
  "credentials": {
    "admin": {
      "username": "process.env.ADMIN_USERNAME",
      "password": "process.env.ADMIN_PASSWORD",
      "note": "Configurar variáveis ADMIN_USERNAME e ADMIN_PASSWORD"
    },
    "user": {
      "username": "process.env.USER_USERNAME",
      "password": "process.env.USER_PASSWORD",
      "note": "Configurar variáveis USER_USERNAME e USER_PASSWORD"
    }
  }
  ```

### 6. Schemas *(opcional - incluir se há validação de dados)*

```json
"schemas": {
  "[SCHEMA_NAME]": {
    "type": "object",
    "properties": {
      "[PROPERTY_NAME]": {
        "type": "[string|number|boolean|object|array]",
        "required": true,
        "description": "[DESCRIPTION]"
      }
    }
  }
}
```

**Orientação**:
- Definir schemas para validação de dados
- Usar formato JSON Schema
- Documentar tipos e validações
- Exemplo:
  ```json
  "schemas": {
    "user": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "required": true,
          "description": "Email do usuário"
        },
        "password": {
          "type": "string",
          "required": true,
          "minLength": 8,
          "description": "Senha do usuário (mínimo 8 caracteres)"
        }
      }
    }
  }
  ```

### 7. Validações *(opcional - incluir se há validações customizadas)*

```json
"validations": {
  "[VALIDATION_NAME]": {
    "type": "[ELEMENT_VISIBLE|TEXT_MATCH|URL_MATCH|COUNT]",
    "selector": "[SELECTOR]",
    "expectedValue": "[EXPECTED_VALUE]",
    "timeout": 5000
  }
}
```

**Orientação**:
- Definir validações reutilizáveis
- Tipos comuns: ELEMENT_VISIBLE, TEXT_MATCH, URL_MATCH, COUNT
- Incluir selector e valor esperado
- Configurar timeout específico
- Exemplo:
  ```json
  "validations": {
    "loginSuccess": {
      "type": "URL_MATCH",
      "selector": null,
      "expectedValue": "/dashboard",
      "timeout": 5000
    },
    "errorMessage": {
      "type": "TEXT_MATCH",
      "selector": ".error-message",
      "expectedValue": "Credenciais inválidas",
      "timeout": 3000
    }
  }
  ```

## Checklist de Qualidade

Antes de considerar o environment.json completo:

- [ ] Metadados preenchidos (featureId, nome, descrição, etc)
- [ ] Configuração de ambiente definida (URLs, timeouts, browsers)
- [ ] URLs de todas as páginas documentadas
- [ ] Endpoints de API documentados (se aplicável)
- [ ] Credenciais como referências (não valores reais)
- [ ] Schemas de validação definidos (se aplicável)
- [ ] Validações customizadas documentadas (se aplicável)
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Valores de exemplo substituídos por valores reais
- [ ] Documentação clara de uso
- [ ] Sem informações sensíveis expostas

