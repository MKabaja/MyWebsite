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

/** Single long-scroll home page. The grid starts 1280px wide and widens to the viewport while scrolling. */
export function HomePage() {
  useEffect(() => {
    const root = document.documentElement;
    if (!isDesktop() || window.innerWidth <= START_WIDTH) return;

    const state = { progress: 0 };
    const apply = () => {
      const width = START_WIDTH + (window.innerWidth - START_WIDTH) * state.progress;
      root.style.setProperty("--grid-w", `${width}px`);
    };
    apply();
    const tween = gsap.to(state, {
      progress: 1,
      ease: "none",
      onUpdate: apply,
      scrollTrigger: { trigger: document.body, start: "20px top", end: "+=300%", scrub: true },
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
