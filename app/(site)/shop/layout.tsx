import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Sneakers — KRAMA",
  description: "Every KRAMA silhouette in one place. Filter by size, colorway, and category.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
