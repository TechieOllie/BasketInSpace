import type { ClubEvent } from "../shared/events";
import { EVENT_TYPES } from "../shared/events";
import { formatLongDate, formatTime } from "../shared/calendarUtils";

/** Vue liste, utilisée sur mobile à la place des grilles. */
export default function EventList({
  eventsByDay,
  onSelect,
}: {
  eventsByDay: Map<string, ClubEvent[]>;
  onSelect: (event: ClubEvent) => void;
}) {
  if (eventsByDay.size === 0) {
    return <p className="text-body-secondary text-center py-5 m-0">Aucun événement sur cette période.</p>;
  }

  return (
    <div className="d-grid gap-4">
      {[...eventsByDay.entries()].map(([day, events]) => (
        <section key={day}>
          <h3 className="sb-display sb-cal-list-date mb-2">{formatLongDate(day)}</h3>
          <ul className="list-unstyled d-grid gap-2 m-0">
            {events.map((event) => (
              <li key={event.id}>
                <button
                  type="button"
                  className={`sb-cal-item sb-ev--${event.type}`}
                  onClick={() => onSelect(event)}
                >
                  <span className="sb-cal-item-time">
                    {formatTime(event.start)}
                    <small>{formatTime(event.end)}</small>
                  </span>
                  <span className="flex-grow-1 text-start">
                    <span className="d-block fw-bold">{event.title}</span>
                    <span className="small text-body-secondary">
                      {EVENT_TYPES[event.type]} · {event.planet}, {event.district}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
