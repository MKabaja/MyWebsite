'use client';

import { type RefObject, useEffect } from 'react';
import { gsap, isDesktop, SplitText } from '@/shared/lib/gsap';
import { mediaQueries } from '@/shared/lib/media-queries';

type SplitRevealOptions = {
	delayInSeconds?: number;
	isTriggeredByScroll?: boolean;
};

/**
 * Odsłania nagłówek słowo po słowie przy montowaniu albo po wjechaniu na ekran.
 * Na dotyku wariant ze scrollem jest scrubowany; przy reduced motion na wąskim ekranie nic nie animuje.
 */
export function useSplitReveal(
	ref: RefObject<HTMLElement | null>,
	{
		delayInSeconds = 0.4,
		isTriggeredByScroll = false,
	}: SplitRevealOptions = {},
) {
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const media = gsap.matchMedia();
		media.add(
			{
				narrow: mediaQueries.narrow,
				reduced: mediaQueries.reducedMotion,
				wide: mediaQueries.wide,
			},
			(context) => {
				if (context.conditions?.narrow && context.conditions?.reduced) return;
				const split = SplitText.create(element, { type: 'words' });
				if (isTriggeredByScroll && !isDesktop()) {
					gsap.from(split.words, {
						y: 24,
						autoAlpha: 0,
						stagger: 0.1,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: element,
							start: 'top 92%',
							end: 'top 55%',
							scrub: 0.5,
						},
					});
					return;
				}
				gsap.from(split.words, {
					duration: 1.5,
					y: 20,
					autoAlpha: 0,
					stagger: 0.08,
					delay: delayInSeconds,
					ease: 'power3.out',
					scrollTrigger: isTriggeredByScroll
						? { trigger: element, start: 'top bottom-=100', once: true }
						: undefined,
				});
			},
			element,
		);
		return () => media.revert();
	}, [ref, delayInSeconds, isTriggeredByScroll]);
}
