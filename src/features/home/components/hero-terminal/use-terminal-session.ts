'use client';

import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';
import {
	AFTER_COMMAND_DELAY_MILLISECONDS,
	AFTER_STEP_DELAY_MILLISECONDS,
	RESTART_DELAY_MILLISECONDS,
	START_DELAY_MILLISECONDS,
	TERMINAL_SESSION,
	TYPE_DELAY_MILLISECONDS,
	TYPE_JITTER_MILLISECONDS,
} from './hero-terminal.constants';

type TerminalLine = {
	kind: 'command' | 'output';
	text: string;
};

type TerminalStep = (typeof TERMINAL_SESSION)[number];

type TerminalOutput = {
	setLines: Dispatch<SetStateAction<TerminalLine[]>>;
	setTyping: Dispatch<SetStateAction<string>>;
};

export function useTerminalSession() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [typing, setTyping] = useState('');

	useEffect(() => {
		if (!rootRef.current) return;
		return runSessionAcrossMotionModes(rootRef.current, {
			setLines,
			setTyping,
		});
	}, []);

	return { rootRef, lines, typing };
}

function runSessionAcrossMotionModes(
	root: HTMLElement,
	output: TerminalOutput,
) {
	let stopSession = startSession(root, output);
	const reducedMobile = window.matchMedia(mediaQueries.narrowReducedMotion);

	function handleModeChange() {
		stopSession();
		output.setLines([]);
		output.setTyping('');
		stopSession = startSession(root, output);
	}

	reducedMobile.addEventListener('change', handleModeChange);
	return () => {
		reducedMobile.removeEventListener('change', handleModeChange);
		stopSession();
	};
}

function startSession(
	root: HTMLElement,
	{ setLines, setTyping }: TerminalOutput,
) {
	const isInstant = matchesMedia(mediaQueries.reducedMotion);
	let isVisible = false;
	let timer = 0;
	let stepIndex = 0;
	let charIndex = 0;

	const observer = new IntersectionObserver(handleIntersection);
	observer.observe(root);

	return () => {
		observer.disconnect();
		window.clearTimeout(timer);
	};

	function handleIntersection([entry]: IntersectionObserverEntry[]) {
		const wasVisible = isVisible;
		isVisible = entry.isIntersecting;
		if (isVisible && !wasVisible) handleEnter();
		if (!isVisible && wasVisible) handleLeave();
	}

	function handleEnter() {
		if (isInstant) {
			setLines(
				TERMINAL_SESSION.flatMap((step) => [
					toCommandLine(step),
					...toOutputLines(step),
				]),
			);
			setTyping('');
			return;
		}
		timer = window.setTimeout(tick, START_DELAY_MILLISECONDS);
	}

	function handleLeave() {
		window.clearTimeout(timer);
		stepIndex = 0;
		charIndex = 0;
		setLines([]);
		setTyping('');
	}

	function tick() {
		if (!isVisible) return;
		const step = TERMINAL_SESSION[stepIndex];
		if (!step) {
			restartSession();
			return;
		}
		if (charIndex < step.command.length) {
			typeNextCharacter(step.command);
			return;
		}
		submitCommand(step);
	}

	function restartSession() {
		setLines([]);
		stepIndex = 0;
		timer = window.setTimeout(tick, AFTER_STEP_DELAY_MILLISECONDS);
	}

	function typeNextCharacter(command: string) {
		charIndex++;
		setTyping(command.slice(0, charIndex));
		timer = window.setTimeout(
			tick,
			TYPE_DELAY_MILLISECONDS + Math.random() * TYPE_JITTER_MILLISECONDS,
		);
	}

	function submitCommand(step: TerminalStep) {
		setTyping('');
		setLines((previousLines) => [...previousLines, toCommandLine(step)]);
		timer = window.setTimeout(() => {
			setLines((previousLines) => [...previousLines, ...toOutputLines(step)]);
			stepIndex++;
			charIndex = 0;
			timer = window.setTimeout(
				tick,
				stepIndex >= TERMINAL_SESSION.length
					? RESTART_DELAY_MILLISECONDS
					: AFTER_STEP_DELAY_MILLISECONDS,
			);
		}, AFTER_COMMAND_DELAY_MILLISECONDS);
	}
}

function toCommandLine(step: TerminalStep): TerminalLine {
	return { kind: 'command', text: step.command };
}

function toOutputLines(step: TerminalStep): TerminalLine[] {
	return step.output.map((text) => ({ kind: 'output', text }));
}
