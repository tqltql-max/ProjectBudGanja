document.addEventListener('DOMContentLoaded', async () => {
  const userLabel = document.getElementById('admin-user');
  const logoutBtn = document.getElementById('logout-btn');

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = 'login.html';
      return;
    }
    const userData = await me.json();
    if (userLabel) userLabel.textContent = userData.username || 'admin';
  } catch (e) {
    window.location.href = 'login.html';
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = 'login.html';
    });
  }

  const postsApi = initPostsPanel();
  const slug = new URLSearchParams(window.location.search).get('slug');
  if (slug && postsApi) await postsApi.openSlug(slug);
});

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
  if (category === 'equipamento') return 'equipamentos.html';
  if (category === 'inspecao') return 'inspecoes.html';
  return 'pesquisas.html';
}

function categoryLabel(category) {
  if (category === 'equipamento') return 'Equipamentos';
  if (category === 'inspecao') return 'Inspeções';
  return 'Pesquisas';
}

function initPostsPanel() {
  const form = document.getElementById('post-form');
  const result = document.getElementById('result');
  const previewEl = document.getElementById('preview');
  const postsList = document.getElementById('posts-list');
  const postsCount = document.getElementById('posts-count');
  const formHeading = document.getElementById('form-heading');
  const titleEl = document.getElementById('title');
  const excerptEl = document.getElementById('excerpt');
  const coverEl = document.getElementById('cover-image');
  const categoryEl = document.getElementById('category');
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

  function setEditMode(slug) {
    editingSlug = slug;
    const editing = !!slug;
    submitBtn.textContent = editing ? 'Salvar alterações' : 'Publicar';
    cancelEditBtn.hidden = !editing;
    formHeading.textContent = editing ? 'Editar publicação' : 'Nova publicação';
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
    coverPreview.src = url;
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
    contentEl.value = post.content_raw || '';
    publishedEl.checked = post.published !== false;
    setEditMode(post.slug);
    updateCoverPreview();
    updatePreview();
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
    result.textContent = 'Vídeo inserido. Revise o preview ao lado e clique Publicar.';
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
    youtubeUrlEl.addEventListener('paste', () => {
      setTimeout(() => {
        const val = youtubeUrlEl.value.trim();
        if (val && typeof parseYouTubeId === 'function' && parseYouTubeId(val)) {
          insertYouTubeVideo(val);
          youtubeUrlEl.value = '';
        }
      }, 0);
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
  categoryEl.addEventListener('change', schedulePreview);

  cancelEditBtn.addEventListener('click', () => {
    resetForm();
    history.replaceState({}, '', 'admin.html');
  });

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

  function renderPostsList() {
    postsList.innerHTML = '';
    postsCount.textContent = String(cachedPosts.length);

    if (!cachedPosts.length) {
      postsList.innerHTML = '<p class="result-muted">Nenhuma publicação ainda.</p>';
      return;
    }

    cachedPosts.forEach((p) => {
      const isDraft = p.published === false;
      const catLabel = categoryLabel(p.category);
      const item = document.createElement('article');
      item.className = 'admin-post-item' + (editingSlug === p.slug ? ' is-active' : '');

      item.innerHTML =
        '<div class="admin-post-head">' +
          '<strong>' + escapeText(p.title || 'Sem título') + '</strong>' +
          '<span class="admin-post-tags">' +
            '<span class="admin-tag">' + escapeText(catLabel) + '</span>' +
            (isDraft ? '<span class="admin-tag admin-tag-draft">Rascunho</span>' : '') +
          '</span>' +
        '</div>' +
        '<p class="admin-post-excerpt">' + escapeText(p.excerpt || '—') + '</p>' +
        '<div class="admin-post-meta">' + formatDatePtBR(p.date) + '</div>' +
        '<div class="admin-post-actions">' +
          '<button type="button" class="edit-btn botao admin-secondary">Editar</button>' +
          '<a href="' + escapeText(p.url) + '" target="_blank" rel="noopener" class="botao admin-secondary">Abrir</a>' +
          '<button type="button" class="delete-btn admin-danger">Excluir</button>' +
        '</div>';

      item.querySelector('.edit-btn').addEventListener('click', () => {
        fillForm(p);
        result.textContent = '';
        history.replaceState({}, '', 'admin.html?slug=' + encodeURIComponent(p.slug));
        document.querySelector('.admin-editor').scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderPostsList();
      });

      item.querySelector('.delete-btn').addEventListener('click', async () => {
        if (!confirm('Excluir "' + (p.title || 'esta publicação') + '"?')) return;
        const res = await fetch('/api/posts/' + p.slug, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) {
          result.textContent = 'Erro ao excluir.';
          return;
        }
        if (editingSlug === p.slug) {
          resetForm();
          history.replaceState({}, '', 'admin.html');
        }
        result.textContent = 'Publicação excluída.';
        await loadPosts();
      });

      postsList.appendChild(item);
    });
  }

  async function loadPosts() {
    try {
      const res = await fetch('/api/posts', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = 'login.html';
        return;
      }
      cachedPosts = await res.json();
      renderPostsList();
    } catch (err) {
      postsList.innerHTML = '<p class="result-muted">Erro ao carregar publicações.</p>';
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

      result.innerHTML = statusMsg +
        (openUrl && publishedEl.checked
          ? ' <a href="' + openUrl + '" target="_blank" rel="noopener">Ver artigo</a> · <a href="' + listUrl + '" target="_blank" rel="noopener">Ver listagem</a>'
          : '');

      resetForm();
      history.replaceState({}, '', 'admin.html');
      await loadPosts();
    } catch (err) {
      result.textContent = 'Falha na requisição.';
    }
  });

  updatePreview();
  loadPosts();

  return {
    async openSlug(slug) {
      await loadPosts();
      const post = cachedPosts.find((x) => x.slug === slug);
      if (post) fillForm(post);
    }
  };
}
