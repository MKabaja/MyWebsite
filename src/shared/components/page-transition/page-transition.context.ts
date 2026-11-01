import { createContext } from 'react';
import type { Locale } from '@/i18n/routing';

export type NavigateOptions = { locale?: Locale };

export type PageTransitionState = {
	navigate: (href: string, options?: NavigateOptions) => void;
	isLeaving: boolean;
	hasNavigated: boolean;
};

export const PageTransitionContext = createContext<PageTransitionState | null>(
	null,
);
