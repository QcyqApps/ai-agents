# sliwka.studio — Specyfikacja strony portfolio

## Informacje ogólne

- **Domena:** sliwka.studio
- **Właściciel:** Adrian Śliwka
- **Cel strony:** Portfolio/wizytówka showcasująca projekty automatyzacji AI i agentów AI, zachęcająca do współpracy
- **Język strony:** Polski
- **Typ:** Single Page (jedna strona, sekcje ze scroll)
- **Styl:** Minimalistyczny, jasny motyw, treść > efekty wizualne

---

## Profil właściciela

- **Imię i nazwisko:** Adrian Śliwka
- **Doświadczenie:** 10 lat w programowaniu
- **Specjalizacja:** Automatyzacje i agenci AI dla e-commerce
- **Technologie:** Node.js (NestJS), Unity3D, n8n, Claude API, OpenAI API, PostgreSQL, React
- **Doświadczenie branżowe:** E-commerce, systemy ERP, magazyny, automatyzacje procesów biznesowych
- **Dodatkowe:** Twórca gry mobilnej Tidle (Idle MMORPG) — pełny produkt od zera (backend, frontend, multiplayer, monetyzacja, release na iOS i Android)
- **Lokalizacja:** Polska

---

## Struktura strony

### Sekcja 1: Hero

Pierwsza rzecz którą widzi odwiedzający. Bez zdjęć tła, bez animacji. Czysty tekst.

**Zawartość:**
- Imię i nazwisko: Adrian Śliwka
- Podtytuł/tagline: "Buduję agentów AI i automatyzacje dla e-commerce"
- Krótki opis (1-2 zdania): "10 lat doświadczenia w programowaniu. Tworzę inteligentnych asystentów, automatyzacje procesów i integracje które oszczędzają czas i pieniądze."
- Przycisk CTA: "Zobacz projekty" (scrolluje do sekcji projektów)
- Przycisk CTA drugorzędny: "Porozmawiajmy" (scrolluje do sekcji kontakt)

---

### Sekcja 2: Projekty / Demo

Najważniejsza sekcja strony. Kafelki z projektami. Każdy kafelek zawiera:
- Nazwę projektu
- Krótki opis (1-2 zdania) co to robi i jaki problem rozwiązuje
- Screenshot lub GIF (placeholder na razie — obrazki dodam później)
- Przycisk "Zobacz demo" — link do działającego demo

**Projekt 1: Agent Obsługi Klienta E-commerce**
- Opis: "Inteligentny asystent czatowy dla sklepów internetowych. Odpowiada na pytania klientów, sprawdza statusy zamówień, pomaga w zwrotach — 24/7, bez udziału człowieka."
- Funkcje kluczowe: Sprawdzanie statusu zamówień, tracking przesyłek, obsługa zwrotów, sprawdzanie dostępności produktów, eskalacja do człowieka
- Technologie: n8n, Claude API, PostgreSQL, WebSocket
- Demo: [link do demo — placeholder]
- Screenshot: [placeholder — widget czatu na stronie sklepu]

**Projekt 2: [Placeholder — Drugi agent]**
- Opis: "Wkrótce"
- (Do uzupełnienia gdy będzie gotowy)

**Projekt 3: [Placeholder — Trzeci agent]**
- Opis: "Wkrótce"
- (Do uzupełnienia gdy będzie gotowy)

Uwaga dla agenta kodującego: Zaprojektuj sekcję tak, aby łatwo było dodawać nowe projekty (powtarzalny komponent/kafelek). Projekty "Wkrótce" mogą być wyszarzone lub mieć badge "Coming soon".

---

### Sekcja 3: Co oferuję

Krótka sekcja opisująca zakres usług. Bez bullet pointów — zwięzły tekst lub 3 małe bloki.

**Blok 1: Agenci AI**
- "Inteligentni asystenci obsługi klienta, chatboty sprzedażowe, agenci do przetwarzania zamówień. Podpięci pod Twój sklep, bazę danych i systemy."

**Blok 2: Automatyzacje procesów**
- "Automatyzacja powtarzalnych zadań — przetwarzanie zamówień, generowanie opisów produktów, synchronizacja stanów magazynowych, powiadomienia i raporty."

**Blok 3: Integracje i systemy**
- "Łączenie sklepu z ERP, magazynem, kurierami, bramkami płatności. Dedykowane API i integracje szyte na miarę."

---

### Sekcja 4: O mnie

Krótka sekcja, 3-5 zdań. Żadnego CV, żadnej listy umiejętności.

**Treść:**
"Nazywam się Adrian Śliwka. Od 10 lat programuję — budowałem systemy e-commerce, ERP, magazyny, a ostatnio automatyzacje i agentów AI. Stworzyłem od zera grę mobilną Tidle (Idle MMORPG dostępną na Google Play i App Store) — cały backend, frontend, multiplayer i monetyzację, sam. Teraz pomagam sklepom internetowym automatyzować procesy i wdrażać AI, które realnie oszczędza czas i pieniądze."

