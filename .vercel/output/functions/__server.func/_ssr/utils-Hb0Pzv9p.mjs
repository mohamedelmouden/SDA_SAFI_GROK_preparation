import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Hb0Pzv9p.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatDuration(min) {
	if (min < 60) return `${min} min`;
	const h = Math.floor(min / 60);
	const m = min % 60;
	return m ? `${h}h ${m}min` : `${h}h`;
}
function chapterKey(subjectId, chapterId) {
	return `${subjectId}:${chapterId}`;
}
//#endregion
export { cn as n, formatDuration as r, chapterKey as t };
