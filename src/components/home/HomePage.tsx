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
/** On phones the grid starts with this gutter on each side. */
const MOBILE_GUTTER = 16;

/**
 * Single long-scroll home page. The grid starts narrower than the viewport (1280px on desktop,
 * a 16px gutter on phones) and widens to full width while scrolling.
 */
export function HomePage() {
  useEffect(() => {
    const root = document.documentElement;
    const desktop = isDesktop();
    if (desktop && window.innerWidth <= START_WIDTH) return;
    if (!desktop && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startWidth = () => (desktop ? START_WIDTH : window.innerWidth - MOBILE_GUTTER * 2);
    const state = { progress: 0 };
    const apply = () => {
      const width = startWidth() + (window.innerWidth - startWidth()) * state.progress;
      root.style.setProperty("--grid-w", `${width}px`);
    };
    apply();
    const tween = gsap.to(state, {
      progress: 1,
      ease: "none",
      onUpdate: apply,
      scrollTrigger: { trigger: document.body, start: "20px top", end: desktop ? "+=300%" : "+=100%", scrub: true },
    });
    window.addEventListener("resize", apply);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--grid-w");
    };
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
