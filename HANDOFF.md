# HANDOFF — stan prac

Ostatnia aktualizacja: 2026-10-11 · branch `nextjs-rewrite`

## Zrobione

- Szkielet: Next.js 16.4, TS strict, Tailwind v4 (PostCSS), next-intl (pl domyślny bez prefiksu, en pod `/en`), `output: standalone`.
- Wspólny układ (`src/components/shell/SiteShell.tsx`): Hero WebGL, kursor, menu z przełącznikiem języka, dolny pasek, ekran ładowania, klasy `body` per trasa, AOS.
- Przejścia stron (`src/components/transition/`): `TransitionProvider` (out-in: animacja wyjścia → `router.push`), `TransitionLink`, `PageFrame` (animacja wejścia), `Presence` (port Vue `<Transition>`). Czasy per strona w `src/lib/routes.ts`.
- Strony: `/`, `/explore` (karuzela GSAP), `/about`, `/contact` (formularz EmailJS + walidacja ze starej strony), `/portfolio/[slug]`, 404.
- Treści: PL/EN w `messages/`, projekty w `src/content/projects.ts` (PowerTask + placeholdery ShiftFlow, PrintForge).
- SEO: metadane per strona, canonical + hreflang, `sitemap.xml`, `robots.txt`.
- Weryfikacja: `lint`, `tsc`, `build` przechodzą; zrzuty Playwright desktop 1440 px i mobile 390 px dla wszystkich tras.

## Decyzje techniczne

- `cacheComponents` wyłączone: w Next 16 ukrywa (`<Activity>`) zamiast odmontowywać poprzednią trasę, co psuje przejścia out-in; dla statycznej strony nic nie daje.
- Reguła Turbopacka `@tailwindcss/turbopack` z szablonu usunięta: przetwarzała `*.module.css` jako globalny CSS (moduły nie działały). Tailwind idzie przez `@tailwindcss/postcss`.
- Wartości per klatka (mysz, uniformy shadera, rozmiar kursora) są w refach i obiektach tweenowanych przez GSAP, nie w stanie Reacta.
- `onWheelStart` / `onWheelEnd` z oryginalnego slidera nie istnieją w GSAP Observer (martwy kod w oryginale), więc zostały pominięte.

## Do zrobienia / pomysły

- Prawdziwe opisy, media i linki projektów (ShiftFlow, PrintForge to placeholdery z przypuszczalnym opisem — do weryfikacji).
- Poster (`video.poster`) i lżejsza wersja `webm` filmu PowerTask.
- Nawigacja mobilna: jak w oryginale, menu jest ukryte < 992 px (About/Contact niedostępne z telefonu).
- `NEXT_PUBLIC_SITE_URL` po zakupie domeny; obraz OG (`opengraph-image`).
- Ewentualne dostrojenie kolorów shadera: `palette` w `src/components/hero/shaders.ts`.
