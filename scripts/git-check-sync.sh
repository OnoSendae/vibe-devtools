#!/bin/bash

git fetch --all -q 2>/dev/null

echo "📊 Status de Sincronização - Git RAID 1"
echo "========================================"
echo ""

branches=("main" "develop" "feat/develop/multi-agent-support")

synced=0
divergent=0
total=0

for branch in "${branches[@]}"; do
    if git show-ref --verify --quiet refs/remotes/origin/$branch 2>/dev/null; then
        total=$((total + 1))
        origin_hash=$(git rev-parse origin/$branch 2>/dev/null)
        backup_hash=$(git rev-parse backup/$branch 2>/dev/null)
        
        echo "📍 Branch: $branch"
        echo "   origin: ${origin_hash:0:8}"
        echo "   backup: ${backup_hash:0:8}"
        
        if [ "$origin_hash" = "$backup_hash" ]; then
            echo "   ✅ Sincronizado"
            synced=$((synced + 1))
        else
            echo "   ⚠️  DIVERGENTE"
            divergent=$((divergent + 1))
        fi
        echo ""
    fi
done

echo "========================================"
echo "📊 Resumo:"
echo "   Total de branches: $total"
echo "   ✅ Sincronizadas: $synced"
echo "   ⚠️  Divergentes: $divergent"
echo ""

if [ $divergent -eq 0 ]; then
    echo "🎉 Sistema 100% sincronizado!"
    exit 0
else
    echo "⚠️  Execute: ./scripts/git-sync-from-origin.sh"
    exit 1
fi

