# CLAUDE.md — Portfolio Mateusza Kabaji (Next.js)

Zasady dla agentów (Claude, Codex, subagenci) pracujących w tym repo.

## Cel projektu

Przepisanie strony **Marchant Web '24** (Nuxt 3 / Vue 3, autor: Simon Le Marchant) na
**Next.js (App Router) + React + TypeScript** jako osobistego portfolio Mateusza Kabaji
— dla rekruterów i klientów indywidualnych.

- Źródło (tylko do odczytu, NIE modyfikować): `/home/mateusz/projects/Marchant-Web-main/Marchant-Web-main`
- Cel: to repo (`MyWebsite`), branch `nextjs-rewrite`. `main` zawiera starą stronę (Vite + Tailwind) — nie ruszać.
- Treści, zdjęcia, wideo i dane o Mateuszu bierzemy ze starej strony (historia `main`: `index.html`, `public/`).

**Priorytet nr 1: wygląd i animacje 1:1 z oryginałem.** Zmieniamy technologię i treść, nie design.

## Stack

- Next.js (najnowsza stabilna, App Router, `src/`), React, TypeScript `strict`
- Style: **Tailwind CSS v4** (layout, spacing, typografia, kolory jako tokeny w `@theme`) + zwykły CSS w
  `@layer components` / CSS Modules dla rzeczy, których nie da się czytelnie zapisać klasami (keyframes, `nth-child`
  delay'e, `::before/::after`, stany Hero zależne od trasy). Bootstrapa nie używamy — jego reboot, spacery,
  siatkę i `rfs` odtwarzamy w Tailwindzie (patrz „Tailwind — zgodność z oryginałem”)
- Animacje: `gsap` (publiczny pakiet z npm — Draggable/InertiaPlugin/Observer są darmowe; nie używać
  prywatnego registry ani tokenu z `.npmrc` oryginału), animacje CSS/keyframes przeniesione bez zmian, `aos`
- WebGL: czysty WebGL + shadery z oryginału (bez three.js)
- Ikony: **wyłącznie `lucide-react`** (zamiast Font Awesome). Ikon marek (GitHub, LinkedIn itp.) lucide nie ma
  → małe inline SVG w `src/components/icons/`
- Treść: typowane dane lokalne w `src/content/` (zamiast Notion API / `api.marchantweb.com`)
- i18n: `next-intl`, języki **pl** (domyślny, bez prefiksu) i **en** (`/en/...`), przełącznik języka w UI.
  Wszystkie teksty w `messages/pl.json` i `messages/en.json` — zero tekstów zahardkodowanych w komponentach.
  Logika zależna od trasy (Hero, nawigacja, klasy `body`) operuje na ścieżce BEZ prefiksu języka.
- Formularz kontaktowy: EmailJS (darmowy plan, klucze ze starej strony — klucz publiczny z założenia jest jawny)
  + walidacja jak na starej stronie. Brak Calendly.
- Hosting: własny serwer (Hetzner) — konfiguracją wdrożenia się nie zajmujemy; `output: "standalone"` w `next.config`.

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

- Komponenty: function components, typowane `props`, brak `any`. Pliki `PascalCase.tsx` + `PascalCase.module.scss`.
- `"use client"` tylko tam, gdzie potrzebne (WebGL, kursor, slider, nawigacja zależna od myszy).
- **Wydajność:** pozycja myszy, scroll i wartości animowane co klatkę trzymamy w `useRef` i aplikujemy w
  `requestAnimationFrame` / `gsap.ticker` bezpośrednio do DOM/uniformów — NIE w `useState` (bez re-renderów co ruch myszy).
- Każdy efekt sprząta po sobie (listenery, `rAF`, tweeny GSAP, `Draggable`, `Observer`, kontekst WebGL).
- Wartości liczbowe animacji (czasy, `cubic-bezier`, opóźnienia, offsety, kolory shaderów) kopiujemy dokładnie z oryginału.
- Breakpointy jak w oryginale: 576 / 768 / 992 / 1200 / 1400 / 1680.
- Dostępność: semantyczny HTML, `alt`, `aria-label` na linkach-ikonach, respektować `prefers-reduced-motion` tam, gdzie nie psuje designu.

## Decyzje Mateusza (2026-10-11)

- **Kolory i fonty ze starej strony**, nie autora oryginału:
  - `ink #0D0D0D` (tło), `graphite #1C1C1C` / `graphite-2 #262626` (karty), `pearl #E6D7C8`
  - akcent `accent #FF8C32` (`soft #FFA86A`, `strong #FF6B00`) — zastępuje fiolet `#7A4FEE`
  - drugi akcent `cyber #00FFF5` (`soft #7CFFF7`, `strong #00D4CC`)
  - jasne tło stron about/contact/portfolio: gradient `#f0ece8 → #e6e1dc → #f2eeea` (zamiast białego)
  - font: **Rajdhani** (400/600/900) zamiast Inter i N27; JetBrains Mono zostaje dla elementów „kodu”
  - kolory shadera WebGL przestroić na tę paletę (ciemny grafit + pomarańcz/cyjan zamiast fioletu)
- **Projekty:** na razie tylko placeholdery — PowerTask (z filmem `POWERTASKFILM.mp4`), ShiftFlow i PrintForge
  (bez mediów, krótki opis). Struktura danych gotowa na dodanie kolejnych.
- **Blog/artykuły:** usunięte (strona wizytówka + portfolio). Renderer Notion też nie jest przenoszony.

## Tailwind — zgodność z oryginałem

- `html { font-size: 15px }` jak w oryginale → `rem` znaczy to samo.
- Spacery Bootstrapa ≠ Tailwind: `1→0.25rem, 2→0.5rem, 3→1rem, 4→1.5rem, 5→3rem, 6→4rem, 7→6rem, 8→8rem, 9→10rem`
  (np. BS `mt-5` = TW `mt-12`, BS `mt-8` = TW `mt-32`). Przeliczać, nie kopiować nazw klas.
- Breakpointy w `@theme`: `sm 576, md 768, lg 992, xl 1200, 2xl 1400, 3xl 1680`; kontenery jak w oryginale
  (`xxxl: 1600px`, padding 30px na stronę).
- Reboot Bootstrapa (marginesy nagłówków, `p { margin-bottom: 1rem }`, `line-height: 1.6`, `hr`, `dl/dd`) odtworzyć w `@layer base`.
- `rfs` (responsywne rozmiary fontów) → `clamp()`/`calc(… + …vw)` wyliczone z tej samej formuły co `rfs`.
- Spójność weryfikujemy zrzutami (układ i animacje mają się zgadzać; kolory i font są celowo inne).

## Czego NIE przenosimy / co podmieniamy

- Imię, teksty, zdjęcia, projekty, logotypy klientów, linki (Calendly, Twitter, e-mail) autora → dane Mateusza.
- Badge Awwwards, ID Google Analytics (`G-E1LXB89D1E`), `api.marchantweb.com`, Cloudinary, logo „MW” → usunąć / zastąpić logo MK.
- Font N27 (komercyjny) — nie kopiujemy, zastępuje go Rajdhani.

## Git

- Pracujemy wyłącznie na branchu `nextjs-rewrite`. Nie pushować bez zgody Mateusza.
- Commity małe, po każdym zakończonym etapie, w formacie Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `style:`).
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
