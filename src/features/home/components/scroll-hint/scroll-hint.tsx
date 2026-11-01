'use client';

import { Mouse } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from '@/shared/lib/gsap';
import { cn } from '@/shared/lib/utils';
import { scrollHintStyles } from './scroll-hint.styles';

type ScrollHintProps = {
	label: string;
	className?: string;
};

const { hint, icon } = scrollHintStyles;

export function ScrollHint({ label, className }: ScrollHintProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const context = gsap.context(() => {
			gsap.to(element, {
				autoAlpha: 0,
				y: 20,
				ease: 'none',
				scrollTrigger: {
					trigger: document.body,
					start: 'top top',
					end: '+=250',
					scrub: true,
				},
			});
		});
		return () => context.revert();
	}, []);

	return (
		<div ref={ref} aria-hidden className={cn(hint, className)}>
			<Mouse className={icon} strokeWidth={1.5} />
			{label}
		</div>
	);
}
