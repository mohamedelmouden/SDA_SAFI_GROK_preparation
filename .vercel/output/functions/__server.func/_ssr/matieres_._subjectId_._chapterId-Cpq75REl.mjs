import { i as __toESM } from "../_runtime.mjs";
import { n as cn, r as formatDuration, t as chapterKey } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ChevronRight, O as ChevronLeft, k as Check, s as Star, w as Clock } from "../_libs/lucide-react.mjs";
import { c as useProgress, d as getChapter, m as neighbors, n as Route, s as isChapterDone } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
import { n as QuizPlayer, t as LessonBlocks } from "./quiz-player-B3WV0tNq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matieres_._subjectId_._chapterId-Cpq75REl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChapterPage() {
	const { subjectId, chapterId } = Route.useParams();
	const found = getChapter(subjectId, chapterId);
	const completed = useProgress((s) => s.completedChapters);
	const toggleChapter = useProgress((s) => s.toggleChapter);
	const setLastLesson = useProgress((s) => s.setLastLesson);
	const addStudy = useProgress((s) => s.addStudy);
	const favorites = useProgress((s) => s.favorites);
	const toggleFavorite = useProgress((s) => s.toggleFavorite);
	const doneEx = useProgress((s) => s.completedExercises);
	const toggleExercise = useProgress((s) => s.toggleExercise);
	const [tab, setTab] = (0, import_react.useState)("cours");
	const [openSol, setOpenSol] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!found) return;
		setLastLesson(found.subject.id, found.chapter.id);
		setTab("cours");
		const id = setInterval(() => addStudy(15), 15e3);
		return () => clearInterval(id);
	}, [
		found?.subject.id,
		found?.chapter.id,
		addStudy,
		setLastLesson
	]);
	if (!found) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-ink-muted",
		children: "Chapitre introuvable."
	});
	const { subject, chapter } = found;
	const { prev, next, index } = neighbors(subject, chapter.id);
	const done = isChapterDone(completed, subject.id, chapter.id);
	const favKey = chapterKey(subject.id, chapter.id);
	const fav = favorites.includes(favKey);
	const st = SUBJECT_STYLE[subject.color];
	const headings = chapter.blocks.filter((b) => b.t === "h2");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 lg:grid-cols-[220px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "hidden lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/matieres/$subjectId",
						params: { subjectId: subject.id },
						className: "text-xs font-medium text-ink-subtle hover:text-ink",
						children: ["← ", subject.short]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle",
						children: "Dans ce chapitre"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1",
						children: headings.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: h.id ? `#${h.id}` : void 0,
							className: "block rounded-sm px-2 py-1 text-xs text-ink-muted hover:bg-surface hover:text-ink",
							children: h.text.replace(/^Chapitre \d+ — /, "")
						}) }, h.id ?? h.text))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-1",
						children: subject.chapters.map((c, i) => {
							const ok = isChapterDone(completed, subject.id, c.id);
							const current = c.id === chapter.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matieres/$subjectId/$chapterId",
								params: {
									subjectId: subject.id,
									chapterId: c.id
								},
								className: cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-xs", current ? "bg-accent-soft font-semibold text-accent" : "text-ink-muted hover:bg-surface"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", ok ? "bg-stats" : current ? "bg-accent" : "bg-line-strong") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										i + 1,
										". ",
										c.title.replace(/^Chapitre \d+ — /, "")
									]
								})]
							}, c.id);
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-xs font-semibold uppercase tracking-wider", st.text),
						children: [
							subject.short,
							" · ",
							index + 1,
							"/",
							subject.chapters.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-ink-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), formatDuration(chapter.durationMin)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
					children: chapter.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink-muted",
					children: chapter.subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [[
						"cours",
						"exercices",
						"quiz"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(t),
						className: cn("h-9 rounded-full px-4 text-sm font-semibold capitalize", tab === t ? "bg-sidebar text-sidebar-fg" : "bg-surface text-ink-muted ring-1 ring-line"),
						children: [
							t,
							t === "exercices" ? ` (${chapter.exercises.length})` : "",
							t === "quiz" ? ` (${chapter.quiz.length})` : ""
						]
					}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleFavorite(favKey),
						className: cn("ml-auto flex size-9 items-center justify-center rounded-full ring-1 ring-line", fav ? "bg-warn-soft text-warn" : "bg-surface text-ink-muted"),
						"aria-label": "Favori",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", fav && "fill-current") })
					})]
				}),
				tab === "cours" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-6 rounded-xl border border-line bg-surface px-4 py-6 shadow-card sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mb-6 flex flex-wrap gap-2",
							children: chapter.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: subject.color,
								children: o
							}, o))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBlocks, { blocks: chapter.blocks }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: done ? "secondary" : "default",
								onClick: () => toggleChapter(subject.id, chapter.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), done ? "Marqué lu — annuler" : "Marquer comme terminé"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/matieres/$subjectId/$chapterId",
										params: {
											subjectId: subject.id,
											chapterId: prev.id
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Précédent"]
									})
								}) : null, next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/matieres/$subjectId/$chapterId",
										params: {
											subjectId: subject.id,
											chapterId: next.id
										},
										children: ["Suivant", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/quiz/$quizId",
										params: { quizId: `${subject.id}:all` },
										children: "Quiz de la matière"
									})
								})]
							})]
						})
					]
				}) : null,
				tab === "exercices" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "exercices",
					className: "mt-6 space-y-4",
					children: chapter.exercises.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-muted",
						children: "Pas d’exercice isolé — passe au quiz."
					}) : chapter.exercises.map((ex) => {
						const ok = doneEx.includes(ex.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl border border-line bg-surface p-5 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold",
											children: ex.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: ex.difficulty === "facile" ? "success" : ex.difficulty === "moyen" ? "warn" : "danger",
											children: ex.difficulty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-ink-subtle",
											children: [ex.durationMin, " min"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 whitespace-pre-wrap font-serif text-[16px] leading-relaxed",
									children: ex.prompt
								}),
								ex.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-ink-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Indice : "
									}), ex.hint]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setOpenSol((s) => ({
											...s,
											[ex.id]: !s[ex.id]
										})),
										children: openSol[ex.id] ? "Masquer la solution" : "Voir la solution"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: ok ? "secondary" : "default",
										size: "sm",
										onClick: () => toggleExercise(ex.id),
										children: ok ? "Fait" : "Marquer comme fait"
									})]
								}),
								openSol[ex.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "mt-4 overflow-x-auto rounded-md bg-code p-4 font-mono text-[13px] leading-relaxed text-code-fg whitespace-pre-wrap",
									children: ex.solution
								}) : null
							]
						}, ex.id);
					})
				}) : null,
				tab === "quiz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, {
						quizId: `${subject.id}:${chapter.id}`,
						title: `Quiz — ${chapter.title}`,
						questions: chapter.quiz
					})
				}) : null
			]
		})]
	});
}
//#endregion
export { ChapterPage as component };
