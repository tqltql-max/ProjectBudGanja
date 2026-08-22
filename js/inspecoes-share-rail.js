(function () {
  'use strict';

  var PRODUCTION_ORIGIN = 'https://inspetorbudganja.com.br';
  var cachedFeed = null;

  var SHARE_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.96 9.81A2.99 2.99 0 0 0 6 9.09c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.12 4.16c-.05.21-.08.43-.08.61 0 1.61 1.31 2.91 2.92 2.91s2.92-1.3 2.92-2.91-1.31-2.91-2.92-2.91z"/></svg>';

  function t(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      return window.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
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

  function skipped() {
    var page = (document.body && document.body.dataset.page) || '';
    if (/admin/i.test(page) || page === 'login' || page === 'entrar') return true;
    if (page === 'apresentacao-unifesp' || page === 'apresentacao-unifesp-print') return true;
    return false;
  }

  function currentSlug() {
    var ds = document.body && document.body.dataset.postSlug;
    if (ds) return String(ds);
    var path = String((window.location && window.location.pathname) || '');
    var m = path.match(/post-([^/]+)\.html$/i);
    return m ? m[1] : '';
  }

  function itemTitle(item) {
    var loc = locale();
    if (loc === 'en' && item.titleEn) return item.titleEn;
    if (loc === 'es' && item.titleEs) return item.titleEs;
    return item.title || '';
  }

  function itemExcerpt(item) {
    var loc = locale();
    if (loc === 'en' && item.excerptEn) return item.excerptEn;
    if (loc === 'es' && item.excerptEs) return item.excerptEs;
    return item.excerpt || '';
  }

  function kindLabel(kind) {
    var map = {
      arte: ['footer.shareKindArte', 'Arte'],
      animal: ['footer.shareKindAnimal', 'Animal'],
      planta: ['footer.shareKindPlanta', 'Planta'],
      fruto: ['footer.shareKindFruto', 'Fruto'],
      palavra: ['footer.shareKindPalavra', 'Palavra'],
      expressao: ['footer.shareKindExpressao', 'Expressão'],
      pessoa: ['footer.shareKindPessoa', 'Pessoa'],
      conto: ['footer.shareKindVida', 'Vida']
    };
    var entry = map[kind] || ['footer.shareKindInspecao', 'Inspeção'];
    return t(entry[0], entry[1]);
  }

  function absUrl(path) {
    var raw = String(path || '').trim();
    if (!raw) return PRODUCTION_ORIGIN + '/';
    if (/^https?:\/\//i.test(raw)) return raw;
    var pathOnly = raw.charAt(0) === '/' ? raw : '/' + raw.replace(/^\/+/, '');
    if (/localhost|127\.0\.0\.1/i.test(window.location.hostname || '')) {
      return PRODUCTION_ORIGIN + pathOnly;
    }
    return window.location.origin + pathOnly;
  }

  function coverSrc(cover) {
    var raw = String(cover || '').trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw) || raw.charAt(0) === '/') return raw;
    return '/' + raw.replace(/^\/+/, '');
  }

  function loadFeed() {
    if (cachedFeed) return Promise.resolve(cachedFeed);
    return fetch('/inspecoes-share.json')
      .then(function (res) {
        return res.ok ? res.json() : [];
      })
      .then(function (data) {
        cachedFeed = Array.isArray(data) ? data : [];
        return cachedFeed;
      })
      .catch(function () {
        cachedFeed = [];
        return cachedFeed;
      });
  }

  function showCopied(btn) {
    var label = btn.querySelector('[data-share-label]');
    var prev = label ? label.textContent : '';
    btn.classList.add('is-copied');
    if (label) label.textContent = t('common.shareCopied', 'Link copiado!');
    window.setTimeout(function () {
      btn.classList.remove('is-copied');
      if (label) label.textContent = prev || t('common.share', 'Compartilhar');
    }, 2000);
  }

  function copyUrl(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url).then(function () {
        return 'copied';
      }).catch(function () {
        return 'fallback';
      });
    }
    return Promise.resolve('fallback');
  }

  function shareItem(item, btn) {
    var url = absUrl(item.url);
    var title = itemTitle(item) || 'Inspetor BudGanja';
    var text = itemExcerpt(item) || title;
    var payload = { title: title, text: text, url: url };

    var run;
    if (typeof navigator.share === 'function') {
      run = navigator.share(payload).then(function () {
        return 'shared';
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return 'shared';
        return copyUrl(url);
      });
    } else {
      run = copyUrl(url);
    }

    run.then(function (result) {
      if (result === 'copied' || result === 'fallback') showCopied(btn);
    }).catch(function () { /* ignore */ });
  }

  function cardHtml(item) {
    var title = itemTitle(item);
    var href = String(item.url || '#').charAt(0) === '/' ? item.url : '/' + String(item.url || '').replace(/^\/+/, '');
    var cover = coverSrc(item.coverImage);
    var kind = kindLabel(item.kind);
    var coverHtml = cover
      ? '<img src="' + escapeHtml(cover) + '" alt="" width="480" height="270" loading="lazy" decoding="async">'
      : '<span class="inspecoes-share-rail-ph" aria-hidden="true"></span>';

    return (
      '<article class="inspecoes-share-rail-card">' +
        '<a class="inspecoes-share-rail-link" href="' + escapeHtml(href) + '">' +
          '<span class="inspecoes-share-rail-cover">' + coverHtml + '</span>' +
          '<span class="inspecoes-share-rail-badge">' + escapeHtml(kind) + '</span>' +
          '<span class="inspecoes-share-rail-title">' + escapeHtml(title) + '</span>' +
        '</a>' +
        '<button type="button" class="inspecoes-share-rail-share" data-share-slug="' + escapeHtml(item.slug || '') + '"' +
          ' aria-label="' + escapeHtml(t('footer.shareRailShareAria', 'Compartilhar') + ' ' + title) + '">' +
          '<span aria-hidden="true">' + SHARE_ICON + '</span>' +
          '<span data-share-label>' + escapeHtml(t('common.share', 'Compartilhar')) + '</span>' +
        '</button>' +
      '</article>'
    );
  }

  function fillRail(items) {
    var rail = document.getElementById('inspecoes-share-rail');
    if (!rail) return;
    if (skipped() || !items || !items.length) {
      rail.hidden = true;
      return;
    }

    var slug = currentSlug();
    var visible = items.filter(function (item) {
      return item && item.slug && item.slug !== slug;
    }).slice(0, 8);

    if (!visible.length) {
      rail.hidden = true;
      return;
    }

    var titleEl = document.getElementById('inspecoes-share-rail-title');
    var leadEl = rail.querySelector('.inspecoes-share-rail-lead');
    var allEl = rail.querySelector('.inspecoes-share-rail-all');
    if (titleEl) titleEl.textContent = t('footer.shareRailTitle', 'Inspeções para circular');
    if (leadEl) leadEl.textContent = t('footer.shareRailLead', 'Fichas curtas e fáceis de entender.');
    if (allEl) allEl.textContent = t('footer.shareRailAll', 'Todas as inspeções →');

    var track = rail.querySelector('[data-inspecoes-share-track]');
    if (!track) return;
    track.innerHTML = visible.map(cardHtml).join('');

    var bySlug = Object.create(null);
    visible.forEach(function (item) {
      bySlug[item.slug] = item;
    });

    track.querySelectorAll('[data-share-slug]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = bySlug[btn.getAttribute('data-share-slug')];
        if (item) shareItem(item, btn);
      });
    });

    rail.hidden = false;
  }

  function mount() {
    if (skipped()) {
      var rail = document.getElementById('inspecoes-share-rail');
      if (rail) rail.hidden = true;
      return;
    }
    loadFeed().then(fillRail);
  }

  window.addEventListener('budganja:locale-change', function () {
    window.setTimeout(mount, 0);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
