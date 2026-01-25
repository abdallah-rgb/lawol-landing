#!/bin/bash

# Script de rollback générique
# Usage: ./rollback.sh [environment] [version_id]

ENV=$1
VERSION_ID=$2

if [ -z "$ENV" ]; then
  echo "Usage: $0 [preprod|production] [version_id]"
  exit 1
fi

echo "⏮️  Démarrage du rollback pour l'environnement : $ENV"

if [ -z "$VERSION_ID" ]; then
  echo "⚠️  Aucun ID de version spécifié. Tentative de retour à la version précédente..."
  # Logique pour trouver la version précédente
else
  echo "🎯 Retour à la version spécifique : $VERSION_ID"
fi

# EXEMPLE: Commande Vercel Rollback
# npx vercel rollback $VERSION_ID --token=$VERCEL_TOKEN

# EXEMPLE: Git Revert & Deploy
# git revert $VERSION_ID
# ./scripts/deploy.sh $ENV

echo "✅ Rollback effectué sur $ENV."
