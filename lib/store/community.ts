import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { COMMUNITY_POSTS as SEED_POSTS, type CommunityPost } from "@/lib/community";

interface CommunityState {
  posts: CommunityPost[];
  addPost: (post: Omit<CommunityPost, "id" | "likes" | "comments">) => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      posts: SEED_POSTS,
      addPost: (post) =>
        set((state) => ({
          posts: [{ ...post, id: `c-${Date.now()}`, likes: 0, comments: 0 }, ...state.posts],
        })),
    }),
    {
      name: "krama-community",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
