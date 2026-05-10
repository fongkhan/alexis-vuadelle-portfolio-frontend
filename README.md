# Alexis Vuadelle - Portfolio Frontend

Ce dépôt contient le code source de l'interface publique du portfolio d'Alexis Vuadelle. Le site est construit avec **Astro**, généré statiquement (SSG), et connecté de manière découplée à un CMS headless **Payload CMS**.

## 🚀 Performances (PageSpeed Insights)

Ce site a été fortement optimisé pour garantir les meilleures performances possibles sur mobile et desktop :
- **Score Mobile** : 99/100
- **Score Desktop** : 99/100

**Optimisations implémentées :**
- ⚡️ **Polices auto-hébergées (Variable Fonts)** : Utilisation de polices variables (`@fontsource-variable/inter` et `space-grotesk`) servies localement pour éliminer les dépendances tierces (Google Fonts CDN) et réduire les requêtes.
- 🖼️ **Images WebP Responsives** : Consommation des images générées par Payload CMS avec des dimensions et poids optimisés.
- 🏎️ **Mise en cache** : Fichier `.htaccess` sur mesure pour forcer la mise en cache navigateur et la compression GZIP/Deflate.
- 🎨 **Contraste & Accessibilité** : Palette de couleurs ajustée pour respecter les normes WCAG AA.
- 🧱 **DOM allégé** : Nettoyage des balises et dépendances inutiles.

## 🛠️ Architecture

1. **Astro (SSG)** : Le site est généré au moment du build.
2. **Tailwind CSS** : Framework utilitaire pour le style.
3. **Payload CMS API** : Les données sont récupérées via l'API REST de Payload (`/api/projects`, `/api/globals/home-page`, etc.).
4. **O2switch (Hébergement)** : Le site est déployé via un webhook automatisé qui lance le script `build_astro.sh` lors d'un changement de contenu.

## 💻 Développement Local

### Prérequis
- Node.js (v20 ou v22 recommandé)
- npm

### Installation
```bash
# 1. Cloner le projet
git clone <votre_url_git>
cd alexis-vuadelle-portfolio-frontend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.example .env
# Assurez-vous de définir PAYLOAD_API_URL=http://localhost:3000/api

# 4. Lancer le serveur de développement
npm run dev
```

Rendez-vous sur `http://localhost:4321` !

## 📝 Rendu Lexical (Rich Text)

Le composant `lexicalRender.ts` est responsable de la conversion du format JSON généré par l'éditeur de texte riche de Payload CMS en HTML stylisé (Tailwind Typography). Il supporte les textes, liens, listes, citations (blockquotes) et les **images uploadées**.
