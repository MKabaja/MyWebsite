'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/shared/lib/gsap';
import { mediaQueries } from '@/shared/lib/media-queries';
import { ORBIT_RADIUS_X, ORBIT_RADIUS_Y } from './react-spotlight.constants';

export function useSpotlightAnimation() {
	const rootRef = useRef<HTMLDivElement>(null);
	const atomRef = useRef<SVGGElement>(null);
	const dotRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		const atom = atomRef.current;
		const dot = dotRef.current;
		if (!root || !atom || !dot) return;
		const media = gsap.matchMedia();
		media.add(
			{
				narrow: mediaQueries.narrow,
				wide: mediaQueries.wide,
				reduced: mediaQueries.reducedMotion,
			},
			(context) => {
				if (context.conditions?.reduced) return;
				const animationContext = gsap.context(() => {
					spinAtom(atom, root);
					orbitDot(dot, root);
				}, root);
				return () => animationContext.revert();
			},
			root,
		);
		return () => media.revert();
	}, []);

	return { rootRef, atomRef, dotRef };
}

function spinAtom(atom: SVGGElement, root: HTMLElement) {
	gsap.to(atom, {
		rotation: 360,
		svgOrigin: '0 0',
		duration: 60,
		ease: 'none',
		repeat: -1,
		scrollTrigger: createInViewTrigger(root),
	});
}

function orbitDot(dot: SVGCircleElement, root: HTMLElement) {
	const orbit = { angle: 0 };
	gsap.to(orbit, {
		angle: Math.PI * 2,
		duration: 4.5,
		ease: 'none',
		repeat: -1,
		scrollTrigger: createInViewTrigger(root),
		onUpdate: () => {
			dot.setAttribute(
				'cx',
				(ORBIT_RADIUS_X * Math.cos(orbit.angle)).toFixed(2),
			);
			dot.setAttribute(
				'cy',
				(ORBIT_RADIUS_Y * Math.sin(orbit.angle)).toFixed(2),
			);
		},
	});
}

function createInViewTrigger(root: HTMLElement) {
	return {
		trigger: root,
		start: 'top bottom',
		end: 'bottom top',
		toggleActions: 'play pause resume pause',
	};
}
