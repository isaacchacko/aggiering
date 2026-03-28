import { CodeBlock } from "@/components/CodeBlock";
import { GITHUB_REPO, GITHUB_WEBRING_DATA, SITE_ORIGIN } from "@/lib/site";

const stickySectionHeading =
  "sticky top-0 z-10 -mx-4 border-b border-neutral-200 bg-[var(--background)] px-4 py-2 text-base font-semibold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100 sm:text-lg";

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

function FieldTable({
  rows,
}: {
  rows: { field: string; notes: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[280px] border-collapse border border-neutral-200 text-left text-[13px] dark:border-neutral-600 sm:text-sm">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-900">
            <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 dark:border-neutral-600 dark:text-neutral-100 sm:px-3 sm:py-2">
              Field
            </th>
            <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 dark:border-neutral-600 dark:text-neutral-100 sm:px-3 sm:py-2">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ field, notes }) => (
            <tr key={field}>
              <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 dark:border-neutral-600 dark:text-neutral-200 sm:px-3 sm:py-2 sm:text-[13px]">
                {field}
              </td>
              <td className="border border-neutral-200 px-2 py-1.5 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300 sm:px-3 sm:py-2">
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
      <section
        id="add-your-website-manually"
        className="mt-10 scroll-mt-8 space-y-4 text-neutral-600 dark:text-neutral-400 sm:mt-12 sm:space-y-5"
      >
        <h2 className={stickySectionHeading}>Add your website manually</h2>
        <p>
          Prefer to edit the repo yourself, or need a fork-based PR? If this is your first time making a PR, no
          worries!
        </p>
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
            Press the pencil icon to edit. Without write access, GitHub will automatically fork the repo so you can open a pull
            request.
          </li>
          <li>
            Add <strong className="font-semibold text-neutral-800 dark:text-neutral-200">one</strong> object at the{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-200">bottom</strong> of the{" "}
            <code className="text-[0.95em]">webringData</code> array with only{" "}
            <code className="text-[0.95em]">name</code>, <code className="text-[0.95em]">website</code>, and{" "}
            <code className="text-[0.95em]">year</code> (same shape as the join form; do not add extra fields). Keep the
            trailing comma style consistent with the file.
          </li>
          <li>
            Use <code className="text-[0.95em]">https</code> for <code className="text-[0.95em]">website</code> and make
            sure the site loads for reviewers without a login wall.
          </li>
          <li>
            Submit the pull request. In the PR <strong className="font-semibold text-neutral-800 dark:text-neutral-200">description</strong>, include a public{" "} link to a profile to
            help verify who you are and your Texas A&amp;M affiliation (e.g. LinkedIn).
          </li>
        </ol>
        <div className="space-y-2">
          <p className="font-medium text-neutral-800 dark:text-neutral-200">Example entry:</p>
          <CodeBlock code={EXAMPLE_ENTRY} language="typescript" />
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
        className="mt-8 scroll-mt-8 space-y-4 text-neutral-600 dark:text-neutral-400 sm:mt-10 sm:space-y-5"
      >
        <h2 className={stickySectionHeading}>Adding a link to your website</h2>
        <p>
          Use a normal link to{" "}
          <span className="font-mono text-[0.95em] text-neutral-800 dark:text-neutral-200">{SITE_ORIGIN}</span>. To show
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
          <p className="font-medium text-neutral-800 dark:text-neutral-200">Hosted badge URLs</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse border border-neutral-200 text-left text-[13px] dark:border-neutral-600 sm:text-sm">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 dark:border-neutral-600 dark:text-neutral-100 sm:px-3 sm:py-2">
                    Variant
                  </th>
                  <th className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-900 dark:border-neutral-600 dark:text-neutral-100 sm:px-3 sm:py-2">
                    URL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 dark:border-neutral-600 sm:px-3 sm:py-2">
                    Maroon (default)
                  </td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 dark:border-neutral-600 dark:text-neutral-200 sm:px-3 sm:py-2 sm:text-[13px]">
                    {SITE_ORIGIN}/aggiering-maroon.svg
                  </td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 dark:border-neutral-600 sm:px-3 sm:py-2">Black</td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 dark:border-neutral-600 dark:text-neutral-200 sm:px-3 sm:py-2 sm:text-[13px]">
                    {SITE_ORIGIN}/aggiering-black.svg
                  </td>
                </tr>
                <tr>
                  <td className="border border-neutral-200 px-2 py-1.5 dark:border-neutral-600 sm:px-3 sm:py-2">
                    White (for dark backgrounds)
                  </td>
                  <td className="border border-neutral-200 px-2 py-1.5 font-mono text-[12px] text-neutral-800 dark:border-neutral-600 dark:text-neutral-200 sm:px-3 sm:py-2 sm:text-[13px]">
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
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">HTML</h3>
          <p className="text-[13px] sm:text-sm">
            Use this in static pages, Eleventy/Hugo layouts, or inside Vue/Svelte/Astro/Nuxt templates (swap in your
            router&apos;s link component if you use one).
          </p>
          <CodeBlock code={BADGE_HTML} language="markup" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">Markdown</h3>
          <CodeBlock code={BADGE_MARKDOWN} language="markdown" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">Typescript (.tsx)</h3>
          <p className="text-[13px] sm:text-sm">
            Works for React, Next.js, Remix, etc. On Next.js you can use <code className="text-[0.95em]">Link</code> from{" "}
            <code className="text-[0.95em]">next/link</code> instead of <code className="text-[0.95em]">&lt;a&gt;</code>;
            with <code className="text-[0.95em]">next/image</code>, allow <code className="text-[0.95em]">aggier.ing</code>{" "}
            in <code className="text-[0.95em]">images.remotePatterns</code> or stick to <code className="text-[0.95em]">&lt;img&gt;</code>{" "}
            (simplest for static export / external badges).
          </p>
          <CodeBlock code={BADGE_TSX} language="tsx" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 sm:text-base">Self-hosting the SVG</h3>
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
            <span className="font-mono text-[0.95em] text-neutral-800 dark:text-neutral-200">{SITE_ORIGIN}/...</span>.
          </p>
        </div>
      </section>
    </>
  );
}
