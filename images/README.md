# Zdjęcia

Wrzuć pliki pod dokładnie takimi nazwami — strona podłączy je sama.
Dopóki pliku nie ma, w tym miejscu widać stylowy placeholder z nazwą pliku,
więc od razu widać, czego brakuje.

## images/dom/

| Plik | Co to |
| --- | --- |
| `zewnatrz-01.jpg` | zdjęcie główne (hero) — dom z zewnątrz, kadr poziomy 4:3 |
| `piwnica-01.jpg`, `piwnica-02.jpg` | poziom piwnicy: warsztat, sauna, pralnia |
| `dobudowka-01.jpg`, `dobudowka-02.jpg` | mieszkanie w dobudówce |
| `pietro1-01.jpg` … `pietro1-04.jpg` | 1. piętro: salon, kuchnia, łazienka, taras |
| `pietro2-01.jpg` … `pietro2-04.jpg` | 2. piętro: sypialnie, łazienka |
| `pietro3-01.jpg`, `pietro3-02.jpg` | 3. piętro: mieszkanie |
| `antresola-01.jpg`, `antresola-02.jpg` | antresola, balkon |
| `klatka-01.jpg`, `klatka-02.jpg` | klatka schodowa |

## images/rzuty/

`rzut-piwnica.jpg`, `rzut-pietro1.jpg`, `rzut-pietro2.jpg`, `rzut-pietro3.jpg`
— rzuty kondygnacji, kadr kwadratowy 1:1, najlepiej na białym tle.

## Wskazówki

- Format: `.jpg` (albo `.webp`, wtedy zmień rozszerzenia w `index.html`).
- Szerokość ok. **1600 px**, jakość 80 — czytelne, a strona zostaje lekka.
- Zdjęcia wnętrz i elewacji są automatycznie stonowane na stalowy błękit
  (duotone) — tak jak w projekcie. Rzuty zostają w oryginalnych kolorach.
- Kliknięcie w zdjęcie otwiera je w powiększeniu; strzałki i Esc działają.
- Chcesz więcej zdjęć na poziomie? Skopiuj w `index.html` jedną linijkę
  `<figure class="blueprint shot" …>` i podmień nazwę pliku oraz `alt`.
