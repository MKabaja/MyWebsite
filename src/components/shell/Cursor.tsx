"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "@/i18n/navigation";

const STARTING_SIZE = 22;
const HOVER_SIZES = [
  { className: "mouse-lg", size: 200 },
  { className: "mouse-md", size: 100 },
  { className: "mouse-sm", size: 60 },
] as const;

/** Blend-mode cursor that eases after the pointer and grows over `.mouse-*` elements. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  // Stable mutable object tweened by GSAP; never rendered directly.
  const [size] = useState(() => ({ value: STARTING_SIZE }));
  const pathname = usePathname();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const target = { x: 0, y: 0 };
    const output = { x: 0, y: 0 };
    let visible = false;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        output.x = target.x;
        output.y = target.y;
        element.dataset.visible = "true";
      }
    };

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.3, gsap.ticker.deltaRatio());
      output.x += (target.x - output.x) * dt;
      output.y += (target.y - output.y) * dt;
      const current = size.value;
      element.style.width = `${current}px`;
      element.style.height = `${current}px`;
      element.style.transform = `translate(${Math.round(output.x - current / 2)}px, ${Math.round(output.y - current / 2) + 1}px)`;
    };

    const tweenTo = (value: number, duration: number) => {
      gsap.killTweensOf(size);
      gsap.to(size, { duration, value });
    };

    // Grow only when entering / leaving the `.mouse-*` element itself, not when moving between its children.
    const onOver = (event: MouseEvent) => {
      for (const { className, size: hoverSize } of HOVER_SIZES) {
        const hovered = (event.target as Element).closest?.(`.${className}`);
        if (hovered && !hovered.contains(event.relatedTarget as Node | null)) tweenTo(hoverSize, 0.2);
      }
    };
    const onOut = (event: MouseEvent) => {
      for (const { className } of HOVER_SIZES) {
        const left = (event.target as Element).closest?.(`.${className}`);
        if (left && !left.contains(event.relatedTarget as Node | null)) tweenTo(STARTING_SIZE, 0.1);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseover", onOver);
    document.body.addEventListener("mouseout", onOut);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseover", onOver);
      document.body.removeEventListener("mouseout", onOut);
      gsap.ticker.remove(tick);
      gsap.killTweensOf(size);
    };
  }, [size]);

  // Reset the cursor size when the route changes.
  useEffect(() => {
    gsap.killTweensOf(size);
    gsap.to(size, { duration: 0.1, value: STARTING_SIZE });
  }, [pathname, size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-10000 hidden rounded-full border-2 border-white bg-white opacity-0 mix-blend-difference backdrop-grayscale transition-opacity duration-300 ease-in-out data-[visible=true]:opacity-100 xl:block"
    />
  );
}
