'use client';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { mediaQueries } from './media-queries';

gsap.registerPlugin(
	ScrollTrigger,
	ScrollSmoother,
	SplitText,
	Draggable,
	InertiaPlugin,
);

export { Draggable, gsap, ScrollSmoother, ScrollTrigger, SplitText };

/** Sprawdza tryb z ScrollSmootherem i parallaxą; poza przeglądarką zwraca `false`. */
export function isDesktop(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia(mediaQueries.desktopPointer).matches
	);
}
