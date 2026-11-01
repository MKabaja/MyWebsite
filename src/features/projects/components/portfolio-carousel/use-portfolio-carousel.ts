'use client';

import {
	type Dispatch,
	type RefObject,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { projects } from '@/features/projects/model/projects.constants';
import { Draggable, gsap, ScrollTrigger } from '@/shared/lib/gsap';
import { mediaQueries } from '@/shared/lib/media-queries';
import {
	animateEntrance,
	animatePlane,
	playVideosWhileVisible,
	runTickerWhileVisible,
} from './portfolio-carousel.animations';

const AMBIENT_DRIFT_PIXELS_PER_FRAME = 40 / 60;
const DRIFT_EASE_IN_RATE_PER_FRAME = 0.02;
const NARROW_DRIFT_RESUME_DELAY_IN_SECONDS = 3;

type MoveCarousel = (direction: number) => void;

type CarouselSetup = {
	viewport: HTMLElement;
	plane: HTMLDivElement;
	track: HTMLUListElement;
	isNarrow: boolean;
	isReducedMotion: boolean;
	wasDraggedRef: RefObject<boolean>;
	currentIndexRef: RefObject<number>;
	moveRef: RefObject<MoveCarousel | null>;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
};

export function usePortfolioCarousel() {
	const viewportRef = useRef<HTMLElement>(null);
	const planeRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLUListElement>(null);
	const wasDraggedRef = useRef(false);
	const currentIndexRef = useRef(0);
	const moveRef = useRef<MoveCarousel | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const viewport = viewportRef.current;
		const plane = planeRef.current;
		const track = trackRef.current;
		if (!viewport || !plane || !track) return;

		const media = gsap.matchMedia();
		media.add(
			{
				narrow: mediaQueries.narrow,
				wide: mediaQueries.wide,
				reduced: mediaQueries.reducedMotion,
			},
			(context) =>
				setUpCarousel({
					viewport,
					plane,
					track,
					isNarrow: Boolean(context.conditions?.narrow),
					isReducedMotion: Boolean(context.conditions?.reduced),
					wasDraggedRef,
					currentIndexRef,
					moveRef,
					setCurrentIndex,
				}),
			viewport,
		);
		return () => media.revert();
	}, []);

	function move(direction: number) {
		moveRef.current?.(direction);
	}

	function wasDragged() {
		return wasDraggedRef.current;
	}

	return { viewportRef, planeRef, trackRef, currentIndex, move, wasDragged };
}

