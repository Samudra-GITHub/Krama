"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { SneakerViewer, SneakerSilhouette } from "@/components/3d/SneakerViewer";

const TABS = ["3D", "Photos"] as const;
type Tab = (typeof TABS)[number];

const PHOTO_SHOTS = [
  { label: "Side profile", rotate: "-rotate-6", scale: "scale-100" },
  { label: "Sole detail", rotate: "rotate-3", scale: "scale-125" },
  { label: "Top-down", rotate: "rotate-12", scale: "scale-90" },
];

export function ProductGallery({ accent }: { accent: string }) {
  const [tab, setTab] = useState<Tab>("3D");
  const [shotIndex, setShotIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            data-cursor="interactive"
            onClick={() => setTab(t)}
            className={clsx(
              "rounded-pill border px-4 py-1.5 text-xs uppercase tracking-label transition-colors duration-200",
              tab === t
                ? "border-krama-accent bg-krama-accent text-[#04150a]"
                : "border-krama-border-glass text-krama-text-primary/70 hover:border-krama-accent-alt"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="glass-hero-tile relative aspect-square w-full overflow-hidden">
        {tab === "3D" ? (
          <SneakerViewer />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <SneakerSilhouette
              accent={accent}
              className={clsx(
                "w-[70%] transition-transform duration-500 ease-out",
                PHOTO_SHOTS[shotIndex].rotate,
                PHOTO_SHOTS[shotIndex].scale
              )}
            />
          </div>
        )}
      </div>

      {tab === "Photos" && (
        <div className="flex items-center gap-3">
          {PHOTO_SHOTS.map((shot, i) => (
            <button
              key={shot.label}
              data-cursor="interactive"
              onClick={() => setShotIndex(i)}
              className={clsx(
                "flex-1 rounded-glass border px-3 py-3 text-center text-[11px] uppercase tracking-label transition-colors duration-200",
                shotIndex === i
                  ? "border-krama-accent-alt text-krama-text-primary"
                  : "border-krama-border-glass text-krama-text-primary/50 hover:text-krama-text-primary/80"
              )}
            >
              {shot.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
