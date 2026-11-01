'use client';

import { useEffect } from 'react';
import { gsap, isDesktop } from '@/shared/lib/gsap';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';

const DESKTOP_START_WIDTH_PIXELS = 1280;
const TOUCH_TABLET_GUTTER_PIXELS = 32;
const MOBILE_START_SCALE = 0.86;
const MOBILE_PORTRAIT_START_SCALE = 1.18;
const MOBILE_MIN_SCROLL_PIXELS = 120;
const MOBILE_MAX_SCROLL_VIEWPORT_RATIO = 0.6;

export function useGridWidening() {
	useEffect(() => {
		const media = gsap.matchMedia();
		media.add(mediaQueries.wide, widenGridOnScroll);
		media.add(mediaQueries.narrowFullMotion, scaleHeroOnScroll);
		return () => media.revert();
	}, []);
}

function widenGridOnScroll() {
	const root = document.documentElement;
	const hasSmoothScroll = isDesktop();
	if (hasSmoothScroll && window.innerWidth <= DESKTOP_START_WIDTH_PIXELS)
		return;
	if (!hasSmoothScroll && matchesMedia(mediaQueries.reducedMotion)) return;
	const state = { progress: 0 };

	function getStartWidthInPixels() {
		return hasSmoothScroll
			? DESKTOP_START_WIDTH_PIXELS
			: window.innerWidth - TOUCH_TABLET_GUTTER_PIXELS;
	}

	function applyGridWidth() {
		const width =
			getStartWidthInPixels() +
			(window.innerWidth - getStartWidthInPixels()) * state.progress;
		root.style.setProperty('--grid-w', `${width}px`);
	}

	applyGridWidth();
	gsap.to(state, {
		progress: 1,
		ease: 'none',
		onUpdate: applyGridWidth,
		scrollTrigger: {
			trigger: document.body,
			start: '20px top',
			end: hasSmoothScroll ? '+=300%' : '+=100%',
			scrub: true,
		},
	});
	window.addEventListener('resize', applyGridWidth);
	return () => {
		window.removeEventListener('resize', applyGridWidth);
		root.style.removeProperty('--grid-w');
	};
}

function scaleHeroOnScroll() {
	const root = document.documentElement;
	const hero = document.querySelector<HTMLElement>('[data-m-hero]');
	if (!hero) return;
	const state = { scale: MOBILE_START_SCALE };

	function applyShaderWidth() {
		root.style.setProperty(
			'--shader-w',
			`${window.innerWidth * state.scale}px`,
		);
	}

	const timeline = gsap.timeline({
		defaults: { ease: 'none' },
		scrollTrigger: {
			trigger: hero,
			start: 'top top',
			end: () =>
				`+=${gsap.utils.clamp(
					MOBILE_MIN_SCROLL_PIXELS,
					window.innerHeight * MOBILE_MAX_SCROLL_VIEWPORT_RATIO,
					hero.offsetHeight - window.innerHeight,
				)}`,
			scrub: 0.5,
			invalidateOnRefresh: true,
		},
	});
	timeline
		.fromTo(
			hero,
			{ scale: MOBILE_START_SCALE, transformOrigin: '50% 0%' },
			{ scale: 1 },
			0,
		)
		.fromTo(
			state,
			{ scale: MOBILE_START_SCALE },
			{ scale: 1, onUpdate: applyShaderWidth },
			0,
		)
		.fromTo(
			hero.querySelector('[data-m-portrait]'),
			{ scale: MOBILE_PORTRAIT_START_SCALE },
			{ scale: 1 },
			0,
		);
	applyShaderWidth();
	window.addEventListener('resize', applyShaderWidth);
	return () => {
		window.removeEventListener('resize', applyShaderWidth);
		root.style.removeProperty('--shader-w');
	};
}
