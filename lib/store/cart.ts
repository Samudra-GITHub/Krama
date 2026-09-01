import { create } from "zustand";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addItem: (item, quantity = 1) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.color === item.color
      );
      if (existingIndex > -1) {
        const items = [...state.items];
        items[existingIndex] = {
          ...items[existingIndex],
          quantity: items[existingIndex].quantity + quantity,
        };
        return { items, isOpen: true };
      }
      return { items: [...state.items, { ...item, quantity }], isOpen: true };
    }),
  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  updateQuantity: (index, quantity) =>
    set((state) => ({
      items: state.items.map((item, i) => (i === index ? { ...item, quantity } : item)),
    })),
}));

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
