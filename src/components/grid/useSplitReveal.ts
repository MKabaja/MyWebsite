"use client";

import { useEffect, type RefObject } from "react";
import { gsap, isDesktop, SplitText } from "@/lib/gsap";

/**
 * Word-by-word reveal of a heading (SplitText), on mount or when scrolled into view.
 * On touch screens the scroll variant is scrubbed, so the words follow the finger.
 */
export function useSplitReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0.4, onScroll = false }: { delay?: number; onScroll?: boolean } = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ narrow: "(max-width: 991px)", reduced: "(prefers-reduced-motion: reduce)",
      wide: "(min-width: 992px)" }, (context) => {
      if (context.conditions?.narrow && context.conditions?.reduced) return;
      const split = SplitText.create(element, { type: "words" });
      if (onScroll && !isDesktop()) {
        gsap.from(split.words, {
          y: 24,
          autoAlpha: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", end: "top 55%", scrub: 0.5 },
        });
        return;
      }
      gsap.from(split.words, {
        duration: 1.5,
        y: 20,
        autoAlpha: 0,
        stagger: 0.08,
        delay,
        ease: "power3.out",
        scrollTrigger: onScroll ? { trigger: element, start: "top bottom-=100", once: true } : undefined,
      });
    }, element);
    return () => media.revert();
  }, [ref, delay, onScroll]);
}
