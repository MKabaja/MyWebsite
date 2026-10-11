import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { ExploreSlider } from "@/components/explore/ExploreSlider";

export async function generateMetadata({ params }: PageProps<"/[locale]/explore">): Promise<Metadata> {
  const t = await getTranslations({ locale: toLocale((await params).locale), namespace: "meta" });
  return { title: t("exploreTitle") };
}

export default async function ExplorePage({ params }: PageProps<"/[locale]/explore">) {
  setRequestLocale(toLocale((await params).locale));
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ExploreSlider />
    </div>
  );
}
