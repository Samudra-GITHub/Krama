import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductView } from "@/components/product/ProductView";
import { DetailSections } from "@/components/product/DetailSections";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const title = `${product.name} — ${product.colorway} | KRAMA`;
  const description = `${product.name} in ${product.colorway}. ₹${product.price.toLocaleString(
    "en-IN"
  )}. Engineered mesh upper, recycled-EVA midsole, full-contact rubber outsole.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.colorway}`,
    brand: { "@type": "Brand", name: "KRAMA" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.sizes.length > (product.soldOutSizes?.length ?? 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20 pb-24 lg:pb-0">
        <ProductView product={product} />
        <DetailSections />
      </main>
      <Footer />
    </>
  );
}
