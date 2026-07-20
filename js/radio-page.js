'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.getElementById('radio-page-title');
  const subtitleEl = document.getElementById('radio-page-subtitle');
  const ownerEl = document.getElementById('radio-page-owner');
  const shareBtn = document.getElementById('radio-share-btn');
  const statusEl = document.getElementById('radio-page-status');
  const listEl = document.getElementById('radio-tracklist');
  const nowTitle = document.getElementById('radio-now-title');
  const nowArtist = document.getElementById('radio-now-artist');
  const seekEl = document.getElementById('radio-seek');
  const timeCurrent = document.getElementById('radio-time-current');
  const timeDuration = document.getElementById('radio-time-duration');
  const btnPrev = document.getElementById('radio-prev');
  const btnPlay = document.getElementById('radio-play');
  const btnNext = document.getElementById('radio-next');

  const params = new URLSearchParams(window.location.search || '');
  const usernameParam = String(params.get('u') || params.get('username') || '').trim();

  let tracks = [];
  let index = 0;
  let seeking = false;
  const audio = new Audio();
  audio.preload = 'metadata';

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

  function updatePlayUi(playing) {
    if (btnPlay) {
      btnPlay.textContent = playing ? 'Pausar' : 'Reproduzir';
      btnPlay.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
    }
  }

  function highlightActive() {
    if (!listEl) return;
    listEl.querySelectorAll('.radio-track').forEach((li) => {
      const i = Number(li.getAttribute('data-index'));
      li.classList.toggle('is-active', i === index);
    });
  }

  function loadTrack(i, autoplay) {
    if (!tracks.length) return;
    index = ((i % tracks.length) + tracks.length) % tracks.length;
    const track = tracks[index];
    audio.src = track.url;
    if (nowTitle) nowTitle.textContent = track.title || 'Faixa';
    if (nowArtist) nowArtist.textContent = track.artist || '';
    highlightActive();
    if (autoplay) {
      audio.play().then(() => updatePlayUi(true)).catch(() => {
        updatePlayUi(false);
        setStatus('Toque em Reproduzir para começar.', false);
      });
    } else {
      updatePlayUi(false);
    }
  }

  function renderList() {
    if (!listEl) return;
    if (!tracks.length) {
      listEl.innerHTML = '<li class="field-hint">Esta rádio ainda não tem faixas.</li>';
      return;
    }
    listEl.innerHTML = tracks.map((t, i) =>
      '<li class="radio-track" data-index="' + i + '">' +
      '<button type="button" class="radio-track-btn">' +
      '<span class="radio-track-num">' + (i + 1) + '</span>' +
      '<span class="radio-track-meta">' +
      '<strong>' + escapeHtml(t.title) + '</strong>' +
      '<span>' + escapeHtml(t.artist || '') + '</span>' +
      '</span>' +
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
    highlightActive();
  }

  async function loadPlaylist() {
    setStatus('A carregar…');
    const qs = usernameParam ? ('?u=' + encodeURIComponent(usernameParam)) : '';
    try {
      const res = await fetch('/api/radio/playlist' + qs, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus(data.error || 'Não foi possível carregar a rádio.', true);
        if (listEl) listEl.innerHTML = '<li class="field-hint">Playlist indisponível.</li>';
        return;
      }
      tracks = Array.isArray(data.tracks) ? data.tracks : [];
      if (usernameParam) {
        if (titleEl) titleEl.textContent = data.owner && data.owner.name
          ? ('Rádio de ' + data.owner.name)
          : 'Rádio partilhada';
        if (subtitleEl) {
          subtitleEl.textContent = tracks.length
            ? 'Playlist pessoal com até 5 faixas.'
            : 'Este cultivador ainda não montou a rádio.';
        }
        if (ownerEl && data.owner && data.owner.username) {
          ownerEl.hidden = false;
          ownerEl.textContent = '@' + data.owner.username;
        }
        if (shareBtn) {
          shareBtn.hidden = false;
          shareBtn.addEventListener('click', async () => {
            const url = window.location.origin + '/radio/?u=' + encodeURIComponent(usernameParam);
            try {
              await navigator.clipboard.writeText(url);
              setStatus('Link copiado.', false);
            } catch (e) {
              setStatus(url, false);
            }
          });
        }
      } else if (data.source === 'user' && data.owner) {
        if (titleEl) titleEl.textContent = 'A tua rádio';
        if (subtitleEl) {
          subtitleEl.textContent = 'A tocar a tua seleção. Também podes partilhar o link público.';
        }
        if (ownerEl && data.owner.username) {
          ownerEl.hidden = false;
          ownerEl.textContent = '@' + data.owner.username;
        }
        if (shareBtn && data.owner.username) {
          shareBtn.hidden = false;
          shareBtn.addEventListener('click', async () => {
            const url = window.location.origin + '/radio/?u=' + encodeURIComponent(data.owner.username);
            try {
              await navigator.clipboard.writeText(url);
              setStatus('Link da tua rádio copiado.', false);
            } catch (e) {
              setStatus(url, false);
            }
          });
        }
      }

      renderList();
      if (tracks.length) {
        loadTrack(0, false);
        setStatus('');
      } else {
        setStatus(usernameParam ? 'Rádio vazia.' : 'Ainda não há faixas no catálogo.', !!usernameParam);
      }
    } catch (e) {
      setStatus('Servidor indisponível.', true);
    }
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      if (!tracks.length) return;
      if (audio.paused) {
        if (!audio.src) loadTrack(index, true);
        else {
          audio.play().then(() => updatePlayUi(true)).catch(() => setStatus('Não foi possível reproduzir.', true));
        }
      } else {
        audio.pause();
        updatePlayUi(false);
      }
    });
  }
  if (btnPrev) btnPrev.addEventListener('click', () => loadTrack(index - 1, true));
  if (btnNext) btnNext.addEventListener('click', () => loadTrack(index + 1, true));

  audio.addEventListener('ended', () => loadTrack(index + 1, true));
  audio.addEventListener('play', () => updatePlayUi(true));
  audio.addEventListener('pause', () => {
    if (!audio.ended) updatePlayUi(false);
  });
  audio.addEventListener('timeupdate', () => {
    if (seeking) return;
    const dur = audio.duration || 0;
    if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
    if (timeDuration) timeDuration.textContent = formatTime(dur);
    if (seekEl && dur > 0) seekEl.value = String(Math.round((audio.currentTime / dur) * 1000));
  });
  if (seekEl) {
    seekEl.addEventListener('pointerdown', () => { seeking = true; });
    seekEl.addEventListener('pointerup', () => { seeking = false; });
    seekEl.addEventListener('change', () => {
      const dur = audio.duration || 0;
      if (dur > 0) audio.currentTime = (Number(seekEl.value) / 1000) * dur;
      seeking = false;
    });
  }

  void loadPlaylist();
});
