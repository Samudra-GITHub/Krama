"use client";

import { useState } from "react";
import { Heart, MessageCircle, MapPin, Share2, Plus } from "lucide-react";
import { clsx } from "clsx";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { useCommunityStore } from "@/lib/store/community";
import { useToastStore } from "@/lib/store/toast";
import { GRADIENTS } from "@/lib/community";

export default function CommunityPage() {
  const posts = useCommunityStore((s) => s.posts);
  const addPost = useCommunityStore((s) => s.addPost);
  const pushToast = useToastStore((s) => s.push);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [gradientIndex, setGradientIndex] = useState(0);
  const [error, setError] = useState("");

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleShare(id: string) {
    pushToast("Link copied to clipboard", "info");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/community#${id}`).catch(() => {});
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caption.trim() || !location.trim()) {
      setError("Add a caption and a location.");
      return;
    }
    addPost({
      user: "@you",
      location: location.trim(),
      caption: caption.trim(),
      gradient: GRADIENTS[gradientIndex],
    });
    pushToast("Your fit is live", "success");
    setCaption("");
    setLocation("");
    setGradientIndex(0);
    setError("");
    setModalOpen(false);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 px-6 py-14 md:px-10 lg:py-20">
          <div>
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
          <Button variant="primary" onClick={() => setModalOpen(true)} className="flex items-center gap-2">
            <Plus size={15} /> Share your fit
          </Button>
        </div>

        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => {
              const isLiked = liked.has(post.id);
              return (
                <div
                  key={post.id}
                  id={post.id}
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
                        onClick={() => handleShare(post.id)}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Share Your Fit">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <span className="mb-2 block text-xs uppercase tracking-label text-krama-text-primary/50">
              Backdrop
            </span>
            <div className="flex gap-2">
              {GRADIENTS.map((gradient, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGradientIndex(i)}
                  aria-label={`Backdrop ${i + 1}`}
                  className={clsx(
                    "h-10 w-10 rounded-lg ring-2 ring-offset-2 ring-offset-[#0f172a] transition-all",
                    gradientIndex === i ? "ring-krama-accent" : "ring-transparent"
                  )}
                  style={{ background: gradient }}
                />
              ))}
            </div>
          </div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g. Bandra, Mumbai)"
            className="h-11 rounded-lg border border-krama-border-glass bg-transparent px-4 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent focus:outline-none"
          />
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What are you wearing today?"
            rows={3}
            className="rounded-lg border border-krama-border-glass bg-transparent px-4 py-3 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent focus:outline-none"
          />
          {error && <p className="text-xs text-krama-danger">{error}</p>}
          <Button type="submit" variant="primary" className="w-fit px-6">
            Post
          </Button>
        </form>
      </Modal>
    </>
  );
}
