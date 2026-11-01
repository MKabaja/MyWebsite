const textColumn = 'max-w-[68ch]';

export const projectContentStyles = {
	blocks: 'flex flex-col',
	heading: `${textColumn} mt-14 mb-5 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold first:mt-0`,
	paragraph: `${textColumn} mb-5 text-[1.2rem] leading-relaxed text-on-dark-muted last:mb-0`,
	figure: 'my-10 lg:my-16',
	imageFrame: 'border border-dashed border-guide p-2',
	image: 'mouse-sm block h-auto w-full',
	caption:
		'mt-3 flex items-center gap-2 font-mono text-[0.78rem] text-on-dark-muted',
} satisfies Record<string, string>;
