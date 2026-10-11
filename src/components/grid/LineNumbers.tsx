/** Column of zero-padded line numbers (code-editor gutter decoration). */
export function LineNumbers({ count, className = "" }: { count: number; className?: string }) {
  return (
    <ol aria-hidden className={`m-0 list-none p-0 font-mono text-[0.8rem] leading-8 text-white/25 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="text-inherit">
          {String(i + 1).padStart(2, "0")}
        </li>
      ))}
    </ol>
  );
}
