"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useOrdersStore } from "@/lib/store/orders";
import { useReviewsStore } from "@/lib/store/reviews";
import { useAddressesStore } from "@/lib/store/addresses";

export function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useOrdersStore.persist.rehydrate();
    useReviewsStore.persist.rehydrate();
    useAddressesStore.persist.rehydrate();
  }, []);

  return null;
}
