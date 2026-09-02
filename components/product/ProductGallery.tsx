"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { SneakerViewer, SneakerSilhouette } from "@/components/3d/SneakerViewer";
import { Carousel } from "@/components/ui/Carousel";

const TABS = ["3D", "Photos"] as const;
type Tab = (typeof TABS)[number];

const PHOTO_SHOTS = [
  { label: "Side profile", rotate: "-rotate-6", scale: "scale-100" },
  { label: "Sole detail", rotate: "rotate-3", scale: "scale-125" },
  { label: "Top-down", rotate: "rotate-12", scale: "scale-90" },
];

export function ProductGallery({ accent }: { accent: string }) {
  const [tab, setTab] = useState<Tab>("3D");

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
            <div
              key={shot.label}
              className="glass-hero-tile relative flex aspect-square w-full items-center justify-center overflow-hidden"
            >
              <SneakerSilhouette accent={accent} className={clsx("w-[70%]", shot.rotate, shot.scale)} />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-pill bg-black/40 px-3 py-1 text-[10px] uppercase tracking-label text-krama-text-primary/80">
                {shot.label}
              </span>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
