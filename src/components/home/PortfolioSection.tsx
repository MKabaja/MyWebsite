"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/grid/Marquee";
import { Scribble } from "@/components/grid/Scribble";
import { Tile } from "@/components/grid/Tile";
import { FpsMeter } from "./portfolio/FpsMeter";
import { PortfolioCarousel } from "./portfolio/PortfolioCarousel";

/** Giant marquee over the grid, then the tilted draggable project strip. */
export function PortfolioSection() {
  const t = useTranslations("home.portfolio");

  return (
    <section
      data-m-recede
      id="portfolio"
      className="grid-frame relative overflow-hidden lg:h-[clamp(860px,118vh,1180px)]"
    >
      <div className="grid h-full grid-cols-2 lg:grid-cols-[30%_1fr] lg:grid-rows-[40%_9%_1fr]">
        <Tile
          mode="solid"
          lines={["top", "bottom"]}
          className="col-span-2 flex h-[230px] items-end justify-center pb-6 lg:col-span-1 lg:h-auto lg:items-center lg:pt-[9vw] lg:pb-0"
        >
          <Scribble variant="underline" className="text-[1.7rem] lg:text-[2rem]" strokeClassName="max-w-40 text-on-dark-muted/70">
            {t("dragNote")}
          </Scribble>
        </Tile>
        <Tile mode="window" lines={["top", "left"]} className="col-span-2 h-[min(150vw,640px)] lg:col-span-1 lg:row-span-3 lg:h-auto" />
        <Tile mode="accent" className="h-16 lg:h-auto" />
        <Tile mode="grain" lines={["top"]} className="h-16 lg:h-auto" />
      </div>

      {/* Floating shader cells with their own scroll speed (wrapped: Tile is always `relative`). */}
      <div className="absolute top-[14%] right-[7%] hidden h-[20%] w-[13%] lg:block" aria-hidden data-speed="clamp(1.15)">
        <Tile mode="grain" lines={["top", "right", "bottom", "left"]} className="h-full" />
      </div>
      <div className="absolute bottom-[16%] left-[30%] hidden h-[7%] w-[9%] lg:block" aria-hidden data-speed="clamp(0.88)">
        <Tile mode="accent" className="h-full" />
      </div>

      <Marquee
        repeat={4}
        duration={38}
        className="pointer-events-none absolute inset-x-0 top-3 z-[5] text-[16vw] leading-[0.82] font-medium tracking-[-0.02em] text-on-dark/95 uppercase lg:top-[2.5%] lg:text-[9vw]"
      >
        <span>{t("marquee")}</span>
        <span className="px-[0.35em] font-normal" aria-hidden>
          ×
        </span>
      </Marquee>

      <div className="absolute inset-x-0 top-[230px] bottom-16 z-10 lg:top-[30%] lg:bottom-0">
        <PortfolioCarousel />
      </div>

      <div className="max-lg:hidden absolute bottom-16 left-0 z-20 lg:bottom-0 lg:left-[30%]">
        <Tile mode="solid" lines={["top", "right"]} className="px-4 py-3 lg:px-5 lg:py-4">
          <FpsMeter />
        </Tile>
      </div>
    </section>
  );
}
