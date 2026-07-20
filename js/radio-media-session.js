'use strict';

/**
 * Media Session API — notificação do sistema, ecrã de bloqueio e controlos Bluetooth
 * (AVRCP: play/pause/prev/next/seek), no estilo Spotify.
 */
(function (global) {
  // URLs com .v{N}. — evita o oval verde antigo em /imagens/icon-192.png (cache CDN).
  var ICON_V = '289';

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

  function buildTrackShareUrl(track, username) {
    var origin = (global.location && global.location.origin) || '';
    var url = origin + '/radio/?';
    var parts = [];
    if (username) parts.push('u=' + encodeURIComponent(String(username)));
    if (track && track.id) parts.push('t=' + encodeURIComponent(String(track.id)));
    return url + parts.join('&');
  }

  /**
   * Partilha a faixa atual (Web Share API ou copiar link).
   * @returns {Promise<'shared'|'copied'|'fallback'>}
   */
  function shareTrack(track, opts) {
    opts = opts || {};
    if (!track) return Promise.reject(new Error('no track'));
    var title = track.title || 'Rádio BudGanja';
    var artist = track.artist || '';
    var line = artist ? title + ' — ' + artist : title;
    var shareUrl = buildTrackShareUrl(track, opts.username);
    var payload = {
      title: title + ' | BudGanja Radio',
      text: 'A ouvir na Rádio BudGanja: ' + line,
      url: shareUrl
    };

    if (typeof navigator.share === 'function') {
      return navigator.share(payload).then(function () {
        return 'shared';
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return 'shared';
        return copyShareUrl(shareUrl, payload.text);
      });
    }
    return copyShareUrl(shareUrl, payload.text);
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
    shareTrack: shareTrack
  };
})(typeof window !== 'undefined' ? window : globalThis);
