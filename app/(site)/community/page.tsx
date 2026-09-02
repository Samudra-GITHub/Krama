"use client";

import { useState } from "react";
import { Heart, MessageCircle, MapPin, Share2 } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { COMMUNITY_POSTS } from "@/lib/community";

export default function CommunityPage() {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20">
        <div className="border-b border-white/10 px-6 py-14 md:px-10 lg:py-20">
          <span className="text-xs uppercase tracking-label text-krama-accent-alt">
            Community
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-krama-text-primary md:text-6xl">
            Worn in the Gully
          </h1>
          <p className="mt-3 max-w-md text-sm text-krama-text-primary/60">
            KRAMA belongs to the streets it was built for. Tag @wearkrama to be featured.
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMMUNITY_POSTS.map((post) => {
              const isLiked = liked.has(post.id);
              return (
                <div
                  key={post.id}
                  data-cursor="interactive"
                  className="group relative aspect-[4/5] overflow-hidden rounded-glass"
                  style={{ background: post.gradient }}
                >
                  <div className="noise-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 transition-transform duration-500 group-hover:scale-110">
                    <SneakerSilhouette className="w-[70%]" />
                  </div>

                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-pill bg-black/40 px-3 py-1 backdrop-blur-sm">
                    <MapPin size={11} className="text-white/80" />
                    <span className="text-[10px] text-white/80">{post.location}</span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="mb-1 text-xs font-medium text-white">{post.user}</p>
                    <p className="mb-3 text-xs text-white/75">{post.caption}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        aria-label="Like"
                        className="flex items-center gap-1 text-white/85 transition-colors hover:text-krama-danger"
                      >
                        <Heart
                          size={15}
                          fill={isLiked ? "currentColor" : "none"}
                          className={isLiked ? "text-krama-danger" : ""}
                        />
                        <span className="text-xs tabular-nums">
                          {post.likes + (isLiked ? 1 : 0)}
                        </span>
                      </button>
                      <div className="flex items-center gap-1 text-white/85">
                        <MessageCircle size={15} />
                        <span className="text-xs tabular-nums">{post.comments}</span>
                      </div>
                      <button
                        aria-label="Share"
                        className="ml-auto text-white/85 transition-colors hover:text-krama-accent-alt"
                      >
                        <Share2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