function setUpCarousel({
	viewport,
	plane,
	track,
	isNarrow,
	isReducedMotion,
	wasDraggedRef,
	currentIndexRef,
	moveRef,
	setCurrentIndex,
}: CarouselSetup) {
	const cards = gsap.utils.toArray<HTMLElement>(track.children);
	const setters = cards.map((card) => gsap.quickSetter(card, 'x', 'px'));
	const isReducedNarrow = isNarrow && isReducedMotion;

	let step = 0;
	let loopWidth = 0;
	let wrap = gsap.utils.wrap(0, 1);

	function measure() {
		const width = cards[0].offsetWidth;
		step = width + Math.max(12, width * 0.025);
		loopWidth = step * cards.length;
		wrap = gsap.utils.wrap(-step, loopWidth - step);
	}

	const proxy = document.createElement('div');
	const proxyProps = gsap.getProperty(proxy);
	const intro = { x: 0 };
	let activeCard: HTMLElement | undefined;

	function getX() {
		return Number(proxyProps('x')) || 0;
	}

	function render() {
		const centre = isNarrow
			? (viewport.offsetWidth - cards[0].offsetWidth) / 2
			: 0;
		const offset = getX() + intro.x + centre;
		let closestDistance = Number.POSITIVE_INFINITY;
		let nearestCard: HTMLElement | undefined;
		cards.forEach((card, index) => {
			const x = wrap(index * step + offset);
			setters[index](x);
			const distance = Math.abs(x - centre);
			if (distance < closestDistance) {
				closestDistance = distance;
				nearestCard = card;
			}
		});
		if (!isNarrow || nearestCard === activeCard) return;
		delete activeCard?.dataset.active;
		activeCard = nearestCard;
		if (activeCard) activeCard.dataset.active = '';
	}

	function syncCurrentIndex() {
		const index = getProjectIndexAt(getX(), step);
		if (index === currentIndexRef.current) return;
		currentIndexRef.current = index;
		setCurrentIndex(index);
	}

	measure();
	if (isNarrow) gsap.set(proxy, { x: -currentIndexRef.current * step });
	render();

	let isPressed = false;
	let drift = isReducedMotion ? 0 : 1;
	let resumeAt = 0;

	function pauseDrift() {
		drift = 0;
		resumeAt =
			gsap.ticker.time + (isNarrow ? NARROW_DRIFT_RESUME_DELAY_IN_SECONDS : 0);
	}

	const skew = gsap.quickTo(track, 'skewX', {
		duration: 0.5,
		ease: 'power3.out',
	});

	function lean(deltaX: number) {
		if (isNarrow && !isReducedMotion)
			skew(gsap.utils.clamp(-4, 4, deltaX * -0.2));
	}

	const [draggable] = Draggable.create(proxy, {
		type: 'x',
		trigger: viewport,
		inertia: !isReducedNarrow,
		minimumMovement: 6,
		allowNativeTouchScrolling: true,
		snap: isNarrow
			? { x: (value: number) => Math.round(value / step) * step }
			: undefined,
		onPress() {
			isPressed = true;
			wasDraggedRef.current = false;
			pauseDrift();
			gsap.killTweensOf([intro, proxy]);
			intro.x = 0;
			render();
			viewport.dataset.pressed = 'true';
		},
		onDragStart() {
			wasDraggedRef.current = true;
		},
		onDrag() {
			render();
			lean(this.deltaX);
		},
		onThrowUpdate() {
			render();
			lean(this.deltaX);
		},
		onThrowComplete() {
			syncCurrentIndex();
			lean(0);
		},
		onRelease() {
			lean(0);
			isPressed = false;
			pauseDrift();
			delete viewport.dataset.pressed;
			if (isReducedNarrow) {
				gsap.set(proxy, { x: Math.round(getX() / step) * step });
				render();
				this.update();
			}
			if (isNarrow) syncCurrentIndex();
		},
	});

	moveRef.current = (direction) => {
		if (!isNarrow) return;
		gsap.killTweensOf([intro, proxy]);
		intro.x = 0;
		wasDraggedRef.current = false;
		pauseDrift();
		gsap.to(proxy, {
			x: (Math.round(getX() / step) - direction) * step,
			duration: isReducedNarrow ? 0 : 0.45,
			ease: 'power3.out',
			onUpdate: render,
			onComplete: () => {
				draggable.update();
				syncCurrentIndex();
			},
		});
	};

	function onFocus({ target }: FocusEvent) {
		if (!isNarrow || !(target instanceof Element)) return;
		const slide = target.closest<HTMLElement>('[data-slide-index]');
		if (!slide) return;
		pauseDrift();
		gsap.killTweensOf([intro, proxy]);
		intro.x = 0;
		gsap.set(proxy, { x: -Number(slide.dataset.slideIndex) * step });
		render();
		draggable.update();
		syncCurrentIndex();
	}

	track.addEventListener('focusin', onFocus);

	function tick() {
		if (isPressed || draggable.tween?.isActive() || gsap.isTweening(proxy))
			return;
		if (!isReducedMotion && gsap.ticker.time >= resumeAt) {
			drift +=
				(1 - drift) * DRIFT_EASE_IN_RATE_PER_FRAME * gsap.ticker.deltaRatio();
			gsap.set(proxy, {
				x:
					(getX() -
						AMBIENT_DRIFT_PIXELS_PER_FRAME * drift * gsap.ticker.deltaRatio()) %
					loopWidth,
			});
		}
		render();
		if (isNarrow) syncCurrentIndex();
	}

	const sectionObserver = runTickerWhileVisible(viewport, tick);
	const videoObserver = playVideosWhileVisible(track, !isReducedNarrow);

	function onResize() {
		const index = step ? Math.round(getX() / step) : 0;
		measure();
		if (isNarrow) {
			gsap.killTweensOf(proxy);
			gsap.set(proxy, { x: index * step });
			draggable.update();
		}
		render();
	}

	window.addEventListener('resize', onResize);

	const animationContext = gsap.context(() => {
		if (isReducedNarrow) return;
		animatePlane({ plane, viewport, isNarrow });
		if (isReducedMotion) return;
		animateEntrance({
			track,
			viewport,
			intro,
			isNarrow,
			onIntroUpdate: render,
		});
	}, viewport);
	ScrollTrigger.refresh();

	return () => {
		moveRef.current = null;
		track.removeEventListener('focusin', onFocus);
		delete viewport.dataset.pressed;
		delete activeCard?.dataset.active;
		animationContext.revert();
		gsap.ticker.remove(tick);
		sectionObserver.disconnect();
		videoObserver.disconnect();
		window.removeEventListener('resize', onResize);
		draggable.kill();
		gsap.killTweensOf([proxy, intro, track]);
	};
}

function getProjectIndexAt(x: number, step: number) {
	return (
		((-Math.round(x / step) % projects.length) + projects.length) %
		projects.length
	);
}
