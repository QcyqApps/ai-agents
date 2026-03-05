-- Seed data for ecommerce customer service demo
-- Run after schema creation

\c ecommerce_db

-- =====================================================
-- PRODUCTS (30 products)
-- =====================================================

INSERT INTO products (sku, name, description, price, category, variants, url) VALUES

-- Koszulki (8)
('TSHIRT-BASIC-001', 'Koszulka Basic', 'Klasyczna koszulka bawełniana 100% bawełna', 79.99, 'Odzież',
 '[{"size": "S", "color": "czarna", "stock": 15}, {"size": "M", "color": "czarna", "stock": 22}, {"size": "L", "color": "czarna", "stock": 18}, {"size": "XL", "color": "czarna", "stock": 0}, {"size": "S", "color": "biała", "stock": 20}, {"size": "M", "color": "biała", "stock": 25}, {"size": "L", "color": "biała", "stock": 12}, {"size": "XL", "color": "biała", "stock": 8}]',
 'https://demo-sklep.pl/koszulka-basic'),

('TSHIRT-PREMIUM-001', 'Koszulka Premium', 'Koszulka premium z mieszanki bawełny i elastanu', 129.99, 'Odzież',
 '[{"size": "S", "color": "granatowa", "stock": 10}, {"size": "M", "color": "granatowa", "stock": 15}, {"size": "L", "color": "granatowa", "stock": 8}, {"size": "XL", "color": "granatowa", "stock": 5}]',
 'https://demo-sklep.pl/koszulka-premium'),

('TSHIRT-SPORT-001', 'Koszulka Sportowa', 'Oddychająca koszulka do ćwiczeń', 99.99, 'Sport',
 '[{"size": "S", "color": "czarna", "stock": 30}, {"size": "M", "color": "czarna", "stock": 25}, {"size": "L", "color": "czarna", "stock": 20}, {"size": "S", "color": "czerwona", "stock": 15}, {"size": "M", "color": "czerwona", "stock": 18}]',
 'https://demo-sklep.pl/koszulka-sportowa'),

('TSHIRT-PRINT-001', 'Koszulka z Nadrukiem', 'Koszulka z unikalnym wzorem', 89.99, 'Odzież',
 '[{"size": "M", "color": "biała", "stock": 12}, {"size": "L", "color": "biała", "stock": 8}, {"size": "XL", "color": "biała", "stock": 6}]',
 'https://demo-sklep.pl/koszulka-nadruk'),

('POLO-CLASSIC-001', 'Polo Classic', 'Elegancka koszulka polo', 149.99, 'Odzież',
 '[{"size": "M", "color": "granatowa", "stock": 10}, {"size": "L", "color": "granatowa", "stock": 8}, {"size": "M", "color": "biała", "stock": 12}, {"size": "L", "color": "biała", "stock": 7}]',
 'https://demo-sklep.pl/polo-classic'),

('LONGSLEEVE-001', 'Longsleeve Basic', 'Koszulka z długim rękawem', 109.99, 'Odzież',
 '[{"size": "S", "color": "czarna", "stock": 18}, {"size": "M", "color": "czarna", "stock": 22}, {"size": "L", "color": "czarna", "stock": 15}, {"size": "XL", "color": "czarna", "stock": 10}]',
 'https://demo-sklep.pl/longsleeve-basic'),

('TANK-TOP-001', 'Tank Top', 'Lekki tank top na lato', 59.99, 'Odzież',
 '[{"size": "S", "color": "biała", "stock": 25}, {"size": "M", "color": "biała", "stock": 30}, {"size": "L", "color": "biała", "stock": 20}]',
 'https://demo-sklep.pl/tank-top'),

('TSHIRT-OVERSIZE-001', 'Koszulka Oversize', 'Modna koszulka oversize', 119.99, 'Odzież',
 '[{"size": "M", "color": "beżowa", "stock": 14}, {"size": "L", "color": "beżowa", "stock": 18}, {"size": "XL", "color": "beżowa", "stock": 12}]',
 'https://demo-sklep.pl/koszulka-oversize'),

