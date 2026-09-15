import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as BookOpen, P as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as useProgress, l as SUBJECTS, s as isChapterDone } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matieres-BPCgpEUm.js
var import_jsx_runtime = require_jsx_runtime();
function MatieresPage() {
	const completed = useProgress((s) => s.completedChapters);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-ink-subtle",
				children: "Programme"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold tracking-tight",
				children: "Matières"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-muted",
				children: "Les quatre axes du concours, classés et découpés en chapitres de révision."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: SUBJECTS.map((s) => {
					const st = SUBJECT_STYLE[s.color];
					const d = s.chapters.filter((c) => isChapterDone(completed, s.id, c.id)).length;
					const p = Math.round(d / s.chapters.length * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/matieres/$subjectId",
						params: { subjectId: s.id },
						className: "flex items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-accent/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-12 shrink-0 items-center justify-center rounded-lg", st.soft, st.text),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-semibold",
											children: s.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											tone: s.color,
											children: [s.chapters.length, " chapitres"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-sm text-ink-muted",
										children: s.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-1.5 max-w-xs overflow-hidden rounded-full bg-paper",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full", st.bar),
											style: { width: `${p}%` }
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden text-right sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("font-mono text-lg font-semibold tabular-nums", st.text),
									children: [p, "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-auto mt-1 size-4 text-ink-subtle" })]
							})
						]
					}) }, s.id);
				})
			})
		]
	});
}
//#endregion
export { MatieresPage as component };
