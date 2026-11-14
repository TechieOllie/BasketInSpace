// Ciel étoilé en arrière-plan. À placer en premier enfant de .sb-page.
// Le ciel est fixe et ne suit plus le défilement : les deux couches d'étoiles
// dérivent seules (animations dans base.css), sans aucun calcul en JavaScript.
export default function StarSky() {
  return (
    <div className="sb-sky" aria-hidden="true">
      <div className="sb-sky__far" />
      <div className="sb-sky__near" />
    </div>
  );
}