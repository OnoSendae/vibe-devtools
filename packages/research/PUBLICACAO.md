# Guia de Publicação - @vibes/research

**Versão**: 2.0.0  
**Data**: 2025-10-21  
**Status**: ✅ Pronto para publicação

---

## ✅ Validações Realizadas

### 1. npm pack
```bash
npm pack --dry-run
```

**Resultado**: ✅ Sucesso
- **Arquivos**: 27 files
- **Tamanho**: ~297.9 kB (unpacked), ~79.2 kB (packed)
- **Conteúdo**: .cursor/, templates/, scripts/, docs

### 2. npm publish --dry-run
```bash
npm publish --dry-run
```

**Resultado**: ✅ Sucesso (sem erros críticos)
- **Package**: @vibes/research@2.0.0
- **Registry**: npm

---

## 📦 Conteúdo do Pacote

**Commands** (12):
- research.pipeline.md
- research.initialize.md
- research.search.md
- research.score.md
- research.analyze.md
- research.synthesize.md
- research.validate.md
- research.github.md
- research.integration.md
- research.simple.pipeline.md (deprecated)
- research.deep.pipeline.md (deprecated)
- research.expert.pipeline.md (deprecated)

**Rules** (4):
- research.mdc
- analysis.mdc
- search.mdc
- synthesis.mdc

**Templates** (4):
- template.research-metadata.json
- template.research-synthesis.md
- template.research-reference-analysis.md
- template.research-report.md

**Documentation**:
- README.md
- constitution.md
- CHANGELOG.md
- examples/basic-research-example.md

**Config**:
- vibe.json
- package.json

---

## 🚀 Como Publicar

### Pré-requisitos

1. **Conta npm verificada**
   ```bash
   npm whoami
   ```

2. **Autenticado**
   ```bash
   npm login
   ```

3. **Organização @vibes** (se necessário)
   - Criar em npmjs.com
   - Adicionar membros

### Processo de Publicação

#### Passo 1: Validações Finais

```bash
cd research/

# Validar package.json
npm pkg get name version

# Testar empacotamento
npm pack

# Ver conteúdo
tar -tzf vibes-research-2.0.0.tgz | head -20

# Limpar tarball
rm vibes-research-2.0.0.tgz
```

#### Passo 2: Publicar

```bash
# Dry-run final
npm publish --dry-run

# Publicar (IRREVERSÍVEL)
npm publish --access public
```

**⚠️ ATENÇÃO**: Versões publicadas no npm são IMUTÁVEIS. Não é possível sobrescrever.

#### Passo 3: Validar Publicação

```bash
# Verificar no npm
npm view @vibes/research

# Testar instalação
npm install @vibes/research

# Ou via vibes-cli
npx vibes install @vibes/research
```

#### Passo 4: Criar GitHub Release

```bash
git tag -a v2.0.0 -m "Release v2.0.0 - First distributable version"
git push origin v2.0.0
```

Criar release no GitHub:
1. Ir em https://github.com/vibes-org/research/releases
2. Draft new release
3. Tag: v2.0.0
4. Title: "v2.0.0 - First Distributable Version"
5. Description: Copiar de CHANGELOG.md
6. Publish release

---

## 📋 Checklist de Publicação

### Antes de Publicar
- [x] package.json válido
- [x] vibe.json válido
- [x] README.md completo
- [x] CHANGELOG.md atualizado
- [x] Examples incluídos
- [x] npm pack funciona
- [x] npm publish --dry-run funciona
- [ ] Repositório GitHub público criado
- [ ] npm login executado
- [ ] Organização @vibes configurada (se necessário)

### Publicação
- [ ] npm publish --access public executado
- [ ] Package visível em npmjs.com
- [ ] npm install @vibes/research funciona
- [ ] GitHub release v2.0.0 criada

### Pós-Publicação
- [ ] Testar instalação em projeto limpo
- [ ] Validar commands funcionando
- [ ] Atualizar documentação com link npm
- [ ] Anunciar em comunidade

---

## 🎯 Comandos Resumidos

```bash
# Validar
cd research/
npm pack --dry-run
npm publish --dry-run

# Publicar (CUIDADO)
npm publish --access public

# Validar publicação
npm view @vibes/research
npm install @vibes/research

# GitHub release
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin v2.0.0
```

---

## ⚠️ Notas Importantes

1. **Versão é imutável**: Depois de publicar 2.0.0, não pode sobrescrever. Próxima versão seria 2.0.1 ou 2.1.0.

2. **Organização @vibes**: Precisa existir no npm e você ter permissão.

3. **Public package**: Usar `--access public` para pacotes scoped.

4. **Sem bin**: Este vibe não tem executável próprio (apenas commands markdown).

5. **Testes locais**: Sempre testar instalação antes de publicar.

---

**Status**: ✅ Pronto para publicação  
**Próximo passo**: Executar `npm publish --access public` quando decidir publicar

