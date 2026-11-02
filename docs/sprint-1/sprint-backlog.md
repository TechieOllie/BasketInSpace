---
title: "BasketInSpace — Sprint Backlog, sprint 1"
subtitle: "PGL 2026-2027 · Équipe 4 · état au 03/11/2026"
---

# Le sprint

| | |
| --- | --- |
| **Dates** | 29/09/2026 → 10/11/2026 (soutenance 1) |
| **Équipe** | Tanguy DECORDE, Edgar FLAUD, Cyrian GOMME, Oliver WEST |
| **Scrum Master** | Oliver WEST |
| **Outils** | GitHub (issues, branches, pull requests) |

**Objectif du sprint :** poser les fondations du site. Un projet que chacun peut installer, une identité visuelle, une page d'accueil complète, le schéma de la base de données et un premier calendrier des entraînements et des matchs.

# User stories du sprint

Les tailles et les points suivent l'échelle du Product Backlog (XS = 1, S = 2, M = 3, L = 5, XL = 8).

| ID | User story | Taille | Pts | Issue | Statut |
| ------ | ----------------------------------- | :----: | ---: | ------- | -------- |
| US-01 | Découvrir le sport | XS | 1 | #3, #7 | Terminé |
| US-02 | Naviguer sur le site (navbar) | S | 2 | #3, #6 | Terminé |
| US-03 | Inscription et connexion depuis la navbar | XS | 1 | #3, #6 | Partiel |
| US-04 | Réserver depuis la navbar | XS | 1 | #3, #6 | Partiel |
| US-05 | Mode clair/sombre | S | 2 | #3, #6 | Terminé |
| US-06 | Pied de page | XS | 1 | #3, #8 | Terminé |
| US-07 | Identité visuelle spatiale | M | 3 | #9 | Terminé |
| US-11 | Base de données persistante | L | 5 | #11 | Terminé |
| US-15 | Voir les événements à venir | L | 5 | #10 | Terminé |
| US-16 | Filtrer le calendrier | S | 2 | #10 | Partiel |
| | **Total engagé** | | **23** | | |

**Vélocité du sprint 1 : 19 points** (7 US terminées). Les 3 US partielles (4 points) ne sont pas comptées et passent au sprint 2 :

- **US-03 et US-04** : le lien « Connexion / Inscription » et le bouton « Réserver » mènent bien vers `/connexion`, mais la page de connexion n'existe pas encore. Afficher le pseudo et le bouton de déconnexion dépend de US-09.
- **US-16** : les filtres par type et par club fonctionnent. Le filtre par équipe attend les équipes (US-25 à US-27).

Les issues #5 (inscription et connexion) et #14 à #16 (réservations, scores, clubs) ont été créées pendant ce sprint, mais n'y ont pas été engagées : elles restent dans le Product Backlog.

# Tâches

La colonne « Responsable » reprend les personnes assignées sur GitHub et les auteurs des pull requests (PR).

## Mise en place du projet

| Tâche | Responsable | Issue / PR | Statut |
| ---------------------------------------- | -------------- | -------------- | ---------- |
| Créer le dépôt et initialiser React + TypeScript + Vite | Oliver | #1 / PR #2 | Terminé |
| Rédiger les user stories (US-01 à US-28) | Oliver | — | Terminé |
| README : installation pas à pas, méthode de travail git | Oliver | #12 / PR #13, #19 | Terminé |

## Thème et page d'accueil (US-01 à US-07)

| Tâche | Responsable | Issue / PR | Statut |
| ---------------------------------------- | -------------- | -------------- | ---------- |
| Choisir le thème : couleurs, polices, visuels | Toute l'équipe | #9 | Terminé |
| Intégrer le thème « Orbital » avec Bootstrap 5.3, en clair et en sombre | Oliver | #9 / PR #18 | Terminé |
| Navbar : liens, menu mobile, bouton Réserver, lien Connexion | Oliver | #6 / PR #18 | Terminé |
| Bascule clair/sombre mémorisée dans le navigateur | Oliver | #6 / PR #18 | Terminé |
| Section principale : titre, présentation et règles du sport | Tanguy, Cyrian | #7, #22 / PR #27 | Terminé |
| Footer : contacts, liens utiles, réseaux sociaux fictifs | Tanguy, Oliver | #8, #22 / PR #18, #30 | Terminé |
| Affichage correct sur petits et grands écrans | Oliver | #20, #29 / PR #25, #31 | Terminé |
| Icône du site (logo ballon) | Oliver | #21 / PR #32 | Terminé |

## Base de données (US-11)

| Tâche | Responsable | Issue / PR | Statut |
| ---------------------------------------- | -------------- | -------------- | ---------- |
| Modéliser les 8 tables (User, Club, Evenement, Reservation, Categorie, Article, Commande, LigneCommande) | Oliver, Cyrian | #11 / PR #23 | Terminé |
| Mettre en place Prisma 7 + SQLite, première migration | Oliver | #11 / PR #23 | Terminé |
| Documenter l'initialisation de la base dans le README | Oliver | #11 / PR #23 | Terminé |

## Calendrier (US-15, US-16)

| Tâche | Responsable | Issue / PR | Statut |
| ---------------------------------------- | -------------- | -------------- | ---------- |
| Vue mois et vue semaine, navigation entre les périodes | Edgar | #10 / PR #26 | Terminé |
| Fenêtre de détail d'un événement (date, heure, lieu, clubs, places) | Edgar | #10 / PR #26 | Terminé |
| Vue liste sur mobile | Edgar | #10 / PR #26 | Terminé |
| Filtres par type d'événement et par club | Edgar | #10 / PR #26 | Terminé |
| Jeu de données fictif (4 clubs, 15 événements) | Edgar | #10 / PR #26 | Terminé |
| Route `/calendrier` | Oliver | #10 / PR #26 | Terminé |
| Filtre par équipe | — | #10 | Reporté (attend US-25) |

# Répartition par membre

| Membre | Travail réalisé |
| -------------- | ------------------------------------------------ |
| **Tanguy DECORDE** | Textes de la page d'accueil (présentation, principe et règles du sport), réseaux sociaux fictifs du footer, finalisation de la page d'accueil |
| **Edgar FLAUD** | Page Calendrier complète : vues mois et semaine, détail d'un événement, vue mobile, filtres, données fictives |
| **Cyrian GOMME** | Page d'accueil, schéma de la base de données, choix du thème, revue et fusion de la PR d'initialisation |
| **Oliver WEST** | Scrum Master. Initialisation du projet, README, user stories, intégration du thème et de la navbar, base de données Prisma, corrections d'affichage, revue et fusion des pull requests |
