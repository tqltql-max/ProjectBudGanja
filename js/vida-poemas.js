/**
 * Vida · lista de poemas → leitor com modo Aprender (learn-translate).
 */
(function () {
  'use strict';

  var DATA_URL = '/content/vida-poemas.json';
  var poems = [];
  var activeSlug = null;

  function $(id) {
    return document.getElementById(id);
  }

  function locale() {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.getLocale === 'function') {
        return window.BudGanjaI18n.getLocale() || 'pt-BR';
      }
    } catch (e) { /* ignore */ }
    return 'pt-BR';
  }

  function t(key, fallback) {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
        var val = window.BudGanjaI18n.t('pages.vida.' + key);
        if (val && val !== 'pages.vida.' + key) return val;
      }
    } catch (e) { /* ignore */ }
    return fallback;
  }

  function pick(obj, base) {
    var loc = locale();
    if (loc === 'en' && obj[base + 'En']) return obj[base + 'En'];
    if (loc === 'es' && obj[base + 'Es']) return obj[base + 'Es'];
    return obj[base] || '';
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeMantraStanza(stanza) {
    return String(stanza || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/^[¡!]+/, '')
      .replace(/[!¡.]+$/g, '');
  }

  function isValeuOnlyStanza(stanza) {
    var t = normalizeMantraStanza(stanza);
    return (
      t === 'valeu' ||
      t === 'faça o melhor' ||
      t === 'faca o melhor' ||
      t === 'do your best' ||
      t === 'haz lo mejor'
    );
  }

  function isEuAmoAVidaStanza(stanza) {
    var t = normalizeMantraStanza(stanza);
    return t === 'eu amo a vida' || t === 'i love life' || t === 'amo la vida';
  }

  function isMantraStanza(stanza) {
    var t = normalizeMantraStanza(stanza);
    if (isValeuOnlyStanza(stanza) || isEuAmoAVidaStanza(stanza)) return true;
    return t.indexOf('eu amo a vida') >= 0 && t.indexOf('valeu') >= 0;
  }

  function expandPoemMantraStanzas(stanzas) {
    var src = stanzas || [];
    var out = [];
    for (var i = 0; i < src.length; i++) {
      out.push(src[i]);
      if (isValeuOnlyStanza(src[i]) && !isEuAmoAVidaStanza(src[i + 1])) {
        out.push('eu amo a vida');
      }
    }
    return out;
  }

  /** Corpo do poema → stanzas com <br> por verso (texto wrappável pelo learn-mode). */
  function poemHtml(body) {
    var text = String(body || '').replace(/\r\n/g, '\n').trim();
    if (!text) return '';
    return expandPoemMantraStanzas(text.split(/\n{2,}/))
      .map(function (stanza) {
        var lines = stanza.split('\n').map(function (line) {
          return escapeHtml(line);
        });
        var cls = isMantraStanza(stanza)
          ? 'vida-poem-stanza vida-poem-stanza--mantra'
          : 'vida-poem-stanza';
        return '<p class="' + cls + '">' + lines.join('<br>') + '</p>';
      })
      .join('');
  }

  function remountLearn() {
    try {
      if (
        window.BudGanjaLearnTranslate &&
        typeof window.BudGanjaLearnTranslate.remount === 'function'
      ) {
        window.BudGanjaLearnTranslate.remount();
      }
    } catch (e) { /* ignore */ }
  }

  function setHash(slug) {
    try {
      if (!slug) {
        if (location.hash && location.hash.indexOf('poema=') !== -1) {
          history.replaceState(null, '', location.pathname + location.search + '#poemas');
        }
        return;
      }
      history.replaceState(
        null,
        '',
        location.pathname + location.search + '#poema=' + encodeURIComponent(slug)
      );
    } catch (e) { /* ignore */ }
  }

  function renderList() {
    var list = $('vida-poemas-list');
    if (!list) return;
    list.innerHTML = poems
      .map(function (p) {
        var on = p.slug === activeSlug ? ' is-active' : '';
        return (
          '<button type="button" class="vida-poem-card' +
          on +
          '" data-poem="' +
          escapeHtml(p.slug) +
          '" aria-pressed="' +
          (p.slug === activeSlug ? 'true' : 'false') +
          '">' +
          '<span class="vida-poem-card-meta">' +
          escapeHtml(pick(p, 'author') || t('poemsAuthorLab', 'Laboratório')) +
          '</span>' +
          '<strong class="vida-poem-card-title">' +
          escapeHtml(pick(p, 'title')) +
          '</strong>' +
          '<span class="vida-poem-card-teaser">' +
          escapeHtml(pick(p, 'teaser')) +
          '</span>' +
          '<span class="vida-poem-card-open">' +
          escapeHtml(t('poemsOpen', 'Ler poema')) +
          ' →</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function openPoem(slug, opts) {
    opts = opts || {};
    var poem = poems.find(function (p) {
      return p.slug === slug;
    });
    var reader = $('vida-poema-reader');
    var title = $('vida-poema-title');
    var author = $('vida-poema-author');
    var body = $('vida-poema-body');
    var actions = $('vida-poema-actions');
    if (!poem || !reader || !body) return;

    activeSlug = poem.slug;
    renderList();

    if (title) title.textContent = pick(poem, 'title');
    if (author) {
      author.textContent = pick(poem, 'author')
        ? t('poemsBy', 'por') + ' ' + pick(poem, 'author')
        : '';
    }
    body.innerHTML = poemHtml(pick(poem, 'body'));

    if (actions) {
      var bits = [];
      if (poem.inspectionHref) {
        bits.push(
          '<a class="botao botao-home botao-home--secondary" href="' +
            escapeHtml(poem.inspectionHref) +
            '">' +
            escapeHtml(t('poemsInspection', 'Abrir inspeção do poema')) +
            '</a>'
        );
      }
      bits.push(
        '<button type="button" class="botao botao-home botao-home--secondary" data-poem-close>' +
          escapeHtml(t('poemsClose', 'Fechar leitura')) +
          '</button>'
      );
      actions.innerHTML = bits.join('');
    }

    reader.hidden = false;
    reader.setAttribute('aria-hidden', 'false');
    setHash(poem.slug);
    remountLearn();

    if (!opts.skipScroll) {
      try {
        reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {
        reader.scrollIntoView();
      }
    }
  }

  function closePoem() {
    var reader = $('vida-poema-reader');
    var body = $('vida-poema-body');
    if (reader) {
      reader.hidden = true;
      reader.setAttribute('aria-hidden', 'true');
    }
    if (body) body.innerHTML = '';
    activeSlug = null;
    renderList();
    setHash('');
    remountLearn();
  }

  function onListClick(e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-poem]') : null;
    if (!btn) return;
    e.preventDefault();
    openPoem(btn.getAttribute('data-poem') || '');
  }

  function onReaderClick(e) {
    var close = e.target && e.target.closest ? e.target.closest('[data-poem-close]') : null;
    if (close) {
      e.preventDefault();
      closePoem();
    }
  }

  function slugFromHash() {
    var h = (location.hash || '').replace(/^#/, '');
    if (h.indexOf('poema=') === 0) {
      try {
        return decodeURIComponent(h.slice(6));
      } catch (e) {
        return h.slice(6);
      }
    }
    return '';
  }

  function applyFromHash() {
    var slug = slugFromHash();
    if (slug && poems.some(function (p) { return p.slug === slug; })) {
      openPoem(slug, { skipScroll: false });
    }
  }

  function load() {
    return fetch(DATA_URL, { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (doc) {
        poems = Array.isArray(doc.poems) ? doc.poems : [];
        renderList();
        if (activeSlug) openPoem(activeSlug, { skipScroll: true });
        else applyFromHash();
      })
      .catch(function (err) {
        var list = $('vida-poemas-list');
        if (list) {
          list.innerHTML =
            '<p class="vida-section-lead">' +
            escapeHtml(t('poemsError', 'Não foi possível carregar os poemas.')) +
            '</p>';
        }
        console.warn('vida-poemas:', err);
      });
  }

  function bind() {
    var list = $('vida-poemas-list');
    var reader = $('vida-poema-reader');
    if (list) list.addEventListener('click', onListClick);
    if (reader) reader.addEventListener('click', onReaderClick);
    window.addEventListener('hashchange', applyFromHash);
    window.addEventListener('budganja:localechange', function () {
      renderList();
      if (activeSlug) openPoem(activeSlug, { skipScroll: true });
    });
  }

  function init() {
    var list = $('vida-poemas-list');
    if (!list) return;
    if (!list.innerHTML.trim()) {
      list.innerHTML =
        '<p class="vida-section-lead" data-poems-loading>' +
        escapeHtml(t('poemsLoading', 'A carregar os poemas…')) +
        '</p>';
    }
    bind();
    load();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
