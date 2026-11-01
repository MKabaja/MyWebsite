# Portfolio — opisy projektów

1 listopada 2026 · Mateusz Kabaja

## Jak z tego korzystać

Każdy projekt ma ten sam układ, żeby łatwo było przenieść go na stronę jako obrazek + opis:

- **Krótko (karta)** — dwie wersje do wyboru: A rzeczowa, B bardziej „historia”. 2–3 zdania pod obrazkiem.
- **Problemy i rozwiązania** — wybierz 2–4 najmocniejsze do rozwijanej sekcji albo modala.
- **Stack, status, obrazek** — tagi technologii, etap prac i podpowiedź, co pokazać na grafice.

Opisy są w pierwszej osobie, tym samym tonem co Twoje CV. Nic nie jest dopisane ponad to, co zrobiłeś — projekty w toku są oznaczone.

## Oś czasu (do timesteppera)

| Kiedy | Projekt | Jedna linia |
| --- | --- | --- |
| 10/2026 – obecnie | MES dla spawalni | System wyceny kosztu pracy na zleceniach, wzorowany na Comarch MES z TSN |
| 10/2026 – obecnie | Linker | Narzędzie Next.js: problematyczne zamówienia z BaseLinkera kontra dostępność w hurtowni |
| 10/2026 – obecnie | JSU — system urlopowy | Projekt dla klienta: analiza wymagań, makiety, prototyp |
| 10/2026 | Diagnostyka sieci | Case study: „internet nie działa” → konflikt czterech antywirusów blokujących DNS |
| 09/2026 – obecnie | Kozacka Drogeria | Pierwsza praca jako programista: migracja PrestaShop 1.7.5 → 9.1.5, audyt, nowy szablon |
| 09–10/2026 | Seatwright | Rezerwacja miejsc w pociągu — backend z blokadami i kolejnością locków |
| 08/2026 | Kantor (Exchange) | Przebudowa odrzuconego zadania rekrutacyjnego od zera, w Symfony |
| 2026 | RoomBook | Zadanie rekrutacyjne: rezerwacja sal z ochroną przed podwójną rezerwacją |
| 05/2026 | PetStore | Zadanie rekrutacyjne: integracja z zewnętrznym REST API, zaproszenie na rozmowę |
| 05/2026 | phpMyAdmin | Pierwszy wkład open source: poprawka regresji w edytorze SQL |
| 12/2025 – obecnie | SHIFTFlow | Pierwszy duży projekt: grafiki pracy, Laravel API + React, wdrożony na VPS |
| 12/2024 | Start z Laravel | Nauka PHP/Laravel po godzinach, obok pracy na produkcji |
| 2024 | PowerTask | Pierwsza aplikacja: lista zadań w Vanilla JS + Firebase |

## Do sprawdzenia przed publikacją

- [ ] phpMyAdmin: w CV jest PR #19489, w notatkach #20321 — który numer jest właściwy i czy PR jest już zmergowany?
- [ ] SHIFTFlow: liczba testów backendu (notatki podają 122 i „175+”) — sprawdź `php artisan test`.
- [ ] JSU: czy klient zgadza się na wymienienie nazwy firmy? Do tego czasu opis mówi „lokalna hurtownia”.
- [ ] Kozacka: upewnij się, że szef nie ma nic przeciwko opisowi prac (bez nazw modułów, adresów i danych wewnętrznych — opisy niżej ich nie zawierają).

## Kozacka Drogeria — migracja i przebudowa sklepu

**Krótko — wersja A (rzeczowa):** Jako jedyna osoba techniczna w sklepie internetowym z kosmetykami prowadzę migrację z PrestaShop 1.7.5 do 9.1.5 (PHP 7.2 → 8.1+). Zacząłem od audytu serwera, bazy i 115 modułów, a nowy sklep buduję na lokalnej kopii, żeby produkcja działała bez przerwy aż do jednego, zaplanowanego przełączenia.

