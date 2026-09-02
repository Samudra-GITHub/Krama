"use client";

import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import { clsx } from "clsx";

const LINKS = ["The Shoe", "Sizing", "The Drop", "Lookbook"];

export function StratoNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
      <div className="animate-blur-fade-up flex flex-col" style={{ animationDelay: "0ms" }}>
        <span className="text-lg font-extrabold tracking-tight text-white md:text-xl">KRAMA</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9fb8ff]">
          Strato Drop 001
        </span>
      </div>

      <div className="hidden items-center gap-8 lg:flex">
        {LINKS.map((link, i) => (
          <a
            key={link}
            href="#"
            className="animate-blur-fade-up text-sm text-white/70 transition-colors hover:text-white"
            style={{ animationDelay: `${100 + i * 50}ms` }}
          >
            {link}
          </a>
        ))}
      </div>

      <button
        className="animate-blur-fade-up accent-glass hidden items-center gap-2 rounded-full px-5 py-2 font-mono text-xs uppercase text-white lg:flex"
        style={{ animationDelay: "300ms" }}
      >
        <Zap size={16} />
        Claim yours
      </button>

      <button
        aria-label={menuOpen ? "Close menu" : "Menu"}
        onClick={() => setMenuOpen((v) => !v)}
        className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-white transition-transform duration-500 lg:hidden"
      >
        {menuOpen ? (
          <X size={18} className="rotate-180 scale-100 transition-transform duration-500" />
        ) : (
          <Menu size={18} />
        )}
      </button>

      <div
        className={clsx(
          "absolute inset-x-0 top-full border-y border-white/10 bg-[#05070f]/95 backdrop-blur-lg transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "border-b border-white/5 py-3 text-sm text-white/80 last:border-0",
                menuOpen && "animate-blur-fade-up"
              )}
              style={{ animationDelay: menuOpen ? `${i * 60}ms` : undefined }}
            >
              {link}
            </a>
          ))}
          <button className="accent-glass mt-3 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase text-white">
            <Zap size={16} />
            Claim yours
          </button>
        </div>
      </div>
    </nav>
  );
}
