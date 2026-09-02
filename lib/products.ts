export interface ProductSpecs {
  weight: string;
  drop: string;
  outsole: string;
  upper: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  colorway: string;
  price: number;
  originalPrice?: number;
  accent: string;
  badge?: string;
  category: "Runner" | "Low" | "Mid" | "High";
  sizes: number[];
  soldOutSizes?: number[];
  lowStockSizes?: number[];
  fit?: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  specs?: ProductSpecs;
}

const DEFAULT_FEATURES = [
  "Engineered mesh upper for all-day breathability",
  "Recycled-EVA midsole tuned for rebound on tarmac and platform tile",
  "Full-contact rubber outsole gripped for monsoon streets and dry gully courts",
  "Reinforced heel counter for lockdown during sprint starts",
];


export const ALL_SIZES = [7, 8, 9, 9.5, 10, 10.5, 11];

export const COLORS = [
  { name: "Gully Haze", hex: "#9fb8ff" },
  { name: "Kirana Cream", hex: "#c7d4f5" },
  { name: "Flyover Grey", hex: "#6f84c9" },
  { name: "Metro Black", hex: "#3d4a7a" },
  { name: "Dust Orange", hex: "#1f2847" },
];

export const CATEGORIES = ["Runner", "Low", "Mid", "High"] as const;

const RUNNER_SPECS: ProductSpecs = {
  weight: "268g (US 9)",
  drop: "8mm",
  outsole: "Full-contact rubber",
  upper: "Engineered mesh + synthetic overlay",
};

const LOW_SPECS: ProductSpecs = {
  weight: "241g (US 9)",
  drop: "4mm",
  outsole: "Gum rubber cupsole",
  upper: "Perforated nubuck",
};

const MID_SPECS: ProductSpecs = {
  weight: "312g (US 9)",
  drop: "6mm",
  outsole: "Lugged rubber",
  upper: "Ripstop canvas + ankle collar padding",
};

const HIGH_SPECS: ProductSpecs = {
  weight: "336g (US 9)",
  drop: "5mm",
  outsole: "Court-grip rubber",
  upper: "Full-grain leather + mesh tongue",
};

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
    lowStockSizes: [7, 11],
    fit: "True to size",
    rating: 4.8,
    reviewCount: 132,
    features: DEFAULT_FEATURES,
    specs: RUNNER_SPECS,
  },
  {
    id: "p2",
    slug: "tezz-low-kirana-cream",
    name: "Tezz Low",
    colorway: "Kirana Cream",
    price: 10499,
    originalPrice: 12499,
    accent: "#c7d4f5",
    category: "Low",
    sizes: [7, 8, 9, 10, 11],
    soldOutSizes: [8],
    lowStockSizes: [7],
    fit: "Runs half a size small — consider sizing up",
    rating: 4.5,
    reviewCount: 87,
    features: [
      "Perforated nubuck upper for warm-weather breathability",
      "Gum rubber cupsole for a low, grounded ride",
      "Padded collar for sockless comfort",
      "Reflective heel tab for low-light visibility",
    ],
    specs: LOW_SPECS,
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
    fit: "True to size",
    rating: 4.9,
    reviewCount: 204,
    features: [
      "Ripstop canvas upper built for overhead-train commutes",
      "Padded ankle collar for lockdown on stairs and platforms",
      "Lugged rubber outsole for wet-tile traction",
      "Internal shank for arch support on long walks",
    ],
    specs: MID_SPECS,
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
    lowStockSizes: [10],
    fit: "True to size",
    rating: 4.7,
    reviewCount: 96,
    features: DEFAULT_FEATURES,
    specs: RUNNER_SPECS,
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
    fit: "Runs true, snug through the ankle collar",
    rating: 4.6,
    reviewCount: 58,
    features: [
      "Full-grain leather upper that breaks in and ages with wear",
      "Court-grip rubber outsole for lateral stability",
      "Padded tongue and collar for all-day wear",
      "Reinforced toe cap for durability",
    ],
    specs: HIGH_SPECS,
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
    fit: "Runs half a size small — consider sizing up",
    rating: 4.4,
    reviewCount: 41,
    features: [
      "Perforated nubuck upper for warm-weather breathability",
      "Gum rubber cupsole for a low, grounded ride",
      "Padded collar for sockless comfort",
      "Reflective heel tab for low-light visibility",
    ],
    specs: LOW_SPECS,
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
    lowStockSizes: [11],
    fit: "True to size",
    rating: 4.9,
    reviewCount: 168,
    features: [
      "Ripstop canvas upper built for overhead-train commutes",
      "Padded ankle collar for lockdown on stairs and platforms",
      "Lugged rubber outsole for wet-tile traction",
      "Internal shank for arch support on long walks",
    ],
    specs: MID_SPECS,
  },
  {
    id: "p8",
    slug: "chalo-high-kirana-cream",
    name: "Chalo High",
    colorway: "Kirana Cream",
    price: 15499,
    originalPrice: 17999,
    accent: "#c7d4f5",
    badge: "Almost Gone",
    category: "High",
    sizes: [7, 8, 9],
    lowStockSizes: [7, 8, 9],
    fit: "Runs true, snug through the ankle collar",
    rating: 4.3,
    reviewCount: 29,
    features: [
      "Full-grain leather upper that breaks in and ages with wear",
      "Court-grip rubber outsole for lateral stability",
      "Padded tongue and collar for all-day wear",
      "Reinforced toe cap for durability",
    ],
    specs: HIGH_SPECS,
  },
];
