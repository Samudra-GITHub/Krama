import { Nav } from "@/components/layout/Nav";
import { CampaignHero } from "@/components/layout/CampaignHero";
import { FeaturedDrop } from "@/components/layout/FeaturedDrop";
import { TrustBadges } from "@/components/layout/TrustBadges";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CampaignHero />
        <FeaturedDrop />
        <TrustBadges />
      </main>
      <Footer />
    </>
  );
}
