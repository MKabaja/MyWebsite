'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';
import { gsap } from '@/shared/lib/gsap';

type CursorSize = {
	value: number;
};

const STARTING_SIZE_IN_PIXELS = 22;
const POINTER_FOLLOW_RATE = 0.3;
const GROW_DURATION_IN_SECONDS = 0.2;
const SHRINK_DURATION_IN_SECONDS = 0.1;
const HOVER_SIZES = [
	{ selector: '.mouse-lg', sizeInPixels: 200 },
	{ selector: '.mouse-md', sizeInPixels: 100 },
	{ selector: '.mouse-sm', sizeInPixels: 60 },
] as const;

export function useCursor() {
	const cursorRef = useRef<HTMLDivElement>(null);
	const sizeRef = useRef<CursorSize>({ value: STARTING_SIZE_IN_PIXELS });
	const pathname = usePathname();

	useEffect(() => {
		const element = cursorRef.current;
		if (!element) return;
		return followPointer(element, sizeRef.current);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: efekt ma się uruchomić ponownie przy zmianie trasy
	useEffect(() => {
		tweenSize(
			sizeRef.current,
			STARTING_SIZE_IN_PIXELS,
			SHRINK_DURATION_IN_SECONDS,
		);
	}, [pathname]);

	return cursorRef;
}

function followPointer(element: HTMLDivElement, size: CursorSize) {
	const target = { x: 0, y: 0 };
	const output = { x: 0, y: 0 };
	let isVisible = false;

	function handleMouseMove(event: MouseEvent) {
		target.x = event.clientX;
		target.y = event.clientY;
		if (isVisible) return;
		isVisible = true;
		output.x = target.x;
		output.y = target.y;
		element.dataset.visible = 'true';
	}

	function tick() {
		const followStep =
			1.0 - (1.0 - POINTER_FOLLOW_RATE) ** gsap.ticker.deltaRatio();
		output.x += (target.x - output.x) * followStep;
		output.y += (target.y - output.y) * followStep;
		const current = size.value;
		element.style.width = `${current}px`;
		element.style.height = `${current}px`;
		element.style.transform = `translate(${Math.round(output.x - current / 2)}px, ${Math.round(output.y - current / 2) + 1}px)`;
	}

	function handleMouseOver(event: MouseEvent) {
		for (const { selector, sizeInPixels } of HOVER_SIZES) {
			if (crossesBoundaryOf(selector, event)) {
				tweenSize(size, sizeInPixels, GROW_DURATION_IN_SECONDS);
			}
		}
	}

	function handleMouseOut(event: MouseEvent) {
		for (const { selector } of HOVER_SIZES) {
			if (crossesBoundaryOf(selector, event)) {
				tweenSize(size, STARTING_SIZE_IN_PIXELS, SHRINK_DURATION_IN_SECONDS);
			}
		}
	}

	window.addEventListener('mousemove', handleMouseMove, { passive: true });
	document.body.addEventListener('mouseover', handleMouseOver);
	document.body.addEventListener('mouseout', handleMouseOut);
	gsap.ticker.add(tick);

	return () => {
		window.removeEventListener('mousemove', handleMouseMove);
		document.body.removeEventListener('mouseover', handleMouseOver);
		document.body.removeEventListener('mouseout', handleMouseOut);
		gsap.ticker.remove(tick);
		gsap.killTweensOf(size);
	};
}

function tweenSize(size: CursorSize, value: number, durationInSeconds: number) {
	gsap.killTweensOf(size);
	gsap.to(size, { duration: durationInSeconds, value });
}

function crossesBoundaryOf(
	selector: string,
	{ target, relatedTarget }: MouseEvent,
) {
	if (!(target instanceof Element)) return false;
	const element = target.closest(selector);
	if (!element) return false;
	return !element.contains(
		relatedTarget instanceof Node ? relatedTarget : null,
	);
}
