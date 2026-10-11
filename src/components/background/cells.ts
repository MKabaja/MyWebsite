/**
 * Registry of DOM elements that change how the WebGL background is drawn underneath them.
 * Read by the render loop every frame — no React state involved.
 *
 * - `grain`: the shader is desaturated, darkened and grained (the "paper" tiles).
 * - `accent`: like `grain`, but tinted with the accent colour (the orange strips).
 */
export type CellMode = "grain" | "accent";

export const MAX_CELLS = 16;

const cells = new Map<Element, CellMode>();

export function registerCell(element: Element, mode: CellMode) {
  cells.set(element, mode);
  return () => {
    cells.delete(element);
  };
}

/** Writes visible cell rects (normalised to the canvas, origin top-left) into the uniform arrays. */
export function collectCells(canvas: DOMRect, grain: Float32Array, accent: Float32Array) {
  grain.fill(0);
  accent.fill(0);
  let g = 0;
  let a = 0;
  for (const [element, mode] of cells) {
    const rect = element.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > canvas.height || rect.width === 0) continue;
    const target = mode === "grain" ? grain : accent;
    const index = mode === "grain" ? g++ : a++;
    if (index >= MAX_CELLS) continue;
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
