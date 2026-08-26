(function () {
  'use strict';

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : fallback || '';
  }

  function locale() {
    return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function localizedSimple(sign) {
    var loc = locale();
    if (loc === 'en' && sign.simpleEn) return sign.simpleEn;
    if (loc.indexOf('es') === 0 && sign.simpleEs) return sign.simpleEs;
    return sign.simple || '';
  }

  function aladinUrl(sky, sign) {
    var target = encodeURIComponent((sign && sign.aladinTarget) || sky.defaultTarget || 'Hamal');
    var fov = (sign && sign.fov) || sky.defaultFov || 18;
    var survey = encodeURIComponent(sky.aladinSurvey || 'P/DSS2/color');
    var base = (sky.aladinBase || 'https://aladin.cds.unistra.fr/AladinLite/').replace(/\?.*$/, '');
    return base + '?target=' + target + '&fov=' + fov + '&survey=' + survey;
  }

  var catalog = null;
  var activeId = 'aries';

  function signs() {
    return (catalog && catalog.signs) || [];
  }

  function findSign(id) {
    var list = signs();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return list[0] || null;
  }

  function setSky(sign) {
    if (!catalog || !sign) return;
    activeId = sign.id;
    var url = aladinUrl(catalog.sky, sign);
    var frame = document.getElementById('astro-sky-frame');
    var caption = document.getElementById('astro-sky-caption');
    var ext = document.getElementById('astro-aladin-ext');
    if (frame && frame.getAttribute('src') !== url) frame.src = url;
    if (ext) {
      ext.href = url;
      ext.textContent = i18n('pages.guiaAstrologia.openAladin', 'Abrir Aladin numa aba') + ' · ' + sign.name;
    }
    if (caption) {
      caption.innerHTML =
        '<strong>' +
        escapeHtml(sign.symbol + ' ' + sign.name) +
        '</strong> — ' +
        escapeHtml(sign.star) +
        ' · ' +
        escapeHtml(sign.dates) +
        (sign.first ? ' · <em>' + escapeHtml(i18n('pages.guiaAstrologia.firstSign', 'primeiro signo')) + '</em>' : '');
    }
    var buttons = document.querySelectorAll('[data-sign-id]');
    for (var b = 0; b < buttons.length; b++) {
      var on = buttons[b].getAttribute('data-sign-id') === sign.id;
      buttons[b].classList.toggle('is-active', on);
      if (on) buttons[b].setAttribute('aria-current', 'true');
      else buttons[b].removeAttribute('aria-current');
    }
  }

  function renderNav() {
    var nav = document.getElementById('astro-sign-nav');
    if (!nav) return;
    nav.innerHTML = signs()
      .map(function (s) {
        return (
          '<button type="button" class="astro-sign-chip' +
          (s.first ? ' astro-sign-chip--first' : '') +
          '" data-sign-id="' +
          escapeHtml(s.id) +
          '" aria-label="' +
          escapeHtml(s.order + '. ' + s.name) +
          '">' +
          '<span class="astro-sign-sym">' +
          escapeHtml(s.symbol) +
          '</span>' +
          '<span class="astro-sign-nm">' +
          escapeHtml(s.name) +
          '</span>' +
          '</button>'
        );
      })
      .join('');
    nav.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-sign-id]');
      if (!btn) return;
      var sign = findSign(btn.getAttribute('data-sign-id'));
      if (sign) setSky(sign);
    });
  }

  function renderGrid() {
    var grid = document.getElementById('astro-sign-grid');
    if (!grid) return;
    grid.innerHTML = signs()
      .map(function (s) {
        var link = s.href
          ? '<a href="' + escapeHtml(s.href) + '">' + i18n('pages.guiaAstrologia.openInspection', 'Ver inspeção') + '</a>'
          : '<span class="astro-sign-soon">' +
            i18n('pages.guiaAstrologia.soon', 'Fila de ficha') +
            '</span>';
        return (
          '<li class="astro-sign-card' +
          (s.first ? ' astro-sign-card--first' : '') +
          '" id="signo-' +
          escapeHtml(s.id) +
          '">' +
          '<p class="astro-sign-order">' +
          escapeHtml(String(s.order)) +
          (s.first ? ' · 1.º' : '') +
          '</p>' +
          '<h3>' +
          escapeHtml(s.symbol + ' ' + s.name) +
          '</h3>' +
          '<p class="astro-sign-meta">' +
          escapeHtml(s.latin) +
          ' · ' +
          escapeHtml(s.dates) +
          '</p>' +
          '<p class="astro-sign-el">' +
          escapeHtml(s.element + ' · ' + s.quality) +
          '</p>' +
          '<p>' +
          escapeHtml(localizedSimple(s)) +
          '</p>' +
          '<p class="astro-sign-native">' +
          escapeHtml(s.native) +
          '</p>' +
          '<p class="astro-sign-actions">' +
          '<button type="button" class="linkish" data-sign-id="' +
          escapeHtml(s.id) +
          '">' +
          i18n('pages.guiaAstrologia.seeSky', 'Ver no céu') +
          '</button>' +
          ' · ' +
          link +
          '</p>' +
          '</li>'
        );
      })
      .join('');
    grid.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-sign-id]');
      if (!btn) return;
      var sign = findSign(btn.getAttribute('data-sign-id'));
      if (!sign) return;
      setSky(sign);
      var sky = document.getElementById('ceu');
      if (sky) sky.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function hashSign() {
    var h = String(location.hash || '').replace(/^#/, '');
    if (h === 'ariana' || h === 'aries' || h === 'ceu') return findSign('aries');
    if (h.indexOf('signo-') === 0) return findSign(h.slice(6));
    return findSign(h) || findSign('aries');
  }

  function init(data) {
    catalog = data;
    renderNav();
    renderGrid();
    setSky(hashSign());
  }

  function boot() {
    if (document.body.getAttribute('data-page') !== 'guia-astrologia') return;
    fetch('/content/astrologia.json', { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('astro ' + res.status);
        return res.json();
      })
      .then(init)
      .catch(function () {
        var cap = document.getElementById('astro-sky-caption');
        if (cap) cap.textContent = i18n('pages.guiaAstrologia.loadError', 'Não foi possível carregar o catálogo dos signos.');
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