**Krótko — wersja B (historia):** Pierwszego dnia dostałem sklep na wersji, która od dawna nie ma wsparcia, z bazą 17 GB i ponad setką modułów. Zamiast od razu aktualizować, najpierw wszystko zmapowałem i opisałem ryzyka. Dziś nowa wersja sklepu stoi obok starej i czeka na nowy szablon.

**Problemy i rozwiązania**

1. **Nieznane środowisko** — nikt nie wiedział dokładnie, co jest zainstalowane i od czego zależy sprzedaż. Przeprowadziłem audyt serwera VPS, wersji PHP i bazy MariaDB, a 115 modułów pogrupowałem według ryzyka. Powstały trzy dokumenty: audyt, inwentarz modułów i plan migracji. W dokumentach są tylko miejsca, gdzie leżą hasła, nigdy same hasła.
2. **Baza 17 GB** — kopia trwała godzinami i nie mieściła się wygodnie na środowisku testowym. Ustaliłem, że większość rozmiaru to tabele statystyk, i opracowałem zrzut z ich pominięciem: ok. 3 GB zamiast 17 GB.
3. **Aktualizacja przerywana po 100 sekundach** — Cloudflare zrywał długie operacje uruchamiane z przeglądarki. Wszystkie kroki aktualizacji przeniosłem do konsoli (CLI), a wdrożenie produkcyjne opieram na własnym skrypcie powłoki, zbudowanym z runbooka i przetestowanym w całości lokalnie.
4. **Sklep nie może stać** — aktualizacja odsłoniła błędy modułów, kodowania znaków i zgodności z PHP 8. Pracuję na kopii w Dockerze ze zrzutu bazy, przyczyn szukam w logach serwera i PHP, a sklep produkcyjny zostaje na starej wersji do jednego przełączenia: nowa wersja + nowy szablon naraz.
5. **Usuwany moduł z ważnymi danymi** — stary moduł Allegro idzie do usunięcia, ale jego tabela trzyma historię ok. 107 tys. zamówień. Zaplanowałem usunięcie modułu z zachowaniem tabeli.
6. **Współdzielony token API** — integracja korzystała z jednego tokenu zapisanego jawnym tekstem. Zgłosiłem to i zaproponowałem imienne tokeny, które da się śledzić i odwołać osobno.
7. **Projekt z Figmy bez wersji mobilnej** — szablon od grafika miał tylko desktop. Nowy motyw buduję w osobnym repozytorium na bazie Hummingbird i projektuję brakującą wersję mobilną, zachowując logo i kolory marki.
8. **Wolny sklep** — ciężkie zdjęcia i słabe wyniki PageSpeed. Kompresja i konwersja do WebP z lazy loadingiem, cache oraz poprawki według Lighthouse.

**Poza kodem:** obsługuję łańcuch WAPRO Mag → BaseLinker → PrestaShop (sklep, Allegro, Empik Marketplace), techniczne SEO (meta tagi, przekierowania, Search Console), drukarki fiskalne i wsparcie IT dla zespołu.

- **Stack:** PrestaShop 1.7 → 9.1.5 · PHP 7.2 → 8.1+ · MariaDB · Docker · Linux / DirectAdmin · Cloudflare · BaseLinker · WAPRO Mag · Figma
- **Status:** 09/2026 – obecnie; nowa wersja działa na środowisku testowym, produkcja przed przełączeniem.
- **Obrazek:** porównanie „przed / po” (stary sklep vs makieta nowego szablonu) albo wykres Lighthouse przed i po optymalizacji.

## Linker — zamówienia z BaseLinkera kontra dostępność w hurtowni

**Krótko — wersja A (rzeczowa):** Wewnętrzne narzędzie w Next.js i TypeScript dla sklepu internetowego. Pobiera zamówienia, których nie da się zrealizować z magazynu, sprawdza dostępność produktów w hurtowni po EAN i przygotowuje plik CSV do zamówienia oraz listę dla sklepów stacjonarnych.

