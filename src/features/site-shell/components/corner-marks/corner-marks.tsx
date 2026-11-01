import { Plus } from 'lucide-react';
import { cornerMarksStyles } from './corner-marks.styles';

const { frame, markTopLeft, markTopRight, markBottomLeft, markBottomRight } =
	cornerMarksStyles;

const markClassNames = [
	markTopLeft,
	markTopRight,
	markBottomLeft,
	markBottomRight,
];

export function CornerMarks() {
	return (
		<div aria-hidden className={frame}>
			{markClassNames.map((markClassName) => (
				<Plus
					key={markClassName}
					className={markClassName}
					strokeWidth={1.25}
				/>
			))}
		</div>
	);
}
