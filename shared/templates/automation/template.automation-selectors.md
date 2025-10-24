# Template: Centralização de Seletores

<!-- 
  PROPÓSITO: Template para gerar arquivo de centralização de seletores CSS/XPath
  USADO POR: maker.automation.md
  OUTPUT: vibes/automations/domain/[feature_id]/selectors.json
-->

**Criado**: 2025-01-17
**Versão**: 1.0.0

## Estrutura do JSON

```json
{
  "metadata": {
    "featureId": "[FEATURE_ID]",
    "lastUpdated": "[ISO_8601_TIMESTAMP]",
    "strategy": "data-testid-first",
    "note": "Priorizar data-testid, depois IDs, depois classes específicas"
  },
  "pages": {
    "[PAGE_NAME]": {
      "url": "[PAGE_URL]",
      "elements": {
        "[ELEMENT_NAME]": {
          "selector": "[SELECTOR]",
          "type": "[css|xpath|text|role]",
          "priority": "[1|2|3]",
          "description": "[DESCRIPTION]",
          "alternatives": ["[ALTERNATIVE_1]", "[ALTERNATIVE_2]"]
        }
      }
    }
  },
  "components": {
    "[COMPONENT_NAME]": {
      "elements": {
        "[ELEMENT_NAME]": {
          "selector": "[SELECTOR]",
          "type": "[css|xpath|text|role]",
          "priority": "[1|2|3]",
          "description": "[DESCRIPTION]"
        }
      }
    }
  },
  "common": {
    "[COMMON_ELEMENT]": {
      "selector": "[SELECTOR]",
      "type": "[css|xpath|text|role]",
      "priority": "[1|2|3]",
      "description": "[DESCRIPTION]",
      "usedIn": ["[PAGE_1]", "[PAGE_2]"]
    }
  }
}
```

## Seções do Template

### 1. Metadados *(obrigatório)*

```json
"metadata": {
  "featureId": "[FEATURE_ID]",
  "lastUpdated": "[ISO_8601_TIMESTAMP]",
  "strategy": "data-testid-first",
  "note": "Priorizar data-testid, depois IDs, depois classes específicas"
}
```

**Orientação**:
- featureId: Identificador da feature
- lastUpdated: Timestamp da última atualização
- strategy: Estratégia de seleção (data-testid-first, id-first, etc)
- note: Notas sobre estratégia e boas práticas

**Estratégias de Seleção**:
1. **data-testid-first** (RECOMENDADO): Priorizar atributos data-testid
2. **id-first**: Priorizar IDs de elementos
3. **semantic-first**: Priorizar roles e atributos semânticos
4. **class-first**: Priorizar classes específicas (não genéricas)

### 2. Seletores por Página *(obrigatório)*

```json
"pages": {
  "[PAGE_NAME]": {
    "url": "[PAGE_URL]",
    "elements": {
      "[ELEMENT_NAME]": {
        "selector": "[SELECTOR]",
        "type": "[css|xpath|text|role]",
        "priority": "[1|2|3]",
        "description": "[DESCRIPTION]",
        "alternatives": ["[ALTERNATIVE_1]", "[ALTERNATIVE_2]"]
      }
    }
  }
}
```

**Orientação**:
- Agrupar seletores por página
- Usar chave descritiva para página (ex: "login", "dashboard")
- Incluir URL da página
- Para cada elemento:
  - selector: Seletor CSS/XPath/text
  - type: Tipo do seletor (css, xpath, text, role)
  - priority: Prioridade (1 = preferido, 2 = alternativo, 3 = último recurso)
  - description: Descrição do elemento
  - alternatives: Seletores alternativos (se houver)

**Exemplo**:
```json
"pages": {
  "login": {
    "url": "/login",
    "elements": {
      "emailInput": {
        "selector": "[data-testid='email-input']",
        "type": "css",
        "priority": 1,
        "description": "Campo de input de email",
        "alternatives": ["#email", ".email-input"]
      },
      "passwordInput": {
        "selector": "[data-testid='password-input']",
        "type": "css",
        "priority": 1,
        "description": "Campo de input de senha",
        "alternatives": ["#password", ".password-input"]
      },
      "submitButton": {
        "selector": "button[type='submit']",
        "type": "css",
        "priority": 1,
        "description": "Botão de submit do formulário",
        "alternatives": ["[data-testid='submit-btn']", ".submit-button"]
      },
      "errorMessage": {
        "selector": ".error-message",
        "type": "css",
        "priority": 1,
        "description": "Mensagem de erro do formulário"
      }
    }
  }
}
```

### 3. Seletores por Componente *(opcional - incluir se há componentes reutilizáveis)*

```json
"components": {
  "[COMPONENT_NAME]": {
    "elements": {
      "[ELEMENT_NAME]": {
        "selector": "[SELECTOR]",
        "type": "[css|xpath|text|role]",
        "priority": "[1|2|3]",
        "description": "[DESCRIPTION]"
      }
    }
  }
}
```

**Orientação**:
- Agrupar seletores de componentes reutilizáveis
- Exemplos: header, footer, navigation, modal, dropdown
- Mesma estrutura de elementos por página
- Usar em múltiplas páginas

