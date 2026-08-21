'use strict';

const fs = require('fs');
const path = require('path');
const { initDatabaseOnce } = require('./db/client.js');
const { writeFileRetrySync } = require('./fs-write-retry.js');
const { notifyInspectorNewGtarpStreamer } = require('./mail-notify.js');
const {
  insertGtarpApplication,
  getGtarpApplicationById,
  findGtarpApplicationDuplicate,
  listGtarpApplications,
  updateGtarpApplication
} = require('./db/gtarp-streamers-repos.js');

function newId() {
  return 'gta' + Date.now() + Math.random().toString(36).slice(2, 6);
}

function slugify(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function parseYoutube(raw) {
  const u = String(raw || '').trim();
  if (!u) return { error: 'Indica o canal YouTube da personagem.' };
  let url = u;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url.replace(/^\/+/, '');
  let parsed;
  try {
    parsed = new URL(url);
  } catch (e) {
    return { error: 'URL do YouTube inválida.' };
  }
  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
  if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'youtu.be') {
    return { error: 'O canal tem de ser um link do YouTube.' };
  }
  const handleMatch = parsed.pathname.match(/\/@([^/]+)/);
  const channelMatch = parsed.pathname.match(/\/(channel|c|user)\/([^/]+)/);
  const handle = handleMatch ? '@' + handleMatch[1] : '';
  const clean = parsed.origin + parsed.pathname.replace(/\/+$/, '');
  return {
    url: clean,
    handle: handle || (channelMatch ? channelMatch[2] : '')
  };
}

function parseKick(raw) {
  const u = String(raw || '').trim();
  if (!u) return { url: '', handle: '' };
  if (/kick\.com/i.test(u) || /^https?:\/\//i.test(u)) {
    let url = u;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url.replace(/^\/+/, '');
    let parsed;
    try {
      parsed = new URL(url);
    } catch (e) {
      return { error: 'URL do Kick inválida.' };
    }
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    if (host !== 'kick.com') return { error: 'A live tem de ser um link do Kick (kick.com/…).' };
    const handle = decodeURIComponent(parsed.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '');
    if (!handle) return { error: 'Indica o canal Kick (kick.com/nome).' };
    return { url: 'https://kick.com/' + handle, handle: handle };
  }
  const handle = u.replace(/^@/, '').replace(/^\/+/, '');
  if (!/^[a-zA-Z0-9_-]{2,32}$/.test(handle)) return { error: 'Handle Kick inválido.' };
  return { url: 'https://kick.com/' + handle, handle: handle };
}

function parseTwitch(raw) {
  const u = String(raw || '').trim();
  if (!u) return { url: '', handle: '' };
  if (/twitch\.tv/i.test(u) || /^https?:\/\//i.test(u)) {
    let url = u;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url.replace(/^\/+/, '');
    let parsed;
    try {
      parsed = new URL(url);
    } catch (e) {
      return { error: 'URL da Twitch inválida.' };
    }
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    if (host !== 'twitch.tv') return { error: 'Se preencher Twitch, usa um link twitch.tv/…' };
    const handle = decodeURIComponent(parsed.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '');
    if (!handle) return { error: 'Indica o canal Twitch.' };
    return { url: 'https://www.twitch.tv/' + handle, handle: handle };
  }
  const handle = u.replace(/^@/, '').replace(/^\/+/, '');
  if (!/^[a-zA-Z0-9_]{3,25}$/.test(handle)) return { error: 'Handle Twitch inválido.' };
  return { url: 'https://www.twitch.tv/' + handle, handle: handle };
}

function publicView(row) {
  if (!row) return null;
  return {
    id: row.id,
    status: row.status,
    characterName: row.characterName,
    role: row.role,
    youtubeUrl: row.youtubeUrl,
    youtubeHandle: row.youtubeHandle,
    kickUrl: row.kickUrl,
    kickHandle: row.kickHandle,
    twitchUrl: row.twitchUrl,
    twitchHandle: row.twitchHandle,
    notes: row.notes,
    slug: row.slug,
    submittedAt: row.submittedAt,
    reviewedAt: row.reviewedAt
  };
}

function adminView(row) {
  if (!row) return null;
  return Object.assign({}, publicView(row), {
    contactName: row.contactName,
    contactEmail: row.contactEmail,
    reviewerNote: row.reviewerNote
  });
}

function rosterPath(root) {
  return path.join(root, 'content', 'gtarp-personagens.json');
}

