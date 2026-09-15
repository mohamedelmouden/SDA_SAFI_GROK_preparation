import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { SUBJECTS } from "@/lib/content";
import { isChapterDone, useProgress } from "@/lib/store";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matieres")({ component: MatieresPage });

function MatieresPage() {
  const completed = useProgress((s) => s.completedChapters);
  const list = SUBJECTS;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Programme</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Matières</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Les quatre axes du concours, classés et découpés en chapitres de révision.
      </p>
      <ul className="mt-6 space-y-3">
        {list.map((s) => {
          const st = SUBJECT_STYLE[s.color];
          const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
          const p = Math.round((d / s.chapters.length) * 100);
          return (
            <li key={s.id}>
              <Link
                to="/matieres/$subjectId"
                params={{ subjectId: s.id }}
                className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-accent/30"
              >
                <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-lg", st.soft, st.text)}>
                  <BookOpen className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{s.title}</h2>
                    <Badge tone={s.color}>
                      {s.chapters.length} chapitres
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{s.description}</p>
                  <div className="mt-3 h-1.5 max-w-xs overflow-hidden rounded-full bg-paper">
                    <div className={cn("h-full", st.bar)} style={{ width: `${p}%` }} />
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <p className={cn("font-mono text-lg font-semibold tabular-nums", st.text)}>{p}%</p>
                  <ArrowRight className="ml-auto mt-1 size-4 text-ink-subtle" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
