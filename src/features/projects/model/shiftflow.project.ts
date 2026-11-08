import type { Project } from './projects.types';

export const shiftflowProject: Project = {
	slug: 'shiftflow',
	title: 'ShiftFlow',
	type: { pl: 'Aplikacja fullstack', en: 'Full-stack app' },
	lead: {
		pl: 'System do układania grafików pracy, który zastępuje ręczne planowanie zmian w Excelu.',
		en: 'A shift-scheduling system that replaces planning shifts by hand in Excel.',
	},
	status: 'in-progress',
	statusNote: {
		pl: 'Rozwijam go po godzinach',
		en: 'Built in my spare time',
	},
	role: { pl: 'Fullstack', en: 'Full-stack' },
	period: { pl: '12/2025 – obecnie', en: '12/2025 – present' },
	stack: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Redis'],
	media: {
		kind: 'video',
		mp4: '/video/shiftflow.mp4',
		cover: '/images/projects/shiftflow.jpg',
	},
	links: {
		live: 'https://shiftflow.duckdns.org/',
		repositories: [
			{
				part: 'frontend',
				url: 'https://github.com/MKabaja/shiftflow-frontend',
			},
			{ part: 'backend', url: 'https://github.com/MKabaja/SHIFTFlow' },
		],
	},
	content: [
		{
			type: 'paragraph',
			text: {
				pl: 'Kierownik układa miesięczny grafik dla 27 wyspecjalizowanych stanowisk i musi pilnować dyspozycyjności ludzi, limitów godzin oraz obowiązkowych przerw. Do tej pory robił to ręcznie w Excelu: zmiana po zmianie, bez walidacji i bez jednego źródła prawdy.',
				en: 'A manager builds a monthly schedule for 27 specialised positions and has to respect availability, hour limits and mandatory rest. Until now this was done by hand in Excel: one shift at a time, with no validation and no single source of truth.',
			},
		},
		{
			type: 'paragraph',
			text: {
				pl: 'ShiftFlow sprawdza reguły na serwerze, zanim zmiana zostanie zapisana, importuje pracowników z pliku CSV i ma dwóch odbiorców w jednej responsywnej aplikacji: kierownika przy biurku i pracownika na telefonie między zmianami.',
				en: 'ShiftFlow validates the rules on the server before a shift is saved, imports employees from a CSV file and serves two audiences in one responsive app: a manager at a desk and an employee on a phone between shifts.',
			},
		},
		{
			type: 'heading',
			text: { pl: 'Co zobaczysz w demo', en: 'What you will see in the demo' },
		},
		{
			type: 'paragraph',
			text: {
				pl: 'Backend jest znacznie dalej niż front: API z grafikami, zmianami, dyspozycyjnością i importem działa na produkcji. W interfejsie gotowe są landing z wyborem roli, logowanie hasłem i PIN-em, sesja, nawigacja, wersje PL i EN oraz aktualności. Pozostałe ekrany to na razie zaślepki.',
				en: 'The backend is well ahead of the frontend: the API for schedules, shifts, availability and import runs in production. The interface already has a landing page with role choice, password and PIN sign-in, session handling, navigation, Polish and English versions, and a news feed. The other screens are placeholders for now.',
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
					'TanStack Query',
					'React Hook Form',
					'Zod',
					'Tailwind CSS',
					'Motion',
				],
			},
			{
				name: 'backend',
				technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'JWT'],
			},
			{
				name: 'quality',
				technologies: ['Pest', 'PHPStan', 'Vitest', 'MSW'],
			},
			{
				name: 'infrastructure',
				technologies: ['Docker', 'nginx', 'Hetzner', 'GitHub Actions'],
			},
		],
		problems: [
			{
				title: { pl: 'Wiele reguł naraz', en: 'Many rules at once' },
				problem: {
					pl: 'Jedna zmiana może naruszyć uprawnienia do stanowiska, dyspozycyjność, minimalną przerwę albo limit godzin.',
					en: 'A single shift can break position permissions, availability, minimum rest or hour limits.',
				},
				solution: {
					pl: 'Każda reguła to osobny walidator, a siedem walidatorów łączy wzorzec Chain of Responsibility. Błąd jednej pozycji zatrzymuje zapis całego zestawu.',
					en: 'Each rule is a separate validator, and seven of them are joined with Chain of Responsibility. An error in one position stops the whole set from being saved.',
				},
			},
			{
				title: { pl: 'Gdzie trzymać token', en: 'Where to keep the token' },
				problem: {
					pl: 'JWT w localStorage jest podatny na XSS, a trzymany w pamięci znika po odświeżeniu strony.',
					en: 'A JWT in localStorage is exposed to XSS, and one kept in memory disappears on refresh.',
				},
				solution: {
					pl: 'Token siedzi w ciasteczku HttpOnly z SameSite=Lax, które mały middleware tłumaczy na nagłówek. Wylogowanie unieważnia go przez blacklistę w Redis.',
					en: 'The token lives in an HttpOnly, SameSite=Lax cookie that a small middleware translates into a header. Signing out invalidates it through a Redis blacklist.',
				},
			},
			{
				title: {
					pl: 'Front i API na różnych domenach',
					en: 'Frontend and API on different domains',
				},
				problem: {
					pl: 'Domena na liście Public Suffix nie pozwala współdzielić ciasteczka między subdomenami, a inny hosting frontu wymagałby SameSite=None.',
					en: 'A domain on the Public Suffix List cannot share a cookie across subdomains, and hosting the frontend elsewhere would require SameSite=None.',
				},
				solution: {
					pl: 'Front i API działają na jednym serwerze: nginx serwuje build i przekazuje /api do Laravela, a lokalnie to samo robi proxy w Vite.',
					en: 'The frontend and API run on one server: nginx serves the build and proxies /api to Laravel, and the Vite proxy does the same locally.',
				},
			},
			{
				title: {
					pl: 'Refaktor bez zmiany zachowania',
					en: 'A refactor that changes no behaviour',
				},
				problem: {
					pl: 'Warstwa transportu przeciekała do zapytań, a rosnąca aplikacja coraz trudniej znosiłaby przebudowę.',
					en: 'The transport layer was leaking into queries, and the growing app would be harder and harder to rebuild.',
				},
				solution: {
					pl: 'Przebudowa zanim aplikacja urośnie: małe PR-y wdrażane osobno, własny klient fetch, kontrakt API w Zodzie, a asercje testów pozostają nietknięte jako dowód.',
					en: 'Rebuilding before the app grows: small PRs deployed one at a time, my own fetch client, an API contract in Zod, with test assertions left untouched as proof.',
				},
			},
		],
		stages: [
			{
				state: 'done',
				title: { pl: 'REST API', en: 'REST API' },
				description: {
					pl: 'Grafiki, zmiany, dyspozycyjność i import CSV na produkcji.',
					en: 'Schedules, shifts, availability and CSV import in production.',
				},
			},
			{
				state: 'done',
				title: {
					pl: 'Logowanie i design system',
					en: 'Sign-in and design system',
				},
				description: {
					pl: 'Hasło i PIN, ochrona tras, powłoka aplikacji, PL i EN.',
					en: 'Password and PIN, route guards, app shell, Polish and English.',
				},
			},
			{
				state: 'done',
				title: { pl: 'Aktualności', en: 'News feed' },
				description: {
					pl: 'Pierwszy pełny widok po zalogowaniu.',
					en: 'The first complete view after signing in.',
				},
			},
			{
				state: 'current',
				title: { pl: 'Refaktor architektury', en: 'Architecture refactor' },
				description: {
					pl: 'Porządki, zanim dojdą duże ekrany. Teraz warstwa zapytań.',
					en: 'Clean-up before the big screens arrive. The query layer is next.',
				},
			},
			{
				state: 'planned',
				title: { pl: 'Kalendarz dyspozycyjności', en: 'Availability calendar' },
				description: {
					pl: 'Pracownik zgłasza na telefonie, kiedy może pracować.',
					en: 'Employees declare on their phone when they can work.',
				},
			},
			{
				state: 'planned',
				title: { pl: 'Grafik kierownika', en: 'Manager schedule' },
				description: {
					pl: 'Główna funkcja: miesięczna siatka zmian i zarządzanie zespołem.',
					en: 'The core feature: a monthly shift grid and team management.',
				},
			},
		],
	},
};
