import type { CSSProperties } from 'react';

export const PAGE_LEAVE_MILLISECONDS = 600;

export const pageFrameStyle = {
	'--page-enter-duration': '1000ms',
	'--page-enter-delay': '0ms',
	'--page-leave-duration': `${PAGE_LEAVE_MILLISECONDS}ms`,
} as CSSProperties;
