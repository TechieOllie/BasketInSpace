// US-01 : le principe et les règles du sport.
import { RULES } from "../shared/content";

export default function Rules() {
  return (
    <section id="regles" className="container py-5 my-lg-4">
      <div className="row g-5">
        <div className="col-lg-6">
          <h2 className="sb-display fs-2 mb-3">Le principe</h2>
          <p className="fs-5 text-body-secondary m-0">
            Présentation du principe du BasketInSpace : deux équipes de cinq joueurs s’affrontent dans une arène spatiale en apesanteur. L’objectif est de marquer le plus de points possible dans le panier adverse, mais chaque passe et chaque rebond peuvent modifier la trajectoire du ballon. L’équipe qui compte le plus de points à la fin du match est déclarée vainqueur.
          </p>
        </div>
        <div className="col-lg-6">
          <h2 className="sb-display fs-2 mb-3">Les règles</h2>
          <ol className="list-unstyled m-0 border-bottom">
            {RULES.map((rule, i) => (
              <li key={i} className="d-flex align-items-baseline gap-4 py-4 border-top">
                <span className="sb-display sb-accent-text small">{i + 1}</span>
                <div>
                  <h3 className="fs-5 fw-bold mb-1">{rule.title}</h3>
                  <p className="text-body-secondary m-0">{rule.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
