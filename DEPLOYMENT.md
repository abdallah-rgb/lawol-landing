# Guide de Déploiement Lawol

Ce document décrit la procédure de déploiement et la configuration de l'infrastructure pour les environnements de **Préproduction** et de **Production**.

## 🏗️ Architecture des Environnements

Nous utilisons deux environnements distincts et isolés :

1.  **Préproduction (`preprod`)** :
    *   **Branche Git** : `staging`
    *   **URL** : `https://preprod.lawol.app` (Exemple)
    *   **Usage** : Tests d'intégration, validation des fonctionnalités avant mise en production.
    *   **Déclencheur** : Commit sur la branche `staging`.

2.  **Production (`production`)** :
    *   **Branche Git** : `main`
    *   **URL** : `https://lawol.app` (Exemple)
    *   **Usage** : Environnement live pour les utilisateurs finaux.
    *   **Déclencheur** : Commit sur la branche `main`.
    *   **Sécurité** : Nécessite une approbation manuelle (si configuré dans GitHub).

---

## 🚀 Configuration GitHub Actions

Le pipeline CI/CD est géré par GitHub Actions via les fichiers :
*   `.github/workflows/deploy-preprod.yml`
*   `.github/workflows/deploy-prod.yml`

### Prérequis : Configuration des Secrets

Pour que le déploiement fonctionne, vous devez configurer les **Environments** et **Secrets** dans votre dépôt GitHub.

1.  Allez dans **Settings** > **Environments**.
2.  Créez deux environnements : `preproduction` et `production`.
3.  Pour l'environnement `production`, activez la case **"Required reviewers"** et ajoutez votre nom d'utilisateur. Cela activera l'étape de validation manuelle.

### Variables et Secrets à définir

Dans chaque environnement GitHub (ou au niveau du repo si partagé), définissez les secrets suivants :

| Secret Name | Description | Exemple |
|-------------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | `https://api.lawol.app` |
| `DATABASE_URL` | Chaîne de connexion BDD | `postgres://...` |
| `STRIPE_SECRET_KEY` | Clé privée Stripe | `sk_live_...` |
| `VERCEL_TOKEN` | Token de déploiement (si Vercel) | `...` |

---

## ☁️ Déploiement Firebase Hosting (Alternative)

Nous avons également configuré un pipeline pour déployer l'application sur Firebase Hosting.

### Configuration Requise

1.  **Générer une clé de compte de service Firebase** :
    *   Allez dans la console Firebase > Paramètres du projet > Comptes de service.
    *   Cliquez sur "Générer une nouvelle clé privée".
    *   Copiez le contenu du fichier JSON téléchargé.

2.  **Ajouter le secret GitHub** :
    *   Allez dans `Settings` > `Secrets and variables` > `Actions`.
    *   Créez un secret nommé `FIREBASE_SERVICE_ACCOUNT_LAWOL_WEB`.
    *   Collez le contenu JSON.

### Fonctionnement

*   Le workflow `.github/workflows/deploy-firebase.yml` se déclenche sur chaque push vers la branche `main`.
*   Il construit l'application Next.js et la déploie sur le projet `lawol-web`.

---

## 🛠️ Scripts Utilitaires

Des scripts sont disponibles dans le dossier `scripts/` pour faciliter la gestion :

*   **`./scripts/deploy.sh [env]`** : Script appelé par la CI pour déployer. Il peut être adapté pour utiliser Vercel, SSH, Docker, etc.
*   **`./scripts/rollback.sh [env] [version]`** : Permet de revenir à une version précédente en cas d'incident.
*   **`./scripts/monitor.sh [env]`** : Vérifie si l'environnement répond (HTTP 200).

## 📦 Procédure de Déploiement

### 1. Déployer en Préproduction
Poussez simplement vos modifications sur la branche `staging` :
```bash
git checkout staging
git merge feature/ma-nouvelle-feature
git push origin staging
```

### 2. Promouvoir en Production
Une fois validé en préprod, fusionnez `staging` vers `main` :
```bash
git checkout main
git merge staging
git push origin main
```
*L'action GitHub se lancera. Si la protection est activée, vous recevrez une notification pour approuver le déploiement.*

## 🔙 Rollback (Retour en arrière)

En cas de problème critique en production :

1.  Identifiez le commit stable précédent.
2.  Utilisez `git revert` ou le script de rollback :
    ```bash
    ./scripts/rollback.sh production
    ```
Ou via l'interface de votre hébergeur (ex: Vercel Dashboard).
