import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll effects for touch / narrow screens, where ScrollSmoother is off and the page scrolls natively.
 * Everything is scrubbed transforms / clip-paths driven by ScrollTrigger, so it stays smooth on the compositor.
 * Call inside a `gsap.context` — reverting the context removes all of it.
 *
 * - `data-m-speed="0.1"`: parallax drift, as a fraction of the viewport height (desktop uses `data-speed`).
 * - `data-m-expand`: the tile opens from an inset to full width as it enters the screen.
 * - `data-m-recede` on sections: the section sinks back (scale + fade) while it scrolls away.
 * - `[data-marquee]` tracks speed up with the scroll velocity.
 */
export function createMobileEffects() {
  gsap.utils.toArray<HTMLElement>("[data-m-speed]").forEach((element) => {
    const distance = (Number(element.dataset.mSpeed) || 0) * window.innerHeight;
    if (!distance) return;
    gsap.fromTo(
      element,
      { y: distance },
      {
        y: -distance,
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-m-expand]").forEach((element) => {
    gsap.fromTo(
      element,
      { clipPath: "inset(0% 8% 0% 8% round 18px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "top 55%", scrub: 0.4 },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-m-recede]").forEach((section) => {
    gsap.to(section, {
      scale: 0.92,
      opacity: 0.35,
      transformOrigin: "50% 100%",
      ease: "none",
      scrollTrigger: { trigger: section, start: "bottom 90%", end: "bottom 15%", scrub: true },
    });
  });

  const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee]");
  if (tracks.length) {
    const boost = { rate: 1 };
    const apply = () => {
      tracks.forEach((track) => track.getAnimations().forEach((animation) => (animation.playbackRate = boost.rate)));
    };
    ScrollTrigger.create({
      onUpdate(self) {
        const rate = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
        if (rate <= boost.rate) return;
        gsap.killTweensOf(boost);
        boost.rate = rate;
        apply();
        gsap.to(boost, { rate: 1, duration: 1.2, ease: "power2.out", onUpdate: apply });
      },
    });
  }
}
