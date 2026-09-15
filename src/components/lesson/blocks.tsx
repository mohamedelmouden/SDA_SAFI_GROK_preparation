import { useState } from "react";
import katex from "katex";
import { Check, Copy, Lightbulb, TriangleAlert, GraduationCap, KeyRound } from "lucide-react";
import type { CalloutKind, ContentBlock } from "@/lib/content/types";
import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

function renderTex(tex: string, display: boolean) {
  return katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
    output: "html",
  });
}

export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = renderTex(tex, display);
  if (display) {
    return (
      <div
        className="my-3 overflow-x-auto rounded-md bg-surface px-3 py-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

const TOKEN = /(\$\$[\s\S]+?\$\$|\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`)/g;

export function Rich({ text, className }: { text: string; className?: string }) {
  const parts = text.split(TOKEN);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <Tex key={i} tex={part.slice(2, -2)} display />;
        }
        if (part.startsWith("$") && part.endsWith("$")) {
          return <Tex key={i} tex={part.slice(1, -1)} />;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded-xs bg-accent-soft px-1 py-0.5 font-mono text-[0.85em] text-accent">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function Callout({ kind, title, body }: { kind: CalloutKind; title: string; body: string }) {
  const map = {
    tip: { icon: Lightbulb, wrap: "bg-accent-soft/70 border-accent/20", iconC: "text-accent" },
    exam: { icon: GraduationCap, wrap: "bg-warn-soft border-warn/20", iconC: "text-warn" },
    key: { icon: KeyRound, wrap: "bg-stats-soft border-stats/20", iconC: "text-stats" },
    warning: { icon: TriangleAlert, wrap: "bg-danger-soft border-danger/20", iconC: "text-danger" },
  } as const;
  const m = map[kind];
  const Icon = m.icon;
  return (
    <aside className={cn("my-4 flex gap-3 rounded-lg border px-4 py-3", m.wrap)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", m.iconC)} />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          <Rich text={body} />
        </p>
      </div>
    </aside>
  );
}

function CodeBlock({ code, lang, title }: { code: string; lang: "c" | "sql" | "text" | "bash"; title?: string }) {
  const [copied, setCopied] = useState(false);
  const html = highlight(code, lang === "bash" ? "text" : lang);
  return (
    <div className="group my-4 overflow-hidden rounded-lg bg-code shadow-card">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-muted">
          {title ?? lang}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xs px-2 py-1 text-[11px] font-medium text-sidebar-muted hover:bg-white/5 hover:text-sidebar-fg"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            } catch {
              /* ignore */
            }
          }}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
      <pre className="code-hl overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-code-fg">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

function BlockView({ block }: { block: ContentBlock }) {
  switch (block.t) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-10 scroll-mt-24 font-sans text-xl font-semibold tracking-tight text-ink first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-6 font-sans text-base font-semibold text-ink">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-3 font-serif text-[17px] leading-[1.7] text-ink/90">
          <Rich text={block.text} />
        </p>
      );
    case "math":
      return <Tex tex={block.tex} display />;
    case "formula":
      return (
        <figure className="my-4 rounded-lg border border-line bg-surface px-4 py-3">
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
            {block.name}
          </figcaption>
          <Tex tex={block.tex} display />
          {block.note ? (
            <p className="text-sm text-ink-muted">
              <Rich text={block.note} />
            </p>
          ) : null}
        </figure>
      );
    case "code":
      return <CodeBlock code={block.code} lang={block.lang} title={block.title} />;
    case "callout":
      return <Callout kind={block.kind} title={block.title} body={block.body} />;
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 font-serif text-[17px] leading-relaxed text-ink/90">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 font-serif text-[17px] leading-relaxed text-ink/90">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="my-4 overflow-x-auto rounded-lg border border-line">
          {block.caption ? (
            <p className="border-b border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-muted">
              {block.caption}
            </p>
          ) : null}
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-paper text-ink-muted">
              <tr>
                {block.cols.map((c) => (
                  <th key={c} className="px-3 py-2 font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 align-top text-ink">
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "example":
      return (
        <div className="my-5 rounded-xl border border-line bg-paper/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Exemple — {block.title}</p>
          <div className="mt-1">
            {block.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
