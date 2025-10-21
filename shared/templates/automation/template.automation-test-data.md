# Template: Dados de Teste

<!-- 
  PROPÓSITO: Template para gerar arquivo de dados de teste centralizados
  USADO POR: maker.automation.md
  OUTPUT: vibes/automations/domain/[feature_id]/test.data.json
-->

**Criado**: 2025-01-17
**Versão**: 1.0.0

## Estrutura do JSON

```json
{
  "metadata": {
    "featureId": "[FEATURE_ID]",
    "lastUpdated": "[ISO_8601_TIMESTAMP]",
    "note": "Dados de teste - NÃO usar dados reais em produção"
  },
  "users": {
    "[USER_TYPE]": {
      "email": "[TEST_EMAIL]",
      "password": "[TEST_PASSWORD]",
      "firstName": "[FIRST_NAME]",
      "lastName": "[LAST_NAME]",
      "phone": "[PHONE]",
      "address": {
        "street": "[STREET]",
        "city": "[CITY]",
        "state": "[STATE]",
        "zipCode": "[ZIP_CODE]",
        "country": "[COUNTRY]"
      }
    }
  },
  "scenarios": {
    "[SCENARIO_NAME]": {
      "description": "[DESCRIPTION]",
      "type": "[positive|negative|edge]",
      "input": {
        "[FIELD_NAME]": "[VALUE]"
      },
      "expected": {
        "[FIELD_NAME]": "[EXPECTED_VALUE]"
      }
    }
  },
  "products": {
    "[PRODUCT_ID]": {
      "name": "[PRODUCT_NAME]",
      "sku": "[SKU]",
      "price": "[PRICE]",
      "category": "[CATEGORY]",
      "inStock": true
    }
  },
  "forms": {
    "[FORM_NAME]": {
      "valid": {
        "[FIELD_NAME]": "[VALID_VALUE]"
      },
      "invalid": {
        "[FIELD_NAME]": "[INVALID_VALUE]",
        "expectedError": "[ERROR_MESSAGE]"
      }
    }
  },
  "fixtures": {
    "[FIXTURE_NAME]": {
      "type": "[user|product|order|etc]",
      "data": {
        "[FIELD_NAME]": "[VALUE]"
      }
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
  "note": "Dados de teste - NÃO usar dados reais em produção"
}
```

**Orientação**:
- featureId: Identificador da feature
- lastUpdated: Timestamp da última atualização
- note: Aviso importante sobre uso de dados de teste

### 2. Usuários de Teste *(obrigatório - se há autenticação)*

```json
"users": {
  "[USER_TYPE]": {
    "email": "[TEST_EMAIL]",
    "password": "[TEST_PASSWORD]",
    "firstName": "[FIRST_NAME]",
    "lastName": "[LAST_NAME]",
    "phone": "[PHONE]",
    "address": {
      "street": "[STREET]",
      "city": "[CITY]",
      "state": "[STATE]",
      "zipCode": "[ZIP_CODE]",
      "country": "[COUNTRY]"
    }
  }
}
```

**Orientação**:
- Criar usuários para diferentes cenários
- Tipos comuns: admin, regular, premium, guest
- Incluir dados completos do perfil
- Usar emails de teste (ex: test+admin@example.com)
- Senhas devem ser válidas mas não reais

**Exemplo**:
```json
"users": {
  "admin": {
    "email": "test.admin@example.com",
    "password": "Test123!@#",
    "firstName": "Admin",
    "lastName": "User",
    "phone": "+55 11 99999-9999",
    "address": {
      "street": "Rua Teste, 123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01234-567",
      "country": "Brasil"
    }
  },
  "regular": {
    "email": "test.user@example.com",
    "password": "User123!@#",
    "firstName": "Regular",
    "lastName": "User",
    "phone": "+55 11 88888-8888",
    "address": {
      "street": "Av. Example, 456",
      "city": "Rio de Janeiro",
      "state": "RJ",
      "zipCode": "20000-000",
      "country": "Brasil"
    }
  }
}
```

### 3. Cenários de Teste *(obrigatório)*

```json
"scenarios": {
  "[SCENARIO_NAME]": {
    "description": "[DESCRIPTION]",
    "type": "[positive|negative|edge]",
    "input": {
      "[FIELD_NAME]": "[VALUE]"
    },
    "expected": {
      "[FIELD_NAME]": "[EXPECTED_VALUE]"
    }
  }
}
```

**Orientação**:
- Organizar dados por cenário de teste
- Tipos: positive (sucesso), negative (erro), edge (casos limites)
- Incluir inputs e valores esperados
- Documentar descrição de cada cenário

**Exemplo**:
```json
"scenarios": {
  "loginSuccess": {
    "description": "Login com credenciais válidas",
    "type": "positive",
    "input": {
      "email": "test.user@example.com",
      "password": "User123!@#"
    },
    "expected": {
      "url": "/dashboard",
      "welcomeMessage": "Bem-vindo"
    }
  },
  "loginInvalidEmail": {
    "description": "Login com email inválido",
    "type": "negative",
    "input": {
      "email": "invalid-email",
      "password": "User123!@#"
    },
    "expected": {
      "errorMessage": "Email inválido"
    }
  },
  "loginWrongPassword": {
    "description": "Login com senha incorreta",
    "type": "negative",
    "input": {
      "email": "test.user@example.com",
      "password": "WrongPass123!"
    },
    "expected": {
      "errorMessage": "Credenciais inválidas"
    }
  }
}
```

