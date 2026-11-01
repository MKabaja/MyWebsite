export const contactDetailsStyles = {
	column: 'flex flex-col lg:col-span-4',
	detailsTile: 'px-5 py-12 sm:px-10 lg:px-10 lg:pt-24',
	detailsList: 'space-y-6',
	term: 'font-mono text-[0.75rem] tracking-[0.12em] text-on-dark-muted uppercase',
	definition: 'm-0 mt-1 text-[1.25rem] break-words',
	detailLink:
		'mouse-sm group inline-flex items-center gap-1.5 py-1 text-white transition-colors hover:text-accent',
	detailArrow:
		'shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
	socialList: 'mt-10 flex gap-3',
	socialLink:
		'mouse-sm flex size-12 items-center justify-center border border-dashed border-guide text-on-dark-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent',
	windowRow: 'grid min-h-40 flex-1 grid-cols-[1fr_2fr]',
	lineNumbersTile: 'flex justify-center overflow-hidden pt-4',
	lineNumbers: 'hidden lg:block',
} satisfies Record<string, string>;
