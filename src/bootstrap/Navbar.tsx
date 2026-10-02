// Barre de navigation flottante, avec les classes Bootstrap (sans
// react-bootstrap ni le JS de Bootstrap : le repli est piloté par l'état React).
// Couvre US-02, US-03, US-04, US-05.
import { useState } from "react";
import { useTheme } from "../shared/useTheme";
import { NAV_LINKS } from "../shared/content";
import type { User } from "../shared/types";
import { BallLogo, SunIcon, MoonIcon, MenuIcon } from "../shared/Icons";

export default function Navbar({
  user = null,
  onLogout,
  currentPath = "/",
}: {
  user?: User | null;
  onLogout?: () => void;
  currentPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  // US-04 : un visiteur non connecté est redirigé vers la connexion
  const reserveHref = user ? "/reservation" : "/connexion";

  return (
    <header className="sticky-top pt-3 px-3 px-md-4">
      <nav
        className="navbar navbar-expand-xl sb-glass sb-capsule border mx-auto py-2 ps-4 pe-2"
        aria-label="Navigation principale"
      >
        <a className="navbar-brand sb-display sb-brand d-flex align-items-center gap-2 me-3" href="/">
          <BallLogo />
          <span>BasketInSpace</span>
        </a>

        {/* Le bouton de mode reste visible sur mobile et passe en dernier sur grand écran */}
        <button
          type="button"
          className="sb-icon-btn ms-auto ms-xl-3 order-xl-3"
          aria-label="Basculer entre mode clair et mode sombre"
          onClick={toggle}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          type="button"
          className="sb-icon-btn ms-2 d-xl-none"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="sb-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon />
        </button>

        <div id="sb-menu" className={`collapse navbar-collapse order-xl-2 ${open ? "show" : ""}`}>
          <ul className="navbar-nav me-auto py-2 py-xl-0">
            {NAV_LINKS.map((link) => {
              const active = link.href === currentPath;
              return (
                <li className="nav-item" key={link.href}>
                  <a
                    className={`nav-link sb-pill ${active ? "active fw-bold" : ""}`}
                    aria-current={active ? "page" : undefined}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="d-flex flex-column flex-xl-row align-items-xl-center gap-3 pb-3 pb-xl-0">
            {user ? (
              <>
                <span className="fw-bold">{user.pseudo}</span>
                <button type="button" className="btn btn-link p-0 text-reset text-decoration-none" onClick={onLogout}>
                  Se déconnecter
                </button>
              </>
            ) : (
              <a href="/connexion">Connexion / Inscription</a>
            )}
            <a className="btn btn-primary rounded-pill px-4 sb-raised" href={reserveHref}>
              Réserver une séance/match
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
