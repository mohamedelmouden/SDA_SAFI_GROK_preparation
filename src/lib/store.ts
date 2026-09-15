import { create } from "zustand";
import { chapterKey } from "@/lib/utils";

const STORAGE_KEY = "sda-master-progress-v1";

export type QuizResult = { correct: number; total: number; at: number };
export type PlanSession = {
  id: string;
  date: string;
  start: string;
  end: string;
  subjectId: string;
  title: string;
};

export type ProgressState = {
  hydrated: boolean;
  name: string;
  completedChapters: string[];
  completedExercises: string[];
  quizResults: Record<string, QuizResult>;
  favorites: string[];
  notes: Record<string, string>;
  studySeconds: number;
  lastLesson: { subjectId: string; chapterId: string } | null;
  sessions: PlanSession[];
  dailySeconds: Record<string, number>;
  hydrate: () => void;
  setName: (name: string) => void;
  toggleChapter: (subjectId: string, chapterId: string) => void;
  markChapter: (subjectId: string, chapterId: string, done: boolean) => void;
  toggleExercise: (id: string) => void;
  saveQuiz: (id: string, correct: number, total: number) => void;
  toggleFavorite: (key: string) => void;
  setNote: (key: string, note: string) => void;
  addStudy: (seconds: number) => void;
  setLastLesson: (subjectId: string, chapterId: string) => void;
  addSession: (s: Omit<PlanSession, "id">) => void;
  removeSession: (id: string) => void;
  reset: () => void;
};

const defaults: Omit<
  ProgressState,
  | "hydrate"
  | "setName"
  | "toggleChapter"
  | "markChapter"
  | "toggleExercise"
  | "saveQuiz"
  | "toggleFavorite"
  | "setNote"
  | "addStudy"
  | "setLastLesson"
  | "addSession"
  | "removeSession"
  | "reset"
> = {
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
  dailySeconds: {},
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function persist(state: ProgressState) {
  if (typeof window === "undefined") return;
  const { hydrated: _h, ...rest } = state;
  const dump: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (typeof v === "function") continue;
    dump[k] = v;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dump));
  } catch {
    /* ignore quota */
  }
}

export const useProgress = create<ProgressState>((set, get) => ({
  ...defaults,
  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
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
          hydrated: true,
        });
        return;
      }
    } catch {
      /* ignore */
    }
    set({ hydrated: true });
  },
  setName: (name) => {
    set({ name });
    persist(get());
  },
  toggleChapter: (subjectId, chapterId) => {
    const key = chapterKey(subjectId, chapterId);
    const cur = get().completedChapters;
    const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
    set({ completedChapters: next });
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
    const next = cur.includes(id) ? cur.filter((k) => k !== id) : [...cur, id];
    set({ completedExercises: next });
    persist(get());
  },
  saveQuiz: (id, correct, total) => {
    set({
      quizResults: {
        ...get().quizResults,
        [id]: { correct, total, at: Date.now() },
      },
    });
    persist(get());
  },
  toggleFavorite: (key) => {
    const cur = get().favorites;
    const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
    set({ favorites: next });
    persist(get());
  },
  setNote: (key, note) => {
    set({ notes: { ...get().notes, [key]: note } });
    persist(get());
  },
  addStudy: (seconds) => {
    const day = todayKey();
    const daily = get().dailySeconds;
    set({
      studySeconds: get().studySeconds + seconds,
      dailySeconds: { ...daily, [day]: (daily[day] ?? 0) + seconds },
    });
    persist(get());
  },
  setLastLesson: (subjectId, chapterId) => {
    set({ lastLesson: { subjectId, chapterId } });
    persist(get());
  },
  addSession: (s) => {
    const id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set({ sessions: [...get().sessions, { ...s, id }] });
    persist(get());
  },
  removeSession: (id) => {
    set({ sessions: get().sessions.filter((x) => x.id !== id) });
    persist(get());
  },
  reset: () => {
    set({ ...defaults, hydrated: true });
    persist(get());
  },
}));

export function isChapterDone(completed: string[], subjectId: string, chapterId: string) {
  return completed.includes(chapterKey(subjectId, chapterId));
}
