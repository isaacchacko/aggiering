import { GITHUB_REPO, GITHUB_WEBRING_DATA, SITE_ORIGIN, TAMU_URL } from "@/lib/site";

const EXAMPLE_ENTRY = `{
  name: "Your Name",
  website: "https://yoursite.com",
  year: "2028",
},`;

const BADGE_HTML = `<a href="${SITE_ORIGIN}" rel="noopener noreferrer">
  <img
    src="${SITE_ORIGIN}/VARIANT.svg"
    alt="aggier.ing — Texas A&M personal site webring"
    width="32"
    height="32"
  />
</a>`;

const BADGE_MARKDOWN = `[![aggier.ing webring](${SITE_ORIGIN}/VARIANT.svg)](${SITE_ORIGIN})`;

const BADGE_TSX = [
  "export function AggieringBadge() {",
  "  return (",
  `    <a href="${SITE_ORIGIN}" target="_blank" rel="noopener noreferrer">`,
  "      <img",
  `        src="${SITE_ORIGIN}/VARIANT.svg"`,
  "        alt=\"aggier.ing — Texas A&M personal site webring\"",
  "        width={32}",
  "        height={32}",
  "      />",
  "    </a>",
  "  );",
  "}",
].join("\n");

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-neutral-200 bg-neutral-50 p-3 text-[11px] leading-relaxed text-neutral-800 sm:text-xs md:text-[13px]">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function FieldTable({
  rows,
}: {
  rows: { field: string; notes: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse border border-neutral-200 text-left text-[13px] sm:text-sm">
        <thead>
          <tr className="bg-neutral-50">
            <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 sm:px-3 sm:py-2">
              Field
            </th>
            <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 sm:px-3 sm:py-2">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ field, notes }) => (
            <tr key={field}>
              <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 sm:px-3 sm:py-2 sm:text-[13px]">
                {field}
              </td>
              <td className="border border-neutral-200 px-2 py-1.5 text-neutral-700 sm:px-3 sm:py-2">
                {notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AboutInstructions() {
  return (
    <>
      <div className="mt-6 space-y-3 text-neutral-600 sm:mt-8 sm:space-y-4">
        <p>
          <a
            href="https://en.wikipedia.org/wiki/Webring"
            className="italic text-maroon underline underline-offset-2"
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
          Want to add your site to the list? Edit{" "}
          <a
            href={GITHUB_WEBRING_DATA}
            className="text-maroon underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code className="text-[0.95em]">src/data/webringData.ts</code>
          </a>{" "}
          and add your information at the <strong className="font-semibold text-neutral-800">bottom</strong> of the
          list. You can also add a link to{" "}
          <a href={SITE_ORIGIN} className="text-maroon underline underline-offset-2">
            aggier.ing
          </a>{" "}
          on your site so others can find the webring—see{" "}
          <a href="#adding-a-link-to-your-website" className="text-maroon underline underline-offset-2">
            Adding a link to your website
          </a>{" "}
          below.
        </p>
        <p>Hope you like it! If you have any questions or feedback, feel free to reach out.</p>
      </div>

      <section className="mt-8 space-y-4 text-neutral-600 sm:mt-10 sm:space-y-5">
        <h2 className="text-base font-semibold text-neutral-900 sm:text-lg">Adding your website / opening a PR</h2>
        <p>If this is your first time making a PR, no worries—follow these steps.</p>
        <ol className="list-decimal space-y-2 pl-5 marker:text-neutral-500">
          <li>
            Open{" "}
            <a
              href={GITHUB_WEBRING_DATA}
              className="text-maroon underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code className="text-[0.95em]">src/data/webringData.ts</code>
            </a>{" "}
            in the repository.
          </li>
          <li>
            Press the pencil icon to edit. Without write access, GitHub will fork the repo so you can open a pull
            request.
          </li>
          <li>
            Add <strong className="font-semibold text-neutral-800">one</strong> object at the{" "}
            <strong className="font-semibold text-neutral-800">bottom</strong> of the{" "}
            <code className="text-[0.95em]">webringData</code> array (keep the trailing comma style consistent with the
            file).
          </li>
          <li>Submit the PR.</li>
        </ol>
        <div className="space-y-2">
          <p className="font-medium text-neutral-800">Example entry:</p>
          <CodeBlock>{EXAMPLE_ENTRY}</CodeBlock>
        </div>
        <FieldTable
          rows={[
            { field: "name", notes: "How you want to appear on the hub." },
            {
              field: "website",
              notes: "Full https:// URL to your personal site; it should load for reviewers without a login.",
            },
            { field: "year", notes: 'Graduation year as a string (e.g. "2026").' },
          ]}
        />
      </section>

      <section
        id="adding-a-link-to-your-website"
        className="mt-8 scroll-mt-8 space-y-4 text-neutral-600 sm:mt-10 sm:space-y-5"
      >
        <h2 className="text-base font-semibold text-neutral-900 sm:text-lg">Adding a link to your website</h2>
        <p>
          Use a normal link to <span className="font-mono text-[0.95em] text-neutral-800">{SITE_ORIGIN}</span>. To show
          the webring badge, point an <code className="text-[0.95em]">&lt;img&gt;</code> at one of the SVGs we host (or
          copy the file from{" "}
          <a
            href={`${GITHUB_REPO}/tree/main/public`}
            className="text-maroon underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code className="text-[0.95em]">public/</code>
          </a>{" "}
          in this repo and serve it yourself).
        </p>
        <div className="space-y-2">
          <p className="font-medium text-neutral-800">Hosted badge URLs</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse border border-neutral-200 text-left text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 sm:px-3 sm:py-2">
                    Variant
                  </th>
                  <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 sm:px-3 sm:py-2">
                    URL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 sm:px-3 sm:py-2">Maroon (default)</td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 sm:px-3 sm:py-2 sm:text-[13px]">
                    {SITE_ORIGIN}/aggiering-maroon.svg
                  </td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 sm:px-3 sm:py-2">Black</td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 sm:px-3 sm:py-2 sm:text-[13px]">
                    {SITE_ORIGIN}/aggiering-black.svg
                  </td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 sm:px-3 sm:py-2">White (for dark backgrounds)</td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 sm:px-3 sm:py-2 sm:text-[13px]">
                    {SITE_ORIGIN}/aggiering-white.svg
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Replace <code className="text-[0.95em]">VARIANT.svg</code> below with the file you want (
          <code className="text-[0.95em]">aggiering-maroon.svg</code>,{" "}
          <code className="text-[0.95em]">aggiering-black.svg</code>, or{" "}
          <code className="text-[0.95em]">aggiering-white.svg</code>).
        </p>
        <p>
          The badge files are square (24×24 viewBox); use equal <code className="text-[0.95em]">width</code> and{" "}
          <code className="text-[0.95em]">height</code> so the ring stays round.
        </p>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 sm:text-base">HTML</h3>
          <p className="text-[13px] sm:text-sm">
            Use this in static pages, Eleventy/Hugo layouts, or inside Vue/Svelte/Astro/Nuxt templates (swap in your
            router&apos;s link component if you use one).
          </p>
          <CodeBlock>{BADGE_HTML}</CodeBlock>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 sm:text-base">Markdown</h3>
          <CodeBlock>{BADGE_MARKDOWN}</CodeBlock>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 sm:text-base">Typescript (.tsx)</h3>
          <p className="text-[13px] sm:text-sm">
            Works for React, Next.js, Remix, etc. On Next.js you can use <code className="text-[0.95em]">Link</code> from{" "}
            <code className="text-[0.95em]">next/link</code> instead of <code className="text-[0.95em]">&lt;a&gt;</code>;
            with <code className="text-[0.95em]">next/image</code>, allow <code className="text-[0.95em]">aggier.ing</code>{" "}
            in <code className="text-[0.95em]">images.remotePatterns</code> or stick to <code className="text-[0.95em]">&lt;img&gt;</code>{" "}
            (simplest for static export / external badges).
          </p>
          <CodeBlock>{BADGE_TSX}</CodeBlock>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 sm:text-base">Self-hosting the SVG</h3>
          <p>
            Download{" "}
            <a
              href={`${GITHUB_REPO}/blob/main/public/aggiering-maroon.svg`}
              className="text-maroon underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code className="text-[0.95em]">aggiering-maroon.svg</code>
            </a>{" "}
            (or black/white) from this repo, place it in your site&apos;s static assets, and set{" "}
            <code className="text-[0.95em]">src</code> to your own path instead of{" "}
            <span className="font-mono text-[0.95em] text-neutral-800">{SITE_ORIGIN}/...</span>.
          </p>
        </div>
      </section>
    </>
  );
}
