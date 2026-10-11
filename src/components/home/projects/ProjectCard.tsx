"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { toLocale } from "@/i18n/routing";
import { subscribeTilt } from "@/lib/deviceTilt";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Project } from "@/content/projects";
import { StackChips } from "./StackChips";

const MAX_TILT = 7;
/** Phones: the card leans back on the way in and forward on the way out, on top of the phone's tilt. */
const SCROLL_TILT = 6;

const LINK = "mouse-sm inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-wide transition-colors";

/**
 * Project tile of the home "Projects" grid: tab label + badge above the card; all of it tilts toward the cursor.
 * Touch screens have no cursor, so there it follows the phone's tilt and the scroll position instead.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("home.projects");
  const locale = toLocale(useLocale());
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return tiltOnTouch(card);

    gsap.set(card, { transformPerspective: 900 });
    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(x * MAX_TILT * 2);
      rotateX(-y * MAX_TILT * 2);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(card);
      gsap.set(card, { clearProps: "transform" });
    };
  }, []);

  const href = `/portfolio/${project.slug}`;
  const { live, repo } = project.links ?? {};

  return (
    <li className="flex flex-col" data-fade>
      <div ref={cardRef} className="group flex flex-1 flex-col will-change-transform">
        <div aria-hidden className="flex items-end justify-between gap-4 font-mono text-[0.72rem] leading-none">
          <span className="border border-b-0 border-white/10 bg-white/[0.04] px-2 py-1 text-on-dark-muted">
            {t("label")} {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate bg-accent px-2 py-1 lowercase text-ink">{project.type[locale]}</span>
        </div>

        <article
          className="relative flex min-h-[20rem] flex-1 flex-col border border-white/12 bg-graphite-2 p-7 transition-[border-color,background-color] duration-300 group-hover:border-white/45 group-hover:bg-[#28292d] sm:p-9 md:min-h-[25rem]"
        >
          <ArrowUpRight
            data-m-depth
            aria-hidden
            strokeWidth={1.25}
            className="absolute top-6 right-6 size-10 text-on-dark-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
          <h3 className="pr-12 text-[1.9rem] leading-[1.1] font-semibold">
            <TransitionLink href={href} className="mouse-md transition-colors hover:text-accent">
              {project.title}
            </TransitionLink>
          </h3>
          <p className="mt-4 max-w-[34ch] text-[1.15rem] leading-snug text-on-dark-muted">{project.lead[locale]}</p>

          <StackChips stack={project.stack} className="mt-auto pt-10" />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed border-guide pt-5">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className={`${LINK} text-on-dark hover:text-accent`}>
                <ExternalLink size={14} aria-hidden />
                {t("live")}
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className={`${LINK} text-on-dark hover:text-accent`}>
                <GithubIcon size={14} />
                {t("repo")}
              </a>
            )}
            {project.placeholder && (
              <span className="border border-cyber/40 px-2 py-1 font-mono text-[0.7rem] uppercase leading-none text-cyber-soft">
                {t("soon")}
              </span>
            )}
            <TransitionLink
              href={href}
              aria-label={`${t("details")}: ${project.title}`}
              className={`${LINK} ms-auto text-accent hover:text-accent-soft`}
            >
              {t("details")}
              <ArrowUpRight size={14} aria-hidden />
            </TransitionLink>
          </div>
        </article>
      </div>
    </li>
  );
}

function tiltOnTouch(card: HTMLElement) {
  gsap.set(card, { transformPerspective: 900 });
  const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
  const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
  const state = { scroll: 0, tiltX: 0, tiltY: 0 };
  const apply = () => {
    rotateX(state.scroll + state.tiltY * MAX_TILT);
    rotateY(state.tiltX * MAX_TILT);
  };

  const trigger = ScrollTrigger.create({
    trigger: card,
    start: "top bottom",
    end: "bottom top",
    onUpdate: ({ progress }) => {
      state.scroll = (0.5 - progress) * 2 * SCROLL_TILT;
      apply();
    },
  });

  // The phone's tilt is only listened to while the card is on screen.
  let unsubscribe: (() => void) | undefined;
  const observer = new IntersectionObserver(([entry]) => {
    unsubscribe?.();
    unsubscribe = entry.isIntersecting
      ? subscribeTilt(({ x, y }) => {
          state.tiltX = x;
          state.tiltY = y;
          apply();
        })
      : undefined;
  });
  observer.observe(card);

  return () => {
    observer.disconnect();
    unsubscribe?.();
    trigger.kill();
    gsap.killTweensOf(card);
    gsap.set(card, { clearProps: "transform" });
  };
}
