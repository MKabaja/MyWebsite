"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./NavMenu.module.css";

/** Hamburger in the top-right corner that reveals the links when the mouse approaches. */
export function NavMenu({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const width = window.innerWidth;
      setOpen(event.clientY < 180 && event.clientX > Math.min(width / 2, width - 800));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`${styles.container} ${className}`} data-open={open}>
      <div className={styles.icon} aria-hidden>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <nav className={styles.links}>
        <TransitionLink href="/about" className="mouse-md">
          {t("about")}
        </TransitionLink>
        <TransitionLink href="/explore" className="mouse-md">
          {t("explore")}
        </TransitionLink>
        <TransitionLink href="/contact" className="mouse-md">
          {t("contact")}
        </TransitionLink>
        <LanguageSwitch className={styles.language} linkClassName={styles.languageLink} />
      </nav>
    </div>
  );
}
