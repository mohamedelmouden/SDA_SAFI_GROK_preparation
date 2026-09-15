import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as CircleCheck, M as BookOpen, n as Trophy, w as Clock } from "../_libs/lucide-react.mjs";
import { c as useProgress, h as totals, l as SUBJECTS, s as isChapterDone } from "./router-Q6qF9BwN.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as ProgressRing } from "./progress-ring-DSULivZP.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/statistiques-CgvtD9ju.js
var import_jsx_runtime = require_jsx_runtime();
function StatsPage() {
	const completed = useProgress((s) => s.completedChapters);
	const doneEx = useProgress((s) => s.completedExercises);
	const seconds = useProgress((s) => s.studySeconds);
	const daily = useProgress((s) => s.dailySeconds);
	const quizResults = useProgress((s) => s.quizResults);
	const t = totals();
	const pct = t.chapters ? Math.round(completed.length / t.chapters * 100) : 0;
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const chart = Object.entries(daily).sort(([a], [b]) => a.localeCompare(b)).map(([day, sec]) => ({
		day: day.slice(5),
		min: Math.round(sec / 60)
	}));
	const quizTaken = Object.values(quizResults);
	const quizPct = quizTaken.length === 0 ? 0 : Math.round(quizTaken.reduce((a, r) => a + r.correct / r.total, 0) / quizTaken.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Mes statistiques"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: BookOpen,
						label: "Chapitres lus",
						value: `${completed.length} / ${t.chapters}`,
						hint: `${pct} %`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: CircleCheck,
						label: "Exercices faits",
						value: `${doneEx.length} / ${t.exercises}`,
						hint: t.exercises ? `${Math.round(doneEx.length / t.exercises * 100)} %` : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Clock,
						label: "Temps de travail",
						value: `${h}h ${String(m).padStart(2, "0")}min`,
						hint: "sur cet appareil"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Progression par matière"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: SUBJECTS.map((s) => {
						const st = SUBJECT_STYLE[s.color];
						const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
						const p = Math.round(d / s.chapters.length * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: s.short
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("tabular-nums text-xs font-semibold", st.text),
								children: [
									d,
									"/",
									s.chapters.length,
									" · ",
									p,
									"%"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-2 overflow-hidden rounded-full bg-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full rounded-full", st.bar),
								style: { width: `${p}%` }
							})
						})] }, s.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Minutes par jour"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-56",
						children: chart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex h-full items-center justify-center text-sm text-ink-subtle",
							children: "Ouvre un chapitre — le temps se compte tout seul."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: chart,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-line)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: { fontSize: 12 },
										stroke: "var(--color-ink-subtle)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: { fontSize: 12 },
										stroke: "var(--color-ink-subtle)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "min",
										stroke: "var(--color-accent)",
										strokeWidth: 2,
										dot: true
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-xl border border-line bg-surface p-5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
							value: pct,
							size: 88,
							stroke: 8,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm font-semibold tabular-nums",
								children: [pct, "%"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Progression globale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-ink-muted",
							children: [
								completed.length,
								" / ",
								t.chapters,
								" chapitres"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-accent-soft/60 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-semibold",
								children: "Moyenne des quiz"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xl font-semibold tabular-nums",
								children: [quizPct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ink-muted",
								children: [quizTaken.length, " série(s) terminée(s)"]
							})
						]
					})]
				})]
			})
		]
	});
}
function Stat({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-ink-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink-subtle",
				children: hint
			})
		]
	});
}
//#endregion
export { StatsPage as component };
