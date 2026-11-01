import { cn } from '@/shared/lib/utils';
import { classNameBySide, guideOutStyles } from './guide-out.styles';

type GuideOutProps = {
	side: keyof typeof classNameBySide;
	className?: string;
};

const { guide, guideLine } = guideOutStyles;

export function GuideOut({ side, className }: GuideOutProps) {
	return (
		<span
			aria-hidden
			className={cn(guide, classNameBySide[side], guideLine, className)}
		/>
	);
}
