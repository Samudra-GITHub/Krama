"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, selectCartTotal } from "@/lib/store/cart";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFocusTrap } from "@/lib/useFocusTrap";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
const FREE_SHIPPING_THRESHOLD = 15000;

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore(selectCartTotal);
  const reducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, drawerRef);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={close}
          />

          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-krama-border-glass bg-krama-glass-dark backdrop-blur-2xl"
            initial={{ x: reducedMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "100%" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", damping: 28, stiffness: 260 }
            }
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-bold uppercase text-krama-text-primary">
                Your Cart
              </h2>
              <button
                data-cursor="interactive"
                onClick={close}
                aria-label="Close cart"
                className="text-krama-text-primary/60 transition-colors hover:text-krama-text-primary"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={32} strokeWidth={1.2} className="text-krama-text-primary/30" />
                <p className="text-sm text-krama-text-primary/60">Your cart is empty.</p>
                <Link
                  href="/shop"
                  data-cursor="interactive"
                  onClick={close}
                  className="text-xs uppercase tracking-label text-krama-accent-alt"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        layout
                        initial={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-5 flex gap-4 border-b border-white/5 pb-5 last:border-0"
                      >
                        <div
                          className="grid h-20 w-20 shrink-0 place-items-center rounded-glass"
                          style={{
                            background: `linear-gradient(160deg, ${item.product.accent}22, #0f172a)`,
                          }}
                        >
                          <SneakerSilhouette
                            accent={item.product.accent}
                            className="w-[85%] -rotate-6"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-krama-text-primary">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-krama-text-primary/50">
                                {item.color} · Size {item.size}
                              </p>
                            </div>
                            <button
                              data-cursor="interactive"
                              aria-label="Remove item"
                              onClick={() => removeItem(index)}
                              className="text-krama-text-primary/40 transition-colors hover:text-krama-danger"
                            >
                              <Trash2 size={15} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-pill border border-krama-border-glass px-3 py-1">
                              <button
                                data-cursor="interactive"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                className="text-krama-text-primary/70 hover:text-krama-text-primary"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-3 text-center font-mono text-xs tabular-nums text-krama-text-primary">
                                {item.quantity}
                              </span>
                              <button
                                data-cursor="interactive"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(index, Math.min(9, item.quantity + 1))}
                                className="text-krama-text-primary/70 hover:text-krama-text-primary"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-mono text-sm tabular-nums text-krama-text-primary">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/10 px-6 py-6">
                  <div className="mb-1 flex items-center justify-between text-sm text-krama-text-primary/70">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between text-sm text-krama-text-primary/50">
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <Link href="/checkout" onClick={close} data-cursor="interactive">
                    <Button variant="primary" className="w-full">
                      Checkout · {formatPrice(subtotal + shipping)}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
