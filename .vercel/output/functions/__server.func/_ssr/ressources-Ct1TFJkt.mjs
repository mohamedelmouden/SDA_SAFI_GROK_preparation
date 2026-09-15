import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as ExternalLink, a as Timer, b as FileText, m as Link2, y as FolderOpen } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ressources-Ct1TFJkt.js
var import_jsx_runtime = require_jsx_runtime();
var RESOURCES = [
	{
		id: "f-algo",
		title: "Fiche express C / algo",
		kind: "fiche",
		subjectId: "algo-c",
		blurb: "15 pièges, squelettes swap / parcours / binaire, méthode QCM 40 s.",
		internalTo: "/matieres/algo-c/fiche",
		countLabel: "1 fiche"
	},
	{
		id: "f-bdd",
		title: "Fiche SQL + 3NF",
		kind: "fiche",
		subjectId: "bdd",
		blurb: "8 patrons SQL, WHERE vs HAVING, anti-jointure, division, normalisation.",
		internalTo: "/matieres/bdd/fiche",
		countLabel: "1 fiche"
	},
	{
		id: "f-stats",
		title: "Formulaire de statistique",
		kind: "fiche",
		subjectId: "stats",
		blurb: "Descriptif, Bayes, lois, IC, z-test, R². Quantiles 1,64 / 1,96 / 2,58.",
		internalTo: "/matieres/stats/fiche",
		countLabel: "1 fiche"
	},
	{
		id: "f-archi",
		title: "Fiche Archi / SE",
		kind: "fiche",
		subjectId: "archi",
		blurb: "Complément à 2, AMAT, Gantt, TLB vs page fault, Coffman.",
		internalTo: "/matieres/archi/fiche",
		countLabel: "1 fiche"
	},
	{
		id: "an1",
		title: "Sujet blanc 1 — 3 heures",
		kind: "annale",
		blurb: "Quatre parties calquées sur l’écrit SDA. QCM + exercices, corrigé détaillé.",
		internalTo: "/quiz/blanc-1",
		countLabel: "24 questions"
	},
	{
		id: "an2",
		title: "Sujet blanc 2 — mix rapide",
		kind: "annale",
		blurb: "Entraînement 45 min, une salve par matière pour le vendredi soir.",
		internalTo: "/quiz/blanc-2",
		countLabel: "16 questions"
	},
	{
		id: "l-c",
		title: "Référence C (cppreference)",
		kind: "lien",
		subjectId: "algo-c",
		blurb: "stdio, stdlib, string.h — à consulter si un détail de fonction manque.",
		href: "https://en.cppreference.com/w/c",
		countLabel: "Référence"
	},
	{
		id: "l-sql",
		title: "PostgreSQL — tutorial SQL",
		kind: "lien",
		subjectId: "bdd",
		blurb: "SELECT, JOIN, agrégats. Le dialecte du concours est du SQL standard.",
		href: "https://www.postgresql.org/docs/current/tutorial-sql.html",
		countLabel: "Doc"
	},
	{
		id: "div-exam",
		title: "Consignes du jour J",
		kind: "divers",
		blurb: "Samedi 19/09/2026, 10h00, Amphi 5, FSA Safi. Pièce d’identité, arrivée anticipée.",
		internalTo: "/planning",
		countLabel: "Rappel"
	}
];
var ICONS = {
	fiche: FileText,
	annale: Timer,
	lien: Link2,
	video: FolderOpen,
	divers: FolderOpen
};
function RessourcesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Ressources"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-muted",
				children: "Fiches du jour J, sujets blancs, et quelques références externes. Tout le cours reste dans l’onglet Matières."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: RESOURCES.map((r) => {
					const Icon = ICONS[r.kind];
					const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: r.title
							}), r.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-ink-subtle" }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-muted",
							children: r.blurb
						}),
						r.countLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							className: "mt-3",
							children: r.countLabel
						}) : null
					] });
					const cls = "block rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-accent/30";
					if (r.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: r.href,
						target: "_blank",
						rel: "noreferrer",
						className: cls,
						children: inner
					}, r.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: r.internalTo ?? "/",
						className: cls,
						children: inner
					}, r.id);
				})
			})
		]
	});
}
//#endregion
export { RessourcesPage as component };