**Krótko — wersja B (historia):** Codziennie ktoś ręcznie sprawdzał, które zamówienia utknęły przez brak towaru i gdzie ten towar jeszcze jest. Linker robi to za niego: zbiera takie zamówienia z BaseLinkera, porównuje je z ofertą hurtowni i oddaje gotową listę do zamówienia.

**Problemy i rozwiązania**

1. **Hurtownia bez API do zamawiania** — zamówienia w hurtowni są ręczne i chronione captchą, ale przyjmują import CSV. Linker generuje gotowy plik CSV z pozycjami dostępnymi w hurtowni, więc ręczna praca kończy się na jednym imporcie.
2. **Stany sklepów stacjonarnych w osobnej bazie** — nie miałem do nich dostępu, a sklepy i tak korzystają ze wspólnego arkusza. Zamiast obchodzić ten proces, Linker przygotowuje listę EAN-ów do wklejenia w ten arkusz — dla towaru, którego nie ma w hurtowni.
3. **API BaseLinkera nie mówiło tego, co się wydawało** — domyślny magazyn miał zerowe stany, prawdziwe stany szły z innego źródła, dziennik zdarzeń był wyłączony, a zmiany statusów zamówień bywały sprzeczne. Przed pisaniem kodu zbadałem konto i spisałem mapę API, którą aktualizuję przy każdym sprawdzeniu.
4. **Wyszukiwarka traciła fokus** — zmiana parametrów URL przemontowywała całą stronę. Przeniosłem pole wyszukiwania do layoutu, dodałem debounce 300 ms i nawigację w `startTransition`, a synchronizację z URL rozdzieliłem na dwa stany, bo wersja z jednym cofała wpisany tekst.
5. **Migające ładowanie** — skeleton przy każdym wyszukiwaniu był męczący. Skeleton pokazuje się tylko przy pierwszym wejściu, a przy kolejnych wyszukiwaniach stare wyniki są lekko przyciemnione do czasu nowych.
6. **Porządek w kodzie od początku** — struktura feature-first z warstwami (źródła → mapery → repozytoria → serwisy), a kierunek zależności pilnuje Biome, nie dobra wola. Tę konwencję przenoszę dziś do kolejnych projektów.

- **Stack:** Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Zod · papaparse · Biome · BaseLinker API
- **Status:** 10/2026 – obecnie; widok produktów z wyszukiwaniem gotowy, integracja z BaseLinkerem w trakcie. Demo planowane na Vercelu.
- **Obrazek:** zrzut tabeli produktów z wyszukiwarką (złoty akcent na ciemnym tle) albo prosty schemat: BaseLinker → Linker → CSV do hurtowni.

## SHIFTFlow — system do zarządzania grafikami pracy

**Krótko — wersja A (rzeczowa):** Aplikacja do planowania grafików, która zastępuje ręczne układanie zmian w Excelu. Backend w Laravelu pilnuje konfliktów zmian, limitów godzin i przerw, a frontend w React i TypeScript buduję według własnego design systemu. Całość działa na własnym serwerze z automatycznym wdrażaniem.

**Krótko — wersja B (historia):** Zobaczyłem, jak w Kopalni Soli Wieliczka układa się grafiki w arkuszu, i postanowiłem zrobić to porządnie. To mój pierwszy duży projekt i miejsce, gdzie nauczyłem się najwięcej: od walidacji reguł biznesowych, przez bezpieczeństwo serwera, po deploy po każdym merge'u.

**Problemy i rozwiązania**

