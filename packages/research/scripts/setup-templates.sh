#!/bin/bash

# Setup Templates - Research Module
# Este script copia os templates para dentro da estrutura de research e atualiza todas as referências

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretórios
RESEARCH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIBES_TEMPLATES_DIR="$RESEARCH_DIR/../vibes/structure/templates"
RESEARCH_TEMPLATES_DIR="$RESEARCH_DIR/templates"
COMMANDS_DIR="$RESEARCH_DIR/.cursor/commands"

echo -e "${GREEN}=== Setup Templates - Research Module ===${NC}\n"

# Função para verificar se diretório existe
check_directory() {
    if [ ! -d "$1" ]; then
        echo -e "${RED}ERRO: Diretório não encontrado: $1${NC}"
        exit 1
    fi
}

# Verificar diretórios
echo -e "${YELLOW}Verificando diretórios...${NC}"
check_directory "$RESEARCH_DIR"
check_directory "$VIBES_TEMPLATES_DIR"
check_directory "$COMMANDS_DIR"

# Criar diretório de templates se não existir
if [ ! -d "$RESEARCH_TEMPLATES_DIR" ]; then
    echo -e "${YELLOW}Criando diretório de templates...${NC}"
    mkdir -p "$RESEARCH_TEMPLATES_DIR"
fi

# Copiar templates
echo -e "\n${YELLOW}Copiando templates...${NC}"

TEMPLATES=(
    "template.research-metadata.json"
    "template.research-report.md"
    "template.research-reference-analysis.md"
    "template.research-synthesis.md"
)

for template in "${TEMPLATES[@]}"; do
    SRC="$VIBES_TEMPLATES_DIR/$template"
    DST="$RESEARCH_TEMPLATES_DIR/$template"
    
    if [ -f "$SRC" ]; then
        cp "$SRC" "$DST"
        echo -e "  ${GREEN}✓${NC} $template"
    else
        echo -e "  ${RED}✗${NC} $template (não encontrado)"
    fi
done

# Verificar templates copiados
echo -e "\n${YELLOW}Verificando templates copiados...${NC}"
for template in "${TEMPLATES[@]}"; do
    DST="$RESEARCH_TEMPLATES_DIR/$template"
    if [ -f "$DST" ]; then
        SIZE=$(wc -c < "$DST")
        echo -e "  ${GREEN}✓${NC} $template ($SIZE bytes)"
    else
        echo -e "  ${RED}✗${NC} $template (não copiado)"
    fi
done

# Atualizar referências nos commands
echo -e "\n${YELLOW}Atualizando referências nos commands...${NC}"

# Contar arquivos antes
TOTAL_FILES=$(find "$COMMANDS_DIR" -name "*.md" -type f | wc -l)
echo -e "  Total de arquivos: $TOTAL_FILES"

# Atualizar referências
UPDATED=0
for file in "$COMMANDS_DIR"/*.md; do
    if grep -q "vibes/structure/templates/template\.research" "$file"; then
        sed -i '' 's|vibes/structure/templates/template\.research|research/templates/template.research|g' "$file"
        UPDATED=$((UPDATED + 1))
        echo -e "  ${GREEN}✓${NC} $(basename "$file")"
    fi
done

echo -e "  ${GREEN}Arquivos atualizados: $UPDATED${NC}"

# Verificar atualização
echo -e "\n${YELLOW}Verificando atualização...${NC}"
OLD_REFS=$(grep -r "vibes/structure/templates/template\.research" "$COMMANDS_DIR" | wc -l)
NEW_REFS=$(grep -r "research/templates/template\.research" "$COMMANDS_DIR" | wc -l)

if [ "$OLD_REFS" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} Nenhuma referência antiga encontrada"
else
    echo -e "  ${YELLOW}⚠${NC} Ainda existem $OLD_REFS referências antigas"
fi

echo -e "  ${GREEN}✓${NC} $NEW_REFS referências novas encontradas"

# Resumo
echo -e "\n${GREEN}=== Resumo ===${NC}"
echo -e "  Templates copiados: ${#TEMPLATES[@]}"
echo -e "  Commands atualizados: $UPDATED"
echo -e "  Referências atualizadas: $NEW_REFS"

# Verificar estrutura final
echo -e "\n${YELLOW}Estrutura final:${NC}"
echo -e "  ${GREEN}research/templates/${NC}"
ls -lh "$RESEARCH_TEMPLATES_DIR" | tail -n +2 | awk '{print "    " $9 " (" $5 ")"}'

echo -e "\n${GREEN}✓ Setup concluído com sucesso!${NC}\n"

