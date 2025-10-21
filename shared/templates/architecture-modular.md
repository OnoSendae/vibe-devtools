# Guia de Arquitetura Modular

## 📋 Visão Geral

Este documento define a arquitetura padrão para todos os módulos do sistema, baseada em **Clean Architecture**, **SOLID principles** e **Domain-Driven Design (DDD)**. Cada módulo deve seguir esta estrutura para garantir manutenibilidade, testabilidade e escalabilidade.

## 🎯 Princípios Fundamentais

### 1. Separação de Responsabilidades
Cada camada tem uma responsabilidade única e bem definida.

### 2. Inversão de Dependências
Camadas externas dependem de abstrações das camadas internas, nunca o contrário.

### 3. Testabilidade
Toda lógica de negócio deve ser testável independentemente de frameworks ou infraestrutura.

### 4. Configurabilidade
Comportamentos devem ser configuráveis sem alterar código.

### 5. Extensibilidade
Novas funcionalidades devem ser adicionadas sem modificar código existente (Open/Closed Principle).

---

## 📁 Estrutura de Diretórios

```
module-name/
├── src/
│   ├── domain/                    # Camada de Domínio (Business Rules)
│   │   ├── entities/              # Entidades de negócio
│   │   ├── value-objects/         # Objetos de valor
│   │   ├── errors/                # Erros de domínio
│   │   └── validators/            # Validadores de negócio
│   │
│   ├── application/               # Camada de Aplicação (Use Cases)
│   │   ├── services/              # Serviços de aplicação
│   │   ├── use-cases/             # Casos de uso específicos
│   │   └── ports/                 # Interfaces/Contratos
│   │       ├── repositories/      # Interfaces de repositórios
│   │       ├── formatters/        # Interfaces de formatadores
│   │       ├── providers/         # Interfaces de provedores
│   │       └── logger.js          # Interface de logger
│   │
│   ├── infrastructure/            # Camada de Infraestrutura
│   │   ├── repositories/          # Implementações de repositórios
│   │   ├── formatters/            # Implementações de formatadores
│   │   ├── providers/             # Implementações de provedores
│   │   ├── logger/                # Implementação de logger
│   │   ├── database/              # Conexões e configs de DB
│   │   ├── cache/                 # Cache (Redis, Memory, etc)
│   │   ├── http/                  # Clientes HTTP
│   │   └── platform/              # Utilitários específicos de plataforma
│   │
│   ├── presentation/              # Camada de Apresentação
│   │   ├── cli/                   # Interface CLI
│   │   ├── api/                   # REST API (se aplicável)
│   │   ├── controllers/           # Controllers
│   │   └── middleware/            # Middlewares
│   │
│   ├── config/                    # Configurações
│   │   ├── config.js              # Configuração principal
│   │   └── schemas.js             # Schemas de validação (Zod)
│   │
│   └── index.js                   # Entry point
│
├── tests/
│   ├── unit/                      # Testes unitários
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── integration/               # Testes de integração
│   └── e2e/                       # Testes end-to-end
│   └── fixtures/                  # Dados de teste
│   └── helpers/                   # Helpers de teste
│
├── .env.example                   # Template de variáveis de ambiente
├── package.json
└── README.md
```

---

## 🏗️ Camadas da Arquitetura

### 1️⃣ Domain Layer (Núcleo do Negócio)

**Responsabilidade:** Contém as regras de negócio puras, independentes de frameworks ou infraestrutura.

**Características:**
- ✅ Sem dependências externas
- ✅ Apenas lógica de negócio
- ✅ Altamente testável
- ✅ Reutilizável

#### 📄 Entities (Entidades)

Objetos que representam conceitos do domínio com identidade única.

```javascript
export class ChatSession {
  constructor({ id, workspaceId, messages, createdAt, updatedAt }) {
    this.id = id;
    this.workspaceId = workspaceId;
    this.messages = messages || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  addMessage(message) {
    this.messages.push(message);
    this.updatedAt = new Date();
  }

  getMessageCount() {
    return this.messages.length;
  }

  isRecent(daysThreshold = 7) {
    const daysDiff = (Date.now() - this.createdAt) / (1000 * 60 * 60 * 24);
    return daysDiff <= daysThreshold;
  }
}
```

