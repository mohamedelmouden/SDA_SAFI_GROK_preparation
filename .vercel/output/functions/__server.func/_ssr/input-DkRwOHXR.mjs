import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DkRwOHXR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-ring", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };
