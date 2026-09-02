"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Rotate3d, MousePointer2 } from "lucide-react";
import { useReducedMotion, useCoarsePointer } from "@/lib/useReducedMotion";
import { useCartStore } from "@/lib/store/cart";
import { STRATO_PRODUCT } from "@/lib/products";
import { useStratoMotion } from "./useStratoMotion";
import { TurntableRing } from "./TurntableRing";
import { StratoNav } from "./StratoNav";

const VIDEO_URL =
  "https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/strato.mp4";

export function StratoHero() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  function claimYours() {
    addItem({ product: STRATO_PRODUCT, size: 9, color: STRATO_PRODUCT.colorway });
    router.push("/checkout");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useStratoMotion(
    { containerRef, wrapperRef, glowRef, shadowRef, ringRef },
    { reducedMotion, coarsePointer }
  );

  return (
    <div ref={containerRef} className="strato-root relative flex min-h-screen flex-col overflow-hidden">
      {/* video plane — the cursor-driven 3D spin wrapper */}
      <div ref={wrapperRef} className="fixed inset-0 z-0" style={{ willChange: "transform" }}>
        <video
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover"
          src={VIDEO_URL}
        />
      </div>

      {/* cursor-reactive studio glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="studio-glow pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 55%, rgba(159,184,255,0.28), transparent 70%)",
        }}
      />

      {/* static studio scrim */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
        <div className="strato-scrim-blur absolute inset-0" />
        <div className="strato-floor-glow absolute inset-0" />
        <div className="strato-top-haze absolute inset-0" />
      </div>

      {/* grain */}
      <div aria-hidden className="strato-grain pointer-events-none fixed inset-0 z-[2]" />

      {/* turntable ring + contact shadow */}
      <TurntableRing ref={ringRef} />
      <div
        ref={shadowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] z-[3] h-8 w-[38vmin] -translate-x-1/2 rounded-full bg-black/50 blur-2xl"
      />

      <StratoNav onClaim={claimYours} />

      <div className="relative z-10 flex max-w-4xl flex-1 flex-col justify-end px-4 pb-12 sm:px-6 md:px-12 md:pb-20">
        <div
          className="animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#9fb8ff] sm:gap-6 sm:text-xs"
          style={{ animationDelay: "300ms" }}
        >
          <span className="free-chip">Free</span>
          <span>Strato 001</span>
          <span aria-hidden>·</span>
          <span>US 4 — 14</span>
          <span aria-hidden>·</span>
          <span>Limited Run</span>
        </div>

        <h1
          className="animate-blur-fade-up mb-5 text-5xl font-extrabold leading-[0.9] tracking-[-0.04em] sm:text-7xl md:text-8xl"
          style={{ animationDelay: "400ms" }}
        >
          <span className="block">Reach the</span>
          <span className="accent-text block">strato.</span>
        </h1>

        <p
          className="animate-blur-fade-up mb-8 max-w-xl text-base font-light text-white/65 sm:text-lg md:mb-10 md:text-xl"
          style={{ animationDelay: "520ms" }}
        >
          The first STRATO drop from KRAMA — a lighter-than-air silhouette, ice on the rim
          light. Free while it lasts.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={claimYours}
            data-cursor="interactive"
            className="animate-blur-fade-up flex items-center gap-2 rounded-full bg-[#9fb8ff] px-7 py-3 font-semibold text-black transition-colors hover:bg-[#b6c9ff] motion-safe:animate-[freePop_2.4s_ease-in-out_infinite]"
            style={{ animationDelay: "640ms" }}
          >
            Claim yours — free
            <ArrowRight size={18} />
          </button>
          <button
            className="liquid-glass animate-blur-fade-up flex items-center gap-2 rounded-full px-7 py-3 font-mono text-xs uppercase text-white"
            style={{ animationDelay: "740ms" }}
          >
            <Rotate3d size={18} />
            Spin the shoe
          </button>
        </div>

        <div
          className="animate-blur-fade-up mt-7 hidden gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9fb8ff] sm:flex"
          style={{ animationDelay: "840ms" }}
        >
          <span>Weight 218 g</span>
          <span aria-hidden>/</span>
          <span>Drop 8 mm</span>
          <span aria-hidden>/</span>
          <span>Stock 500 Pairs</span>
        </div>

        {!coarsePointer && (
          <div
            className="animate-blur-fade-up mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40"
            style={{ animationDelay: "940ms" }}
          >
            <MousePointer2 size={13} />
            Move to spin
          </div>
        )}
      </div>
    </div>
  );
}
