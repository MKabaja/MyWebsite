# CLAUDE.md — Portfolio Mateusza Kabaji (Next.js)

Zasady dla agentów (Claude, Codex, subagenci) pracujących w tym repo.

## Cel projektu

Osobiste portfolio Mateusza Kabaji (dla rekruterów i klientów) w **Next.js (App Router) + React + TypeScript**.

- Etap 1 (zrobiony): port **Marchant Web '24** (Nuxt 3, Simon Le Marchant, open source) — źródło tylko do odczytu:
  `/home/mateusz/projects/Marchant-Web-main/Marchant-Web-main`.
- Etap 2 (obecny design): jedna długa strona w stylu **marchantweb.com (wersja 2025, kod zamknięty)** — przenosimy
  TECHNIKI i odczucie (siatka kafelków, shader prześwitujący przez „okna”, ziarniste szare kafelki, odręczne
  podpisy, ScrollSmoother z parallaxą), NIE teksty, branding ani 1:1 układ autora. Zrzuty referencyjne:
  `~/projects/marchant-live-nagrania/`.
- Repo: to (`MyWebsite`), branch `nextjs-rewrite`. `main` zawiera starą stronę (Vite + Tailwind) — nie ruszać.
- Treści, zdjęcia, wideo i dane o Mateuszu — ze starej strony (historia `main`).

## Stack

- Next.js 16 (App Router, `src/`), React 19, TypeScript `strict`
- Style: **Tailwind CSS v4** (tokeny w `@theme` w `src/app/globals.css`) + CSS Modules dla keyframes / złożonych stanów.
- Animacje: `gsap` z publicznego npm (ScrollSmoother, ScrollTrigger, SplitText, Draggable, InertiaPlugin — darmowe).
  Importy WYŁĄCZNIE z `src/lib/gsap.ts` (tam rejestracja pluginów).
- WebGL: czysty WebGL (bez three.js), shader „blob” z oryginału w `src/components/background/shader.ts`.
- Ikony UI: `lucide-react`. Logotypy marek/technologii: `simple-icons` (CC0) przez `TechIcon`, sociale w `BrandIcons`.
- Treść: typowane dane w `src/content/`, i18n `next-intl` — **pl** (domyślny, bez prefiksu) i **en** (`/en`).
  Wszystkie teksty w `messages/pl.json` i `messages/en.json` — zero tekstów zahardkodowanych w komponentach.
- Formularz kontaktowy: EmailJS (klucz publiczny ze starej strony) + walidacja `src/lib/validation.ts`. Brak Calendly.
- Hosting: własny serwer (Hetzner) — wdrożeniem się nie zajmujemy; `output: "standalone"`.

## Architektura (skrót)

- `src/app/[locale]/` — trasy: `/` (jedna długa strona), `/portfolio/[slug]`, 404. `layout.tsx` → `SiteShell`.
- `SiteShell`: `ShaderBackground` (stałe płótno WebGL za treścią), `SmoothScroll` (ScrollSmoother `smooth: 2`,
  `effects: true`; `data-speed` / `data-lag` = parallax, `data-fade` = odsłonięcie; skok do `#hash` po nawigacji),
  `PageFrame` (przejścia out-in), preloader, kursor, znaczniki „+”.
- `src/components/grid/` — prymitywy: `Tile` (`solid | window | grain | accent` — tryb rejestruje kafelek w
  `background/cells.ts`, a shader co klatkę czyta prostokąty i szarzy/barwi obraz pod nimi), `Scribble`,
  `Marquee`, `LineNumbers`, `useSplitReveal`.
- `src/components/home/` — sekcje: Hero, About, Hire, Portfolio (karuzela 3D), Projects (kafelki), Contact (+ stopka).
  `HomePage` poszerza siatkę (`--grid-w`) z 1280 px do 100vw w pierwszych 300% przewinięcia → w tym obszarze
  wysokości kafelków w `vh`/px, nie zależne od treści.
- `src/components/transition/` — `TransitionLink` zamiast zwykłego `Link` dla linków wewnętrznych.
- `src/content/` — projekty i stack; `src/lib/site.ts` — dane kontaktowe.
- `cacheComponents` celowo wyłączone (patrz `HANDOFF.md`).

## Mapowanie Vue → React

| Vue / Nuxt | React / Next |
|---|---|
| `app.vue` + `layouts/default.vue` | `src/app/layout.tsx` + klientowy `SiteShell` |
| `<client-only><LazyHero/>` | `next/dynamic(..., { ssr: false })` |
| `ref` / `computed` / `watch` | `useState` / wartości wyliczane w renderze / `useEffect` tylko do synchronizacji z zewn. systemem |
| `@vueuse` (`useMouse`, `useWindowSize`, ...) | własne hooki w `src/hooks/` |
| `useState('x')` (Nuxt, globalny) | React context lub mały store (np. `portfolioScrollPercentage`) |
| `<Transition name="page" mode="out-in">` | własny system przejść: `TransitionLink` + provider (leave → `router.push` → enter), zachowując czasy/easingi per strona |
| `useHead` / `bodyAttrs` | `metadata` / `generateMetadata` + klasy `body` ustawiane per trasa w kliencie |
| `navigateTo` | `useRouter().push` przez provider przejść |
| `v-for` / `v-if` / sloty | `map` z `key` / warunki / `children` |
| `:deep()` | `:global()` w SCSS Modules |

