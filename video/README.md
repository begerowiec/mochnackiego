# Film z drona

`dom-z-drona.mp4` — 1600×900, H.264, 11 s, bez dźwięku, ok. 6,4 MB.
Leci jako tło hero na górze strony: wyciszony, w pętli, sam startuje tylko
na szerokim ekranie i przy zwykłym łączu. Na telefonie i przy włączonym
oszczędzaniu danych zostaje nieruchomy kadr (`images/zewnatrz/dom-z-drona-poster.jpg`)
i przycisk „Obejrzyj dom z drona".

Oryginał (4K, HEVC, 137 MB) leży w `_oryginal/` i jest poza repo — GitHub
odrzuca pliki powyżej 100 MB, a HEVC i tak nie odtworzy się w Chrome.

Gdybyś wymieniał film, przepuść go tak samo:

```bash
ffmpeg -i nowy.mp4 -vf "scale=1600:-2:flags=lanczos" \
       -c:v libx264 -preset slow -crf 27 -profile:v high -level 4.0 \
       -pix_fmt yuv420p -movflags +faststart -an dom-z-drona.mp4

ffmpeg -ss 2 -i dom-z-drona.mp4 -frames:v 1 -vf "scale=1600:-2" -q:v 4 \
       ../images/zewnatrz/dom-z-drona-poster.jpg
```
