"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/** Prism language ids we use on the site */
export type CodeBlockLanguage = "typescript" | "tsx" | "markup" | "markdown";

type CodeBlockProps = {
  code: string;
  language: CodeBlockLanguage;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const prismStyle = mounted && resolvedTheme === "dark" ? oneDark : oneLight;

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [code]);

  return (
    <div className="group relative overflow-x-auto rounded-md border border-neutral-200 bg-[#fafafa] shadow-sm dark:border-neutral-600 dark:bg-neutral-900">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 rounded border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 sm:text-xs"
        aria-label={copied ? "Copied" : "Copy code to clipboard"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <SyntaxHighlighter
        className="text-[11px] sm:text-[13px]"
        language={language}
        style={prismStyle}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "2.25rem 0.75rem 0.75rem",
          background: "transparent",
          lineHeight: 1.65,
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          },
        }}
        showLineNumbers={false}
      >
        {code.replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
