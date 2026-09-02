import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { themeInitScript } from "@/components/ThemeToggle";
import { WhatsAppFab } from "@/components/WhatsAppFab";
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
  ],
  openGraph: {
    title: "Ekdant Capital — Your growth, our financial solutions",
    description:
      "One application, 42 lenders competing for it. Paperless approval and disbursal within 24 hours.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full`}
      // data-theme is stamped on by themeInitScript before paint, so the
      // server markup deliberately differs from the hydrated DOM.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
