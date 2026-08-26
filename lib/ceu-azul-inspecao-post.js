'use strict';

/**
 * Artes · canção «Céu Azul» (Charlie Brown Jr. / Chorão + Thiago Castanho).
 * Pedido: Céu Azul musica chorão — distinta do motivo «céu azul» em Vamos Fugir.
 * Sem letra integral. Sem receita de uso.
 */

const fs = require('fs');
const path = require('path');

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    filename: opts.filename || 'posts/post-' + opts.slug + '.html',
    url: opts.url || '/posts/post-' + opts.slug + '.html',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const YT_ID = '0dLX40UMUKo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/3cqeso9qMA6HoISorEoFfk';
const WIKI = 'https://pt.wikipedia.org/wiki/C%C3%A9u_Azul_(can%C3%A7%C3%A3o)';
const WIKI_MPC = 'https://pt.wikipedia.org/wiki/M%C3%BAsica_Popular_Cai%C3%A7ara_(Ao_Vivo)';
const COVER = '/imagens/inspecoes/ceu-azul-cover.jpg';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Céu Azul.
Não pedimos a letra emprestada —
pedimos o ofício de um dia
que não se deixa estragar
sem fingir que a vida é só sombra.

Chorão. Castanho. Santos. Caiçara.
Houve cinco minutos na sombra
e um disco ao vivo que ainda cabia
uma faixa de estúdio.
Houve Liminha na mesa —
o mesmo ofício que, em 1984,
co-escreveu Vamos Fugir.

O céu daquela fuga é o céu.
Este título é outra canção.

Valeu !!!
com a luz do dia no sítio,
sem colar o verso.`;
}

function poemEn() {
  return `Céu Azul.
We do not borrow the lyric —
we ask for the craft of a day
that will not be spoiled
without pretending life is only shade.

Chorão. Castanho. Santos.
There were five minutes in the shade
and a live album that still had room
for one studio track.
Liminha at the desk —
the same craft that, in 1984,
co-wrote Vamos Fugir.

That song’s blue sky is the sky.
This title is another song.

Valeu !!!`;
}

function poemEs() {
  return `Céu Azul.
No pedimos prestada la letra —
pedimos el oficio de un día
que no se deja estropear.

Chorão. Castanho. Santos.
Hubo cinco minutos a la sombra
y un disco en vivo con una pista de estudio.
Liminha en la mesa —
el mismo oficio que en 1984
coescribió Vamos Fugir.

El cielo de aquella fuga es el cielo.
Este título es otra canción.

