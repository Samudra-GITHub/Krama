import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const SEED_REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    name: "Aarav K.",
    rating: 5,
    text: "Fits true to size, unbelievably light for a runner. Wore it on day one for a 6km loop.",
    date: "2026-08-10",
  },
  {
    id: "r2",
    productId: "p1",
    name: "Priya S.",
    rating: 4,
    text: "Colorway is even better in person. Half size up if you're between sizes.",
    date: "2026-08-05",
  },
  {
    id: "r3",
    productId: "p3",
    name: "Kabir M.",
    rating: 5,
    text: "The mid-top height is perfect for ankle support without feeling bulky.",
    date: "2026-07-22",
  },
];

interface ReviewsState {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set) => ({
      reviews: SEED_REVIEWS,
      addReview: (review) =>
        set((state) => ({
          reviews: [
            { ...review, id: `r-${Date.now()}`, date: new Date().toISOString() },
            ...state.reviews,
          ],
        })),
    }),
    {
      name: "krama-reviews",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
