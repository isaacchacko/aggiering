import type { Metadata } from "next";
import { AboutInstructions } from "@/components/AboutInstructions";
import { JoinForm } from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Add Website",
};

export default function AddWebsitePage() {
  return (
    <>
      <div className="mt-6 space-y-3 text-neutral-600 sm:mt-8 sm:space-y-4">
        <p>
          The usual way to join is to submit the form below. If you can’t use the form, {" "}
          <a href="#add-your-website-manually" className="text-maroon underline underline-offset-2">
            follow the instructions below
          </a>{' '}
          to add your website manually.
        </p>
      </div>

      <JoinForm />

      <AboutInstructions />
    </>
  );
}