## Zasady kodu

- Komponenty: function components, typowane `props`, brak `any`. Pliki `PascalCase.tsx` + `PascalCase.module.css`.
- `"use client"` tylko tam, gdzie potrzebne (WebGL, kursor, slider, nawigacja zależna od myszy).
- **Wydajność:** pozycja myszy, scroll i wartości animowane co klatkę trzymamy w `useRef` i aplikujemy w
  `requestAnimationFrame` / `gsap.ticker` bezpośrednio do DOM/uniformów — NIE w `useState` (bez re-renderów co ruch myszy).
- Każdy efekt sprząta po sobie (listenery, `rAF`, tweeny GSAP, `Draggable`, `Observer`, kontekst WebGL).
- Wartości liczbowe animacji (czasy, `cubic-bezier`, opóźnienia, offsety, kolory shaderów) kopiujemy dokładnie z oryginału.
- Breakpointy jak w oryginale: 576 / 768 / 992 / 1200 / 1400 / 1680.
- Dostępność: semantyczny HTML, `alt`, `aria-label` na linkach-ikonach, respektować `prefers-reduced-motion` tam, gdzie nie psuje designu.

## Decyzje Mateusza (2026-10-11)

- **Ciemny motyw**, kolory ze starej strony: tło `graphite #1B1C1E`, akcent `accent #FF8C32` (`soft #FFA86A`,
  `strong #FF6B00`), drugi akcent `cyber #00FFF5` (`soft #7CFFF7`, `strong #00D4CC`), `pearl #E6D7C8`.
- Fonty: **Rajdhani** (tekst), JetBrains Mono („kod”), Caveat (odręczne podpisy).
- Shader: bursztynowe okna, cyjanowe paski akcentu, delikatne ziarno; renderowany w 50% rozdzielczości
  dla oszczędności GPU/RAM — kolory w `palette` w `src/components/background/shader.ts`.
- Bez przycisku „book a call”/Calendly, bez sekcji Talks/Recognition, bez bloga.
- Projekty: PowerTask (wideo) + placeholdery ShiftFlow i PrintForge — prawdziwe dane dojdą później.
- Wersja mobilna obowiązkowa: natywny scroll na dotyku + własne efekty (`smooth/mobileEffects.ts`), układ hero jak na
  desktopie. Zmiany mobilne nie mogą zmieniać desktopu. Historia i pułapki: `kontekst.md`.

## Siatka kafelków — zasady

- Sekcje składamy z `Tile` wewnątrz `grid-frame`; przerywane linie przez `lines`, wzór kratki `grid-paper`.
- Maks. 16 kafelków `grain` i 16 `accent` widocznych naraz (`MAX_CELLS`).
- Parallax: `data-speed="clamp(1.03…1.7)"` jak w oryginale; nie tworzyć własnego ScrollSmoothera.
- Własne ScrollTriggery w `gsap.context` z `revert()` w cleanupie.

## Czego NIE przenosimy / co podmieniamy

- Teksty, zdjęcia, projekty, logotypy klientów, linki autora → dane Mateusza.
- Badge Awwwards, Google Analytics, API autora, Cloudinary, logo „MW” → usunięte / logo MK.
- Komercyjny font N27 → Rajdhani.

## Git

- Pracujemy wyłącznie na branchu `nextjs-rewrite`. Nie pushować bez zgody Mateusza.
- Commity **atomowe** (jedna logiczna zmiana = jeden commit) i **maksymalnie krótkie**, zawsze ze scope:
  `typ(zakres): opis` — np. `chore(deps): add gsap`, `feat(hero): port webgl shader`, `fix(nav): hover area`.
  Typy: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `perf`. Opis po angielsku, małą literą, bez kropki, bez treści commita (body).
- **ZAKAZ dopisków o AI** w commitach, PR-ach i kodzie: żadnych `Co-Authored-By: Claude`, „Generated with Claude Code”,
  „with Codex” itp. Autor commitów to wyłącznie Mateusz (z `git config`).
- Nie commitować sekretów, `.env*`, `node_modules`, `.next`.

## Weryfikacja (przed każdym commitem etapu)

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Wizualnie: porównanie zrzutów (Playwright) nowej strony z oryginałem dla tras `/`, `/explore`, `/about`,
`/contact`, `/portfolio/[slug]`, 404 (+ wersje `/en`) — desktop 1440px i mobile 390px.

## Przekazanie pracy (np. do Codexa)

Stan prac prowadzimy w `HANDOFF.md`: co zrobione, co w toku, następne kroki, znane problemy.
Aktualizować przy każdym commicie etapu, tak aby inny agent mógł kontynuować bez kontekstu rozmowy.
