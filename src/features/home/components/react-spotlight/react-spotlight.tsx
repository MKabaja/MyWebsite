'use client';

import { siReact } from 'simple-icons';
import { TechIcon } from '@/shared/components/tech-icon';
import { cn } from '@/shared/lib/utils';
import {
	ORBIT_ANGLES_DEGREES,
	ORBIT_RADIUS_X,
	ORBIT_RADIUS_Y,
} from './react-spotlight.constants';
import { reactSpotlightStyles } from './react-spotlight.styles';
import { useSpotlightAnimation } from './use-spotlight-animation';

type ReactSpotlightProps = {
	title: string;
	text: string;
	className?: string;
};

const SPOTLIGHT_BACKGROUND = [
	'radial-gradient(rgb(255 255 255 / 0.22) 1px, transparent 1.5px)',
	'radial-gradient(circle at 70% 30%, rgb(124 255 247 / 0.35), transparent 55%)',
	'linear-gradient(140deg, #0a4f5a 0%, #0b7d84 45%, #00c4bd 100%)',
].join(', ');

const {
	spotlight,
	frame,
	titleBar,
	titleIcon,
	titleText,
	atomGraphic,
	orbitDot,
	description,
} = reactSpotlightStyles;

export function ReactSpotlight({
	title,
	text,
	className,
}: ReactSpotlightProps) {
	const { rootRef, atomRef, dotRef } = useSpotlightAnimation();

	return (
		<div
			ref={rootRef}
			className={cn(spotlight, className)}
			style={{
				backgroundImage: SPOTLIGHT_BACKGROUND,
				backgroundSize: '18px 18px, 100% 100%, 100% 100%',
			}}
		>
			<div className={frame}>
				<div className={titleBar}>
					<TechIcon icon={siReact} className={titleIcon} />
					<p className={titleText}>{title}</p>
				</div>

				<svg
					data-m-depth
					viewBox="-180 -180 360 360"
					className={atomGraphic}
					fill="none"
					aria-hidden="true"
				>
					<g ref={atomRef}>
						{ORBIT_ANGLES_DEGREES.map((angle) => (
							<g key={angle} transform={`rotate(${angle})`}>
								<ellipse
									rx={ORBIT_RADIUS_X}
									ry={ORBIT_RADIUS_Y}
									stroke="white"
									strokeWidth="3"
								/>
								{angle === 0 && (
									<circle
										ref={dotRef}
										cx={ORBIT_RADIUS_X}
										cy={0}
										r="7"
										className={orbitDot}
									/>
								)}
							</g>
						))}
					</g>
					<circle r="15" fill="white" />
				</svg>

				<p className={description}>{text}</p>
			</div>
		</div>
	);
}