-- Bluzy (6)
('HOODIE-BASIC-001', 'Bluza z Kapturem Basic', 'Ciepła bluza z kapturem', 199.99, 'Odzież',
 '[{"size": "S", "color": "czarna", "stock": 12}, {"size": "M", "color": "czarna", "stock": 18}, {"size": "L", "color": "czarna", "stock": 15}, {"size": "XL", "color": "czarna", "stock": 8}, {"size": "M", "color": "szara", "stock": 20}, {"size": "L", "color": "szara", "stock": 14}]',
 'https://demo-sklep.pl/bluza-kaptur-basic'),

('HOODIE-ZIP-001', 'Bluza Rozpinana', 'Bluza z kapturem rozpinana', 229.99, 'Odzież',
 '[{"size": "M", "color": "granatowa", "stock": 10}, {"size": "L", "color": "granatowa", "stock": 8}, {"size": "XL", "color": "granatowa", "stock": 5}]',
 'https://demo-sklep.pl/bluza-rozpinana'),

('SWEATSHIRT-001', 'Bluza bez Kaptura', 'Klasyczna bluza bez kaptura', 179.99, 'Odzież',
 '[{"size": "S", "color": "szara", "stock": 15}, {"size": "M", "color": "szara", "stock": 20}, {"size": "L", "color": "szara", "stock": 12}]',
 'https://demo-sklep.pl/bluza-bez-kaptura'),

('HOODIE-SPORT-001', 'Bluza Sportowa', 'Lekka bluza sportowa', 169.99, 'Sport',
 '[{"size": "S", "color": "czarna", "stock": 22}, {"size": "M", "color": "czarna", "stock": 28}, {"size": "L", "color": "czarna", "stock": 18}]',
 'https://demo-sklep.pl/bluza-sportowa'),

('FLEECE-001', 'Polar', 'Ciepły polar na zimę', 159.99, 'Odzież',
 '[{"size": "M", "color": "zielona", "stock": 8}, {"size": "L", "color": "zielona", "stock": 6}, {"size": "XL", "color": "zielona", "stock": 4}]',
 'https://demo-sklep.pl/polar'),

('BOMBER-001', 'Kurtka Bomber', 'Stylowa kurtka bomber', 299.99, 'Odzież',
 '[{"size": "M", "color": "czarna", "stock": 5}, {"size": "L", "color": "czarna", "stock": 7}, {"size": "XL", "color": "czarna", "stock": 3}]',
 'https://demo-sklep.pl/kurtka-bomber'),

-- Spodnie (6)
('JEANS-SLIM-001', 'Jeansy Slim Fit', 'Klasyczne jeansy slim fit', 249.99, 'Odzież',
 '[{"size": "30/32", "color": "niebieski", "stock": 10}, {"size": "32/32", "color": "niebieski", "stock": 15}, {"size": "34/32", "color": "niebieski", "stock": 12}, {"size": "32/32", "color": "czarny", "stock": 8}]',
 'https://demo-sklep.pl/jeansy-slim'),

('JOGGERS-001', 'Spodnie Dresowe', 'Wygodne spodnie dresowe', 149.99, 'Sport',
 '[{"size": "S", "color": "szara", "stock": 20}, {"size": "M", "color": "szara", "stock": 25}, {"size": "L", "color": "szara", "stock": 18}, {"size": "XL", "color": "szara", "stock": 12}]',
 'https://demo-sklep.pl/spodnie-dresowe'),

('CHINOS-001', 'Chinosy', 'Eleganckie spodnie chinos', 199.99, 'Odzież',
 '[{"size": "30/32", "color": "beżowy", "stock": 8}, {"size": "32/32", "color": "beżowy", "stock": 12}, {"size": "34/32", "color": "beżowy", "stock": 6}]',
 'https://demo-sklep.pl/chinosy'),

('SHORTS-001', 'Szorty', 'Letnie szorty', 99.99, 'Odzież',
 '[{"size": "S", "color": "granatowe", "stock": 15}, {"size": "M", "color": "granatowe", "stock": 20}, {"size": "L", "color": "granatowe", "stock": 18}]',
 'https://demo-sklep.pl/szorty'),

