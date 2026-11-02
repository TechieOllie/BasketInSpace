---
title: "BasketInSpace — Cahier de tests, sprint 1"
subtitle: "PGL 2026-2027 · Équipe 4"
---

# Conditions de test

| | |
| --- | --- |
| **Version testée** | branche `main` du dépôt GitHub `TechieOllie/BasketInSpace` (commit `dab79c8`) |
| **Installation** | voir le README, section « Installation du projet » ; clone neuf, Node.js 24, npm 11 |
| **URL** | http://localhost:5173 (serveur lancé avec `npm run dev`) |
| **Navigateurs** | Firefox et Chromium (moteur de Chrome) |
| **Méthode** | T-01 à T-05 dans le terminal ; T-06 à T-38 dans les deux navigateurs |
| **Tailles d'écran** | ordinateur (1440 px), tablette (800 et 1100 px), mobile (375 px), grand écran (1920 px) |
| **Exécuté par / le** | Oliver WEST / 02/11/2026 |

**À savoir avant de tester :**

- Seules les pages **Accueil** (`/`) et **Calendrier** (`/calendrier`) existent au sprint 1. Les autres liens (Clubs, Scores, Boutique, Connexion…) ouvrent une adresse qui affiche pour l'instant la page d'accueil. Ces pages sont prévues aux sprints 2 et 3.
- Le calendrier utilise des données fictives, du **3 octobre au 7 novembre 2026**.
- Personne ne peut encore se connecter : tous les tests se font en tant que **visiteur**.

**Statut :** OK = résultat conforme dans les deux navigateurs · KO = non conforme (voir « Anomalies relevées »).

# Installation et qualité du code

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-01 | — | Cloner le dépôt, puis `npm ci`, `cp .env.example .env`, `npm run db:migrate`, `npm run dev`. | Les commandes se terminent sans erreur ; le terminal affiche l'URL `http://localhost:5173`. | OK |
| T-02 | — | `npm run build` | Le build se termine sans erreur de type et crée le dossier `dist/`. | OK |
| T-03 | — | `npm run lint` | ESLint ne signale aucune erreur. | OK |
| T-04 | US-11 | Après T-01, lancer `npm run db:studio`. | Prisma Studio s'ouvre et liste 8 tables : User, Club, Evenement, Reservation, Categorie, Article, Commande, LigneCommande. | KO |
| T-05 | US-11 | `npm run db:reset`, confirmer. | La base est vidée et la migration est rejouée sans erreur. | OK |

# Page d'accueil

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-06 | US-01 | Ouvrir `/`. | Le titre « BasketInSpace » est affiché en grand en haut de la page, suivi d'une description du sport. | OK |
| T-07 | US-01 | Cliquer sur « Découvrir les règles ». | La page défile jusqu'aux sections « Le principe » et « Les règles » ; 3 règles numérotées sont affichées. | OK |
| T-08 | — | Cliquer sur chacune des 4 tuiles de « Explorer la galaxie ». | Chaque tuile mène à sa section : `/calendrier`, `/clubs`, `/scores`, `/boutique`. | OK |
| T-09 | US-04 | Cliquer sur « Réserver une séance » sous le titre. | Visiteur non connecté : l'adresse devient `/connexion`. | OK |

# Navigation (navbar)

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-10 | US-02 | Sur ordinateur, regarder la navbar sur `/` puis sur `/calendrier`. | La même navbar est présente sur les deux pages, avec les liens Accueil, Calendrier, Clubs, Scores, Boutique. | OK |
| T-11 | US-02 | Sur `/calendrier`, regarder les liens. | Le lien « Calendrier » est mis en évidence (lien actif). | OK |
| T-12 | US-02 | Cliquer sur le logo BasketInSpace depuis `/calendrier`. | Retour à la page d'accueil. | OK |
| T-13 | US-02 | Réduire la fenêtre sous 1200 px de large. | Les liens sont remplacés par un bouton menu ; un clic l'ouvre, un second clic le ferme. Le bouton clair/sombre reste visible. | OK |
| T-14 | US-02 | Fenêtre entre 1200 et 1400 px de large. | Tous les éléments de la navbar restent à l'intérieur de la barre, sans passer à la ligne (correction de l'issue #29). | OK |
| T-15 | US-03 | Cliquer sur « Connexion / Inscription ». | Visiteur non connecté : l'adresse devient `/connexion`. | OK |
| T-16 | US-04 | Cliquer sur « Réserver une séance/match » dans la navbar. | Visiteur non connecté : l'adresse devient `/connexion`. | OK |

# Mode clair/sombre et thème

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-17 | US-05 | Première visite (ou après avoir vidé les données du site). | Le site s'affiche en mode sombre. | OK |
| T-18 | US-05 | Cliquer sur le bouton soleil/lune de la navbar. | Le site passe en mode clair et l'icône change ; un second clic revient au mode sombre. | OK |
| T-19 | US-05 | Passer en mode clair, recharger la page, puis aller sur `/calendrier`. | Le mode clair est conservé après le rechargement et sur l'autre page. | OK |
| T-20 | US-07 | Parcourir `/` et `/calendrier` dans les deux modes. | Mêmes couleurs, polices (Unbounded pour les titres, Manrope pour le texte) et fond étoilé partout ; tous les textes restent lisibles. | OK |
| T-21 | — | Regarder l'onglet du navigateur. | L'icône de l'onglet est le logo ballon de BasketInSpace. | OK |

