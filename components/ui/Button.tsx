import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-body text-sm font-medium uppercase tracking-label transition-colors duration-200 focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-krama-accent text-[#04150a] px-8 h-14 shadow-[0_0_32px_rgba(34,197,94,0.45)] hover:brightness-110",
  secondary:
    "glass-card !rounded-pill px-8 h-14 text-krama-text-primary border-krama-border-glass hover:bg-krama-glass-light",
  tertiary:
    "text-krama-text-primary/90 hover:text-krama-accent-alt px-1 h-auto",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(base, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
