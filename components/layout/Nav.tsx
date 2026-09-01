"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "Community", href: "/community" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
        >
          <Search size={19} strokeWidth={1.5} />
        </button>
        <button
          data-cursor="interactive"
          aria-label="Wishlist"
          className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
        >
          <Heart size={19} strokeWidth={1.5} />
        </button>
        <button
          data-cursor="interactive"
          aria-label="Cart"
          className="relative text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt"
        >
          <ShoppingBag size={19} strokeWidth={1.5} />
          <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-pill bg-krama-accent text-[10px] font-semibold text-[#04150a]">
            2
          </span>
        </button>
        <button
          data-cursor="interactive"
          aria-label="Profile"
          className="hidden text-krama-text-primary/80 transition-colors hover:text-krama-accent-alt sm:block"
        >
          <User size={19} strokeWidth={1.5} />
        </button>
        <button
          data-cursor="interactive"
          aria-label="Menu"
          className="text-krama-text-primary/80 lg:hidden"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
