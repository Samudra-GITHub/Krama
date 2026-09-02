"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { CreditCard, MapPin, Plus, Star, Trash2, ChevronDown } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/checkout/Field";
import { Modal } from "@/components/ui/Modal";
import { ProductCard } from "@/components/ui/ProductCard";
import { AccountSidebar, type AccountSection } from "@/components/account/AccountSidebar";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToastStore } from "@/lib/store/toast";
import { useOrdersStore } from "@/lib/store/orders";
import { useAddressesStore } from "@/lib/store/addresses";
import { usePaymentsStore, guessCardBrand } from "@/lib/store/payments";
import { PRODUCTS } from "@/lib/products";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-krama-success/10 text-krama-success",
  Shipped: "bg-krama-accent-alt/10 text-sky-600",
  Processing: "bg-krama-warning/10 text-krama-warning",
};

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountPageInner />
    </Suspense>
  );
}

function AccountPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSection = (searchParams.get("tab") as AccountSection) ?? "profile";
  const [section, setSection] = useState<AccountSection>(initialSection);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-surface-subtle pt-20">
        <div className="border-b border-krama-border-subtle px-6 py-10 md:px-10">
          <h1 className="font-display text-3xl font-bold uppercase text-krama-text-dark">
            My Account
          </h1>
        </div>

        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row">
          <AccountSidebar active={section} onChange={setSection} />

          <div className="flex-1">
            {section === "profile" && <ProfileSection />}
            {section === "orders" && <OrdersSection onShop={() => router.push("/shop")} />}
            {section === "wishlist" && <WishlistSection />}
            {section === "addresses" && <AddressesSection />}
            {section === "payment" && <PaymentSection />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-glass bg-white p-6 shadow-krama-soft sm:p-8">
      <h2 className="mb-6 font-display text-lg font-bold uppercase text-krama-text-dark">
        {title}
      </h2>
      {children}
    </div>
  );
}

