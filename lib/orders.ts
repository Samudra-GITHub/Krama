export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  items: number;
  total: number;
}

export const ORDERS: Order[] = [
  { id: "KR482913", date: "2026-08-21", status: "Delivered", items: 1, total: 12999 },
  { id: "KR471820", date: "2026-07-30", status: "Delivered", items: 2, total: 23498 },
  { id: "KR460214", date: "2026-07-02", status: "Shipped", items: 1, total: 15499 },
];

export interface Address {
  id: string;
  label: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export const ADDRESSES: Address[] = [
  {
    id: "a1",
    label: "Home",
    line: "221B Gully Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Work",
    line: "4th Floor, Metro Tower",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
  },
];
