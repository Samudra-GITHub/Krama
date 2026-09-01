import { create } from "zustand";

export interface Toast {
  id: string;
  message: string;
  variant: "success" | "error" | "info";
}

interface ToastState {
  toasts: Toast[];
  push: (message: string, variant?: Toast["variant"]) => void;
  dismiss: (id: string) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, variant = "success") =>
    set((state) => ({
      toasts: [...state.toasts, { id: `toast-${++counter}`, message, variant }],
    })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
