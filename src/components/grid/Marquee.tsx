import type { ReactNode } from "react";
import styles from "./Marquee.module.css";

/** Infinite horizontal marquee. Content is repeated `repeat` times and the track loops at 50%. */
export function Marquee({
  children,
  repeat = 6,
  duration = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  repeat?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  // Two identical halves, so translating by -50% loops seamlessly.
  const items = Array.from({ length: repeat * 2 }, (_, i) => (
    <span key={i} className={styles.item} aria-hidden={i > 0}>
      {children}
    </span>
  ));

  return (
    <div className={`${styles.marquee} ${className}`}>
      <div className={styles.track} style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {items}
      </div>
    </div>
  );
}
