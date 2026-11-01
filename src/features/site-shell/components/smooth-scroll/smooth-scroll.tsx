'use client';

import { useLocale } from 'next-intl';
import { type ReactNode, useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import {
	gsap,
	isDesktop,
	ScrollSmoother,
	ScrollTrigger,
} from '@/shared/lib/gsap';
import { mediaQueries } from '@/shared/lib/media-queries';
import { startAnchorNavigation } from './smooth-scroll.anchors';
import { fadeInOnScroll } from './smooth-scroll.fade-in';
import { createMobileEffects } from './smooth-scroll.mobile-effects';
import { holdVideosStill } from './smooth-scroll.reduced-video';

type SmoothScrollProps = {
	children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
	const pathname = usePathname();
	const locale = useLocale();

	// biome-ignore lint/correctness/useExhaustiveDependencies: smoother i efekty tworzymy od nowa przy zmianie trasy i języka
	useEffect(() => {
		const media = gsap.matchMedia();
		let isAwaitingRouteEntry = true;
		media.add(
			{
				desktop: mediaQueries.desktopPointer,
				wide: mediaQueries.wide,
				narrow: mediaQueries.narrow,
				reduced: mediaQueries.reducedMotion,
			},
			(context) => {
				const isNarrow = Boolean(context.conditions?.narrow);
				const hasReducedMotion = Boolean(context.conditions?.reduced);
				const isReducedOnNarrow = isNarrow && hasReducedMotion;
				const smoother = isDesktop()
					? ScrollSmoother.create({
							wrapper: '#smooth-wrapper',
							content: '#smooth-content',
							smooth: 2,
							effects: true,
							normalizeScroll: false,
						})
					: null;
				const isRouteEntry = isAwaitingRouteEntry;
				if (isRouteEntry) window.scrollTo(0, 0);
				isAwaitingRouteEntry = false;
				const cleanUpMobileEffects =
					!smoother && !hasReducedMotion
						? createMobileEffects({ isLegacyWideTouch: !isNarrow })
						: undefined;
				if (!isReducedOnNarrow) fadeInOnScroll({ isNarrow });
				ScrollTrigger.refresh();

				const stopAnchorNavigation = startAnchorNavigation({
					smoother,
					isReducedOnNarrow,
					isRouteEntry,
				});
				const releaseVideos = isReducedOnNarrow ? holdVideosStill() : undefined;

				return () => {
					cleanUpMobileEffects?.();
					stopAnchorNavigation();
					releaseVideos?.();
					smoother?.kill();
				};
			},
		);
		return () => media.revert();
	}, [pathname, locale]);

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	);
}
