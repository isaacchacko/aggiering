import type { Metadata } from "next";
import { AboutInstructions } from "@/components/AboutInstructions";
import { JoinForm } from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Add Website",
};

const stickySectionHeading =
  "sticky top-0 z-10 -mx-4 border-b border-neutral-200 bg-[var(--background)] px-4 py-2 text-base font-semibold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100 sm:text-lg";

export default function AddWebsitePage() {
  return (
    <>
      <nav
        aria-label="Table of contents"
        className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50/80 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900/40 sm:mt-8 sm:px-5 sm:py-4"
      >
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">On this page</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] text-neutral-700 marker:text-neutral-500 dark:text-neutral-300 sm:text-sm">
          <li>
            <a href="#add-your-website" className="text-maroon underline underline-offset-2">
              Add your website
            </a>
          </li>
          <li>
            <a href="#add-your-website-manually" className="text-maroon underline underline-offset-2">
              Add your website manually
            </a>
          </li>
          <li>
            <a href="#adding-a-link-to-your-website" className="text-maroon underline underline-offset-2">
              Adding a link to your website
            </a>
          </li>
        </ol>
      </nav>

      <div className="mt-6 space-y-3 text-neutral-600 sm:mt-8 sm:space-y-4">
        <p>
          The usual way to join is to submit the form below. If you can’t use the form,{" "}
          <a href="#add-your-website-manually" className="text-maroon underline underline-offset-2">
            follow the instructions below
          </a>{" "}
          to add your website manually.
        </p>
      </div>

      <section id="add-your-website" className="mt-6 scroll-mt-8 sm:mt-8">
        <h2 className={stickySectionHeading}>Add your website</h2>
        <p className="mt-8">
          Submit your name, site URL, a public profile link to verify who you are (e.g. LinkedIn), and graduation year. After, your response is manually reviewed before it goes live.
        </p>
        <JoinForm isPageLead />
      </section>

      <AboutInstructions />
    </>
  );
}
