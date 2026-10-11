"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { TechIcon } from "@/components/icons/TechIcon";
import { Scribble } from "@/components/grid/Scribble";
import { Tile } from "@/components/grid/Tile";
import { useSplitReveal } from "@/components/grid/useSplitReveal";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { StatusIndicator } from "@/components/shell/StatusIndicator";
import { Logo } from "@/components/ui/Logo";
import { coreStack } from "@/content/stack";
import { site } from "@/lib/site";
import { HERO_GRADIENT } from "./hero/gradient";
import { GuideOut } from "./hero/GuideOut";
import { HeroTerminal } from "./hero/HeroTerminal";
import { ScrollDownLink } from "./hero/ScrollDownLink";
import { ScrollHint } from "./hero/ScrollHint";

const SOCIALS = [
  { key: "github", href: site.social.github, Icon: GithubIcon },
  { key: "linkedin", href: site.social.linkedin, Icon: LinkedinIcon },
  { key: "facebook", href: site.social.facebook, Icon: FacebookIcon },
] as const;

/**
 * Hero: two tile columns (45 / 55). Heights are viewport based on desktop because the grid widens
 * while this block scrolls by. On mobile the columns dissolve (`contents`) and tiles are re-ordered.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");
  const tPerson = useTranslations("person");
  const tSocial = useTranslations("social");
  const tNav = useTranslations("nav");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(headlineRef, { delay: 0.6 });

  return (
    <section className="grid-frame flex flex-col lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
      {/* Left column */}
      <div className="contents lg:flex lg:flex-col">
        <Tile mode="grain" lines={["left"]} className="h-44 max-lg:order-1 lg:h-[50vh]">
          <Logo label={tPerson("homeLink")} height={34} className="absolute top-8 left-5 text-accent! lg:top-10 lg:left-12" />
          <Tile mode="accent" className="absolute bg-cyber/6! inset-x-0 bottom-0 h-12 lg:top-[56%] lg:bottom-auto lg:h-[33%]" />
          <div className="absolute top-[63%] right-[calc(100%-2.5rem)] hidden w-32 lg:block" aria-hidden>
            <Scribble variant="arrow" className="text-[1.4rem] leading-[0.9] text-white/55" strokeClassName="ml-10 -mt-1 w-20! rotate-6">
              {t("shaderNote")}
            </Scribble>
          </div>
        </Tile>

        <Tile mode="solid" lines={["left", "top"]} className="flex flex-col max-lg:order-3 lg:h-[74vh]">
          <GuideOut side="left" className="top-0" />
          <div className="px-5 pt-12 pb-14 sm:px-8 lg:px-12 lg:pt-[8vh] lg:pb-0">
            <div data-speed="clamp(1.15)">
              <Scribble variant="arrow" className="mb-4 text-accent-soft/80" strokeClassName="w-20!">
                {t("intro")}
              </Scribble>
            </div>
            <h1
              ref={headlineRef}
              data-speed="clamp(1.06)"
              className="text-[clamp(2.4rem,3.7vw,3.7rem)] leading-[1.05] font-medium text-white"
            >
              {t("headline")}
            </h1>
          </div>

          <div className="mt-auto flex items-center justify-between gap-6 border-t border-dashed border-guide px-5 py-5 sm:px-8 lg:h-20 lg:px-12 lg:py-0">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:gap-x-8">
              {coreStack.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noreferrer"
                    title={tech.name}
                    aria-label={tech.name}
                    className="mouse-sm block text-white/40 transition-colors hover:text-white"
                  >
                    <TechIcon icon={tech.icon} className="size-6 lg:size-7" />
                  </a>
                </li>
              ))}
            </ul>
            <ScrollDownLink
              targetId="about"
              label={tNav("about")}
              className="mouse-sm shrink-0 text-white/50 transition-colors hover:text-accent"
            >
              <ArrowDownRight className="size-9" strokeWidth={1.25} />
            </ScrollDownLink>
          </div>
        </Tile>

        <div className="hidden h-[16vh] lg:flex">
          <Tile mode="window" lines={["left", "top"]} className="flex-1" />
          <Tile mode="grain" lines={["top", "left"]} className="w-[32%]" />
        </div>
      </div>

      {/* Right column */}
      <div className="contents lg:flex lg:flex-col">
        <div className="flex h-16 max-lg:order-2 lg:h-20">
          <Tile mode="window" lines={["bottom"]} className="flex flex-1 items-center px-5 lg:px-10">
            <StatusIndicator label={t("status")} className="text-white!" />
          </Tile>
          <Tile mode="solid" lines={["left", "bottom"]} className="flex w-28 items-center justify-center lg:w-[30%]">
            <LanguageSwitch className="font-mono text-sm text-white" />
          </Tile>
        </div>

        <Tile mode="window" className="h-[38svh] max-lg:order-4 lg:h-[calc(60vh-5rem)]">
          <span aria-hidden className="absolute inset-y-0 left-[180px] hidden border-l border-dashed border-white/25 lg:block" />
          <span aria-hidden className="absolute inset-y-0 right-[30%] hidden border-l border-dashed border-white/25 lg:block" />
        </Tile>

        <div className="flex h-[140px] max-lg:order-5 lg:h-[180px]">
          <Tile mode="solid" className="aspect-square h-full overflow-hidden bg-graphite-2">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_95%,rgb(255_140_50/0.6),rgb(255_107_0/0.12)_45%,transparent_70%)]"
            />
            <Image
              src="/images/headshot.png"
              alt={t("photoAlt")}
              width={400}
              height={400}
              sizes="180px"
              priority
              className="relative size-full object-cover object-bottom"
            />
          </Tile>
          <Tile mode="window" lines={["top"]} className="flex flex-1 items-end px-6 pb-8 lg:px-10 lg:pb-11">
            <ul className="flex items-center gap-7" data-lag="0.1">
              {SOCIALS.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={tSocial(key)}
                    className="mouse-sm block text-white/80 transition-colors hover:text-white"
                  >
                    <Icon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </Tile>
        </div>

        <Tile
          mode="solid"
          className="p-5 max-lg:order-6 sm:p-8 lg:h-[calc(80vh-180px)] lg:p-0"
          style={{ backgroundImage: HERO_GRADIENT, backgroundSize: "100% 100%" }}
        >
          <GuideOut side="right" className="bottom-0" />
          <HeroTerminal
            label={t("terminalLabel")}
            className="h-56 lg:absolute lg:inset-x-[clamp(2.5rem,6%,5rem)] lg:top-[calc(40vh-180px+1.5rem)] lg:bottom-[clamp(2.5rem,8vh,5rem)] lg:h-auto"
          />
          {/* Sits at the bottom edge of the first viewport. */}
          <ScrollHint label={t("scrollHint")} className="absolute top-[calc(40vh-180px-3.5rem)] right-10 hidden text-white/80! lg:flex" />
        </Tile>
      </div>
    </section>
  );
}