1. **Wiele reguł naraz** — zmiana może łamać dostępność, uprawnienia do stanowiska, limit godzin albo minimalną przerwę. Każdą regułę zamknąłem w osobnym walidatorze, połączonym wzorcem Chain of Responsibility (7 walidatorów). Błąd jednej pozycji zatrzymuje zapis całego zestawu.
2. **Otwarty Redis na serwerze** — podczas wdrożenia zauważyłem, że port 6379 jest wystawiony do internetu bez hasła. Przypiąłem Redis do localhosta, dodałem hasło i usunąłem mapowanie portu w Dockerze. Od tej pory przeglądam porty po każdej zmianie konfiguracji.
3. **Gdzie trzymać token** — JWT w localStorage jest podatny na XSS, a w pamięci znika po odświeżeniu. Przeniosłem go do ciasteczka httpOnly z SameSite=Lax przez mały middleware-adapter, bez zmian w bibliotece JWT. Wylogowanie unieważnia token przez blacklistę w Redis.
4. **Front i API na różnych domenach** — hosting frontu na Netlify wymagałby SameSite=None i skomplikowanego CORS. Postawiłem front i API na tym samym serwerze: nginx serwuje build i przekazuje `/api` do Laravela, a lokalnie to samo robi proxy w Vite.
5. **CI odrzucało lockfile** — npm 11 na Windowsie generował plik, którego CI (npm 10) nie akceptowało, i żadna flaga tego nie naprawiała. Przeniosłem projekt do WSL, wyrównałem wersję Node z runnerem i wprowadziłem zasadę `npm ci` przed każdym pushem.
6. **Wdrożenie bez dostępu roota z CI** — merge do `main` uruchamia CI, a potem deploy przez SSH z kluczem ograniczonym do jednej komendy i skryptem wymagającym sudo. GitHub Actions nie ma szerszego dostępu do serwera.
7. **Zbyt wcześnie optymalizowany kod** — przy optymistycznych aktualizacjach dostępności znalazłem teoretyczne mignięcie przy dwóch szybkich kliknięciach. Zapisałem przypadek i gotową poprawkę, ale wdrożę ją dopiero, gdy odtworzę problem na żywo. Zasada: najpierw zmierzyć, potem optymalizować.
8. **Refaktor, który nie zmienia zachowania** — zanim aplikacja urośnie, wymieniam axios na własnego klienta na `fetch`, dodaję walidację odpowiedzi API przez Zod i testy na MSW. Każdy krok to osobny PR, który zmienia przygotowanie testów, ale nigdy ich asercje.

- **Stack:** Laravel 12 · MySQL · Redis · JWT · PestPHP · PHPStan · React 19 · TypeScript · TanStack Router/Query · Zustand · Tailwind v4 · Vitest · Docker · nginx · GitHub Actions
- **Status:** 12/2025 – obecnie; backend zamknięty i na produkcji, frontend w trakcie (logowanie, design system z 14 komponentami, dyspozycyjność). Demo: shiftflow.duckdns.org
- **Obrazek:** ekran logowania z renderem 3D (ciemny motyw ze złotym akcentem) albo schemat walidatorów w łańcuchu.

## JSU — system urlopowy dla lokalnej firmy

**Krótko — wersja A (rzeczowa):** Projekt dla klienta — lokalnej hurtowni zatrudniającej ok. 22 osoby. Aplikacja do wniosków urlopowych, limitów nieobecności w działach i okresów zablokowanych, działająca tylko w sieci firmy. Prowadzę całość: od rozmowy z klientem i spisania wymagań, przez makiety, po klikalny prototyp.

**Krótko — wersja B (historia):** Właściciel firmy chciał uporządkować urlopy w firmie. Zanim napisałem linijkę kodu, przeszliśmy razem 23 otwarte pytania — od przepisów o urlopie na żądanie po to, kto zatwierdza wyjątki. Klient dostaje najpierw klikalny prototyp, a dopiero potem kod.

**Problemy i rozwiązania**

