'use strict';

const { getAdminEmails } = require('./utils.js');
const { extractCultivoFields } = require('./cultivo-user-service.js');
const {
  isProfileComplete,
  resolveUserPicture,
  MIN_USER_AGE
} = require('./user-auth-service.js');

const PROFILE_LABELS = {
  displayName: 'Nome de exibição',
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
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: resolveUserPicture(user),
    provider: user.provider || 'google',
    displayName: profile.displayName || '',
    age: profile.age != null ? profile.age : null,
    profileComplete: isProfileComplete(profile),
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

function enrichUserForAdminList(user) {
  const extracted = extractCultivoFields(user && user.profile);
  const growLogs = Array.isArray(extracted.growLogs) ? extracted.growLogs : [];
  const entryCount = growLogs.reduce(
    (sum, g) => sum + (Array.isArray(g.entries) ? g.entries.length : 0),
    0
  );
  const planTasks = Array.isArray(extracted.planTasks) ? extracted.planTasks : [];
  return Object.assign({}, user, {
    isAdmin: !!user.isAdmin,
    growCount: growLogs.length,
    entryCount: entryCount,
    submissionCount: user.submissionCount || 0,
    planTaskCount: planTasks.length
  });
}

function filterUsersByQuery(list, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((u) =>
    String(u.email || '').toLowerCase().includes(q)
    || String(u.name || '').toLowerCase().includes(q)
    || String(u.id || '').toLowerCase().includes(q)
  );
}

function growsSummaryFromProfile(profile) {
  const extracted = extractCultivoFields(profile);
  const growLogs = Array.isArray(extracted.growLogs) ? extracted.growLogs : [];
  return growLogs.map((g) => ({
    id: g.id,
    name: g.name || '',
    phase: g.phase || '',
    species: g.species || '',
    plantedAt: g.plantedAt,
    plantCount: g.plantCount != null ? g.plantCount : 1,
    createdAt: g.createdAt,
    entryCount: Array.isArray(g.entries) ? g.entries.length : 0
  }));
}

async function listUsersFromGetUsers(store, query) {
  const users = await store.getUsers();
  const list = Object.values(users || {}).map(enrichUserForAdminList);
  return filterUsersByQuery(list, query)
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
}

async function getUserByIdForAdmin(store, userId) {
  if (store.getUserByIdAdmin) return store.getUserByIdAdmin(userId);
  if (!store.getUsers) return null;
  const users = await store.getUsers();
  const user = users[userId];
  return user ? enrichUserForAdminList(user) : null;
}

async function countAdminUsersInStore(store) {
  if (store.countAdminUsers) return store.countAdminUsers();
  if (!store.getUsers) return 0;
  const users = await store.getUsers();
  return Object.values(users || {}).filter((u) => u.isAdmin).length;
}

async function listSorteioEntriesForEmail(store, email) {
  if (store.listSorteioEntriesByEmail) return store.listSorteioEntriesByEmail(email);
  if (!store.getSorteios) return [];
  const normalized = String(email || '').trim().toLowerCase();
  const list = await store.getSorteios();
  return (Array.isArray(list) ? list : [])
    .filter((e) => String(e.email || '').toLowerCase() === normalized)
    .slice(0, 50)
    .map((row) => ({
      id: row.id,
      nome: row.nome || '',
      email: row.email || '',
      premioLabel: row.premioLabel || row.premio_label || '',
      cidade: row.cidade || '',
      estado: row.estado || '',
      createdAt: row.createdAt || row.created_at
    }));
}

async function listLojaOrdersForEmail(store, email) {
  if (store.listLojaOrdersByEmail) return store.listLojaOrdersByEmail(email);
  if (!store.getLojaOrders) return [];
  const normalized = String(email || '').trim().toLowerCase();
  const list = await store.getLojaOrders();
  return (Array.isArray(list) ? list : [])
    .filter((o) => String(o.email || '').toLowerCase() === normalized)
    .slice(0, 50)
    .map((row) => ({
      id: row.id,
      productTitle: row.productTitle || row.product_title || '',
      packageLabel: row.packageLabel || row.package_label || '',
      nome: row.nome || '',
      email: row.email || '',
      cidade: row.cidade || '',
      estado: row.estado || '',
      status: row.status || '',
      createdAt: row.createdAt || row.created_at
    }));
}

async function listUsersForAdmin(store, query) {
  if (!store.listUsersAdmin && !store.getUsers) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const rows = store.listUsersAdmin
    ? await store.listUsersAdmin(query)
    : await listUsersFromGetUsers(store, query);
  return { ok: true, users: rows.map(publicListUserRow), total: rows.length };
}

async function getUserDetailForAdmin(store, userId) {
  if (!store.getUserByIdAdmin && !store.getUsers) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const user = await getUserByIdForAdmin(store, userId);
  if (!user) return { ok: false, status: 404, error: 'Utilizador não encontrado.' };

  const admin = resolveAdminAccess(user);
  const profile = user.profile || {};
  const grows = store.listUserGrowsSummary
    ? await store.listUserGrowsSummary(userId)
    : growsSummaryFromProfile(profile);
  const submissions = store.listUserSubmissionsSummary
    ? await store.listUserSubmissionsSummary(userId)
    : [];
  const sorteioEntries = await listSorteioEntriesForEmail(store, user.email);
  const lojaOrders = await listLojaOrdersForEmail(store, user.email);
  const sorteioAlert = store.getSorteioAlertForUser
    ? await store.getSorteioAlertForUser(userId)
    : null;

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
      name: user.name,
      picture: resolveUserPicture(user),
      googlePicture: String(user.picture || '').trim(),
      provider: user.provider || 'google',
      isAdmin: admin.isAdmin,
      adminSource: admin.adminSource,
      adminGranted: !!user.isAdmin,
      profileComplete: isProfileComplete(profile),
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
  if (!store.setUserAdminFlag && !store.getUsers) {
    return { ok: false, status: 501, error: 'Gestão de utilizadores indisponível neste backend.' };
  }
  const target = await getUserByIdForAdmin(store, userId);
  if (!target) return { ok: false, status: 404, error: 'Utilizador não encontrado.' };

  const nextAdmin = !!isAdmin;
  const currentlyAdmin = !!target.isAdmin || isAdminViaEnv(target.email);

  if (!nextAdmin && currentlyAdmin) {
    const dbAdmins = await countAdminUsersInStore(store);
    const envAdmins = getAdminEmails().size;
    const actorIsTarget = actor && actor.userId === userId;
    if (dbAdmins <= 1 && !envAdmins && target.isAdmin) {
      return { ok: false, status: 409, error: 'Não é possível remover o último administrador.' };
    }
    if (actorIsTarget && target.isAdmin && dbAdmins <= 1 && !envAdmins) {
      return { ok: false, status: 409, error: 'Não pode remover a sua própria permissão de administrador.' };
    }
  }

  let updated;
  if (store.setUserAdminFlag) {
    updated = await store.setUserAdminFlag(userId, nextAdmin);
  } else {
    const users = await store.getUsers();
    const row = users[userId];
    if (!row) return { ok: false, status: 404, error: 'Utilizador não encontrado.' };
    row.isAdmin = nextAdmin;
    row.updatedAt = new Date().toISOString();
    users[userId] = row;
    await store.setUsers(users);
    updated = enrichUserForAdminList(row);
  }
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
