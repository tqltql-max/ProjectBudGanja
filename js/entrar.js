document.addEventListener('DOMContentLoaded', async () => {
  const errorEl = document.getElementById('entrar-error');
  const noticeEl = document.getElementById('entrar-notice');
  const btnWrap = document.getElementById('google-signin-btn');
  const redirectBtn = document.getElementById('entrar-redirect-btn');

  const tabs = Array.from(document.querySelectorAll('.entrar-local-tab'));
  const panels = Array.from(document.querySelectorAll('.entrar-local-form[data-panel]'));
  const loginForm = document.getElementById('local-login-form');
  const registerForm = document.getElementById('local-register-form');
  const resetRequestForm = document.getElementById('local-reset-request-form');
  const resetConfirmForm = document.getElementById('local-reset-confirm-form');

  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo') || '/perfil.html';
  const safeReturnTo = /^\/[a-z0-9/-]+$/i.test(returnTo) && (returnTo.endsWith('.html') || returnTo.endsWith('/'))
    ? returnTo
    : '/perfil.html';

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function showNotice(message) {
    if (!noticeEl) return;
    noticeEl.hidden = false;
    noticeEl.textContent = message;
  }

  function clearMessages() {
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }
    if (noticeEl) {
      noticeEl.hidden = true;
      noticeEl.textContent = '';
    }
  }

  function setLocalTab(tabName) {
    tabs.forEach((btn) => {
      const isActive = btn.getAttribute('data-tab') === tabName;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach((panel) => {
      panel.hidden = panel.getAttribute('data-panel') !== tabName;
    });
  }

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      clearMessages();
      setLocalTab(btn.getAttribute('data-tab'));
    });
  });

  const urlError = params.get('error');
  const resetTokenFromUrl = String(params.get('resetToken') || '').trim();
  if (urlError) {
    const errorMessages = {
      invalid_client: 'Google rejeitou o Client ID. Verifique as credenciais no Google Cloud.',
      redirect_not_configured: 'Adicione GOOGLE_CLIENT_SECRET no .env e reinicie o site.',
      invalid_state: 'A ligação expirou ou o navegador bloqueou cookies. Tente novamente.',
      access_denied: 'Login cancelado.'
    };
    showError(errorMessages[urlError] || ('Erro Google: ' + urlError));
  }

  try {
    const meRes = await fetch('/api/user/me', { credentials: 'include' });
    if (meRes.ok) {
      window.location.href = safeReturnTo;
      return;
    }
  } catch (e) { /* continuar para login */ }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessages();
      const emailEl = document.getElementById('local-login-email');
      const passEl = document.getElementById('local-login-password');
      try {
        const res = await fetch('/api/auth/local/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: emailEl ? emailEl.value : '',
            password: passEl ? passEl.value : ''
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          showError(data.error || 'E-mail ou senha inválidos.');
          return;
        }
        window.location.href = safeReturnTo;
      } catch (err) {
        showError('Servidor indisponível. Tente novamente.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessages();
      const nameEl = document.getElementById('local-register-name');
      const emailEl = document.getElementById('local-register-email');
      const passEl = document.getElementById('local-register-password');
      const passConfirmEl = document.getElementById('local-register-password-confirm');
      const termsEl = document.getElementById('local-register-community-terms');
      const password = passEl ? passEl.value : '';
      const passwordConfirm = passConfirmEl ? passConfirmEl.value : '';
      if (password !== passwordConfirm) {
        showError('As senhas não coincidem.');
        return;
      }
      if (!termsEl || !termsEl.checked) {
        showError('Aceite os termos de uso para criar a conta.');
        return;
      }
      try {
        const res = await fetch('/api/auth/local/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            name: nameEl ? nameEl.value : '',
            email: emailEl ? emailEl.value : '',
            password: password,
            communityTermsAccepted: true
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          showError(data.error || 'Não foi possível criar a conta.');
          return;
        }
        if (data.linked) {
          showNotice('Conta local vinculada com sucesso à conta existente. A entrar...');
        }
        window.location.href = safeReturnTo;
      } catch (err) {
        showError('Servidor indisponível. Tente novamente.');
      }
    });
  }

  if (resetRequestForm) {
    resetRequestForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessages();
      const emailEl = document.getElementById('local-reset-email');
      try {
        const res = await fetch('/api/auth/local/request-reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: emailEl ? emailEl.value : '' })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          showError(data.error || 'Não foi possível processar a recuperação.');
          return;
        }
        if (data.devResetUrl) {
          showNotice('Modo local: copie e abra este link de recuperação: ' + data.devResetUrl);
        } else {
          showNotice(data.message || 'Se o e-mail existir, enviaremos instruções de recuperação.');
        }
      } catch (err) {
        showError('Servidor indisponível. Tente novamente.');
      }
    });
  }

  if (resetConfirmForm) {
    resetConfirmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessages();
      const passEl = document.getElementById('local-reset-password');
      const passConfirmEl = document.getElementById('local-reset-password-confirm');
      const password = passEl ? passEl.value : '';
      const passwordConfirm = passConfirmEl ? passConfirmEl.value : '';
      if (password !== passwordConfirm) {
        showError('As senhas não coincidem.');
        return;
      }
      if (!resetTokenFromUrl) {
        showError('Token de recuperação em falta. Solicite um novo link.');
        return;
      }
      try {
        const res = await fetch('/api/auth/local/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: resetTokenFromUrl, password: password })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          showError(data.error || 'Não foi possível redefinir a senha.');
          return;
        }
        window.location.href = safeReturnTo;
      } catch (err) {
        showError('Servidor indisponível. Tente novamente.');
      }
    });
  }

  if (resetTokenFromUrl && resetConfirmForm) {
    setLocalTab('reset');
    resetRequestForm.hidden = true;
    resetConfirmForm.hidden = false;
    showNotice('Defina sua nova senha para concluir a recuperação.');
  } else {
    setLocalTab('login');
  }

  let config = { googleEnabled: false, googleClientId: null, googleRedirectEnabled: false };
  try {
    const res = await fetch('/api/auth/config');
    if (res.ok) config = await res.json();
  } catch (e) {
    showError('Servidor indisponível. Tente novamente.');
    return;
  }

  if (!config.googleEnabled || !config.googleClientId) {
    showNotice('Login com Google não configurado no servidor. Pode usar a conta local acima.');
    return;
  }

  if (config.googleRedirectEnabled && redirectBtn) {
    redirectBtn.hidden = false;
    redirectBtn.href = '/api/auth/google/start?returnTo=' + encodeURIComponent(safeReturnTo);
    return;
  }

  async function finishLogin(credential) {
    if (errorEl) errorEl.hidden = true;
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        window.location.href = safeReturnTo;
        return;
      }
      showError(data.error || 'Não foi possível entrar com Google.');
    } catch (err) {
      showError('Servidor indisponível. Tente novamente.');
    }
  }

  window.handleGoogleCredential = function (response) {
    if (!response || !response.credential) {
      showError('Resposta Google inválida.');
      return;
    }
    finishLogin(response.credential);
  };

  function loadGsi(callback) {
    if (window.google && window.google.accounts) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = callback;
    script.onerror = () => showError('Não foi possível carregar o login Google.');
    document.head.appendChild(script);
  }

  function initGsi() {
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      showError('Não foi possível carregar o login Google.');
      return;
    }

    if (btnWrap) btnWrap.hidden = false;

    window.google.accounts.id.initialize({
      client_id: config.googleClientId,
      callback: window.handleGoogleCredential,
      auto_select: false,
      context: 'signin',
      itp_support: true
    });

    if (btnWrap) {
      window.google.accounts.id.renderButton(btnWrap, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: Math.min(360, btnWrap.offsetWidth || 360),
        locale: 'pt-BR'
      });
    }
  }

  loadGsi(initGsi);
});
