import type { ReactNode } from "react";

export function CodeTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`code-tag ${className}`}>&lt; {children} &#47; &gt;</div>;
}
