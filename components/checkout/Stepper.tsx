"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";

const STEPS = ["Shipping", "Payment", "Review"];

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "grid h-7 w-7 shrink-0 place-items-center rounded-pill font-mono text-xs tabular-nums transition-colors duration-200",
                i < current && "bg-krama-accent text-black",
                i === current && "border border-krama-accent text-krama-accent",
                i > current && "border border-krama-border-subtle text-krama-text-muted"
              )}
            >
              {i < current ? <Check size={13} strokeWidth={2.5} /> : i + 1}
            </div>
            <span
              className={clsx(
                "hidden text-xs uppercase tracking-label sm:block",
                i <= current ? "text-krama-text-dark" : "text-krama-text-muted"
              )}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={clsx(
                "h-px w-8 sm:w-14",
                i < current ? "bg-krama-accent" : "bg-krama-border-subtle"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
