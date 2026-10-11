"use client";

import { ArrowUpLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tile } from "@/components/grid/Tile";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Logo } from "@/components/ui/Logo";

export function NotFoundView() {
  const t = useTranslations();

  return (
    <div className="grid-frame flex min-h-svh flex-col lg:flex-row">
      <Tile as="section" className="flex flex-col px-6 pt-10 pb-14 sm:px-10 lg:w-1/2 lg:px-[clamp(3rem,6vw,6.5rem)] lg:pt-12">
        <Logo height={30} label={t("person.homeLink")} />

        <div className="my-auto pt-20 lg:pt-0">
          <p aria-hidden className="font-mono text-[0.8rem] text-on-dark-muted">
            <span className="text-accent">error</span> 404 <span className="text-cyber-soft">not_found</span>
          </p>
          <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.2rem)] leading-none font-semibold">{t("notFound.title")}</h1>
          <p className="mt-6 max-w-[40ch] text-[1.2rem] leading-snug text-on-dark-muted">
            {t("notFound.text")}
            <br />
            <em className="text-on-dark">{t("notFound.hint")}</em>
          </p>
          <TransitionLink
            href="/"
            className="mouse-md group mt-10 inline-flex items-center gap-3 bg-accent px-6 py-4 font-mono text-[0.9rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-accent-soft"
          >
            <ArrowUpLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            {t("notFound.back")}
          </TransitionLink>
        </div>
      </Tile>

      <Tile
        mode="window"
        lines={["top"]}
        className="flex min-h-[40svh] flex-1 items-center justify-center overflow-hidden lg:border-t-0 lg:border-l"
      >
        <span
          aria-hidden
          className="text-[clamp(8rem,26vw,24rem)] leading-none font-black text-transparent [-webkit-text-stroke:2px_var(--color-on-dark)] select-none"
          data-speed="clamp(0.9)"
        >
          404
        </span>
      </Tile>
    </div>
  );
}
