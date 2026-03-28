"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_REPO } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const tabBase =
  "inline-block border-b-2 pb-2 text-sm font-medium transition-colors sm:text-base";
const tabInactive =
  "border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200";
const tabActive = "border-maroon text-maroon";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 sm:gap-2.5 sm:text-2xl md:text-3xl">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aggiering-maroon.svg"
              alt=""
              width={26}
              height={26}
              className="h-[22px] w-[22px] shrink-0 sm:h-[26px] sm:w-[26px] md:h-7 md:w-7"
            />
            <span>aggier.ing</span>
          </Link>
        </h1>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <ThemeToggle />
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-neutral-600 transition-[color,transform,background-color] duration-200 hover:scale-105 hover:bg-neutral-100 hover:text-maroon active:scale-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            aria-label="View source on GitHub"
          >
            <GitHubIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
        </div>
      </div>

      <nav
        className="mt-5 flex gap-8 border-b border-neutral-200 dark:border-neutral-700 sm:mt-6"
        aria-label="Site"
      >
        <Link href="/" className={`${tabBase} ${pathname === "/" ? tabActive : tabInactive}`}>
          Home
        </Link>
        <Link
          href="/about"
          className={`${tabBase} ${pathname === "/about" ? tabActive : tabInactive}`}
        >
          About
        </Link>
        <Link
          href="/add-website"
          className={`${tabBase} ${pathname === "/add-website" ? tabActive : tabInactive}`}
        >
          Add Website
        </Link>
      </nav>
    </>
  );
}
