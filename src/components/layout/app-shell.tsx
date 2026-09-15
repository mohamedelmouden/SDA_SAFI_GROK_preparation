import { useEffect, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { CommandPalette } from "./command-palette";
import { useProgress } from "@/lib/store";
import { EXAM } from "@/lib/exam";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrate = useProgress((s) => s.hydrate);
  const name = useProgress((s) => s.name);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-svh overflow-x-clip bg-dots">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 md:block">
        <Sidebar />
      </aside>
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Fermer le menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(18rem,88vw)]">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className="min-w-0 md:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line/80 bg-paper/90 px-3 py-3 backdrop-blur-md sm:px-6">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md border border-line bg-surface md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <div className="min-w-0 flex-1">
            <CommandPalette />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted lg:inline">
              {EXAM.room} · 19/09
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
              <Bell className="size-4" />
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-sidebar-fg">
              {(name || "C")[0]!.toUpperCase()}
            </span>
          </div>
        </header>
        <main className="px-3 py-5 sm:px-6 sm:py-7 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
