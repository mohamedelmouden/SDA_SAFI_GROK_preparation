import { i as __toESM } from "../_runtime.mjs";
import { n as cn, t as chapterKey } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ChartColumn, M as BookOpen, N as Bell, T as ClipboardList, _ as House, c as Settings, f as Menu, j as CalendarDays, l as Search, r as TriangleAlert, s as Star, t as X, v as GraduationCap, x as FileQuestion, y as FolderOpen } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Q6qF9BwN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "Accueil",
		icon: House
	},
	{
		to: "/matieres",
		label: "Matières",
		icon: BookOpen
	},
	{
		to: "/planning",
		label: "Planning",
		icon: CalendarDays
	},
	{
		to: "/quiz",
		label: "Quiz & Exercices",
		icon: ClipboardList
	},
	{
		to: "/ressources",
		label: "Ressources",
		icon: FolderOpen
	},
	{
		to: "/statistiques",
		label: "Statistiques",
		icon: ChartColumn
	},
	{
		to: "/favoris",
		label: "Favoris",
		icon: Star
	},
	{
		to: "/parametres",
		label: "Paramètres",
		icon: Settings
	}
];
function Sidebar({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-sidebar text-sidebar-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-md bg-sidebar-active text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-semibold tracking-tight",
						children: "Master SDA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-sidebar-muted",
						children: "AU 2026-2027"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-0.5 px-3",
				children: NAV.map((item) => {
					const Icon = item.icon;
					const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-sidebar-active text-white" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mountain-fade relative mx-3 mb-4 overflow-hidden rounded-lg px-4 pb-5 pt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-[12px] leading-relaxed text-sidebar-fg/85",
					children: "« Ce n’est pas la montagne à conquérir, mais toi à révéler. »"
				})
			})
		]
	});
}
var algoC = {
	id: "algo-c",
	short: "Algo / C",
	title: "Algorithmique / Programmation (langage C)",
	color: "algo",
	description: "Maîtriser les concepts fondamentaux de la programmation en langage C et les structures de données essentielles, au niveau d’un concours de master.",
	examFocus: "Le jury teste la lecture de code, les pointeurs, les tableaux, la récursivité et la complexité. On écrit peu de prose : on trace, on corrige, on implémente.",
	learn: [
		"Les bases du langage C (types, I/O, opérateurs)",
		"Les structures de contrôle",
		"Les tableaux et chaînes de caractères",
		"Les fonctions et la récursivité",
		"Les pointeurs et la gestion de la mémoire",
		"Les structures, fichiers et listes",
		"Tris, recherches et complexité"
	],
	tips: [
		"Commence par comprendre la logique avant de mémoriser.",
		"Trace à la main : tableau d’état (variables × itérations).",
		"Entraîne-toi à coder sans compilateur — le concours est sur papier.",
		"Apprends les erreurs courantes du compilateur (très utiles au QCM).",
		"Pour un algorithme : invariant + complexité, pas seulement le code.",
		"scanf : n’oublie jamais le & sauf pour une chaîne."
	],
	chapters: [
		{
			id: "bases",
			title: "Chapitre 1 — Bases du langage C",
			subtitle: "Types, opérateurs, I/O, compilation",
			durationMin: 35,
			objectives: [
				"Connaître le pipeline de compilation",
				"Maîtriser types, formats printf/scanf et priorités",
				"Éviter les pièges d’overflow et de conversion"
			],
			blocks: [
				{
					t: "callout",
					kind: "exam",
					title: "Ce que le concours demande",
					body: "On ne te demande pas d’être un ingénieur système. On te demande de **lire** un programme de 15 lignes, de dire ce qu’il affiche, et d’écrire une fonction correcte (swap, max, palindrome, factorielle)."
				},
				{
					t: "h2",
					text: "De la source à l’exécutable",
					id: "compile"
				},
				{
					t: "p",
					text: "Un fichier `.c` traverse **quatre étapes** : préprocesseur (`#include`, `#define`) → compilation vers assembleur → assemblage vers fichier objet `.o` → **édition de liens** (libc : `printf`, `malloc`…)."
				},
				{
					t: "code",
					lang: "bash",
					title: "Commandes à connaître",
					code: "gcc -Wall -Wextra -std=c11 prog.c -o prog\n./prog"
				},
				{
					t: "h2",
					text: "Types fondamentaux",
					id: "types"
				},
				{
					t: "table",
					caption: "Tailles typiques (architecture 64 bits)",
					cols: [
						"Type",
						"Taille",
						"Ordre de grandeur",
						"Format"
					],
					rows: [
						[
							"char",
							"1 octet",
							"−128…127 (signé)",
							"%c / %d"
						],
						[
							"int",
							"4 octets",
							"≈ ±2×10⁹",
							"%d"
						],
						[
							"long",
							"8 octets (LP64)",
							"≈ ±9×10¹⁸",
							"%ld"
						],
						[
							"float",
							"4 octets",
							"~7 chiffres",
							"%f"
						],
						[
							"double",
							"8 octets",
							"~16 chiffres",
							"%lf (scanf)"
						],
						[
							"unsigned int",
							"4 octets",
							"0…≈4×10⁹",
							"%u"
						]
					]
				},
				{
					t: "callout",
					kind: "warning",
					title: "Piège classique",
					body: "`sizeof` renvoie un `size_t` (non signé). L’expression `sizeof(int)` vaut **4**, pas 4×8 bits à afficher. Pour afficher : `printf(\"%zu\", sizeof(x));`. Comparer `sizeof` à un `int` négatif est un piège de QCM."
				},
				{
					t: "h2",
					text: "Entrées / sorties",
					id: "io"
				},
				{
					t: "code",
					lang: "c",
					title: "Squelette minimal — à connaître par cœur",
					code: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    printf(\"n = \");\n    if (scanf(\"%d\", &n) != 1) return 1;\n    printf(\"n au carré = %d\\n\", n * n);\n    return 0;\n}"
				},
				{
					t: "ul",
					items: [
						"`scanf(\"%d\", &n)` : le **&** est obligatoire (on passe l’adresse).",
						"`scanf(\"%s\", buf)` : **pas de &** — un tableau décroît en pointeur.",
						"`scanf` retourne le nombre de champs lus. Tester `!= 1` est propre.",
						"`\\n` dans le format de `printf` : sans lui, le buffer peut ne pas s’afficher."
					]
				},
				{
					t: "h2",
					text: "Opérateurs et priorités",
					id: "ops"
				},
				{
					t: "p",
					text: "À retenir dans l’ordre (du plus fort au plus faible) : `() [] -> .`  →  `! ~ ++ -- * &` (unaires)  →  `* / %`  →  `+ -`  →  `<< >>`  →  `< >`  →  `== !=`  →  `& ^ |`  →  `&& ||`  →  `?:`  →  `=` ."
				},
				{
					t: "example",
					title: "Que vaut i après ces lignes ?",
					blocks: [{
						t: "code",
						lang: "c",
						code: "int i = 5;\nint a = i++;   /* a = 5, puis i = 6 */\nint b = ++i;   /* i = 7, puis b = 7 */"
					}, {
						t: "p",
						text: "**Post-incrément `i++`** : on utilise la valeur **puis** on incrémente. **Pré-incrément `++i`** : on incrémente **puis** on utilise. Au concours, trace **toujours** une colonne `i`."
					}]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce vitesse",
					body: "Division entière : `7/2 = 3` (pas 3.5). Reste : `7%2 = 1`. Un entier est pair ssi `n % 2 == 0`. Pour les puissances de 2 : `n & (n-1)` vaut 0 (bit trick, parfois en QCM)."
				},
				{
					t: "formula",
					name: "Conversion / overflow",
					tex: "\\text{si } n > 2^{31}-1 \\text{ alors un } \\mathtt{int} \\text{ déborde (UB en C signé)}",
					note: "En QCM, on te demande souvent le résultat de 2000000000 + 2000000000."
				}
			],
			quiz: [
				{
					id: "a1q1",
					question: "Que faut-il écrire pour lire un entier n au clavier ?",
					options: [
						"scanf(\"%d\", n);",
						"scanf(\"%d\", &n);",
						"printf(\"%d\", &n);",
						"scanf(\"%d\", *n);"
					],
					answer: 1,
					explain: "scanf a besoin de l’adresse de n pour y écrire. D’où le &."
				},
				{
					id: "a1q2",
					question: "Que vaut 7 / 2 en C si 7 et 2 sont des int ?",
					options: [
						"3.5",
						"4",
						"3",
						"2"
					],
					answer: 2,
					explain: "Division entière : la partie fractionnaire est tronquée vers 0."
				},
				{
					id: "a1q3",
					question: "int i = 3; int x = i++;  Quelle est la valeur de x ?",
					options: [
						"3",
						"4",
						"2",
						"indéfinie"
					],
					answer: 0,
					explain: "Post-incrément : x reçoit 3, ensuite i devient 4."
				},
				{
					id: "a1q4",
					question: "Pourquoi scanf(\"%s\", buf) n’a-t-il pas de & ?",
					options: [
						"Parce que %s est spécial",
						"Parce qu’un tableau se convertit en pointeur (adresse du 1er élément)",
						"Parce que scanf ne lit pas les chaînes",
						"Il faut quand même écrire &buf"
					],
					answer: 1,
					explain: "buf ≡ &buf[0]. Passer &buf serait un pointeur sur tableau (type différent)."
				}
			],
			exercises: [{
				id: "a1e1",
				title: "Signe d’un entier",
				difficulty: "facile",
				durationMin: 8,
				prompt: "Écrire un programme qui lit un entier et affiche POSITIF, NEGATIF ou NUL. Utiliser if / else if / else.",
				hint: "Zéro n’est ni positif ni négatif — traiter ce cas en premier ou avec else if.",
				solution: "#include <stdio.h>\nint main(void) {\n  int n; scanf(\"%d\", &n);\n  if (n > 0) printf(\"POSITIF\\n\");\n  else if (n < 0) printf(\"NEGATIF\\n\");\n  else printf(\"NUL\\n\");\n  return 0;\n}"
			}]
		},
		{
			id: "controle",
			title: "Chapitre 2 — Structures de contrôle",
			subtitle: "if, switch, boucles, traces",
			durationMin: 40,
			objectives: [
				"Maîtriser if / else if / switch",
				"Choisir for, while ou do-while",
				"Tracer une boucle à la main"
			],
			blocks: [
				{
					t: "h2",
					text: "Les instructions conditionnelles",
					id: "if"
				},
				{
					t: "p",
					text: "En C, une condition est vraie si elle est **non nulle**. `if (n)` est équivalent à `if (n != 0)`. C’est un piège fréquent dans les QCM."
				},
				{
					t: "code",
					lang: "c",
					title: "Forme canonique",
					code: "if (condition) {\n    /* bloc si vraie */\n} else if (autre) {\n    /* autre bloc */\n} else {\n    /* aucune condition vraie */\n}"
				},
				{
					t: "callout",
					kind: "warning",
					title: "Le = qui tue",
					body: "`if (x = 0)` **assigne** 0 à x, puis teste 0 → le bloc n’est jamais exécuté. On voulait `if (x == 0)`. Astuce : écrire `if (0 == x)` (yoda) rend l’erreur de frappe `if (0 = x)` illégale."
				},
				{
					t: "h3",
					text: "switch"
				},
				{
					t: "p",
					text: "`switch (e)` compare un **entier** (ou char) à des `case` constants. Sans `break`, on « tombe » dans le case suivant (**fall-through**). `default` est optionnel mais recommandé."
				},
				{
					t: "h2",
					text: "Boucles",
					id: "loops"
				},
				{
					t: "table",
					cols: [
						"Boucle",
						"Quand l’utiliser",
						"Test"
					],
					rows: [
						[
							"for (i=0; i<n; i++)",
							"On connaît le nombre d’itérations",
							"avant le corps"
						],
						[
							"while (cond)",
							"On s’arrête sur une condition",
							"avant le corps (0 fois possible)"
						],
						[
							"do { } while (cond)",
							"Au moins une exécution (menu, saisie)",
							"après le corps"
						]
					]
				},
				{
					t: "example",
					title: "Trace : que s’affiche-t-il ?",
					blocks: [{
						t: "code",
						lang: "c",
						code: "int s = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    s += i;\n}\nprintf(\"%d\", s);"
					}, {
						t: "p",
						text: "`continue` saute le reste de l’itération. Les i pairs sont ignorés. On additionne 1+3+5 = **9**."
					}]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce papier",
					body: "Dresse un tableau : colonnes `i`, `s`, `condition`. Une ligne par itération. Tu évites 80 % des erreurs de QCM « que affiche ce programme »."
				},
				{
					t: "h2",
					text: "break vs return vs continue",
					id: "jump"
				},
				{
					t: "ul",
					items: [
						"`break` : sort de la boucle (ou du switch) **la plus interne**.",
						"`continue` : passe à l’itération suivante.",
						"`return` : quitte la **fonction** (donc aussi la boucle).",
						"`goto` : existe, à éviter sauf pour sortir de boucles imbriquées — rarement exigé."
					]
				},
				{
					t: "example",
					title: "Premier diviseur — while",
					blocks: [{
						t: "code",
						lang: "c",
						code: "int n = 91, d = 2;\nwhile (d * d <= n && n % d != 0) d++;\nif (n % d == 0 && n != d) printf(\"%d divise %d\", d, n);\nelse printf(\"%d premier\", n);"
					}, {
						t: "p",
						text: "Test de primalité jusqu’à $\\sqrt{n}$. 91 = 7×13, donc on affiche que 7 divise 91. Complexité $O(\\sqrt{n})$."
					}]
				}
			],
			quiz: [
				{
					id: "a2q1",
					question: "Combien de fois le corps de for (int i = 0; i < 5; i++) s’exécute-t-il ?",
					options: [
						"4",
						"5",
						"6",
						"0"
					],
					answer: 1,
					explain: "i = 0,1,2,3,4 → 5 itérations. Le test i < 5 échoue quand i vaut 5."
				},
				{
					id: "a2q2",
					question: "Quelle est la différence principale entre while et do-while ?",
					options: [
						"do-while est plus rapide",
						"do-while exécute le corps au moins une fois",
						"while ne peut pas utiliser break",
						"aucune"
					],
					answer: 1,
					explain: "Le test du do-while est en fin de boucle."
				},
				{
					id: "a2q3",
					question: "if (x = 1) { ... } — que se passe-t-il ?",
					options: [
						"Erreur de compilation obligatoire",
						"Le bloc s’exécute toujours (x devient 1, valeur vraie)",
						"Le bloc ne s’exécute jamais",
						"x est comparé à 1"
					],
					answer: 1,
					explain: "C’est une affectation. x vaut 1, donc la condition est vraie."
				},
				{
					id: "a2q4",
					question: "Dans un switch, que se passe-t-il si on oublie break ?",
					options: [
						"Erreur de compilation",
						"Rien, break est optionnel sans effet",
						"Fall-through : les case suivants s’exécutent aussi",
						"Le programme plante"
					],
					answer: 2,
					explain: "Sans break, l’exécution continue dans les case suivants."
				}
			],
			exercises: [{
				id: "a2e1",
				title: "Table de multiplication",
				difficulty: "facile",
				durationMin: 10,
				prompt: "Lire n et afficher la table de n (n×1 jusqu’à n×10), une ligne par produit.",
				solution: "int n; scanf(\"%d\", &n);\nfor (int i = 1; i <= 10; i++)\n    printf(\"%d x %d = %d\\n\", n, i, n * i);"
			}, {
				id: "a2e2",
				title: "PGCD d’Euclide",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Implémenter le PGCD par l’algorithme d’Euclide : tant que b ≠ 0, (a, b) ← (b, a mod b). Retourner a.",
				hint: "while (b != 0) { int r = a % b; a = b; b = r; }",
				solution: "int pgcd(int a, int b) {\n    while (b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n    return a;\n}"
			}]
		},
		{
			id: "tableaux",
			title: "Chapitre 3 — Tableaux et chaînes",
			subtitle: "Indexation, parcours, string.h",
			durationMin: 40,
			objectives: [
				"Parcourir un tableau sans débordement",
				"Maîtriser les chaînes C (terminateur '\\0')",
				"Utiliser strlen / strcpy / strcmp"
			],
			blocks: [
				{
					t: "h2",
					text: "Tableaux",
					id: "arrays"
				},
				{
					t: "p",
					text: "Un tableau `int t[n]` réserve **n** cases **contiguës**. Les indices vont de **0 à n−1**. `t[n]` est un débordement (undefined behavior) — QCM fréquent."
				},
				{
					t: "code",
					lang: "c",
					title: "Lecture et somme",
					code: "int n, t[100], s = 0;\nscanf(\"%d\", &n);\nfor (int i = 0; i < n; i++) {\n    scanf(\"%d\", &t[i]);\n    s += t[i];\n}\nprintf(\"somme = %d, moyenne = %.2f\\n\", s, (double)s / n);"
				},
				{
					t: "callout",
					kind: "key",
					title: "Cast pour la moyenne",
					body: "`s / n` est une division **entière**. Il faut `(double)s / n` (ou `s / (double)n`). Oublier le cast est une erreur de concours très classique."
				},
				{
					t: "formula",
					name: "Nombre d’éléments d’un tableau statique",
					tex: "N = \\frac{\\mathtt{sizeof}(t)}{\\mathtt{sizeof}(t[0])}",
					note: "Ne marche PAS si t a été passé à une fonction (il décroît en pointeur, sizeof(t) = 8)."
				},
				{
					t: "h2",
					text: "Tableaux à deux dimensions",
					id: "mat"
				},
				{
					t: "p",
					text: "`int a[L][C];` — `a[i][j]` est la ligne i, colonne j. Stockage **row-major** : les colonnes d’une même ligne sont contiguës. Pour parcourir : boucle i (lignes) puis j (colonnes)."
				},
				{
					t: "code",
					lang: "c",
					title: "Trace d’une matrice 2×3",
					code: "int a[2][3] = {{1,2,3},{4,5,6}};\n/* a[1][0] == 4  |  a[0][2] == 3 */"
				},
				{
					t: "h2",
					text: "Chaînes de caractères",
					id: "str"
				},
				{
					t: "p",
					text: "En C, une chaîne est un tableau de `char` **terminé par `'\\0'`** (octet 0). `\"abc\"` occupe **4** octets : `'a','b','c','\\0'`. `strlen` compte **sans** le `'\\0'`."
				},
				{
					t: "table",
					cols: [
						"Fonction",
						"Rôle",
						"Attention"
					],
					rows: [
						[
							"strlen(s)",
							"longueur",
							"ne compte pas '\\0'"
						],
						[
							"strcpy(dst, src)",
							"copie",
							"dst assez grand !"
						],
						[
							"strncpy",
							"copie bornée",
							"peut oublier '\\0'"
						],
						[
							"strcmp(a,b)",
							"ordre lexico",
							"0 = égal, <0 si a<b"
						],
						[
							"strcat(dst, src)",
							"concatène",
							"débordement fréquent"
						],
						[
							"strchr(s,c)",
							"1re occurrence",
							"NULL si absent"
						]
					]
				},
				{
					t: "example",
					title: "Palindrome",
					blocks: [{
						t: "code",
						lang: "c",
						code: "int palindrome(const char *s) {\n    int i = 0, j = (int)strlen(s) - 1;\n    while (i < j) {\n        if (s[i] != s[j]) return 0;\n        i++; j--;\n    }\n    return 1;\n}"
					}, {
						t: "p",
						text: "Deux index qui se croisent. Complexité $O(n)$, mémoire $O(1)$. « kayak » → 1, « sda » → 0."
					}]
				},
				{
					t: "callout",
					kind: "exam",
					title: "QCM : sizeof(\"AB\")",
					body: "`sizeof(\"AB\")` vaut **3** (A, B, `\\0`). `strlen(\"AB\")` vaut **2**. Cette distinction tombe quasiment à chaque session."
				}
			],
			quiz: [
				{
					id: "a3q1",
					question: "Quels sont les indices valides de int t[10] ?",
					options: [
						"1 à 10",
						"0 à 10",
						"0 à 9",
						"0 à 11"
					],
					answer: 2,
					explain: "n cases indexées 0 … n-1."
				},
				{
					id: "a3q2",
					question: "strlen(\"C\") vaut…",
					options: [
						"0",
						"1",
						"2",
						"sizeof(char)"
					],
					answer: 1,
					explain: "Un caractère visible. Le '\\0' n’est pas compté par strlen."
				},
				{
					id: "a3q3",
					question: "strcmp(a,b) == 0 signifie",
					options: [
						"a est plus court que b",
						"les deux chaînes sont égales",
						"a est NULL",
						"erreur"
					],
					answer: 1,
					explain: "0 = égalité lexicographique (contenu identique)."
				},
				{
					id: "a3q4",
					question: "Pourquoi (double)s / n et pas s / n pour une moyenne d’entiers ?",
					options: [
						"Pour arrondir au-dessus",
						"Sinon division entière (troncature)",
						"scanf l’exige",
						"aucune différence"
					],
					answer: 1,
					explain: "int / int → int. Le cast force une division flottante."
				}
			],
			exercises: [{
				id: "a3e1",
				title: "Maximum et son indice",
				difficulty: "facile",
				durationMin: 10,
				prompt: "Lire n puis n entiers. Afficher le maximum et l’indice de sa première occurrence (base 0).",
				solution: "int n, t[100]; scanf(\"%d\", &n);\nfor (int i = 0; i < n; i++) scanf(\"%d\", &t[i]);\nint imax = 0;\nfor (int i = 1; i < n; i++) if (t[i] > t[imax]) imax = i;\nprintf(\"%d %d\\n\", t[imax], imax);"
			}, {
				id: "a3e2",
				title: "Inverser une chaîne sur place",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Écrire void reverse(char *s) qui inverse s in-place, sans tableau auxiliaire.",
				hint: "Échanger s[i] et s[j] en avançant i et en reculant j.",
				solution: "void reverse(char *s) {\n    int i = 0, j = (int)strlen(s) - 1;\n    while (i < j) {\n        char c = s[i]; s[i] = s[j]; s[j] = c;\n        i++; j--;\n    }\n}"
			}]
		},
		{
			id: "fonctions",
			title: "Chapitre 4 — Fonctions et récursivité",
			subtitle: "Passage par valeur, prototypes, pile",
			durationMin: 40,
			objectives: [
				"Déclarer un prototype",
				"Comprendre le passage par valeur",
				"Écrire et tracer une récursion"
			],
			blocks: [
				{
					t: "h2",
					text: "Anatomie d’une fonction",
					id: "fn"
				},
				{
					t: "code",
					lang: "c",
					title: "Prototype + définition",
					code: "int max2(int a, int b);          /* prototype */\n\nint max2(int a, int b) {         /* définition */\n    return (a > b) ? a : b;\n}"
				},
				{
					t: "p",
					text: "Sans prototype, un compilateur C ancien suppose `int f()` — source de bugs. Place les prototypes **avant** `main`, les définitions après (ou tout avant `main`)."
				},
				{
					t: "callout",
					kind: "key",
					title: "Passage par valeur",
					body: "En C, les arguments sont **copiés**. `void incr(int x) { x++; }` ne modifie pas la variable de l’appelant. Pour modifier : passer un **pointeur** `void incr(int *x) { (*x)++; }` et appeler `incr(&n)`."
				},
				{
					t: "h2",
					text: "Récursivité",
					id: "rec"
				},
				{
					t: "p",
					text: "Une fonction récursive a **toujours** : (1) un **cas de base** qui termine, (2) un **appel** sur un problème plus petit. Oublier le cas de base → pile d’appels infinie (stack overflow)."
				},
				{
					t: "formula",
					name: "Factorielle",
					tex: "n! = n \\times (n-1)! \\quad\\text{et}\\quad 0! = 1"
				},
				{
					t: "code",
					lang: "c",
					code: "long fact(int n) {\n    if (n <= 1) return 1;          /* cas de base */\n    return n * fact(n - 1);        /* appel récursif */\n}"
				},
				{
					t: "p",
					text: "Fibonacci naïf `fib(n) = fib(n-1)+fib(n-2)` est $O(\\varphi^n)$ — **exponentiel**. Au concours, on attend que tu le saches et que tu proposes la version itérative $O(n)$."
				},
				{
					t: "example",
					title: "Trace de fact(3)",
					blocks: [{
						t: "p",
						text: "`fact(3)` → `3 * fact(2)` → `3 * (2 * fact(1))` → `3 * (2 * 1)` = **6**. La pile empile 3 cadres puis dépile en multipliant."
					}]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce",
					body: "Toute récursion simple (un appel en queue) se réécrit en `while`. Si on te demande « convertir en itératif », déroule la pile en une boucle."
				},
				{
					t: "h3",
					text: "Récursion sur un tableau"
				},
				{
					t: "code",
					lang: "c",
					title: "Somme récursive",
					code: "int somme(int t[], int n) {\n    if (n == 0) return 0;\n    return t[n - 1] + somme(t, n - 1);\n}"
				}
			],
			quiz: [
				{
					id: "a4q1",
					question: "void f(int x){ x = 0; }  appelée par f(n);  n est-il modifié ?",
					options: [
						"Oui",
						"Non, passage par valeur (copie)",
						"Seulement si n est global",
						"Oui en C99"
					],
					answer: 1,
					explain: "x est une copie locale. n dans l’appelant est inchangé."
				},
				{
					id: "a4q2",
					question: "Quel est le cas de base de fact(n) ?",
					options: [
						"n == 2",
						"n <= 1 (0! = 1! = 1)",
						"n == -1",
						"il n’y en a pas"
					],
					answer: 1,
					explain: "0! = 1 et 1! = 1. On arrête la récursion là."
				},
				{
					id: "a4q3",
					question: "Complexité de fibonacci naïf récursif ?",
					options: [
						"O(n)",
						"O(n log n)",
						"O(φⁿ) exponentielle",
						"O(1)"
					],
					answer: 2,
					explain: "L’arbre d’appels double presque à chaque niveau."
				},
				{
					id: "a4q4",
					question: "À quoi sert un prototype ?",
					options: [
						"À accélérer l’exécution",
						"À déclarer la signature avant l’usage (type de retour et paramètres)",
						"À allouer la pile",
						"C’est obligatoire pour main"
					],
					answer: 1,
					explain: "Le compilateur doit connaître la signature au moment de l’appel."
				}
			],
			exercises: [{
				id: "a4e1",
				title: "Puissance récursive",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Écrire long puiss(int a, int n) qui calcule a^n. Version O(n) acceptée ; bonus O(log n) par exponentiation rapide.",
				hint: "a^n = a × a^{n-1}, et a^0 = 1. Rapide : si n pair, (a^{n/2})².",
				solution: "long puiss(int a, int n) {\n    if (n == 0) return 1;\n    long h = puiss(a, n / 2);\n    long r = h * h;\n    if (n % 2) r *= a;\n    return r;\n}"
			}]
		},
		{
			id: "pointeurs",
			title: "Chapitre 5 — Pointeurs et mémoire",
			subtitle: "*, &, malloc, pièges",
			durationMin: 45,
			objectives: [
				"Lire et écrire * et & sans hésiter",
				"Allouer et libérer",
				"Éviter dangling / leak / overflow"
			],
			blocks: [
				{
					t: "callout",
					kind: "exam",
					title: "Chapitre le plus rentable",
					body: "Les pointeurs font **la** différence à l’écrit. Si tu ne dois réviser qu’une chose en C : ce chapitre + le swap + le parcours de chaîne par pointeur."
				},
				{
					t: "h2",
					text: "Adresse et indirection",
					id: "ptr"
				},
				{
					t: "p",
					text: "Un pointeur est une variable qui contient une **adresse**. `int *p;` : p est un pointeur sur int. `&x` = adresse de x. `*p` = objet pointé."
				},
				{
					t: "code",
					lang: "c",
					code: "int x = 10;\nint *p = &x;     /* p pointe sur x */\n*p = 20;         /* équivaut à x = 20 */\nprintf(\"%d\", x); /* 20 */"
				},
				{
					t: "table",
					cols: [
						"Expression",
						"Type (si p : int*)",
						"Sens"
					],
					rows: [
						[
							"p",
							"int *",
							"l’adresse"
						],
						[
							"*p",
							"int",
							"la valeur pointée"
						],
						[
							"&p",
							"int **",
							"adresse du pointeur lui-même"
						],
						[
							"p + 1",
							"int *",
							"adresse de l’entier suivant (sizeof(int) de plus)"
						],
						[
							"*(p+i)",
							"int",
							"équivalent à p[i]"
						]
					]
				},
				{
					t: "example",
					title: "Le swap — à écrire les yeux fermés",
					blocks: [{
						t: "code",
						lang: "c",
						code: "void swap(int *a, int *b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n/* appel : swap(&x, &y); */"
					}, {
						t: "p",
						text: "Sans pointeurs, `void swap(int a, int b)` échange des **copies** : sans effet. C’est **la** question cadeau du concours."
					}]
				},
				{
					t: "h2",
					text: "Pointeurs et tableaux",
					id: "ptr-arr"
				},
				{
					t: "p",
					text: "Dans 99 % des contextes, `t` (tableau) **décroît** en `&t[0]`. D’où `t[i] ≡ *(t+i)`. On peut parcourir une chaîne ainsi :"
				},
				{
					t: "code",
					lang: "c",
					code: "int longueur(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') p++;\n    return (int)(p - s);   /* arithmétique de pointeurs */\n}"
				},
				{
					t: "h2",
					text: "Allocation dynamique",
					id: "heap"
				},
				{
					t: "p",
					text: "La **pile** (stack) : variables locales, automatique, taille limitée. Le **tas** (heap) : `malloc` / `free`, durée de vie contrôlée par le programmeur."
				},
				{
					t: "code",
					lang: "c",
					code: "int *t = malloc(n * sizeof *t);\nif (t == NULL) return 1;     /* allocation échouée */\n/* ... utilisation ... */\nfree(t);\nt = NULL;                    /* évite dangling pointer */"
				},
				{
					t: "ul",
					items: [
						"**Leak** : malloc sans free.",
						"**Dangling** : free puis utilisation.",
						"**Double free** : free deux fois.",
						"**Oubli de NULL** : malloc peut échouer.",
						"`calloc(n, size)` : comme malloc + mise à 0.",
						"`realloc(p, newsize)` : redimensionne (peut déplacer)."
					]
				},
				{
					t: "callout",
					kind: "warning",
					title: "sizeof à utiliser ainsi",
					body: "`malloc(n * sizeof *t)` reste correct même si le type de t change. `malloc(n * 4)` est fragile. `malloc(sizeof(t))` alloue un **pointeur** (8 octets), pas le tableau — erreur fréquente."
				}
			],
			quiz: [
				{
					id: "a5q1",
					question: "Si int x = 5; int *p = &x; alors *p vaut",
					options: [
						"l’adresse de x",
						"5",
						"l’adresse de p",
						"indéfini"
					],
					answer: 1,
					explain: "*p déréférence : on obtient la valeur de x."
				},
				{
					id: "a5q2",
					question: "Pour que swap modifie x et y, on appelle",
					options: [
						"swap(x, y)",
						"swap(*x, *y)",
						"swap(&x, &y)",
						"swap(int, int)"
					],
					answer: 2,
					explain: "On passe les adresses."
				},
				{
					id: "a5q3",
					question: "Après free(p); que faire ?",
					options: [
						"p[0] = 0",
						"rien, p reste valide",
						"ne plus déréférencer p ; p = NULL est une bonne hygiène",
						"malloc automatiquement"
					],
					answer: 2,
					explain: "p est dangling. Le mettre à NULL évite un usage accidentel."
				},
				{
					id: "a5q4",
					question: "t[i] est équivalent à",
					options: [
						"t + i",
						"*(t + i)",
						"&t[i]",
						"t + *i"
					],
					answer: 1,
					explain: "Définition même de l’indexation en C."
				}
			],
			exercises: [{
				id: "a5e1",
				title: "Swap de deux entiers",
				difficulty: "facile",
				durationMin: 8,
				prompt: "Écrire void swap(int *a, int *b) et un main qui lit deux entiers, les échange et les affiche.",
				solution: "void swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\nint main(void) {\n    int x, y; scanf(\"%d %d\", &x, &y);\n    swap(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}"
			}, {
				id: "a5e2",
				title: "Tableau dynamique",
				difficulty: "moyen",
				durationMin: 15,
				prompt: "Lire n, allouer un tableau de n int, le remplir, afficher la somme, puis free.",
				hint: "Toujours tester malloc != NULL.",
				solution: "int n; scanf(\"%d\", &n);\nint *t = malloc(n * sizeof *t);\nif (!t) return 1;\nint s = 0;\nfor (int i = 0; i < n; i++) { scanf(\"%d\", &t[i]); s += t[i]; }\nprintf(\"%d\\n\", s);\nfree(t);"
			}]
		},
		{
			id: "structures",
			title: "Chapitre 6 — Structures, fichiers, listes",
			subtitle: "struct, FILE*, liste chaînée",
			durationMin: 35,
			objectives: [
				"Définir et utiliser une struct",
				"Lire / écrire un fichier texte",
				"Insérer dans une liste simplement chaînée"
			],
			blocks: [
				{
					t: "h2",
					text: "Structures",
					id: "struct"
				},
				{
					t: "code",
					lang: "c",
					code: "typedef struct {\n    char nom[32];\n    float note;\n} Etudiant;\n\nEtudiant e = {\"Ali\", 14.5};\nprintf(\"%s %.1f\", e.nom, e.note);\n\nEtudiant *p = &e;\nprintf(\"%s\", p->nom);   /* équivaut à (*p).nom */"
				},
				{
					t: "callout",
					kind: "key",
					title: ". vs ->",
					body: "`.` si tu as la struct (valeur). `->` si tu as un **pointeur** sur struct. Confondre les deux est un classique de barème."
				},
				{
					t: "h2",
					text: "Fichiers",
					id: "files"
				},
				{
					t: "table",
					cols: ["Mode", "Sens"],
					rows: [
						["\"r\"", "lecture (le fichier doit exister)"],
						["\"w\"", "écriture (crée / écrase)"],
						["\"a\"", "ajout en fin"],
						["\"rb\" / \"wb\"", "binaire"]
					]
				},
				{
					t: "code",
					lang: "c",
					code: "FILE *f = fopen(\"notes.txt\", \"r\");\nif (f == NULL) { perror(\"fopen\"); return 1; }\nchar nom[32]; float note;\nwhile (fscanf(f, \"%31s %f\", nom, &note) == 2) {\n    printf(\"%s %.2f\\n\", nom, note);\n}\nfclose(f);"
				},
				{
					t: "h2",
					text: "Liste simplement chaînée",
					id: "list"
				},
				{
					t: "p",
					text: "Structure récursive : chaque nœud contient une valeur et un pointeur vers le suivant. La liste vide est `NULL`. Insertion en tête : $O(1)$. Recherche : $O(n)$."
				},
				{
					t: "code",
					lang: "c",
					title: "Insertion en tête",
					code: "typedef struct Noeud {\n    int val;\n    struct Noeud *suiv;\n} Noeud;\n\nNoeud *inserer_tete(Noeud *tete, int x) {\n    Noeud *n = malloc(sizeof *n);\n    n->val = x;\n    n->suiv = tete;\n    return n;                 /* nouvelle tête */\n}"
				},
				{
					t: "p",
					text: "Parcours : `for (Noeud *p = tete; p != NULL; p = p->suiv) printf(\"%d \", p->val);`. Libération : while en sauvant `p->suiv` **avant** le free."
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce concours",
					body: "Si on demande « insérer en queue », parcours jusqu’à `p->suiv == NULL` puis `p->suiv = n`. N’oublie pas le cas liste vide (tete == NULL)."
				}
			],
			quiz: [
				{
					id: "a6q1",
					question: "Si p est Etudiant*, on accède au nom par",
					options: [
						"p.nom",
						"p->nom",
						"*p.nom",
						"p::nom"
					],
					answer: 1,
					explain: "Flèche pour un pointeur sur struct."
				},
				{
					id: "a6q2",
					question: "fopen en mode \"w\" sur un fichier existant",
					options: [
						"échoue",
						"ouvre en lecture",
						"écrase le contenu",
						"ajoute à la fin"
					],
					answer: 2,
					explain: "\"w\" truncate. Pour ajouter : \"a\"."
				},
				{
					id: "a6q3",
					question: "Complexité de l’insertion en tête d’une liste chaînée",
					options: [
						"O(1)",
						"O(n)",
						"O(log n)",
						"O(n²)"
					],
					answer: 0,
					explain: "On relie le nouveau nœud à l’ancienne tête."
				},
				{
					id: "a6q4",
					question: "Sentinelle d’une liste vide",
					options: [
						"0",
						"NULL",
						"\\0",
						"tete->suiv"
					],
					answer: 1,
					explain: "La tête vaut NULL."
				}
			],
			exercises: [{
				id: "a6e1",
				title: "Compter les nœuds",
				difficulty: "facile",
				durationMin: 8,
				prompt: "int longueur(Noeud *tete) — parcours et compteur.",
				solution: "int longueur(Noeud *p) {\n    int n = 0;\n    while (p) { n++; p = p->suiv; }\n    return n;\n}"
			}]
		},
		{
			id: "algo",
			title: "Chapitre 7 — Algorithmes et complexité",
			subtitle: "O(), recherche, tris",
			durationMin: 45,
			objectives: [
				"Lire et comparer des O()",
				"Implémenter recherche binaire",
				"Connaître les 5 tris du programme"
			],
			blocks: [
				{
					t: "h2",
					text: "Complexité en temps",
					id: "big-o"
				},
				{
					t: "p",
					text: "La notation $O$ décrit **l’ordre de grandeur** du pire cas, quand $n \\to \\infty$. On ignore les constantes : $3n+12 = O(n)$."
				},
				{
					t: "formula",
					name: "Hiérarchie (du meilleur au pire)",
					tex: "O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n\\log n) \\subset O(n^2) \\subset O(n^3) \\subset O(2^n) \\subset O(n!)"
				},
				{
					t: "table",
					cols: ["Code typique", "Complexité"],
					rows: [
						["instruction simple, accès t[i]", "O(1)"],
						["dichotomie, arbre équilibré", "O(log n)"],
						["une boucle 0..n", "O(n)"],
						["tri fusion / rapide moyen", "O(n log n)"],
						["deux boucles imbriquées n×n (bulle)", "O(n²)"],
						["fibonacci naïf, sous-ensembles", "O(2ⁿ)"]
					]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Compter les boucles",
					body: "Une boucle × n → O(n). Deux boucles **imbriquées** indépendantes → O(n²). Deux boucles **successives** → O(n)+O(n)=O(n). Une dichotomie dans une boucle n → O(n log n)."
				},
				{
					t: "h2",
					text: "Recherche",
					id: "search"
				},
				{
					t: "p",
					text: "**Linéaire** : parcourt tout, $O(n)$, tableau non trié OK. **Dichotomique** : tableau **trié**, $O(\\log n)$. Invariant : l’élément est dans `[g, d]` s’il existe."
				},
				{
					t: "code",
					lang: "c",
					title: "Recherche binaire (itérative)",
					code: "int bsearch_int(int t[], int n, int x) {\n    int g = 0, d = n - 1;\n    while (g <= d) {\n        int m = g + (d - g) / 2;   /* évite overflow */\n        if (t[m] == x) return m;\n        if (t[m] < x) g = m + 1;\n        else d = m - 1;\n    }\n    return -1;\n}"
				},
				{
					t: "h2",
					text: "Tris à connaître",
					id: "sort"
				},
				{
					t: "table",
					cols: [
						"Tri",
						"Pire cas",
						"Stable ?",
						"Idée"
					],
					rows: [
						[
							"Sélection",
							"O(n²)",
							"non",
							"échanger le min du suffixe"
						],
						[
							"Insertion",
							"O(n²) / O(n) déjà trié",
							"oui",
							"insérer dans la partie gauche triée"
						],
						[
							"Bulle",
							"O(n²)",
							"oui",
							"échanger voisins inversés"
						],
						[
							"Fusion (merge)",
							"O(n log n)",
							"oui",
							"diviser, trier, fusionner"
						],
						[
							"Rapide (quick)",
							"O(n²) / moy. O(n log n)",
							"non",
							"pivot + partition"
						]
					]
				},
				{
					t: "code",
					lang: "c",
					title: "Tri par insertion — souvent demandé",
					code: "void insertion(int t[], int n) {\n    for (int i = 1; i < n; i++) {\n        int x = t[i], j = i;\n        while (j > 0 && t[j - 1] > x) {\n            t[j] = t[j - 1];\n            j--;\n        }\n        t[j] = x;\n    }\n}"
				},
				{
					t: "callout",
					kind: "exam",
					title: "Questions types",
					body: "« Combien de comparaisons dans le pire cas du tri à bulles sur 5 éléments ? » → boucle i de 0 à n-2, j de 0 à n-2-i : $n(n-1)/2 = 10$. Apprends cette formule."
				},
				{
					t: "formula",
					name: "Comparaisons du tri à bulles (pire cas)",
					tex: "\\frac{n(n-1)}{2}"
				}
			],
			quiz: [
				{
					id: "a7q1",
					question: "Recherche binaire : précondition indispensable ?",
					options: [
						"tableau de taille paire",
						"tableau trié",
						"éléments uniques",
						"éléments positifs"
					],
					answer: 1,
					explain: "L’algorithme élimine une moitié grâce à l’ordre."
				},
				{
					id: "a7q2",
					question: "O(n) + O(n log n) =",
					options: [
						"O(n)",
						"O(n log n)",
						"O(n²)",
						"O(2n log n) distinct"
					],
					answer: 1,
					explain: "On garde le terme dominant."
				},
				{
					id: "a7q3",
					question: "Lequel est O(n log n) dans tous les cas ?",
					options: [
						"Quicksort",
						"Tri fusion",
						"Tri à bulles",
						"Tri par sélection"
					],
					answer: 1,
					explain: "Merge sort : toujours n log n. Quicksort dégénère à n²."
				},
				{
					id: "a7q4",
					question: "Pire cas du tri par insertion",
					options: [
						"tableau déjà trié",
						"tableau trié à l’envers",
						"éléments égaux",
						"n pair"
					],
					answer: 1,
					explain: "Chaque insertion décale tout le préfixe → O(n²)."
				}
			],
			exercises: [{
				id: "a7e1",
				title: "Recherche binaire",
				difficulty: "moyen",
				durationMin: 15,
				prompt: "Écrire une fonction qui retourne l’indice de x dans un tableau trié, ou -1. Version itérative.",
				solution: "int cherche(int t[], int n, int x) {\n    int g = 0, d = n - 1;\n    while (g <= d) {\n        int m = g + (d - g) / 2;\n        if (t[m] == x) return m;\n        if (t[m] < x) g = m + 1; else d = m - 1;\n    }\n    return -1;\n}"
			}, {
				id: "a7e2",
				title: "Compter les comparaisons",
				difficulty: "difficile",
				durationMin: 15,
				prompt: "Pour n = 4, combien de comparaisons dans le pire cas du tri par sélection ? Justifier.",
				hint: "Pour i de 0 à n-2, on parcourt n-1-i éléments pour trouver le min.",
				solution: "Sélection : (n-1)+(n-2)+…+1 = n(n-1)/2. Pour n=4 : 6 comparaisons."
			}]
		},
		{
			id: "fiche",
			title: "Chapitre 8 — Fiche express et pièges",
			subtitle: "À relire le matin de l’épreuve",
			durationMin: 25,
			objectives: ["Réviser les 15 pièges qui rapportent des points", "Avoir les squelettes sous les yeux"],
			blocks: [
				{
					t: "h2",
					text: "Les 15 pièges qui tombent",
					id: "traps"
				},
				{
					t: "ol",
					items: [
						"`scanf(\"%d\", n)` sans `&`",
						"`if (x = 0)` au lieu de `==`",
						"`int / int` oublié (moyenne tronquée)",
						"`i++` vs `++i` dans un `printf`",
						"Indice `t[n]` sur un tableau de n cases",
						"`sizeof(\"AB\")` = 3, `strlen` = 2",
						"swap par valeur (sans pointeurs)",
						"Oubli du `'\\0'` après copie manuelle",
						"`malloc` sans `NULL` check, oubli de `free`",
						"`sizeof(t)` dans une fonction (pointeur, pas tableau)",
						"Récursion sans cas de base",
						"Recherche binaire sur tableau **non** trié",
						"`p.champ` alors que p est un pointeur (`p->champ`)",
						"Boucle `for (i=0; i<=n; i++)` → un tour de trop",
						"Comparer des chaînes avec `==` au lieu de `strcmp`"
					]
				},
				{
					t: "h2",
					text: "Squelettes à recopier vite",
					id: "skel"
				},
				{
					t: "code",
					lang: "c",
					title: "Parcours + min / max / somme",
					code: "int min = t[0], max = t[0], s = 0;\nfor (int i = 0; i < n; i++) {\n    s += t[i];\n    if (t[i] < min) min = t[i];\n    if (t[i] > max) max = t[i];\n}"
				},
				{
					t: "code",
					lang: "c",
					title: "Compter / filtrer",
					code: "int c = 0;\nfor (int i = 0; i < n; i++)\n    if (t[i] % 2 == 0) c++;"
				},
				{
					t: "h2",
					text: "Méthode de 40 secondes sur un QCM code",
					id: "method"
				},
				{
					t: "ol",
					items: [
						"Encadre les indices de boucles : première valeur, dernière, nombre de tours.",
						"Dresse le tableau d’état (3–4 variables max).",
						"Repère `=` vs `==`, `i++` dans un test, `break`.",
						"Vérifie les `'\\0'`, `&`, `NULL`.",
						"Si deux réponses semblent justes : cherche l’undefined behavior."
					]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Gestion du temps (épreuve C)",
					body: "QCM d’abord (points rapides). Ensuite les fonctions courtes (swap, palindrome, PGCD). Les algos longs (tri, liste) si le temps reste. Ne reste pas 20 min sur un pointeur double."
				}
			],
			quiz: [
				{
					id: "a8q1",
					question: "strcmp(a, b) == 0 vs a == b pour deux char[] ?",
					options: [
						"équivalent",
						"a == b compare les adresses, strcmp le contenu",
						"a == b est préférable",
						"strcmp ne marche pas sur char[]"
					],
					answer: 1,
					explain: "== sur tableaux/pointeurs compare les adresses."
				},
				{
					id: "a8q2",
					question: "for (i = 0; i <= n; i++) sur t[n] provoque",
					options: [
						"rien",
						"un accès t[n] hors bornes",
						"une erreur de compilation toujours",
						"un tri"
					],
					answer: 1,
					explain: "i va jusqu’à n inclus."
				},
				{
					id: "a8q3",
					question: "Meilleure première action face à un code QCM",
					options: [
						"réécrire le programme",
						"tracer un tableau d’état",
						"compter les lignes",
						"regarder les options au hasard"
					],
					answer: 1,
					explain: "La trace systématique évite les pièges d’incrément."
				},
				{
					id: "a8q4",
					question: "Quelle complexité pour 3 boucles imbriquées indépendantes de 1..n ?",
					options: [
						"O(n)",
						"O(n log n)",
						"O(n³)",
						"O(3n)"
					],
					answer: 2,
					explain: "n × n × n."
				}
			],
			exercises: [{
				id: "a8e1",
				title: "Auto-test : que affiche ce programme ?",
				difficulty: "moyen",
				durationMin: 10,
				prompt: "int a = 2, b = 3, *p = &a, *q = &b;\n*p = *q;\nq = p;\n*q = 5;\nprintf(\"%d %d\", a, b);\nDonner l’affichage et justifier.",
				solution: "*p = *q  → a = 3 (b inchangé).\nq = p     → q pointe aussi sur a.\n*q = 5    → a = 5, b reste 3.\nAffiche : 5 3"
			}]
		}
	]
};
var bdd = {
	id: "bdd",
	short: "Bases de données",
	title: "Bases de données",
	color: "bdd",
	description: "Modèle relationnel, algèbre, SQL, normalisation et transactions — le programme classique d’un écrit de master.",
	examFocus: "On te demande d’écrire des requêtes SQL justes (jointures + agrégats + HAVING), de décomposer un schéma jusqu’à 3NF/BCNF, et de lire une expression d’algèbre relationnelle.",
	learn: [
		"Le modèle relationnel (relation, clé, contrainte)",
		"L’algèbre relationnelle",
		"SQL : SELECT, WHERE, JOIN",
		"Agrégats, GROUP BY, HAVING, sous-requêtes",
		"Normalisation 1NF → BCNF",
		"MCD / MLD (Merise)",
		"Transactions ACID et index"
	],
	tips: [
		"Dessine toujours les tables et les clés avant d’écrire le SQL.",
		"HAVING filtre des groupes ; WHERE filtre des lignes — ne les inverse pas.",
		"Une jointure oubliée produit un produit cartésien (catastrophe silencieuse).",
		"Pour la 3NF : cherche les dépendances transitives X → Y → Z avec X non clé.",
		"COUNT(*) compte les lignes ; COUNT(col) ignore les NULL.",
		"Traduis l’algèbre en SQL : σ → WHERE, π → SELECT, ⋈ → JOIN."
	],
	chapters: [
		{
			id: "relationnel",
			title: "Chapitre 1 — Modèle relationnel",
			subtitle: "Relations, clés, intégrité",
			durationMin: 30,
			objectives: [
				"Définir relation, attribut, tuple, domaine",
				"Distinguer clé primaire, candidate, étrangère",
				"Connaître les contraintes d’intégrité"
			],
			blocks: [
				{
					t: "h2",
					text: "Vocabulaire (à coller au jury)",
					id: "vocab"
				},
				{
					t: "table",
					cols: [
						"Terme",
						"Sens",
						"Équivalent tableur"
					],
					rows: [
						[
							"Relation / table",
							"ensemble de tuples",
							"feuille"
						],
						[
							"Attribut / colonne",
							"rôle + domaine",
							"en-tête"
						],
						[
							"Tuple / n-uplet",
							"ligne, sans ordre",
							"ligne"
						],
						[
							"Domaine",
							"ensemble de valeurs autorisées",
							"type"
						],
						[
							"Schéma",
							"nom + liste d’attributs",
							"structure"
						],
						[
							"Instance",
							"contenu à un instant t",
							"données"
						]
					]
				},
				{
					t: "p",
					text: "Une relation est un **ensemble** : pas de doublons théoriques, pas d’ordre des lignes. SQL pratique autorise les doublons (multiset) — d’où `DISTINCT`."
				},
				{
					t: "h2",
					text: "Clés",
					id: "keys"
				},
				{
					t: "ul",
					items: [
						"**Clé candidate** : ensemble **minimal** d’attributs qui identifie un tuple.",
						"**Clé primaire (PK)** : une clé candidate choisie. Soulignée dans les schémas.",
						"**Clé étrangère (FK)** : attribut(s) qui **référence(nt)** une PK d’une autre (ou la même) relation. Garantit l’intégrité référentielle.",
						"**Clé secondaire / index** : pour accélérer, pas pour identifier.",
						"**Sur-clé (superkey)** : identifie, mais pas forcément minimale."
					]
				},
				{
					t: "example",
					title: "Étudiant(numE, nom, email, idVille)",
					blocks: [{
						t: "p",
						text: "`numE` clé primaire. `email` probablement unique → clé candidate. `idVille` clé étrangère vers `Ville(idVille, nom)`. On ne met **pas** `nomVille` dans Étudiant (redondance)."
					}]
				},
				{
					t: "h2",
					text: "Contraintes d’intégrité",
					id: "integrity"
				},
				{
					t: "ol",
					items: [
						"**De domaine** : note ∈ [0, 20].",
						"**De clé** : PK unique et non NULL.",
						"**Référentielle** : toute FK existe comme PK (ou est NULL si autorisé).",
						"**De tuple / utilisateur** : `dateRet > dateEmp`.",
						"**NOT NULL, UNIQUE, CHECK, DEFAULT** en SQL."
					]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Question type",
					body: "« Peut-on avoir une FK qui référence une clé non primaire ? » En théorie, elle référence une **clé candidate**. En pratique SQL : PRIMARY KEY ou UNIQUE."
				}
			],
			quiz: [
				{
					id: "b1q1",
					question: "Une clé primaire peut-elle contenir NULL ?",
					options: [
						"Oui",
						"Non",
						"Seulement si composite",
						"En MySQL seulement"
					],
					answer: 1,
					explain: "Unicité + non nullité. NULL casserait l’identification."
				},
				{
					id: "b1q2",
					question: "Une clé étrangère sert à",
					options: [
						"accélérer les SELECT",
						"garantir l’intégrité référentielle",
						"trier les tuples",
						"remplacer la PK"
					],
					answer: 1,
					explain: "Elle relie deux relations et empêche les orphelins."
				},
				{
					id: "b1q3",
					question: "Une relation au sens Codd est",
					options: [
						"un multiset ordonné",
						"un ensemble de tuples",
						"un graphe",
						"un fichier"
					],
					answer: 1,
					explain: "Ensemble : pas d’ordre, pas de doublons (théorie)."
				},
				{
					id: "b1q4",
					question: "Une superclé non minimale est",
					options: [
						"une clé candidate",
						"une clé primaire",
						"une sur-clé",
						"une FK"
					],
					answer: 2,
					explain: "Superkey ⊇ candidate key."
				}
			],
			exercises: [{
				id: "b1e1",
				title: "Repérer les clés",
				difficulty: "facile",
				durationMin: 10,
				prompt: "Commande(numC, dateC, numClient, numProduit, qte, libelleProduit).\nQuelles redondances ? Quelle(s) clé(s) ? Comment découper ?",
				solution: "libelleProduit dépend de numProduit → redondance.\nClé de Commande trop large (numC suffit si une commande = une tête ; sinon (numC, numProduit) pour des lignes).\nDécouper : Produit(numP, libelle), Client(...), Commande(numC, date, numClient), Ligne(numC, numP, qte)."
			}]
		},
		{
			id: "algebre",
			title: "Chapitre 2 — Algèbre relationnelle",
			subtitle: "σ, π, ⋈, ∪, −, ÷",
			durationMin: 35,
			objectives: [
				"Lire et écrire les opérateurs de base",
				"Traduire une phrase française en algèbre",
				"Connaître la division (question de niveau)"
			],
			blocks: [
				{
					t: "h2",
					text: "Opérateurs unaires",
					id: "unary"
				},
				{
					t: "formula",
					name: "Sélection (filtre de lignes)",
					tex: "\\sigma_{\\text{condition}}(R)",
					note: "Équivalent SQL : WHERE. La condition porte sur les attributs de R."
				},
				{
					t: "formula",
					name: "Projection (filtre de colonnes)",
					tex: "\\pi_{A,B}(R)",
					note: "Équivalent SQL : SELECT DISTINCT A, B. Les doublons théoriques disparaissent."
				},
				{
					t: "h2",
					text: "Opérateurs binaires",
					id: "binary"
				},
				{
					t: "table",
					cols: [
						"Opérateur",
						"Notation",
						"Condition",
						"SQL"
					],
					rows: [
						[
							"Union",
							"R ∪ S",
							"même schéma",
							"UNION"
						],
						[
							"Différence",
							"R − S",
							"même schéma",
							"EXCEPT / MINUS"
						],
						[
							"Intersection",
							"R ∩ S",
							"même schéma",
							"INTERSECT"
						],
						[
							"Produit cartésien",
							"R × S",
							"—",
							"FROM R, S"
						],
						[
							"Jointure θ",
							"R ⋈_θ S",
							"condition",
							"JOIN ON"
						],
						[
							"Jointure naturelle",
							"R ⋈ S",
							"attributs homonymes",
							"NATURAL JOIN"
						],
						[
							"Division",
							"R ÷ S",
							"voir plus bas",
							"double NOT EXISTS"
						]
					]
				},
				{
					t: "p",
					text: "La **jointure interne** $R \\bowtie_{R.a = S.a} S$ = $\\sigma_{R.a=S.a}(R \\times S)$. C’est la définition à citer."
				},
				{
					t: "example",
					title: "« Noms des étudiants de Safi ayant une note > 12 en SDA »",
					blocks: [{
						t: "math",
						tex: "\\pi_{nom}\\,\\sigma_{ville='Safi'\\,\\wedge\\,note>12\\,\\wedge\\,mod='SDA'}(\\,Etudiant \\bowtie Inscription\\,)"
					}, {
						t: "p",
						text: "On joint d’abord (pour avoir ville + note + module), on sélectionne, on projette. L’ordre σ puis ⋈ peut se réécrire (optimisation) mais le résultat est le même."
					}]
				},
				{
					t: "h2",
					text: "Division — « tous les »",
					id: "div"
				},
				{
					t: "p",
					text: "$R(A,B) \\div S(B)$ = les $A$ dont les $B$ associés **contiennent tous** les $B$ de $S$. Phrase déclencheuse : « les étudiants qui se sont inscrits à **tous** les modules »."
				},
				{
					t: "formula",
					name: "Formule",
					tex: "R \\div S = \\pi_A(R) - \\pi_A\\big(\\pi_A(R)\\times S - R\\big)"
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce",
					body: "Si l’énoncé dit « au moins un » → jointure/sélection. S’il dit « tous » / « uniquement » → division (ou NOT EXISTS en SQL). C’est le signal."
				}
			],
			quiz: [
				{
					id: "b2q1",
					question: "σ correspond en SQL à",
					options: [
						"SELECT (colonnes)",
						"WHERE",
						"GROUP BY",
						"ORDER BY"
					],
					answer: 1,
					explain: "Sélection = filtre de lignes = WHERE."
				},
				{
					id: "b2q2",
					question: "π_A(R) peut supprimer des lignes car",
					options: [
						"elle trie",
						"la projection théorique élimine les doublons",
						"elle joint",
						"jamais"
					],
					answer: 1,
					explain: "Deux tuples distincts peuvent devenir identiques une fois restreints à A."
				},
				{
					id: "b2q3",
					question: "« Les clients qui ont commandé tous les produits » se traduit par",
					options: [
						"union",
						"sélection",
						"division",
						"différence simple"
					],
					answer: 2,
					explain: "Quantificateur universel = division."
				},
				{
					id: "b2q4",
					question: "R ⋈ S (naturelle) vs R × S",
					options: [
						"identique",
						"la naturelle égalise les attributs communs puis les fusionne",
						"× est plus petit",
						"⋈ exige le même schéma"
					],
					answer: 1,
					explain: "Jointure naturelle = égalité sur les homonymes + une seule copie de ces colonnes."
				}
			],
			exercises: [{
				id: "b2e1",
				title: "Traduction",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Films(idF, titre, annee), Joue(idA, idF, role), Acteurs(idA, nom).\nExprimer en algèbre : titres des films où joue « Depp » sortis après 2000.",
				solution: "π_titre ( σ_annee>2000 ∧ nom='Depp' ( Films ⋈ Joue ⋈ Acteurs ) )"
			}]
		},
		{
			id: "sql-base",
			title: "Chapitre 3 — SQL fondamental",
			subtitle: "SELECT … FROM … WHERE",
			durationMin: 35,
			objectives: [
				"Écrire un SELECT correct",
				"Maîtriser WHERE, LIKE, IN, BETWEEN, NULL",
				"Distinguer DISTINCT, ORDER BY, LIMIT"
			],
			blocks: [
				{
					t: "code",
					lang: "sql",
					title: "Squelette",
					code: "SELECT [DISTINCT] colonnes | expressions\nFROM   table [alias]\nWHERE  condition\nORDER BY colonne [ASC|DESC]\nLIMIT  n;"
				},
				{
					t: "h2",
					text: "WHERE — opérateurs",
					id: "where"
				},
				{
					t: "ul",
					items: [
						"Comparaisons : `= <> < > <= >=`",
						"`AND` / `OR` / `NOT` — **parenthèse** les OR.",
						"`IN (1,2,3)` ou `IN (sous-requête)`",
						"`BETWEEN a AND b` : intervalle **fermé**.",
						"`LIKE 'A%'` (commence), `'%A'` (finit), `'%A%'` (contient). `_` = 1 caractère.",
						"`IS NULL` / `IS NOT NULL` — **jamais** `= NULL`."
					]
				},
				{
					t: "callout",
					kind: "warning",
					title: "NULL n’est pas une valeur",
					body: "`x = NULL` est UNKNOWN, pas TRUE. Une ligne avec note NULL disparaît de `WHERE note >= 10`. Pour les inclure : `note >= 10 OR note IS NULL`."
				},
				{
					t: "example",
					title: "Étudiants de Safi dont le nom commence par M",
					blocks: [{
						t: "code",
						lang: "sql",
						code: "SELECT numE, nom\nFROM Etudiant\nWHERE ville = 'Safi' AND nom LIKE 'M%'\nORDER BY nom;"
					}]
				},
				{
					t: "h2",
					text: "Expressions",
					id: "expr"
				},
				{
					t: "p",
					text: "`SELECT prix * qte AS montant` — `AS` nomme la colonne. `ORDER BY montant` est accepté dans la plupart des SGBD. Alias de table : `FROM Etudiant e` puis `e.nom`."
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce vitesse",
					body: "Écris d’abord FROM + WHERE (le « monde » des lignes), ensuite SELECT (ce que tu montres). C’est l’ordre logique réel du SGBD, et ça évite les jointures oubliées."
				}
			],
			quiz: [
				{
					id: "b3q1",
					question: "Pour tester une valeur absente on écrit",
					options: [
						"col = NULL",
						"col IS NULL",
						"col == NULL",
						"col LIKE NULL"
					],
					answer: 1,
					explain: "IS NULL est le seul prédicat correct."
				},
				{
					id: "b3q2",
					question: "LIKE 'a_b' correspond à",
					options: [
						"toute chaîne contenant a et b",
						"une chaîne de 3 caractères : a, un caractère, b",
						"a suivi de b",
						"rien"
					],
					answer: 1,
					explain: "_ = exactement 1 caractère."
				},
				{
					id: "b3q3",
					question: "DISTINCT sert à",
					options: [
						"trier",
						"éliminer les doublons du résultat",
						"filtrer les NULL",
						"créer une clé"
					],
					answer: 1,
					explain: "SELECT DISTINCT col."
				},
				{
					id: "b3q4",
					question: "BETWEEN 10 AND 20 inclut-il 10 et 20 ?",
					options: [
						"non",
						"oui, intervalle fermé",
						"seulement 10",
						"seulement 20"
					],
					answer: 1,
					explain: "col >= 10 AND col <= 20."
				}
			],
			exercises: [{
				id: "b3e1",
				title: "Filtrer",
				difficulty: "facile",
				durationMin: 8,
				prompt: "Table Livre(isbn, titre, annee, prix, genre). Lister titre et prix des romans à moins de 80 DH parus depuis 2015, du plus cher au moins cher.",
				solution: "SELECT titre, prix\nFROM Livre\nWHERE genre = 'roman' AND prix < 80 AND annee >= 2015\nORDER BY prix DESC;"
			}]
		},
		{
			id: "jointures",
			title: "Chapitre 4 — Jointures, agrégats, sous-requêtes",
			subtitle: "Le cœur de l’épreuve SQL",
			durationMin: 45,
			objectives: [
				"Écrire INNER / LEFT JOIN",
				"GROUP BY + HAVING sans erreur",
				"Choisir sous-requête vs jointure"
			],
			blocks: [
				{
					t: "h2",
					text: "Jointures",
					id: "join"
				},
				{
					t: "code",
					lang: "sql",
					title: "INNER JOIN (intersection)",
					code: "SELECT e.nom, i.note\nFROM Etudiant e\nJOIN Inscription i ON i.numE = e.numE\nWHERE i.module = 'SDA';"
				},
				{
					t: "p",
					text: "**LEFT JOIN** : toutes les lignes de gauche, même sans match (colonnes droites à NULL). Utile pour « les étudiants **sans** inscription » :"
				},
				{
					t: "code",
					lang: "sql",
					code: "SELECT e.nom\nFROM Etudiant e\nLEFT JOIN Inscription i ON i.numE = e.numE\nWHERE i.numE IS NULL;"
				},
				{
					t: "callout",
					kind: "warning",
					title: "Produit cartésien",
					body: "`FROM A, B` sans `WHERE A.id = B.id` multiplie les lignes. 100 étudiants × 20 modules = 2000 lignes. Si le résultat « explose », cherche la jointure oubliée."
				},
				{
					t: "h2",
					text: "Agrégats",
					id: "agg"
				},
				{
					t: "p",
					text: "`COUNT, SUM, AVG, MIN, MAX`. `COUNT(*)` : lignes. `COUNT(col)` : valeurs non NULL. `COUNT(DISTINCT col)` : valeurs distinctes."
				},
				{
					t: "code",
					lang: "sql",
					title: "GROUP BY + HAVING",
					code: "SELECT module, AVG(note) AS moyenne, COUNT(*) AS n\nFROM Inscription\nGROUP BY module\nHAVING COUNT(*) >= 10 AND AVG(note) >= 12\nORDER BY moyenne DESC;"
				},
				{
					t: "callout",
					kind: "key",
					title: "WHERE vs HAVING",
					body: "**WHERE** : avant le groupement (sur les lignes brutes). **HAVING** : après (sur les agrégats). `WHERE AVG(note) > 12` est **illégal**. `HAVING note > 12` n’a en général pas de sens (note n’est pas un agrégat ni dans le GROUP BY)."
				},
				{
					t: "p",
					text: "Règle d’or : dans le `SELECT` d’une requête groupée, chaque colonne est soit dans le `GROUP BY`, soit dans une fonction d’agrégat."
				},
				{
					t: "h2",
					text: "Sous-requêtes",
					id: "sub"
				},
				{
					t: "code",
					lang: "sql",
					title: "Étudiants mieux que la moyenne générale",
					code: "SELECT nom, note\nFROM Inscription i JOIN Etudiant e ON e.numE = i.numE\nWHERE note > (SELECT AVG(note) FROM Inscription);"
				},
				{
					t: "code",
					lang: "sql",
					title: "EXISTS — « au moins un »",
					code: "SELECT nom FROM Etudiant e\nWHERE EXISTS (\n  SELECT 1 FROM Inscription i\n  WHERE i.numE = e.numE AND i.note < 8\n);"
				},
				{
					t: "p",
					text: "`NOT EXISTS` exprime souvent la **division** (« tous ») : les étudiants pour lesquels il n’existe pas de module (du sous-ensemble visé) sans inscription."
				},
				{
					t: "example",
					title: "Modules suivis par tous les étudiants (idée)",
					blocks: [{
						t: "code",
						lang: "sql",
						code: "SELECT m.id\nFROM Module m\nWHERE NOT EXISTS (\n  SELECT 1 FROM Etudiant e\n  WHERE NOT EXISTS (\n    SELECT 1 FROM Inscription i\n    WHERE i.numE = e.numE AND i.module = m.id\n  )\n);"
					}, {
						t: "p",
						text: "« Il n’existe pas d’étudiant qui n’ait pas d’inscription à m ». Double négation = pour tous. Apprends ce **patron** par cœur."
					}]
				}
			],
			quiz: [
				{
					id: "b4q1",
					question: "Pour filtrer sur AVG(note) on utilise",
					options: [
						"WHERE AVG(note) > 10",
						"HAVING AVG(note) > 10",
						"ORDER BY AVG",
						"LIMIT AVG"
					],
					answer: 1,
					explain: "HAVING agit après GROUP BY."
				},
				{
					id: "b4q2",
					question: "LEFT JOIN Etudiant → Inscription, WHERE i.numE IS NULL donne",
					options: [
						"tous les étudiants",
						"les étudiants sans inscription",
						"les inscriptions orphelines",
						"un produit cartésien"
					],
					answer: 1,
					explain: "Anti-jointure classique."
				},
				{
					id: "b4q3",
					question: "COUNT(note) vs COUNT(*) si des notes sont NULL",
					options: [
						"identique",
						"COUNT(note) ignore les NULL, COUNT(*) non",
						"COUNT(*) ignore les NULL",
						"erreur"
					],
					answer: 1,
					explain: "Agrégats (sauf COUNT(*)) sautent les NULL."
				},
				{
					id: "b4q4",
					question: "Le patron double NOT EXISTS exprime",
					options: [
						"l’union",
						"la division (« pour tous »)",
						"la projection",
						"un tri"
					],
					answer: 1,
					explain: "Quantificateur universel en SQL."
				}
			],
			exercises: [{
				id: "b4e1",
				title: "Moyenne par ville",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Etudiant(numE, nom, ville), Inscription(numE, module, note).\nPour chaque ville : nombre d’étudiants inscrits (distincts) et moyenne des notes. Ne garder que les villes de moyenne ≥ 12.",
				solution: "SELECT e.ville, COUNT(DISTINCT e.numE) AS nb, AVG(i.note) AS moy\nFROM Etudiant e JOIN Inscription i ON i.numE = e.numE\nGROUP BY e.ville\nHAVING AVG(i.note) >= 12;"
			}, {
				id: "b4e2",
				title: "Meilleure note",
				difficulty: "moyen",
				durationMin: 10,
				prompt: "Noms des étudiants ayant la note maximale (il peut y en avoir plusieurs).",
				hint: "WHERE note = (SELECT MAX(note) FROM Inscription)",
				solution: "SELECT e.nom, i.note\nFROM Etudiant e JOIN Inscription i ON i.numE = e.numE\nWHERE i.note = (SELECT MAX(note) FROM Inscription);"
			}]
		},
		{
			id: "normalisation",
			title: "Chapitre 5 — Normalisation",
			subtitle: "DF, 1NF, 2NF, 3NF, BCNF",
			durationMin: 40,
			objectives: [
				"Lire une dépendance fonctionnelle",
				"Décomposer jusqu’à 3NF / BCNF",
				"Justifier la perte ou non de DF"
			],
			blocks: [
				{
					t: "h2",
					text: "Dépendance fonctionnelle",
					id: "fd"
				},
				{
					t: "formula",
					name: "X → Y",
					tex: "X \\to Y \\;\\;\\text{ssi deux tuples égaux sur } X \\text{ le sont sur } Y",
					note: "« Connaître X suffit à connaître Y ». Exemple : numE → nom."
				},
				{
					t: "ul",
					items: [
						"**Réflexivité** : $X \\to X$.",
						"**Augmentation** : si $X \\to Y$ alors $XZ \\to YZ$.",
						"**Transitivité** : $X \\to Y$ et $Y \\to Z$ ⇒ $X \\to Z$.",
						"Ces trois-là = **axiomes d’Armstrong**. Ils engendrent toutes les DF.",
						"**Fermeture $X^+$** : tout ce qu’on peut déduire à partir de X.",
						"X est **clé** ssi $X^+ =$ tous les attributs."
					]
				},
				{
					t: "h2",
					text: "Formes normales",
					id: "nf"
				},
				{
					t: "table",
					cols: [
						"FN",
						"Exigence",
						"Anomalie visée"
					],
					rows: [
						[
							"1NF",
							"attributs atomiques (pas de liste dans une case)",
							"répétitions intra-case"
						],
						[
							"2NF",
							"1NF + pas de DF partielle (attr. non clé dépend d’une partie de PK composite)",
							"redondance"
						],
						[
							"3NF",
							"2NF + pas de DF transitive (non clé → non clé)",
							"redondance"
						],
						[
							"BCNF",
							"pour toute DF X→Y, X est une superclé",
							"plus stricte que 3NF"
						]
					]
				},
				{
					t: "example",
					title: "Commande(numC, numP, libP, qte, numCli, villeCli)",
					blocks: [{
						t: "p",
						text: "PK = (numC, numP). DF : numP → libP (**partielle** : libP ne dépend pas de toute la PK) → pas 2NF. numCli → villeCli et numC → numCli (**transitive**) → pas 3NF."
					}, {
						t: "p",
						text: "Décomposition 3NF : `Produit(numP, libP)`, `Client(numCli, villeCli)`, `Commande(numC, numCli)`, `Ligne(numC, numP, qte)`."
					}]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Méthode en 4 minutes",
					body: "1) Lister les DF évidentes. 2) Trouver une clé (fermeture). 3) Repérer DF partielle → 2NF. 4) Repérer Y→Z avec Y non clé → 3NF. 5) Écrire les relations, PK soulignée, FK indiquées."
				},
				{
					t: "h3",
					text: "3NF vs BCNF"
				},
				{
					t: "p",
					text: "En 3NF, une DF $X \\to Y$ est autorisée si X est superclé **ou** Y est premier (dans une clé). BCNF n’autorise que « X superclé ». Cas célèbre : `R(Cours, Prof, Salle)` avec Prof→Salle et (Cours,Salle)→Prof — 3NF mais pas BCNF."
				},
				{
					t: "callout",
					kind: "tip",
					title: "Ne perds pas d’information",
					body: "Une décomposition est **sans perte** si la jointure des fragments reconstitue R. Critère : pour R = R1 ∪ R2, $R1 \\cap R2 \\to R1$ ou $R1 \\cap R2 \\to R2$."
				}
			],
			quiz: [
				{
					id: "b5q1",
					question: "1NF interdit",
					options: [
						"les clés étrangères",
						"les attributs non atomiques (listes, ensembles)",
						"les NULL",
						"les jointures"
					],
					answer: 1,
					explain: "Atomicité des attributs."
				},
				{
					id: "b5q2",
					question: "Une DF partielle concerne",
					options: [
						"une PK d’un seul attribut",
						"un attribut non premier dépendant d’une partie d’une clé composite",
						"une FK",
						"NULL"
					],
					answer: 1,
					explain: "C’est la définition de la violation de 2NF."
				},
				{
					id: "b5q3",
					question: "X est clé si",
					options: [
						"X → un attribut",
						"X⁺ = tout le schéma",
						"X est unique visuellement",
						"X est une FK"
					],
					answer: 1,
					explain: "La fermeture couvre tous les attributs."
				},
				{
					id: "b5q4",
					question: "BCNF est",
					options: [
						"plus faible que 3NF",
						"identique à 3NF",
						"plus stricte : toute DF a une superclé à gauche",
						"un index"
					],
					answer: 2,
					explain: "BCNF ⊂ 3NF en termes de schémas autorisés."
				}
			],
			exercises: [{
				id: "b5e1",
				title: "Normaliser",
				difficulty: "difficile",
				durationMin: 18,
				prompt: "R(A,B,C,D) avec DF : A→B, B→C, A→D.\nClé ? Forme normale actuelle ? Décomposition 3NF.",
				solution: "A⁺ = ABCD → A est clé (seule candidate).\nA→B, A→D ok (clé à gauche). B→C : B n’est pas clé, C n’est pas premier → pas 3NF (transitive A→B→C).\n3NF : R1(A,B,D) PK=A ; R2(B,C) PK=B, FK B→R1.B."
			}]
		},
		{
			id: "merise",
			title: "Chapitre 6 — Conception MCD / MLD",
			subtitle: "Entités, associations, cardinalités",
			durationMin: 30,
			objectives: [
				"Lire un MCD Merise",
				"Traduire MCD → MLD (tables)",
				"Gérer 1-1, 1-N, N-N et héritage simple"
			],
			blocks: [
				{
					t: "h2",
					text: "MCD — règles visuelles",
					id: "mcd"
				},
				{
					t: "ul",
					items: [
						"**Entité** : rectangle + identifiant (souligné).",
						"**Association** : losange, éventuellement porteuse de données (date, qté).",
						"**Cardinalités** : (x,y) lues **du côté de l’entité** : min, max de participations.",
						"`(1,1)` — obligatoire et unique. `(0,1)` — optionnel unique. `(1,N)` — au moins une. `(0,N)` — quelconque."
					]
				},
				{
					t: "h2",
					text: "MCD → MLD",
					id: "mld"
				},
				{
					t: "table",
					cols: ["Cardinalités", "Traduction"],
					rows: [
						["1,N — 1,1  (ou 0,1)", "FK du côté **1** (le 1,1) vers le N"],
						["N-N  (1,N — 1,N)", "table association : PK = (id1, id2) + attributs du losange"],
						["1,1 — 1,1", "fusion possible, ou FK unique des deux côtés"],
						["Héritage", "table mère + tables filles (PK=FK), ou table unique + discriminant"]
					]
				},
				{
					t: "example",
					title: "Commande (0,N) — (1,1) Client",
					blocks: [{
						t: "p",
						text: "Un client a 0 à N commandes ; une commande a **exactement un** client. → `Commande(..., idClient)` FK vers `Client`. On ne met **pas** idCommande dans Client."
					}]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce",
					body: "La FK va **du côté de la cardinalité max = 1**. Phrase : « une commande a un client » → la commande porte l’id du client."
				},
				{
					t: "h3",
					text: "Association n-aire et CIF"
				},
				{
					t: "p",
					text: "Une contrainte d’intégrité fonctionnelle (CIF) sur une association ternaire réduit souvent le problème à une binaire + DF. Si le jury dessine une CIF, traduis-la en « X détermine Y dans cette association »."
				}
			],
			quiz: [
				{
					id: "b6q1",
					question: "Une association N-N se traduit par",
					options: [
						"une FK d’un côté",
						"une table dont la PK est la concaténation des deux identifiants",
						"une fusion des deux entités",
						"rien"
					],
					answer: 1,
					explain: "Table de liaison."
				},
				{
					id: "b6q2",
					question: "Cardinalité (0,1) côté Employé vers Service signifie",
					options: [
						"un employé a forcément un service",
						"un employé a au plus un service, éventuellement aucun",
						"un service a 0 ou 1 employé",
						"N-N"
					],
					answer: 1,
					explain: "On lit les cardinalités du côté de l’entité concernée."
				},
				{
					id: "b6q3",
					question: "La FK d’une 1-N se place",
					options: [
						"du côté N (chaque N référence le 1)",
						"du côté 1",
						"dans une 3e table toujours",
						"nulle part"
					],
					answer: 0,
					explain: "L’entité « plusieurs » porte l’identifiant de l’entité « un »."
				},
				{
					id: "b6q4",
					question: "Un attribut de quantité sur un losange Commande-Produit va",
					options: [
						"dans Client",
						"dans la table association Ligne",
						"dans Produit seulement",
						"nulle part, c’est calculé"
					],
					answer: 1,
					explain: "Propriété de l’association N-N."
				}
			],
			exercises: [{
				id: "b6e1",
				title: "Traduction MCD",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Auteur (0,N) Écrit (1,N) Livre, Livre (1,1) Édité (0,N) Editeur. Attribut annee sur Écrit. Donner le MLD (tables, PK, FK).",
				solution: "Auteur(idA, ...)\nEditeur(idE, ...)\nLivre(idL, ..., idE)  -- FK idE car Livre (1,1) vers Editeur\nEcrit(idA, idL, annee) -- PK (idA,idL), FK idA, FK idL"
			}]
		},
		{
			id: "transactions",
			title: "Chapitre 7 — Transactions, index, vues",
			subtitle: "ACID, isolation, B-arbre",
			durationMin: 30,
			objectives: [
				"Citer ACID avec un exemple",
				"Comprendre un index",
				"Savoir à quoi sert une vue"
			],
			blocks: [
				{
					t: "h2",
					text: "ACID",
					id: "acid"
				},
				{
					t: "table",
					cols: [
						"Lettre",
						"Nom",
						"En une phrase"
					],
					rows: [
						[
							"A",
							"Atomicité",
							"tout ou rien (COMMIT / ROLLBACK)"
						],
						[
							"C",
							"Cohérence",
							"les contraintes restent vraies après coup"
						],
						[
							"I",
							"Isolation",
							"les transactions concurrentes ne se voient pas à moitié"
						],
						[
							"D",
							"Durabilité",
							"après COMMIT, le résultat survit à un crash"
						]
					]
				},
				{
					t: "example",
					title: "Virement 500 DH de A vers B",
					blocks: [{
						t: "p",
						text: "Deux UPDATE. Si le second échoue, ROLLBACK du premier (atomicité). Si une autre transaction lit entre les deux, elle verrait de l’argent disparaître (isolation, phénomène dirty read)."
					}]
				},
				{
					t: "p",
					text: "Anomalies : **dirty read**, **non-repeatable read**, **phantom**. Niveaux : READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE (du plus faible au plus fort)."
				},
				{
					t: "h2",
					text: "Index",
					id: "idx"
				},
				{
					t: "p",
					text: "Un index (souvent **B+ tree**) est une structure triée à côté de la table. Il rend `WHERE id = ?` et `ORDER BY` en $O(\\log n)$ I/O au lieu d’un scan $O(n)$. Coût : espace + ralentissement des INSERT/UPDATE."
				},
				{
					t: "ul",
					items: [
						"PK ⇒ index unique automatique.",
						"Index secondaire sur les FK souvent bénéfique (jointures).",
						"Inutile sur une colonne de 3 valeurs (sexe) : trop peu sélectif.",
						"`EXPLAIN` (hors programme, mais bon à citer) montre si l’index est utilisé."
					]
				},
				{
					t: "h2",
					text: "Vues",
					id: "views"
				},
				{
					t: "p",
					text: "`CREATE VIEW v AS SELECT ...` : requête nommée. Sert à simplifier, masquer des colonnes (sécurité), présenter un schéma externe. Une vue n’est en général **pas** matérialisée (recalculée à chaque appel), sauf vue matérialisée."
				}
			],
			quiz: [
				{
					id: "b7q1",
					question: "L’atomicité garantit",
					options: [
						"la vitesse",
						"tout ou rien",
						"l’ordre des tuples",
						"l’existence d’un index"
					],
					answer: 1,
					explain: "COMMIT global ou ROLLBACK global."
				},
				{
					id: "b7q2",
					question: "Un dirty read c’est",
					options: [
						"lire des données COMMITTED seulement",
						"lire des données d’une transaction pas encore validée",
						"un FULL SCAN",
						"une vue"
					],
					answer: 1,
					explain: "Lecture sale, interdite dès READ COMMITTED."
				},
				{
					id: "b7q3",
					question: "Un index B+ tree est surtout utile pour",
					options: [
						"COUNT(*) sans WHERE",
						"recherche par égalité / intervalle sur la colonne indexée",
						"accélérer tous les JOIN automatiquement",
						"remplacer la PK"
					],
					answer: 1,
					explain: "Point query et range query."
				},
				{
					id: "b7q4",
					question: "Une vue standard stocke-t-elle les données ?",
					options: [
						"oui toujours",
						"non, c’est une requête nommée",
						"oui si SQL92",
						"uniquement les PK"
					],
					answer: 1,
					explain: "Sauf vue matérialisée."
				}
			],
			exercises: [{
				id: "b7e1",
				title: "Choisir un index",
				difficulty: "facile",
				durationMin: 8,
				prompt: "Table Inscription(numE, module, note) de 2 millions de lignes. Requêtes fréquentes : note d’un étudiant donné, moyenne par module. Quels index proposer ? Lesquels éviter ?",
				solution: "INDEX (numE) — lookup étudiant. INDEX (module) — GROUP BY module.\nÉviter INDEX(note) si peu de requêtes par note exacte et faible sélectivité.\nPK (numE, module) déjà un index composite utile."
			}]
		},
		{
			id: "fiche",
			title: "Chapitre 8 — Fiche SQL express",
			subtitle: "Patrons à recoller le jour J",
			durationMin: 20,
			objectives: ["Avoir 8 patrons SQL prêts", "Éviter les 10 erreurs fatales"],
			blocks: [
				{
					t: "h2",
					text: "Patrons",
					id: "pat"
				},
				{
					t: "code",
					lang: "sql",
					title: "1. Jointure filtrée",
					code: "SELECT a.col, b.col\nFROM A a JOIN B b ON b.fk = a.pk\nWHERE ...;"
				},
				{
					t: "code",
					lang: "sql",
					title: "2. Anti-jointure (sans)",
					code: "SELECT a.*\nFROM A a LEFT JOIN B b ON b.fk = a.pk\nWHERE b.fk IS NULL;"
				},
				{
					t: "code",
					lang: "sql",
					title: "3. Agrégat groupé",
					code: "SELECT cle, COUNT(*) n, AVG(x) m\nFROM T\nWHERE /* lignes */\nGROUP BY cle\nHAVING COUNT(*) >= 2;"
				},
				{
					t: "code",
					lang: "sql",
					title: "4. Comparer à un agrégat global",
					code: "WHERE note > (SELECT AVG(note) FROM Inscription)"
				},
				{
					t: "code",
					lang: "sql",
					title: "5. Top-1 par groupe (idée)",
					code: "WHERE note = (\n  SELECT MAX(i2.note) FROM Inscription i2\n  WHERE i2.module = i.module\n)"
				},
				{
					t: "h2",
					text: "10 erreurs fatales",
					id: "err"
				},
				{
					t: "ol",
					items: [
						"Oublier la condition de jointure",
						"`= NULL` au lieu de `IS NULL`",
						"`WHERE AVG(...)` au lieu de `HAVING`",
						"Colonne ni agrégée ni dans GROUP BY",
						"Confondre COUNT(*) et COUNT(col)",
						"LIKE sans % ",
						"Comparer des dates comme des chaînes mal formatées",
						"SELECT * dans une copie d’examen (perd des points de clarté)",
						"Division (« tous ») traduite par une simple jointure",
						"Normalisation : laisser une DF transitive « parce que ça marche »"
					]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Temps",
					body: "Sur une question SQL : 2 min de schéma + clés sur le brouillon, 5 min d’écriture, 1 min de relecture (FROM, ON, WHERE vs HAVING). Si tu bloques sur « tous les », écris le double NOT EXISTS même imparfait — le patron est noté."
				}
			],
			quiz: [
				{
					id: "b8q1",
					question: "Première chose à dessiner avant le SQL",
					options: [
						"un index",
						"les tables avec PK / FK",
						"un MCD complet au propre",
						"rien"
					],
					answer: 1,
					explain: "Sans clés, les jointures sont des paris."
				},
				{
					id: "b8q2",
					question: "« Les clients sans commande » : patron",
					options: [
						"INNER JOIN",
						"LEFT JOIN + IS NULL",
						"GROUP BY seul",
						"UNION"
					],
					answer: 1,
					explain: "Anti-jointure."
				},
				{
					id: "b8q3",
					question: "SELECT ville, COUNT(*) FROM Etu;  (sans GROUP BY) est",
					options: [
						"correct",
						"illégal (ville n’est pas agrégée)",
						"un LEFT JOIN",
						"une vue"
					],
					answer: 1,
					explain: "En mode strict, toute colonne du SELECT doit être agrégée ou dans GROUP BY."
				},
				{
					id: "b8q4",
					question: "Signal du mot « tous » dans un énoncé",
					options: [
						"WHERE",
						"division / NOT EXISTS",
						"INDEX",
						"1NF"
					],
					answer: 1,
					explain: "Quantificateur universel."
				}
			],
			exercises: [{
				id: "b8e1",
				title: "Mini-sujet SQL",
				difficulty: "difficile",
				durationMin: 20,
				prompt: "Client(idC, nom, ville), Commande(idCo, date, idC), Ligne(idCo, idP, qte), Produit(idP, lib, prix).\n1) Total dépensé par client (nom, somme). 2) Clients n’ayant jamais commandé. 3) Produits commandés par tous les clients de Safi.",
				solution: "1) SELECT c.nom, SUM(l.qte * p.prix)\nFROM Client c JOIN Commande co ON co.idC=c.idC\nJOIN Ligne l ON l.idCo=co.idCo JOIN Produit p ON p.idP=l.idP\nGROUP BY c.idC, c.nom;\n\n2) SELECT c.* FROM Client c LEFT JOIN Commande co ON co.idC=c.idC WHERE co.idCo IS NULL;\n\n3) Produits p tels que NOT EXISTS un client de Safi sans ligne vers p\n(double NOT EXISTS, filtrés sur ville='Safi')."
			}]
		}
	]
};
var stats = {
	id: "stats",
	short: "Statistique",
	title: "Statistique et analyse",
	color: "stats",
	description: "Descriptif, probabilités, lois usuelles, estimation, tests et régression — le socle quantitatif du master SDA.",
	examFocus: "On calcule (moyenne, variance, probas conditionnelles), on reconnaît une loi, on pose $H_0/H_1$, on lit une p-valeur. Les formules doivent sortir sans hésiter.",
	learn: [
		"Statistique descriptive (tendance, dispersion, forme)",
		"Probabilités et conditionnement, Bayes",
		"Variables aléatoires discrètes et continues",
		"Lois usuelles (Bernoulli, binomiale, Poisson, normale, exp.)",
		"Estimation et intervalles de confiance",
		"Tests d’hypothèses",
		"Régression linéaire simple"
	],
	tips: [
		"Écris toujours l’événement en français, puis en symboles, puis calcule.",
		"Variance : $V(X)=E[X^2]-(E[X])^2$ — plus rapide que la définition.",
		"Normale : tout ramener à $Z=(X-\\mu)/\\sigma$ puis table $\\Phi$.",
		"Un test : $H_0$ (égalité / innocence), $H_1$, seuil $\\alpha$, règle, conclusion en français.",
		"n grand, p petit : $B(n,p) \\approx P(\\lambda=np)$.",
		"Ne confonds pas écart-type $\\sigma$ et erreur-type $\\sigma/\\sqrt{n}$."
	],
	chapters: [
		{
			id: "descriptive",
			title: "Chapitre 1 — Statistique descriptive",
			subtitle: "Moyenne, médiane, variance, quartiles",
			durationMin: 35,
			objectives: [
				"Calculer les indicateurs de tendance et de dispersion",
				"Lire un histogramme / une boîte à moustaches",
				"Distinguer population et échantillon"
			],
			blocks: [
				{
					t: "h2",
					text: "Population vs échantillon",
					id: "pop"
				},
				{
					t: "p",
					text: "La **population** a des paramètres ($\\mu$, $\\sigma$). L’**échantillon** de taille $n$ donne des **statistiques** ($\\bar{x}$, $s$) qui **estiment** les paramètres. Au concours, $n$ petit ⇒ on garde $n-1$ (quasi-variance)."
				},
				{
					t: "h2",
					text: "Tendance centrale",
					id: "center"
				},
				{
					t: "formula",
					name: "Moyenne empirique",
					tex: "\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i"
				},
				{
					t: "ul",
					items: [
						"**Médiane** $m$ : 50 % des obs. de chaque côté. Robuste aux outliers (la moyenne non).",
						"**Mode** : valeur la plus fréquente. Utile pour le qualitatif.",
						"**Moyenne pondérée / groupée** : $\\bar{x} = \\sum n_i c_i / n$ (centres de classes)."
					]
				},
				{
					t: "h2",
					text: "Dispersion",
					id: "disp"
				},
				{
					t: "formula",
					name: "Variance d’échantillon (sans biais)",
					tex: "s^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i-\\bar{x})^2 = \\frac{1}{n-1}\\Big(\\sum x_i^2 - n\\bar{x}^2\\Big)"
				},
				{
					t: "formula",
					name: "Écart-type, coefficient de variation, IQR",
					tex: "s = \\sqrt{s^2},\\quad CV = \\frac{s}{\\bar{x}},\\quad IQR = Q_3-Q_1"
				},
				{
					t: "p",
					text: "Sur une **population** on divise par $N$ (et on note $\\sigma^2$). Sur un **échantillon**, par $n-1$ (correction de Bessel). Si l’énoncé dit « série exhaustive », $/n$ ; s’il dit « échantillon », $/n-1$."
				},
				{
					t: "example",
					title: "Série 2, 4, 4, 4, 5, 5, 7, 9",
					blocks: [{
						t: "p",
						text: "$n=8$, $\\sum x=40$, $\\bar{x}=5$. Médiane = $(4+5)/2=4{,}5$. $\\sum x^2=232$, $s^2=(232-8\\times 25)/7=(232-200)/7=32/7\\approx 4{,}57$, $s\\approx 2{,}14$."
					}]
				},
				{
					t: "h2",
					text: "Forme et graphiques",
					id: "shape"
				},
				{
					t: "ul",
					items: [
						"**Skewness** : queue à droite (salaire) ⇒ moyenne > médiane.",
						"**Boîte à moustaches** : $Q_1$, $m$, $Q_3$, moustaches à $1{,}5\\,IQR$. Points au-delà = outliers.",
						"**Histogramme** : classes, aires proportionnelles aux effectifs.",
						"Variable **qualitative** : diagramme en barres / camembert (effectifs, fréquences)."
					]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce",
					body: "Si on te donne $\\sum x$ et $\\sum x^2$, n’essaie pas de reconstruire la série. Branche directement la formule de Koenig : $s^2 = \\frac{1}{n-1}(\\sum x^2 - n\\bar{x}^2)$."
				}
			],
			quiz: [
				{
					id: "s1q1",
					question: "La médiane est plus robuste que la moyenne car",
					options: [
						"elle utilise toutes les valeurs",
						"elle dépend peu des valeurs extrêmes",
						"elle est toujours plus grande",
						"elle vaut σ"
					],
					answer: 1,
					explain: "Un outlier déplace la moyenne, pas (beaucoup) la médiane."
				},
				{
					id: "s1q2",
					question: "Pour un échantillon, la variance sans biais divise par",
					options: [
						"n",
						"n-1",
						"n+1",
						"√n"
					],
					answer: 1,
					explain: "Correction de Bessel."
				},
				{
					id: "s1q3",
					question: "IQR =",
					options: [
						"Q3 + Q1",
						"Q3 − Q1",
						"max − min",
						"s²"
					],
					answer: 1,
					explain: "Écart interquartile."
				},
				{
					id: "s1q4",
					question: "Distribution étalée à droite : typiquement",
					options: [
						"moyenne < médiane",
						"moyenne > médiane",
						"moyenne = mode",
						"s = 0"
					],
					answer: 1,
					explain: "La queue droite tire la moyenne."
				}
			],
			exercises: [{
				id: "s1e1",
				title: "Calcul rapide",
				difficulty: "facile",
				durationMin: 10,
				prompt: "n=5, valeurs 3, 5, 6, 8, 8. Calculer moyenne, médiane, s² (échantillon).",
				solution: "moyenne = 30/5 = 6. Médiane = 6.\n∑x² = 9+25+36+64+64 = 198.\ns² = (198 - 5×36)/4 = (198-180)/4 = 18/4 = 4,5. s=√4,5≈2,12."
			}]
		},
		{
			id: "probas",
			title: "Chapitre 2 — Probabilités",
			subtitle: "Axiomes, conditionnement, Bayes, indépendance",
			durationMin: 40,
			objectives: [
				"Utiliser les axiomes et le complémentaire",
				"Appliquer Bayes",
				"Reconnaître l’indépendance"
			],
			blocks: [
				{
					t: "formula",
					name: "Axiomes de Kolmogorov (Ω fini)",
					tex: "P(\\Omega)=1,\\; P(A)\\ge 0,\\; A\\cap B=\\emptyset \\Rightarrow P(A\\cup B)=P(A)+P(B)"
				},
				{
					t: "formula",
					name: "Formules de base",
					tex: "P(A^c)=1-P(A),\\quad P(A\\cup B)=P(A)+P(B)-P(A\\cap B)"
				},
				{
					t: "h2",
					text: "Conditionnement",
					id: "cond"
				},
				{
					t: "formula",
					name: "Définition",
					tex: "P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)} \\quad (P(B)>0)"
				},
				{
					t: "formula",
					name: "Formule des probabilités totales",
					tex: "P(B) = \\sum_i P(B\\mid A_i)P(A_i) \\quad\\text{si }(A_i)\\text{ partitionne }\\Omega"
				},
				{
					t: "formula",
					name: "Bayes",
					tex: "P(A_i\\mid B) = \\frac{P(B\\mid A_i)P(A_i)}{\\sum_j P(B\\mid A_j)P(A_j)}"
				},
				{
					t: "example",
					title: "Test médical (le classique)",
					blocks: [
						{
							t: "p",
							text: "Maladie $M$ avec $P(M)=0{,}01$. Test : $P(+|M)=0{,}99$ (sensibilité), $P(+|M^c)=0{,}05$ (faux positifs). Alors"
						},
						{
							t: "math",
							tex: "P(M\\mid +)=\\frac{0{,}99\\times 0{,}01}{0{,}99\\times 0{,}01 + 0{,}05\\times 0{,}99}=\\frac{0{,}0099}{0{,}0099+0{,}0495}\\approx 0{,}167"
						},
						{
							t: "p",
							text: "Seulement **17 %**. Intuition : les faux positifs (5 % de 99 % de sains) noient les vrais positifs. Le jury adore cet exemple."
						}
					]
				},
				{
					t: "h2",
					text: "Indépendance",
					id: "indep"
				},
				{
					t: "formula",
					name: "A et B indépendants",
					tex: "P(A\\cap B)=P(A)P(B) \\iff P(A\\mid B)=P(A)",
					note: "Ne pas confondre avec disjoint (A∩B=∅). Deux événements disjoints de proba >0 ne sont PAS indépendants."
				},
				{
					t: "callout",
					kind: "warning",
					title: "Piège",
					body: "Disjoint ≠ indépendant. Si A et B sont incompatibles et P(A)>0, alors P(A|B)=0 ≠ P(A)."
				},
				{
					t: "h3",
					text: "Dénombrement express"
				},
				{
					t: "formula",
					name: "Permutations, arrangements, combinaisons",
					tex: "n!,\\quad A_n^k=\\frac{n!}{(n-k)!},\\quad \\binom{n}{k}=\\frac{n!}{k!(n-k)!}"
				}
			],
			quiz: [
				{
					id: "s2q1",
					question: "P(A ∪ B) si A et B non disjoints",
					options: [
						"P(A)+P(B)",
						"P(A)+P(B)−P(A∩B)",
						"P(A)P(B)",
						"1−P(A)"
					],
					answer: 1,
					explain: "On retire l’intersection comptée deux fois."
				},
				{
					id: "s2q2",
					question: "Deux événements incompatibles de proba > 0 sont",
					options: [
						"indépendants",
						"non indépendants",
						"sûrs",
						"équiprobables"
					],
					answer: 1,
					explain: "P(A∩B)=0 ≠ P(A)P(B)."
				},
				{
					id: "s2q3",
					question: "Bayes sert à",
					options: [
						"calculer une moyenne",
						"inverser le conditionnement P(cause | effet)",
						"estimer σ",
						"tracer un histogramme"
					],
					answer: 1,
					explain: "Des vraisemblances vers les postérieures."
				},
				{
					id: "s2q4",
					question: "P(A|B) n’est définie que si",
					options: [
						"P(A)>0",
						"P(B)>0",
						"A⊂B",
						"A et B disjoints"
					],
					answer: 1,
					explain: "On divise par P(B)."
				}
			],
			exercises: [{
				id: "s2e1",
				title: "Bayes usine",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "Deux machines : A produit 70 % des pièces (3 % de défauts), B 30 % (5 % de défauts). On tire une pièce défectueuse. P(elle vient de B) ?",
				solution: "P(B|D) = (0,05×0,30) / (0,03×0,70 + 0,05×0,30) = 0,015 / (0,021+0,015) = 0,015/0,036 = 5/12 ≈ 0,417."
			}]
		},
		{
			id: "va",
			title: "Chapitre 3 — Variables aléatoires",
			subtitle: "Espérance, variance, discrète vs continue",
			durationMin: 35,
			objectives: [
				"Passer d’une loi à E et V",
				"Utiliser linéarité",
				"Lire une densité et une fonction de répartition"
			],
			blocks: [
				{
					t: "h2",
					text: "Cas discret",
					id: "disc"
				},
				{
					t: "formula",
					name: "Espérance et variance",
					tex: "E[X]=\\sum x\\,p(x),\\quad V(X)=E[X^2]-(E[X])^2,\\quad E[X^2]=\\sum x^2 p(x)"
				},
				{
					t: "h2",
					text: "Cas continu",
					id: "cont"
				},
				{
					t: "formula",
					name: "Densité f, fonction de répartition F",
					tex: "P(a\\le X\\le b)=\\int_a^b f,\\quad F(x)=P(X\\le x)=\\int_{-\\infty}^x f,\\quad f=F'"
				},
				{
					t: "formula",
					name: "Espérance continue",
					tex: "E[X]=\\int_{-\\infty}^{+\\infty} x f(x)\\,dx"
				},
				{
					t: "p",
					text: "Pour une v.a. continue, $P(X=a)=0$. Donc $P(X\\le a)=P(X<a)$. Ne perds pas de temps à distinguer ≤ et <."
				},
				{
					t: "h2",
					text: "Linéarité — arme fatale",
					id: "lin"
				},
				{
					t: "formula",
					name: "Toujours vraie, même sans indépendance",
					tex: "E[aX+bY+c] = aE[X]+bE[Y]+c"
				},
				{
					t: "formula",
					name: "Variance : attention au covariance",
					tex: "V(aX+b)=a^2 V(X),\\quad V(X+Y)=V(X)+V(Y)+2\\mathrm{Cov}(X,Y)"
				},
				{
					t: "p",
					text: "Si $X\\perp Y$ (indépendants) : $\\mathrm{Cov}=0$ donc $V(X+Y)=V(X)+V(Y)$. La réciproque est **fausse** (non-corrélation ≠ indépendance)."
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce",
					body: "Indicatrice : si $X_i=1$ quand l’épreuve i réussit, $E[\\sum X_i]=\\sum P(X_i=1)$ même corrélés. C’est ainsi qu’on calcule une espérance de dénombrement sans loi explicite."
				},
				{
					t: "formula",
					name: "Inégalité de Bienaymé-Tchebychev",
					tex: "P\\big(|X-\\mu|\\ge k\\sigma\\big) \\le \\frac{1}{k^2}",
					note: "Borne universelle, souvent lâche. Utile quand on ne connaît pas la loi."
				}
			],
			quiz: [
				{
					id: "s3q1",
					question: "E[3X+2] =",
					options: [
						"3E[X]",
						"3E[X]+2",
						"3E[X]+6",
						"E[X]+2"
					],
					answer: 1,
					explain: "Linéarité, constante 2."
				},
				{
					id: "s3q2",
					question: "V(3X+2) =",
					options: [
						"3V(X)+2",
						"9V(X)",
						"9V(X)+2",
						"3V(X)"
					],
					answer: 1,
					explain: "La constante disparaît, le 3 est au carré."
				},
				{
					id: "s3q3",
					question: "Pour X continue, P(X=2) =",
					options: [
						"f(2)",
						"F(2)",
						"0",
						"1"
					],
					answer: 2,
					explain: "Masse nulle en un point."
				},
				{
					id: "s3q4",
					question: "Cov=0 implique-t-il l’indépendance ?",
					options: [
						"oui toujours",
						"non, seulement non-corrélation",
						"oui si discrets",
						"oui si gaussiens… wait c’est un cas particulier"
					],
					answer: 1,
					explain: "En général non. (Le cas gaussien joint est l’exception où non-corrélation ⇔ indépendance — trop fin pour un QCM, la réponse sûre est « non ».)"
				}
			],
			exercises: [{
				id: "s3e1",
				title: "Loi discrète",
				difficulty: "moyen",
				durationMin: 10,
				prompt: "X prend 0,1,2 avec proba 1/2, 1/3, 1/6. Calculer E[X] et V(X).",
				solution: "E[X]=0·1/2 + 1·1/3 + 2·1/6 = 0+1/3+1/3=2/3.\nE[X²]=0+1/3+4/6=1/3+2/3=1.\nV=1−(2/3)²=1−4/9=5/9."
			}]
		},
		{
			id: "lois",
			title: "Chapitre 4 — Lois usuelles",
			subtitle: "Bernoulli, binomiale, Poisson, normale, exponentielle",
			durationMin: 40,
			objectives: [
				"Reconnaître la loi d’après l’énoncé",
				"Connaître E et V par cœur",
				"Passer à la normale centrée réduite"
			],
			blocks: [
				{
					t: "table",
					caption: "Lois discrètes",
					cols: [
						"Loi",
						"Paramètres",
						"E[X]",
						"V(X)",
						"Quand ?"
					],
					rows: [
						[
							"Bernoulli B(p)",
							"p ∈ ]0,1[",
							"p",
							"p(1−p)",
							"succès/échec unique"
						],
						[
							"Binomiale B(n,p)",
							"n, p",
							"np",
							"np(1−p)",
							"n essais indépendants, même p"
						],
						[
							"Poisson P(λ)",
							"λ>0",
							"λ",
							"λ",
							"comptage rare, ou limite binomiale"
						],
						[
							"Géométrique (1er succès)",
							"p",
							"1/p",
							"(1−p)/p²",
							"essais jusqu’au 1er succès"
						]
					]
				},
				{
					t: "table",
					caption: "Lois continues",
					cols: [
						"Loi",
						"Paramètres",
						"E[X]",
						"V(X)",
						"Densité / rôle"
					],
					rows: [
						[
							"Uniforme U[a,b]",
							"a<b",
							"(a+b)/2",
							"(b−a)²/12",
							"f=1/(b−a)"
						],
						[
							"Exponentielle E(λ)",
							"λ>0",
							"1/λ",
							"1/λ²",
							"durée de vie sans mémoire"
						],
						[
							"Normale N(μ,σ²)",
							"μ, σ>0",
							"μ",
							"σ²",
							"cloche, TLC"
						]
					]
				},
				{
					t: "h2",
					text: "Normale — le passage obligé",
					id: "normal"
				},
				{
					t: "formula",
					name: "Centrage-réduction",
					tex: "X\\sim\\mathcal{N}(\\mu,\\sigma^2) \\;\\Rightarrow\\; Z=\\frac{X-\\mu}{\\sigma}\\sim\\mathcal{N}(0,1)"
				},
				{
					t: "p",
					text: "On lit $\\Phi(z)=P(Z\\le z)$ dans la table. Valeurs à connaître : $\\Phi(1{,}96)\\approx 0{,}975$ donc $P(|Z|\\le 1{,}96)=0{,}95$. $\\Phi(1{,}64)\\approx 0{,}95$ (unilatéral 5 %). $\\Phi(2{,}58)\\approx 0{,}995$."
				},
				{
					t: "formula",
					name: "Règle 68-95-99,7",
					tex: "P(|X-\\mu|<\\sigma)\\approx 0{,}68,\\; <2\\sigma \\approx 0{,}95,\\; <3\\sigma \\approx 0{,}997"
				},
				{
					t: "h2",
					text: "Approximations",
					id: "approx"
				},
				{
					t: "ul",
					items: [
						"**Poisson** : $B(n,p)\\approx P(\\lambda=np)$ si $n\\ge 30$, $p\\le 0{,}1$.",
						"**De Moivre-Laplace** : $B(n,p)\\approx N(np, np(1-p))$ si $np$ et $n(1-p)\\ge 5$ (parfois 10).",
						"**Correction de continuité** : $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ si Y est la normale d’approx.",
						"**TLC** : $\\bar{X} \\approx N(\\mu, \\sigma^2/n)$ dès que $n$ est grand ($n\\ge 30$)."
					]
				},
				{
					t: "formula",
					name: "Sans mémoire (exponentielle)",
					tex: "P(X>s+t\\mid X>s)=P(X>t)"
				},
				{
					t: "callout",
					kind: "exam",
					title: "Reconnaître en 10 secondes",
					body: "« n pièces, p défectueuse, X=nombre » → binomiale. « arrivals par heure, moyenne λ » → Poisson. « durée, sans usure » → exp. « mesure = moyenne + bruit » → normale. « pile ou face une fois » → Bernoulli."
				}
			],
			quiz: [
				{
					id: "s4q1",
					question: "E[B(n,p)] =",
					options: [
						"p",
						"np",
						"np(1-p)",
						"n"
					],
					answer: 1,
					explain: "n fois Bernoulli."
				},
				{
					id: "s4q2",
					question: "Pour X~N(10, 4) (variance 4), P(X≤10) =",
					options: [
						"0,05",
						"0,5",
						"0,95",
						"Φ(4)"
					],
					answer: 1,
					explain: "Symétrie autour de μ=10. σ=2 n’intervient pas."
				},
				{
					id: "s4q3",
					question: "Seuil usuel pour un IC à 95 % (normale)",
					options: [
						"1,64",
						"1,96",
						"2,58",
						"3"
					],
					answer: 1,
					explain: "z_{0,025}=1,96."
				},
				{
					id: "s4q4",
					question: "X~P(λ), V(X) =",
					options: [
						"λ²",
						"λ",
						"√λ",
						"1/λ"
					],
					answer: 1,
					explain: "Espérance = variance = λ."
				}
			],
			exercises: [{
				id: "s4e1",
				title: "Centrage",
				difficulty: "moyen",
				durationMin: 10,
				prompt: "X ~ N(50, 16) (σ=4). P(X ≥ 56) en fonction de Φ. Approximation numérique si Φ(1,5)≈0,933.",
				solution: "P(X≥56)=P(Z≥(56-50)/4)=P(Z≥1,5)=1−Φ(1,5)≈1−0,933=0,067."
			}]
		},
		{
			id: "estimation",
			title: "Chapitre 5 — Estimation et intervalles",
			subtitle: "EMV, biais, IC",
			durationMin: 35,
			objectives: [
				"Distinguer estimateur et estimation",
				"Construire un IC pour une moyenne",
				"Savoir quand utiliser t de Student"
			],
			blocks: [
				{
					t: "p",
					text: "Un **estimateur** $\\hat\\theta$ est une v.a. (fonction de l’échantillon). Une **estimation** est sa valeur numérique. Qualités : **sans biais** $E[\\hat\\theta]=\\theta$, **consistant** (converge en proba), **efficace** (petite variance)."
				},
				{
					t: "formula",
					name: "Erreur quadratique moyenne",
					tex: "\\mathrm{EQM}(\\hat\\theta)=V(\\hat\\theta)+\\mathrm{biais}^2"
				},
				{
					t: "h2",
					text: "Intervalle de confiance pour μ (σ connu)",
					id: "ic"
				},
				{
					t: "formula",
					name: "IC de niveau 1−α",
					tex: "\\bar{x} \\pm z_{1-\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}"
				},
				{
					t: "p",
					text: "σ **inconnu**, $n$ grand : on remplace σ par $s$. $n$ petit, population normale : **Student** $t_{n-1}$ :"
				},
				{
					t: "formula",
					name: "IC Student",
					tex: "\\bar{x} \\pm t_{n-1,\\,1-\\alpha/2}\\,\\frac{s}{\\sqrt{n}}"
				},
				{
					t: "h2",
					text: "Proportion",
					id: "prop"
				},
				{
					t: "formula",
					name: "IC pour p (n grand)",
					tex: "\\hat p \\pm z_{1-\\alpha/2}\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
					note: "\\hat p = k/n. Conditions : n p̂ ≥ 5 et n(1-p̂) ≥ 5."
				},
				{
					t: "callout",
					kind: "key",
					title: "Erreur-type",
					body: "Ne dis pas « écart-type de l’échantillon » pour $\\sigma/\\sqrt{n}$. C’est l’**erreur-type de la moyenne**. Plus $n$ croît, plus l’IC se resserre en $1/\\sqrt{n}$ : pour diviser la largeur par 2, il faut **4 fois** plus d’observations."
				},
				{
					t: "example",
					title: "n=100, x̄=12, σ=4, 95 %",
					blocks: [{
						t: "math",
						tex: "12 \\pm 1{,}96\\cdot\\frac{4}{\\sqrt{100}} = 12 \\pm 0{,}784 \\;\\Rightarrow\\; [11{,}22;\\,12{,}78]"
					}]
				}
			],
			quiz: [
				{
					id: "s5q1",
					question: "Un estimateur sans biais vérifie",
					options: [
						"V(θ̂)=0",
						"E[θ̂]=θ",
						"θ̂=θ toujours",
						"n=30"
					],
					answer: 1,
					explain: "Espérance égale au paramètre."
				},
				{
					id: "s5q2",
					question: "Pour quadrupler n, la largeur d’un IC (σ connu) est",
					options: [
						"divisée par 4",
						"divisée par 2",
						"inchangée",
						"multipliée par 2"
					],
					answer: 1,
					explain: "1/√n : ×4 sur n ⇒ /2 sur la largeur."
				},
				{
					id: "s5q3",
					question: "σ inconnu, n=12, population normale : on utilise",
					options: [
						"N(0,1)",
						"t de Student à 11 ddl",
						"Poisson",
						"χ² à 12 ddl"
					],
					answer: 1,
					explain: "ddl = n-1 = 11."
				},
				{
					id: "s5q4",
					question: "z_{1-α/2} pour α=5 %",
					options: [
						"1,64",
						"1,96",
						"2,33",
						"1"
					],
					answer: 1,
					explain: "Bilatéral 95 %."
				}
			],
			exercises: [{
				id: "s5e1",
				title: "IC proportion",
				difficulty: "moyen",
				durationMin: 10,
				prompt: "Sur 200 étudiants, 40 disent réviser C tous les jours. IC à 95 % pour p.",
				solution: "p̂=0,20. z=1,96. se=√(0,2×0,8/200)=√0,0008=0,0283.\nIC = 0,20 ± 1,96×0,0283 = 0,20 ± 0,055 → [0,145 ; 0,255]."
			}]
		},
		{
			id: "tests",
			title: "Chapitre 6 — Tests d’hypothèses",
			subtitle: "H0, H1, α, p-valeur, z et t",
			durationMin: 40,
			objectives: [
				"Poser H0/H1 correctement",
				"Connaître risques α et β",
				"Mener un z-test / t-test / χ² d’indépendance"
			],
			blocks: [
				{
					t: "h2",
					text: "Cadre",
					id: "frame"
				},
				{
					t: "ul",
					items: [
						"$H_0$ : hypothèse **à protéger** (souvent égalité, « pas d’effet »).",
						"$H_1$ : ce qu’on cherche à montrer (bilatéral $\\neq$ ou unilatéral $>$ / $<$).",
						"**Risque de 1re espèce** $\\alpha = P(\\text{rejeter }H_0\\mid H_0\\text{ vraie})$. Seuil usuel 5 %.",
						"**Risque de 2e espèce** $\\beta = P(\\text{accepter }H_0\\mid H_1\\text{ vraie})$. Puissance $=1-\\beta$.",
						"On **ne prouve jamais** $H_0$ ; on échoue à la rejeter."
					]
				},
				{
					t: "callout",
					kind: "warning",
					title: "Formulation de la conclusion",
					body: "« Au seuil 5 %, on rejette H0 : la moyenne diffère significativement de 10. » ou « on ne peut pas rejeter H0 ». Jamais « H0 est vraie »."
				},
				{
					t: "h2",
					text: "z-test d’une moyenne (σ connu)",
					id: "ztest"
				},
				{
					t: "formula",
					name: "Statistique",
					tex: "z_{\\mathrm{obs}} = \\frac{\\bar{x}-\\mu_0}{\\sigma/\\sqrt{n}}"
				},
				{
					t: "p",
					text: "Bilatéral 5 % : on rejette si $|z_{obs}|>1{,}96$. Unilatéral à droite : $z_{obs}>1{,}64$. **p-valeur** = proba, sous $H_0$, d’un résultat au moins aussi extrême. On rejette si p-valeur $<\\alpha$."
				},
				{
					t: "p",
					text: "σ inconnu, n petit : remplacer par $t_{obs}=(\\bar{x}-\\mu_0)/(s/\\sqrt{n})$, comparer à la table Student $n-1$ ddl."
				},
				{
					t: "h2",
					text: "Test d’une proportion",
					id: "ptest"
				},
				{
					t: "formula",
					tex: "z_{\\mathrm{obs}} = \\frac{\\hat p - p_0}{\\sqrt{p_0(1-p_0)/n}}",
					name: "Sous H0 : p = p0"
				},
				{
					t: "h2",
					text: "Khi-deux d’indépendance",
					id: "chi2"
				},
				{
					t: "formula",
					name: "Tableau de contingence",
					tex: "\\chi^2 = \\sum \\frac{(O_{ij}-E_{ij})^2}{E_{ij}},\\quad E_{ij}=\\frac{n_{i\\cdot}n_{\\cdot j}}{n},\\quad ddl=(r-1)(c-1)"
				},
				{
					t: "p",
					text: "$H_0$ : les deux variables qualitatives sont indépendantes. Conditions : $E_{ij}\\ge 5$ (sinon regrouper des classes). Test d’adéquation : même formule, $ddl=k-1-p$ ($p$ paramètres estimés)."
				},
				{
					t: "callout",
					kind: "tip",
					title: "Méthode 6 lignes sur la copie",
					body: "1. H0 / H1. 2. Seuil α. 3. Statistique et loi sous H0. 4. Calcul. 5. Région critique ou p-valeur. 6. Conclusion en une phrase liée à l’énoncé."
				}
			],
			quiz: [
				{
					id: "s6q1",
					question: "α est",
					options: [
						"la puissance",
						"P(rejeter H0 | H0 vraie)",
						"P(accepter H0 | H0 vraie)",
						"la p-valeur"
					],
					answer: 1,
					explain: "Risque de première espèce."
				},
				{
					id: "s6q2",
					question: "On rejette H0 (bilatéral 5 %, σ connu) si",
					options: [
						"|z| < 1,96",
						"|z| > 1,96",
						"z > 0",
						"p > 0,05"
					],
					answer: 1,
					explain: "Hors de l’intervalle de non-rejet."
				},
				{
					id: "s6q3",
					question: "ddl d’un χ² d’indépendance 3×4",
					options: [
						"12",
						"7",
						"6",
						"11"
					],
					answer: 2,
					explain: "(3-1)×(4-1)=6."
				},
				{
					id: "s6q4",
					question: "p-valeur < α signifie",
					options: [
						"on accepte H0",
						"on rejette H0 au seuil α",
						"β est petit",
						"l’échantillon est trop petit"
					],
					answer: 1,
					explain: "Définition opérationnelle du test."
				}
			],
			exercises: [{
				id: "s6e1",
				title: "z-test",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "μ0=10, σ=2, n=25, x̄=10,8. Test bilatéral α=5 % : la moyenne a-t-elle changé ?",
				solution: "z=(10,8-10)/(2/5)=0,8/0,4=2.\n|2|>1,96 → on rejette H0. La moyenne diffère significativement de 10 au seuil 5 %.\n(p = 2(1−Φ(2)) ≈ 0,0456 < 0,05.)"
			}]
		},
		{
			id: "regression",
			title: "Chapitre 7 — Régression linéaire simple",
			subtitle: "Droite des moindres carrés, R², résidus",
			durationMin: 30,
			objectives: [
				"Calculer a et b",
				"Interpréter R²",
				"Ne pas confondre corrélation et causalité"
			],
			blocks: [
				{
					t: "formula",
					name: "Modèle",
					tex: "Y = a + bX + \\varepsilon,\\quad E[\\varepsilon]=0"
				},
				{
					t: "formula",
					name: "Moindres carrés",
					tex: "b = \\frac{\\mathrm{Cov}(x,y)}{s_x^2} = \\frac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sum (x_i-\\bar x)^2},\\quad a=\\bar y - b\\bar x"
				},
				{
					t: "formula",
					name: "Coefficient de corrélation et R²",
					tex: "r = \\frac{\\mathrm{Cov}(x,y)}{s_x s_y} \\in [-1,1],\\quad R^2 = r^2",
					note: "R² = part de variance de Y expliquée par X. R²=0,81 → 81 %."
				},
				{
					t: "p",
					text: "La droite passe par $(\\bar x, \\bar y)$. $b$ = variation moyenne de $Y$ quand $X$ augmente de 1. Résidus $e_i=y_i-\\hat y_i$ : on les veut sans structure (sinon linéarité douteuse)."
				},
				{
					t: "callout",
					kind: "warning",
					title: "Causalité",
					body: "Une forte corrélation n’implique pas que X cause Y (variable cachée, causalité inverse). Phrase attendue du jury."
				},
				{
					t: "ul",
					items: [
						"Hypothèses classiques : linéarité, indépendance des erreurs, homoscédasticité, normalité (pour les tests sur $b$).",
						"Outlier en $x$ = point levier. Il peut basculer $b$.",
						"Régression $Y$ sur $X$ ≠ régression $X$ sur $Y$ (sauf si $|r|=1$)."
					]
				}
			],
			quiz: [
				{
					id: "s7q1",
					question: "La droite des MC passe toujours par",
					options: [
						"(0,0)",
						"(x̄, ȳ)",
						"(0, a)",
						"le mode"
					],
					answer: 1,
					explain: "Conséquence de a = ȳ − b x̄."
				},
				{
					id: "s7q2",
					question: "R² = 0,64 signifie",
					options: [
						"r = 0,64",
						"64 % de la variance de Y est expliquée (et |r|=0,8)",
						"b = 0,64",
						"p-valeur = 0,64"
					],
					answer: 1,
					explain: "R²=r² ⇒ |r|=0,8."
				},
				{
					id: "s7q3",
					question: "b s’interprète comme",
					options: [
						"un pourcentage",
						"la variation de Y pour +1 en X",
						"un écart-type",
						"une p-valeur"
					],
					answer: 1,
					explain: "Pente."
				},
				{
					id: "s7q4",
					question: "r = 0 implique",
					options: [
						"indépendance toujours",
						"pas de liaison linéaire (il peut rester une liaison non linéaire)",
						"a=0",
						"Y constante"
					],
					answer: 1,
					explain: "La corrélation ne capture que le linéaire."
				}
			],
			exercises: [{
				id: "s7e1",
				title: "Pente",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "n=5. x̄=3, ȳ=8, ∑(x−x̄)(y−ȳ)=10, ∑(x−x̄)²=8. Calculer a, b, et ŷ pour x=4.",
				solution: "b=10/8=1,25. a=8−1,25×3=8−3,75=4,25.\nŷ(4)=4,25+1,25×4=9,25."
			}]
		},
		{
			id: "fiche",
			title: "Chapitre 8 — Fiche formules",
			subtitle: "Une page à revoir le vendredi soir",
			durationMin: 20,
			objectives: ["Tout le formulaire utile au concours"],
			blocks: [
				{
					t: "h2",
					text: "Formulaire compact",
					id: "form"
				},
				{
					t: "math",
					tex: "\\bar x=\\frac{\\sum x}{n},\\quad s^2=\\frac{\\sum x^2-n\\bar x^2}{n-1},\\quad P(A\\cup B)=P(A)+P(B)-P(A\\cap B)"
				},
				{
					t: "math",
					tex: "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)},\\quad E[aX+b]=aE[X]+b,\\quad V(aX+b)=a^2V(X)"
				},
				{
					t: "math",
					tex: "B(n,p):\\ np,\\ np(1-p)\\qquad P(\\lambda):\\ \\lambda,\\lambda \\qquad \\mathcal N(\\mu,\\sigma^2):\\ Z=\\frac{X-\\mu}{\\sigma}"
				},
				{
					t: "math",
					tex: "IC:\\ \\bar x\\pm z\\frac{\\sigma}{\\sqrt n}\\qquad z_{test}=\\frac{\\bar x-\\mu_0}{\\sigma/\\sqrt n}\\qquad b=\\frac{\\mathrm{Cov}}{s_x^2},\\ R^2=r^2"
				},
				{
					t: "h2",
					text: "Valeurs numériques à connaître",
					id: "vals"
				},
				{
					t: "table",
					cols: ["Quantile", "Valeur"],
					rows: [
						["z_{0,90} (unilat. 5 % à gauche… wait) Φ(1,64)≈0,95", "1,64"],
						["z_{0,975}  (bilatéral 5 %)", "1,96"],
						["z_{0,995}  (bilatéral 1 %)", "2,58"],
						["Φ(1)≈0,84  Φ(2)≈0,977", "règle 68-95"]
					]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Stratégie épreuve",
					body: "Les QCM de lois et de formules d’abord. Un Bayes ensuite (points sûrs si tu poses les 3 nombres). Les tests : écris H0/H1 même si le calcul dérape — le cadre est noté. Régression : calcule b avant a."
				}
			],
			quiz: [
				{
					id: "s8q1",
					question: "Erreur-type de x̄",
					options: [
						"σ",
						"σ/n",
						"σ/√n",
						"s²"
					],
					answer: 2,
					explain: "Écart-type de la moyenne empirique."
				},
				{
					id: "s8q2",
					question: "V(X+Y) si X,Y indépendants",
					options: [
						"V(X)+V(Y)+2Cov",
						"V(X)+V(Y)",
						"V(X)V(Y)",
						"(V(X)+V(Y))²"
					],
					answer: 1,
					explain: "Cov=0."
				},
				{
					id: "s8q3",
					question: "n pour diviser par 2 la largeur d’un IC",
					options: [
						"×2",
						"×4",
						"×√2",
						"/2"
					],
					answer: 1,
					explain: "Largeur ∝ 1/√n."
				},
				{
					id: "s8q4",
					question: "Loi de (X−μ)/(σ/√n) si X̄ moyenne i.i.d. normales, σ connu",
					options: [
						"t_{n-1}",
						"N(0,1)",
						"χ²",
						"P(λ)"
					],
					answer: 1,
					explain: "C’est le z."
				}
			],
			exercises: [{
				id: "s8e1",
				title: "Enchaînement",
				difficulty: "difficile",
				durationMin: 15,
				prompt: "Notes ~ N(μ, σ=4). n=16, x̄=13. IC 95 % pour μ. Puis tester H0: μ=12 contre H1: μ≠12 à 5 %.",
				solution: "IC: 13 ± 1,96×4/4 = 13 ± 1,96 → [11,04 ; 14,96].\nz=(13-12)/(4/4)=1. |1|<1,96 : on ne rejette pas H0.\nCohérent : 12 est dans l’IC."
			}]
		}
	]
};
var archi = {
	id: "archi",
	short: "Archi / SE",
	title: "Architecture des ordinateurs et système d’exploitation",
	color: "archi",
	description: "Représentation de l’information, CPU, mémoire, processus, ordonnancement, mémoire virtuelle et synchronisation.",
	examFocus: "Conversions binaire/hexa, complément à 2, hiérarchie mémoire (AMAT, cache), processus vs threads, calculs d’ordonnancement (attente, rotation), pagination et sémaphores.",
	learn: [
		"Binaire, hexa, complément à deux, flottants (idée)",
		"Modèle de von Neumann, cycle fetch-decode-execute",
		"Cache et AMAT",
		"Processus, threads, états",
		"Ordonnancement CPU (FCFS, SJF, RR, priorité)",
		"Mémoire virtuelle, pagination, TLB",
		"Synchronisation et interblocages"
	],
	tips: [
		"Complément à 2 : inverser les bits + 1. Le bit de poids fort = signe.",
		"AMAT = T_hit + miss_rate × T_miss. Toujours écrire la formule avant les nombres.",
		"Processus = ressource + espace d’adressage ; thread = chemin d’exécution partagé.",
		"RR : quantum trop petit = trop de commutations ; trop grand ≈ FCFS.",
		"Adresse virtuelle = n° de page + déplacement. TLB miss ≠ page fault.",
		"Interblocage : 4 conditions de Coffman, graphe d’allocation."
	],
	chapters: [
		{
			id: "representation",
			title: "Chapitre 1 — Représentation de l’information",
			subtitle: "Bases, complément à 2, hexa",
			durationMin: 35,
			objectives: [
				"Convertir décimal ↔ binaire ↔ hexa",
				"Coder un entier signé en complément à 2",
				"Comprendre un débordement"
			],
			blocks: [
				{
					t: "h2",
					text: "Bases",
					id: "bases"
				},
				{
					t: "formula",
					name: "Poids",
					tex: "n = \\sum_{k} d_k b^k \\quad (b=2, 8, 10, 16)"
				},
				{
					t: "p",
					text: "Hexa : 4 bits = 1 chiffre hexa. D’où conversions **par paquets de 4 bits**. `0xA3 = 1010 0011`. Octal : paquets de 3 bits."
				},
				{
					t: "example",
					title: "42 en binaire et hexa",
					blocks: [{
						t: "p",
						text: "42 = 32+8+2 = `101010`₂ = `2A`₁₆. Méthode : divisions successives par 2, restes lus à l’envers : 42→21 r0, 10 r1, 5 r0, 2 r1, 1 r0, 0 r1 → 101010."
					}]
				},
				{
					t: "h2",
					text: "Entiers signés — complément à 2",
					id: "c2"
				},
				{
					t: "p",
					text: "Sur $n$ bits, on représente $[-2^{n-1};\\, 2^{n-1}-1]$. Exemple 8 bits : $[-128; 127]$. Le bit de poids fort (MSB) vaut $-2^{n-1}$."
				},
				{
					t: "ol",
					items: [
						"Pour +k : écrire k en binaire, padder à n bits.",
						"Pour −k : prendre +k, **inverser tous les bits**, **ajouter 1**.",
						"Ou : $−k \\equiv 2^n - k \\pmod{2^n}$."
					]
				},
				{
					t: "example",
					title: "−5 sur 8 bits",
					blocks: [{
						t: "p",
						text: "+5 = `00000101`. Inverse `11111010`. +1 → `11111011`. Vérification : $−128 + 64+32+16+8+2+1 = −128+123 = −5$."
					}]
				},
				{
					t: "callout",
					kind: "exam",
					title: "Overflow",
					body: "127+1 sur 8 bits signés → −128. Ce n’est pas une erreur du processeur : le bit de retenue sort. En C, l’overflow **signé** est undefined behavior ; non signé il est modulo $2^n$."
				},
				{
					t: "h3",
					text: "Flottants (idée IEEE 754)"
				},
				{
					t: "formula",
					name: "simple précision 32 bits",
					tex: "(-1)^s \\times 1{,}m \\times 2^{e-127}",
					note: "1 bit de signe, 8 d’exposant (biais 127), 23 de mantisse. Tu dois savoir que 0,1 n’est pas exact en binaire."
				}
			],
			quiz: [
				{
					id: "h1q1",
					question: "0xF vaut en décimal",
					options: [
						"15",
						"16",
						"8",
						"255"
					],
					answer: 0,
					explain: "F = 15. 0xFF = 255."
				},
				{
					id: "h1q2",
					question: "Sur 8 bits signés, la plus petite valeur est",
					options: [
						"−255",
						"−127",
						"−128",
						"−256"
					],
					answer: 2,
					explain: "−2^{7} = −128."
				},
				{
					id: "h1q3",
					question: "Pour coder −1 en complément à 2 sur 8 bits",
					options: [
						"10000001",
						"11111111",
						"00000001",
						"10000000"
					],
					answer: 1,
					explain: "Tous les bits à 1. +1 + (−1) = 0 (retenue ignorée)."
				},
				{
					id: "h1q4",
					question: "4 bits = combien de chiffres hexa ?",
					options: [
						"2",
						"1",
						"4",
						"8"
					],
					answer: 1,
					explain: "Un nibble = un chiffre hexa."
				}
			],
			exercises: [{
				id: "h1e1",
				title: "Conversions",
				difficulty: "facile",
				durationMin: 10,
				prompt: "Convertir 100 en binaire et hexa. Coder −18 sur 8 bits (complément à 2).",
				solution: "100 = 64+32+4 = 1100100₂ = 64₁₆.\n+18 = 00010010. Inverse 11101101. +1 → 11101110."
			}]
		},
		{
			id: "cpu",
			title: "Chapitre 2 — Architecture du processeur",
			subtitle: "von Neumann, registres, pipeline",
			durationMin: 30,
			objectives: [
				"Citer les composants du modèle de von Neumann",
				"Décrire le cycle d’instruction",
				"Comprendre le pipeline et un aléa"
			],
			blocks: [
				{
					t: "h2",
					text: "Von Neumann",
					id: "vn"
				},
				{
					t: "ul",
					items: [
						"**CPU** : UAL (ALU) + unité de contrôle + registres.",
						"**Mémoire unique** instructions + données (vs Harvard : 2 bus).",
						"**Bus** : adresses, données, contrôle.",
						"Goulot : le bus unique (von Neumann bottleneck)."
					]
				},
				{
					t: "h2",
					text: "Cycle fetch–decode–execute",
					id: "fde"
				},
				{
					t: "ol",
					items: [
						"**Fetch** : PC → adresse, instruction lue, PC += taille.",
						"**Decode** : l’unité de contrôle interprète l’opcode, sélectionne les registres.",
						"**Execute** : ALU, accès mémoire (load/store), branchement (modifie PC).",
						"**Write-back** : résultat écrit dans un registre."
					]
				},
				{
					t: "p",
					text: "Registres clés : **PC** (program counter), **IR** (instruction register), **SP** (stack pointer), banc de registres généraux. Un registre est $O(1)$ et très cher/rapide ; la RAM est grande et lente."
				},
				{
					t: "h2",
					text: "Pipeline",
					id: "pipe"
				},
				{
					t: "p",
					text: "Découper le cycle en étages (ex. 5 : IF ID EX MEM WB) pour n’en finir **une instruction par cycle** en régime (idéal). Accélération théorique ≈ nombre d’étages, limitée par :"
				},
				{
					t: "ul",
					items: [
						"**Aléa de données** : une instruction a besoin du résultat de la précédente → forwarding ou stall.",
						"**Aléa de contrôle** : branchement, le pipeline a déjà fetché le mauvais chemin → flush + predication/prédicteur.",
						"**Aléa de structure** : deux étages veulent la même ressource."
					]
				},
				{
					t: "formula",
					name: "CPI et temps CPU",
					tex: "T = N_{\\mathrm{instr}} \\times \\mathrm{CPI} \\times T_{\\mathrm{clock}}",
					note: "RISC vise CPI proche de 1. Un cache miss ou un mispredict augmente le CPI."
				}
			],
			quiz: [
				{
					id: "h2q1",
					question: "Le PC contient",
					options: [
						"la dernière donnée ALU",
						"l’adresse de la prochaine instruction",
						"le sommet de pile seulement",
						"le code condition"
					],
					answer: 1,
					explain: "Program Counter."
				},
				{
					id: "h2q2",
					question: "Harvard vs von Neumann",
					options: [
						"identique",
						"Harvard sépare mémoires / bus instructions et données",
						"Harvard n’a pas d’ALU",
						"von Neumann n’a pas de registres"
					],
					answer: 1,
					explain: "Les microcontrôleurs et les caches L1 I/D s’en inspirent."
				},
				{
					id: "h2q3",
					question: "Un pipeline à 5 étages, idéalement, produit",
					options: [
						"5 instructions / cycle",
						"1 instruction / cycle en régime",
						"CPI=5",
						"0 aléa"
					],
					answer: 1,
					explain: "Débit 1, latence 5 cycles."
				},
				{
					id: "h2q4",
					question: "Un branchement mal prédit provoque",
					options: [
						"un page fault",
						"un flush du pipeline (aléa de contrôle)",
						"un overflow",
						"un deadlock"
					],
					answer: 1,
					explain: "Les instructions déjà fetchées du mauvais chemin sont annulées."
				}
			],
			exercises: [{
				id: "h2e1",
				title: "Temps CPU",
				difficulty: "moyen",
				durationMin: 8,
				prompt: "1,2×10⁹ instructions, CPI=1,5, horloge 2 GHz. Temps d’exécution ?",
				solution: "T = 1,2e9 × 1,5 / 2e9 = 1,8e9 / 2e9 = 0,9 s."
			}]
		},
		{
			id: "cache",
			title: "Chapitre 3 — Hiérarchie mémoire et cache",
			subtitle: "Localité, mapping, AMAT",
			durationMin: 40,
			objectives: [
				"Exploiter localité temporelle / spatiale",
				"Distinguer direct-mapped / associatif / ensemble-associatif",
				"Calculer AMAT et un write-back vs write-through"
			],
			blocks: [
				{
					t: "p",
					text: "Pyramide : registres ⊂ L1 ⊂ L2 ⊂ L3 ⊂ RAM ⊂ SSD ⊂ disque. Plus on descend, plus c’est **grand, lent, pas cher**. Le cache mise sur la **localité**."
				},
				{
					t: "ul",
					items: [
						"**Temporelle** : une adresse accédée le sera bientôt (boucle).",
						"**Spatiale** : les adresses voisines aussi (tableau).",
						"D’où des **lignes / blocs** de cache (ex. 64 octets), pas un octet isolé."
					]
				},
				{
					t: "h2",
					text: "Placement d’un bloc",
					id: "map"
				},
				{
					t: "table",
					cols: [
						"Politique",
						"Où va le bloc",
						"Conflit"
					],
					rows: [
						[
							"Correspondance directe",
							"1 seule ligne : i = (n°bloc) mod (nLignes)",
							"élevé"
						],
						[
							"Entièrement associatif",
							"n’importe quelle ligne",
							"faible, comparateurs chers"
						],
						[
							"Associatif par ensembles (k-ways)",
							"dans 1 ensemble, k lignes au choix",
							"compromis"
						]
					]
				},
				{
					t: "p",
					text: "Adresse : `[ tag | index | offset ]`. offset = $\\log_2(\\text{taille de ligne})$. index = $\\log_2(\\text{nombres d’ensembles})$. Le tag identifie le bloc."
				},
				{
					t: "formula",
					name: "AMAT (Average Memory Access Time)",
					tex: "\\mathrm{AMAT} = T_{\\mathrm{hit}} + m \\cdot T_{\\mathrm{miss}}",
					note: "m = miss rate. On peut chaîner : miss L1 → L2, etc. T_miss L1 = AMAT L2."
				},
				{
					t: "example",
					title: "L1 : hit 1 ns, miss 5 %, RAM 70 ns",
					blocks: [{
						t: "math",
						tex: "\\mathrm{AMAT} = 1 + 0{,}05\\times 70 = 4{,}5\\ \\mathrm{ns}"
					}, {
						t: "p",
						text: "Sans cache : 70 ns. Avec : 4,5 ns. Gain énorme même avec 5 % de miss. Un miss rate de 1 % donne 1,7 ns."
					}]
				},
				{
					t: "h3",
					text: "Écritures et remplacement"
				},
				{
					t: "ul",
					items: [
						"**Write-through** : écrit cache + mémoire. Simple, plus de trafic.",
						"**Write-back** : écrit le cache, bit dirty ; recopie à l’éviction.",
						"**Write-allocate** vs no-write-allocate sur miss d’écriture.",
						"Remplacement : LRU (souvent), FIFO, aléatoire. LRU parfait est coûteux → pseudo-LRU."
					]
				},
				{
					t: "callout",
					kind: "tip",
					title: "Astuce calcul",
					body: "Taille cache = nEnsembles × k (associativité) × tailleLigne. Toujours vérifier l’unité (Ko = 1024 octets, parfois 1000 au jury — précise 2¹⁰)."
				}
			],
			quiz: [
				{
					id: "h3q1",
					question: "AMAT =",
					options: [
						"T_hit × m",
						"T_hit + m T_miss",
						"T_miss / m",
						"CPI"
					],
					answer: 1,
					explain: "Formule de base."
				},
				{
					id: "h3q2",
					question: "En direct-mapped, deux blocs qui tombent sur la même ligne",
					options: [
						"cohabitent",
						"se chassent (conflit)",
						"vont en RAM seulement",
						"fusionnent"
					],
					answer: 1,
					explain: "Conflict miss."
				},
				{
					id: "h3q3",
					question: "La localité spatiale justifie",
					options: [
						"des registres de 1 bit",
						"des lignes de cache de plusieurs octets",
						"le swap",
						"RR"
					],
					answer: 1,
					explain: "On amène les voisins."
				},
				{
					id: "h3q4",
					question: "Write-back écrit en mémoire",
					options: [
						"à chaque store",
						"à l’éviction d’une ligne dirty",
						"jamais",
						"au boot"
					],
					answer: 1,
					explain: "Le bit dirty décide."
				}
			],
			exercises: [{
				id: "h3e1",
				title: "AMAT à deux niveaux",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "L1 : 1 ns, miss 4 %. L2 : 10 ns, miss 20 % (des misses L1). RAM : 80 ns. AMAT ?",
				hint: "AMAT = T_L1 + m1 (T_L2 + m2 T_RAM)",
				solution: "AMAT = 1 + 0,04 × (10 + 0,20×80) = 1 + 0,04×(10+16) = 1 + 0,04×26 = 1 + 1,04 = 2,04 ns."
			}]
		},
		{
			id: "processus",
			title: "Chapitre 4 — Processus et threads",
			subtitle: "PCB, états, commutation, user/kernel",
			durationMin: 30,
			objectives: [
				"Distinguer processus et thread",
				"Dessiner le graphe d’états",
				"Comprendre un context switch"
			],
			blocks: [
				{
					t: "h2",
					text: "Processus",
					id: "proc"
				},
				{
					t: "p",
					text: "Un processus est un **programme en exécution** : code, données, heap, pile, fichiers ouverts, registres, PID. Le **PCB** (process control block) stocke cet état pour le noyau."
				},
				{
					t: "p",
					text: "États classiques : **new → ready → running → terminated**. De running : **blocked/waiting** (I/O, sem_wait) puis retour ready. **Preempted** : running → ready (fin de quantum)."
				},
				{
					t: "h2",
					text: "Threads",
					id: "thr"
				},
				{
					t: "ul",
					items: [
						"Plusieurs threads d’un même processus **partagent** l’espace d’adressage, les fichiers, le code.",
						"Chacun a sa **pile**, ses registres, son PC.",
						"Création / commutation d’un thread ≪ d’un processus (pas de changement d’espace d’adressage).",
						"Un bug (ex. *p = 0 sauvage) peut corrompre tous les threads du processus.",
						"User-level vs kernel-level threads (modèles 1:1, N:1, M:N)."
					]
				},
				{
					t: "callout",
					kind: "key",
					title: "Concurrence vs parallélisme",
					body: "Concurrence : plusieurs tâches en cours (entrelacement, 1 cœur). Parallélisme : simultanées (plusieurs cœurs). On peut être concurrent sans être parallèle."
				},
				{
					t: "h2",
					text: "Appels système et modes",
					id: "sys"
				},
				{
					t: "p",
					text: "**User mode** vs **kernel mode**. Un syscall (read, fork, ioctl) trap vers le noyau. `fork()` duplique le processus (copie à l’écriture). `exec` remplace l’image. `wait` attend un fils. `exit` termine."
				},
				{
					t: "p",
					text: "Commutation de contexte : sauver registres + PC + état mémoire (tables de pages) du running, restaurer ceux du next. Coût : microsecondes, plus le cache/TLB cold."
				}
			],
			quiz: [
				{
					id: "h4q1",
					question: "Les threads d’un processus partagent",
					options: [
						"leurs piles",
						"l’espace d’adressage",
						"leurs PC",
						"rien"
					],
					answer: 1,
					explain: "Code + heap + fichiers. Pile et registres sont privés."
				},
				{
					id: "h4q2",
					question: "Un processus en attente d’I/O est",
					options: [
						"running",
						"ready",
						"blocked / waiting",
						"zombie forcément"
					],
					answer: 2,
					explain: "Il ne peut pas tourner tant que l’I/O n’est pas finie."
				},
				{
					id: "h4q3",
					question: "fork() retourne",
					options: [
						"toujours 0",
						"0 dans le fils, PID du fils dans le père",
						"PID du père dans les deux",
						"rien"
					],
					answer: 1,
					explain: "Classique Unix."
				},
				{
					id: "h4q4",
					question: "Un context switch est plus lourd pour",
					options: [
						"deux threads du même processus",
						"deux processus",
						"deux registres",
						"le cache L1 seulement"
					],
					answer: 1,
					explain: "Changement d’espace d’adressage + TLB."
				}
			],
			exercises: [{
				id: "h4e1",
				title: "fork",
				difficulty: "moyen",
				durationMin: 8,
				prompt: "Combien de fois « X » s’affiche ? printf(\"X\"); fork(); fork();",
				solution: "Le printf est AVANT les fork → 1 seule fois « X ».\nSi printf était après les 2 fork : 4 processus, 4 X.\n(Attention au buffering : sans \\n, un fork peut dupliquer le buffer — piège avancé.)"
			}]
		},
		{
			id: "ordonnancement",
			title: "Chapitre 5 — Ordonnancement CPU",
			subtitle: "FCFS, SJF, SRTF, priorité, Round Robin",
			durationMin: 40,
			objectives: [
				"Calculer attente et rotation",
				"Comparer les politiques",
				"Choisir un quantum"
			],
			blocks: [
				{
					t: "formula",
					name: "Métriques",
					tex: "T_{\\mathrm{rotation}} = T_{\\mathrm{fin}} - T_{\\mathrm{arrivée}},\\quad T_{\\mathrm{attente}} = T_{\\mathrm{rotation}} - T_{\\mathrm{CPU}}",
					note: "Turnaround = waiting + burst (+ I/O). Le jury demande souvent les moyennes."
				},
				{
					t: "table",
					cols: [
						"Algo",
						"Principe",
						"Préemptif ?",
						"Risque"
					],
					rows: [
						[
							"FCFS / FIFO",
							"ordre d’arrivée",
							"non",
							"effet convoi (un long bloque les courts)"
						],
						[
							"SJF",
							"plus court burst d’abord",
							"non",
							"famine des longs ; burst à estimer"
						],
						[
							"SRTF",
							"SJF préemptif",
							"oui",
							"idem + overhead"
						],
						[
							"Priorité",
							"plus haute priorité d’abord",
							"souvent oui",
							"famine → aging"
						],
						[
							"Round Robin",
							"quantum q, file circulaire",
							"oui",
							"q trop petit : overhead ; trop grand ≈ FCFS"
						]
					]
				},
				{
					t: "example",
					title: "Trois processus — FCFS",
					blocks: [
						{
							t: "p",
							text: "Arrivés à t=0. Bursts : P1=24, P2=3, P3=3. Ordre P1,P2,P3."
						},
						{
							t: "p",
							text: "Fins : 24, 27, 30. Attentes : 0, 24, 27. Attente moyenne = $51/3=17$. Rotation moyenne = $(24+27+30)/3=27$."
						},
						{
							t: "p",
							text: "SJF : P2, P3, P1. Attentes 0, 3, 6. Moyenne **3**. D’où l’intérêt de SJF (mais on ne connaît pas toujours le burst)."
						}
					]
				},
				{
					t: "h2",
					text: "Round Robin",
					id: "rr"
				},
				{
					t: "p",
					text: "File ready FIFO. Quantum $q$. Si le burst restant $> q$, préemption et retour en queue. Diagramme de Gantt : découpe en tranches de $q$."
				},
				{
					t: "callout",
					kind: "exam",
					title: "Méthode Gantt",
					body: "1. Table : PID, arrivée, burst restant. 2. Axe du temps. 3. À chaque date, choisir selon la politique (en RR : tête de file). 4. Déduire fin, attente, rotation. 5. Moyennes. **Montre le Gantt** — il est noté."
				},
				{
					t: "p",
					text: "Multiniveau : files (système, interactif, batch) avec algos différents, parfois aging pour éviter la famine. Completely Fair Scheduler (Linux) : hors programme détaillé, mais « équité / vruntime » se cite."
				}
			],
			quiz: [
				{
					id: "h5q1",
					question: "L’effet convoi est typique de",
					options: [
						"SJF",
						"FCFS",
						"RR q→0",
						"priorité avec aging"
					],
					answer: 1,
					explain: "Un long en tête bloque les courts."
				},
				{
					id: "h5q2",
					question: "SRTF est",
					options: [
						"FCFS préemptif",
						"SJF préemptif",
						"RR sans quantum",
						"non préemptif"
					],
					answer: 1,
					explain: "Shortest Remaining Time First."
				},
				{
					id: "h5q3",
					question: "Si le quantum RR tend vers l’infini",
					options: [
						"on obtient SJF",
						"on obtient FCFS",
						"famine garantie",
						"CPI=0"
					],
					answer: 1,
					explain: "Plus de préemption."
				},
				{
					id: "h5q4",
					question: "T_attente =",
					options: [
						"T_fin − T_arrivée",
						"T_rotation − T_CPU",
						"T_CPU − T_arrivée",
						"quantum"
					],
					answer: 1,
					explain: "Temps passé dans ready (et éventuellement blocked, selon l’énoncé)."
				}
			],
			exercises: [{
				id: "h5e1",
				title: "Gantt RR",
				difficulty: "difficile",
				durationMin: 18,
				prompt: "P1, P2, P3 arrivent à 0, bursts 5, 3, 8. RR q=4. Dessiner le Gantt, attentes et rotations.",
				solution: "Ordre : P1(4) P2(3) P3(4) P1(1 restant) P3(4 restants).\nGantt : 0-4 P1, 4-7 P2, 7-11 P3, 11-12 P1, 12-16 P3.\nFins : P1=12, P2=7, P3=16.\nRotation : 12, 7, 16 (moy 11,67). Attente = rot − burst : 7, 4, 8 (moy 6,33)."
			}]
		},
		{
			id: "virtuelle",
			title: "Chapitre 6 — Mémoire virtuelle",
			subtitle: "Pagination, TLB, remplacement de pages",
			durationMin: 35,
			objectives: [
				"Traduire une adresse virtuelle",
				"Distinguer TLB miss et page fault",
				"Appliquer FIFO / LRU / Optimal"
			],
			blocks: [
				{
					t: "p",
					text: "Chaque processus voit un **espace virtuel** contigu. Le matériel + OS traduisent vers la **physique** fragmentée. Avantages : isolation, relocation, plus d’adresses que de RAM (swap)."
				},
				{
					t: "h2",
					text: "Pagination",
					id: "page"
				},
				{
					t: "formula",
					name: "Découpage",
					tex: "\\text{adresse virtuelle} = (\\text{n° page},\\ \\text{offset}),\\quad |\\text{offset}| = \\log_2(\\text{taille page})"
				},
				{
					t: "p",
					text: "Table des pages : entrée = frame (+ bits valid, dirty, referenced, protection). **Page fault** : valid=0 → OS charge depuis le disque, éventuellement évince une victime."
				},
				{
					t: "example",
					title: "Pages de 4 Ko, adresse 32 bits",
					blocks: [{
						t: "p",
						text: "offset = 12 bits ($2^{12}=4096$). n° de page = 20 bits → $2^{20}$ pages. Table à 1 Mo d’entrées : d’où tables **multi-niveaux** et/ou table inversée."
					}]
				},
				{
					t: "h2",
					text: "TLB",
					id: "tlb"
				},
				{
					t: "p",
					text: "Le **TLB** est un cache associatif des traductions récentes. Hit : 1 accès mémoire (données). Miss : consulter la table (1+ accès) puis le cache de données. **Page fault** : la page n’est pas en RAM — bien plus cher (disque, ms vs ns)."
				},
				{
					t: "callout",
					kind: "warning",
					title: "Ne pas confondre",
					body: "TLB miss ≠ page fault. On peut rater le TLB alors que la page est en mémoire (il suffit de recharger l’entrée). Un page fault implique souvent un TLB miss, pas l’inverse."
				},
				{
					t: "h2",
					text: "Remplacement de pages",
					id: "repl"
				},
				{
					t: "ul",
					items: [
						"**Optimal** (Belady) : évince la page utilisée le plus tard — irréaliste (oracle), borne inférieure.",
						"**FIFO** : simple, **anomalie de Belady** (plus de frames peut augmenter les faults !).",
						"**LRU** : évince la moins récemment utilisée — bon, coûteux à l’exact.",
						"**Clock / seconde chance** : approximation LRU (bit referenced).",
						"**Working set / thrashing** : trop de faults, le système ne fait plus que pager. Solution : moins de processus (multiprogrammation), plus de RAM."
					]
				}
			],
			quiz: [
				{
					id: "h6q1",
					question: "Taille de page 8 Ko : bits d’offset",
					options: [
						"8",
						"12",
						"13",
						"16"
					],
					answer: 2,
					explain: "2^13 = 8192."
				},
				{
					id: "h6q2",
					question: "Un TLB miss avec bit valid=1 entraîne",
					options: [
						"un aller disque",
						"une lecture de la table des pages (page déjà en RAM)",
						"un kill du processus",
						"un deadlock"
					],
					answer: 1,
					explain: "Juste une traduction pas en cache."
				},
				{
					id: "h6q3",
					question: "L’anomalie de Belady concerne",
					options: [
						"LRU",
						"FIFO",
						"Optimal",
						"Clock toujours"
					],
					answer: 1,
					explain: "FIFO n’est pas stack algorithm."
				},
				{
					id: "h6q4",
					question: "Le thrashing c’est",
					options: [
						"un pipeline flush",
						"un trop grand nombre de page faults (le CPU attend le disque)",
						"un quantum trop petit",
						"un overflow"
					],
					answer: 1,
					explain: "Working set ne tient plus en RAM."
				}
			],
			exercises: [{
				id: "h6e1",
				title: "FIFO vs LRU",
				difficulty: "moyen",
				durationMin: 15,
				prompt: "3 frames. Références : 1 2 3 4 1 2 5 1 2. Compter les page faults FIFO et LRU (frames vides au départ, chaque premier chargement = fault).",
				solution: "FIFO faults : 1,2,3,4,1,2,5 → souvent 9 ou 7 selon le décompte des 1,2 finaux (après 5 : frames 5,1,2 déjà ?).\nTrace FIFO (victim = plus ancienne) :\n1 : [1] f\n2 : [1,2] f\n3 : [1,2,3] f\n4 : [4,2,3] f\n1 : [4,1,3] f\n2 : [4,1,2] f\n5 : [5,1,2] f\n1 : hit\n2 : hit\n→ 7 faults.\nLRU : 1,2,3,4,1,2,5,1,2 → 7 faults aussi sur cet exemple (4,1,2 puis 5,1,2). Sur d’autres traces LRU gagne. Le jury veut la TRACE, pas le chiffre magique."
			}]
		},
		{
			id: "sync",
			title: "Chapitre 7 — Synchronisation et fichiers",
			subtitle: "Race, mutex, sémaphores, deadlock, I/O",
			durationMin: 35,
			objectives: [
				"Identifier une data race",
				"Utiliser mutex et sémaphore (P/V)",
				"Énoncer Coffman et un schéma d’évitement"
			],
			blocks: [
				{
					t: "h2",
					text: "Section critique",
					id: "cs"
				},
				{
					t: "p",
					text: "Une **data race** : deux threads accèdent à la même variable, au moins un écrit, sans synchro. Conséquence : résultats non déterministes (`count++` n’est pas atomique : load-add-store)."
				},
				{
					t: "ul",
					items: [
						"**Exclusion mutuelle** : au plus un thread dans la SC.",
						"**Progression** : la décision de qui entre ne peut pas être reportée indéfiniment.",
						"**Attente bornée** : pas de famine.",
						"Outils : mutex / lock, sémaphore, moniteur, spinlock (attente active, courte SC)."
					]
				},
				{
					t: "h2",
					text: "Sémaphores (Dijkstra)",
					id: "sem"
				},
				{
					t: "p",
					text: "`P` (wait, down) : si S>0, S−− ; sinon bloquer. `V` (signal, up) : S++ et réveiller un attendant. Mutex = sémaphore initialisé à 1. Producteur-consommateur : sémaphores `empty`, `full`, `mutex`."
				},
				{
					t: "code",
					lang: "c",
					title: "Producteur (esquisse)",
					code: "P(empty);\nP(mutex);\n/* deposer */\nV(mutex);\nV(full);"
				},
				{
					t: "h2",
					text: "Interblocage (deadlock)",
					id: "dl"
				},
				{
					t: "p",
					text: "Quatre conditions de **Coffman** (toutes nécessaires) : exclusion mutuelle, détention et attente, non-préemption, attente circulaire. Pour l’éviter : casser une condition (ordonner les locks, allouer tout d’un coup, préempter)."
				},
				{
					t: "p",
					text: "Graphe d’allocation : processus et ressources. Un **cycle** (ressources à 1 exemplaire) ⇒ deadlock. Détection + reprise (kill, rollback) vs prévention vs évitement (banquier — idée : ne jamais entrer dans un état unsafe)."
				},
				{
					t: "callout",
					kind: "exam",
					title: "Starvation vs deadlock",
					body: "Deadlock : personne n’avance (cycle). Starvation : quelqu’un n’avance jamais, les autres oui (priorité sans aging). Un livelock : tout le monde « s’agite » sans progresser (politesse infinie)."
				},
				{
					t: "h2",
					text: "Fichiers et I/O — l’essentiel",
					id: "fs"
				},
				{
					t: "ul",
					items: [
						"Fichier = flux d’octets + métadonnées (inode : taille, droits, pointeurs de blocs).",
						"Répertoire : table nom → inode.",
						"Méthodes d’allocation : contiguë, chaînée, indexée (inode Unix).",
						"Appels : open/read/write/close, lseek. Buffer cache du noyau.",
						"I/O programmée vs interruptions vs DMA (le DMA libère le CPU)."
					]
				}
			],
			quiz: [
				{
					id: "h7q1",
					question: "Un mutex est un sémaphore initialisé à",
					options: [
						"0",
						"1",
						"n",
						"−1"
					],
					answer: 1,
					explain: "Binaire, une seule entrée."
				},
				{
					id: "h7q2",
					question: "Les 4 conditions de Coffman sont",
					options: [
						"nécessaires au deadlock (toutes présentes)",
						"suffisantes même une seule",
						"des algos d’ordonnancement",
						"des bits de page"
					],
					answer: 0,
					explain: "Les 4 simultanément."
				},
				{
					id: "h7q3",
					question: "count++ sans lock, 2 threads :",
					options: [
						"toujours correct",
						"data race (non atomique)",
						"deadlock",
						"page fault"
					],
					answer: 1,
					explain: "Lecture-modif-écriture."
				},
				{
					id: "h7q4",
					question: "Le DMA sert à",
					options: [
						"traduire les adresses",
						"transférer I/O ↔ RAM sans occuper le CPU à copier chaque octet",
						"ordonnancer RR",
						"compiler"
					],
					answer: 1,
					explain: "Direct Memory Access."
				}
			],
			exercises: [{
				id: "h7e1",
				title: "Coffman",
				difficulty: "facile",
				durationMin: 8,
				prompt: "Deux processus, chacun détient un lock et attend l’autre. Quelle condition de Coffman crée le cycle ? Comment casser le deadlock par conception ?",
				solution: "Attente circulaire (+ les 3 autres, présentes avec des mutex non préemptibles).\nCasser : imposer un ordre global lock A puis B pour tous ; ou trylock + backoff."
			}]
		},
		{
			id: "fiche",
			title: "Chapitre 8 — Fiche express Archi / SE",
			subtitle: "Formules et distinctions du jour J",
			durationMin: 20,
			objectives: ["Réviser les 12 distinctions qui font les QCM"],
			blocks: [
				{
					t: "h2",
					text: "Distinctions à ne plus jamais rater",
					id: "dist"
				},
				{
					t: "table",
					cols: ["A", "B"],
					rows: [
						["Processus : espace isolé", "Thread : pile privée, mémoire partagée"],
						["TLB miss : table des pages", "Page fault : disque / swap"],
						["Write-through", "Write-back + dirty"],
						["FCFS : convoi", "SJF : famine possible des longs"],
						["RR q petit : overhead", "RR q grand ≈ FCFS"],
						["Deadlock : plus personne", "Starvation : un malheureux"],
						["User mode", "Kernel mode (syscall / trap)"],
						["Complément à 2 overflow", "Modulo 2ⁿ en unsigned"],
						["Cache hit", "Cache miss → AMAT"],
						["Harvard : 2 mémoires", "von Neumann : 1"],
						["Mutex = sem 1", "Sémaphore compteur"],
						["Offset de page", "Numéro de page / frame"]
					]
				},
				{
					t: "h2",
					text: "Formules",
					id: "f"
				},
				{
					t: "math",
					tex: "T_{CPU}=N\\times CPI\\times T_{clk},\\quad \\mathrm{AMAT}=T_h+m T_m,\\quad T_{att}=T_{rot}-T_{burst}"
				},
				{
					t: "math",
					tex: "\\text{offset}=\\log_2(\\text{page}),\\quad [-2^{n-1};2^{n-1}-1],\\quad 0x\\text{F}=15"
				},
				{
					t: "callout",
					kind: "exam",
					title: "Ordre le jour de l’épreuve",
					body: "Conversions (rapide, sûr) → un Gantt RR/SJF (montre les calculs) → une question AMAT → QCM de vocabulaire. Si une pagination multi-niveaux bloque, passe : c’est long pour 2 points."
				}
			],
			quiz: [
				{
					id: "h8q1",
					question: "La première chose à écrire sur un exo d’ordonnancement",
					options: [
						"la moyenne magique",
						"le Gantt + table burst restant",
						"un mutex",
						"AMAT"
					],
					answer: 1,
					explain: "Le dessin est noté et évite les erreurs."
				},
				{
					id: "h8q2",
					question: "−128 sur 8 bits signés",
					options: [
						"01111111",
						"10000000",
						"11111111",
						"00000000"
					],
					answer: 1,
					explain: "MSB seul à 1 = −128."
				},
				{
					id: "h8q3",
					question: "Pour traduire VA → PA on a besoin",
					options: [
						"du CPI",
						"de la table des pages (et idéalement du TLB)",
						"d’un sémaphore",
						"de RR"
					],
					answer: 1,
					explain: "Cœur de la pagination."
				},
				{
					id: "h8q4",
					question: "Quatre conditions de Coffman : on casse le deadlock en en cassant",
					options: [
						"aucune",
						"au moins une",
						"les quatre seulement",
						"le quantum"
					],
					answer: 1,
					explain: "Nécessaires : il suffit d’en invalider une."
				}
			],
			exercises: [{
				id: "h8e1",
				title: "Mini mix",
				difficulty: "moyen",
				durationMin: 12,
				prompt: "1) 0x3C en décimal et binaire. 2) AMAT hit 2 ns miss 8 % miss penalty 40 ns. 3) Différence TLB miss / page fault en une phrase.",
				solution: "1) 0x3C = 3×16+12=60 = 0011 1100₂.\n2) 2+0,08×40=2+3,2=5,2 ns.\n3) TLB miss = traduction absente du cache d’adresses ; page fault = page absente de la RAM."
			}]
		}
	]
};
var BLANCS = [{
	id: "blanc-1",
	title: "Sujet blanc 1 — conditions d’examen",
	durationMin: 180,
	description: "24 questions, 4 matières. Traite-les sans notes. Vise ≥ 16/24 avant samedi.",
	questions: [
		{
			id: "bl1-1",
			question: "C — int i = 5; printf(\"%d %d\", i++, ++i);  Comportement ?",
			options: [
				"Affiche toujours 5 7",
				"Affiche toujours 6 6",
				"Undefined behavior (deux modifications de i sans point de séquence)",
				"Erreur de compilation obligatoire"
			],
			answer: 2,
			explain: "Modifier i deux fois dans le même appel est UB. Au concours, signale l’UB plutôt que d’inventer un affichage."
		},
		{
			id: "bl1-2",
			question: "C — Complexité pire cas du tri par insertion ?",
			options: [
				"O(n)",
				"O(n log n)",
				"O(n²)",
				"O(2ⁿ)"
			],
			answer: 2,
			explain: "Tableau trié à l’envers : chaque insertion décale tout le préfixe."
		},
		{
			id: "bl1-3",
			question: "C — Pour échanger deux int x,y on écrit",
			options: [
				"swap(x,y) par valeur",
				"swap(&x,&y) avec int*",
				"x,y = y,x",
				"*swap(x,y)"
			],
			answer: 1,
			explain: "Passage par adresse."
		},
		{
			id: "bl1-4",
			question: "C — strlen(\"AB\") et sizeof(\"AB\") valent",
			options: [
				"2 et 2",
				"2 et 3",
				"3 et 3",
				"2 et 4"
			],
			answer: 1,
			explain: "strlen ignore '\\0' ; sizeof le compte (et le littéral a 3 chars)."
		},
		{
			id: "bl1-5",
			question: "C — t[i] est équivalent à",
			options: [
				"t+i",
				"*(t+i)",
				"&t + i",
				"t[i++] toujours"
			],
			answer: 1,
			explain: "Définition de l’indexation."
		},
		{
			id: "bl1-6",
			question: "C — malloc(n * sizeof *p) suivi de rien. Risque principal ?",
			options: [
				"overflow signé",
				"fuite si on oublie free + dangling si free trop tôt",
				"erreur de type",
				"RR"
			],
			answer: 1,
			explain: "Heap = responsabilité du programmeur."
		},
		{
			id: "bl1-7",
			question: "SQL — Filtrer les groupes de moyenne ≥ 12 :",
			options: [
				"WHERE AVG(note) >= 12",
				"HAVING AVG(note) >= 12",
				"ON AVG(note)",
				"LIMIT 12"
			],
			answer: 1,
			explain: "HAVING après GROUP BY."
		},
		{
			id: "bl1-8",
			question: "SQL — Étudiants sans inscription :",
			options: [
				"INNER JOIN",
				"LEFT JOIN Inscription + WHERE i.numE IS NULL",
				"HAVING COUNT > 0",
				"UNION"
			],
			answer: 1,
			explain: "Anti-jointure."
		},
		{
			id: "bl1-9",
			question: "Relationnel — Une DF X→Y signifie",
			options: [
				"X et Y disjoints",
				"égalité sur X ⇒ égalité sur Y",
				"X est une FK",
				"Y est NULL"
			],
			answer: 1,
			explain: "Définition de la dépendance fonctionnelle."
		},
		{
			id: "bl1-10",
			question: "3NF interdit principalement",
			options: [
				"les FK",
				"les DF transitives de non-clé vers non-clé",
				"les jointures",
				"COUNT(*)"
			],
			answer: 1,
			explain: "Après 2NF, on chasse les transitives."
		},
		{
			id: "bl1-11",
			question: "Algèbre — « tous les modules » se traduit par",
			options: [
				"σ",
				"π",
				"division (ou double NOT EXISTS)",
				"∪"
			],
			answer: 2,
			explain: "Quantificateur universel."
		},
		{
			id: "bl1-12",
			question: "SQL — COUNT(col) ignore",
			options: [
				"les 0",
				"les NULL",
				"les doublons toujours",
				"les PK"
			],
			answer: 1,
			explain: "COUNT(*) ne les ignore pas."
		},
		{
			id: "bl1-13",
			question: "Stats — Variance d’échantillon sans biais : on divise par",
			options: [
				"n",
				"n-1",
				"n+1",
				"√n"
			],
			answer: 1,
			explain: "Bessel."
		},
		{
			id: "bl1-14",
			question: "P(A|B) =",
			options: [
				"P(A)P(B)",
				"P(A∩B)/P(B)",
				"P(A)+P(B)",
				"P(B|A)"
			],
			answer: 1,
			explain: "Définition."
		},
		{
			id: "bl1-15",
			question: "X ~ N(μ,σ²), Z = (X−μ)/σ suit",
			options: [
				"N(μ,1)",
				"N(0,1)",
				"t_n",
				"U[0,1]"
			],
			answer: 1,
			explain: "Loi normale centrée réduite."
		},
		{
			id: "bl1-16",
			question: "IC 95 % σ connu : x̄ ±",
			options: [
				"1,64 σ/√n",
				"1,96 σ/√n",
				"2,58 s",
				"σ/n"
			],
			answer: 1,
			explain: "z = 1,96."
		},
		{
			id: "bl1-17",
			question: "On rejette H0 (bilatéral 5 %) si",
			options: [
				"|z| < 1,96",
				"|z| > 1,96",
				"p > 0,05",
				"n < 30"
			],
			answer: 1,
			explain: "Région critique."
		},
		{
			id: "bl1-18",
			question: "R² = 0,81 ⇒ |r| =",
			options: [
				"0,81",
				"0,9",
				"0,405",
				"1,81"
			],
			answer: 1,
			explain: "R² = r²."
		},
		{
			id: "bl1-19",
			question: "−1 en complément à 2 sur 8 bits",
			options: [
				"10000001",
				"11111111",
				"00000001",
				"10000000"
			],
			answer: 1,
			explain: "Tous les bits à 1."
		},
		{
			id: "bl1-20",
			question: "AMAT =",
			options: [
				"T_hit × miss",
				"T_hit + miss_rate × T_miss",
				"T_miss − T_hit",
				"CPI"
			],
			answer: 1,
			explain: "Formule standard."
		},
		{
			id: "bl1-21",
			question: "Round Robin avec q → ∞ tend vers",
			options: [
				"SJF",
				"FCFS",
				"SRTF",
				"banquier"
			],
			answer: 1,
			explain: "Plus de préemption."
		},
		{
			id: "bl1-22",
			question: "TLB miss ≠ page fault car",
			options: [
				"c’est la même chose",
				"la page peut être en RAM, seule la traduction n’est pas dans le TLB",
				"le TLB est sur disque",
				"FIFO"
			],
			answer: 1,
			explain: "Distinction classique."
		},
		{
			id: "bl1-23",
			question: "Threads d’un même processus partagent",
			options: [
				"leurs piles",
				"l’espace d’adressage",
				"leurs PC",
				"rien du tout"
			],
			answer: 1,
			explain: "Piles privées, mémoire globale partagée."
		},
		{
			id: "bl1-24",
			question: "Coffman : pour empêcher un deadlock il suffit de casser",
			options: [
				"les 4 conditions",
				"au moins 1 des 4",
				"le quantum",
				"le TLB"
			],
			answer: 1,
			explain: "Les 4 sont nécessaires."
		}
	]
}, {
	id: "blanc-2",
	title: "Sujet blanc 2 — salve rapide",
	durationMin: 45,
	description: "16 questions, rythme concours. Idéal vendredi soir après les fiches.",
	questions: [
		{
			id: "bl2-1",
			question: "scanf(\"%d\", n) sans & :",
			options: [
				"correct",
				"undefined / crash probable",
				"lit un float",
				"rien"
			],
			answer: 1,
			explain: "Il faut l’adresse."
		},
		{
			id: "bl2-2",
			question: "Recherche binaire requiert un tableau",
			options: [
				"plein de 0",
				"trié",
				"alloué par malloc",
				"de taille 2^k"
			],
			answer: 1,
			explain: "Invariant d’ordre."
		},
		{
			id: "bl2-3",
			question: "7/2 en int C =",
			options: [
				"3.5",
				"3",
				"4",
				"2"
			],
			answer: 1,
			explain: "Division entière."
		},
		{
			id: "bl2-4",
			question: "Quicksort pire cas",
			options: [
				"O(n log n)",
				"O(n²)",
				"O(n)",
				"O(1)"
			],
			answer: 1,
			explain: "Pivot toujours extrême."
		},
		{
			id: "bl2-5",
			question: "PK peut-elle être NULL ?",
			options: [
				"oui",
				"non",
				"si composite",
				"en 3NF"
			],
			answer: 1,
			explain: "Unicité + non nullité."
		},
		{
			id: "bl2-6",
			question: "SELECT ville, COUNT(*) FROM Etu; sans GROUP BY est",
			options: [
				"correct ANSI",
				"illégal (ville non agrégée)",
				"un JOIN",
				"une vue"
			],
			answer: 1,
			explain: "Règle du GROUP BY."
		},
		{
			id: "bl2-7",
			question: "LIKE 'M%' trouve",
			options: [
				"finit par M",
				"commence par M",
				"contient M au milieu seulement",
				"M unique"
			],
			answer: 1,
			explain: "% = joker."
		},
		{
			id: "bl2-8",
			question: "Une association N-N devient",
			options: [
				"une FK unique",
				"une table (id1, id2, …)",
				"une fusion",
				"un index"
			],
			answer: 1,
			explain: "Table de liaison."
		},
		{
			id: "bl2-9",
			question: "V(aX+b) =",
			options: [
				"a V(X)+b",
				"a² V(X)",
				"V(X)+b",
				"a V(X)"
			],
			answer: 1,
			explain: "Constante disparait, a au carré."
		},
		{
			id: "bl2-10",
			question: "B(n,p) : E[X] =",
			options: [
				"p",
				"np",
				"np(1-p)",
				"n"
			],
			answer: 1,
			explain: "n Bernoulli."
		},
		{
			id: "bl2-11",
			question: "p-valeur < α",
			options: [
				"accepter H0",
				"rejeter H0",
				"augmenter n",
				"σ=0"
			],
			answer: 1,
			explain: "Décision du test."
		},
		{
			id: "bl2-12",
			question: "Médiane vs moyenne : la médiane est",
			options: [
				"plus sensible aux outliers",
				"plus robuste aux outliers",
				"toujours égale",
				"σ"
			],
			answer: 1,
			explain: "Robustesse."
		},
		{
			id: "bl2-13",
			question: "0xFF =",
			options: [
				"16",
				"255",
				"15",
				"256"
			],
			answer: 1,
			explain: "8 bits à 1."
		},
		{
			id: "bl2-14",
			question: "Processus blocked :",
			options: [
				"il tourne",
				"il attend un événement (I/O, synchro)",
				"il est zombie",
				"il est en cache"
			],
			answer: 1,
			explain: "Waiting."
		},
		{
			id: "bl2-15",
			question: "Pages 4 Ko, VA 32 bits : bits de n° de page",
			options: [
				"12",
				"20",
				"32",
				"10"
			],
			answer: 1,
			explain: "32−12=20."
		},
		{
			id: "bl2-16",
			question: "Mutex = sémaphore initialisé à",
			options: [
				"0",
				"1",
				"n",
				"∞"
			],
			answer: 1,
			explain: "Exclusion binaire."
		}
	]
}];
var SUBJECTS = [
	algoC,
	bdd,
	stats,
	archi
];
function getSubject(id) {
	return SUBJECTS.find((s) => s.id === id);
}
function getChapter(subjectId, chapterId) {
	const s = getSubject(subjectId);
	if (!s) return null;
	const chapter = s.chapters.find((c) => c.id === chapterId);
	if (!chapter) return null;
	return {
		subject: s,
		chapter
	};
}
function chapterIndex(subject, chapterId) {
	return subject.chapters.findIndex((c) => c.id === chapterId);
}
function neighbors(subject, chapterId) {
	const i = chapterIndex(subject, chapterId);
	return {
		prev: i > 0 ? subject.chapters[i - 1] : void 0,
		next: i >= 0 && i < subject.chapters.length - 1 ? subject.chapters[i + 1] : void 0,
		index: i
	};
}
function searchContent(q) {
	const s = q.trim().toLowerCase();
	if (s.length < 2) return [];
	const hits = [];
	for (const sub of SUBJECTS) {
		if (sub.title.toLowerCase().includes(s) || sub.short.toLowerCase().includes(s)) hits.push({
			href: `/matieres/${sub.id}`,
			title: sub.title,
			crumb: "Matière",
			kind: "matiere"
		});
		for (const ch of sub.chapters) {
			if (`${ch.title} ${ch.subtitle} ${ch.objectives.join(" ")}`.toLowerCase().includes(s)) hits.push({
				href: `/matieres/${sub.id}/${ch.id}`,
				title: ch.title,
				crumb: sub.short,
				kind: "chapitre"
			});
			for (const ex of ch.exercises) if (ex.title.toLowerCase().includes(s) || ex.prompt.toLowerCase().includes(s)) hits.push({
				href: `/matieres/${sub.id}/${ch.id}#exercices`,
				title: ex.title,
				crumb: `${sub.short} · exercice`,
				kind: "exercice"
			});
		}
	}
	return hits.slice(0, 12);
}
function allQuizzes() {
	const list = [];
	for (const sub of SUBJECTS) {
		const bank = [];
		for (const ch of sub.chapters) {
			list.push({
				id: `${sub.id}:${ch.id}`,
				title: `Quiz — ${ch.title.replace(/^Chapitre \d+ — /, "")}`,
				crumb: sub.short,
				questions: ch.quiz
			});
			bank.push(...ch.quiz);
		}
		list.push({
			id: `${sub.id}:all`,
			title: `Quiz complet — ${sub.short}`,
			crumb: sub.short,
			questions: bank
		});
	}
	for (const b of BLANCS) list.push({
		id: b.id,
		title: b.title,
		crumb: "Sujet blanc",
		questions: b.questions
	});
	return list;
}
function getQuiz(id) {
	return allQuizzes().find((q) => q.id === id);
}
function allExercises() {
	const out = [];
	for (const subject of SUBJECTS) for (const chapter of subject.chapters) for (const exercise of chapter.exercises) out.push({
		subject,
		chapter,
		exercise
	});
	return out;
}
function totals() {
	let chapters = 0;
	let exercises = 0;
	let questions = 0;
	for (const s of SUBJECTS) {
		chapters += s.chapters.length;
		for (const c of s.chapters) {
			exercises += c.exercises.length;
			questions += c.quiz.length;
		}
	}
	for (const b of BLANCS) questions += b.questions.length;
	return {
		subjects: SUBJECTS.length,
		chapters,
		exercises,
		questions
	};
}
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const hits = (0, import_react.useMemo)(() => searchContent(q), [q]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((o) => !o);
			}
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function go(href) {
		setOpen(false);
		setQ("");
		navigate({ to: href });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "flex h-10 w-full max-w-xl items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-ink-subtle shadow-sm hover:border-line-strong",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 truncate text-left",
				children: "Rechercher une matière, un chapitre, un exercice…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "hidden rounded-xs border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle sm:inline",
				children: "⌘K"
			})
		]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Fermer",
			className: "absolute inset-0 bg-ink/40",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto mt-[12vh] w-[min(560px,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-surface shadow-pop",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Recherche",
				shouldFilter: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-line px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-ink-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						value: q,
						onValueChange: setQ,
						placeholder: "Cours, piège, SQL, Bayes…",
						className: "h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-subtle",
						autoFocus: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
					className: "max-h-80 overflow-y-auto p-2",
					children: q.trim().length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-6 text-center text-sm text-ink-subtle",
						children: "Tape au moins 2 lettres."
					}) : hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-2 py-6 text-center text-sm text-ink-subtle",
						children: "Aucun résultat"
					}) : hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						value: h.href + h.title,
						onSelect: () => go(h.href),
						className: cn("flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-accent-soft"),
						children: [
							h.kind === "matiere" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4 text-accent" }) : h.kind === "exercice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestion, { className: "size-4 text-archi" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-ink-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate font-medium",
								children: h.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-ink-subtle",
								children: h.crumb
							})
						]
					}, h.href + h.title))
				})]
			})
		})]
	}) : null] });
}
var STORAGE_KEY = "sda-master-progress-v1";
var defaults = {
	hydrated: false,
	name: "",
	completedChapters: [],
	completedExercises: [],
	quizResults: {},
	favorites: [],
	notes: {},
	studySeconds: 0,
	lastLesson: null,
	sessions: [],
	dailySeconds: {}
};
function todayKey() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function persist(state) {
	if (typeof window === "undefined") return;
	const { hydrated: _h, ...rest } = state;
	const dump = {};
	for (const [k, v] of Object.entries(rest)) {
		if (typeof v === "function") continue;
		dump[k] = v;
	}
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(dump));
	} catch {}
}
var useProgress = create((set, get) => ({
	...defaults,
	hydrate: () => {
		if (typeof window === "undefined") return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				set({
					name: parsed.name ?? "",
					completedChapters: parsed.completedChapters ?? [],
					completedExercises: parsed.completedExercises ?? [],
					quizResults: parsed.quizResults ?? {},
					favorites: parsed.favorites ?? [],
					notes: parsed.notes ?? {},
					studySeconds: parsed.studySeconds ?? 0,
					lastLesson: parsed.lastLesson ?? null,
					sessions: parsed.sessions ?? [],
					dailySeconds: parsed.dailySeconds ?? {},
					hydrated: true
				});
				return;
			}
		} catch {}
		set({ hydrated: true });
	},
	setName: (name) => {
		set({ name });
		persist(get());
	},
	toggleChapter: (subjectId, chapterId) => {
		const key = chapterKey(subjectId, chapterId);
		const cur = get().completedChapters;
		set({ completedChapters: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key] });
		persist(get());
	},
	markChapter: (subjectId, chapterId, done) => {
		const key = chapterKey(subjectId, chapterId);
		const cur = get().completedChapters;
		const has = cur.includes(key);
		if (done && !has) set({ completedChapters: [...cur, key] });
		if (!done && has) set({ completedChapters: cur.filter((k) => k !== key) });
		persist(get());
	},
	toggleExercise: (id) => {
		const cur = get().completedExercises;
		set({ completedExercises: cur.includes(id) ? cur.filter((k) => k !== id) : [...cur, id] });
		persist(get());
	},
	saveQuiz: (id, correct, total) => {
		set({ quizResults: {
			...get().quizResults,
			[id]: {
				correct,
				total,
				at: Date.now()
			}
		} });
		persist(get());
	},
	toggleFavorite: (key) => {
		const cur = get().favorites;
		set({ favorites: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key] });
		persist(get());
	},
	setNote: (key, note) => {
		set({ notes: {
			...get().notes,
			[key]: note
		} });
		persist(get());
	},
	addStudy: (seconds) => {
		const day = todayKey();
		const daily = get().dailySeconds;
		set({
			studySeconds: get().studySeconds + seconds,
			dailySeconds: {
				...daily,
				[day]: (daily[day] ?? 0) + seconds
			}
		});
		persist(get());
	},
	setLastLesson: (subjectId, chapterId) => {
		set({ lastLesson: {
			subjectId,
			chapterId
		} });
		persist(get());
	},
	addSession: (s) => {
		const id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		set({ sessions: [...get().sessions, {
			...s,
			id
		}] });
		persist(get());
	},
	removeSession: (id) => {
		set({ sessions: get().sessions.filter((x) => x.id !== id) });
		persist(get());
	},
	reset: () => {
		set({
			...defaults,
			hydrated: true
		});
		persist(get());
	}
}));
function isChapterDone(completed, subjectId, chapterId) {
	return completed.includes(chapterKey(subjectId, chapterId));
}
/** Concours Master SDA — FSA Safi, AU 2026-2027 */
var EXAM = {
	title: "Master Sciences des Données et Analytiques",
	acronym: "SDA",
	year: "AU 2026-2027",
	faculty: "Faculté des Sciences Appliquées de Safi",
	facultyShort: "FSA Safi",
	room: "Amphi 5",
	/** Saturday 19 Sept 2026, 10:00 Morocco (UTC+1) */
	at: /* @__PURE__ */ new Date("2026-09-19T10:00:00+01:00"),
	axes: [
		"Algorithmique / Programmation (langage C)",
		"Bases de données",
		"Statistique et analyse",
		"Architecture des ordinateurs et système d'exploitation"
	]
};
function remainingToExam(now = /* @__PURE__ */ new Date()) {
	const ms = EXAM.at.getTime() - now.getTime();
	const total = Math.max(0, ms);
	return {
		total,
		days: Math.floor(total / 864e5),
		hours: Math.floor(total % 864e5 / 36e5),
		minutes: Math.floor(total % 36e5 / 6e4),
		seconds: Math.floor(total % 6e4 / 1e3),
		past: ms <= 0
	};
}
function AppShell({ children }) {
	const hydrate = useProgress((s) => s.hydrate);
	const name = useProgress((s) => s.name);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-dots",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-ink/50",
					"aria-label": "Fermer le menu",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 w-[min(18rem,88vw)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setOpen(false) })
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center gap-3 border-b border-line/80 bg-paper/90 px-3 py-3 backdrop-blur-md sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-10 items-center justify-center rounded-md border border-line bg-surface md:hidden",
							onClick: () => setOpen((o) => !o),
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted lg:inline",
									children: [EXAM.room, " · 19/09"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-sidebar-fg",
									children: (name || "C")[0].toUpperCase()
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-3 py-5 sm:px-6 sm:py-7 lg:px-8",
					children
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-BIu8x0JF.css";
var APP_NAME = "Master SDA";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Préparation intensive au concours Master SDA — FSA Safi, AU 2026-2027."
			},
			{
				name: "theme-color",
				content: "#0B1020"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-CIP_DkJE.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./favoris-BnDRUhjr.mjs");
var Route$9 = createFileRoute("/favoris")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./matieres-BPCgpEUm.mjs");
var Route$8 = createFileRoute("/matieres")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./parametres-OqrZgdo9.mjs");
var Route$7 = createFileRoute("/parametres")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./planning-CGMis-ox.mjs");
var Route$6 = createFileRoute("/planning")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./quiz-C8W0ywBI.mjs");
var Route$5 = createFileRoute("/quiz")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./ressources-Ct1TFJkt.mjs");
var Route$4 = createFileRoute("/ressources")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./statistiques-CgvtD9ju.mjs");
var Route$3 = createFileRoute("/statistiques")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./matieres_._subjectId-DD07BLhJ.mjs");
var Route$2 = createFileRoute("/matieres_/$subjectId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./quiz_._quizId-BaTC3Y7a.mjs");
var Route$1 = createFileRoute("/quiz_/$quizId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./matieres_._subjectId_._chapterId-Cpq75REl.mjs");
var Route = createFileRoute("/matieres_/$subjectId_/$chapterId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	FavorisRoute: Route$9.update({
		id: "/favoris",
		path: "/favoris",
		getParentRoute: () => Route$11
	}),
	MatieresRoute: Route$8.update({
		id: "/matieres",
		path: "/matieres",
		getParentRoute: () => Route$11
	}),
	ParametresRoute: Route$7.update({
		id: "/parametres",
		path: "/parametres",
		getParentRoute: () => Route$11
	}),
	PlanningRoute: Route$6.update({
		id: "/planning",
		path: "/planning",
		getParentRoute: () => Route$11
	}),
	QuizRoute: Route$5.update({
		id: "/quiz",
		path: "/quiz",
		getParentRoute: () => Route$11
	}),
	RessourcesRoute: Route$4.update({
		id: "/ressources",
		path: "/ressources",
		getParentRoute: () => Route$11
	}),
	StatistiquesRoute: Route$3.update({
		id: "/statistiques",
		path: "/statistiques",
		getParentRoute: () => Route$11
	}),
	MatieresSubjectIdRoute: Route$2.update({
		id: "/matieres_/$subjectId",
		path: "/matieres/$subjectId",
		getParentRoute: () => Route$11
	}),
	QuizQuizIdRoute: Route$1.update({
		id: "/quiz_/$quizId",
		path: "/quiz/$quizId",
		getParentRoute: () => Route$11
	}),
	MatieresSubjectIdChapterIdRoute: Route.update({
		id: "/matieres_/$subjectId_/$chapterId",
		path: "/matieres/$subjectId/$chapterId",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { EXAM as a, useProgress as c, getChapter as d, getQuiz as f, BLANCS as g, totals as h, Route$2 as i, SUBJECTS as l, neighbors as m, Route as n, remainingToExam as o, getSubject as p, Route$1 as r, isChapterDone as s, router_exports as t, allExercises as u };
