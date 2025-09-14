# Prompt Optimisé pour Claude (AI Assistant) - Projet AI4Dev Blog

## 🎯 INSTRUCTION PRINCIPALE

```markdown
Tu vas créer de zéro un blog technique moderne nommé "AI4Dev" accessible via ai4dev.blog. 
C'est un site spécialisé dans les tutoriels pratiques et actualités sur l'IA pour développeurs.
Le site sera déployé sur Netlify.

IMPORTANT: Tu dois créer TOUS les fichiers nécessaires depuis zéro. Ne suppose aucun fichier existant.
```

## 📋 SPÉCIFICATIONS DÉTAILLÉES

### Contexte et Objectifs
```markdown
NOM DU PROJET: AI4Dev Blog
URL PRODUCTION: https://ai4dev.blog
TYPE: Blog technique statique avec génération côté serveur
PUBLIC CIBLE: Développeurs souhaitant intégrer l'IA dans leurs projets
CONTENU: Tutoriels, guides pratiques, comparatifs d'APIs IA, actualités

OBJECTIFS PRINCIPAUX:
1. Créer une référence pour les développeurs sur l'intégration de l'IA
2. Optimiser pour le SEO (temps de chargement < 1.5s, Core Web Vitals excellents)
3. Permettre une lecture agréable sur tous les appareils
4. Faciliter le partage et la découverte de contenu
```

### Stack Technique Obligatoire
```markdown
FRAMEWORK: Next.js 14+ avec App Router (PAS Pages Router)
LANGAGE: TypeScript en mode strict
STYLING: Tailwind CSS 3.4+ avec plugin Typography
CONTENU: Fichiers MDX dans content/posts/
MARKDOWN: next-mdx-remote pour le parsing
DÉPLOIEMENT: Netlify (créer netlify.toml)
PACKAGE MANAGER: npm uniquement

DEPENDENCIES REQUISES:
- next (^14.2.0)
- react, react-dom (^18.3.0)
- next-mdx-remote (^5.0.0)
- gray-matter (parsing frontmatter)
- reading-time (calcul temps de lecture)
- rehype-highlight (syntax highlighting)
- rehype-slug, rehype-autolink-headings (ancres titres)
- remark-gfm (GitHub Flavored Markdown)
- date-fns (formatage dates)
- lucide-react (icônes)
- clsx (classes conditionnelles)
```

### Structure de Fichiers Exacte
```markdown
ai4dev-blog/
├── app/                      # App Router Next.js
│   ├── layout.tsx           # Layout racine avec metadata
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux Tailwind
│   ├── about/
│   │   └── page.tsx         # Page À propos
│   ├── blog/
│   │   ├── page.tsx         # Liste des articles
│   │   └── [slug]/
│   │       └── page.tsx     # Article individuel
│   ├── api/
│   │   ├── search/
│   │   │   └── route.ts     # API recherche
│   │   └── newsletter/
│   │       └── route.ts     # API newsletter
│   └── robots.txt           # Fichier robots
│   └── sitemap.ts           # Génération sitemap
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigation principale
│   │   └── Footer.tsx       # Pied de page
│   ├── blog/
│   │   ├── PostCard.tsx     # Carte article
│   │   ├── PostList.tsx     # Liste paginée
│   │   └── TableOfContents.tsx # TOC article
│   ├── mdx/
│   │   ├── CodeBlock.tsx    # Bloc de code
│   │   ├── Callout.tsx      # Encadré info/warning
│   │   └── Image.tsx        # Image optimisée
│   └── ui/
│       ├── Button.tsx       # Bouton réutilisable
│       ├── Input.tsx        # Champ de saisie
│       ├── Badge.tsx        # Badge pour tags
│       └── NewsletterForm.tsx # Formulaire newsletter
├── content/
│   └── posts/               # Articles MDX
│       └── [créer 2-3 articles exemples]
├── lib/
│   ├── mdx.ts              # Configuration MDX
│   ├── posts.ts            # Fonctions posts
│   ├── utils.ts            # Utilitaires
│   └── constants.ts        # Configuration site
├── public/
│   ├── images/
│   │   ├── og-image.png    # 1200x630px
│   │   └── logo.svg        # Logo AI4Dev
│   └── favicon.ico
├── types/
│   └── index.ts            # Types TypeScript
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── netlify.toml
└── .env.local.example
```

