import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/seo";
import { ExploreSlider } from "@/components/explore/ExploreSlider";

export async function generateMetadata({ params }: PageProps<"/[locale]/explore">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("exploreTitle"), alternates: localeAlternates(locale, "/explore") };
}

export default async function ExplorePage({ params }: PageProps<"/[locale]/explore">) {
  setRequestLocale(toLocale((await params).locale));
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ExploreSlider />
    </div>
  );
}
