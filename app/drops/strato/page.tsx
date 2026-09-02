import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./strato.css";
import { StratoHero } from "@/components/strato/StratoHero";

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
  title: "Strato Drop 001 — Reach the strato. | KRAMA",
  description:
    "The first STRATO drop from KRAMA — a lighter-than-air silhouette, ice on the rim light. Free while it lasts.",
};

export default function StratoPage() {
  return (
    <div className={`${interTight.variable} ${plexMono.variable}`}>
      <StratoHero />
    </div>
  );
}
