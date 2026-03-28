import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
