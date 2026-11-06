// Le site peut être servi sous un sous-chemin (ex. GitHub Pages :
// /BasketInSpace/). Vite expose ce préfixe via import.meta.env.BASE_URL.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

// Préfixe un chemin absolu de l'application ("/calendrier") par la base.
export function withBase(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}

// Chemin courant sans la base, pour choisir la page à afficher.
export function currentRoute(): string {
  let path = window.location.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  return path.replace(/\/+$/, "") || "/";
}
