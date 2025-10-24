#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

print_header() {
    echo ""
    echo "═══════════════════════════════════════════════════════"
    echo "  $1"
    echo "═══════════════════════════════════════════════════════"
    echo ""
}

print_step() {
    echo ""
    echo "→ $1"
    echo ""
}

print_success() {
    echo "✅ $1"
}

print_error() {
    echo "❌ $1"
}

check_npm_login() {
    if ! npm whoami &> /dev/null; then
        print_error "Não está logado no npm"
        echo "Execute: npm login"
        exit 1
    fi
    print_success "Logado no npm como: $(npm whoami)"
}

show_current_versions() {
    print_step "Versões atuais:"
    
    cd "$ROOT_DIR/packages/basic"
    BASIC_VERSION=$(node -p "require('./package.json').version")
    echo "  @vibe-devtools/basic:    $BASIC_VERSION"
    
    cd "$ROOT_DIR/packages/research"
    RESEARCH_VERSION=$(node -p "require('./package.json').version")
    echo "  @vibe-devtools/research: $RESEARCH_VERSION"
    
    cd "$ROOT_DIR"
}

bump_version() {
    local package=$1
    local bump_type=$2
    
    print_step "Bumping $package version ($bump_type)"
    
    cd "$ROOT_DIR/packages/$package"
    
    npm version "$bump_type" --no-git-tag-version
    
    NEW_VERSION=$(node -p "require('./package.json').version")
    print_success "$package → v$NEW_VERSION"
    
    cd "$ROOT_DIR"
}

commit_and_push() {
    local message=$1
    
    print_step "Commit e push das mudanças"
    
    git add .
    git commit -m "$message"
    git push origin main
    
    print_success "Push concluído!"
}

publish_manual() {
    local package=$1
    
    print_step "Publicando $package manualmente"
    
    cd "$ROOT_DIR/packages/$package"
    npm publish --access public
    
    print_success "$package publicado!"
    
    cd "$ROOT_DIR"
}

show_menu() {
    print_header "Publish Helper - Vibe DevTools"
    
    echo "Escolha uma opção:"
    echo ""
    echo "  1) Bump PATCH ambos packages (1.0.0 → 1.0.1)"
    echo "  2) Bump PATCH apenas basic"
    echo "  3) Bump PATCH apenas research"
    echo "  4) Bump MINOR ambos packages (1.0.0 → 1.1.0)"
    echo "  5) Bump MINOR apenas basic"
    echo "  6) Bump MINOR apenas research"
    echo "  7) Publicar manualmente (LOCAL - requer npm login)"
    echo "  8) Ver versões atuais"
    echo "  9) Ajuda"
    echo "  0) Sair"
    echo ""
}

show_help() {
    print_header "Como Funciona"
    
    cat << EOF
Este script ajuda a publicar packages do Vibe DevTools.

WORKFLOWS DISPONÍVEIS:

1. Automático (Recomendado)
   - Bump version aqui
   - Script faz commit e push
   - GitHub Actions publica automaticamente
   
2. Manual Local
   - Publica diretamente do seu terminal
   - Requer 'npm login'
   - Útil para testes

TIPOS DE BUMP:

- PATCH (1.0.0 → 1.0.1)
  Para: docs, bugfixes, pequenas mudanças
  
- MINOR (1.0.0 → 1.1.0)
  Para: novas features, sem breaking changes
  
- MAJOR (1.0.0 → 2.0.0)
  Para: breaking changes
  (Use opção custom para major)

APÓS PUBLICAÇÃO:

Verificar no npm:
  npm view @vibe-devtools/basic version
  npm view @vibe-devtools/research version

URLs:
  https://www.npmjs.com/package/@vibe-devtools/basic
  https://www.npmjs.com/package/@vibe-devtools/research

EOF
}

main() {
    cd "$ROOT_DIR"
    
    while true; do
        show_menu
        read -p "Opção: " option
        
        case $option in
            1)
                show_current_versions
                bump_version "basic" "patch"
                bump_version "research" "patch"
                commit_and_push "chore: bump packages to patch version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                echo "Acompanhe em: https://github.com/onosendae/vibe-devtools/actions"
                break
                ;;
            2)
                show_current_versions
                bump_version "basic" "patch"
                commit_and_push "chore: bump basic to patch version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                break
                ;;
            3)
                show_current_versions
                bump_version "research" "patch"
                commit_and_push "chore: bump research to patch version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                break
                ;;
            4)
                show_current_versions
                bump_version "basic" "minor"
                bump_version "research" "minor"
                commit_and_push "feat: bump packages to minor version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                break
                ;;
            5)
                show_current_versions
                bump_version "basic" "minor"
                commit_and_push "feat: bump basic to minor version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                break
                ;;
            6)
                show_current_versions
                bump_version "research" "minor"
                commit_and_push "feat: bump research to minor version"
                print_header "Concluído!"
                echo "GitHub Actions vai publicar automaticamente em ~2-3 minutos"
                break
                ;;
            7)
                print_header "Publicação Manual"
                check_npm_login
                show_current_versions
                echo ""
                echo "Qual package publicar?"
                echo "  1) basic"
                echo "  2) research"
                echo "  3) ambos"
                read -p "Opção: " pkg_option
                
                case $pkg_option in
                    1)
                        publish_manual "basic"
                        ;;
                    2)
                        publish_manual "research"
                        ;;
                    3)
                        publish_manual "basic"
                        publish_manual "research"
                        ;;
                    *)
                        print_error "Opção inválida"
                        ;;
                esac
                break
                ;;
            8)
                show_current_versions
                ;;
            9)
                show_help
                ;;
            0)
                echo "Saindo..."
                exit 0
                ;;
            *)
                print_error "Opção inválida"
                ;;
        esac
    done
}

main "$@"

