'use client';

import { useEffect, useRef } from 'react';
import { subscribeTilt } from '@/features/projects/utils/device-tilt';
import { gsap, ScrollTrigger } from '@/shared/lib/gsap';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';

const MAX_TILT_IN_DEGREES = 7;
const MAX_SCROLL_TILT_IN_DEGREES = 6;

export function useProjectTilt() {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;
		if (matchesMedia(mediaQueries.reducedMotion)) return;
		if (!matchesMedia(mediaQueries.hoverPointer)) return tiltOnTouch(card);
		return tiltOnPointer(card);
	}, []);

	return cardRef;
}

function tiltOnPointer(card: HTMLElement) {
	const { rotateX, rotateY } = createTiltRotators(card);

	function onMove(event: PointerEvent) {
		const rect = card.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		rotateY(x * MAX_TILT_IN_DEGREES * 2);
		rotateX(-y * MAX_TILT_IN_DEGREES * 2);
	}

	function onLeave() {
		rotateX(0);
		rotateY(0);
	}

	card.addEventListener('pointermove', onMove);
	card.addEventListener('pointerleave', onLeave);
	return () => {
		card.removeEventListener('pointermove', onMove);
		card.removeEventListener('pointerleave', onLeave);
		resetTilt(card);
	};
}

function tiltOnTouch(card: HTMLElement) {
	const { rotateX, rotateY } = createTiltRotators(card);
	const tiltState = { scroll: 0, tiltX: 0, tiltY: 0 };

	function applyTilt() {
		rotateX(tiltState.scroll + tiltState.tiltY * MAX_TILT_IN_DEGREES);
		rotateY(tiltState.tiltX * MAX_TILT_IN_DEGREES);
	}

	const trigger = ScrollTrigger.create({
		trigger: card,
		start: 'top bottom',
		end: 'bottom top',
		onUpdate: ({ progress }) => {
			tiltState.scroll = (0.5 - progress) * 2 * MAX_SCROLL_TILT_IN_DEGREES;
			applyTilt();
		},
	});

	let unsubscribe: (() => void) | undefined;
	const observer = new IntersectionObserver(([entry]) => {
		unsubscribe?.();
		unsubscribe = entry.isIntersecting
			? subscribeTilt(({ x, y }) => {
					tiltState.tiltX = x;
					tiltState.tiltY = y;
					applyTilt();
				})
			: undefined;
	});
	observer.observe(card);

	return () => {
		observer.disconnect();
		unsubscribe?.();
		trigger.kill();
		resetTilt(card);
	};
}

function createTiltRotators(card: HTMLElement) {
	gsap.set(card, { transformPerspective: 900 });
	return {
		rotateX: gsap.quickTo(card, 'rotationX', {
			duration: 0.6,
			ease: 'power3.out',
		}),
		rotateY: gsap.quickTo(card, 'rotationY', {
			duration: 0.6,
			ease: 'power3.out',
		}),
	};
}

function resetTilt(card: HTMLElement) {
	gsap.killTweensOf(card);
	gsap.set(card, { clearProps: 'transform' });
}
