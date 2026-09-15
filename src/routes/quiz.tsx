import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, FileQuestion, Timer } from "lucide-react";
import { allExercises, BLANCS, SUBJECTS } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/store";
import { SUBJECT_STYLE } from "@/lib/subject-style";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({ component: QuizHub });

function QuizHub() {
  const results = useProgress((s) => s.quizResults);
  const doneEx = useProgress((s) => s.completedExercises);
  const exercises = allExercises();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Quiz & Exercices</h1>
        <p className="mt-2 text-sm text-ink-muted">
          QCM par chapitre, banques par matière, sujets blancs. Les exercices ouverts sont dans chaque leçon.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {BLANCS.map((b) => {
          const r = results[b.id];
          return (
            <div key={b.id} className="rounded-xl border border-line bg-surface p-5 shadow-card">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Timer className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{b.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{b.description}</p>
                  <p className="mt-2 text-xs text-ink-subtle">
                    {b.questions.length} questions · {b.durationMin} min
                    {r ? ` · dernier score ${r.correct}/${r.total}` : ""}
                  </p>
                  <Button asChild size="sm" className="mt-3">
                    <Link to="/quiz/$quizId" params={{ quizId: b.id }}>
                      Commencer
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Quiz par matière</h2>
        <ul className="mt-3 space-y-2">
          {SUBJECTS.map((s) => {
            const st = SUBJECT_STYLE[s.color];
            const allId = `${s.id}:all`;
            const r = results[allId];
            const n = s.chapters.reduce((a, c) => a + c.quiz.length, 0);
            return (
              <li key={s.id} className="rounded-xl border border-line bg-surface p-4 shadow-card">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn("flex size-9 items-center justify-center rounded-md", st.soft, st.text)}>
                    <ClipboardList className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{s.short}</p>
                    <p className="text-xs text-ink-muted">
                      {n} QCM
                      {r ? ` · ${r.correct}/${r.total}` : ""}
                    </p>
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/quiz/$quizId" params={{ quizId: allId }}>
                      Quiz complet
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.chapters.map((ch, i) => (
                    <Link
                      key={ch.id}
                      to="/quiz/$quizId"
                      params={{ quizId: `${s.id}:${ch.id}` }}
                      className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-ink-muted hover:bg-accent-soft hover:text-accent"
                    >
                      Ch. {i + 1}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Tous les exercices</h2>
        <ul className="space-y-2">
          {exercises.map(({ subject, chapter, exercise }) => (
            <li key={exercise.id}>
              <Link
                to="/matieres/$subjectId/$chapterId"
                params={{ subjectId: subject.id, chapterId: chapter.id }}
                hash="exercices"
                className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-3 hover:border-accent/30"
              >
                <FileQuestion className={cn("size-4", SUBJECT_STYLE[subject.color].text)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{exercise.title}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {subject.short} · {chapter.title.replace(/^Chapitre \d+ — /, "")}
                  </p>
                </div>
                <Badge tone={exercise.difficulty === "facile" ? "success" : exercise.difficulty === "moyen" ? "warn" : "danger"}>
                  {exercise.difficulty}
                </Badge>
                {doneEx.includes(exercise.id) ? <Badge tone="success">fait</Badge> : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
