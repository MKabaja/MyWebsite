# kontekst.md — co zrobiliśmy i jak tu pracować

Plik dla ludzi i agentów (Claude, Codex, subagenci), którzy wejdą do projektu bez kontekstu rozmowy.
Szczegółowe zasady kodu: `CLAUDE.md`. Bieżący stan / TODO: `HANDOFF.md`. Ten plik: historia, mechanizmy, pułapki
i zasady współpracy z Mateuszem.

Ostatnia aktualizacja: 2026-10-11.

---

## 1. Projekt w skrócie

- Osobiste portfolio **Mateusza Kabaji** (front-end / React developer) — dla rekruterów i klientów.
- **To repo** (`~/projects/stara-strona/MyWebsite`), branch **`nextjs-rewrite`**. `main` = stara strona (Vite) — nie ruszać.
- Stack: Next.js 16 (App Router) + React 19 + TypeScript strict, Tailwind v4, GSAP 3 (ScrollSmoother, ScrollTrigger,
  SplitText, Draggable, Inertia), czysty WebGL, next-intl (PL domyślny bez prefiksu, EN pod `/en`), lucide + simple-icons.
- Inspiracja: **marchantweb.com** (Simon Le Marchant, wersja 2025, kod zamknięty) — przenosimy techniki i odczucie
  (siatka kafelków, shader prześwitujący przez „okna”, ziarniste kafelki, odręczne podpisy, płynny scroll),
  nie teksty ani branding.
- Źródła pomocnicze (tylko do odczytu, NIE pracujemy w nich):
  - `~/projects/Marchant-Web-main/Marchant-Web-main` — open-source'owa wersja Nuxt (Marchant Web '24), etap 1 portu;
  - `~/projects/marchant-vue-test` — kopia tej wersji uruchamiana lokalnie (`npx nuxt dev --port 3001`) do porównań;
  - `~/projects/marchant-live-nagrania/` — zrzuty żywej strony.

## 2. Historia prac (2026-10-11)

1. **Port Nuxt → Next.js** (etap 1): przepisanie Marchant Web '24 do React/TS z treściami Mateusza.
2. **Redesign w stylu marchantweb.com 2025** (etap 2, równolegle przez subagentów): jedna długa ciemna strona z sekcjami
   Hero → About → Hire → Portfolio → Projects → Contact, strona projektu `/portfolio/[slug]`, 404. Usunięte stare
   podstrony, NavMenu, BottomBar, AOS. Decyzje Mateusza: bez „book 15 mins”, bez Talks/Recognition, „long-term partner”
   zastąpiony akapitem o nim, React zamiast Vue, sekcja „otwarty na zatrudnienie” ze stackiem/umiejętnościami/osiągnięciami,
   „case studies” → portfolio (screeny/wideo), „updates” → kafelki projektów z linkami, lżejsze ziarno, mobile obowiązkowe.
3. **Poprawki shadera:**
   - migotanie na czarno i „rozciąganie” pomarańczowych okien przy scrollu — przyczyna: canvas zmieniał rozmiar co klatkę
     podczas poszerzania siatki (zmiana `canvas.width` czyści bufor). Teraz canvas ma stały rozmiar okna i jest tylko
     przycinany `clip-path` do `--grid-w` (tak robi też Marchant);
   - rysowanie przeniesione z własnego `requestAnimationFrame` na `gsap.ticker` (po ScrollSmootherze) — prostokąty kafelków
     nie spóźniają się o klatkę; czas animacji z zegara tickera (niezależny od 60/120/144 Hz);
   - „poszarpane” krawędzie pasów: bisekcja dokładnego trafienia + przenikanie oświetlenia z pasem niżej przy krawędzi
     (`BAND_EDGE`) — pasy zostają, schodki znikają; render w 50% rozdzielczości (także mobile).
4. **Hero:** w pustym kafelku z gradientem — **terminal Ubuntu** (`HeroTerminal`), który pisze krótką sesję
   (`whoami`, `lsb_release`, `apt upgrade`, `ls ~/projects`, `git pull`, `npm run build`); działa tylko gdy widoczny.
5. **Projekty:** etykieta „projekt 01” (zamiast `.project#index_0`) i plakietka typu pochylają się razem z kartą (tilt 3D).
   Pasek CONSOLE.LOG: wolniejszy, wyższy o 1rem, bez dziur (za mało powtórzeń na szerokich ekranach).
