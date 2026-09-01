"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Play } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion, useCoarsePointer } from "@/lib/useReducedMotion";
import { SneakerViewer } from "@/components/3d/SneakerViewer";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/Button";

const METADATA = [
  { label: "Drop", value: "001" },
  { label: "Colorway", value: "Gully Haze" },
  { label: "Release", value: "12.09.2026" },
];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const rootRef = useRef<HTMLElement>(null);

  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const springSpotX = useSpring(spotX, { damping: 26, stiffness: 120, mass: 0.6 });
  const springSpotY = useSpring(spotY, { damping: 26, stiffness: 120, mass: 0.6 });

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || coarsePointer) return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(
          ["#site-nav", ".hero-3d", ".hero-headline-word", ".hero-sub", ".hero-meta", ".hero-cta", ".hero-hud"],
          { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0
      )
        .fromTo(
          "#site-nav",
          { y: -20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
          0.1
        )
        .fromTo(
          ".hero-3d",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 },
          0.2
        )
        .fromTo(
          ".hero-headline-word",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          0.25
        )
        .fromTo(".hero-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.35)
        .fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.3)
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 },
          0.3
        )
        .fromTo(".hero-hud", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.45);
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen w-full flex-col overflow-hidden pt-20"
    >
      <div
        className="hero-bg absolute inset-0"
        style={{ background: "var(--krama-gradient-hero)" }}
      />
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-krama-bg via-transparent to-krama-bg/40" />

      {!reducedMotion && !coarsePointer && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-[560px] w-[560px] rounded-full opacity-40 mix-blend-soft-light"
          style={{
            left: springSpotX,
            top: springSpotY,
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.35) 45%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col items-center gap-10 px-6 pb-16 pt-8 md:px-10 lg:flex-row lg:items-center lg:gap-6 lg:pb-0">
        {/* left column */}
        <div className="flex w-full max-w-xl flex-col gap-6 lg:w-[42%]">
          <h1 className="font-display text-[13vw] font-bold uppercase leading-[1.02] tracking-tight text-krama-text-primary sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
            <span className="hero-headline-word block">KRAMA</span>
            <span className="hero-headline-word block text-krama-accent">DROP 001</span>
            <span className="hero-headline-word block">GATI</span>
          </h1>

          <p className="hero-sub max-w-sm font-body text-lg text-krama-text-primary/75">
            Built for the city. Tuned for the gully.
          </p>

          <dl className="hero-meta flex flex-wrap gap-x-8 gap-y-3">
            {METADATA.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-[11px] uppercase tracking-label text-krama-text-primary/50">
                  {item.label}
                </dt>
                <dd className="font-mono text-sm tabular-nums text-krama-text-primary/90">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-2 flex flex-wrap items-center gap-6">
            <MagneticButton className="hero-cta">
              <Button variant="primary">View Drop</Button>
            </MagneticButton>
            <MagneticButton className="hero-cta">
              <button
                data-cursor="interactive"
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-label text-krama-text-primary/85 transition-colors hover:text-krama-accent-alt"
              >
                <span className="grid h-9 w-9 place-items-center rounded-pill border border-krama-border-glass">
                  <Play size={14} fill="currentColor" strokeWidth={0} />
                </span>
                Watch campaign
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* 3D viewport */}
        <div className="hero-3d relative h-[340px] w-full sm:h-[440px] lg:h-[620px] lg:w-[58%]">
          <SneakerViewer />

          <div className="hero-hud glass-hero-tile absolute right-2 top-2 flex flex-col gap-1 px-5 py-4 sm:bottom-8 sm:right-6 sm:top-auto">
            <span className="text-[10px] uppercase tracking-label text-krama-text-primary/55">
              Availability
            </span>
            <span className="font-mono text-sm text-krama-text-primary">
              Sizes 7–11 · 3 colors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
