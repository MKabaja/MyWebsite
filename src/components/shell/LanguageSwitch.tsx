"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { usePageTransition } from "@/components/transition/TransitionProvider";

const LANGUAGE_NAMES = { pl: "polski", en: "English" } as const;

export function LanguageSwitch({ className = "", linkClassName = "" }: { className?: string; linkClassName?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { navigate } = usePageTransition();

  return (
    <div role="group" aria-label={t("language")} className={`flex items-center gap-2 ${className}`}>
      {routing.locales.map((code, index) => (
        <Fragment key={code}>
          {index > 0 && <span aria-hidden className="text-inherit opacity-50">
              /
            </span>}
          <button
            type="button"
            lang={code}
            aria-current={code === locale ? "true" : undefined}
            aria-label={t("switchTo", { language: LANGUAGE_NAMES[code] })}
            disabled={code === locale}
            onClick={() => navigate(pathname, { locale: code })}
            className={`mouse-sm cursor-pointer text-inherit uppercase transition-opacity disabled:cursor-default ${
              code === locale ? "opacity-100" : "opacity-60 hover:opacity-100"
            } ${linkClassName}`}
          >
            {code}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
