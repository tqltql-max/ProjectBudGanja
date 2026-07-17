'use strict';

const { getAdminEmails } = require('./utils.js');
const {
  isProfileComplete,
  resolveUserPicture,
  MIN_USER_AGE
} = require('./user-auth-service.js');

const PROFILE_LABELS = {
  displayName: 'Nome de exibição',
  username: 'Nome de utilizador',
  birthDate: 'Data de nascimento',
  age: 'Idade',
  avatarUrl: 'Avatar personalizado',
  experience: 'Experiência',
  environment: 'Ambiente',
  substrate: 'Substrato',
  method: 'Método',
  tentSize: 'Tamanho da tenda',
  lighting: 'Iluminação',
  genetics: 'Genética',
  goals: 'Objectivos',
  notes: 'Notas'
};

function computeAgeFromBirthDate(raw) {
  const text = String(raw || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const d = new Date(text + 'T00:00:00.000Z');
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getUTCFullYear() - d.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - d.getUTCMonth();
  const dayDiff = now.getUTCDate() - d.getUTCDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
  if (age < 0 || age > 120) return null;
  return age;
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isAdminViaEnv(email) {
  const adminEmails = getAdminEmails();
  return adminEmails.has(normalizeEmail(email));
}

function resolveAdminAccess(user) {
  if (!user) return { isAdmin: false, adminSource: '' };
  const viaDb = !!user.isAdmin;
  const viaEnv = isAdminViaEnv(user.email);
  if (viaDb && viaEnv) return { isAdmin: true, adminSource: 'db+env' };
  if (viaDb) return { isAdmin: true, adminSource: 'db' };
  if (viaEnv) return { isAdmin: true, adminSource: 'env' };
  return { isAdmin: false, adminSource: '' };
}

function publicListUserRow(user) {
  const admin = resolveAdminAccess(user);
  const profile = user.profile || {};
  const birthDate = String(user.birthDate || profile.birthDate || '').trim();
  const derivedAge = computeAgeFromBirthDate(birthDate);
  const username = String(user.username || profile.username || '').trim();
  const completionProfile = Object.assign({}, profile, {
    username,
    birthDate,
    age: derivedAge != null ? derivedAge : profile.age
  });
  return {
    id: user.id,
    email: user.email,
    emailVerified: !!user.emailVerifiedAt,
    emailVerifiedAt: user.emailVerifiedAt || null,
    name: user.name,
    username: username,
    birthDate: birthDate || null,
    picture: resolveUserPicture(user),
    provider: user.provider || 'google',
    displayName: profile.displayName || '',
    age: derivedAge != null ? derivedAge : (profile.age != null ? profile.age : null),
    profileComplete: isProfileComplete(completionProfile),
    accountStatus: user.accountStatus || 'pending_profile',
    onboardingStage: user.onboardingStage || 'initial',
    isAdmin: admin.isAdmin,
    adminSource: admin.adminSource,
    adminGranted: !!user.isAdmin,
    growCount: user.growCount || 0,
    entryCount: user.entryCount || 0,
    submissionCount: user.submissionCount || 0,
    planTaskCount: user.planTaskCount || 0,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function profileFieldsForAdmin(profile) {
  const src = profile && typeof profile === 'object' ? profile : {};
  const out = {};
  Object.keys(PROFILE_LABELS).forEach((key) => {
    const val = src[key];
    if (val === null || val === undefined || val === '') return;
    out[key] = {
      label: PROFILE_LABELS[key],
      value: val
    };
  });
  return out;
}

async function listUsersForAdmin(store, query) {
  if (!store.listUsersAdmin) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const rows = await store.listUsersAdmin(query);
  return { ok: true, users: rows.map(publicListUserRow), total: rows.length };
}

async function getUserDetailForAdmin(store, userId) {
  if (!store.getUserByIdAdmin) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const user = await store.getUserByIdAdmin(userId);
  if (!user) return { ok: false, status: 404, error: 'Utilizador não encontrado.' };

  const admin = resolveAdminAccess(user);
  const profile = user.profile || {};
  const username = String(user.username || profile.username || '').trim();
  const birthDate = String(user.birthDate || profile.birthDate || '').trim();
  const derivedAge = computeAgeFromBirthDate(birthDate);
  if (username && !profile.username) profile.username = username;
  if (birthDate && !profile.birthDate) profile.birthDate = birthDate;
  if (derivedAge != null) profile.age = derivedAge;
  const completionProfile = Object.assign({}, profile, {
    username,
    birthDate,
    age: derivedAge != null ? derivedAge : profile.age
  });
  const grows = await store.listUserGrowsSummary(userId);
  const submissions = await store.listUserSubmissionsSummary(userId);
  const sorteioEntries = await store.listSorteioEntriesByEmail(user.email);
  const lojaOrders = await store.listLojaOrdersByEmail(user.email);
  const sorteioAlert = await store.getSorteioAlertForUser(userId);

  let planTaskCount = user.planTaskCount != null ? user.planTaskCount : 0;
  let cultivoPhase = '';
  if (store.getCultivoState) {
    try {
      const cultivo = await store.getCultivoState(userId);
      planTaskCount = Array.isArray(cultivo.planTasks) ? cultivo.planTasks.length : planTaskCount;
      cultivoPhase = cultivo.phase || '';
    } catch (e) { /* ignore */ }
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      emailVerified: !!user.emailVerifiedAt,
      emailVerifiedAt: user.emailVerifiedAt || null,
      name: user.name,
      username: username,
      birthDate: birthDate || null,
      age: derivedAge != null ? derivedAge : (profile.age != null ? profile.age : null),
      picture: resolveUserPicture(user),
      googlePicture: String(user.picture || '').trim(),
      provider: user.provider || 'google',
      accountStatus: user.accountStatus || 'pending_profile',
      onboardingStage: user.onboardingStage || 'initial',
      registrationIp: user.registrationIp || '',
      lastLoginAt: user.lastLoginAt || null,
      lastLoginIp: user.lastLoginIp || '',
      isAdmin: admin.isAdmin,
      adminSource: admin.adminSource,
      adminGranted: !!user.isAdmin,
      profileComplete: isProfileComplete(completionProfile),
      minAge: MIN_USER_AGE,
      cultivoPhase: cultivoPhase,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profileFields: profileFieldsForAdmin(profile),
      stats: {
        grows: grows.length,
        entries: grows.reduce((sum, g) => sum + (g.entryCount || 0), 0),
        submissions: submissions.length,
        planTasks: planTaskCount,
        sorteioEntries: sorteioEntries.length,
        lojaOrders: lojaOrders.length
      },
      grows: grows,
      submissions: submissions,
      sorteioEntries: sorteioEntries,
      lojaOrders: lojaOrders,
      sorteioAlert: sorteioAlert
    }
  };
}

async function setUserAdmin(store, userId, isAdmin, actor) {
  if (!store.setUserAdminFlag || !store.getUserByIdAdmin) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const target = await store.getUserByIdAdmin(userId);
  if (!target) return { ok: false, status: 404, error: 'Utilizador não encontrado.' };

  const nextAdmin = !!isAdmin;
  const currentlyAdmin = !!target.isAdmin || isAdminViaEnv(target.email);

  if (!nextAdmin && currentlyAdmin) {
    const dbAdmins = await store.countAdminUsers();
    const envAdmins = getAdminEmails().size;
    const actorIsTarget = actor && actor.userId === userId;
    if (dbAdmins <= 1 && !envAdmins && target.isAdmin) {
      return { ok: false, status: 409, error: 'Não é possível remover o último administrador.' };
    }
    if (actorIsTarget && target.isAdmin && dbAdmins <= 1 && !envAdmins) {
      return { ok: false, status: 409, error: 'Não pode remover a sua própria permissão de administrador.' };
    }
  }

  const updated = await store.setUserAdminFlag(userId, nextAdmin);
  const admin = resolveAdminAccess(updated);
  return {
    ok: true,
    user: {
      id: updated.id,
      email: updated.email,
      isAdmin: admin.isAdmin,
      adminSource: admin.adminSource,
      adminGranted: !!updated.isAdmin
    }
  };
}

function userHasAdminAccess(user) {
  if (!user) return false;
  return !!user.isAdmin || isAdminViaEnv(user.email);
}

module.exports = {
  listUsersForAdmin,
  getUserDetailForAdmin,
  setUserAdmin,
  userHasAdminAccess,
  resolveAdminAccess,
  isAdminViaEnv
};
