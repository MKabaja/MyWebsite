'use client';

import {
	type ElementType,
	type HTMLAttributes,
	useEffect,
	useRef,
} from 'react';
import {
	registerShaderCell,
	type ShaderCellMode,
} from '@/shared/lib/shader-cells';
import { cn } from '@/shared/lib/utils';
import { classNameByLine, tileStyles } from './tile.styles';

export type TileMode = 'solid' | 'window' | ShaderCellMode;

type TileElement =
	| 'div'
	| 'section'
	| 'article'
	| 'aside'
	| 'header'
	| 'footer'
	| 'li';
type TileLine = keyof typeof classNameByLine;

type TileProps = HTMLAttributes<HTMLElement> & {
	as?: TileElement;
	mode?: TileMode;
	lines?: TileLine[];
};

const { tile, inFlow, solidSurface, clearSurface } = tileStyles;

export function Tile({
	as = 'div',
	mode = 'solid',
	lines = [],
	className = '',
	...props
}: TileProps) {
	const Component = as as ElementType;
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!ref.current || !isShaderCellMode(mode)) return;
		return registerShaderCell(ref.current, mode);
	}, [mode]);

	return (
		<Component
			ref={ref}
			data-tile={mode}
			className={cn(
				!hasOwnPosition(className) && inFlow,
				mode === 'solid' ? solidSurface : clearSurface,
				lines.map((line) => classNameByLine[line]),
				tile,
				className,
			)}
			{...props}
		/>
	);
}

function isShaderCellMode(mode: TileMode): mode is ShaderCellMode {
	return mode === 'grain' || mode === 'accent';
}

function hasOwnPosition(className: string) {
	return /\b(absolute|fixed|sticky)\b/.test(className);
}
