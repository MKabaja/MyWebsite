'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { preloaderStyles } from './preloader.styles';

const { overlay, overlayLoaded, overlayLoading } = preloaderStyles;

export function Preloader() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const frame = requestAnimationFrame(() => setIsLoaded(true));
		return () => cancelAnimationFrame(frame);
	}, []);

	return (
		<div
			aria-hidden
			className={cn(overlay, isLoaded ? overlayLoaded : overlayLoading)}
		/>
	);
}
