'use strict';

/**
 * Faixas YouTube oficiais na BudGanja Radio (áudio público permitido).
 * A rádio local continua em <audio>; estas faixas usam a IFrame API.
 */
(function (w) {
  var player = null;
  var host = null;
  var onEnded = null;
  var readyQueue = [];
  var apiRequested = false;
  var activeId = '';
  var wantPlay = false;
  var muted = false;

  function idFromUrl(url) {
    var s = String(url || '');
    var m = s.match(/[?&]v=([A-Za-z0-9_-]{11})/) || s.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) || s.match(/embed\/([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
  }

  function isYoutube(url) {
    return !!idFromUrl(url);
  }

  function ensureInner() {
    if (document.getElementById('radio-yt-player')) return;
    var inner = document.createElement('div');
    inner.id = 'radio-yt-player';
    host.appendChild(inner);
  }

  function ensureHost() {
    if (host && document.body.contains(host)) {
      ensureInner();
      return host;
    }
    host = document.getElementById('radio-yt-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'radio-yt-host';
      var disc = document.getElementById('radio-disc');
      if (disc) {
        host.className = 'radio-yt-host';
        disc.appendChild(host);
      } else {
        host.className = 'radio-yt-host radio-yt-host--mini';
        document.body.appendChild(host);
      }
    }
    ensureInner();
    return host;
  }

  function applyMute() {
    if (!player) return;
    if (muted && player.mute) player.mute();
    else if (!muted && player.unMute) player.unMute();
  }

  function whenApi(cb) {
    if (w.YT && w.YT.Player) {
      cb();
      return;
    }
    readyQueue.push(cb);
    if (apiRequested) return;
    apiRequested = true;
    var prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') prev();
      var q = readyQueue.slice();
      readyQueue = [];
      q.forEach(function (fn) {
        fn();
      });
    };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
  }

  function load(id, autoplay, endedCb) {
    activeId = id;
    wantPlay = !!autoplay;
    onEnded = endedCb || null;
    ensureHost();
    host.hidden = false;
    whenApi(function () {
      if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById(id);
        applyMute();
        if (wantPlay) player.playVideo();
        else player.pauseVideo();
        return;
      }
      player = new w.YT.Player('radio-yt-player', {
        width: 320,
        height: 180,
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: wantPlay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: w.location.origin
        },
        events: {
          onReady: function (e) {
            applyMute();
            if (wantPlay) e.target.playVideo();
          },
          onStateChange: function (e) {
            if (e.data === w.YT.PlayerState.ENDED && typeof onEnded === 'function') onEnded();
          }
        }
      });
    });
  }

  function play() {
    wantPlay = true;
    if (player && player.playVideo) player.playVideo();
  }

  function pause() {
    wantPlay = false;
    if (player && player.pauseVideo) player.pauseVideo();
  }

  function stop() {
    wantPlay = false;
    activeId = '';
    onEnded = null;
    if (player && player.stopVideo) player.stopVideo();
    if (host) host.hidden = true;
  }

  function isActive() {
    return !!activeId;
  }

  function isPaused() {
    if (!player || !player.getPlayerState || !w.YT) return true;
    var st = player.getPlayerState();
    return st !== w.YT.PlayerState.PLAYING && st !== w.YT.PlayerState.BUFFERING;
  }

  function getCurrentTime() {
    return player && player.getCurrentTime ? player.getCurrentTime() : 0;
  }

  function getDuration() {
    return player && player.getDuration ? player.getDuration() : 0;
  }

  function seekTo(sec) {
    if (player && player.seekTo) player.seekTo(sec, true);
  }

  function setMuted(next) {
    muted = !!next;
    applyMute();
  }

  w.BudGanjaRadioYoutube = {
    idFromUrl: idFromUrl,
    isYoutube: isYoutube,
    load: load,
    play: play,
    pause: pause,
    stop: stop,
    isActive: isActive,
    isPaused: isPaused,
    getCurrentTime: getCurrentTime,
    getDuration: getDuration,
    seekTo: seekTo,
    setMuted: setMuted
  };
})(window);
