export const notFoundViewStyles = {
	page: 'grid-frame flex min-h-svh flex-col lg:flex-row',
	contentTile:
		'flex flex-col px-6 pt-10 pb-14 sm:px-10 lg:w-1/2 lg:px-[clamp(3rem,6vw,6.5rem)] lg:pt-12',
	message: 'my-auto pt-20 lg:pt-0',
	errorCode: 'font-mono text-[0.8rem] text-on-dark-muted',
	errorKeyword: 'text-accent',
	errorName: 'text-cyber-soft',
	title: 'mt-4 text-[clamp(2.6rem,5vw,4.2rem)] leading-none font-semibold',
	description:
		'mt-6 max-w-[40ch] text-[1.2rem] leading-snug text-on-dark-muted',
	hint: 'text-on-dark',
	backLink:
		'mouse-md group mt-10 inline-flex items-center gap-3 bg-accent px-6 py-4 font-mono text-[0.9rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-accent-soft',
	backIcon:
		'transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5',
	windowTile:
		'flex min-h-[40svh] flex-1 items-center justify-center overflow-hidden lg:border-t-0 lg:border-l',
	outlinedCode:
		'text-[clamp(8rem,26vw,24rem)] leading-none font-black text-transparent [-webkit-text-stroke:2px_var(--color-on-dark)] select-none',
} satisfies Record<string, string>;
