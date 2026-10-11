# HANDOFF — stan prac

Ostatnia aktualizacja: 2026-10-11 · branch `nextjs-rewrite` (nie wypchnięty)

## Zrobione

- Etap 1: port Marchant Web '24 (Nuxt → Next.js 16, TS, Tailwind v4, next-intl PL/EN, przejścia out-in).
- Etap 2: redesign w stylu marchantweb.com (2025) — jedna długa ciemna strona z siatki kafelków:
  - fundament: `ShaderBackground` + rejestr kafelków (`grain`/`accent`), `SmoothScroll` (ScrollSmoother, parallax,
    `data-fade`, skok do `#hash`), prymitywy w `src/components/grid/`, poszerzanie siatki 1280 px → 100vw;
  - sekcje: Hero (zdjęcie, nagłówek, stack, sociale, status, język), About (React spotlight, tekst, marquee logotypów),
    Hire (otwarty na zatrudnienie, stack, umiejętności, osiągnięcia), Portfolio („PORTFOLIO ×”, przeciągana karuzela 3D,
    licznik fps), Projects (kafelki z linkami), Contact (formularz EmailJS, dane, sociale, stopka);
  - ciemna strona projektu `/portfolio/[slug]` i 404.
- Usunięte: `/about`, `/contact`, `/explore`, stary Hero, NavMenu, BottomBar, AOS.
- Weryfikacja: `tsc`, `lint`, `build` przechodzą; zrzuty Playwright 1440×900 i 390×844 (bez poziomego scrolla).

## Decyzje techniczne

- `cacheComponents` wyłączone: w Next 16 ukrywa (`<Activity>`) zamiast odmontowywać poprzednią trasę — psuje out-in.
- Tailwind przez `@tailwindcss/postcss` (reguła Turbopacka z szablonu psuła CSS Modules).
- Shader rysowany w obniżonej rozdzielczości (0.5 / 0.35 mobile), 40 kroków raymarchingu, limit 60 fps, pauza gdy
  karta w tle. Prostokąty kafelków `grain`/`accent` czytane co klatkę z `getBoundingClientRect` (max 16 + 16).
- ScrollSmoother tylko na desktopie (`isDesktop()` w `src/lib/gsap.ts`), tworzony od nowa przy zmianie trasy/języka.
- Skok do `#hash` po nawigacji odroczony o 400 ms (fonty i karuzela muszą się zmierzyć).
- Wartości per klatka (mysz, uniformy, kursor, fps) w refach / obiektach GSAP, nie w stanie Reacta.

## Do zrobienia / pomysły

- Prawdziwe osiągnięcia (`home.hire.achievements`) — obecne są tymczasowe.
- Prawdziwe opisy, media i linki projektów (ShiftFlow, PrintForge — placeholdery; PowerTask bez linków live/repo).
- Poster i lżejszy `webm` filmu PowerTask (ma czarne pasy w samym pliku).
- `NEXT_PUBLIC_SITE_URL` po zakupie domeny; obraz OG.
- Teksty EN przetłumaczone automatycznie — do przejrzenia.
