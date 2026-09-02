"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useToastStore } from "@/lib/store/toast";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-krama-bg px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-display text-lg font-bold uppercase tracking-widest text-krama-text-primary">
            KRAMA
          </span>
          <p className="max-w-xs text-sm text-krama-text-primary/50">
            Precision of the city. Chaos of the gully. One frame.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn
            title="Shop"
            links={[
              { label: "New Arrivals", href: "/shop" },
              { label: "Sneakers", href: "/shop" },
              { label: "Collections", href: "/collections" },
              { label: "Wishlist", href: "/account?tab=wishlist" },
            ]}
          />
          <FooterColumn
            title="Brand"
            links={[
              { label: "Lookbook", href: "/lookbook" },
              { label: "Journal", href: "/journal" },
              { label: "Community", href: "/community" },
              { label: "Careers", href: "#" },
            ]}
          />
          <FooterColumn
            title="Support"
            links={[
              { label: "Size Guide", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Store Locator", href: "#" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-label text-krama-text-primary/50">
            Get drop alerts
          </span>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-2 text-xs text-krama-text-primary/35 sm:flex-row sm:justify-between">
        <span>© 2026 KRAMA. All rights reserved.</span>
        <span>Made in India.</span>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pushToast = useToastStore((s) => s.push);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
    pushToast("You're on the list for drop alerts", "success");
    setEmail("");
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          placeholder="your@email.com"
          disabled={submitted}
          className="h-11 w-56 rounded-pill border border-krama-border-glass bg-transparent px-4 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          className="flex h-11 w-16 shrink-0 items-center justify-center rounded-pill bg-krama-accent text-xs font-semibold uppercase tracking-label text-black transition-transform active:scale-95"
        >
          {submitted ? <Check size={15} /> : "Join"}
        </button>
      </div>
      {error && <span className="text-xs text-krama-danger">Enter a valid email address.</span>}
    </form>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-label text-krama-text-primary/40">{title}</span>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-sm text-krama-text-primary/70 transition-colors hover:text-krama-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
