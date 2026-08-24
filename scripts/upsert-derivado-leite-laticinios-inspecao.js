'use strict';

/**
 * Injeta o hub Leite / laticínios (Produtos nocivos).
 * Uso: node scripts/upsert-derivado-leite-laticinios-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLeiteLaticiniosPost, SLUG } = require('../lib/leite-laticinios-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-derivado-leite.html';

function upsertPost(posts, post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + post.filename;
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
  }
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.unshift(entry);
}

function upsertGuiaWord(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => x.id === 'caseina');
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

function resizeCover() {
  const sharp = require('sharp');
  const dest = path.join(ROOT, 'imagens', 'inspecoes', 'leite-laticinios-cover.jpg');
  const candidates = [
    path.join(
      process.env.USERPROFILE || '',
      '.cursor',
      'projects',
      'c-Users-tiago-Desktop-ProjectBudGanja',
      'assets',
      'leite-laticinios-cover.png'
    ),
    path.join(ROOT, 'imagens', 'inspecoes', 'leite-laticinios-cover.png'),
    path.join(ROOT, 'assets', 'leite-laticinios-cover.png')
  ];
  const src = candidates.find((p) => fs.existsSync(p));
  if (!src) {
    console.warn('Capa PNG não encontrada. Procurado:\n' + candidates.join('\n'));
    return Promise.resolve();
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  return sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest)
    .then(() => console.log('Capa JPG', dest, '←', src));
}

async function main() {
  await resizeCover();

  const post = buildLeiteLaticiniosPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'derivado-leite',
      title: 'Leite e laticínios — da ordenha à prateleira industrial',
      titleEn: 'Milk and dairy — from milking to the industrial shelf',
      titleEs: 'Leche y lácteos — del ordeño al estante industrial',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Hub Produtos nocivos: leite/laticínios — UHT, pó, queijo, iogurte adoçado e bebidas lácteas; proteína na caseína.',
      whyEn: 'Harmful-products hub: milk/dairy — UHT, powder, cheese, sweetened yogurt and dairy drinks; protein on the casein sheet.',
      whyEs: 'Hub Productos nocivos: leche/lácteos — UHT, polvo, queso, yogur azucarado y bebidas lácteas; proteína en caseína.',
      suggestedSlug: SLUG,
      doneHref: HREF,
      seriesHint: 'animais-derivados-risco',
      sources: [
        '/animais/vaca/',
        '/posts/post-inspecao-derivado-caseina.html',
        'https://pt.wikipedia.org/wiki/Leite',
        'https://pt.wikipedia.org/wiki/Latic%C3%ADnio'
      ],
      notes: 'Hub da família láctea; não fundir com a ficha Caseína nem com carnes da vaca.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(catalog.animals) ? catalog.animals : [];
    const vaca = animals.find((a) => a && a.slug === 'vaca');
    if (vaca) {
      const links = Array.isArray(vaca.relatedInspections) ? vaca.relatedInspections.slice() : [];
      const leiteLink = {
        href: HREF,
        label: 'Inspeção: Leite e laticínios — da ordenha à prateleira industrial',
        labelEn: 'Inspection: Milk and dairy — from milking to the industrial shelf',
        labelEs: 'Inspección: Leche y lácteos — del ordeño al estante industrial'
      };
      const without = links.filter((x) => x && x.href !== HREF);
      vaca.relatedInspections = [leiteLink].concat(without);
      catalog.updatedAt = new Date().toISOString();
      fs.writeFileSync(ANIMAIS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em animais.json → vaca');
    }
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const words = Array.isArray(guia.items) ? guia.items : [];
    upsertGuiaWord(words, {
      id: 'leite',
      word: 'Leite',
      simple: 'Secreção mamária bovina — no site, hub da família láctea (UHT, pó, laticínios ultraprocessados).',
      simpleEn: 'Bovine milk — on the site, dairy-family hub (UHT, powder, ultra-processed dairy).',
      simpleEs: 'Leche bovina — en el sitio, hub de la familia láctea (UHT, polvo, lácteos ultraprocesados).',
      group: 'tecnico',
      fromTitle: true,
      href: HREF,
      history:
        'Leite vem do latim lac, lactis (leite). O vocábulo nomeia a secreção mamária e, por extensão, a cadeia dos laticínios.',
      curiosities:
        'O laboratório separa leite tradicional de UHT, leite em pó e bebidas lácteas; a proteína isolada vive na ficha Caseína.',
      historyEn:
        'Portuguese leite comes from Latin lac, lactis (milk). The word names the mammary secretion and, by extension, the dairy chain.',
      curiositiesEn:
        'The lab separates traditional milk from UHT, milk powder and dairy drinks; the isolated protein lives on the Casein sheet.',
      historyEs:
        'Leche / leite viene del latín lac, lactis. El vocablo nombra la secreción mamaria y, por extensión, la cadena láctea.',
      curiositiesEs:
        'El laboratorio separa la leche tradicional de UHT, leche en polvo y bebidas lácteas; la proteína aislada vive en la ficha Caseína.'
    });
    upsertGuiaWord(words, {
      id: 'laticinios',
      word: 'Laticínios',
      simple: 'Família de produtos do leite (queijo, iogurte, manteiga, UHT, ultraprocessados) — hub irmão da caseína.',
      simpleEn: 'Dairy family (cheese, yogurt, butter, UHT, ultra-processed) — sibling hub of casein.',
      simpleEs: 'Familia láctea (queso, yogur, mantequilla, UHT, ultraprocesados) — hub hermano de la caseína.',
      group: 'tecnico',
      fromTitle: true,
      href: HREF,
      history:
        'Laticínio / laticínios vem de laticinium (latim tardio: alimento de leite), de lac. Nomeia a indústria e os produtos derivados do leite.',
      curiosities:
        'No hub de produtos nocivos a palavra marca a prateleira inteira — não só o copo de leite fresco.',
      historyEn:
        'Portuguese laticínios comes from late Latin laticinium (milk food), from lac. It names the industry and milk-derived products.',
      curiositiesEn:
        'On the harmful-products hub the word marks the whole shelf — not only a glass of fresh milk.',
      historyEs:
        'Laticínios viene del latín tardío laticinium (alimento de leche), de lac. Nombra la industria y los derivados de la leche.',
      curiositiesEs:
        'En el hub de productos nocivos la palabra marca todo el estante — no solo el vaso de leche fresca.'
    });
    guia.items = words;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de Palavras actualizado (leite + laticínios)');
  }

  writeHtml(post);

  try {
    execFileSync('node', [path.join(ROOT, 'scripts', 'sync-ferramentas-nav.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso sync nav:', e.message);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
