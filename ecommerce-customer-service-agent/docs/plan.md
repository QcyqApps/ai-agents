# Agent AI Obsługi Klienta E-commerce — Flow n8n

## Architektura ogólna

```
Klient (widget czatu na stronie)
        │
        ▼
   Webhook n8n ──► Agent AI (Claude/OpenAI) ──► Narzędzia (tools)
        │                                            │
        ▼                                            ▼
   Odpowiedź JSON ◄──────────────────── Baza zamówień / Produkty / FAQ
```

---

## Flow 1: Główny endpoint czatu

### Node 1 — Webhook (trigger)

- **Typ:** Webhook
- **Metoda:** POST
- **Path:** `/chat`
- **Body (JSON):**

```json
{
  "session_id": "abc123",
  "message": "Gdzie jest moja paczka? Zamówienie #4521"
}
```

- `session_id` identyfikuje rozmowę (do kontekstu wieloturowego)

---

### Node 2 — Pobranie historii rozmowy

- **Typ:** Postgres / MySQL / Redis (zależy od Twojego stacku)
- **Operacja:** SELECT
- **Cel:** Pobranie ostatnich N wiadomości z danej sesji, żeby agent miał kontekst rozmowy

```sql
SELECT role, content FROM chat_messages
WHERE session_id = '{{ $json.session_id }}'
ORDER BY created_at DESC LIMIT 20
```

> **Alternatywa na demo:** n8n ma wbudowany "Window Buffer Memory" — przechowuje kontekst w pamięci bez bazy danych. Wystarczy na demo i testy.

---

### Node 3 — Agent AI (główny mózg)

- **Typ:** AI Agent (n8n node "AI Agent")
- **Model:** Claude 3.5 Sonnet lub GPT-4o
- **System prompt:**

```
Jesteś asystentem obsługi klienta sklepu [NAZWA SKLEPU].

ZASADY:
- Odpowiadaj po polsku, uprzejmie i konkretnie
- Nigdy nie wymyślaj informacji — jeśli nie wiesz, powiedz to
- Nie dawaj rabatów ani nie obiecuj terminów dostawy
- Jeśli klient jest wściekły lub sprawa jest skomplikowana — eskaluj do człowieka
- Zawsze pytaj o numer zamówienia jeśli klient go nie podał

POLITYKA SKLEPU:
- Zwroty: 14 dni od otrzymania przesyłki
- Darmowa dostawa od 200 zł
- Czas realizacji: 1-3 dni robocze
- Reklamacje: rozpatrywane do 14 dni
- Metody płatności: BLIK, przelew, karta, za pobraniem

ESKALACJA DO CZŁOWIEKA gdy:
- Klient wyraźnie prosi o kontakt z człowiekiem
- Reklamacja dotycząca uszkodzonego towaru
- Klient jest agresywny lub grozi
- Problem którego nie potrafisz rozwiązać
- Klient chce anulować zamówienie które jest już wysłane
```

- **Podpięte narzędzia (tools):** patrz niżej

---

### Node 4 — Zapis wiadomości

- **Typ:** Postgres / MySQL
- **Operacja:** INSERT
- **Cel:** Zapisanie wiadomości klienta + odpowiedzi agenta do historii

```sql
INSERT INTO chat_messages (session_id, role, content, created_at)
VALUES
  ('{{ $json.session_id }}', 'user', '{{ $json.message }}', NOW()),
  ('{{ $json.session_id }}', 'assistant', '{{ $json.response }}', NOW())
```

---

### Node 5 — Respond to Webhook

- **Typ:** Respond to Webhook
- **Body:**

```json
{
  "response": "{{ agent_output }}",
  "escalated": false
}
```

---

## Narzędzia (Tools) dla Agenta

Każde narzędzie to osobny sub-flow w n8n podpięty do agenta.

---

### Tool 1: `sprawdz_zamowienie`

**Opis dla agenta:** "Sprawdza status zamówienia po numerze zamówienia lub adresie email klienta"

**Input:**
```json
{
  "order_id": "4521"        // opcjonalnie
  "email": "jan@mail.com"   // opcjonalnie
}
```

**Flow:**
1. **IF node** — czy podano order_id czy email?
2. **HTTP Request / DB Query** — zapytanie do bazy/API sklepu
3. **Return** — zwraca dane:

