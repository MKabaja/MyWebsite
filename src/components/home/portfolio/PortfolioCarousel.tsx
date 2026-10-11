"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { Draggable, gsap, ScrollTrigger } from "@/lib/gsap";
import { ProjectCard } from "./ProjectCard";
import styles from "./PortfolioCarousel.module.css";

/** Ambient drift in px per 60 fps frame. */
const AMBIENT_SPEED = 40 / 60;
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

  useEffect(() => {
    const viewport = viewportRef.current;
    const plane = planeRef.current;
    const track = trackRef.current;
    if (!viewport || !plane || !track) return;

    const cards = gsap.utils.toArray<HTMLElement>(track.children);
    const setters = cards.map((card) => gsap.quickSetter(card, "x", "px"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

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
    const render = () => {
      const offset = getX() + intro.x;
      setters.forEach((set, i) => set(wrap(i * step + offset)));
    };

    measure();
    render();

    let pressed = false;
    let drift = reducedMotion ? 0 : 1;
    const [draggable] = Draggable.create(proxy, {
      type: "x",
      trigger: viewport,
      inertia: true,
      minimumMovement: 6,
      allowNativeTouchScrolling: true,
      onPress() {
        pressed = true;
        draggedRef.current = false;
        drift = 0;
        gsap.killTweensOf(intro);
        viewport.dataset.pressed = "true";
      },
      onDragStart() {
        draggedRef.current = true;
      },
      onDrag: render,
      onThrowUpdate: render,
      onRelease() {
        pressed = false;
        delete viewport.dataset.pressed;
      },
    });

    // Ambient drift, eased back in after every interaction; frame-rate independent.
    const tick = () => {
      if (pressed || draggable.tween?.isActive()) return;
      if (!reducedMotion) {
        drift += (1 - drift) * 0.02 * gsap.ticker.deltaRatio();
        gsap.set(proxy, { x: (getX() - AMBIENT_SPEED * drift * gsap.ticker.deltaRatio()) % loopWidth });
      }
      render();
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
        if (isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    });
    videos.forEach((video) => videoObserver.observe(video));

    const onResize = () => {
      measure();
      render();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      // The plane slowly straightens while the section scrolls through the viewport.
      gsap.fromTo(
        plane,
        mobile
          ? { rotationX: 26, rotationY: -8, rotationZ: -11, yPercent: 6 }
          : { rotationX: 34, rotationY: -16, rotationZ: -13, yPercent: 8 },
        {
          ...(mobile
            ? { rotationX: 14, rotationY: -4, rotationZ: -5, yPercent: -4 }
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
        .fromTo(intro, { x: () => viewport.offsetWidth * 0.9 }, { x: 0, duration: 2.4, ease: "expo.out", onUpdate: render }, 0)
        .from(
          track.querySelectorAll("a"),
          { autoAlpha: 0, z: -260, duration: 1.6, ease: "expo.out", stagger: 0.07, clearProps: "transform,opacity,visibility" },
          0,
        );
    }, viewport);
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      sectionObserver.disconnect();
      videoObserver.disconnect();
      window.removeEventListener("resize", onResize);
      draggable.kill();
      gsap.killTweensOf([proxy, intro]);
    };
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport} role="region" aria-label={t("carousel")}>
      <div ref={planeRef} className={styles.plane}>
        <ul ref={trackRef} className={styles.track}>
          {slides.map(({ project, index, copy }) => (
            <ProjectCard
              key={`${project.slug}-${copy}`}
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
  );
}
