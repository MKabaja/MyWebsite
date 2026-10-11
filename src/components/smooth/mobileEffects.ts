import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Catch-up of scrubbed effects in seconds: stands in for ScrollSmoother's lag on native scroll. */
const SCRUB = 0.6;

/**
 * Scroll effects for touch / narrow screens, where ScrollSmoother is off and the page scrolls natively.
 * Everything is scrubbed transforms / clip-paths driven by ScrollTrigger, so it stays smooth on the compositor.
 * Call inside a `gsap.context` — reverting the context removes all of it.
 *
 * - `data-speed="clamp(1.1)"`: the desktop parallax speeds, replayed on native scroll (narrow screens).
 * - `data-m-speed="0.1"`: parallax drift, as a fraction of the viewport height (overrides `data-speed`).
 * - `data-m-media`: media opens from an inset while entering; text remains fully visible.
 * - `data-m-depth`: small transforms on decorations, never opacity on content sections.
 * - `[data-marquee]` tracks speed up with the scroll velocity.
 */
export function createMobileEffects({ legacyWideTouch = false }: { legacyWideTouch?: boolean } = {}) {
  let resetMarquee: (() => void) | undefined;
  gsap.utils.toArray<HTMLElement>(legacyWideTouch ? "[data-m-speed]" : "[data-m-speed]:not([data-m-text])").forEach((element) => {
    const distance = () => (Number(element.dataset.mSpeed) || 0) * window.innerHeight;
    if (!distance()) return;
    gsap.fromTo(
      element,
      { y: () => distance() },
      {
        y: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: SCRUB, invalidateOnRefresh: true },
      },
    );
  });

  if (!legacyWideTouch) gsap.utils.toArray<HTMLElement>("[data-speed]:not([data-m-speed])").forEach((element) => {
    const speed = Number.parseFloat((element.dataset.speed ?? "").replace("clamp(", ""));
    if (!speed || speed === 1 || !element.getClientRects().length) return;
    // Document position without this tween's own offset, re-measured on every refresh.
    const top = () => element.getBoundingClientRect().top + window.scrollY - Number(gsap.getProperty(element, "y"));
    const start = () => Math.max(0, top() - window.innerHeight);
    const end = () => top() + element.offsetHeight;
    // Untouched when centred in the viewport — or at scroll 0 for the first screen, like ScrollSmoother's clamp().
    const rest = () => Math.max(0, top() + element.offsetHeight / 2 - window.innerHeight / 2);
    const offset = (scroll: number) => (1 - speed) * (scroll - rest());
    gsap.fromTo(element, { y: () => offset(start()) }, {
      y: () => offset(end()),
      ease: "none",
      scrollTrigger: { trigger: element, start, end, scrub: SCRUB, invalidateOnRefresh: true },
    });
  });

  gsap.utils.toArray<HTMLElement>(legacyWideTouch ? "[data-m-expand]" : "[data-m-media]").forEach((element) => {
    gsap.fromTo(
      element,
      { clipPath: legacyWideTouch ? "inset(0% 8% 0% 8% round 18px)" : "inset(0% 5% 0% 5%)" },
      {
        clipPath: legacyWideTouch ? "inset(0% 0% 0% 0% round 0px)" : "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "top 55%", scrub: 0.4 },
      },
    );
  });

  // Existing effects on wide touch screens are preserved; new depth is strictly narrow-only.
  if (legacyWideTouch) {
    gsap.utils.toArray<HTMLElement>("[data-m-recede]").forEach((section) => {
      gsap.to(section, { scale: 0.92, opacity: 0.35, transformOrigin: "50% 100%", ease: "none",
        scrollTrigger: { trigger: section, start: "bottom 90%", end: "bottom 15%", scrub: true } });
    });
  }
  if (!legacyWideTouch) gsap.utils.toArray<HTMLElement>("[data-m-depth]").forEach((element) => {
    gsap.fromTo(element, { scale: 0.94, y: 18 }, {
      scale: 1.02, y: -12, ease: "none",
      scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: SCRUB, invalidateOnRefresh: true },
    });
  });

  const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee]");
  if (tracks.length) {
    const boost = { rate: 1 };
    const apply = () => {
      tracks.forEach((track) => track.getAnimations().forEach((animation) => (animation.playbackRate = boost.rate)));
    };
    resetMarquee = () => {
      gsap.killTweensOf(boost);
      boost.rate = 1;
      apply();
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
  return () => resetMarquee?.();
}
