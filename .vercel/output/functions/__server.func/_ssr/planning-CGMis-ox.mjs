import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Plus, i as Trash2, j as CalendarDays } from "../_libs/lucide-react.mjs";
import { a as EXAM, c as useProgress, p as getSubject } from "./router-Q6qF9BwN.mjs";
import { t as Badge } from "./badge-DyjPdx3Q.mjs";
import { t as SUBJECT_STYLE } from "./subject-style-Db7SZY50.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
import { t as Input } from "./input-DkRwOHXR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planning-CGMis-ox.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Crash plan — exam Saturday 19 Sept 2026 10:00. */
var CRASH_PLAN = [
	{
		id: "p1",
		date: "2026-09-15",
		start: "09:00",
		end: "12:00",
		subjectId: "algo-c",
		title: "C : bases → pointeurs",
		note: "Chapitres 1 à 5. Tracer 5 QCM à la main."
	},
	{
		id: "p2",
		date: "2026-09-15",
		start: "14:00",
		end: "16:30",
		subjectId: "algo-c",
		title: "C : tris, listes, fiche",
		note: "Écrire swap, palindrome, insertion, binaire sans compilateur."
	},
	{
		id: "p3",
		date: "2026-09-15",
		start: "17:00",
		end: "19:00",
		subjectId: "bdd",
		title: "Relationnel + algèbre",
		note: "Traduire 4 phrases en σ, π, ⋈."
	},
	{
		id: "p4",
		date: "2026-09-16",
		start: "09:00",
		end: "12:00",
		subjectId: "bdd",
		title: "SQL jointures & agrégats",
		note: "WHERE vs HAVING. Anti-jointure. Double NOT EXISTS."
	},
	{
		id: "p5",
		date: "2026-09-16",
		start: "14:00",
		end: "16:00",
		subjectId: "bdd",
		title: "Normalisation 3NF",
		note: "2 schémas complets avec DF, clé, décomposition."
	},
	{
		id: "p6",
		date: "2026-09-16",
		start: "16:30",
		end: "19:00",
		subjectId: "stats",
		title: "Descriptif + probas + Bayes",
		note: "Formules s² et Bayes jusqu’à les écrire de mémoire."
	},
	{
		id: "p7",
		date: "2026-09-17",
		start: "09:00",
		end: "12:00",
		subjectId: "stats",
		title: "Lois, IC, tests, régression",
		note: "z=1,96. Un test complet en 6 lignes. Droite MC."
	},
	{
		id: "p8",
		date: "2026-09-17",
		start: "14:00",
		end: "17:30",
		subjectId: "archi",
		title: "Binaire, CPU, cache, AMAT",
		note: "10 conversions + 2 AMAT + cycle FDE."
	},
	{
		id: "p9",
		date: "2026-09-17",
		start: "18:00",
		end: "20:00",
		subjectId: "archi",
		title: "Processus & ordonnancement",
		note: "Un Gantt FCFS, un SJF, un RR."
	},
	{
		id: "p10",
		date: "2026-09-18",
		start: "09:00",
		end: "11:30",
		subjectId: "archi",
		title: "Pagination, synchro, fiche",
		note: "TLB vs page fault. Coffman. FIFO/LRU."
	},
	{
		id: "p11",
		date: "2026-09-18",
		start: "13:30",
		end: "16:30",
		subjectId: "mix",
		title: "Sujet blanc 1 (3 h)",
		note: "Conditions d’examen. Corriger ensuite avec les solutions."
	},
	{
		id: "p12",
		date: "2026-09-18",
		start: "17:00",
		end: "19:30",
		subjectId: "mix",
		title: "Fiches des 4 matières",
		note: "Chapitres 8 uniquement. Pièges, pas de nouveau cours."
	},
	{
		id: "p13",
		date: "2026-09-19",
		start: "07:30",
		end: "09:00",
		subjectId: "mix",
		title: "Relecture légère",
		note: "Formules stats + patrons SQL + swap C. Petit déjeuner."
	},
	{
		id: "p14",
		date: "2026-09-19",
		start: "10:00",
		end: "13:00",
		subjectId: "exam",
		title: "Épreuve — Amphi 5",
		note: "FSA Safi. Pièce d’identité. Arrive 30 min tôt."
	}
];
var DAYS = [
	"2026-09-15",
	"2026-09-16",
	"2026-09-17",
	"2026-09-18",
	"2026-09-19"
];
var LABELS = {
	"2026-09-15": "Mar 15",
	"2026-09-16": "Mer 16",
	"2026-09-17": "Jeu 17",
	"2026-09-18": "Ven 18",
	"2026-09-19": "Sam 19 · examen"
};
function colorFor(id) {
	if (id === "exam") return "bg-danger-soft text-danger border-danger/20";
	if (id === "mix") return "bg-accent-soft text-accent border-accent/20";
	const s = getSubject(id);
	if (!s) return "bg-paper text-ink-muted border-line";
	const st = SUBJECT_STYLE[s.color];
	return `${st.soft} ${st.text} ${st.border}`;
}
function PlanningPage() {
	const sessions = useProgress((s) => s.sessions);
	const addSession = useProgress((s) => s.addSession);
	const removeSession = useProgress((s) => s.removeSession);
	const [date, setDate] = (0, import_react.useState)("2026-09-15");
	const [start, setStart] = (0, import_react.useState)("09:00");
	const [end, setEnd] = (0, import_react.useState)("11:00");
	const [subjectId, setSubjectId] = (0, import_react.useState)("algo-c");
	const [title, setTitle] = (0, import_react.useState)("");
	const all = (0, import_react.useMemo)(() => {
		const extra = sessions.map((s) => ({
			id: s.id,
			date: s.date,
			start: s.start,
			end: s.end,
			subjectId: s.subjectId,
			title: s.title,
			custom: true
		}));
		return [...CRASH_PLAN.map((p) => ({
			...p,
			custom: false
		})), ...extra];
	}, [sessions]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-ink-subtle",
						children: "4 jours restants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight",
						children: "Planning de révision"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-sm text-ink-muted",
						children: [
							"Crash plan jusqu’au ",
							EXAM.room,
							", samedi 19 à 10h. Tu peux ajouter tes propres créneaux — ils restent sur cet appareil."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warn",
					children: "Samedi 10h00 · Amphi 5"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 lg:grid-cols-5",
				children: DAYS.map((d) => {
					const items = all.filter((x) => x.date === d).sort((a, b) => a.start.localeCompare(b.start));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-ink",
							children: LABELS[d]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2",
							children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: cn("rounded-md border px-2.5 py-2 text-xs", colorFor(it.subjectId)),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono tabular-nums opacity-80",
										children: [
											it.start,
											"–",
											it.end
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 font-semibold leading-snug",
										children: it.title
									}),
									"note" in it && it.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 opacity-80",
										children: it.note
									}) : null,
									it.custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "mt-1 inline-flex items-center gap-1 opacity-70 hover:opacity-100",
										onClick: () => removeSession(it.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), "Retirer"]
									}) : null
								]
							}, it.id))
						})]
					}, d);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 rounded-xl border border-line bg-surface p-5 shadow-card",
				onSubmit: (e) => {
					e.preventDefault();
					if (!title.trim()) return;
					addSession({
						date,
						start,
						end,
						subjectId,
						title: title.trim()
					});
					setTitle("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter une session"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-ink-muted",
								children: ["Jour", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: date,
									onChange: (e) => setDate(e.target.value),
									className: "mt-1 flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink",
									children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d,
										children: LABELS[d]
									}, d))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-ink-muted",
								children: ["Matière", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: subjectId,
									onChange: (e) => setSubjectId(e.target.value),
									className: "mt-1 flex h-10 w-full rounded-md border border-line bg-surface px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "algo-c",
											children: "Algo / C"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bdd",
											children: "Bases de données"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "stats",
											children: "Statistique"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "archi",
											children: "Archi / SE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "mix",
											children: "Mix / fiches"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-ink-muted",
								children: ["Début", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "time",
									value: start,
									onChange: (e) => setStart(e.target.value),
									className: "mt-1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-ink-muted",
								children: ["Fin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "time",
									value: end,
									onChange: (e) => setEnd(e.target.value),
									className: "mt-1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-ink-muted sm:col-span-2 lg:col-span-1",
								children: ["Titre", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: title,
									onChange: (e) => setTitle(e.target.value),
									placeholder: "Révision…",
									className: "mt-1"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), "Ajouter"]
					})
				]
			})
		]
	});
}
//#endregion
export { PlanningPage as component };
