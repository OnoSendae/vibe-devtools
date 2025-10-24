# Stash System

Sistema de gestão de conflitos e backups para vibe-devtools, inspirado no `git stash`.

## Overview

O Stash System permite que você gerencie arquivos durante instalação/atualização de packages com controle total sobre o que sobrescrever, manter ou arquivar.

### Features

- ✅ Detecção automática de conflitos via SHA-256 hash
- ✅ Backup seguro com full copy (não patch)
- ✅ Comandos CLI familiares (inspirados no git stash)
- ✅ FILO ordering com renumeração automática
- ✅ Logging completo em JSONL
- ✅ Dry-run support
- ✅ Integration com install e update commands

## Quick Start

### Install com Detecção de Conflitos

```bash
npx vibe-devtools install @vibe-devtools/basic
```

Se houver conflitos, você verá:

```
⚠️  Conflicts detected (3 files)

  1. vibes/configs/constitution.md
     Local:   abc123...
     Package: def456...

How to resolve conflicts?
  [1] Overwrite with package version
  [2] Stash local and install package
  [3] Cancel installation
```

Escolha opção 2 para criar backup automático.

### Update com Stash

```bash
npx vibe-devtools update @vibe-devtools/basic --latest
npx vibe-devtools update @vibe-devtools/basic --version 1.0.3
npx vibe-devtools update @vibe-devtools/basic --dry-run
```

### Dry Run

Preview mudanças sem instalar:

```bash
npx vibe-devtools install @vibe-devtools/basic --dry-run
```

## Comandos Stash

### List

Lista todos os stashes:

```bash
npx vibe-devtools stash list
```

Output:
```
stash{0} - @vibe-devtools/basic
  install • 2025-10-23 14:30 • 3 files

stash{1} - manual
  manual • 2025-10-23 15:45 • 2 files

Total: 2 stashes
```

### Show

Mostra detalhes de um stash:

```bash
npx vibe-devtools stash show 0
```

### Apply

Aplica stash (mantém no histórico):

```bash
npx vibe-devtools stash apply 0
```

### Pop

Aplica stash e remove do histórico:

```bash
npx vibe-devtools stash pop 0
```

### Remove

Remove um stash:

```bash
npx vibe-devtools stash remove 0
```

### Diff

Mostra diferenças entre stash e arquivos atuais:

```bash
npx vibe-devtools stash diff 0
npx vibe-devtools stash diff 0 --editor  # abre no IDE
```

### Save

Cria stash manual:

```bash
npx vibe-devtools stash save file1.ts file2.ts
npx vibe-devtools stash save  # prompt interativo
```

### Clear

Remove todos os stashes:

```bash
npx vibe-devtools stash clear
npx vibe-devtools stash clear --force  # sem confirmação
```

## Architecture

### Components

- **HashCalculator**: SHA-256 hash calculation
- **StashLogger**: JSONL logging system
- **StashManager**: Core lifecycle management
- **ConflictDetector**: Hash-based conflict detection
- **ConflictResolver**: CLI prompts & diff display

### Storage

```
~/.vibes/stash/
├── index.json          # Lista de stashes
├── stash-0/
│   ├── metadata.json   # Metadata do stash
│   └── files/          # Full copy dos arquivos
└── stash-1/
    ├── metadata.json
    └── files/
```

### Logging

```
~/.vibes/logs/stash.log
```

Format: JSONL (1 JSON per line)

## Technical Details

### Hash Algorithm

SHA-256 via Node.js crypto (nativo)

### Storage Strategy

Full copy (não patch) para:
- Simplicidade e confiabilidade
- Suporte a qualquer tipo de arquivo
- Sempre funciona (não corrompe)

### Ordering

FILO (First In Last Out) com renumeração:
- `stash{0}` é sempre o mais recente
- Após `pop` ou `remove`, IDs são renumerados
- Igual ao `git stash`

## Error Handling

### Permission Denied

Se erro de permissão em `~/.vibes/stash/`:

```bash
sudo chown -R $USER ~/.vibes
```

### Stash Corrupted

Sistema valida integridade via hash antes de aplicar. Se corrompido:

```bash
npx vibe-devtools stash remove <stash-id>
```

### Disk Full

Libere espaço ou:

```bash
npx vibe-devtools stash clear
```

## Performance

- Hash calculation: < 100ms (arquivos < 1MB)
- Stash creation: < 1s (< 100 arquivos)
- Stash apply: < 1s (< 100 arquivos)

## Dependencies

- `inquirer@^9.2.0` - CLI prompts
- `diff@^5.1.0` - Diff display

## Compatibility

- Node.js >= 18.0.0
- Works on: macOS, Linux, Windows

