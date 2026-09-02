"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Move3D } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Placeholder 3D-style sneaker viewport. Swap for a <spline-viewer> embed
 * once a real scene export is available — the drag/idle-rotation and
 * contact-shadow behavior below is written to mirror what the Spline
 * scene's orbit + hotspot events should drive.
 */
export function SneakerViewer() {
  const reducedMotion = useReducedMotion();
  const ringRef = useRef<SVGGElement>(null);
  const ringTween = useRef<gsap.core.Tween | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);

  const rotateY = useMotionValue(-14);
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.6 });

  useGSAP(() => {
    if (!ringRef.current) return;
    ringTween.current = gsap.to(ringRef.current, {
      rotate: 360,
      duration: reducedMotion ? 0 : 22,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    if (!reducedMotion) {
      gsap.to(".sneaker-float", {
        y: -10,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [reducedMotion]);

  function handlePointerDown(e: React.PointerEvent) {
    if (reducedMotion) return;
    dragging.current = true;
    startX.current = e.clientX;
    setHasInteracted(true);
    ringTween.current?.timeScale(3.2);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    startX.current = e.clientX;
    const next = rotateY.get() + delta * 0.4;
    rotateY.set(Math.max(-45, Math.min(45, next)));
  }

  function handlePointerUp() {
    dragging.current = false;
    ringTween.current?.timeScale(1);
  }

  return (
    <div
      className="relative flex h-full w-full items-center justify-center select-none touch-none"
      style={{ perspective: 1200 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* contact shadow */}
      <div
        className="absolute bottom-[14%] h-8 w-[62%] rounded-full bg-black/50 blur-2xl"
        aria-hidden
      />

      {/* turntable ring */}
      <svg
        viewBox="0 0 400 400"
        className="absolute h-[78%] w-[78%]"
        style={{ transform: "rotateX(70deg)" }}
        aria-hidden
      >
        <g ref={ringRef}>
          <circle
            cx="200"
            cy="200"
            r="168"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1.5"
            strokeDasharray="2 10"
          />
        </g>
        <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9fb8ff" />
            <stop offset="100%" stopColor="#c7d4f5" />
          </linearGradient>
        </defs>
      </svg>

      {/* sneaker stage */}
      <motion.div
        className="sneaker-float relative"
        style={{
          rotateY: springRotateY,
          rotateX: 4,
          transformStyle: "preserve-3d",
        }}
      >
        <SneakerSilhouette />
      </motion.div>

      {/* drag hint */}
      {!hasInteracted && (
        <div className="absolute bottom-[6%] flex items-center gap-2 text-xs uppercase tracking-label text-krama-text-primary/50">
          <Move3D size={14} />
          <span>Drag to rotate</span>
        </div>
      )}
    </div>
  );
}

export function SneakerSilhouette({
  accent,
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const gradientId = `soleGradient-${accent ? accent.replace("#", "") : "default"}`;

  return (
    <svg
      viewBox="0 0 420 240"
      className={className ?? "h-auto w-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:w-[420px]"}
    >
      <defs>
        <linearGradient id="upperGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="55%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent ?? "#9fb8ff"} />
          <stop offset="100%" stopColor={accent ?? "#c7d4f5"} />
        </linearGradient>
      </defs>

      {/* sole */}
      <path
        d="M45,185 C40,205 60,215 95,214 L360,208 C395,206 405,190 392,175 L40,178 Z"
        fill={`url(#${gradientId})`}
        opacity="0.9"
      />

      {/* upper body */}
      <path
        d="M60,70 C38,82 26,120 38,150 C110,193 255,200 375,182 C398,172 398,152 383,142
           C368,118 352,92 328,74 C298,50 258,45 228,42 C210,55 194,60 174,58
           C138,55 88,55 60,70 Z"
        fill="url(#upperGradient)"
      />

      {/* laces */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={150 + i * 26}
          y1={55 + i * 3}
          x2={180 + i * 26}
          y2={85 + i * 3}
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}

      {/* rim highlight */}
      <path
        d="M62,72 C90,58 140,56 175,60 C195,62 210,57 228,44"
        fill="none"
        stroke="#f9fafb"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* accent stripe */}
      <path
        d="M95,150 C160,168 260,170 340,152"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