### Design System et UI
```markdown
COULEURS:
- Primaire: Bleu électrique #2563eb (associé à l'IA/tech)
- Secondaire: Gris ardoise #64748b (texte secondaire)
- Accent: Violet #8b5cf6 (highlights, badges)
- Background: Blanc #ffffff
- Foreground: Noir profond #0a0a0a
- Muted: Gris très clair #f1f5f9 (backgrounds secondaires)
- Border: Gris clair #e2e8f0

TYPOGRAPHIE:
- Font principale: Inter (sans-serif)
- Font code: JetBrains Mono (monospace)
- Taille base: 16px mobile, 17px desktop
- Line-height: 1.75 pour le corps de texte
- Largeur max contenu: 720px (lecture optimale)

ESPACEMENTS:
- Utiliser l'échelle Tailwind par défaut
- Padding conteneur: 16px mobile, 24px tablet, 32px desktop
- Gap entre sections: 64px à 96px

COMPOSANTS UI REQUIS:
1. Header sticky avec navigation (Home, Blog, About)
2. PostCard avec image, titre, excerpt, tags, date, temps lecture
3. Footer avec liens sociaux et copyright
4. Table des matières flottante pour articles
5. Newsletter form avec validation email
6. Boutons partage social (Twitter/X, LinkedIn, Copy)
7. Pagination numérotée pour le blog
8. Badges colorés pour les tags
9. Callouts (info, warning, tip) dans MDX
10. Code blocks avec syntax highlighting et bouton copier
```

### Pages et Contenu
```markdown
PAGE D'ACCUEIL (/):
- Hero section: Titre "AI4Dev", tagline "Master AI Integration in Your Apps"
- Section "Featured Posts" avec 3 articles vedettes
- Section "Latest Posts" avec 6 derniers articles
- Section Newsletter avec form inscription
- Liens vers principales catégories

PAGE BLOG (/blog):
- Titre "All Articles"
- Barre de recherche
- Filtres par tags
- Liste paginée (12 articles/page)
- Pagination numérotée en bas

PAGE ARTICLE (/blog/[slug]):
- Breadcrumb navigation
- Titre H1
- Métadonnées: auteur, date, temps lecture, tags
- Image de couverture
- Table des matières (sticky sidebar desktop)
- Contenu MDX avec tous les composants
- Section "Related Articles" (3 articles)
- Newsletter CTA
- Boutons partage

PAGE ABOUT (/about):
- Mission du site
- Qui sommes-nous
- Sujets couverts
- Contact/réseaux sociaux
```

### Métadonnées et SEO
```markdown
MÉTADONNÉES GLOBALES:
- Titre: "AI4Dev - AI Tutorials & News for Developers"
- Description: "Learn to integrate AI into your applications with practical tutorials, code examples, and the latest AI development news"
- OG Image: 1200x630px avec logo et tagline
- Twitter Card: summary_large_image
- Favicon: Logo AI4Dev

STRUCTURE URLs:
- Articles: /blog/[slug-descriptif-avec-mots-cles]
- Tags: /blog/tag/[tag-name]
- Pagination: /blog?page=2
- Pas de dates dans les URLs

SCHEMA.ORG:
- Type Organization pour le site
- Type BlogPosting pour chaque article
- Type BreadcrumbList pour navigation
- Type Person pour auteur

OPTIMISATIONS SEO:
- Sitemap XML dynamique
- Robots.txt configuré
- Canonical URLs
- Meta descriptions uniques (150-160 car)
- Titres H1 uniques par page
- Alt text descriptif pour images
- Liens internes pertinents
- Structure Hn hiérarchique
```

