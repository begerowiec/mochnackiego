# Dom na sprzedaż — ul. Mochnackiego 1a, Wrocław

Jednostronicowa wizytówka domu, przepisana z mockupu `Dom na sprzedaz.dc.html`
na statyczną stronę gotową pod GitHub Pages.

## Technologia

Czysty **HTML + CSS + vanilla JS**. Bez frameworka, bez `npm install`,
bez kroku budowania — GitHub Pages serwuje pliki takie, jakie są w repo.
Dla wizytówki jednej nieruchomości to najlepszy wybór: najszybsze ładowanie,
zero zależności do aktualizowania, edycja treści w jednym pliku HTML.

```
index.html                 cała treść strony
assets/css/tokens.css      design system "Industry" z mockupu (kolory, fonty, komponenty)
assets/css/site.css        układ i styl tej konkretnej strony
assets/js/site.js          lightbox, animacje wejścia, podświetlanie nawigacji
images/                    zdjęcia — patrz images/README.md
.github/workflows/deploy.yml   automatyczna publikacja na GitHub Pages
.nojekyll                  wyłącza Jekylla (pliki i katalogi z podkreśleniem)
```

## Co trzeba jeszcze uzupełnić

Wszystkie brakujące dane są oznaczone w kodzie jako `[UZUPEŁNIJ: …]`
i na stronie wyświetlają się w przerywanej ramce. Znajdziesz je komendą:

```bash
grep -n "UZUPEŁNIJ" index.html
```

Do uzupełnienia: metraż, powierzchnia działki, liczba pokoi, rok budowy,
ogrzewanie, stan, forma własności, cena oraz dane kontaktowe
(imię i nazwisko, telefon — także w `href="tel:…"`, e-mail — także w `href="mailto:…"`).

Zdjęcia: wrzuć pliki do `images/` według nazw z `images/README.md`.

### Ukrycie ceny

Usuń (albo zakomentuj) wiersz `<tr class="price">` w `index.html`.

## Podgląd lokalnie

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publikacja na GitHub Pages

1. Załóż puste repozytorium na GitHubie (np. `sell-house`).
2. W tym katalogu:

   ```bash
   git remote add origin git@github.com:begerowiec/sell-house.git
   git branch -M main
   git push -u origin main
   ```

3. W repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Workflow `deploy.yml` odpali się sam przy każdym pushu na `main`.
   Strona stanie pod `https://begerowiec.github.io/sell-house/`.

> Jeśli wolisz prostszy wariant bez Actions: **Settings → Pages → Source:
> Deploy from a branch → `main` / `(root)`**. Plik `.nojekyll` już jest,
> więc wszystko zadziała tak samo. Wtedy `deploy.yml` możesz skasować.

### Własna domena

Dodaj plik `CNAME` z samą nazwą domeny (np. `mochnackiego1a.pl`),
a u operatora domeny ustaw rekordy A na adresy GitHub Pages.
Pamiętaj wtedy zmienić `<link rel="canonical">` i `og:url` w `index.html`.

## Dane o okolicy

Odległości w sekcji „Okolica" policzone dla współrzędnych
**51.1412614, 17.0391537** (ul. Mochnackiego 1a) — punkty z OpenStreetMap,
trasy drogowe przez OSRM. Opis dzielnicy na podstawie historii Karłowic
(miasto-ogród *Gartenstadt Carlowitz*, 1911, Paul Schmitthenner;
włączone do Wrocławia w 1928).
