/**
 * Sala de vídeo — assiste vídeos legendados do laboratório na sala de aula.
 */
(function () {
  'use strict';

  var DATA_URL = '/content/sala-videos.json';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function thumbUrl(id) {
    return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg';
  }

  function bindFacades(root) {
    if (window.BudGanjaYoutubeFacade && typeof window.BudGanjaYoutubeFacade.enhance === 'function') {
      window.BudGanjaYoutubeFacade.enhance(root || document);
    }
  }

  function pickLang(obj, lang) {
    if (!obj || typeof obj !== 'object') return '';
    return obj[lang] || obj.pt || obj.en || '';
  }

  function renderLyrics(lyrics, lang) {
    if (!lyrics || !lyrics.stanzas || !lyrics.stanzas.length) return '';

    var activeLang = lang === 'en' || lang === 'es' ? lang : 'pt';
    var heading = pickLang(lyrics.heading, activeLang);
    var note = pickLang(lyrics.note, activeLang);
    var originalLabel = pickLang(lyrics.originalLabel, activeLang);

    var langButtons = ['pt', 'en', 'es']
      .map(function (code) {
        var label = (lyrics.langLabels && lyrics.langLabels[code]) || code;
        return (
          '<button type="button" role="tab" class="' +
          (code === activeLang ? 'is-active' : '') +
          '" data-lyrics-lang="' +
          code +
          '" aria-selected="' +
          (code === activeLang ? 'true' : 'false') +
          '">' +
          escapeHtml(label) +
          '</button>'
        );
      })
      .join('');

    var stanzasHtml = lyrics.stanzas
      .map(function (stanza) {
        var label = pickLang(stanza.label, activeLang);
        var linesHtml = (stanza.lines || [])
          .map(function (line) {
            return (
              '<li class="sala-song-line">' +
              '<span class="sala-song-line-en" aria-label="' +
              escapeHtml(originalLabel) +
              '">' +
              escapeHtml(line.en || '') +
              '</span>' +
              '<span class="sala-song-line-tr" data-lyrics-text="' +
              escapeHtml(pickLang(line, activeLang)) +
              '">' +
              escapeHtml(pickLang(line, activeLang)) +
              '</span>' +
              '</li>'
            );
          })
          .join('');
        return (
          '<div class="sala-song-stanza">' +
          (label ? '<p class="sala-song-stanza-label">' + escapeHtml(label) + '</p>' : '') +
          '<ul class="sala-song-lines">' +
          linesHtml +
          '</ul>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<aside class="sala-song-lyrics" aria-label="' +
      escapeHtml(heading) +
      '">' +
      '<h3>' +
      escapeHtml(heading) +
      '</h3>' +
      (note ? '<p class="sala-song-lyrics-note">' + escapeHtml(note) + '</p>' : '') +
      '<div class="sala-song-lyrics-lang" role="tablist" aria-label="Idioma da tradução">' +
      langButtons +
      '</div>' +
      '<div class="sala-song-lyrics-body">' +
      stanzasHtml +
      '</div>' +
      (lyrics.credit ? '<p class="sala-song-credit">' + escapeHtml(lyrics.credit) + '</p>' : '') +
      '</aside>'
    );
  }

  function bindLyricsLang(stage, video, lang) {
    if (!stage || !video || !video.lyrics) return;
    var panel = stage.querySelector('.sala-song-lyrics');
    if (!panel) return;

    panel.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-lyrics-lang]') : null;
      if (!btn || !panel.contains(btn)) return;
      var next = btn.getAttribute('data-lyrics-lang');
      if (next !== 'pt' && next !== 'en' && next !== 'es') return;

      var aside = renderLyrics(video.lyrics, next);
      var old = stage.querySelector('.sala-song-lyrics');
      if (old) old.outerHTML = aside;
      bindLyricsLang(stage, video, next);
    });
  }

  function renderPlayer(video, lang) {
    var stage = $('#sala-video-stage');
    if (!stage || !video) return;
    var title = video.title || 'Vídeo';
    var lyricsHtml = video.lyrics ? renderLyrics(video.lyrics, lang || 'pt') : '';
    stage.innerHTML =
      '<div class="video-embed sala-video-embed yt-facade-skip">' +
      '<button type="button" class="yt-facade" data-youtube-id="' +
      escapeHtml(video.id) +
      '" data-youtube-title="' +
      escapeHtml(title) +
      '" aria-label="Play: ' +
      escapeHtml(title) +
      '">' +
      '<img class="yt-facade-thumb" src="' +
      thumbUrl(video.id) +
      '" alt="" width="480" height="360" decoding="async">' +
      '<span class="video-card-play" aria-hidden="true"></span>' +
      '</button>' +
      '</div>' +
      '<div class="sala-video-now">' +
      '<p class="sala-hero-brand">' +
      (video.tag === 'trilha' ? 'Trilha' : 'Aula em vídeo') +
      '</p>' +
      '<h2>' +
      escapeHtml(title) +
      '</h2>' +
      '<p>' +
      escapeHtml(video.summary || '') +
      '</p>' +
      '<p class="sala-video-cc-hint">Legendas (CC) ligadas no player — é só assistir.</p>' +
      '</div>' +
      lyricsHtml;
    bindFacades(stage);
    bindLyricsLang(stage, video, lang || 'pt');
  }

  function renderList(videos, activeId) {
    var list = $('#sala-video-list');
    if (!list) return;
    list.innerHTML = videos
      .map(function (v) {
        var active = v.id === activeId ? ' is-active' : '';
        return (
          '<button type="button" class="sala-video-card' +
          active +
          '" data-video-id="' +
          escapeHtml(v.id) +
          '">' +
          '<img src="' +
          thumbUrl(v.id) +
          '" alt="" width="160" height="90" loading="lazy" decoding="async">' +
          '<span class="sala-video-card-copy">' +
          '<span class="sala-video-card-tag">' +
          escapeHtml(v.tag === 'trilha' ? 'Trilha' : 'Aula') +
          '</span>' +
          '<strong>' +
          escapeHtml(v.title) +
          '</strong>' +
          '<em>' +
          escapeHtml(v.summary || '') +
          '</em>' +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function boot() {
    var page = (document.body && document.body.dataset.page) || '';
    if (page !== 'sala-video') return;

    fetch(DATA_URL + '?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (data) {
        if (!data || !data.videos || !data.videos.length) {
          var fail = $('#sala-video-stage');
          if (fail) fail.innerHTML = '<p class="sala-empty">Não foi possível carregar os vídeos.</p>';
          return;
        }

        var note = $('#sala-video-note');
        if (note && data.note) note.textContent = data.note;

        var sub = $('#sala-video-sub');
        if (sub && data.subtitle) sub.textContent = data.subtitle;

        var params = new URLSearchParams(window.location.search || '');
        var startId = params.get('v') || data.videos[0].id;
        var current =
          data.videos.find(function (v) {
            return v.id === startId;
          }) || data.videos[0];

        var lyricsLang = 'pt';
        try {
          var learnLang = localStorage.getItem('budganja-learn-lang') || '';
          if (learnLang === 'en' || learnLang === 'es') lyricsLang = learnLang;
        } catch (err) { /* ignore */ }

        renderPlayer(current, lyricsLang);
        renderList(data.videos, current.id);

        var list = $('#sala-video-list');
        if (list) {
          list.addEventListener('click', function (e) {
            var btn = e.target && e.target.closest ? e.target.closest('[data-video-id]') : null;
            if (!btn) return;
            var id = btn.getAttribute('data-video-id');
            var video = data.videos.find(function (v) {
              return v.id === id;
            });
            if (!video) return;
            var stage = $('#sala-video-stage');
            var activeLang = 'pt';
            var activeBtn = stage && stage.querySelector('[data-lyrics-lang].is-active');
            if (activeBtn) {
              var code = activeBtn.getAttribute('data-lyrics-lang');
              if (code === 'en' || code === 'es') activeLang = code;
            }
            renderPlayer(video, activeLang);
            renderList(data.videos, video.id);
            try {
              var url = new URL(window.location.href);
              url.searchParams.set('v', video.id);
              window.history.replaceState({}, '', url.toString());
            } catch (err) { /* ignore */ }
            if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      })
      .catch(function () {
        var fail = $('#sala-video-stage');
        if (fail) fail.innerHTML = '<p class="sala-empty">Não foi possível carregar os vídeos.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
