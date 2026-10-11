"use client";

import { useEffect, useState } from "react";

/** Full-screen overlay that slides away once the app has mounted. */
export function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-9998 bg-ink backface-hidden transition-all duration-1500 ease-[cubic-bezier(0.4,0,0,1)] ${
        loaded ? "pointer-events-none -translate-x-full" : "translate-x-0"
      }`}
    />
  );
}
