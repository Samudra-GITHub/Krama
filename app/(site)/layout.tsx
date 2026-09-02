import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "KRAMA — Precision of the city. Chaos of the gully.",
  description:
    "KRAMA is a premium Indian-origin sneaker and fashion-tech label. Every drop is a film — explore Drop 001: Gati.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-krama-bg font-body text-krama-text-primary">
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
