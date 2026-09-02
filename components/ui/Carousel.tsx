"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

export function Carousel({ children }: { children: React.ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(i);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="w-full shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>

      {children.length > 1 && (
        <>
          <button
            data-cursor="interactive"
            aria-label="Previous"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            disabled={active === 0}
            className="glass-card absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-krama-text-primary transition-opacity disabled:opacity-0"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            data-cursor="interactive"
            aria-label="Next"
            onClick={() => scrollToIndex(Math.min(children.length - 1, active + 1))}
            disabled={active === children.length - 1}
            className="glass-card absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-krama-text-primary transition-opacity disabled:opacity-0"
          >
            <ChevronRight size={16} />
          </button>

          <div className="mt-3 flex justify-center gap-1.5">
            {children.map((_, i) => (
              <button
                key={i}
                data-cursor="interactive"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={clsx(
                  "h-1.5 rounded-pill transition-all duration-300",
                  i === active ? "w-5 bg-krama-accent" : "w-1.5 bg-white/25"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
