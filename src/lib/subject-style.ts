import type { SubjectColor } from "@/lib/content/types";

export const SUBJECT_STYLE: Record<
  SubjectColor,
  { soft: string; text: string; bar: string; ring: string; border: string; hex: string }
> = {
  algo: {
    soft: "bg-algo-soft",
    text: "text-algo",
    bar: "bg-algo",
    ring: "text-algo",
    border: "border-algo/20",
    hex: "#5346e0",
  },
  bdd: {
    soft: "bg-bdd-soft",
    text: "text-bdd",
    bar: "bg-bdd",
    ring: "text-bdd",
    border: "border-bdd/20",
    hex: "#2a78e0",
  },
  stats: {
    soft: "bg-stats-soft",
    text: "text-stats",
    bar: "bg-stats",
    ring: "text-stats",
    border: "border-stats/20",
    hex: "#0f9f78",
  },
  archi: {
    soft: "bg-archi-soft",
    text: "text-archi",
    bar: "bg-archi",
    ring: "text-archi",
    border: "border-archi/20",
    hex: "#d4712a",
  },
};