('LEGGINGS-001', 'Legginsy Sportowe', 'Legginsy do ćwiczeń', 129.99, 'Sport',
 '[{"size": "S", "color": "czarna", "stock": 30}, {"size": "M", "color": "czarna", "stock": 35}, {"size": "L", "color": "czarna", "stock": 25}]',
 'https://demo-sklep.pl/legginsy'),

('CARGO-001', 'Spodnie Cargo', 'Spodnie cargo z kieszeniami', 219.99, 'Odzież',
 '[{"size": "M", "color": "khaki", "stock": 10}, {"size": "L", "color": "khaki", "stock": 12}, {"size": "XL", "color": "khaki", "stock": 8}]',
 'https://demo-sklep.pl/spodnie-cargo'),

-- Akcesoria (6)
('SOCKS-3PACK-001', 'Skarpetki 3-pack', 'Zestaw 3 par skarpetek', 49.99, 'Akcesoria',
 '[{"size": "39-42", "color": "mix", "stock": 50}, {"size": "43-46", "color": "mix", "stock": 45}]',
 'https://demo-sklep.pl/skarpetki-3pack'),

('CAP-001', 'Czapka z Daszkiem', 'Klasyczna czapka z daszkiem', 79.99, 'Akcesoria',
 '[{"size": "one size", "color": "czarna", "stock": 25}, {"size": "one size", "color": "granatowa", "stock": 20}]',
 'https://demo-sklep.pl/czapka-daszek'),

('BEANIE-001', 'Czapka Zimowa', 'Ciepła czapka na zimę', 69.99, 'Akcesoria',
 '[{"size": "one size", "color": "szara", "stock": 30}, {"size": "one size", "color": "czarna", "stock": 28}]',
 'https://demo-sklep.pl/czapka-zimowa'),

('BELT-001', 'Pasek Skórzany', 'Elegancki pasek ze skóry', 129.99, 'Akcesoria',
 '[{"size": "90cm", "color": "czarny", "stock": 15}, {"size": "100cm", "color": "czarny", "stock": 18}, {"size": "110cm", "color": "czarny", "stock": 12}]',
 'https://demo-sklep.pl/pasek-skorzany'),

('WALLET-001', 'Portfel', 'Skórzany portfel męski', 179.99, 'Akcesoria',
 '[{"size": "one size", "color": "czarny", "stock": 20}, {"size": "one size", "color": "brązowy", "stock": 15}]',
 'https://demo-sklep.pl/portfel'),

('BAG-001', 'Torba Sportowa', 'Pojemna torba sportowa', 149.99, 'Akcesoria',
 '[{"size": "one size", "color": "czarna", "stock": 22}, {"size": "one size", "color": "granatowa", "stock": 18}]',
 'https://demo-sklep.pl/torba-sportowa'),

-- Obuwie (4)
('SNEAKERS-001', 'Sneakersy Classic', 'Klasyczne sneakersy', 349.99, 'Obuwie',
 '[{"size": "40", "color": "białe", "stock": 8}, {"size": "41", "color": "białe", "stock": 10}, {"size": "42", "color": "białe", "stock": 12}, {"size": "43", "color": "białe", "stock": 10}, {"size": "44", "color": "białe", "stock": 6}]',
 'https://demo-sklep.pl/sneakersy-classic'),

('RUNNING-001', 'Buty do Biegania', 'Profesjonalne buty do biegania', 449.99, 'Sport',
 '[{"size": "41", "color": "czarne", "stock": 8}, {"size": "42", "color": "czarne", "stock": 10}, {"size": "43", "color": "czarne", "stock": 12}, {"size": "44", "color": "czarne", "stock": 8}]',
 'https://demo-sklep.pl/buty-bieganie'),

('SANDALS-001', 'Sandały Letnie', 'Wygodne sandały na lato', 199.99, 'Obuwie',
 '[{"size": "40", "color": "brązowe", "stock": 10}, {"size": "41", "color": "brązowe", "stock": 12}, {"size": "42", "color": "brązowe", "stock": 15}, {"size": "43", "color": "brązowe", "stock": 10}]',
 'https://demo-sklep.pl/sandaly'),

