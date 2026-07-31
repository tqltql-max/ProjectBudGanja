'use strict';

/**
 * Corrige UTF-8 mal interpretado como Windows-1252/Latin-1 em posts e i18n.
 * Uso: node scripts/fix-posts-mojibake.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const WIN1252_TO_BYTE = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f
};

function looksMojibake(str) {
  return typeof str === 'string' && /(?:Ã.|Â[\x80-\xff]|â€.|Ã |Â·|Â«|Â»)/.test(str);
}

function fixMojibakeOnce(str) {
  if (typeof str !== 'string' || !looksMojibake(str)) return str;
  const bytes = [];
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (code <= 0xff) bytes.push(code);
    else if (WIN1252_TO_BYTE[code] != null) bytes.push(WIN1252_TO_BYTE[code]);
    else return str;
  }
  try {
    const fixed = Buffer.from(bytes).toString('utf8');
    if (fixed.includes('\uFFFD')) return str;
    return fixed;
  } catch (e) {
    return str;
  }
}

/** Aplica até 3 passes (casos duplamente corrompidos). */
function fixMojibake(str) {
  let out = str;
  for (let i = 0; i < 3; i++) {
    const next = fixMojibakeOnce(out);
    if (next === out) break;
    out = next;
  }
  return out;
}

function walk(value, stats) {
  if (typeof value === 'string') {
    if (!looksMojibake(value)) return value;
    const fixed = fixMojibake(value);
    if (fixed !== value) stats.fixed += 1;
    return fixed;
  }
  if (Array.isArray(value)) {
    return value.map((item) => walk(item, stats));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value)) {
      out[key] = walk(value[key], stats);
    }
    return out;
  }
  return value;
}

function fixJsonFile(relPath) {
  const file = path.join(ROOT, relPath);
  if (!fs.existsSync(file)) {
    console.warn('skip missing', relPath);
    return;
  }
  const stats = { fixed: 0 };
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);
  const fixed = walk(data, stats);
  fs.writeFileSync(file, JSON.stringify(fixed, null, 2) + '\n', 'utf8');
  console.log(relPath + ':', stats.fixed, 'strings corrigidas');
}

async function syncSqlFromPosts() {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') {
    console.log('SQL sync skipped (STORE_BACKEND=fs)');
    return;
  }
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) {
    console.log('SQL sync skipped (sem DB)');
    return;
  }
  const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store actualizado com posts.json limpo');
}

async function main() {
  // Smoke test
  const sample = 'InspeÃ§Ã£o: Prof. Elisaldo Carlini â€” pioneiro Â· legado (1930â€“2020)';
  const sampleFixed = fixMojibake(sample);
  console.log('smoke:', sampleFixed);
  if (!sampleFixed.includes('Inspeção') || !sampleFixed.includes('—')) {
    throw new Error('smoke test falhou: ' + sampleFixed);
  }

  fixJsonFile('posts.json');
  fixJsonFile('posts-public.json');
  fixJsonFile('content/post-i18n.json');
  fixJsonFile('search-index.json');

  // Re-inject clean builder bodies for people (source of truth in lib/)
  try {
    const { PESSOAS_INSPECOES_POSTS } = require('../lib/pessoas-inspecoes-posts.js');
    const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
    let reinjected = 0;
    for (const built of PESSOAS_INSPECOES_POSTS) {
      const idx = posts.findIndex((p) => p.slug === built.slug);
      if (idx < 0) continue;
      posts[idx] = Object.assign({}, posts[idx], built);
      reinjected += 1;
    }
    fs.writeFileSync(path.join(ROOT, 'posts.json'), JSON.stringify(posts, null, 2) + '\n', 'utf8');
    console.log('PESSOAS reinjectadas dos builders:', reinjected);

    const i18nPath = path.join(ROOT, 'content', 'post-i18n.json');
    const i18n = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
    for (const built of PESSOAS_INSPECOES_POSTS) {
      i18n[built.slug] = {
        titleEn: built.titleEn,
        titleEs: built.titleEs,
        excerptEn: built.excerptEn,
        excerptEs: built.excerptEs,
        contentEn: built.contentEn,
        contentEs: built.contentEs
      };
    }
    fs.writeFileSync(i18nPath, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
    console.log('post-i18n overlay atualizado para pessoas');
  } catch (e) {
    console.warn('Aviso reinject pessoas:', e.message);
  }

  try {
    await syncSqlFromPosts();
  } catch (e) {
    console.warn('Aviso SQL:', e.message);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
