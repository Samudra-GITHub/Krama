"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { clsx } from "clsx";
import { CATEGORIES, COLORS, ALL_SIZES, type Product } from "@/lib/products";
import { SizeChip } from "@/components/ui/SizeChip";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

export type SortOption = "featured" | "price-asc" | "price-desc";

export interface FilterState {
  categories: Product["category"][];
  colors: string[];
  sizes: number[];
  sort: SortOption;
}

interface FilterBarProps {
  state: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}

export function FilterBar({ state, onChange, resultCount }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = state.categories.length + state.colors.length + state.sizes.length;

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  function clearAll() {
    onChange({ categories: [], colors: [], sizes: [], sort: state.sort });
  }

  return (
    <div className="sticky top-20 z-30">
      <div className="glass-card flex items-center justify-between px-5 py-3 lg:hidden">
        <button
          data-cursor="interactive"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-label text-krama-text-primary"
        >
          <SlidersHorizontal size={15} strokeWidth={1.5} />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <span className="font-mono text-xs tabular-nums text-krama-text-primary/50">
          {resultCount} results
        </span>
      </div>

      <div
        className={clsx(
          "glass-card mt-2 flex-col gap-6 overflow-hidden px-6 py-6 transition-[max-height,opacity] duration-300 lg:mt-0 lg:flex lg:max-h-none lg:flex-row lg:flex-wrap lg:items-center lg:gap-8 lg:rounded-glass",
          mobileOpen ? "flex max-h-[600px] opacity-100" : "hidden max-h-0 opacity-0 lg:flex lg:opacity-100"
        )}
      >
        <FilterGroup label="Category">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-cursor="interactive"
                onClick={() => onChange({ ...state, categories: toggle(state.categories, cat) })}
                className={clsx(
                  "rounded-pill border px-4 py-1.5 text-xs uppercase tracking-label transition-colors duration-200",
                  state.categories.includes(cat)
                    ? "border-krama-accent bg-krama-accent text-[#04150a]"
                    : "border-krama-border-glass text-krama-text-primary/80 hover:border-krama-accent-alt"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Colorway">
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <ColorSwatch
                key={c.name}
                hex={c.hex}
                name={c.name}
                selected={state.colors.includes(c.name)}
                onClick={() => onChange({ ...state, colors: toggle(state.colors, c.name) })}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Size">
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <SizeChip
                key={size}
                size={size}
                selected={state.sizes.includes(size)}
                onClick={() => onChange({ ...state, sizes: toggle(state.sizes, size) })}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Sort">
          <select
            data-cursor="interactive"
            value={state.sort}
            onChange={(e) => onChange({ ...state, sort: e.target.value as SortOption })}
            className="h-10 rounded-pill border border-krama-border-glass bg-transparent px-4 text-xs uppercase tracking-label text-krama-text-primary focus:border-krama-accent-alt"
          >
            <option className="bg-krama-bg-alt" value="featured">Featured</option>
            <option className="bg-krama-bg-alt" value="price-asc">Price: Low to High</option>
            <option className="bg-krama-bg-alt" value="price-desc">Price: High to Low</option>
          </select>
        </FilterGroup>

        {activeCount > 0 && (
          <button
            data-cursor="interactive"
            onClick={clearAll}
            className="flex items-center gap-1 text-xs uppercase tracking-label text-krama-text-primary/50 transition-colors hover:text-krama-danger lg:ml-auto"
          >
            <X size={13} />
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-label text-krama-text-primary/45">
        {label}
      </span>
      {children}
    </div>
  );
}
