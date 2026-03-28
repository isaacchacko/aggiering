import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="aggiering-main mx-auto max-w-xl px-4 py-10 text-sm leading-relaxed text-neutral-800 sm:py-12 sm:text-[15px] md:text-base lg:text-lg">
      <SiteHeader />
      {children}
    </div>
  );
}