('BOOTS-001', 'Buty Zimowe', 'Ciepłe buty na zimę', 399.99, 'Obuwie',
 '[{"size": "41", "color": "czarne", "stock": 6}, {"size": "42", "color": "czarne", "stock": 8}, {"size": "43", "color": "czarne", "stock": 10}, {"size": "44", "color": "czarne", "stock": 5}]',
 'https://demo-sklep.pl/buty-zimowe');

-- =====================================================
-- ORDERS (20 orders)
-- =====================================================

INSERT INTO orders (order_number, email, customer_name, status, items, total, shipping_method, tracking_number, carrier, shipping_address, created_at) VALUES

-- 5 DELIVERED orders
('ZAM-2026-0001', 'jan.kowalski@email.pl', 'Jan Kowalski', 'delivered',
 '[{"name": "Koszulka Basic", "variant": "M czarna", "quantity": 2, "price": 79.99}, {"name": "Skarpetki 3-pack", "variant": "39-42 mix", "quantity": 1, "price": 49.99}]',
 209.97, 'InPost Paczkomat', '620111111111', 'InPost',
 '{"street": "ul. Przykładowa 10", "city": "Warszawa", "postal_code": "00-001", "paczkomat": "WAW01A"}',
 '2026-02-15 10:30:00'),

('ZAM-2026-0002', 'anna.nowak@email.pl', 'Anna Nowak', 'delivered',
 '[{"name": "Bluza z Kapturem Basic", "variant": "S czarna", "quantity": 1, "price": 199.99}]',
 199.99, 'Kurier DPD', 'DPD222222222', 'DPD',
 '{"street": "ul. Słoneczna 5/12", "city": "Kraków", "postal_code": "30-001"}',
 '2026-02-18 14:15:00'),

('ZAM-2026-0003', 'piotr.wisniewski@email.pl', 'Piotr Wiśniewski', 'delivered',
 '[{"name": "Jeansy Slim Fit", "variant": "32/32 niebieski", "quantity": 1, "price": 249.99}, {"name": "Pasek Skórzany", "variant": "100cm czarny", "quantity": 1, "price": 129.99}]',
 379.98, 'InPost Paczkomat', '620333333333', 'InPost',
 '{"street": "ul. Kwiatowa 22", "city": "Wrocław", "postal_code": "50-001", "paczkomat": "WRO05M"}',
 '2026-02-20 09:45:00'),

('ZAM-2026-0004', 'maria.dabrowska@email.pl', 'Maria Dąbrowska', 'delivered',
 '[{"name": "Legginsy Sportowe", "variant": "M czarna", "quantity": 2, "price": 129.99}, {"name": "Koszulka Sportowa", "variant": "M czarna", "quantity": 1, "price": 99.99}]',
 359.97, 'Kurier DHL', 'JD0000444444', 'DHL',
 '{"street": "ul. Sportowa 8", "city": "Poznań", "postal_code": "60-001"}',
 '2026-02-22 16:20:00'),

('ZAM-2026-0005', 'tomasz.lewandowski@email.pl', 'Tomasz Lewandowski', 'delivered',
 '[{"name": "Sneakersy Classic", "variant": "43 białe", "quantity": 1, "price": 349.99}]',
 349.99, 'InPost Kurier', '620555555555', 'InPost',
 '{"street": "ul. Główna 15", "city": "Gdańsk", "postal_code": "80-001"}',
 '2026-02-24 11:00:00'),

-- 5 SHIPPED orders (with tracking)
('ZAM-2026-0006', 'katarzyna.zielinska@email.pl', 'Katarzyna Zielińska', 'shipped',
 '[{"name": "Bluza Rozpinana", "variant": "M granatowa", "quantity": 1, "price": 229.99}, {"name": "Czapka z Daszkiem", "variant": "one size czarna", "quantity": 1, "price": 79.99}]',
 309.98, 'InPost Paczkomat', '620666666666', 'InPost',
 '{"street": "ul. Leśna 3", "city": "Łódź", "postal_code": "90-001", "paczkomat": "LOD12B"}',
 '2026-03-01 08:30:00'),

