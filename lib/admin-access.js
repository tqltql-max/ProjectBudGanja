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

  const adminEmails = getAdminEmails();
  if (!adminEmails.size) return null;

  const userSession = await getUserSession(store, cookieHeader);
  if (!userSession) return null;

  const users = await store.getUsers();
  const user = users[userSession.userId];
  if (!user || !adminEmails.has(normalizeEmail(user.email))) return null;

  return {
    token: userSession.token,
    username: user.email,
    via: 'google',
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
