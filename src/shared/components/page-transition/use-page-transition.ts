'use client';

import { useContext } from 'react';
import {
	PageTransitionContext,
	type PageTransitionState,
} from './page-transition.context';

/**
 * Daje dostęp do nawigacji z animacją wyjścia strony (`navigate`) i jej stanu.
 *
 * @throws gdy użyty poza `TransitionProvider`
 */
export function usePageTransition(): PageTransitionState {
	const context = useContext(PageTransitionContext);
	if (!context) {
		throw new Error(
			'usePageTransition must be used inside <TransitionProvider>',
		);
	}
	return context;
}
