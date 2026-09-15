import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as BookOpen, P as ArrowRight, j as CalendarDays, o as Target } from "../_libs/lucide-react.mjs";
import { a as EXAM, c as useProgress, h as totals, l as SUBJECTS, o as remainingToExam, s as isChapterDone } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as ProgressRing } from "./progress-ring-DSULivZP.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CIP_DkJE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Countdown({ compact = false }) {
	const [now, setNow] = (0, import_react.useState)(() => remainingToExam());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(remainingToExam()), 1e3);
		return () => clearInterval(id);
	}, []);
	if (now.past) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm font-medium",
		children: "L’épreuve a commencé. Bon courage."
	});
	const cell = (v, l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
			children: v
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-medium uppercase tracking-wider text-ink-subtle",
			children: l
		})]
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tabular-nums",
		children: [
			now.days,
			" j ",
			now.hours,
			" h ",
			now.minutes,
			" min"
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end gap-3",
		children: [
			cell(now.days, "jours"),
			cell(now.hours, "heures"),
			cell(now.minutes, "min"),
			cell(now.seconds, "s")
		]
	});
}
function Home() {
	const name = useProgress((s) => s.name);
	const completed = useProgress((s) => s.completedChapters);
	const last = useProgress((s) => s.lastLesson);
	const t = totals();
	const doneCh = completed.length;
	const pct = t.chapters ? Math.round(doneCh / t.chapters * 100) : 0;
	const continueHref = last ? `/matieres/${last.subjectId}/${last.chapterId}` : "/matieres/algo-c/bases";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-2xl bg-sidebar text-sidebar-fg shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.18em] text-sidebar-muted",
								children: [
									"Concours ",
									EXAM.acronym,
									" · ",
									EXAM.year
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl",
								children: [
									"Bonjour",
									name ? ` ${name}` : "",
									" !"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-sm leading-relaxed text-sidebar-muted sm:text-[15px]",
								children: "Prêt à réussir ta candidature au Master SDA ? Quatre axes, un samedi matin. Organise ton temps, révise les pièges, et entraîne-toi comme à l’écrit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: continueHref,
										children: [last ? "Reprendre la révision" : "Commencer la révision", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/planning",
										children: "Voir le crash plan"
									})
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6 rounded-xl bg-white/5 px-6 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
							value: pct,
							size: 112,
							stroke: 9,
							trackClass: "text-white/10",
							barClass: "text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-2xl font-semibold tabular-nums",
									children: [pct, "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-wider text-sidebar-muted",
									children: "Global"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									doneCh,
									" / ",
									t.chapters,
									" chapitres"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sidebar-muted",
								children: [
									t.exercises,
									" exercices · ",
									t.questions,
									" QCM"
								]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-tight",
					children: "Mes matières"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/matieres",
					className: "text-sm font-medium text-accent hover:underline",
					children: "Tout voir"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: SUBJECTS.map((s) => {
					const st = SUBJECT_STYLE[s.color];
					const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
					const p = Math.round(d / s.chapters.length * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/matieres/$subjectId",
						params: { subjectId: s.id },
						className: "group rounded-xl border border-line bg-surface p-4 shadow-card transition-transform hover:-translate-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex size-10 items-center justify-center rounded-md", st.soft, st.text),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-sm font-semibold leading-snug",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-ink-muted",
								children: [s.chapters.length, " chapitres"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 overflow-hidden rounded-full bg-paper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full", st.bar),
									style: { width: `${p}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("mt-2 text-xs font-semibold tabular-nums", st.text),
								children: [p, " %"]
							})
						]
					}, s.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Objectif cette semaine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-muted",
							children: "Terminer les 4 fiches express + 1 sujet blanc. Viser 70 % au quiz complet de chaque matière."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							size: "sm",
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/quiz",
								children: "Ouvrir les quiz"
							})
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-md bg-archi-soft text-archi",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Il reste"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-ink-muted",
								children: [
									EXAM.facultyShort,
									" · ",
									EXAM.room,
									" · samedi 19/09/2026, 10h00"
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-ink-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Rappel" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2",
						children: "Les candidats doivent se présenter avec une pièce d’identité."
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
