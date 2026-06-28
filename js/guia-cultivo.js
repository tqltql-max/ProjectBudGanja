function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function videoDisplayTitle(video) {
  if (!video) return 'Vídeo do YouTube';
  const custom = video.customTitle != null ? String(video.customTitle).trim() : '';
  if (custom) return custom;
  return String(video.title || 'Vídeo do YouTube').trim() || 'Vídeo do YouTube';
}

function renderEmbed(video) {
  const title = escapeHtml(videoDisplayTitle(video));
  return (
    '<div class="video-embed">' +
    '<iframe src="https://www.youtube-nocookie.com/embed/' + escapeHtml(video.id) + '" ' +
    'title="' + title + '" loading="lazy" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
    '</div>'
  );
}

function renderVideoBlock(video) {
  const displayTitle = videoDisplayTitle(video);
  return (
    '<article class="guia-video-card" data-video-id="' + escapeHtml(video.id) + '">' +
    '<div class="guia-video-title-row">' +
    '<h3 class="guia-video-title">' + escapeHtml(displayTitle) + '</h3>' +
    '</div>' +
    (video.summary ? '<p class="guia-video-summary">' + escapeHtml(video.summary) + '</p>' : '') +
    renderEmbed(video) +
    '<p class="guia-video-meta">' +
    '<time datetime="' + escapeHtml(video.published || '') + '">' + escapeHtml(formatDatePtBR(video.published)) + '</time>' +
    ' · <a href="' + escapeHtml(video.url) + '" target="_blank" rel="noopener noreferrer">Abrir no YouTube</a>' +
    '</p>' +
    '</article>'
  );
}

function renderGuide(data) {
  const titleEl = document.getElementById('guia-title');
  const subtitleEl = document.getElementById('guia-subtitle');
  const channelLink = document.getElementById('guia-channel-link');
  const tocList = document.getElementById('guia-toc-list');
  const chaptersEl = document.getElementById('guia-chapters');

  if (titleEl && data.title) titleEl.textContent = data.title;
  if (subtitleEl && data.subtitle) subtitleEl.textContent = data.subtitle;
  if (channelLink && data.channelUrl) {
    channelLink.href = data.channelUrl;
    channelLink.textContent = '▶ Inscrever-se no ' + (data.channelName || '@InspetorBudGanja');
  }

  if (!tocList || !chaptersEl || !data.chapters) return;

  tocList.innerHTML = data.chapters.map((ch) => {
    const tip = ch.description ? ' data-tip="' + escapeHtml(ch.description) + '"' : '';
    return '<li><a href="#' + escapeHtml(ch.id) + '"' + tip + '>' + escapeHtml(ch.title) + '</a></li>';
  }).join('');

  chaptersEl.innerHTML = data.chapters.map((ch) => {
    const videos = (ch.videoIds || [])
      .map((id) => data.videos && data.videos[id])
      .filter(Boolean);

    const blocks = videos.map(renderVideoBlock).join('');
    return (
      '<section id="' + escapeHtml(ch.id) + '" class="guia-chapter">' +
      '<h2>' + escapeHtml(ch.title) + '</h2>' +
      (ch.description ? '<p class="guia-chapter-desc">' + escapeHtml(ch.description) + '</p>' : '') +
      blocks +
      '</section>'
    );
  }).join('');
}

function readInlineGuideData() {
  const el = document.getElementById('guia-cultivo-data');
  if (!el || !el.textContent) return null;
  try {
    return JSON.parse(el.textContent);
  } catch (e) {
    return null;
  }
}

async function fetchGuideJson(url) {
  const res = await fetch(url, { credentials: 'same-origin' });
  if (!res.ok) return null;
  return res.json();
}

