"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LineNumbers } from "@/components/grid/LineNumbers";
import { Scribble } from "@/components/grid/Scribble";
import { Tile } from "@/components/grid/Tile";
import { useSplitReveal } from "@/components/grid/useSplitReveal";
import { ReactSpotlight } from "./about/ReactSpotlight";
import { ToolboxMarquee } from "./about/ToolboxMarquee";
import { GUTTER_GRADIENT } from "./hero/gradient";

/** About: intro copy with a code gutter, the React spotlight card and the toolbox marquee. */
export function AboutSection() {
  const t = useTranslations("home.about");
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(headingRef, { onScroll: true, delay: 0 });

  return (
    <section id="about" aria-labelledby="about-heading" className="grid-frame flex flex-col lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
      {/* Left column */}
      <div className="contents lg:flex lg:flex-col">
        <Tile mode="grain" lines={["left"]} className="h-20 max-lg:order-2 lg:h-[30vh]">
          <Tile mode="accent" className="absolute bg-cyber/6! inset-0 lg:top-auto lg:h-[45%]" />
          <div className="absolute bottom-4 left-5 lg:bottom-[5vh] lg:left-12" data-speed="clamp(1.08)">
            <Scribble variant="loop" className="text-[1.7rem] text-white/90" strokeClassName="w-44 -ml-4">
              {t("spotlightNote")}
            </Scribble>
          </div>
        </Tile>

        <Tile mode="solid" lines={["left"]} data-fade className="aspect-[4/5] max-lg:order-3 sm:aspect-square lg:aspect-auto lg:h-[70vh]">
          <ReactSpotlight title={t("spotlightTitle")} text={t("spotlightText")} className="size-full" />
        </Tile>
      </div>

      {/* Right column */}
      <div className="contents lg:flex lg:flex-col">
        <div className="flex max-lg:order-1 lg:h-[70vh]" style={{ backgroundImage: GUTTER_GRADIENT, backgroundSize: "100% 100%" }}>
          <Tile mode="solid" className="flex w-full flex-col px-5 py-14 sm:px-8 lg:w-[68%] lg:px-12 lg:pt-[8vh] lg:pb-[7vh]">
            <h2 ref={headingRef} id="about-heading" className="max-w-[18ch] text-[clamp(2rem,2.6vw,2.6rem)] leading-[1.1] text-white">
              {t("heading")}
            </h2>
            <div className="mt-12 lg:mt-auto" data-fade>
              <Scribble variant="underline" className="mb-4 text-accent-soft/85" strokeClassName="w-28">
                {t("note")}
              </Scribble>
              <p className="max-w-[44ch] text-[1.15rem] leading-relaxed text-on-dark-muted">{t("text")}</p>
            </div>
          </Tile>
          <div className="hidden w-16 bg-ink/40 pt-[8vh] text-center mask-[linear-gradient(to_bottom,black_45%,transparent_90%)] lg:block">
            <LineNumbers count={18} className="text-white/60" />
          </div>
        </div>

        <ToolboxMarquee className="h-[110px] max-lg:order-4 lg:h-[15vh]" />
        <Tile mode="window" lines={["bottom"]} className="hidden h-[15vh] lg:block" />
      </div>
    </section>
  );
}
