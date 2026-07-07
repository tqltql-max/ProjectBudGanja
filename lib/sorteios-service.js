const { readSorteioConfigFromStore, resolvePremio } = require('./sorteio-config.js');
const { normalizeSorteioEntryInput, normalizeSorteioEntryOutput } = require('./persistence-naming.js');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function normalizeCpf(cpf) {
  return String(cpf || '').replace(/\D/g, '');
}

function formatCpf(cpf) {
  const digits = normalizeCpf(cpf);
  if (digits.length !== 11) return digits;
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function isValidCpf(cpf) {
  const digits = normalizeCpf(cpf);
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

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

function validateSorteioPayload(payload, config) {
  const input = normalizeSorteioEntryInput(payload);
  if (config && config.ativo === false) {
    return { ok: false, status: 403, error: 'As inscrições para este sorteio estão encerradas.' };
  }

  const nome = String(input.nome || '').trim();
  const email = normalizeEmail(input.email);
  const telefone = normalizePhone(input.telefone);
  const cpf = normalizeCpf(input.cpf);

  if (nome.length < 3) {
    return { ok: false, status: 400, error: 'Informe seu nome completo.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Informe um e-mail válido.' };
  }
  if (!isValidCpf(cpf)) {
    return { ok: false, status: 400, error: 'Informe um CPF válido.' };
  }
  if (telefone.length < 10 || telefone.length > 11) {
    return { ok: false, status: 400, error: 'Informe um telefone ou WhatsApp válido (com DDD).' };
  }
  if (!(payload && payload.aceite)) {
    return { ok: false, status: 400, error: 'É necessário aceitar os termos do sorteio.' };
  }

  const premio = resolvePremio(config || { premios: [] }, input.premioId);
  if (!premio) {
    return { ok: false, status: 400, error: 'Selecione o prêmio desejado.' };
  }

  return {
    ok: true,
    entry: {
      nome,
      email,
      cpf,
      cpfFormatado: formatCpf(cpf),
      telefone,
      cidade: String(input.cidade || '').trim(),
      estado: String(input.estado || '').trim().toUpperCase(),
      instagram: String(input.instagram || '').trim().replace(/^@/, ''),
      premioId: premio.id,
      premioLabel: premio.label
    }
  };
}

async function listSorteios(store) {
  const entries = await store.getSorteios();
  return Array.isArray(entries) ? entries.map(normalizeSorteioEntryOutput) : [];
}

async function createSorteioEntry(store, payload, config, options) {
  const validated = validateSorteioPayload(payload, config);
  if (!validated.ok) return validated;

  const entries = await listSorteios(store);
  const duplicateEmail = entries.some((item) => normalizeEmail(item.email) === validated.entry.email);
  if (duplicateEmail) {
    return { ok: false, status: 409, error: 'Este e-mail já está inscrito no sorteio.' };
  }

  const duplicateCpf = entries.some((item) => normalizeCpf(item.cpf) === validated.entry.cpf);
  if (duplicateCpf) {
    return { ok: false, status: 409, error: 'Este CPF já está inscrito no sorteio.' };
  }

  const userId = options && options.userId ? String(options.userId) : '';

  const entry = Object.assign({}, validated.entry, {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    userId,
    createdAt: new Date().toISOString()
  });

  entries.unshift(entry);
  await store.setSorteios(entries);
  return { ok: true, status: 201, entry };
}

async function deleteSorteioEntry(store, id) {
  const entries = await listSorteios(store);
  const next = entries.filter((item) => item.id !== id);
  if (next.length === entries.length) {
    return { ok: false, status: 404, error: 'Inscrição não encontrada.' };
  }
  await store.setSorteios(next);
  return { ok: true, status: 200 };
}

module.exports = {
  listSorteios,
  createSorteioEntry,
  deleteSorteioEntry,
  validateSorteioPayload,
  isValidCpf,
  normalizeCpf,
  formatCpf
};
