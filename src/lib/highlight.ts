import type { CodeLang } from "@/lib/content/types";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

const C_KW =
  /^(auto|break|case|const|continue|default|do|else|enum|extern|for|goto|if|register|return|sizeof|static|struct|switch|typedef|union|volatile|while|restrict)$/;
const C_TY =
  /^(char|int|float|double|long|short|signed|unsigned|void|size_t|FILE|NULL|bool)$/;
const C_FN =
  /^(printf|scanf|sprintf|sscanf|malloc|calloc|realloc|free|strlen|strcpy|strncpy|strcmp|strcat|memcpy|memset|fopen|fclose|fprintf|fscanf|fgets|fputs|getchar|putchar|main|atoi|atof)$/;

const SQL_KW =
  /^(select|from|where|join|inner|left|right|full|outer|on|group|by|order|having|insert|into|values|update|set|delete|create|table|view|index|drop|alter|and|or|not|in|as|distinct|limit|offset|union|all|exists|case|when|then|else|end|like|between|null|is|asc|desc|primary|key|foreign|references|unique|check|default|constraint|with)$/;

function highlightCLine(line: string): string {
  if (/^\s*#/.test(line)) {
    return `<span class="pp">${line}</span>`;
  }
  const out: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "/" && line[i + 1] === "/") {
      out.push(`<span class="cm">${line.slice(i)}</span>`);
      break;
    }
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j += 2;
        else j += 1;
      }
      out.push(`<span class="st">${line.slice(i, j + 1)}</span>`);
      i = j + 1;
      continue;
    }
    if (line[i] === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== "'") {
        if (line[j] === "\\") j += 2;
        else j += 1;
      }
      out.push(`<span class="st">${line.slice(i, j + 1)}</span>`);
      i = j + 1;
      continue;
    }
    if (/[A-Za-z_]/.test(line[i]!)) {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j]!)) j += 1;
      const w = line.slice(i, j);
      if (C_KW.test(w)) out.push(`<span class="kw">${w}</span>`);
      else if (C_TY.test(w)) out.push(`<span class="ty">${w}</span>`);
      else if (C_FN.test(w)) out.push(`<span class="fn">${w}</span>`);
      else out.push(w);
      i = j;
      continue;
    }
    if (/[0-9]/.test(line[i]!)) {
      let j = i + 1;
      while (j < line.length && /[0-9.xXa-fA-F]/.test(line[j]!)) j += 1;
      out.push(`<span class="nu">${line.slice(i, j)}</span>`);
      i = j;
      continue;
    }
    out.push(line[i]!);
    i += 1;
  }
  return out.join("");
}

function highlightSql(src: string): string {
  return src.split("\n").map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("--")) return `<span class="cm">${line}</span>`;
    return line.replace(/('[^']*'|"[^"]*"|[A-Za-z_]+|[0-9]+)/g, (tok) => {
      if (tok.startsWith("'") || tok.startsWith('"')) return `<span class="st">${tok}</span>`;
      if (/^[0-9]+$/.test(tok)) return `<span class="nu">${tok}</span>`;
      if (SQL_KW.test(tok.toLowerCase())) return `<span class="kw">${tok}</span>`;
      return tok;
    });
  }).join("\n");
}

export function highlight(code: string, lang: CodeLang): string {
  const escaped = escapeHtml(code.replace(/\n$/, ""));
  if (lang === "c") {
    return escaped.split("\n").map(highlightCLine).join("\n");
  }
  if (lang === "sql") return highlightSql(escaped);
  return escaped;
}
