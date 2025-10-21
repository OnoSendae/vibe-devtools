# Memory Strategy - Vibes Ecosystem

**Date**: 2025-10-21  
**Version**: 1.0

---

## 🎯 Objetivo

Definir como packages gerenciam memory (pesquisas, análises, ideias) com opção de centralização em `~/.vibe/memory/` quando compartilhamento é necessário.

---

## 📂 Estrutura

### Memory Local (Default)

Cada package pode ter seu próprio memory:

```
packages/research/memory/
├── deep-research-topic-20251021-120000/
│   ├── metadata.json
│   ├── references/
│   ├── syntheses/
│   └── validation/
```

**Quando usar**:
- Memory específico do package
- Exemplos de uso
- Demos
- Testes

---

### Memory Centralizado (Optional)

Quando necessário compartilhar memory entre packages ou com toolkit:

```
~/.vibe/memory/
└── research.deep.react-patterns.20251021-120000.md
    ↑      ↑     ↑                 ↑
    vibe  type  feature-id       timestamp
```

**Naming Convention**:
```
[vibe].[memory-type].[feature-id].[timestamp].md
```

**Exemplos**:
- `research.deep.typescript-di.20251021-120000.md`
- `basic.plan.new-vibe.20251021-130000.md`
- `automation.test.login-flow.20251021-140000.md`

**Quando usar**:
- Compartilhar entre packages
- Referenciar de toolkit pessoal
- Centralizar conhecimento
- Cross-package insights

---

## 🔗 Symlinks Strategy

### Criar Symlink Centralizado

```bash
# No package
cd packages/research/memory/
ln -s ~/.vibe/memory/research.deep.topic.20251021.md ./deep-topic/

# Agora acessível em ambos lugares:
# - packages/research/memory/deep-topic/
# - ~/.vibe/memory/research.deep.topic.20251021.md
```

### Helper Script

Criar script em `shared/scripts/centralize-memory.sh`:

```bash
#!/bin/bash
# Usage: ./centralize-memory.sh <vibe> <type> <feature-id>

VIBE=$1
TYPE=$2
FEATURE=$3
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

FILENAME="${VIBE}.${TYPE}.${FEATURE}.${TIMESTAMP}.md"
CENTRAL_PATH="$HOME/.vibe/memory/${FILENAME}"

mkdir -p "$HOME/.vibe/memory"
touch "$CENTRAL_PATH"

echo "✅ Memory centralizado criado: $CENTRAL_PATH"
```

---

## 🎯 Best Practices

### 1. Local First
- Criar memory local no package primeiro
- Centralizar apenas se necessário compartilhar

### 2. Naming Convention Rigorosa
- Sempre seguir padrão: `[vibe].[type].[feature].[timestamp]`
- Lowercase, kebab-case para feature-id
- Timestamp ISO 8601 simplificado (YYYYMMDD-HHMMSS)

### 3. Symlinks Bidirecionais
- Package pode symlink → central
- Central pode symlink → package
- Ambos acessíveis

### 4. Documentar Origem
- Em metadata, indicar se é local ou centralizado
- Manter referências cruzadas

---

## 📋 Checklist

Ao criar memory centralizado:
- [ ] Seguir naming convention
- [ ] Criar em ~/.vibe/memory/
- [ ] Criar symlink no package (opcional)
- [ ] Documentar em metadata
- [ ] Atualizar índices

---

**Version**: 1.0  
**Last Updated**: 2025-10-21

