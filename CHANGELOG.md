# Changelog

Toutes les modifications notables apportées à ce projet seront documentées dans ce fichier.

## [Unreleased]

### Ajouté
- **Rendu des images Lexical** : Support des "upload nodes" dans `lexicalRender.ts` pour afficher les images insérées directement depuis l'éditeur de texte riche de Payload.
- **Mode d'affichage d'image** : Prise en charge du choix `imageDisplayMode` (cover ou contain) pour les composants `ProjectCard.astro` et la page de détail `[slug].astro`.
- **Variable Fonts** : Remplacement des multiples fichiers de polices par 2 fichiers de Variable Fonts (`@fontsource-variable/inter`, `@fontsource-variable/space-grotesk`) pour drastiquement accélérer le temps de chargement.

### Modifié
- **Optimisation PageSpeed (Score: 99/100)** :
  - **Auto-hébergement** : Remplacement des liens CDN Google Fonts par Fontsource.
  - **Images WebP** : Utilisation de la taille d'image optimisée "card" (768px) provenant de l'API Payload au lieu de l'image originale non redimensionnée.
  - **Mise en cache** : Configuration complète du fichier `public/.htaccess` avec ExpiresByType et DEFLATE.
- **Rendu Typographique (Lexical)** : Amélioration des espacements (paddings, margins), des blockquotes stylisés, et de la gestion des paragraphes vides dans `lexicalRender.ts` pour améliorer l'esthétique des sections "À propos" et des pages de projets.
- **Accessibilité** : Assombrissement de la couleur principale (`#7c3aed`) pour assurer un ratio de contraste valide (WCAG AA).

### Supprimé
- Suppression de l'appel erroné vers `noise.png` qui causait des erreurs 404 dans la console.
- Remplacement des balises `<Image />` spécifiques d'Astro par des balises `<img>` standards pour corriger un problème de build causé par la vérification SSL en environnement de CI/CD.
