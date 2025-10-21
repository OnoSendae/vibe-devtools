# Template de Estrutura de Projeto MCP

<!-- 
  PROPÓSITO: Template para scaffold de projetos de servidores MCP em TypeScript
  USADO POR: planner.mcp-resources.md
  OUTPUT: ./[project-name]/ (estrutura de diretórios e arquivos)
  VERSÃO: 1.0
-->

**Criado**: 2025-01-16
**Versão**: 1.0

## Estrutura de Diretórios

```
[PROJECT_NAME]/
├── src/
│   ├── index.ts                    # Entry point do servidor
│   ├── server.ts                   # Configuração e inicialização do servidor MCP
│   ├── resources/                  # Resource providers
│   │   ├── index.ts                # Export de todos os resources
│   │   └── example-resource.ts     # Exemplo de resource provider
│   ├── tools/                      # Tool providers
│   │   ├── index.ts                # Export de todas as tools
│   │   └── example-tool.ts         # Exemplo de tool provider
│   ├── prompts/                    # Prompt templates (opcional)
│   │   ├── index.ts
│   │   └── example-prompt.ts
│   ├── types/                      # Definições de tipos TypeScript
│   │   └── index.ts
│   ├── utils/                      # Funções utilitárias
│   │   ├── index.ts
│   │   └── logger.ts
│   └── config/                     # Configurações
│       └── index.ts
├── tests/
│   ├── unit/                       # Testes unitários
│   │   ├── resources/
│   │   │   └── example-resource.test.ts
│   │   └── tools/
│   │       └── example-tool.test.ts
│   └── integration/                # Testes de integração
│       └── server.test.ts
├── config/
│   └── default.json                # Configuração padrão
├── docs/
│   ├── README.md                   # Documentação principal
│   ├── API.md                      # Documentação da API (se aplicável)
│   └── EXAMPLES.md                 # Exemplos de uso
├── .env.example                    # Template de variáveis de ambiente
├── .gitignore                      # Padrões de arquivos ignorados pelo Git
├── .eslintrc.json                  # Configuração do ESLint
├── .prettierrc                     # Configuração do Prettier
├── package.json                    # Dependências e scripts
├── tsconfig.json                   # Configuração do TypeScript
└── README.md                       # Documentação do projeto
```

## Arquivos de Configuração

### package.json

```json
{
  "name": "[PROJECT_NAME]",
  "version": "0.1.0",
  "description": "[PROJECT_DESCRIPTION]",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest",
    "test:unit": "vitest run tests/unit",
    "test:integration": "vitest run tests/integration",
    "test:watch": "vitest watch",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "server",
    "[KEYWORDS]"
  ],
  "author": "[YOUR_NAME]",
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3",
    "vitest": "^1.1.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    "outDir": "./dist",
    "rootDir": "./src",
    
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests", "**/*.test.ts"]
}
```

### .env.example

```bash
# MCP Server Configuration
MCP_SERVER_NAME=[PROJECT_NAME]
MCP_SERVER_VERSION=0.1.0

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# [ADDITIONAL_ENV_VARIABLES]
# API_KEY=your-api-key-here
# DATABASE_URL=your-database-url-here
```

### .gitignore

```
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build output
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.temp/
```

### .eslintrc.json

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  "env": {
    "node": true,
    "es2022": true
  }
}
```

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## Código Base

### src/index.ts

```typescript
#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { createLogger } from './utils/logger.js';
import { initializeServer } from './server.js';

const logger = createLogger('index');

