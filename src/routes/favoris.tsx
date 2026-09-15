import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SUBJECTS } from "@/lib/content";
import { useProgress } from "@/lib/store";
import { chapterKey } from "@/lib/utils";

export const Route = createFileRoute("/favoris")({ component: FavorisPage });

function FavorisPage() {
  const favorites = useProgress((s) => s.favorites);
  const items = SUBJECTS.flatMap((s) =>
    s.chapters
      .filter((c) => favorites.includes(chapterKey(s.id, c.id)))
      .map((c) => ({ s, c })),
  );

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Favoris</h1>
      <p className="mt-2 text-sm text-ink-muted">Les chapitres que tu épingles depuis le cours.</p>
      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-ink-muted">
          Aucun favori pour l’instant. Ouvre un chapitre et appuie sur l’étoile.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {items.map(({ s, c }) => (
            <li key={s.id + c.id}>
              <Link
                to="/matieres/$subjectId/$chapterId"
                params={{ subjectId: s.id, chapterId: c.id }}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 hover:border-accent/30"
              >
                <Star className="size-4 fill-current text-warn" />
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-xs text-ink-muted">{s.short}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
