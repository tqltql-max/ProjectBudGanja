let sorteioConfig = null;

function formatCpfInput(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.slice(0, 3) + '.' + digits.slice(3);
  if (digits.length <= 9) return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6);
  return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6, 9) + '-' + digits.slice(9);
}

function isValidCpfClient(cpf) {
  const digits = String(cpf || '').replace(/\D/g, '');
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i], 10) * (10 - i);
  let check = (sum * 10) % 11;
  if (check === 10) check = 0;
  if (check !== parseInt(digits[9], 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i], 10) * (11 - i);
  check = (sum * 10) % 11;
  if (check === 10) check = 0;
  return check === parseInt(digits[10], 10);
}

async function loadSorteioConfig() {
  try {
    const res = await fetch('/api/sorteio');
    if (res.ok) return await res.json();
  } catch (e) { /* fallback */ }

  try {
    const res = await fetch('content/sorteio.json');
    if (res.ok) return await res.json();
  } catch (e) { /* ignore */ }

  return null;
}

function usesGoogleForm(config) {
  return !!(config && config.googleFormUrl);
}

function formatSorteioDateDisplay(value) {
  const U = window.SorteioUtils;
  if (U && U.formatSorteioDateTime) return U.formatSorteioDateTime(value);
  return String(value || '').trim();
}

function renderSorteioDateEl(dateEl, config, prefixActive, prefixSoon) {
  if (!dateEl) return;
  const formatted = formatSorteioDateDisplay(config.dataSorteio);
  if (!formatted) {
    dateEl.textContent = '';
    dateEl.hidden = true;
    dateEl.removeAttribute('datetime');
    return;
  }
  const prefix = config.ativo ? prefixActive : prefixSoon;
  dateEl.textContent = prefix + formatted + '.';
  dateEl.hidden = false;
  const parsed = window.SorteioUtils && window.SorteioUtils.parseSorteioDate
    ? window.SorteioUtils.parseSorteioDate(config.dataSorteio)
    : null;
  if (parsed) dateEl.setAttribute('datetime', parsed.toISOString());
  else dateEl.removeAttribute('datetime');
}

function renderSorteioPage(config) {
  const current = document.getElementById('sorteios-current');
  const closed = document.getElementById('sorteios-closed');
  const layout = document.getElementById('sorteios-layout');
  const staticNotice = document.getElementById('sorteios-static-notice');
  const googleWrap = document.getElementById('sorteios-google-wrap');
  const internalWrap = document.getElementById('sorteios-internal-wrap');
  const googleLink = document.getElementById('sorteios-google-link');
  const googleEmbedWrap = document.getElementById('sorteios-google-embed-wrap');
  const googleEmbed = document.getElementById('sorteios-google-embed');
  const infoList = document.getElementById('sorteios-info-list');
  const titleEl = document.getElementById('sorteios-current-title');
  const descEl = document.getElementById('sorteios-current-desc');
  const prizeEl = document.getElementById('sorteios-current-prize');
  const dateEl = document.getElementById('sorteios-current-date');
  const manualEl = document.getElementById('sorteios-current-manual');
  const badgeEl = document.querySelector('#sorteios-current .sorteios-current-badge');
  const premioWrap = document.getElementById('sorteio-premio-wrap');
  const premioSelect = document.getElementById('sorteio-premio');

  if (staticNotice) staticNotice.hidden = true;

  if (!config) {
    if (current) current.hidden = true;
    if (closed) closed.hidden = true;
    if (layout) layout.hidden = true;
    if (staticNotice) staticNotice.hidden = false;
    return;
  }

  if (config.ativo === false) {
    if (config.emBreve && current) {
      if (current) current.hidden = false;
      if (closed) closed.hidden = true;
      if (layout) layout.hidden = true;
      if (badgeEl) badgeEl.textContent = 'Em breve';
      if (titleEl) titleEl.textContent = config.titulo || 'Sorteio em breve';
      if (descEl) descEl.textContent = config.descricao || '';
      if (prizeEl) {
        const premios = config.premios || [];
        prizeEl.innerHTML = premios.length
          ? '<strong>Prêmio previsto:</strong> ' + premios.map((item) => item.label).join(' · ')
          : '';
        prizeEl.hidden = !premios.length;
      }
      if (dateEl) {
        renderSorteioDateEl(dateEl, config, 'Sorteio previsto para ', 'Previsão: ');
      }
      if (manualEl) {
        const manualUrl = String(config.manualUrl || '').trim();
        if (manualUrl) {
          manualEl.innerHTML = '<a href="' + manualUrl + '" class="botao btn-inline">Ver manual da clonadora caseira</a>';
          manualEl.hidden = false;
        } else {
          manualEl.hidden = true;
          manualEl.innerHTML = '';
        }
      }
      return;
    }

    if (current) current.hidden = true;
    if (closed) closed.hidden = false;
    if (layout) layout.hidden = true;
    const closedText = document.getElementById('sorteios-closed-text');
    if (closedText && config.descricao) {
      closedText.textContent = config.descricao;
    }
    return;
  }

  if (current) current.hidden = false;
  if (closed) closed.hidden = true;
  if (layout) layout.hidden = false;
  if (badgeEl) badgeEl.textContent = 'Sorteio ativo';
  if (manualEl) manualEl.hidden = true;

  if (titleEl) titleEl.textContent = config.titulo || 'Sorteio ativo';
  if (descEl) descEl.textContent = config.descricao || '';
  if (prizeEl) {
    const premios = config.premios || [];
    prizeEl.innerHTML = premios.length === 1
      ? '<strong>Prêmio:</strong> ' + premios[0].label
      : '<strong>Prêmios:</strong> ' + premios.map((item) => item.label).join(' · ');
  }
  if (dateEl) {
    renderSorteioDateEl(dateEl, config, 'Sorteio previsto para ', 'Previsão: ');
  }

  const googleMode = usesGoogleForm(config);

  if (infoList) {
    infoList.innerHTML = googleMode
      ? '<li>Preencha o Google Forms com dados reais.</li>' +
        '<li>As respostas ficam na planilha do Google Forms.</li>' +
        '<li>O sorteio é gratuito e sem compra obrigatória.</li>' +
        '<li>Acompanhe o canal <a href="https://www.youtube.com/@InspetorBudGanja" target="_blank" rel="noopener noreferrer">@InspetorBudGanja</a>.</li>'
      : '<li>Uma inscrição por e-mail e por CPF.</li>' +
        '<li>Use dados reais para contato em caso de premiação.</li>' +
        '<li>O sorteio é gratuito e sem compra obrigatória.</li>' +
        '<li>Acompanhe o canal <a href="https://www.youtube.com/@InspetorBudGanja" target="_blank" rel="noopener noreferrer">@InspetorBudGanja</a>.</li>';
  }

  if (googleWrap) googleWrap.hidden = !googleMode;
  if (internalWrap) internalWrap.hidden = googleMode;

  if (googleMode && googleLink) {
    googleLink.href = config.googleFormUrl;
    if (googleEmbedWrap && googleEmbed) {
      if (config.googleFormCanEmbed && config.googleFormEmbedUrl) {
        googleEmbed.src = config.googleFormEmbedUrl;
        googleEmbedWrap.hidden = false;
      } else {
        googleEmbed.removeAttribute('src');
        googleEmbedWrap.hidden = true;
      }
    }
  }

  if (googleMode) return;

  const premios = config.premios || [];
  if (premioWrap && premioSelect) {
    if (premios.length > 1) {
      premioWrap.hidden = false;
      premioSelect.required = true;
      premioSelect.innerHTML = '<option value="">Selecione o prêmio</option>' +
        premios.map((item) => '<option value="' + item.id + '">' + item.label + '</option>').join('');
    } else {
      premioWrap.hidden = true;
      premioSelect.required = false;
      premioSelect.innerHTML = premios.length
        ? '<option value="' + premios[0].id + '" selected>' + premios[0].label + '</option>'
        : '';
    }
  }
}

