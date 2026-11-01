export const shaderBackgroundStyles = {
	canvas:
		'pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh w-full [clip-path:inset(0_max(0px,calc(50%-var(--shader-w,var(--grid-w,100vw))/2)))]',
} satisfies Record<string, string>;
