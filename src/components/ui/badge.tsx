import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "accent" | "algo" | "bdd" | "stats" | "archi" | "success" | "danger" | "warn";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    muted: "bg-paper text-ink-muted border-line",
    accent: "bg-accent-soft text-accent border-transparent",
    algo: "bg-algo-soft text-algo border-transparent",
    bdd: "bg-bdd-soft text-bdd border-transparent",
    stats: "bg-stats-soft text-stats border-transparent",
    archi: "bg-archi-soft text-archi border-transparent",
    success: "bg-success-soft text-success border-transparent",
    danger: "bg-danger-soft text-danger border-transparent",
    warn: "bg-warn-soft text-warn border-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
