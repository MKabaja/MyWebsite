'use client';

import { useEffect, useRef } from 'react';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';

const VISIBILITY_MARGIN = '200px';

/**
 * Odtwarza wyciszone wideo tylko w pobliżu ekranu, więc plik nie pobiera się przed czasem.
 * Przy `prefers-reduced-motion` nie startuje i zostaje poster.
 */
export function useAutoplayWhenVisible() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video || matchesMedia(mediaQueries.reducedMotion)) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					video.play().catch(keepPosterVisible);
				} else {
					video.pause();
				}
			},
			{ rootMargin: VISIBILITY_MARGIN },
		);
		observer.observe(video);

		return () => {
			observer.disconnect();
			video.pause();
		};
	}, []);

	return videoRef;
}

function keepPosterVisible() {}
