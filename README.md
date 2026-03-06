# Gestion_taches

Application simple de **gestion de tâches**: authentification + CRUD complet des tâches + statut, avec un frontend React moderne.

## Fonctionnalités

- **Auth**: inscription / connexion / déconnexion
- **Tâches**:
  - liste
  - création
  - modification
  - suppression
  - changement de statut
- **Règle d’accès**: chaque utilisateur ne voit/modifie que ses propres tâches

## Stack

- Laravel
- Laravel Breeze (**Inertia + React**)
- SQLite
- TailwindCSS

## Statuts

- `a_faire`
- `en_cours`
- `terminee`

## Installation

### Prérequis

- PHP 8+
- Composer
- Node.js + npm

### Setup

1. Installer les dépendances PHP
```bash
composer install
```

2. Installer les dépendances front
```bash
npm install
```

3. Configurer l’environnement
```bash
cp .env.example .env
php artisan key:generate
```

4. SQLite

- Vérifie que le fichier existe: `database/database.sqlite`
- Dans `.env` (exemple):
```env
DB_CONNECTION=sqlite
```

5. Migrations
```bash
php artisan migrate
```

## Lancer en développement

Dans 2 terminaux séparés:

1) Backend
```bash
php artisan serve --host=127.0.0.1 --port=8000
```

2) Front (Vite)
```bash
npm run dev
```

Puis ouvre:
- `http://127.0.0.1:8000`

## URL de l’app (important)

Si tu utilises `php artisan serve --port=8000`, mets dans `.env`:
```env
APP_URL=http://127.0.0.1:8000
```

## Routes

- `/register` / `/login`
- `/tasks` (après connexion)
