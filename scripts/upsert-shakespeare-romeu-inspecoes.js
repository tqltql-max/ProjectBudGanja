'use strict';

/**
 * Injeta cluster Shakespeare / Romeu / Luhrmann / DiCaprio / Filmografias.
 * Uso: node scripts/upsert-shakespeare-romeu-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildShakespearePost } = require('../lib/shakespeare-inspecao-post.js');
const { buildRomeuEJulietaPost } = require('../lib/romeu-e-julieta-inspecao-post.js');
const { buildRomeuMaisJulietaFilmePost } = require('../lib/romeu-mais-julieta-filme-inspecao-post.js');
const { buildLuhrmannPost } = require('../lib/luhrmann-inspecao-post.js');
const { buildDicaprioPost } = require('../lib/dicaprio-inspecao-post.js');
const { buildDicaprioFilmografiaPost } = require('../lib/dicaprio-filmografia-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertSug(sug, entry) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterId) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = afterId ? items.findIndex((x) => x.id === afterId) : -1;
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

function upsertGloss(glossPath, keyPattern, entryLine, afterKey) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const reKey = new RegExp(keyPattern);
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, entryLine);
    fs.writeFileSync(glossPath, gloss, 'utf8');
    console.log('Glossário actualizado (existente)');
    return;
  }
  const reAfter = new RegExp(
    '(    ' + afterKey + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
  );
  if (reAfter.test(gloss)) {
    gloss = gloss.replace(reAfter, '$1' + entryLine + '\n');
    fs.writeFileSync(glossPath, gloss, 'utf8');
    console.log('Glossário actualizado (após ' + afterKey + ')');
    return;
  }
  console.warn('Aviso: glossário — inserção falhou para', afterKey);
}

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-shakespeare-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const shakeExist = posts.find((p) => p.slug === 'inspecao-figura-william-shakespeare');
  const romeuExist = posts.find((p) => p.slug === 'inspecao-arte-romeu-e-julieta');
  const filmeExist = posts.find((p) => p.slug === 'inspecao-filme-romeu-mais-julieta');
  const luhrmannExist = posts.find((p) => p.slug === 'inspecao-figura-baz-luhrmann');
  const dicaprioExist = posts.find((p) => p.slug === 'inspecao-figura-leonardo-dicaprio');
  const filoExist = posts.find((p) => p.slug === 'inspecao-filmografia-leonardo-dicaprio');

  let pessoasNext = nextOrder(posts, 'pessoas-historia');
  const shakeOrder = shakeExist
    ? Number(shakeExist.seriesOrder) || pessoasNext
    : pessoasNext++;
  const luhrmannOrder = luhrmannExist
    ? Number(luhrmannExist.seriesOrder) || pessoasNext
    : pessoasNext++;
  const dicaprioOrder = dicaprioExist
    ? Number(dicaprioExist.seriesOrder) || pessoasNext
    : pessoasNext++;

  let artesNext = nextOrder(posts, 'artes-cultura');
  const romeuOrder = romeuExist ? Number(romeuExist.seriesOrder) || artesNext : artesNext++;
  const filmeOrder = filmeExist ? Number(filmeExist.seriesOrder) || artesNext : artesNext;

  const filoOrder = filoExist
    ? Number(filoExist.seriesOrder) || 1
    : nextOrder(posts, 'filmografias');

  const built = [
    buildShakespearePost(shakeOrder),
    buildRomeuEJulietaPost(romeuOrder),
    buildRomeuMaisJulietaFilmePost(filmeOrder),
    buildLuhrmannPost(luhrmannOrder),
    buildDicaprioPost(dicaprioOrder),
    buildDicaprioFilmografiaPost(filoOrder)
  ];
  built.forEach((post) => {
    upsertPost(posts, post);
    writeHtml(post);
  });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const shakeHref = '/posts/post-inspecao-figura-william-shakespeare.html';
  const romeuHref = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const filmeHref = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
  const luhrmannHref = '/posts/post-inspecao-figura-baz-luhrmann.html';
  const dicaprioHref = '/posts/post-inspecao-figura-leonardo-dicaprio.html';
  const filoHref = '/posts/post-inspecao-filmografia-leonardo-dicaprio.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    upsertSug(sug, {
      id: 'figura-william-shakespeare',
      title: 'William Shakespeare — ofício da palavra em palco',
      titleEn: 'William Shakespeare — the craft of the word on stage',
      titleEs: 'William Shakespeare — el oficio de la palabra en escena',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: Shakespeare (1564–1616); elo Romeu e Julieta; capa = dossiê holográfico de campo (arte, não fonte).',
      suggestedSlug: 'inspecao-figura-william-shakespeare',
      doneHref: shakeHref,
      seriesHint: 'pessoas-historia',
      sources: [
        'https://pt.wikipedia.org/wiki/William_Shakespeare',
        romeuHref,
        '/posts/post-inspecao-palavra-etimologia.html'
      ],
      notes: 'Cap. ' + shakeOrder + ' Pessoas — capa holográfica ≠ prova.'
    });
    upsertSug(sug, {
      id: 'arte-romeu-e-julieta',
      title: 'Romeu e Julieta — o nome é o nó das casas',
      titleEn: 'Romeo and Juliet — the name is the knot of the houses',
      titleEs: 'Romeo y Julieta — el nombre es el nudo de las casas',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: Romeu e Julieta; What’s in a name?; elo Shakespeare / nó / etimologia; literatura, não protocolo.',
      suggestedSlug: 'inspecao-arte-romeu-e-julieta',
      doneHref: romeuHref,
      seriesHint: 'artes-cultura',
      sources: [shakeHref, filmeHref, '/posts/post-inspecao-palavra-no.html', wikiRomeu()],
      notes: 'Cap. ' + romeuOrder + ' Artes — peça primeiro; filme 1996 à parte.'
    });
    upsertSug(sug, {
      id: 'filme-romeu-mais-julieta',
      title: 'Romeu + Julieta (1996) — Luhrmann e DiCaprio',
      titleEn: 'Romeo + Juliet (1996) — Luhrmann and DiCaprio',
      titleEs: 'Romeo + Julieta (1996) — Luhrmann y DiCaprio',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes/cinema: Romeu + Julieta (1996, Baz Luhrmann); Leonardo DiCaprio e Claire Danes; elo da peça Shakespeare.',
      suggestedSlug: 'inspecao-filme-romeu-mais-julieta',
      doneHref: filmeHref,
      seriesHint: 'artes-cultura',
      sources: [romeuHref, shakeHref, 'https://pt.wikipedia.org/wiki/Romeu_+_Julieta'],
      notes: 'Cap. ' + filmeOrder + ' Artes — filme ≠ peça.'
    });
    upsertSug(sug, {
      id: 'figura-baz-luhrmann',
      title: 'Baz Luhrmann — ofício de palco no ecrã',
      titleEn: 'Baz Luhrmann — the craft of stage on screen',
      titleEs: 'Baz Luhrmann — el oficio de escenario en pantalla',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: Baz Luhrmann (n. 1962); Red Curtain; elo Romeu + Julieta (1996).',
      suggestedSlug: 'inspecao-figura-baz-luhrmann',
      doneHref: luhrmannHref,
      seriesHint: 'pessoas-historia',
      sources: [filmeHref, shakeHref, 'https://pt.wikipedia.org/wiki/Baz_Luhrmann'],
      notes: 'Cap. ' + luhrmannOrder + ' Pessoas — âncora filme 1996.'
    });
    upsertSug(sug, {
      id: 'figura-leonardo-dicaprio',
      title: 'Leonardo DiCaprio — ofício de presença no ecrã',
      titleEn: 'Leonardo DiCaprio — the craft of presence on screen',
      titleEs: 'Leonardo DiCaprio — el oficio de presencia en pantalla',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: DiCaprio (n. 1974); âncora Romeu + Julieta (1996); inaugura Filmografias.',
      suggestedSlug: 'inspecao-figura-leonardo-dicaprio',
      doneHref: dicaprioHref,
      seriesHint: 'pessoas-historia',
      sources: [filmeHref, filoHref, luhrmannHref, 'https://pt.wikipedia.org/wiki/Leonardo_DiCaprio'],
      notes: 'Cap. ' + dicaprioOrder + ' Pessoas — pessoa ≠ catálogo ≠ uma obra.'
    });
    upsertSug(sug, {
      id: 'filmografia-leonardo-dicaprio',
      title: 'Filmografia de Leonardo DiCaprio — inauguração do tipo',
      titleEn: 'Leonardo DiCaprio filmography — founding the type',
      titleEs: 'Filmografía de Leonardo DiCaprio — inauguración del tipo',
      tipo: 'filmografia',
      priority: 2,
      status: 'feita',
      why: 'Filmografias (ficha 1): catálogo de longas de DiCaprio. Lista ≠ trinta inspeções de filme.',
      suggestedSlug: 'inspecao-filmografia-leonardo-dicaprio',
      doneHref: filoHref,
      seriesHint: 'filmografias',
      sources: [
        dicaprioHref,
        filmeHref,
        'https://en.wikipedia.org/wiki/Leonardo_DiCaprio_filmography'
      ],
      notes: 'Cap. ' + filoOrder + ' Filmografias — inauguração com DiCaprio.'
    });
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Shakespeare / Romeu / Luhrmann / DiCaprio)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(
      guia,
      {
        id: 'william-shakespeare',
        word: 'Shakespeare',
        simple:
          'Pessoa — William Shakespeare (1564–1616), ofício da palavra em palco; elo Romeu e Julieta. Capa holográfica = arte, não fonte. Valeu !!!',
        simpleEn:
          'Person — William Shakespeare (1564–1616), craft of the word on stage; link Romeo and Juliet. Holographic cover = art, not a source. Valeu !!!',
        simpleEs:
          'Persona — William Shakespeare (1564–1616), oficio de la palabra en escena; vínculo Romeu e Julieta. Portada holográfica = arte, no fuente. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: shakeHref,
        history:
          'William Shakespeare (Stratford-upon-Avon, baptizado 1564 — 1616) foi poeta, dramaturgo e actor. O Globe (1599) e o First Folio (1623) guardam o ofício. No lab, a pessoa fica em Pessoas; a peça-âncora é Romeu e Julieta.',
        curiosities:
          'A capa é um dossiê holográfico de campo. Números e «análise por IA» do cartaz não entram como prova. Hamlet no cartaz ≠ ficha de Hamlet.',
        historyEn:
          'William Shakespeare (Stratford-upon-Avon, baptised 1564 — 1616) was a poet, playwright and actor. The Globe (1599) and the First Folio (1623) keep the craft. In the lab, the person is in People; the anchor play is Romeo and Juliet.',
        curiositiesEn:
          'The cover is a field holographic dossier. Poster stats and “AI analysis” are not evidence. Hamlet on the poster ≠ a Hamlet sheet.',
        historyEs:
          'William Shakespeare (Stratford-upon-Avon, bautizado 1564 — 1616) fue poeta, dramaturgo y actor. El Globe (1599) y el First Folio (1623) guardan el oficio. En el lab, la persona está en Personas; la pieza ancla es Romeu e Julieta.',
        curiositiesEs:
          'La portada es un dossier holográfico de campo. Las cifras del cartel no entran como prueba. Hamlet en el cartel ≠ ficha de Hamlet.'
      },
      'leonardo-da-vinci'
    );
    upsertGuia(
      guia,
      {
        id: 'romeu-e-julieta',
        word: 'Romeu e Julieta',
        simple:
          'Peça de Shakespeare — Verona, duas casas; o nome é o nó, a pessoa não é o apelido. Literatura, não protocolo. Valeu !!!',
        simpleEn:
          'Shakespeare play — Verona, two houses; the name is the knot, the person is not the surname. Literature, not a protocol. Valeu !!!',
        simpleEs:
          'Pieza de Shakespeare — Verona, dos casas; el nombre es el nudo, la persona no es el apellido. Literatura, no protocolo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: romeuHref,
        history:
          'Romeo and Juliet (c. 1591–1596; Q2 1599) reescreve um enredo já conhecido (Brooke, 1562). A pergunta «What’s in a name?» é prima da etimologia: o rótulo não é a coisa.',
        curiosities:
          'No BR o título vivo da peça é Romeu e Julieta. O filme de 1996 chama-se Romeu + Julieta (Luhrmann / DiCaprio) e tem ficha própria. O desfecho não se glamouriza.',
        historyEn:
          'Romeo and Juliet (c. 1591–1596; Q2 1599) rewrites a known plot (Brooke, 1562). “What’s in a name?” is kin to etymology: the label is not the thing.',
        curiositiesEn:
          'In Brazil the living title is Romeu e Julieta. Films and West Side Story are memory, not origin. The ending is not glamorised.',
        historyEs:
          'Romeo and Juliet (c. 1591–1596; Q2 1599) reescribe un argumento conocido (Brooke, 1562). «What’s in a name?» es prima de la etimología: el rótulo no es la cosa.',
        curiositiesEs:
          'En BR el título vivo es Romeu e Julieta. El cine y West Side Story son memoria, no origen. El desenlace no se glamouriza.'
      },
      'william-shakespeare'
    );
    upsertGuia(
      guia,
      {
        id: 'romeu-mais-julieta-1996',
        word: 'Romeu + Julieta',
        simple:
          'Filme 1996 de Baz Luhrmann — Leonardo DiCaprio (Romeu) e Claire Danes (Julieta); mesmos versos, Verona Beach. A peça é Romeu e Julieta. Valeu !!!',
        simpleEn:
          '1996 Baz Luhrmann film — Leonardo DiCaprio (Romeo) and Claire Danes (Juliet); same verse, Verona Beach. The play is Romeo and Juliet. Valeu !!!',
        simpleEs:
          'Filme 1996 de Baz Luhrmann — Leonardo DiCaprio (Romeo) y Claire Danes (Julieta); mismos versos, Verona Beach. La pieza es Romeu e Julieta. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: filmeHref,
        history:
          'Romeo + Juliet (1996) actualiza a tragédia em Verona Beach e conserva o verso. No Brasil o cartaz usa o sinal + para não fundir com a peça.',
        curiosities:
          'Pedido de campo: o filme do DiCaprio. Pessoa em DiCaprio; catálogo na filmografia. Zeffirelli (1968) continua memória, sem ficha nesta entrega.',
        historyEn:
          'Romeo + Juliet (1996) updates the tragedy in Verona Beach and keeps the verse. In Brazil the plus sign keeps the film apart from the play.',
        curiositiesEn:
          'Field request: DiCaprio’s film. Not an actor biography. Zeffirelli (1968) stays memory, without a sheet in this delivery.',
        historyEs:
          'Romeo + Juliet (1996) actualiza la tragedia en Verona Beach y conserva el verso. En Brasil el signo + separa el filme de la pieza.',
        curiositiesEs:
          'Pedido de campo: el filme de DiCaprio. No es biografía del actor. Zeffirelli (1968) sigue siendo memoria.'
      },
      'romeu-e-julieta'
    );
    upsertGuia(
      guia,
      {
        id: 'baz-luhrmann',
        word: 'Luhrmann',
        simple:
          'Pessoa — Baz Luhrmann (n. 1962), ofício de palco no ecrã (Red Curtain); elo Romeu + Julieta (1996). Valeu !!!',
        simpleEn:
          'Person — Baz Luhrmann (b. 1962), craft of stage on screen (Red Curtain); link Romeo + Juliet (1996). Valeu !!!',
        simpleEs:
          'Persona — Baz Luhrmann (n. 1962), oficio de escenario en pantalla (Red Curtain); vínculo Romeu + Julieta (1996). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: luhrmannHref,
        history:
          'Mark Anthony «Baz» Luhrmann nasceu em Sydney (17 set. 1962). Formação no NIDA; a tríade Red Curtain junta palco e ecrã. No lab, a pessoa fica em Pessoas; a obra-âncora é o filme 1996.',
        curiosities:
          'O + do cartaz é recorte de Luhrmann, não étimo da peça. Catherine Martin entra como ofício de design, não como dossiê conjugal.',
        historyEn:
          'Mark Anthony “Baz” Luhrmann was born in Sydney (17 Sep 1962). NIDA training; the Red Curtain triad joins stage and screen. In the lab the person is in People; the anchor work is the 1996 film.',
        curiositiesEn:
          'The plus on the poster is Luhrmann’s cut, not the play’s etymon. Catherine Martin enters as design craft, not a marital file.',
        historyEs:
          'Mark Anthony «Baz» Luhrmann nació en Sídney (17 sep. 1962). Formación en el NIDA; la tríada Red Curtain junta escenario y pantalla. En el lab, la persona está en Personas; la obra ancla es el filme de 1996.',
        curiositiesEs:
          'El + del cartel es recorte de Luhrmann, no étimo de la pieza. Catherine Martin entra como oficio de diseño.'
      },
      'romeu-mais-julieta-1996'
    );
    upsertGuia(
      guia,
      {
        id: 'leonardo-dicaprio',
        word: 'DiCaprio',
        simple:
          'Pessoa — Leonardo DiCaprio (n. 1974), ofício de presença no ecrã; âncora Romeu + Julieta (1996); inaugura Filmografias. Pessoa ≠ catálogo ≠ uma obra. Valeu !!!',
        simpleEn:
          'Person — Leonardo DiCaprio (b. 1974), craft of presence on screen; anchor Romeo + Juliet (1996); founds Filmographies. Person ≠ catalog ≠ one work. Valeu !!!',
        simpleEs:
          'Persona — Leonardo DiCaprio (n. 1974), oficio de presencia en pantalla; ancla Romeu + Julieta (1996); inaugura Filmografías. Persona ≠ catálogo ≠ una obra. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: dicaprioHref,
        history:
          'Leonardo Wilhelm DiCaprio nasceu em Los Angeles (11 nov. 1974). Ofício de actor e produtor (Appian Way). No lab, a pessoa fica em Pessoas; os títulos, na filmografia; a obra-âncora é o filme 1996.',
        curiosities:
          'Jack Dawson e Romeu são personagens. O Óscar de 2016 (*The Revenant*) é contexto de carreira, não o centro desta ficha.',
        historyEn:
          'Leonardo Wilhelm DiCaprio was born in Los Angeles (11 Nov 1974). Actor and producer (Appian Way). In the lab the person is in People; titles are in the filmography; the anchor work is the 1996 film.',
        curiositiesEn:
          'Jack Dawson and Romeo are characters. The 2016 Oscar (The Revenant) is career context, not the center of this sheet.',
        historyEs:
          'Leonardo Wilhelm DiCaprio nació en Los Ángeles (11 nov. 1974). Actor y productor (Appian Way). En el lab, la persona está en Personas; los títulos, en la filmografía; la obra ancla es el filme de 1996.',
        curiositiesEs:
          'Jack Dawson y Romeu son personajes. El Óscar de 2016 es contexto de carrera, no el centro de esta ficha.'
      },
      'baz-luhrmann'
    );
    upsertGuia(
      guia,
      {
        id: 'filmografia-leonardo-dicaprio',
        word: 'filmografia',
        simple:
          'Tipo novo — catálogo de ofício de ecrã. A série Filmografias inaugura-se com Leonardo DiCaprio. Lista ≠ trinta inspeções de filme. Valeu !!!',
        simpleEn:
          'New type — a screen-craft catalog. The Filmographies series opens with Leonardo DiCaprio. A list ≠ thirty film inspections. Valeu !!!',
        simpleEs:
          'Tipo nuevo — catálogo de oficio de pantalla. La serie Filmografías se inaugura con Leonardo DiCaprio. Lista ≠ treinta inspecciones de filme. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: filoHref,
        history:
          'Filmografia (do gr. φίλμ + -grafia, via FR/EN filmography) é a lista verificável de títulos de uma pessoa. No BudGanja vira tipo de inspeção: tabela ano / título / papel / realização / ficha-ou-catálogo.',
        curiosities:
          'A coluna Ficha só liga quando o lab já inspeccionou a obra. Neste catálogo, só Romeu + Julieta (1996) tem ficha Artes.',
        historyEn:
          'Filmography (via FR/EN from film + -graphy) is a person’s verifiable title list. In BudGanja it becomes an inspection type: year / title / role / director / sheet-or-catalog.',
        curiositiesEn:
          'The Sheet column only links when the lab has already inspected the work. In this catalog only Romeo + Juliet (1996) has an Arts sheet.',
        historyEs:
          'Filmografía (vía FR/EN de film + -grafía) es la lista verificable de títulos de una persona. En BudGanja vira tipo de inspección: año / título / papel / realización / ficha-o-catálogo.',
        curiositiesEs:
          'La columna Ficha solo enlaza cuando el lab ya inspeccionó la obra. En este catálogo, solo Romeu + Julieta (1996) tiene ficha de Artes.'
      },
      'leonardo-dicaprio'
    );
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Shakespeare / Romeu / Luhrmann / DiCaprio)');
  }

  upsertGloss(
    GLOSS_FILE,
    '    shakespeare:\\s*\\{[\\s\\S]*?\\},',
    '    shakespeare: { tone: "craft", category: "Ofício", mundane: "William Shakespeare (1564–1616) — poeta, dramaturgo e actor.", gloss: "Ofício da palavra em palco; elo Romeu e Julieta; capa holográfica = arte, não fonte; Valeu !!!", href: "/posts/post-inspecao-figura-william-shakespeare.html", en: "Shakespeare", es: "Shakespeare", fr: "Shakespeare", it: "Shakespeare", de: "Shakespeare", el: "Σαίξπηρ", la: "Shakesperius", yo: "Shakespeare", sw: "Shakespeare", gez: "Shakespeare", nl: "Shakespeare", pl: "Shakespeare", ru: "Шекспир", uk: "Шекспір", zh: "莎士比亚", ja: "シェイクスピア", ko: "셰익스피어", ar: "شكسبير", he: "שייקספיר", hi: "शेक्सपियर", tr: "Shakespeare", sv: "Shakespeare", da: "Shakespeare", no: "Shakespeare", fi: "Shakespeare", cs: "Shakespeare", ro: "Shakespeare", hu: "Shakespeare", ca: "Shakespeare", gl: "Shakespeare", eu: "Shakespeare", gn: "Shakespeare", qu: "Shakespeare", eo: "Ŝekspiro", vi: "Shakespeare", id: "Shakespeare", th: "เชกสเปียร์", hr: "Shakespeare", sk: "Shakespeare", ga: "Shakespeare", cy: "Shakespeare", ha: "Shakespeare", am: "ሼክስፒር", fa: "شکسپیر", bn: "শেকসপিয়র", zu: "uShakespeare" },',
    'skill'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "william shakespeare":\\s*\\{[\\s\\S]*?\\},',
    '    "william shakespeare": { gloss: "Nome completo — ver Shakespeare.", href: "/posts/post-inspecao-figura-william-shakespeare.html", en: "William Shakespeare", es: "William Shakespeare" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "romeu e julieta":\\s*\\{[\\s\\S]*?\\},',
    '    "romeu e julieta": { tone: "caution", category: "Peça", mundane: "Tragédia de Shakespeare — Verona, duas casas.", gloss: "O nome é o nó; a pessoa não é o apelido; What’s in a name?; literatura ≠ protocolo; Valeu !!!", href: "/posts/post-inspecao-arte-romeu-e-julieta.html", en: "Romeo and Juliet", es: "Romeo y Julieta", fr: "Roméo et Juliette", it: "Romeo e Giulietta", de: "Romeo und Julia", el: "Ρωμαίος και Ιουλιέτα", la: "Romeus et Iulietta", yo: "Romeo ati Juliet", sw: "Romeo na Juliet", gez: "Romeo Juliet", nl: "Romeo en Julia", pl: "Romeo i Julia", ru: "Ромео и Джульетта", uk: "Ромео і Джульєтта", zh: "罗密欧与朱丽叶", ja: "ロミオとジュリエット", ko: "로미오와 줄리엣", ar: "روميو وجولييت", he: "רומיאו ויוליה", hi: "रोमियो और जूलियट", tr: "Romeo ve Juliet", sv: "Romeo och Julia", da: "Romeo og Julie", no: "Romeo og Julie", fi: "Romeo ja Julia", cs: "Romeo a Julie", ro: "Romeo și Julieta", hu: "Rómeó és Júlia", ca: "Romeu i Julieta", gl: "Romeu e Xulieta", eu: "Romeo eta Julieta", gn: "Romeo ha Julieta", qu: "Romeo wan Julieta", eo: "Romeo kaj Julieta", vi: "Romeo va Juliet", id: "Romeo dan Juliet", th: "โรมิโอและจูเลียต", hr: "Romeo i Julija", sk: "Romeo a Júlia", ga: "Romeo agus Juliet", cy: "Romeo a Juliet", ha: "Romeo da Juliet", am: "ሮሜዮ እና ጁልየት", fa: "رومئو و ژولیت", bn: "রোমিও ও জুলিয়েট", zu: "uRomeo noJuliet" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "romeo and juliet":\\s*\\{[\\s\\S]*?\\},',
    '    "romeo and juliet": { gloss: "Título EN — ver Romeu e Julieta.", href: "/posts/post-inspecao-arte-romeu-e-julieta.html", en: "Romeo and Juliet", es: "Romeo y Julieta" },',
    '"romeu e julieta"'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "romeu \\+ julieta":\\s*\\{[\\s\\S]*?\\},',
    '    "romeu + julieta": { tone: "craft", category: "Filme", mundane: "Filme 1996 de Baz Luhrmann — DiCaprio e Danes.", gloss: "Mesmos versos, Verona Beach; peça = Romeu e Julieta; pessoa em DiCaprio; Valeu !!!", href: "/posts/post-inspecao-filme-romeu-mais-julieta.html", en: "Romeo + Juliet", es: "Romeo + Julieta" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    luhrmann:\\s*\\{[\\s\\S]*?\\},',
    '    luhrmann: { tone: "craft", category: "Ofício", mundane: "Baz Luhrmann (n. 1962) — cineasta; Red Curtain.", gloss: "Ofício de palco no ecrã; elo Romeu + Julieta (1996); Valeu !!!", href: "/posts/post-inspecao-figura-baz-luhrmann.html", en: "Luhrmann", es: "Luhrmann" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "baz luhrmann":\\s*\\{[\\s\\S]*?\\},',
    '    "baz luhrmann": { gloss: "Nome completo — ver Luhrmann.", href: "/posts/post-inspecao-figura-baz-luhrmann.html", en: "Baz Luhrmann", es: "Baz Luhrmann" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    dicaprio:\\s*\\{[\\s\\S]*?\\},',
    '    dicaprio: { tone: "craft", category: "Ofício", mundane: "Leonardo DiCaprio (n. 1974) — actor; ofício de ecrã.", gloss: "Pessoa ≠ catálogo ≠ uma obra; âncora Romeu + Julieta (1996); inaugura Filmografias; Valeu !!!", href: "/posts/post-inspecao-figura-leonardo-dicaprio.html", en: "DiCaprio", es: "DiCaprio" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "leonardo dicaprio":\\s*\\{[\\s\\S]*?\\},',
    '    "leonardo dicaprio": { gloss: "Nome completo — ver DiCaprio.", href: "/posts/post-inspecao-figura-leonardo-dicaprio.html", en: "Leonardo DiCaprio", es: "Leonardo DiCaprio" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    filmografia:\\s*\\{[\\s\\S]*?\\},',
    '    filmografia: { tone: "craft", category: "Catálogo", mundane: "Lista de títulos de ecrã de uma pessoa.", gloss: "Tipo novo BudGanja; inauguração DiCaprio; lista ≠ trinta inspeções; Valeu !!!", href: "/posts/post-inspecao-filmografia-leonardo-dicaprio.html", en: "filmography", es: "filmografía" },',
    'shakespeare'
  );
  upsertGloss(
    GLOSS_FILE,
    '    filmografias:\\s*\\{[\\s\\S]*?\\},',
    '    filmografias: { gloss: "Série — ver filmografia.", href: "/biblioteca/inspecoes/#inspecoes-filmografias", en: "filmographies", es: "filmografías" },',
    'shakespeare'
  );

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('SQL sync avisou:', e && e.message ? e.message : e);
  }

  console.log('OK Shakespeare + Romeu + Luhrmann + DiCaprio + Filmografias');
}

function wikiRomeu() {
  return 'https://pt.wikipedia.org/wiki/Romeu_e_Julieta';
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
