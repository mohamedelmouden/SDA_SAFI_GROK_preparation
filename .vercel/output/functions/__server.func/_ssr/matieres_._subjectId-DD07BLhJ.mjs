import { n as cn, r as formatDuration } from "./utils-Hb0Pzv9p.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ChevronRight, P as ArrowRight, h as Lightbulb, k as Check, p as ListChecks, w as Clock } from "../_libs/lucide-react.mjs";
import { c as useProgress, i as Route$2, p as getSubject, s as isChapterDone } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as ProgressRing } from "./progress-ring-DSULivZP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matieres_._subjectId-DD07BLhJ.js
var import_jsx_runtime = require_jsx_runtime();
function SubjectPage() {
	const { subjectId } = Route$2.useParams();
	const subject = getSubject(subjectId);
	const completed = useProgress((s) => s.completedChapters);
	if (!subject) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-ink-muted",
		children: "Matière introuvable."
	});
	const st = SUBJECT_STYLE[subject.color];
	const done = subject.chapters.filter((c) => isChapterDone(completed, subject.id, c.id)).length;
	const pct = Math.round(done / subject.chapters.length * 100);
	const next = subject.chapters.find((c) => !isChapterDone(completed, subject.id, c.id)) ?? subject.chapters[0];
	const totalMin = subject.chapters.reduce((a, c) => a + c.durationMin, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-4 flex flex-wrap items-center gap-1 text-xs text-ink-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/matieres",
						className: "hover:text-ink",
						children: "Matières"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink",
						children: subject.short
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: cn("overflow-hidden rounded-2xl text-white shadow-card", st.bar),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-white/70",
								children: [
									subject.chapters.length,
									" chapitres · ",
									formatDuration(totalMin)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
								children: subject.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-2xl text-sm text-white/80",
								children: subject.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matieres/$subjectId/$chapterId",
								params: {
									subjectId: subject.id,
									chapterId: next.id
								},
								className: "mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink",
								children: [done === 0 ? "Commencer" : "Continuer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
						value: pct,
						size: 108,
						stroke: 9,
						trackClass: "text-white/20",
						barClass: "text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xl font-semibold tabular-nums",
								children: [pct, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wider text-white/70",
								children: "Progression"
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "size-4 text-accent" }), "Ce que tu vas apprendre"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: subject.learn.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-sm text-ink-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-stats" }), l]
						}, l))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-warn-soft/60 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 text-warn" }), "Conseils & astuces"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: subject.tips.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-sm text-ink-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-warn" }), l]
						}, l))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-ink",
					children: "Cible concours. "
				}), subject.examFocus]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-lg font-semibold",
				children: "Chapitres"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-card",
				children: subject.chapters.map((ch, i) => {
					const ok = isChapterDone(completed, subject.id, ch.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/matieres/$subjectId/$chapterId",
						params: {
							subjectId: subject.id,
							chapterId: ch.id
						},
						className: "flex items-center gap-3 px-4 py-3 hover:bg-paper sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold", ok ? "bg-success-soft text-success" : "bg-paper text-ink-muted"),
								children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: ch.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-ink-muted",
									children: ch.subtitle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "muted",
								className: "hidden sm:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mr-1 size-3" }),
									ch.durationMin,
									" min"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-ink-subtle" })
						]
					}) }, ch.id);
				})
			})
		]
	});
}
//#endregion
export { SubjectPage as component };
