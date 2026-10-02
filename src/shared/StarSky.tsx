// Ciel étoilé en arrière-plan. À placer en premier enfant de .sb-page.
// Publie la position de défilement dans la variable CSS --sb-scroll :
// base.css s'en sert pour décaler les deux couches d'étoiles (parallaxe).
import { useEffect } from "react";

export default function StarSky() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty(
        "--sb-scroll",
        String(Math.round(window.scrollY))
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sb-sky" aria-hidden="true">
      <div className="sb-sky__far" />
      <div className="sb-sky__near" />
    </div>
  );
}
