'use strict';

/**
 * Media Session API — notificação do sistema, ecrã de bloqueio e controlos Bluetooth
 * (AVRCP: play/pause/prev/next/seek), no estilo Spotify.
 */
(function (global) {
  // URLs com .v{N}. — evita o oval verde antigo em /imagens/icon-192.png (cache CDN).
  var ICON_V = '310';

  function artworkList() {
    var origin = (global.location && global.location.origin) || '';
    var v = (typeof ASSET_V !== 'undefined' && ASSET_V) ? String(ASSET_V) : ICON_V;
    return [
      { src: origin + '/imagens/icon-192.v' + v + '.png', sizes: '192x192', type: 'image/png' },
      { src: origin + '/imagens/icon-512.v' + v + '.png', sizes: '512x512', type: 'image/png' },
      { src: origin + '/imagens/app-icon.v' + v + '.png', sizes: '512x512', type: 'image/png' }
    ];
  }

  function updateMetadata(audio, track, albumLabel) {
    if (!('mediaSession' in navigator) || !track || !audio) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title || 'Rádio BudGanja',
        artist: track.artist || 'Inspetor BudGanja',
        album: albumLabel || 'Rádio BudGanja',
        artwork: artworkList()
      });
      navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
    } catch (e) { /* ignore */ }
  }

  function updatePosition(audio) {
    if (!('mediaSession' in navigator) || !audio) return;
    try {
      var dur = audio.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      var pos = audio.currentTime;
      if (!Number.isFinite(pos) || pos < 0) pos = 0;
      if (pos > dur) pos = dur;
      navigator.mediaSession.setPositionState({
        duration: dur,
        playbackRate: audio.playbackRate || 1,
        position: pos
      });
    } catch (e) { /* ignore */ }
  }

  /**
   * @param {HTMLAudioElement} audio
   * @param {{
   *   getTrack: function(): object|null,
   *   play: function(): void,
   *   pause: function(): void,
   *   prev: function(): void,
   *   next: function(): void,
   *   album?: string
   * }} opts
   */
  function bind(audio, opts) {
    if (!('mediaSession' in navigator) || !audio || !opts) {
      return function noop() {};
    }

    function refresh() {
      updateMetadata(audio, opts.getTrack && opts.getTrack(), opts.album);
      updatePosition(audio);
    }

    function seekBy(offset) {
      try {
        var dur = Number.isFinite(audio.duration) ? audio.duration : Infinity;
        var next = (audio.currentTime || 0) + offset;
        if (next < 0) next = 0;
        if (next > dur) next = dur;
        audio.currentTime = next;
        updatePosition(audio);
      } catch (e) { /* ignore */ }
    }

    try {
      navigator.mediaSession.setActionHandler('play', function () {
        if (typeof opts.play === 'function') opts.play();
        else audio.play();
      });
      navigator.mediaSession.setActionHandler('pause', function () {
        if (typeof opts.pause === 'function') opts.pause();
        else audio.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', function () {
        if (typeof opts.prev === 'function') opts.prev();
      });
      navigator.mediaSession.setActionHandler('nexttrack', function () {
        if (typeof opts.next === 'function') opts.next();
      });
      navigator.mediaSession.setActionHandler('seekbackward', function (details) {
        seekBy(-(details && details.seekOffset ? details.seekOffset : 10));
      });
      navigator.mediaSession.setActionHandler('seekforward', function (details) {
        seekBy(details && details.seekOffset ? details.seekOffset : 10);
      });
      navigator.mediaSession.setActionHandler('seekto', function (details) {
        if (!details || details.seekTime == null) return;
        try {
          audio.currentTime = details.seekTime;
          updatePosition(audio);
        } catch (e) { /* ignore */ }
      });
      navigator.mediaSession.setActionHandler('stop', function () {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) { /* ignore */ }
        if (typeof opts.pause === 'function') opts.pause();
        refresh();
      });
    } catch (e) { /* ignore */ }

    var lastPosAt = 0;
    audio.addEventListener('timeupdate', function () {
      var now = Date.now();
      if (now - lastPosAt < 800) return;
      lastPosAt = now;
      updatePosition(audio);
    });
    audio.addEventListener('durationchange', function () {
      updatePosition(audio);
    });
    audio.addEventListener('ratechange', function () {
      updatePosition(audio);
    });
    audio.addEventListener('play', refresh);
    audio.addEventListener('pause', refresh);
    audio.addEventListener('ended', refresh);

    return refresh;
  }

  var PRODUCTION_ORIGIN = 'https://inspetorbudganja.com.br';
  // JPEG 1200×630 leve — o hero PNG (~10MB) falha no preview do WhatsApp.
  var SHARE_COVER_PATH = '/imagens/og-radio.jpg';

  function shareOrigin() {
    var host = (global.location && global.location.hostname) || '';
    if (/localhost|127\.0\.0\.1/i.test(host)) return PRODUCTION_ORIGIN;
    return (global.location && global.location.origin) || PRODUCTION_ORIGIN;
  }

  function buildTrackShareUrl(track) {
    var url = shareOrigin() + '/radio/';
    if (track && track.id) url += '?t=' + encodeURIComponent(String(track.id));
    return url;
  }

  function buildRadioShareUrl() {
    return shareOrigin() + '/radio/';
  }

  function shareCoverUrl() {
    var origin = (global.location && global.location.origin) || shareOrigin();
    return origin + SHARE_COVER_PATH;
  }

  function fetchShareCoverFile() {
    return fetch(shareCoverUrl(), { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('cover ' + res.status);
        return res.blob();
      })
      .then(function (blob) {
        if (!blob || !blob.type || blob.type.indexOf('image/') !== 0) return null;
        try {
          return new File([blob], 'budganja-radio.jpg', { type: blob.type || 'image/jpeg' });
        } catch (e) {
          blob.name = 'budganja-radio.jpg';
          return blob;
        }
      })
      .catch(function () {
        return null;
      });
  }

  function canShareFiles(files) {
    if (!files || !files.length || typeof navigator.canShare !== 'function') return false;
    try {
      return navigator.canShare({ files: files });
    } catch (e) {
      return false;
    }
  }

  function doShare(payload) {
    if (typeof navigator.share !== 'function') {
      return copyShareUrl(payload.url, payload.text);
    }
    var withFiles = payload;
    return navigator.share(withFiles).then(function () {
      return 'shared';
    }).catch(function (err) {
      if (err && err.name === 'AbortError') return 'shared';
      if (withFiles.files) {
        var bare = { title: payload.title, text: payload.text, url: payload.url };
        return navigator.share(bare).then(function () {
          return 'shared';
        }).catch(function (err2) {
          if (err2 && err2.name === 'AbortError') return 'shared';
          return copyShareUrl(payload.url, payload.text);
        });
      }
      return copyShareUrl(payload.url, payload.text);
    });
  }

  /**
   * Partilha a faixa atual (Web Share API + capa do site, ou copiar link).
   * @returns {Promise<'shared'|'copied'|'fallback'>}
   */
  function shareTrack(track, opts) {
    opts = opts || {};
    if (!track) return Promise.reject(new Error('no track'));
    var title = track.title || 'Rádio BudGanja';
    var artist = track.artist || '';
    var line = artist ? title + ' — ' + artist : title;
    var shareUrl = buildTrackShareUrl(track);

    return fetchShareCoverFile().then(function (file) {
      var files = file && canShareFiles([file]) ? [file] : null;
      var payload = {
        title: title + ' | BudGanja Radio',
        // URL só em `url` — evita link duplicado no WhatsApp / Web Share.
        text: 'A ouvir na BudGanja Radio: ' + line,
        url: shareUrl
      };
      if (files) payload.files = files;
      return doShare(payload);
    });
  }

  /**
   * Partilha a rádio do laboratório com a mesma capa da home.
   * @returns {Promise<'shared'|'copied'|'fallback'>}
   */
  function shareRadio() {
    var shareUrl = buildRadioShareUrl();
    var title = 'BudGanja Radio | Inspetor BudGanja';
    var text = 'Ouça a BudGanja Radio — playlist do laboratório Inspetor BudGanja.';

    return fetchShareCoverFile().then(function (file) {
      var files = file && canShareFiles([file]) ? [file] : null;
      var payload = { title: title, text: text, url: shareUrl };
      if (files) payload.files = files;
      return doShare(payload);
    });
  }

  function copyShareUrl(shareUrl, fallbackText) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(shareUrl).then(function () {
        return 'copied';
      }).catch(function () {
        return fallbackPrompt(shareUrl, fallbackText);
      });
    }
    return Promise.resolve(fallbackPrompt(shareUrl, fallbackText));
  }

  function fallbackPrompt(shareUrl, fallbackText) {
    try {
      if (global.prompt) global.prompt(fallbackText || 'Copiar link:', shareUrl);
    } catch (e) { /* ignore */ }
    return 'fallback';
  }

  global.BudGanjaRadioMedia = {
    artworkList: artworkList,
    updateMetadata: updateMetadata,
    updatePosition: updatePosition,
    bind: bind,
    buildTrackShareUrl: buildTrackShareUrl,
    buildRadioShareUrl: buildRadioShareUrl,
    shareTrack: shareTrack,
    shareRadio: shareRadio
  };
})(typeof window !== 'undefined' ? window : globalThis);
