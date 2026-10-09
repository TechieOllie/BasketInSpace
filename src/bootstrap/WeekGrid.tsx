import type { ClubEvent } from "../shared/events";
import { formatDayHeader, getWeekDays } from "../shared/calendarUtils";
import EventChip from "./EventChip";

export default function WeekGrid({
  anchor,
  today,
  eventsByDay,
  onSelect,
}: {
  /** Une date de la semaine à afficher ("AAAA-MM-JJ") */
  anchor: string;
  today: string;
  eventsByDay: Map<string, ClubEvent[]>;
  onSelect: (event: ClubEvent) => void;
}) {
  return (
    <div className="sb-cal-grid sb-cal-grid--week" role="grid" aria-label="Vue de la semaine">
      {getWeekDays(anchor).map((day) => {
        const { weekday, day: dayNumber } = formatDayHeader(day);
        const events = eventsByDay.get(day) ?? [];

        return (
          <div key={day} role="gridcell" className={`sb-cal-day ${day === today ? "is-today" : ""}`}>
            <div className="sb-cal-week-head">
              <span className="sb-cal-weekday p-0">{weekday}</span>
              <span className="sb-cal-num">{dayNumber}</span>
            </div>
            {events.length === 0 && <span className="sb-cal-empty">Rien de prévu</span>}
            {events.map((event) => (
              <EventChip key={event.id} event={event} onSelect={onSelect} detailed />
            ))}
          </div>
        );
      })}
    </div>
  );
}
