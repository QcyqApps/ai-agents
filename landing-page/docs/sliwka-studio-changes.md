# Zmiany na sliwka.studio

Instrukcje co zmienić. Kod i decyzje implementacyjne zostawiam Tobie (Claude Code) — masz kontekst całego projektu.

## Założenia ogólne

- Strona pozostaje stroną usługową B2B, nie portfolio.
- Nie ruszaj nagłówka, sloganu, sekcji "Brzmi znajomo?", "Co mogę dla Ciebie zbudować", "Jak wygląda współpraca?", "Dla kogo to jest", formularza kontaktowego.
- Nie dodawaj sekcji "Certyfikaty", "Doświadczenie", "CV", "Umiejętności".

---

## Zmiana 1 — Nowy projekt Custom OCR jako pierwszy, wyróżniony

W sekcji "Projekty" dodaj nowy kafelek **jako pierwszy** (przed "Agent Obsługi Klienta E-commerce" i przed "Koly"). Ma być wizualnie wyróżniony — to flagowy projekt.

Treść kafelka:

- **Tytuł:** Custom OCR — odczyt polskich formularzy
- **Opis:** Model wizyjny (oparty na TrOCR) rozpoznający odręczne numery telefonów z formularzy w języku polskim. Wytrenowany na ponad 100 000 dokumentów. Wdrożony produkcyjnie w dużej firmie e-commerce.
- **Bullet pointy:** Rozpoznawanie pisma odręcznego / Specjalizacja: polskie formularze / Trening na 100k+ dokumentów / Wdrożenie produkcyjne
- **Tagi/etykiety:** Computer Vision, Custom Model, Production, E-commerce

**Wariant zapasowy** (jeśli Adrian potwierdzi, że NDA blokuje wzmiankę o kliencie): zamień "Wdrożony produkcyjnie w dużej firmie e-commerce." na "Gotowy do wdrożenia produkcyjnego."

Grafika do kafelka: użyj `/assets/ocr-model.png`. Jeśli plik nie istnieje, zostaw placeholder — Adrian dostarczy grafikę osobno.

---

## Zmiana 2 — Usuń przyciski "Zobacz demo"

Usuń CTA "Zobacz demo" z obu istniejących kafelków projektów (Agent Obsługi Klienta E-commerce, Koly). Nowy kafelek Custom OCR też nie ma mieć żadnego CTA.

Linki do których prowadziły te przyciski (`/chat/`, `/koly/?demo=true`) zostaw nietknięte — same demówki działają, usuwamy tylko CTA z kafelków.

---

## Zmiana 3 — Badge "Anthropic API Certified" w sekcji "O mnie"

Na końcu sekcji "O mnie", po zdaniu kończącym się na "...powiem Ci to wprost.", dodaj subtelną plakietkę z linkiem.

- **Tekst plakietki:** Anthropic API Certified
- **Link:** https://verify.skilljar.com/c/d997mdyzd6g2
- **Otwieranie:** w nowej karcie

Wymagania wizualne:

- Plakietka ma być wyraźnie mniejsza niż główny tekst sekcji.
- Subtelna, nie krzykliwa — to trust signal, nie ma dominować.
- Nie dodawaj wokół niej nagłówka ani osobnej sekcji.

---

## Kolejność wdrożenia

1. Najpierw zmiany w sekcji Projekty (nowy kafelek + usunięcie CTA "Zobacz demo").
2. Potem badge w "O mnie".
3. Sprawdź responsywność na mobile — szczególnie grid projektów po dodaniu trzeciego kafelka.

---

## Do potwierdzenia z Adrianem przed pushem na produkcję

1. Czy NDA pozwala na publiczną wzmiankę o wdrożeniu w e-commerce? (Wariant główny vs zapasowy w Zmianie 1.)
2. Czy jest grafika do kafelka Custom OCR?
