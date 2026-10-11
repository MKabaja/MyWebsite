"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tile } from "@/components/grid/Tile";
import { useSplitReveal } from "@/components/grid/useSplitReveal";
import { TechIcon } from "@/components/icons/TechIcon";
import { coreStack } from "@/content/stack";
import { HireTiles } from "./hire/HireTiles";

/** "Open to work" block: decorative tile column on the left, stack / skills / achievements on the right. */
export function HireSection() {
  const t = useTranslations("home.hire");
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(headingRef, { delay: 0, onScroll: true });

  const skills = t.raw("skills") as string[];
  const achievements = t.raw("achievements") as string[];

  return (
    <section id="hire" aria-labelledby="hire-heading" className="grid-frame grid grid-cols-1 lg:grid-cols-12">
      <HireTiles />

      <Tile
        mode="solid"
        className="px-5 pt-16 pb-16 sm:px-10 lg:col-span-8 lg:px-14 lg:pt-24 lg:pb-28 2xl:px-20"
      >
        <h2
          id="hire-heading"
          ref={headingRef}
          className="max-w-[21em] text-[1.9rem] leading-[1.2] font-medium text-white md:text-[2.4rem]"
        >
          {t("headingStart")} <span className="text-accent">{t("headingRoles")}</span> {t("headingEnd")}
        </h2>

        <div className="mt-14 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          <div data-fade>
            <h3 className="text-[1.6rem] text-white">{t("stackHeading")}</h3>
            <ul className="mt-5 space-y-1.5">
              {coreStack.map((tech) => (
                <li key={tech.name} className="flex items-center gap-3 text-on-dark-muted">
                  <TechIcon icon={tech.icon} className="size-4 shrink-0 opacity-70" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>

          <div data-fade className="md:row-span-2">
            <h3 className="text-[1.6rem] text-white">{t("achievementsHeading")}</h3>
            <ul className="mt-5 space-y-3">
              {achievements.map((item) => (
                <li key={item} className="flex gap-3 text-on-dark-muted">
                  <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mouse-md group mt-12 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 py-2 text-[1.05rem] font-semibold text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {t("cta")}
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div data-fade>
            <h3 className="text-[1.6rem] text-white">{t("skillsHeading")}</h3>
            <ul className="mt-5 space-y-1.5">
              {skills.map((skill) => (
                <li key={skill} className="text-on-dark-muted">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tile>
    </section>
  );
}
