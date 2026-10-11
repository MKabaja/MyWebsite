import type { ReactNode } from "react";
import styles from "./CodeLine.module.css";

type CodeLineProps = {
  number: string;
  className?: string;
  /** `<span className="code--{white|purple|yellow|green|orange}">` tokens, typed in one by one. */
  children: ReactNode;
};

export function CodeLine({ number, className = "", children }: CodeLineProps) {
  return (
    <div className={`${styles.codeLine} ${className}`}>
      <div className={styles.number}>{number}</div>
      <div className={styles.code}>{children}</div>
    </div>
  );
}
