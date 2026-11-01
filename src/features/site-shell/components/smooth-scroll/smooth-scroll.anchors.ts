import { gsap, type ScrollSmoother, ScrollTrigger } from '@/shared/lib/gsap';

type AnchorNavigationOptions = {
	smoother: ScrollSmoother | null;
	isReducedOnNarrow: boolean;
	isRouteEntry: boolean;
};

const ARRIVAL_DELAY_MILLISECONDS = 1500;
const TARGET_RETRY_DELAY_MILLISECONDS = 100;
const MAX_TARGET_RETRIES = 10;
const GLIDE_DURATION_IN_SECONDS = 1.6;
const USER_INPUT_EVENTS = ['wheel', 'touchstart', 'keydown'] as const;

export function startAnchorNavigation({
	smoother,
	isReducedOnNarrow,
	isRouteEntry,
}: AnchorNavigationOptions) {
	let jumpTimer = 0;
	let glide: gsap.core.Tween | undefined;

	function glideTo(target: HTMLElement) {
		if (smoother) {
			smoother.scrollTo(target, true, 'top top');
			return;
		}
		glide?.kill();
		if (isReducedOnNarrow) {
			window.scrollTo(0, getDocumentTop(target));
			return;
		}
		const from = window.scrollY;
		const state = { progress: 0 };
		glide = gsap.to(state, {
			progress: 1,
			duration: GLIDE_DURATION_IN_SECONDS,
			ease: 'power3.inOut',
			onUpdate: () =>
				window.scrollTo(
					0,
					from + (getDocumentTop(target) - from) * state.progress,
				),
		});
	}

	function jump(attempt = 0) {
		const target = findElementByHash(window.location.hash);
		if (!target) {
			if (window.location.hash && attempt < MAX_TARGET_RETRIES) {
				jumpTimer = window.setTimeout(
					() => jump(attempt + 1),
					TARGET_RETRY_DELAY_MILLISECONDS,
				);
			}
			return;
		}
		ScrollTrigger.refresh();
		glideTo(target);
	}

	function scheduleJump(delayInMilliseconds = 0) {
		window.clearTimeout(jumpTimer);
		jumpTimer = window.setTimeout(() => jump(), delayInMilliseconds);
	}

	function handleAnchor() {
		scheduleJump();
	}

	function cancelGlide() {
		window.clearTimeout(jumpTimer);
		glide?.kill();
	}

	function handleClick(event: MouseEvent) {
		if (
			event.defaultPrevented ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.button !== 0
		)
			return;
		if (!(event.target instanceof Element)) return;
		const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
		if (!link?.hash) return;
		const section = findElementByHash(link.hash);
		if (!section) return;
		event.preventDefault();
		cancelGlide();
		glideTo(section);
		history.replaceState(history.state, '', link.hash);
	}

	if (isRouteEntry && window.location.hash)
		scheduleJump(ARRIVAL_DELAY_MILLISECONDS);
	for (const type of USER_INPUT_EVENTS) {
		window.addEventListener(type, cancelGlide, { passive: true });
	}
	document.addEventListener('click', handleClick);
	window.addEventListener('hashchange', handleAnchor);
	window.addEventListener('site:anchor', handleAnchor);

	return () => {
		cancelGlide();
		for (const type of USER_INPUT_EVENTS) {
			window.removeEventListener(type, cancelGlide);
		}
		document.removeEventListener('click', handleClick);
		window.removeEventListener('hashchange', handleAnchor);
		window.removeEventListener('site:anchor', handleAnchor);
	};
}

function getDocumentTop(element: HTMLElement) {
	return element.getBoundingClientRect().top + window.scrollY;
}

function findElementByHash(hash: string) {
	try {
		return document.getElementById(decodeURIComponent(hash.slice(1)));
	} catch {
		return null;
	}
}
