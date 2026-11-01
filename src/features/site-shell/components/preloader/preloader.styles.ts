export const preloaderStyles = {
	overlay:
		'fixed inset-0 z-9998 bg-ink backface-hidden transition-all duration-1500 ease-[cubic-bezier(0.4,0,0,1)]',
	overlayLoaded: 'pointer-events-none -translate-x-full',
	overlayLoading: 'translate-x-0',
} satisfies Record<string, string>;
