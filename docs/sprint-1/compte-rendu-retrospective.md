---
title: "BasketInSpace — Compte rendu de la rétrospective, sprint 1"
subtitle: "PGL 2026-2027 · Équipe 4"
---

| | |
| --- | --- |
| **Sprint** | 1 (29/09/2026 → 10/11/2026) |
| **Date de la rétrospective** | ……/……/2026 |
| **Animée par** | Oliver WEST (Scrum Master) |
| **Participants** | Tanguy DECORDE, Edgar FLAUD, Cyrian GOMME, Oliver WEST |

# Le sprint en chiffres

| Indicateur | Valeur |
| ---------- | -----: |
| Points engagés | 23 |
| Points terminés (vélocité) | 19 |
| User stories terminées / partielles | 7 / 3 |
| Pull requests fusionnées | 11 |
| Issues fermées | 14 |
| Cas de test écrits | 38 |
| Tests automatisés | 0 |

# Ce qui a fonctionné

- **Un cadre de travail git clair.** Chaque fonctionnalité suit le même chemin : une issue, une branche, une pull request relue avant la fusion dans `main`. La branche `main` est toujours restée fonctionnelle.
- **Un projet facile à installer.** Le README détaille l'installation sous Linux et Windows et explique git et notre méthode de travail. Tous les membres ont pu installer le projet et contribuer.
- **Des user stories écrites tôt.** Les 24 premières US, avec leurs critères d'acceptation, étaient prêtes dès le premier jour et reliées à leurs issues. Tout le monde savait ce qu'il fallait construire.
- **Des livrables visibles et soignés.** La page d'accueil et le calendrier sont complets, s'adaptent au mobile et fonctionnent en mode clair comme en mode sombre. Les bugs d'affichage repérés (#20, #29) ont été corrigés dans le sprint.
- **Un schéma de base de données pensé pour la suite.** Les 8 tables couvrent déjà les comptes, les clubs, les événements, les réservations et la boutique : les sprints suivants partent d'une base existante.

# Ce qui n'a pas fonctionné

- **Un travail concentré sur les séances encadrées.** Presque toutes les contributions datent de trois journées (29/09, 02/10 et 09/10). Le travail s'est ensuite arrêté pendant plusieurs semaines.
- **Des dailies irréguliers.** Hors des séances, nous ne faisions pas de point régulier : il était difficile de savoir qui avançait sur quoi et qui était bloqué.
- **Pas d'estimation au sprint planning.** Les US ont été choisies sans être estimées, et aucun objectif de sprint n'a été écrit. Les tailles et la vélocité ont été calculées après coup, pour préparer ce bilan.
- **Une charge mal répartie.** Une grande partie de l'intégration, des relectures et des fusions est passée par une seule personne, qui était aussi Scrum Master. Cela a créé un goulot d'étranglement et rendu le travail des autres moins visible.
- **Le site ne lit pas encore la base de données.** Le calendrier affiche des données fictives : il manque une API côté serveur entre le site et la base.
- **La connexion n'a pas été commencée.** Elle bloque plusieurs US (US-03, US-04, US-18, US-19…), mais n'avait pas été priorisée.
- **Aucun test automatisé**, et pas de « définition de fini » commune. Des issues ont été fermées alors que leurs cases à cocher ne l'étaient pas.
- **Des conflits de fusion.** Des branches restées ouvertes longtemps ont dû être mises à jour plusieurs fois avant d'être fusionnées.

# Ce que nous améliorons au sprint 2

| # | Action | Responsable | Comment on vérifie |
| -- | ----------------------------------- | -------------- | ------------------------ |
| 1 | Sprint planning avec estimation de chaque US (échelle XS → XL) et objectif de sprint écrit | Scrum Master, toute l'équipe | Le Sprint Backlog 2 contient les points et l'objectif dès le début du sprint |
| 2 | Un responsable par US, et un travail réparti sur toute la durée du sprint, pas seulement en séance | Toute l'équipe | Chaque issue est assignée ; des contributions chaque semaine |
| 3 | Daily court au moins deux fois par semaine : ce que j'ai fait, ce que je vais faire, ce qui me bloque | Scrum Master | Compte rendu court de chaque daily |
| 4 | Commencer le sprint par la connexion (US-08 à US-10) et l'API serveur, qui débloquent les autres US | À désigner au planning | Inscription et connexion fonctionnelles à mi-sprint |
| 5 | Chaque pull request est relue par un autre membre que son auteur, à tour de rôle | Toute l'équipe | Au moins une relecture approuvée par PR, pas toujours par la même personne |
| 6 | Petites pull requests et mise à jour fréquente depuis `main`, pour éviter les conflits | Toute l'équipe | Moins de commits « Merge branch 'main' » |
| 7 | Définition de fini : critères d'acceptation remplis, cas de test ajoutés au cahier de tests, `npm run build` et `npm run lint` sans erreur, PR relue | Toute l'équipe | Vérifiée avant de fermer chaque issue |
| 8 | Ajouter des tests automatisés (Vitest), d'abord sur la logique du calendrier puis sur l'API | À désigner au planning | Tests lancés par une commande `npm test` |
| 9 | Déployer l'application sur un serveur, pour la démonstration de la soutenance 2 | À désigner au planning | Lien de l'application accessible |
