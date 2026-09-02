"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Plus, Trash2, TrendingUp, DollarSign, ShoppingCart, Percent } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar, type AdminSection } from "@/components/admin/AdminSidebar";
import { useToastStore } from "@/lib/store/toast";
import { useOrdersStore } from "@/lib/store/orders";
import { PRODUCTS as INITIAL_PRODUCTS, type Product } from "@/lib/products";
import { type Order } from "@/lib/orders";
import { DROPS as INITIAL_DROPS, ANALYTICS, type Drop } from "@/lib/drops";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const DROP_STATUS_FLOW: Record<Drop["status"], Drop["status"]> = {
  Draft: "Scheduled",
  Scheduled: "Live",
  Live: "Live",
};

const DROP_STATUS_COLORS: Record<Drop["status"], string> = {
  Live: "bg-krama-success/10 text-krama-success",
  Scheduled: "bg-krama-accent-alt/10 text-sky-600",
  Draft: "bg-krama-text-muted/10 text-krama-text-muted",
};

const ORDER_STATUS_OPTIONS: Order["status"][] = ["Processing", "Shipped", "Delivered"];

export default function AdminPage() {
  const [section, setSection] = useState<AdminSection>("drops");

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-surface-subtle pt-20">
        <div className="border-b border-krama-border-subtle px-6 py-10 md:px-10">
          <span className="text-xs uppercase tracking-label text-krama-text-muted">
            Admin — demo data, local only
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase text-krama-text-dark">
            Dashboard
          </h1>
        </div>

        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row">
          <AdminSidebar active={section} onChange={setSection} />

          <div className="flex-1">
            {section === "drops" && <DropsSection />}
            {section === "products" && <ProductsSection />}
            {section === "orders" && <OrdersSection />}
            {section === "analytics" && <AnalyticsSection />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-glass bg-white p-6 shadow-krama-soft sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold uppercase text-krama-text-dark">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function DropsSection() {
  const [drops, setDrops] = useState<Drop[]>(INITIAL_DROPS);
  const pushToast = useToastStore((s) => s.push);

  function advanceStatus(id: string) {
    setDrops((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: DROP_STATUS_FLOW[d.status] } : d))
    );
    pushToast("Drop status updated", "success");
  }

  return (
    <SectionCard title="Drops">
      <div className="flex flex-col divide-y divide-krama-border-subtle">
        {drops.map((drop) => (
          <div key={drop.id} className="flex flex-wrap items-center gap-4 py-4">
            <div
              className="h-12 w-12 shrink-0 rounded-lg"
              style={{ background: drop.gradient }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-krama-text-dark">{drop.name}</p>
              <p className="text-xs text-krama-text-muted">
                {new Date(drop.releaseDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                · {drop.productCount} products
              </p>
            </div>
            <span
              className={clsx(
                "rounded-pill px-3 py-1 text-xs font-medium uppercase tracking-label",
                DROP_STATUS_COLORS[drop.status]
              )}
            >
              {drop.status}
            </span>
            <button
              data-cursor="interactive"
              disabled={drop.status === "Live"}
              onClick={() => advanceStatus(drop.id)}
              className="rounded-pill border border-krama-border-subtle px-4 py-1.5 text-xs uppercase tracking-label text-krama-text-dark transition-colors hover:border-krama-text-dark disabled:opacity-30"
            >
              {drop.status === "Draft" ? "Schedule" : drop.status === "Scheduled" ? "Publish" : "Live"}
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const pushToast = useToastStore((s) => s.push);

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    pushToast("Product removed", "info");
  }

  function addProduct() {
    const next: Product = {
      id: `p-new-${Date.now()}`,
      slug: `new-silhouette-${products.length + 1}`,
      name: "New Silhouette",
      colorway: "Unnamed",
      price: 11999,
      accent: "#38bdf8",
      category: "Low",
      sizes: [8, 9, 10],
    };
    setProducts((prev) => [next, ...prev]);
    pushToast("Draft product created", "success");
  }

  return (
    <SectionCard
      title="Products"
      action={
        <button
          data-cursor="interactive"
          onClick={addProduct}
          className="flex items-center gap-1.5 rounded-pill bg-krama-text-dark px-4 py-2 text-xs uppercase tracking-label text-white"
        >
          <Plus size={13} /> New
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-krama-border-subtle text-[10px] uppercase tracking-label text-krama-text-muted">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-krama-border-subtle/60">
                <td className="py-3">
                  <p className="font-medium text-krama-text-dark">{product.name}</p>
                  <p className="text-xs text-krama-text-muted">{product.colorway}</p>
                </td>
                <td className="py-3 text-krama-text-muted">{product.category}</td>
                <td className="py-3 font-mono tabular-nums text-krama-text-dark">
                  {formatPrice(product.price)}
                </td>
                <td className="py-3 text-right">
                  <button
                    data-cursor="interactive"
                    aria-label="Remove product"
                    onClick={() => removeProduct(product.id)}
                    className="text-krama-text-muted transition-colors hover:text-krama-danger"
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function OrdersSection() {
  const orders = useOrdersStore((s) => s.orders);
  const updateOrderStatus = useOrdersStore((s) => s.updateStatus);
  const pushToast = useToastStore((s) => s.push);

  function updateStatus(id: string, status: Order["status"]) {
    updateOrderStatus(id, status);
    pushToast(`Order ${id} marked ${status}`, "success");
  }

  return (
    <SectionCard title="Orders">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-krama-border-subtle text-[10px] uppercase tracking-label text-krama-text-muted">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-krama-border-subtle/60">
                <td className="py-3 font-mono text-krama-text-dark">{order.id}</td>
                <td className="py-3 text-krama-text-muted">
                  {new Date(order.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="py-3 font-mono tabular-nums text-krama-text-dark">
                  {formatPrice(order.total)}
                </td>
                <td className="py-3">
                  <select
                    data-cursor="interactive"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                    className="rounded-pill border border-krama-border-subtle bg-white px-3 py-1 text-xs uppercase tracking-label text-krama-text-dark focus:border-krama-text-dark focus:outline-none"
                  >
                    {ORDER_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function AnalyticsSection() {
  const maxRevenue = Math.max(...ANALYTICS.monthly.map((m) => m.revenue));

  const stats = [
    { label: "Revenue", value: formatPrice(ANALYTICS.revenue), icon: DollarSign },
    { label: "Conversion Rate", value: `${ANALYTICS.conversionRate}%`, icon: Percent },
    { label: "Avg. Order Value", value: formatPrice(ANALYTICS.aov), icon: TrendingUp },
    { label: "Units Sold", value: ANALYTICS.unitsSold.toString(), icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-glass bg-white p-5 shadow-krama-soft">
            <stat.icon size={16} className="mb-3 text-krama-text-muted" strokeWidth={1.5} />
            <p className="font-mono text-xl tabular-nums text-krama-text-dark">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-label text-krama-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <SectionCard title="Revenue by Month">
        <div className="flex h-48 gap-4">
          {ANALYTICS.monthly.map((m) => (
            <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className="w-full rounded-t-md bg-krama-accent transition-all duration-500"
                style={{ height: `${(m.revenue / maxRevenue) * 80}%` }}
              />
              <span className="text-[10px] uppercase tracking-label text-krama-text-muted">
                {m.month}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
