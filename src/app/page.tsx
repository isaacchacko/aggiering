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
    <div className="aggiering-main mx-auto max-w-xl px-4 py-12 text-[15px] leading-relaxed text-neutral-800">
      <h1 className="flex items-center gap-2.5 text-2xl font-semibold text-neutral-900 italic">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.maroon.svg"
          alt=""
          width={26}
          height={26}
          className="shrink-0"
        />
        <span>aggier.ing</span>
      </h1>

      <div className="mt-6 space-y-4 text-neutral-600">

        <p>
          <a
            href="https://en.wikipedia.org/wiki/Webring"
            className="text-maroon underline underline-offset-2 italic"
          >
            What&apos;s a webring?
          </a>
        </p>
        <p>
          Howdy! Welcome to an unofficial webring for students and alumni from{" "}
          <a href={TAMU_URL} className="text-maroon underline underline-offset-2">
            Texas A&amp;M University
          </a>{" "}
          with personal sites/portfolios.
        </p>
        <p>
          Want to add your site? {" "}
          <a href={GITHUB_PULLS} className="italic text-maroon underline underline-offset-2">
            Open a PR here!</a>

        </p>
        <p>
          Hope you like it! If you have any questions/feedback, feel free to reach out.
        </p>
        <p>
          - Isaac
        </p>
        <p>
          <a href={GITHUB_REPO} className="text-maroon underline underline-offset-2">

          </a>
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8 text-[15px]">
        {totalCount === 0 ? (
          <p className="text-neutral-600">Aw man! No websites.</p>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {totalCount} {totalCount === 1 ? "member" : "members"} total
            </p>
            {byYear.map(({ year, members }) => (
              <section key={year} className="flex flex-col gap-4">
                <h2 className="text-xs font-medium uppercase tracking-wide text-neutral-500">
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
