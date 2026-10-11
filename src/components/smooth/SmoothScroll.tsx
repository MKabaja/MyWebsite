"use client";

import { useEffect, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { gsap, isDesktop, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { createMobileEffects } from "./mobileEffects";

/** Delay before gliding to a `#section` after arriving from another page, so the page is seen first. */
const ANCHOR_DELAY = 1500;

/** Desktop smoothing, native mobile effects and anchors, recreated per route and viewport mode. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const media = gsap.matchMedia();
    let initial = true;
    media.add({
      desktop: "(min-width: 992px) and (pointer: fine)",
      wide: "(min-width: 992px)",
      narrow: "(max-width: 991px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const narrow = Boolean(context.conditions?.narrow);
      const reducedMobile = narrow && Boolean(context.conditions?.reduced);
      const smoother = isDesktop()
        ? ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 2,
            effects: true, normalizeScroll: false })
        : null;
      // Route entry resets; crossing a breakpoint keeps the current reading position.
      const entry = initial;
      if (entry) window.scrollTo(0, 0);
      initial = false;
      const cleanMobile = !smoother && !context.conditions?.reduced
        ? createMobileEffects({ legacyWideTouch: !narrow }) : undefined;
      if (!reducedMobile) {
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((element) => {
          gsap.fromTo(element,
            narrow ? { opacity: 1, y: 16 } : {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 50,
            }, {
              ...(narrow ? {} : { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }),
              opacity: 1, y: 0, duration: narrow ? 0.7 : 1.2, ease: "power2.out",
              clearProps: narrow ? "transform" : "clipPath",
              scrollTrigger: { trigger: element, start: "top bottom-=100", once: true },
            });
        });
      }
      ScrollTrigger.refresh();

      let jumpTimer = 0;
      let glide: gsap.core.Tween | undefined;
      const findTarget = () => {
        try { return document.getElementById(decodeURIComponent(window.location.hash.slice(1))); }
        catch { return null; }
      };
      // Native scroll gets a tween instead of `scroll-behavior`, so phones glide like the desktop smoother.
      const glideTo = (target: HTMLElement) => {
        if (smoother) return void smoother.scrollTo(target, true, "top top");
        const targetTop = () => target.getBoundingClientRect().top + window.scrollY;
        glide?.kill();
        if (reducedMobile) return window.scrollTo(0, targetTop());
        const from = window.scrollY;
        const state = { progress: 0 };
        glide = gsap.to(state, {
          progress: 1, duration: 1.6, ease: "power3.inOut",
          onUpdate: () => window.scrollTo(0, from + (targetTop() - from) * state.progress),
        });
      };
      const jump = (attempt = 0) => {
        const target = findTarget();
        if (!target) {
          if (window.location.hash && attempt < 10) jumpTimer = window.setTimeout(() => jump(attempt + 1), 100);
          return;
        }
        ScrollTrigger.refresh();
        glideTo(target);
      };
      const scheduleJump = (delay = 0) => {
        window.clearTimeout(jumpTimer);
        jumpTimer = window.setTimeout(() => jump(), delay);
      };
      const onAnchor = () => scheduleJump();
      // Arriving from another page (e.g. "/#contact"): show the top first, then glide down to the section.
      if (entry && window.location.hash) scheduleJump(ANCHOR_DELAY);
      // Any touch / wheel / key from the user cancels a pending or running glide.
      const cancelGlide = () => {
        window.clearTimeout(jumpTimer);
        glide?.kill();
      };
      const userInput = ["wheel", "touchstart", "keydown"] as const;
      userInput.forEach((type) => window.addEventListener(type, cancelGlide, { passive: true }));

      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        const link = (event.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
        if (!link?.hash) return;
        let section: HTMLElement | null = null;
        try { section = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch { return; }
        if (!section) return;
        event.preventDefault();
        cancelGlide();
        glideTo(section);
        history.replaceState(history.state, "", link.hash);
      };
      document.addEventListener("click", onClick);
      window.addEventListener("hashchange", onAnchor);
      window.addEventListener("site:anchor", onAnchor);

      // Autoplay never races the mobile reduced-motion setting, including late video readiness.
      const videos = reducedMobile ? Array.from(document.querySelectorAll<HTMLVideoElement>("video")) : [];
      const autoplay = videos.map((video) => video.autoplay);
      const frameListeners = new Map<HTMLVideoElement, () => void>();
      const stopVideo = (event: Event) => (event.currentTarget as HTMLVideoElement).pause();
      videos.forEach((video) => {
        video.autoplay = false;
        video.pause();
        if (!video.poster) {
          const showFrame = () => { if (video.duration > 1) video.currentTime = 1; };
          if (video.readyState >= 1) showFrame();
          else {
            frameListeners.set(video, showFrame);
            video.addEventListener("loadedmetadata", showFrame, { once: true });
          }
          video.addEventListener("play", stopVideo);
        } else video.addEventListener("play", stopVideo);
      });
      return () => {
        cleanMobile?.();
        cancelGlide();
        userInput.forEach((type) => window.removeEventListener(type, cancelGlide));
        document.removeEventListener("click", onClick);
        window.removeEventListener("hashchange", onAnchor);
        window.removeEventListener("site:anchor", onAnchor);
        videos.forEach((video, index) => {
          video.removeEventListener("play", stopVideo);
          const listener = frameListeners.get(video);
          if (listener) video.removeEventListener("loadedmetadata", listener);
          video.autoplay = autoplay[index];
        });
        smoother?.kill();
      };
    });
    return () => media.revert();
  }, [pathname, locale]);

  return <div id="smooth-wrapper"><div id="smooth-content">{children}</div></div>;
}
