# Spécifications des Couleurs et Accessibilité (Mode Sombre)

Ce document détaille l'analyse des couleurs et les ajustements nécessaires pour garantir la conformité aux normes WCAG (AA minimum, AAA recommandé) en mode sombre pour l'interface de recherche (`SearchInterface.tsx`).

## Références Globales (Mode Sombre)
Basé sur `globals.css`:
- **Background (`--background`)**: `#0a0a0a` (Très proche du noir)
- **Foreground (`--foreground`)**: `#fafafa` (Blanc cassé, Zinc 50)
- **Muted Foreground (`--muted-foreground`)**: `#d4d4d8` (Zinc 300)
- **Card (`--card`)**: `#0a0a0a`
- **Primary**: `#00796B` (Teal)

## Analyse des Contrastes Actuels

### 1. Texte Secondaire / Muted
- **Classe actuelle**: `dark:text-white/40`
- **Couleur approximative**: `rgba(255, 255, 255, 0.4)` ≈ `#666666`
- **Arrière-plan**: `#0a0a0a` (Background) ou `#18181b` (Zinc 900)
- **Ratio de Contraste**:
  - Sur `#0a0a0a`: ~3.8:1 (**ÉCHEC AA** pour texte < 18pt)
  - Sur `#18181b`: ~3.5:1 (**ÉCHEC AA**)
- **Recommandation**: Remplacer par `text-muted-foreground` (`#d4d4d8`) ou `dark:text-zinc-400` (`#a1a1aa`).
  - `text-muted-foreground` sur `#0a0a0a`: ~13.6:1 (**PASS AAA**)
  - `dark:text-zinc-400` sur `#0a0a0a`: ~9.0:1 (**PASS AAA**)

### 2. Texte Tertiaire / Détails
- **Classe actuelle**: `dark:text-white/60`
- **Couleur approximative**: `rgba(255, 255, 255, 0.6)` ≈ `#999999`
- **Ratio de Contraste**:
  - Sur `#0a0a0a`: ~8.6:1 (**PASS AAA**)
- **Observation**: Bien que conforme, l'utilisation de `text-muted-foreground` est préférable pour la cohérence, sauf si une hiérarchie visuelle distincte est requise.

### 3. Textes sur Fonds Colorés (Badges, Alertes)
- **Exemple**: `dark:text-blue-200` sur `dark:bg-blue-900/20`
- **Analyse**: Le bleu clair sur fond sombre est généralement très lisible.
- **Ratio**: Excellent (> 7:1).

## Plan d'Ajustement (`SearchInterface.tsx`)

Les modifications suivantes seront appliquées pour garantir l'accessibilité :

| Élément | Classe Actuelle (Dark) | Nouvelle Classe (Dark) | Raison |
|---------|------------------------|------------------------|--------|
| Statut scan (sous-titre) | `dark:text-white/60` | `text-muted-foreground` | Cohérence et contraste max. |
| Résultat VIN (sous-titre) | `dark:text-white/60` | `text-muted-foreground` | Cohérence. |
| Accordéon "Véhicules Compatibles" | `dark:text-white/40` | `text-muted-foreground` | **Correction AA** (3.5 -> 13.6). |
| Liste véhicules (année) | `dark:text-white/40` | `text-muted-foreground` | **Correction AA**. |
| Overlay 3D "Tournez pour explorer" | `dark:text-white/40` | `dark:text-white/70` | **Correction AA** tout en gardant l'aspect overlay. |
| Prix estimé / Détails | `dark:text-white/40` | `text-muted-foreground` | **Correction AA**. |

## Validation Visuelle
L'utilisation systématique de `text-muted-foreground` (`#d4d4d8`) en mode sombre assure non seulement la conformité WCAG AAA dans la plupart des cas, mais aussi une meilleure cohérence avec le système de design shadcn/ui utilisé.