('ZAM-2026-0007', 'michal.kaminski@email.pl', 'Michał Kamiński', 'shipped',
 '[{"name": "Kurtka Bomber", "variant": "L czarna", "quantity": 1, "price": 299.99}]',
 299.99, 'Kurier DPD', 'DPD777777777', 'DPD',
 '{"street": "ul. Cicha 7/3", "city": "Szczecin", "postal_code": "70-001"}',
 '2026-03-01 12:45:00'),

('ZAM-2026-0008', 'agnieszka.wojcik@email.pl', 'Agnieszka Wójcik', 'shipped',
 '[{"name": "Torba Sportowa", "variant": "one size czarna", "quantity": 1, "price": 149.99}, {"name": "Buty do Biegania", "variant": "40 czarne", "quantity": 1, "price": 449.99}]',
 599.98, 'Kurier DHL', 'JD0000888888', 'DHL',
 '{"street": "ul. Parkowa 20", "city": "Lublin", "postal_code": "20-001"}',
 '2026-03-02 10:00:00'),

('ZAM-2026-0009', 'robert.kaczmarek@email.pl', 'Robert Kaczmarek', 'shipped',
 '[{"name": "Polo Classic", "variant": "L granatowa", "quantity": 2, "price": 149.99}]',
 299.98, 'Poczta Polska', 'PL999999999PL', 'Poczta Polska',
 '{"street": "ul. Polna 11", "city": "Bydgoszcz", "postal_code": "85-001"}',
 '2026-03-02 14:30:00'),

('ZAM-2026-0010', 'ewa.mazur@email.pl', 'Ewa Mazur', 'shipped',
 '[{"name": "Spodnie Dresowe", "variant": "S szara", "quantity": 1, "price": 149.99}, {"name": "Bluza Sportowa", "variant": "S czarna", "quantity": 1, "price": 169.99}]',
 319.98, 'InPost Paczkomat', '620101010101', 'InPost',
 '{"street": "ul. Młyńska 6", "city": "Katowice", "postal_code": "40-001", "paczkomat": "KAT08C"}',
 '2026-03-03 09:15:00'),

-- 5 PROCESSING orders
('ZAM-2026-0011', 'adam.grabowski@email.pl', 'Adam Grabowski', 'processing',
 '[{"name": "Chinosy", "variant": "32/32 beżowy", "quantity": 1, "price": 199.99}, {"name": "Koszulka Premium", "variant": "M granatowa", "quantity": 1, "price": 129.99}]',
 329.98, 'Kurier DPD', NULL, 'DPD',
 '{"street": "ul. Wschodnia 14", "city": "Białystok", "postal_code": "15-001"}',
 '2026-03-03 15:00:00'),

('ZAM-2026-0012', 'monika.pawlak@email.pl', 'Monika Pawlak', 'processing',
 '[{"name": "Koszulka Oversize", "variant": "L beżowa", "quantity": 1, "price": 119.99}]',
 119.99, 'InPost Paczkomat', NULL, 'InPost',
 '{"street": "ul. Zachodnia 9", "city": "Rzeszów", "postal_code": "35-001", "paczkomat": "RZE04A"}',
 '2026-03-03 17:30:00'),

('ZAM-2026-0013', 'krzysztof.jankowski@email.pl', 'Krzysztof Jankowski', 'processing',
 '[{"name": "Buty Zimowe", "variant": "43 czarne", "quantity": 1, "price": 399.99}]',
 399.99, 'Kurier DHL', NULL, 'DHL',
 '{"street": "ul. Północna 2/5", "city": "Olsztyn", "postal_code": "10-001"}',
 '2026-03-04 08:00:00'),

('ZAM-2026-0014', 'joanna.wrobel@email.pl', 'Joanna Wróbel', 'processing',
 '[{"name": "Szorty", "variant": "M granatowe", "quantity": 2, "price": 99.99}, {"name": "Tank Top", "variant": "M biała", "quantity": 2, "price": 59.99}]',
 319.96, 'InPost Kurier', NULL, 'InPost',
 '{"street": "ul. Południowa 18", "city": "Kielce", "postal_code": "25-001"}',
 '2026-03-04 10:45:00'),

