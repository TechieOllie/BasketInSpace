// US-05 : bascule clair/sombre, mémorisée d'une visite à l'autre.
// Écrit data-bs-theme sur <html> : Bootstrap 5.3 lit cet attribut nativement,
// et la version CSS classique s'appuie sur le même attribut pour ses tokens.
import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "bis-theme";

export function useTheme(defaultTheme: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? defaultTheme
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
