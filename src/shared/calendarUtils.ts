import type { ClubEvent } from "./events";

export const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

/** "2026-10-09" pour une date locale (sans passer par l'UTC). */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key: string, days: number): string {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function addMonths(key: string, months: number): string {
  const date = fromDateKey(key);
  return toDateKey(new Date(date.getFullYear(), date.getMonth() + months, 1));
}

/** Lundi de la semaine qui contient cette date. */
export function startOfWeek(key: string): string {
  const offset = (fromDateKey(key).getDay() + 6) % 7; // lundi = 0
  return addDays(key, -offset);
}

/** Les 7 jours (lundi → dimanche) de la semaine qui contient cette date. */
export function getWeekDays(key: string): string[] {
  const monday = startOfWeek(key);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

/** Les 42 jours (6 semaines complètes) affichés pour le mois de cette date. */
export function getMonthGrid(key: string): string[] {
  const first = key.slice(0, 8) + "01";
  const monday = startOfWeek(first);
  return Array.from({ length: 42 }, (_, i) => addDays(monday, i));
}

/** Regroupe les événements par jour, triés par heure de début. */
export function groupByDay(events: ClubEvent[]): Map<string, ClubEvent[]> {
  const map = new Map<string, ClubEvent[]>();
  for (const event of [...events].sort((a, b) => a.start.localeCompare(b.start))) {
    const key = event.start.slice(0, 10);
    map.set(key, [...(map.get(key) ?? []), event]);
  }
  return map;
}

/** Ne garde que les jours de la liste donnée, dans cet ordre. */
export function pickDays(eventsByDay: Map<string, ClubEvent[]>, days: string[]): Map<string, ClubEvent[]> {
  return new Map(days.filter((d) => eventsByDay.has(d)).map((d) => [d, eventsByDay.get(d)!]));
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatTime(dateTime: string): string {
  return dateTime.slice(11, 16).replace(":", "h");
}

export function formatMonth(key: string): string {
  return capitalize(fromDateKey(key).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }));
}

/** "6 – 12 octobre 2026", ou "27 oct. – 2 nov. 2026" si la semaine change de mois. */
export function formatWeek(key: string): string {
  const days = getWeekDays(key);
  const first = fromDateKey(days[0]);
  const last = fromDateKey(days[6]);
  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()} – ${last.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;
  }
  const short = { day: "numeric", month: "short" } as const;
  return `${first.toLocaleDateString("fr-FR", short)} – ${last.toLocaleDateString("fr-FR", { ...short, year: "numeric" })}`;
}

export function formatLongDate(key: string): string {
  return capitalize(
    fromDateKey(key).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
  );
}

export function formatDayHeader(key: string): { weekday: string; day: number } {
  const date = fromDateKey(key);
  return { weekday: WEEKDAYS[(date.getDay() + 6) % 7], day: date.getDate() };
}