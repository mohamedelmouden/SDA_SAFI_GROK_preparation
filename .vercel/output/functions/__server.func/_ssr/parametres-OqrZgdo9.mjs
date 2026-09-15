import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as EXAM, c as useProgress } from "./router-Q6qF9BwN.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
import { t as Input } from "./input-DkRwOHXR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-OqrZgdo9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const name = useProgress((s) => s.name);
	const setName = useProgress((s) => s.setName);
	const reset = useProgress((s) => s.reset);
	const [draft, setDraft] = (0, import_react.useState)(name);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Paramètres"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Prénom affiché"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: "Utilisé sur l’accueil. Reste sur cet appareil."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							placeholder: "Ton prénom",
							maxLength: 32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								setName(draft.trim());
							},
							children: "Enregistrer"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Épreuve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 space-y-1 text-sm text-ink-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							EXAM.title,
							" (",
							EXAM.acronym,
							")"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: EXAM.faculty }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [EXAM.room, " · samedi 19/09/2026 · 10h00"] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-danger/20 bg-danger-soft p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-danger",
						children: "Réinitialiser la progression"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: "Efface chapitres lus, quiz, favoris, sessions ajoutées et temps de travail."
					}),
					confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => {
								reset();
								setConfirm(false);
							},
							children: "Confirmer l’effacement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setConfirm(false),
							children: "Annuler"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						className: "mt-3",
						onClick: () => setConfirm(true),
						children: "Tout effacer"
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
