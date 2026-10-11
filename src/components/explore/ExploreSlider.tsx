"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { useLocale } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";
import styles from "./ExploreSlider.module.css";

gsap.registerPlugin(Draggable, InertiaPlugin, Observer);

const CARD_SPACING = 5;
const AMBIENT_SPEED = 40 / 60;
/** The infinite loop needs enough cards to always cover the viewport. */
const MIN_CARDS = 6;

const repeats = Math.max(1, Math.ceil(MIN_CARDS / projects.length));
const slides = Array.from({ length: repeats }, (_, copy) =>
  projects.map((project) => ({ project, copy })),
).flat();

export function ExploreSlider() {
  const locale = useLocale();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = gsap.utils.toArray<HTMLElement>(list.children);

    let wrapWidth = cards.reduce((width, card) => width + card.offsetWidth, 0);
    const widestCardWidth = Math.max(...cards.map((card) => card.offsetWidth));
    let position = 0;
    cards.forEach((card) => {
      gsap.set(card, { x: position, left: -widestCardWidth });
      position += card.offsetWidth + CARD_SPACING;
      wrapWidth += CARD_SPACING;
    });

    const proxy = document.createElement("div");
    const animation = gsap.to(cards, {
      x: `+=${wrapWidth}`,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: string) => parseFloat(x) % wrapWidth) },
    });

    const wrapProgress = gsap.utils.wrap(0, 1);
    const proxyProps = gsap.getProperty(proxy);
    const updateAnimation = () => {
      animation.progress(wrapProgress((Number(proxyProps("x")) + widestCardWidth) / wrapWidth));
    };

    let isInteracting = false;
    let frameId = 0;
    // Ambient drift while the user is not interacting.
    const updatePosition = () => {
      if (!isInteracting) {
        const currentX = Number(gsap.getProperty(proxy, "x")) || 0;
        gsap.set(proxy, { x: (currentX - AMBIENT_SPEED) % wrapWidth });
        updateAnimation();
      }
      frameId = requestAnimationFrame(updatePosition);
    };
    const pause = () => {
      isInteracting = true;
      cancelAnimationFrame(frameId);
    };
    const resume = () => {
      isInteracting = false;
      frameId = requestAnimationFrame(updatePosition);
    };

    const [draggable] = Draggable.create(proxy, {
      type: "x",
      trigger: list,
      inertia: true,
      onPress: pause,
      onRelease: resume,
      onThrowComplete: updateAnimation,
      onDrag: updateAnimation,
      onThrowUpdate: updateAnimation,
    });

    const wheelObserver = Observer.create({
      type: "wheel",
      onWheel: (self) => {
        gsap.to(proxy, {
          x: `+=${self.deltaY < 0 ? 1200 : -1200}`,
          onUpdate: updateAnimation,
          ease: "power1.out",
          duration: 0.5,
        });
      },
      preventDefault: true,
    });

    frameId = requestAnimationFrame(updatePosition);

    // Pointer position for the media parallax, exposed as CSS variables (no React renders).
    const onMouseMove = (event: MouseEvent) => {
      list.style.setProperty("--mouse-x", String(event.clientX / window.innerWidth));
      list.style.setProperty("--mouse-y", String(event.clientY / window.innerHeight));
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      wheelObserver.kill();
      animation.kill();
      draggable.kill();
      gsap.killTweensOf(proxy);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className={styles.slider}>
      <ul ref={listRef} className={styles.cards}>
        {slides.map(({ project, copy }, index) => (
          <li key={`${project.slug}-${copy}`} className={styles.card} aria-posinset={index} aria-setsize={slides.length}>
            <ProjectCover
              project={project}
              type={project.type[locale]}
              lead={project.lead[locale]}
              isDuplicate={copy > 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