function readRoster(root) {
  const file = rosterPath(root);
  if (!fs.existsSync(file)) {
    return { updatedAt: new Date().toISOString(), server: { name: 'Capital City' }, characters: [] };
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function uniqueSlug(root, base) {
  const doc = readRoster(root);
  const used = new Set((doc.characters || []).map((c) => String(c.id || '').toLowerCase()));
  let slug = base || 'streamer';
  if (!used.has(slug)) return slug;
  let n = 2;
  while (used.has(slug + '-' + n)) n += 1;
  return slug + '-' + n;
}

function publishCharacter(root, application) {
  const doc = readRoster(root);
  const chars = Array.isArray(doc.characters) ? doc.characters.slice() : [];
  const id = application.slug;
  if (chars.some((c) => c.id === id || (c.yt && c.yt === application.youtubeUrl))) {
    return { ok: true, reused: true, character: chars.find((c) => c.id === id || c.yt === application.youtubeUrl) };
  }
  const character = {
    id: id,
    featured: false,
    name: application.characterName,
    role: application.role || 'Personagem GTA RP',
    blurb:
      (application.kickUrl ? 'A live do streamer está no Kick. ' : '') +
      'O YouTube é o arquivo da personagem. Sem afiliação. Ficção de jogo ≠ manual de crime.',
    yt: application.youtubeUrl,
    ytHandle: application.youtubeHandle || '',
    kick: application.kickUrl || '',
    kickHandle: application.kickHandle || '',
    twitch: application.twitchUrl || '',
    twitchHandle: application.twitchHandle || '',
    href: ''
  };
  chars.push(character);
  const next = Object.assign({}, doc, {
    updatedAt: new Date().toISOString(),
    characters: chars
  });
  writeFileRetrySync(rosterPath(root), JSON.stringify(next, null, 2) + '\n', 'utf8');
  return { ok: true, character: character };
}

async function submitApplication(root, payload) {
  if (String(payload.website || '').trim()) {
    return { ok: true, status: 201, ignored: true };
  }
  const characterName = String(payload.characterName || '').trim().slice(0, 80);
  if (characterName.length < 2) {
    return { ok: false, status: 400, error: 'Indica o nome da personagem.' };
  }
  const yt = parseYoutube(payload.youtubeUrl);
  if (yt.error) return { ok: false, status: 400, error: yt.error };
  const kick = parseKick(payload.kickUrl);
  if (kick.error) return { ok: false, status: 400, error: kick.error };
  const twitch = parseTwitch(payload.twitchUrl);
  if (twitch.error) return { ok: false, status: 400, error: twitch.error };
  if (!kick.url && !twitch.url) {
    return { ok: false, status: 400, error: 'Indica o canal de streamer — Kick (preferido) ou Twitch.' };
  }
  const contactName = String(payload.contactName || '').trim().slice(0, 80);
  const contactEmail = String(payload.contactEmail || '').trim().toLowerCase().slice(0, 120);
  if (contactName.length < 2) return { ok: false, status: 400, error: 'Indica o teu nome de contacto.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return { ok: false, status: 400, error: 'E-mail de contacto inválido.' };
  }
  if (!payload.adult) {
    return { ok: false, status: 400, error: 'A candidatura é só para maiores de 18 anos.' };
  }
  if (!payload.terms) {
    return { ok: false, status: 400, error: 'É preciso aceitar os termos: ficção de jogo, sem afiliação.' };
  }

  const db = await initDatabaseOnce(root);
  const dup = await findGtarpApplicationDuplicate(db, yt.url, kick.url);
  if (dup) {
    return {
      ok: false,
      status: 409,
      error: 'Já há uma candidatura com este canal YouTube ou Kick.'
    };
  }

  const row = {
    id: newId(),
    status: 'pending',
    characterName,
    role: String(payload.role || '').trim().slice(0, 120),
    youtubeUrl: yt.url,
    youtubeHandle: yt.handle,
    kickUrl: kick.url,
    kickHandle: kick.handle,
    twitchUrl: twitch.url,
    twitchHandle: twitch.handle,
    contactName,
    contactEmail,
    notes: String(payload.notes || '').trim().slice(0, 800),
    slug: '',
    reviewerNote: '',
    submittedAt: new Date().toISOString(),
    reviewedAt: null
  };
  await insertGtarpApplication(db, row);
  notifyInspectorNewGtarpStreamer(row).catch(function () { /* best-effort */ });
  return { ok: true, status: 201, application: publicView(row) };
}

async function listAdminApplications(root, status) {
  const db = await initDatabaseOnce(root);
  const list = await listGtarpApplications(db, status || null);
  return list.map(adminView);
}

async function getAdminApplication(root, id) {
  const db = await initDatabaseOnce(root);
  return adminView(await getGtarpApplicationById(db, id));
}

async function approveApplication(root, id, patch) {
  const db = await initDatabaseOnce(root);
  const current = await getGtarpApplicationById(db, id);
  if (!current) return { ok: false, status: 404, error: 'Candidatura não encontrada.' };
  if (current.status === 'approved') {
    return { ok: true, application: adminView(current), reused: true };
  }
  const characterName = String((patch && patch.characterName) || current.characterName).trim();
  const role = String((patch && patch.role) || current.role).trim();
  const slug = uniqueSlug(root, slugify((patch && patch.slug) || characterName));
  const updated = await updateGtarpApplication(db, id, {
    status: 'approved',
    characterName,
    role,
    slug,
    reviewerNote: String((patch && patch.reviewerNote) || '').trim().slice(0, 400),
    reviewedAt: new Date().toISOString()
  });
  const published = publishCharacter(root, updated);
  return { ok: true, application: adminView(updated), character: published.character };
}

async function rejectApplication(root, id, note) {
  const db = await initDatabaseOnce(root);
  const current = await getGtarpApplicationById(db, id);
  if (!current) return { ok: false, status: 404, error: 'Candidatura não encontrada.' };
  const updated = await updateGtarpApplication(db, id, {
    status: 'rejected',
    reviewerNote: String(note || '').trim().slice(0, 400),
    reviewedAt: new Date().toISOString()
  });
  return { ok: true, application: adminView(updated) };
}

module.exports = {
  slugify,
  parseYoutube,
  parseKick,
  parseTwitch,
  publicView,
  submitApplication,
  listAdminApplications,
  getAdminApplication,
  approveApplication,
  rejectApplication,
  publishCharacter
};
