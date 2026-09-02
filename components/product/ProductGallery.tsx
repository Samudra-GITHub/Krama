"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SneakerViewer, SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { Carousel } from "@/components/ui/Carousel";
import { useReducedMotion } from "@/lib/useReducedMotion";

const TABS = ["3D", "Photos"] as const;
type Tab = (typeof TABS)[number];

const PHOTO_SHOTS = [
  { label: "Front", rotate: "rotate-0", scale: "scale-100" },
  { label: "Side profile", rotate: "-rotate-6", scale: "scale-100" },
  { label: "Back", rotate: "rotate-6", scale: "scale-100" },
  { label: "Sole detail", rotate: "rotate-3", scale: "scale-125" },
  { label: "On foot", rotate: "rotate-12", scale: "scale-90" },
];

export function ProductGallery({ accent }: { accent: string }) {
  const [tab, setTab] = useState<Tab>("3D");
  const [zoomed, setZoomed] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!zoomed) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoomed(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [zoomed]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "rounded-pill border px-4 py-1.5 text-xs uppercase tracking-label transition-colors duration-200",
              tab === t
                ? "border-krama-accent bg-krama-accent text-black"
                : "border-krama-border-glass text-krama-text-primary/70 hover:border-krama-accent-alt"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "3D" ? (
        <div className="glass-hero-tile relative aspect-square w-full overflow-hidden">
          <SneakerViewer />
        </div>
      ) : (
        <Carousel>
          {PHOTO_SHOTS.map((shot) => (
            <button
              key={shot.label}
              type="button"
              onClick={() => setZoomed(shot.label)}
              aria-label={`Zoom ${shot.label} view`}
              className="glass-hero-tile group relative flex aspect-square w-full items-center justify-center overflow-hidden text-left"
            >
              <SneakerSilhouette accent={accent} className={clsx("w-[70%] transition-transform duration-500", shot.rotate, shot.scale)} />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-pill bg-black/40 px-3 py-1 text-[10px] uppercase tracking-label text-krama-text-primary/80">
                {shot.label}
              </span>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-pill bg-black/40 text-krama-text-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand size={14} strokeWidth={1.5} />
              </span>
            </button>
          ))}
        </Carousel>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${zoomed} — full screen`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => setZoomed(null)}
          >
            <button
              aria-label="Close zoom"
              onClick={() => setZoomed(null)}
              className="absolute right-6 top-6 text-krama-text-primary/70 transition-colors hover:text-krama-text-primary"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: reducedMotion ? 1 : 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: reducedMotion ? 1 : 0.92 }}
              className="flex aspect-square w-full max-w-2xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <SneakerSilhouette
                accent={accent}
                className={clsx(
                  "w-full",
                  PHOTO_SHOTS.find((s) => s.label === zoomed)?.rotate
                )}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