('ZAM-2026-0015', 'pawel.szymanski@email.pl', 'Paweł Szymański', 'processing',
 '[{"name": "Portfel", "variant": "one size czarny", "quantity": 1, "price": 179.99}, {"name": "Pasek Skórzany", "variant": "90cm czarny", "quantity": 1, "price": 129.99}]',
 309.98, 'Kurier DPD', NULL, 'DPD',
 '{"street": "ul. Centralna 25", "city": "Toruń", "postal_code": "87-001"}',
 '2026-03-04 12:00:00'),

-- 3 NEW orders
('ZAM-2026-0016', 'natalia.krol@email.pl', 'Natalia Król', 'new',
 '[{"name": "Longsleeve Basic", "variant": "S czarna", "quantity": 1, "price": 109.99}]',
 109.99, 'InPost Paczkomat', NULL, 'InPost',
 '{"street": "ul. Nowa 7", "city": "Opole", "postal_code": "45-001", "paczkomat": "OPO02D"}',
 '2026-03-04 13:30:00'),

('ZAM-2026-0017', 'marcin.olszewski@email.pl', 'Marcin Olszewski', 'new',
 '[{"name": "Hoodie Basic", "variant": "XL szara", "quantity": 1, "price": 199.99}, {"name": "Spodnie Cargo", "variant": "L khaki", "quantity": 1, "price": 219.99}]',
 419.98, 'Kurier DHL', NULL, 'DHL',
 '{"street": "ul. Stara 33", "city": "Gliwice", "postal_code": "44-001"}',
 '2026-03-04 14:15:00'),

('ZAM-2026-0018', 'aleksandra.stepien@email.pl', 'Aleksandra Stępień', 'new',
 '[{"name": "Sandały Letnie", "variant": "39 brązowe", "quantity": 1, "price": 199.99}]',
 199.99, 'Poczta Polska', NULL, 'Poczta Polska',
 '{"street": "ul. Długa 44/10", "city": "Częstochowa", "postal_code": "42-001"}',
 '2026-03-04 15:00:00'),

-- 2 RETURNED orders
('ZAM-2026-0019', 'bartosz.sikora@email.pl', 'Bartosz Sikora', 'returned',
 '[{"name": "Koszulka z Nadrukiem", "variant": "XL biała", "quantity": 1, "price": 89.99}]',
 89.99, 'InPost Paczkomat', '620191919191', 'InPost',
 '{"street": "ul. Krótka 1", "city": "Radom", "postal_code": "26-001", "paczkomat": "RAD01E"}',
 '2026-02-10 09:00:00'),

('ZAM-2026-0020', 'karolina.nowicka@email.pl', 'Karolina Nowicka', 'returned',
 '[{"name": "Czapka Zimowa", "variant": "one size czarna", "quantity": 1, "price": 69.99}, {"name": "Polar", "variant": "M zielona", "quantity": 1, "price": 159.99}]',
 229.98, 'Kurier DPD', 'DPD202020202', 'DPD',
 '{"street": "ul. Wielka 55", "city": "Sosnowiec", "postal_code": "41-001"}',
 '2026-02-12 11:30:00');

-- =====================================================
-- SAMPLE RETURNS (for returned orders)
-- =====================================================

INSERT INTO returns (id, order_id, reason, items, status, created_at) VALUES
('RET-2026-0001', 19, 'Rozmiar nie pasuje - za duży', '[{"name": "Koszulka z Nadrukiem", "variant": "XL biała"}]', 'refunded', '2026-02-20 10:00:00'),
('RET-2026-0002', 20, 'Produkt nie odpowiada opisowi - inny kolor', '[{"name": "Czapka Zimowa", "variant": "one size czarna"}, {"name": "Polar", "variant": "M zielona"}]', 'refunded', '2026-02-22 14:00:00');

-- Seed data inserted: Products: 30, Orders: 20, Returns: 2
