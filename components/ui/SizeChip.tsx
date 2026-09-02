"use client";

import { clsx } from "clsx";

interface SizeChipProps {
  size: number;
  selected?: boolean;
  soldOut?: boolean;
  onClick?: () => void;
}

export function SizeChip({ size, selected, soldOut, onClick }: SizeChipProps) {
  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "relative grid h-10 min-w-10 place-items-center rounded-pill border px-2 font-mono text-xs tabular-nums transition-all duration-200",
        soldOut &&
          "border-krama-border-glass/40 text-krama-text-primary/25 line-through",
        !soldOut &&
          selected &&
          "border-krama-accent bg-krama-accent text-black scale-105",
        !soldOut &&
          !selected &&
          "border-krama-border-glass text-krama-text-primary/80 hover:border-krama-accent-alt hover:text-krama-text-primary"
      )}
    >
      {size}
    </button>
  );
}