```json
{
  "order_id": "4521",
  "status": "shipped",
  "items": ["Koszulka XL czarna", "Skarpetki 3-pack"],
  "total": "129.99 PLN",
  "shipping_method": "InPost Paczkomat",
  "tracking_number": "620123456789",
  "tracking_url": "https://inpost.pl/sledzenie-przesylek?number=620123456789",
  "estimated_delivery": "2026-03-06",
  "created_at": "2026-03-02"
}
```

---

### Tool 2: `sprawdz_dostepnosc`

**Opis dla agenta:** "Sprawdza czy produkt jest dostępny i w jakich wariantach (rozmiar, kolor)"

**Input:**
```json
{
  "product_name": "koszulka basic",
  "variant": "XL czarna"      // opcjonalnie
}
```

**Flow:**
1. **HTTP Request / DB Query** — szukanie produktu (LIKE / full-text search)
2. **Return:**

```json
{
  "product": "Koszulka Basic",
  "price": "79.99 PLN",
  "available_variants": [
    { "size": "M", "color": "czarna", "stock": 12 },
    { "size": "L", "color": "czarna", "stock": 5 },
    { "size": "XL", "color": "czarna", "stock": 0 },
    { "size": "XL", "color": "biała", "stock": 8 }
  ],
  "url": "https://sklep.pl/koszulka-basic"
}
```

---

### Tool 3: `informacje_o_dostawie`

**Opis dla agenta:** "Pobiera szczegóły dostawy i tracking dla zamówienia"

**Input:**
```json
{
  "order_id": "4521"
}
```

**Flow:**
1. **DB Query** — pobranie tracking number i kuriera
2. **IF node** — jaki kurier? (InPost / DPD / DHL / Poczta Polska)
3. **HTTP Request** — odpytanie API kuriera o aktualny status
4. **Return:**

```json
{
  "carrier": "InPost",
  "tracking_number": "620123456789",
  "tracking_url": "https://inpost.pl/sledzenie-przesylek?number=620123456789",
  "current_status": "W drodze do paczkomatu",
  "last_update": "2026-03-04 08:30",
  "estimated_delivery": "2026-03-05"
}
```

---

### Tool 4: `utworz_zgloszenie_zwrotu`

**Opis dla agenta:** "Tworzy zgłoszenie zwrotu towaru. Używaj tylko gdy klient wyraźnie chce zwrócić produkt i podał numer zamówienia."

**Input:**
```json
{
  "order_id": "4521",
  "reason": "Nie pasuje rozmiar",
  "items": ["Koszulka XL czarna"]
}
```

**Flow:**
1. **DB Query** — sprawdzenie czy zamówienie istnieje i czy mieści się w 14 dniach
2. **IF node** — czy zwrot możliwy?
    - TAK → utwórz zgłoszenie, wygeneruj numer zwrotu
    - NIE → zwróć powód odmowy
3. **Return (sukces):**

```json
{
  "return_id": "RET-2026-0089",
  "status": "created",
  "instructions": "Prosimy odesłać paczkę na adres: Magazyn XYZ, ul. Przykładowa 10, 00-001 Warszawa. Prosimy dołączyć numer zwrotu RET-2026-0089 do paczki.",
  "refund_method": "zwrot na konto w ciągu 7 dni od otrzymania paczki"
}
```

---

### Tool 5: `eskaluj_do_czlowieka`

**Opis dla agenta:** "Przekazuje rozmowę do konsultanta. Używaj gdy nie możesz pomóc klientowi, klient jest agresywny, lub wyraźnie prosi o kontakt z człowiekiem."

**Input:**
```json
{
  "reason": "Klient zgłasza uszkodzony towar, wymaga reklamacji",
  "summary": "Klient zamówił koszulkę (zamówienie #4521), przyszła z plamą. Chce reklamację.",
  "priority": "high"
}
```

**Flow:**
1. **Slack / Email node** — wysyła powiadomienie do zespołu obsługi

```
🚨 Eskalacja z czatu AI
Sesja: {{ session_id }}
Priorytet: HIGH
Powód: Klient zgłasza uszkodzony towar
Podsumowanie: Klient zamówił koszulkę (#4521), przyszła z plamą. Chce reklamację.
```

2. **DB Update** — oznaczenie sesji jako "escalated"
3. **Return:**

```json
{
  "escalated": true,
  "message": "Przekazałem sprawę do naszego zespołu. Konsultant skontaktuje się z Tobą w ciągu 2 godzin."
}
```

