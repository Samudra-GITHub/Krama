"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { clsx } from "clsx";
import type { Product } from "@/lib/products";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToastStore } from "@/lib/store/toast";
import { Rating } from "@/components/ui/Rating";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export function ProductCard({ product }: { product: Product }) {
  const { name, colorway, price, accent, badge, slug, id, rating, reviewCount } = product;
  const wishlisted = useWishlistStore((s) => s.ids.includes(id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const pushToast = useToastStore((s) => s.push);

  return (
    <Link
      href={`/product/${slug}`}
      className="product-card group relative flex flex-col overflow-hidden rounded-glass bg-krama-surface transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-krama-glow"
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${accent}22, #0f172a)` }}
      >
        {badge && (
          <span className="absolute left-4 top-4 rounded-pill bg-krama-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-label text-krama-text-dark">
            {badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(id);
            pushToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info");
          }}
          className={clsx(
            "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-pill bg-krama-surface/90 text-krama-text-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            wishlisted && "!opacity-100 text-krama-danger"
          )}
        >
          <Heart size={15} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
        </button>
        <svg
          viewBox="0 0 420 240"
          className="w-[72%] -rotate-6 opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-rotate-3"
        >
          <path
            d="M60,70 C38,82 26,120 38,150 C110,193 255,200 375,182 C398,172 398,152 383,142
               C368,118 352,92 328,74 C298,50 258,45 228,42 C210,55 194,60 174,58
               C138,55 88,55 60,70 Z"
            fill="#e5e7eb"
          />
          <path
            d="M45,185 C40,205 60,215 95,214 L360,208 C395,206 405,190 392,175 L40,178 Z"
            fill={accent}
          />
        </svg>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-pill bg-krama-surface/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-label text-krama-text-dark opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
          Quick View
        </span>
      </div>

      <div className="flex flex-col gap-1 px-5 py-4">
        <h3 className="font-body text-sm font-medium text-krama-text-dark">{name}</h3>
        <p className="text-xs uppercase tracking-meta text-krama-text-muted">{colorway}</p>
        <Rating value={rating} count={reviewCount} size={11} className="mt-0.5" />
        <p className="mt-1 font-mono text-sm tabular-nums text-krama-text-dark">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
