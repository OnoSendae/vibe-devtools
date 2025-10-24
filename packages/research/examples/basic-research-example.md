# Basic Research Example
## Seu Primeiro Fluxo de Pesquisa com @vibes/research

**Tempo estimado**: 5 minutos  
**Nível**: Iniciante  
**Objetivo**: Fazer sua primeira pesquisa profunda usando o vibe research

---

## 🎯 O Que Você Vai Fazer

Neste exemplo, você vai:
1. Instalar o vibe research
2. Fazer uma pesquisa simples sobre um tópico
3. Ver os resultados gerados
4. Entender a estrutura de outputs

---

## 📦 Passo 1: Instalação

### Opção A: Via CLI vibes (Recomendado)

```bash
npx vibes install github:vibes-org/research
```

### Opção B: Local (se já tem o código)

```bash
npx vibes install ./research
```

**O que acontece**:
- Vibe é copiado para `~/.vibes/packages/research@2.0.0/`
- Commands ficam disponíveis em `.cursor/commands/`
- Templates ficam acessíveis

---

## 🔍 Passo 2: Sua Primeira Pesquisa

Abra o Cursor e execute:

```
/research.pipeline "TypeScript dependency injection patterns" simple
```

**Parâmetros**:
- **Tema**: "TypeScript dependency injection patterns"
- **Modo**: `simple` (pesquisa rápida - 3-5 min)

**O que acontece**:
1. Sistema gera queries de busca
2. Coleta 20 referências da web
3. Pontua referências (0-10)
4. Analisa top 25% (5 melhores)
5. Gera síntese final

---

## 📊 Passo 3: Ver Resultados

### Estrutura Criada

```
./memory/typescript-dependency-injection-patterns/
├── metadata.json                    # Metadados completos
├── README.md                        # Navegação
├── references/                      # Análises individuais
│   ├── ref-001-*.md
│   ├── ref-002-*.md
│   └── ...
└── syntheses/
    └── SYNTH-FINAL.md              # Síntese consolidada ← LER AQUI
```

### Ver Síntese Final

```bash
cat ./memory/typescript-dependency-injection-patterns/syntheses/SYNTH-FINAL.md
```

Ou abrir no Cursor para navegar.

---

## 🎓 Passo 4: Entender os Outputs

### metadata.json
Contém todas as informações da pesquisa:
- Objetivo e escopo
- Status e progresso
- Lista de referências coletadas
- Estatísticas agregadas

### references/
Análises profundas de cada referência:
- Findings principais
- Citações importantes
- Avaliação crítica
- Confidence levels

### syntheses/SYNTH-FINAL.md
Documento consolidado com:
- Executive summary
- Top 10 insights
- Patterns identificados
- Recomendações práticas
- Gaps de conhecimento

---

## 🚀 Próximos Passos

### Fazer Pesquisa Profunda

```
/research.pipeline "React Server Components performance" deep
```

**Diferenças do modo `deep`**:
- 50 referências coletadas
- Top 20% analisadas (10 refs)
- Sínteses incrementais a cada 10 refs
- Pausas para revisão

### Fazer Pesquisa Expert

```
/research.pipeline "Large Language Models fine-tuning" expert
```

**Diferenças do modo `expert`**:
- 100+ referências
- Top 20% analisadas (20+ refs)
- Validação cruzada completa
- Métricas de qualidade
- Relatório acadêmico multi-parte

---

## 📚 Outros Commands Disponíveis

### Analisar Projeto GitHub

```
/research.github facebook/react --depth detailed
```

### Pipeline Manual (Controle Total)

```
# 1. Inicializar
/research.initialize "Como implementar autenticação OAuth2?"

# 2. Buscar referências
/research.search typescript-oauth2-auth

# 3. Pontuar
/research.score typescript-oauth2-auth

# 4. Analisar
/research.analyze typescript-oauth2-auth

# 5. Sintetizar
/research.synthesize typescript-oauth2-auth --final

# 6. Validar
/research.validate typescript-oauth2-auth
```

---

## 🔧 Troubleshooting

### Comando não encontrado

**Problema**: `/research.pipeline` não aparece no Cursor

**Solução**:
1. Verificar que vibe foi instalado: `vibes list`
2. Recarregar Cursor (Cmd+Shift+P → Reload Window)
3. Verificar symlinks: `ls -la .cursor/commands/research.*`

### Pesquisa muito lenta

**Problema**: Pesquisa expert demora muito

**Solução**:
- Use modo `simple` para validação rápida
- Use modo `deep` para maioria dos casos
- Reserve `expert` para pesquisas críticas

### Referências duplicadas

**Problema**: Mesma referência aparece múltiplas vezes

**Solução**: 
- Normal - sistema identifica duplicatas
- Aparece apenas uma vez na síntese final

---

## 💡 Dicas

1. **Comece simples**: Use modo `simple` para validar conceito
2. **Seja específico**: Quanto mais específico o tema, melhores os resultados
3. **Leia a síntese**: SYNTH-FINAL.md tem tudo consolidado
4. **Use comandos manuais**: Para controle total sobre cada fase
5. **Customize**: Ajuste config em `research/vibe.json`

---

## 📖 Documentação Completa

- **README**: `research/README.md`
- **Constitution**: `research/constitution.md`
- **Guia de Migração**: `research/GUIA-MIGRACAO.md`
- **Análise de Commands**: `research/ANALISE-COMMANDS-MELHORIAS.md`

---

## 🎉 Conclusão

Parabéns! Você executou sua primeira pesquisa profunda com rigor acadêmico usando @vibes/research.

**Próximo**: Experimente pesquisar sobre algo do seu interesse e explore os diferentes níveis de profundidade!

**Compartilhe**: Se achar útil, compartilhe com colegas desenvolvedores!

---

**Versão**: 2.0.0  
**Última Atualização**: 2025-10-21