#### 📄 Value Objects (Objetos de Valor)

Objetos imutáveis que representam valores sem identidade única.

```javascript
export class ChatMessage {
  constructor({ role, content, timestamp }) {
    this.role = role;
    this.content = content;
    this.timestamp = timestamp || new Date();
    Object.freeze(this);
  }

  isFromUser() {
    return this.role === 'user';
  }

  isFromAssistant() {
    return this.role === 'assistant';
  }
}
```

#### 📄 Domain Errors

Erros específicos do domínio que representam violações de regras de negócio.

```javascript
export class DomainError extends Error {
  constructor(message, metadata = {}) {
    super(message);
    this.name = this.constructor.name;
    this.metadata = metadata;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidSessionError extends DomainError {
  constructor(message, metadata) {
    super(message, metadata);
  }
}

export class SessionNotFoundError extends DomainError {
  constructor(sessionId) {
    super('Session not found', { sessionId });
  }
}
```

#### 📄 Validators

Validadores de regras de negócio.

```javascript
import { z } from 'zod';

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1),
  timestamp: z.date().optional()
});

export const chatSessionSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string(),
  messages: z.array(chatMessageSchema),
  createdAt: z.date(),
  updatedAt: z.date()
});

export function validateChatMessage(data) {
  return chatMessageSchema.parse(data);
}

export function validateChatSession(data) {
  return chatSessionSchema.parse(data);
}
```

---

### 2️⃣ Application Layer (Casos de Uso)

**Responsabilidade:** Orquestra a lógica de aplicação usando as regras do domínio.

**Características:**
- ✅ Coordena entidades do domínio
- ✅ Define interfaces (ports)
- ✅ Implementa casos de uso
- ✅ Independente de frameworks

#### 📄 Ports (Interfaces)

Contratos que definem como a aplicação se comunica com o mundo externo.

```javascript
export class SessionRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByWorkspace(workspaceId) {
    throw new Error('Method not implemented');
  }

  async save(session) {
    throw new Error('Method not implemented');
  }
}

export class Formatter {
  format(data) {
    throw new Error('Method not implemented');
  }
}

export class Logger {
  info(message, metadata) {
    throw new Error('Method not implemented');
  }

  error(message, metadata) {
    throw new Error('Method not implemented');
  }

  warn(message, metadata) {
    throw new Error('Method not implemented');
  }

  debug(message, metadata) {
    throw new Error('Method not implemented');
  }
}
```

#### 📄 Services

Serviços de aplicação que implementam a lógica de negócio complexa.

```javascript
export class SessionReaderService {
  constructor({ sessionRepository, formatter, logger }) {
    this.sessionRepository = sessionRepository;
    this.formatter = formatter;
    this.logger = logger;
  }

  async readAllSessions(options = {}) {
    this.logger.info('Reading all sessions', options);

    try {
      const sessions = await this.sessionRepository.findAll();
      
      const filtered = this.filterSessions(sessions, options);
      const sorted = this.sortSessions(filtered, options);
      const formatted = this.formatter.format(sorted);

      this.logger.info('Sessions read successfully', { 
        count: sorted.length 
      });

      return formatted;
    } catch (error) {
      this.logger.error('Failed to read sessions', { error });
      throw error;
    }
  }

  async searchInSessions(keyword, options = {}) {
    this.logger.info('Searching sessions', { keyword, options });

    const sessions = await this.sessionRepository.findAll();
    const matches = sessions.filter(session =>
      session.messages.some(msg =>
        msg.content.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    return this.formatter.format(matches);
  }

  filterSessions(sessions, { startDate, endDate, workspaceId } = {}) {
    return sessions.filter(session => {
      if (startDate && session.createdAt < startDate) return false;
      if (endDate && session.createdAt > endDate) return false;
      if (workspaceId && session.workspaceId !== workspaceId) return false;
      return true;
    });
  }

  sortSessions(sessions, { sortBy = 'createdAt', order = 'desc' } = {}) {
    return sessions.sort((a, b) => {
      const compareValue = order === 'asc' ? 1 : -1;
      return (a[sortBy] > b[sortBy] ? 1 : -1) * compareValue;
    });
  }
}
```

