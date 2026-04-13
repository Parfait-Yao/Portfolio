# Parfait Eric - Portfolio & CMS

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.6-2D3748?style=for-the-badge&logo=prisma)
![Neon](https://img.shields.io/badge/Neon-Postgres-00E599?style=for-the-badge&logo=postgresql)

Ceci est le code source de mon portfolio personnel de développeur Fullstack. Ce n'est pas uniquement un site vitrine, mais une application complète dotée d'un tableau de bord administratif (CMS sur mesure) pour gérer en temps réel le contenu du site.

## ✨ Fonctionnalités Principales

### Section Publique (Visiteur)
- **Design Moderne & Bilingue** : Interface premium (Glassmorphism, animations fluides via Framer Motion) et multilingue (Français / Anglais).
- **Thèmes Dynamiques** : Un sélecteur de thème permettant de basculer entre mode **Clair/Sombre** et de choisir une **couleur d'accentuation** parmi 6 palettes.
- **Vitrines Dynamiques** : Affichage côté client des Projets, Compétences et Expériences, directement alimentés par la base de données.
- **Système de Contact** : Formulaire de contact fonctionnel avec notifications par email (via Resend) et enregistrement en base de données.

### Section Administration (CMS)
- **Authentification Sécurisée** : Connexion protégée via *Auth.js (NextAuth v5)*.
- **Gestion des Projets** : Ajout, édition, suppression de projets avec upload d'images sur Cloudinary.
- **Gestion des Compétences** : Création de compétences avec gestion de niveau (barre de progression) et catégorisation.
- **Gestion des Expériences** : Interface dédiée pour l'historique professionnel.
- **Tableau de Bord Interactif** : Suivi des statistiques globales (messages reçus, nombre de projets publiés, etc.).
- **Cohérence Visuelle** : Toute l'interface d'administration hérite automatiquement du thème et de la couleur d'accentuation choisis sur la plateforme globale.

## 🛠️ Stack Technique

- **Framework** : [Next.js (App Router)](https://nextjs.org/) + React 19
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) + Shadcn/ui & Radix UI (composants accessibles)
- **Base de Données** : [PostgreSQL](https://www.postgresql.org/) hébergé sur [Neon](https://neon.tech/)
- **ORM** : [Prisma](https://www.prisma.io/)
- **Authentification** : Auth.js (NextAuth.js v5)
- **Stockage Médias** : [Cloudinary](https://cloudinary.com/)
- **Envois d'Emails** : [Resend](https://resend.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)

## 🚀 Installation & Développement local

1. **Cloner le repository**
```bash
git clone https://github.com/Parfait-Yao/Portfolio.git
cd Portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créez un fichier `.env` à la racine (basez-vous sur `.env.example` s'il existe) avec les clés suivantes :
```env
# Base de données
DATABASE_URL="postgres://..."

# Authentification
AUTH_SECRET="votre_secret_genere"
AUTH_URL="http://localhost:3000/api/auth"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre_nom"
CLOUDINARY_API_KEY="votre_cle"
CLOUDINARY_API_SECRET="votre_secret"

# Resend
RESEND_API_KEY="votre_cle_resend"
```

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed # (Optionnel) Pour créer l'admin par défaut
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour consulter le site.
Pour l'administration, rendez-vous sur [http://localhost:3000/admin](http://localhost:3000/admin).

## 📄 Licence
Ce projet est développé par Parfait Eric Yao. Son usage est personnel.
