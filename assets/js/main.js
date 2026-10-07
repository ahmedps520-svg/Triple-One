/* ==========================================================
   TRIPLE ONE | تربل وان
   No dependencies. Arabic ships in the markup; EN is the toggle.
   ========================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.getAttribute('lang') === 'ar'; };

  /* ---------- the car: parts and finish ---------- */
  var rig = $('#rig');
  function select(part) {
    $$('#rig [data-part]').forEach(function (el) {
      if (el.tagName === 'BUTTON') { el.classList.toggle('on', el.getAttribute('data-part') === part); return; }
      el.classList.toggle('sel', el.getAttribute('data-part') === part);
    });
    $$('#info .info__card').forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-part') === part); });
  }
  // any piece of the drawing, or its hotspot, selects that part
  $$('#rig [data-part]').forEach(function (el) {
    el.addEventListener('click', function () { select(el.getAttribute('data-part')); });
  });
  select('body');

  var fins = $$('.finish button');
  function finish(btn) {
    var f = btn.getAttribute('data-f');
    if (rig.getAttribute('data-f') === f) return;
    fins.forEach(function (b) { var on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
    rig.classList.remove('wipe'); void rig.offsetWidth; rig.classList.add('wipe');
    // the finish changes as the film passes the middle of the car
    setTimeout(function () { rig.setAttribute('data-f', f); }, 380);
    select('body');
  }
  fins.forEach(function (b) { b.addEventListener('click', function () { finish(b); }); });

  /* ---------- hours: Sat–Thu 10am–10pm, Friday closed (UTC+3 all year) ---------- */
  function paintOpen() {
    var d = new Date(Date.now() + 3 * 3600e3), dow = d.getUTCDay(), m = d.getUTCHours() * 60 + d.getUTCMinutes();
    var open = dow !== 5 && m >= 600 && m < 1320, el = $('#openNow'), ar = isAr(), txt;
    if (open) txt = ar ? 'مفتوح الحين · يقفل ١٠ م' : 'Open now · closes 10pm';
    else if (dow === 5 || (dow === 4 && m >= 1320)) txt = ar ? 'مغلق الحين · يفتح السبت ١٠ ص' : 'Closed now · opens Saturday 10am';
    else txt = m < 600 ? (ar ? 'مغلق الحين · يفتح اليوم ١٠ ص' : 'Closed now · opens today 10am') : (ar ? 'مغلق الحين · يفتح بكرة ١٠ ص' : 'Closed now · opens tomorrow 10am');
    el.innerHTML = '<i></i>' + txt; el.classList.toggle('closed', !open);
  }

  /* ---------- language ---------- */
  var KEY = 'to-lang', lngTx = $('#lngTx');
  function apply(lang) {
    var d = document.documentElement;
    d.setAttribute('lang', lang); d.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    $$('[data-en]').forEach(function (el) {
      var v = el.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
      if (v != null) el.innerHTML = v;
    });
    if (lngTx) lngTx.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'تربل وان | Triple One Car Services — حماية وعازل وسيراميك، الفيصلية، جدة' : 'Triple One Car Services | تربل وان — PPF, window film & ceramic, Al Faisaliyah, Jeddah';
    splitWords($('#heroH'));
    paintOpen();
  }
  $('#lngBtn').addEventListener('click', function () {
    var next = isAr() ? 'en' : 'ar'; apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });

  /* Words, never characters — per-letter spans break Arabic joining. */
  function splitWords(el) {
    var txt = (el.textContent || '').trim(); if (!txt) return;
    el.textContent = '';
    txt.split(/\s+/).forEach(function (w, i) {
      var m = document.createElement('span'); m.className = 'wm';
      var x = document.createElement('i'); x.textContent = w; x.style.setProperty('--i', i);
      m.appendChild(x); el.appendChild(m); el.appendChild(document.createTextNode(' '));
    });
  }

  /* ---------- nav ---------- */
  var nav = $('#nav'), brg = $('#brg'), menu = $('#menu');
  function closeMenu() { menu.classList.remove('open'); brg.classList.remove('on'); brg.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
  brg.addEventListener('click', function () {
    nav.classList.remove('slid');
    var o = menu.classList.toggle('open');
    brg.classList.toggle('on', o); brg.setAttribute('aria-expanded', o ? 'true' : 'false');
    document.body.classList.toggle('lock', o);
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- scroll ---------- */
  var reveals = $$('.rv'), dock = $('#dock'), lastY = 0, ticking = false;
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    nav.classList.toggle('stuck', y > 30);
    if (!menu.classList.contains('open')) {
      if (y > 500 && y > lastY + 4) nav.classList.add('slid');
      else if (y < lastY - 4 || y < 500) nav.classList.remove('slid');
    }
    lastY = y;
    if (dock) dock.classList.toggle('on', y > vh * .6);
    for (var i = reveals.length - 1; i >= 0; i--) {
      if (reveals[i].getBoundingClientRect().top < vh * .9) { reveals[i].classList.add('in'); reveals.splice(i, 1); }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'en') apply('en'); else { splitWords($('#heroH')); paintOpen(); }
  setInterval(paintOpen, 60000);
  onScroll(); setTimeout(onScroll, 250);
})();
