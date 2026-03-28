"use client";

import Script from "next/script";
import { useCallback, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type JoinFormProps = {
  /** When true, sits at the top of the Add Website page (tighter top spacing). */
  isPageLead?: boolean;
};

export function JoinForm({ isPageLead }: JoinFormProps) {
  const baseId = useId();
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileRendered = useRef(false);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [year, setYear] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const onTurnstileLoad = useCallback(() => {
    const run = () => {
      if (turnstileRendered.current || !turnstileRef.current || !window.turnstile || !siteKey) {
        return;
      }
      turnstileRendered.current = true;
      setTurnstileError(null);
      window.turnstile!.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError(null);
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError(
            "Verification could not load. Check that this host is allowed in the Turnstile widget domains, or try disabling ad blockers.",
          );
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
      });
    };
    if (turnstileRef.current) {
      run();
    } else {
      requestAnimationFrame(run);
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setPrUrl(null);

    try {
      const res = await fetch("/api/webring/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          website,
          year,
          turnstileToken,
        }),
      });
      const data = (await res.json()) as { error?: string; prUrl?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong");
        return;
      }

      if (data.prUrl) {
        setStatus("success");
        setPrUrl(data.prUrl);
        setName("");
        setWebsite("");
        setYear("");
        setTurnstileToken("");
        turnstileRendered.current = false;
      } else {
        setStatus("error");
        setMessage("Unexpected response");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const turnstileEnabled = Boolean(siteKey);
  const submitBlocked =
    status === "loading" || (turnstileEnabled && turnstileToken.length === 0);

  const sectionMargin = isPageLead ? "mt-6 sm:mt-6" : "mt-8 sm:mt-10";

  return (
    <section
      className={`${sectionMargin} rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-5`}
    >
      <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 sm:text-lg">Add your website</h2>
      <p className="mt-2 text-[13px] text-neutral-600 dark:text-neutral-400 sm:text-sm">
        Submit your name, site URL, and graduation year. The review process is manual before it goes live.
      </p>

      {!turnstileEnabled && process.env.NODE_ENV === "production" && (
        <p className="mt-3 text-sm text-amber-800 dark:text-amber-200/90">
          The join form is not configured for this deployment (set Turnstile environment variables).
        </p>
      )}

      <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
        <div>
          <label htmlFor={`${baseId}-name`} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Name
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100"
            maxLength={120}
          />
        </div>
        <div>
          <label htmlFor={`${baseId}-website`} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Website (https)
          </label>
          <input
            id={`${baseId}-website`}
            name="website"
            type="url"
            required
            placeholder="https://yoursite.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor={`${baseId}-year`} className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Graduation year
          </label>
          <input
            id={`${baseId}-year`}
            name="year"
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            placeholder="2028"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 w-full max-w-[8rem] rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100"
            maxLength={4}
          />
        </div>

        {turnstileEnabled && (
          <>
            <div ref={turnstileRef} className="min-h-[65px]" />
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
              onLoad={onTurnstileLoad}
            />
          </>
        )}

        {turnstileEnabled && turnstileError && (
          <p className="text-sm text-amber-900 dark:text-amber-200/90" role="status">
            {turnstileError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitBlocked}
          className="mt-1 w-fit rounded bg-maroon px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Submitting…" : "Open pull request"}
        </button>
      </form>

      {status === "success" && prUrl && (
        <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
          Thanks! Your request was submitted as a pull request:{" "}
          <a href={prUrl} className="text-maroon underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            view on GitHub
          </a>
          . A maintainer will review it.
        </p>
      )}

      {status === "error" && message && (
        <p className="mt-4 text-sm text-red-800 dark:text-red-300" role="alert">
          {message}
        </p>
      )}
    </section>
  );
}
