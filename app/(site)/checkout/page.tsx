"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, CreditCard, Lock, RotateCcw, Smartphone, Wallet } from "lucide-react";
import { clsx } from "clsx";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/checkout/Stepper";
import { Field } from "@/components/checkout/Field";
import { useCartStore, selectCartTotal } from "@/lib/store/cart";
import { useOrdersStore } from "@/lib/store/orders";
import { useReducedMotion } from "@/lib/useReducedMotion";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

type PaymentMethod = "card" | "upi" | "wallet";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  pincode: string;
}

const EMPTY_SHIPPING: ShippingForm = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectCartTotal);
  const addOrder = useOrdersStore((s) => s.addOrder);

  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState({ count: 0, total: 0, orderId: "" });

  const [shipping, setShipping] = useState<ShippingForm>(EMPTY_SHIPPING);
  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingForm>>({});

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  const shippingCost = subtotal >= 15000 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shippingCost;

  function validateShipping() {
    const errors: Partial<ShippingForm> = {};
    (Object.keys(shipping) as (keyof ShippingForm)[]).forEach((key) => {
      if (!shipping[key].trim()) errors[key] = "Required";
    });
    if (shipping.pincode && !/^\d{6}$/.test(shipping.pincode)) {
      errors.pincode = "Enter a 6-digit pincode";
    }
    if (shipping.email && !/^\S+@\S+\.\S+$/.test(shipping.email)) {
      errors.email = "Enter a valid email";
    }
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validatePayment() {
    if (method === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) {
        setUpiError("Enter a valid UPI ID");
        return false;
      }
    }
    setUpiError("");
    return true;
  }

  function handlePlaceOrder() {
    const orderId = `KR${Math.floor(100000 + Math.random() * 900000)}`;
    const count = items.reduce((sum, i) => sum + i.quantity, 0);

    addOrder({
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      items: count,
      total,
      lineItems: items.map((item) => ({
        name: item.product.name,
        colorway: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress: `${shipping.address1}, ${shipping.city}, ${shipping.state} ${shipping.pincode}`,
      paymentMethod: method === "upi" ? `UPI · ${upiId}` : method === "wallet" ? "Wallet" : "Card",
    });
    setOrderSummary({ count, total, orderId });
    setPlaced(true);
    useCartStore.setState({ items: [] });
  }

  if (placed) {
    return <SuccessScreen orderSummary={orderSummary} />;
  }

  if (items.length === 0) {
    return (
      <>
        <Nav />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-krama-bg px-6 pt-20 text-center">
          <p className="font-display text-xl font-semibold text-krama-text-primary">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-label text-krama-accent-alt"
          >
            Browse the shop
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20">
        <div className="border-b border-white/10 px-6 py-10 md:px-10">
          <Stepper current={step} />
        </div>

        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_380px]">
          <div className="rounded-glass bg-krama-surface p-6 sm:p-8">
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-xl font-bold uppercase text-krama-text-dark">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={shipping.fullName}
                    error={shippingErrors.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  />
                  <Field
                    label="Phone"
                    value={shipping.phone}
                    error={shippingErrors.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  />
                  <Field
                    label="Email"
                    type="email"
                    className="sm:col-span-2"
                    value={shipping.email}
                    error={shippingErrors.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  />
                  <Field
                    label="Address"
                    className="sm:col-span-2"
                    value={shipping.address1}
                    error={shippingErrors.address1}
                    onChange={(e) => setShipping({ ...shipping, address1: e.target.value })}
                  />
                  <Field
                    label="City"
                    value={shipping.city}
                    error={shippingErrors.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  />
                  <Field
                    label="State"
                    value={shipping.state}
                    error={shippingErrors.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  />
                  <Field
                    label="Pincode"
                    value={shipping.pincode}
                    error={shippingErrors.pincode}
                    onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                  />
                </div>
                <Button
                  variant="primary"
                  className="mt-2 w-fit"
                  onClick={() => validateShipping() && setStep(1)}
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-xl font-bold uppercase text-krama-text-dark">
                  Payment
                </h2>
                <div className="flex gap-3">
                  {(
                    [
                      { id: "card", label: "Card", icon: CreditCard },
                      { id: "upi", label: "UPI", icon: Smartphone },
                      { id: "wallet", label: "Wallet", icon: Wallet },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMethod(opt.id)}
                      className={clsx(
                        "flex flex-1 flex-col items-center gap-2 rounded-lg border py-4 text-xs uppercase tracking-label transition-colors duration-200",
                        method === opt.id
                          ? "border-krama-text-dark bg-krama-surface-subtle text-krama-text-dark"
                          : "border-krama-border-subtle text-krama-text-muted hover:border-krama-text-dark/40"
                      )}
                    >
                      <opt.icon size={18} strokeWidth={1.5} />
                      {opt.label}
                    </button>
                  ))}
                </div>

                {method === "card" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Card number" className="sm:col-span-2" placeholder="1234 1234 1234 1234" />
                    <Field label="Expiry" placeholder="MM/YY" />
                    <Field label="CVV" placeholder="123" />
                  </div>
                )}
                {method === "upi" && (
                  <Field
                    label="UPI ID"
                    placeholder="yourname@bank"
                    value={upiId}
                    error={upiError}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                )}
                {method === "wallet" && (
                  <p className="text-sm text-krama-text-muted">
                    You&apos;ll be redirected to your wallet provider to complete payment.
                  </p>
                )}

                <div className="mt-2 flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => validatePayment() && setStep(2)}
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <h2 className="font-display text-xl font-bold uppercase text-krama-text-dark">
                  Review &amp; Confirm
                </h2>

                <div className="rounded-lg border border-krama-border-subtle p-4">
                  <p className="mb-1 text-xs uppercase tracking-label text-krama-text-muted">
                    Shipping to
                  </p>
                  <p className="text-sm text-krama-text-dark">
                    {shipping.fullName} · {shipping.address1}, {shipping.city}, {shipping.state}{" "}
                    {shipping.pincode}
                  </p>
                </div>

                <div className="rounded-lg border border-krama-border-subtle p-4">
                  <p className="mb-1 text-xs uppercase tracking-label text-krama-text-muted">
                    Payment method
                  </p>
                  <p className="text-sm capitalize text-krama-text-dark">
                    {method === "upi" ? `UPI · ${upiId}` : method}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm text-krama-text-dark"
                    >
                      <span>
                        {item.product.name} ({item.color}, {item.size}) × {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-krama-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} strokeWidth={1.5} />
                    Secure, encrypted payment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw size={13} strokeWidth={1.5} />
                    Free returns within 14 days
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={handlePlaceOrder}>
                    Place Order · {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-glass bg-krama-surface p-6 sm:p-8 lg:sticky lg:top-28">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-label text-krama-text-dark">
              Order Summary
            </h3>
            <div className="flex flex-col gap-2 border-b border-krama-border-subtle pb-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-krama-text-muted">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-mono tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 py-4 text-sm text-krama-text-dark">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-krama-text-muted">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
            </div>
            <div className="flex justify-between border-t border-krama-border-subtle pt-4 font-medium text-krama-text-dark">
              <span>Total</span>
              <span className="font-mono tabular-nums">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SuccessScreen({
  orderSummary,
}: {
  orderSummary: { count: number; total: number; orderId: string };
}) {
  const reducedMotion = useReducedMotion();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0" style={{ background: "var(--krama-gradient-hero)" }} />
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-krama-bg/60" />

      <motion.div
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.9, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-hero-tile relative z-10 flex max-w-md flex-col items-center gap-4 px-10 py-12"
      >
        <motion.div
          initial={{ scale: reducedMotion ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 size={52} className="text-krama-accent" strokeWidth={1.5} />
        </motion.div>
        <h1 className="font-display text-2xl font-bold uppercase text-krama-text-primary">
          Order Confirmed
        </h1>
        <p className="text-sm text-krama-text-primary/70">
          Order <span className="font-mono text-krama-accent-alt">{orderSummary.orderId}</span> ·{" "}
          {orderSummary.count} item{orderSummary.count !== 1 ? "s" : ""} ·{" "}
          {formatPrice(orderSummary.total)}
        </p>
        <p className="max-w-xs text-xs text-krama-text-primary/50">
          A confirmation has been sent to your email. Track your order anytime from your account.
        </p>
        <Link
          href="/shop"
          className="mt-2 text-xs uppercase tracking-label text-krama-accent-alt"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </main>
  );
}
