// US-01 : grand titre + description du sport.
import HeroArt from "../shared/HeroArt";
import type { User } from "../shared/types";

export default function Hero({ user = null }: { user?: User | null }) {
  return (
    <section className="border-bottom">
      <div className="container py-5">
        <div className="row align-items-center g-5 py-lg-4">
          <div className="col-lg-6 d-flex flex-column align-items-start gap-4">
            <h1 className="sb-display sb-title sb-title-3d m-0" aria-label="BasketInSpace">
              Basket<br />InSpace
            </h1>
            <p className="fs-5 text-body-secondary m-0">
              Le basket se joue maintenant parmi les étoiles, le BasketInSpace est le seul sport où un simple rebond peut vous envoyer sur Mars. Affrontez vos adversaires en apesanteur, évitez les météorites et devenez le meilleur basketteur de la galaxie.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a
                className="btn btn-primary btn-lg rounded-pill px-4 sb-raised"
                href={user ? "/reservation" : "/connexion"}
              >
                Réserver une séance
              </a>
              <a className="btn btn-outline-secondary btn-lg rounded-pill px-4" href="#regles">
                Découvrir les règles
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}
