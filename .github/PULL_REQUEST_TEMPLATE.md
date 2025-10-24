## Descrição

Descreva claramente o que este PR faz e por quê.

**Resolve**: #(issue number)

## Tipo de Mudança

Marque as opções relevantes:

- [ ] 🐛 Bug fix (patch - correção de bug sem breaking changes)
- [ ] ✨ Nova feature (minor - adiciona funcionalidade backward compatible)
- [ ] 💥 Breaking change (major - mudança que quebra compatibilidade)
- [ ] 📝 Documentação (atualização de docs)
- [ ] 🔧 Refactoring (mudança de código que não altera comportamento)
- [ ] ⚡ Performance (melhoria de performance)
- [ ] ✅ Testes (adição ou correção de testes)
- [ ] 🎨 Style (formatação, sem mudança de código)
- [ ] 🔨 Chore (manutenção, deps, build)

## Mudanças Específicas

Liste as principais mudanças feitas:

- Mudança 1
- Mudança 2
- Mudança 3

## Arquivos Principais

Indique os arquivos mais importantes modificados:

- `path/to/file1.ts` - [descrição da mudança]
- `path/to/file2.ts` - [descrição da mudança]

## Como Testar

Passos para testar suas mudanças:

```bash
# 1. Build
pnpm build

# 2. Testar localmente
cd apps/cli
npm link
vdt --version

# 3. Testar funcionalidade específica
vdt install @vibe-devtools/basic
# ... comandos de teste ...
```

## Checklist

### Código

- [ ] Código segue os [padrões do projeto](../CONTRIBUTING.md#padrões-de-código)
- [ ] Sem warnings de linter (`pnpm lint`)
- [ ] Build passa sem erros (`pnpm build`)
- [ ] Sem código morto ou comentado
- [ ] Variáveis e funções bem nomeadas

### Testes

- [ ] Testei manualmente as mudanças
- [ ] Testes existentes passam (se houver)
- [ ] Adicionei novos testes para nova funcionalidade
- [ ] Coverage não diminuiu

### Documentação

- [ ] README atualizado (se nova feature)
- [ ] Comentários inline adicionados onde necessário
- [ ] Exemplos atualizados (se aplicável)
- [ ] CHANGELOG atualizado via changeset

### Changeset

- [ ] Criei changeset para mudanças em packages (`pnpm changeset`)
- [ ] Descrição do changeset é clara
- [ ] Tipo correto selecionado (patch/minor/major)

**Se não criou changeset, explique por quê**:
- [ ] Mudança apenas em docs (não afeta packages)
- [ ] Mudança apenas em CI/CD
- [ ] Outro: _____

### Git

- [ ] Commits seguem [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Mensagens de commit são descritivas
- [ ] Branch está atualizada com `main`

## Breaking Changes

Se marcou "Breaking change" acima, descreva:

**O que quebra**:
- [Descrição do que muda]

**Como migrar**:
```bash
# Antes
vdt old-command

# Agora
vdt new-command
```

**Alternativa de compatibilidade**:
- [ ] Não há alternativa (breaking necessário)
- [ ] Deprecated old API por X versões
- [ ] Mantive compatibilidade com warning

## Screenshots/Outputs

(Se aplicável) Mostre antes e depois:

**Antes**:
```
output antigo aqui
```

**Depois**:
```
output novo aqui
```

## Performance

Se mudança afeta performance:

**Impacto**:
- [ ] Melhoria de performance: [descreva]
- [ ] Sem impacto mensurável
- [ ] Possível regressão (justifique)

**Benchmark** (opcional):
```
Antes: X ms
Depois: Y ms
Melhoria: Z%
```

## Contexto Adicional

Qualquer informação adicional relevante:

- Links para discussions/issues relacionados
- Decisões de design importantes
- Trade-offs considerados

## Checklist do Reviewer

Para o reviewer validar:

- [ ] Código faz sentido e resolve o problema
- [ ] Sem side effects não intencionais
- [ ] Padrões de código respeitados
- [ ] Documentação adequada
- [ ] Testes adequados (ou justificativa)
- [ ] Changeset apropriado

## Para o Maintainer

- [ ] Aprovado
- [ ] Pronto para merge
- [ ] Requer follow-up: _____

---

**Obrigado pela contribuição! 🚀**

