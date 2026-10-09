import type { ClubEvent } from "../shared/events";
import { formatTime } from "../shared/calendarUtils";

/** Pastille cliquable d'un événement, colorée selon son type. */
export default function EventChip({
  event,
  onSelect,
  detailed = false,
}: {
  event: ClubEvent;
  onSelect: (event: ClubEvent) => void;
  /** Affiche aussi l'heure de fin et la planète (vue semaine). */
  detailed?: boolean;
}) {
  return (
    <button
      type="button"
      className={`sb-chip sb-ev--${event.type} ${detailed ? "sb-chip--detailed" : ""}`}
      onClick={() => onSelect(event)}
      title={event.title}
    >
      <span className="sb-chip-time">
        {formatTime(event.start)}
        {detailed && ` – ${formatTime(event.end)}`}
      </span>
      <span className="sb-chip-title">{event.title}</span>
      {detailed && <span className="sb-chip-place">{event.planet}</span>}
    </button>
  );
}
