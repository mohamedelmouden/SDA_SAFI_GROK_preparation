import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, FileText, FolderOpen, Link2, Timer } from "lucide-react";
import { RESOURCES } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/ressources")({ component: RessourcesPage });

const ICONS = {
  fiche: FileText,
  annale: Timer,
  lien: Link2,
  video: FolderOpen,
  divers: FolderOpen,
} as const;

function RessourcesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold tracking-tight">Ressources</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Fiches du jour J, sujets blancs, et quelques références externes. Tout le cours reste dans l’onglet Matières.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => {
          const Icon = ICONS[r.kind];
          const inner = (
            <>
              <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Icon className="size-5" />
              </span>
              <div className="mt-3 flex items-center gap-2">
                <h2 className="font-semibold">{r.title}</h2>
                {r.href ? <ExternalLink className="size-3.5 text-ink-subtle" /> : null}
              </div>
              <p className="mt-1 text-sm text-ink-muted">{r.blurb}</p>
              {r.countLabel ? (
                <Badge tone="muted" className="mt-3">
                  {r.countLabel}
                </Badge>
              ) : null}
            </>
          );
          const cls =
            "block rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-accent/30";
          if (r.href) {
            return (
              <a key={r.id} href={r.href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
              </a>
            );
          }
          return (
            <Link key={r.id} to={r.internalTo ?? "/"} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
