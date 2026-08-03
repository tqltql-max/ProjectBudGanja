'use strict';

/**
 * Injeta palavra «mensagem» na série Palavras.
 * Uso: node scripts/upsert-palavra-mensagem-inspecao.js
 * Re-lê posts.json (agentes concorrentes) para Cap livre.
 */

const fs = require('fs');
const path = require('path');
const { buildMensagemPost } = require('../lib/mensagem-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug)
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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
  // Re-ler Cap livre (sinal / outros agentes podem ter escrito entretanto)
  const postsLive = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = postsLive.find((p) => p.slug === 'inspecao-palavra-mensagem');
  if (existing && existing.seriesOrder != null) {
    console.log('Slug já existe — Cap.', existing.seriesOrder, '(deepen/update)');
  }

  const post = buildMensagemPost();
  if (existing && existing.seriesOrder != null) {
    post.seriesOrder = existing.seriesOrder;
  } else {
    const free = nextFreeSeriesOrder(postsLive, post.seriesOrder, post.slug);
    if (free !== post.seriesOrder) {
      console.log('seriesOrder ajustado:', post.seriesOrder, '→', free);
      post.seriesOrder = free;
    }
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const sources = [
    post.sourceUrl,
    'https://en.wiktionary.org/wiki/message',
    'https://pt.wikipedia.org/wiki/Mensagem',
    '/posts/post-inspecao-palavra-gesto.html',
    '/posts/post-inspecao-palavra-lingua-portuguesa.html',
    '/posts/post-inspecao-expressao-faca-o-melhor.html'
  ];
  if (fs.existsSync(path.join(ROOT, 'posts', 'post-inspecao-palavra-sinal.html'))) {
    sources.splice(5, 0, '/posts/post-inspecao-palavra-sinal.html');
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-mensagem';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Mensagem — comunicação, SMS/chat e deixar rasto',
      titleEn: 'Mensagem — communication, SMS/chat and leaving a trace',
      titleEs: 'Mensagem — comunicación, SMS/chat y dejar rastro',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: mensagem / mensagens (lat. mittere → message) — comunicação; SMS/chat; deixar mensagem; sinal ≠ mensagem; tipografia sm,enajsos.',
      whyEn: 'Words: mensagem / mensagens (Lat. mittere → message) — communication; SMS/chat; leave a message; signal ≠ message; typo sm,enajsos.',
      whyEs: 'Palabras: mensagem / mensagens (lat. mittere → message) — comunicación; SMS/chat; dejar mensaje; señal ≠ mensaje; tipografía sm,enajsos.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources,
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — cover plural mensagens; elos gesto / lingua-portuguesa / sinal se existirem.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-mensagem)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'mensagem',
      word: 'mensagem',
      simple:
        'Lat. mittere → message — conteúdo enviado; plural mensagens; SMS/chat; deixar mensagem; sinal ≠ mensagem.',
      simpleEn:
        'Lat. mittere → message — content sent; plural mensagens; SMS/chat; leave a message; signal ≠ message.',
      simpleEs:
        'Lat. mittere → message — contenido enviado; plural mensagens; SMS/chat; dejar mensaje; señal ≠ mensaje.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'mensagem');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'gesto' || x.id === 'verdade' || x.id === 'lingua' || x.id === 'português'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (mensagem)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    mensagem: { gloss: "Lat. mittere → message — conteúdo enviado; plural mensagens; SMS/chat; deixar mensagem; sinal ≠ mensagem.", href: "/posts/post-inspecao-palavra-mensagem.html", en: "message", es: "mensaje", fr: "message", it: "messaggio", de: "Nachricht", el: "μήνυμα", la: "nuntius", yo: "ìránṣẹ́", sw: "ujumbe", gez: "mälgəʿ", nl: "bericht", pl: "wiadomość", ru: "сообщение", uk: "повідомлення", zh: "消息", ja: "メッセージ", ko: "메시지", ar: "رسالة", he: "הודעה", hi: "संदेश", tr: "mesaj", sv: "meddelande", da: "besked", no: "melding", fi: "viesti", cs: "zpráva", ro: "mesaj", hu: "üzenet", ca: "missatge", gl: "mensaxe", eu: "mezu", gn: "marandu", qu: "willakuy", eo: "mesaĝo", vi: "tin nhắn", id: "pesan", th: "ข้อความ", hr: "poruka", sk: "správa", ga: "teachtaireacht", cy: "neges", ha: "saƙo", am: "መልእክት", fa: "پیام", bn: "বার্তা", zu: "umlayezo" },';
    const pluralLine =
      '    mensagens: { gloss: "Plural de mensagem — fila, histórico, caixa de entrada; capa da ficha Palavras.", href: "/posts/post-inspecao-palavra-mensagem.html", en: "messages", es: "mensajes", fr: "messages", it: "messaggi", de: "Nachrichten", el: "μηνύματα", la: "nuntii", yo: "àwọn ìránṣẹ́", sw: "ujumbe", gez: "mälgəʿāt", nl: "berichten", pl: "wiadomości", ru: "сообщения", uk: "повідомлення", zh: "消息", ja: "メッセージ", ko: "메시지들", ar: "رسائل", he: "הודעות", hi: "संदेश", tr: "mesajlar", sv: "meddelanden", da: "beskeder", no: "meldinger", fi: "viestit", cs: "zprávy", ro: "mesaje", hu: "üzenetek", ca: "missatges", gl: "mensaxes", eu: "mezuak", gn: "marandu", qu: "willakuykuna", eo: "mesaĝoj", vi: "tin nhắn", id: "pesan", th: "ข้อความ", hr: "poruke", sk: "správy", ga: "teachtaireachtaí", cy: "negeseuon", ha: "saƙonni", am: "መልእክቶች", fa: "پیام‌ها", bn: "বার্তা", zu: "imiyalezo" },';
    if (/mensagem:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    mensagem:\s*\{[\s\S]*?\},/, entryLine);
    } else if (/gesto:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(gesto:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryLine + '\n');
    } else {
      console.warn('Aviso: glossário — ponto de inserção mensagem não encontrado');
    }
    if (/mensagens:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    mensagens:\s*\{[\s\S]*?\},/, pluralLine);
    } else if (/mensagem:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(mensagem:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + pluralLine + '\n');
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (mensagem / mensagens)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
  console.log('URL: https://inspetorbudganja.com.br' + href);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
