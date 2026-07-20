document.addEventListener('DOMContentLoaded', () => {
  const feedEl = document.getElementById('comunidade-feed');
  const loadMoreBtn = document.getElementById('comunidade-load-more');
  const ctaEl = document.getElementById('comunidade-cta');
  const plantForm = document.getElementById('comunidade-plant-id-form');
  const plantGuest = document.getElementById('comunidade-plant-id-guest');
  const plantLogin = document.getElementById('comunidade-plant-id-login');
  const plantFile = document.getElementById('comunidade-plant-id-file');
  const plantPreviewWrap = document.getElementById('comunidade-plant-id-preview-wrap');
  const plantPreview = document.getElementById('comunidade-plant-id-preview');
  const plantCaption = document.getElementById('comunidade-plant-id-caption');
  const plantStatus = document.getElementById('comunidade-plant-id-status');
  const plantSubmit = document.getElementById('comunidade-plant-id-submit');
  const filterBtns = Array.from(document.querySelectorAll('.comunidade-filter'));

  let nextCursor = null;
  let loading = false;
  let authUser = null;
  let feedKind = '';
  let pendingFile = null;
  const openComments = new Set();

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
        if (ctaEl) {
          ctaEl.href = '/entrar.html?returnTo=' + encodeURIComponent('/cultivo/');
          ctaEl.textContent = 'Entrar para partilhar';
        }
        if (plantGuest) plantGuest.hidden = false;
        if (plantForm) plantForm.hidden = true;
        if (plantLogin) {
          plantLogin.href = '/entrar.html?returnTo=' + encodeURIComponent('/comunidade/#comunidade-plant-id');
        }
        return;
      }
      authUser = await res.json();
      if (ctaEl) {
        ctaEl.href = '/cultivo/';
        ctaEl.textContent = 'Enviar do diário';
      }
      if (plantGuest) plantGuest.hidden = true;
      if (plantForm) plantForm.hidden = false;
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
    return (
      '<article class="comunidade-card' + (isPlantId ? ' comunidade-card--plant' : '') + '" data-post-id="' + escapeHtml(post.id) + '">' +
      '<div class="comunidade-card-media">' +
      '<img src="' + escapeHtml(post.photoUrl) + '" alt="' + (isPlantId ? 'Pedido de identificação' : 'Foto da comunidade') + '" loading="lazy">' +
      '</div>' +
      '<div class="comunidade-card-body">' +
      '<div class="comunidade-card-meta">' +
      '<strong>' + escapeHtml(authorLabel(post.author)) + '</strong>' +
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

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function prepareImageForUpload(file) {
    return new Promise((resolve) => {
      if (!file || !String(file.type || '').startsWith('image/')) {
        resolve(file);
        return;
      }
      if (file.size <= 1.4 * 1024 * 1024) {
        resolve(file);
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const maxSide = 1600;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        const scale = Math.min(1, maxSide / Math.max(w, h));
        w = Math.max(1, Math.round(w * scale));
        h = Math.max(1, Math.round(h * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          resolve(new File([blob], 'plant.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.85);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });
  }

  if (plantFile) {
    plantFile.addEventListener('change', () => {
      const file = plantFile.files && plantFile.files[0];
      pendingFile = file || null;
      if (!file || !plantPreview || !plantPreviewWrap) return;
      const url = URL.createObjectURL(file);
      plantPreview.src = url;
      plantPreviewWrap.hidden = false;
      setPlantStatus('');
    });
  }

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
      if (plantSubmit) plantSubmit.disabled = true;
      setPlantStatus('A enviar foto…');
      try {
        const prepared = await prepareImageForUpload(pendingFile);
        const data = await readFileAsDataUrl(prepared);
        const upRes = await fetch('/api/cultivo/photo', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
        const upData = await upRes.json().catch(() => ({}));
        if (!upRes.ok) {
          setPlantStatus(upData.error || 'Não foi possível enviar a foto.', true);
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
          setPlantStatus(payload.error || 'Não foi possível publicar.', true);
          return;
        }
        setPlantStatus('Pedido publicado — a comunidade pode ajudar nos comentários.');
        pendingFile = null;
        if (plantFile) plantFile.value = '';
        if (plantCaption) plantCaption.value = '';
        if (plantPreviewWrap) plantPreviewWrap.hidden = true;
        feedKind = 'plant_id';
        filterBtns.forEach((btn) => {
          const active = btn.getAttribute('data-kind') === 'plant_id';
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        nextCursor = null;
        await loadFeed(false);
        if (feedEl) feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (err) {
        setPlantStatus('Servidor indisponível.', true);
      } finally {
        if (plantSubmit) plantSubmit.disabled = false;
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      feedKind = btn.getAttribute('data-kind') || '';
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      nextCursor = null;
      void loadFeed(false);
    });
  });

  if (feedEl) {
    feedEl.addEventListener('click', (e) => {
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
