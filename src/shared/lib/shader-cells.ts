export type ShaderCellMode = 'grain' | 'accent';

export const MAX_SHADER_CELLS = 16;

const modeByCell = new Map<Element, ShaderCellMode>();

/**
 * Rejestruje element, pod którym shader szarzy (`grain`) lub barwi (`accent`) obraz.
 * Rysowanych jest najwyżej {@link MAX_SHADER_CELLS} widocznych elementów każdego trybu; reszta jest pomijana.
 *
 * @returns funkcja wyrejestrowująca element
 */
export function registerShaderCell(element: Element, mode: ShaderCellMode) {
	modeByCell.set(element, mode);
	return () => {
		modeByCell.delete(element);
	};
}

/** Zapisuje prostokąty widocznych komórek (znormalizowane do płótna, początek w lewym górnym rogu) do tablic uniformów. */
export function collectShaderCells(
	canvas: DOMRect,
	grain: Float32Array,
	accent: Float32Array,
) {
	grain.fill(0);
	accent.fill(0);
	let grainIndex = 0;
	let accentIndex = 0;
	for (const [element, mode] of modeByCell) {
		const rect = element.getBoundingClientRect();
		if (rect.bottom < 0 || rect.top > canvas.height || rect.width === 0) {
			continue;
		}
		const target = mode === 'grain' ? grain : accent;
		const index = mode === 'grain' ? grainIndex++ : accentIndex++;
		if (index >= MAX_SHADER_CELLS) continue;
		target.set(
			[
				(rect.left - canvas.left) / canvas.width,
				(rect.top - canvas.top) / canvas.height,
				rect.width / canvas.width,
				rect.height / canvas.height,
			],
			index * 4,
		);
	}
}
