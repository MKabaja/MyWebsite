import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/seo";
import { ContactView } from "@/components/contact/ContactView";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("contactTitle"), alternates: localeAlternates(locale, "/contact") };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  setRequestLocale(toLocale((await params).locale));
  return <ContactView />;
}
