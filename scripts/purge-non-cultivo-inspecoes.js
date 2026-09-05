'use strict';

/**
 * Apaga inspeções fora do eixo cultivo.
 * Uso: node scripts/purge-non-cultivo-inspecoes.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const BACKUP_DIR = path.join(ROOT, 'data', 'backups');
const MERGE_FILE = path.join(ROOT, 'lib', 'merge-guia-inspecoes.js');

const KEEP_SERIES = new Set([
  'plantas-medicinais',
  'plantas-frutos',
  'plantas-derivados-risco',
  'animais-catalogo',
  'animais-producao',
  'animais-derivados-risco',
  'fungos-catalogo',
  'verificacao-equipamento'
]);

const DROP_SLUG_RE = /celular|patinete/i;

const BASE_REMOVED_SLUGS = [
  'inspecao-canal-jardimhg',
  'inspecao-canal-inspetorbudganja',
  'inspecao-canal-plantamemo',
  'inspecao-cultivo-inicio',
  'inspecao-nutricao-cannabis',
  'inspecao-solo-vivo-organico',
  'inspecao-arquitetura-cannabis',
  'inspecao-ciencia-floracao',
  'inspecao-propagacao-clonagem',
  'inspecao-cultivo-indoor-ppfd',
  'inspecao-insumo-biobizz',
  'inspecao-loja-floraurbana'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function shouldKeep(post) {
  if (!post || post.category !== 'inspecao') return true;
  if (!KEEP_SERIES.has(post.series)) return false;
  if (DROP_SLUG_RE.test(String(post.slug || ''))) return false;
  return true;
}

function patchMergeFile(removedSeries, outlierSlugs) {
  let src = fs.readFileSync(MERGE_FILE, 'utf8');

  const keepList = [...KEEP_SERIES].sort().map((s) => `  '${s}'`).join(',\n');
  const seriesList = [...removedSeries].sort().map((s) => `  '${s}'`).join(',\n');
  const slugList = [...new Set([...BASE_REMOVED_SLUGS, ...outlierSlugs])]
    .sort()
    .map((s) => `  '${s}'`)
    .join(',\n');

  // Inject KEEP set + update isRemovedInspecao if not present
  if (!src.includes('KEEP_INSPECAO_SERIES')) {
    src = src.replace(
      '/** Slugs obsoletos / removidos do projeto (não voltam no merge nem no build). */\nconst REMOVED_INSPECAO_SLUGS',
      `/** Séries de inspeção permitidas (eixo cultivo). */\nconst KEEP_INSPECAO_SERIES = new Set([\n${keepList}\n]);\n\n/** Slugs obsoletos / removidos do projeto (não voltam no merge nem no build). */\nconst REMOVED_INSPECAO_SLUGS`
    );
  } else {
    src = src.replace(
      /const KEEP_INSPECAO_SERIES = new Set\(\[[\s\S]*?\]\);/,
      `const KEEP_INSPECAO_SERIES = new Set([\n${keepList}\n]);`
    );
  }

  src = src.replace(
    /const REMOVED_INSPECAO_SLUGS = new Set\(\[[\s\S]*?\]\);/,
    `const REMOVED_INSPECAO_SLUGS = new Set([\n${slugList}\n]);`
  );
  src = src.replace(
    /const REMOVED_INSPECAO_SERIES = new Set\(\[[\s\S]*?\]\);/,
    `const REMOVED_INSPECAO_SERIES = new Set([\n${seriesList}\n]);`
  );
  src = src.replace(
    /function isRemovedInspecao\(post\) \{[\s\S]*?\n\}/,
    `function isRemovedInspecao(post) {
  if (!post) return false;
  if (REMOVED_INSPECAO_SLUGS.has(post.slug)) return true;
  if (REMOVED_INSPECAO_SERIES.has(post.series)) return true;
  if (post.category === 'inspecao') {
    if (DROP_SLUG_RE.test(String(post.slug || ''))) return true;
    if (post.series && !KEEP_INSPECAO_SERIES.has(post.series)) return true;
  }
  return false;
}`
  );

  if (!src.includes('DROP_SLUG_RE')) {
    src = src.replace(
      'const KEEP_INSPECAO_SERIES',
      "const DROP_SLUG_RE = /celular|patinete/i;\n\nconst KEEP_INSPECAO_SERIES"
    );
  }

  src = src.replace(
    /const HOME_PINNED_INSPECAO_SLUGS = \[[\s\S]*?\];/,
    'const HOME_PINNED_INSPECAO_SLUGS = [];'
  );

  if (!src.includes('KEEP_INSPECAO_SERIES,')) {
    src = src.replace(
      '  REMOVED_INSPECAO_SLUGS,\n  REMOVED_INSPECAO_SERIES,',
      '  KEEP_INSPECAO_SERIES,\n  REMOVED_INSPECAO_SLUGS,\n  REMOVED_INSPECAO_SERIES,'
    );
  }

  fs.writeFileSync(MERGE_FILE, src, 'utf8');
}

