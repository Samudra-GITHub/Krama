import { PRODUCTS, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

function pickRelated(current: Product): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === current.category && p.name !== current.name
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== current.category && p.name !== current.name
  );
  const seen = new Set<string>();
  const result: Product[] = [];
  for (const p of [...sameCategory, ...others]) {
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    result.push(p);
    if (result.length === 4) break;
  }
  return result;
}

export function RelatedProducts({ productId }: { productId: string }) {
  const current = PRODUCTS.find((p) => p.id === productId);
  if (!current) return null;

  const related = pickRelated(current);
  if (related.length === 0) return null;

  return (
    <div className="mx-auto max-w-screen-xl px-6 pb-20 md:px-10">
      <h3 className="mb-6 font-display text-2xl font-bold uppercase text-krama-text-primary">
        You Might Also Like
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
