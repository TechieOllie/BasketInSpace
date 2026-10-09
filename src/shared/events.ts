// Données fictives du calendrier, à remplacer plus tard par la base de données (US-11).

export type EventType = "training" | "match";

export interface Club {
  id: string;
  name: string;
  planet: string;
  district: string;
}

export interface ClubEvent {
  id: string;
  type: EventType;
  title: string;
  /** Date et heure locales, au format "AAAA-MM-JJTHH:MM" */
  start: string;
  end: string;
  venue: string;
  planet: string;
  district: string;
  /** Un club pour un entraînement, deux pour un match (domicile en premier). */
  clubIds: string[];
  description?: string;
  capacity: number;
  spotsLeft: number;
}

export const EVENT_TYPES: Record<EventType, string> = {
  training: "Entraînement",
  match: "Match",
};

export const CLUBS: Club[] = [
  { id: "bis", name: "BasketInSpace", planet: "Lune", district: "Mer de la Tranquillité" },
  { id: "mars", name: "Comètes de Mars", planet: "Mars", district: "Olympus Mons" },
  { id: "orion", name: "Nébuleuses d'Orion", planet: "Orion Prime", district: "Ceinture Est" },
  { id: "titan", name: "Satellites de Titan", planet: "Titan", district: "Lac Kraken" },
];

export const EVENTS: ClubEvent[] = [
  {
    id: "e1", type: "training", title: "Entraînement en apesanteur",
    start: "2026-10-06T18:00", end: "2026-10-06T19:30",
    venue: "Dôme Lunaire", planet: "Lune", district: "Mer de la Tranquillité",
    clubIds: ["bis"], capacity: 12, spotsLeft: 6,
  },
  {
    id: "e2", type: "training", title: "Séance découverte",
    start: "2026-10-08T17:00", end: "2026-10-08T18:00",
    venue: "Arène Orbitale", planet: "Lune", district: "Cratère Tycho",
    clubIds: ["bis"], capacity: 10, spotsLeft: 0,
    description: "Pour les nouveaux joueurs : prise en main des rebonds en faible gravité.",
  },
  {
    id: "e3", type: "training", title: "Tirs en gravité réduite",
    start: "2026-10-09T18:30", end: "2026-10-09T20:00",
    venue: "Base Olympus", planet: "Mars", district: "Olympus Mons",
    clubIds: ["mars"], capacity: 14, spotsLeft: 5,
  },
  {
    id: "e4", type: "match", title: "BasketInSpace vs Comètes de Mars",
    start: "2026-10-10T20:00", end: "2026-10-10T22:00",
    venue: "Arène Orbitale", planet: "Lune", district: "Cratère Tycho",
    clubIds: ["bis", "mars"], capacity: 200, spotsLeft: 42,
  },
  {
    id: "e5", type: "training", title: "Entraînement en apesanteur",
    start: "2026-10-13T18:00", end: "2026-10-13T19:30",
    venue: "Dôme Lunaire", planet: "Lune", district: "Mer de la Tranquillité",
    clubIds: ["bis"], capacity: 12, spotsLeft: 8,
  },
  {
    id: "e6", type: "training", title: "Passes en orbite",
    start: "2026-10-14T19:00", end: "2026-10-14T20:30",
    venue: "Station Nébula", planet: "Orion Prime", district: "Ceinture Est",
    clubIds: ["orion"], capacity: 12, spotsLeft: 9,
  },
  {
    id: "e7", type: "training", title: "Entraînement de défense",
    start: "2026-10-15T18:00", end: "2026-10-15T19:30",
    venue: "Hangar Kraken", planet: "Titan", district: "Lac Kraken",
    clubIds: ["titan"], capacity: 12, spotsLeft: 2,
  },
  {
    id: "e8", type: "match", title: "Nébuleuses d'Orion vs Satellites de Titan",
    start: "2026-10-17T19:00", end: "2026-10-17T21:00",
    venue: "Station Nébula", planet: "Orion Prime", district: "Ceinture Est",
    clubIds: ["orion", "titan"], capacity: 150, spotsLeft: 12,
  },
  {
    id: "e9", type: "training", title: "Entraînement en apesanteur",
    start: "2026-10-20T18:00", end: "2026-10-20T19:30",
    venue: "Dôme Lunaire", planet: "Lune", district: "Mer de la Tranquillité",
    clubIds: ["bis"], capacity: 12, spotsLeft: 10,
  },
  {
    id: "e10", type: "training", title: "Tirs en gravité réduite",
    start: "2026-10-23T18:30", end: "2026-10-23T20:00",
    venue: "Base Olympus", planet: "Mars", district: "Olympus Mons",
    clubIds: ["mars"], capacity: 14, spotsLeft: 7,
  },
  {
    id: "e11", type: "match", title: "BasketInSpace vs Nébuleuses d'Orion",
    start: "2026-10-24T20:00", end: "2026-10-24T22:00",
    venue: "Arène Orbitale", planet: "Lune", district: "Cratère Tycho",
    clubIds: ["bis", "orion"], capacity: 200, spotsLeft: 0,
  },
  {
    id: "e12", type: "training", title: "Entraînement en apesanteur",
    start: "2026-10-27T18:00", end: "2026-10-27T19:30",
    venue: "Dôme Lunaire", planet: "Lune", district: "Mer de la Tranquillité",
    clubIds: ["bis"], capacity: 12, spotsLeft: 7,
  },
  {
    id: "e13", type: "match", title: "Comètes de Mars vs Satellites de Titan",
    start: "2026-10-31T15:00", end: "2026-10-31T17:00",
    venue: "Base Olympus", planet: "Mars", district: "Olympus Mons",
    clubIds: ["mars", "titan"], capacity: 180, spotsLeft: 64,
  },
  {
    id: "e14", type: "training", title: "Entraînement en apesanteur",
    start: "2026-11-03T18:00", end: "2026-11-03T19:30",
    venue: "Dôme Lunaire", planet: "Lune", district: "Mer de la Tranquillité",
    clubIds: ["bis"], capacity: 12, spotsLeft: 9,
  },
  {
    id: "e15", type: "match", title: "Satellites de Titan vs BasketInSpace",
    start: "2026-11-07T20:00", end: "2026-11-07T22:00",
    venue: "Hangar Kraken", planet: "Titan", district: "Lac Kraken",
    clubIds: ["titan", "bis"], capacity: 160, spotsLeft: 30,
  },
];

export function getClub(id: string): Club | undefined {
  return CLUBS.find((club) => club.id === id);
}
