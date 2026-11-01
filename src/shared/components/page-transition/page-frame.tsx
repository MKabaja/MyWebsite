'use client';

import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import { pageFrameStyle } from './page-transition.constants';
import { usePageTransition } from './use-page-transition';

type PageFrameProps = {
	children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
	const pathname = usePathname();
	const locale = useLocale();
	const { isLeaving, hasNavigated } = usePageTransition();

	return (
		<div
			key={`${locale}:${pathname}`}
			className="page"
			data-phase={getPhase(isLeaving, hasNavigated)}
			style={pageFrameStyle}
		>
			{children}
		</div>
	);
}

function getPhase(isLeaving: boolean, hasNavigated: boolean) {
	if (isLeaving) return 'leave';
	return hasNavigated ? 'enter' : undefined;
}
