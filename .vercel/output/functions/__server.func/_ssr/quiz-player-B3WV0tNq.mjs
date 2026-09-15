import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-Hb0Pzv9p.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Copy, D as ChevronRight, O as ChevronLeft, g as KeyRound, h as Lightbulb, k as Check, r as TriangleAlert, t as X, u as RotateCcw, v as GraduationCap } from "../_libs/lucide-react.mjs";
import { c as useProgress } from "./router-Q6qF9BwN.mjs";
import { t as Button } from "./button-1itENoOl.mjs";
import { t as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-player-B3WV0tNq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function escapeHtml(s) {
	return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
var C_KW = /^(auto|break|case|const|continue|default|do|else|enum|extern|for|goto|if|register|return|sizeof|static|struct|switch|typedef|union|volatile|while|restrict)$/;
var C_TY = /^(char|int|float|double|long|short|signed|unsigned|void|size_t|FILE|NULL|bool)$/;
var C_FN = /^(printf|scanf|sprintf|sscanf|malloc|calloc|realloc|free|strlen|strcpy|strncpy|strcmp|strcat|memcpy|memset|fopen|fclose|fprintf|fscanf|fgets|fputs|getchar|putchar|main|atoi|atof)$/;
var SQL_KW = /^(select|from|where|join|inner|left|right|full|outer|on|group|by|order|having|insert|into|values|update|set|delete|create|table|view|index|drop|alter|and|or|not|in|as|distinct|limit|offset|union|all|exists|case|when|then|else|end|like|between|null|is|asc|desc|primary|key|foreign|references|unique|check|default|constraint|with)$/;
function highlightCLine(line) {
	if (/^\s*#/.test(line)) return `<span class="pp">${line}</span>`;
	const out = [];
	let i = 0;
	while (i < line.length) {
		if (line[i] === "/" && line[i + 1] === "/") {
			out.push(`<span class="cm">${line.slice(i)}</span>`);
			break;
		}
		if (line[i] === "\"") {
			let j = i + 1;
			while (j < line.length && line[j] !== "\"") if (line[j] === "\\") j += 2;
			else j += 1;
			out.push(`<span class="st">${line.slice(i, j + 1)}</span>`);
			i = j + 1;
			continue;
		}
		if (line[i] === "'") {
			let j = i + 1;
			while (j < line.length && line[j] !== "'") if (line[j] === "\\") j += 2;
			else j += 1;
			out.push(`<span class="st">${line.slice(i, j + 1)}</span>`);
			i = j + 1;
			continue;
		}
		if (/[A-Za-z_]/.test(line[i])) {
			let j = i + 1;
			while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j += 1;
			const w = line.slice(i, j);
			if (C_KW.test(w)) out.push(`<span class="kw">${w}</span>`);
			else if (C_TY.test(w)) out.push(`<span class="ty">${w}</span>`);
			else if (C_FN.test(w)) out.push(`<span class="fn">${w}</span>`);
			else out.push(w);
			i = j;
			continue;
		}
		if (/[0-9]/.test(line[i])) {
			let j = i + 1;
			while (j < line.length && /[0-9.xXa-fA-F]/.test(line[j])) j += 1;
			out.push(`<span class="nu">${line.slice(i, j)}</span>`);
			i = j;
			continue;
		}
		out.push(line[i]);
		i += 1;
	}
	return out.join("");
}
function highlightSql(src) {
	return src.split("\n").map((line) => {
		if (line.trimStart().startsWith("--")) return `<span class="cm">${line}</span>`;
		return line.replace(/('[^']*'|"[^"]*"|[A-Za-z_]+|[0-9]+)/g, (tok) => {
			if (tok.startsWith("'") || tok.startsWith("\"")) return `<span class="st">${tok}</span>`;
			if (/^[0-9]+$/.test(tok)) return `<span class="nu">${tok}</span>`;
			if (SQL_KW.test(tok.toLowerCase())) return `<span class="kw">${tok}</span>`;
			return tok;
		});
	}).join("\n");
}
function highlight(code, lang) {
	const escaped = escapeHtml(code.replace(/\n$/, ""));
	if (lang === "c") return escaped.split("\n").map(highlightCLine).join("\n");
	if (lang === "sql") return highlightSql(escaped);
	return escaped;
}
function renderTex(tex, display) {
	return katex.renderToString(tex, {
		throwOnError: false,
		displayMode: display,
		output: "html"
	});
}
function Tex({ tex, display = false }) {
	const html = renderTex(tex, display);
	if (display) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "my-3 overflow-x-auto rounded-md bg-surface px-3 py-2",
		dangerouslySetInnerHTML: { __html: html }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: html } });
}
var TOKEN = /(\$\$[\s\S]+?\$\$|\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`)/g;
function Rich({ text, className }) {
	const parts = text.split(TOKEN);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: parts.map((part, i) => {
			if (!part) return null;
			if (part.startsWith("$$") && part.endsWith("$$")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
				tex: part.slice(2, -2),
				display: true
			}, i);
			if (part.startsWith("$") && part.endsWith("$")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, { tex: part.slice(1, -1) }, i);
			if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "font-semibold text-ink",
				children: part.slice(2, -2)
			}, i);
			if (part.startsWith("`") && part.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "rounded-xs bg-accent-soft px-1 py-0.5 font-mono text-[0.85em] text-accent",
				children: part.slice(1, -1)
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
		})
	});
}
function Callout({ kind, title, body }) {
	const m = {
		tip: {
			icon: Lightbulb,
			wrap: "bg-accent-soft/70 border-accent/20",
			iconC: "text-accent"
		},
		exam: {
			icon: GraduationCap,
			wrap: "bg-warn-soft border-warn/20",
			iconC: "text-warn"
		},
		key: {
			icon: KeyRound,
			wrap: "bg-stats-soft border-stats/20",
			iconC: "text-stats"
		},
		warning: {
			icon: TriangleAlert,
			wrap: "bg-danger-soft border-danger/20",
			iconC: "text-danger"
		}
	}[kind];
	const Icon = m.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("my-4 flex gap-3 rounded-lg border px-4 py-3", m.wrap),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("mt-0.5 size-4 shrink-0", m.iconC) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-ink",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-ink-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: body })
			})]
		})]
	});
}
function CodeBlock({ code, lang, title }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const html = highlight(code, lang === "bash" ? "text" : lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group my-4 overflow-hidden rounded-lg bg-code shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-white/5 px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-medium uppercase tracking-wider text-sidebar-muted",
				children: title ?? lang
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex items-center gap-1.5 rounded-xs px-2 py-1 text-[11px] font-medium text-sidebar-muted hover:bg-white/5 hover:text-sidebar-fg",
				onClick: async () => {
					try {
						await navigator.clipboard.writeText(code);
						setCopied(true);
						setTimeout(() => setCopied(false), 1400);
					} catch {}
				},
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copié" : "Copier"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "code-hl overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-code-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { dangerouslySetInnerHTML: { __html: html } })
		})]
	});
}
function BlockView({ block }) {
	switch (block.t) {
		case "h2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: block.id,
			className: "mt-10 scroll-mt-24 font-sans text-xl font-semibold tracking-tight text-ink first:mt-0",
			children: block.text
		});
		case "h3": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-6 font-sans text-base font-semibold text-ink",
			children: block.text
		});
		case "p": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-serif text-[17px] leading-[1.7] text-ink/90",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: block.text })
		});
		case "math": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
			tex: block.tex,
			display: true
		});
		case "formula": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "my-4 rounded-lg border border-line bg-surface px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "text-xs font-semibold uppercase tracking-wider text-ink-subtle",
					children: block.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tex, {
					tex: block.tex,
					display: true
				}),
				block.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: block.note })
				}) : null
			]
		});
		case "code": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			code: block.code,
			lang: block.lang,
			title: block.title
		});
		case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
			kind: block.kind,
			title: block.title,
			body: block.body
		});
		case "ul": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 list-disc space-y-1.5 pl-5 font-serif text-[17px] leading-relaxed text-ink/90",
			children: block.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: it }) }, i))
		});
		case "ol": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-3 list-decimal space-y-1.5 pl-5 font-serif text-[17px] leading-relaxed text-ink/90",
			children: block.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: it }) }, i))
		});
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-4 overflow-x-auto rounded-lg border border-line",
			children: [block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-muted",
				children: block.caption
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[480px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-paper text-ink-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: block.cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-semibold",
						children: c
					}, c)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: block.rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-t border-line",
					children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 align-top text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: cell })
					}, j))
				}, i)) })]
			})]
		});
		case "example": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-5 rounded-xl border border-line bg-paper/80 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-accent",
				children: ["Exemple — ", block.title]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1",
				children: block.blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block: b }, i))
			})]
		});
		default: return null;
	}
}
function LessonBlocks({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block: b }, i)) });
}
function QuizPlayer({ quizId, title, questions }) {
	const saveQuiz = useProgress((s) => s.saveQuiz);
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)({});
	const [done, setDone] = (0, import_react.useState)(false);
	const q = questions[i];
	const choice = picked[q.id];
	const revealed = choice !== void 0;
	const score = (0, import_react.useMemo)(() => {
		let c = 0;
		for (const qq of questions) if (picked[qq.id] === qq.answer) c += 1;
		return c;
	}, [picked, questions]);
	function pick(idx) {
		if (revealed) return;
		setPicked((p) => ({
			...p,
			[q.id]: idx
		}));
	}
	function finish() {
		setDone(true);
		saveQuiz(quizId, score, questions.length);
	}
	function reset() {
		setI(0);
		setPicked({});
		setDone(false);
	}
	if (done) {
		const pct = Math.round(score / questions.length * 100);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-ink-subtle",
					children: "Résultat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-4xl font-semibold tabular-nums text-accent",
					children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-lg text-ink-muted",
						children: [" / ", questions.length]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-ink-muted",
					children: [pct, " % de bonnes réponses"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-2 overflow-hidden rounded-full bg-paper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full rounded-full", pct >= 70 ? "bg-stats" : pct >= 50 ? "bg-warn" : "bg-danger"),
						style: { width: `${pct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-ink-muted",
					children: pct >= 80 ? "Solide. Enchaîne sur un sujet blanc ou la fiche express." : pct >= 50 ? "Correct. Relis les explications des items ratés, puis recommence." : "Reprends le chapitre correspondant — mieux vaut maintenant que samedi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: reset,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Recommencer"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 space-y-3",
					children: questions.map((qq, idx) => {
						const ok = picked[qq.id] === qq.answer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md border border-line p-3 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 size-4 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium text-ink",
									children: [
										idx + 1,
										". ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: qq.question })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-ink-muted",
									children: ["Réponse : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: qq.options[qq.answer] })]
								})] })]
							})
						}, qq.id);
					})
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-3 text-sm text-ink-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-ink",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [
						i + 1,
						" / ",
						questions.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 h-1.5 overflow-hidden rounded-full bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent transition-[width] duration-300",
					style: { width: `${(i + (revealed ? 1 : 0)) / questions.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-xl leading-snug text-ink sm:text-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: q.question })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: q.options.map((opt, idx) => {
					const selected = choice === idx;
					const correct = idx === q.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => pick(idx),
						className: cn("flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors", !revealed && "border-line bg-surface hover:border-accent/40 hover:bg-accent-soft/40", revealed && correct && "border-success/40 bg-success-soft", revealed && selected && !correct && "border-danger/40 bg-danger-soft", revealed && !selected && !correct && "border-line bg-surface opacity-70"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold",
							children: String.fromCharCode(65 + idx)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: opt })
						})]
					}) }, idx);
				})
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-md bg-paper px-4 py-3 text-sm text-ink-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, { text: q.explain })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					disabled: i === 0,
					onClick: () => setI((x) => x - 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Précédent"]
				}), i === questions.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !revealed,
					onClick: finish,
					children: "Voir le score"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !revealed,
					onClick: () => setI((x) => x + 1),
					children: ["Suivant", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				})]
			})
		]
	});
}
//#endregion
export { QuizPlayer as n, LessonBlocks as t };
