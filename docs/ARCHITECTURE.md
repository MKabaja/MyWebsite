# Portfolio – konwencje architektury

Wzorowane na `docs/ARCHITECTURE.md` z Linkera. Obowiązują w całej aplikacji.

## A1. Filozofia

- **Feature-first.** Kod strony żyje w `src/features/<feature>/`. Folder `src/app/` zawiera wyłącznie routing i cienkie kontrolery.
- **Funkcje domyślnie.** Moduły eksportujące funkcje, bez klas.
- **SRP na poziomie modułu.** Jeden plik = jedna odpowiedzialność, może mieć kilka powiązanych funkcji. Plik rozbijamy, gdy ma więcej niż jeden powód do zmiany albo przekracza ok. 200–250 linii.

## A2. Mapa feature'ów

| Folder | Zawartość |
| --- | --- |
| `features/site-shell` | powłoka każdej strony: shader, płynny scroll, kursor, preloader, znaczniki „+” |
| `features/home` | strona główna: poszerzanie siatki oraz sekcje Hero, About, Hire |
| `features/projects` | dane projektów, sekcje Portfolio i Projects, podstrona `/portfolio/[slug]` |
| `features/contact` | sekcja Contact, formularz, walidacja, stopka |
| `features/not-found` | widok 404 |
| `shared/components` | `tile`, `scribble`, `marquee`, `line-numbers`, `logo`, `language-switch`, `status-indicator`, `tech-icon`, `brand-icons`, `page-transition` |
| `shared/hooks` | hooki bez wiedzy o featurach (`use-split-reveal`) |
| `shared/lib` | `gsap`, `media-queries`, `shader-cells`, `site`, `tech-stack`, `seo`, `utils` |
| `i18n` | konfiguracja next-intl (ścieżka `request.ts` wymagana przez bibliotekę) |
| `styles` | `app.css` importuje `theme`, `global`, `helpers`, `animations` |

## A3. Struktura feature'a

```text
src/features/<feature>/
├─ components/                  # widoki
│  └─ <component>/              # każdy komponent = folder
│     ├─ index.ts               # eksportuje TYLKO publiczny komponent
│     ├─ <component>.tsx
│     ├─ <component>.styles.ts  # klasy Tailwinda
│     ├─ <component>.module.css # tylko keyframes i złożone stany
│     ├─ <component>.<part>.tsx # części wewnętrzne
│     └─ use-<component>.ts     # hook używany tylko przez ten komponent
├─ model/                       # kształt danych, bez logiki i I/O
│  ├─ <feature>.types.ts
│  └─ <feature>.constants.ts
├─ utils/                       # czyste funkcje feature'a
└─ server/                      # dopiero gdy potrzebne; każdy plik z import 'server-only'
```

Puste foldery nie są wymagane. Do `shared/` przenosimy dopiero to, co jest potrzebne w drugim miejscu i nie zna pojęć feature'a.

## A4. Kierunek zależności

```text
app/ → features/*/components → features/*/utils, features/*/model → shared/, i18n/
```

- `shared/` nie importuje niczego z `features/`.
- `model/` nie importuje `components/` ani `utils/`; `utils/` nie importuje `components/`.
- Feature może importować publiczny komponent, typ lub dane innego feature'a; nie sięga do jego części wewnętrznych. Z tego wyjątku korzysta `features/home/components/home-page`, który składa sekcje.
- GSAP tylko z `@/shared/lib/gsap`, gdzie rejestrowane są pluginy.

## A5. Cienkie kontrolery

`page.tsx` i `layout.tsx` walidują parametry (`toLocale`, `notFound`), ustawiają locale i renderują widok z feature'a. Bez logiki i bez klas Tailwinda poza `<html>` i `<body>`.

## A6. Nazewnictwo plików

- kebab-case z sufiksem warstwy: `*.types.ts`, `*.constants.ts`, `*.styles.ts`, `*.module.css`.
- Komponenty: `kebab-case.tsx`, eksport nazwany w PascalCase. `export default` tylko tam, gdzie wymaga tego Next albo `next/dynamic`.
- Plik to rzeczownik, eksportowane funkcje to czasowniki. Hook: `use-<nazwa>.ts`.
- Style: `const { heading, list } = heroSectionStyles`. Przy kolizji nazwy zmieniamy klucz stylu, nie aliasujemy.

## A7. Barrele

Domyślnie brak, importujemy bezpośrednio z pliku. Jedyny wyjątek to `components/<component>/index.ts` (także w `shared/components/`), eksportujący wyłącznie publiczne API komponentu. Zakazane: `index.ts` w korzeniu feature'a, w `model/`, `utils/`, `shared/lib/`.

## A8. Egzekwowanie

`biome.json` (sekcja `overrides`) blokuje zakazane importy dla warstw, barrele i bezpośredni import `gsap`. Zakazu sięgania do wnętrza innego feature'a nie da się zapisać ogólnie, pilnujemy go w review.

## A9. Checklista nowego komponentu

- [ ] Folder z `<nazwa>.tsx`, `<nazwa>.styles.ts`, `index.ts`.
- [ ] Teksty w `messages/pl.json` i `messages/en.json`.
- [ ] Efekty sprzątają po sobie (listenery, rAF, tweeny, `Draggable`).
- [ ] `npm run lint:fix`, `npm run typecheck`, przy większych zmianach `npm run build`.
