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
  { title: "[Règle 1]", text: "[Explication de la règle, en une ou deux phrases.]" },
  { title: "[Règle 2]", text: "[Explication de la règle, en une ou deux phrases.]" },
  { title: "[Règle 3]", text: "[Explication de la règle, en une ou deux phrases.]" },
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
      { label: "[E-mail de contact]" },
      { label: "[Téléphone]" },
      { label: "[Adresse : planète, district]" },
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
