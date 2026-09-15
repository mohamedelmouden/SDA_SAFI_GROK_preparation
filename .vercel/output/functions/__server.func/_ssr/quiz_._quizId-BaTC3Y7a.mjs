import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as getQuiz, r as Route$1 } from "./router-Q6qF9BwN.mjs";
import { n as QuizPlayer } from "./quiz-player-B3WV0tNq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz_._quizId-BaTC3Y7a.js
var import_jsx_runtime = require_jsx_runtime();
function QuizPage() {
	const { quizId } = Route$1.useParams();
	const quiz = getQuiz(quizId);
	if (!quiz) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-ink-muted",
			children: "Quiz introuvable."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/quiz",
			className: "mt-3 inline-block text-sm font-medium text-accent",
			children: "Retour aux quiz"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/quiz",
				className: "text-xs font-medium text-ink-subtle hover:text-ink",
				children: "← Quiz & exercices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle",
				children: quiz.crumb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, {
					quizId: quiz.id,
					title: quiz.title,
					questions: quiz.questions
				})
			})
		]
	});
}
//#endregion
export { QuizPage as component };
