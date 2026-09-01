import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/layout/Hero";
import { FeaturedDrop } from "@/components/layout/FeaturedDrop";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedDrop />
      </main>
      <Footer />
    </>
  );
}
