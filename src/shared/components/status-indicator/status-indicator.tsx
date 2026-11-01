import { cn } from '@/shared/lib/utils';
import styles from './status-indicator.module.css';

type StatusIndicatorProps = {
	label: string;
	className?: string;
};

export function StatusIndicator({ label, className }: StatusIndicatorProps) {
	return (
		<div className={cn(styles.indicator, className)}>
			<span className={styles.light} aria-hidden /> {label}
		</div>
	);
}
