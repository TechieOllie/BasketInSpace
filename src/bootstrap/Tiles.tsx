// Quatre accès rapides vers les grandes sections du site.
import { TILES } from "../shared/content";
import { withBase } from "../shared/url";

export default function Tiles() {
  return (
    <section className="container pb-5 mb-lg-4">
      <h2 className="sb-display fs-2 mb-4">Explorer la galaxie</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4">
        {TILES.map((tile) => (
          <div className="col" key={tile.href}>
            <a href={withBase(tile.href)} className="sb-tile sb-lift d-flex flex-column gap-2 h-100 p-4">
              <span className="sb-display fw-bold text-body">{tile.title}</span>
              <span className="text-body-secondary">{tile.text}</span>
              <span className="mt-auto fw-bold sb-accent-text">{tile.cta}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