async function isAdminSession() {
  if (document.body.dataset.adminSession === '1') return true;
  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

function setTitleRowMessage(row, message, isError) {
  var existing = row.querySelector('.guia-title-edit-msg');
  if (existing) existing.remove();
  if (!message) return;
  var msg = document.createElement('span');
  msg.className = 'guia-title-edit-msg' + (isError ? ' is-error' : '');
  msg.textContent = message;
  row.appendChild(msg);
}

function finishTitleEdit(row, titleText, videoId) {
  row.innerHTML =
    '<h3 class="guia-video-title">' + escapeHtml(titleText) + '</h3>';
  var card = row.closest('.guia-video-card');
  if (card) attachGuiaTitleEditControls(card);
}

function attachGuiaTitleEditControls(card) {
  var row = card.querySelector('.guia-video-title-row');
  var titleEl = row && row.querySelector('.guia-video-title');
  if (!row || !titleEl || row.querySelector('.guia-title-edit-btn')) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'guia-title-edit-btn';
  btn.title = 'Editar título';
  btn.setAttribute('aria-label', 'Editar título do vídeo');
  btn.textContent = '✏️';
  btn.addEventListener('click', function () {
    startGuiaTitleEdit(card, row, titleEl);
  });
  row.appendChild(btn);
}

function startGuiaTitleEdit(card, row, titleEl) {
  var videoId = card.dataset.videoId;
  if (!videoId) return;

  var current = titleEl.textContent.trim();
  row.innerHTML =
    '<input type="text" class="guia-title-edit-input" value="' + escapeHtml(current) + '" maxlength="160" aria-label="Título do vídeo">' +
    '<button type="button" class="guia-title-save-btn botao">Salvar</button>' +
    '<button type="button" class="guia-title-cancel-btn botao admin-secondary">Cancelar</button>';

  var input = row.querySelector('.guia-title-edit-input');
  var saveBtn = row.querySelector('.guia-title-save-btn');
  var cancelBtn = row.querySelector('.guia-title-cancel-btn');
  if (!input) return;

  input.focus();
  input.select();

  function cancel() {
    finishTitleEdit(row, current, videoId);
  }

  async function save() {
    var customTitle = input.value.trim();
    if (!customTitle) {
      setTitleRowMessage(row, 'Informe um título.', true);
      return;
    }
    saveBtn.disabled = true;
    cancelBtn.disabled = true;
    setTitleRowMessage(row, 'Salvando…', false);

    try {
      var res = await fetch('/api/guia-cultivo/videos/' + encodeURIComponent(videoId), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customTitle: customTitle })
      });
      var data = {};
      try { data = await res.json(); } catch (e) { /* ignore */ }
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar');

      var savedTitle = videoDisplayTitle(data.video || { customTitle: customTitle, title: current });
      finishTitleEdit(row, savedTitle, videoId);

      var iframe = card.querySelector('iframe');
      if (iframe) iframe.setAttribute('title', savedTitle);
    } catch (err) {
      setTitleRowMessage(row, err.message || 'Não foi possível salvar.', true);
      saveBtn.disabled = false;
      cancelBtn.disabled = false;
    }
  }

  saveBtn.addEventListener('click', save);
  cancelBtn.addEventListener('click', cancel);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  });
}

async function initGuiaAdminEdit() {
  if (document.body.dataset.page !== 'guia-cultivo') return;
  if (!(await isAdminSession())) return;

  document.body.dataset.adminSession = '1';
  document.querySelectorAll('.guia-video-card[data-video-id]').forEach(attachGuiaTitleEditControls);
}

async function loadGuide() {
  let data = readInlineGuideData();

  if (!data) {
    try {
      data = await fetchGuideJson('/api/guia-cultivo');
    } catch (e) { /* fallback */ }
  }

  if (!data) {
    try {
      data = await fetchGuideJson('/content/guia-cultivo.json');
    } catch (e) { /* ignore */ }
  }

  if (!data) {
    const chaptersEl = document.getElementById('guia-chapters');
    if (chaptersEl) {
      chaptersEl.innerHTML =
        '<p class="empty-message">Não foi possível carregar o guia. ' +
        'Inicie o site com <code>npm start</code> e recarregue a página (Ctrl+Shift+R).</p>';
    }
    return;
  }

  renderGuide(data);
  if (window.budganjaEnhanceHoverTips) {
    window.budganjaEnhanceHoverTips(document.getElementById('guia-toc'));
    window.budganjaEnhanceHoverTips(document.querySelector('.guia-tools'));
  }
  await initGuiaAdminEdit();
}

document.addEventListener('DOMContentLoaded', loadGuide);
