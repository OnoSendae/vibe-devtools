#!/bin/bash

set -e

BRANCH=${1:-$(git branch --show-current)}

echo "🔄 Git RAID Push - Sincronizando origin + backup"
echo "📍 Branch: $BRANCH"
echo ""

echo "1️⃣  Pushing to origin..."
if git push origin "$BRANCH"; then
    echo "✅ origin: Push successful"
else
    echo "❌ origin: Push failed"
    exit 1
fi

echo ""
echo "2️⃣  Pushing to backup..."
if git push backup "$BRANCH"; then
    echo "✅ backup: Push successful"
else
    echo "⚠️  backup: Push failed (origin já foi atualizado)"
    exit 1
fi

echo ""
echo "🎉 Sincronização completa!"
echo "   origin: OnoSendae/vibe-devtools"
echo "   backup: OnoSendae/vibe-devtools-bkp"

