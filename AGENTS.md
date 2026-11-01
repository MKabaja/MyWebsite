<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Mateusza Kabaji

Osobista strona dla rekruterów i klientów: jedna długa ciemna strona z siatki kafelków nad tłem WebGL. Stack: Next.js 16.4 (App Router, `reactCompiler`), React 19.3, TypeScript strict, Tailwind 4, Biome 2.4, GSAP 3 (ScrollSmoother, ScrollTrigger, SplitText, Draggable), czysty WebGL, next-intl (`pl` bez prefiksu, `en` pod `/en`). Historia i mechanizmy: `docs/kontekstProjektu.md`, stan prac: `docs/HANDOFF.md`, gdzie co zmienić: `docs/MAPA-PROJEKTU.md`.

## Komendy

- `npm run dev` — serwer deweloperski
- `npm run lint:fix` — Biome (lint + format + importy); `npm run lint` bez zapisu
- `npm run typecheck` — `tsc --noEmit`; gdy brakuje typów `LayoutProps`/`PageProps`, najpierw `npx next typegen` (przy zatrzymanym dev serwerze)
- `npm run build` — pełny build

Gotowe = `lint:fix` i `typecheck` bez błędów, przy większych zmianach także `build`. Zmiana w UI: dodatkowo zrzuty Playwright desktop 1440×900 i mobile 390×844 (`/`, `/portfolio/[slug]`, 404, wersje `/en`), bez poziomego scrolla. Podawaj rzeczywiste wyniki. Testów (frameworka) jeszcze nie ma.

## Komunikacja i sposób pracy

Odpowiadaj po polsku, krótko i na temat. Nie dodawaj tematów, o które nie pytano. Mateusz pisze szybko: interpretuj sens, przy prawdziwej dwuznaczności zapytaj krótko.

- Rób tylko to, o co proszono. Przy większej zmianie najpierw plan i krytyczna ocena propozycji, start po akceptacji.
- Sugeruj biblioteki skracające kod, ale nie dodawaj ciężkich zależności ani drugiego kontekstu WebGL bez zgody.
- Nie psuj desktopu: zmiany tylko mobilne przypinaj do `max-lg:` lub dotyku i sprawdzaj desktop zrzutami przed/po.
- Ruch ma być subtelny; respektuj `prefers-reduced-motion`.
- Po większej zmianie krótkie podsumowanie: co zrobiono, co usunięto, gdzie co leży, wynik weryfikacji, maks. trzy uwagi jakościowe. Po drobnej jedno zdanie.

## Architektura

Warstwy, kierunek zależności, nazwy plików i barrele: `docs/ARCHITECTURE.md` (przeczytaj przed tworzeniem lub przenoszeniem plików w `src/features/`). Najważniejsze:

- `src/features/<temat>/`: `components/`, `model/`, `utils/`. Warstwa `server/` dopiero, gdy pojawi się kod tylko serwerowy (każdy plik z `import 'server-only'`).
- `src/app/` to cienkie kontrolery: walidacja parametrów, pobranie danych, render widoku z feature'a.
- Importy bezpośrednio z pliku. Barrel `index.ts` tylko w folderze komponentu i tylko z publicznym API.
- `src/shared/` (`components`, `hooks`, `lib`) tylko dla kodu bez wiedzy o featurach.
- Komponent leży w `<nazwa>/` z `<nazwa>.tsx`, `<nazwa>.styles.ts` i `index.ts`. Hook i stałe używane przez jeden komponent leżą obok niego.
- Teksty tylko w `messages/pl.json` i `messages/en.json`, zawsze w obu.
- GSAP tylko z `@/shared/lib/gsap`. Własne ScrollTriggery w `gsap.context` lub `gsap.matchMedia` z `revert()` w cleanupie; własnego ScrollSmoothera nie tworzymy.
- Wartości zmieniane co klatkę (mysz, scroll, uniformy) trzymamy w refach i obiektach GSAP, nie w stanie Reacta.
- Bez cyklicznych importów. Martwy kod usuwamy.

## Standard kodu

Clean Code, KISS, YAGNI. Priorytety: poprawność, bezpieczeństwo, czytelność, testowalność, prostota.

