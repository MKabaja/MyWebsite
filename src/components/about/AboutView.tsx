import Image from "next/image";
import { ArrowUpRight, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ActionButton } from "@/components/ui/ActionButton";
import { CodeTag } from "@/components/ui/CodeTag";
import { stack } from "@/content/stack";
import gridStyles from "./StackGrid.module.css";
import styles from "./AboutView.module.css";

const COLUMN = "w-full md:w-8/12 lg:w-7/12 xl:w-6/12";

export function AboutView() {
  const t = useTranslations("about");

  return (
    <div className="container-xxxl">
      <div className="row mt-0 lg:mt-16">
        <div className="flex flex-col" itemScope itemType="https://schema.org/Person">
          <div className={`${COLUMN} 2xl:w-5/12 mb-6`}>
            <TransitionLink
              href="/"
              className={`back-link mouse-md ${styles.backLink} mt-6 mb-12 lg:mt-0 lg:mb-0`}
            >
              {t("back")}
              <ArrowUpRight size={30} className="ps-2" aria-hidden />
            </TransitionLink>
            <CodeTag className="mt-12 mb-12 hidden lg:block">about</CodeTag>
            <div className="mb-12 flex flex-row items-center">
              <Image
                src="/images/headshot.png"
                alt={t("headshotAlt")}
                width={400}
                height={400}
                priority
                className={`${styles.headshot} me-6 lg:me-12`}
              />
            </div>
            <h2 className="my-6" itemProp="description">
              {t("intro")}
            </h2>
            <div itemProp="knowsAbout">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
            <h3 className="mt-12 mb-4">{t("stackHeading")}</h3>
          </div>
          <div className={COLUMN}>
            <ul className={gridStyles.grid}>
              {stack.map((name) => (
                <li key={name} className={`${gridStyles.tile} mouse-md`}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${COLUMN} 2xl:w-5/12 mb-6 lg:mb-32`}>
            <h3 className="mt-12 mb-6">{t("availabilityHeading")}</h3>
            <p>{t("availability1")}</p>
            <p className="mb-12">{t("availability2")}</p>
            <ActionButton href="/contact" className="mb-16">
              <Send size={16} aria-hidden />
              {t("cta")}
            </ActionButton>
            <LanguageSwitch className="mb-6 font-mono text-[0.85rem] text-text" />
          </div>
        </div>
      </div>
    </div>
  );
}
