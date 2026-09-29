# User Stories – Space BasketBall

**Rôles :**

- **Visiteur** : personne non connectée
- **Utilisateur** : joueur ou membre inscrit
- **Administrateur** : gestionnaire du site

---

## Page d'accueil (#3, #6, #7, #8)

### US-01 – Découvrir le sport

En tant que **visiteur**, je veux voir un grand titre et une description du Space BasketBall sur la page d'accueil, afin de comprendre en quoi consiste ce sport.

**Critères d'acceptation :**

- Le titre est affiché en grand, en haut de la section principale.
- Une description présente les règles et le principe du sport.

### US-02 – Naviguer sur le site (Navbar)

En tant que **visiteur**, je veux une barre de navigation présente sur toutes les pages, afin d'accéder rapidement aux différentes sections du site.

**Critères d'acceptation :**

- La navbar contient des liens vers l'accueil, le calendrier, les clubs, les scores et la boutique.
- Elle reste la même sur toutes les pages.
- Elle s'adapte aux écrans de mobile.

### US-03 – Accéder à l'inscription et à la connexion depuis la navbar

En tant que **visiteur**, je veux un lien vers l'inscription et la connexion dans la navbar, afin de créer un compte ou me connecter depuis n'importe quelle page.

**Critères d'acceptation :**

- Une fois connecté, le lien est remplacé par mon pseudo et un bouton de déconnexion.

### US-04 – Réserver depuis la navbar

En tant qu'**utilisateur**, je veux un bouton « Réserver une séance/match » dans la navbar, afin d'accéder directement à la réservation.

**Critères d'acceptation :**

- Si je ne suis pas connecté, le bouton me redirige vers la page de connexion.

### US-05 – Mode clair/sombre

En tant qu'**utilisateur**, je veux basculer entre un mode clair et un mode sombre, afin d'avoir un affichage confortable pour mes yeux.

**Critères d'acceptation :**

- Un bouton dans la navbar permet de changer de mode.
- Mon choix est conservé quand je reviens sur le site.

### US-06 – Pied de page (Footer)

En tant que **visiteur**, je veux un footer avec les informations habituelles, afin de trouver les contacts, les mentions légales et les liens utiles.

**Critères d'acceptation :**

- Le footer contient les contacts, les mentions légales, les réseaux sociaux et le copyright.
- Il est présent sur toutes les pages.

---

## Thème du site (#9)

### US-07 – Identité visuelle spatiale

En tant que **visiteur**, je veux un site dont le thème évoque l'espace (couleurs, typographies, visuels), afin de retrouver l'univers du Space BasketBall.

**Critères d'acceptation :**

- Une palette de couleurs et des polices sont définies et appliquées sur tout le site.
- Le thème fonctionne en mode clair comme en mode sombre.

---

## Inscription et connexion (#5)

### US-08 – Créer un compte

En tant que **visiteur**, je veux créer un compte, afin de pouvoir réserver des séances, rejoindre un club et acheter en boutique.

**Critères d'acceptation :**

