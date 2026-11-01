'use client';

import { useLocale } from 'next-intl';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { PAGE_LEAVE_MILLISECONDS } from './page-transition.constants';
import {
	type NavigateOptions,
	PageTransitionContext,
} from './page-transition.context';

type TransitionProviderProps = {
	children: ReactNode;
};

export function TransitionProvider({ children }: TransitionProviderProps) {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();
	const currentKey = `${locale}:${pathname}`;

	const [leavingFrom, setLeavingFrom] = useState<string | null>(null);
	const [hasNavigated, setHasNavigated] = useState(false);
	const timeoutRef = useRef<number | undefined>(undefined);

	const isLeaving = leavingFrom === currentKey;

	function navigate(href: string, options: NavigateOptions = {}) {
		const targetLocale = options.locale ?? locale;
		const isSameLocale = targetLocale === locale;
		if (isLeaving || (href === pathname && isSameLocale)) return;

		const targetPath = href.split(/[?#]/)[0] || pathname;
		const hasAnchor = href.includes('#');
		if (targetPath === pathname && isSameLocale && hasAnchor) {
			router.push(href, { scroll: false });
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(
				() => window.dispatchEvent(new Event('site:anchor')),
				0,
			);
			return;
		}

		setHasNavigated(true);
		setLeavingFrom(currentKey);
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			if (isSameLocale) router.push(href, { scroll: !hasAnchor });
			else router.push(href, { locale: targetLocale, scroll: true });
		}, PAGE_LEAVE_MILLISECONDS);
	}

	useEffect(() => {
		function handlePopState() {
			window.clearTimeout(timeoutRef.current);
			setLeavingFrom(null);
			setHasNavigated(true);
		}
		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
			window.clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<PageTransitionContext value={{ navigate, isLeaving, hasNavigated }}>
			{children}
		</PageTransitionContext>
	);
}
