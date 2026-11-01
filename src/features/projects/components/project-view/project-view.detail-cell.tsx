import type { ReactNode } from 'react';
import { projectViewStyles } from './project-view.styles';

type DetailCellProps = {
	label: string;
	children: ReactNode;
};

const { detailCell, detailLabel, detailValue } = projectViewStyles;

export function DetailCell({ label, children }: DetailCellProps) {
	return (
		<div className={detailCell}>
			<dt className={detailLabel}>{label}</dt>
			<dd className={detailValue}>{children}</dd>
		</div>
	);
}
