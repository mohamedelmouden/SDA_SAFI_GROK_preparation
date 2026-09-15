import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Clock, Lightbulb, ListChecks } from "lucide-react";
import { getSubject } from "@/lib/content";
import { isChapterDone, useProgress } from "@/lib/store";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/lesson/progress-ring";
import { cn, formatDuration } from "@/lib/utils";

export const Route = createFileRoute("/matieres_/$subjectId")({
  component: SubjectPage,
});

function SubjectPage() {
  const { subjectId } = Route.useParams();
  const subject = getSubject(subjectId);
  const completed = useProgress((s) => s.completedChapters);

  if (!subject) {
    return <p className="text-ink-muted">Matière introuvable.</p>;
  }

  const st = SUBJECT_STYLE[subject.color];
  const done = subject.chapters.filter((c) => isChapterDone(completed, subject.id, c.id)).length;
  const pct = Math.round((done / subject.chapters.length) * 100);
  const next = subject.chapters.find((c) => !isChapterDone(completed, subject.id, c.id)) ?? subject.chapters[0]!;
  const totalMin = subject.chapters.reduce((a, c) => a + c.durationMin, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-ink-subtle">
        <Link to="/matieres" className="hover:text-ink">
          Matières
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-ink">{subject.short}</span>
      </nav>

      <section className={cn("overflow-hidden rounded-2xl text-white shadow-card", st.bar)}>
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {subject.chapters.length} chapitres · {formatDuration(totalMin)}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{subject.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">{subject.description}</p>
            <Link
              to="/matieres/$subjectId/$chapterId"
              params={{ subjectId: subject.id, chapterId: next.id }}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink"
            >
              {done === 0 ? "Commencer" : "Continuer"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ProgressRing value={pct} size={108} stroke={9} trackClass="text-white/20" barClass="text-white">
            <div className="text-center">
              <div className="font-mono text-xl font-semibold tabular-nums">{pct}%</div>
              <div className="text-[10px] uppercase tracking-wider text-white/70">Progression</div>
            </div>
          </ProgressRing>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ListChecks className="size-4 text-accent" />
            Ce que tu vas apprendre
          </h2>
          <ul className="mt-3 space-y-2">
            {subject.learn.map((l) => (
              <li key={l} className="flex gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 size-4 shrink-0 text-stats" />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line bg-warn-soft/60 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="size-4 text-warn" />
            Conseils & astuces
          </h2>
          <ul className="mt-3 space-y-2">
            {subject.tips.map((l) => (
              <li key={l} className="flex gap-2 text-sm text-ink-muted">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-warn" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink-muted">
        <span className="font-semibold text-ink">Cible concours. </span>
        {subject.examFocus}
      </p>

      <h2 className="mt-8 text-lg font-semibold">Chapitres</h2>
      <ol className="mt-3 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-card">
        {subject.chapters.map((ch, i) => {
          const ok = isChapterDone(completed, subject.id, ch.id);
          return (
            <li key={ch.id}>
              <Link
                to="/matieres/$subjectId/$chapterId"
                params={{ subjectId: subject.id, chapterId: ch.id }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-paper sm:gap-4"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    ok ? "bg-success-soft text-success" : "bg-paper text-ink-muted",
                  )}
                >
                  {ok ? <Check className="size-4" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{ch.title}</p>
                  <p className="truncate text-xs text-ink-muted">{ch.subtitle}</p>
                </div>
                <Badge tone="muted" className="hidden sm:inline-flex">
                  <Clock className="mr-1 size-3" />
                  {ch.durationMin} min
                </Badge>
                <ChevronRight className="size-4 text-ink-subtle" />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
