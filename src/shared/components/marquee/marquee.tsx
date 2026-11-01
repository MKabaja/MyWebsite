import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './marquee.module.css';

type MarqueeProps = {
	children: ReactNode;
	repeat?: number;
	durationInSeconds?: number;
	className?: string;
};

export function Marquee({
	children,
	repeat = 6,
	durationInSeconds = 30,
	className,
}: MarqueeProps) {
	const copyIds = Array.from(
		{ length: repeat * 2 },
		(_, copyIndex) => copyIndex,
	);

	return (
		<div className={cn(styles.marquee, className)}>
			<div
				data-marquee
				className={styles.track}
				style={{
					animationDuration: `${durationInSeconds}s`,
					animationDirection: 'normal',
				}}
			>
				{copyIds.map((copyId) => (
					<span key={copyId} className={styles.item} aria-hidden={copyId > 0}>
						{children}
					</span>
				))}
			</div>
		</div>
	);
}