#### 📄 Use Cases

Casos de uso específicos que representam ações do sistema.

```javascript
export class GetSessionByIdUseCase {
  constructor({ sessionRepository, logger }) {
    this.sessionRepository = sessionRepository;
    this.logger = logger;
  }

  async execute(sessionId) {
    this.logger.debug('Getting session by id', { sessionId });

    if (!sessionId) {
      throw new InvalidSessionError('Session ID is required');
    }

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundError(sessionId);
    }

    this.logger.debug('Session found', { sessionId });
    return session;
  }
}

export class ExportSessionsUseCase {
  constructor({ sessionRepository, formatter, fileWriter, logger }) {
    this.sessionRepository = sessionRepository;
    this.formatter = formatter;
    this.fileWriter = fileWriter;
    this.logger = logger;
  }

  async execute(outputPath, options = {}) {
    this.logger.info('Exporting sessions', { outputPath, options });

    const sessions = await this.sessionRepository.findAll();
    const formatted = this.formatter.format(sessions);
    
    await this.fileWriter.write(outputPath, formatted);

    this.logger.info('Sessions exported successfully', { 
      outputPath,
      count: sessions.length 
    });

    return { outputPath, count: sessions.length };
  }
}
```

---

### 3️⃣ Infrastructure Layer (Implementações)

**Responsabilidade:** Implementações concretas de ports, integração com frameworks e ferramentas.

**Características:**
- ✅ Implementa interfaces definidas em Application
- ✅ Integra com bibliotecas externas
- ✅ Lida com I/O (file system, database, API)
- ✅ Específico de plataforma

#### 📄 Repositories

Implementações concretas de acesso aos dados.

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import { SessionRepository } from '../../application/ports/repositories/session-repository.js';
import { ChatSession } from '../../domain/entities/chat-session.js';

export class VSCodeSessionRepository extends SessionRepository {
  constructor({ pathResolver, logger }) {
    super();
    this.pathResolver = pathResolver;
    this.logger = logger;
  }

  async findAll() {
    const sessionPaths = await this.pathResolver.getAllSessionPaths();
    const sessions = [];

    for (const sessionPath of sessionPaths) {
      try {
        const session = await this.loadSession(sessionPath);
        sessions.push(session);
      } catch (error) {
        this.logger.warn('Failed to load session', { sessionPath, error });
      }
    }

    return sessions;
  }

  async findById(id) {
    const sessionPath = await this.pathResolver.getSessionPath(id);
    return this.loadSession(sessionPath);
  }

  async findByWorkspace(workspaceId) {
    const sessions = await this.findAll();
    return sessions.filter(s => s.workspaceId === workspaceId);
  }

  async loadSession(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return new ChatSession(data);
  }

  async save(session) {
    const filePath = await this.pathResolver.getSessionPath(session.id);
    await fs.writeFile(filePath, JSON.stringify(session, null, 2));
  }
}
```

#### 📄 Formatters

Implementações de formatação de dados.

```javascript
import { Formatter } from '../../application/ports/formatter.js';

export class ConsoleFormatter extends Formatter {
  format(sessions) {
    const lines = [];
    
    for (const session of sessions) {
      lines.push(this.formatSessionHeader(session));
      
      for (const message of session.messages) {
        lines.push(this.formatMessage(message));
      }
      
      lines.push(this.formatSessionFooter());
    }
    
    return lines.join('\n');
  }

  formatSessionHeader(session) {
    return [
      '\n' + '='.repeat(80),
      `📝 Session: ${session.id}`,
      `📁 Workspace: ${session.workspaceId}`,
      `📅 Created: ${session.createdAt.toISOString()}`,
      '='.repeat(80)
    ].join('\n');
  }

  formatMessage(message) {
    const icon = message.isFromUser() ? '👤' : '🤖';
    const role = message.role.toUpperCase();
    return `\n${icon} ${role}:\n${message.content}`;
  }

  formatSessionFooter() {
    return '-'.repeat(80);
  }
}

export class JsonFormatter extends Formatter {
  format(sessions) {
    return JSON.stringify(sessions, null, 2);
  }
}

