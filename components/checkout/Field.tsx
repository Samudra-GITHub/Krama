"use client";

import { clsx } from "clsx";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, className, ...props }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-label text-krama-text-muted">{label}</span>
      <input
        className={clsx(
          "h-12 rounded-lg border bg-white px-4 text-sm text-krama-text-dark placeholder:text-krama-text-muted focus:outline-none",
          error
            ? "border-krama-danger"
            : "border-krama-border-subtle focus:border-krama-text-dark",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-krama-danger">{error}</span>}
    </label>
  );
}
