document.addEventListener('DOMContentLoaded', async () => {
  const errorEl = document.getElementById('entrar-error');
  const noticeEl = document.getElementById('entrar-notice');
  const btnWrap = document.getElementById('google-signin-btn');
  const redirectBtn = document.getElementById('entrar-redirect-btn');

  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo') || '/perfil.html';
  const safeReturnTo = /^\/[a-z0-9/-]+$/i.test(returnTo) && (returnTo.endsWith('.html') || returnTo.endsWith('/'))
    ? returnTo
    : '/perfil.html';

  const errorMessages = {
    invalid_client: 'Google rejeitou o Client ID. Verifique Credentials no Google Cloud (tipo Web application) e copie o ID exacto para o .env.',
    redirect_not_configured: 'Adicione GOOGLE_CLIENT_SECRET no .env e reinicie o site.',
    invalid_state: 'A ligação expirou ou o browser bloqueou cookies. Tente de novo — clique uma vez em Continuar com Google e conclua o login na Google.',
    access_denied: 'Login cancelado.'
  };

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function showNotice(message) {
    if (!noticeEl) return;
    noticeEl.hidden = false;
    noticeEl.innerHTML = message;
  }

  const urlError = params.get('error');
  if (urlError) {
    showError(errorMessages[urlError] || ('Erro Google: ' + urlError));
  }

  try {
    const meRes = await fetch('/api/user/me', { credentials: 'include' });
    if (meRes.ok) {
      window.location.href = safeReturnTo;
      return;
    }
  } catch (e) { /* continuar para login */ }

  let config = { googleEnabled: false, googleClientId: null, googleRedirectEnabled: false };
  try {
    const res = await fetch('/api/auth/config');
    if (res.ok) config = await res.json();
  } catch (e) {
    showError('Servidor indisponível. Tente novamente.');
    return;
  }

  if (!config.googleEnabled || !config.googleClientId) {
    showNotice(
      '<p><strong>Login com Google ainda não configurado no servidor.</strong></p>' +
      '<ol class="login-notice-steps">' +
      '<li>Google Cloud → Credentials → OAuth 2.0 Client ID → <strong>Web application</strong></li>' +
      '<li><em>Authorized JavaScript origins:</em><br>' +
      (config.requiredOrigins || ['https://inspetorbudganja.com.br', 'http://localhost:8080']).map(function (o) {
        return '<code>' + o + '</code>';
      }).join('<br>') +
      '</li>' +
      '<li><em>Authorized redirect URIs:</em><br><code>' + (config.redirectUri || 'https://inspetorbudganja.com.br/api/auth/google/callback') + '</code></li>' +
      '<li>OAuth consent screen → Authorized domains: <code>inspetorbudganja.com.br</code></li>' +
      '<li><code>GOOGLE_CLIENT_ID</code> e <code>GOOGLE_CLIENT_SECRET</code> no <code>.env</code></li>' +
      '<li>Reinicie: <code>.\\deploy\\start-now.ps1</code></li>' +
      '</ol>'
    );
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
