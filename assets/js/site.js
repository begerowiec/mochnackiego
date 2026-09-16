/* ==========================================================================
   Dom na sprzedaż — Mochnackiego 1a, Wrocław
   Bez frameworków i bez build-stepu: czysty ES5+/vanilla, żeby strona
   działała na GitHub Pages "as is". Trzy rzeczy: brakujące zdjęcia,
   odsłanianie sekcji przy scrollu, lightbox + podświetlanie nawigacji.
   ========================================================================== */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* --- 1. Zdjęcia: brakujący plik => stylowy placeholder ------------------
     Dzięki temu wystarczy wrzucić plik do /images o właściwej nazwie
     i zdjęcie pojawi się samo — nic nie trzeba zmieniać w HTML.          */
  function markMissing(fig) { if (fig) fig.classList.add('is-missing'); }
  Array.prototype.forEach.call(document.querySelectorAll('.shot img'), function (img) {
    var fig = img.closest('.shot');
    img.addEventListener('error', function () { markMissing(fig); });
    if (img.complete && img.naturalWidth === 0) markMissing(fig);
  });

  /* --- 2. Odsłanianie sekcji --------------------------------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    // dopiero teraz wolno chować sekcje — patrz komentarz w site.css
    document.documentElement.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(reveals, function (n) { io.observe(n); });
    // dwie siatki bezpieczeństwa: gdyby obserwator nie zadziałał, treść
    // i tak się pojawi — najpierw to, co w kadrze, potem wszystko.
    setTimeout(function () {
      Array.prototype.forEach.call(reveals, function (n) {
        if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add('is-visible');
      });
    }, 1200);
    window.addEventListener('beforeprint', function () {
      Array.prototype.forEach.call(reveals, function (n) { n.classList.add('is-visible'); });
    });
  }

  /* --- 3. Podświetlanie aktywnej sekcji w nawigacji ----------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a, i) {
          a.setAttribute('aria-current', sections[i] === e.target ? 'true' : 'false');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* --- 4. Hero z filmem ---------------------------------------------------
     Film waży kilka megabajtów, więc sam z siebie startuje tylko na dużym
     ekranie i przy zwykłym łączu. Na telefonie, przy oszczędzaniu danych
     albo gdy ktoś prosi o mniej ruchu — zostaje nieruchomy kadr i przycisk. */
  var hero = document.querySelector('.hero-video');
  if (hero) {
    var vid = hero.querySelector('.hero-video__media');
    var playBtn = hero.querySelector('.hero-video__play');
    var conn = navigator.connection || {};
    var thrifty = conn.saveData === true || /2g/.test(conn.effectiveType || '');
    var autoOk = window.matchMedia('(min-width: 820px)').matches && !thrifty && !reduced;

    var start = function () {
      vid.preload = 'auto';
      var p = vid.play();
      if (p && p.catch) p.catch(function () { if (playBtn) playBtn.hidden = false; });
      hero.classList.add('is-playing');
    };

    if (autoOk) {
      start();
    } else if (playBtn) {
      playBtn.hidden = false;
      playBtn.addEventListener('click', start);
    }

    // film nie ma po co mielić, kiedy karta jest w tle
    document.addEventListener('visibilitychange', function () {
      if (!hero.classList.contains('is-playing')) return;
      if (document.hidden) vid.pause(); else vid.play().catch(function () {});
    });
  }

  /* --- 5. Lightbox -------------------------------------------------------- */
  var box = document.getElementById('lightbox');
  if (!box) return;
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('figcaption');
  var gallery = [];
  var index = 0;

  function collect() {
    gallery = Array.prototype.filter.call(
      document.querySelectorAll('.shot img'),
      function (img) { return !img.closest('.shot').classList.contains('is-missing'); }
    );
  }

  function show(i) {
    collect();
    if (!gallery.length) return;
    index = (i + gallery.length) % gallery.length;
    var img = gallery[index];
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
    boxCap.textContent = (img.alt || '') + '  ·  ' + (index + 1) + ' / ' + gallery.length;
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    box.focus();
  }

  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    boxImg.removeAttribute('src');
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('.shot img');
    if (img) { collect(); show(gallery.indexOf(img)); return; }
    if (e.target.closest && e.target.closest('.lb-next')) { show(index + 1); return; }
    if (e.target.closest && e.target.closest('.lb-prev')) { show(index - 1); return; }
    if (e.target === box || (e.target.closest && e.target.closest('.lb-close'))) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
})();
