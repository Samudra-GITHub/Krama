"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore, selectCartCount } from "@/lib/store/cart";
import { useSearchStore } from "@/lib/store/search";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "Community", href: "/community" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore(selectCartCount);
  const openCart = useCartStore((s) => s.open);
  const openSearch = useSearchStore((s) => s.open);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        id="site-nav"
        className={`glass-nav fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 transition-[background-color] duration-300 md:px-10 ${
          scrolled ? "bg-opacity-80" : ""
        }`}
      >
        <Link
          href="/"
          data-cursor="interactive"
          className="font-display text-xl font-bold uppercase tracking-widest text-krama-text-primary"
        >
          KRAMA
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="interactive"
              className="relative text-sm font-medium uppercase tracking-meta text-krama-text-primary/80 transition-colors hover:text-krama-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            data-cursor="interactive"
            aria-label="Search"
            onClick={openSearch}
            className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
          <Link
            href="/account?tab=wishlist"
            data-cursor="interactive"
            aria-label="Wishlist"
            className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
          >
            <Heart size={19} strokeWidth={1.5} />
          </Link>
          <button
            data-cursor="interactive"
            aria-label="Cart"
            onClick={openCart}
            className="relative text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-pill bg-krama-accent text-[10px] font-semibold text-black">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            data-cursor="interactive"
            aria-label="Profile"
            className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
          >
            <User size={19} strokeWidth={1.5} />
          </Link>
          <button
            data-cursor="interactive"
            aria-label={mobileMenuOpen ? "Close menu" : "Menu"}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="text-krama-text-primary/80 lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="glass-nav fixed inset-x-0 top-20 z-40 flex flex-col gap-1 px-6 py-6 lg:hidden"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="interactive"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 py-4 text-sm font-medium uppercase tracking-meta text-krama-text-primary/85 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-6 pt-2 sm:hidden">
              <button
                data-cursor="interactive"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearch();
                }}
                className="flex items-center gap-2 text-xs uppercase tracking-label text-krama-text-primary/70"
              >
                <Search size={15} strokeWidth={1.5} /> Search
              </button>
              <Link
                href="/account?tab=wishlist"
                data-cursor="interactive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-label text-krama-text-primary/70"
              >
                <Heart size={15} strokeWidth={1.5} /> Wishlist
              </Link>
              <Link
                href="/account"
                data-cursor="interactive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-label text-krama-text-primary/70"
              >
                <User size={15} strokeWidth={1.5} /> Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