export class MarkdownFormatter extends Formatter {
  format(sessions) {
    const lines = [];
    
    for (const session of sessions) {
      lines.push(`# Session: ${session.id}`);
      lines.push(`**Workspace:** ${session.workspaceId}`);
      lines.push(`**Created:** ${session.createdAt.toISOString()}`);
      lines.push('');
      
      for (const message of session.messages) {
        const role = message.isFromUser() ? 'User' : 'Assistant';
        lines.push(`## ${role}`);
        lines.push(message.content);
        lines.push('');
      }
      
      lines.push('---');
      lines.push('');
    }
    
    return lines.join('\n');
  }
}
```

#### 📄 Platform

Utilitários específicos de plataforma.

```javascript
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

export class VSCodePathResolver {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
  }

  getVSCodeUserDataPath() {
    switch (os.platform()) {
      case 'win32':
        return path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User');
      case 'darwin':
        return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User');
      case 'linux':
        return path.join(os.homedir(), '.config', 'Code', 'User');
      default:
        throw new Error(`Unsupported platform: ${os.platform()}`);
    }
  }

  getWorkspaceStoragePath() {
    return path.join(this.getVSCodeUserDataPath(), 'workspaceStorage');
  }

  getChatSessionsPath(workspaceId) {
    return path.join(
      this.getWorkspaceStoragePath(),
      workspaceId,
      'ms-vscode.copilot-chat',
      'chatSessions'
    );
  }

  async getAllSessionPaths() {
    const workspaceStorage = this.getWorkspaceStoragePath();
    const workspaces = await fs.readdir(workspaceStorage);
    const sessionPaths = [];

    for (const workspace of workspaces) {
      const chatPath = this.getChatSessionsPath(workspace);
      
      try {
        const files = await fs.readdir(chatPath);
        const jsonFiles = files
          .filter(f => f.endsWith('.json'))
          .map(f => path.join(chatPath, f));
        
        sessionPaths.push(...jsonFiles);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          this.logger.warn('Failed to read workspace', { workspace, error });
        }
      }
    }

    return sessionPaths;
  }

  async getSessionPath(sessionId) {
    const allPaths = await this.getAllSessionPaths();
    return allPaths.find(p => p.includes(sessionId));
  }
}
```

#### 📄 Logger

Implementação de logging estruturado.

```javascript
import pino from 'pino';
import { Logger } from '../../application/ports/logger.js';

export class PinoLogger extends Logger {
  constructor(options = {}) {
    super();
    this.logger = pino({
      level: options.level || 'info',
      transport: options.pretty ? {
        target: 'pino-pretty',
        options: { 
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      } : undefined
    });
  }

  info(message, metadata = {}) {
    this.logger.info(metadata, message);
  }

  error(message, metadata = {}) {
    this.logger.error(metadata, message);
  }

  warn(message, metadata = {}) {
    this.logger.warn(metadata, message);
  }

  debug(message, metadata = {}) {
    this.logger.debug(metadata, message);
  }
}
```

---

### 4️⃣ Presentation Layer (Interface)

**Responsabilidade:** Interface com o usuário (CLI, API, etc).

**Características:**
- ✅ Recebe inputs do usuário
- ✅ Valida argumentos
- ✅ Chama use cases
- ✅ Apresenta resultados

#### 📄 CLI

Interface de linha de comando.

```javascript
import { Command } from 'commander';

export class CLI {
  constructor({ sessionService, exportUseCase, logger }) {
    this.sessionService = sessionService;
    this.exportUseCase = exportUseCase;
    this.logger = logger;
    this.program = new Command();
  }

