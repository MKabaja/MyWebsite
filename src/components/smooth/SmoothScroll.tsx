"use client";

import { useEffect, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { gsap, isDesktop, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

/**
 * GSAP ScrollSmoother around the page (desktop only — touch keeps native scrolling).
 * `data-speed` / `data-lag` on any element give it parallax; `data-fade` reveals it once
 * when it scrolls into view. Recreated per route so new content gets its effects.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const smoother = isDesktop()
      ? ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2,
          effects: true,
          normalizeScroll: false,
        })
      : null;
    // Land on `#section` when navigating to e.g. "/#contact", otherwise start at the top.
    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 50 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            clearProps: "clipPath",
            scrollTrigger: { trigger: element, start: "top bottom-=100", once: true },
          },
        );
      });
    });
    ScrollTrigger.refresh();
    if (target) {
      if (smoother) smoother.scrollTo(target, false, "top top");
      else target.scrollIntoView();
    }

    // In-page anchors glide with the smoother instead of jumping.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      const section = link && document.querySelector(link.hash);
      if (!section) return;
      event.preventDefault();
      if (smoother) smoother.scrollTo(section, true, "top top");
      else section.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", link.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      smoother?.kill();
    };
  }, [pathname, locale]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
