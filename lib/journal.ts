export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  gradient: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "design-of-gati",
    title: "Inside the Design of Gati",
    excerpt:
      "How a decade of watching the Andheri flyover traffic became KRAMA's first sole geometry.",
    category: "Design",
    date: "2026-08-02",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)",
    body: [
      "Every KRAMA silhouette starts with a place, not a spec sheet. Gati started with a stopwatch — ten minutes, the average gap between locals at Andheri station during peak hour, and the distance a commuter has to cover to make the next one.",
      "The design team spent three months shadowing that sprint before a single sketch was drawn. What came back wasn't a mood board of other sneakers — it was a set of angles: the lean of a body cutting across a platform, the flex point in a knee mid-stride, the exact moment a foot rolls off the toe before the next step.",
      "The midsole geometry in Gati traces directly back to that research: a forward-canted heel-to-toe drop that rewards the sprint, not the standstill. It's a shoe designed to be looked at while stationary and felt while moving.",
    ],
  },
  {
    slug: "kirana-store-to-runway",
    title: "From Kirana Store to Runway",
    excerpt:
      "The neighborhood candy jar is an unlikely fashion reference. KRAMA's founders explain why it isn't.",
    category: "Culture",
    date: "2026-07-18",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
    body: [
      "Before KRAMA was a sneaker label, it was a memory: glass jars of candy on a kirana store counter, backlit by a single tube light, catching every kid's eye at exactly foot height.",
      "That backlit-glass quality — warm, a little imperfect, unmistakably local — became the starting point for the brand's entire color language. It's why KRAMA's palette leans toward saturated gradients instead of flat panels: nothing in the memory was ever one solid color.",
      "Luxury fashion often reaches outward for its references. KRAMA decided early to reach back instead — to the counter height of a childhood, not the runway.",
    ],
  },
  {
    slug: "materials-monsoon-proofing",
    title: "Engineering for the Monsoon",
    excerpt: "What it actually takes to build a sneaker that survives an Indian monsoon commute.",
    category: "Tech",
    date: "2026-06-30",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
    body: [
      "Most performance sneakers are tested in climate-controlled labs against standards written for temperate cities. None of them account for a Mumbai monsoon — ankle-deep water, sudden humidity swings, and a commute that doesn't pause for weather.",
      "KRAMA's outsole compound was reformulated four times before it passed an internal 'gully test': a full week of real commutes in active monsoon conditions, tracked by the same handful of testers who'd flag anything from midsole waterlogging to lace-eyelet rust.",
      "The result is a full-contact rubber outsole with a compound that stays grippy wet or dry, and a mesh upper treated to resist saturation without losing breathability once the rain clears.",
    ],
  },
  {
    slug: "drop-culture-india",
    title: "What 'Drop Culture' Means in India",
    excerpt: "Sneaker drops didn't arrive in India the way they did in the West. Here's how they landed instead.",
    category: "Culture",
    date: "2026-06-05",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
    body: [
      "The Western sneaker drop model — hype cycles, resale flipping, camping outside stores — took a different shape when it landed in Indian cities. Community mattered more than scarcity; a drop was an excuse for a gathering as much as a purchase.",
      "KRAMA leaned into that from Drop 001. Instead of a single flash release, each drop unfolds over a week: a campaign film, a community meetup, then the release — treating the sneaker itself as the closing chapter of a story, not the whole story.",
    ],
  },
];