- Le formulaire demande : nom, prénom, pseudo, e-mail, numéro de téléphone, année de naissance, et Système/Planète + District.
- Tous les champs sont validés (format de l'e-mail et du téléphone, pseudo unique, année de naissance cohérente).
- Un message d'erreur clair s'affiche si un champ est invalide.

### US-09 – Se connecter / se déconnecter

En tant qu'**utilisateur**, je veux me connecter avec mes identifiants et me déconnecter, afin d'accéder à mon espace de manière sécurisée.

**Critères d'acceptation :**

- Un message d'erreur s'affiche si les identifiants sont incorrects.
- Ma session est conservée tant que je ne me déconnecte pas.

### US-10 – Rôles utilisateur

En tant qu'**administrateur**, je veux disposer de droits supplémentaires par rapport à un utilisateur classique, afin de gérer le contenu du site.

**Critères d'acceptation :**

- Il existe deux rôles : Admin et User.
- Les pages et actions d'administration sont inaccessibles aux User.

---

## Base de données et boutique d'équipement (#11)

### US-11 – Stockage persistant des données

En tant qu'**équipe de développement**, nous voulons une base de données (Prisma) pour les utilisateurs et la boutique, afin que les comptes, les réservations, les articles et les commandes soient conservés.

**Critères d'acceptation :**

- Des modèles Prisma sont créés pour User (avec son rôle), Article et Commande.
- Les migrations sont versionnées.
- Le README explique comment initialiser la base.

### US-12 – Parcourir la boutique

En tant que **visiteur**, je veux consulter les équipements de Space BasketBall en vente, afin de trouver le matériel dont j'ai besoin.

**Critères d'acceptation :**

- Chaque article affiche son nom, une photo, sa description, son prix et sa disponibilité en stock.
- Les articles peuvent être filtrés par catégorie (ballons, tenues, protections, etc.).

### US-13 – Acheter un article

En tant qu'**utilisateur connecté**, je veux ajouter des articles à un panier et passer commande, afin d'acheter mon équipement.

**Critères d'acceptation :**

- Je peux ajouter ou retirer un article du panier et changer la quantité.
- Il est impossible de commander un article en rupture de stock.
- Une confirmation s'affiche une fois la commande passée.

### US-14 – Gérer la boutique (admin)

En tant qu'**administrateur**, je veux ajouter, modifier et supprimer des articles et gérer leur stock, afin que le catalogue reste à jour.

---

## Calendrier (#10)

### US-15 – Voir les événements à venir

En tant que **visiteur**, je veux voir les entraînements et matchs à venir sur un calendrier, afin de savoir ce qui se passe et quand.

**Critères d'acceptation :**

- Le calendrier propose une vue par mois et par semaine.
- Les entraînements et les matchs sont différenciés visuellement.
- Cliquer sur un événement affiche ses détails : date, heure, lieu (planète/district), clubs concernés.

### US-16 – Filtrer le calendrier

En tant qu'**utilisateur**, je veux filtrer le calendrier par club ou par type d'événement, afin de ne voir que ce qui m'intéresse.

### US-17 – Gérer les événements (admin)

En tant qu'**administrateur**, je veux créer, modifier et supprimer des entraînements et des matchs, afin de garder le calendrier à jour.

---

## Réservations, scores et clubs (#14, #15, #16)

### US-18 – Réserver une séance ou un match (#14)

En tant qu'**utilisateur connecté**, je veux réserver une place à un entraînement ou à un match depuis le calendrier, afin de garantir ma participation.

**Critères d'acceptation :**

- Le nombre de places restantes est affiché.
- Une réservation est impossible si l'événement est complet.
- Une confirmation s'affiche après la réservation.

### US-19 – Gérer mes réservations (#14)

En tant qu'**utilisateur**, je veux voir et annuler mes réservations, afin de m'organiser.

### US-20 – Consulter les scores (#15)

En tant que **visiteur**, je veux voir les scores des matchs passés, afin de suivre les résultats.

**Critères d'acceptation :**

- Pour chaque match : les deux clubs, le score final, la date et le lieu.
- Les matchs sont triés du plus récent au plus ancien.

### US-21 – Saisir les scores (admin) (#15)

En tant qu'**administrateur**, je veux enregistrer le score d'un match terminé, afin que les résultats soient publiés.

### US-22 – Parcourir les clubs (#16)

En tant que **visiteur**, je veux consulter la liste des clubs, afin de découvrir les équipes existantes.

**Critères d'acceptation :**

- Chaque club affiche son nom, son logo et sa planète/district.
- Une page de détail présente chaque club.

### US-23 – Voir les membres d'un club (#16)

En tant que **visiteur**, je veux voir les membres d'un club, afin de connaître ses joueurs.

**Critères d'acceptation :**

- Seul le pseudo (et éventuellement le rôle ou le poste) est affiché publiquement.
- L'e-mail et le téléphone ne sont jamais visibles.

### US-24 – Voir les matchs d'un club (#16)

En tant que **visiteur**, je veux voir les prochains matchs et les derniers résultats d'un club sur sa page, afin de suivre cette équipe.
