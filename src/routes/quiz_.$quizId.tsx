import { createFileRoute, Link } from "@tanstack/react-router";
import { getQuiz } from "@/lib/content";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export const Route = createFileRoute("/quiz_/$quizId")({
  component: QuizPage,
});

function QuizPage() {
  const { quizId } = Route.useParams();
  const quiz = getQuiz(quizId);
  if (!quiz) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-ink-muted">Quiz introuvable.</p>
        <Link to="/quiz" className="mt-3 inline-block text-sm font-medium text-accent">
          Retour aux quiz
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/quiz" className="text-xs font-medium text-ink-subtle hover:text-ink">
        ← Quiz & exercices
      </Link>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle">{quiz.crumb}</p>
      <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-8">
        <QuizPlayer quizId={quiz.id} title={quiz.title} questions={quiz.questions} />
      </div>
    </div>
  );
}
