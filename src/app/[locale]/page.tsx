import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/features/home/components/home-page';
import { toLocale } from '@/i18n/routing';

export default async function Page({ params }: PageProps<'/[locale]'>) {
	setRequestLocale(toLocale((await params).locale));

	return <HomePage />;
}
