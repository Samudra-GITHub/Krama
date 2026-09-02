"use client";

import { clsx } from "clsx";
import { User, Package, Heart, MapPin, CreditCard } from "lucide-react";

export const ACCOUNT_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
] as const;

export type AccountSection = (typeof ACCOUNT_SECTIONS)[number]["id"];

export function AccountSidebar({
  active,
  onChange,
}: {
  active: AccountSection;
  onChange: (section: AccountSection) => void;
}) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-56 lg:flex-col lg:overflow-visible lg:pb-0">
      {ACCOUNT_SECTIONS.map((section) => (
        <button
          key={section.id}
          data-cursor="interactive"
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
