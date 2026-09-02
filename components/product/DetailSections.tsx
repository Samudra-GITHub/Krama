"use client";

import { useRef, useState } from "react";
import { Star } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useReviewsStore } from "@/lib/store/reviews";
import { useToastStore } from "@/lib/store/toast";
import { Button } from "@/components/ui/Button";

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

export function DetailSections({ productId }: { productId: string }) {
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

        <ReviewsSection productId={productId} />
      </div>
    </div>
  );
}

function ReviewsSection({ productId }: { productId: string }) {
  const allReviews = useReviewsStore((s) => s.reviews);
  const addReview = useReviewsStore((s) => s.addReview);
  const pushToast = useToastStore((s) => s.push);
  const reviews = allReviews.filter((r) => r.productId === productId);

  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      setError("Add your name, a rating, and a few words.");
      return;
    }
    addReview({ productId, name: name.trim(), rating, text: text.trim() });
    pushToast("Review posted", "success");
    setName("");
    setRating(0);
    setText("");
    setError("");
    setFormOpen(false);
  }

  return (
    <div className="detail-block">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-2xl font-bold uppercase text-krama-text-primary">
          Reviews
        </h3>
        <button
          data-cursor="interactive"
          onClick={() => setFormOpen((v) => !v)}
          className="text-xs uppercase tracking-label text-krama-accent transition-colors hover:text-krama-accent-alt"
        >
          {formOpen ? "Cancel" : "Write a review"}
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="glass-card mb-5 flex flex-col gap-3 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-label text-krama-text-primary/50">
              Your rating
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-cursor="interactive"
                  onClick={() => setRating(i + 1)}
                  aria-label={`${i + 1} star`}
                >
                  <Star
                    size={18}
                    fill={i < rating ? "#9fb8ff" : "none"}
                    stroke={i < rating ? "#9fb8ff" : "#6b7280"}
                  />
                </button>
              ))}
            </div>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-11 rounded-lg border border-krama-border-glass bg-transparent px-4 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent focus:outline-none"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How's the fit, feel, and finish?"
            rows={3}
            className="rounded-lg border border-krama-border-glass bg-transparent px-4 py-3 text-sm text-krama-text-primary placeholder:text-krama-text-primary/40 focus:border-krama-accent focus:outline-none"
          />
          {error && <p className="text-xs text-krama-danger">{error}</p>}
          <Button type="submit" variant="primary" className="w-fit px-6">
            Post Review
          </Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-krama-text-primary/50">
          No reviews yet — be the first to share your fit.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {reviews.map((review) => (
            <div key={review.id} className="glass-card px-5 py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-krama-text-primary">
                  {review.name}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < review.rating ? "#9fb8ff" : "none"}
                      stroke={i < review.rating ? "#9fb8ff" : "#6b7280"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-krama-text-primary/60">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
