import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock, Trophy } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SUBJECTS, totals } from "@/lib/content";
import { isChapterDone, useProgress } from "@/lib/store";
import { ProgressRing } from "@/components/lesson/progress-ring";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/statistiques")({ component: StatsPage });

function StatsPage() {
  const completed = useProgress((s) => s.completedChapters);
  const doneEx = useProgress((s) => s.completedExercises);
  const seconds = useProgress((s) => s.studySeconds);
  const daily = useProgress((s) => s.dailySeconds);
  const quizResults = useProgress((s) => s.quizResults);
  const t = totals();
  const pct = t.chapters ? Math.round((completed.length / t.chapters) * 100) : 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const chart = Object.entries(daily)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, sec]) => ({
      day: day.slice(5),
      min: Math.round(sec / 60),
    }));

  const quizTaken = Object.values(quizResults);
  const quizPct =
    quizTaken.length === 0
      ? 0
      : Math.round(
          (quizTaken.reduce((a, r) => a + r.correct / r.total, 0) / quizTaken.length) * 100,
        );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Mes statistiques</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat icon={BookOpen} label="Chapitres lus" value={`${completed.length} / ${t.chapters}`} hint={`${pct} %`} />
        <Stat
          icon={CheckCircle2}
          label="Exercices faits"
          value={`${doneEx.length} / ${t.exercises}`}
          hint={t.exercises ? `${Math.round((doneEx.length / t.exercises) * 100)} %` : ""}
        />
        <Stat icon={Clock} label="Temps de travail" value={`${h}h ${String(m).padStart(2, "0")}min`} hint="sur cet appareil" />
      </div>

      <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
        <h2 className="text-sm font-semibold">Progression par matière</h2>
        <ul className="mt-4 space-y-4">
          {SUBJECTS.map((s) => {
            const st = SUBJECT_STYLE[s.color];
            const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
            const p = Math.round((d / s.chapters.length) * 100);
            return (
              <li key={s.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.short}</span>
                  <span className={cn("tabular-nums text-xs font-semibold", st.text)}>
                    {d}/{s.chapters.length} · {p}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper">
                  <div className={cn("h-full rounded-full", st.bar)} style={{ width: `${p}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
          <h2 className="text-sm font-semibold">Minutes par jour</h2>
          <div className="mt-4 h-56">
            {chart.length === 0 ? (
              <p className="flex h-full items-center justify-center text-sm text-ink-subtle">
                Ouvre un chapitre — le temps se compte tout seul.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--color-ink-subtle)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-ink-subtle)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="min" stroke="var(--color-accent)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
            <ProgressRing value={pct} size={88} stroke={8}>
              <span className="font-mono text-sm font-semibold tabular-nums">{pct}%</span>
            </ProgressRing>
            <div>
              <p className="text-sm font-semibold">Progression globale</p>
              <p className="text-xs text-ink-muted">
                {completed.length} / {t.chapters} chapitres
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-accent-soft/60 p-5">
            <Trophy className="size-5 text-accent" />
            <p className="mt-2 text-sm font-semibold">Moyenne des quiz</p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{quizPct}%</p>
            <p className="text-xs text-ink-muted">{quizTaken.length} série(s) terminée(s)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
      <div className="flex items-center gap-2 text-ink-muted">
        <Icon className="size-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="text-xs text-ink-subtle">{hint}</p>
    </div>
  );
}
