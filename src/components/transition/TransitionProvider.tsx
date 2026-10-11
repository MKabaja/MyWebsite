"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getRouteKind, pageTimings } from "@/lib/routes";

type NavigateOptions = { locale?: Locale };

type TransitionContextValue = {
  /** Leave the current page with its out-animation, then navigate (Nuxt `mode="out-in"`). */
  navigate: (href: string, options?: NavigateOptions) => void;
  isLeaving: boolean;
  /** False until the first client-side navigation, so the initial load is not animated. */
  hasNavigated: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const currentKey = `${locale}:${pathname}`;

  const [leavingFrom, setLeavingFrom] = useState<string | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  // The leave phase ends by itself once the route (or locale) actually changes.
  const isLeaving = leavingFrom === currentKey;

  const navigate = useCallback(
    (href: string, options: NavigateOptions = {}) => {
      const targetLocale = options.locale ?? locale;
      if (isLeaving || (href === pathname && targetLocale === locale)) return;
      const targetPath = href.split(/[?#]/)[0] || pathname;
      if (targetPath === pathname && targetLocale === locale && href.includes("#")) {
        router.push(href, { scroll: false });
        // pushState does not emit hashchange. Let the scroll owner settle the anchor.
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => window.dispatchEvent(new Event("site:anchor")), 0);
        return;
      }

      setHasNavigated(true);
      setLeavingFrom(currentKey);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (targetLocale !== locale) router.push(href, { locale: targetLocale, scroll: true });
        else router.push(href, { scroll: !href.includes("#") });
      }, pageTimings[getRouteKind(pathname)].leave);
    },
    [currentKey, isLeaving, locale, pathname, router],
  );

  useEffect(() => {
    const onPopState = () => {
      window.clearTimeout(timeoutRef.current);
      setLeavingFrom(null);
      setHasNavigated(true);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TransitionContext value={{ navigate, isLeaving, hasNavigated }}>{children}</TransitionContext>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("usePageTransition must be used inside <TransitionProvider>");
  return context;
}
