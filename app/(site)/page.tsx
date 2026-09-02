import { Nav } from "@/components/layout/Nav";
import { CampaignHero } from "@/components/layout/CampaignHero";
import { FeaturedDrop } from "@/components/layout/FeaturedDrop";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <CampaignHero />
        <FeaturedDrop />
      </main>
      <Footer />
    </>
  );
}
