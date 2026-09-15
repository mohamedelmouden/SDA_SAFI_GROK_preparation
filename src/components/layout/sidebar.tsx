import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  Home,
  Settings,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/matieres", label: "Matières", icon: BookOpen },
  { to: "/planning", label: "Planning", icon: CalendarDays },
  { to: "/quiz", label: "Quiz & Exercices", icon: ClipboardList },
  { to: "/ressources", label: "Ressources", icon: FolderOpen },
  { to: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { to: "/favoris", label: "Favoris", icon: Star },
  { to: "/parametres", label: "Paramètres", icon: Settings },
] as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-fg">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="flex size-9 items-center justify-center rounded-md bg-sidebar-active text-white">
          <GraduationCap className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">Master SDA</p>
          <p className="text-[11px] text-sidebar-muted">AU 2026-2027</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-active text-white"
                  : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mountain-fade relative mx-3 mb-4 overflow-hidden rounded-lg px-4 pb-5 pt-10">
        <p className="relative text-[12px] leading-relaxed text-sidebar-fg/85">
          « Ce n’est pas la montagne à conquérir, mais toi à révéler. »
        </p>
      </div>
    </div>
  );
}
