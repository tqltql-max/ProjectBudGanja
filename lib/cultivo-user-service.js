'use strict';

const {
  defaultProfile,
  sanitizeProfile,
  sanitizeIsoDate,
  getUserById
} = require('./user-auth-service.js');

function extractCultivoFields(profile) {
  const p = profile && typeof profile === 'object' ? profile : {};
  return {
    phase: p.phase || '',
    phaseStartedAt: p.phaseStartedAt || null,
    activeGrowLogId: p.activeGrowLogId || '',
    customGuide: p.customGuide || '',
    guideWeekNotes: p.guideWeekNotes && typeof p.guideWeekNotes === 'object' ? p.guideWeekNotes : {},
    growLogs: Array.isArray(p.growLogs) ? p.growLogs : [],
    planTasks: Array.isArray(p.planTasks) ? p.planTasks : []
  };
}

function hasCultivoContent(state) {
  if (!state) return false;
  if (Array.isArray(state.growLogs) && state.growLogs.length) return true;
  if (Array.isArray(state.planTasks) && state.planTasks.length) return true;
  if (state.phase) return true;
  if (state.customGuide && String(state.customGuide).trim()) return true;
  if (state.guideWeekNotes && Object.keys(state.guideWeekNotes).length) return true;
  return false;
}

function sanitizeCultivoState(raw) {
  const full = sanitizeProfile(Object.assign(defaultProfile(), raw || {}));
  return {
    phase: full.phase,
    phaseStartedAt: full.phaseStartedAt,
    activeGrowLogId: full.activeGrowLogId,
    customGuide: full.customGuide,
    guideWeekNotes: full.guideWeekNotes,
    growLogs: full.growLogs,
    planTasks: full.planTasks,
    updatedAt: full.updatedAt
  };
}

function stripCultivoFromProfile(profile) {
  const base = Object.assign({}, profile || {});
  base.phase = '';
  base.phaseStartedAt = null;
  base.activeGrowLogId = '';
  base.customGuide = '';
  base.guideWeekNotes = {};
  base.growLogs = [];
  base.planTasks = [];
  base.journal = '';
  return sanitizeProfile(base);
}

async function migrateCultivoFromProfileIfNeeded(store, userId) {
  const count = await store.countCultivoGrows(userId);
  if (count > 0) return false;
  const user = await getUserById(store, userId);
  const extracted = extractCultivoFields(user && user.profile);
  if (!hasCultivoContent(extracted)) return false;
  const state = sanitizeCultivoState(extracted);
  await store.setCultivoState(userId, state);
  return true;
}

async function getCultivoForUser(store, userId) {
  await migrateCultivoFromProfileIfNeeded(store, userId);
  const state = await store.getCultivoState(userId);
  return sanitizeCultivoState(state);
}

async function updateCultivoForUser(store, userId, payload) {
  const prev = await getCultivoForUser(store, userId);
  const src = payload && typeof payload === 'object' ? payload : {};
  const merged = Object.assign({}, prev, src);

  const profile = sanitizeCultivoState(merged);

  if (merged.phase && merged.phase !== prev.phase) {
    profile.phaseStartedAt = new Date().toISOString();
  } else if (sanitizeIsoDate(merged.phaseStartedAt)) {
    profile.phaseStartedAt = sanitizeIsoDate(merged.phaseStartedAt);
  } else if (prev.phaseStartedAt) {
    profile.phaseStartedAt = prev.phaseStartedAt;
  } else if (profile.activeGrowLogId) {
    const activeLog = profile.growLogs.find((log) => log.id === profile.activeGrowLogId);
    if (activeLog && activeLog.plantedAt) profile.phaseStartedAt = activeLog.plantedAt;
  } else if (profile.growLogs.length) {
    profile.phaseStartedAt = new Date().toISOString();
  }

  if (profile.activeGrowLogId) {
    const activeLog = profile.growLogs.find((log) => log.id === profile.activeGrowLogId);
    if (activeLog) {
      profile.phase = activeLog.phase || profile.phase;
      if (activeLog.plantedAt) profile.phaseStartedAt = activeLog.plantedAt;
    }
  }

  await store.setCultivoState(userId, profile);
  return profile;
}

function publicCultivoView(state) {
  return sanitizeCultivoState(state);
}

module.exports = {
  extractCultivoFields,
  sanitizeCultivoState,
  stripCultivoFromProfile,
  getCultivoForUser,
  updateCultivoForUser,
  publicCultivoView
};
