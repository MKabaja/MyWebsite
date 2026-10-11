import type { ReactNode } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function ActionButton({ href, external = false, className = "", children }: ActionButtonProps) {
  const classes = `${styles.button} mouse-md ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={classes}>
      {children}
    </TransitionLink>
  );
}