Opcjonalnie: link do Google Play (Tidle) jako dowód kompetencji.

---

### Sekcja 5: Współpraca / Kontakt (CTA)

Ostatnia sekcja. Jasne wezwanie do działania.

**Nagłówek:** "Chcesz zautomatyzować swój sklep?"

**Tekst:** "Opisz swój problem lub pomysł — odpiszę w ciągu 24 godzin. Pierwsze konsultacje są bezpłatne."

**Formularz kontaktowy:**
- Imię (pole tekstowe)
- Email (pole tekstowe)
- Wiadomość (textarea)
- Przycisk: "Wyślij wiadomość"

Formularz powinien wysyłać dane na endpoint (np. webhook n8n, Formspree, lub email). Na start może to być prosty mailto: link lub integracja z Formspree.

**Alternatywne metody kontaktu (pod formularzem):**
- Email: [do uzupełnienia]
- LinkedIn: [do uzupełnienia]

---

## Wytyczne wizualne

### Ogólne zasady
- **Motyw:** Jasny
- **Filozofia:** Minimalizm, treść jest najważniejsza
- **Bez:** Animacji na scroll, parallax, cząsteczek, gradientów, stock photos
- **Z:** Czysta typografia, dużo białej przestrzeni, czytelna hierarchia

### Typografia
- Font nagłówków: Wyrazisty, ale czytelny sans-serif (np. Sora, Outfit, Satoshi — coś z charakterem, nie Inter/Roboto/Arial)
- Font body: Czysty, dobrze czytelny sans-serif sparowany z nagłówkowym
- Rozmiary: Duże nagłówki, komfortowy rozmiar tekstu (min 16-18px body)

### Layout
- Maksymalna szerokość contentu: ~900-1000px, wycentrowany
- Dużo przestrzeni między sekcjami
- Mobile-first, responsywny
- Nawigacja: Prosta, sticky na górze — logo/nazwa + linki do sekcji (Projekty, O mnie, Kontakt)

### Kafelki projektów
- Wyraźne, klikalne
- Screenshot/GIF po lewej lub na górze, tekst obok/pod
- Przycisk "Zobacz demo" wyraźny (kolor akcentowy)
- Projekty "Coming soon" — wyszarzone lub z subtlelnym badge

---

## Wymagania techniczne

- **Stack:** HTML + CSS + JS (vanilla) lub React — bez ciężkich frameworków
- **Responsywność:** Mobile-first, działa dobrze na telefonie, tablecie i desktopie
- **Wydajność:** Szybkie ładowanie, bez zbędnych bibliotek
- **SEO:** Meta tagi, Open Graph, poprawny HTML semantyczny
- **Hosting:** Statyczna strona — Vercel, Netlify, GitHub Pages lub podobne
- **Formularz:** Integracja z Formspree, webhook n8n, lub prosty mailto

### Meta tagi (SEO)
```html
<title>Adrian Śliwka — Agenci AI i automatyzacje dla e-commerce</title>
<meta name="description" content="Buduję agentów AI i automatyzacje dla sklepów internetowych. 10 lat doświadczenia w programowaniu. Inteligentni asystenci obsługi klienta, automatyzacje procesów, integracje.">
```

### Open Graph
```html
<meta property="og:title" content="Adrian Śliwka — Agenci AI i automatyzacje dla e-commerce">
<meta property="og:description" content="Buduję inteligentnych asystentów AI i automatyzacje które oszczędzają czas i pieniądze.">
<meta property="og:url" content="https://sliwka.studio">
<meta property="og:type" content="website">
```

---

## Placeholdery do uzupełnienia później

| Element | Status |
|---------|--------|
| Screenshot agenta obsługi klienta | Do dodania (screenshot widgetu czatu) |
| Link do demo agenta | Do dodania |
| Projekt 2 — nazwa, opis, demo | Do zbudowania |
| Projekt 3 — nazwa, opis, demo | Do zbudowania |
| Email kontaktowy | Do uzupełnienia |
| Profil LinkedIn | Do uzupełnienia |
| Favicon | Do stworzenia |
| OG Image (1200x630) | Do stworzenia |

---

## Uwagi końcowe dla agenta kodującego

1. **Treść jest ważniejsza niż efekty.** Strona ma wyglądać profesjonalnie i czysto, nie imponować animacjami.
2. **Łatwość edycji.** Struktura kodu powinna pozwalać na łatwe dodawanie nowych projektów i zmianę treści.
3. **Szybkość.** Zero zbędnych dependencji. Strona powinna ładować się w <1s.
4. **Mobile.** Większość odwiedzających trafi z LinkedIn na telefonie — mobile musi wyglądać idealnie.
5. **Jeden plik** preferowany (HTML + inline CSS/JS) dla prostoty deploymentu, chyba że złożoność wymaga podziału.