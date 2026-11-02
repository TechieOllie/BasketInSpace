# BasketInSpace

Site de la fédération du BasketInSpace, un basket fictif joué en apesanteur, sur le modèle de la FFBB : clubs et équipes, calendrier des entraînements et des matchs, réservations, scores et boutique. Projet PGL 2026-2027, équipe 4 (Tanguy DECORDE, Edgar FLAUD, Cyrian GOMME, Oliver WEST).

Projet React + TypeScript + Vite, avec Bootstrap 5.3. Au sprint 1, deux pages sont réalisées : l'**accueil** (`/`) et le **calendrier** (`/calendrier`, avec des données fictives d'octobre et novembre 2026). Les autres liens du menu mènent pour l'instant à la page d'accueil.

Les documents de chaque sprint (Product Backlog, Sprint Backlog, cahier de tests, compte rendu de rétrospective) sont dans [`docs/`](docs/).

- [Installation du projet](#installation-du-projet)
- [Base de données](#base-de-données)
- [Structure du code](#structure-du-code)
- [Installer et configurer git et gh](#installer-et-configurer-git-et-gh)
  - [Windows](#windows)
- [Les bases de git](#les-bases-de-git)
- [Méthode de travail : issues, branches et pull requests](#méthode-de-travail--issues-branches-et-pull-requests)
- [Conventions de nommage](#conventions-de-nommage)

## Installation du projet

Sous Windows, suivez d'abord [l'installation des outils](#windows). Il vous faut :

- **git**
- **Node.js 22 LTS ou plus récent** (Vite demande au minimum 20.19 ou 22.12). Vérifiez avec `node -v`.
- **gh** (GitHub CLI). Facultatif mais recommandé, voir [plus bas](#installer-et-configurer-git-et-gh).

Une fois ces outils installés :

```sh
# 1. Cloner le dépôt (en SSH, voir « S'authentifier sur GitHub » plus bas)
git clone git@github.com:TechieOllie/BasketInSpace.git
# ou avec gh :
gh repo clone TechieOllie/BasketInSpace

# 2. Aller dans le dossier du projet
cd BasketInSpace

# 3. Installer les dépendances (versions exactes de package-lock.json)
npm ci

# 4. Créer la base de données locale (voir « Base de données » plus bas)
cp .env.example .env
npm run db:migrate

# 5. Lancer le serveur de dev, puis ouvrir l'URL affichée (en général http://localhost:5173)
npm run dev
```

Autres scripts :

| Commande             | Ce qu'elle fait                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`        | Serveur de dev avec rechargement automatique                                    |
| `npm run build`      | Vérifie les types et construit le site de production dans `dist/`               |
| `npm run preview`    | Sert le dossier `dist/` construit, en local                                     |
| `npm run lint`       | Lance ESLint                                                                    |
| `npm run db:migrate` | Applique les migrations à la base locale (et en crée une si le schéma a changé) |
| `npm run db:reset`   | Vide la base locale et rejoue toutes les migrations                             |
| `npm run db:studio`  | Ouvre Prisma Studio pour voir et modifier les données                           |

La page d'accueil s'affiche dans le navigateur ; le calendrier est sur `/calendrier`. Les polices (Unbounded, Manrope) sont chargées depuis Google Fonts : il faut une connexion internet.

> Utilisez `npm ci` après un clone ou un pull. N'utilisez `npm install <paquet>` que pour ajouter une dépendance, et commitez alors `package.json` **et** `package-lock.json` ensemble.

## Base de données

La base est gérée avec [Prisma 7](https://www.prisma.io/docs) et SQLite : pas de serveur à installer, la base est un simple fichier `prisma/dev.db`. Le schéma est dans `prisma/schema.prisma` (8 tables : `User`, `Club`, `Evenement`, `Reservation`, `Categorie`, `Article`, `Commande`, `LigneCommande`).

Initialiser la base après un clone :

```sh
cp .env.example .env      # sous Windows (PowerShell) : Copy-Item .env.example .env
npm run db:migrate
```

`.env` et `dev.db` restent sur votre machine (ils sont dans `.gitignore`). Le client Prisma est généré dans `src/generated/prisma/` à chaque `npm ci` ; il n'est pas commité non plus.

Modifier le schéma :

1. Éditez `prisma/schema.prisma`.
2. Lancez `npx prisma migrate dev --name <ce-qui-change>` (par exemple `--name ajout-stock-min`). Prisma crée un dossier dans `prisma/migrations/` et met la base à jour.
3. Commitez le schéma **et** le nouveau dossier de migration ensemble. Ne modifiez jamais une migration déjà poussée.

Après un pull qui apporte de nouvelles migrations, relancez `npm run db:migrate`.

Le client Prisma ne tourne que côté serveur (Node), jamais dans le navigateur :

```ts
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });
```

## Structure du code

```
index.html              Polices Google Fonts, point d'entrée de Vite
prisma.config.ts        Configuration de Prisma (schéma, migrations, URL de la base)
prisma/
  schema.prisma         Modèles de la base de données
  migrations/           Migrations SQL versionnées
src/
  generated/prisma/     Client Prisma généré (non commité)
  main.tsx              Importe les CSS (dans cet ordre) et affiche HomePage
  bootstrap/            La page d'accueil, avec les classes Bootstrap 5.3
    HomePage.tsx        Assemble Navbar, Hero, Rules, Tiles, Footer
    Navbar.tsx  Hero.tsx  Rules.tsx  Tiles.tsx  Footer.tsx
    bridge.css          Relie les variables de Bootstrap aux tokens et ajoute ce que Bootstrap n'a pas
  shared/
    tokens.css          Couleurs et polices
    base.css            Ciel étoilé, effets de verre, de relief et 3D, animations
    useTheme.ts         Mode clair/sombre (US-05), mémorisé dans le localStorage
    StarSky.tsx         Ciel étoilé qui suit le défilement
    HeroArt.tsx         Illustration du hero (ballon-planète)
    Icons.tsx           Icônes SVG
    content.ts          Liens, règles, tuiles, pied de page (et leurs types)
    types.ts            Types partagés (`User`)
```

L'ordre des imports dans `main.tsx` compte : Bootstrap, puis `tokens.css`, `base.css` et `bridge.css`.

Le thème est porté par l'attribut `data-bs-theme` sur `<html>`, que Bootstrap lit nativement.

Pour voir la navbar d'un utilisateur connecté (US-03), remplacez `user={null}` par `user={{ pseudo: "..." }}` dans `main.tsx`. Sans utilisateur, les boutons « Réserver » mènent à `/connexion` (US-04). Les liens sont de simples `<a href>` : il faudra les remplacer par ceux du routeur.

À compléter : les textes entre crochets (description, règles, contacts, réseaux sociaux) dans `src/shared/content.ts` et dans `Hero.tsx` et `Rules.tsx`.

Le rendu n'a pas encore été vérifié dans un navigateur : l'aspect, le responsive et les animations restent à contrôler.

## Installer et configurer git et gh

### Installation

Choisissez les commandes de votre système :

#### Arch / Manjaro / CachyOS

```sh
sudo pacman -S git github-cli nodejs npm
```

#### Fedora

```sh
sudo dnf install git gh nodejs
```

#### Debian / Ubuntu

`gh` n'est pas dans les dépôts par défaut, il faut d'abord ajouter le dépôt de GitHub :

```sh
sudo apt update && sudo apt install -y git curl
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null
sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install -y gh
```

La version de Node.js fournie par Debian/Ubuntu est souvent trop ancienne. Installez-en une récente avec [nvm](https://github.com/nvm-sh/nvm) :

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# redémarrez le terminal, puis :
nvm install --lts
```

#### Windows

Utilisez **PowerShell** (pas l'invite de commandes). `winget` est fourni avec Windows 10 et 11 :

```powershell
winget install --id Git.Git -e
winget install --id GitHub.cli -e
winget install --id OpenJS.NodeJS.LTS -e
```

**Fermez puis rouvrez PowerShell** pour que les nouvelles commandes soient reconnues, puis vérifiez :

```powershell
git --version
gh --version
node -v
npm -v
```

Ensuite, les commandes de ce README s'utilisent telles quelles dans PowerShell ou dans Git Bash (installé avec git), à ces différences près :

- Si `npm` répond « l'exécution de scripts est désactivée sur ce système », autorisez les scripts pour votre utilisateur, puis réessayez :

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

- Pour que git ne mélange pas les fins de ligne Windows (CRLF) et Linux (LF) :

  ```powershell
  git config --global core.autocrlf true
  ```

- Les commandes `sudo`, `apt`, `pacman`, `dnf` et `nvm` des autres sections ne s'appliquent pas à Windows.
- Clonez le projet dans un dossier simple, sans espaces ni accents dans le chemin (par exemple `C:\Projets`), et évitez les dossiers synchronisés par OneDrive.
- Si `npm run dev` est bloqué par le pare-feu Windows, autorisez l'accès aux réseaux privés.

Vérifiez que tout est installé :

```sh
git --version
gh --version
node -v
```

### Configurer git (une fois par ordinateur)

```sh
git config --global user.name "Prénom Nom"
git config --global user.email "vous@exemple.com"  # l'adresse de votre compte GitHub
git config --global init.defaultBranch main
git config --global pull.rebase true              # évite les commits de merge inutiles lors d'un pull
```

### S'authentifier sur GitHub

```sh
gh auth login
```

gh pose ses questions en anglais. Répondez :

1. **Where do you use GitHub?** → `GitHub.com`
2. **What is your preferred protocol for Git operations?** → `SSH`
3. **Upload your SSH public key?** → choisissez votre clé, ou laissez gh en générer une nouvelle
4. **How would you like to authenticate?** → `Login with a web browser`, puis collez le code affiché dans le terminal

Vérifiez que ça fonctionne :

```sh
gh auth status
ssh -T git@github.com   # doit afficher « Hi <pseudo>! You've successfully authenticated »
```

## Les bases de git

git enregistre l'historique des modifications des fichiers en local. GitHub héberge une copie partagée (le *remote*, appelé `origin`) sur laquelle tout le monde pousse (push) et récupère (pull) les changements.

| Commande                        | Ce qu'elle fait                                                   |
| ------------------------------- | ----------------------------------------------------------------- |
| `git status`                    | Affiche la branche courante et les fichiers modifiés              |
| `git diff`                      | Affiche les modifications pas encore indexées                     |
| `git add <fichier>` / `git add .` | Indexe les modifications pour le prochain commit                |
| `git commit -m "message"`       | Enregistre les modifications indexées dans un commit              |
| `git pull`                      | Récupère les derniers commits de GitHub pour la branche courante  |
| `git push`                      | Envoie vos commits sur GitHub                                     |
| `git switch <branche>`          | Passe sur une branche existante                                   |
| `git switch -c <branche>`       | Crée une nouvelle branche et passe dessus                         |
| `git branch`                    | Liste les branches locales                                        |
| `git log --oneline`             | Affiche l'historique des commits                                  |
| `git restore <fichier>`         | Annule les modifications non commitées d'un fichier (irréversible) |

**Règles :**

- **Ne jamais commiter directement sur `main`.** Tout le travail passe par une branche et une pull request.
- Faites `git pull` souvent pour ne pas trop vous éloigner du travail des autres.
- Faites des petits commits qui font chacun une seule chose.
- Ne commitez jamais `node_modules/`, `dist/`, les fichiers `.env` ni de mots de passe. Le `.gitignore` gère déjà les deux premiers.

### Messages de commit

Une phrase courte, en anglais, à l'impératif (comme pour compléter « This commit will… ») :

```
Add player score display
Fix ball bouncing through walls
Update README with setup steps
```

À éviter : `fixed stuff`, `wip`, `modifs`.

## Méthode de travail : issues, branches et pull requests

Chaque tâche suit les mêmes étapes :

### 1. Créer (ou choisir) une issue

Chaque tâche correspond à une issue sur GitHub. Créez-la sur le site, ou :

```sh
gh issue create --title "Add player score display" --body "Afficher le score actuel dans le coin supérieur."
gh issue list                  # voir les issues ouvertes
```

### 2. Créer une branche pour l'issue

Le plus simple est de laisser gh créer la branche et passer dessus ; il la nomme et la lie à l'issue automatiquement :

```sh
git switch main && git pull     # partir de la dernière version de main
gh issue develop 12 --checkout  # 12 = numéro de l'issue
```

Ou à la main (voir [nommage des branches](#branches)) :

```sh
git switch main && git pull
git switch -c 12-add-player-score-display
```

### 3. Travailler et commiter

```sh
git add .
git commit -m "Add score component"
# ... autant de fois que nécessaire
```

### 4. Pousser la branche

```sh
git push -u origin HEAD   # premier push d'une nouvelle branche
git push                  # les fois suivantes
```

### 5. Ouvrir une pull request

```sh
gh pr create --base main --fill
```

Ou sur le site avec le bouton **Compare & pull request**. Dans la description de la PR :

- expliquez **ce qui** a changé et **pourquoi**
- écrivez `Closes #12` pour que l'issue se ferme automatiquement au merge de la PR
- ajoutez des captures d'écran pour les changements visuels

### 6. Relecture et merge

- Une autre personne relit la PR. Elle peut la tester en local avec `gh pr checkout <numéro>`.
- Si des corrections sont demandées, commitez et poussez à nouveau sur la même branche ; la PR se met à jour toute seule.
- Avant de merger, vérifiez que `npm run build` et `npm run lint` passent.
- Mergez sur GitHub, ou avec `gh pr merge --squash --delete-branch`.

### 7. Nettoyer

```sh
git switch main
git pull
git branch -d 12-add-player-score-display
```

### Si `main` a changé pendant que vous travailliez

```sh
git switch main && git pull
git switch 12-add-player-score-display
git rebase main
# résolvez les conflits éventuels, puis : git add <fichier> && git rebase --continue
git push --force-with-lease
```

Ne faites un force-push que sur vos propres branches, jamais sur `main`.

## Conventions de nommage

### Branches

`<numéro-issue>-<description-courte>`, en anglais, tout en minuscules, mots séparés par des tirets :

```
1-init-react-project
12-add-player-score-display
15-fix-ball-collision
```

C'est le format que produisent `gh issue develop` et le bouton **Create a branch** de GitHub. Pas d'espaces, d'accents ni de majuscules.

### Fichiers et dossiers

| Quoi                              | Style                               | Exemple                              |
| --------------------------------- | ----------------------------------- | ------------------------------------ |
| Composants React                  | `PascalCase.tsx`                    | `ScoreBoard.tsx`                     |
| Styles d'un composant             | même nom que le composant           | `ScoreBoard.css`                     |
| Hooks                             | `useQuelqueChose.ts` (camelCase)    | `useGameLoop.ts`                     |
| Autre code TypeScript (utilitaires, logique) | `camelCase.ts`           | `collision.ts`, `mathUtils.ts`       |
| Types                             | `camelCase.ts` dans `src/types/`    | `src/types/player.ts`                |
| Ressources (images, sons…)        | `kebab-case`                        | `space-background.png`, `bounce.mp3` |
| Dossiers                          | `camelCase` ou minuscules           | `src/components/`, `src/hooks/`      |

Aussi :

- Un composant par fichier, et le nom du fichier correspond au nom du composant (`ScoreBoard.tsx` exporte `ScoreBoard`).
- Noms en anglais uniquement, sans espaces ni accents.
- Variables et fonctions en `camelCase`, composants et types en `PascalCase`, constantes en `UPPER_SNAKE_CASE`.