6. **Mobile „wow”** (tylko < 992 px / dotyk — desktop bez zmian, sprawdzone zrzutami przed/po):
   - układ hero jak na desktopie: siatka 45/55 — logo + PL/EN | status + duże zdjęcie; nagłówek na całą szerokość;
     okno shadera | sociale; terminal;
   - poszerzanie siatki przy scrollu (start z marginesem 16 px, pełna szerokość po 1 ekranie);
   - `createMobileEffects` (`src/components/smooth/mobileEffects.ts`): sekcje odchodzą w tło (`data-m-recede`),
     kafelki rozkładają się przy wejściu (`data-m-expand`), parallax (`data-m-speed`), marquee przyspiesza od prędkości
     scrolla (`data-marquee`); nagłówki odsłaniają się słowo po słowie w rytm scrolla (`useSplitReveal`);
   - shader reaguje na przechylenie telefonu (DeviceOrientation; iOS pyta o zgodę po dotyku; wymaga HTTPS);
   - karuzela portfolio: przyciąganie do karty i pochylenie przy szybkim swipe;
   - jaśniejszy tekst pomocniczy, poprawiona karta React.
7. **Dev z telefonu:** `allowedDevOrigins: ["192.168.*.*"]` w `next.config.ts` (bez tego Next 16 blokuje HMR/JS dla LAN).

