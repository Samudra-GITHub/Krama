import { forwardRef } from "react";

const TICKS = Array.from({ length: 24 });

export const TurntableRing = forwardRef<HTMLDivElement>(function TurntableRing(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[88vmin] w-[88vmin] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen sm:h-[64vmin] sm:w-[64vmin]"
    >
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <circle cx="200" cy="200" r="196" fill="none" stroke="#9fb8ff" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="1 4" />
        <circle cx="200" cy="200" r="160" fill="none" stroke="#9fb8ff" strokeOpacity="0.25" strokeWidth="1" />
        {TICKS.map((_, i) => {
          const angle = (i / TICKS.length) * 360;
          return (
            <line
              key={i}
              x1="200"
              y1="10"
              x2="200"
              y2="26"
              stroke="#9fb8ff"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
      </svg>
    </div>
  );
});
