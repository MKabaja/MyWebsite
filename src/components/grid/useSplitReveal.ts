"use client";

import { useEffect, type RefObject } from "react";
import { gsap, SplitText } from "@/lib/gsap";

/** Word-by-word reveal of a heading (SplitText), on mount or when scrolled into view. */
export function useSplitReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0.4, onScroll = false }: { delay?: number; onScroll?: boolean } = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create(element, { type: "words" });
      gsap.from(split.words, {
        duration: 1.5,
        y: 20,
        autoAlpha: 0,
        stagger: 0.08,
        delay,
        ease: "power3.out",
        scrollTrigger: onScroll ? { trigger: element, start: "top bottom-=100", once: true } : undefined,
      });
    });
    return () => ctx.revert();
  }, [ref, delay, onScroll]);
}
