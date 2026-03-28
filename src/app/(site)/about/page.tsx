import type { Metadata } from "next";
import { AboutInstructions } from "@/components/AboutInstructions";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutInstructions />;
}
