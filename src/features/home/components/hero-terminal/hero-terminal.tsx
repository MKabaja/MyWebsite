'use client';

import { cn } from '@/shared/lib/utils';
import { TERMINAL_HOST } from './hero-terminal.constants';
import { heroTerminalStyles } from './hero-terminal.styles';
import { useTerminalSession } from './use-terminal-session';

type HeroTerminalProps = {
	label: string;
	className?: string;
};

const {
	terminal,
	titleBar,
	closeDot,
	idleDot,
	title,
	screen,
	historyLine,
	outputLine,
	currentLine,
	cursor,
	prompt,
	promptHost,
	promptSeparator,
	promptPath,
} = heroTerminalStyles;

export function HeroTerminal({ label, className }: HeroTerminalProps) {
	const { rootRef, lines, typing } = useTerminalSession();

	return (
		<div
			ref={rootRef}
			role="img"
			aria-label={label}
			className={cn(terminal, className)}
		>
			<div aria-hidden className={titleBar}>
				<span className={closeDot} />
				<span className={idleDot} />
				<span className={idleDot} />
				<span className={title}>{TERMINAL_HOST}: ~</span>
			</div>
			<div aria-hidden className={screen}>
				{lines.map((line) => (
					<p
						key={`${line.kind}-${line.text}`}
						className={cn(historyLine, line.kind === 'output' && outputLine)}
					>
						{line.kind === 'command' && <Prompt />}
						{line.text}
					</p>
				))}
				<p className={currentLine}>
					<Prompt />
					{typing}
					<span className={cursor} />
				</p>
			</div>
		</div>
	);
}

function Prompt() {
	return (
		<span className={prompt}>
			<span className={promptHost}>{TERMINAL_HOST}</span>
			<span className={promptSeparator}>:</span>
			<span className={promptPath}>~</span>
			<span className={promptSeparator}>$ </span>
		</span>
	);
}
