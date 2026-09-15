import { useEffect, useState } from "react";
import { remainingToExam } from "@/lib/exam";

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<ReturnType<typeof remainingToExam> | null>(null);

  useEffect(() => {
    const tick = () => setNow(remainingToExam());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="h-12 w-44 rounded-md bg-line/80" aria-hidden />;
  }

  if (now.past) return <p className="text-sm font-medium">L’épreuve a commencé. Bon courage.</p>;

  const cell = (v: number, l: string) => (
    <div className="min-w-10 text-center sm:min-w-12">
      <div className="font-mono text-xl font-semibold tabular-nums tracking-tight sm:text-3xl">{v}</div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-ink-subtle">{l}</div>
    </div>
  );

  if (compact) {
    return (
      <span className="tabular-nums">
        {now.days} j {now.hours} h {now.minutes} min
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-end gap-2 sm:gap-3">
      {cell(now.days, "jours")}
      {cell(now.hours, "heures")}
      {cell(now.minutes, "min")}
      {cell(now.seconds, "s")}
    </div>
  );
}
