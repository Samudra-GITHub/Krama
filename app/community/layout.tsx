import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — KRAMA",
  description: "KRAMA worn in the gully. Tag @wearkrama to be featured.",
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
