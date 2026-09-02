"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { COLLECTIONS } from "@/lib/collections";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const NARRATIVES: Record<string, string> = {
  gati: "Shot at 6am on the Andheri flyover, before the traffic swallows the light. Gati was built for that ten-minute window — the sprint between the platform and the last local.",
  tezz: "A low-top for a low profile. Tezz was designed courtside, for the gully football matches that start the moment school lets out and end when the streetlights come on.",
  udaan: "Udaan means flight. The mid-top silhouette was built for the leap between rooftops — the shortcut every kid in the gully knows and no map shows.",
  chalo: "Chalo High closes the chapter the way it started: on the street. A high-top built for entrances, shot against the kirana shutters at golden hour.",
};

const GALLERY_SCENES = [
  "Platform Edge",
  "Gully Court",
  "Rooftop Jump",
  "Kirana Shutters",
  "Metro Haze",
  "Monsoon Sprint",
  "Flyover Light",
  "Night Market",
  "First Pair",
  "Sole Detail",
  "Studio Rim Light",
  "Street Cast",
];

export default function LookbookPage() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>(".lookbook-chapter").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );
      });
      gsap.fromTo(
        ".gallery-tile",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 85%" },
        }
      );
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  const filteredScenes =
    activeFilter === "all"
      ? GALLERY_SCENES
      : GALLERY_SCENES.filter((_, i) => i % COLLECTIONS.length === COLLECTIONS.findIndex((c) => c.slug === activeFilter));

  return (
    <div ref={rootRef}>
      <Nav />
      <main className="min-h-screen bg-krama-bg pt-20">
        {/* editorial hero */}
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="absolute inset-0" style={{ background: "var(--krama-gradient-hero)" }} />
          <div className="noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-krama-bg" />
          <span className="relative z-10 text-xs uppercase tracking-label text-white/70">
            The Film
          </span>
          <h1 className="relative z-10 mt-3 font-display text-5xl font-bold uppercase text-white md:text-7xl">
            Lookbook
          </h1>
          <p className="relative z-10 mt-4 max-w-lg text-sm text-white/85 md:text-base">
            Precision of the city. Chaos of the gully. One frame at a time — every KRAMA
            drop told through the streets it was built for.
          </p>
        </div>

        {/* story chapters */}
        <div className="mx-auto flex max-w-screen-xl flex-col gap-24 px-6 py-20 md:px-10">
          {COLLECTIONS.map((collection, i) => (
            <div
              key={collection.slug}
              className={clsx(
                "lookbook-chapter flex flex-col items-center gap-10 lg:flex-row lg:gap-16",
                i % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              <div
                className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-glass lg:w-1/2"
                style={{ background: collection.gradient }}
              >
                <div className="noise-overlay" />
                <SneakerSilhouette className="w-[70%] opacity-90" />
              </div>
              <div className="flex w-full flex-col gap-3 lg:w-1/2">
                <span className="text-xs uppercase tracking-label text-krama-accent-alt">
                  {collection.chapter}
                </span>
                <h2 className="font-display text-3xl font-bold uppercase text-krama-text-primary md:text-4xl">
                  {collection.name}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-krama-text-primary/65">
                  {NARRATIVES[collection.slug]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* gallery */}
        <div className="border-t border-white/10 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="mb-6 font-display text-2xl font-bold uppercase text-krama-text-primary">
              Gallery
            </h2>
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                data-cursor="interactive"
                onClick={() => setActiveFilter("all")}
                className={clsx(
                  "rounded-pill border px-4 py-1.5 text-xs uppercase tracking-label transition-colors duration-200",
                  activeFilter === "all"
                    ? "border-krama-accent bg-krama-accent text-black"
                    : "border-krama-border-glass text-krama-text-primary/70 hover:border-krama-accent-alt"
                )}
              >
                All
              </button>
              {COLLECTIONS.map((c) => (
                <button
                  key={c.slug}
                  data-cursor="interactive"
                  onClick={() => setActiveFilter(c.slug)}
                  className={clsx(
                    "rounded-pill border px-4 py-1.5 text-xs uppercase tracking-label transition-colors duration-200",
                    activeFilter === c.slug
                      ? "border-krama-accent bg-krama-accent text-black"
                      : "border-krama-border-glass text-krama-text-primary/70 hover:border-krama-accent-alt"
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="gallery-grid columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
              {filteredScenes.map((scene, i) => {
                const collection = COLLECTIONS[i % COLLECTIONS.length];
                return (
                  <div
                    key={`${scene}-${i}`}
                    data-cursor="interactive"
                    className="gallery-tile group relative overflow-hidden rounded-glass"
                    style={{
                      aspectRatio: i % 3 === 0 ? "3/4" : "1/1",
                      background: collection.gradient,
                    }}
                  >
                    <div className="noise-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-transform duration-500 group-hover:scale-110">
                      <SneakerSilhouette className="w-[75%]" />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-xs uppercase tracking-label text-white">
                        {scene}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
