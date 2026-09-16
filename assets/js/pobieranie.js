/* ==========================================================================
   Pobieranie materiałów — paczka ZIP składana w przeglądarce.

   Dlaczego w przeglądarce, a nie gotowy plik .zip w repo: gotowa paczka
   podwoiłaby wagę repozytorium i rozjeżdżałaby się z galerią przy każdej
   zmianie zdjęć. Tutaj paczka powstaje z tych samych plików, które widać
   na stronie, więc zawsze jest aktualna.

   Zdjęcia są już skompresowane (JPEG), więc pakujemy bez kompresji (STORE)
   — wynik jest tej samej wielkości, a składanie idzie kilka razy szybciej.
   ========================================================================== */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  var grupy = window.MATERIALY || [];
  var wszystkie = [];
  grupy.forEach(function (g) {
    var kat = g.katalogZip || g.katalog;
    g.pliki.forEach(function (p) { wszystkie.push({ sciezka: p.sciezka, wKatalogu: kat + '/' + p.nazwa }); });
  });

  var btn = document.getElementById('pobierz');
  var stan = document.getElementById('stan');
  var pasek = document.getElementById('pasek');
  var licz = document.getElementById('licznik-plikow');
  if (licz) licz.textContent = wszystkie.length;

  function komunikat(t, blad) {
    if (!stan) return;
    stan.textContent = t;
    stan.classList.toggle('is-error', !!blad);
  }

  function postep(ile) {
    var proc = Math.round((ile / wszystkie.length) * 100);
    if (pasek) pasek.style.width = proc + '%';
    komunikat('Pobieram zdjęcia… ' + ile + ' z ' + wszystkie.length);
  }

  // JSZip leży w repo (assets/js/vendor/), a nie na CDN-ie: strona ma
  // działać także wtedy, gdy CDN jest niedostępny albo zablokowany.
  function wczytajJSZip() {
    if (window.JSZip) return Promise.resolve(window.JSZip);
    return new Promise(function (ok, zle) {
      var s = document.createElement('script');
      s.src = 'assets/js/vendor/jszip.min.js';
      s.onload = function () {
        if (window.JSZip) ok(window.JSZip);
        else zle(new Error('biblioteka pakująca nie wystartowała'));
      };
      s.onerror = function () { zle(new Error('nie udało się wczytać biblioteki pakującej')); };
      document.head.appendChild(s);
    });
  }

  // kilka pobrań naraz, ale nie wszystkie — inaczej przeglądarka się zatyka
  function poKolei(lista, ile, praca) {
    var i = 0, zrobione = 0;
    return new Promise(function (ok, zle) {
      var bledy = null;
      function nastepny() {
        if (bledy) return;
        if (i >= lista.length) { if (zrobione === lista.length) ok(); return; }
        var moj = lista[i++];
        praca(moj).then(function () {
          zrobione++; postep(zrobione);
          if (zrobione === lista.length) ok(); else nastepny();
        }, function (e) { bledy = e; zle(e); });
      }
      for (var k = 0; k < Math.min(ile, lista.length); k++) nastepny();
    });
  }

  function pobierzPaczke() {
    btn.disabled = true;
    komunikat('Przygotowuję paczkę…');
    if (pasek) pasek.style.width = '0%';

    wczytajJSZip().then(function (JSZip) {
      var zip = new JSZip();
      return poKolei(wszystkie, 6, function (plik) {
        return fetch(plik.sciezka).then(function (r) {
          if (!r.ok) throw new Error(plik.sciezka + ' — ' + r.status);
          return r.blob();
        }).then(function (blob) { zip.file(plik.wKatalogu, blob); });
      }).then(function () {
        komunikat('Składam paczkę…');
        return zip.generateAsync({ type: 'blob', compression: 'STORE' });
      });
    }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'mochnackiego-1a-zdjecia.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      var mb = (blob.size / 1048576).toFixed(1);
      komunikat('Gotowe — paczka ' + mb + ' MB powinna właśnie się zapisywać.');
      if (pasek) pasek.style.width = '100%';
      btn.disabled = false;
    }).catch(function (e) {
      komunikat('Nie udało się złożyć paczki (' + e.message + '). Zdjęcia można pobrać pojedynczo z listy niżej.', true);
      if (pasek) pasek.style.width = '0%';
      btn.disabled = false;
    });
  }

  if (btn) btn.addEventListener('click', pobierzPaczke);

  /* --- lista pojedynczych plików: działa nawet gdy pakowanie zawiedzie --- */
  var lista = document.getElementById('lista');
  if (!lista) return;
  grupy.forEach(function (g) {
    var sekcja = document.createElement('section');
    sekcja.className = 'grupa';
    var h = document.createElement('h2');
    h.className = 'grupa__tytul';
    h.textContent = g.tytul;
    var licznik = document.createElement('span');
    licznik.className = 'grupa__licznik';
    licznik.textContent = g.pliki.length;
    h.appendChild(licznik);
    sekcja.appendChild(h);

    var siatka = document.createElement('div');
    siatka.className = 'grid-gallery';
    g.pliki.forEach(function (p) {
      var a = document.createElement('a');
      a.className = 'blueprint shot' + (g.katalog === 'rzuty' ? ' no-crop' : '');
      a.href = p.sciezka;
      a.download = (g.katalogZip || g.katalog) + '-' + p.nazwa;
      a.style.setProperty('--ar', g.katalog === 'rzuty' ? '3/2' : '4/3');
      a.innerHTML =
        '<img src="' + p.sciezka + '" alt="' + p.nazwa + '" loading="lazy" decoding="async">' +
        '<i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>' +
        '<figcaption>' + p.nazwa + '</figcaption>';
      siatka.appendChild(a);
    });
    sekcja.appendChild(siatka);
    lista.appendChild(sekcja);
  });
})();
