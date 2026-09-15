import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { chapterKey, cn, formatDuration } from "@/lib/utils";
import { getChapter, neighbors } from "@/lib/content";
import { isChapterDone, useProgress } from "@/lib/store";
import { LessonBlocks } from "@/components/lesson/blocks";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUBJECT_STYLE } from "@/lib/subject-style";

export const Route = createFileRoute("/matieres_/$subjectId_/$chapterId")({
  component: ChapterPage,
});

type Tab = "cours" | "exercices" | "quiz";

function ChapterPage() {
  const { subjectId, chapterId } = Route.useParams();
  const found = getChapter(subjectId, chapterId);
  const completed = useProgress((s) => s.completedChapters);
  const toggleChapter = useProgress((s) => s.toggleChapter);
  const setLastLesson = useProgress((s) => s.setLastLesson);
  const addStudy = useProgress((s) => s.addStudy);
  const favorites = useProgress((s) => s.favorites);
  const toggleFavorite = useProgress((s) => s.toggleFavorite);
  const doneEx = useProgress((s) => s.completedExercises);
  const toggleExercise = useProgress((s) => s.toggleExercise);
  const [tab, setTab] = useState<Tab>("cours");
  const [openSol, setOpenSol] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!found) return;
    setLastLesson(found.subject.id, found.chapter.id);
    setTab("cours");
    const id = setInterval(() => addStudy(15), 15000);
    return () => clearInterval(id);
  }, [found?.subject.id, found?.chapter.id, addStudy, setLastLesson]);

  if (!found) return <p className="text-ink-muted">Chapitre introuvable.</p>;
  const { subject, chapter } = found;
  const { prev, next, index } = neighbors(subject, chapter.id);
  const done = isChapterDone(completed, subject.id, chapter.id);
  const favKey = chapterKey(subject.id, chapter.id);
  const fav = favorites.includes(favKey);
  const st = SUBJECT_STYLE[subject.color];
  const headings = chapter.blocks.filter((b) => b.t === "h2") as { t: "h2"; text: string; id?: string }[];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Link to="/matieres/$subjectId" params={{ subjectId: subject.id }} className="text-xs font-medium text-ink-subtle hover:text-ink">
            ← {subject.short}
          </Link>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">Dans ce chapitre</p>
          <ul className="mt-2 space-y-1">
            {headings.map((h) => (
              <li key={h.id ?? h.text}>
                <a href={h.id ? `#${h.id}` : undefined} className="block rounded-sm px-2 py-1 text-xs text-ink-muted hover:bg-surface hover:text-ink">
                  {h.text.replace(/^Chapitre \d+ — /, "")}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1">
            {subject.chapters.map((c, i) => {
              const ok = isChapterDone(completed, subject.id, c.id);
              const current = c.id === chapter.id;
              return (
                <Link
                  key={c.id}
                  to="/matieres/$subjectId/$chapterId"
                  params={{ subjectId: subject.id, chapterId: c.id }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                    current ? "bg-accent-soft font-semibold text-accent" : "text-ink-muted hover:bg-surface",
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", ok ? "bg-stats" : current ? "bg-accent" : "bg-line-strong")} />
                  <span className="truncate">
                    {i + 1}. {c.title.replace(/^Chapitre \d+ — /, "")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={cn("text-xs font-semibold uppercase tracking-wider", st.text)}>
            {subject.short} · {index + 1}/{subject.chapters.length}
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Clock className="size-3.5" />
            {formatDuration(chapter.durationMin)}
          </div>
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{chapter.title}</h1>
        <p className="mt-1 text-sm text-ink-muted">{chapter.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["cours", "exercices", "quiz"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "h-9 rounded-full px-4 text-sm font-semibold capitalize",
                tab === t ? "bg-sidebar text-sidebar-fg" : "bg-surface text-ink-muted ring-1 ring-line",
              )}
            >
              {t}
              {t === "exercices" ? ` (${chapter.exercises.length})` : ""}
              {t === "quiz" ? ` (${chapter.quiz.length})` : ""}
            </button>
          ))}
          <button
            type="button"
            onClick={() => toggleFavorite(favKey)}
            className={cn(
              "ml-auto flex size-9 items-center justify-center rounded-full ring-1 ring-line",
              fav ? "bg-warn-soft text-warn" : "bg-surface text-ink-muted",
            )}
            aria-label="Favori"
          >
            <Star className={cn("size-4", fav && "fill-current")} />
          </button>
        </div>

        {tab === "cours" ? (
          <article className="mt-6 rounded-xl border border-line bg-surface px-4 py-6 shadow-card sm:px-8">
            <ul className="mb-6 flex flex-wrap gap-2">
              {chapter.objectives.map((o) => (
                <Badge key={o} tone={subject.color}>
                  {o}
                </Badge>
              ))}
            </ul>
            <LessonBlocks blocks={chapter.blocks} />
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <Button variant={done ? "secondary" : "default"} onClick={() => toggleChapter(subject.id, chapter.id)}>
                <Check className="size-4" />
                {done ? "Marqué lu — annuler" : "Marquer comme terminé"}
              </Button>
              <div className="flex gap-2">
                {prev ? (
                  <Button asChild variant="outline">
                    <Link to="/matieres/$subjectId/$chapterId" params={{ subjectId: subject.id, chapterId: prev.id }}>
                      <ChevronLeft className="size-4" />
                      Précédent
                    </Link>
                  </Button>
                ) : null}
                {next ? (
                  <Button asChild>
                    <Link to="/matieres/$subjectId/$chapterId" params={{ subjectId: subject.id, chapterId: next.id }}>
                      Suivant
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="secondary">
                    <Link to="/quiz/$quizId" params={{ quizId: `${subject.id}:all` }}>
                      Quiz de la matière
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </article>
        ) : null}

        {tab === "exercices" ? (
          <div id="exercices" className="mt-6 space-y-4">
            {chapter.exercises.length === 0 ? (
              <p className="text-sm text-ink-muted">Pas d’exercice isolé — passe au quiz.</p>
            ) : (
              chapter.exercises.map((ex) => {
                const ok = doneEx.includes(ex.id);
                return (
                  <article key={ex.id} className="rounded-xl border border-line bg-surface p-5 shadow-card">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{ex.title}</h2>
                      <Badge tone={ex.difficulty === "facile" ? "success" : ex.difficulty === "moyen" ? "warn" : "danger"}>
                        {ex.difficulty}
                      </Badge>
                      <span className="text-xs text-ink-subtle">{ex.durationMin} min</span>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap font-serif text-[16px] leading-relaxed">{ex.prompt}</p>
                    {ex.hint ? (
                      <p className="mt-2 text-sm text-ink-muted">
                        <span className="font-semibold">Indice : </span>
                        {ex.hint}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenSol((s) => ({ ...s, [ex.id]: !s[ex.id] }))}
                      >
                        {openSol[ex.id] ? "Masquer la solution" : "Voir la solution"}
                      </Button>
                      <Button variant={ok ? "secondary" : "default"} size="sm" onClick={() => toggleExercise(ex.id)}>
                        {ok ? "Fait" : "Marquer comme fait"}
                      </Button>
                    </div>
                    {openSol[ex.id] ? (
                      <pre className="mt-4 overflow-x-auto rounded-md bg-code p-4 font-mono text-[13px] leading-relaxed text-code-fg whitespace-pre-wrap">
                        {ex.solution}
                      </pre>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        ) : null}

        {tab === "quiz" ? (
          <div className="mt-6 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-8">
            <QuizPlayer quizId={`${subject.id}:${chapter.id}`} title={`Quiz — ${chapter.title}`} questions={chapter.quiz} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
