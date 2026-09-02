"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useSearchStore } from "@/lib/store/search";
import { PRODUCTS } from "@/lib/products";
import { useReducedMotion } from "@/lib/useReducedMotion";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export function SearchOverlay() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.colorway.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex flex-col items-center px-6 pt-24 sm:pt-32">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={close}
          />

          <motion.div
            className="glass-hero-tile relative z-10 w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="text-krama-text-primary/50" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sneakers, colorways..."
                className="flex-1 bg-transparent text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:outline-none"
              />
              <button
                data-cursor="interactive"
                onClick={close}
                aria-label="Close search"
                className="text-krama-text-primary/50 hover:text-krama-text-primary"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>

            {query.trim() && (
              <div className="max-h-96 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-krama-text-primary/50">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: reducedMotion ? 0 : i * 0.03 }}
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={close}
                        data-cursor="interactive"
                        className="flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <div>
                          <p className="text-sm text-krama-text-primary">{product.name}</p>
                          <p className="text-xs text-krama-text-primary/50">{product.colorway}</p>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-krama-text-primary/70">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
