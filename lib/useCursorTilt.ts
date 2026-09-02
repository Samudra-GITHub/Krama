"use client";

import { useEffect, type RefObject } from "react";

interface CursorTiltRefs {
  containerRef: RefObject<HTMLElement | null>;
  wrapperRef: RefObject<HTMLElement | null>;
  glowRef?: RefObject<HTMLElement | null>;
}

const LERP = 0.06;

/**
 * Cursor-driven parallax tilt for a hero video/glow layer — tracks the
 * *native* pointer (no custom cursor UI), with idle oscillation for
 * touch devices and a static resting frame under reduced motion.
 */
export function useCursorTilt(
  { containerRef, wrapperRef, glowRef }: CursorTiltRefs,
  { reducedMotion, coarsePointer }: { reducedMotion: boolean; coarsePointer: boolean }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      if (wrapperRef.current) wrapperRef.current.style.transform = "scale(1.05)";
      if (glowRef?.current) glowRef.current.style.transform = "translate3d(0,0,0)";
      return;
    }

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    function applyTransforms() {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(1.05) rotateY(${cur.x * 5}deg) rotateX(${cur.y * -3.5}deg)`;
      }
      if (glowRef?.current) {
        glowRef.current.style.transform = `translate3d(${cur.x * 24}px, ${cur.y * 16}px, 0)`;
      }
    }

    function loop(time: number) {
      if (coarsePointer) {
        const osc = Math.sin(time * 0.0004);
        cur.x = osc * 0.6;
        cur.y = 0;
        applyTransforms();
        raf = requestAnimationFrame(loop);
        return;
      }

      cur.x += (target.x - cur.x) * LERP;
      cur.y += (target.y - cur.y) * LERP;
      applyTransforms();
      raf = requestAnimationFrame(loop);
    }

    function handleMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }

    function handleLeave() {
      target.x = 0;
      target.y = 0;
    }

    if (!coarsePointer) {
      container.addEventListener("pointermove", handleMove);
      container.addEventListener("pointerleave", handleLeave);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, [containerRef, wrapperRef, glowRef, reducedMotion, coarsePointer]);
}
