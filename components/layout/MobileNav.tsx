"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, LayoutGrid, User } from "lucide-react";
import { clsx } from "clsx";
import { useCartStore, selectCartCount } from "@/lib/store/cart";

const ITEMS = [
  { label: "Home", href: "/", icon: Home, badge: false },
  { label: "Shop", href: "/shop", icon: LayoutGrid, badge: false },
  { label: "Cart", href: "/checkout", icon: ShoppingBag, badge: true },
  { label: "Profile", href: "/account", icon: User, badge: false },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartStore(selectCartCount);
  const openCart = useCartStore((s) => s.open);

  return (
    <nav className="glass-nav fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around lg:hidden">
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        const isCart = item.label === "Cart";

        const content = (
          <>
            <div className="relative">
              <item.icon
                size={20}
                strokeWidth={1.5}
                className={active ? "text-krama-accent" : "text-krama-text-primary/60"}
              />
              {item.badge && cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-3.5 w-3.5 place-items-center rounded-pill bg-krama-accent text-[9px] font-semibold text-[#04150a]">
                  {cartCount}
                </span>
              )}
            </div>
            <span
              className={clsx(
                "text-[10px] uppercase tracking-label",
                active ? "text-krama-accent" : "text-krama-text-primary/60"
              )}
            >
              {item.label}
            </span>
          </>
        );

        if (isCart) {
          return (
            <button
              key={item.label}
              data-cursor="interactive"
              onClick={openCart}
              className="flex flex-col items-center gap-1"
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            data-cursor="interactive"
            className="flex flex-col items-center gap-1"
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
