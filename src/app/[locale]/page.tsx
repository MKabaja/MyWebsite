import { setRequestLocale } from "next-intl/server";
import { toLocale } from "@/i18n/routing";
import { HomePage } from "@/components/home/HomePage";

export default async function Page({ params }: PageProps<"/[locale]">) {
  setRequestLocale(toLocale((await params).locale));

  return <HomePage />;
}
