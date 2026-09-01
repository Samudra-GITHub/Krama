"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";

interface ColorSwatchProps {
  hex: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColorSwatch({ hex, name, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      data-cursor="interactive"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={name}
      title={name}
      className={clsx(
        "relative grid h-8 w-8 place-items-center rounded-pill ring-2 ring-offset-2 ring-offset-krama-bg transition-all duration-200",
        selected ? "ring-krama-accent-alt scale-110" : "ring-transparent hover:ring-krama-border-glass"
      )}
    >
      <span
        className="h-full w-full rounded-pill border border-white/20"
        style={{ backgroundColor: hex }}
      />
      {selected && (
        <Check
          size={13}
          strokeWidth={3}
          className="absolute text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
        />
      )}
    </button>
  );
}
