import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { WhatsAppFab } from "@/components/WhatsAppFab";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves every relative URL below into an absolute one. Without it the
  // OpenGraph tags have no origin to attach to and social previews break.
  metadataBase: new URL(siteUrl),
  title: "Ekdant Capital — Your growth, our financial solutions",
  description:
    "Ekdant Capital arranges personal, business, home and property loans across a panel of 42 banks and NBFCs, with paperless approval and disbursal within 24 hours.",
  keywords: [
    "personal loan",
    "business loan",
    "home loan",
    "education loan",
    "EMI calculator",
    "Ekdant Capital",
    "loan agent Vadodara",
  ],
  // One declared canonical host, matching `siteUrl` and the Vercel primary
  // domain. Guards against the apex/www split being read as duplicate pages.
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Ekdant Capital — Your growth, our financial solutions",
    description:
      "One application, 42 lenders competing for it. Paperless approval and disbursal within 24 hours.",
    type: "website",
    url: "/",
    siteName: "Ekdant Capital",
    locale: "en_IN",
    images: [
      {
        url: "/ekdant-logo.png",
        width: 720,
        height: 227,
        alt: "Ekdant Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekdant Capital — Your growth, our financial solutions",
    description:
      "One application, 42 lenders competing for it. Paperless approval and disbursal within 24 hours.",
    images: ["/ekdant-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col overflow-x-clip bg-page">
        {/* Anchor target for "back to top". It cannot live on the header,
            which is sticky and therefore never leaves the viewport — the
            browser would treat scrolling to it as a no-op. */}
        <div id="top" />
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
