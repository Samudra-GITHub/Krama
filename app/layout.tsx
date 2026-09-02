import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-krama-bg font-body text-krama-text-primary">
        <SmoothScroll>
          <CustomCursor />
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
