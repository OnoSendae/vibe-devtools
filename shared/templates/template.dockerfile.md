# Template de Dockerfile

<!-- 
  PROPÓSITO: Template base para gerar Dockerfiles otimizados
  USADO POR: maker.dockerize.md
  OUTPUT: Dockerfile na raiz do projeto
  VERSÃO: 1.0
-->

**Criado**: $DATE
**Versão**: 1.0

---

## Estrutura Base

```dockerfile
# [PROJECT_TYPE] Dockerfile
# Multi-stage build otimizado para [ENVIRONMENT]

# ============================================================================
# STAGE 1: Dependencies
# ============================================================================
FROM [BASE_IMAGE] AS dependencies

LABEL stage="dependencies"

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    [SYSTEM_DEPS] \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências
COPY [DEPS_FILES] ./

# Instalar dependências do projeto
RUN [INSTALL_CMD]

# ============================================================================
# STAGE 2: Build
# ============================================================================
FROM [BASE_IMAGE] AS build

LABEL stage="build"

WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=dependencies /app/node_modules ./node_modules

# Copiar código fonte
COPY [SOURCE_FILES] ./

# Executar build
RUN [BUILD_CMD]

# ============================================================================
# STAGE 3: Production
# ============================================================================
FROM [PROD_BASE_IMAGE] AS production

LABEL stage="production"

# Criar usuário não-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copiar apenas arquivos necessários do build
COPY --from=build /app/[BUILD_OUTPUT] ./

# Copiar node_modules de produção (se aplicável)
COPY --from=dependencies /app/node_modules ./node_modules

# Definir permissões
RUN chown -R appuser:appuser /app

# Mudar para usuário não-root
USER appuser

# Expor porta
EXPOSE [PORT]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD [HEALTH_CMD]

# Comando de inicialização
CMD [START_CMD]
```

---

## Templates por Tipo de Projeto

### Node.js (Express/API)

```dockerfile
FROM node:18-alpine AS dependencies

LABEL stage="dependencies"

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

FROM node:18-alpine AS build

LABEL stage="build"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS production

LABEL stage="production"

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --chown=nodejs:nodejs package*.json ./

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

CMD ["node", "dist/index.js"]
```

### Python (FastAPI/Django)

```dockerfile
FROM python:3.11-slim AS dependencies

LABEL stage="dependencies"

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim AS production

LABEL stage="production"

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY --from=dependencies /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=dependencies /usr/local/bin /usr/local/bin

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python healthcheck.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### React/Next.js (Frontend)

```dockerfile
FROM node:18-alpine AS dependencies

LABEL stage="dependencies"

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:18-alpine AS build

LABEL stage="build"

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:18-alpine AS production

LABEL stage="production"

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY --from=build --chown=nodejs:nodejs /app/.next ./.next
COPY --from=build --chown=nodejs:nodejs /app/public ./public
COPY --from=build --chown=nodejs:nodejs /app/package*.json ./
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
```

### Go

```dockerfile
FROM golang:1.21-alpine AS build

LABEL stage="build"

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest AS production

LABEL stage="production"

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=build /app/app .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["./app"]
```

### Rust

```dockerfile
FROM rust:1.75-slim AS build

LABEL stage="build"

WORKDIR /app

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

COPY . .

RUN touch src/main.rs && \
    cargo build --release

FROM debian:bookworm-slim AS production

LABEL stage="production"

RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/target/release/[APP_NAME] .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["./[APP_NAME]"]
```

---

## Labels Recomendados

```dockerfile
LABEL maintainer="[YOUR_EMAIL]"
LABEL version="1.0"
LABEL description="[PROJECT_DESCRIPTION]"
LABEL org.opencontainers.image.source="[REPO_URL]"
LABEL org.opencontainers.image.version="[VERSION]"
LABEL org.opencontainers.image.created="[DATE]"
LABEL org.opencontainers.image.revision="[COMMIT_HASH]"
```

---

## Health Checks por Tipo

### Node.js
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js
```

### Python
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python healthcheck.py
```

### HTTP/API
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:[PORT]/health || exit 1
```

### TCP
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD nc -z localhost [PORT] || exit 1
```

---

## Otimizações Comuns

### 1. Cache de Layers
```dockerfile
# Ordem: arquivos que mudam menos primeiro
COPY package*.json ./
RUN npm ci
COPY . .
```

### 2. Multi-stage Build
```dockerfile
FROM [base] AS build
# ... build steps ...

FROM [prod-base] AS production
COPY --from=build /app/dist ./dist
```

### 3. Usuário Não-root
```dockerfile
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
```

### 4. Limpeza de Cache
```dockerfile
RUN npm ci && npm cache clean --force
RUN apt-get update && apt-get install -y [pkgs] && rm -rf /var/lib/apt/lists/*
```

### 5. .dockerignore
```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
dist
build
coverage
*.md
```

---

## Checklist de Qualidade

Antes de considerar o Dockerfile completo:

### Estrutura
- [ ] Multi-stage build implementado
- [ ] Labels informativos presentes
- [ ] Usuário não-root configurado
- [ ] Health check implementado
- [ ] .dockerignore configurado

### Otimização
- [ ] Layers ordenadas para cache eficiente
- [ ] Dependências de sistema minimizadas
- [ ] Cache limpo após instalação
- [ ] Base image otimizada (alpine/distroless)
- [ ] Build output minimizado

### Segurança
- [ ] Usuário não-root
- [ ] Secrets não expostos
- [ ] Base image oficial
- [ ] Dependências atualizadas
- [ ] Health check funcional

### Performance
- [ ] Layers otimizadas para cache
- [ ] Tamanho de imagem minimizado
- [ ] Build time otimizado
- [ ] Startup time otimizado

---

## Metadados do Template

**Versão**: 1.0
**Última Atualização**: 2025-01-18
**Mantido Por**: maker.dockerize.md

**Changelog**:
- 1.0 (2025-01-18): Template inicial com suporte para Node.js, Python, React, Go e Rust

