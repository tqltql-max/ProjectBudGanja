'use strict';

/**
 * Mini-player flutuante — playlist em /radio/playlist.json
 *
 * Continuação entre páginas: sessionStorage (playing/index/time).
 * Ao descarregar a página o browser dispara pause — ignoramos esse pause
 * para a próxima página poder retomar.
 *
 * UI: pill compacta por defeito; expandir ao tocar; fechar na sessão.
 */
(function () {
  var PLAYLIST_API = '/api/radio/playlist';
  var PLAYLIST_FALLBACK = '/radio/playlist.json';
  var STORAGE_MUTE = 'budganja.radio.muted';
  var STORAGE_INDEX = 'budganja.radio.index';
  var STORAGE_PLAYING = 'budganja.radio.playing';
  var STORAGE_TIME = 'budganja.radio.time';
  var STORAGE_COLLAPSED = 'budganja.radio.collapsed';
  var STORAGE_DISMISSED = 'budganja.radio.dismissed';
  var STORAGE_SOURCE = 'budganja.radio.source';

  function pathLower() {
    return (window.location.pathname || '').toLowerCase();
  }

  function isAdminPage() {
    var file = pathLower().split('/').pop() || '';
    if (file === 'login.html' || file === 'entrar.html') return true;
    if (file === 'admin.html' || file === 'admin-db.html') return true;
    if (/-admin\.html$/i.test(file)) return true;
    return false;
  }

  /** Página dedicada já tem player completo — evita áudio duplo. */
  function isRadioPage() {
    var p = pathLower();
    return p === '/radio/' || p === '/radio' || p === '/radio/index.html';
  }

  /** Páginas de trabalho: só pill discreta (não barra larga). */
  function isFocusPage() {
    var p = pathLower();
    if (p.indexOf('/cultivo') === 0) return true;
    if (p.indexOf('/planejamento') === 0) return true;
    if (p.indexOf('/perfil') === 0 || p.indexOf('/perfil.html') !== -1) return true;
    if (p.indexOf('/calculadoras/') === 0 && p !== '/calculadoras/' && p !== '/calculadoras/index.html') {
      return true;
    }
    return false;
  }

  function readInt(key, fallback) {
    try {
      var n = parseInt(sessionStorage.getItem(key), 10);
      return Number.isFinite(n) ? n : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function readFloat(key, fallback) {
    try {
      var n = parseFloat(sessionStorage.getItem(key));
      return Number.isFinite(n) ? n : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeSession(key, value) {
    try {
      sessionStorage.setItem(key, String(value));
    } catch (e) { /* ignore */ }
  }

  function readMuted() {
    try {
      return localStorage.getItem(STORAGE_MUTE) === '1';
    } catch (e) {
      return false;
    }
  }

  function writeMuted(muted) {
    try {
      localStorage.setItem(STORAGE_MUTE, muted ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  function isDismissed() {
    try {
      return sessionStorage.getItem(STORAGE_DISMISSED) === '1';
    } catch (e) {
      return false;
    }
  }

  function setDismissed() {
    writeSession(STORAGE_DISMISSED, '1');
  }

  function isCollapsedPref() {
    try {
      var v = sessionStorage.getItem(STORAGE_COLLAPSED);
      if (v === null) return true; // por defeito compacta
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function setCollapsedPref(collapsed) {
    writeSession(STORAGE_COLLAPSED, collapsed ? '1' : '0');
  }

  function svg(paths) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      paths +
      '</svg>'
    );
  }

  var ICONS = {
    prev: svg('<path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>'),
    play: svg('<path d="M8 5v14l11-7z"/>'),
    pause: svg('<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>'),
    next: svg('<path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/>'),
    mute: svg(
      '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5zm11.66 7.34 1.41-1.41L15.41 12l2.66-2.93-1.41-1.41L14 10.59l-2.66-2.93-1.41 1.41L12.59 12l-2.66 2.93 1.41 1.41L14 13.41l2.66 2.93z"/>'
    ),
    unmute: svg(
      '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'
    ),
    radio: svg(
      '<path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"/>'
    ),
    close: svg('<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'),
    expand: svg('<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>')
  };

  function mount(tracks, meta) {
    if (!tracks.length) return;
    meta = meta || {};

    var unloading = false;
    var root = document.createElement('div');
    root.id = 'budganja-radio';
    root.className = 'radio-mini';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', meta.label || 'Rádio BudGanja');

    root.innerHTML =
      '<button type="button" class="radio-mini-fab" data-radio-fab aria-label="Abrir rádio">' +
      ICONS.radio +
      '<span class="radio-mini-fab-dot" aria-hidden="true"></span>' +
      '</button>' +
      '<div class="radio-mini-panel">' +
      '<div class="radio-mini-meta">' +
      '<a class="radio-mini-label" href="/radio/" data-radio-home>Rádio</a>' +
      '<span class="radio-mini-title" data-radio-title>—</span>' +
      '<span class="radio-mini-artist" data-radio-artist></span>' +
      '</div>' +
      '<div class="radio-mini-controls">' +
      '<button type="button" class="radio-mini-btn" data-radio-prev aria-label="Faixa anterior">' +
      ICONS.prev +
      '</button>' +
      '<button type="button" class="radio-mini-btn radio-mini-btn-play" data-radio-play aria-label="Reproduzir">' +
      ICONS.play +
      '</button>' +
      '<button type="button" class="radio-mini-btn" data-radio-next aria-label="Faixa seguinte">' +
      ICONS.next +
      '</button>' +
      '<button type="button" class="radio-mini-btn" data-radio-mute aria-label="Silenciar">' +
      ICONS.unmute +
      '</button>' +
      '<button type="button" class="radio-mini-btn" data-radio-collapse aria-label="Minimizar">' +
      ICONS.expand +
      '</button>' +
      '<button type="button" class="radio-mini-btn radio-mini-btn-close" data-radio-close aria-label="Fechar rádio nesta sessão">' +
      ICONS.close +
      '</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(root);

    var titleEl = root.querySelector('[data-radio-title]');
    var artistEl = root.querySelector('[data-radio-artist]');
    var homeLink = root.querySelector('[data-radio-home]');
    var btnFab = root.querySelector('[data-radio-fab]');
    if (homeLink && meta.label) homeLink.textContent = meta.label;
    if (homeLink && meta.homeHref) homeLink.setAttribute('href', meta.homeHref);
    var btnPrev = root.querySelector('[data-radio-prev]');
    var btnPlay = root.querySelector('[data-radio-play]');
    var btnNext = root.querySelector('[data-radio-next]');
    var btnMute = root.querySelector('[data-radio-mute]');
    var btnCollapse = root.querySelector('[data-radio-collapse]');
    var btnClose = root.querySelector('[data-radio-close]');

    var audio = new Audio();
    audio.preload = 'metadata';
    audio.muted = readMuted();

    var index = Math.max(0, Math.min(tracks.length - 1, readInt(STORAGE_INDEX, 0)));
    var wantPlay = sessionStorage.getItem(STORAGE_PLAYING) === '1';
    var savedTime = Math.max(0, readFloat(STORAGE_TIME, 0));
    var collapsed = isFocusPage() || isCollapsedPref();

    function applyCollapsed() {
      root.classList.toggle('is-collapsed', collapsed);
      btnFab.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btnFab.setAttribute('aria-label', collapsed ? (wantPlay || !audio.paused ? 'Expandir rádio (a tocar)' : 'Abrir rádio') : 'Rádio aberta');
    }

    function updateMuteUi() {
      btnMute.innerHTML = audio.muted ? ICONS.mute : ICONS.unmute;
      btnMute.setAttribute('aria-label', audio.muted ? 'Ativar som' : 'Silenciar');
      btnMute.classList.toggle('is-muted', audio.muted);
    }

    function updatePlayUi(playing) {
      btnPlay.innerHTML = playing ? ICONS.pause : ICONS.play;
      btnPlay.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
      root.classList.toggle('is-playing', playing);
      applyCollapsed();
    }

    function persistProgress() {
      if (unloading) return;
      writeSession(STORAGE_INDEX, index);
      try {
        if (Number.isFinite(audio.currentTime) && audio.currentTime > 0) {
          writeSession(STORAGE_TIME, audio.currentTime);
        }
      } catch (e) { /* ignore */ }
    }

    function updateMediaSession(track) {
      if (!('mediaSession' in navigator) || !track) return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title || 'Rádio BudGanja',
          artist: track.artist || 'Inspetor BudGanja',
          album: 'Rádio BudGanja',
          artwork: [
            { src: '/imagens/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/imagens/icon-512.png', sizes: '512x512', type: 'image/png' }
          ]
        });
        navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
      } catch (e) { /* ignore */ }
    }

    function loadTrack(i, autoplay, seekTo) {
      index = ((i % tracks.length) + tracks.length) % tracks.length;
      var track = tracks[index];
      audio.src = track.url;
      titleEl.textContent = track.title || 'Faixa';
      artistEl.textContent = track.artist || '';
      writeSession(STORAGE_INDEX, index);
      if (seekTo != null && seekTo > 0) {
        var onMeta = function () {
          audio.removeEventListener('loadedmetadata', onMeta);
          try {
            if (seekTo < (audio.duration || Infinity) - 1) audio.currentTime = seekTo;
          } catch (e) { /* ignore */ }
        };
        audio.addEventListener('loadedmetadata', onMeta);
      } else {
        writeSession(STORAGE_TIME, '0');
      }
      updateMediaSession(track);
      if (autoplay) {
        audio.play().then(function () {
          updatePlayUi(true);
          writeSession(STORAGE_PLAYING, '1');
          wantPlay = true;
          updateMediaSession(track);
        }).catch(function () {
          updatePlayUi(false);
          writeSession(STORAGE_PLAYING, '0');
          wantPlay = false;
        });
      } else {
        updatePlayUi(false);
      }
    }

    btnFab.addEventListener('click', function () {
      collapsed = false;
      setCollapsedPref(false);
      applyCollapsed();
    });

    btnCollapse.addEventListener('click', function () {
      collapsed = true;
      setCollapsedPref(true);
      applyCollapsed();
    });

    btnClose.addEventListener('click', function () {
      unloading = true;
      audio.pause();
      writeSession(STORAGE_PLAYING, '0');
      setDismissed();
      root.remove();
    });

    btnPlay.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          updatePlayUi(true);
          writeSession(STORAGE_PLAYING, '1');
          wantPlay = true;
          updateMediaSession(tracks[index]);
        }).catch(function () {
          updatePlayUi(false);
        });
      } else {
        audio.pause();
        updatePlayUi(false);
        writeSession(STORAGE_PLAYING, '0');
        wantPlay = false;
        persistProgress();
      }
    });

    btnPrev.addEventListener('click', function () {
      writeSession(STORAGE_TIME, '0');
      loadTrack(index - 1, !audio.paused || wantPlay, 0);
    });

    btnNext.addEventListener('click', function () {
      writeSession(STORAGE_TIME, '0');
      loadTrack(index + 1, !audio.paused || wantPlay, 0);
    });

    btnMute.addEventListener('click', function () {
      audio.muted = !audio.muted;
      writeMuted(audio.muted);
      updateMuteUi();
    });

    audio.addEventListener('ended', function () {
      writeSession(STORAGE_TIME, '0');
      loadTrack(index + 1, true, 0);
    });

    audio.addEventListener('play', function () {
      if (unloading) return;
      updatePlayUi(true);
      writeSession(STORAGE_PLAYING, '1');
      wantPlay = true;
      updateMediaSession(tracks[index]);
    });

    audio.addEventListener('pause', function () {
      // Navegação MPA: o unload dispara pause — não apagar o pedido de continuar.
      if (unloading || document.visibilityState === 'hidden') {
        persistProgress();
        return;
      }
      if (!audio.ended) {
        updatePlayUi(false);
        writeSession(STORAGE_PLAYING, '0');
        wantPlay = false;
        persistProgress();
        updateMediaSession(tracks[index]);
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (!audio.paused) persistProgress();
    });

    function markUnloading() {
      unloading = true;
      if (!audio.paused) {
        writeSession(STORAGE_PLAYING, '1');
        wantPlay = true;
      }
      persistProgress();
    }

    window.addEventListener('pagehide', markUnloading);
    window.addEventListener('beforeunload', markUnloading);

    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.setActionHandler('play', function () {
          audio.play();
        });
        navigator.mediaSession.setActionHandler('pause', function () {
          audio.pause();
        });
        navigator.mediaSession.setActionHandler('previoustrack', function () {
          writeSession(STORAGE_TIME, '0');
          loadTrack(index - 1, true, 0);
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
          writeSession(STORAGE_TIME, '0');
          loadTrack(index + 1, true, 0);
        });
      } catch (e) { /* ignore */ }
    }

    updateMuteUi();
    applyCollapsed();
    loadTrack(index, false, savedTime);

    // Retomar após navegação (gesto de play já feito neste separador).
    if (wantPlay) {
      audio.play().then(function () {
        updatePlayUi(true);
        updateMediaSession(tracks[index]);
      }).catch(function () {
        updatePlayUi(false);
        // Mantém wantPlay — browser pode bloquear até novo gesto; UI fica pausada.
      });
    }
  }

  function playlistMeta(data) {
    var source = (data && data.source) || 'catalog';
    var owner = data && data.owner;
    if (source === 'user' && owner && owner.username) {
      return {
        label: 'A tua rádio',
        homeHref: '/radio/?u=' + encodeURIComponent(owner.username),
        sourceKey: 'user:' + owner.username
      };
    }
    return {
      label: 'Rádio',
      homeHref: '/radio/',
      sourceKey: 'catalog'
    };
  }

  function fetchTracks() {
    return fetch(PLAYLIST_API, { credentials: 'include' })
      .then(function (res) {
        if (!res.ok) throw new Error('api ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var tracks = (data && data.tracks) || [];
        if (!tracks.length) throw new Error('empty');
        return { tracks: tracks, meta: playlistMeta(data) };
      })
      .catch(function () {
        return fetch(PLAYLIST_FALLBACK, { credentials: 'same-origin' })
          .then(function (res) {
            if (!res.ok) throw new Error('playlist ' + res.status);
            return res.json();
          })
          .then(function (data) {
            return {
              tracks: (data && data.tracks) || [],
              meta: { label: 'Rádio', homeHref: '/radio/', sourceKey: 'catalog' }
            };
          });
      });
  }

  function init() {
    if (isAdminPage()) return;
    if (isRadioPage()) return;
    if (isDismissed()) return;
    if (document.getElementById('budganja-radio')) return;

    fetchTracks()
      .then(function (result) {
        var tracks = result.tracks || [];
        if (!tracks.length) return;
        var meta = result.meta || {};
        try {
          var prevSource = sessionStorage.getItem(STORAGE_SOURCE) || '';
          if (prevSource && meta.sourceKey && prevSource !== meta.sourceKey) {
            writeSession(STORAGE_INDEX, '0');
            writeSession(STORAGE_TIME, '0');
          }
          if (meta.sourceKey) writeSession(STORAGE_SOURCE, meta.sourceKey);
        } catch (e) { /* ignore */ }
        mount(tracks, meta);
      })
      .catch(function () {
        /* playlist ausente — silencioso */
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