- Bez komentarzy i nagłówków w plikach. Wyjątek: TSDoc po polsku dla eksportowanego, reużywalnego API, tylko o tym, czego nie widać w sygnaturze (błędy, efekty uboczne, przypadki brzegowe).
- Zmiany małe i celowe. Przed implementacją sprawdź istniejące konwencje. Nie refaktoryzuj kodu spoza zadania.
- Funkcje i moduły zamiast klas; bez abstrakcji i nowych plików bez konkretnego powodu.
- Pliki i foldery w kebab-case (`project-tile.tsx` eksportuje `ProjectTile`).
- Nazwy: funkcje to czasowniki, boolean `is`/`has`/`can`/`should`, bez `data`/`item`/`temp`/`helper`. Jednostka w nazwie (`typingDelayMilliseconds`). Mapy jak zdanie: `type ClassNameByLine`, `const classNameByLine`.
- Funkcje: jedna odpowiedzialność, 0–2 argumenty (maks. 3, więcej w obiekt), bez argumentów flagowych, guard clauses. Decyzje (czyste funkcje) oddzielone od efektów.
- Stepdown: główne API na górze pliku, helpery niżej. Deklaracje `function`, nie `const f = () => {}`.
- TypeScript: `type` zamiast `interface` (wyjątek: rozszerzanie modułów); bez `any`, nieuzasadnionych `as`, `!`, `@ts-ignore`. Stan jako discriminated union; zamiast `switch` po unii obiekt `Record<Stan, Handler>`. Złożone typy jako nazwane aliasy.
- React: render czysty; nie trzymaj w stanie tego, co da się obliczyć; `useEffect` tylko do synchronizacji z systemem zewnętrznym, z cleanup. Bez ręcznego `useMemo`/`useCallback`/`memo` (działa React Compiler). Props z `variant`/`mode` zamiast mnożenia booleanów, typ propsów w pliku komponentu jako nazwany alias. Nazwane importy z `react`. Semantyczny HTML i obsługa klawiatury.
- Klasy Tailwinda w `*.styles.ts` obok komponentu: `xStyles` (`satisfies Record<string, string>`), destrukturyzowane w komponencie. CSS Modules (`<nazwa>.module.css`) tylko dla keyframes i złożonych stanów. Tokeny w `src/styles/theme.css`.
- Next.js: Server Components domyślnie, `'use client'` tylko na granicy interaktywności. Linki wewnętrzne przez `TransitionLink`, nie `Link`. Breakpointy: 576 / 768 / 992 / 1200 / 1400 / 1680.

```ts
// źle → dobrze
useEffect(() => setActive(projects.filter((p) => p.isLive)), [projects])
const liveProjects = projects.filter((project) => project.isLive)

createTile(mode, lines, true)
createTile({ mode, lines })
```

## Code review

- Oceniasz kod zmieniany w zadaniu; poza tym tylko bezpieczeństwo i poprawność.
- Nie przytakujesz bezkrytycznie; dobry kod nazywasz dobrym bez wymuszania zmian. Wyjaśniasz, dlaczego zmiana pomaga. Bez fikcyjnych problemów i refaktorów czysto stylistycznych.
- Kolejność: krytyczne (bezpieczeństwo, utrata danych, błędy), ważne (SRP, testowalność, zbędna złożoność, słabe kontrakty), sugestie (nazwy, pliki).

## Treść i design

- Inspiracja marchantweb.com: przenosimy techniki i odczucie, nie teksty, branding ani układ 1:1. Bez Calendly, sekcji Talks/Recognition i bloga.
- Dane o Mateuszu pochodzą ze starej strony (historia `main`). Projekty ShiftFlow i PrintForge to na razie placeholdery.

## Granice

- Zawsze: `lint:fix` i `typecheck` po zmianach w kodzie.
- Najpierw zapytaj: nowe zależności, `--unsafe` w Biome, usuwanie plików, zmiany w `next.config.ts` i `biome.json`.
- Nigdy: wyłączanie reguł lintu lub TS dla ukrycia błędu, deklarowanie wyników bez uruchomienia, sekrety w repo (`.env*` poza `.env.example`).

## Git

- Tylko branch `nextjs-rewrite`; `main` to stara strona, nie ruszać.
- Commit dopiero po pokazaniu komunikatu i listy plików oraz wyraźnej akceptacji. Push tylko na wyraźną prośbę. `git add -A` tylko na prośbę.
- Conventional Commits: `typ(zakres): opis` po angielsku, małą literą, bez kropki i bez body, np. `fix(nav): hover area`. Commity atomowe, każdy osobno się buduje.
- Bez podpisów i trailerów (`Co-Authored-By`, „Generated with…”, linki do sesji).
- PR tworzy użytkownik. Na prośbę podajesz tytuł i treść zgodną z `docs/PR_TEMPLATE.md` (procedura: `.claude/skills/pr-description/SKILL.md`).
