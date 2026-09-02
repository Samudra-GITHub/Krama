import { Star } from "lucide-react";
import { clsx } from "clsx";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, count, size = 13, className }: RatingProps) {
  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              fill={filled ? "#9fb8ff" : "none"}
              stroke={filled ? "#9fb8ff" : "#9ca3af"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="font-mono text-xs tabular-nums text-krama-text-muted">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
