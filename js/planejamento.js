document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('planejamento-loading');
  const loginEl = document.getElementById('planejamento-login');
  const onboardingEl = document.getElementById('planejamento-onboarding');
  const appEl = document.getElementById('planejamento-app');
  const liveStatusEl = document.getElementById('planejamento-live-status');
  const statsEl = document.getElementById('planejamento-stats');
  const itemsEl = document.getElementById('planejamento-items');
  const emptyEl = document.getElementById('planejamento-empty');
  const formEl = document.getElementById('planejamento-item-form');
  const nameInput = document.getElementById('planejamento-item-name');
  const categorySelect = document.getElementById('planejamento-item-category');
  const qtyInput = document.getElementById('planejamento-item-qty');
  const priceInput = document.getElementById('planejamento-item-price');
  const storeInput = document.getElementById('planejamento-item-store');
  const urlInput = document.getElementById('planejamento-item-url');
  const notesInput = document.getElementById('planejamento-item-notes');
  const priceSearchBtn = document.getElementById('planejamento-price-search');
  const planNotesEl = document.getElementById('planejamento-plan-notes');
  const planNotesSaveBtn = document.getElementById('planejamento-notes-save');
  const avatarEl = document.getElementById('planejamento-avatar');

  const CATEGORIES = {
    estufa: 'Estufa / tenda',
    iluminacao: 'Iluminação',
    ventilacao: 'Ventilação e clima',
    irrigacao: 'Rega e nutrientes',
    substrato: 'Substrato e vasos',
    medicao: 'Medição (pH, EC…)',
    seguranca: 'Filtros e segurança',
    outro: 'Outro'
  };

  let plan = { title: '', notes: '', items: [], updatedAt: null };
  let saveTimer = null;
  let liveStatusTimer = null;

  function sanitizeUsername(raw) {
    const base = String(raw || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '')
      .replace(/[._-]{2,}/g, '-')
      .replace(/^[._-]+|[._-]+$/g, '');
    if (base.length < 3 || base.length > 32) return '';
    return base;
  }

  function calculateAgeFromBirthDate(raw) {
    const text = String(raw || '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
    const birth = new Date(text + 'T00:00:00.000Z');
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getUTCFullYear() - birth.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - birth.getUTCMonth();
    const dayDiff = now.getUTCDate() - birth.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
    if (age < 0 || age > 120) return null;
    return age;
  }

  function isProfileCompleteForPlanning(userData) {
    if (!userData) return false;
    if (typeof userData.profileComplete === 'boolean') return userData.profileComplete;
    const profile = userData.profile || {};
    const nameOk = String(profile.displayName || '').trim().length >= 2;
    const usernameOk = !!sanitizeUsername(profile.username || userData.username || '');
    const age = calculateAgeFromBirthDate(profile.birthDate || userData.birthDate || '')
      || (profile.age != null ? Number(profile.age) : null);
    const ageOk = age != null && !isNaN(age) && age >= 18;
    return nameOk && usernameOk && ageOk;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatMoney(value) {
    if (value == null || value === '') return '—';
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function parsePrice(raw) {
    const cleaned = String(raw || '').trim().replace(/\./g, '').replace(',', '.');
    if (!cleaned) return null;
    const n = parseFloat(cleaned);
    if (isNaN(n) || n < 0) return null;
    return Math.round(n * 100) / 100;
  }

  function flashStatus(message, isError) {
    if (!liveStatusEl || !message) return;
    liveStatusEl.hidden = false;
    liveStatusEl.textContent = message;
    liveStatusEl.classList.toggle('is-error', !!isError);
    liveStatusEl.classList.remove('is-fade');
    clearTimeout(liveStatusTimer);
    liveStatusTimer = setTimeout(() => {
      liveStatusEl.classList.add('is-fade');
      setTimeout(() => {
        liveStatusEl.hidden = true;
        liveStatusEl.classList.remove('is-fade');
      }, 350);
    }, 2800);
  }

  function buildPriceSearchUrl(name) {
    const q = encodeURIComponent(String(name || '').trim() + ' preço comprar');
    return 'https://www.google.com/search?q=' + q;
  }

  function computeTotals(items) {
    let total = 0;
    let priced = 0;
    let purchased = 0;
    items.forEach((item) => {
      if (item.purchased) purchased += 1;
      if (item.estimatedPrice != null) {
        total += item.estimatedPrice * (item.qty || 1);
        priced += 1;
      }
    });
    return { total, priced, purchased, count: items.length };
  }

  function renderStats() {
    if (!statsEl) return;
    const totals = computeTotals(plan.items || []);
    statsEl.innerHTML =
      '<span class="perfil-hub-chip planejamento-stat"><strong>' + totals.count + '</strong> ' +
      (totals.count === 1 ? 'item' : 'itens') + '</span>' +
      '<span class="perfil-hub-chip planejamento-stat"><strong>' + totals.purchased + '</strong> comprados</span>' +
      (totals.priced
        ? '<span class="perfil-hub-chip planejamento-stat planejamento-stat-total"><strong>' +
          escapeHtml(formatMoney(totals.total)) + '</strong> estimado</span>'
        : '');
  }

  function renderItems() {
    const items = plan.items || [];
    if (emptyEl) emptyEl.hidden = items.length > 0;
    if (itemsEl) itemsEl.hidden = !items.length;
    if (!itemsEl) return;
    if (!items.length) {
      itemsEl.innerHTML = '';
      renderStats();
      return;
    }
    itemsEl.innerHTML = items.map((item) => {
      const catLabel = CATEGORIES[item.category] || CATEGORIES.outro;
      const lineTotal = item.estimatedPrice != null ? item.estimatedPrice * (item.qty || 1) : null;
      const metaParts = [catLabel, 'Qtd. ' + (item.qty || 1)];
      if (item.storeName) metaParts.push(item.storeName);
      if (item.notes) metaParts.push(item.notes);
      const linkHtml = item.productUrl
        ? ' <a href="' + escapeHtml(item.productUrl) + '" target="_blank" rel="noopener noreferrer">Ver link</a>'
        : '';
      return (
        '<li class="planejamento-item' + (item.purchased ? ' is-purchased' : '') + '" data-item-id="' + escapeHtml(item.id) + '">' +
        '<div class="planejamento-item-top">' +
        '<div><p class="planejamento-item-name">' + escapeHtml(item.name) + '</p>' +
        '<p class="planejamento-item-meta">' + escapeHtml(metaParts.join(' · ')) + linkHtml + '</p></div>' +
        (lineTotal != null ? '<span class="planejamento-item-price">' + escapeHtml(formatMoney(lineTotal)) + '</span>' : '') +
        '</div>' +
        '<div class="planejamento-item-actions">' +
        '<button type="button" class="cultivo-section-nav-btn planejamento-toggle-btn" data-item-id="' + escapeHtml(item.id) + '">' +
        (item.purchased ? 'Marcar pendente' : 'Marcar comprado') + '</button>' +
        '<button type="button" class="cultivo-section-nav-btn planejamento-search-btn" data-item-id="' + escapeHtml(item.id) + '">Pesquisar preços</button>' +
        '<button type="button" class="cultivo-section-nav-btn planejamento-delete-btn" data-item-id="' + escapeHtml(item.id) + '">Remover</button>' +
        '</div></li>'
      );
    }).join('');
    bindItemActions();
    renderStats();
  }

  function bindItemActions() {
    if (!itemsEl) return;
    itemsEl.querySelectorAll('.planejamento-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-item-id');
        const item = (plan.items || []).find((row) => row.id === id);
        if (!item) return;
        item.purchased = !item.purchased;
        item.updatedAt = new Date().toISOString();
        renderItems();
        scheduleSave();
      });
    });
    itemsEl.querySelectorAll('.planejamento-search-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-item-id');
        const item = (plan.items || []).find((row) => row.id === id);
        if (!item) return;
        window.open(buildPriceSearchUrl(item.name), '_blank', 'noopener,noreferrer');
      });
    });
    itemsEl.querySelectorAll('.planejamento-delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-item-id');
        plan.items = (plan.items || []).filter((row) => row.id !== id);
        renderItems();
        scheduleSave(true);
      });
    });
  }

  async function savePlan(options) {
    const opts = options || {};
    try {
      const res = await fetch('/api/infra-plan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: plan.title || '',
          notes: plan.notes || '',
          items: plan.items || []
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        flashStatus(data.error || 'Não foi possível guardar.', true);
        return false;
      }
      plan = data.infraPlan || plan;
      if (opts.message) flashStatus(opts.message, false);
      renderItems();
      return true;
    } catch (e) {
      flashStatus('Erro de rede ao guardar.', true);
      return false;
    }
  }

  function scheduleSave(showMessage) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      savePlan(showMessage ? { message: 'Lista guardada.' } : {});
    }, 450);
  }

  function fillCategorySelect() {
    if (!categorySelect) return;
    categorySelect.innerHTML = Object.keys(CATEGORIES).map((key) =>
      '<option value="' + key + '">' + escapeHtml(CATEGORIES[key]) + '</option>'
    ).join('');
  }

  function resetItemForm() {
    if (formEl) formEl.reset();
    if (qtyInput) qtyInput.value = '1';
    if (categorySelect) categorySelect.value = 'estufa';
    if (priceSearchBtn) priceSearchBtn.hidden = true;
  }

  function showView(mode) {
    if (loadingEl) loadingEl.hidden = mode !== 'loading';
    if (loginEl) loginEl.hidden = mode !== 'login';
    if (onboardingEl) onboardingEl.hidden = mode !== 'onboarding';
    if (appEl) appEl.hidden = mode !== 'app';
  }

  async function loadPlan() {
    const res = await fetch('/api/infra-plan', { credentials: 'include' });
    if (res.status === 401) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'load failed');
    return data.infraPlan || { items: [], notes: '', title: '' };
  }

  async function init() {
    fillCategorySelect();
    resetItemForm();

    let user;
    try {
      const meRes = await fetch('/api/user/me', { credentials: 'include' });
      const meData = await meRes.json().catch(() => ({}));
      if (!meRes.ok || !meData.authenticated) {
        showView('login');
        return;
      }
      user = meData;
      if (!isProfileCompleteForPlanning(meData)) {
        showView('onboarding');
        return;
      }
      if (avatarEl && meData.picture) {
        avatarEl.src = meData.picture;
      }
    } catch (e) {
      showView('login');
      return;
    }

    try {
      plan = await loadPlan();
      if (planNotesEl) planNotesEl.value = plan.notes || '';
      renderItems();
      showView('app');
    } catch (e) {
      flashStatus('Não foi possível carregar o planejamento.', true);
      showView('app');
    }
  }

  if (formEl) {
    formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = String(nameInput && nameInput.value || '').trim();
      if (!name) return;
      const item = {
        id: 'i' + Date.now(),
        name: name,
        category: categorySelect ? categorySelect.value : 'outro',
        qty: qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1,
        estimatedPrice: parsePrice(priceInput && priceInput.value),
        storeName: String(storeInput && storeInput.value || '').trim(),
        productUrl: String(urlInput && urlInput.value || '').trim(),
        notes: String(notesInput && notesInput.value || '').trim(),
        purchased: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      plan.items = [item].concat(plan.items || []);
      resetItemForm();
      renderItems();
      scheduleSave(true);
      if (nameInput) nameInput.focus();
    });
  }

  if (nameInput && priceSearchBtn) {
    nameInput.addEventListener('input', () => {
      priceSearchBtn.hidden = !String(nameInput.value || '').trim();
    });
    priceSearchBtn.addEventListener('click', () => {
      const name = String(nameInput.value || '').trim();
      if (!name) return;
      window.open(buildPriceSearchUrl(name), '_blank', 'noopener,noreferrer');
    });
  }

  if (planNotesSaveBtn && planNotesEl) {
    planNotesSaveBtn.addEventListener('click', async () => {
      plan.notes = String(planNotesEl.value || '').trim();
      await savePlan({ message: 'Notas guardadas.' });
    });
  }

  showView('loading');
  init();
});
