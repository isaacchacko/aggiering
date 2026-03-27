import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { webringData } from "@/data/webringData";
import { buildWebringRedirectScript } from "@/lib/webringRedirectScript";
import { RedirectHandler } from "@/components/RedirectHandler";
import { SITE_ORIGIN } from "@/lib/site";

const siteUrls = webringData.map((m) => m.website);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "aggier.ing",
    template: "%s · aggier.ing",
  },
  description: "A minimal webring for Aggies with personal sites.",
  openGraph: {
    title: "aggier.ing",
    description: "A minimal webring for Aggies with personal sites.",
    url: SITE_ORIGIN,
    siteName: "aggier.ing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "aggier.ing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "aggier.ing",
    description: "A minimal webring for Aggies with personal sites.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/icon.maroon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Script
          id="aggiering-redirect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: buildWebringRedirectScript([...siteUrls]),
          }}
        />
        <noscript>
          <style>{`.aggiering-main { visibility: visible !important; }`}</style>
        </noscript>
        <RedirectHandler />
        {children}
      </body>
    </html>
  );
}
