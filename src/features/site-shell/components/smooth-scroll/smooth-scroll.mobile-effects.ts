import { gsap, ScrollTrigger } from '@/shared/lib/gsap';

type MobileEffectsOptions = {
	isLegacyWideTouch: boolean;
};

type MediaClipReveal = {
	selector: string;
	clipPathFrom: string;
	clipPathTo: string;
};

const SCRUB_IN_SECONDS = 0.6;
const MEDIA_SCRUB_IN_SECONDS = 0.4;
const MARQUEE_VELOCITY_DIVISOR = 300;
const MARQUEE_MAX_EXTRA_RATE = 5;

const legacyExpandReveal: MediaClipReveal = {
	selector: '[data-m-expand]',
	clipPathFrom: 'inset(0% 8% 0% 8% round 18px)',
	clipPathTo: 'inset(0% 0% 0% 0% round 0px)',
};

const narrowMediaReveal: MediaClipReveal = {
	selector: '[data-m-media]',
	clipPathFrom: 'inset(0% 5% 0% 5%)',
	clipPathTo: 'inset(0% 0% 0% 0%)',
};

/**
 * Efekty scrolla dla dotyku i wąskich ekranów, gdzie ScrollSmoother jest wyłączony. Wywołuj w `gsap.context`
 * lub `gsap.matchMedia`: ich `revert()` usuwa tweeny i triggery.
 *
 * - `data-speed="clamp(1.1)"`: parallax z desktopu odtworzony na natywnym scrollu (wąskie ekrany).
 * - `data-m-speed="0.1"`: dryf jako ułamek wysokości okna; ma pierwszeństwo przed `data-speed`.
 * - `data-m-media`: media odsłaniane z marginesu przy wjeździe na ekran.
 * - `data-m-depth`: drobne transformacje dekoracji, bez zmiany przezroczystości.
 * - `data-m-expand`, `data-m-recede`: efekty tylko dla szerokich ekranów dotykowych.
 * - `data-marquee`: tor przyspiesza wraz z prędkością scrolla.
 *
 * @returns funkcja przywracająca prędkość torów marquee; `undefined`, gdy na stronie nie ma torów
 */
export function createMobileEffects({
	isLegacyWideTouch,
}: MobileEffectsOptions) {
	animateViewportDrift(
		isLegacyWideTouch ? '[data-m-speed]' : '[data-m-speed]:not([data-m-text])',
	);
	if (!isLegacyWideTouch) animateSpeedParallax();
	revealMedia(isLegacyWideTouch ? legacyExpandReveal : narrowMediaReveal);
	if (isLegacyWideTouch) animateRecedingSections();
	else animateDepth();
	return boostMarqueesOnScroll();
}

function animateViewportDrift(selector: string) {
	for (const element of gsap.utils.toArray<HTMLElement>(selector)) {
		const distance = () =>
			(Number(element.dataset.mSpeed) || 0) * window.innerHeight;
		if (!distance()) continue;
		gsap.fromTo(
			element,
			{ y: () => distance() },
			{
				y: () => -distance(),
				ease: 'none',
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					scrub: SCRUB_IN_SECONDS,
					invalidateOnRefresh: true,
				},
			},
		);
	}
}

function animateSpeedParallax() {
	for (const element of gsap.utils.toArray<HTMLElement>(
		'[data-speed]:not([data-m-speed])',
	)) {
		const speed = Number.parseFloat(
			(element.dataset.speed ?? '').replace('clamp(', ''),
		);
		if (!speed || speed === 1 || !element.getClientRects().length) continue;
		const top = () => getLayoutTopInPixels(element);
		const start = () => Math.max(0, top() - window.innerHeight);
		const end = () => top() + element.offsetHeight;
		const rest = () =>
			Math.max(0, top() + element.offsetHeight / 2 - window.innerHeight / 2);
		const offset = (scroll: number) => (1 - speed) * (scroll - rest());
		gsap.fromTo(
			element,
			{ y: () => offset(start()) },
			{
				y: () => offset(end()),
				ease: 'none',
				scrollTrigger: {
					trigger: element,
					start,
					end,
					scrub: SCRUB_IN_SECONDS,
					invalidateOnRefresh: true,
				},
			},
		);
	}
}

function revealMedia({ selector, clipPathFrom, clipPathTo }: MediaClipReveal) {
	for (const element of gsap.utils.toArray<HTMLElement>(selector)) {
		gsap.fromTo(
			element,
			{ clipPath: clipPathFrom },
			{
				clipPath: clipPathTo,
				ease: 'none',
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'top 55%',
					scrub: MEDIA_SCRUB_IN_SECONDS,
				},
			},
		);
	}
}

function animateRecedingSections() {
	for (const section of gsap.utils.toArray<HTMLElement>('[data-m-recede]')) {
		gsap.to(section, {
			scale: 0.92,
			opacity: 0.35,
			transformOrigin: '50% 100%',
			ease: 'none',
			scrollTrigger: {
				trigger: section,
				start: 'bottom 90%',
				end: 'bottom 15%',
				scrub: true,
			},
		});
	}
}

function animateDepth() {
	for (const element of gsap.utils.toArray<HTMLElement>('[data-m-depth]')) {
		gsap.fromTo(
			element,
			{ scale: 0.94, y: 18 },
			{
				scale: 1.02,
				y: -12,
				ease: 'none',
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					scrub: SCRUB_IN_SECONDS,
					invalidateOnRefresh: true,
				},
			},
		);
	}
}

function boostMarqueesOnScroll() {
	const tracks = gsap.utils.toArray<HTMLElement>('[data-marquee]');
	if (!tracks.length) return undefined;
	const boost = { rate: 1 };

	function applyRate() {
		for (const track of tracks) {
			for (const animation of track.getAnimations()) {
				animation.playbackRate = boost.rate;
			}
		}
	}

	ScrollTrigger.create({
		onUpdate(self) {
			const rate =
				1 +
				Math.min(
					Math.abs(self.getVelocity()) / MARQUEE_VELOCITY_DIVISOR,
					MARQUEE_MAX_EXTRA_RATE,
				);
			if (rate <= boost.rate) return;
			gsap.killTweensOf(boost);
			boost.rate = rate;
			applyRate();
			gsap.to(boost, {
				rate: 1,
				duration: 1.2,
				ease: 'power2.out',
				onUpdate: applyRate,
			});
		},
	});

	return () => {
		gsap.killTweensOf(boost);
		boost.rate = 1;
		applyRate();
	};
}

function getLayoutTopInPixels(element: HTMLElement) {
	let top = 0;
	let current: Element | null = element;
	while (current instanceof HTMLElement) {
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return top;
}
