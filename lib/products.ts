export interface Product {
  id: string;
  slug: string;
  name: string;
  colorway: string;
  price: number;
  accent: string;
  badge?: string;
  category: "Runner" | "Low" | "Mid" | "High";
  sizes: number[];
  soldOutSizes?: number[];
}

export const ALL_SIZES = [7, 8, 9, 9.5, 10, 10.5, 11];

/**
 * Not part of the main catalog (kept out of PRODUCTS/shop filtering) —
 * used only by the /drops/strato hype page's "Claim yours" flow.
 */
export const STRATO_PRODUCT: Product = {
  id: "strato-001",
  slug: "strato-001-ice",
  name: "Strato 001",
  colorway: "Ice",
  price: 0,
  accent: "#9fb8ff",
  badge: "Free",
  category: "Low",
  sizes: [7, 8, 9, 9.5, 10, 10.5, 11],
};

export const COLORS = [
  { name: "Gully Haze", hex: "#38bdf8" },
  { name: "Kirana Cream", hex: "#22c55e" },
  { name: "Flyover Grey", hex: "#ec4899" },
  { name: "Metro Black", hex: "#7c3aed" },
  { name: "Dust Orange", hex: "#f97316" },
];

export const CATEGORIES = ["Runner", "Low", "Mid", "High"] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "gati-runner-gully-haze",
    name: "Gati Runner",
    colorway: "Gully Haze",
    price: 12999,
    accent: "#38bdf8",
    badge: "New",
    category: "Runner",
    sizes: [7, 8, 9, 9.5, 10, 10.5, 11],
  },
  {
    id: "p2",
    slug: "tezz-low-kirana-cream",
    name: "Tezz Low",
    colorway: "Kirana Cream",
    price: 10499,
    accent: "#22c55e",
    category: "Low",
    sizes: [7, 8, 9, 10, 11],
    soldOutSizes: [8],
  },
  {
    id: "p3",
    slug: "udaan-mid-flyover-grey",
    name: "Udaan Mid",
    colorway: "Flyover Grey",
    price: 13999,
    accent: "#ec4899",
    badge: "Drop 001",
    category: "Mid",
    sizes: [8, 9, 9.5, 10, 11],
  },
  {
    id: "p4",
    slug: "gati-runner-metro-black",
    name: "Gati Runner",
    colorway: "Metro Black",
    price: 12999,
    accent: "#7c3aed",
    category: "Runner",
    sizes: [7, 8, 9, 10],
  },
  {
    id: "p5",
    slug: "chalo-high-dust-orange",
    name: "Chalo High",
    colorway: "Dust Orange",
    price: 15499,
    accent: "#f97316",
    category: "High",
    sizes: [8, 9, 9.5, 10, 10.5, 11],
  },
  {
    id: "p6",
    slug: "tezz-low-metro-black",
    name: "Tezz Low",
    colorway: "Metro Black",
    price: 10499,
    accent: "#7c3aed",
    category: "Low",
    sizes: [7, 7.5, 8, 9, 10],
  },
  {
    id: "p7",
    slug: "udaan-mid-gully-haze",
    name: "Udaan Mid",
    colorway: "Gully Haze",
    price: 13999,
    accent: "#38bdf8",
    category: "Mid",
    sizes: [9, 9.5, 10, 11],
    soldOutSizes: [9.5],
  },
  {
    id: "p8",
    slug: "chalo-high-kirana-cream",
    name: "Chalo High",
    colorway: "Kirana Cream",
    price: 15499,
    accent: "#22c55e",
    badge: "Almost Gone",
    category: "High",
    sizes: [7, 8, 9],
  },
];