1. **Wymagania z głowy klienta i z Kodeksu pracy** — część zasad była oczywista dla właściciela, część wynikała z prawa (urlop na żądanie z puli wypoczynkowego, zaległy urlop do 30 września, L4 w dniach kalendarzowych). Spisałem ustalenia z oznaczeniem źródła: klient, ja albo przepisy, i 23 otwarte pytania, które zamknęliśmy na kolejnym spotkaniu.
2. **Ilu ludzi może być na urlopie naraz** — biuro i magazyn mają osobne limity. Wniosek ponad limit albo w okresie zablokowanym nie jest odrzucany, tylko trafia do admina jako wyjątek; urlop na żądanie tylko ostrzega.
3. **Okresy zablokowane kontra istniejące urlopy** — co zrobić, gdy admin blokuje termin, na który ktoś już ma urlop? Okresu nie da się zapisać, dopóki każdy kolizyjny urlop nie zostanie przesunięty albo świadomie zostawiony jako wyjątek.
4. **Pracownicy bez firmowych maili** — nie ma jak wysyłać linków do resetu hasła. Login generuje się sam (pierwsza litera imienia + 5 liter nazwiska), system nadaje hasło tymczasowe, a admin drukuje małą kartkę z danymi do pierwszego logowania.
5. **Dostęp tylko z firmy** — dane osób nie powinny być dostępne z internetu. Aplikacja stoi na komputerze w biurze klienta, a ja zaplanowałem automatyczne kopie zapasowe i zdalne utrzymanie przez VPN/SSH, z Gitem, środowiskiem testowym i CI/CD.
6. **Klient musi zobaczyć aplikację, zanim powstanie kod** — przygotowałem DESIGN.md z paletą zgodną z WCAG, ekrany narysowałem w Figmie, a całość przenoszę do jednego klikalnego prototypu pod jednym linkiem.

- **Stack (planowany):** Next.js · TypeScript · Tailwind · Figma · wdrożenie on-premise
- **Status:** 10/2026 – obecnie; wymagania i makiety gotowe, programowanie od przełomu 2026/2027.
- **Obrazek:** ekran kalendarza urlopów albo karta pracownika z makiety (ciemny motyw z akcentem w kolorze marki klienta).

## MES dla spawalni — wycena kosztu pracy na zleceniach

**Krótko — wersja A (rzeczowa):** System MES dla zakładu spawalniczego, wzorowany na Comarch MES, z którym pracowałem w TSN. Biuro rozpisuje zlecenia na pozycje i czynności ze stawkami, a pracownik hali skanuje kod QR z karty pracy i rejestruje START / PAUZA / STOP. Wynik to rzeczywisty koszt pracy porównany z wyceną.

**Krótko — wersja B (historia):** Przez lata byłem po drugiej stronie takiego systemu: skanowałem karty pracy przy spawaniu. Teraz projektuję go od strony biura i hali naraz. To też mój eksperyment z pracą agentową: ja jestem architektem i recenzentem, a kod piszą i testują agenci Claude Code według moich specyfikacji.

**Problemy i rozwiązania**

1. **Praca grupowa i przerwy** — przy jednej pozycji pracuje czasem kilka osób, ktoś robi pauzę, ktoś kończy za kogoś. Każdy ma własny odcinek czasu, grupa liczy się w roboczogodzinach, a jeden pracownik może mieć tylko jedną aktywną pozycję. Stawka jest zamrażana na pozycji, żeby zmiana cennika nie przepisywała historii.
2. **Zapomniane STOP** — na hali ludzie zapominają zakończyć pracę. System odlicza przerwy według godzin zakładu i sam pauzuje na koniec zmiany. Pracownik może poprawić czas, ale w granicach: nie w przyszłości, bez nakładania odcinków, maksymalnie kilka dni wstecz, a każda korekta zostaje oznaczona.
3. **Wspólny tablet na hali** — sesja serwera żyje 8 godzin, więc „lokalne wylogowanie” bez sieci zostawiłoby otwarte konto. Ekran „Wylogowywanie…” zasłania dane i ponawia żądanie, dopóki serwer nie potwierdzi. Karty przeglądarki synchronizują sesję przez BroadcastChannel.
4. **Proste hasła hali bez proszenia się o włamanie** — pracownicy hali mają krótkie hasła ustawiane przez biuro. Zabezpieczyłem to limitami prób na login, IP, sieć i konto oraz opcją logowania tylko z sieci zakładu. Rola hali nie widzi stawek ani danych klienta.
5. **Ataki przez zależności** — każda biblioteka przechodzi przez listę do akceptacji i kontrolę: nazwa, wydawca, wersja starsza niż 7 dni, instalacja bez skryptów, `npm audit` i `composer audit`.
6. **400 testów to za dużo** — agenci pisali testy wszystkiego, także frameworka. Spisałem własną strategię testów: domena i bezpieczeństwo dokładnie, endpointy krótko, konfiguracja wcale. Weryfikator zgłasza też testy do usunięcia.

