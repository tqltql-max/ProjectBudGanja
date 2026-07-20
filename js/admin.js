document.addEventListener('DOMContentLoaded', async () => {
  const userLabel = document.getElementById('admin-user');
  const logoutBtn = document.getElementById('logout-btn');

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/admin.html';
      return;
    }
    const userData = await me.json();
    if (userLabel) userLabel.textContent = userData.username || 'admin';
  } catch (e) {
    window.location.href = '/login.html?returnTo=/admin.html';
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  initPostsPanel();
  initIconsPanel();
  initAdminSSE();
});

function initAdminSSE() {
  if (!window.EventSource) return;
  const dot = document.createElement('span');
  dot.className = 'admin-sse-dot';
  dot.title = 'Ligação em tempo real';
  const hub = document.querySelector('.admin-hub-intro p');
  if (hub) hub.prepend(dot);

  function connect() {
    const es = new EventSource('/api/admin/stream', { withCredentials: true });
    es.addEventListener('stats', (e) => {
      try {
        const data = JSON.parse(e.data);
        dot.classList.add('live');
        updateDashboardStats(data);
      } catch (x) { /* ignorar */ }
    });
    es.addEventListener('post_changed', (e) => {
      try {
        const data = JSON.parse(e.data);
        if (window.adminToast) {
          const icons = { create: '✅', update: '✏️', delete: '🗑️' };
          const msgs = { create: 'Publicação criada', update: 'Publicação actualizada', delete: 'Publicação eliminada' };
          window.adminToast((icons[data.action] || '') + ' ' + (msgs[data.action] || '') + (data.title ? ': ' + data.title.slice(0, 40) : ''), 'ok');
        }
      } catch (x) { /* ignorar */ }
    });
    es.onerror = () => { dot.classList.remove('live'); setTimeout(connect, 5000); };
    es.onopen = () => dot.classList.add('live');
  }
  connect();
}

function updateDashboardStats(data) {
  // Actualizar os stat cards com animação
  const statsEl = document.getElementById('admin-stats');
  if (!statsEl || !statsEl.children.length) return;
  const cards = statsEl.querySelectorAll('.admin-stat-value');
  if (cards[0]) animateNumber(cards[0], data.total);
  if (cards[1]) animateNumber(cards[1], data.published);
  if (cards[2]) animateNumber(cards[2], data.drafts);
}

function animateNumber(el, target) {
  const current = parseInt(el.textContent) || 0;
  if (current === target) return;
  const step = target > current ? 1 : -1;
  let val = current;
  const timer = setInterval(() => {
    val += step;
    el.textContent = val;
    if (val === target) clearInterval(timer);
  }, 40);
}



async function uploadImage(file) {
  const prepared = await prepareImageForUpload(file);
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ filename: prepared.name, data: reader.result })
        });
        let json = {};
        try {
          json = await res.json();
        } catch (e) {
          json = {};
        }
        if (res.ok) resolve(json.url);
        else reject(json.error || ('Erro ' + res.status));
      } catch (e) {
        reject('Falha de rede ao enviar imagem');
      }
    };
    reader.onerror = () => reject('Não foi possível ler o ficheiro');
    reader.readAsDataURL(prepared);
  });
}

function prepareImageForUpload(file) {
  const maxSide = 1600;
  const maxBytes = 900 * 1024;

  if (!file.type.startsWith('image/') || file.size <= maxBytes) {
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const scale = Math.min(1, maxSide / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject('Não foi possível comprimir a imagem');
          return;
        }
        const ext = file.type === 'image/png' ? '.png' : '.jpg';
        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '') + ext, { type: blob.type }));
      }, file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
}

function escapeText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeText(s).replace(/"/g, '&quot;');
}

function flashAdmin(message, kind) {
  if (window.adminToast) {
    window.adminToast(message, kind || 'ok');
    return;
  }
  console.log(message);
}

async function copyTextToClipboard(text) {
  const value = String(text || '');
  if (!value) return false;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (e) { /* fallback */ }

  try {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', 'readonly');
    field.style.position = 'absolute';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  } catch (e) {
    return false;
  }
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const val = textarea.value;
  textarea.value = val.slice(0, start) + text + val.slice(end);
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.dispatchEvent(new Event('input'));
}

