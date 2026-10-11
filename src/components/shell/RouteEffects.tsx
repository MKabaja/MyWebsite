"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "@/i18n/navigation";
import { getBodyClasses, getRouteKind } from "@/lib/routes";

/** Body classes per route (Nuxt `bodyAttrs`) and AOS (re)initialisation. */
export function RouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ offset: -100, duration: 800, easing: "ease-in-out-cubic", once: true });
  }, []);

  useEffect(() => {
    const classes = getBodyClasses(getRouteKind(pathname));
    document.body.classList.add(...classes);
    window.scrollTo(0, 0);
    AOS.refreshHard();
    return () => document.body.classList.remove(...classes);
  }, [pathname]);

  return null;
}