- **Stack:** Laravel 13 · PHP 8.5 · PostgreSQL · Sanctum (SPA) · Pest · Larastan 8 · React · TypeScript · TanStack Router/Query · Zod · shadcn · Biome · Docker
- **Status:** 10/2026 – obecnie; fundamenty, logowanie i konta gotowe, kolejny etap to katalog czynności.
- **Obrazek:** drukowana karta pracy z kodem QR obok ekranu tabletu ze START / PAUZA / STOP.

## Kantor (Exchange) — przebudowa po odrzuconym zadaniu

**Krótko:** Zadanie rekrutacyjne z kantorem walut zostało odrzucone, ale dostałem konkretny feedback: błędy w liczeniu spreadu i modelu prowizji. Zamiast łatać stary kod, zbudowałem platformę od zera w nowym repozytorium — tym razem z modelem escrow i czystym REST API w Symfony.

1. **Pieniądze „w drodze”** — transakcja blokuje środki przy utworzeniu, przy zatwierdzeniu przelewa je odbiorcy i naliczana jest marża firmy, a przy odrzuceniu środki wracają. Cały cykl opisują cztery statusy transakcji.
2. **Próg antyfraudowy w innej walucie** — limit 15 000 jest w EUR, więc kwotę trzeba najpierw przeliczyć, a dopiero potem porównać.
3. **Testy, które niczego nie testowały** — część kodu wygenerował wcześniej agent AI, a jego testy opierały się na mockach i nie dotykały SQL. Do audytu użyłem testowania mutacyjnego, a zadania dotyczące sald i escrow oznaczyłem jako strefy wyłącznie ręcznego przeglądu.

- **Stack:** PHP 8.5 · Symfony 8 · Doctrine DBAL (czysty SQL) · MariaDB · PHPUnit · PHPStan · React + DevExtreme (planowany front)
- **Status:** 08/2026; backend w porządkowaniu, front w projektowaniu.

## Seatwright — rezerwacja miejsc w pociągu

**Krótko:** Backend systemu rezerwacji miejsc, w którym sednem jest współbieżność: dwóch użytkowników nie może zarezerwować tego samego miejsca, a tymczasowa blokada musi wygasać.

1. **Zakleszczenia przy blokadach** — równoczesne rezerwacje kilku miejsc mogły się wzajemnie zablokować. Ustaliłem stałą kolejność blokad: najpierw użytkownik, potem miejsca rosnąco po ID.
2. **Stan miejsca zależy od tego, kto patrzy** — „zablokowane przeze mnie” i „zablokowane przez kogoś” to różne stany. Liczy je serwer dla zalogowanego użytkownika, a kontrakt API nie zawiera języka interfejsu (żadnych „zielonych miejsc”).

- **Stack:** Laravel 12 · MySQL · Pest · PHPStan · API Resources
- **Status:** 09–10/2026; backend gotowy (38 zadań), front w planach.

## RoomBook — rezerwacja sal konferencyjnych

**Krótko:** Zadanie rekrutacyjne: REST API w Laravelu i SPA w Vue 3 z TypeScriptem. Dostałem pozytywny feedback techniczny i wdrożyłem wszystkie uwagi recenzenta.

1. **Podwójna rezerwacja przy równoczesnych żądaniach** — rozwiązane transakcją z `lockForUpdate()`; po review doszła blokada wiersza sali przeciw phantom reads.
2. **Walidacja w łańcuchu** — kolejność dat → termin w przyszłości → pojemność → dostępność, każdy krok w osobnym walidatorze (Chain of Responsibility).

- **Stack:** Laravel 12 · Vue 3 · TypeScript · Pinia · MySQL · Tailwind v4 · GitHub Actions · 21 testów
- **Status:** 2026, zakończony. github.com/MKabaja/RoomBook