function listingUrl(category) {
  if (category === 'equipamento') return '/equipamentos/';
  if (category === 'inspecao') return '/biblioteca/inspecoes/';
  return '/biblioteca/pesquisas/';
}

function categoryLabel(category) {
  if (category === 'equipamento') return 'Equipamentos';
  if (category === 'inspecao') return 'Inspeções';
  return 'Pesquisas';
}

function coverSrc(coverImage) {
  const raw = String(coverImage || '').trim();
  if (!raw) return '';
  if (/^(?:https?:)?\/\//i.test(raw) || raw.startsWith('/')) return raw;
  return '/' + raw.replace(/^\/+/, '');
}

function initPostsPanel() {
  const listView = document.getElementById('admin-list-view');
  const editorView = document.getElementById('admin-editor-view');
  const backToListBtn = document.getElementById('back-to-list-btn');
  const newPostBtn = document.getElementById('new-post-btn');
  const postsSearch = document.getElementById('posts-search');
  const filterCategory = document.getElementById('filter-category');
  const filterStatus = document.getElementById('filter-status');
  const postsTable = document.getElementById('posts-table');
  const postsTableWrap = document.getElementById('posts-table-wrap');
  const postsEmpty = document.getElementById('posts-empty');
  const adminStats = document.getElementById('admin-stats');
  const editorModeBadge = document.getElementById('editor-mode-badge');

  const form = document.getElementById('post-form');
  const result = document.getElementById('result');
  const previewEl = document.getElementById('preview');
  const postsCount = document.getElementById('posts-count');
  const formHeading = document.getElementById('form-heading');
  const titleEl = document.getElementById('title');
  const excerptEl = document.getElementById('excerpt');
  const coverEl = document.getElementById('cover-image');
  const categoryEl = document.getElementById('category');
  const serieEl = document.getElementById('serie');
  const serieField = document.getElementById('serie-field');
  const contentEl = document.getElementById('content');
  const publishedEl = document.getElementById('published');
  const imageInput = document.getElementById('image-input');
  const imagePickBtn = document.getElementById('image-pick-btn');
  const imageFileName = document.getElementById('image-file-name');
  const coverPreviewWrap = document.getElementById('cover-preview-wrap');
  const coverPreview = document.getElementById('cover-preview');
  const coverClearBtn = document.getElementById('cover-clear-btn');
  const submitBtn = document.getElementById('submit-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');

  let editingSlug = null;
  let cachedPosts = [];
  let previewTimer = null;
  let currentView = 'list';

  function showView(view) {
    currentView = view;
    const isList = view === 'list';
    if (listView) listView.hidden = !isList;
    if (editorView) editorView.hidden = isList;
    if (isList) {
      document.title = 'Painel Admin | Inspetor BudGanja';
      renderStudioTable();
    } else {
      document.title = (editingSlug ? 'Editar' : 'Nova') + ' publicação | Inspetor BudGanja';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function setEditMode(slug) {
    editingSlug = slug;
    const editing = !!slug;
    submitBtn.textContent = editing ? 'Salvar alterações' : 'Publicar';
    cancelEditBtn.hidden = !editing;
    formHeading.textContent = editing ? 'Editar publicação' : 'Nova publicação';
    if (editorModeBadge) {
      editorModeBadge.textContent = editing ? 'Edição' : 'Nova';
      editorModeBadge.classList.toggle('admin-editor-badge--edit', editing);
    }
  }

  function countPostsBy(filterFn) {
    return cachedPosts.filter(filterFn).length;
  }

  function renderAdminStats() {
    if (!adminStats) return;
    const total = cachedPosts.length;
    const published = countPostsBy((p) => p.published !== false);
    const drafts = countPostsBy((p) => p.published === false);
    const pesquisas = countPostsBy((p) => (p.category || 'pesquisa') === 'pesquisa');
    const inspecoes = countPostsBy((p) => p.category === 'inspecao');
    const equip = countPostsBy((p) => p.category === 'equipamento');

    adminStats.innerHTML =
      '<article class="admin-stat-card"><span class="admin-stat-value">' + total + '</span><span class="admin-stat-label">Total</span></article>' +
      '<article class="admin-stat-card admin-stat-card--live"><span class="admin-stat-value">' + published + '</span><span class="admin-stat-label">Publicadas</span></article>' +
      '<article class="admin-stat-card admin-stat-card--draft"><span class="admin-stat-value">' + drafts + '</span><span class="admin-stat-label">Rascunhos</span></article>' +
      '<article class="admin-stat-card admin-stat-card--meta">' +
        '<span class="admin-stat-value admin-stat-value--sm">' + pesquisas + ' · ' + inspecoes + ' · ' + equip + '</span>' +
        '<span class="admin-stat-label">Pesquisas · Inspeções · Equip.</span></article>';
  }

  function updatePreview() {
    const text = contentEl.value.trim();
    previewEl.innerHTML = text
      ? renderMarkdownPreview(text)
      : '<p class="result-muted">O preview aparece enquanto você escreve.</p>';
  }

  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(updatePreview, 300);
  }

  function updateCoverPreview() {
    const url = coverEl.value.trim();
    if (!url || !coverPreview || !coverPreviewWrap) return;
    coverPreview.src = coverSrc(url);
    coverPreviewWrap.classList.remove('hidden');
    if (imageFileName) imageFileName.textContent = url.split('/').pop() || 'Imagem de capa';
  }

  function clearCoverImage() {
    coverEl.value = '';
    if (coverPreview) coverPreview.removeAttribute('src');
    if (coverPreviewWrap) coverPreviewWrap.classList.add('hidden');
    if (imageFileName) imageFileName.textContent = 'Nenhuma imagem selecionada';
  }

  function resetForm() {
    form.reset();
    publishedEl.checked = true;
    clearCoverImage();
    editingSlug = null;
    setEditMode(null);
    updatePreview();
    result.textContent = '';
  }

  function fillForm(post) {
    titleEl.value = post.title || '';
    excerptEl.value = post.excerpt || '';
    coverEl.value = post.coverImage || '';
    categoryEl.value = post.category || 'pesquisa';
    const isinspecao = categoryEl.value === 'inspecao';
    if (serieField) serieField.hidden = !isinspecao;
    if (isinspecao) {
      loadSeriesOptions(categoryEl.value).then(function() {
        if (serieEl) serieEl.value = post.series || '';
      });
    }
    contentEl.value = post.content_raw || '';
    publishedEl.checked = post.published !== false;
    setEditMode(post.slug);
    updateCoverPreview();
    updatePreview();
  }

  function duplicatePost(post) {
    if (!post) return;
    resetForm();
    fillForm(Object.assign({}, post, {
      slug: '',
      title: (post.title || 'Publicação') + ' (cópia)',
      published: false
    }));
    history.replaceState({}, '', '/admin.html?new=1');
    showView('edit');
    flashAdmin('Duplicado como rascunho. Ajuste o título antes de publicar.', 'ok');
  }

  async function togglePublished(post) {
    if (!post) return;
    const nextPublished = post.published === false;
    const res = await fetch('/api/posts/' + post.slug, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: post.title || '',
        excerpt: post.excerpt || '',
        coverImage: post.coverImage || '',
        category: post.category || 'pesquisa',
        content: post.content_raw || post.content || '',
        format: post.format || 'markdown',
        published: nextPublished,
        series: post.series || '',
        seriesLabel: post.seriesLabel || ''
      })
    });

    if (!res.ok) {
      flashAdmin('Não foi possível alterar o estado da publicação.', 'warn');
      return;
    }

    await loadPosts();
    flashAdmin(nextPublished ? 'Publicação marcada como publicada.' : 'Publicação movida para rascunho.', 'ok');
  }

  function openEditor(post) {
    if (post) {
      fillForm(post);
      history.replaceState({}, '', '/admin.html?slug=' + encodeURIComponent(post.slug));
    } else {
      resetForm();
      history.replaceState({}, '', '/admin.html?new=1');
    }
    showView('edit');
  }

  function closeEditor() {
    resetForm();
    history.replaceState({}, '', '/admin.html');
    showView('list');
  }

  function getFilteredPosts() {
    const q = (postsSearch && postsSearch.value || '').trim().toLowerCase();
    const cat = filterCategory ? filterCategory.value : '';
    const status = filterStatus ? filterStatus.value : '';

    return cachedPosts.filter((p) => {
      if (cat && (p.category || 'pesquisa') !== cat) return false;
      if (status === 'published' && p.published === false) return false;
      if (status === 'draft' && p.published !== false) return false;
      if (!q) return true;
      const hay = ((p.title || '') + ' ' + (p.excerpt || '')).toLowerCase();
      return hay.includes(q);
    });
  }

  function renderStudioTable() {
    if (!postsTable) return;

    const filtered = getFilteredPosts();
    postsCount.textContent = filtered.length + (cachedPosts.length ? ' / ' + cachedPosts.length : '');
    renderAdminStats();

    if (!cachedPosts.length) {
      postsTable.innerHTML = '';
      if (postsTableWrap) postsTableWrap.hidden = true;
      if (postsEmpty) {
        postsEmpty.hidden = false;
        postsEmpty.textContent = 'Nenhuma publicação ainda. Clique em "+ Nova publicação" para começar.';
      }
      return;
    }

    if (!filtered.length) {
      postsTable.innerHTML = '';
      if (postsTableWrap) postsTableWrap.hidden = true;
      if (postsEmpty) {
        postsEmpty.hidden = false;
        postsEmpty.textContent = 'Nenhuma publicação corresponde aos filtros.';
      }
      return;
    }

    if (postsTableWrap) postsTableWrap.hidden = false;
    if (postsEmpty) postsEmpty.hidden = true;

    const sorted = filtered.slice().sort((a, b) => {
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

    let html =
      '<div class="admin-studio-row admin-studio-row--head" role="row">' +
        '<span class="admin-studio-cell admin-studio-cell--thumb" role="columnheader"></span>' +
        '<span class="admin-studio-cell admin-studio-cell--title" role="columnheader">Publicação</span>' +
        '<span class="admin-studio-cell admin-studio-cell--cat" role="columnheader">Categoria</span>' +
        '<span class="admin-studio-cell admin-studio-cell--status" role="columnheader">Estado</span>' +
        '<span class="admin-studio-cell admin-studio-cell--date" role="columnheader">Data</span>' +
        '<span class="admin-studio-cell admin-studio-cell--actions" role="columnheader">Ações</span>' +
      '</div>';

    sorted.forEach((p) => {
      const isDraft = p.published === false;
      const catLabel = categoryLabel(p.category);
      const thumb = coverSrc(p.coverImage);
      const thumbHtml = thumb
        ? '<img src="' + escapeAttr(thumb) + '" alt="" class="admin-studio-thumb" loading="lazy">'
        : '<span class="admin-studio-thumb admin-studio-thumb--empty" aria-hidden="true">📄</span>';
      const statusClass = isDraft ? 'admin-tag-draft' : 'admin-tag-live';
      const statusLabel = isDraft ? 'Rascunho' : 'Publicada';
      const isActive = editingSlug === p.slug && currentView === 'edit';
      const viewLabel = isDraft ? 'Link público indisponível' : 'Ver no site';
      const copyLabel = isDraft ? 'Copiar link da edição' : 'Copiar link público';
      const toggleLabel = isDraft ? 'Publicar' : 'Transformar em rascunho';

      html +=
        '<article class="admin-studio-row' + (isActive ? ' is-active' : '') + '" role="row" data-slug="' + escapeAttr(p.slug) + '">' +
          '<div class="admin-studio-cell admin-studio-cell--thumb" role="cell">' + thumbHtml + '</div>' +
          '<div class="admin-studio-cell admin-studio-cell--title" role="cell">' +
            '<strong class="admin-studio-title">' + escapeText(p.title || 'Sem título') + '</strong>' +
            '<span class="admin-studio-excerpt">' + escapeText(p.excerpt || '—') + '</span>' +
          '</div>' +
          '<div class="admin-studio-cell admin-studio-cell--cat" role="cell"><span class="admin-tag">' + escapeText(catLabel) + '</span></div>' +
          '<div class="admin-studio-cell admin-studio-cell--status" role="cell"><span class="admin-tag ' + statusClass + '">' + statusLabel + '</span></div>' +
          '<div class="admin-studio-cell admin-studio-cell--date" role="cell">' + escapeText(formatDatePtBR(p.date)) + '</div>' +
          '<div class="admin-studio-cell admin-studio-cell--actions" role="cell">' +
            '<details class="admin-row-menu">' +
              '<summary class="admin-row-menu-toggle" aria-label="Abrir menu de ações">⋯</summary>' +
              '<div class="admin-row-menu-panel" role="menu" aria-label="Ações da publicação">' +
                '<button type="button" class="admin-row-menu-item" data-post-action="edit">Editar</button>' +
                (isDraft
                  ? '<span class="admin-row-menu-item admin-row-menu-item--disabled" aria-disabled="true">' + viewLabel + '</span>'
                  : '<a href="' + escapeAttr(p.url) + '" target="_blank" rel="noopener" class="admin-row-menu-item" data-post-action="view">' + viewLabel + '</a>') +
                '<button type="button" class="admin-row-menu-item" data-post-action="toggle-published">' + toggleLabel + '</button>' +
                '<button type="button" class="admin-row-menu-item" data-post-action="duplicate">Duplicar</button>' +
                '<button type="button" class="admin-row-menu-item" data-post-action="copy-link">' + copyLabel + '</button>' +
                '<button type="button" class="admin-row-menu-item admin-row-menu-item--danger" data-post-action="delete">Excluir</button>' +
              '</div>' +
            '</details>' +
          '</div>' +
        '</article>';
    });

    postsTable.innerHTML = html;

    postsTable.querySelectorAll('img.admin-studio-thumb').forEach((img) => {
      img.addEventListener('error', () => {
        const fallback = document.createElement('span');
        fallback.className = 'admin-studio-thumb admin-studio-thumb--empty';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.textContent = '🖼️';
        img.replaceWith(fallback);
      }, { once: true });
    });

    postsTable.querySelectorAll('.admin-studio-row[data-slug]').forEach((row) => {
      const slug = row.getAttribute('data-slug');
      const post = cachedPosts.find((x) => x.slug === slug);
      if (!post) return;

      row.addEventListener('click', (e) => {
        if (e.target.closest('a, button, summary, details')) return;
        openEditor(post);
      });
    });

    postsTable.querySelectorAll('.admin-row-menu').forEach((menu) => {
      menu.addEventListener('toggle', () => {
        if (!menu.open) return;
        postsTable.querySelectorAll('.admin-row-menu[open]').forEach((other) => {
          if (other !== menu) other.removeAttribute('open');
        });
      });
    });

    postsTable.querySelectorAll('[data-post-action]').forEach((actionEl) => {
      actionEl.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (actionEl.tagName === 'A') e.preventDefault();
        const row = actionEl.closest('.admin-studio-row[data-slug]');
        if (!row) return;
        const slug = row.getAttribute('data-slug');
        const post = cachedPosts.find((x) => x.slug === slug);
        if (!post) return;

        const menu = actionEl.closest('.admin-row-menu');
        if (menu) menu.removeAttribute('open');

        const action = actionEl.getAttribute('data-post-action');
        if (action === 'edit') {
          openEditor(post);
          return;
        }

        if (action === 'view') {
          window.open(post.url, '_blank', 'noopener');
          return;
        }

        if (action === 'duplicate') {
          duplicatePost(post);
          return;
        }

        if (action === 'toggle-published') {
          await togglePublished(post);
          return;
        }

        if (action === 'copy-link') {
          const link = post.published === false ? '/admin.html?slug=' + encodeURIComponent(post.slug) : post.url;
          const ok = await copyTextToClipboard(link);
          flashAdmin(ok ? 'Link copiado para a área de transferência.' : 'Não foi possível copiar o link.', ok ? 'ok' : 'warn');
          return;
        }

        if (action === 'delete') {
          if (!confirm('Excluir "' + (post.title || 'esta publicação') + '"?')) return;
          const res = await fetch('/api/posts/' + post.slug, { method: 'DELETE', credentials: 'include' });
          if (!res.ok) {
            alert('Erro ao excluir.');
            return;
          }
          if (editingSlug === post.slug) closeEditor();
          await loadPosts();
        }
      });
    });
  }

  document.querySelectorAll('.md-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      insertAtCursor(contentEl, btn.getAttribute('data-md') || '');
    });
  });

  const youtubeUrlEl = document.getElementById('youtube-url');
  const youtubeInsertBtn = document.getElementById('youtube-insert-btn');
  const youtubePasteBtn = document.getElementById('youtube-paste-btn');

  function insertYouTubeVideo(url) {
    const trimmed = String(url || '').trim();
    if (!trimmed) {
      result.textContent = 'Cole o link do vídeo do YouTube no campo acima.';
      if (youtubeUrlEl) youtubeUrlEl.focus();
      return false;
    }
    if (typeof parseYouTubeId !== 'function' || !parseYouTubeId(trimmed)) {
      result.textContent = 'Link inválido. Copie o link em YouTube → Compartilhar → Copiar link.';
      return false;
    }
    insertAtCursor(contentEl, '\n\n@youtube ' + trimmed + '\n');
    result.textContent = 'Vídeo inserido. Revise o preview e clique em Salvar.';
    return true;
  }

  if (youtubeInsertBtn && youtubeUrlEl) {
    youtubeInsertBtn.addEventListener('click', () => {
      if (insertYouTubeVideo(youtubeUrlEl.value)) youtubeUrlEl.value = '';
    });
    youtubeUrlEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (insertYouTubeVideo(youtubeUrlEl.value)) youtubeUrlEl.value = '';
      }
    });
  }

  if (youtubePasteBtn && youtubeUrlEl) {
    youtubePasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        youtubeUrlEl.value = text.trim();
        if (insertYouTubeVideo(youtubeUrlEl.value)) youtubeUrlEl.value = '';
      } catch (e) {
        result.textContent = 'Não foi possível ler a área de transferência. Cole com Ctrl+V no campo.';
        youtubeUrlEl.focus();
      }
    });
  }

  contentEl.addEventListener('input', schedulePreview);
  categoryEl.addEventListener('change', function() {
    const cat = categoryEl.value;
    if (serieField) serieField.hidden = cat !== 'inspecao';
    if (cat === 'inspecao') loadSeriesOptions(cat);
    schedulePreview();
  });

  async function loadSeriesOptions(category) {
    if (!serieEl) return;
    const current = serieEl.value;
    try {
      const res = await fetch('/api/series?category=' + encodeURIComponent(category), { credentials: 'include' });
      if (!res.ok) return;
      const list = await res.json();
      serieEl.innerHTML = '<option value="">-- sem série --</option>';
      list.forEach(function(s) {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.label;
        serieEl.appendChild(opt);
      });
      serieEl.value = current;
    } catch (e) { /* manter opções existentes */ }
  }

  if (backToListBtn) backToListBtn.addEventListener('click', closeEditor);
  if (newPostBtn) newPostBtn.addEventListener('click', () => openEditor(null));

  const channelInspectUrl = document.getElementById('channel-inspect-url');
  const channelInspectPublish = document.getElementById('channel-inspect-publish');
  const channelInspectBtn = document.getElementById('channel-inspect-btn');
  const channelInspectStatus = document.getElementById('channel-inspect-status');

  async function generateChannelInspection() {
    if (!channelInspectBtn) return;
    const url = (channelInspectUrl && channelInspectUrl.value || '').trim();
    if (!url) {
      if (channelInspectStatus) channelInspectStatus.textContent = 'Cole o link do canal YouTube.';
      return;
    }
    const publish = !!(channelInspectPublish && channelInspectPublish.checked);
    channelInspectBtn.disabled = true;
    if (channelInspectStatus) {
      channelInspectStatus.textContent = 'A buscar catálogo e gerar inspeção… isto pode demorar cerca de 1 minuto.';
    }
    try {
      const res = await fetch('/api/admin/inspecoes/from-channel', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, publish })
      });
      const data = await res.json().catch(function () { return {}; });
      if (!res.ok) {
        throw new Error(data.error || ('Erro ' + res.status));
      }
      if (channelInspectStatus) {
        channelInspectStatus.textContent =
          'Gerado: ' + (data.handle || data.slug) +
          ' · ' + (data.videoCount || 0) + ' vídeos' +
          (data.published ? ' · publicado' : ' · rascunho');
      }
      await loadPosts();
      const post = cachedPosts.find(function (p) { return p.slug === data.slug; });
      if (post) {
        openEditor(post);
      } else if (data.slug) {
        const one = await fetch('/api/posts/' + encodeURIComponent(data.slug), { credentials: 'include' });
        if (one.ok) openEditor(await one.json());
      }
    } catch (e) {
      if (channelInspectStatus) {
        channelInspectStatus.textContent = e.message || 'Falha ao gerar inspeção.';
      }
    } finally {
      channelInspectBtn.disabled = false;
    }
  }

  if (channelInspectBtn) {
    channelInspectBtn.addEventListener('click', generateChannelInspection);
  }
  if (channelInspectUrl) {
    channelInspectUrl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        generateChannelInspection();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (currentView !== 'list') return;
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'n') return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    e.preventDefault();
    openEditor(null);
  });

  cancelEditBtn.addEventListener('click', closeEditor);

  if (postsSearch) postsSearch.addEventListener('input', renderStudioTable);
  if (filterCategory) filterCategory.addEventListener('change', renderStudioTable);
  if (filterStatus) filterStatus.addEventListener('change', renderStudioTable);

  if (imagePickBtn && imageInput) {
    imagePickBtn.addEventListener('click', () => imageInput.click());
  }

  if (coverClearBtn) {
    coverClearBtn.addEventListener('click', () => {
      clearCoverImage();
      result.textContent = 'Capa removida.';
    });
  }

  if (imageInput) {
    imageInput.addEventListener('change', async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;

      if (!f.type.startsWith('image/')) {
        result.textContent = 'Selecione um ficheiro de imagem (JPG, PNG, WebP ou GIF).';
        imageInput.value = '';
        return;
      }

      result.textContent = 'Enviando imagem...';
      imagePickBtn.disabled = true;

      try {
        const url = await uploadImage(f);
        if (!coverEl.value) {
          coverEl.value = url;
          updateCoverPreview();
        }
        insertAtCursor(contentEl, '\n\n![](' + url + ')\n');
        result.textContent = 'Imagem enviada e adicionada ao conteúdo.';
      } catch (err) {
        result.textContent = typeof err === 'string' ? err : 'Falha no upload da imagem.';
      }

      imagePickBtn.disabled = false;
      imageInput.value = '';
    });
  }

  async function loadPosts() {
    try {
      const res = await fetch('/api/posts', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/login.html?returnTo=/admin.html';
        return;
      }
      cachedPosts = await res.json();
      renderStudioTable();
      if (window.adminRenderCharts) window.adminRenderCharts(cachedPosts);
    } catch (err) {
      if (postsEmpty) {
        postsEmpty.hidden = false;
        postsEmpty.textContent = 'Erro ao carregar publicações.';
      }
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    result.textContent = 'Salvando...';

    const category = categoryEl.value;
    const payload = {
      title: titleEl.value.trim(),
      excerpt: excerptEl.value.trim(),
      coverImage: coverEl.value.trim(),
      category,
      content: contentEl.value,
      format: 'markdown',
      published: publishedEl.checked
    };
    if (category === 'inspecao' && serieEl && serieEl.value) {
      payload.series = serieEl.value;
    }

    const isEdit = !!editingSlug;
    const endpoint = isEdit ? '/api/posts/' + editingSlug : '/api/posts';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        result.textContent = data.error || 'Erro ao salvar.';
        return;
      }

      const listUrl = listingUrl(category);
      const openUrl = data.url || '';
      const statusMsg = publishedEl.checked
        ? (isEdit ? 'Publicação atualizada.' : 'Publicação criada.')
        : 'Rascunho salvo.';

      await loadPosts();
      closeEditor();

      if (postsEmpty && statusMsg) {
        postsEmpty.hidden = false;
        postsEmpty.className = 'admin-studio-toast';
        postsEmpty.textContent = statusMsg;
        if (openUrl && publishedEl.checked) {
          postsEmpty.innerHTML = statusMsg +
            ' <a href="' + escapeAttr(openUrl) + '" target="_blank" rel="noopener">Ver artigo</a> · ' +
            '<a href="' + escapeAttr(listUrl) + '" target="_blank" rel="noopener">Ver listagem</a>';
        }
        setTimeout(() => {
          postsEmpty.hidden = true;
          postsEmpty.className = 'admin-studio-empty result-muted';
          renderStudioTable();
        }, 5000);
      }
    } catch (err) {
      result.textContent = 'Falha na requisição.';
    }
  });

  updatePreview();
  loadPosts().then(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (slug) {
      const post = cachedPosts.find((x) => x.slug === slug);
      if (post) openEditor(post);
      else showView('list');
    } else if (params.get('new')) {
      openEditor(null);
    } else {
      showView('list');
    }
  });

  return {
    async openSlug(slug) {
      await loadPosts();
      const post = cachedPosts.find((x) => x.slug === slug);
      if (post) openEditor(post);
    }
  };
}

