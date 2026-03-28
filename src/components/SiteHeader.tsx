"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabBase =
  "inline-block border-b-2 pb-2 text-sm font-medium transition-colors sm:text-base";
const tabInactive = "border-transparent text-neutral-500 hover:text-neutral-800";
const tabActive = "border-maroon text-maroon";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <h1 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 sm:gap-2.5 sm:text-2xl md:text-3xl">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
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

      <nav className="mt-5 flex gap-8 border-b border-neutral-200 sm:mt-6" aria-label="Site">
        <Link href="/" className={`${tabBase} ${pathname === "/" ? tabActive : tabInactive}`}>
          Home
        </Link>
        <Link
          href="/about"
          className={`${tabBase} ${pathname === "/about" ? tabActive : tabInactive}`}
        >
          About
        </Link>
      </nav>
    </>
  );
}
