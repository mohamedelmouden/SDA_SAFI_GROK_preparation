/** Concours Master SDA — FSA Safi, AU 2026-2027 */
export const EXAM = {
  title: "Master Sciences des Données et Analytiques",
  acronym: "SDA",
  year: "AU 2026-2027",
  faculty: "Faculté des Sciences Appliquées de Safi",
  facultyShort: "FSA Safi",
  room: "Amphi 5",
  /** Saturday 19 Sept 2026, 10:00 Morocco (UTC+1) */
  at: new Date("2026-09-19T10:00:00+01:00"),
  axes: [
    "Algorithmique / Programmation (langage C)",
    "Bases de données",
    "Statistique et analyse",
    "Architecture des ordinateurs et système d'exploitation",
  ],
} as const;

export function remainingToExam(now = new Date()) {
  const ms = EXAM.at.getTime() - now.getTime();
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { total, days, hours, minutes, seconds, past: ms <= 0 };
}
