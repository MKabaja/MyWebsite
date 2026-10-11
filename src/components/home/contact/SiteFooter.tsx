"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitch } from "@/components/shell/LanguageSwitch";
import { Logo } from "@/components/ui/Logo";

/** Bottom row of the home page: logo, copyright and language switch. */
export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="flex flex-col items-center gap-5 border-t border-dashed border-guide bg-graphite px-5 py-8 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
      <Logo height={28} label={t("person.homeLink")} />
      <p className="font-mono text-[0.8rem] text-on-dark-muted">
        {t("home.contact.copyright", { year: new Date().getFullYear() })}
      </p>
      <LanguageSwitch className="font-mono text-[0.85rem] text-on-dark-muted" linkClassName="min-h-11 min-w-8 hover:text-white" />
    </footer>
  );
}
