#!/bin/bash

# Script de surveillance (Health Check)
# Usage: ./monitor.sh [environment]

ENV=$1

if [ "$ENV" == "production" ]; then
  URL="https://lawol.app"
elif [ "$ENV" == "preprod" ]; then
  URL="https://preprod.lawol.app"
else
  echo "Usage: $0 [preprod|production]"
  exit 1
fi

echo "🩺 Vérification de l'état de santé de $ENV ($URL)..."

STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}\n" $URL)

if [ "$STATUS_CODE" == "200" ]; then
  echo "✅ Système opérationnel (Status: $STATUS_CODE)"
  exit 0
else
  echo "❌ Problème détecté ! (Status: $STATUS_CODE)"
  exit 1
fi
