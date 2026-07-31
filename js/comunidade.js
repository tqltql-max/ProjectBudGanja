document.addEventListener('DOMContentLoaded', () => {
  const feedEl = document.getElementById('comunidade-feed');
  const loadMoreBtn = document.getElementById('comunidade-load-more');
  const ctaEl = document.getElementById('comunidade-cta');
  const ctaLoggedEl = document.getElementById('comunidade-cta-logged');
  const plantForm = document.getElementById('comunidade-plant-id-form');
  const plantGuest = document.getElementById('comunidade-plant-id-guest');
  const plantLogin = document.getElementById('comunidade-plant-id-login');
  const plantFile = document.getElementById('comunidade-plant-id-file');
  const plantCapture = document.getElementById('comunidade-plant-id-capture');
  const plantSelectBtn = document.getElementById('comunidade-plant-id-select-btn');
  const plantCaptureBtn = document.getElementById('comunidade-plant-id-capture-btn');
  const plantClearBtn = document.getElementById('comunidade-plant-id-clear-btn');
  const plantPhotoZone = document.getElementById('comunidade-plant-id-photo-zone');
  const plantPhotoEmpty = document.getElementById('comunidade-plant-id-photo-empty');
  const plantPreviewWrap = document.getElementById('comunidade-plant-id-preview-wrap');
  const plantPreview = document.getElementById('comunidade-plant-id-preview');
  const plantCaption = document.getElementById('comunidade-plant-id-caption');
  const plantStatus = document.getElementById('comunidade-plant-id-status');
  const plantSubmit = document.getElementById('comunidade-plant-id-submit');
  const filterBtns = Array.from(document.querySelectorAll('.comunidade-filter'));
  const lightboxEl = document.getElementById('comunidade-lightbox');
  const lightboxImg = document.getElementById('comunidade-lightbox-img');
  const lightboxClose = document.getElementById('comunidade-lightbox-close');
  const lightboxBackdrop = document.getElementById('comunidade-lightbox-backdrop');
  const lightboxTitle = document.getElementById('comunidade-lightbox-title');

  let nextCursor = null;
  let loading = false;
  let authUser = null;
  let feedKind = '';
  let pendingFile = null;
  let previewObjectUrl = '';
  const openComments = new Set();
  let lightboxLastFocus = null;

  function openLightbox(url, altText, titleText) {
    const src = String(url || '').trim();
    if (!src || !lightboxEl || !lightboxImg) return;
    lightboxLastFocus = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = altText || 'Foto ampliada';
    if (lightboxTitle) {
      lightboxTitle.textContent = String(titleText || altText || 'Foto').trim() || 'Foto';
    }
    lightboxEl.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.hidden = true;
    if (lightboxImg) {
      lightboxImg.removeAttribute('src');
      lightboxImg.alt = 'Foto ampliada';
    }
    if (lightboxTitle) lightboxTitle.textContent = 'Foto';
    document.body.style.overflow = '';
    if (lightboxLastFocus && typeof lightboxLastFocus.focus === 'function') {
      lightboxLastFocus.focus();
    }
    lightboxLastFocus = null;
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function authorLabel(author) {
    if (!author) return 'Cultivador';
    if (author.username) return '@' + author.username;
    return author.name || 'Cultivador';
  }

  function setPlantStatus(msg, isError) {
    if (!plantStatus) return;
    plantStatus.textContent = msg || '';
    plantStatus.classList.toggle('is-error', !!isError);
  }

  async function loadMe() {
    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (!res.ok) {
        authUser = null;
        if (plantGuest) plantGuest.hidden = false;
        if (plantForm) plantForm.hidden = true;
        if (plantLogin) {
          plantLogin.href = '/entrar.html?returnTo=' + encodeURIComponent('/comunidade/#comunidade-plant-id');
        }
        if (ctaEl) {
          ctaEl.href = '/entrar.html?returnTo=' + encodeURIComponent('/cultivo/');
        }
        return;
      }
      authUser = await res.json();
      if (plantGuest) plantGuest.hidden = true;
      if (plantForm) plantForm.hidden = false;
      if (ctaLoggedEl) ctaLoggedEl.href = '/cultivo/';
    } catch (e) {
      authUser = null;
    }
  }

  function renderPostCard(post) {
    const isPlantId = post.kind === 'plant_id';
    const plantBadge = isPlantId
      ? '<span class="comunidade-badge comunidade-badge--plant">Que planta é essa?</span>'
      : '';
    const help = !isPlantId && post.helpRequest
      ? '<span class="comunidade-badge comunidade-badge--help">Pede ajuda</span>'
      : '';
    const phase = !isPlantId && post.phase
      ? '<span class="comunidade-badge">' + escapeHtml(post.phase) + '</span>'
      : '';
    const count = post.commentCount != null ? Number(post.commentCount) : 0;
    const commentLabel = isPlantId ? 'Sugestões' : 'Comentários';
    const author = authorLabel(post.author);
    const photoKind = isPlantId ? 'Pedido de identificação' : 'Foto da comunidade';
    const photoTitle = author
      ? (post.caption ? author + ' — ' + String(post.caption).trim() : author + ' · ' + photoKind)
      : photoKind;
    return (
      '<article class="comunidade-card' + (isPlantId ? ' comunidade-card--plant' : '') + '" data-post-id="' + escapeHtml(post.id) + '">' +
      '<div class="comunidade-card-media">' +
      '<button type="button" class="comunidade-card-photo-btn" data-photo-url="' + escapeHtml(post.photoUrl) + '" data-photo-title="' + escapeHtml(photoTitle) + '" aria-label="Ampliar foto">' +
      '<img class="comunidade-card-photo" src="' + escapeHtml(post.photoUrl) + '" alt="' + escapeHtml(photoTitle) + '" loading="lazy">' +
      '<span class="comunidade-card-media-hint">Ampliar</span>' +
      '</button>' +
      '</div>' +
      '<div class="comunidade-card-body">' +
      '<div class="comunidade-card-meta">' +
      '<strong>' + escapeHtml(author) + '</strong>' +
      '<time datetime="' + escapeHtml(post.createdAt) + '">' + escapeHtml(formatDate(post.createdAt)) + '</time>' +
      '</div>' +
      '<div class="comunidade-card-badges">' + plantBadge + phase + help + '</div>' +
      (post.caption ? '<p class="comunidade-card-caption">' + escapeHtml(post.caption) + '</p>' : '') +
      '<button type="button" class="botao botao-outline botao-sm comunidade-comments-toggle" data-post-id="' + escapeHtml(post.id) + '">' +
      commentLabel + ' (' + count + ')' +
      '</button>' +
      '<div class="comunidade-comments" data-comments-for="' + escapeHtml(post.id) + '" hidden></div>' +
      '</div>' +
      '</article>'
    );
  }

  function renderCommentsBlock(postId, comments) {
    const list = (comments || []).map((c) =>
      '<li class="comunidade-comment">' +
      '<strong>' + escapeHtml(authorLabel(c.author)) + '</strong>' +
      '<time datetime="' + escapeHtml(c.createdAt) + '">' + escapeHtml(formatDate(c.createdAt)) + '</time>' +
      '<p>' + escapeHtml(c.body) + '</p>' +
      '</li>'
    ).join('');
    const form = authUser
      ? (
        '<form class="comunidade-comment-form" data-post-id="' + escapeHtml(postId) + '">' +
        '<label class="login-field">Sugestão / comentário' +
        '<textarea name="body" rows="2" maxlength="1000" required placeholder="Ex.: parece manjericão / indica a espécie…"></textarea>' +
        '</label>' +
        '<button type="submit" class="botao botao-sm">Comentar</button>' +
        '<p class="conta-status comunidade-comment-status" role="status"></p>' +
        '</form>'
      )
      : '<p class="field-hint"><a href="/entrar.html?returnTo=' + encodeURIComponent('/comunidade/') + '">Entre</a> para comentar.</p>';
    return (
      '<ul class="comunidade-comment-list">' + (list || '<li class="field-hint">Ainda sem comentários.</li>') + '</ul>' +
      form
    );
  }

  async function toggleComments(postId) {
    const panel = feedEl && feedEl.querySelector('[data-comments-for="' + postId + '"]');
    if (!panel) return;
    if (openComments.has(postId)) {
      openComments.delete(postId);
      panel.hidden = true;
      return;
    }
    openComments.add(postId);
    panel.hidden = false;
    panel.innerHTML = '<p class="conta-status">A carregar comentários…</p>';
    try {
      const res = await fetch('/api/community/posts/' + encodeURIComponent(postId) + '/comments');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        panel.innerHTML = '<p class="conta-status is-error">' + escapeHtml(data.error || 'Erro ao carregar.') + '</p>';
        return;
      }
      panel.innerHTML = renderCommentsBlock(postId, data.comments || []);
      bindCommentForm(panel, postId);
    } catch (e) {
      panel.innerHTML = '<p class="conta-status is-error">Servidor indisponível.</p>';
    }
  }

  function bindCommentForm(panel, postId) {
    const form = panel.querySelector('.comunidade-comment-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.comunidade-comment-status');
      const bodyEl = form.querySelector('[name="body"]');
      const body = bodyEl ? bodyEl.value.trim() : '';
      if (status) status.textContent = 'A enviar…';
      try {
        const res = await fetch('/api/community/posts/' + encodeURIComponent(postId) + '/comments', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (status) {
            status.textContent = data.error || 'Não foi possível comentar.';
            status.classList.add('is-error');
          }
          return;
        }
        openComments.delete(postId);
        await toggleComments(postId);
        const card = feedEl.querySelector('[data-post-id="' + postId + '"]');
        const toggle = card && card.querySelector('.comunidade-comments-toggle');
        if (toggle) {
          const match = toggle.textContent.match(/\((\d+)\)/);
          const n = match ? Number(match[1]) + 1 : 1;
          const label = toggle.textContent.indexOf('Sugestões') === 0 ? 'Sugestões' : 'Comentários';
          toggle.textContent = label + ' (' + n + ')';
        }
      } catch (err) {
        if (status) {
          status.textContent = 'Servidor indisponível.';
          status.classList.add('is-error');
        }
      }
    });
  }

  async function loadFeed(append) {
    if (loading || !feedEl) return;
    loading = true;
    if (loadMoreBtn) loadMoreBtn.disabled = true;
    try {
      const qs = new URLSearchParams();
      qs.set('limit', '12');
      if (feedKind) qs.set('kind', feedKind);
      if (append && nextCursor) qs.set('cursor', nextCursor);
      const res = await fetch('/api/community/feed?' + qs.toString());
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (!append) feedEl.innerHTML = '<p class="conta-status is-error">Não foi possível carregar o feed.</p>';
        return;
      }
      const items = data.items || [];
      nextCursor = data.nextCursor || null;
      if (!append) {
        if (!items.length) {
          const emptyMsg = feedKind === 'plant_id'
            ? 'Ainda não há pedidos de identificação. Seja o primeiro a perguntar «Que planta é essa?».'
            : feedKind === 'diary'
              ? 'Ainda não há fotos do diário na comunidade.'
              : 'Ainda não há publicações. Partilhe do diário ou peça identificação de uma planta.';
          feedEl.innerHTML = '<p class="comunidade-empty">' + emptyMsg + '</p>';
        } else {
          feedEl.innerHTML = items.map(renderPostCard).join('');
        }
      } else if (items.length) {
        feedEl.insertAdjacentHTML('beforeend', items.map(renderPostCard).join(''));
      }
      if (loadMoreBtn) loadMoreBtn.hidden = !nextCursor;
    } catch (e) {
      if (!append) feedEl.innerHTML = '<p class="conta-status is-error">Servidor indisponível.</p>';
    } finally {
      loading = false;
      if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
  }

  const media = window.BudGanjaMediaUpload || null;

  function apiErrorMessage(res, data, fallback) {
    if (data && data.error) return String(data.error);
    if (res && res.status === 413) return 'Foto demasiado grande para o servidor. Tente uma foto mais leve.';
    if (res && res.status === 401) return 'Sessão expirada. Entre de novo e tente publicar.';
    if (res && res.status >= 500) return 'Erro no servidor ao enviar a foto. Tente de novo dentro de instantes.';
    return fallback;
  }

  function syncPlantPhotoUi(hasPhoto) {
    if (plantPreviewWrap) plantPreviewWrap.hidden = !hasPhoto;
    if (plantPhotoEmpty) plantPhotoEmpty.hidden = !!hasPhoto;
    if (plantPhotoZone) plantPhotoZone.classList.toggle('has-photo', !!hasPhoto);
  }

  function clearPlantPhoto() {
    pendingFile = null;
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = '';
    }
    if (plantPreview) plantPreview.removeAttribute('src');
    if (plantFile) plantFile.value = '';
    if (plantCapture) plantCapture.value = '';
    syncPlantPhotoUi(false);
  }

  function setPlantPhotoFromInput(inputEl) {
    const file = inputEl && inputEl.files && inputEl.files[0];
    if (!file) return;
    pendingFile = file;
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = '';
    }
    if (plantPreview) {
      previewObjectUrl = URL.createObjectURL(file);
      plantPreview.src = previewObjectUrl;
    }
    syncPlantPhotoUi(true);
    setPlantStatus('');
    // Limpa o outro input para poder voltar a escolher/capturar o mesmo ficheiro.
    if (inputEl === plantFile && plantCapture) plantCapture.value = '';
    if (inputEl === plantCapture && plantFile) plantFile.value = '';
  }

  if (plantSelectBtn && plantFile) {
    plantSelectBtn.addEventListener('click', () => plantFile.click());
  }
  if (plantCaptureBtn && plantCapture) {
    plantCaptureBtn.addEventListener('click', () => plantCapture.click());
  }
  if (plantFile) {
    plantFile.addEventListener('change', () => setPlantPhotoFromInput(plantFile));
  }
  if (plantCapture) {
    plantCapture.addEventListener('change', () => setPlantPhotoFromInput(plantCapture));
  }
  if (plantClearBtn) {
    plantClearBtn.addEventListener('click', () => {
      clearPlantPhoto();
      setPlantStatus('');
    });
  }

  if (plantPreview) {
    plantPreview.addEventListener('click', () => {
      if (!plantPreview.getAttribute('src')) return;
      openLightbox(plantPreview.src, 'Pré-visualização da planta', 'Pré-visualização da planta');
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxEl && !lightboxEl.hidden) {
      e.preventDefault();
      closeLightbox();
    }
  });

  if (plantForm) {
    plantForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!authUser) {
        window.location.href = '/entrar.html?returnTo=' + encodeURIComponent('/comunidade/#comunidade-plant-id');
        return;
      }
      if (!pendingFile) {
        setPlantStatus('Escolha uma foto da planta.', true);
        return;
      }
      if (!media || typeof media.prepareImageForUpload !== 'function') {
        setPlantStatus('Recarregue a página (módulo de fotos em falta).', true);
        return;
      }
      if (plantSubmit) plantSubmit.disabled = true;
      setPlantStatus('A preparar foto…');
      try {
        const data = typeof media.prepareAndReadDataUrl === 'function'
          ? await media.prepareAndReadDataUrl(pendingFile)
          : media.normalizeImageDataUrl(
            await media.readFileAsDataUrl(await media.prepareImageForUpload(pendingFile)),
            pendingFile
          );
        if (!/^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(String(data || ''))) {
          setPlantStatus('Formato de foto inválido após otimização. Tire de novo em JPEG.', true);
          return;
        }
        setPlantStatus('A enviar foto…');
        const upRes = await fetch('/api/cultivo/photo', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
        const upData = await upRes.json().catch(() => ({}));
        if (!upRes.ok) {
          setPlantStatus(apiErrorMessage(upRes, upData, 'Não foi possível enviar a foto.'), true);
          return;
        }
        if (!upData.url || String(upData.url).indexOf('/uploads/') !== 0) {
          setPlantStatus('O servidor não devolveu o URL da foto.', true);
          return;
        }
        setPlantStatus('A publicar pedido…');
        const res = await fetch('/api/community/plant-id', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            photoUrl: upData.url,
            caption: plantCaption ? plantCaption.value : ''
          })
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          setPlantStatus(apiErrorMessage(res, payload, 'Não foi possível publicar.'), true);
          return;
        }
        setPlantStatus('Pedido publicado — a comunidade pode ajudar nos comentários.');
        clearPlantPhoto();
        if (plantCaption) plantCaption.value = '';
        activateFilterTab(filterBtns.find((b) => b.getAttribute('data-kind') === 'plant_id') || filterBtns[0]);
        nextCursor = null;
        try {
          await loadFeed(false);
          if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (feedErr) { /* publicação ok; feed atualiza ao recarregar */ }
      } catch (err) {
        const msg = err && err.message ? String(err.message) : '';
        setPlantStatus(msg || 'Servidor indisponível. Verifique a ligação e tente de novo.', true);
      } finally {
        if (plantSubmit) plantSubmit.disabled = false;
      }
    });
  }

  function activateFilterTab(btn) {
    if (!btn) return;
    feedKind = btn.getAttribute('data-kind') || '';
    filterBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      b.tabIndex = active ? 0 : -1;
    });
    if (feedEl) {
      feedEl.setAttribute('aria-labelledby', btn.id || 'comunidade-tab-all');
    }
  }

  const filterList = document.querySelector('.comunidade-filters');
  if (filterList) {
    filterList.addEventListener('keydown', (e) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      const current = document.activeElement;
      const idx = filterBtns.indexOf(current);
      if (idx < 0) return;
      e.preventDefault();
      let next = idx;
      if (e.key === 'ArrowRight') next = (idx + 1) % filterBtns.length;
      if (e.key === 'ArrowLeft') next = (idx - 1 + filterBtns.length) % filterBtns.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = filterBtns.length - 1;
      activateFilterTab(filterBtns[next]);
      filterBtns[next].focus();
      nextCursor = null;
      void loadFeed(false);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateFilterTab(btn);
      nextCursor = null;
      void loadFeed(false);
    });
  });

  if (feedEl) {
    feedEl.addEventListener('click', (e) => {
      const photoBtn = e.target.closest('.comunidade-card-photo-btn');
      if (photoBtn) {
        const url = photoBtn.getAttribute('data-photo-url') || '';
        const title = photoBtn.getAttribute('data-photo-title') || '';
        const img = photoBtn.querySelector('img');
        openLightbox(url, img ? img.alt : 'Foto ampliada', title);
        return;
      }
      const btn = e.target.closest('.comunidade-comments-toggle');
      if (!btn) return;
      const postId = btn.getAttribute('data-post-id');
      if (postId) void toggleComments(postId);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      void loadFeed(true);
    });
  }

  void loadMe().then(() => loadFeed(false));
});
