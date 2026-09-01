"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { useToastStore, type Toast } from "@/lib/store/toast";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ICONS: Record<Toast["variant"], React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS: Record<Toast["variant"], string> = {
  success: "text-krama-accent",
  error: "text-krama-danger",
  info: "text-krama-accent-alt",
};

function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);
  const reducedMotion = useReducedMotion();
  const Icon = ICONS[toast.variant];

  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex w-72 items-center gap-3 overflow-hidden px-4 py-3"
    >
      <Icon size={17} className={COLORS[toast.variant]} strokeWidth={1.5} />
      <p className="text-sm text-krama-text-primary">{toast.message}</p>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-krama-accent-alt/60"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 3.2, ease: "linear" }}
      />
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
