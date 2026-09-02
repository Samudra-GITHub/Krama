import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ORDERS as SEED_ORDERS, type Order } from "@/lib/orders";

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: Order["status"]) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: SEED_ORDERS,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    {
      name: "krama-orders",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
