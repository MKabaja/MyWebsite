'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { gsap } from '@/shared/lib/gsap';
import { cn } from '@/shared/lib/utils';
import { scribbleStyles } from './scribble.styles';

type ScribbleVariant = 'underline' | 'arrow' | 'loop' | 'none';
type ScribbleShape = { viewBox: string; path: string };
type ShapeByVariant = Record<Exclude<ScribbleVariant, 'none'>, ScribbleShape>;

type ScribbleProps = {
	children: ReactNode;
	variant?: ScribbleVariant;
	className?: string;
	strokeClassName?: string;
};

const shapeByVariant: ShapeByVariant = {
	underline: {
		viewBox: '0 0 200 24',
		path: 'M4 14 C 50 6, 120 4, 196 10 M 30 20 C 80 14, 140 14, 170 18',
	},
	arrow: {
		viewBox: '0 0 120 40',
		path: 'M4 30 C 40 34, 80 30, 112 18 M 96 12 L 113 18 L 100 30',
	},
	loop: {
		viewBox: '0 0 220 40',
		path: 'M2 30 C 30 10, 50 40, 40 24 C 30 8, 70 6, 110 20 S 190 30, 218 14',
	},
};

const { note, text, stroke } = scribbleStyles;

export function Scribble({
	children,
	variant = 'underline',
	className,
	strokeClassName,
}: ScribbleProps) {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const path = pathRef.current;
		if (!path) return;
		const length = path.getTotalLength();
		const tween = gsap.fromTo(
			path,
			{ strokeDasharray: length, strokeDashoffset: length },
			{
				strokeDashoffset: 0,
				duration: 1.6,
				ease: 'power2.inOut',
				scrollTrigger: { trigger: path, start: 'top bottom-=80', once: true },
			},
		);
		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, []);

	const shape = variant === 'none' ? null : shapeByVariant[variant];

	return (
		<span className={cn(note, className)}>
			<span className={text}>{children}</span>
			{shape && (
				<svg
					viewBox={shape.viewBox}
					className={cn(stroke, strokeClassName)}
					fill="none"
					aria-hidden="true"
				>
					<path
						ref={pathRef}
						d={shape.path}
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			)}
		</span>
	);
}
