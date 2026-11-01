import { LineNumbers } from '@/shared/components/line-numbers';
import { Tile } from '@/shared/components/tile';
import { hireTilesStyles } from './hire-tiles.styles';

const { column, mobileStrip, desktopGrid, lineNumbersTile, closingTile } =
	hireTilesStyles;

export function HireTiles() {
	return (
		<div aria-hidden className={column}>
			<div className={mobileStrip}>
				<Tile mode="grain" />
				<Tile mode="window" />
				<Tile mode="accent" />
				<Tile mode="window" />
			</div>

			<div className={desktopGrid}>
				<Tile mode="grain" />
				<Tile mode="window" />
				<Tile mode="window" data-speed="clamp(1.06)" />
				<Tile mode="grain" className={lineNumbersTile}>
					<LineNumbers count={6} />
				</Tile>
				<Tile mode="accent" data-speed="clamp(1.12)" />
				<Tile mode="solid" />
				<Tile mode="window" data-speed="clamp(1.04)" />
				<Tile mode="solid" lines={['top']} className={closingTile} />
			</div>
		</div>
	);
}