¡Valeu !!!`;
}

function buildCeuAzulBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-ceu-azul.html';
  const fugir = '/posts/post-inspecao-arte-vamos-fugir.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const magnata = '/posts/post-inspecao-filme-o-magnata.html';
  const pelados = '/posts/post-inspecao-arte-pelados-em-santos.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da canção **[Céu Azul](${self})** — **Charlie Brown Jr.**, composição de **[Chorão](${chorao})** (Alexandre Magno Abrão) e **Thiago Castanho**. Single **dez. 2011** (Radar); única faixa de **estúdio** no ao vivo *[Música Popular Caiçara](${WIKI_MPC})* (**2012**), produzido por **Liminha**. Pedido de campo: *Céu Azul musica chorão*, depois do Spotify de [Vamos Fugir](${fugir}). O laboratório **corta**: o **céu azul** no mapa de Gil é o **céu**; **Céu Azul** aqui é **título de obra**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Céu Azul (canção)](${WIKI}), [MPC ao vivo](${WIKI_MPC}). Crédito: Chorão / Thiago Castanho — Radar / Sony. **Sem afiliação.** **Ficha ≠ letra integral, ≠ biografia (fica em [Chorão](${chorao})), ≠ trilha de novela como objecto.** Entrevista (Caldeirão / GShow, dez. 2012): a faixa «ficou pronta em cinco minutos» num dia lindo, na sombra — **contexto de génese**, não verso colado. Relação com Graziela («Grazon») é **mapa biográfico** na ficha Pessoas, não enredo a protocolar aqui.

@youtube ${YT_ID}

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Céu Azul** |
| Artista | **Charlie Brown Jr.** — voz **Chorão** |
| Autoria | **Chorão** · **Thiago Castanho** |
| Single | **Dez. 2011** (Radar Records) |
| Álbum | *Música Popular Caiçara – Ao Vivo* (**maio 2012**) — faixa **estúdio** (bónus / clipe no DVD) |
| Produção do disco | **Liminha** — o mesmo co-autor de [Vamos Fugir](${fugir}) (1984) |
| Clipe | Oficial Radar (\`${YT_ID}\`) — edição citada: Jerri Rossato Lima (webclipe mar. 2011 nas fontes) |
| Áudio | [Spotify](${SPOTIFY}) (\`3cqeso9qMA6HoISorEoFfk\`) |
| Tipo BudGanja | Arte — **canção 2011 primeiro**; pessoa em [Chorão](${chorao}) |
| Não é | Motivo «céu azul» em [Vamos Fugir](${fugir}) · [Só os Loucos Sabem](${loucos}) (outra faixa) |
| Elo | [sol](${sol}) · [luz](${luz}) · [preguiça](${preguica}) · [alegria](${alegria}) · [vida](${vidaPalavra}) · [Santos / Pelados](${pelados}) |
| Fonte | [canção](${WIKI}) · [clipe](${YT}) · [Spotify](${SPOTIFY}) |
| Data | ${inspected} |

**Objecto:** a **faixa** que o Brasil passou a chamar pelo céu. Inspecionar Céu Azul = não deixar a novela, o luto de 2013 nem o céu de Gil comerem o **ofício de 2011**.

## 2. Génese

| Marco | O que importa |
|-------|----------------|
| **Mar. 2011** | Webclipe — a faixa já anunciava o próximo disco |
| **Dez. 2011** | Single |
| **2012** | MPC ao vivo (Santos / Curitiba) — Marcão e Champignon de volta; **Liminha** na produção |
| **Entrevista 2012** | Cinco minutos; dia lindo; sombra / [preguiça](${preguica}) como **clima**, não como pecado da ficha [preguiça](${preguica}) |
| **Rádio** | Fontes: entre os singles CBJR mais tocados 2012–2018; trilhas (Balacobaco, Império…) = **ecos** |

**H1:** o valor começa no **single / estúdio 2011**, não na reprise da novela.  
**H2:** [Chorão](${chorao}) é **autor e voz**; esta ficha não substitui Pessoas nem [*O Magnata*](${magnata}).  
**H3:** [Só os Loucos Sabem](${loucos}) é **irmã de catálogo**, não a mesma obra.

## 3. Corte com Vamos Fugir

| Forma | Sala |
|-------|------|
| **céu azul** (Gil / Skank) | Céu no destino — [Vamos Fugir](${fugir}) |
| **Céu Azul** (CBJR) | Título desta canção |
| **Liminha** | Co-escreveu a fuga de 1984; produziu o Caiçara de 2012 |

A orelha cola as duas. O catálogo **não**.

## 4. Tese (sem verso)

Wiki e entrevista apontam: **palavra amiga / notícia boa** como ofício do dia; [alegria](${alegria}) como recorte, não como recusa do resto da [vida](${vidaPalavra}). O laboratório **não** cola o refrão. Cruza [faça o melhor](${faca}) *neste* dia, não num céu abstracto.

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=ceu-azul)

## Status

**Aprovado** — **Céu Azul** (Chorão / Castanho, 2011) fichada como **obra**; distinta do céu de [Vamos Fugir](${fugir}). [Valeu !!!](${mantra})

[▶ Clipe](${YT}) · [▶ Spotify](${SPOTIFY}) · [▶ Chorão](${chorao}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ Vamos Fugir](${fugir}) · [▶ Artes](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Céu Azul** — **Charlie Brown Jr.**, **Chorão** and **Thiago Castanho**, Dec. **2011** single; studio track on the **2012** live album *Música Popular Caiçara* (produced by **Liminha**). Official clip: \`${YT_ID}\`.

This **title** is not the **blue sky** motif in [Vamos Fugir](${fugir}) (Gil / Skank). Liminha is the craft bridge. No full lyric. Biography stays on [Chorão](${chorao}).

@youtube ${YT_ID}

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Céu Azul** — **Charlie Brown Jr.**, **Chorão** y **Thiago Castanho**, single **dic. 2011**; pista de estudio en *Música Popular Caiçara* (**2012**, **Liminha**). Clipe: \`${YT_ID}\`.

Este **título** no es el **cielo azul** de [Vamos Fugir](${fugir}). Sin letra íntegra. Biografía en [Chorão](${chorao}).

@youtube ${YT_ID}

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCeuAzulPost() {
  const { body, contentEn, contentEs } = buildCeuAzulBodies();
  return artePost({
    title: 'Inspeção: Céu Azul — Chorão, o dia, e o céu que não é o de Vamos Fugir',
    titleEn: 'Inspection: Céu Azul — Chorão, the day, and the sky that is not Vamos Fugir',
    titleEs: 'Inspección: Céu Azul — Chorão, el día, y el cielo que no es Vamos Fugir',
    excerpt:
      'Artes: Céu Azul (CBJR / Chorão + Castanho, 2011) ≠ o céu de Vamos Fugir; Liminha na ponte; sem letra; Valeu !!!',
    excerptEn:
      'Arts: Céu Azul (CBJR / Chorão + Castanho, 2011) ≠ the sky in Vamos Fugir; Liminha as bridge; no lyric; Valeu !!!',
    excerptEs:
      'Artes: Céu Azul (CBJR / Chorão + Castanho, 2011) ≠ el cielo de Vamos Fugir; Liminha de puente; sin letra; ¡Valeu !!!',
    slug: 'inspecao-arte-ceu-azul',
    date: '2026-08-23T18:16:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-ceu-azul', 87),
    seriesLabel: 'Céu Azul · Artes',
    coverImage: COVER,
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCeuAzulPost,
  buildCeuAzulBodies,
  poemPt,
  poemEn,
  poemEs,
  YT_ID,
  YT,
  SPOTIFY,
  WIKI,
  COVER
};
