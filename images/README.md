# Zdjęcia

Układ odpowiada kondygnacjom domu. Nazwy plików są opisowe — po nazwie widać,
co jest na zdjęciu, i łatwo je podmienić.

```
images/
  zewnatrz/    elewacja-01.jpg, elewacja-02.jpg, dom-z-drona-poster.jpg
  piwnica/     piec.jpg, pralnia.jpg, spizarnia.jpg
  klatka/      wejscie-do-domu.jpg, klatka-01..04.jpg, wyjscie-na-balkon.jpg
  pietro-1/    salon-01/02, jadalnia, kuchnia-01/02, bar-oczko-wodne,
               bar-01/02, lazienka, taras, przedpokoj, wejscie
  pietro-2/    sypialnia-01/02, sypialnia-z-garderoba, sypialnia-pracownia,
               pokoj-01/02, toaleta, prysznic, przedpokoj-01/02
  pietro-3/    (puste — do uzupełnienia)
  dobudowka/   (puste — do uzupełnienia)
  rzuty/       (puste — do uzupełnienia)
  _oryginaly/  kopia tego, co zostało wrzucone; poza repo (.gitignore)
```

## Czego jeszcze brakuje

Te kafelki pokazują na stronie kreskowaną kratkę z napisem „zdjęcie
w przygotowaniu". Żeby je wypełnić, wrzuć pliki i podmień `<figure class="…
is-empty">` w `index.html` na zwykły kafelek ze zdjęciem (wzór obok, w tej
samej galerii):

| Gdzie | Czego brakuje |
| --- | --- |
| Piwnica | sauna, warsztat |
| Dobudówka | mieszkanie na poziomie piwnicy |
| 3. piętro | mieszkanie, kuchnia z jadalnią, antresola, balkon |
| Rzuty | `images/rzuty/` — cztery rzuty kondygnacji, kadr kwadratowy 1:1 |

## Jak przygotować pliki

Zdjęcia na stronie mają maksymalnie 1600 px (elewacje 2400 px) i jakość 80 —
34 zdjęcia ważą razem ok. 9,6 MB zamiast 61 MB oryginałów. Nowe zdjęcia warto
przepuścić tak samo:

```bash
convert oryginal.jpg -auto-orient -resize '1600x1600>' -strip \
        -interlace Plane -sampling-factor 4:2:0 -quality 80 docelowy.jpg
```

Kliknięcie w zdjęcie otwiera je w powiększeniu — strzałki i Esc działają.
Kafelki bez pliku są automatycznie pomijane w przeglądarce zdjęć.
