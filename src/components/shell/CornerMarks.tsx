import { Plus } from "lucide-react";

const POSITIONS = ["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"];

/** "+" registration marks fixed in the viewport corners (desktop decoration). */
export function CornerMarks() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 hidden lg:block">
      {POSITIONS.map((position) => (
        <Plus key={position} className={`absolute ${position} size-3.5 text-white/30`} strokeWidth={1.25} />
      ))}
    </div>
  );
}
