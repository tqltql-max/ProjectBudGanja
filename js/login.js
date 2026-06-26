document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const noticeEl = document.getElementById('login-static-notice');
  const submitBtn = form.querySelector('button[type="submit"]');

  const serverOk = await isServerAvailable();

  if (!serverOk) {
    noticeEl.hidden = false;
    form.querySelectorAll('input').forEach((el) => { el.disabled = true; });
    submitBtn.disabled = true;
    return;
  }

  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (res.ok) {
      window.location.href = 'admin.html';
      return;
    }
  } catch (e) { /* stay on login page */ }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const type = res.headers.get('content-type') || '';
      if (!type.includes('application/json')) {
        errorEl.textContent = 'Servidor indisponível. Execute npm start e aceda via http://localhost:8080';
        return;
      }
      const data = await res.json();
      if (res.ok) {
        window.location.href = 'admin.html';
        return;
      }
      errorEl.textContent = data.error || 'Falha no login.';
    } catch (err) {
      errorEl.textContent = 'Servidor indisponível. Execute npm start e aceda via http://localhost:8080';
    }
  });
});
