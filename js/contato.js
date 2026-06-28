document.addEventListener('DOMContentLoaded', async () => {
  const section = document.getElementById('sorteio-alerts-section');
  const introEl = document.getElementById('sorteio-alerts-intro');
  const statusEl = document.getElementById('sorteio-alerts-status');
  const subscribeBtn = document.getElementById('sorteio-alerts-btn');
  const unsubBtn = document.getElementById('sorteio-alerts-unsub-btn');

  if (!section || !subscribeBtn) return;

  const returnTo = '/info/contato.html';
  let userAuthenticated = false;
  let subscribed = false;

  function showStatus(message, type) {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message || '';
    statusEl.className = 'sorteios-message' + (type === 'error' ? ' sorteios-message--error' : type === 'ok' ? ' sorteios-message--ok' : '');
  }

  function updateUi() {
    if (subscribed) {
      if (introEl) {
        introEl.textContent = 'Você está inscrito para receber avisos de novos sorteios no e-mail da sua conta Google.';
      }
      subscribeBtn.textContent = 'Já inscrito ✓';
      subscribeBtn.disabled = true;
      subscribeBtn.classList.add('botao-home--secondary');
      if (unsubBtn) unsubBtn.hidden = false;
    } else if (userAuthenticated) {
      if (introEl) {
        introEl.textContent = 'Clique abaixo para receber avisos no e-mail da sua conta Google quando abrirmos um novo sorteio.';
      }
      subscribeBtn.textContent = 'Quero receber avisos';
      subscribeBtn.disabled = false;
      subscribeBtn.classList.remove('botao-home--secondary');
      if (unsubBtn) unsubBtn.hidden = true;
    } else {
      if (introEl) {
        introEl.textContent = 'Entre com a sua conta Google — usamos o e-mail da conta para avisar quando houver um novo sorteio.';
      }
      subscribeBtn.textContent = 'Entrar e receber avisos';
      subscribeBtn.disabled = false;
      subscribeBtn.classList.remove('botao-home--secondary');
      if (unsubBtn) unsubBtn.hidden = true;
    }
  }

  async function refreshStatus() {
    try {
      const res = await fetch('/api/sorteio-alerts/me', { credentials: 'include' });
      if (res.status === 401) {
        userAuthenticated = false;
        subscribed = false;
        updateUi();
        return;
      }
      if (!res.ok) return;
      const data = await res.json();
      userAuthenticated = !!data.authenticated;
      subscribed = !!data.subscribed;
      updateUi();
    } catch (e) {
      showStatus('Servidor indisponível. Inicie o site com npm start para inscrever-se.', 'error');
      subscribeBtn.disabled = true;
    }
  }

  subscribeBtn.addEventListener('click', async () => {
    showStatus('');

    if (!userAuthenticated) {
      window.location.href = '/entrar.html?returnTo=' + encodeURIComponent(returnTo);
      return;
    }

    subscribeBtn.disabled = true;
    const prevLabel = subscribeBtn.textContent;
    subscribeBtn.textContent = 'A inscrever…';

    try {
      const res = await fetch('/api/sorteio-alerts', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        window.location.href = '/entrar.html?returnTo=' + encodeURIComponent(returnTo);
        return;
      }

      if (!res.ok) {
        showStatus(data.error || 'Não foi possível concluir a inscrição.', 'error');
        subscribeBtn.disabled = false;
        subscribeBtn.textContent = prevLabel;
        return;
      }

      subscribed = true;
      updateUi();
      showStatus(data.message || 'Inscrição confirmada!', 'ok');
    } catch (e) {
      showStatus('Servidor indisponível. Tente novamente.', 'error');
      subscribeBtn.disabled = false;
      subscribeBtn.textContent = prevLabel;
    }
  });

  if (unsubBtn) {
    unsubBtn.addEventListener('click', async () => {
      if (!confirm('Cancelar o recebimento de avisos de sorteios?')) return;
      unsubBtn.disabled = true;
      try {
        const res = await fetch('/api/sorteio-alerts/me', {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          showStatus(data.error || 'Não foi possível cancelar.', 'error');
          unsubBtn.disabled = false;
          return;
        }
        subscribed = false;
        updateUi();
        showStatus(data.message || 'Inscrição cancelada.', 'ok');
      } catch (e) {
        showStatus('Servidor indisponível.', 'error');
        unsubBtn.disabled = false;
      }
    });
  }

  await refreshStatus();
});
