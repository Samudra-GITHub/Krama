"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion, useCoarsePointer } from "@/lib/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  const haloX = useSpring(x, { damping: 22, stiffness: 180, mass: 0.6 });
  const haloY = useSpring(y, { damping: 22, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (reducedMotion || coarsePointer) {
      document.documentElement.classList.remove("cursor-none");
      return;
    }
    document.documentElement.classList.add("cursor-none");

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setInteractive(!!target.closest("[data-cursor='interactive']"));
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [reducedMotion, coarsePointer, visible, x, y]);

  if (reducedMotion || coarsePointer) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      <motion.div
        className="absolute rounded-full bg-krama-text-primary/80"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          width: 10,
          height: 10,
        }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{
          left: haloX,
          top: haloY,
          x: "-50%",
          y: "-50%",
          borderColor: "var(--krama-accent-alt)",
        }}
        animate={{
          width: interactive ? 56 : 34,
          height: interactive ? 56 : 34,
          opacity: interactive ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