## PetStore — integracja z zewnętrznym REST API

**Krótko:** Zadanie rekrutacyjne: aplikacja w Laravelu, która nie ma własnej bazy, tylko pracuje na zewnętrznym API. Po oddaniu zostałem zaproszony na rozmowę.

1. **Niestabilne API** — cache w Redis z TTL, timeout i ponawianie żądań oraz osobne komunikaty dla braku zasobu, błędu i niedostępności usługi.
2. **Uprawnienia plików w Dockerze na WSL2** — kontener tworzył pliki jako inny użytkownik niż host. Rozwiązałem to argumentami `WWWUSER`/`WWWGROUP` dopasowanymi do UID hosta.

- **Stack:** PHP 8.3 · Laravel · Blade · Tailwind v4 · TypeScript · Redis · Pest · PHPStan · Docker · GitHub Actions
- **Status:** 05/2026, zakończony. github.com/MKabaja/Petstore

## Open source — phpMyAdmin

**Krótko:** Naprawiłem regresję rozmiaru czcionki w edytorze SQL (SCSS, CSS custom properties). Najtrudniejsze nie było samo CSS, tylko odnalezienie się w dużym, cudzym kodzie i przejście review z maintainerami (DCO, testy CI).

- **Status:** 05/2026 — numer PR i status do potwierdzenia (patrz „Do sprawdzenia”).

## Case study: „Internet ledwo działa”

**Krótko:** Laptop z Windows 11 łączył się z siecią, ale strony prawie się nie ładowały — przez Wi-Fi i przez kabel. Pierwsza hipoteza (sterownik karty sieciowej) okazała się błędna.

1. **Dzielenie problemu na warstwy** — ping po adresach IP działał bez strat, a każda nazwa domeny kończyła się timeoutem, także przy zapytaniu bezpośrednio do 8.8.8.8. Wniosek: DNS blokowany lokalnie, nie przez router.
2. **Przyczyna** — cztery antywirusy naraz, w tym dwa doinstalowane z innymi programami, z konfliktującymi filtrami sieciowymi. Bez DNS nie działał nawet `winget`, więc usunąłem je skryptem PowerShell czytającym dane deinstalacji z rejestru.
3. **Weryfikacja** — własny skrypt diagnostyczny przed i po: DNS 9–55 ms, pobieranie 57 Mb/s, aktywny tylko Windows Defender.

## Warsztat: metodyka planowania i praca z AI

**Krótko:** Opracowałem własną metodykę planowania projektów: trzy dokumenty w stałej kolejności (kontrakt API → specyfikacja backendu → specyfikacja frontu + DESIGN.md). Jeden etap to jeden branch i jeden PR z CI. Prowadzę ją ręcznie albo z agentami AI.

1. **Kontekst gubił się między komputerami** — pracuję na Windowsie w pracy i na WSL w domu. Skille, agentów i pamięć projektów trzymam w prywatnym repozytorium synchronizowanym hookami na starcie i końcu sesji.
2. **AI zgaduje, gdy nie wie** — każde zadanie ma zależności, pliki, kryteria ukończenia, komendy do weryfikacji i zakaz zgadywania; obszary krytyczne (pieniądze, autoryzacja) przechodzą przez ręczny przegląd.

## Wcześniejsze i odstawione

- **PrintForge** (2026) — Laravel + Inertia + React; zbudowany częściowo. Ciekawostki: nawigacja dla gościa/użytkownika/admina wzorcem Strategy i zarządzanie fokusem pod dostępność. Projekt odłożony.
- **PowerTask** (2024) — pierwsza aplikacja: lista zadań w Vanilla JS + Firebase. Zostawiona jako punkt startowy na osi czasu.
- **Koncepcje bez kodu** — redesign sklepu lokalnej sieci supermarketów (pełny plan, React + Express), schemat bazy BOM dla producenta pras (8 tabel, PostgreSQL). Można pokazać jako „planowanie”, jeśli zależy Ci na pokazaniu analizy.
