import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { ContactView } from "@/components/contact/ContactView";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const t = await getTranslations({ locale: toLocale((await params).locale), namespace: "meta" });
  return { title: t("contactTitle") };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  setRequestLocale(toLocale((await params).locale));
  return <ContactView />;
}
