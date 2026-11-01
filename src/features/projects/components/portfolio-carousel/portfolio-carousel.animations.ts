import { gsap } from '@/shared/lib/gsap';

type PlaneAnimation = {
	plane: HTMLElement;
	viewport: HTMLElement;
	isNarrow: boolean;
};

type EntranceAnimation = {
	track: HTMLElement;
	viewport: HTMLElement;
	intro: { x: number };
	isNarrow: boolean;
	onIntroUpdate: () => void;
};

export function animatePlane({ plane, viewport, isNarrow }: PlaneAnimation) {
	gsap.fromTo(
		plane,
		isNarrow
			? { rotationX: 24, rotationY: -8, rotationZ: -9, yPercent: 3 }
			: { rotationX: 34, rotationY: -16, rotationZ: -13, yPercent: 8 },
		{
			...(isNarrow
				? { rotationX: 14, rotationY: -4, rotationZ: -5, yPercent: -3 }
				: { rotationX: 18, rotationY: -8, rotationZ: -6, yPercent: -6 }),
			ease: 'none',
			scrollTrigger: {
				trigger: viewport,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		},
	);
}

export function animateEntrance({
	track,
	viewport,
	intro,
	isNarrow,
	onIntroUpdate,
}: EntranceAnimation) {
	const entrance = gsap.timeline({
		scrollTrigger: { trigger: viewport, start: 'top 75%', once: true },
	});
	entrance
		.fromTo(
			intro,
			{ x: () => viewport.offsetWidth * (isNarrow ? 0.18 : 0.9) },
			{
				x: 0,
				duration: isNarrow ? 0.9 : 2.4,
				ease: 'expo.out',
				onUpdate: onIntroUpdate,
			},
			0,
		)
		.from(
			track.querySelectorAll('a'),
			{
				autoAlpha: isNarrow ? 1 : 0,
				z: isNarrow ? -60 : -260,
				duration: isNarrow ? 0.8 : 1.6,
				ease: 'expo.out',
				stagger: 0.07,
				clearProps: 'transform,opacity,visibility',
			},
			0,
		);
}

export function runTickerWhileVisible(viewport: HTMLElement, tick: () => void) {
	let isRunning = false;
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting === isRunning) return;
		isRunning = entry.isIntersecting;
		if (isRunning) gsap.ticker.add(tick);
		else gsap.ticker.remove(tick);
	});
	observer.observe(viewport);
	return observer;
}

export function playVideosWhileVisible(track: HTMLElement, canPlay: boolean) {
	const observer = new IntersectionObserver((entries) => {
		for (const { target, isIntersecting } of entries) {
			if (!(target instanceof HTMLVideoElement)) continue;
			if (isIntersecting && canPlay) target.play().catch(() => {});
			else target.pause();
		}
	});
	for (const video of track.querySelectorAll('video')) observer.observe(video);
	return observer;
}
