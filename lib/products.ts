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

export const COLORS = [
  { name: "Gully Haze", hex: "#9fb8ff" },
  { name: "Kirana Cream", hex: "#c7d4f5" },
  { name: "Flyover Grey", hex: "#6f84c9" },
  { name: "Metro Black", hex: "#3d4a7a" },
  { name: "Dust Orange", hex: "#1f2847" },
];

export const CATEGORIES = ["Runner", "Low", "Mid", "High"] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "gati-runner-gully-haze",
    name: "Gati Runner",
    colorway: "Gully Haze",
    price: 12999,
    accent: "#9fb8ff",
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
    accent: "#c7d4f5",
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
    accent: "#6f84c9",
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
    accent: "#3d4a7a",
    category: "Runner",
    sizes: [7, 8, 9, 10],
  },
  {
    id: "p5",
    slug: "chalo-high-dust-orange",
    name: "Chalo High",
    colorway: "Dust Orange",
    price: 15499,
    accent: "#1f2847",
    category: "High",
    sizes: [8, 9, 9.5, 10, 10.5, 11],
  },
  {
    id: "p6",
    slug: "tezz-low-metro-black",
    name: "Tezz Low",
    colorway: "Metro Black",
    price: 10499,
    accent: "#3d4a7a",
    category: "Low",
    sizes: [7, 7.5, 8, 9, 10],
  },
  {
    id: "p7",
    slug: "udaan-mid-gully-haze",
    name: "Udaan Mid",
    colorway: "Gully Haze",
    price: 13999,
    accent: "#9fb8ff",
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
    accent: "#c7d4f5",
    badge: "Almost Gone",
    category: "High",
    sizes: [7, 8, 9],
  },
];
