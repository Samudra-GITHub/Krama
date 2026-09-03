import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES } from "@/lib/journal";

export const metadata = {
  title: "Journal — KRAMA",
  description: "Design, culture, and sneaker tech from the KRAMA studio.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JournalPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-krama-bg pt-20">
        <div className="border-b border-white/10 px-6 py-14 md:px-10 lg:py-20">
          <span className="text-xs uppercase tracking-label text-krama-accent-alt">
            Journal
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-krama-text-primary md:text-6xl">
            Design, Culture &amp; Tech
          </h1>
          <p className="mt-3 max-w-md text-sm text-krama-text-primary/60">
            Notes from the KRAMA studio on how the drops get made.
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
          <Link
            href={`/journal/${featured.slug}`}
            className="group mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"
          >
            <div
              className="aspect-[16/10] overflow-hidden rounded-glass transition-transform duration-500 group-hover:scale-[1.01]"
              style={{ background: featured.gradient }}
            >
              <div className="noise-overlay" />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <span className="text-xs uppercase tracking-label text-krama-accent-alt">
                {featured.category} · {formatDate(featured.date)}
              </span>
              <h2 className="font-display text-3xl font-bold uppercase text-krama-text-primary transition-colors group-hover:text-krama-accent md:text-4xl">
                {featured.title}
              </h2>
              <p className="max-w-md text-sm text-krama-text-primary/60">
                {featured.excerpt}
              </p>
              <span className="text-xs uppercase tracking-label text-krama-text-primary/40">
                {featured.readTime}
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex flex-col gap-3"
              >
                <div
                  className="aspect-[4/3] overflow-hidden rounded-glass transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ background: article.gradient }}
                >
                  <div className="noise-overlay" />
                </div>
                <span className="text-xs uppercase tracking-label text-krama-accent-alt">
                  {article.category} · {formatDate(article.date)}
                </span>
                <h3 className="font-display text-lg font-bold uppercase text-krama-text-primary transition-colors group-hover:text-krama-accent">
                  {article.title}
                </h3>
                <p className="text-sm text-krama-text-primary/55">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
