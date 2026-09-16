# Dom na sprzedaż — Mochnackiego 1a, Wrocław

Statyczna wizytówka domu. Strona: https://begerowiec.github.io/mochnackiego/

## Podgląd lokalnie

```bash
python3 -m http.server 8000
```

http://localhost:8000 — push na `main` publikuje stronę.

## Do uzupełnienia

W `index.html` pola `[UZUPEŁNIJ]`: metraż, działka, pokoje, rok budowy, ogrzewanie, stan, własność, cena. Żeby ukryć cenę, usuń wiersz `<tr class="price">`.

Brakujące zdjęcia (3. piętro, dobudówka, sauna, warsztat, rzuty) — `images/README.md`.

## Strona z materiałami do pobrania

`zdjecia.html` — nie ma jej w menu, trafia się tam tylko z linku:
**https://begerowiec.github.io/mochnackiego/zdjecia.html**

Jeden przycisk pobiera wszystkie zdjęcia i rzuty jako `.zip`. Paczka składa
się w przeglądarce z tych samych plików, które widać w galerii — nie ma
gotowego archiwum w repo, więc nic się nie rozjedzie po podmianie zdjęcia
i repozytorium nie puchnie o drugą kopię wszystkiego. Niżej jest lista
pojedynczych plików, która działa nawet gdyby pakowanie zawiodło.

Po dodaniu nowych zdjęć dopisz je w `assets/js/materialy.js` — to jedyna
lista, z której korzysta pobieranie.

Biblioteka pakująca (JSZip 3.10.1, MIT) leży w `assets/js/vendor/`, a nie
na CDN-ie — strona ma działać niezależnie od cudzych serwerów.

## Nazewnictwo kondygnacji

Zgodne z rzutami: **piwnica → parter → 1. piętro → 2. piętro z antresolą**.
Identyfikatory kotwic w `index.html` zostały ze starej numeracji
(`#poziom-1` to parter, `#poziom-2` to 1. piętro, `#poziom-3` to 2. piętro),
żeby nie psuć linków, które mogły już pójść w świat.
