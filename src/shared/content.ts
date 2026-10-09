// Contenus de la page d'accueil, communs aux deux versions.
// Les textes entre crochets sont à remplacer.

export interface NavLink {
  href: string;
  label: string;
}

export interface Rule {
  title: string;
  text: string;
}

export interface Tile {
  href: string;
  title: string;
  text: string;
  cta: string;
}

export interface FooterItem {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  items: FooterItem[];
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/calendrier", label: "Calendrier" },
  { href: "/clubs", label: "Clubs" },
  { href: "/scores", label: "Scores" },
  { href: "/boutique", label: "Boutique" },
];

export const RULES: Rule[] = [
  { title: "Le rebond interplanétaire", text: "Un ballon qui rebondit sur le sol peut continuer sa trajectoire pendant plusieurs minutes. Pour éviter qu’il ne quitte l’arène, chaque terrain possède une limite orbitale : si le ballon la dépasse, il est considéré comme sorti, même s’il revient trois jours plus tard." },
  { title: "Les pas sont remplacés par des poussées", text: "En apesanteur, les joueurs ne font pas vraiment de pas. Ils ont droit à trois poussées consécutives avec les mains, les pieds ou les parois de l’arène avant de devoir passer le ballon. Une quatrième poussée est considérée comme une accélération illégale." },
  { title: "Interdiction de tourner sur soi-même", text: "Un joueur qui tourne sur lui-même plus de deux fois avant de tirer est déclaré en rotation incontrôlée. Il doit alors attendre qu’un coéquipier vienne l’arrêter avant de pouvoir reprendre le jeu." },
];

export const TILES: Tile[] = [
  {
    href: "/calendrier",
    title: "Calendrier",
    text: "Entraînements et matchs à venir, par mois ou par semaine.",
    cta: "Voir le calendrier",
  },
  {
    href: "/clubs",
    title: "Clubs",
    text: "Les équipes, leur planète et leurs membres.",
    cta: "Parcourir les clubs",
  },
  {
    href: "/scores",
    title: "Scores",
    text: "Les résultats des matchs, du plus récent au plus ancien.",
    cta: "Consulter les scores",
  },
  {
    href: "/boutique",
    title: "Boutique",
    text: "Ballons, tenues et protections.",
    cta: "Ouvrir la boutique",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Contact",
    items: [
      { label: "contact@basketinspace.galaxy" },
      { label: "+999 42 00 3000" },
      { label: "Quai n°7, Station Orbitale des Rebonds Perdus, Secteur Saturne" },
    ],
  },
  {
    title: "Liens utiles",
    items: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Calendrier", href: "/calendrier" },
      { label: "Clubs", href: "/clubs" },
      { label: "Boutique", href: "/boutique" },
    ],
  },
  {
    title: "Réseaux sociaux",
    items: [
      { label: "[Réseau social 1]", href: "#" },
      { label: "[Réseau social 2]", href: "#" },
      { label: "[Réseau social 3]", href: "#" },
    ],
  },
];
