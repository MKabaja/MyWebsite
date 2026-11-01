'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { CornerMarks } from '@/features/site-shell/components/corner-marks';
import { Preloader } from '@/features/site-shell/components/preloader';
import { SmoothScroll } from '@/features/site-shell/components/smooth-scroll';
import {
	PageFrame,
	TransitionProvider,
} from '@/shared/components/page-transition';

type SiteShellProps = {
	children: ReactNode;
};

const ShaderBackground = dynamic(
	() =>
		import('@/features/site-shell/components/shader-background').then(
			({ ShaderBackground }) => ShaderBackground,
		),
	{ ssr: false },
);
const Cursor = dynamic(
	() =>
		import('@/features/site-shell/components/cursor').then(
			({ Cursor }) => Cursor,
		),
	{
		ssr: false,
	},
);

export function SiteShell({ children }: SiteShellProps) {
	return (
		<TransitionProvider>
			<ShaderBackground />
			<CornerMarks />
			<SmoothScroll>
				<PageFrame>{children}</PageFrame>
			</SmoothScroll>
			<Preloader />
			<Cursor />
		</TransitionProvider>
	);
}