# Pied de page

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-22 | US-06 | Descendre en bas de `/` puis de `/calendrier`. | Le footer est présent sur les deux pages, avec les colonnes Contact, Liens utiles et Réseaux sociaux. | OK |
| T-23 | US-06 | Lire la dernière ligne du footer. | « © 2026 BasketInSpace. Tous droits réservés. » (année en cours) et un lien « Mentions légales ». | OK |

# Calendrier

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-24 | US-15 | Ouvrir `/calendrier` sur ordinateur. | La vue « Mois » du mois en cours s'affiche ; le jour actuel est mis en évidence. | OK |
| T-25 | US-15 | Utiliser les flèches ‹ et ›, puis « Aujourd'hui ». | Le mois précédent ou suivant s'affiche ; « Aujourd'hui » revient au mois en cours. | OK |
| T-26 | US-15 | Afficher octobre 2026. | Les événements du mois apparaissent sur leurs jours ; entraînements et matchs ont des couleurs différentes. | OK |
| T-27 | US-15 | Cliquer sur « Semaine », puis naviguer avec les flèches. | La semaine s'affiche du lundi au dimanche, avec l'heure de début, l'heure de fin et la planète de chaque événement. Les flèches avancent d'une semaine. | OK |
| T-28 | US-15 | Cliquer sur le match du 10/10/2026 (« BasketInSpace vs Comètes de Mars »). | Une fenêtre affiche : type Match, date, heure 20h00 – 22h00, lieu (planète, district), clubs « BasketInSpace vs Comètes de Mars », places restantes « 42 restantes sur 200 ». | OK |
| T-29 | US-15 | Fermer la fenêtre avec la croix, puis avec la touche Échap, puis en cliquant à côté. | La fenêtre se ferme dans les trois cas. | OK |
| T-30 | US-15 | Ouvrir la séance du 08/10/2026 (« Séance découverte »). | Les places indiquent « Complet » et le bouton de réservation est désactivé. | OK |
| T-31 | US-04 | Ouvrir un événement qui a des places, cliquer sur « Réserver ». | Visiteur non connecté : l'adresse devient `/connexion`. | OK |
| T-32 | US-15 | Réduire la fenêtre sous 992 px de large (ou affichage mobile). | La grille est remplacée par une liste des événements de la période, groupés par jour ; un clic ouvre le détail. | OK |
| T-33 | US-15 | En affichage mobile, afficher décembre 2026. | Le message « Aucun événement sur cette période. » s'affiche. | OK |
| T-34 | US-16 | En octobre 2026, désactiver le filtre « Entraînements ». | Seuls les matchs restent affichés. Réactiver le filtre les fait réapparaître. | OK |
| T-35 | US-16 | Choisir le club « Comètes de Mars » dans la liste déroulante. | Seuls les événements de ce club restent, y compris le match du 10/10 où il joue à l'extérieur. | OK |
| T-36 | US-16 | Club « Comètes de Mars » + filtre « Entraînements » désactivé. | Seuls les matchs des Comètes de Mars sont affichés (10/10 et 31/10). | OK |

# Affichage sur mobile

| ID | US | Étapes | Résultat attendu | Statut |
| ----- | ------ | ------------------------------- | ---------------------------------- | :----: |
| T-37 | US-02 | En largeur 375 px, parcourir `/` puis `/calendrier`. | Aucune barre de défilement horizontale ; aucun texte ni bouton ne dépasse de l'écran (correction de l'issue #20). | OK |
| T-38 | US-02 | En largeur ≥ 1920 px, parcourir `/` puis `/calendrier`. | Le contenu reste centré et bien proportionné. | OK |

# Bilan de l'exécution

| | Nombre |
| --- | --: |
| Tests exécutés | 38 / 38 |
| OK | 37 |
| KO | 1 |

**Anomalies relevées :**

| ID test | Description de l'anomalie | Issue GitHub créée |
| ------- | ------------------------------------------------------------ | ------------------ |
| T-04 | `npm run db:studio` s'arrête avec le message « Prisma Studio is not supported for the "file:./prisma/dev.db" protocol » : Prisma Studio 7 n'ouvre pas les bases SQLite locales. Les 8 tables sont bien créées (vérifié avec `sqlite3 prisma/dev.db ".tables"`). À corriger au sprint 2 : retirer la commande du README ou la remplacer par un autre outil. | #38 |
| T-37 | Anomalie mineure, sans effet sur le résultat du test. Sur mobile, la flèche « mois suivant » du calendrier passe à la ligne, séparée de la flèche « mois précédent ». | #39 |
