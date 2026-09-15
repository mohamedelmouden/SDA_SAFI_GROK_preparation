import { algoC } from "./algo-c";
import { bdd } from "./bdd";
import { stats } from "./stats";
import { archi } from "./archi";
import { BLANCS } from "./annales";
import { RESOURCES } from "./resources";
import { CRASH_PLAN } from "./plan";
import type { Chapter, Subject, QuizQuestion, Exercise } from "./types";

export const SUBJECTS: Subject[] = [algoC, bdd, stats, archi];

export { BLANCS, RESOURCES, CRASH_PLAN };

export function getSubject(id: string) {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChapter(subjectId: string, chapterId: string) {
  const s = getSubject(subjectId);
  if (!s) return null;
  const chapter = s.chapters.find((c) => c.id === chapterId);
  if (!chapter) return null;
  return { subject: s, chapter };
}

export function chapterIndex(subject: Subject, chapterId: string) {
  return subject.chapters.findIndex((c) => c.id === chapterId);
}

export function neighbors(subject: Subject, chapterId: string) {
  const i = chapterIndex(subject, chapterId);
  return {
    prev: i > 0 ? subject.chapters[i - 1] : undefined,
    next: i >= 0 && i < subject.chapters.length - 1 ? subject.chapters[i + 1] : undefined,
    index: i,
  };
}

export type SearchHit = {
  href: string;
  title: string;
  crumb: string;
  kind: "chapitre" | "exercice" | "quiz" | "matiere";
};

export function searchContent(q: string): SearchHit[] {
  const s = q.trim().toLowerCase();
  if (s.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const sub of SUBJECTS) {
    if (sub.title.toLowerCase().includes(s) || sub.short.toLowerCase().includes(s)) {
      hits.push({ href: `/matieres/${sub.id}`, title: sub.title, crumb: "Matière", kind: "matiere" });
    }
    for (const ch of sub.chapters) {
      const blob = `${ch.title} ${ch.subtitle} ${ch.objectives.join(" ")}`.toLowerCase();
      if (blob.includes(s)) {
        hits.push({
          href: `/matieres/${sub.id}/${ch.id}`,
          title: ch.title,
          crumb: sub.short,
          kind: "chapitre",
        });
      }
      for (const ex of ch.exercises) {
        if (ex.title.toLowerCase().includes(s) || ex.prompt.toLowerCase().includes(s)) {
          hits.push({
            href: `/matieres/${sub.id}/${ch.id}#exercices`,
            title: ex.title,
            crumb: `${sub.short} · exercice`,
            kind: "exercice",
          });
        }
      }
    }
  }
  return hits.slice(0, 12);
}

export function allQuizzes(): { id: string; title: string; crumb: string; questions: QuizQuestion[] }[] {
  const list: { id: string; title: string; crumb: string; questions: QuizQuestion[] }[] = [];
  for (const sub of SUBJECTS) {
    const bank: QuizQuestion[] = [];
    for (const ch of sub.chapters) {
      list.push({
        id: `${sub.id}:${ch.id}`,
        title: `Quiz — ${ch.title.replace(/^Chapitre \d+ — /, "")}`,
        crumb: sub.short,
        questions: ch.quiz,
      });
      bank.push(...ch.quiz);
    }
    list.push({
      id: `${sub.id}:all`,
      title: `Quiz complet — ${sub.short}`,
      crumb: sub.short,
      questions: bank,
    });
  }
  for (const b of BLANCS) {
    list.push({ id: b.id, title: b.title, crumb: "Sujet blanc", questions: b.questions });
  }
  return list;
}

export function getQuiz(id: string) {
  return allQuizzes().find((q) => q.id === id);
}

export function allExercises(): { subject: Subject; chapter: Chapter; exercise: Exercise }[] {
  const out: { subject: Subject; chapter: Chapter; exercise: Exercise }[] = [];
  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const exercise of chapter.exercises) out.push({ subject, chapter, exercise });
    }
  }
  return out;
}

export function totals() {
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
  return { subjects: SUBJECTS.length, chapters, exercises, questions };
}
