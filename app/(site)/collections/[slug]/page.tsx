import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { COLLECTIONS } from "@/lib/collections";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    title: `${collection.name} — KRAMA Collections`,
    description: collection.tagline,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const products = PRODUCTS.filter((p) => p.name === collection.productName);

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-krama-bg pt-20">
        <div
          className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden px-6 py-14 md:px-10"
          style={{ background: collection.gradient }}
        >
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-krama-bg via-transparent to-transparent" />
          <div className="pointer-events-none absolute right-6 top-1/2 hidden w-[38%] -translate-y-1/2 opacity-80 md:block">
            <SneakerSilhouette className="w-full" />
          </div>
          <span className="relative z-10 text-xs uppercase tracking-label text-white/70">
            {collection.chapter}
          </span>
          <h1 className="relative z-10 font-display text-5xl font-bold uppercase text-white md:text-7xl">
            {collection.name}
          </h1>
          <p className="relative z-10 mt-3 max-w-md text-sm text-white/85 md:text-base">
            {collection.tagline}
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-label text-krama-text-primary/40">
            {products.length} {products.length === 1 ? "silhouette" : "silhouettes"} in this chapter
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
