export interface Collection {
  slug: string;
  name: string;
  chapter: string;
  tagline: string;
  gradient: string;
  productName: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "gati",
    name: "Gati",
    chapter: "Chapter 01",
    tagline: "Built for the metro sprint — sharp lines, soft landings.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)",
    productName: "Gati Runner",
  },
  {
    slug: "tezz",
    name: "Tezz",
    chapter: "Chapter 02",
    tagline: "Low profile, high speed. Made for the gully sprint.",
    gradient: "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
    productName: "Tezz Low",
  },
  {
    slug: "udaan",
    name: "Udaan",
    chapter: "Chapter 03",
    tagline: "Lift for the flyover jump. A mid-top built to rise.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
    productName: "Udaan Mid",
  },
  {
    slug: "chalo",
    name: "Chalo",
    chapter: "Chapter 04",
    tagline: "High-top, gully-ready. Every step is an entrance.",
    gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
    productName: "Chalo High",
  },
];
