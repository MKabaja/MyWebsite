import { Tile } from "@/components/grid/Tile";
import { LineNumbers } from "@/components/grid/LineNumbers";

/**
 * Decorative column next to the hire block: shader "windows", grained cells and an accent strip,
 * drifting at slightly different speeds (ScrollSmoother `data-speed`). Collapses to a thin strip on mobile.
 */
export function HireTiles() {
  return (
    <div aria-hidden className="lg:col-span-4">
      <div className="grid h-20 grid-cols-4 lg:hidden">
        <Tile mode="grain" />
        <Tile mode="window" />
        <Tile mode="accent" />
        <Tile mode="window" />
      </div>

      <div className="hidden grid-cols-2 lg:grid lg:h-full lg:grid-rows-[13rem_9rem_5rem_15rem_minmax(4rem,1fr)]">
        <Tile mode="grain" />
        <Tile mode="window" />
        <Tile mode="window" data-speed="clamp(1.06)" />
        <Tile mode="grain" className="row-span-2 flex justify-end overflow-hidden px-4 pt-3">
          <LineNumbers count={6} />
        </Tile>
        <Tile mode="accent" data-speed="clamp(1.12)" />
        <Tile mode="solid" />
        <Tile mode="window" data-speed="clamp(1.04)" />
        <Tile mode="solid" lines={["top"]} className="col-span-2" />
      </div>
    </div>
  );
}
