"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { Draggable, gsap, ScrollTrigger } from "@/lib/gsap";
import { ProjectCard } from "./ProjectCard";
import styles from "./PortfolioCarousel.module.css";

/** Ambient drift in px per 60 fps frame. */
const AMBIENT_SPEED = 40 / 60;
/** Phones: the drift comes back this long (s) after the last swipe / arrow tap, so a card can be read. */
const RESUME_DELAY = 3;
/** The infinite loop needs enough cards to always cover the tilted plane. */
const MIN_CARDS = 6;

const repeats = Math.max(1, Math.ceil(MIN_CARDS / projects.length));
const slides = Array.from({ length: repeats }, (_, copy) =>
  projects.map((project, index) => ({ project, index, copy })),
).flat();

/** Infinite draggable strip of project cards laid on a tilted 3D plane. */
export function PortfolioCarousel() {
  const t = useTranslations("home.portfolio");
  const viewportRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const draggedRef = useRef(false);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const moveRef = useRef<((direction: number) => void) | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const plane = planeRef.current;
    const track = trackRef.current;
    if (!viewport || !plane || !track) return;

    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 991px)", wide: "(min-width: 992px)",
      reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const cards = gsap.utils.toArray<HTMLElement>(track.children);
      const setters = cards.map((card) => gsap.quickSetter(card, "x", "px"));
      const reducedMotion = Boolean(context.conditions?.reduced);
      const mobile = Boolean(context.conditions?.mobile);
      const reducedMobile = mobile && reducedMotion;

      // Card width comes from CSS (--card-w); the loop is re-measured on resize.
      let step = 0;
      let loopWidth = 0;
      let wrap = gsap.utils.wrap(0, 1);
      const measure = () => {
        const width = cards[0].offsetWidth;
        step = width + Math.max(12, width * 0.025);
        loopWidth = step * cards.length;
        wrap = gsap.utils.wrap(-step, loopWidth - step);
      };

      const proxy = document.createElement("div");
      const proxyProps = gsap.getProperty(proxy);
      const getX = () => Number(proxyProps("x")) || 0;
      const intro = { x: 0 };
      // Phones have no hover: the card closest to the centre gets the desktop hover "lift".
      let active: HTMLElement | undefined;
      const render = () => {
        const centre = mobile ? (viewport.offsetWidth - cards[0].offsetWidth) / 2 : 0;
        const offset = getX() + intro.x + centre;
        let closest = Infinity;
        let nearest: HTMLElement | undefined;
        cards.forEach((card, i) => {
          const x = wrap(i * step + offset);
          setters[i](x);
          if (Math.abs(x - centre) < closest) [closest, nearest] = [Math.abs(x - centre), card];
        });
        if (!mobile || nearest === active) return;
        delete active?.dataset.active;
        active = nearest;
        if (active) active.dataset.active = "";
      };

      const updateCurrent = () => {
        const index = ((-Math.round(getX() / step) % projects.length) + projects.length) % projects.length;
        if (index === currentRef.current) return;
        currentRef.current = index;
        setCurrent(index);
      };
      measure();
      if (mobile) gsap.set(proxy, { x: -currentRef.current * step });
      render();

      let pressed = false;
      let drift = reducedMotion ? 0 : 1;
      let resumeAt = 0;
      const pause = () => {
        drift = 0;
        resumeAt = gsap.ticker.time + (mobile ? RESUME_DELAY : 0);
      };
      // Phones: a swipe lands on a card, and the strip leans into fast swipes.
      const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
      const lean = (deltaX: number) => {
        if (mobile && !reducedMotion) skew(gsap.utils.clamp(-4, 4, deltaX * -0.2));
      };
      const [draggable] = Draggable.create(proxy, {
        type: "x",
        trigger: viewport,
        inertia: !reducedMobile,
        minimumMovement: 6,
        allowNativeTouchScrolling: true,
        snap: mobile ? { x: (value: number) => Math.round(value / step) * step } : undefined,
        onPress() {
          pressed = true;
          draggedRef.current = false;
          pause();
          gsap.killTweensOf([intro, proxy]);
          intro.x = 0;
          render();
          viewport.dataset.pressed = "true";
        },
        onDragStart() {
          draggedRef.current = true;
        },
        onDrag() {
          render();
          lean(this.deltaX);
        },
        onThrowUpdate() {
          render();
          lean(this.deltaX);
        },
        onThrowComplete() {
          updateCurrent();
          lean(0);
        },
        onRelease() {
          lean(0);
          pressed = false;
          pause();
          delete viewport.dataset.pressed;
          if (reducedMobile) {
            gsap.set(proxy, { x: Math.round(getX() / step) * step });
            render();
            this.update();
          }
          if (mobile) updateCurrent();
        },
      });

      moveRef.current = (direction) => {
        if (!mobile) return;
        gsap.killTweensOf([intro, proxy]);
        intro.x = 0;
        draggedRef.current = false;
        pause();
        gsap.to(proxy, { x: (Math.round(getX() / step) - direction) * step,
          duration: reducedMobile ? 0 : 0.45, ease: "power3.out", onUpdate: render,
          onComplete: () => { draggable.update(); updateCurrent(); } });
      };
      const onFocus = (event: FocusEvent) => {
        if (!mobile) return;
        const slide = (event.target as Element).closest<HTMLElement>("[data-slide-index]");
        if (!slide) return;
        pause();
        gsap.killTweensOf([intro, proxy]);
        intro.x = 0;
        gsap.set(proxy, { x: -Number(slide.dataset.slideIndex) * step });
        render(); draggable.update(); updateCurrent();
      };
      track.addEventListener("focusin", onFocus);

      // Ambient drift, eased back in after every interaction (on phones after a pause); frame-rate independent.
      const tick = () => {
        if (pressed || draggable.tween?.isActive() || gsap.isTweening(proxy)) return;
        if (!reducedMotion && gsap.ticker.time >= resumeAt) {
          drift += (1 - drift) * 0.02 * gsap.ticker.deltaRatio();
          gsap.set(proxy, { x: (getX() - AMBIENT_SPEED * drift * gsap.ticker.deltaRatio()) % loopWidth });
        }
        render();
        if (mobile) updateCurrent();
      };

      // Only animate (and play videos) while the section is on screen.
      let running = false;
      const sectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting === running) return;
        running = entry.isIntersecting;
        if (running) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      });
      sectionObserver.observe(viewport);

      const videos = Array.from(track.querySelectorAll("video"));
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          if (isIntersecting && !reducedMobile) video.play().catch(() => {});
          else video.pause();
        });
      });
      videos.forEach((video) => videoObserver.observe(video));

      const onResize = () => {
        const index = step ? Math.round(getX() / step) : 0;
        measure();
        if (mobile) {
          gsap.killTweensOf(proxy);
          gsap.set(proxy, { x: index * step });
          draggable.update();
        }
        render();
      };
      window.addEventListener("resize", onResize);

      const ctx = gsap.context(() => {
        if (reducedMobile) return;
        // The plane slowly straightens while the section scrolls through the viewport.
        gsap.fromTo(
          plane,
          mobile
            ? { rotationX: 24, rotationY: -8, rotationZ: -9, yPercent: 3 }
            : { rotationX: 34, rotationY: -16, rotationZ: -13, yPercent: 8 },
          {
            ...(mobile
              ? { rotationX: 14, rotationY: -4, rotationZ: -5, yPercent: -3 }
              : { rotationX: 18, rotationY: -8, rotationZ: -6, yPercent: -6 }),
            ease: "none",
            scrollTrigger: { trigger: viewport, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        if (reducedMotion) return;
        // Entrance: the strip slides in from the right and the cards rise into place.
        const enter = gsap.timeline({
          scrollTrigger: { trigger: viewport, start: "top 75%", once: true },
        });
        enter
          .fromTo(intro, { x: () => viewport.offsetWidth * (mobile ? 0.18 : 0.9) }, { x: 0, duration: mobile ? 0.9 : 2.4, ease: "expo.out", onUpdate: render }, 0)
          .from(
            track.querySelectorAll("a"),
            { autoAlpha: mobile ? 1 : 0, z: mobile ? -60 : -260, duration: mobile ? 0.8 : 1.6,
              ease: "expo.out", stagger: 0.07, clearProps: "transform,opacity,visibility" },
            0,
          );
      }, viewport);
      ScrollTrigger.refresh();

      return () => {
        moveRef.current = null;
        track.removeEventListener("focusin", onFocus);
        delete viewport.dataset.pressed;
        delete active?.dataset.active;
        ctx.revert();
        gsap.ticker.remove(tick);
        sectionObserver.disconnect();
        videoObserver.disconnect();
        window.removeEventListener("resize", onResize);
        draggable.kill();
        gsap.killTweensOf([proxy, intro, track]);
      };
    }, viewport);
    return () => media.revert();
  }, []);

  return (
    <>
      <div ref={viewportRef} data-m-carousel className={styles.viewport} role="region" aria-label={t("carousel")}>
        <div ref={planeRef} className={styles.plane}>
          <ul ref={trackRef} className={styles.track}>
            {slides.map(({ project, index, copy }) => (
              <ProjectCard
                key={`${project.slug}-${copy}`}
                slideIndex={copy * projects.length + index}
                project={project}
                index={index}
                total={projects.length}
                isDuplicate={copy > 0}
                wasDragged={() => draggedRef.current}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.controls}>
        <button data-m-carousel-prev type="button" onClick={() => moveRef.current?.(-1)} aria-label={t("previous")}>
          <ArrowLeft size={20} aria-hidden />
        </button>
        <p data-m-carousel-current aria-live="polite" aria-atomic="true">
          {t("current", { index: current + 1, total: projects.length, title: projects[current].title })}
        </p>
        <button data-m-carousel-next type="button" onClick={() => moveRef.current?.(1)} aria-label={t("next")}>
          <ArrowRight size={20} aria-hidden />
        </button>
      </div>
    </>
  );
}