  setup() {
    this.program
      .name('session-reader')
      .description('Read and manage VS Code chat sessions')
      .version('1.0.0');

    this.program
      .command('list')
      .description('List all chat sessions')
      .option('-w, --workspace <id>', 'Filter by workspace')
      .option('-s, --sort <field>', 'Sort by field', 'createdAt')
      .option('-o, --order <asc|desc>', 'Sort order', 'desc')
      .action(async (options) => {
        try {
          const result = await this.sessionService.readAllSessions(options);
          console.log(result);
        } catch (error) {
          this.logger.error('Failed to list sessions', { error });
          process.exit(1);
        }
      });

    this.program
      .command('search <keyword>')
      .description('Search in sessions')
      .action(async (keyword, options) => {
        try {
          const result = await this.sessionService.searchInSessions(keyword, options);
          console.log(result);
        } catch (error) {
          this.logger.error('Failed to search sessions', { error });
          process.exit(1);
        }
      });

    this.program
      .command('export <output>')
      .description('Export sessions to file')
      .option('-f, --format <json|md>', 'Output format', 'json')
      .action(async (output, options) => {
        try {
          const result = await this.exportUseCase.execute(output, options);
          console.log(`✅ Exported ${result.count} sessions to ${result.outputPath}`);
        } catch (error) {
          this.logger.error('Failed to export sessions', { error });
          process.exit(1);
        }
      });
  }

  async run(args) {
    await this.program.parseAsync(args);
  }
}
```

---

### 5️⃣ Config Layer (Configuração)

**Responsabilidade:** Gerenciar configurações da aplicação.

#### 📄 Config

```javascript
import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_PRETTY: z.coerce.boolean().default(true),
  VSCODE_PATH: z.string().optional(),
  OUTPUT_FORMAT: z.enum(['console', 'json', 'markdown']).default('console')
});

export const config = configSchema.parse(process.env);

export function validateConfig() {
  try {
    configSchema.parse(process.env);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      errors: error.errors.map(e => ({ 
        path: e.path.join('.'), 
        message: e.message 
      }))
    };
  }
}
```

---

### 6️⃣ Entry Point (Index)

**Responsabilidade:** Composição de dependências (Dependency Injection Container).

```javascript
import { config } from './config/config.js';
import { PinoLogger } from './infrastructure/logger/pino-logger.js';
import { VSCodePathResolver } from './infrastructure/platform/vscode-path-resolver.js';
import { VSCodeSessionRepository } from './infrastructure/repositories/vscode-session-repository.js';
import { ConsoleFormatter } from './infrastructure/formatters/console-formatter.js';
import { JsonFormatter } from './infrastructure/formatters/json-formatter.js';
import { MarkdownFormatter } from './infrastructure/formatters/markdown-formatter.js';
import { SessionReaderService } from './application/services/session-reader-service.js';
import { GetSessionByIdUseCase } from './application/use-cases/get-session-by-id.js';
import { ExportSessionsUseCase } from './application/use-cases/export-sessions.js';
import { CLI } from './presentation/cli/cli.js';

function createContainer() {
  const logger = new PinoLogger({
    level: config.LOG_LEVEL,
    pretty: config.LOG_PRETTY
  });

  const pathResolver = new VSCodePathResolver({ config, logger });

  const sessionRepository = new VSCodeSessionRepository({
    pathResolver,
    logger
  });

  const formatters = {
    console: new ConsoleFormatter(),
    json: new JsonFormatter(),
    markdown: new MarkdownFormatter()
  };

  const formatter = formatters[config.OUTPUT_FORMAT];

  const sessionService = new SessionReaderService({
    sessionRepository,
    formatter,
    logger
  });

  const getSessionByIdUseCase = new GetSessionByIdUseCase({
    sessionRepository,
    logger
  });

  const exportUseCase = new ExportSessionsUseCase({
    sessionRepository,
    formatter,
    fileWriter: { write: async (path, content) => {} },
    logger
  });

  return {
    logger,
    sessionService,
    getSessionByIdUseCase,
    exportUseCase,
    cli: new CLI({
      sessionService,
      exportUseCase,
      logger
    })
  };
}

