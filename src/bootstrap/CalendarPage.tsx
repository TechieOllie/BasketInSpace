// Page Calendrier (US-15, US-16), même structure que HomePage :
// ciel étoilé, Navbar, contenu, Footer.
import { useCallback, useMemo, useState } from "react";
import StarSky from "../shared/StarSky";
import { CLUBS, EVENTS, EVENT_TYPES } from "../shared/events";
import type { ClubEvent, EventType } from "../shared/events";
import type { User } from "../shared/types";
import {
  addDays,
  addMonths,
  formatMonth,
  formatWeek,
  getMonthGrid,
  getWeekDays,
  groupByDay,
  pickDays,
  toDateKey,
} from "../shared/calendarUtils";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MonthGrid from "./MonthGrid";
import WeekGrid from "./WeekGrid";
import EventList from "./EventList";
import EventModal from "./EventModal";
import "./CalendarPage.css";

type View = "month" | "week";

const ALL_TYPES = Object.keys(EVENT_TYPES) as EventType[];

export default function CalendarPage({
  user = null,
  onLogout,
}: {
  user?: User | null;
  onLogout?: () => void;
}) {
  const [today] = useState(() => toDateKey(new Date()));
  const [view, setView] = useState<View>("month");
  /** Une date de la période affichée : le mois ou la semaine qui la contient. */
  const [anchor, setAnchor] = useState(today);
  const [activeTypes, setActiveTypes] = useState<EventType[]>(ALL_TYPES);
  const [clubId, setClubId] = useState("");
  const [selected, setSelected] = useState<ClubEvent | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const eventsByDay = useMemo(
    () =>
      groupByDay(
        EVENTS.filter(
          (e) => activeTypes.includes(e.type) && (clubId === "" || e.clubIds.includes(clubId)),
        ),
      ),
    [activeTypes, clubId],
  );

  // Pour la liste mobile : seulement les jours de la période affichée.
  const periodEvents = useMemo(() => {
    const days =
      view === "week"
        ? getWeekDays(anchor)
        : getMonthGrid(anchor).filter((d) => d.startsWith(anchor.slice(0, 7)));
    return pickDays(eventsByDay, days);
  }, [eventsByDay, view, anchor]);

  const move = (delta: number) =>
    setAnchor((a) => (view === "month" ? addMonths(a, delta) : addDays(a, 7 * delta)));

  const toggleType = (type: EventType) =>
    setActiveTypes((types) =>
      types.includes(type) ? types.filter((t) => t !== type) : [...types, type],
    );

  const showWeek = (day: string) => {
    setAnchor(day);
    setView("week");
  };

  return (
    <div className="sb-page">
      <StarSky />
      <Navbar user={user} onLogout={onLogout} currentPath="/calendrier" />

      <main className="container py-5">
        <header className="mb-4 mb-lg-5">
          <h1 className="sb-display sb-title sb-title-3d mb-3">Calendrier</h1>
          <p className="fs-5 text-body-secondary m-0 sb-cal-lead">
            Entraînements et matchs à venir dans tout le système. Cliquez sur un événement pour voir
            ses détails et réserver votre place.
          </p>
        </header>

        <div className="sb-glass sb-cal-panel border p-3 p-md-4">
          {/* Navigation dans le temps + choix de la vue */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <button type="button" className="sb-icon-btn" onClick={() => move(-1)} aria-label="Période précédente">
                <Chevron dir="left" />
              </button>
              <h2 className="sb-display sb-cal-period m-0" aria-live="polite">
                {view === "month" ? formatMonth(anchor) : formatWeek(anchor)}
              </h2>
              <button type="button" className="sb-icon-btn" onClick={() => move(1)} aria-label="Période suivante">
                <Chevron dir="right" />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-3 ms-1"
                onClick={() => setAnchor(today)}
              >
                Aujourd'hui
              </button>
            </div>

            <div className="sb-segmented border" role="group" aria-label="Vue">
              {(["month", "week"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`sb-pill ${view === v ? "active" : ""}`}
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                >
                  {v === "month" ? "Mois" : "Semaine"}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres (US-16) */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 mb-3 border-bottom">
            <div className="d-flex flex-wrap gap-2" role="group" aria-label="Filtrer par type">
              {ALL_TYPES.map((type) => {
                const on = activeTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    className={`sb-filter sb-ev--${type} ${on ? "active" : ""}`}
                    aria-pressed={on}
                    onClick={() => toggleType(type)}
                  >
                    <span className="sb-ev-dot" />
                    {EVENT_TYPES[type]}s
                  </button>
                );
              })}
            </div>

            <select
              className="form-select rounded-pill sb-cal-select"
              value={clubId}
              onChange={(e) => setClubId(e.target.value)}
              aria-label="Filtrer par club"
            >
              <option value="">Tous les clubs</option>
              {CLUBS.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name} ({club.planet})
                </option>
              ))}
            </select>
          </div>

          <div className="d-none d-lg-block">
            {view === "month" ? (
              <MonthGrid
                anchor={anchor}
                today={today}
                eventsByDay={eventsByDay}
                onSelect={setSelected}
                onShowWeek={showWeek}
              />
            ) : (
              <WeekGrid anchor={anchor} today={today} eventsByDay={eventsByDay} onSelect={setSelected} />
            )}
          </div>
          <div className="d-lg-none">
            <EventList eventsByDay={periodEvents} onSelect={setSelected} />
          </div>
        </div>
      </main>

      <Footer />

      {selected && <EventModal event={selected} user={user} onClose={closeModal} />}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}
