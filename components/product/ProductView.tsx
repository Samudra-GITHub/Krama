"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, Ruler } from "lucide-react";
import { clsx } from "clsx";
import type { Product } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeChip } from "@/components/ui/SizeChip";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToastStore } from "@/lib/store/toast";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const SIZE_CHART = [
  { us: 7, uk: 6, eu: 40, cm: 25 },
  { us: 8, uk: 7, eu: 41, cm: 26 },
  { us: 9, uk: 8, eu: 42.5, cm: 27 },
  { us: 10, uk: 9, eu: 44, cm: 28 },
  { us: 11, uk: 10, eu: 45, cm: 29 },
];

export function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.ids.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const pushToast = useToastStore((s) => s.push);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  const ctaRef = useRef<HTMLDivElement>(null);

  const variants = PRODUCTS.filter((p) => p.name === product.name);

  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem({ product, size: selectedSize, color: product.colorway }, quantity);
    pushToast(`${product.name} added to cart`, "success");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <ProductGallery accent={product.accent} />

        <div className="flex flex-col gap-6">
          {product.badge && (
            <span className="w-fit rounded-pill bg-krama-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-krama-accent">
              {product.badge}
            </span>
          )}

          <div>
            <h1 className="font-display text-3xl font-bold uppercase text-krama-text-primary md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm uppercase tracking-meta text-krama-text-primary/50">
              {product.colorway}
            </p>
          </div>

          <p className="font-mono text-xl tabular-nums text-krama-text-primary">
            {formatPrice(product.price)}
          </p>

          <p className="max-w-md text-sm leading-relaxed text-krama-text-primary/60">
            Engineered mesh upper, recycled-EVA midsole, full-contact rubber outsole.
            Built for the pace of the metro and the grip of the gully.
          </p>

          {variants.length > 1 && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-label text-krama-text-primary/50">
                Colorway
              </span>
              <div className="flex gap-3">
                {variants.map((v) => (
                  <ColorSwatch
                    key={v.id}
                    hex={v.accent}
                    name={v.colorway}
                    selected={v.id === product.id}
                    onClick={() => v.id !== product.id && router.push(`/product/${v.slug}`)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-label text-krama-text-primary/50">
                Size
              </span>
              <button
                data-cursor="interactive"
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-1 text-[11px] uppercase tracking-label text-krama-text-primary/50 transition-colors hover:text-krama-accent-alt"
              >
                <Ruler size={12} />
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <SizeChip
                  key={size}
                  size={size}
                  selected={selectedSize === size}
                  soldOut={product.soldOutSizes?.includes(size)}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                />
              ))}
            </div>
            {sizeError && (
              <p className="text-xs text-krama-danger">Select a size to continue.</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-label text-krama-text-primary/50">
              Quantity
            </span>
            <div className="flex w-fit items-center gap-4 rounded-pill border border-krama-border-glass px-4 py-2">
              <button
                data-cursor="interactive"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-krama-text-primary/70 transition-colors hover:text-krama-text-primary"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center font-mono text-sm tabular-nums text-krama-text-primary">
                {quantity}
              </span>
              <button
                data-cursor="interactive"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                className="text-krama-text-primary/70 transition-colors hover:text-krama-text-primary"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div ref={ctaRef} className="mt-2 flex items-center gap-4">
            <MagneticButton className="flex-1 sm:flex-none">
              <Button variant="primary" onClick={handleAddToCart} className="w-full sm:w-64">
                {added ? "Added ✓" : "Add to Cart"}
              </Button>
            </MagneticButton>
            <button
              data-cursor="interactive"
              aria-label="Add to wishlist"
              onClick={() => {
                toggleWishlist(product.id);
                pushToast(
                  wishlisted ? "Removed from wishlist" : "Added to wishlist",
                  "info"
                );
              }}
              className={clsx(
                "grid h-14 w-14 shrink-0 place-items-center rounded-pill border transition-colors duration-200",
                wishlisted
                  ? "border-krama-danger bg-krama-danger/10 text-krama-danger"
                  : "border-krama-border-glass text-krama-text-primary/70 hover:text-krama-text-primary"
              )}
            >
              <Heart size={18} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <a
            href="/lookbook"
            data-cursor="interactive"
            className="w-fit text-xs uppercase tracking-label text-krama-text-primary/50 underline decoration-krama-border-glass underline-offset-4 transition-colors hover:text-krama-accent-alt"
          >
            View in Lookbook
          </a>
        </div>
      </div>

      {/* sticky mobile CTA */}
      <div
        className={clsx(
          "glass-nav fixed inset-x-0 bottom-16 z-40 flex items-center justify-between px-6 py-4 transition-transform duration-300 lg:hidden",
          stickyVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div>
          <p className="text-[10px] uppercase tracking-label text-krama-text-primary/50">
            {product.name}
          </p>
          <p className="font-mono text-sm tabular-nums text-krama-text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
        <Button variant="primary" onClick={handleAddToCart} className="px-6">
          {added ? "Added ✓" : "Add to Cart"}
        </Button>
      </div>

      <Modal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} title="Size Guide">
        <table className="w-full text-left font-mono text-xs tabular-nums text-krama-text-primary/80">
          <thead>
            <tr className="border-b border-krama-border-glass text-[10px] uppercase tracking-label text-krama-text-primary/40">
              <th className="pb-2">US</th>
              <th className="pb-2">UK</th>
              <th className="pb-2">EU</th>
              <th className="pb-2">CM</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map((row) => (
              <tr key={row.us} className="border-b border-white/5">
                <td className="py-2">{row.us}</td>
                <td className="py-2">{row.uk}</td>
                <td className="py-2">{row.eu}</td>
                <td className="py-2">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}
