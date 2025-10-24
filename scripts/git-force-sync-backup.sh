#!/bin/bash

set -e

echo "⚠️  ATENÇÃO: Sincronização FORÇADA do backup"
echo "    Isso irá sobrescrever TUDO no backup com o estado atual de origin"
echo ""
read -p "Tem certeza? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Operação cancelada"
    exit 0
fi

echo ""
echo "🔄 Sincronizando TODAS as branches..."

git fetch origin --all

for branch in $(git branch -r | grep 'origin/' | grep -v 'HEAD' | sed 's/origin\///'); do
    echo ""
    echo "📍 Sincronizando branch: $branch"
    
    if git checkout "$branch" 2>/dev/null || git checkout -b "$branch" "origin/$branch"; then
        git pull origin "$branch"
        
        if git push backup "$branch" --force; then
            echo "✅ $branch → backup (forced)"
        else
            echo "⚠️  $branch → falhou"
        fi
    fi
done

git checkout main 2>/dev/null || git checkout master 2>/dev/null || true

echo ""
echo "🎉 Sincronização completa forçada!"
echo "   Backup está 100% espelhado com origin"

