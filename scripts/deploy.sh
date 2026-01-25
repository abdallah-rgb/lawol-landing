#!/bin/bash

# Script de déploiement générique
# Usage: ./deploy.sh [environment]

ENV=$1

if [ -z "$ENV" ]; then
  echo "Usage: $0 [preprod|production]"
  exit 1
fi

echo "🚀 Démarrage du déploiement pour l'environnement : $ENV"

# 1. Chargement des variables d'environnement
if [ -f ".env.$ENV.local" ]; then
  echo "📥 Chargement de la configuration $ENV..."
  export $(cat .env.$ENV.local | xargs)
else
  echo "⚠️  Attention : Fichier .env.$ENV.local non trouvé. Utilisation des variables système."
fi

# 2. Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci

# 3. Construction de l'application
echo "🏗️  Construction de l'application..."
npm run build

# 4. Déploiement (Simulation ou Commande réelle)
echo "🚀 Déploiement vers l'infrastructure $ENV..."

# EXEMPLE: Commande Vercel (à décommenter si Vercel est utilisé)
# if [ "$ENV" == "production" ]; then
#   npx vercel deploy --prod --token=$VERCEL_TOKEN
# else
#   npx vercel deploy --token=$VERCEL_TOKEN
# fi

# EXEMPLE: Commande SSH/Rsync (à décommenter si VPS)
# if [ "$ENV" == "production" ]; then
#   rsync -avz --delete out/ user@prod-server:/var/www/lawol-app/
# else
#   rsync -avz --delete out/ user@preprod-server:/var/www/lawol-app/
# fi

echo "✅ Déploiement terminé avec succès sur $ENV !"
