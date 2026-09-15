export type CalloutKind = "tip" | "exam" | "key" | "warning";
export type Difficulty = "facile" | "moyen" | "difficile";
export type SubjectColor = "algo" | "bdd" | "stats" | "archi";
export type CodeLang = "c" | "sql" | "text" | "bash";

export type ContentBlock =
  | { t: "h2"; text: string; id?: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "math"; tex: string }
  | { t: "code"; lang: CodeLang; title?: string; code: string }
  | { t: "callout"; kind: CalloutKind; title: string; body: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption?: string; cols: string[]; rows: string[][] }
  | { t: "formula"; name: string; tex: string; note?: string }
  | { t: "example"; title: string; blocks: ContentBlock[] };

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Exercise = {
  id: string;
  title: string;
  difficulty: Difficulty;
  durationMin: number;
  prompt: string;
  hint?: string;
  solution: string;
};

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  objectives: string[];
  blocks: ContentBlock[];
  quiz: QuizQuestion[];
  exercises: Exercise[];
};

export type Subject = {
  id: string;
  short: string;
  title: string;
  color: SubjectColor;
  description: string;
  examFocus: string;
  learn: string[];
  tips: string[];
  chapters: Chapter[];
};

export type Resource = {
  id: string;
  title: string;
  kind: "fiche" | "annale" | "lien" | "video" | "divers";
  subjectId?: string;
  blurb: string;
  href?: string;
  internalTo?: string;
  countLabel?: string;
};

export type PlanBlock = {
  id: string;
  date: string;
  start: string;
  end: string;
  subjectId: string | "mix" | "exam";
  title: string;
  note?: string;
};
