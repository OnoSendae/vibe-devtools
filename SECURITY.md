# Política de Segurança

## Versões Suportadas

Atualmente, fornecemos suporte de segurança para as seguintes versões do Vibe DevTools:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.x    | :white_check_mark: |
| < 1.0  | :x:                |

**Packages**:

| Package | Versão | Suportada          |
| ------- | ------ | ------------------ |
| `vibe-devtools` (CLI) | 0.4.x | :white_check_mark: |
| `@vibe-devtools/basic` | 1.x | :white_check_mark: |
| `@vibe-devtools/research` | 1.x | :white_check_mark: |

**Nota**: Sempre recomendamos usar a versão mais recente disponível no npm.

---

## Reportando uma Vulnerabilidade

Levamos a segurança do Vibe DevTools a sério. Se você descobriu uma vulnerabilidade de segurança, pedimos que nos informe de forma responsável.

### Como Reportar

**NÃO** crie uma issue pública no GitHub para vulnerabilidades de segurança.

Em vez disso, envie um relatório privado para:

📧 **Email**: clebercleberhensel@gmail.com

**Assunto**: `[SECURITY] Vibe DevTools - [descrição breve]`

### Informações a Incluir

Para nos ajudar a entender e resolver o problema rapidamente, inclua:

1. **Descrição da vulnerabilidade**
   - Tipo de problema (ex: SQL injection, XSS, etc)
   - Componente/package afetado
   - Impacto potencial

2. **Passos para reproduzir**
   - Passo a passo detalhado
   - Proof of Concept (se possível)
   - Screenshots/logs (se aplicável)

3. **Ambiente**
   - Versão do package afetado
   - Sistema operacional
   - Node.js version

4. **Sugestões de correção** (opcional)
   - Se você tem ideias de como corrigir

### Exemplo de Report

```markdown
Assunto: [SECURITY] Vibe DevTools - Path Traversal na instalação de vibes

Descrição:
Descobri uma vulnerabilidade de path traversal que permite 
instalação de arquivos fora do diretório ~/.vibes/

Componente afetado:
- vibe-devtools CLI v0.4.1
- Módulo: symlink-manager.ts

Passos para reproduzir:
1. Criar vibe malicioso com path "../../../"
2. Executar `vdt install ./malicious-vibe`
3. Arquivos são criados fora de ~/.vibes/

Impacto:
Um atacante pode sobrescrever arquivos do sistema

Sugestão:
Validar paths antes de criar symlinks usando path.resolve()
```

---

## Processo de Resposta

### Timeline

1. **Confirmação de Recebimento**: 24-48 horas
2. **Avaliação Inicial**: 3-5 dias úteis
3. **Validação**: 7 dias úteis
4. **Correção**: Depende da severidade
5. **Divulgação**: Após correção disponível

### Severidade

Classificamos vulnerabilidades usando o CVSS (Common Vulnerability Scoring System):

| Severidade | Score CVSS | Tempo de Resposta | Tempo de Correção |
|------------|------------|-------------------|-------------------|
| **Crítica** | 9.0-10.0 | 24 horas | 7 dias |
| **Alta** | 7.0-8.9 | 48 horas | 14 dias |
| **Média** | 4.0-6.9 | 5 dias | 30 dias |
| **Baixa** | 0.1-3.9 | 7 dias | 60 dias |

### O Que Esperar

Após reportar uma vulnerabilidade:

1. ✅ **Confirmação**: Confirmaremos o recebimento do seu report
2. 🔍 **Investigação**: Investigaremos e reproduziremos o problema
3. 💬 **Comunicação**: Manteremos você atualizado sobre o progresso
4. 🛠️ **Correção**: Desenvolveremos e testaremos a correção
5. 🚀 **Release**: Publicaremos nova versão com a correção
6. 📢 **Divulgação**: Divulgaremos a vulnerabilidade de forma responsável

### Divulgação Responsável

