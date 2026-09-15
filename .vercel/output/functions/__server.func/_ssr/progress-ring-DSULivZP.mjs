import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-ring-DSULivZP.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressRing({ value, size = 120, stroke = 10, className, trackClass = "text-line", barClass = "text-accent", children }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const offset = c - Math.max(0, Math.min(100, value)) / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative inline-flex items-center justify-center", className),
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: stroke,
				className: trackClass
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: offset,
				className: cn(barClass, "transition-[stroke-dashoffset] duration-500")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children
		})]
	});
}
//#endregion
export { ProgressRing as t };
