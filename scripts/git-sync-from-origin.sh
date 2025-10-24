#!/bin/bash

set -e

BRANCH=${1:-$(git branch --show-current)}

echo "🔄 Sincronizando backup com PRs/merges remotos"
echo "📍 Branch: $BRANCH"
echo ""

echo "1️⃣  Pulling from origin..."
if git pull origin "$BRANCH"; then
    echo "✅ Pull from origin successful"
else
    echo "❌ Pull from origin failed"
    exit 1
fi

echo ""
echo "2️⃣  Pushing to backup..."
if git push backup "$BRANCH"; then
    echo "✅ backup atualizado com mudanças de origin"
else
    echo "❌ backup: Push failed"
    exit 1
fi

echo ""
echo "🎉 Backup sincronizado com origin!"
echo "   Mudanças remotas (PRs) agora estão no backup"

