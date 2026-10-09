// US-06 : contacts, mentions légales, réseaux sociaux, copyright.
import { FOOTER_COLUMNS } from "../shared/content";

export default function Footer() {
  return (
    <footer className="container pb-4">
      <div className="sb-glass sb-footer-panel border px-4 px-md-5 pt-5 pb-3">
        <div className="row g-4">
          <div className="col-sm-6 col-lg-3 d-flex flex-column gap-2">
            <span className="sb-display sb-brand">BasketInSpace</span>
            <span className="text-body-secondary">Le basket parmi les étoiles.</span>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div className="col-sm-6 col-lg-3" key={col.title}>
              <h2 className="fs-6 fw-bold mb-2">{col.title}</h2>
              <ul className="list-unstyled m-0 text-body-secondary sb-foot-links">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 border-top mt-4 pt-2 small text-body-secondary sb-foot-links">
          <span>© {new Date().getFullYear()} BasketInSpace. Tous droits réservés.</span>
          <a className="me-n-pill" href="/mentions-legales">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}
