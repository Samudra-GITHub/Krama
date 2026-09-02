import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

const SEED_METHODS: PaymentMethod[] = [
  { id: "pm1", brand: "Visa", last4: "4242", expiry: "12/28", isDefault: true },
];

interface PaymentsState {
  methods: PaymentMethod[];
  addMethod: (method: Omit<PaymentMethod, "id">) => void;
  removeMethod: (id: string) => void;
}

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set) => ({
      methods: SEED_METHODS,
      addMethod: (method) =>
        set((state) => ({
          methods: [...state.methods, { ...method, id: `pm-${Date.now()}` }],
        })),
      removeMethod: (id) =>
        set((state) => ({
          methods: state.methods.filter((m) => m.id !== id),
        })),
    }),
    {
      name: "krama-payments",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

export function guessCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (digits.startsWith("6")) return "RuPay";
  return "Card";
}
