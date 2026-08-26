'use strict';

/**
 * Injeta inspeção do patinete eléctrico (objecto · locomoção a bateria · crianças).
 * Uso: node scripts/upsert-patinete-eletrico-criancas-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPatineteEletricoCriancasInspecaoPost } = require('../lib/patinete-eletrico-criancas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-patinete-eletrico-criancas.html';
const CONTRAN =
  'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023.pdf';
const INMETRO =
  'https://www.gov.br/inmetro/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-conformidade/brinquedos/brinquedos-eletricos-devem-ser-certificados';

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterCelular = posts.findIndex((p) => p.slug === 'inspecao-celular-riscos-saude-criancas');
  if (afterCelular >= 0) {
    posts.splice(afterCelular + 1, 0, post);
    console.log('Inserido', post.slug, 'após celular · crianças');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-patinete-eletrico-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildPatineteEletricoCriancasInspecaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'patinete-eletrico-criancas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Patinete eléctrico — locomoção a bateria, crianças e perigos',
      titleEn: 'Electric scooter — battery locomotion, children and hazards',
      titleEs: 'Patinete eléctrico — locomoción a batería, niñas/os y peligros',
      tipo: 'equipamento',
      priority: 1,
      status: 'feita',
      why: 'Objetos: patinete eléctrico — locomoção a bateria; INMETRO ≤24 V × CONTRAN 996; célula ≠ BYD Blade; quedas, via e fogo; sem endosso.',
      whyEn: 'Objects: e-scooter as battery locomotion; INMETRO ≤24 V vs CONTRAN 996; cell ≠ BYD Blade; falls, traffic and fire; no endorsement.',
      whyEs: 'Objetos: patinete eléctrico; INMETRO ≤24 V × CONTRAN 996; celda ≠ BYD Blade; caídas, vía y fuego; sin endoso.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'verificacao-equipamento',
      sources: [
        CONTRAN,
        INMETRO,
        'https://en.wikipedia.org/wiki/BYD_Company',
        '/posts/post-inspecao-celular-riscos-saude-criancas.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Brinquedo ≠ via. Célula industrial ≠ pack de marketplace. Sem idade mágica.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.unshift(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (patinete-eletrico-criancas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'patinete',
      word: 'Patinete',
      simple:
        'Objecto de locomoção; na ficha, o eléctrico a bateria — não é brinquedo com motor; INMETRO ≤24 V × via (CONTRAN 996); perigos infantis: queda, célula, rua.',
      simpleEn:
        'Locomotion object; on the site, the battery e-scooter — not a motorized toy; INMETRO ≤24 V vs road (CONTRAN 996); child hazards: falls, cell, traffic.',
      simpleEs:
        'Objeto de locomoción; en el sitio, el eléctrico a batería — no es juguete con motor; INMETRO ≤24 V × vía (CONTRAN 996); peligros infantiles: caída, celda, calle.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else items.push(entry);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (patinete)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!/patinete:\s*\{/.test(gloss)) {
      const entry =
        '    patinete: { tone: "caution", gloss: "Objecto de locomoção; o eléctrico é bateria + motor — não brinquedo com motor; INMETRO ≤24 V × CONTRAN 996; perigos infantis: queda, célula, via; Valeu !!!", href: "/posts/post-inspecao-patinete-eletrico-criancas.html", en: "scooter (kick / e-scooter)", es: "patinete" },\n' +
        '    patinetes: { gloss: "Plural de patinete — ver ficha de locomoção a bateria e perigos infantis.", href: "/posts/post-inspecao-patinete-eletrico-criancas.html", en: "scooters", es: "patinetes" },\n';
      const reRisco = /(    risco:\s*\{[\s\S]*?\},?\r?\n)/;
      if (reRisco.test(gloss)) {
        gloss = gloss.replace(reRisco, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (patinete)');
      } else {
        console.warn('Aviso: glossário — ponto risco não encontrado para patinete');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '|', HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
