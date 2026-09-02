"use client";

import { useEffect, type RefObject } from "react";

interface StratoMotionRefs {
  containerRef: RefObject<HTMLElement | null>;
  wrapperRef: RefObject<HTMLElement | null>;
  glowRef: RefObject<HTMLElement | null>;
  shadowRef: RefObject<HTMLElement | null>;
  ringRef: RefObject<HTMLElement | null>;
}

const LERP = 0.07;

export function useStratoMotion(
  { containerRef, wrapperRef, glowRef, shadowRef, ringRef }: StratoMotionRefs,
  { reducedMotion, coarsePointer }: { reducedMotion: boolean; coarsePointer: boolean }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      wrapperRef.current?.style.setProperty(
        "transform",
        "perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.06)"
      );
      return;
    }

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    function applyTransforms() {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `perspective(1200px) rotateY(${cur.x * 16}deg) rotateX(${cur.y * -8}deg) scale(1.06)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${cur.x * 20}px, ${cur.y * 16}px, 0)`;
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${cur.x * 16}px) skewX(${cur.x * 6}deg) scaleX(${1 + Math.abs(cur.x) * 0.08})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${cur.x * 10}deg)`;
      }
    }

    function loop(time: number) {
      if (coarsePointer) {
        const osc = Math.sin(time * 0.0005) * 8;
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `perspective(1200px) rotateY(${osc}deg) scale(1.06)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `rotate(${osc * 1.25}deg)`;
        }
        raf = requestAnimationFrame(loop);
        return;
      }

      cur.x += (target.x - cur.x) * LERP;
      cur.y += (target.y - cur.y) * LERP;
      applyTransforms();
      raf = requestAnimationFrame(loop);
    }

    function handleMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }

    function handleLeave() {
      target.x = 0;
      target.y = 0;
    }

    if (!coarsePointer) {
      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef, wrapperRef, glowRef, shadowRef, ringRef, reducedMotion, coarsePointer]);
}
