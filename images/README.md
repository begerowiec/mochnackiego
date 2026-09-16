# Zdjęcia

Układ odpowiada kondygnacjom domu. Nazwy plików są opisowe — po nazwie widać,
co jest na zdjęciu, i łatwo je podmienić.

```
images/zewnatrz/   elewacja-01/02, dom-z-drona-poster
images/piwnica/    piec, pralnia, spizarnia
images/dobudowka/  wejscie, przedpokoj-01/02, salon-01..05, kuchnia-01/02,
                   jadalnia-01/02, sypialnia-01/02, pokoj, lazienka-01/02,
                   toaleta, taras
images/klatka/     klatka-01..04, wyjscie-na-balkon
images/pietro-1/   salon-01/02, jadalnia, kuchnia-01/02, bar-oczko-wodne,
                   bar-01/02, lazienka, taras, przedpokoj, wejscie
images/pietro-2/   sypialnia-01/02, sypialnia-z-garderoba, sypialnia-pracownia,
                   pokoj-01/02, toaleta, prysznic, przedpokoj-01/02
images/pietro-3/   kuchnia-z-jadalnia, pokoj-01..03, pokoj-z-antresola,
                   antresola, lazienka, wyjscie-na-balkon, balkon
images/rzuty/      rzut-parter.png, rzut-pietro-1.png (PNG, rysunek techniczny)
images/_oryginaly/ kopia tego, co zostało wrzucone; poza repo (.gitignore)
```

## Czego jeszcze brakuje

Te kafelki pokazują na stronie kreskowaną kratkę z napisem „zdjęcie
w przygotowaniu". Żeby je wypełnić, wrzuć pliki i podmień `<figure class="…
is-empty">` w `index.html` na zwykły kafelek ze zdjęciem (wzór obok, w tej
samej galerii):

| Gdzie | Czego brakuje |
| --- | --- |
| Piwnica | sauna, warsztat |
| Rzuty | piętro 2 i piętro 3 z antresolą |

## Jak przygotować pliki

Miniatury są zawsze w proporcji 4:3 — pionowe kadry są dokadrowane do środka,
a pełne zdjęcie pokazuje powiększenie po kliknięciu. Rzuty są wyjątkiem:
mieszczą się w kafelku w całości, bo rysunku technicznego nie wolno przyciąć.

Z wrzuconych zdjęć dobudówki nie trafiło na stronę siedem: dwie panoramy
(kadr 21:9, w siatce zostałby z nich pasek), cztery powtórki ujęć już
użytych i jeden nieostry kadr ściany. Leżą w `_oryginaly/dobudowka-orig/`.

Zdjęcia na stronie mają maksymalnie 1600 px (elewacje 2400 px) i jakość 80 —
34 zdjęcia ważą razem ok. 9,6 MB zamiast 61 MB oryginałów. Nowe zdjęcia warto
przepuścić tak samo:

```bash
convert oryginal.jpg -auto-orient -resize '1600x1600>' -strip \
        -interlace Plane -sampling-factor 4:2:0 -quality 80 docelowy.jpg
```

Kliknięcie w zdjęcie otwiera je w powiększeniu — strzałki i Esc działają.
Kafelki bez pliku są automatycznie pomijane w przeglądarce zdjęć.
