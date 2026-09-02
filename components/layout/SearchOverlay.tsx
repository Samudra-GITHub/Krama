"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, ShoppingBag, Newspaper, Layers } from "lucide-react";
import { useSearchStore } from "@/lib/store/search";
import { PRODUCTS } from "@/lib/products";
import { ARTICLES } from "@/lib/journal";
import { COLLECTIONS } from "@/lib/collections";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFocusTrap } from "@/lib/useFocusTrap";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

interface SearchResult {
  id: string;
  type: "product" | "article" | "collection";
  title: string;
  subtitle: string;
  trailing?: string;
  href: string;
}

const TYPE_ICON = {
  product: ShoppingBag,
  article: Newspaper,
  collection: Layers,
};

export function SearchOverlay() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, panelRef);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const products: SearchResult[] = PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.colorway.toLowerCase().includes(q)
    ).map((p) => ({
      id: p.id,
      type: "product",
      title: p.name,
      subtitle: p.colorway,
      trailing: formatPrice(p.price),
      href: `/product/${p.slug}`,
    }));

    const articles: SearchResult[] = ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    ).map((a) => ({
      id: a.slug,
      type: "article",
      title: a.title,
      subtitle: a.category,
      href: `/journal/${a.slug}`,
    }));

    const collections: SearchResult[] = COLLECTIONS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    ).map((c) => ({
      id: c.slug,
      type: "collection",
      title: c.name,
      subtitle: c.chapter,
      href: `/collections/${c.slug}`,
    }));

    return [...products, ...collections, ...articles].slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      setQuery("");
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
            ref={panelRef}
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
                placeholder="Search sneakers, journal, collections..."
                className="flex-1 bg-transparent text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:outline-none"
              />
              <button
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
                  results.map((result, i) => {
                    const Icon = TYPE_ICON[result.type];
                    return (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: reducedMotion ? 0 : i * 0.03 }}
                      >
                        <Link
                          href={result.href}
                          onClick={close}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                        >
                          <Icon size={15} className="shrink-0 text-krama-text-primary/40" strokeWidth={1.5} />
                          <div className="flex-1">
                            <p className="text-sm text-krama-text-primary">{result.title}</p>
                            <p className="text-xs text-krama-text-primary/50">{result.subtitle}</p>
                          </div>
                          {result.trailing && (
                            <span className="font-mono text-xs tabular-nums text-krama-text-primary/70">
                              {result.trailing}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })
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
