import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as ClipboardList, a as Timer, x as FileQuestion } from "../_libs/lucide-react.mjs";
import { c as useProgress, g as BLANCS, l as SUBJECTS, u as allExercises } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-C8W0ywBI.js
var import_jsx_runtime = require_jsx_runtime();
function QuizHub() {
	const results = useProgress((s) => s.quizResults);
	const doneEx = useProgress((s) => s.completedExercises);
	const exercises = allExercises();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Quiz & Exercices"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-muted",
				children: "QCM par chapitre, banques par matière, sujets blancs. Les exercices ouverts sont dans chaque leçon."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: BLANCS.map((b) => {
					const r = results[b.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-line bg-surface p-5 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-semibold",
										children: b.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-ink-muted",
										children: b.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-ink-subtle",
										children: [
											b.questions.length,
											" questions · ",
											b.durationMin,
											" min",
											r ? ` · dernier score ${r.correct}/${r.total}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/quiz/$quizId",
											params: { quizId: b.id },
											children: "Commencer"
										})
									})
								]
							})]
						})
					}, b.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Quiz par matière"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: SUBJECTS.map((s) => {
					const st = SUBJECT_STYLE[s.color];
					const allId = `${s.id}:all`;
					const r = results[allId];
					const n = s.chapters.reduce((a, c) => a + c.quiz.length, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface p-4 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-9 items-center justify-center rounded-md", st.soft, st.text),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: s.short
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-ink-muted",
										children: [
											n,
											" QCM",
											r ? ` · ${r.correct}/${r.total}` : ""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/quiz/$quizId",
										params: { quizId: allId },
										children: "Quiz complet"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: s.chapters.map((ch, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/quiz/$quizId",
								params: { quizId: `${s.id}:${ch.id}` },
								className: "rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-ink-muted hover:bg-accent-soft hover:text-accent",
								children: ["Ch. ", i + 1]
							}, ch.id))
						})]
					}, s.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "Tous les exercices"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: exercises.map(({ subject, chapter, exercise }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/matieres/$subjectId/$chapterId",
					params: {
						subjectId: subject.id,
						chapterId: chapter.id
					},
					hash: "exercices",
					className: "flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-3 hover:border-accent/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestion, { className: cn("size-4", SUBJECT_STYLE[subject.color].text) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: exercise.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-ink-muted",
								children: [
									subject.short,
									" · ",
									chapter.title.replace(/^Chapitre \d+ — /, "")
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: exercise.difficulty === "facile" ? "success" : exercise.difficulty === "moyen" ? "warn" : "danger",
							children: exercise.difficulty
						}),
						doneEx.includes(exercise.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: "fait"
						}) : null
					]
				}) }, exercise.id))
			})] })
		]
	});
}
//#endregion
export { QuizHub as component };
