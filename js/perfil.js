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
  const PRESET_AVATARS = [
    { id: 'inspector', label: 'Inspetor', src: '/imagens/avatars/inspector.svg' },
    { id: 'leaf', label: 'Folha', src: '/imagens/avatars/leaf.svg' },
    { id: 'seedling', label: 'Muda', src: '/imagens/avatars/seedling.svg' },
    { id: 'bud', label: 'Flor', src: '/imagens/avatars/bud.svg' },
    { id: 'greenhouse', label: 'Estufa', src: '/imagens/avatars/greenhouse.svg' },
    { id: 'water', label: 'Rega', src: '/imagens/avatars/water.svg' },
    { id: 'lab', label: 'Laboratório', src: '/imagens/avatars/lab.svg' },
    { id: 'sun', label: 'Luz', src: '/imagens/avatars/sun.svg' }
  ];

  const avatarPreviewEl = document.getElementById('profile-avatar-preview');
  const avatarPresetsEl = document.getElementById('profile-avatar-presets');
  const avatarUrlEl = document.getElementById('profile-avatar-url');
  const avatarFileEl = document.getElementById('profile-avatar-file');
  const avatarCaptureEl = document.getElementById('profile-avatar-capture');
  const avatarUploadLabelEl = document.getElementById('profile-avatar-upload-label');
  const avatarCaptureLabelEl = document.getElementById('profile-avatar-capture-label');
  let avatarUploadPending = false;

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
    if (data && data.profileComplete === true) return true;
    if (data && data.profileComplete === false) return false;
    if (!profile && !data) return false;
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
    const custom = data.profile && data.profile.avatarUrl ? String(data.profile.avatarUrl).trim() : '';
    if (custom) return custom;
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

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function setAvatarPreview(url) {
    const src = url || DEFAULT_AVATAR;
    if (avatarPreviewEl) avatarPreviewEl.src = src;
    if (avatarUrlEl) avatarUrlEl.value = url || '';
    if (user && user.profile) {
      user.profile.avatarUrl = url || '';
    }
    if (avatarPresetsEl) {
      avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
        const match = btn.getAttribute('data-src') === url
          || (!url && btn.getAttribute('data-src') === DEFAULT_AVATAR);
        btn.classList.toggle('is-active', match);
        btn.setAttribute('aria-selected', match ? 'true' : 'false');
      });
    }
    updateAvatarStatus(url);
    if (user) updateUserHeader(user);
  }

  function updateAvatarStatus(url) {
    const statusEl = document.getElementById('profile-avatar-status');
    if (!statusEl) return;
    const custom = String(url || '').trim();
    if (!custom) {
      statusEl.textContent = user && user.googlePicture
        ? 'A usar a foto da conta Google.'
        : 'Escolha um avatar abaixo ou envie a sua foto.';
      return;
    }
    if (custom.indexOf('/uploads/avatar-') === 0) {
      statusEl.textContent = 'Foto personalizada seleccionada.';
      return;
    }
    const preset = PRESET_AVATARS.find((item) => item.src === custom);
    statusEl.textContent = preset
      ? 'Avatar «' + preset.label + '» seleccionado.'
      : 'Avatar seleccionado.';
  }

  async function persistAvatarChoice(message) {
    if (!user || !user.profile) return null;
    const avatarUrl = user.profile.avatarUrl != null
      ? String(user.profile.avatarUrl).trim()
      : (avatarUrlEl ? avatarUrlEl.value.trim() : '');

    updateUserHeader(user);
    broadcastProfilePicture(user);

    try {
      const res = await fetch('/api/user/profile/avatar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ avatarUrl: avatarUrl })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        flashLiveStatus(data.error || 'Erro ao guardar foto do perfil.', true);
        setStatus(formStatus, data.error || 'Erro ao guardar foto.', true);
        return null;
      }
      user = data.user;
      if (user && user.profile && avatarUrlEl) {
        avatarUrlEl.value = user.profile.avatarUrl || '';
      }
      updateUserHeader(user);
      broadcastProfilePicture(user);
      if (message) {
        flashLiveStatus(message);
        setStatus(formStatus, message);
      }
      return user;
    } catch (err) {
      flashLiveStatus('Servidor indisponível — tente de novo.', true);
      setStatus(formStatus, 'Servidor indisponível.', true);
      return null;
    }
  }

  function fillAvatarFields(profile, data) {
    const custom = profile && profile.avatarUrl ? String(profile.avatarUrl).trim() : '';
    const googleBtn = document.getElementById('profile-avatar-google-btn');
    if (googleBtn) {
      googleBtn.hidden = !(data && data.googlePicture);
    }
    if (custom) {
      setAvatarPreview(custom);
      if (avatarUploadLabelEl) {
        avatarUploadLabelEl.textContent = custom.indexOf('/uploads/avatar-') === 0
          ? 'Alterar foto'
          : 'Enviar foto';
      }
      return;
    }
    const google = data && data.googlePicture;
    const preview = google || DEFAULT_AVATAR;
    if (avatarPreviewEl) avatarPreviewEl.src = preview;
    if (avatarUrlEl) avatarUrlEl.value = '';
    if (user && user.profile) user.profile.avatarUrl = '';
    if (avatarPresetsEl) {
      avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
    }
    if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Enviar foto';
    updateAvatarStatus('');
  }

  function initAvatarPicker() {
    if (!avatarPresetsEl) return;
    avatarPresetsEl.innerHTML = PRESET_AVATARS.map((item) =>
      '<button type="button" class="perfil-avatar-option" role="option" data-src="' + item.src + '" ' +
      'data-label="' + escapeHtml(item.label) + '" aria-label="' + escapeHtml(item.label) + '" title="' + escapeHtml(item.label) + '">' +
      '<span class="perfil-avatar-option-img-wrap">' +
      '<img src="' + item.src + '" alt="" width="52" height="52" loading="lazy">' +
      '</span>' +
      '<span class="perfil-avatar-option-label">' + escapeHtml(item.label) + '</span>' +
      '</button>'
    ).join('');

    avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const src = btn.getAttribute('data-src');
        const label = btn.getAttribute('data-label') || 'Avatar';
        setAvatarPreview(src);
        if (avatarFileEl) avatarFileEl.value = '';
        if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Enviar foto';
        await persistAvatarChoice('Avatar «' + label + '» guardado.');
      });
    });

    const googleBtn = document.getElementById('profile-avatar-google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', async () => {
        if (!user || !user.googlePicture) return;
        user.profile.avatarUrl = '';
        if (avatarUrlEl) avatarUrlEl.value = '';
        if (avatarPreviewEl) avatarPreviewEl.src = user.googlePicture;
        if (avatarFileEl) avatarFileEl.value = '';
        if (avatarPresetsEl) {
          avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
          });
        }
        updateAvatarStatus('');
        await persistAvatarChoice('Foto Google restaurada.');
      });
    }

    async function uploadAvatarFile(file, inputEl, idleLabel) {
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        setStatus(formStatus, 'A imagem deve ter no máximo 2 MB.', true);
        if (inputEl) inputEl.value = '';
        return;
      }
      if (file.type && !/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) && !file.type.startsWith('image/')) {
        setStatus(formStatus, 'Use uma imagem (JPG, PNG ou WebP).', true);
        if (inputEl) inputEl.value = '';
        return;
      }
      avatarUploadPending = true;
      if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'A enviar…';
      if (avatarCaptureLabelEl) avatarCaptureLabelEl.textContent = 'A enviar…';
      setStatus(formStatus, 'A enviar foto…');

      try {
        const dataUrl = await readFileAsDataUrl(file);
        const res = await fetch('/api/user/avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ data: dataUrl })
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatus(formStatus, payload.error || 'Falha no upload.', true);
          return;
        }
        if (payload.user) {
          user = payload.user;
          if (user.profile && user.profile.avatarUrl) {
            setAvatarPreview(user.profile.avatarUrl);
          } else if (payload.url) {
            setAvatarPreview(payload.url);
          }
        } else if (payload.url) {
          setAvatarPreview(payload.url);
          await persistAvatarChoice('Foto guardada no perfil.');
          return;
        }
        updateUserHeader(user);
        broadcastProfilePicture(user);
        if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Alterar foto';
        if (avatarCaptureLabelEl) avatarCaptureLabelEl.textContent = 'Tirar foto';
        flashLiveStatus('Foto guardada no perfil.');
        setStatus(formStatus, 'Foto guardada no perfil.');
      } catch (err) {
        setStatus(formStatus, 'Servidor indisponível.', true);
      } finally {
        avatarUploadPending = false;
        if (inputEl) inputEl.value = '';
        if (idleLabel && avatarCaptureLabelEl && inputEl === avatarCaptureEl) {
          avatarCaptureLabelEl.textContent = idleLabel;
        }
      }
    }

    if (avatarFileEl) {
      avatarFileEl.addEventListener('change', async () => {
        const file = avatarFileEl.files && avatarFileEl.files[0];
        await uploadAvatarFile(file, avatarFileEl, 'Enviar foto');
      });
    }

    if (avatarCaptureEl) {
      avatarCaptureEl.addEventListener('change', async () => {
        const file = avatarCaptureEl.files && avatarCaptureEl.files[0];
        await uploadAvatarFile(file, avatarCaptureEl, 'Tirar foto');
      });
    }
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
    if (avatarUrlEl) {
      const picked = avatarUrlEl.value.trim();
      if (picked) base.avatarUrl = picked;
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
    fillAvatarFields(p, user);
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
      const complete = isProfileComplete(user && user.profile, user);
      editBtn.textContent = complete ? 'Editar perfil' : 'Completar cadastro';
    }
    if (cancelEditBtn) cancelEditBtn.hidden = true;
    showIncompleteBanner(user ? !isProfileComplete(user.profile, user) : false);
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
      formTitle.textContent = isEdit ? 'Editar perfil' : 'Completar cadastro';
    }
    if (onboardingIntro) {
      onboardingIntro.textContent = isEdit
        ? 'Actualize o nome, a idade, o WhatsApp (opcional) ou a foto de perfil. O acesso continua restrito a maiores de 18 anos.'
        : 'Informe o nome e a idade para activar o acesso. WhatsApp é opcional. Conteúdo exclusivo para maiores de 18 anos.';
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
        avatarUrl: payload.avatarUrl,
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
        if (payload.avatarUrl !== undefined) merged.avatarUrl = payload.avatarUrl;
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

      // Clicar no nome/foto do header deve abrir a conta, não o formulário.
      // Só abre cadastro automático se ainda não houver nome; edição só com ?edit=1 ou botão.
      if (wantsExplicitEdit()) {
        showOnboardingView(complete, { scroll: true });
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
    const picker = document.querySelector('.perfil-avatar-picker');
    if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const validationError = validateRegistrationForm();
      if (validationError) {
        setStatus(formStatus, validationError, true);
        return;
      }
      if (avatarUploadPending) {
        setStatus(formStatus, 'Aguarde o envio da foto terminar.', true);
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

  const radioListEl = document.getElementById('perfil-radio-list');
  const radioCountEl = document.getElementById('perfil-radio-count');
  const radioStatusEl = document.getElementById('perfil-radio-status');
  const radioSaveBtn = document.getElementById('perfil-radio-save');
  const radioOpenLink = document.getElementById('perfil-radio-open');
  const radioShareEl = document.getElementById('perfil-radio-share');
  const MAX_RADIO_TRACKS = 5;
  let radioCatalog = [];
  let radioSelected = new Set();

  function updateRadioCount() {
    if (radioCountEl) {
      radioCountEl.textContent = radioSelected.size + ' / ' + MAX_RADIO_TRACKS + ' selecionadas';
    }
  }

  function updateRadioShare(username) {
    if (!radioShareEl) return;
    if (!username || !radioSelected.size) {
      radioShareEl.hidden = true;
      radioShareEl.textContent = '';
      return;
    }
    const url = window.location.origin + '/radio/?u=' + encodeURIComponent(username);
    radioShareEl.hidden = false;
    radioShareEl.innerHTML = 'Link público: <code>' + escapeHtml(url) + '</code>';
    if (radioOpenLink) radioOpenLink.href = '/radio/?u=' + encodeURIComponent(username);
  }

  function renderRadioList() {
    if (!radioListEl) return;
    if (!radioCatalog.length) {
      radioListEl.innerHTML = '<li class="field-hint">Catálogo vazio — ainda não há músicas na rádio.</li>';
      return;
    }
    radioListEl.innerHTML = radioCatalog.map((track) => {
      const checked = radioSelected.has(track.id);
      return (
        '<li>' +
        '<label class="perfil-radio-item' + (checked ? ' is-selected' : '') + '">' +
        '<input type="checkbox" data-track-id="' + escapeHtml(track.id) + '"' + (checked ? ' checked' : '') + '>' +
        '<span class="perfil-radio-item-meta">' +
        '<strong>' + escapeHtml(track.title) + '</strong>' +
        '<span>' + escapeHtml(track.artist || '') + '</span>' +
        '</span>' +
        '</label>' +
        '</li>'
      );
    }).join('');

    radioListEl.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener('change', () => {
        const id = input.getAttribute('data-track-id');
        if (!id) return;
        if (input.checked) {
          if (radioSelected.size >= MAX_RADIO_TRACKS) {
            input.checked = false;
            setStatus(radioStatusEl, 'Máximo de ' + MAX_RADIO_TRACKS + ' músicas.', true);
            return;
          }
          radioSelected.add(id);
        } else {
          radioSelected.delete(id);
        }
        const label = input.closest('.perfil-radio-item');
        if (label) label.classList.toggle('is-selected', input.checked);
        updateRadioCount();
        setStatus(radioStatusEl, '');
        if (user && user.username) updateRadioShare(user.username);
      });
    });
    updateRadioCount();
  }

  async function loadRadioEditor() {
    if (!radioListEl) return;
    try {
      const res = await fetch('/api/user/radio', { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        radioListEl.innerHTML = '<li class="field-hint">Não foi possível carregar o catálogo.</li>';
        return;
      }
      radioCatalog = Array.isArray(data.catalog) ? data.catalog : [];
      radioSelected = new Set(Array.isArray(data.selectedIds) ? data.selectedIds : []);
      renderRadioList();
      if (user && user.username) updateRadioShare(user.username);
    } catch (e) {
      radioListEl.innerHTML = '<li class="field-hint">Servidor indisponível.</li>';
    }
  }

  if (radioSaveBtn) {
    radioSaveBtn.addEventListener('click', async () => {
      radioSaveBtn.disabled = true;
      setStatus(radioStatusEl, 'A guardar…');
      try {
        const res = await fetch('/api/user/radio', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackIds: Array.from(radioSelected) })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatus(radioStatusEl, data.error || 'Não foi possível guardar.', true);
          return;
        }
        if (data.user) user = data.user;
        radioSelected = new Set(
          Array.isArray(data.tracks) ? data.tracks.map((t) => t.id) : Array.from(radioSelected)
        );
        renderRadioList();
        if (user && user.username) updateRadioShare(user.username);
        setStatus(radioStatusEl, radioSelected.size
          ? 'Rádio guardada — toca no mini-player e no link público.'
          : 'Rádio limpa — o mini-player volta ao catálogo completo.');
        flashLiveStatus('Rádio actualizada.');
      } catch (e) {
        setStatus(radioStatusEl, 'Servidor indisponível.', true);
      } finally {
        radioSaveBtn.disabled = false;
      }
    });
  }

  await initAvatarPicker();
  await loadUser();
  await loadRadioEditor();
});
