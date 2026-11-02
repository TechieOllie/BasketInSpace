---
title: "BasketInSpace — Product Backlog"
subtitle: "PGL 2026-2027 · Équipe 4 · état au 03/11/2026"
---

**Équipe 4 :** Tanguy DECORDE, Edgar FLAUD, Cyrian GOMME, Oliver WEST (Scrum Master)

**Sujet :** application web permettant à un club sportif de gérer ses équipes, de planifier les matchs et tournois auxquels il participe, et toute autre option aidant le club à fonctionner.

**Notre interprétation :** le site est celui de la fédération du *BasketInSpace*, un basket fictif joué en apesanteur, sur le modèle de la Fédération française de basketball (FFBB). Il réunit tous les clubs, leurs équipes et leurs membres, et publie le calendrier des entraînements et des matchs, les scores et une boutique d'équipement.

**Rôles utilisateurs :**

- **Visiteur** : personne non connectée.
- **Utilisateur** : joueur ou membre inscrit.
- **Administrateur** : gestionnaire du site.

Le détail de chaque user story (formulation complète et critères d'acceptation) est dans `USER_STORIES.md`, à la racine du dépôt.

# Estimation

Nous estimons en tailles de t-shirt, converties en points pour calculer la vélocité. Chaque taille a une user story de référence, à laquelle on compare les autres.

| Taille | Points | US de référence | Pourquoi cette référence |
| ------ | -----: | ----------------------- | ---------------------------------------- |
| XS | 1 | US-06 Pied de page | Un composant statique, sans logique ni données |
| S  | 2 | US-05 Mode clair/sombre | Un état, un bouton et une sauvegarde dans le navigateur |
| M  | 3 | US-07 Identité visuelle | Palette, polices et styles appliqués à tout le site, en clair et en sombre |
| L  | 5 | US-15 Voir les événements (calendrier) | Vues mois et semaine, détails d'un événement, affichage mobile |
| XL | 8 | US-18 Réserver une séance ou un match | Demande une API serveur, l'authentification, la base de données et les règles de capacité |

# Priorités

Méthode MoSCoW, guidée par le sujet (gestion des équipes et planification des matchs avant tout) :

- **M** (*Must*) : indispensable au sujet.
- **S** (*Should*) : important, mais l'application reste utilisable sans.
- **C** (*Could*) : bonus, si le temps le permet.

# Backlog

Statuts : **Terminé** · **Partiel** (une partie des critères est remplie) · **À faire**.

## Page d'accueil et navigation

| ID | User story | Rôle | Prio | Taille | Pts | Issue | Sprint | Statut |
| ------ | ------------------------------ | ---------- | :---: | :----: | ---: | ------- | :----: | -------- |
| US-01 | Découvrir le sport (titre et description) | Visiteur | M | XS | 1 | #3, #7 | 1 | Terminé |
| US-02 | Naviguer sur le site (navbar) | Visiteur | M | S | 2 | #3, #6 | 1 | Terminé |
| US-03 | Inscription et connexion depuis la navbar | Visiteur | M | XS | 1 | #3, #6 | 1 | Partiel¹ |
| US-04 | Réserver depuis la navbar | Utilisateur | S | XS | 1 | #3, #6 | 1 | Partiel¹ |
| US-05 | Mode clair/sombre | Utilisateur | S | S | 2 | #3, #6 | 1 | Terminé |
| US-06 | Pied de page (footer) | Visiteur | M | XS | 1 | #3, #8 | 1 | Terminé |
| US-07 | Identité visuelle spatiale | Visiteur | M | M | 3 | #9 | 1 | Terminé |

¹ Le lien et le bouton sont en place et redirigent vers `/connexion`. Afficher le pseudo et le bouton de déconnexion attend la connexion (US-09), prévue au sprint 2.

## Comptes et rôles

| ID | User story | Rôle | Prio | Taille | Pts | Issue | Sprint | Statut |
| ------ | ------------------------------ | ---------- | :---: | :----: | ---: | ------- | :----: | -------- |
| US-08 | Créer un compte | Visiteur | M | L | 5 | #5 | 2 | À faire |
| US-09 | Se connecter / se déconnecter | Utilisateur | M | M | 3 | #5 | 2 | À faire |
| US-10 | Rôles Admin et User | Administrateur | M | M | 3 | #5 | 2 | À faire |

## Données et boutique

| ID | User story | Rôle | Prio | Taille | Pts | Issue | Sprint | Statut |
| ------ | ------------------------------ | ---------- | :---: | :----: | ---: | ------- | :----: | -------- |
| US-11 | Base de données persistante (Prisma) | Équipe | M | L | 5 | #11 | 1 | Terminé |
| US-12 | Parcourir la boutique | Visiteur | C | M | 3 | #17 | 3 | À faire |
| US-13 | Acheter un article (panier, commande) | Utilisateur | C | XL | 8 | #17 | 3 | À faire |
| US-14 | Gérer la boutique | Administrateur | C | L | 5 | #17 | 3 | À faire |

## Calendrier et réservations

| ID | User story | Rôle | Prio | Taille | Pts | Issue | Sprint | Statut |
| ------ | ------------------------------ | ---------- | :---: | :----: | ---: | ------- | :----: | -------- |
| US-15 | Voir les entraînements et matchs à venir | Visiteur | M | L | 5 | #10 | 1 | Terminé² |
| US-16 | Filtrer le calendrier | Utilisateur | S | S | 2 | #10 | 1 | Partiel³ |
| US-17 | Gérer les événements | Administrateur | M | L | 5 | #10 | 2 | À faire |
| US-18 | Réserver une séance ou un match | Utilisateur | M | XL | 8 | #14 | 2 | À faire |
| US-19 | Voir et annuler mes réservations | Utilisateur | S | M | 3 | #14 | 3 | À faire |

² Le calendrier affiche pour l'instant des données fictives (`src/shared/events.ts`). Les brancher sur la base fait partie de l'issue #14, au sprint 2.

³ Les filtres par type d'événement et par club fonctionnent. Le filtre par équipe attend que les équipes existent (US-25 à US-27).

## Scores, clubs et équipes

| ID | User story | Rôle | Prio | Taille | Pts | Issue | Sprint | Statut |
| ------ | ------------------------------ | ---------- | :---: | :----: | ---: | ------- | :----: | -------- |
| US-20 | Consulter les scores | Visiteur | S | M | 3 | #15 | 3 | À faire |
| US-21 | Saisir les scores | Administrateur | S | S | 2 | #15 | 3 | À faire |
| US-22 | Parcourir les clubs | Visiteur | M | M | 3 | #16 | 2 | À faire |
| US-23 | Voir les membres d'un club | Visiteur | S | M | 3 | #16 | 3 | À faire |
| US-24 | Voir les matchs d'un club | Visiteur | S | S | 2 | #16 | 3 | À faire |
| US-25 | Voir les équipes d'un club | Visiteur | M | S | 2 | #33 | 2 | À faire |
| US-26 | Rejoindre un club et une équipe | Utilisateur | M | L | 5 | #33 | 3 | À faire |
| US-27 | Gérer les équipes | Administrateur | M | M | 3 | #33 | 2 | À faire |
| US-28 | Choisir mon poste | Utilisateur | S | S | 2 | #33 | 3 | À faire |

## Tâches techniques

Ces éléments ne sont pas des user stories : ils ne sont pas comptés dans la vélocité.

| Tâche | Issue | Sprint | Statut |
| -------------------------------------------- | -------- | :----: | ------- |
| Initialiser le projet React + TypeScript + Vite | #1 | 1 | Terminé |
| README : installation (Linux, Windows), méthode de travail git | #12 | 1 | Terminé |
| Corriger l'affichage sur petits et grands écrans | #20, #29 | 1 | Terminé |
| Icône du site (logo ballon) | #21 | 1 | Terminé |
| Navigation avec React Router au lieu de liens `<a href>` | #28 | 2 | À faire |
| API côté serveur pour accéder à la base (Prisma ne tourne pas dans le navigateur) | #14 | 2 | À faire |
| Tests automatisés (Vitest) et cahier de tests à chaque sprint | — | 2 | À faire |
| Déploiement de l'application sur un serveur | — | 2 | À faire |

# Synthèse

| | US | Points |
| --- | --: | --: |
| Backlog total | 28 | 91 |
| Terminées au sprint 1 | 7 | 19 |
| Partielles au sprint 1 | 3 | 4 |
| Prévues au sprint 2 (provisoire) | 8 | 32 |
| Prévues au sprint 3 (provisoire) | 10 | 36 |

Les 3 US partielles (US-03, US-04, US-16) seront terminées au sprint 2, avec la connexion et les équipes dont elles dépendent.

Le sprint 2 donne la priorité au cœur du sujet : comptes, gestion des équipes, planification des événements et réservations. 32 points, c'est beaucoup plus que les 19 du sprint 1 ; le sprint 1 a toutefois servi en grande partie à mettre en place le projet (outils, thème, base de données). Si la vélocité ne suit pas, la boutique (US-12 à US-14, priorité *Could*) sera abandonnée en premier.

Ce découpage est provisoire : il sera revu au sprint planning.