### 4. Produtos *(opcional - incluir se há e-commerce)*

```json
"products": {
  "[PRODUCT_ID]": {
    "name": "[PRODUCT_NAME]",
    "sku": "[SKU]",
    "price": "[PRICE]",
    "category": "[CATEGORY]",
    "inStock": true
  }
}
```

**Orientação**:
- Criar produtos para testes de e-commerce
- Incluir dados completos do produto
- Variar categorias, preços, disponibilidade
- Usar SKUs fictícios mas válidos

**Exemplo**:
```json
"products": {
  "laptop": {
    "name": "Laptop Dell XPS 15",
    "sku": "DL-XPS15-001",
    "price": "8999.99",
    "category": "Electronics",
    "inStock": true
  },
  "mouse": {
    "name": "Mouse Logitech MX Master 3",
    "sku": "LG-MX3-001",
    "price": "599.99",
    "category": "Accessories",
    "inStock": true
  },
  "outOfStock": {
    "name": "Smartphone Samsung Galaxy S24",
    "sku": "SM-GS24-001",
    "price": "6999.99",
    "category": "Electronics",
    "inStock": false
  }
}
```

### 5. Dados de Formulários *(opcional - incluir se há formulários)*

```json
"forms": {
  "[FORM_NAME]": {
    "valid": {
      "[FIELD_NAME]": "[VALID_VALUE]"
    },
    "invalid": {
      "[FIELD_NAME]": "[INVALID_VALUE]",
      "expectedError": "[ERROR_MESSAGE]"
    }
  }
}
```

**Orientação**:
- Organizar dados por formulário
- Separar dados válidos e inválidos
- Incluir mensagens de erro esperadas
- Testar validações de campo

**Exemplo**:
```json
"forms": {
  "registration": {
    "valid": {
      "firstName": "João",
      "lastName": "Silva",
      "email": "joao.silva@example.com",
      "password": "SecurePass123!",
      "confirmPassword": "SecurePass123!",
      "phone": "+55 11 98765-4321",
      "birthDate": "1990-01-15"
    },
    "invalid": {
      "email": "invalid-email",
      "expectedError": "Email inválido",
      "password": "123",
      "expectedErrorPassword": "Senha deve ter no mínimo 8 caracteres",
      "phone": "123",
      "expectedErrorPhone": "Telefone inválido"
    }
  }
}
```

### 6. Fixtures *(opcional - incluir se há dados reutilizáveis)*

```json
"fixtures": {
  "[FIXTURE_NAME]": {
    "type": "[user|product|order|etc]",
    "data": {
      "[FIELD_NAME]": "[VALUE]"
    }
  }
}
```

**Orientação**:
- Criar fixtures para dados reutilizáveis
- Tipos: user, product, order, cart, etc
- Usar em múltiplos cenários
- Facilitar manutenção

**Exemplo**:
```json
"fixtures": {
  "newUser": {
    "type": "user",
    "data": {
      "firstName": "Novo",
      "lastName": "Usuário",
      "email": "novo.usuario@example.com",
      "password": "NewUser123!",
      "phone": "+55 11 99999-9999"
    }
  },
  "shoppingCart": {
    "type": "cart",
    "data": {
      "items": [
        {
          "productId": "laptop",
          "quantity": 1
        },
        {
          "productId": "mouse",
          "quantity": 2
        }
      ]
    }
  }
}
```

## Tipos de Dados

### Positive Data (Cenários de Sucesso)
- Credenciais válidas
- Dados de formulário válidos
- Produtos disponíveis
- Fluxos completos

### Negative Data (Cenários de Erro)
- Credenciais inválidas
- Dados de formulário inválidos
- Produtos esgotados
- Erros esperados

### Edge Cases (Casos Limites)
- Valores mínimos/máximos
- Strings vazias
- Caracteres especiais
- Limites de campos

## Geração de Dados Dinâmicos

Para dados que precisam ser únicos a cada execução:

```javascript
// No script de teste
const timestamp = Date.now();
const uniqueEmail = `test.${timestamp}@example.com`;
const uniqueUsername = `user_${timestamp}`;
```

**Quando usar**:
- Emails únicos
- Usernames únicos
- IDs de transação
- Timestamps

## Checklist de Qualidade

Antes de considerar o test.data.json completo:

- [ ] Metadados preenchidos (featureId, timestamp, nota)
- [ ] Usuários de teste criados (se aplicável)
- [ ] Cenários positivos documentados
- [ ] Cenários negativos documentados
- [ ] Edge cases incluídos (se aplicável)
- [ ] Produtos de teste criados (se aplicável)
- [ ] Dados de formulários válidos e inválidos (se aplicável)
- [ ] Fixtures criadas para dados reutilizáveis (se aplicável)
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Dados de teste (não dados reais)
- [ ] Documentação clara de cada cenário
- [ ] Valores esperados definidos

## Boas Práticas

### ✅ Fazer

- Usar dados de teste claramente identificáveis
- Organizar por cenário de teste
- Incluir dados válidos e inválidos
- Documentar valores esperados
- Criar fixtures para dados reutilizáveis
- Usar emails de teste (test+*@example.com)
- Variar dados por cenário

### ❌ Evitar

- Dados reais de produção
- Credenciais reais
- Dados pessoais reais
- Dados duplicados
- Dados inconsistentes
- Dados sem documentação
- Dados hardcoded no script