function ProfileSection() {
  const pushToast = useToastStore((s) => s.push);
  const [form, setForm] = useState({
    name: "Aarav Kumar",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
  });

  return (
    <SectionCard title="Profile">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-pill bg-krama-text-dark font-display text-lg font-bold text-white">
          {form.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="font-medium text-krama-text-dark">{form.name}</p>
          <p className="text-sm text-krama-text-muted">Member since Jan 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Field label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Field
          label="Email"
          type="email"
          className="sm:col-span-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <Button
        variant="primary"
        className="mt-6"
        onClick={() => pushToast("Profile updated", "success")}
      >
        Save Changes
      </Button>
    </SectionCard>
  );
}

function OrdersSection({ onShop }: { onShop: () => void }) {
  const orders = useOrdersStore((s) => s.orders);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <SectionCard title="Orders">
        <p className="text-sm text-krama-text-muted">You have no orders yet.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Orders">
      <div className="flex flex-col divide-y divide-krama-border-subtle">
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          return (
            <div key={order.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 py-4 text-left"
              >
                <div>
                  <p className="font-mono text-sm text-krama-text-dark">{order.id}</p>
                  <p className="text-xs text-krama-text-muted">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {order.items} item{order.items !== 1 ? "s" : ""}
                  </p>
                </div>
                <span
                  className={clsx(
                    "rounded-pill px-3 py-1 text-xs font-medium uppercase tracking-label",
                    STATUS_COLORS[order.status]
                  )}
                >
                  {order.status}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm tabular-nums text-krama-text-dark">
                    {formatPrice(order.total)}
                  </span>
                  <ChevronDown
                    size={15}
                    className={clsx(
                      "text-krama-text-muted transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>
              {isOpen && (
                <div className="mb-4 flex flex-col gap-3 rounded-lg bg-krama-surface-subtle p-4 text-sm">
                  {order.lineItems?.map((item, i) => (
                    <div key={i} className="flex justify-between text-krama-text-dark">
                      <span>
                        {item.name} ({item.colorway}, {item.size}) × {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {order.shippingAddress && (
                    <p className="text-xs text-krama-text-muted">
                      Shipped to {order.shippingAddress}
                    </p>
                  )}
                  {order.paymentMethod && (
                    <p className="text-xs text-krama-text-muted">
                      Paid via {order.paymentMethod}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={onShop}
        className="mt-6 text-xs uppercase tracking-label text-krama-text-dark underline underline-offset-4"
      >
        Continue shopping
      </button>
    </SectionCard>
  );
}

function WishlistSection() {
  const ids = useWishlistStore((s) => s.ids);
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  if (products.length === 0) {
    return (
      <SectionCard title="Wishlist">
        <p className="text-sm text-krama-text-muted">
          Nothing saved yet. Tap the heart on any product to add it here.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Wishlist">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionCard>
  );
}

function AddressesSection() {
  const addresses = useAddressesStore((s) => s.addresses);
  const removeAddress = useAddressesStore((s) => s.removeAddress);
  const addAddress = useAddressesStore((s) => s.addAddress);
  const pushToast = useToastStore((s) => s.push);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ label: "", line: "", city: "", state: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<typeof form> = {};
    (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
      if (!form[key].trim()) nextErrors[key] = "Required";
    });
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) nextErrors.pincode = "6 digits";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addAddress(form);
    pushToast("Address added", "success");
    setForm({ label: "", line: "", city: "", state: "", pincode: "" });
    setModalOpen(false);
  }

  function handleRemove(id: string) {
    removeAddress(id);
    pushToast("Address removed", "info");
  }

  return (
    <SectionCard title="Addresses">
      <div className="flex flex-col gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="flex items-start justify-between gap-4 rounded-lg border border-krama-border-subtle p-4"
          >
            <div className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-krama-text-muted" strokeWidth={1.5} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-krama-text-dark">{address.label}</p>
                  {address.isDefault && (
                    <span className="flex items-center gap-1 rounded-pill bg-krama-surface-subtle px-2 py-0.5 text-[10px] uppercase tracking-label text-krama-text-muted">
                      <Star size={9} fill="currentColor" /> Default
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-krama-text-muted">
                  {address.line}, {address.city}, {address.state} {address.pincode}
                </p>
              </div>
            </div>
            {!address.isDefault && (
              <button
                aria-label="Remove address"
                onClick={() => handleRemove(address.id)}
                className="shrink-0 text-krama-text-muted transition-colors hover:text-krama-danger"
              >
                <Trash2 size={15} strokeWidth={1.5} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-krama-border-subtle py-4 text-sm text-krama-text-muted transition-colors hover:border-krama-text-dark hover:text-krama-text-dark"
        >
          <Plus size={15} /> Add new address
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Address">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Field
            label="Label (e.g. Home)"
            value={form.label}
            error={errors.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
          <Field
            label="Address"
            value={form.line}
            error={errors.line}
            onChange={(e) => setForm({ ...form, line: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="City"
              value={form.city}
              error={errors.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Field
              label="State"
              value={form.state}
              error={errors.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <Field
            label="Pincode"
            value={form.pincode}
            error={errors.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
          <Button type="submit" variant="primary" className="w-fit">
            Save Address
          </Button>
        </form>
      </Modal>
    </SectionCard>
  );
}

function PaymentSection() {
  const methods = usePaymentsStore((s) => s.methods);
  const addMethod = usePaymentsStore((s) => s.addMethod);
  const removeMethod = usePaymentsStore((s) => s.removeMethod);
  const pushToast = useToastStore((s) => s.push);

  const [modalOpen, setModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12) {
      setError("Enter a valid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry should be MM/YY.");
      return;
    }
    addMethod({ brand: guessCardBrand(digits), last4: digits.slice(-4), expiry });
    pushToast("Payment method added", "success");
    setCardNumber("");
    setExpiry("");
    setError("");
    setModalOpen(false);
  }

  function handleRemove(id: string) {
    removeMethod(id);
    pushToast("Payment method removed", "info");
  }

  return (
    <SectionCard title="Payment Methods">
      <div className="flex flex-col gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-krama-border-subtle p-4"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-krama-text-muted" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-krama-text-dark">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-xs text-krama-text-muted">Expires {method.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {method.isDefault && (
                <span className="rounded-pill bg-krama-surface-subtle px-2 py-0.5 text-[10px] uppercase tracking-label text-krama-text-muted">
                  Default
                </span>
              )}
              {!method.isDefault && (
                <button
                  aria-label="Remove payment method"
                  onClick={() => handleRemove(method.id)}
                  className="text-krama-text-muted transition-colors hover:text-krama-danger"
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-krama-border-subtle py-4 text-sm text-krama-text-muted transition-colors hover:border-krama-text-dark hover:text-krama-text-dark"
        >
          <Plus size={15} /> Add payment method
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Payment Method">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Field
            label="Card number"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Field
            label="Expiry (MM/YY)"
            placeholder="12/28"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          {error && <p className="text-xs text-krama-danger">{error}</p>}
          <Button type="submit" variant="primary" className="w-fit">
            Save Card
          </Button>
        </form>
      </Modal>
    </SectionCard>
  );
}
