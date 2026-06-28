(function () {
  'use strict';

  function getCatalog() {
    return window.__LOJA_CATALOG__ || null;
  }

  function getProjectIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return String(params.get('produto') || params.get('product') || '').trim();
  }

  function findProject(catalog, projectId) {
    if (!catalog || !Array.isArray(catalog.projects)) return null;
    return catalog.projects.find(function (p) {
      return p && p.id === projectId && p.orderOffer && p.orderOffer.enabled !== false;
    }) || null;
  }

  function setMessage(el, text, isError) {
    if (!el) return;
    if (!text) {
      el.hidden = true;
      el.textContent = '';
      el.classList.remove('sorteios-message--error', 'sorteios-message--ok');
      return;
    }
    el.hidden = false;
    el.textContent = text;
    el.classList.toggle('sorteios-message--error', !!isError);
    el.classList.toggle('sorteios-message--ok', !isError);
  }

  function formatPhoneInput(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length <= 10) {
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    }
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  }

  async function prefillUser(form) {
    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json();
      const nomeEl = form.querySelector('#encomenda-nome');
      const emailEl = form.querySelector('#encomenda-email');
      if (nomeEl && !nomeEl.value && data.name) nomeEl.value = data.name;
      if (emailEl && !emailEl.value && data.email) emailEl.value = data.email;
    } catch (e) { /* ignore */ }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function renderPackageOptions(project) {
    const fieldset = document.getElementById('encomenda-packages');
    const list = document.getElementById('encomenda-packages-list');
    const options = project.orderOffer && project.orderOffer.packageOptions;
    if (!fieldset || !list || !options || !options.length) {
      if (fieldset) fieldset.hidden = true;
      return;
    }

    list.innerHTML = options.map(function (opt, index) {
      const checked = index === 0 ? ' checked' : '';
      const price = opt.priceNote
        ? '<span class="loja-package-price">' + escapeHtml(opt.priceNote) + '</span>'
        : '';
      const desc = opt.description
        ? '<span class="loja-package-desc">' + escapeHtml(opt.description) + '</span>'
        : '';
      return (
        '<label class="loja-package-option">' +
        '<input type="radio" name="packageId" value="' + escapeHtml(opt.id) + '" required' + checked + '>' +
        '<span class="loja-package-copy">' +
        '<span class="loja-package-label">' + escapeHtml(opt.label) + '</span>' +
        desc +
        price +
        '</span></label>'
      );
    }).join('');
    fieldset.hidden = false;
  }

  function getSelectedPackageId(form) {
    const selected = form.querySelector('input[name="packageId"]:checked');
    return selected ? selected.value : '';
  }

  function initProductForm(project) {
    const invalidEl = document.getElementById('encomenda-invalid');
    const form = document.getElementById('encomenda-form');
    const successEl = document.getElementById('encomenda-success');
    const titleEl = document.getElementById('encomenda-title');
    const introEl = document.getElementById('encomenda-intro');
    const productLabelEl = document.getElementById('encomenda-product-label');
    const productIdEl = document.getElementById('encomenda-product-id');
    const messageEl = document.getElementById('encomenda-message');
    const offer = project.orderOffer || {};

    if (invalidEl) invalidEl.hidden = true;
    if (successEl) successEl.hidden = true;
    if (form) form.hidden = false;

    if (titleEl) titleEl.textContent = offer.buttonLabel || ('Encomendar ' + project.title);
    if (introEl) introEl.textContent = offer.summary || project.summary || '';
    if (productLabelEl) {
      productLabelEl.textContent = 'Produto: ' + project.title + (offer.badge ? ' · ' + offer.badge : '');
    }
    if (productIdEl) productIdEl.value = project.id;
    document.title = (offer.buttonLabel || 'Encomendar') + ' | Inspetor BudGanja';

    renderPackageOptions(project);
    prefillUser(form);

    const phoneEl = document.getElementById('encomenda-telefone');
    if (phoneEl) {
      phoneEl.addEventListener('input', function () {
        phoneEl.value = formatPhoneInput(phoneEl.value);
      });
    }

    const estadoEl = document.getElementById('encomenda-estado');
    if (estadoEl) {
      estadoEl.addEventListener('input', function () {
        estadoEl.value = estadoEl.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
      });
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      setMessage(messageEl, '', false);

      const payload = {
        productId: productIdEl.value,
        packageId: getSelectedPackageId(form),
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        cidade: form.cidade.value.trim(),
        estado: form.estado.value.trim().toUpperCase(),
        mensagem: form.mensagem.value.trim(),
        aceite: form.aceite.checked
      };

      const submitBtn = document.getElementById('encomenda-submit');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch('/api/loja/encomenda', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(function () { return {}; });
        if (!res.ok) {
          setMessage(messageEl, data.error || 'Não foi possível enviar a encomenda.', true);
          if (submitBtn) submitBtn.disabled = false;
          return;
        }
        form.hidden = true;
        if (successEl) {
          successEl.hidden = false;
          const successText = document.getElementById('encomenda-success-text');
          if (successText) {
            successText.textContent = data.message || 'Recebemos seu pedido. Responderemos em até 48 h úteis.';
          }
        }
      } catch (err) {
        setMessage(messageEl, 'Erro de conexão. Verifique se o servidor está a correr e tente novamente.', true);
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  function showInvalid() {
    const invalidEl = document.getElementById('encomenda-invalid');
    const form = document.getElementById('encomenda-form');
    if (form) form.hidden = true;
    if (invalidEl) invalidEl.hidden = false;
    const introEl = document.getElementById('encomenda-intro');
    if (introEl) introEl.textContent = 'Escolha uma clonadora na loja e clique em encomendar.';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const catalog = getCatalog();
    const projectId = getProjectIdFromQuery();
    const project = findProject(catalog, projectId);
    if (project) {
      initProductForm(project);
    } else {
      showInvalid();
    }
  });
})();
