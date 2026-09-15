import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { CRASH_PLAN, getSubject } from "@/lib/content";
import { EXAM } from "@/lib/exam";
import { useProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planning")({ component: PlanningPage });

const DAYS = ["2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-19"];
const LABELS: Record<string, string> = {
  "2026-09-15": "Mar 15",
  "2026-09-16": "Mer 16",
  "2026-09-17": "Jeu 17",
  "2026-09-18": "Ven 18",
  "2026-09-19": "Sam 19 · examen",
};

function colorFor(id: string) {
  if (id === "exam") return "bg-danger-soft text-danger border-danger/20";
  if (id === "mix") return "bg-accent-soft text-accent border-accent/20";
  const s = getSubject(id);
  if (!s) return "bg-paper text-ink-muted border-line";
  const st = SUBJECT_STYLE[s.color];
  return `${st.soft} ${st.text} ${st.border}`;
}

function PlanningPage() {
  const sessions = useProgress((s) => s.sessions);
  const addSession = useProgress((s) => s.addSession);
  const removeSession = useProgress((s) => s.removeSession);
  const [date, setDate] = useState("2026-09-15");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("11:00");
  const [subjectId, setSubjectId] = useState("algo-c");
  const [title, setTitle] = useState("");

  const all = useMemo(() => {
    const extra = sessions.map((s) => ({
      id: s.id,
      date: s.date,
      start: s.start,
      end: s.end,
      subjectId: s.subjectId,
      title: s.title,
      custom: true as const,
    }));
    return [...CRASH_PLAN.map((p) => ({ ...p, custom: false as const })), ...extra];
  }, [sessions]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">4 jours restants</p>
          <h1 className="text-3xl font-semibold tracking-tight">Planning de révision</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Crash plan jusqu’au {EXAM.room}, samedi 19 à 10h. Tu peux ajouter tes propres créneaux — ils restent sur
            cet appareil.
          </p>
        </div>
        <Badge tone="warn">Samedi 10h00 · Amphi 5</Badge>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-5">
        {DAYS.map((d) => {
          const items = all.filter((x) => x.date === d).sort((a, b) => a.start.localeCompare(b.start));
          return (
            <div key={d} className="rounded-xl border border-line bg-surface p-3 shadow-card">
              <p className="text-xs font-semibold text-ink">{LABELS[d]}</p>
              <ul className="mt-2 space-y-2">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className={cn("rounded-md border px-2.5 py-2 text-xs", colorFor(it.subjectId))}
                  >
                    <p className="font-mono tabular-nums opacity-80">
                      {it.start}–{it.end}
                    </p>
                    <p className="mt-0.5 font-semibold leading-snug">{it.title}</p>
                    {"note" in it && it.note ? <p className="mt-1 opacity-80">{it.note}</p> : null}
                    {it.custom ? (
                      <button
                        type="button"
                        className="mt-1 inline-flex items-center gap-1 opacity-70 hover:opacity-100"
                        onClick={() => removeSession(it.id)}
                      >
                        <Trash2 className="size-3" />
                        Retirer
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <form
        className="mt-8 rounded-xl border border-line bg-surface p-5 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          addSession({ date, start, end, subjectId, title: title.trim() });
          setTitle("");
        }}
      >
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Plus className="size-4" />
          Ajouter une session
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-xs font-medium text-ink-muted">
            Jour
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {LABELS[d]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Matière
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm"
            >
              <option value="algo-c">Algo / C</option>
              <option value="bdd">Bases de données</option>
              <option value="stats">Statistique</option>
              <option value="archi">Archi / SE</option>
              <option value="mix">Mix / fiches</option>
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Début
            <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1" />
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Fin
            <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1" />
          </label>
          <label className="text-xs font-medium text-ink-muted sm:col-span-2 lg:col-span-1">
            Titre
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Révision…" className="mt-1" />
          </label>
        </div>
        <Button type="submit" className="mt-4">
          <CalendarDays className="size-4" />
          Ajouter
        </Button>
      </form>
    </div>
  );
}
