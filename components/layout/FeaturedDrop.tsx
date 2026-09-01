"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";

const FEATURED = PRODUCTS.slice(0, 3);

export function FeaturedDrop() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
        }
      );
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={rootRef} className="bg-krama-bg-alt px-6 py-24 md:px-10 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-label text-krama-accent-alt">
            New Drop
          </span>
          <h2 className="font-display text-4xl font-bold uppercase text-krama-text-primary md:text-5xl">
            Drop 001 — Gati
          </h2>
          <p className="max-w-md text-sm text-krama-text-primary/60">
            Built on the fond memory of gully football and kirana-store candy jars,
            engineered for the pace of the metro.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
