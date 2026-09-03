import type { Metadata, Viewport } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { StoreHydration } from "@/components/motion/StoreHydration";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_TITLE = "KRAMA — Precision of the city. Chaos of the gully.";
const SITE_DESCRIPTION =
  "KRAMA is a premium Indian-origin sneaker and fashion-tech label. Every drop is a film — explore Drop 001: Gati.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "KRAMA",
  keywords: ["KRAMA", "sneakers", "streetwear", "Indian sneaker brand", "Gati Runner"],
  openGraph: {
    type: "website",
    siteName: "KRAMA",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-krama-bg font-body text-krama-text-primary">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-pill bg-krama-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <StoreHydration />
          <div className="pb-16 lg:pb-0">{children}</div>
          <MobileNav />
          <CartDrawer />
          <SearchOverlay />
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}