async function syncSql(posts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') {
    console.log('STORE_BACKEND=fs — skip SQL');
    return;
  }
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) {
    console.log('Sem DB local/remoto — skip SQL');
    return;
  }
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store: posts actualizados (' + posts.length + ')');
}

async function main() {
  const raw = fs.readFileSync(POSTS_FILE, 'utf8');
  const posts = JSON.parse(raw);

  ensureDir(BACKUP_DIR);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, 'posts-before-cultivo-purge-' + stamp + '.json');
  fs.writeFileSync(backupPath, raw, 'utf8');
  console.log('Backup:', backupPath);

  const kept = [];
  const removed = [];
  for (const p of posts) {
    if (shouldKeep(p)) kept.push(p);
    else removed.push(p);
  }

  const bySeries = {};
  for (const p of removed) {
    const s = p.series || '(sem-series)';
    bySeries[s] = (bySeries[s] || 0) + 1;
  }

  console.log('Antes:', posts.length, '| Mantidos:', kept.length, '| Removidos:', removed.length);
  console.log('Removidos por série:', bySeries);

  const removedSeries = new Set(removed.map((p) => p.series).filter(Boolean));
  for (const s of KEEP_SERIES) removedSeries.delete(s);
  // séries já bloqueadas historicamente
  removedSeries.add('guia-cultivo-basico');
  removedSeries.add('canal-inspetorbudganja');
  removedSeries.add('canal-plantamemo');

  const outlierSlugs = removed
    .filter((p) => DROP_SLUG_RE.test(String(p.slug || '')))
    .map((p) => p.slug);

  patchMergeFile(removedSeries, outlierSlugs);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(kept, null, 2) + '\n', 'utf8');
  console.log('posts.json gravado');

  const removedSlugSet = new Set(removed.map((p) => p.slug).filter(Boolean));
  const i18nPath = path.join(ROOT, 'content', 'post-i18n.json');
  if (fs.existsSync(i18nPath)) {
    const i18n = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
    let n = 0;
    for (const slug of removedSlugSet) {
      if (i18n[slug]) {
        delete i18n[slug];
        n += 1;
      }
    }
    fs.writeFileSync(i18nPath, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
    console.log('post-i18n: removidas', n, 'entradas');
  }

  await syncSql(kept);

  // Export slug list for scrub scripts
  const scrubPath = path.join(BACKUP_DIR, 'purged-inspecao-slugs-' + stamp + '.json');
  fs.writeFileSync(
    scrubPath,
    JSON.stringify({ removed: [...removedSlugSet].sort(), keptSeries: [...KEEP_SERIES] }, null, 2) + '\n',
    'utf8'
  );
  console.log('Slug list:', scrubPath);
  console.log('OK purge. Segue: npm run build:posts');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
