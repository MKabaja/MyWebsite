export const mediaQueries = {
	narrow: '(max-width: 991px)',
	wide: '(min-width: 992px)',
	desktopPointer: '(min-width: 992px) and (pointer: fine)',
	reducedMotion: '(prefers-reduced-motion: reduce)',
	narrowReducedMotion:
		'(max-width: 991px) and (prefers-reduced-motion: reduce)',
	narrowFullMotion:
		'(max-width: 991px) and (prefers-reduced-motion: no-preference)',
	hoverPointer: '(hover: hover) and (pointer: fine)',
	coarsePointer: '(pointer: coarse)',
} as const;

export function matchesMedia(query: string): boolean {
	return window.matchMedia(query).matches;
}