async function main() {
  const server = new Server(
    {
      name: process.env.MCP_SERVER_NAME || '[PROJECT_NAME]',
      version: process.env.MCP_SERVER_VERSION || '0.1.0',
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  await initializeServer(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('MCP server started successfully');
}

main().catch((error) => {
  logger.error('Failed to start MCP server', { error });
  process.exit(1);
});
```

### src/server.ts

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { createLogger } from './utils/logger.js';
import * as resources from './resources/index.js';
import * as tools from './tools/index.js';

const logger = createLogger('server');

export async function initializeServer(server: Server): Promise<void> {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    logger.info('Listing resources');
    return resources.listResources();
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    logger.info('Reading resource', { uri: request.params.uri });
    return resources.readResource(request.params.uri);
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.info('Listing tools');
    return tools.listTools();
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    logger.info('Calling tool', { name: request.params.name });
    return tools.callTool(request.params.name, request.params.arguments);
  });

  logger.info('Server initialized successfully');
}
```

### src/types/index.ts

```typescript
export interface ServerConfig {
  name: string;
  version: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  [key: string]: unknown;
}

export interface ResourceMetadata {
  name: string;
  description: string;
  uri: string;
  mimeType: string;
}

export interface ToolMetadata {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export type ToolArguments = Record<string, unknown>;
```

### src/utils/logger.ts

```typescript
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

export function createLogger(module: string) {
  const logLevel = (process.env.LOG_LEVEL || 'info') as LogLevel;
  
  const levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  const currentLevel = levels[logLevel];

  function log(level: LogLevel, message: string, context?: LogContext) {
    if (levels[level] >= currentLevel) {
      const timestamp = new Date().toISOString();
      const logMessage = JSON.stringify({
        timestamp,
        level,
        module,
        message,
        ...context,
      });
      
      console.log(logMessage);
    }
  }

  return {
    debug: (message: string, context?: LogContext) => log('debug', message, context),
    info: (message: string, context?: LogContext) => log('info', message, context),
    warn: (message: string, context?: LogContext) => log('warn', message, context),
    error: (message: string, context?: LogContext) => log('error', message, context),
  };
}
```

### src/resources/index.ts

```typescript
import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { ResourceMetadata } from '../types/index.js';
import { exampleResource } from './example-resource.js';

export async function listResources(): Promise<Resource[]> {
  return [
    {
      uri: 'example://resource',
      name: 'Example Resource',
      description: 'An example resource',
      mimeType: 'application/json',
    },
  ];
}

export async function readResource(uri: string): Promise<Resource> {
  if (uri === 'example://resource') {
    return exampleResource();
  }
  
  throw new Error(`Resource not found: ${uri}`);
}
```

### src/resources/example-resource.ts

```typescript
import { Resource } from '@modelcontextprotocol/sdk/types.js';

export function exampleResource(): Resource {
  return {
    uri: 'example://resource',
    name: 'Example Resource',
    description: 'An example resource demonstrating the structure',
    mimeType: 'application/json',
    text: JSON.stringify({
      message: 'Hello from MCP server!',
      timestamp: new Date().toISOString(),
      data: {
        example: true,
        count: 42,
      },
    }, null, 2),
  };
}
```

### src/tools/index.ts

```typescript
import { Tool, TextContent } from '@modelcontextprotocol/sdk/types.js';
import { ToolArguments } from '../types/index.js';
import { exampleTool } from './example-tool.js';

export async function listTools(): Promise<Tool[]> {
  return [
    {
      name: 'example_tool',
      description: 'An example tool that demonstrates the structure',
      inputSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The message to process',
          },
        },
        required: ['message'],
      },
    },
  ];
}

export async function callTool(
  name: string,
  args: ToolArguments
): Promise<TextContent[]> {
  if (name === 'example_tool') {
    return exampleTool(args);
  }
  
  throw new Error(`Tool not found: ${name}`);
}
```

### src/tools/example-tool.ts

```typescript
import { TextContent } from '@modelcontextprotocol/sdk/types.js';
import { ToolArguments } from '../types/index.js';

export function exampleTool(args: ToolArguments): TextContent[] {
  const message = args.message as string;
  
  return [
    {
      type: 'text',
      text: JSON.stringify({
        success: true,
        message: `Processed: ${message}`,
        timestamp: new Date().toISOString(),
        input: args,
      }, null, 2),
    },
  ];
}
```

## Testes

### tests/unit/resources/example-resource.test.ts

```typescript
import { describe, it, expect } from 'vitest';
import { exampleResource } from '../../../src/resources/example-resource.js';

describe('exampleResource', () => {
  it('should return a valid resource', () => {
    const resource = exampleResource();
    
    expect(resource).toBeDefined();
    expect(resource.uri).toBe('example://resource');
    expect(resource.name).toBe('Example Resource');
    expect(resource.mimeType).toBe('application/json');
    expect(resource.text).toBeDefined();
  });

  it('should return JSON content', () => {
    const resource = exampleResource();
    const data = JSON.parse(resource.text || '{}');
    
    expect(data.message).toBe('Hello from MCP server!');
    expect(data.timestamp).toBeDefined();
    expect(data.data).toBeDefined();
  });
});
```

### tests/unit/tools/example-tool.test.ts

```typescript
import { describe, it, expect } from 'vitest';
import { exampleTool } from '../../../src/tools/example-tool.js';

describe('exampleTool', () => {
  it('should process a message', () => {
    const result = exampleTool({ message: 'test' });
    
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('text');
    
    const data = JSON.parse(result[0].text);
    expect(data.success).toBe(true);
    expect(data.message).toContain('test');
  });

  it('should include timestamp', () => {
    const result = exampleTool({ message: 'test' });
    const data = JSON.parse(result[0].text);
    
    expect(data.timestamp).toBeDefined();
    expect(new Date(data.timestamp).getTime()).toBeGreaterThan(0);
  });
});
```

## Documentação

### README.md

```markdown
# [PROJECT_NAME]

[PROJECT_DESCRIPTION]

## Features

- [FEATURE_1]
- [FEATURE_2]
- [FEATURE_3]

## Installation

\`\`\`bash
npm install
\`\`\`

## Configuration

Copy \`.env.example\` to \`.env\` and configure your environment variables:

\`\`\`bash
cp .env.example .env
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

## Building

\`\`\`bash
npm run build
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Usage

[USAGE_INSTRUCTIONS]

## License

MIT
```

## Checklist de Qualidade

Antes de considerar este template completo, verifique:

### Estrutura
- [x] Diretórios obrigatórios definidos (src/, tests/, config/, docs/)
- [x] Arquivos de configuração essenciais incluídos
- [x] Código base funcional fornecido
- [x] Exemplos de resources e tools incluídos

### Configuração
- [x] package.json com scripts e dependências
- [x] tsconfig.json com strict mode
- [x] .env.example com variáveis de ambiente
- [x] .gitignore com padrões apropriados
- [x] .eslintrc.json e .prettierrc configurados

### Código
- [x] Entry point (index.ts) funcional
- [x] Server initialization (server.ts) completa
- [x] Logger utility implementado
- [x] Type definitions claras
- [x] Exemplos de resources e tools funcionais

### Testes
- [x] Estrutura de testes definida
- [x] Exemplo de teste unitário fornecido
- [x] Configuração de Vitest incluída

### Documentação
- [x] README.md com instruções básicas
- [x] Comandos de desenvolvimento documentados
- [x] Estrutura de projeto explicada

---

## Metadados do Template

**Versão**: 1.0.0
**Criado**: 2025-01-16
**Mantido Por**: planner.mcp-resources.md

**Changelog**:
- 1.0.0 (2025-01-16): Template inicial para scaffold de projetos MCP em TypeScript
