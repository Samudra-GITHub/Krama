"use client";

import { clsx } from "clsx";
import { Sparkles, Package, ClipboardList, BarChart3 } from "lucide-react";

export const ADMIN_SECTIONS = [
  { id: "drops", label: "Drops", icon: Sparkles },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

export type AdminSection = (typeof ADMIN_SECTIONS)[number]["id"];

export function AdminSidebar({
  active,
  onChange,
}: {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
}) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-56 lg:flex-col lg:overflow-visible lg:pb-0">
      {ADMIN_SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onChange(section.id)}
          className={clsx(
            "flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 lg:shrink",
            active === section.id
              ? "bg-krama-text-dark text-white"
              : "text-krama-text-muted hover:bg-krama-surface-subtle hover:text-krama-text-dark"
          )}
        >
          <section.icon size={16} strokeWidth={1.5} />
          {section.label}
        </button>
      ))}
    </nav>
  );
}
