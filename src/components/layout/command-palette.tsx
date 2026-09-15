import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { BookOpen, FileQuestion, GraduationCap, Search } from "lucide-react";
import { searchContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const hits = useMemo(() => searchContent(q), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQ("");
    void navigate({ to: href });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 min-w-0 w-full max-w-xl flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-ink-subtle shadow-sm hover:border-line-strong"
      >
        <Search className="size-4" />
        <span className="flex-1 truncate text-left">Rechercher une matière, un chapitre, un exercice…</span>
        <kbd className="hidden rounded-xs border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle sm:inline">
          ⌘K
        </kbd>
      </button>
      {open ? (
        <div className="fixed inset-0 z-80">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-auto mt-[12vh] w-[min(560px,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-surface shadow-pop">
            <Command label="Recherche" shouldFilter={false}>
              <div className="flex items-center gap-2 border-b border-line px-3">
                <Search className="size-4 text-ink-subtle" />
                <Command.Input
                  value={q}
                  onValueChange={setQ}
                  placeholder="Cours, piège, SQL, Bayes…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-subtle"
                  autoFocus
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                {q.trim().length < 2 ? (
                  <p className="px-2 py-6 text-center text-sm text-ink-subtle">Tape au moins 2 lettres.</p>
                ) : hits.length === 0 ? (
                  <Command.Empty className="px-2 py-6 text-center text-sm text-ink-subtle">
                    Aucun résultat
                  </Command.Empty>
                ) : (
                  hits.map((h) => (
                    <Command.Item
                      key={h.href + h.title}
                      value={h.href + h.title}
                      onSelect={() => go(h.href)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-accent-soft",
                      )}
                    >
                      {h.kind === "matiere" ? (
                        <GraduationCap className="size-4 text-accent" />
                      ) : h.kind === "exercice" ? (
                        <FileQuestion className="size-4 text-archi" />
                      ) : (
                        <BookOpen className="size-4 text-ink-muted" />
                      )}
                      <span className="min-w-0 flex-1 truncate font-medium">{h.title}</span>
                      <span className="text-xs text-ink-subtle">{h.crumb}</span>
                    </Command.Item>
                  ))
                )}
              </Command.List>
            </Command>
          </div>
        </div>
      ) : null}
    </>
  );
}