**Exemplo**:
```json
"components": {
  "header": {
    "elements": {
      "logo": {
        "selector": "[data-testid='logo']",
        "type": "css",
        "priority": 1,
        "description": "Logo do site"
      },
      "userMenu": {
        "selector": "[data-testid='user-menu']",
        "type": "css",
        "priority": 1,
        "description": "Menu de usuário"
      },
      "logoutButton": {
        "selector": "[data-testid='logout-btn']",
        "type": "css",
        "priority": 1,
        "description": "Botão de logout"
      }
    }
  },
  "modal": {
    "elements": {
      "closeButton": {
        "selector": "[data-testid='modal-close']",
        "type": "css",
        "priority": 1,
        "description": "Botão de fechar modal"
      },
      "confirmButton": {
        "selector": "[data-testid='modal-confirm']",
        "type": "css",
        "priority": 1,
        "description": "Botão de confirmar no modal"
      }
    }
  }
}
```

### 4. Seletores Comuns *(opcional - incluir se há elementos usados globalmente)*

```json
"common": {
  "[COMMON_ELEMENT]": {
    "selector": "[SELECTOR]",
    "type": "[css|xpath|text|role]",
    "priority": "[1|2|3]",
    "description": "[DESCRIPTION]",
    "usedIn": ["[PAGE_1]", "[PAGE_2]"]
  }
}
```

**Orientação**:
- Elementos usados em múltiplas páginas
- Exemplos: loading spinner, toast notifications, error banners
- Incluir usedIn para documentar onde é usado

**Exemplo**:
```json
"common": {
  "loadingSpinner": {
    "selector": "[data-testid='loading-spinner']",
    "type": "css",
    "priority": 1,
    "description": "Spinner de carregamento",
    "usedIn": ["dashboard", "products", "checkout"]
  },
  "successToast": {
    "selector": "[data-testid='success-toast']",
    "type": "css",
    "priority": 1,
    "description": "Toast de sucesso",
    "usedIn": ["login", "register", "checkout"]
  },
  "errorBanner": {
    "selector": "[data-testid='error-banner']",
    "type": "css",
    "priority": 1,
    "description": "Banner de erro",
    "usedIn": ["login", "register", "checkout"]
  }
}
```

## Tipos de Seletores

### CSS Selectors *(mais comum)*

```json
{
  "selector": "[data-testid='email-input']",
  "type": "css"
}
```

**Quando usar**:
- Elementos com data-testid
- IDs únicos
- Classes específicas
- Atributos customizados

**Exemplos**:
- `[data-testid='email-input']` - Atributo data-testid
- `#email` - ID
- `.email-input` - Classe
- `input[type='email']` - Atributo type
- `form > input[type='email']` - Hierarquia

### XPath Selectors *(último recurso)*

```json
{
  "selector": "//input[@type='email']",
  "type": "xpath"
}
```

**Quando usar**:
- Seletores CSS muito complexos
- Navegação por hierarquia complexa
- Seleção por texto
- Último recurso quando CSS não funciona

**Exemplos**:
- `//input[@type='email']` - Por atributo
- `//button[contains(text(), 'Submit')]` - Por texto
- `//div[@class='container']//input` - Hierarquia

### Text Selectors *(alternativa)*

```json
{
  "selector": "Submit",
  "type": "text"
}
```

**Quando usar**:
- Botões com texto único
- Links com texto específico
- Elementos identificáveis por texto
- Usar com `page.getByText()`

**Exemplos**:
- `"Submit"` - Texto exato
- `/Submit/` - Regex

### Role Selectors *(semântico)*

```json
{
  "selector": "button",
  "type": "role"
}
```

**Quando usar**:
- Elementos semânticos (button, link, heading)
- Acessibilidade
- Usar com `page.getByRole()`

**Exemplos**:
- `"button"` - Botão
- `"link"` - Link
- `"heading"` - Heading
- `"textbox"` - Input

## Prioridades

### Priority 1 (Preferido)
- data-testid
- IDs únicos
- Roles semânticos
- Atributos específicos

### Priority 2 (Alternativo)
- Classes específicas
- Seletores CSS mais complexos
- XPath simples

### Priority 3 (Último Recurso)
- XPath complexo
- Seletores frágeis (classes genéricas)
- Seletores por posição

## Checklist de Qualidade

Antes de considerar o selectors.json completo:

- [ ] Metadados preenchidos (featureId, estratégia, nota)
- [ ] Seletores organizados por página
- [ ] Seletores de componentes documentados (se aplicável)
- [ ] Seletores comuns identificados (se aplicável)
- [ ] Cada seletor tem: selector, type, priority, description
- [ ] Alternativas documentadas para seletores frágeis
- [ ] Prioridade 1 usada para seletores preferidos
- [ ] data-testid priorizado quando disponível
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Seletores testados e funcionais
- [ ] Documentação clara de uso

## Boas Práticas

### ✅ Fazer

- Priorizar data-testid
- Usar seletores específicos
- Documentar alternativas
- Organizar por página/componente
- Atualizar quando UI muda
- Testar seletores regularmente

### ❌ Evitar

- Seletores frágeis (classes genéricas como `.btn`, `.input`)
- Seletores por posição (`.container > div:nth-child(2)`)
- IDs temporários ou dinâmicos
- XPath muito complexo
- Seletores duplicados
- Seletores não testados

