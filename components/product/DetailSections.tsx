"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const SECTIONS = [
  {
    title: "Design Story",
    body: "Gati was built from the geometry of the metro — sharp lines for the platform edge, a soft midsole for the sprint between compartments. Every panel traces back to a sketch made on a train.",
  },
  {
    title: "Materials",
    body: "Engineered mesh upper for breathability, a recycled-EVA midsole tuned for rebound, and a full-contact rubber outsole gripped for wet monsoon streets and dry gully courts alike.",
  },
  {
    title: "Care",
    body: "Wipe the upper with a damp microfiber cloth. Air dry away from direct heat. Avoid machine washing — it breaks down the midsole foam over time.",
  },
];

const REVIEWS = [
  { name: "Aarav K.", rating: 5, text: "Fits true to size, unbelievably light for a runner. Wore it on day one for a 6km loop." },
  { name: "Priya S.", rating: 4, text: "Colorway is even better in person. Half size up if you're between sizes." },
];

export function DetailSections() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>(".detail-block").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  return (
    <div ref={rootRef} className="mx-auto max-w-screen-md px-6 py-20 md:px-10">
      <div className="flex flex-col gap-16">
        {SECTIONS.map((section) => (
          <div key={section.title} className="detail-block">
            <h3 className="mb-3 font-display text-2xl font-bold uppercase text-krama-text-primary">
              {section.title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-krama-text-primary/65">
              {section.body}
            </p>
          </div>
        ))}

        <div className="detail-block">
          <h3 className="mb-5 font-display text-2xl font-bold uppercase text-krama-text-primary">
            Reviews
          </h3>
          <div className="flex flex-col gap-5">
            {REVIEWS.map((review) => (
              <div key={review.name} className="glass-card px-5 py-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-krama-text-primary">
                    {review.name}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < review.rating ? "#22c55e" : "none"}
                        stroke={i < review.rating ? "#22c55e" : "#6b7280"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-krama-text-primary/60">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
