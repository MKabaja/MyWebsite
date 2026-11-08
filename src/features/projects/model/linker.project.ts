import type { Project } from './projects.types';

export const linkerProject: Project = {
	slug: 'linker',
	title: 'Linker',
	type: { pl: 'Narzędzie wewnętrzne', en: 'Internal tool' },
	lead: {
		pl: 'Narzędzie dla sklepu internetowego: porównuje zamówienia, które utknęły przez brak towaru, z ofertą hurtowni, a wkrótce usprawni też przyjmowanie zwrotów.',
		en: 'A tool for an online store: it matches orders stuck on missing stock against a wholesaler’s offer, and will soon speed up handling returns too.',
	},
	status: 'in-progress',
	statusNote: {
		pl: 'Rozwijam go w pracy',
		en: 'Built as part of my job',
	},
	role: { pl: 'Projekt i implementacja', en: 'Design & development' },
	period: { pl: '10/2026 – obecnie', en: '10/2026 – present' },
	stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zod'],
	media: {
		kind: 'image',
		cover: '/images/projects/linker.jpg',
		widthInPixels: 1908,
		heightInPixels: 937,
		alt: {
			pl: 'Widok produktów w Linkerze: tabela ze zdjęciem, kodem EAN i nazwą, z zamazanymi cenami i stanami',
			en: 'The Linker products view: a table with a photo, EAN code and name, with prices and stock blurred',
		},
	},
	links: {
		live: 'https://linkerdev.netlify.app/products',
		repositories: [{ url: 'https://github.com/MKabaja/linker' }],
	},
	content: [
		{
			type: 'paragraph',
			text: {
				pl: 'W sklepie z kosmetykami część zamówień zatrzymuje się, bo brakuje towaru, a panel nie mówi, której pozycji. Dziś ktoś sprawdza to ręcznie, szuka produktu w hurtowni i składa zamówienie. Linker ma zebrać takie zamówienia z BaseLinkera, porównać je po EAN z ofertą hurtowni i oddać gotową listę do zamówienia.',
				en: 'At a cosmetics store some orders get stuck on missing stock, and the panel does not say which item is missing. Today someone checks this by hand, looks for the product at a wholesaler and places an order. Linker is meant to collect those orders from BaseLinker, match them by EAN against the wholesaler’s offer and hand over a ready order list.',
			},
		},
		{
			type: 'heading',
			text: { pl: 'Co działa dzisiaj', en: 'What works today' },
		},
		{
			type: 'paragraph',
			text: {
				pl: 'Gotowy jest widok produktów z hurtowni: wyszukiwanie po EAN i nazwie działające na serwerze, paginacja, miniatury, kopiowanie wartości jednym kliknięciem i dane odświeżane w tle. Zakładki Zamówienia i Lista zakupów to na razie puste ekrany.',
				en: 'The wholesaler products view is ready: server-side search by EAN and name, pagination, thumbnails, one-click copying and data refreshed in the background. The Orders and Shopping list tabs are still empty screens.',
			},
		},
		{
			type: 'heading',
			text: { pl: 'Następny moduł: zwroty', en: 'Next module: returns' },
		},
		{
			type: 'paragraph',
			text: {
				pl: 'Do magazynu codziennie wracają paczki, a znalezienie zamówienia bywa żmudne: dane klienta na etykiecie są zagwiazdkowane, paczka ma kilka numerów, a API BaseLinkera nie szuka po numerze przesyłki.',
				en: 'Parcels come back to the warehouse every day, and finding the order can be tedious: customer details on the label are masked, a parcel has several numbers, and the BaseLinker API cannot search by shipment number.',
			},
		},
		{
			type: 'paragraph',
			text: {
				pl: 'Plan: pracownik skanuje etykietę telefonem, Linker sam znajduje zamówienie we własnym indeksie, a potem skanuje produkty i zapisuje zwrot z historią zmian. Gdy kod kreskowy nic nie da, tekst z etykiety odczyta OCR. BaseLinkera moduł tylko czyta, a danych osobowych przechowuje tyle, ile potrzeba do wyszukiwania.',
				en: 'The plan: an employee scans the label with a phone, Linker finds the order in its own index, then the employee scans the products and saves the return with a change history. If a barcode gives nothing, OCR reads the label text. The module only reads from BaseLinker and stores no more personal data than search needs.',
			},
		},
	],
	caseStudy: {
		stackGroups: [
			{
				name: 'frontend',
				technologies: [
					'Next.js',
					'React',
					'TypeScript',
					'Tailwind CSS',
					'shadcn/ui',
					'TanStack Table',
				],
			},
			{
				name: 'backend',
				technologies: [
					'Server Components',
					'Zod',
					'papaparse',
					'BaseLinker API',
				],
			},
			{ name: 'quality', technologies: ['Biome'] },
			{ name: 'infrastructure', technologies: ['Netlify'] },
		],
		problems: [
			{
				title: {
					pl: 'Wyszukiwarka traciła fokus',
					en: 'The search box lost focus',
				},
				problem: {
					pl: 'Każda zmiana parametrów w URL przemontowywała stronę razem z polem wyszukiwania.',
					en: 'Every URL parameter change remounted the page together with the search box.',
				},
				solution: {
					pl: 'Pole przeniesione do layoutu, debounce 300 ms, nawigacja w startTransition i synchronizacja z URL rozdzielona na dwa stany.',
					en: 'The field moved to the layout, with a 300 ms debounce, navigation in startTransition and URL sync split into two states.',
				},
			},
			{
				title: { pl: 'Migające ładowanie', en: 'Flickering loading states' },
				problem: {
					pl: 'Skeleton przy każdym wyszukiwaniu był męczący podczas codziennej pracy.',
					en: 'A skeleton on every search was tiring in daily use.',
				},
				solution: {
					pl: 'Skeleton pojawia się tylko przy pierwszym wejściu, a przy kolejnych wyszukiwaniach stare wyniki są lekko przyciemnione do czasu nowych.',
					en: 'The skeleton only appears on first entry, and on later searches the old results are slightly dimmed until the new ones arrive.',
				},
			},
			{
				title: {
					pl: 'Świeże dane bez czekania',
					en: 'Fresh data without waiting',
				},
				problem: {
					pl: 'Cennik hurtowni to duży plik CSV, a pobieranie go przy każdym wejściu spowalniałoby pracę.',
					en: 'The wholesaler’s price list is a large CSV file, and downloading it on every visit would slow work down.',
				},
				solution: {
					pl: 'Pamięć serwera: do minuty dane z cache, do pięciu minut od razu stare i nowe w tle, a jednoczesne zapytania korzystają z jednego pobierania.',
					en: 'A server cache: up to a minute straight from memory, up to five minutes stale first with fresh data in the background, and concurrent requests share one download.',
				},
			},
			{
				title: {
					pl: 'Kod, który nie rozjedzie się z czasem',
					en: 'Code that will not drift over time',
				},
				problem: {
					pl: 'Narzędzie ma rosnąć o kolejne moduły, a struktura musi to wytrzymać.',
					en: 'The tool will keep gaining modules, and its structure has to cope with that.',
				},
				solution: {
					pl: 'Struktura feature-first z warstwami źródła, mapery, repozytoria i serwisy, a kierunek zależności pilnuje Biome.',
					en: 'A feature-first structure with source, mapper, repository and service layers, with the dependency direction enforced by Biome.',
				},
			},
		],
		stages: [
			{
				state: 'done',
				title: { pl: 'Szkielet aplikacji', en: 'App skeleton' },
				description: {
					pl: 'Layout, nawigacja i zwijany sidebar.',
					en: 'Layout, navigation and a collapsible sidebar.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Produkty z hurtowni', en: 'Wholesaler products' },
				description: {
					pl: 'Tabela, wyszukiwanie po EAN i nazwie, cache na serwerze.',
					en: 'Table, search by EAN and name, server-side cache.',
				},
			},
			{
				state: 'current',
				title: { pl: 'Moduł zwrotów', en: 'Returns module' },
				description: {
					pl: 'Plan i rozpoznanie API gotowe, teraz czas na kod.',
					en: 'The plan and API research are done, the code comes next.',
				},
			},
			{
				state: 'planned',
				title: { pl: 'Zamówienia z BaseLinkera', en: 'BaseLinker orders' },
				description: {
					pl: 'Zamówienia z brakami i dostępność w hurtowni po EAN.',
					en: 'Orders with missing stock and availability by EAN.',
				},
			},
			{
				state: 'planned',
				title: { pl: 'Lista zakupów i CSV', en: 'Shopping list and CSV' },
				description: {
					pl: 'Gotowy plik do importu w hurtowni i lista dla sklepów.',
					en: 'A file ready to import at the wholesaler and a list for the stores.',
				},
			},
		],
	},
};
