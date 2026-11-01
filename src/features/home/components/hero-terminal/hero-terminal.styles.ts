export const heroTerminalStyles = {
	terminal:
		'flex flex-col overflow-hidden border border-white/15 bg-ink/85 font-mono text-[0.78rem] leading-relaxed shadow-[0_20px_60px_rgb(0_0_0/0.45)]',
	titleBar:
		'flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3',
	closeDot: 'size-2.5 rounded-full bg-[#e95420]',
	idleDot: 'size-2.5 rounded-full bg-white/20',
	title: 'ms-3 truncate text-[0.72rem] text-white/45',
	screen:
		'flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3 text-white/85',
	historyLine: 'font-normal break-all whitespace-pre-wrap',
	outputLine: 'text-white/55',
	currentLine: 'font-normal break-all',
	cursor:
		'ms-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-accent motion-safe:animate-pulse',
	prompt: 'select-none',
	promptHost: 'text-cyber-soft',
	promptSeparator: 'text-white/50',
	promptPath: 'text-accent-soft',
} satisfies Record<string, string>;
