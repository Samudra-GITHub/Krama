import { create } from "zustand";

interface WishlistState {
  ids: Set<string>;
  toggle: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  ids: new Set(),
  toggle: (id) =>
    set((state) => {
      const next = new Set(state.ids);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ids: next };
    }),
}));
