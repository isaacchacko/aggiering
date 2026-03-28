"use client";

import { useId, useMemo, useState } from "react";
import type { WebringMember } from "@/data/webringData";

function hostnameOnly(website: string): string {
  try {
    return new URL(website).hostname.replace(/^www\./, "");
  } catch {
    return website;
  }
}

function faviconFor(website: string): string {
  let host: string;
  try {
    host = new URL(website).hostname;
  } catch {
    return "";
  }
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=32`;
}

function membersByYear(members: WebringMember[]): { year: string; members: WebringMember[] }[] {
  const map = new Map<string, WebringMember[]>();
  for (const m of members) {
    const list = map.get(m.year) ?? [];
    list.push(m);
    map.set(m.year, list);
  }
  const years = [...map.keys()].sort((a, b) => Number(b) - Number(a));
  return years.map((year) => ({ year, members: map.get(year)! }));
}

function withoutUrlScheme(s: string): string {
  return s.trim().toLowerCase().replace(/^https?:\/\//i, "");
}

function memberMatchesQuery(m: WebringMember, q: string): boolean {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  if (m.name.toLowerCase().includes(t)) return true;
  if (m.year.toLowerCase().includes(t)) return true;
  const urlNeedle = withoutUrlScheme(q);
  if (urlNeedle) {
    const urlHaystack = withoutUrlScheme(m.website);
    if (urlHaystack.includes(urlNeedle)) return true;
    try {
      const host = new URL(m.website).hostname.replace(/^www\./, "").toLowerCase();
      if (host.includes(urlNeedle)) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
}

type SortMode = "default" | "alpha";

type WebringMemberListProps = {
  members: WebringMember[];
};

const inputLikeClassName =
  "w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100";

export function WebringMemberList({ members }: WebringMemberListProps) {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("default");

  const filtered = useMemo(() => members.filter((m) => memberMatchesQuery(m, query)), [members, query]);
  const byYear = useMemo(() => {
    const grouped = membersByYear(filtered);
    if (sortMode !== "alpha") return grouped;
    return grouped.map(({ year, members: yearMembers }) => ({
      year,
      members: [...yearMembers].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    }));
  }, [filtered, sortMode]);
  const totalCount = members.length;
  const filteredCount = filtered.length;
  const isSearching = query.trim().length > 0;

  if (totalCount === 0) {
    return <p className="text-neutral-600 dark:text-neutral-400">Aw man! No websites.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <p className="text-[11px] font-medium uppercase tracking-wide self-center text-neutral-500 dark:text-neutral-500 sm:text-xs md:text-sm">
          {isSearching ? (
            <>
              Showing {filteredCount} of {totalCount} {totalCount === 1 ? "member" : "members"}
            </>
          ) : (
            <>
              {totalCount} {totalCount === 1 ? "member" : "members"} total
            </>
          )}
        </p>
        <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row sm:items-end sm:gap-2">
          <div className="w-full sm:min-w-[11rem] sm:max-w-[12rem]">
            <label htmlFor={`${baseId}-sort`} className="sr-only">
              Sort members
            </label>
            <select
              id={`${baseId}-sort`}
              name="member-sort"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className={inputLikeClassName}
            >
              <option value="default">Default order</option>
              <option value="alpha">Alphabetical (A–Z)</option>
            </select>
          </div>
          <div className="w-full sm:max-w-xs sm:flex-1">
            <label htmlFor={`${baseId}-search`} className="sr-only">
              Search members by name, year, or URL
            </label>
            <input
              id={`${baseId}-search`}
              type="search"
              name="member-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, year, or URL…"
              autoComplete="off"
              className={`${inputLikeClassName} placeholder:text-neutral-400 dark:placeholder:text-neutral-500`}
            />
          </div>
        </div>
      </div>

      {filteredCount === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">No members match your search.</p>
      ) : (
        byYear.map(({ year, members: yearMembers }) => (
          <section key={year} className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500 sm:text-xs md:text-sm">
              <span>{year}</span>
              <span className="ml-2 tabular-nums text-neutral-400 dark:text-neutral-500">({yearMembers.length})</span>
            </h2>
            <div className="flex flex-col gap-4">
              {yearMembers.map((m) => {
                const host = hostnameOnly(m.website);
                const fav = faviconFor(m.website);
                return (
                  <div key={m.website} className="flex flex-row items-center gap-3">
                    {fav ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={fav}
                        alt=""
                        width={16}
                        height={16}
                        className="block shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <span className="inline-block h-4 w-4 shrink-0" aria-hidden />
                    )}
                    <p className="text-neutral-800 dark:text-neutral-200">
                      {m.name}
                      {" // "}
                      <a
                        href={m.website}
                        className="text-maroon underline underline-offset-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {host}
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </>
  );
}
