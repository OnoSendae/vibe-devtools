# Migration Guide
## Movendo Vibes do Toolkit para Monorepo

**Audience**: Desenvolvedores criando novos vibes  
**Version**: 1.0

---

## 🎯 Quando Migrar

Mova um vibe do toolkit para o monorepo quando:

- ✅ Testado e funcionando
- ✅ Documentação completa
- ✅ Pronto para compartilhar/publicar
- ✅ Estrutura estável
- ✅ Exemplos incluídos

---

## 📋 Checklist Pré-Migração

### Estrutura Mínima

- [ ] `.cursor/commands/` com ao menos 1 command
- [ ] `.cursor/rules/` (opcional mas recomendado)
- [ ] `templates/` (se aplicável)
- [ ] `vibe.json` criado
- [ ] `package.json` criado
- [ ] `README.md` completo
- [ ] `examples/` com ao menos 1 exemplo

### Qualidade

- [ ] Commands testados e funcionando
- [ ] vibe.json válido (JSON parseável)
- [ ] package.json válido
- [ ] Naming conventions seguidas
- [ ] Sem hardcoded paths
- [ ] Cross-platform compatible

---

## 🚀 Processo de Migração

### Passo 1: Criar Package no Monorepo

```bash
cd vibes-ecosystem/packages/
mkdir my-vibe
```

### Passo 2: Copiar Estrutura

```bash
# Copiar .cursor/
cp -r ~/path/to/toolkit/my-vibe/.cursor packages/my-vibe/

# Copiar templates (se houver)
cp -r ~/path/to/toolkit/my-vibe/templates packages/my-vibe/

# Copiar scripts (se houver)
cp -r ~/path/to/toolkit/my-vibe/scripts packages/my-vibe/
```

### Passo 3: Criar Manifestos

**vibe.json**:
```json
{
  "name": "my-vibe",
  "version": "1.0.0",
  "description": "Brief description",
  "symlinks": {
    ".cursor/commands": ".cursor/commands"
  }
}
```

**package.json**:
```json
{
  "name": "@vibes/my-vibe",
  "version": "1.0.0",
  "description": "Brief description",
  "type": "module",
  "files": [".cursor/", "templates/", "README.md", "vibe.json"],
  "keywords": ["vibe", "agentic"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Passo 4: Criar Documentação

**README.md** (mínimo):
```markdown
# My Vibe

Brief description

## Installation

\`\`\`bash
npx vibes install github:vibes-org/my-vibe
\`\`\`

## Usage

\`\`\`
/my-vibe.action "argument"
\`\`\`

## License

MIT
```

**examples/basic-example.md**:
- Tutorial passo a passo
- Output esperado
- Troubleshooting

### Passo 5: Validar Localmente

```bash
cd vibes-ecosystem

# Instalar deps
pnpm install

# Testar instalação
cd apps/cli
node dist/index.js install ../../packages/my-vibe

# Validar
node dist/index.js list
```

### Passo 6: Commit e Push

```bash
git add packages/my-vibe
git commit -m "feat(packages): add @vibes/my-vibe

- Commands: [list commands]
- Features: [list features]
"

git push origin main
```

### Passo 7: Publicar (Opcional)

```bash
# Via GitHub Actions (manual trigger)
# Ou manualmente:
pnpm --filter @vibes/my-vibe publish --access public
```

---

## ⚠️ Armadilhas Comuns

### 1. Paths Absolutos

❌ **Errado**:
```json
{
  "symlinks": {
    "/Users/me/.cursor/commands": "commands/"
  }
}
```

✅ **Correto**:
```json
{
  "symlinks": {
    ".cursor/commands": ".cursor/commands"
  }
}
```

### 2. Manifestos Inválidos

❌ **Errado**: vibe.json sem `name` ou `version`

✅ **Correto**: Validar com `cat vibe.json | jq .`

### 3. Dependências Não Declaradas

❌ **Errado**: Command usa outro vibe mas não declara

✅ **Correto**: Adicionar em `dependencies`

---

## 🧪 Teste Completo

Antes de publicar, execute:

```bash
# 1. Build
cd vibes-ecosystem
pnpm build

# 2. Testar instalação local
cd apps/cli
node dist/index.js install ../../packages/my-vibe

# 3. Listar
node dist/index.js list

# 4. Testar command no Cursor
# Abrir Cursor e executar /my-vibe.action

# 5. Desinstalar
node dist/index.js uninstall my-vibe

# 6. Reinstalar
node dist/index.js install ../../packages/my-vibe
```

---

## 📊 Checklist Final

- [ ] Vibe copiado para packages/
- [ ] Manifestos criados e válidos
- [ ] Documentação completa
- [ ] Instalação local testada
- [ ] Commands funcionando
- [ ] Uninstall/reinstall testado
- [ ] Commit feito
- [ ] Push para GitHub
- [ ] Publicação (se aplicável)

---

**Version**: 1.0  
**Last Updated**: 2025-10-21

