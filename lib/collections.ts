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
    gradient: "linear-gradient(135deg, #3d4a7a 0%, #9fb8ff 100%)",
    productName: "Gati Runner",
  },
  {
    slug: "tezz",
    name: "Tezz",
    chapter: "Chapter 02",
    tagline: "Low profile, high speed. Made for the gully sprint.",
    gradient: "linear-gradient(135deg, #c7d4f5 0%, #9fb8ff 100%)",
    productName: "Tezz Low",
  },
  {
    slug: "udaan",
    name: "Udaan",
    chapter: "Chapter 03",
    tagline: "Lift for the flyover jump. A mid-top built to rise.",
    gradient: "linear-gradient(135deg, #6f84c9 0%, #3d4a7a 100%)",
    productName: "Udaan Mid",
  },
  {
    slug: "chalo",
    name: "Chalo",
    chapter: "Chapter 04",
    tagline: "High-top, gully-ready. Every step is an entrance.",
    gradient: "linear-gradient(135deg, #1f2847 0%, #6f84c9 100%)",
    productName: "Chalo High",
  },
];
