# E-commerce Customer Service AI Agent

Agent AI do obsługi klienta sklepu e-commerce zbudowany na n8n + Claude API.

## Funkcje

- **Sprawdzanie zamówień** - status, szczegóły, historia
- **Dostępność produktów** - sprawdzanie magazynu, wariantów
- **Śledzenie przesyłek** - tracking InPost, DPD, DHL, Poczta Polska
- **Obsługa zwrotów** - automatyczne tworzenie zgłoszeń
- **Eskalacja do człowieka** - powiadomienia Slack/Email

## Wymagania

- Docker & Docker Compose
- Klucz API Anthropic (Claude)

## Szybki start

### 1. Sklonuj repozytorium i przejdź do katalogu

```bash
cd ecommerce-customer-service-agent
```

### 2. Uruchom skrypt setup

```bash
./scripts/setup.sh
```

Skrypt:
- Utworzy plik `.env` z losowymi kluczami
- Uruchomi kontenery Docker
- Poczeka aż usługi będą gotowe

### 3. Dodaj klucz API Anthropic

Edytuj plik `.env` i dodaj swój klucz:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Skonfiguruj n8n

1. Otwórz http://localhost:5678
2. Utwórz konto (pierwsze uruchomienie)
3. Przejdź do **Settings > Credentials**
4. Dodaj credential **PostgreSQL**:
   - Host: `postgres`
   - Port: `5432`
   - Database: `ecommerce_db`
   - User: `n8n_user`
   - Password: (z pliku .env)
5. Dodaj credential **Anthropic**:
   - API Key: (twój klucz)

### 5. Zaimportuj workflows

1. W n8n przejdź do **Workflows**
2. Kliknij **Import from File**
3. Zaimportuj kolejno wszystkie pliki z `n8n/workflows/`:
   - `main-chat-agent.json` (główny)
   - `tool-sprawdz-zamowienie.json`
   - `tool-sprawdz-dostepnosc.json`
   - `tool-informacje-o-dostawie.json`
   - `tool-utworz-zgloszenie-zwrotu.json`
   - `tool-eskaluj-do-czlowieka.json`

### 6. Połącz tools z głównym workflow

1. Otwórz workflow "E-commerce Customer Service Agent"
2. Dla każdego Tool node, wybierz odpowiedni sub-workflow
3. Zaktualizuj credential w node'ach PostgreSQL i Anthropic
4. Aktywuj workflow (toggle w prawym górnym rogu)

### 7. Skopiuj Webhook URL

1. W aktywnym workflow kliknij na node "Chat Trigger"
2. Skopiuj **Production URL** (wygląda jak `http://localhost:5678/webhook/abc123.../chat`)
3. Otwórz `widget/index.html` w edytorze
4. Zamień `YOUR_WEBHOOK_ID` na skopiowany URL:
   ```javascript
   const WEBHOOK_URL = 'http://localhost:5678/webhook/abc123-def456.../chat';
   ```

### 8. Przetestuj

Otwórz `widget/index.html` w przeglądarce i rozpocznij rozmowę!

## Struktura projektu

```
├── docker-compose.yml      # Konfiguracja Docker
├── .env.example            # Szablon zmiennych środowiskowych
├── database/
│   └── init/
│       ├── 01_create_ecommerce_db.sql  # Schema bazy
│       └── 02_seed_data.sql            # Dane testowe
├── n8n/
│   └── workflows/          # Workflow JSON files
├── widget/
│   └── index.html          # Demo strona z czatem
└── scripts/
    └── setup.sh            # Skrypt instalacyjny
```

## Przykładowe zapytania

- "Gdzie jest moja paczka? Zamówienie ZAM-2026-0006"
- "Czy macie koszulkę basic w rozmiarze XL?"
- "Chcę zwrócić produkt z zamówienia ZAM-2026-0001"
- "Jaka jest polityka zwrotów?"
- "Chcę rozmawiać z człowiekiem"

## Dane testowe

- **20 zamówień** (różne statusy: new, processing, shipped, delivered, returned)
- **30 produktów** (odzież, akcesoria, obuwie z wariantami)
- **2 przykładowe zwroty**

## Komendy

```bash
# Uruchom kontenery
docker compose up -d

# Zatrzymaj kontenery
docker compose down

# Zobacz logi
docker compose logs -f

# Logi tylko n8n
docker compose logs -f n8n

# Restart n8n
docker compose restart n8n
```

## Rozwiązywanie problemów

### n8n nie łączy się z bazą danych

Sprawdź czy PostgreSQL jest gotowy:
```bash
docker compose exec postgres pg_isready -U n8n_user
```

### Widget nie łączy się z n8n

1. Sprawdź czy workflow jest aktywny
2. Sprawdź CORS w Chat Trigger node
3. Sprawdź czy WEBHOOK_URL w .env jest poprawny

### Błędy Claude API

1. Sprawdź czy klucz API jest poprawny
2. Sprawdź limity na koncie Anthropic
3. Sprawdź logi n8n: `docker compose logs -f n8n`

## Licencja

MIT
