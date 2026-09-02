import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook — KRAMA",
  description:
    "Precision of the city. Chaos of the gully. The KRAMA lookbook, one chapter at a time.",
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
