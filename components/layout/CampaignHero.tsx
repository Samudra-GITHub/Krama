"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Volume2, VolumeX, Zap } from "lucide-react";
import { useCursorTilt } from "@/lib/useCursorTilt";
import { useCoarsePointer, useReducedMotion } from "@/lib/useReducedMotion";

const VIDEO_URL =
  "https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/sub2.mp4";

const STATS = [
  { value: "Krama 002", label: "Sequence No.", delay: 800 },
  { value: "Gully Haze", label: "Colorway", delay: 860 },
  { value: "12.09.26", label: "Release", delay: 920 },
];

export function CampaignHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();

  useCursorTilt(
    { containerRef: sectionRef, wrapperRef: videoWrapperRef, glowRef },
    { reducedMotion, coarsePointer }
  );

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-krama-bg pt-20"
      style={{ perspective: 1200 }}
    >
      {/* background video */}
      <div
        ref={videoWrapperRef}
        className="fixed inset-0 z-0 overflow-hidden will-change-transform"
      >
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          className="motion-safe:animate-slow-push h-full w-full object-cover"
          src={VIDEO_URL}
        />
      </div>

      {/* bottom blur overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
        }}
      />

      {/* heat scrim — KRAMA periwinkle */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen will-change-transform"
        style={{
          background: "linear-gradient(to top, rgba(159,184,255,0.28), transparent 40%)",
        }}
      />

      {/* drop-live badge */}
      <div
        className="animate-blur-fade-up glass-card absolute right-4 top-4 z-10 hidden items-center gap-1.5 rounded-pill px-3 py-1 sm:right-6 sm:flex md:right-10 md:top-6"
        style={{ animationDelay: "200ms" }}
      >
        <Zap size={12} className="text-krama-accent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-krama-text-primary/90">
          Drop Live
        </span>
      </div>

      {/* hero content */}
      <div className="relative z-10 flex flex-1 flex-col justify-end gap-8 px-6 pb-8 sm:px-6 md:flex-row md:items-end md:px-12 md:pb-16">
        <div className="flex-1">
          <div
            className="animate-blur-fade-up mb-6 flex items-center gap-4 text-xs"
            style={{ animationDelay: "250ms" }}
          >
            <span className="flex items-center gap-2">
              <span className="motion-safe:animate-pulse-dot h-2 w-2 rounded-pill bg-krama-accent" />
              <span className="font-mono uppercase tracking-[0.2em] text-krama-text-primary/80">
                Live Drop
              </span>
            </span>
            <span className="text-white/30">/</span>
            <span className="font-mono uppercase tracking-[0.2em] text-white/50">
              Mumbai · Sep 2026
            </span>
          </div>

          <h1
            className="animate-blur-fade-up mb-5 font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] text-krama-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "400ms" }}
          >
            <span className="block">Precision of the City.</span>
            <span className="block">Chaos of the Gully.</span>
          </h1>

          <p
            className="animate-blur-fade-up mb-8 max-w-xl text-base text-white/60 sm:text-lg"
            style={{ animationDelay: "520ms" }}
          >
            Krama — the sequence, the step, the order found inside the noise. Built off
            Mumbai&apos;s platforms and gullies, for a city that never walks the same line twice.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/product/gati-runner-gully-haze"
              className="animate-blur-fade-up flex items-center gap-2 rounded-pill bg-white px-7 py-3 font-semibold text-black transition-colors hover:bg-white/90"
              style={{ animationDelay: "620ms" }}
            >
              Shop Gati Runner
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={toggleSound}
              className="animate-blur-fade-up glass-card flex items-center gap-2 rounded-pill px-7 py-3 text-krama-text-primary"
              style={{ animationDelay: "720ms" }}
            >
              {muted ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {muted ? "Watch with Sound" : "Mute the Film"}
            </button>
            <Link
              href="/shop"
              className="animate-blur-fade-up glass-card flex items-center gap-2 rounded-pill px-7 py-3 text-krama-text-primary"
              style={{ animationDelay: "780ms" }}
            >
              <Heart size={18} />
              Back the Drop
            </Link>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 sm:snap-x sm:snap-mandatory md:w-auto md:flex-col md:overflow-visible">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="animate-blur-fade-up glass-card shrink-0 snap-center rounded-2xl px-5 py-4 text-right"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <p className="font-display text-2xl font-bold text-krama-text-primary">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
