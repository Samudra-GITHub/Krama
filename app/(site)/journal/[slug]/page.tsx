import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES } from "@/lib/journal";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} — KRAMA Journal`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "KRAMA" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content" className="min-h-screen bg-krama-bg pt-20">
        <div
          className="relative flex min-h-[50vh] flex-col justify-end px-6 py-14 md:px-10"
          style={{ background: article.gradient }}
        >
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-krama-bg via-transparent to-transparent" />
          <span className="relative z-10 text-xs uppercase tracking-label text-white/70">
            {article.category} · {formatDate(article.date)}
          </span>
          <h1 className="relative z-10 mt-3 max-w-3xl font-display text-4xl font-bold uppercase text-white md:text-6xl">
            {article.title}
          </h1>
          <span className="relative z-10 mt-2 text-xs uppercase tracking-label text-white/60">
            {article.readTime}
          </span>
        </div>

        <article className="mx-auto flex max-w-screen-md flex-col gap-6 px-6 py-16 md:px-10">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-krama-text-primary/75">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="border-t border-white/10 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="mb-6 font-display text-xl font-bold uppercase text-krama-text-primary">
              More from the Journal
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  href={`/journal/${a.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div
                    className="aspect-[4/3] overflow-hidden rounded-glass transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ background: a.gradient }}
                  >
                    <div className="noise-overlay" />
                  </div>
                  <h3 className="font-display text-sm font-bold uppercase text-krama-text-primary transition-colors group-hover:text-krama-accent">
                    {a.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
