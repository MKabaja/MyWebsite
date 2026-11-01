'use client';

import { cursorStyles } from './cursor.styles';
import { useCursor } from './use-cursor';

const { cursor } = cursorStyles;

export function Cursor() {
	const cursorRef = useCursor();

	return <div ref={cursorRef} aria-hidden className={cursor} />;
}