function initIconsPanel() {
  const showBtn   = document.getElementById('show-icons-btn');
  const backBtn   = document.getElementById('icons-back-btn');
  const listView  = document.getElementById('admin-list-view');
  const editorView = document.getElementById('admin-editor-view');
  const iconsView = document.getElementById('admin-icons-view');
  const fileInput = document.getElementById('icons-file-input');
  const publishBtn = document.getElementById('icons-publish-btn');
  const statusEl  = document.getElementById('icons-status');
  const current192 = document.getElementById('icons-current-192');
  const currentFav = document.getElementById('icons-current-favicon');
  const currentApp = document.getElementById('icons-current-app');
  const previewWrap = document.getElementById('icons-preview-wrap');
  const previewImg  = document.getElementById('icons-preview-img');

  if (!showBtn || !iconsView) return;

  let pendingDataUrl = null;

  async function loadCurrentIcons() {
    try {
      const res = await fetch('/api/admin/icons', { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json();
      const bust = '&t=' + Date.now();
      if (current192) current192.src = data.icons.icon192 + bust;
      if (currentFav) currentFav.src = (data.icons.favicon48 || data.icons.favicon) + bust;
      if (currentApp) currentApp.src = data.icons.appIcon + bust;
      if (data.missing && data.missing.length && statusEl) {
        statusEl.textContent = 'Ficheiros em falta: ' + data.missing.join(', ');
        statusEl.style.color = 'var(--danger, red)';
      }
    } catch (e) { /* ignore */ }
  }

  function showIconsView() {
    if (listView)   listView.hidden   = true;
    if (editorView) editorView.hidden = true;
    iconsView.hidden = false;
    loadCurrentIcons();
  }

  function hideIconsView() {
    iconsView.hidden = true;
    if (listView) listView.hidden = false;
    pendingDataUrl = null;
    if (previewWrap) previewWrap.hidden = true;
    if (publishBtn) publishBtn.disabled = true;
    if (statusEl) statusEl.textContent = '';
    if (fileInput) fileInput.value = '';
  }

  showBtn.addEventListener('click', showIconsView);
  if (backBtn) backBtn.addEventListener('click', hideIconsView);

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;

      if (!f.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
        statusEl.textContent = 'Use PNG, JPG ou WebP.';
        return;
      }
      if (f.size > 8 * 1024 * 1024) {
        statusEl.textContent = 'Imagem muito grande (máx. 8 MB).';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        pendingDataUrl = reader.result;
        if (previewImg) previewImg.src = pendingDataUrl;
        if (previewWrap) previewWrap.hidden = false;
        if (publishBtn) publishBtn.disabled = false;
        statusEl.textContent = 'Pronto para publicar.';
        statusEl.style.color = 'var(--verde)';
      };
      reader.readAsDataURL(f);
    });
  }

  if (publishBtn) {
    publishBtn.addEventListener('click', async () => {
      if (!pendingDataUrl) return;

      publishBtn.disabled = true;
      publishBtn.textContent = 'Gerando ícones…';
      statusEl.style.color = '';
      statusEl.textContent = 'A processar imagem e gerar todos os tamanhos…';

      try {
        const res = await fetch('/api/admin/update-icons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ data: pendingDataUrl })
        });
        const json = await res.json();

        if (!res.ok) {
          statusEl.textContent = json.error || 'Erro ao publicar ícones.';
          statusEl.style.color = 'var(--danger, red)';
          publishBtn.disabled = false;
          publishBtn.textContent = 'Publicar ícones';
          return;
        }

        statusEl.textContent = '✓ v' + json.version +
          ' — site/aba, header, PWA e favicons Google actualizados. Google Search pode demorar dias. Ctrl+F5 no browser; no app, reabra o atalho.';
        statusEl.style.color = 'var(--verde)';
        publishBtn.textContent = 'Publicar ícones';
        pendingDataUrl = null;
        if (fileInput) fileInput.value = '';
        if (previewWrap) previewWrap.hidden = true;

        setTimeout(() => loadCurrentIcons(), 500);

      } catch (e) {
        statusEl.textContent = 'Falha de rede. Tente novamente.';
        statusEl.style.color = 'var(--danger, red)';
        publishBtn.disabled = false;
        publishBtn.textContent = 'Publicar ícones';
      }
    });
  }
}
