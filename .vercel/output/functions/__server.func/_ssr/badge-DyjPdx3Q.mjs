import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DyjPdx3Q.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide", {
			muted: "bg-paper text-ink-muted border-line",
			accent: "bg-accent-soft text-accent border-transparent",
			algo: "bg-algo-soft text-algo border-transparent",
			bdd: "bg-bdd-soft text-bdd border-transparent",
			stats: "bg-stats-soft text-stats border-transparent",
			archi: "bg-archi-soft text-archi border-transparent",
			success: "bg-success-soft text-success border-transparent",
			danger: "bg-danger-soft text-danger border-transparent",
			warn: "bg-warn-soft text-warn border-transparent"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
