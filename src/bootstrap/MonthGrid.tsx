import type { ClubEvent } from "../shared/events";
import { WEEKDAYS, getMonthGrid } from "../shared/calendarUtils";
import EventChip from "./EventChip";

const MAX_VISIBLE = 3;

export default function MonthGrid({
  anchor,
  today,
  eventsByDay,
  onSelect,
  onShowWeek,
}: {
  /** Une date du mois à afficher ("AAAA-MM-JJ") */
  anchor: string;
  today: string;
  eventsByDay: Map<string, ClubEvent[]>;
  onSelect: (event: ClubEvent) => void;
  onShowWeek: (day: string) => void;
}) {
  const month = anchor.slice(0, 7);

  return (
    <div className="sb-cal-grid" role="grid" aria-label="Vue du mois">
      {WEEKDAYS.map((day) => (
        <div key={day} className="sb-cal-weekday" role="columnheader">
          {day}
        </div>
      ))}

      {getMonthGrid(anchor).map((day) => {
        const events = eventsByDay.get(day) ?? [];
        const hidden = events.length - MAX_VISIBLE;
        const classes = ["sb-cal-day"];
        if (!day.startsWith(month)) classes.push("is-outside");
        if (day === today) classes.push("is-today");

        return (
          <div key={day} role="gridcell" className={classes.join(" ")}>
            <span className="sb-cal-num">{Number(day.slice(8))}</span>
            {events.slice(0, MAX_VISIBLE).map((event) => (
              <EventChip key={event.id} event={event} onSelect={onSelect} />
            ))}
            {hidden > 0 && (
              <button type="button" className="sb-cal-more" onClick={() => onShowWeek(day)}>
                +{hidden} autre{hidden > 1 ? "s" : ""}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
