import type { Project } from './projects.types';

export const drivebookProject: Project = {
	slug: 'drivebook',
	title: 'DriveBook',
	type: { pl: 'Aplikacja fullstack', en: 'Full-stack app' },
	lead: {
		pl: 'System rezerwacji aut: publiczny katalog, wycena na wybrany termin i checkout z symulowaną płatnością.',
		en: 'A car rental booking system: a public catalogue, per-date pricing and a checkout with a simulated payment.',
	},
	status: 'completed',
	statusNote: {
		pl: 'Ukończony i wdrożony na własnym serwerze',
		en: 'Finished and deployed on my own server',
	},
	role: {
		pl: 'Fullstack',
		en: 'Full-stack',
	},
	period: { pl: '11/2026', en: '11/2026' },
	stack: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS'],
	media: {
		kind: 'video',
		mp4: '/video/drivebook.mp4',
		cover: '/images/projects/drivebook.jpg',
	},
	links: {
		live: 'https://drivebook.duckdns.org/',
		repositories: [{ url: 'https://github.com/MKabaja/DriveBook' }],
	},
	content: [
		{
			type: 'paragraph',
			text: {
				pl: 'Przebudowałem prostą aplikację do rezerwacji sal w system wynajmu aut, żeby zmierzyć się z problemami, które pojawiają się w prawdziwych produktach. Domena jest celowo mała, dzięki czemu widać rzeczy, w których najłatwiej o błąd: daty i strefy czasowe, dokładne ceny, współbieżne rezerwacje i bezpieczną sesję w SPA.',
				en: 'I rebuilt a simple room booking app into a car rental system to work on the problems real products have. The domain is deliberately small, which puts the focus on what is easiest to get wrong: dates and time zones, exact prices, concurrent bookings and a secure session in an SPA.',
			},
		},
		{
			type: 'paragraph',
			text: {
				pl: 'Użytkownik filtruje 18 aut po terminie, liczbie miejsc i skrzyni biegów, widzi cenę za wybrane dni, a gdy auto jest zajęte, dostaje propozycję kolejnego wolnego terminu. Zalogować się może w trakcie checkoutu, bez utraty wyboru. Własne rezerwacje anuluje do 10:00 w dniu odbioru.',
				en: 'Users filter 18 cars by dates, seats and transmission, see the price for the chosen days and, when a car is taken, get the next free slot suggested. They can sign in during checkout without losing their choice, and cancel their own bookings until 10:00 on the pick-up day.',
			},
		},
		{
			type: 'paragraph',
			text: {
				pl: 'To projekt portfolio, nie usługa dla prawdziwych klientów, więc płatność jest symulowana: karta 4242 4242 4242 4242 przechodzi, a 4000 0000 0000 0002 jest odrzucana. Dane karty nie trafiają do API.',
				en: 'This is a portfolio project rather than a service for real customers, so the payment is simulated: card 4242 4242 4242 4242 is approved and 4000 0000 0000 0002 is declined. Card details never reach the API.',
			},
		},
	],
	caseStudy: {
		stackGroups: [
			{
				name: 'frontend',
				technologies: [
					'React',
					'TypeScript',
					'Vite',
					'TanStack Router',
					'Zod',
					'Tailwind CSS',
					'Motion',
				],
			},
			{
				name: 'backend',
				technologies: ['Laravel', 'PHP', 'MySQL', 'Sanctum'],
			},
			{
				name: 'quality',
				technologies: ['Pest', 'Larastan', 'Vitest', 'MSW', 'Biome'],
			},
			{
				name: 'infrastructure',
				technologies: ['Docker', 'nginx', 'Hetzner', 'GitHub Actions'],
			},
		],
		problems: [
			{
				title: {
					pl: 'Dwie osoby rezerwują to samo auto',
					en: 'Two people book the same car',
				},
				problem: {
					pl: 'Nakładających się dat nie da się wyrazić indeksem unikalnym, więc baza sama nie odrzuci duplikatu.',
					en: 'Overlapping dates cannot be expressed as a unique index, so the database will not reject a duplicate on its own.',
				},
				solution: {
					pl: 'Transakcja blokuje wiersz auta, dopiero potem sprawdza konflikty i zapisuje. Działanie blokady potwierdza test, w którym dwa niezależne procesy PHP czekają na nią na prawdziwym MySQL.',
					en: 'A transaction locks the car row, and only then checks for conflicts and saves. A test proves the lock works by making two independent PHP processes wait for it on real MySQL.',
				},
			},
			{
				title: {
					pl: 'Cena zmienia się przed płatnością',
					en: 'The price changes before payment',
				},
				problem: {
					pl: 'Użytkownik mógłby zapłacić inną kwotę, niż widział na ekranie.',
					en: 'Users could pay a different amount than the one they saw.',
				},
				solution: {
					pl: 'Klient odsyła wyświetloną stawkę. Gdy jest nieaktualna, API odpowiada 409, strona pokazuje nową sumę, a rezerwacja idzie dopiero po ponownej płatności.',
					en: 'The client sends back the rate it displayed. If it is out of date, the API responds with 409, the page shows the new total and the booking only goes through after paying again.',
				},
			},
			{
				title: {
					pl: 'Daty i zmiana czasu',
					en: 'Dates and daylight saving',
				},
				problem: {
					pl: 'Liczenie na UTC psułoby regułę „odbiór najwcześniej jutro” wieczorem oraz liczbę dób przy zmianie czasu.',
					en: 'Calculating in UTC would break the “earliest pick-up tomorrow” rule in the evening and the day count when the clocks change.',
				},
				solution: {
					pl: 'Daty kalendarzowe jako przedział półotwarty, jedna strefa z konfiguracji, doby liczone jako różnica dat, a ceny w groszach z zapisanym snapshotem.',
					en: 'Calendar dates as a half-open range, one time zone from config, days counted as a date difference, and prices in integer grosze with a stored snapshot.',
				},
			},
			{
				title: {
					pl: 'Test padający raz na dziesięć',
					en: 'A test failing one run in ten',
				},
				problem: {
					pl: 'Wyglądało to na wyścig w kodzie, ale przyczyną był zegar: synchronizacja w WSL2 przestawiała czas, a router wyliczał z niego opóźnienia.',
					en: 'It looked like a race in the code, but the cause was the clock: WSL2 time sync kept moving it, and the router calculated delays from it.',
				},
				solution: {
					pl: 'Sztuczny Date w każdym teście zamiast wydłużania timeoutów. Wynik: 60 przebiegów na 60 zielonych przy skaczącym zegarze.',
					en: 'A fake Date in every test instead of longer timeouts. The result: 60 green runs out of 60 with the clock jumping.',
				},
			},
		],
		stages: [
			{
				state: 'done',
				title: { pl: 'Katalog i wycena', en: 'Catalogue and pricing' },
				description: {
					pl: 'Filtry w URL, cena za termin, propozycja wolnego terminu.',
					en: 'Filters in the URL, per-date pricing, next free slot suggestion.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Checkout i sesja', en: 'Checkout and session' },
				description: {
					pl: 'Logowanie w trakcie rezerwacji, sesje Sanctum, płatność demo.',
					en: 'Sign-in during booking, Sanctum sessions, demo payment.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Rezerwacje', en: 'Bookings' },
				description: {
					pl: 'Lista rezerwacji, anulowanie i ochrona przed podwójną rezerwacją.',
					en: 'Booking list, cancellation and double-booking protection.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Testy i CI', en: 'Tests and CI' },
				description: {
					pl: 'Testy na prawdziwym MySQL, testy frontendu z MSW, cztery workflowy.',
					en: 'Tests on real MySQL, frontend tests with MSW, four workflows.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Wdrożenie', en: 'Deployment' },
				description: {
					pl: 'Własny serwer, nginx i Docker, baza bez wystawionego portu.',
					en: 'My own server, nginx and Docker, a database with no exposed port.',
				},
			},
		],
	},
};
