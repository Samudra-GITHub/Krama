"use client";

import { useMemo, useState } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FilterBar, type FilterState } from "@/components/shop/FilterBar";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";

const INITIAL_STATE: FilterState = {
  categories: [],
  colors: [],
  sizes: [],
  sort: "featured",
};

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_STATE);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.colors.length && !filters.colors.includes(p.colorway)) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      return true;
    });

    if (filters.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [filters]);

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-krama-bg pt-20">
        <div className="border-b border-white/10 px-6 py-14 md:px-10 lg:py-20">
          <span className="text-xs uppercase tracking-label text-krama-accent-alt">
            Shop
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-krama-text-primary md:text-6xl">
            All Sneakers
          </h1>
          <p className="mt-3 max-w-md text-sm text-krama-text-primary/60">
            Every silhouette from the KRAMA archive, built for the pace of the city.
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl px-6 py-8 md:px-10">
          <FilterBar state={filters} onChange={setFilters} resultCount={results.length} />

          <div className="mt-4 hidden font-mono text-xs tabular-nums text-krama-text-primary/40 lg:block">
            {results.length} {results.length === 1 ? "result" : "results"}
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-32 text-center">
              <p className="font-display text-xl font-semibold text-krama-text-primary">
                No sneakers match those filters
              </p>
              <p className="text-sm text-krama-text-primary/50">
                Try clearing a filter or two.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