### Articles MDX (Frontmatter)
```markdown
STRUCTURE FRONTMATTER REQUISE:
---
title: "Titre optimisé SEO (50-60 caractères)"
excerpt: "Description engageante (140-160 caractères)"
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD" (optionnel)
author: "AI4Dev Team"
tags: ["GPT-4", "Tutorial", "API"] (3-5 tags)
coverImage: "/images/posts/nom-image.jpg"
coverImageAlt: "Description précise de l'image"
featured: true/false
---

COMPOSANTS MDX DISPONIBLES:
- Titres H2/H3 (génèrent TOC automatiquement)
- Code blocks avec langage spécifié
- Images avec lazy loading
- Callout (types: info, warning, tip, danger)
- Tableaux GitHub Flavored Markdown
- Listes ordonnées/non ordonnées
- Liens externes (s'ouvrent nouvel onglet)
- Vidéos YouTube embed (optionnel)
```

### Performance et Optimisation
```markdown
OBJECTIFS PERFORMANCE:
- Lighthouse Score > 95 (tous les metrics)
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

OPTIMISATIONS REQUISES:
- Images: Format WebP/AVIF avec fallback
- Lazy loading pour images hors viewport
- Fonts: Préchargement Inter, font-display: swap
- CSS: Purge Tailwind classes non utilisées
- JS: Code splitting automatique Next.js
- Cache: Headers immutables pour assets statiques
- Compression: Gzip/Brotli via Netlify

ACCESSIBILITÉ (WCAG 2.1 AA):
- Contraste minimum 4.5:1 texte normal
- Contraste minimum 3:1 gros texte
- Navigation clavier complète
- Skip links
- ARIA labels appropriés
- Focus visible
- Alt text sur toutes les images
```

### Configuration Netlify
```markdown
FICHIER netlify.toml REQUIS:
- Build command: npm run build
- Publish directory: .next
- Plugin Next.js Netlify
- Headers sécurité (CSP, X-Frame-Options, etc.)
- Redirects (www vers non-www)
- Cache control pour assets statiques

VARIABLES D'ENVIRONNEMENT:
- NEXT_PUBLIC_SITE_URL=https://ai4dev.blog
- NEXT_PUBLIC_GA_ID (Google Analytics)
- NEWSLETTER_API_KEY (si service externe)
```

### Contenu Initial
```markdown
CRÉER 3 ARTICLES EXEMPLES:
1. "Getting Started with GPT-4 API: Developer Guide"
   - Installation et configuration
   - Premier appel API
   - Gestion des erreurs
   - Best practices

2. "Claude vs ChatGPT: Choosing the Right AI API"
   - Comparaison features
   - Pricing
   - Use cases
   - Code examples

3. "Building an AI-Powered Code Review Bot"
   - Architecture
   - Intégration GitHub
   - Prompts engineering
   - Déploiement
```

### Instructions Spéciales
```markdown
IMPORTANT - ÉVITER CES ERREURS:
1. NE PAS utiliser Pages Router, uniquement App Router
2. NE PAS oublier les metadata Next.js pour SEO
3. NE PAS hardcoder les valeurs, utiliser constants.ts
4. NE PAS oublier la gestion d'erreur (404, erreurs API)
5. NE PAS omettre les types TypeScript (mode strict)
6. NE PAS utiliser 'use client' sauf si nécessaire
7. NE PAS oublier le responsive design mobile-first
8. NE PAS créer de dépendances circulaires

BONNES PRATIQUES À SUIVRE:
1. Server Components par défaut
2. Génération statique pour les articles
3. ISR (Incremental Static Regeneration) optionnel
4. Composants atomiques réutilisables
5. Séparation logique métier dans /lib
6. Types TypeScript pour tout
7. Commits atomiques avec messages clairs
8. Comments dans le code pour parties complexes

ORDRE DE CRÉATION SUGGÉRÉ:
1. Setup initial (package.json, configs)
2. Layout et structure de base
3. Pages principales
4. Système de posts MDX
5. Composants UI
6. API routes
7. Optimisations et polish
```

## 🚀 COMMANDE DE DÉMARRAGE

```markdown
Pour commencer, crée d'abord:
1. package.json avec toutes les dépendances
2. Structure de dossiers complète
3. Fichiers de configuration (next.config.js, tailwind.config.ts, tsconfig.json)
4. Layout principal et page d'accueil
5. Un premier article MDX exemple

Ensuite, implémente progressivement les autres fonctionnalités.
Chaque fichier doit être complet et fonctionnel.
```