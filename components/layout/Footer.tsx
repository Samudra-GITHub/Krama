import Link from "next/link";

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
          <FooterColumn title="Shop" links={["New Arrivals", "Sneakers", "Apparel", "Accessories"]} />
          <FooterColumn title="Brand" links={["Lookbook", "Journal", "Community", "Careers"]} />
          <FooterColumn title="Support" links={["Size Guide", "Returns", "Contact", "Store Locator"]} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-label text-krama-text-primary/50">
            Get drop alerts
          </span>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="h-11 w-56 rounded-pill border border-krama-border-glass bg-transparent px-4 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent-alt"
            />
            <button
              type="submit"
              className="h-11 rounded-pill bg-krama-accent px-5 text-xs font-semibold uppercase tracking-label text-[#04150a]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-2 text-xs text-krama-text-primary/35 sm:flex-row sm:justify-between">
        <span>© 2026 KRAMA. All rights reserved.</span>
        <span>Made in India.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-label text-krama-text-primary/40">{title}</span>
      {links.map((link) => (
        <Link
          key={link}
          href="#"
          data-cursor="interactive"
          className="text-sm text-krama-text-primary/70 transition-colors hover:text-krama-text-primary"
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
