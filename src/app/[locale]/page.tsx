import { setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { HomeIntro } from "@/components/home/HomeIntro";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  setRequestLocale(toLocale((await params).locale));

  return <HomeIntro />;
}