async function isInternalFormAvailable() {
  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    const type = res.headers.get('content-type') || '';
    return type.includes('application/json');
  } catch (e) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('sorteios-form');
  const messageEl = document.getElementById('sorteios-message');
  const submitBtn = document.getElementById('sorteios-submit');
  const cpfInput = document.getElementById('sorteio-cpf');
  const internalWrap = document.getElementById('sorteios-internal-wrap');

  sorteioConfig = await loadSorteioConfig();
  renderSorteioPage(sorteioConfig);

  if (usesGoogleForm(sorteioConfig)) {
    return;
  }

  if (!form) return;

  const apiAvailable = await isInternalFormAvailable();
  if (!apiAvailable) {
    if (internalWrap) internalWrap.hidden = true;
    const staticNotice = document.getElementById('sorteios-static-notice');
    if (staticNotice) {
      staticNotice.hidden = false;
      staticNotice.innerHTML =
        '<p><strong>Formulário interno indisponível.</strong></p>' +
        '<p>Para inscrições no site, use o servidor local (<code>npm start</code>) ou configure um link do <strong>Google Forms</strong> no admin do sorteio.</p>';
    }
    return;
  }

  if (cpfInput) {
    cpfInput.addEventListener('input', () => {
      cpfInput.value = formatCpfInput(cpfInput.value);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageEl) {
      messageEl.textContent = '';
      messageEl.className = 'sorteios-message';
    }

    const cpf = document.getElementById('sorteio-cpf').value.trim();
    if (!isValidCpfClient(cpf)) {
      if (messageEl) {
        messageEl.textContent = 'Informe um CPF válido.';
        messageEl.classList.add('is-error');
      }
      return;
    }

    const premios = (sorteioConfig && sorteioConfig.premios) || [];
    const premioId = premios.length === 1
      ? premios[0].id
      : document.getElementById('sorteio-premio').value;

    const payload = {
      nome: document.getElementById('sorteio-nome').value.trim(),
      cpf,
      email: document.getElementById('sorteio-email').value.trim(),
      telefone: document.getElementById('sorteio-telefone').value.trim(),
      cidade: document.getElementById('sorteio-cidade').value.trim(),
      estado: document.getElementById('sorteio-estado').value,
      instagram: document.getElementById('sorteio-instagram').value.trim(),
      premioId,
      aceite: document.getElementById('sorteio-aceite').checked
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch('/api/sorteios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        renderSorteioPage(sorteioConfig);
        if (messageEl) {
          messageEl.textContent = 'Inscrição confirmada! Boa sorte — acompanhe nossas redes para o resultado.';
          messageEl.classList.add('is-success');
        }
      } else if (messageEl) {
        messageEl.textContent = data.error || 'Não foi possível enviar a inscrição. Tente novamente.';
        messageEl.classList.add('is-error');
      }
    } catch (err) {
      if (messageEl) {
        messageEl.textContent = 'Falha de conexão. Verifique sua internet e tente novamente.';
        messageEl.classList.add('is-error');
      }
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Participar do sorteio';
  });
});
