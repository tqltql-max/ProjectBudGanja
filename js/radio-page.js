'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.getElementById('radio-page-title');
  const subtitleEl = document.getElementById('radio-page-subtitle');
  const ownerEl = document.getElementById('radio-page-owner');
  const shareBtn = document.getElementById('radio-share-btn');
  const statusEl = document.getElementById('radio-page-status');
  const listEl = document.getElementById('radio-tracklist');
  const countEl = document.getElementById('radio-track-count');
  const stageEl = document.getElementById('radio-stage');
  const nowTitle = document.getElementById('radio-now-title');
  const nowArtist = document.getElementById('radio-now-artist');
  const seekEl = document.getElementById('radio-seek');
  const timeCurrent = document.getElementById('radio-time-current');
  const timeDuration = document.getElementById('radio-time-duration');
  const btnPrev = document.getElementById('radio-prev');
  const btnPlay = document.getElementById('radio-play');
  const btnNext = document.getElementById('radio-next');
  const shareTrackBtn = document.getElementById('radio-share-track-btn');
  const shareSheet = document.getElementById('radio-share-sheet');
  const shareHeading = document.getElementById('radio-share-heading');
  const shareSub = document.getElementById('radio-share-sub');
  const shareUrlEl = document.getElementById('radio-share-url');
  const shareWa = document.getElementById('radio-share-wa');
  const shareNative = document.getElementById('radio-share-native');
  const shareCopy = document.getElementById('radio-share-copy');
  const shareToast = document.getElementById('radio-share-toast');
  const orderResetBtn = document.getElementById('radio-order-reset');

  const params = new URLSearchParams(window.location.search || '');
  const trackParam = String(params.get('t') || params.get('track') || '').trim();
  const SHARE_ICON =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.96 9.81A2.99 2.99 0 0 0 6 9.09c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.12 4.16c-.05.21-.08.43-.08.61 0 1.61 1.31 2.91 2.92 2.91s2.92-1.3 2.92-2.91-1.31-2.91-2.92-2.91z"/></svg>';
  const HANDLE_ICON =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9 5h2v2H9V5zm4 0h2v2h-2V5zM9 11h2v2H9v-2zm4 0h2v2h-2v-2zM9 17h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>';

  let catalogTracks = [];
  let tracks = [];
  let index = 0;
  let seeking = false;
  let sharePayload = null;
  let toastTimer = null;
  let lastFocusEl = null;
  let dragState = null;
  const audio = new Audio();
  audio.preload = 'metadata';
  const Order = window.BudGanjaRadioOrder || null;

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('is-error', !!isError);
  }

  function showToast(msg) {
    if (!shareToast || !msg) return;
    shareToast.hidden = false;
    shareToast.classList.remove('is-out');
    shareToast.textContent = msg;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      shareToast.classList.add('is-out');
      setTimeout(() => {
        shareToast.hidden = true;
        shareToast.classList.remove('is-out');
        shareToast.textContent = '';
      }, 220);
    }, 2200);
  }

  function buildSharePayload(mode, track) {
    const media = window.BudGanjaRadioMedia;
    if (mode === 'track' && track) {
      const title = track.title || 'Faixa';
      const artist = track.artist || 'Inspetor BudGanja';
      const url = media && typeof media.buildTrackShareUrl === 'function'
        ? media.buildTrackShareUrl(track)
        : (window.location.origin + '/radio/?t=' + encodeURIComponent(track.id || ''));
      const line = artist ? title + ' — ' + artist : title;
      return {
        mode: 'track',
        track: track,
        heading: title,
        sub: artist,
        url: url,
        text: 'A ouvir na BudGanja Radio: ' + line + '\n' + url,
        title: title + ' | BudGanja Radio'
      };
    }
    const url = media && typeof media.buildRadioShareUrl === 'function'
      ? media.buildRadioShareUrl()
      : (window.location.origin + '/radio/');
    return {
      mode: 'radio',
      track: null,
      heading: 'Playlist do laboratório',
      sub: 'Inspetor BudGanja',
      url: url,
      text: 'Ouça a BudGanja Radio — playlist do laboratório Inspetor BudGanja.\n' + url,
      title: 'BudGanja Radio | Inspetor BudGanja'
    };
  }

  function closeShareSheet() {
    if (!shareSheet || shareSheet.hidden) return;
    shareSheet.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusEl && typeof lastFocusEl.focus === 'function') {
      try { lastFocusEl.focus(); } catch (e) { /* ignore */ }
    }
    lastFocusEl = null;
  }

  function openShareSheet(mode, track) {
    if (!shareSheet) return;
    sharePayload = buildSharePayload(mode, track);
    lastFocusEl = document.activeElement;
    if (shareHeading) shareHeading.textContent = sharePayload.heading;
    if (shareSub) shareSub.textContent = sharePayload.sub;
    if (shareUrlEl) shareUrlEl.textContent = sharePayload.url;
    if (shareWa) {
      shareWa.href = whatsAppShareUrl(sharePayload.text);
    }
    if (shareNative) {
      shareNative.hidden = typeof navigator.share !== 'function';
    }
    shareSheet.hidden = false;
    document.body.style.overflow = 'hidden';
    const focusTarget = shareNative && !shareNative.hidden ? shareNative : shareCopy;
    if (focusTarget) focusTarget.focus();
  }

  function whatsAppShareUrl(text) {
    return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(String(text || ''));
  }

  function openWhatsAppShare() {
    if (!sharePayload) return;
    const url = whatsAppShareUrl(sharePayload.text);
    if (shareWa) shareWa.href = url;
    showToast('A abrir WhatsApp…');
    closeShareSheet();
    // Mobile / PWA: navegação directa abre a app com mais fiabilidade.
    // Desktop: nova aba (WhatsApp Web); se o popup for bloqueado, mesma janela.
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
    if (isMobile) {
      window.location.assign(url);
      return;
    }
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) window.location.assign(url);
  }

  async function copyShareLink() {
    if (!sharePayload) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(sharePayload.url);
      } else {
        throw new Error('no clipboard');
      }
      showToast('Link copiado!');
      closeShareSheet();
    } catch (e) {
      if (shareUrlEl) {
        try {
          const range = document.createRange();
          range.selectNodeContents(shareUrlEl);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (e2) { /* ignore */ }
      }
      showToast('Copie o link abaixo');
    }
  }

  async function nativeShareFromSheet() {
    if (!sharePayload) return;
    const media = window.BudGanjaRadioMedia;
    try {
      let result = 'shared';
      if (sharePayload.mode === 'track' && sharePayload.track && media && typeof media.shareTrack === 'function') {
        result = await media.shareTrack(sharePayload.track);
      } else if (media && typeof media.shareRadio === 'function') {
        result = await media.shareRadio();
      } else {
        await navigator.share({
          title: sharePayload.title,
          text: sharePayload.text,
          url: sharePayload.url
        });
      }
      if (result === 'copied' || result === 'fallback') showToast('Link copiado!');
      else showToast('Partilha pronta!');
      closeShareSheet();
    } catch (e) {
      if (e && e.name === 'AbortError') {
        closeShareSheet();
        return;
      }
      await copyShareLink();
    }
  }

  function setProgressPct(pct) {
    if (!seekEl) return;
    const clamped = Math.max(0, Math.min(100, Number(pct) || 0));
    seekEl.style.setProperty('--radio-progress', clamped + '%');
  }

  function updatePlayUi(playing) {
    const on = !!playing;
    if (stageEl) stageEl.classList.toggle('is-playing', on);
    if (btnPlay) {
      btnPlay.classList.toggle('is-on', on);
      btnPlay.setAttribute('aria-label', on ? 'Pausar' : 'Reproduzir');
      btnPlay.setAttribute('aria-pressed', on ? 'true' : 'false');
      // SVG + atributo hidden é pouco fiável com CSS global — preferir classe no botão.
      const iconPlay = btnPlay.querySelector('.radio-icon-play');
      const iconPause = btnPlay.querySelector('.radio-icon-pause');
      if (iconPlay) {
        iconPlay.toggleAttribute('hidden', on);
        iconPlay.setAttribute('aria-hidden', 'true');
      }
      if (iconPause) {
        iconPause.toggleAttribute('hidden', !on);
        iconPause.setAttribute('aria-hidden', 'true');
      }
    }
  }

  function highlightActive() {
    if (!listEl) return;
    listEl.querySelectorAll('.radio-track').forEach((li) => {
      const i = Number(li.getAttribute('data-index'));
      li.classList.toggle('is-active', i === index);
    });
  }

  function refreshMediaSession() {
    if (!window.BudGanjaRadioMedia || !tracks[index]) return;
    window.BudGanjaRadioMedia.updateMetadata(
      audio,
      tracks[index],
      (titleEl && titleEl.textContent) || 'Rádio BudGanja'
    );
    window.BudGanjaRadioMedia.updatePosition(audio);
  }

  function loadTrack(i, autoplay) {
    if (!tracks.length) return;
    index = ((i % tracks.length) + tracks.length) % tracks.length;
    const track = tracks[index];
    audio.src = track.url;
    if (nowTitle) nowTitle.textContent = track.title || 'Faixa';
    if (nowArtist) nowArtist.textContent = track.artist || '';
    setProgressPct(0);
    if (timeCurrent) timeCurrent.textContent = '0:00';
    if (timeDuration) timeDuration.textContent = '0:00';
    highlightActive();
    refreshMediaSession();
    if (autoplay) {
      audio.play().then(() => {
        updatePlayUi(true);
        refreshMediaSession();
      }).catch(() => {
        updatePlayUi(false);
        setStatus('Toque em Reproduzir para começar.', false);
      });
    } else {
      updatePlayUi(false);
    }
  }

  function currentTrackId() {
    return tracks[index] && tracks[index].id != null ? String(tracks[index].id) : '';
  }

  function syncIndexToTrackId(trackId) {
    if (!trackId) return;
    const found = tracks.findIndex((t) => t && String(t.id) === trackId);
    if (found >= 0) index = found;
  }

  function persistOrder() {
    if (!Order) return;
    Order.writeOrderIds(Order.idsFromTracks(tracks));
    updateOrderResetUi();
  }

  function updateOrderResetUi() {
    if (!orderResetBtn || !Order) return;
    const custom = Order.isCustomOrder(catalogTracks, tracks);
    orderResetBtn.hidden = !custom;
  }

  function syncTracksFromDom() {
    if (!listEl) return;
    const ids = Array.from(listEl.querySelectorAll('.radio-track[data-id]'))
      .map((li) => li.getAttribute('data-id'))
      .filter(Boolean);
    if (!ids.length) return;
    const byId = Object.create(null);
    tracks.forEach((t) => {
      if (t && t.id != null) byId[String(t.id)] = t;
    });
    const next = [];
    ids.forEach((id) => {
      if (byId[id]) next.push(byId[id]);
    });
    if (next.length !== tracks.length) return;
    const playingId = currentTrackId();
    tracks = next;
    syncIndexToTrackId(playingId);
    listEl.querySelectorAll('.radio-track').forEach((li, i) => {
      li.setAttribute('data-index', String(i));
      const num = li.querySelector('.radio-track-num');
      if (num) num.textContent = String(i + 1);
      const share = li.querySelector('.radio-track-share');
      if (share) share.setAttribute('data-share-index', String(i));
    });
    persistOrder();
    highlightActive();
  }

  function bindDragReorder() {
    if (!listEl) return;
    listEl.querySelectorAll('.radio-track-handle').forEach((handle) => {
      handle.addEventListener('pointerdown', (ev) => {
        if (ev.button != null && ev.button !== 0) return;
        const li = handle.closest('.radio-track');
        if (!li) return;
        dragState = {
          li: li,
          pointerId: ev.pointerId,
          moved: false
        };
        li.classList.add('is-dragging');
        listEl.classList.add('is-reordering');
        try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
        ev.preventDefault();
      });

      handle.addEventListener('pointermove', (ev) => {
        if (!dragState || dragState.pointerId !== ev.pointerId) return;
        dragState.moved = true;
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const over = el && el.closest('.radio-track');
        if (!over || over === dragState.li || !listEl.contains(over)) return;
        const rect = over.getBoundingClientRect();
        const before = ev.clientY < rect.top + rect.height / 2;
        if (before) listEl.insertBefore(dragState.li, over);
        else listEl.insertBefore(dragState.li, over.nextSibling);
      });

      function endDrag(ev) {
        if (!dragState || dragState.pointerId !== ev.pointerId) return;
        const moved = dragState.moved;
        dragState.li.classList.remove('is-dragging');
        listEl.classList.remove('is-reordering');
        try { handle.releasePointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
        dragState = null;
        if (moved) {
          syncTracksFromDom();
          showToast('Ordem da playlist actualizada');
        }
      }

      handle.addEventListener('pointerup', endDrag);
      handle.addEventListener('pointercancel', endDrag);
    });
  }

  function renderList() {
    if (!listEl) return;
    if (countEl) {
      countEl.textContent = tracks.length
        ? tracks.length + (tracks.length === 1 ? ' faixa' : ' faixas')
        : '';
    }
    updateOrderResetUi();
    if (!tracks.length) {
      listEl.innerHTML = '<li class="field-hint">Ainda não há faixas no catálogo.</li>';
      return;
    }
    listEl.innerHTML = tracks.map((t, i) =>
      '<li class="radio-track" data-index="' + i + '" data-id="' + escapeHtml(t.id) + '">' +
      '<button type="button" class="radio-track-handle" aria-label="Arrastar para reordenar ' + escapeHtml(t.title) + '" title="Arrastar para reordenar">' +
      HANDLE_ICON +
      '</button>' +
      '<button type="button" class="radio-track-btn">' +
      '<span class="radio-track-num">' + (i + 1) + '</span>' +
      '<span class="radio-track-meta">' +
      '<strong>' + escapeHtml(t.title) + '</strong>' +
      '<span>' + escapeHtml(t.artist || '') + '</span>' +
      '</span>' +
      '<span class="radio-track-eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '</button>' +
      '<button type="button" class="radio-track-share" data-share-index="' + i + '" aria-label="Partilhar ' + escapeHtml(t.title) + '">' +
      SHARE_ICON +
      '</button>' +
      '</li>'
    ).join('');
    listEl.querySelectorAll('.radio-track-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const li = btn.closest('.radio-track');
        const i = Number(li && li.getAttribute('data-index'));
        if (Number.isFinite(i)) loadTrack(i, true);
      });
    });
    listEl.querySelectorAll('.radio-track-share').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const i = Number(btn.getAttribute('data-share-index'));
        if (Number.isFinite(i) && tracks[i]) openShareSheet('track', tracks[i]);
      });
    });
    bindDragReorder();
    highlightActive();
  }

  async function loadPlaylist() {
    setStatus('A carregar…');
    if (ownerEl) {
      ownerEl.hidden = true;
      ownerEl.textContent = '';
    }
    if (titleEl) titleEl.textContent = 'BudGanja Radio';
    if (subtitleEl) {
      subtitleEl.textContent = 'Playlist do laboratório — ouça e partilhe as faixas do Inspetor BudGanja.';
    }
    try {
      const res = await fetch('/api/radio/playlist', { credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus(data.error || 'Não foi possível carregar a rádio.', true);
        if (listEl) listEl.innerHTML = '<li class="field-hint">Playlist indisponível.</li>';
        return;
      }
      catalogTracks = Array.isArray(data.tracks) ? data.tracks.slice() : [];
      tracks = Order ? Order.applyOrder(catalogTracks) : catalogTracks.slice();
      renderList();
      if (tracks.length) {
        let startIndex = 0;
        if (trackParam) {
          const found = tracks.findIndex((t) => t && String(t.id) === trackParam);
          if (found >= 0) startIndex = found;
        }
        loadTrack(startIndex, !!trackParam);
        setStatus('');
      } else {
        setStatus('Ainda não há faixas no catálogo.', false);
      }
    } catch (e) {
      setStatus('Servidor indisponível.', true);
    }
  }

  if (orderResetBtn) {
    orderResetBtn.addEventListener('click', () => {
      if (!Order) return;
      const playingId = currentTrackId();
      const wasPlaying = stageEl && stageEl.classList.contains('is-playing');
      Order.clearOrder();
      tracks = catalogTracks.slice();
      syncIndexToTrackId(playingId);
      renderList();
      highlightActive();
      showToast('Ordem original restaurada');
      if (wasPlaying && tracks[index]) {
        // Mantém a faixa actual; só a sequência muda.
      }
    });
  }

  if (window.BudGanjaRadioMedia) {
    window.BudGanjaRadioMedia.bind(audio, {
      album: 'Rádio BudGanja',
      getTrack: () => tracks[index] || null,
      play: () => {
        if (!tracks.length) return;
        if (!audio.src) loadTrack(index, true);
        else {
          audio.play().then(() => {
            updatePlayUi(true);
            refreshMediaSession();
          }).catch(() => setStatus('Não foi possível reproduzir.', true));
        }
      },
      pause: () => {
        audio.pause();
        updatePlayUi(false);
        refreshMediaSession();
      },
      prev: () => loadTrack(index - 1, true),
      next: () => loadTrack(index + 1, true)
    });
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      if (!tracks.length) return;
      if (audio.paused) {
        if (!audio.src) loadTrack(index, true);
        else {
          audio.play().then(() => {
            updatePlayUi(true);
            refreshMediaSession();
          }).catch(() => setStatus('Não foi possível reproduzir.', true));
        }
      } else {
        audio.pause();
        updatePlayUi(false);
        refreshMediaSession();
      }
    });
  }
  if (btnPrev) btnPrev.addEventListener('click', () => loadTrack(index - 1, true));
  if (btnNext) btnNext.addEventListener('click', () => loadTrack(index + 1, true));

  if (shareBtn) {
    shareBtn.hidden = false;
    shareBtn.addEventListener('click', () => openShareSheet('radio'));
  }

  if (shareTrackBtn) {
    shareTrackBtn.addEventListener('click', () => {
      const track = tracks[index];
      if (!track) {
        showToast('Nenhuma faixa a tocar');
        return;
      }
      openShareSheet('track', track);
    });
  }

  if (shareSheet) {
    shareSheet.querySelectorAll('[data-radio-share-close]').forEach((el) => {
      el.addEventListener('click', closeShareSheet);
    });
  }
  if (shareCopy) shareCopy.addEventListener('click', () => { copyShareLink(); });
  if (shareNative) shareNative.addEventListener('click', () => { nativeShareFromSheet(); });
  if (shareWa) {
    shareWa.addEventListener('click', (ev) => {
      ev.preventDefault();
      openWhatsAppShare();
    });
  }
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeShareSheet();
  });

  audio.addEventListener('ended', () => loadTrack(index + 1, true));
  audio.addEventListener('play', () => {
    updatePlayUi(true);
    refreshMediaSession();
  });
  audio.addEventListener('pause', () => {
    if (!audio.ended) {
      updatePlayUi(false);
      refreshMediaSession();
    }
  });
  audio.addEventListener('timeupdate', () => {
    if (seeking) return;
    const d = audio.duration;
    const t = audio.currentTime;
    if (timeCurrent) timeCurrent.textContent = formatTime(t);
    if (timeDuration) timeDuration.textContent = formatTime(d);
    if (seekEl && Number.isFinite(d) && d > 0) {
      const pct = (t / d) * 100;
      seekEl.value = String(Math.round((t / d) * 1000));
      setProgressPct(pct);
    }
    if (window.BudGanjaRadioMedia) window.BudGanjaRadioMedia.updatePosition(audio);
  });
  function applySeekFromControl() {
    if (!seekEl) return false;
    const d = audio.duration;
    if (!Number.isFinite(d) || d <= 0) return false;
    const ratio = Math.max(0, Math.min(1, Number(seekEl.value) / 1000));
    const next = ratio * d;
    try {
      audio.currentTime = next;
    } catch (e) {
      return false;
    }
    if (timeCurrent) timeCurrent.textContent = formatTime(next);
    setProgressPct(ratio * 100);
    if (window.BudGanjaRadioMedia) window.BudGanjaRadioMedia.updatePosition(audio);
    return true;
  }

  function endSeek() {
    if (!seeking) return;
    applySeekFromControl();
    seeking = false;
  }

  if (seekEl) {
    seekEl.addEventListener('pointerdown', () => { seeking = true; });
    seekEl.addEventListener('input', () => {
      seeking = true;
      const d = audio.duration;
      const ratio = Math.max(0, Math.min(1, Number(seekEl.value) / 1000));
      setProgressPct(ratio * 100);
      if (Number.isFinite(d) && d > 0 && timeCurrent) {
        timeCurrent.textContent = formatTime(ratio * d);
      }
      // Seek em tempo real quando a duração já está disponível.
      if (Number.isFinite(d) && d > 0) {
        try { audio.currentTime = ratio * d; } catch (e) { /* ignore */ }
      }
    });
    seekEl.addEventListener('change', endSeek);
    seekEl.addEventListener('pointerup', endSeek);
    seekEl.addEventListener('pointercancel', endSeek);
    window.addEventListener('pointerup', endSeek);
  }

  updatePlayUi(false);
  setProgressPct(0);
  loadPlaylist();
});
