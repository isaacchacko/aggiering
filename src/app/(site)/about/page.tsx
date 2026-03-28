import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN, TAMU_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mt-6 space-y-3 text-neutral-600 dark:text-neutral-400 sm:mt-8 sm:space-y-4">
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
        Want to add your site? Open the{" "}
        <Link href="/add-website" className="text-maroon underline underline-offset-2">
          Add Website
        </Link>{" "}
        tab and submit the form. Afterwards, consider linking to{" "}
        <a href={SITE_ORIGIN} className="text-maroon underline underline-offset-2">
          aggier.ing
        </a>{" "}
        from your own site so others can find the webring!
      </p>
      <p>Hope you like it! If you have any questions or feedback, feel free to reach out.</p>
      <p>- Isaac</p>
    </div>
  );
}
