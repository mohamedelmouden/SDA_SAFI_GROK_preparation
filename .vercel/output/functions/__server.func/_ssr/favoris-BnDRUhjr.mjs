import { t as chapterKey } from "./utils-Hb0Pzv9p.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Star } from "../_libs/lucide-react.mjs";
import { c as useProgress, l as SUBJECTS } from "./router-Q6qF9BwN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoris-BnDRUhjr.js
var import_jsx_runtime = require_jsx_runtime();
function FavorisPage() {
	const favorites = useProgress((s) => s.favorites);
	const items = SUBJECTS.flatMap((s) => s.chapters.filter((c) => favorites.includes(chapterKey(s.id, c.id))).map((c) => ({
		s,
		c
	})));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Favoris"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-muted",
				children: "Les chapitres que tu épingles depuis le cours."
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-ink-muted",
				children: "Aucun favori pour l’instant. Ouvre un chapitre et appuie sur l’étoile."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-2",
				children: items.map(({ s, c }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/matieres/$subjectId/$chapterId",
					params: {
						subjectId: s.id,
						chapterId: c.id
					},
					className: "flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 hover:border-accent/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current text-warn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ink-muted",
						children: s.short
					})] })]
				}) }, s.id + c.id))
			})
		]
	});
}
//#endregion
export { FavorisPage as component };
