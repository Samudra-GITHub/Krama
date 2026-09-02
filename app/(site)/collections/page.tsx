import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { COLLECTIONS } from "@/lib/collections";

export const metadata = {
  title: "Collections — KRAMA",
  description: "Every KRAMA drop is a chapter. Explore the collections.",
};

export default function CollectionsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20">
        <div className="border-b border-white/10 px-6 py-14 md:px-10 lg:py-20">
          <span className="text-xs uppercase tracking-label text-krama-accent-alt">
            Collections
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-krama-text-primary md:text-6xl">
            Every Drop is a Chapter
          </h1>
          <p className="mt-3 max-w-md text-sm text-krama-text-primary/60">
            Precision of the city. Chaos of the gully. Told one collection at a time.
          </p>
        </div>

        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-2 md:px-10">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-glass p-7"
              style={{ background: collection.gradient }}
            >
              <div className="noise-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute right-4 top-1/2 w-[55%] -translate-y-1/2 opacity-90 transition-transform duration-500 group-hover:scale-105">
                <SneakerSilhouette className="w-full" />
              </div>
              <span className="relative z-10 text-xs uppercase tracking-label text-white/70">
                {collection.chapter}
              </span>
              <h2 className="relative z-10 font-display text-3xl font-bold uppercase text-white">
                {collection.name}
              </h2>
              <p className="relative z-10 mt-1 max-w-xs text-sm text-white/80">
                {collection.tagline}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
