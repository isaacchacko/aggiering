import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_ORIGIN } from "@/lib/site";

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
        url: "/splash.svg",
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
    images: ["/splash.svg"],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
