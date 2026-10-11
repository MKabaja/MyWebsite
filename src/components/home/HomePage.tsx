"use client";

import { useEffect } from "react";
import { gsap, isDesktop } from "@/lib/gsap";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { HireSection } from "./HireSection";
import { PortfolioSection } from "./PortfolioSection";
import { ProjectsSection } from "./ProjectsSection";

const START_WIDTH = 1280;
/** Phones: the hero starts at this scale and grows to full width (no reflow, unlike desktop's `--grid-w`). */
const MOBILE_START_SCALE = 0.86;

/**
 * Single long-scroll home page. The desktop grid widens from 1280px to the viewport while scrolling.
 * Phones get the same "frame opens up" feel by scaling the hero (and clipping the shader to it) instead,
 * finishing before the hero's bottom edge enters the screen so no gap opens below it.
 */
export function HomePage() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 992px)", () => {
      const root = document.documentElement;
      const desktop = isDesktop();
      if (desktop && window.innerWidth <= START_WIDTH) return;
      if (!desktop && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const startWidth = () => (desktop ? START_WIDTH : window.innerWidth - 32);
      const state = { progress: 0 };
      const apply = () => {
        const width = startWidth() + (window.innerWidth - startWidth()) * state.progress;
        root.style.setProperty("--grid-w", `${width}px`);
      };
      apply();
      gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: document.body, start: "20px top", end: desktop ? "+=300%" : "+=100%", scrub: true },
      });
      window.addEventListener("resize", apply);
      return () => {
        window.removeEventListener("resize", apply);
        root.style.removeProperty("--grid-w");
      };
    });
    media.add("(max-width: 991px) and (prefers-reduced-motion: no-preference)", () => {
      const root = document.documentElement;
      const hero = document.querySelector<HTMLElement>("[data-m-hero]");
      if (!hero) return;
      const state = { scale: MOBILE_START_SCALE };
      const apply = () => root.style.setProperty("--shader-w", `${window.innerWidth * state.scale}px`);
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${gsap.utils.clamp(120, window.innerHeight * 0.6, hero.offsetHeight - window.innerHeight)}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(hero, { scale: MOBILE_START_SCALE, transformOrigin: "50% 0%" }, { scale: 1 }, 0)
        .fromTo(state, { scale: MOBILE_START_SCALE }, { scale: 1, onUpdate: apply }, 0)
        .fromTo(hero.querySelector("[data-m-portrait]"), { scale: 1.18 }, { scale: 1 }, 0);
      apply();
      window.addEventListener("resize", apply);
      return () => {
        window.removeEventListener("resize", apply);
        root.style.removeProperty("--shader-w");
      };
    });
    return () => media.revert();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <HireSection />
      <PortfolioSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
