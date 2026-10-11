"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Draggable, InertiaPlugin, Observer);

export { gsap, Draggable, InertiaPlugin, Observer, ScrollSmoother, ScrollTrigger, SplitText };

/** Desktop pointer + wide enough viewport: smooth scrolling, parallax and the full shader. */
export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 992px) and (pointer: fine)").matches;
