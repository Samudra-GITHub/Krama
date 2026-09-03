"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { clsx } from "clsx";
import { PRODUCTS } from "@/lib/products";
import { SneakerViewer, SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Rating } from "@/components/ui/Rating";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToastStore } from "@/lib/store/toast";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const FEATURED_VARIANTS = PRODUCTS.filter((p) => p.name === "Gati Runner");

const MORE_PRODUCTS = PRODUCTS.filter(
  (p, i, arr) => p.name !== "Gati Runner" && arr.findIndex((q) => q.name === p.name) === i
);

export function CampaignHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FEATURED_VARIANTS[activeIndex];
  const wishlisted = useWishlistStore((s) => s.ids.includes(active.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const pushToast = useToastStore((s) => s.push);
  const moreTrackRef = useRef<HTMLDivElement>(null);

  function scrollMore(direction: 1 | -1) {
    moreTrackRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden pt-20"
      style={{ background: "var(--krama-gradient-hero)" }}
    >
      {/* giant background wordmark — KRAMA's own graphic device, not a borrowed logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className="select-none whitespace-nowrap font-display font-black uppercase leading-none text-white/[0.04]"
          style={{ fontSize: "clamp(9rem, 34vw, 30rem)" }}
        >
          GATI
        </span>
      </div>

      {/* hero content */}
      <div className="relative z-10 mx-auto grid w-full max-w-screen-xl flex-1 grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:gap-6 md:px-10 md:py-0">
        {/* left: product story */}
        <div className="flex flex-col gap-5 order-2 md:order-1">
          <div className="animate-blur-fade-up flex items-center gap-4 text-xs" style={{ animationDelay: "150ms" }}>
            <span className="flex items-center gap-2">
              <span className="motion-safe:animate-pulse-dot h-2 w-2 rounded-pill bg-krama-accent" />
              <span className="font-mono uppercase tracking-[0.2em] text-krama-text-primary/80">
                Live Drop
              </span>
            </span>
            <span className="text-white/30">/</span>
            <span className="font-mono uppercase tracking-[0.2em] text-white/50">
              Mumbai · Sep 2026
            </span>
          </div>

          {active.badge && (
            <span
              className="animate-blur-fade-up w-fit rounded-pill bg-krama-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-krama-accent"
              style={{ animationDelay: "200ms" }}
            >
              {active.badge}
            </span>
          )}

          <h1
            className="animate-blur-fade-up font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.03em] text-krama-text-primary sm:text-6xl md:text-7xl lg:text-[5rem]"
            style={{ animationDelay: "250ms" }}
          >
            {active.name}
          </h1>
          <p
            className="animate-blur-fade-up -mt-3 text-sm uppercase tracking-[0.2em] text-krama-accent-alt sm:text-base"
            style={{ animationDelay: "320ms" }}
          >
            {active.colorway}
          </p>

          <div className="animate-blur-fade-up flex items-center gap-3" style={{ animationDelay: "380ms" }}>
            <Rating value={active.rating} count={active.reviewCount} />
          </div>

          <div className="animate-blur-fade-up flex items-center gap-3" style={{ animationDelay: "420ms" }}>
            <p className="font-mono text-2xl tabular-nums text-krama-text-primary">
              {formatPrice(active.price)}
            </p>
            {active.originalPrice && (
              <>
                <p className="font-mono text-sm tabular-nums text-krama-text-primary/40 line-through">
                  {formatPrice(active.originalPrice)}
                </p>
                <span className="rounded-pill bg-krama-danger/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-krama-danger">
                  {Math.round((1 - active.price / active.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          <p
            className="animate-blur-fade-up max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
            style={{ animationDelay: "460ms" }}
          >
            Precision of the city. Chaos of the gully. Krama — the sequence, the step, the
            order found inside the noise.
          </p>

          <div className="animate-blur-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: "520ms" }}>
            <Link
              href={`/product/${active.slug}`}
              className="flex items-center gap-2 rounded-pill bg-white px-7 py-3 font-semibold text-black transition-colors hover:bg-white/90"
            >
              Shop This Colorway
              <ArrowRight size={18} />
            </Link>
            <button
              aria-label="Add to wishlist"
              onClick={() => {
                toggleWishlist(active.id);
                pushToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
              }}
              className={clsx(
                "glass-card grid h-[50px] w-[50px] shrink-0 place-items-center rounded-pill transition-colors duration-200",
                wishlisted ? "text-krama-danger" : "text-krama-text-primary"
              )}
            >
              <Heart size={18} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {FEATURED_VARIANTS.length > 1 && (
            <div className="animate-blur-fade-up flex items-center gap-3 pt-1" style={{ animationDelay: "580ms" }}>
              {FEATURED_VARIANTS.map((variant, i) => (
                <ColorSwatch
                  key={variant.id}
                  hex={variant.accent}
                  name={variant.colorway}
                  selected={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* right: animated 3D-style shoe */}
        <div className="glass-hero-tile relative order-1 aspect-square w-full overflow-hidden md:order-2">
          <SneakerViewer
            accent={active.accent}
            sneakerClassName="h-auto w-[85%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:w-[95%]"
          />
        </div>
      </div>

      {/* bottom: more from the range */}
      <div className="relative z-10 border-t border-white/10 px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-screen-xl items-center gap-4">
          <p className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 sm:block">
            More from the range
          </p>
          <button
            aria-label="Scroll left"
            onClick={() => scrollMore(-1)}
            className="glass-card hidden h-9 w-9 shrink-0 place-items-center rounded-pill text-krama-text-primary sm:grid"
          >
            <ChevronLeft size={16} />
          </button>
          <div
            ref={moreTrackRef}
            className="flex flex-1 gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MORE_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="glass-card flex w-[210px] shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 transition-transform duration-300 hover:scale-[1.03]"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-lg"
                  style={{ background: `linear-gradient(160deg, ${product.accent}33, #0f172a)` }}
                >
                  <SneakerSilhouette accent={product.accent} className="w-[85%] -rotate-6" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-krama-text-primary">
                    {product.name}
                  </p>
                  <p className="font-mono text-xs tabular-nums text-white/50">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <button
            aria-label="Scroll right"
            onClick={() => scrollMore(1)}
            className="glass-card hidden h-9 w-9 shrink-0 place-items-center rounded-pill text-krama-text-primary sm:grid"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
