document.addEventListener('DOMContentLoaded', async () => {
  const errorEl = document.getElementById('login-error');
  const form = document.getElementById('login-form');
  const submitBtn = document.getElementById('login-submit');

  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo') || '/admin.html';
  const safeReturnTo = /^\/[a-z0-9/-]+\.html$/i.test(returnTo) ? returnTo : '/admin.html';

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  const error = params.get('error');
  if (error === 'rate_limited') {
    showError('Muitas tentativas. Aguarde cerca de 15 minutos.');
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;
      if (submitBtn) submitBtn.disabled = true;
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
          })
        });
        if (res.ok) {
          window.location.href = safeReturnTo;
          return;
        }
        const data = await res.json().catch(() => ({}));
        showError(res.status === 429
          ? (data.error || 'Muitas tentativas. Aguarde cerca de 15 minutos.')
          : (data.error || 'Credenciais inválidas'));
      } catch (err) {
        showError('Servidor indisponível. Tente novamente.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (res.ok) {
      window.location.href = safeReturnTo;
    }
  } catch (e) { /* stay on login */ }
});
