import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rich } from "@/components/lesson/blocks";
import { useProgress } from "@/lib/store";

export function QuizPlayer({
  quizId,
  title,
  questions,
}: {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
}) {
  const saveQuiz = useProgress((s) => s.saveQuiz);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const q = questions[i]!;
  const choice = picked[q.id];
  const revealed = choice !== undefined;

  const score = useMemo(() => {
    let c = 0;
    for (const qq of questions) {
      if (picked[qq.id] === qq.answer) c += 1;
    }
    return c;
  }, [picked, questions]);

  function pick(idx: number) {
    if (revealed) return;
    setPicked((p) => ({ ...p, [q.id]: idx }));
  }

  function finish() {
    setDone(true);
    saveQuiz(quizId, score, questions.length);
  }

  function reset() {
    setI(0);
    setPicked({});
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Résultat</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-4 font-mono text-4xl font-semibold tabular-nums text-accent">
          {score}
          <span className="text-lg text-ink-muted"> / {questions.length}</span>
        </p>
        <p className="mt-1 text-sm text-ink-muted">{pct} % de bonnes réponses</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper">
          <div
            className={cn("h-full rounded-full", pct >= 70 ? "bg-stats" : pct >= 50 ? "bg-warn" : "bg-danger")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          {pct >= 80
            ? "Solide. Enchaîne sur un sujet blanc ou la fiche express."
            : pct >= 50
              ? "Correct. Relis les explications des items ratés, puis recommence."
              : "Reprends le chapitre correspondant — mieux vaut maintenant que samedi."}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={reset}>
            <RotateCcw className="size-4" />
            Recommencer
          </Button>
        </div>
        <ol className="mt-8 space-y-3">
          {questions.map((qq, idx) => {
            const ok = picked[qq.id] === qq.answer;
            return (
              <li key={qq.id} className="rounded-md border border-line p-3 text-sm">
                <div className="flex items-start gap-2">
                  {ok ? (
                    <Check className="mt-0.5 size-4 text-success" />
                  ) : (
                    <X className="mt-0.5 size-4 text-danger" />
                  )}
                  <div>
                    <p className="font-medium text-ink">
                      {idx + 1}. <Rich text={qq.question} />
                    </p>
                    <p className="mt-1 text-ink-muted">
                      Réponse : <Rich text={qq.options[qq.answer]!} />
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-ink-muted">
        <span className="font-medium text-ink">{title}</span>
        <span className="tabular-nums">
          {i + 1} / {questions.length}
        </span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${((i + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>
      <h2 className="font-serif text-xl leading-snug text-ink sm:text-2xl">
        <Rich text={q.question} />
      </h2>
      <ul className="mt-5 space-y-2">
        {q.options.map((opt, idx) => {
          const selected = choice === idx;
          const correct = idx === q.answer;
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => pick(idx)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  !revealed && "border-line bg-surface hover:border-accent/40 hover:bg-accent-soft/40",
                  revealed && correct && "border-success/40 bg-success-soft",
                  revealed && selected && !correct && "border-danger/40 bg-danger-soft",
                  revealed && !selected && !correct && "border-line bg-surface opacity-70",
                )}
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5">
                  <Rich text={opt} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {revealed ? (
        <p className="mt-4 rounded-md bg-paper px-4 py-3 text-sm text-ink-muted">
          <Rich text={q.explain} />
        </p>
      ) : null}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" disabled={i === 0} onClick={() => setI((x) => x - 1)}>
          <ChevronLeft className="size-4" />
          Précédent
        </Button>
        {i === questions.length - 1 ? (
          <Button disabled={!revealed} onClick={finish}>
            Voir le score
          </Button>
        ) : (
          <Button disabled={!revealed} onClick={() => setI((x) => x + 1)}>
            Suivant
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
