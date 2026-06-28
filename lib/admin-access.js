'use strict';

const { getSession } = require('./auth-service.js');
const { getUserSession } = require('./user-auth-service.js');
const { getAdminEmails } = require('./utils.js');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function getAdminAccess(store, cookieHeader) {
  const session = await getSession(store, cookieHeader);
  if (session) {
    return {
      token: session.token,
      username: session.username,
      via: 'password'
    };
  }

  const userSession = await getUserSession(store, cookieHeader);
  if (!userSession) return null;

  const users = await store.getUsers();
  const user = users[userSession.userId];
  if (!user) return null;

  const adminEmails = getAdminEmails();
  const viaEnv = adminEmails.size > 0 && adminEmails.has(normalizeEmail(user.email));
  const viaDb = !!user.isAdmin;
  if (!viaEnv && !viaDb) return null;

  return {
    token: userSession.token,
    username: user.email,
    via: viaDb && viaEnv ? 'google+env' : viaDb ? 'google' : 'google-env',
    userId: user.id
  };
}

async function getAdminSession(store, cookieHeader) {
  return getAdminAccess(store, cookieHeader);
}

async function hasAdminAccess(store, cookieHeader) {
  return !!(await getAdminAccess(store, cookieHeader));
}

module.exports = {
  getAdminAccess,
  getAdminSession,
  hasAdminAccess
};
