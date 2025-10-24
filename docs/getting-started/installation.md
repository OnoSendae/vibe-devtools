# Guia de Instalação

Este guia detalha todas as formas de instalar e configurar o Vibe DevTools.

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação da CLI](#instalação-da-cli)
- [Instalação de Packages](#instalação-de-packages)
- [Verificação](#verificação)
- [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

### Sistema

- **Node.js**: 18.x ou superior
- **npm**: 9.x ou superior (vem com Node.js)
- **Sistema Operacional**:
  - ✅ macOS 10.15+
  - ✅ Linux (Ubuntu 20.04+, Fedora 35+, etc)
  - ✅ Windows 10/11

### Agente de IA (opcional mas recomendado)

Vibes funcionam melhor com agentes de IA:

- [Cursor](https://cursor.sh) (recomendado)
- [GitHub Copilot](https://github.com/features/copilot)
- [Gemini CLI](https://gemini.google.com)

### Verificar Pré-requisitos

```bash
# Node.js version
node -v
# Output esperado: v18.x.x ou superior

# npm version
npm -v
# Output esperado: 9.x.x ou superior
```

---

## Instalação da CLI

Existem 3 formas de usar a CLI:

### Opção 1: Instalação Global (Recomendado)

**Vantagens**: Comando curto, sempre disponível

```bash
# Instalar globalmente
npm install -g vibe-devtools

# Verificar instalação
vdt --version
# ou
vibes --version
```

**Comandos disponíveis**:
- `vdt` (short form)
- `vibes` (descriptive form)

### Opção 2: Via npx (Sem Instalação)

**Vantagens**: Sempre usa versão latest, zero instalação

```bash
# Usar diretamente
npx vibe-devtools --version

# Criar alias (opcional)
alias vdt="npx vibe-devtools"

# Usar alias
vdt install @vibe-devtools/basic
```

### Opção 3: Instalação Local (Dev)

**Para desenvolvimento ou testes**:

```bash
# Clone repositório
git clone https://github.com/onosendae/vibe-devtools.git
cd vibe-devtools

# Instalar dependências
pnpm install

# Build
pnpm build

# Link globalmente
cd apps/cli
npm link

# Usar
vdt --version
```

### Comparação

| Aspecto | Global | npx | Local (Dev) |
|---------|--------|-----|-------------|
| **Instalação** | Uma vez | Nenhuma | Manual |
| **Comando** | `vdt` | `npx vibe-devtools` | `vdt` |
| **Versão** | Fixa | Latest | Latest (local) |
| **Performance** | Rápido | +Lento (1ª vez) | Rápido |
| **Updates** | Manual | Automático | Manual |
| **Uso** | Produção | CI/CD, Teste | Desenvolvimento |

---

## Instalação de Packages

Após instalar a CLI, instale vibes (packages):

### Packages Oficiais

```bash
# Basic kit (fundacional) - RECOMENDADO
vdt install @vibe-devtools/basic

# Research kit (pesquisas profundas)
vdt install @vibe-devtools/research

# Listar instalados
vdt list
```

### Packages da Comunidade

```bash
# Do npm
vdt install @yourorg/your-vibe

# Do GitHub
vdt install github:username/vibe-repo

# Local (desenvolvimento)
vdt install ./path/to/local-vibe
```

### Onde São Instalados?

```
~/.vibes/                       # Diretório global
├── vibes.json                  # Manifest global
└── packages/                   # Vibes instalados
    ├── basic@1.0.1/
    └── research@1.0.0/

your-project/                   # Seu projeto
├── .cursor/
│   ├── commands/  → symlink    # Aponta para ~/.vibes/packages/
│   └── rules/     → symlink
└── vibes/
    └── templates/ → symlink
```

### O Que Acontece ao Instalar?

1. **Download**: Vibe baixado do npm/GitHub/local
2. **Storage**: Salvo em `~/.vibes/packages/[name]@[version]/`
3. **Symlinks**: Criados em seu projeto:
   - `.cursor/commands/` → vibe commands
   - `.cursor/rules/` → vibe rules
   - `vibes/templates/` → vibe templates
4. **Manifest**: `~/.vibes/vibes.json` atualizado
5. **Ready**: Commands disponíveis no Cursor!

---

## Verificação

### Verificar CLI Instalada

```bash
# Versão
vdt --version
# Output: 0.4.1 (ou superior)

# Help
vdt --help
# Mostra comandos disponíveis
```

### Verificar Packages Instalados

```bash
# Listar todos
vdt list

# Output esperado:
# 📦 Vibes Instalados
#
# ┌──────────┬─────────┬──────────────────────────┐
# │ Nome     │ Versão  │ Instalado Em             │
# ├──────────┼─────────┼──────────────────────────┤
# │ basic    │ 1.0.1   │ 2025-10-24               │
# │ research │ 1.0.0   │ 2025-10-24               │
# └──────────┴─────────┴──────────────────────────┘
```

### Verificar Symlinks Criados

```bash
# Verificar estrutura do projeto
ls -la .cursor/commands/
ls -la .cursor/rules/
ls -la vibes/templates/

# Devem existir symlinks apontando para ~/.vibes/
```

### Testar Commands no Cursor

Abra Cursor e tente invocar:

```
/maker.command
```

Se abrir prompt para input, está funcionando! ✅

---

## Troubleshooting

### Problema: `vdt: command not found`

**Causa**: CLI não instalada globalmente ou PATH incorreto

**Solução 1**: Instalar globalmente
```bash
npm install -g vibe-devtools
```

**Solução 2**: Verificar PATH
```bash
echo $PATH
# Verificar se contém diretório npm global

# Encontrar diretório npm global
npm config get prefix
# Deve estar no PATH
```

**Solução 3**: Usar npx
```bash
npx vibe-devtools --version
```

---

### Problema: Permissão negada ao criar symlinks

**Causa**: Falta de permissão para criar symlinks (comum no Windows)

**Solução (Windows)**:

Opção A - Executar como Administrador:
```cmd
# Abrir CMD/PowerShell como Admin
npm install -g vibe-devtools
```

Opção B - Habilitar Developer Mode:
1. Settings → Update & Security → For Developers
2. Ativar "Developer Mode"
3. Reiniciar terminal

**Fallback Automático**:
A CLI automaticamente usa junctions (Windows) ou cópia física se symlinks falharem.

---

### Problema: Commands não aparecem no Cursor

**Causa**: Cursor não detectou novos commands

**Solução**:

1. Verificar se symlinks existem:
```bash
ls -la .cursor/commands/
```

2. Reiniciar Cursor:
- Fechar completamente
- Reabrir projeto

3. Reload Window:
- Cmd/Ctrl + Shift + P
- Digite "Reload Window"
- Enter

4. Verificar manifest do Cursor:
```bash
cat .cursor/commands/.vibe-manifest.json
# Deve listar vibes instalados
```

---

### Problema: Erro ao instalar package

**Erro**: `Package not found`

**Solução**:

```bash
# Verificar nome correto
npm view @vibe-devtools/basic
# Deve retornar metadata do package

# Verificar conexão internet
ping registry.npmjs.org

# Limpar cache npm
npm cache clean --force

# Tentar novamente
vdt install @vibe-devtools/basic
```

---

### Problema: Conflito de versões

**Erro**: `Conflict: basic@1.0.0 already installed`

**Solução**:

```bash
# Desinstalar versão antiga
vdt uninstall basic

# Instalar nova versão
vdt install @vibe-devtools/basic

# Ou forçar atualização (futuro)
vdt update basic
```

---

### Problema: Windows Defender bloqueia instalação

**Causa**: Defender pode bloquear criação de symlinks

**Solução**:

1. Adicionar exceção para diretório:
   - Windows Security → Virus & threat protection
   - Manage settings → Add exclusion
   - Adicionar: `C:\Users\[YOU]\AppData\Roaming\npm`

2. Ou usar npx (não instala globalmente):
```bash
npx vibe-devtools install @vibe-devtools/basic
```

---

### Problema: Node.js version incompatível

**Erro**: `Node.js version 16.x is not supported`

**Solução**:

Atualizar Node.js para 18.x ou superior:

**Via nvm (recomendado)**:
```bash
# Instalar nvm (se não tiver)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20
nvm install 20
nvm use 20

# Verificar
node -v
```

**Via instalador oficial**:
- Download: https://nodejs.org/
- Instalar versão LTS (20.x)

---

## Próximos Passos

Após instalar com sucesso:

1. 📚 [Quick Start Guide](./quick-start.md)
2. 🎨 [Usando Packages](../guides/using-packages.md)
3. 🏗️ [Criando Seu Vibe](../guides/creating-vibes.md)

---

## Suporte

Problemas não resolvidos?

- 🐛 [Abrir Issue](https://github.com/onosendae/vibe-devtools/issues)
- 💬 [Discussions](https://github.com/onosendae/vibe-devtools/discussions)
- 📧 Email: hensel@gmail.com

