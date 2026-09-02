import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ADDRESSES as SEED_ADDRESSES, type Address } from "@/lib/orders";

interface AddressesState {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
}

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set) => ({
      addresses: SEED_ADDRESSES,
      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, { ...address, id: `a-${Date.now()}` }],
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
    }),
    {
      name: "krama-addresses",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
