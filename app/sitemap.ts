import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { COLLECTIONS } from "@/lib/collections";
import { ARTICLES } from "@/lib/journal";

const BASE_URL = "https://www.krama.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/lookbook",
    "/journal",
    "/community",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = COLLECTIONS.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = ARTICLES.map((a) => ({
    url: `${BASE_URL}/journal/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...articleRoutes];
}
