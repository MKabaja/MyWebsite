"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { usePageTransition } from "@/components/transition/TransitionProvider";
import { ScrollHint } from "./ScrollHint";
import styles from "./HomeIntro.module.css";

export function HomeIntro() {
  const t = useTranslations("home");
  const router = useRouter();
  const { navigate } = usePageTransition();
  const lead = t("lead");

  useEffect(() => {
    router.prefetch("/explore");
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) navigate("/explore");
    };
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => document.removeEventListener("wheel", onWheel);
  }, [navigate, router]);

  return (
    <div className={styles.intro}>
      <div className={`container-xxxl ${styles.leadWrapper}`}>
        <h1 className={`lead ${styles.lead}`} aria-label={lead}>
          {Array.from(lead).map((char, index) => (
            <span
              key={index}
              aria-hidden
              className={styles.char}
              style={{ animationDelay: `${0.6 + index * 0.02}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      <ScrollHint className={styles.scrollHint} />
    </div>
  );
}
