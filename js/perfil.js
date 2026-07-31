document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('perfil-loading');
  const appEl = document.getElementById('perfil-app');
  const onboardingEl = document.getElementById('perfil-onboarding');
  const form = document.getElementById('perfil-form');
  const formStatus = document.getElementById('perfil-form-status');
  const formTitle = document.getElementById('perfil-form-title');
  const onboardingIntro = document.getElementById('perfil-onboarding-intro');
  const editBtn = document.getElementById('perfil-edit-btn');
  const cancelEditBtn = document.getElementById('perfil-cancel-edit-btn');
  const logoutBtn = document.getElementById('perfil-logout-btn');
  const accountEl = document.getElementById('perfil-account');
  const accountEditBtn = document.getElementById('perfil-account-edit-btn');
  const liveStatusEl = document.getElementById('perfil-live-status');
  const incompleteBannerEl = document.getElementById('perfil-incomplete-banner');
  const completeBtn = document.getElementById('perfil-complete-btn');

  const PAGE_SELF = '/perfil.html';

  let user = null;
  let liveStatusTimer = null;
  let profileSaving = false;

  const MIN_USER_AGE = 18;
  const DEFAULT_AVATAR = '/imagens/avatars/inspector.svg';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message || '';
    el.style.color = isError ? 'var(--color-danger)' : '';
  }

  function flashLiveStatus(message, isError) {
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
    }, 3200);
  }

  function firstName(profile, fallbackName) {
    const raw = (profile && profile.displayName) || fallbackName || '';
    return String(raw).trim().split(/\s+/)[0] || 'Cultivador';
  }

  function resolveProfileAge(profile, data) {
    const raw = profile && profile.age != null
      ? profile.age
      : (data && data.age != null ? data.age : null);
    const age = Number(raw);
    return Number.isFinite(age) ? age : NaN;
  }

  function resolveProfileName(profile, data) {
    return String(
      (profile && profile.displayName) ||
      (data && data.name) ||
      ''
    ).trim();
  }

  function isProfileComplete(profile, data) {
    // Confia no cálculo local — o flag da API pode ficar desactualizado com birth_date antigo.
    if (!profile && !data) return false;
    if (data && data.profileComplete === true) return true;
    const name = resolveProfileName(profile, data);
    const age = resolveProfileAge(profile, data);
    return name.length >= 2 && !isNaN(age) && age >= MIN_USER_AGE;
  }

  function wantsExplicitEdit() {
    try {
      return new URLSearchParams(window.location.search).get('edit') === '1';
    } catch (e) {
      return false;
    }
  }

  function clearEditQuery() {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('edit')) return;
      url.searchParams.delete('edit');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch (e) { /* ignore */ }
  }

  function validateRegistrationForm() {
    const nameEl = document.getElementById('profile-displayName');
    const ageEl = document.getElementById('profile-age');
    const whatsappEl = document.getElementById('profile-whatsapp');
    const name = nameEl ? nameEl.value.trim() : '';
    const age = ageEl ? parseInt(ageEl.value, 10) : NaN;
    const whatsappDigits = whatsappEl ? String(whatsappEl.value || '').replace(/\D/g, '') : '';
    if (name.length < 2) {
      return 'Informe um nome válido (mínimo 2 caracteres).';
    }
    if (isNaN(age) || age < MIN_USER_AGE) {
      return 'É necessário ter 18 anos ou mais para utilizar o site.';
    }
    if (age > 120) {
      return 'Informe uma idade válida.';
    }
    if (whatsappDigits && (whatsappDigits.length < 10 || whatsappDigits.length > 15)) {
      return 'WhatsApp inválido — use DDD + número (10 a 15 dígitos), ou deixe em branco.';
    }
    return '';
  }

  function getProfilePicture(data) {
    if (!data) return DEFAULT_AVATAR;
    if (data.picture) return data.picture;
    if (data.googlePicture) return data.googlePicture;
    return DEFAULT_AVATAR;
  }

  function broadcastProfilePicture(data) {
    const source = data || user;
    const picture = getProfilePicture(source);
    const name = source && (source.name || (source.profile && source.profile.displayName) || '');
    window.dispatchEvent(new CustomEvent('budganja:user-profile', {
      detail: { picture: picture, name: name }
    }));
  }

  function formatWhatsappDisplay(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (!digits) return '—';
    if (digits.length === 11) {
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
    }
    if (digits.length === 10) {
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    }
    return digits;
  }

  function updateAccountSummary(data) {
    const profile = data && data.profile ? data.profile : {};
    const name = String(profile.displayName || data.name || '').trim() || '—';
    const age = profile.age != null && !isNaN(profile.age) ? String(profile.age) + ' anos' : '—';
    const email = String(data && data.email || '').trim() || '—';
    const whatsapp = formatWhatsappDisplay(profile.whatsapp);
    const nameEl = document.getElementById('perfil-summary-name');
    const ageEl = document.getElementById('perfil-summary-age');
    const emailEl = document.getElementById('perfil-summary-email');
    const whatsappEl = document.getElementById('perfil-summary-whatsapp');
    const badgeEl = document.getElementById('perfil-account-badge');
    if (nameEl) nameEl.textContent = name;
    if (ageEl) ageEl.textContent = age;
    if (emailEl) emailEl.textContent = email;
    if (whatsappEl) whatsappEl.textContent = whatsapp;
    if (badgeEl) badgeEl.hidden = !isProfileComplete(profile, data);
  }

  function updateUserHeader(data) {
    const avatar = document.getElementById('perfil-avatar');
    const nameEl = document.getElementById('perfil-name');
    const emailEl = document.getElementById('perfil-email');
    if (avatar && data) {
      const pic = getProfilePicture(data);
      avatar.src = pic;
      avatar.alt = data.name || 'Avatar';
      avatar.hidden = false;
    }
    if (nameEl) {
      const full = (data.profile && data.profile.displayName) || data.name || '';
      nameEl.textContent = String(full).trim() || 'Conta';
    }
    if (emailEl) emailEl.textContent = data.email || '';
    updateAccountSummary(data);
  }

  function readForm() {
    const nameEl = document.getElementById('profile-displayName');
    const ageEl = document.getElementById('profile-age');
    const whatsappEl = document.getElementById('profile-whatsapp');
    const base = user && user.profile ? Object.assign({}, user.profile) : {};
    if (nameEl) base.displayName = nameEl.value.trim();
    if (ageEl && ageEl.value !== '') {
      const age = parseInt(ageEl.value, 10);
      base.age = isNaN(age) ? null : age;
    }
    if (whatsappEl) {
      base.whatsapp = String(whatsappEl.value || '').replace(/\D/g, '');
    }
    return base;
  }

  function fillForm(profile) {
    const p = profile || {};
    const nameEl = document.getElementById('profile-displayName');
    const ageEl = document.getElementById('profile-age');
    const whatsappEl = document.getElementById('profile-whatsapp');
    if (nameEl) {
      nameEl.value = p.displayName || (user && user.name) || '';
    }
    if (ageEl) {
      ageEl.value = p.age != null && !isNaN(p.age) ? String(p.age) : '';
    }
    if (whatsappEl) {
      whatsappEl.value = p.whatsapp ? String(p.whatsapp).replace(/\D/g, '') : '';
    }
  }

  const PHASE_ORDER = ['planejamento', 'germinacao', 'vegetativo', 'floracao', 'colheita'];
  const PHASE_EVO = {
    planejamento: { dir: 'perfil-evolucao', file: '01-semente.png', short: 'Semente' },
    germinacao: { dir: 'cultivo-cards', file: 'germinacao.png', short: 'Germinação' },
    vegetativo: { dir: 'cultivo-cards', file: 'vegetativo.png', short: 'Vegetação' },
    floracao: { dir: 'cultivo-cards', file: 'floracao.png', short: 'Floração' },
    colheita: { dir: 'cultivo-cards', file: 'colheita.png', short: 'Colheita' }
  };
  const SENIOR_EVO = { dir: 'perfil-evolucao', file: '07-cultivador-senior.png', short: 'Sênior' };

  function assetVersionToken() {
    if (typeof ASSET_V !== 'undefined' && ASSET_V) return String(ASSET_V);
    const script = document.querySelector('script[src*="/js/layout.js"]');
    const match = script && String(script.getAttribute('src') || '').match(/[?&]v=([^&]+)/);
    return match ? match[1] : '241';
  }

  function evoSrc(meta) {
    const dir = (meta && meta.dir) || 'cultivo-cards';
    const file = (meta && meta.file) || 'germinacao.png';
    return '/imagens/' + dir + '/' + file + '?v=' + encodeURIComponent(assetVersionToken());
  }

  function renderPerfilEvolutionTrack(phase, seniorUnlocked) {
    const trackEl = document.getElementById('perfil-evo-track');
    const wrapEl = document.getElementById('perfil-evo-wrap');
    const statusEl = document.getElementById('perfil-evo-status');
    if (!trackEl || !wrapEl) return;
    const current = PHASE_ORDER.includes(phase) ? phase : 'germinacao';
    const currentIdx = PHASE_ORDER.indexOf(current);
    const labels = {
      planejamento: 'Planejamento',
      germinacao: 'Germinação',
      vegetativo: 'Vegetativo',
      floracao: 'Floração',
      colheita: 'Colheita'
    };
    const items = PHASE_ORDER.map((id, idx) => {
      let state = 'is-upcoming';
      if (idx < currentIdx) state = 'is-done';
      if (idx === currentIdx) state = 'is-current';
      const meta = PHASE_EVO[id];
      return (
        '<li class="cultivo-evo-step ' + state + '">' +
        '<span class="cultivo-evo-step-icon" aria-hidden="true">' +
        '<img class="cultivo-phase-art" src="' + escapeHtml(evoSrc(meta)) + '" alt="" width="64" height="64" loading="lazy" decoding="async">' +
        '</span>' +
        '<span class="cultivo-evo-step-label">' + escapeHtml(meta.short) + '</span>' +
        '</li>'
      );
    }).join('');
    const senior = (
      '<li class="cultivo-evo-step cultivo-evo-step--senior ' + (seniorUnlocked ? 'is-current' : 'is-upcoming') + '">' +
      '<span class="cultivo-evo-step-icon" aria-hidden="true">' +
      '<img class="cultivo-phase-art" src="' + escapeHtml(evoSrc(SENIOR_EVO)) + '" alt="" width="64" height="64" loading="lazy" decoding="async">' +
      '</span>' +
      '<span class="cultivo-evo-step-label">' + escapeHtml(SENIOR_EVO.short) + '</span>' +
      '</li>'
    );
    trackEl.innerHTML = '<ol class="cultivo-evo-steps">' + items + senior + '</ol>';
    if (statusEl) {
      statusEl.textContent = seniorUnlocked
        ? 'Fase actual: ' + (labels[current] || current) + ' · distintivo Sênior desbloqueado.'
        : 'Fase actual: ' + (labels[current] || current) + '. Avance no diário para evoluir.';
    }
    wrapEl.hidden = false;
  }

  async function loadPerfilEvolution() {
    const wrapEl = document.getElementById('perfil-evo-wrap');
    try {
      const res = await fetch('/api/cultivo', { credentials: 'include' });
      if (!res.ok) {
        if (wrapEl) wrapEl.hidden = true;
        return;
      }
      const data = await res.json().catch(() => ({}));
      const cultivo = data.cultivo || data;
      const logs = Array.isArray(cultivo.growLogs) ? cultivo.growLogs : [];
      if (!logs.length) {
        if (wrapEl) wrapEl.hidden = true;
        return;
      }
      const activeId = cultivo.activeGrowLogId || '';
      const active = logs.find((g) => g.id === activeId) || logs[0];
      const phase = (active && active.phase) || cultivo.phase || 'germinacao';
      const seniorUnlocked = logs.some((g) => g.phase === 'colheita');
      renderPerfilEvolutionTrack(phase, seniorUnlocked);
    } catch (e) {
      if (wrapEl) wrapEl.hidden = true;
    }
  }

  function showIncompleteBanner(show) {
    if (!incompleteBannerEl) return;
    incompleteBannerEl.hidden = !show;
  }

  function showAccountView() {
    if (onboardingEl) onboardingEl.hidden = true;
    if (accountEl) accountEl.hidden = false;
    if (editBtn) {
      editBtn.hidden = false;
      editBtn.textContent = 'Editar perfil';
    }
    if (cancelEditBtn) cancelEditBtn.hidden = true;
    // Banner só se faltar nome — idade em falta resolve-se em «Editar perfil», sem loop de cadastro.
    const hasName = resolveProfileName(user && user.profile, user).length >= 2;
    showIncompleteBanner(user ? !hasName : false);
    clearEditQuery();
    void loadPerfilEvolution();
  }

  function showOnboardingView(isEdit, opts) {
    opts = opts || {};
    if (onboardingEl) onboardingEl.hidden = false;
    if (accountEl) accountEl.hidden = true;
    if (editBtn) editBtn.hidden = true;
    if (cancelEditBtn) cancelEditBtn.hidden = !isEdit;
    showIncompleteBanner(false);
    if (formTitle) {
      formTitle.textContent = 'Editar perfil';
    }
    if (onboardingIntro) {
      onboardingIntro.textContent = 'Actualize o nome, a idade (18+) e o WhatsApp (opcional). A foto vem da conta Google.';
    }
    if (opts.scroll !== false && onboardingEl) {
      onboardingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async function saveProfilePayload(payload, statusEl) {
    if (profileSaving) return null;
    profileSaving = true;
    if (statusEl) setStatus(statusEl, 'A guardar…');
    try {
      const accountPayload = {
        displayName: payload.displayName,
        age: payload.age,
        whatsapp: payload.whatsapp != null ? payload.whatsapp : ''
      };
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(accountPayload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (statusEl) setStatus(statusEl, data.error || 'Erro ao guardar.', true);
        flashLiveStatus(data.error || 'Erro ao guardar.', true);
        return null;
      }
      if (data.user && data.user.profile) {
        const merged = Object.assign({}, data.user.profile);
        if (payload.displayName !== undefined) merged.displayName = payload.displayName;
        if (payload.age !== undefined) merged.age = payload.age;
        if (payload.whatsapp !== undefined) merged.whatsapp = payload.whatsapp;
        data.user.profile = merged;
      }
      user = data.user;
      updateUserHeader(user);
      fillForm(user.profile);
      broadcastProfilePicture(user);
      if (statusEl) setStatus(statusEl, 'Guardado.');
      return user;
    } catch (err) {
      if (statusEl) setStatus(statusEl, 'Servidor indisponível.', true);
      flashLiveStatus('Servidor indisponível — os dados ficaram na tela; tente guardar de novo.', true);
      return null;
    } finally {
      profileSaving = false;
    }
  }

  function syncCommunityTermsField(data) {
    const wrap = document.getElementById('perfil-community-terms-wrap');
    const check = document.getElementById('profile-community-terms');
    const accepted = !!(data && data.communityTermsAccepted);
    if (wrap) wrap.hidden = accepted;
    if (check) {
      check.required = !accepted;
      check.checked = false;
    }
  }

  function renderUser(data) {
    user = data;
    updateUserHeader(data);
    fillForm(data.profile);
    broadcastProfilePicture(data);
    syncCommunityTermsField(data);
  }

  function redirectIfReturnTo() {
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get('returnTo');
    if (returnTo && returnTo.startsWith('/')) {
      window.location.href = returnTo;
      return true;
    }
    return false;
  }

  async function loadUser() {
    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/entrar.html?returnTo=' + encodeURIComponent(PAGE_SELF);
        return;
      }
      if (!res.ok) throw new Error('load_failed');
      const data = await res.json();
      renderUser(data);

      const complete = isProfileComplete(data.profile, data);
      const hasName = resolveProfileName(data.profile, data).length >= 2;

      // Conta aberta por defeito. Formulário só com ?edit=1, botão editar, ou sem nome.
      if (wantsExplicitEdit()) {
        showOnboardingView(true, { scroll: true });
      } else if (!hasName) {
        showOnboardingView(false, { scroll: false });
      } else {
        if (complete && redirectIfReturnTo()) return;
        showAccountView();
      }

      if (loadingEl) loadingEl.hidden = true;
      if (appEl) appEl.hidden = false;
    } catch (e) {
      if (loadingEl) {
        loadingEl.textContent = 'Não foi possível carregar o perfil. Recarregue a página.';
      }
    }
  }

  function openEditForm() {
    const complete = isProfileComplete(user && user.profile, user);
    fillForm(user && user.profile);
    showOnboardingView(complete, { scroll: true });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const validationError = validateRegistrationForm();
      if (validationError) {
        setStatus(formStatus, validationError, true);
        return;
      }
      setStatus(formStatus, 'A guardar…');
      const saveBtn = document.getElementById('perfil-save-btn');
      if (saveBtn) saveBtn.disabled = true;

      try {
        const formData = readForm();
        const wasComplete = user && isProfileComplete(user.profile, user);
        const termsCheck = document.getElementById('profile-community-terms');
        const termsWrap = document.getElementById('perfil-community-terms-wrap');
        const needsTerms = termsWrap && !termsWrap.hidden;
        if (needsTerms && (!termsCheck || !termsCheck.checked)) {
          setStatus(formStatus, 'Aceite o termo da comunidade (apenas fotos e relatos de plantas).', true);
          return;
        }
        const saved = await saveProfilePayload(formData, formStatus);
        if (!saved) return;

        if (needsTerms && termsCheck && termsCheck.checked && !saved.communityTermsAccepted) {
          const termsRes = await fetch('/api/user/community-terms', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: '{}'
          });
          const termsData = await termsRes.json().catch(() => ({}));
          if (termsRes.ok && termsData.user) {
            user = termsData.user;
            syncCommunityTermsField(user);
          }
        }

        if (!wasComplete && isProfileComplete(saved.profile, saved)) {
          if (redirectIfReturnTo()) return;
          setStatus(formStatus, 'Conta activa!');
          showAccountView();
          setStatus(formStatus, 'Perfil guardado — bem-vindo.');
        } else {
          showAccountView();
          setStatus(formStatus, 'Perfil actualizado.');
          setTimeout(() => setStatus(formStatus, ''), 2500);
        }
      } catch (err) {
        setStatus(formStatus, 'Servidor indisponível.', true);
      } finally {
        if (saveBtn) saveBtn.disabled = false;
      }
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', openEditForm);
  }

  if (accountEditBtn) {
    accountEditBtn.addEventListener('click', openEditForm);
  }

  if (completeBtn) {
    completeBtn.addEventListener('click', openEditForm);
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      showAccountView();
      setStatus(formStatus, '');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch('/api/user/logout', { method: 'POST', credentials: 'include' });
      } catch (e) { /* ignore */ }
      window.location.href = '/entrar.html';
    });
  }

  await loadUser();
});