Odłożone decyzje: karta 3D ze zdjęciem (bez Spline'a — ciężki: ~2,9 MB + drugi kontekst WebGL + znak wodny) —
Mateusz zdecyduje po obejrzeniu nowego mobilnego hero; jeśli nie, zostaje zwykłe zdjęcie.

## 3. Kluczowe mechanizmy (gdzie czego szukać)

| Mechanizm | Plik(i) | Uwagi |
|---|---|---|
| Tło WebGL | `src/components/background/ShaderBackground.tsx`, `shader.ts` | stały canvas, `clip-path` do `--grid-w`, `gsap.ticker`, kolory w `palette` |
| Kafelki szare/akcent | `background/cells.ts`, `grid/Tile.tsx` | `Tile mode="grain" \| "accent"` rejestruje prostokąt; max 16 + 16 naraz |
| Płynny scroll (desktop) | `smooth/SmoothScroll.tsx` | ScrollSmoother `smooth: 2`, `data-speed`, `data-lag`, `data-fade`, skok do `#hash` |
| Efekty mobile | `smooth/mobileEffects.ts` | `data-m-recede`, `data-m-expand`, `data-m-speed`, `data-marquee` |
| Poszerzanie siatki | `home/HomePage.tsx` | `--grid-w`: desktop 1280 → 100vw (300% scrolla), mobile 100vw−32 px → 100vw (100%) |
| Sekcje | `src/components/home/*Section.tsx` | hero/about używają `contents` + pozycji w siatce na mobile |
| Teksty | `messages/pl.json`, `messages/en.json` | zero tekstów w komponentach |
| Dane | `src/content/projects.ts`, `stack.ts`, `src/lib/site.ts` | |

## 4. Pułapki, na które już wpadliśmy

- **Nie zmieniaj rozmiaru canvasa w trakcie scrolla** — czarne błyski. Rozmiar tylko w pętli renderu, w tej samej klatce co rysowanie.
- **Odczyty pozycji DOM dla shadera** rób w `gsap.ticker` (po ScrollSmootherze), nie w osobnym rAF.
- **Marquee**: pętla `translateX(-50%)` wymaga, by połowa toru była szersza od ekranu — dobierz `repeat` (i `duration`, bo prędkość zależy od długości toru).
- **Tilt kart**: transform na elemencie, który zawiera etykiety — inaczej etykiety „stoją w miejscu”.
- **Po zmianach w dev (HMR)** efekty GSAP potrafią zostać w starym stanie — odśwież stronę, zanim uznasz, że coś nie działa.
- **Prettier nie jest w projekcie** — nie uruchamiaj go (przeformatuje pliki na swój styl). Styl: linie do ~120 znaków, jak w okolicznym kodzie.
- **Stare typy w `.next`** po usunięciu tras → `rm -rf .next`. Błędy `LayoutProps`/`PageProps` z generowanych typów są do zignorowania, jeśli build przechodzi.
- **`next dev` dopisuje blok do `AGENTS.md`** — to normalne.
- Na desktopie ScrollSmoother przechwytuje scroll: w testach Playwright używaj `window.scrollTo`, a na mobile emulacji dotyku (kółko myszy nie przewija).
- WSL2 ma własną sieć: telefon nie widzi `next dev` bez `netsh portproxy` (instrukcja niżej). DeviceOrientation działa tylko po HTTPS.

## 5. Instrukcje

### Uruchamianie
```bash
npm install
npm run dev            # http://localhost:3000 (PL), /en (EN)
npm run build && npm start   # produkcja
```

### Podgląd na telefonie (ta sama sieć Wi-Fi, WSL2)
```bash
npm run dev -- -H 0.0.0.0
hostname -I            # adres WSL, np. 172.28.89.101
```
W PowerShellu (administrator) w Windowsie:
```powershell
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<adres WSL>
New-NetFirewallRule -DisplayName "Next dev 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```
Telefon: `http://<IP Windowsa w Wi-Fi>:3000` (`ipconfig`). Usunięcie: `netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0`.

### Weryfikacja przed commitem
```bash
npm run lint
npx tsc --noEmit
npm run build          # przy większych zmianach
```
Wizualnie: zrzuty Playwright desktop **1440×900** i mobile **390×844** (emulacja dotyku), cała strona + `/portfolio/[slug]` + 404,
brak poziomego scrolla. Przy zmianach „mobile only” — porównanie zrzutów desktopu przed/po.

### Strojenie
- Kolory shadera: `palette` w `src/components/background/shader.ts`; ziarno `GRAIN_STRENGTH`, miękkość pasów `BAND_EDGE`.
- Gradient hero/terminala: `src/components/home/hero/gradient.ts`.
- Sesja terminala: `SESSION` w `src/components/home/hero/HeroTerminal.tsx`.

## 6. Zasady współpracy z Mateuszem

- Rozmawiamy **po polsku**; Mateusz pisze szybko — interpretuj sens, a przy prawdziwej dwuznaczności zapytaj krótko.
- **Przy jakichkolwiek problemach — pauza i pytanie**, zamiast zgadywania przy decyzjach projektowych.
- Przy większych zmianach: **najpierw analiza i propozycja, potem wykonanie** po akceptacji.
- **Nie psuj desktopu** — Mateusz jest z niego zadowolony. Zmiany mobilne przypinaj do `max-lg:` / dotyku i sprawdzaj desktop zrzutami.
- Dba o **wydajność (GPU/VRAM/RAM)** i o **mobile** — nie dodawaj ciężkich bibliotek / drugiego kontekstu WebGL bez zgody.
- Uważa, żeby **nie było za dużo ruchu** — efekty subtelne, `prefers-reduced-motion` respektowane.
- Akceptuje delegowanie pracy subagentom, gdy trzeba zrobić dużo szybko — ale wynik zawsze integruje i weryfikuje główny agent.
- Na koniec pracy: krótki raport po polsku — co zrobione, jak sprawdzić, czego brakuje (bez lania wody).

## 7. Zasady Git (obowiązkowe)

- Tylko branch `nextjs-rewrite`. **Nie pushuj bez zgody Mateusza.**
- Commity **atomowe i krótkie**: `typ(zakres): opis` po angielsku, małą literą, bez kropki, **bez body**
  (np. `fix(hero): keep desktop tile layout on mobile`). Typy: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `perf`.
- **Zero dopisków o AI** — żadnych `Co-Authored-By: Claude`, „Generated with…”, „with Codex” w commitach, PR-ach i kodzie.
- Nie commituj sekretów, `.env*`, `node_modules`, `.next`.

## 8. Otwarte tematy

- Karta 3D ze zdjęciem — decyzja Mateusza (patrz pkt 2).
- Prawdziwe osiągnięcia (`home.hire.achievements`), dane/media/linki ShiftFlow i PrintForge, linki live/repo PowerTask.
- Przegląd tekstów EN, `NEXT_PUBLIC_SITE_URL` i obraz OG po zakupie domeny, lżejsze wideo PowerTask.
- Test na prawdziwym telefonie (płynność efektów mobilnych, przechylenie po HTTPS).
