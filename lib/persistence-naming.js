'use strict';

function pickFirst(source, keys, fallback) {
  for (const key of keys) {
    if (!source || source[key] == null) continue;
    return source[key];
  }
  return fallback;
}

function toText(value) {
  return String(value == null ? '' : value);
}

function normalizeSorteioEntryInput(entry, nowIso) {
  const source = entry || {};
  return {
    id: toText(pickFirst(source, ['id'], '')),
    userId: toText(pickFirst(source, ['userId', 'user_id'], '')),
    nome: toText(pickFirst(source, ['nome'], '')),
    email: toText(pickFirst(source, ['email'], '')),
    cpf: toText(pickFirst(source, ['cpf'], '')),
    cpfFormatado: toText(pickFirst(source, ['cpfFormatado', 'cpf_formatado'], '')),
    telefone: toText(pickFirst(source, ['telefone'], '')),
    cidade: toText(pickFirst(source, ['cidade'], '')),
    estado: toText(pickFirst(source, ['estado'], '')),
    instagram: toText(pickFirst(source, ['instagram'], '')),
    premioId: toText(pickFirst(source, ['premioId', 'premio_id'], '')),
    premioLabel: toText(pickFirst(source, ['premioLabel', 'premio_label', 'premio'], '')),
    createdAt: toText(pickFirst(source, ['createdAt', 'created_at'], nowIso || new Date().toISOString()))
  };
}

function normalizeSorteioEntryOutput(entry) {
  const normalized = normalizeSorteioEntryInput(entry);
  return {
    id: normalized.id,
    userId: normalized.userId,
    nome: normalized.nome,
    email: normalized.email,
    cpf: normalized.cpf,
    cpfFormatado: normalized.cpfFormatado,
    telefone: normalized.telefone,
    cidade: normalized.cidade,
    estado: normalized.estado,
    instagram: normalized.instagram,
    premioId: normalized.premioId,
    premioLabel: normalized.premioLabel,
    premio: normalized.premioLabel,
    createdAt: normalized.createdAt
  };
}

function normalizeLojaOrderInput(order, nowIso) {
  const source = order || {};
  return {
    id: toText(pickFirst(source, ['id'], '')),
    productId: toText(pickFirst(source, ['productId', 'product_id'], '')),
    productTitle: toText(pickFirst(source, ['productTitle', 'product_title'], '')),
    packageId: toText(pickFirst(source, ['packageId', 'package_id'], '')),
    packageLabel: toText(pickFirst(source, ['packageLabel', 'package_label'], '')),
    packagePriceNote: toText(pickFirst(source, ['packagePriceNote', 'package_price_note'], '')),
    nome: toText(pickFirst(source, ['nome'], '')),
    email: toText(pickFirst(source, ['email'], '')),
    telefone: toText(pickFirst(source, ['telefone'], '')),
    cidade: toText(pickFirst(source, ['cidade'], '')),
    estado: toText(pickFirst(source, ['estado'], '')),
    mensagem: toText(pickFirst(source, ['mensagem'], '')),
    userId: toText(pickFirst(source, ['userId', 'user_id'], '')),
    status: toText(pickFirst(source, ['status'], 'novo')),
    createdAt: toText(pickFirst(source, ['createdAt', 'created_at'], nowIso || new Date().toISOString()))
  };
}

function normalizeLojaOrderOutput(order) {
  return normalizeLojaOrderInput(order);
}

