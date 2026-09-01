import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductView } from "@/components/product/ProductView";
import { DetailSections } from "@/components/product/DetailSections";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20 pb-24 lg:pb-0">
        <ProductView product={product} />
        <DetailSections />
      </main>
      <Footer />
    </>
  );
}
