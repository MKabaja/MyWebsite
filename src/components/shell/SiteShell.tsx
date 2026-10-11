"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { PageFrame } from "@/components/transition/PageFrame";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { SmoothScroll } from "@/components/smooth/SmoothScroll";
import { CornerMarks } from "./CornerMarks";
import { Preloader } from "./Preloader";

const ShaderBackground = dynamic(() => import("@/components/background/ShaderBackground"), { ssr: false });
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      <ShaderBackground />
      <CornerMarks />
      <SmoothScroll>
        <PageFrame>{children}</PageFrame>
      </SmoothScroll>
      <Preloader />
      <Cursor />
    </TransitionProvider>
  );
}
