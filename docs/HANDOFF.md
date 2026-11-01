# HANDOFF — stan prac

Pełna historia i pułapki: `docs/kontekstProjektu.md`. Zasady: `AGENTS.md`, struktura: `docs/ARCHITECTURE.md`.

Ostatnia aktualizacja: 2026-11-01 · branch `nextjs-rewrite`

## Zrobione

- Refaktor do struktury z Linkera (2026-11-01): `src/features`, `src/shared`, `src/styles`, klasy w `*.styles.ts`, Biome zamiast ESLint, React Compiler, `.claude/` z hookiem i regułami. Wygląd zweryfikowany porównaniem DOM i computed styles. Starsze wpisy niżej mówią o poprzednich nazwach plików.
- Etap 1: port Marchant Web '24 (Nuxt → Next.js 16, TS, Tailwind v4, next-intl PL/EN, przejścia out-in).
- Etap 2: redesign w stylu marchantweb.com (2025) — jedna długa ciemna strona z siatki kafelków:
  - fundament: `ShaderBackground` + rejestr kafelków (`grain`/`accent`), `SmoothScroll` (ScrollSmoother, parallax,
    `data-fade`, skok do `#hash`), prymitywy w `src/components/grid/`, poszerzanie siatki 1280 px → 100vw;
  - sekcje: Hero (zdjęcie, nagłówek, stack, sociale, status, język), About (React spotlight, tekst, marquee logotypów),
    Hire (otwarty na zatrudnienie, stack, umiejętności, osiągnięcia), Portfolio („PORTFOLIO ×”, przeciągana karuzela 3D,
    licznik fps), Projects (kafelki z linkami), Contact (formularz EmailJS, dane, sociale, stopka);
  - ciemna strona projektu `/portfolio/[slug]` i 404.
- Usunięte: `/about`, `/contact`, `/explore`, stary Hero, NavMenu, BottomBar, AOS.
- Mobile (< 992 px), desktop bez zmian wizualnych:
  - hero: ramka startuje ze skali 0.86 i rośnie do pełnej szerokości w pierwszych ~240 px scrolla (`transform`, bez
    reflow), shader przycinany do niej przez `--shader-w`; zdjęcie 1.18 → 1; PL/EN w miejscu statusu, sociale w kafelku z logo;
  - `mobileEffects`: wartości `data-speed` z desktopu odtwarzane na natywnym scrollu, scrub z opóźnieniem 0.6 s;
    usunięte wygaszanie całych sekcji (`data-m-recede` tylko na szerokim dotyku);
  - karuzela: sama się kręci (pauza 3 s po interakcji), pochylona jak desktop, karta na środku dostaje stan „hover”
    (`data-active`), strzałki + licznik; swipe naprawiony (`touch-action: pan-y` — Draggable wymuszał `manipulation`);
  - karty projektów: pochylenie od scrolla + od przechylenia telefonu (`src/lib/deviceTilt.ts`, kalibracja do pozycji
    trzymania; wymaga HTTPS, iOS pyta o zgodę);
  - reduced motion na mobile, kontrast formularza, większe pola dotyku.
- „Porozmawiajmy” → `/#contact`: jawne `locale` tylko przy zmianie języka (gubiło hash przez przekierowanie `/pl`);
  po wejściu strona startuje od góry i po 1500 ms (`ANCHOR_DELAY` w `SmoothScroll`) płynnie zjeżdża do sekcji.
- Weryfikacja: `tsc`, `lint`, `build` przechodzą; zrzuty Playwright 1440×900 i 390×844 (bez poziomego scrolla),
  testy dotyku (swipe, pionowy scroll przez karuzelę, tap) przez CDP. Gyro i płynność niesprawdzone na fizycznym telefonie.

## Decyzje techniczne

- `cacheComponents` wyłączone: w Next 16 ukrywa (`<Activity>`) zamiast odmontowywać poprzednią trasę — psuje out-in.
- Tailwind przez `@tailwindcss/postcss` (reguła Turbopacka z szablonu psuła CSS Modules).
- Shader rysowany w obniżonej rozdzielczości (0.5), 40 kroków raymarchingu, z `gsap.ticker`, pauza gdy karta w tle;
  canvas stałego rozmiaru przycinany do `--grid-w`. Prostokąty kafelków `grain`/`accent` czytane co klatkę z `getBoundingClientRect` (max 16 + 16).
- ScrollSmoother tylko na desktopie (`isDesktop()` w `src/lib/gsap.ts`), tworzony od nowa przy zmianie trasy/języka.
- Kotwica `#hash` po nawigacji: płynny zjazd po 1500 ms (desktop `smoother.scrollTo`, mobile tween `window.scrollTo`),
  przerywany dotykiem/kółkiem/klawiszem; w obrębie strony — od razu.
- Mobilny hero skalowany `transform`em, nie `--grid-w` (zmiana szerokości = reflow co klatkę i skaczący tekst).
- Wartości per klatka (mysz, uniformy, kursor, fps) w refach / obiektach GSAP, nie w stanie Reacta.

## Do zrobienia / pomysły

- Prawdziwe osiągnięcia (`home.hire.achievements`) — obecne są tymczasowe.
- Prawdziwe opisy, media i linki projektów (ShiftFlow, PrintForge — placeholdery; PowerTask bez linków live/repo).
- Poster i lżejszy `webm` filmu PowerTask (ma czarne pasy w samym pliku).
- `NEXT_PUBLIC_SITE_URL` po zakupie domeny; obraz OG.
- Teksty EN przetłumaczone automatycznie — do przejrzenia.
- Test na prawdziwym telefonie (HTTPS): gyro na kartach projektów, płynność karuzeli i hero.
- Opcjonalnie: `smoothTouch` ScrollSmoothera na telefonie (bardziej „desktopowy” scroll) — do decyzji po teście.
- Konkretne IP w `allowedDevOrigins` — do decyzji.
