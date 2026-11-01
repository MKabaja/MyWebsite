'use client';

import type { MouseEvent, ReactNode } from 'react';
import { ScrollSmoother } from '@/shared/lib/gsap';

type ScrollDownLinkProps = {
	targetId: string;
	label: string;
	className?: string;
	children: ReactNode;
};

export function ScrollDownLink({
	targetId,
	label,
	className,
	children,
}: ScrollDownLinkProps) {
	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		const target = document.getElementById(targetId);
		const smoother = ScrollSmoother.get();
		if (!target || !smoother) return;
		event.preventDefault();
		smoother.scrollTo(target, true, 'top top');
	}

	return (
		<a
			href={`#${targetId}`}
			aria-label={label}
			onClick={handleClick}
			className={className}
		>
			{children}
		</a>
	);
}
