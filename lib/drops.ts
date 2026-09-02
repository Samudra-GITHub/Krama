export interface Drop {
  id: string;
  name: string;
  status: "Live" | "Scheduled" | "Draft";
  releaseDate: string;
  gradient: string;
  productCount: number;
}

export const DROPS: Drop[] = [
  {
    id: "d1",
    name: "Drop 001 — Gati",
    status: "Live",
    releaseDate: "2026-09-12",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)",
    productCount: 2,
  },
  {
    id: "d2",
    name: "Drop 002 — Tezz",
    status: "Scheduled",
    releaseDate: "2026-10-20",
    gradient: "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
    productCount: 2,
  },
  {
    id: "d3",
    name: "Drop 003 — Udaan",
    status: "Draft",
    releaseDate: "2026-12-01",
    gradient: "linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
    productCount: 2,
  },
];

export const ANALYTICS = {
  revenue: 1842300,
  conversionRate: 3.4,
  aov: 13245,
  unitsSold: 139,
  monthly: [
    { month: "Apr", revenue: 210000 },
    { month: "May", revenue: 264000 },
    { month: "Jun", revenue: 298000 },
    { month: "Jul", revenue: 341000 },
    { month: "Aug", revenue: 389000 },
    { month: "Sep", revenue: 340300 },
  ],
};
