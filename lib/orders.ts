export interface OrderLineItem {
  name: string;
  colorway: string;
  size: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  items: number;
  total: number;
  lineItems?: OrderLineItem[];
  shippingAddress?: string;
  paymentMethod?: string;
}

export const ORDERS: Order[] = [
  {
    id: "KR482913",
    date: "2026-08-21",
    status: "Delivered",
    items: 1,
    total: 12999,
    lineItems: [
      { name: "Gati Runner", colorway: "Gully Haze", size: 9, quantity: 1, price: 12999 },
    ],
    shippingAddress: "221B Gully Road, Mumbai, Maharashtra 400001",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "KR471820",
    date: "2026-07-30",
    status: "Delivered",
    items: 2,
    total: 23498,
    lineItems: [
      { name: "Tezz Low", colorway: "Kirana Cream", size: 8, quantity: 1, price: 10499 },
      { name: "Udaan Mid", colorway: "Flyover Grey", size: 9, quantity: 1, price: 13999 },
    ],
    shippingAddress: "221B Gully Road, Mumbai, Maharashtra 400001",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "KR460214",
    date: "2026-07-02",
    status: "Shipped",
    items: 1,
    total: 15499,
    lineItems: [
      { name: "Chalo High", colorway: "Dust Orange", size: 10, quantity: 1, price: 15499 },
    ],
    shippingAddress: "4th Floor, Metro Tower, Mumbai, Maharashtra 400051",
    paymentMethod: "Visa •••• 4242",
  },
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
