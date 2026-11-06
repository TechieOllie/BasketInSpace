// Détails d'un événement (US-15), avec les classes de modale Bootstrap
// mais pilotée par React (sans le JS de Bootstrap), comme la Navbar.
import { useEffect } from "react";
import type { ClubEvent } from "../shared/events";
import { EVENT_TYPES, getClub } from "../shared/events";
import type { User } from "../shared/types";
import { formatLongDate, formatTime } from "../shared/calendarUtils";

export default function EventModal({
  event,
  user,
  onClose,
}: {
  event: ClubEvent;
  user: User | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  const clubs = event.clubIds.map(getClub).filter((club) => club !== undefined);
  const full = event.spotsLeft === 0;
  // US-04 : sans utilisateur connecté, réserver renvoie vers /connexion.
  // La page de réservation elle-même relève de US-18.
  const bookingHref = user ? `/reservation?event=${event.id}` : "/connexion";

  return (
    <>
      <div
        className="modal fade show d-block sb-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
        onClick={onClose}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content sb-glass border p-2">
            <div className="modal-header border-0 pb-0">
              <span className={`sb-badge sb-ev--${event.type}`}>
                <span className="sb-ev-dot" />
                {EVENT_TYPES[event.type]}
              </span>
              <button type="button" className="sb-icon-btn ms-auto" aria-label="Fermer" onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <h2 id="event-title" className="sb-display fs-4 mb-4">{event.title}</h2>
              <dl className="sb-modal-info m-0">
                <dt>Date</dt>
                <dd>{formatLongDate(event.start.slice(0, 10))}</dd>
                <dt>Heure</dt>
                <dd>{formatTime(event.start)} – {formatTime(event.end)}</dd>
                <dt>Lieu</dt>
                <dd>
                  {event.venue}
                  <span className="d-block fw-normal text-body-secondary">
                    {event.planet}, district {event.district}
                  </span>
                </dd>
                <dt>{clubs.length > 1 ? "Clubs" : "Club"}</dt>
                <dd>{clubs.map((club) => club.name).join(" vs ")}</dd>
                <dt>Places</dt>
                <dd>
                  {full ? (
                    <span className="sb-accent-text">Complet</span>
                  ) : (
                    `${event.spotsLeft} restante${event.spotsLeft > 1 ? "s" : ""}`
                  )}
                  <span className="fw-normal text-body-secondary"> sur {event.capacity}</span>
                </dd>
              </dl>
              {event.description && <p className="mt-3 mb-0 text-body-secondary">{event.description}</p>}
            </div>

            <div className="modal-footer border-0 pt-0">
              {full ? (
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" disabled>
                  Complet
                </button>
              ) : (
                <a href={bookingHref} className="btn btn-primary rounded-pill px-4 sb-raised">
                  {event.type === "match" ? "Réserver ma place" : "Réserver cette séance"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
