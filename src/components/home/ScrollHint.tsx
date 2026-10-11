import { Mouse } from "lucide-react";
import { useTranslations } from "next-intl";
import { TransitionLink } from "@/components/transition/TransitionLink";
import styles from "./ScrollHint.module.css";

export function ScrollHint({ className = "" }: { className?: string }) {
  const t = useTranslations("home");

  return (
    <TransitionLink href="/explore" className={`${styles.hint} mouse-md flex ${className}`}>
      <span className="hidden md:inline-block">{t("scrollHint")}</span>
      <span className="inline-block md:hidden">{t("tapHint")}</span>
      <Mouse className="hidden md:inline-block" size={30} strokeWidth={1.5} aria-hidden />
    </TransitionLink>
  );
}
