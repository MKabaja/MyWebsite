"use client";

import { useTranslations } from "next-intl";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { StatusIndicator } from "./StatusIndicator";
import styles from "./BottomBar.module.css";

export function BottomBar({ className = "" }: { className?: string }) {
  const t = useTranslations();

  const socials = [
    { href: site.social.github, label: t("social.github"), Icon: GithubIcon },
    { href: site.social.linkedin, label: t("social.linkedin"), Icon: LinkedinIcon },
    { href: site.social.facebook, label: t("social.facebook"), Icon: FacebookIcon },
  ];

  return (
    <div id="bottom-bar" className={`${styles.wrapper} ${className}`}>
      <div className={`${styles.bar} row items-end justify-between pb-2 md:pb-4`}>
        <div className="col-auto flex items-center" itemScope itemType="https://schema.org/Person">
          <Logo height={30} label={t("person.homeLink")} className="pb-2" />
          <h1 className={`${styles.title} ms-6`}>
            <span itemProp="name">{t("person.name")}</span>
            <br />
            <span itemProp="jobTitle">{t("person.jobTitle")}</span>
          </h1>
        </div>
        <div className="col-auto mb-4 flex items-center">
          <LanguageSwitch className={`${styles.language} me-6`} />
          {socials.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`${styles.social} mouse-sm me-6 hidden xl:inline`}
            >
              <Icon size={20} />
            </a>
          ))}
          <StatusIndicator label={t("person.status")} className="ms-2 hidden xl:block" />
        </div>
      </div>
    </div>
  );
}