Pedimos que você:

- ✅ Nos dê tempo razoável para corrigir antes de divulgar publicamente
- ✅ Evite explorar a vulnerabilidade além do necessário para demonstrá-la
- ✅ Não acesse/modifique/delete dados de terceiros
- ✅ Mantenha confidencialidade até divulgarmos a correção

Em troca, nós:

- ✅ Responderemos prontamente ao seu report
- ✅ Manteremos você informado sobre o progresso
- ✅ Creditaremos você na divulgação (se desejar)
- ✅ Trataremos seu report com seriedade e respeito

---

## Programa de Recompensas

Atualmente **não** temos um programa formal de bug bounty.

No entanto:
- 🎖️ Creditaremos publicamente reportes válidos
- 🌟 Reconheceremos contribuições significativas
- 💝 Agradeceremos profundamente sua ajuda

---

## Segurança de Dependências

### Monitoramento

- Usamos **Dependabot** para monitorar vulnerabilidades em dependências
- Atualizamos dependências regularmente
- Priorizamos patches de segurança

### Auditoria

Você pode auditar dependências localmente:

```bash
# Auditar CLI
cd apps/cli
npm audit

# Auditar packages
cd packages/basic
npm audit
```

### Reportar Dependência Vulnerável

Se encontrar vulnerabilidade em uma dependência:

1. Verifique se já existe issue/PR para isso
2. Se não, abra issue normal (não é vulnerabilidade do Vibe DevTools)
3. Tag com label `dependencies` e `security`

---

## Boas Práticas de Segurança

### Para Usuários

Ao usar Vibe DevTools:

✅ **Instale apenas de fontes confiáveis**:
```bash
# ✅ Bom: npm oficial
vdt install @vibe-devtools/basic

# ⚠️ Cuidado: vibes de terceiros
vdt install @unknown/suspicious-vibe

# 🔍 Sempre: verifique código antes de instalar vibes não-oficiais
```

✅ **Mantenha atualizado**:
```bash
npm update -g vibe-devtools
```

✅ **Revise vibes instalados**:
```bash
vdt list
```

✅ **Não compartilhe credenciais**:
- Nunca commit arquivos `.env` com secrets
- Use variáveis de ambiente para dados sensíveis

### Para Desenvolvedores de Vibes

Ao criar vibes:

✅ **Não solicite/armazene dados sensíveis**
✅ **Valide todos inputs**
✅ **Não execute comandos arbitrários**
✅ **Documente permissões necessárias**
✅ **Use dependências confiáveis**

---

## Atualizações de Segurança

### Como Somos Notificados

Atualizações de segurança são anunciadas via:

- 📢 [GitHub Security Advisories](https://github.com/onosendae/vibe-devtools/security/advisories)
- 📝 [CHANGELOG](./CHANGELOG.md)
- 📦 [npm advisory](https://www.npmjs.com/package/vibe-devtools)
- 🐦 Twitter/X (futuramente)

### Como Aplicar Atualizações

```bash
# Atualizar CLI
npm update -g vibe-devtools

# Verificar versão
vdt --version

# Atualizar vibes instalados (futuramente)
vdt update --all
```

---

## Contato de Segurança

Para questões de segurança:

📧 **Email**: clebercleberhensel@gmail.com  
🔒 **Assunto**: `[SECURITY] ...`

Para outras questões:
- 💬 [GitHub Discussions](https://github.com/onosendae/vibe-devtools/discussions)
- 🐛 [GitHub Issues](https://github.com/onosendae/vibe-devtools/issues)

---

## Agradecimentos

Agradecemos a todos que reportam vulnerabilidades de forma responsável. Vocês tornam o Vibe DevTools mais seguro para todos! 🙏

### Hall of Fame

Pesquisadores de segurança que ajudaram a melhorar o Vibe DevTools:

- *Aguardando primeiro report* 🎖️

---

**Última Atualização**: Outubro 2025

