import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { AboutView } from "@/components/about/AboutView";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const t = await getTranslations({ locale: toLocale((await params).locale), namespace: "meta" });
  return { title: t("aboutTitle") };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  setRequestLocale(toLocale((await params).locale));
  return <AboutView />;
}
