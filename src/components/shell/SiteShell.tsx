"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "@/i18n/navigation";
import { getRouteKind, showsBottomBar, showsNavigation } from "@/lib/routes";
import { PageFrame } from "@/components/transition/PageFrame";
import { Presence } from "@/components/transition/Presence";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { BottomBar } from "./BottomBar";
import { NavMenu } from "./NavMenu";
import { Preloader } from "./Preloader";
import { RouteEffects } from "./RouteEffects";

const Hero = dynamic(() => import("@/components/hero/Hero"), { ssr: false });
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

const CHROME_TIMEOUT = { enter: 2500, leave: 1000 };

export function SiteShell({ children }: { children: ReactNode }) {
  const kind = getRouteKind(usePathname());

  return (
    <TransitionProvider>
      <RouteEffects />
      <Hero />
      <main>
        <Presence show={showsNavigation(kind)} name="navigation" timeout={CHROME_TIMEOUT}>
          {(className) => <NavMenu className={className} />}
        </Presence>

        <PageFrame>{children}</PageFrame>

        <Presence show={showsBottomBar(kind)} name="bottom-bar" timeout={CHROME_TIMEOUT}>
          {(className) => <BottomBar className={className} />}
        </Presence>

        <Preloader />
      </main>
      <Cursor />
    </TransitionProvider>
  );
}
