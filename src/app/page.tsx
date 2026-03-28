import { webringData, type WebringMember } from "@/data/webringData";
import { GITHUB_PULLS, GITHUB_REPO, TAMU_URL } from "@/lib/site";

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

export default function Home() {
  const byYear = membersByYear(webringData);
  const totalCount = webringData.length;

  return (
    <div className="aggiering-main mx-auto max-w-xl px-4 py-10 text-sm leading-relaxed text-neutral-800 sm:py-12 sm:text-[15px] md:text-base lg:text-lg">
      <h1 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 italic sm:gap-2.5 sm:text-2xl md:text-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/aggiering-maroon.svg"
          alt=""
          width={26}
          height={26}
          className="h-[22px] w-[22px] shrink-0 sm:h-[26px] sm:w-[26px] md:h-7 md:w-7"
        />
        <span>aggier.ing</span>
      </h1>

      <div className="mt-5 space-y-3 text-neutral-600 sm:mt-6 sm:space-y-4">

        <p>
          <a
            href="https://en.wikipedia.org/wiki/Webring"
            className="text-maroon underline underline-offset-2 italic"
            target="_blank"
            rel="noopener noreferrer"
          >
            What&apos;s a webring?
          </a>
        </p>
        <p>
          Howdy! Welcome to an unofficial webring for students and alumni from{" "}
          <a
            href={TAMU_URL}
            className="text-maroon underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Texas A&amp;M University
          </a>{" "}
          with personal sites/portfolios.
        </p>
        <p>
          Want to add your site? {" "}
          <a
            href={GITHUB_PULLS}
            className="italic text-maroon underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open a PR here!</a>

        </p>
        <p>
          Hope you like it! If you have any questions/feedback, feel free to reach out.
        </p>
        <p>
          - Isaac
        </p>
        <p>
          <a
            href={GITHUB_REPO}
            className="text-maroon underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </p>
      </div>

      <hr className="mt-8 border-t border-neutral-200 sm:mt-10" />

      <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8">
        {totalCount === 0 ? (
          <p className="text-neutral-600">Aw man! No websites.</p>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 sm:text-xs md:text-sm">
              {totalCount} {totalCount === 1 ? "member" : "members"} total
            </p>
            {byYear.map(({ year, members }) => (
              <section key={year} className="flex flex-col gap-3 sm:gap-4">
                <h2 className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 sm:text-xs md:text-sm">
                  <span>{year}</span>
                  <span className="ml-2 tabular-nums text-neutral-400">
                    ({members.length})
                  </span>
                </h2>
                <div className="flex flex-col gap-4">
                  {members.map((m) => {
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
                        <p className="text-neutral-800">
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}
