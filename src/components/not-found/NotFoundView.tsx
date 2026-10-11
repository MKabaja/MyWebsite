"use client";

import { ArrowUpLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/ui/ActionButton";
import { CodeLine } from "@/components/ui/CodeLine";
import { Logo } from "@/components/ui/Logo";

export function NotFoundView() {
  const t = useTranslations();

  return (
    <div className="container-bs">
      <div className="row mt-32">
        <div className="col-auto">
          <Logo height={40} label={t("person.homeLink")} />
          <CodeLine number="404" className="mt-12 mb-12 lg:mt-24">
            <span className="code--purple">error:</span>
            <span className="code--yellow">&nbsp;page</span>
            <span className="code--green">&nbsp;not</span>
            <span className="code--white">&nbsp;found</span>
          </CodeLine>
          <h1 className="lead mb-12 max-w-[740px] text-[#f2f2f2] [text-shadow:0_22px_30px_rgba(0,0,0,0.4)]">
            {t("notFound.title")}
          </h1>
          <p className="mb-16 text-[#f8f9fa]">
            {t("notFound.text")}
            <br />
            <em>{t("notFound.hint")}</em>
          </p>
          <div data-aos="fade-up">
            <ActionButton href="/">
              <ArrowUpLeft size={16} aria-hidden />
              {t("notFound.back")}
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
