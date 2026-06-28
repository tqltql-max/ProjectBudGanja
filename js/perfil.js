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

  const PAGE_SELF = '/perfil.html';

  let user = null;
  let liveStatusTimer = null;
  let profileSaving = false;

  const MIN_USER_AGE = 18;
  const DEFAULT_AVATAR = '/imagens/avatars/leaf.svg';
  const PRESET_AVATARS = [
    { id: 'leaf', label: 'Folha', src: '/imagens/avatars/leaf.svg' },
    { id: 'seedling', label: 'Muda', src: '/imagens/avatars/seedling.svg' },
    { id: 'bud', label: 'Flor', src: '/imagens/avatars/bud.svg' },
    { id: 'greenhouse', label: 'Estufa', src: '/imagens/avatars/greenhouse.svg' },
    { id: 'water', label: 'Rega', src: '/imagens/avatars/water.svg' },
    { id: 'lab', label: 'Laboratório', src: '/imagens/avatars/lab.svg' },
    { id: 'sun', label: 'Luz', src: '/imagens/avatars/sun.svg' },
    { id: 'inspector', label: 'Inspetor', src: '/imagens/avatars/inspector.svg' }
  ];

  const avatarPreviewEl = document.getElementById('profile-avatar-preview');
  const avatarPresetsEl = document.getElementById('profile-avatar-presets');
  const avatarUrlEl = document.getElementById('profile-avatar-url');
  const avatarFileEl = document.getElementById('profile-avatar-file');
  const avatarUploadLabelEl = document.getElementById('profile-avatar-upload-label');
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

  function isProfileComplete(profile) {
    if (!profile) return false;
    const name = String(profile.displayName || '').trim();
    const age = profile.age;
    return name.length >= 2 && age !== null && !isNaN(age) && age >= MIN_USER_AGE;
  }

  function validateRegistrationForm() {
    const nameEl = document.getElementById('profile-displayName');
    const ageEl = document.getElementById('profile-age');
    const name = nameEl ? nameEl.value.trim() : '';
    const age = ageEl ? parseInt(ageEl.value, 10) : NaN;
    if (name.length < 2) {
      return 'Informe um nome válido (mínimo 2 caracteres).';
    }
    if (isNaN(age) || age < MIN_USER_AGE) {
      return 'É necessário ter 18 anos ou mais para utilizar o site.';
    }
    if (age > 120) {
      return 'Informe uma idade válida.';
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
      nameEl.textContent = isProfileComplete(data.profile)
        ? 'Olá, ' + firstName(data.profile, data.name) + '!'
        : ((data.profile && data.profile.displayName) || data.name || 'Meu perfil');
    }
    if (emailEl) emailEl.textContent = data.email || '';
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

    if (avatarFileEl) {
      avatarFileEl.addEventListener('change', async () => {
        const file = avatarFileEl.files && avatarFileEl.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          setStatus(formStatus, 'A imagem deve ter no máximo 2 MB.', true);
          avatarFileEl.value = '';
          return;
        }
        if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
          setStatus(formStatus, 'Use JPG, PNG ou WebP.', true);
          avatarFileEl.value = '';
          return;
        }
        avatarUploadPending = true;
        if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'A enviar…';
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
          flashLiveStatus('Foto guardada no perfil.');
          setStatus(formStatus, 'Foto guardada no perfil.');
        } catch (err) {
          setStatus(formStatus, 'Servidor indisponível.', true);
        } finally {
          avatarUploadPending = false;
        }
      });
    }
  }

  function readForm() {
    const nameEl = document.getElementById('profile-displayName');
    const ageEl = document.getElementById('profile-age');
    const base = user && user.profile ? Object.assign({}, user.profile) : {};
    if (nameEl) base.displayName = nameEl.value.trim();
    if (ageEl && ageEl.value !== '') {
      const age = parseInt(ageEl.value, 10);
      base.age = isNaN(age) ? null : age;
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
    if (nameEl) {
      nameEl.value = p.displayName || (user && user.name) || '';
    }
    if (ageEl) {
      ageEl.value = p.age != null && !isNaN(p.age) ? String(p.age) : '';
    }
    fillAvatarFields(p, user);
  }

  function showAccountView() {
    if (onboardingEl) onboardingEl.hidden = true;
    if (accountEl) accountEl.hidden = false;
    if (editBtn) editBtn.hidden = false;
    if (cancelEditBtn) cancelEditBtn.hidden = true;
  }

  function showOnboardingView(isEdit) {
    if (onboardingEl) onboardingEl.hidden = false;
    if (accountEl) accountEl.hidden = true;
    if (editBtn) editBtn.hidden = true;
    if (cancelEditBtn) cancelEditBtn.hidden = !isEdit;
    if (formTitle) {
      formTitle.textContent = isEdit ? 'Editar cadastro' : 'Completar cadastro';
    }
    if (onboardingIntro) {
      onboardingIntro.innerHTML = isEdit
        ? 'Altere seu nome, idade ou foto de perfil. O site é exclusivo para <strong>maiores de 18 anos</strong>.'
        : 'Informe seu nome, idade e escolha uma foto para aceder ao site. Conteúdo exclusivo para <strong>maiores de 18 anos</strong>.';
    }
    onboardingEl && onboardingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function saveProfilePayload(payload, statusEl) {
    if (profileSaving) return null;
    profileSaving = true;
    if (statusEl) setStatus(statusEl, 'A guardar…');
    try {
      const accountPayload = {
        displayName: payload.displayName,
        age: payload.age,
        avatarUrl: payload.avatarUrl
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

  function renderUser(data) {
    user = data;
    updateUserHeader(data);
    fillForm(data.profile);
    broadcastProfilePicture(data);
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
      if (loadingEl) loadingEl.hidden = true;
      if (appEl) appEl.hidden = false;
      renderUser(data);

      if (isProfileComplete(data.profile)) {
        if (redirectIfReturnTo()) return;
        showAccountView();
      } else {
        showOnboardingView(false);
      }
    } catch (e) {
      if (loadingEl) {
        loadingEl.textContent = 'Não foi possível carregar o perfil. Recarregue a página.';
      }
    }
  }

  function openEditForm() {
    fillForm(user && user.profile);
    showOnboardingView(true);
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
        const wasComplete = user && user.profile && isProfileComplete(user.profile);
        const saved = await saveProfilePayload(formData, formStatus);
        if (!saved) return;

        if (!wasComplete && isProfileComplete(saved.profile)) {
          if (redirectIfReturnTo()) return;
          setStatus(formStatus, 'Conta activa!');
          showAccountView();
          setStatus(formStatus, 'Perfil guardado — bem-vindo.');
        } else {
          showAccountView();
          setStatus(formStatus, 'Perfil actualizado.');
          if (cancelEditBtn && !cancelEditBtn.hidden) {
            setTimeout(() => setStatus(formStatus, ''), 2500);
          }
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

  const avatarEditTrigger = document.getElementById('perfil-avatar-edit-btn');
  if (avatarEditTrigger) {
    avatarEditTrigger.addEventListener('click', openEditForm);
  }

  if (accountEditBtn) {
    accountEditBtn.addEventListener('click', openEditForm);
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

  await initAvatarPicker();
  loadUser();
});