function normalizeUserInput(user, nowIso) {
  const source = user || {};
  let profile = pickFirst(source, ['profile'], {});
  const profileJson = pickFirst(source, ['profile_json'], null);
  if ((profile == null || typeof profile !== 'object') && profileJson) {
    try {
      profile = JSON.parse(String(profileJson));
    } catch (e) {
      profile = {};
    }
  }
  if (!profile || typeof profile !== 'object') profile = {};

  const now = nowIso || new Date().toISOString();
  const emailVerifiedAt = pickFirst(source, ['emailVerifiedAt', 'email_verified_at'], null);
  const birthDate = toText(pickFirst(source, ['birthDate', 'birth_date'], '')).slice(0, 10);
  const username = toText(pickFirst(source, ['username', 'userName', 'user_name'], '')).toLowerCase();
  const registrationIp = toText(pickFirst(source, ['registrationIp', 'registration_ip'], '')).slice(0, 120);
  const lastLoginAt = pickFirst(source, ['lastLoginAt', 'last_login_at'], null);
  const lastLoginIp = toText(pickFirst(source, ['lastLoginIp', 'last_login_ip'], '')).slice(0, 120);
  const accountStatus = toText(pickFirst(source, ['accountStatus', 'account_status'], 'pending_profile'));
  const onboardingStage = toText(pickFirst(source, ['onboardingStage', 'onboarding_stage'], 'initial'));
  let activityLog = pickFirst(source, ['activityLog', 'activity_log'], []);
  const activityLogJson = pickFirst(source, ['activity_log_json'], null);
  if (!Array.isArray(activityLog) && activityLogJson) {
    try {
      activityLog = JSON.parse(String(activityLogJson));
    } catch (e) {
      activityLog = [];
    }
  }
  if (!Array.isArray(activityLog)) activityLog = [];
  return {
    id: toText(pickFirst(source, ['id'], '')),
    googleId: toText(pickFirst(source, ['googleId', 'google_id'], '')),
    email: toText(pickFirst(source, ['email'], '')),
    emailVerifiedAt: emailVerifiedAt,
    emailVerified: !!emailVerifiedAt,
    name: toText(pickFirst(source, ['name'], '')),
    username: username,
    birthDate: birthDate,
    picture: toText(pickFirst(source, ['picture'], '')),
    provider: toText(pickFirst(source, ['provider'], 'google')),
    localPasswordHash: toText(pickFirst(source, ['localPasswordHash', 'local_password_hash'], '')),
    localPasswordUpdatedAt: pickFirst(source, ['localPasswordUpdatedAt', 'local_password_updated_at'], null),
    resetTokenHash: toText(pickFirst(source, ['resetTokenHash', 'reset_token_hash'], '')),
    resetTokenExpiresAt: pickFirst(source, ['resetTokenExpiresAt', 'reset_token_expires_at'], null),
    isAdmin: !!pickFirst(source, ['isAdmin', 'is_admin'], false),
    registrationIp: registrationIp,
    lastLoginAt: lastLoginAt,
    lastLoginIp: lastLoginIp,
    accountStatus: accountStatus,
    onboardingStage: onboardingStage,
    activityLog: activityLog,
    createdAt: toText(pickFirst(source, ['createdAt', 'created_at'], now)),
    updatedAt: toText(pickFirst(source, ['updatedAt', 'updated_at'], now)),
    profile
  };
}

function normalizeUserOutput(user) {
  return normalizeUserInput(user);
}

function normalizeAdminSessionInput(token, session, nowMs) {
  const source = session || {};
  const now = Number(nowMs) || Date.now();
  return {
    token: toText(pickFirst(source, ['token'], token || '')),
    username: toText(pickFirst(source, ['username', 'userName'], '')),
    expiresAt: Number(pickFirst(source, ['expiresAt', 'expires_at'], now)) || now
  };
}

function normalizeUserSessionInput(token, session, nowMs) {
  const source = session || {};
  const now = Number(nowMs) || Date.now();
  return {
    token: toText(pickFirst(source, ['token'], token || '')),
    userId: toText(pickFirst(source, ['userId', 'user_id'], '')),
    expiresAt: Number(pickFirst(source, ['expiresAt', 'expires_at'], now)) || now
  };
}

function normalizeOAuthStateInput(state, entry, nowMs) {
  const source = entry || {};
  const now = Number(nowMs) || Date.now();
  return {
    state: toText(pickFirst(source, ['state'], state || '')),
    returnTo: toText(pickFirst(source, ['returnTo', 'return_to'], '/perfil.html')),
    createdAt: Number(pickFirst(source, ['createdAt', 'created_at'], now)) || now,
    expiresAt: Number(pickFirst(source, ['expiresAt', 'expires_at'], now)) || now
  };
}

function normalizeOAuthStateOutput(entry) {
  return normalizeOAuthStateInput('', entry);
}

module.exports = {
  normalizeSorteioEntryInput,
  normalizeSorteioEntryOutput,
  normalizeLojaOrderInput,
  normalizeLojaOrderOutput,
  normalizeUserInput,
  normalizeUserOutput,
  normalizeAdminSessionInput,
  normalizeUserSessionInput,
  normalizeOAuthStateInput,
  normalizeOAuthStateOutput
};