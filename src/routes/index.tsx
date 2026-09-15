import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/lesson/progress-ring";
import { Countdown } from "@/components/countdown";
import { EXAM } from "@/lib/exam";
import { SUBJECTS, totals } from "@/lib/content";
import { isChapterDone, useProgress } from "@/lib/store";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const name = useProgress((s) => s.name);
  const completed = useProgress((s) => s.completedChapters);
  const last = useProgress((s) => s.lastLesson);
  const t = totals();
  const doneCh = completed.length;
  const pct = t.chapters ? Math.round((doneCh / t.chapters) * 100) : 0;

  const continueHref = last ? `/matieres/${last.subjectId}/${last.chapterId}` : "/matieres/algo-c/bases";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="overflow-hidden rounded-2xl bg-sidebar text-sidebar-fg shadow-card">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sidebar-muted">
              Concours {EXAM.acronym} · {EXAM.year}
            </p>
            <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
              Bonjour{name ? ` ${name}` : ""} !
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sidebar-muted sm:text-[15px]">
              Prêt à réussir ta candidature au Master SDA ? Quatre axes, un samedi matin. Organise ton temps, révise
              les pièges, et entraîne-toi comme à l’écrit.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="lg">
                <Link to={continueHref}>
                  {last ? "Reprendre la révision" : "Commencer la révision"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-sidebar-fg hover:bg-white/15 hover:text-sidebar-fg"
              >
                <Link to="/planning">Voir le crash plan</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-6 rounded-xl bg-white/5 px-6 py-5">
            <ProgressRing value={pct} size={112} stroke={9} trackClass="text-white/10" barClass="text-white">
              <div className="text-center">
                <div className="font-mono text-2xl font-semibold tabular-nums">{pct}%</div>
                <div className="text-[10px] uppercase tracking-wider text-sidebar-muted">Global</div>
              </div>
            </ProgressRing>
            <div className="text-sm">
              <p className="font-medium">
                {doneCh} / {t.chapters} chapitres
              </p>
              <p className="mt-1 text-sidebar-muted">{t.exercises} exercices · {t.questions} QCM</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Mes matières</h2>
          <Link to="/matieres" className="text-sm font-medium text-accent hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {SUBJECTS.map((s) => {
            const st = SUBJECT_STYLE[s.color];
            const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
            const p = Math.round((d / s.chapters.length) * 100);
            return (
              <Link
                key={s.id}
                to="/matieres/$subjectId"
                params={{ subjectId: s.id }}
                className="group rounded-xl border border-line bg-surface p-4 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <div className={cn("flex size-10 items-center justify-center rounded-md", st.soft, st.text)}>
                  <BookOpen className="size-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{s.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{s.chapters.length} chapitres</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper">
                  <div className={cn("h-full rounded-full", st.bar)} style={{ width: `${p}%` }} />
                </div>
                <p className={cn("mt-2 text-xs font-semibold tabular-nums", st.text)}>{p} %</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
            <Target className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Objectif cette semaine</p>
            <p className="mt-1 text-sm text-ink-muted">
              Terminer les 4 fiches express + 1 sujet blanc. Viser 70 % au quiz complet de chaque matière.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-3">
              <Link to="/quiz">Ouvrir les quiz</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-archi-soft text-archi">
            <CalendarDays className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Il reste</p>
            <div className="mt-2">
              <Countdown />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              {EXAM.facultyShort} · {EXAM.room} · samedi 19/09/2026, 10h00
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-ink-subtle">
        <Badge>Rappel</Badge>{" "}
        <span className="ml-2">Les candidats doivent se présenter avec une pièce d’identité.</span>
      </p>
    </div>
  );
}
