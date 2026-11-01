import { cn } from '@/shared/lib/utils';
import { lineNumbersStyles } from './line-numbers.styles';

type LineNumbersProps = {
	count: number;
	className?: string;
};

const { list, number } = lineNumbersStyles;

export function LineNumbers({ count, className }: LineNumbersProps) {
	const labels = Array.from({ length: count }, (_, index) =>
		String(index + 1).padStart(2, '0'),
	);

	return (
		<ol aria-hidden className={cn(list, className)}>
			{labels.map((label) => (
				<li key={label} className={number}>
					{label}
				</li>
			))}
		</ol>
	);
}
