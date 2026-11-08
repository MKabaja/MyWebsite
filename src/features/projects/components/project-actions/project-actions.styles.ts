const prominent = 'mouse-md min-h-12 justify-center px-5 py-3 max-sm:w-full';

export const projectActionsStyles = {
	action:
		'inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wide uppercase transition-colors',
} satisfies Record<string, string>;

export const liveClassNameByVariant = {
	compact: 'mouse-sm text-accent hover:text-accent-soft',
	prominent: `${prominent} bg-accent font-semibold text-ink hover:bg-accent-soft`,
} satisfies Record<string, string>;

export const repositoryClassNameByVariant = {
	compact: 'mouse-sm text-on-dark hover:text-accent',
	prominent: `${prominent} border border-white/25 text-on-dark hover:border-accent hover:text-accent`,
} satisfies Record<string, string>;