---

## Flow 2: Panel admina (opcjonalny, ale robi wrażenie w demo)

Prosty dashboard do podglądu rozmów. Może być osobna aplikacja (React) lub nawet Google Sheets.

### Dane do wyświetlenia:
- Lista sesji czatu z datą i statusem (aktywna / zakończona / eskalowana)
- Historia wiadomości w sesji
- Statystyki: ile rozmów dziennie, % eskalacji, najczęstsze pytania
- Oznaczenie rozmów eskalowanych (do szybkiego podglądu)

---

## Baza danych (schema na demo)

### Tabela: `orders`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | INT | Numer zamówienia |
| email | VARCHAR | Email klienta |
| status | ENUM | new / processing / shipped / delivered / returned |
| items | JSON | Lista produktów |
| total | DECIMAL | Kwota |
| tracking_number | VARCHAR | Numer śledzenia |
| carrier | VARCHAR | InPost / DPD / DHL |
| created_at | DATETIME | Data zamówienia |

### Tabela: `products`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | INT | ID produktu |
| name | VARCHAR | Nazwa |
| price | DECIMAL | Cena |
| variants | JSON | Dostępne warianty z ilością |
| url | VARCHAR | Link do produktu |

### Tabela: `chat_messages`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | INT | ID wiadomości |
| session_id | VARCHAR | ID sesji rozmowy |
| role | ENUM | user / assistant |
| content | TEXT | Treść wiadomości |
| created_at | DATETIME | Timestamp |

### Tabela: `returns`
| Kolumna | Typ | Opis |
|---------|-----|------|
| id | VARCHAR | Numer zwrotu (RET-YYYY-XXXX) |
| order_id | INT | Powiązane zamówienie |
| reason | TEXT | Powód zwrotu |
| status | ENUM | created / received / refunded / rejected |
| created_at | DATETIME | Data utworzenia |

---

## Widget czatu (frontend)

Na demo wystarczy prosty widget. Opcje:

1. **n8n Chat Widget** — n8n ma wbudowany embed widget (`@n8n/chat`), który podpinasz bezpośrednio do webhooka. Zero kodu frontendowego, działa out of the box.

2. **Własny widget w React** — jeśli chcesz pokazać coś bardziej custom na demo. Prosty komponent z inputem, listą wiadomości, i fetch do webhooka n8n.

### Embed n8n Chat Widget:

```html
<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
  createChat({
    webhookUrl: 'https://twoj-n8n.com/webhook/chat',
    title: 'Pomoc — Sklep XYZ',
    subtitle: 'Odpowiadamy 24/7',
    initialMessages: ['Cześć! Jak mogę Ci pomóc?'],
  });
</script>
```

---

## Mockowe dane na demo

Przygotuj ~20 zamówień z różnymi statusami, ~30 produktów z wariantami. Wystarczy SQLite albo nawet JSON file na start. Ważne żeby demo wyglądało realistycznie — prawdziwe nazwy produktów, realne statusy, tracking numbers.

---

## Kolejność budowania

1. **Webhook + Agent AI z system promptem** (1-2h) — żeby agent odpowiadał na pytania FAQ bez narzędzi
2. **Mockowa baza danych** (1h) — JSON/SQLite z przykładowymi zamówieniami i produktami
3. **Tool: sprawdz_zamowienie** (1-2h) — najważniejsze narzędzie, najczęstszy use case
4. **Tool: sprawdz_dostepnosc** (1h)
5. **Tool: informacje_o_dostawie** (1h)
6. **Tool: utworz_zgloszenie_zwrotu** (1-2h)
7. **Tool: eskaluj_do_czlowieka** (30min)
8. **Widget czatu** (30min z n8n embed, 2-3h z custom React)
9. **Nagranie demo wideo** (1-2h)

**Estymacja łączna: 2-3 weekendy**

---

## Jak nagrać dobre demo na LinkedIn

1. Pokaż widget na stronie sklepu (nawet mockowej)
2. Napisz "Gdzie jest moja paczka #4521?" — agent odpowiada ze statusem i trackinigem
3. Napisz "Chcę zwrócić koszulkę" — agent prowadzi przez proces
4. Napisz "Chcę rozmawiać z człowiekiem" — agent eskaluje
5. Pokaż panel admina z historią rozmów
6. Dodaj tekst: "Zbudowane w n8n + Claude API. Gotowe do integracji z Twoim sklepem."