export async function main(args = process.argv) {
  const container = createContainer();
  
  try {
    await container.cli.setup();
    await container.cli.run(args);
  } catch (error) {
    container.logger.error('Application failed', { error });
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
```

---

## 🧪 Testing Strategy

### Unit Tests

Testam componentes isoladamente com mocks.

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SessionReaderService } from '../../../src/application/services/session-reader-service.js';

describe('SessionReaderService', () => {
  let service;
  let mockRepository;
  let mockFormatter;
  let mockLogger;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn()
    };
    mockFormatter = {
      format: vi.fn(data => JSON.stringify(data))
    };
    mockLogger = {
      info: vi.fn(),
      error: vi.fn()
    };

    service = new SessionReaderService({
      sessionRepository: mockRepository,
      formatter: mockFormatter,
      logger: mockLogger
    });
  });

  it('should read all sessions', async () => {
    const mockSessions = [
      { id: '1', messages: [] },
      { id: '2', messages: [] }
    ];
    mockRepository.findAll.mockResolvedValue(mockSessions);

    const result = await service.readAllSessions();

    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(mockFormatter.format).toHaveBeenCalledWith(mockSessions);
    expect(result).toBe(JSON.stringify(mockSessions));
  });

  it('should filter sessions by workspace', async () => {
    const sessions = [
      { id: '1', workspaceId: 'ws1', messages: [] },
      { id: '2', workspaceId: 'ws2', messages: [] }
    ];
    mockRepository.findAll.mockResolvedValue(sessions);

    await service.readAllSessions({ workspaceId: 'ws1' });

    expect(mockFormatter.format).toHaveBeenCalledWith([sessions[0]]);
  });
});
```

### Integration Tests

Testam integração entre componentes reais.

```javascript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTestContainer } from '../helpers/test-container.js';

describe('Session Reading Integration', () => {
  let container;

  beforeAll(async () => {
    container = await createTestContainer();
  });

  afterAll(async () => {
    await container.cleanup();
  });

  it('should read sessions from file system', async () => {
    const sessions = await container.sessionService.readAllSessions();
    
    expect(sessions).toBeDefined();
    expect(Array.isArray(sessions)).toBe(true);
  });
});
```

---

## 📦 Package.json Configuration

```json
{
  "name": "module-name",
  "version": "1.0.0",
  "type": "module",
  "description": "Module description",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  },
  "dependencies": {
    "zod": "^3.22.0",
    "dotenv": "^16.3.0",
    "pino": "^8.16.0",
    "pino-pretty": "^10.2.0",
    "commander": "^11.1.0"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 📝 Design Patterns Aplicados

### 1. Repository Pattern
Abstração de acesso aos dados, permitindo trocar fonte sem afetar lógica.

### 2. Strategy Pattern
Múltiplas implementações de formatadores, loggers, etc.

### 3. Dependency Injection
Inversão de controle através de injeção no construtor.

### 4. Factory Pattern
Criação de objetos complexos (container de dependências).

### 5. Use Case Pattern
Cada ação do sistema é um caso de uso isolado.

### 6. Port & Adapter (Hexagonal Architecture)
Portas definem interfaces, adapters implementam.

---

## 🎯 Checklist de Qualidade

Antes de considerar um módulo completo, verifique:

- [ ] Todas as camadas estão implementadas
- [ ] Dependências injetadas via construtor
- [ ] Nenhuma dependência circular
- [ ] Configurações externalizadas em .env
- [ ] Erros customizados para domínio
- [ ] Logging estruturado implementado
- [ ] Validação de inputs com Zod
- [ ] Cobertura de testes > 80%
- [ ] Testes unitários para lógica de negócio
- [ ] Testes de integração para I/O
- [ ] README com instruções claras
- [ ] JSDoc para documentação de tipos
- [ ] ESM modules (import/export)
- [ ] Async/await consistentemente
- [ ] Error handling robusto
- [ ] Multiplataforma (Windows/Mac/Linux)

---

## 🚀 Benefícios desta Arquitetura

### ✅ Manutenibilidade
Código organizado e fácil de encontrar.

### ✅ Testabilidade
Lógica isolada e mockável.

### ✅ Escalabilidade
Adicione features sem quebrar existentes.

### ✅ Flexibilidade
Troque implementações sem afetar lógica.

### ✅ Reusabilidade
Componentes podem ser reutilizados.

### ✅ Documentação
Estrutura auto-explicativa.

### ✅ Onboarding
Novos devs entendem rapidamente.

---

## 📚 Referências

- Clean Architecture (Robert C. Martin)
- Domain-Driven Design (Eric Evans)
- SOLID Principles
- Hexagonal Architecture (Ports & Adapters)
- Test-Driven Development (TDD)

---

**Versão:** 1.0.0  
**Data:** 2025-10-11  
**Autor:** React Native Agentic Updater Team

