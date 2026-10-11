"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpLeft, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Scribble } from "@/components/grid/Scribble";
import { Tile } from "@/components/grid/Tile";
import { useSplitReveal } from "@/components/grid/useSplitReveal";
import { StackChips } from "@/components/home/projects/StackChips";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/projects";
import { ProjectContent } from "./ProjectContent";
import styles from "./ProjectView.module.css";

/** Horizontal padding shared by every row of the main column, so the dashed frame lines align. */
const GUTTER = "px-6 sm:px-10 lg:px-[clamp(3rem,6vw,6.5rem)]";

const LINK = "mouse-sm inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-wide text-on-dark transition-colors hover:text-accent";

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations();
  const titleRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(titleRef, { delay: 0.5 });

  const { live, repo } = project.links ?? {};
  const details = [
    project.client && { label: t("portfolio.client"), value: project.client[locale] },
    project.role && { label: t("portfolio.role"), value: project.role[locale] },
    project.completed && { label: t("portfolio.completed"), value: project.completed },
  ].filter((item) => !!item);

  return (
    <div className="grid-frame flex min-h-svh flex-col lg:flex-row">
      <Tile mode="window" lines={["bottom"]} className="shrink-0 p-5 lg:w-[clamp(5rem,11vw,170px)] lg:border-r lg:border-b-0 lg:p-6">
        <TransitionLink
          href="/"
          aria-label={t("portfolio.back")}
          className="mouse-md inline-block text-on-dark transition-colors hover:text-accent"
        >
          <ArrowUpLeft aria-hidden strokeWidth={1.25} className="size-10 lg:size-12" />
        </TransitionLink>
      </Tile>

      <main className="flex min-w-0 flex-1 flex-col">
        <Tile as="header" className={`${GUTTER} pt-10 pb-12 lg:pt-12 lg:pb-16`}>
          <Logo height={30} label={t("person.homeLink")} />
          <div className="mt-20 lg:mt-36">
            <Scribble variant="underline" strokeClassName="max-w-36 text-accent/70">
              {t("portfolio.caseStudy")}
            </Scribble>
            <p className="mt-6 font-mono text-[0.8rem] tracking-wide text-accent lowercase">{project.type[locale]}</p>
            <h1 ref={titleRef} className="mt-2 text-[clamp(3rem,7vw,6.5rem)] leading-none font-semibold">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.3rem] leading-snug text-on-dark-muted lg:text-[1.45rem]">
              {project.lead[locale]}
            </p>
          </div>
        </Tile>

        <Tile lines={["top", "bottom"]} className={GUTTER}>
          <div className="relative aspect-video overflow-hidden border-x border-dashed border-guide bg-ink">
            {project.video ? (
              <video
                className="mouse-md absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
                data-speed="auto"
                loop
                muted
                autoPlay
                playsInline
                poster={project.video.poster}
                aria-label={t("portfolio.media", { title: project.title })}
              >
                {project.video.webm && <source src={project.video.webm} type="video/webm" />}
                <source src={project.video.mp4} type="video/mp4" />
              </video>
            ) : (
              <div
                aria-hidden
                data-speed="auto"
                className={`${styles.placeholder} absolute inset-x-0 -top-[6%] flex h-[112%] flex-col items-center justify-center gap-3`}
              >
                <span className="text-[clamp(2rem,6vw,5rem)] leading-none font-semibold text-on-dark/90">{project.title}</span>
                <span className="font-mono text-[0.85rem] text-cyber-soft">
                  &lt; {t("home.projects.soon")} /&gt;
                </span>
              </div>
            )}
          </div>
        </Tile>

        <Tile lines={["bottom"]} className={GUTTER}>
          <dl className="m-0 grid grid-cols-1 border-x border-dashed border-guide sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
            {details.map(({ label, value }) => (
              <DetailCell key={label} label={label}>
                {value}
              </DetailCell>
            ))}
            <DetailCell label={t("portfolio.stack")}>
              <StackChips stack={project.stack} />
            </DetailCell>
            {(live || repo || project.placeholder) && (
              <DetailCell label={t("portfolio.links")}>
                <div className="flex flex-col items-start gap-2">
                  {live && (
                    <a href={live} target="_blank" rel="noopener noreferrer" className={LINK}>
                      <ExternalLink size={14} aria-hidden />
                      {t("portfolio.live")}
                    </a>
                  )}
                  {repo && (
                    <a href={repo} target="_blank" rel="noopener noreferrer" className={LINK}>
                      <GithubIcon size={14} />
                      {t("portfolio.repo")}
                    </a>
                  )}
                  {!live && !repo && (
                    <span className="border border-cyber/40 px-2 py-1 font-mono text-[0.7rem] leading-none text-cyber-soft uppercase">
                      {t("home.projects.soon")}
                    </span>
                  )}
                </div>
              </DetailCell>
            )}
          </dl>
        </Tile>

        <Tile className={`${GUTTER} py-16 lg:py-24`}>
          {project.placeholder || project.content.length === 0 ? (
            <p className="max-w-[60ch] font-mono text-[0.95rem] text-on-dark-muted" data-fade>
              <span className="text-accent">{"// "}</span>
              {t("portfolio.placeholderNote")}
            </p>
          ) : (
            <ProjectContent blocks={project.content} locale={locale} />
          )}
        </Tile>

        <Tile mode="grain" lines={["top", "bottom"]} className={`${GUTTER} py-16 lg:py-20`}>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between" data-fade>
            <p className="max-w-[28ch] text-[1.6rem] leading-tight font-semibold lg:text-[2rem]">{t("portfolio.ctaText")}</p>
            <TransitionLink
              href="/#contact"
              className="mouse-md group inline-flex items-center gap-3 bg-accent px-6 py-4 font-mono text-[0.9rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-accent-soft"
            >
              {t("portfolio.cta")}
              <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </TransitionLink>
          </div>
        </Tile>

        <Tile as="footer" className={`${GUTTER} py-8`}>
          <p className="font-mono text-[0.72rem] text-on-dark-muted/70">
            {t("portfolio.copyright", { year: new Date().getFullYear() })}
          </p>
        </Tile>
      </main>

      <Tile mode="grain" lines={["left"]} className="hidden w-[clamp(3rem,7vw,9rem)] shrink-0 xl:block" />
    </div>
  );
}

function DetailCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-dashed border-guide p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
      <dt className="font-mono text-[0.72rem] tracking-wider text-on-dark-muted uppercase">{label}</dt>
      <dd className="m-0 mt-3 text-[1.15rem] leading-snug">{children}</dd>
    </div>
  );
}
