'use strict';

/**
 * Artes · canção «Thunderstruck» (AC/DC, 1990).
 * Pedidos: palanba Trovão · banda AC/DC · Thunder · Thunder struck.
 * Irmãs: palavra trovão · fast food · caminhão.
 */

const fs = require('fs');
const path = require('path');
const { artePost } = require('./artes-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/thunderstruck-cover.jpg';
const YT_ID = 'v2AC41dglnM';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Thunderstruck_(song)';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/Thunderstruck';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/AC/DC';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/The_Razors_Edge_(album)';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Thunderstruck.
Não pedimos a letra emprestada —
pedimos o ofício do trovão:
o céu que parte
e o riff que chega depois.

AC/DC.
Corrente que vai e volta.
Potência, disse Angus —
não sermão, não cifra.

O caminhão passa na estrada
e o fast food promete o instante.
O laboratório mede o estrondo
sem tragá-lo inteiro.

Valeu !!!
com o trovão no nome,
sem fingir que o raio é receita.`;
}

function poemEn() {
  return `Thunderstruck.
We do not borrow the lyric —
we ask for the craft of thunder:
the sky that splits
and the riff that arrives after.

AC/DC.
Current that goes and returns.
Power, said Angus —
not a sermon, not a tab.

The truck goes down the road
and fast food promises the instant.
The lab measures the bang
without swallowing it whole.

Valeu !!!
with thunder in the name,
without pretending the bolt is a recipe.`;
}

function poemEs() {
  return `Thunderstruck.
No pedimos la letra prestada —
pedimos el oficio del trueno:
el cielo que parte
y el riff que llega después.

AC/DC.
Corriente que va y vuelve.
Potencia, dijo Angus —
no sermón, no cifra.

El camión pasa en la carretera
y el fast food promete el instante.
El laboratorio mide el estruendo
sin tragarlo entero.

¡Valeu !!!
con el trueno en el nombre,
sin fingir que el rayo es receta.`;
}

function buildThunderstruckBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-thunderstruck.html';
  const trovao = '/posts/post-inspecao-palavra-trovao.html';
  const fast = '/posts/post-inspecao-palavra-fast-food.html';
  const caminhao = '/posts/post-inspecao-palavra-caminhao.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const megamente = '/posts/post-inspecao-desenho-megamente.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da canção **«[Thunderstruck](${self})»** — single da banda australiana **AC/DC**, **10 set. 1990**, álbum *The Razors Edge*. Pedidos de campo: *palanba Trovão* · *banda AC DC* · *Thunder* · *Thunder struck*. O **início de tudo** é a **obra**: o riff de Angus, o título em inglês, a potência que a banda nomeou. A palavra [trovão](${trovao}) é **irmã lexical** (o mesmo céu; **outro étimo**). [Fast food](${fast}) e [caminhão](${caminhao}) entram como **salas pedidas** — velocidade e estrada — não como patrocínio da canção.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Thunderstruck](${WIKI}), [PT](${WIKI_PT}), [AC/DC](${WIKI_BAND}), [*The Razors Edge*](${WIKI_ALBUM}), clipe [oficial](${YT}). Crédito: Angus Young / Malcolm Young / AC/DC / Albert / Atco — **sem afiliação**. **Ficha ≠ letra, ≠ cifra, ≠ tablatura.** Catalogar ≠ endosso de volume no ouvido. [VEVO](${vevo}) é transporte do clipe.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Thunderstruck** |
| Banda | **AC/DC** (Austrália, 1973 — irmãos Young) |
| Single / álbum | **10 set. 1990** · *The Razors Edge* |
| Autoria | Angus Young · Malcolm Young |
| Voz | Brian Johnson · bateria Chris Slade (este disco) |
| Génese do título | Brinquedo de infância **ThunderStreak** + «AC/DC = power» (Angus, notes 2003) |
| Elo PT | [trovão](${trovao}) — o céu; *thunder* é germânico, *trovão* vem de lat. *turbo* |
| Elo pedido | [caminhão](${caminhao}) · [fast food](${fast}) |
| Elo lab | [fogo](${fogo}) · [caminho](${caminho}) · [Megamente](${megamente}) (*Back in Black*, outra faixa) |
| Clipe | [YouTube oficial](${YT}) |
| Data | ${inspected} |

**Objecto:** o **single** que pôs *thunder* no riff. A banda é crédito; a âncora é a **canção**.

## 2. AC/DC — a banda nesta ficha

**AC/DC** = *alternating current / direct current* — corrente que **alterna** e corrente **contínua**. Angus: a ideia básica é **potência**, não teologia. *Highway to Hell* e *Back in Black* são **outras faixas** ([Megamente](${megamente}) já cita *Back in Black*). Esta ficha **não** é discografia completa nem biografia de Bon Scott.

**H1:** canção primeiro; banda como ofício que a toca.  
**H2:** *Thunder struck* (duas palavras) = a mesma obra; o hífen/junta é o título.  
**H3:** [trovão](${trovao}) traduz o céu, **não** o étimo de *thunder*.  
**H4:** [caminhão](${caminhao}) e [fast food](${fast}) = pedidos de campo (estrada / instante); **sem** contrato de patrocínio inspecionado aqui.

## 3. Relação com o projecto

| Sala | Relação |
|------|---------|
| [Trovão](${trovao}) | Palavra do estrondo; irmã, não a canção |
| [Caminhão](${caminhao}) | Volume na estrada — metáfora, não étimo |
| [Fast food](${fast}) | Instante da refeição — outro relógio; ultraprocessado no lab |
| [Killing in the Name](${killing}) | Outra canção-âncora de potência; teses distintas |
| Ouvido | Medir o [fogo](${fogo}) do volume; ficha ≠ receita de surdez |

## 4. Limites

- Sem copiar letra nem transcrever o riff.  
- Sem sermão «rock = diabo».  
- Sem transformar AC/DC em ídolo vazio.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Artes — **Thunderstruck** = o trovão **em inglês** que o lab cruza com [trovão](${trovao}), sem tragá-lo no [fast food](${fast}) nem no [caminhão](${caminhao}). Fecho: [Valeu !!!](${mantra}) **com a potência nomeada**, sem cifra.

[▶ Artes](${hub}) · [▶ Trovão](${trovao}) · [▶ Caminhão](${caminhao}) · [▶ Fast food](${fast}) · [▶ Clipe](${YT}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **«[Thunderstruck](${self})»** — AC/DC, 10 Sep **1990**, *The Razors Edge*. Field: *Trovão*, *AC/DC*, *Thunder*, *Thunder struck*. Sister words: [trovão](${trovao}), [caminhão](${caminhao}), [fast food](${fast}).

> Independent audit. [Wikipedia](${WIKI}). **Not** lyrics or guitar tab. Official clip: [YouTube](${YT}).

## Object

| Field | Value |
|-------|-------|
| Song | **Thunderstruck** |
| Band | **AC/DC** — title idea: ThunderStreak toy + power |
| PT sister | [trovão](${trovao}) — same sky, other etymon |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** [Valeu !!!](${mantra})

[▶ Arts](${hub}) · [▶ Clip](${YT})
`;

  const contentEs = `## Alcance

Inspección de **«[Thunderstruck](${self})»** — AC/DC, **1990**, *The Razors Edge*. Pedido: *Trovão*, *AC/DC*, *Thunder*. Hermanas: [trovão](${trovao}), [caminhão](${caminhao}), [fast food](${fast}).

> Auditoría independiente. [Wikipedia](${WIKI}). **No** letra ni cifra. Clip: [YouTube](${YT}).

## Objeto

| Campo | Valor |
|-------|-------|
| Canción | **Thunderstruck** |
| Banda | **AC/DC** |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** [¡Valeu !!!](${mantra})

[▶ Artes](${hub}) · [▶ Clip](${YT})
`;

  return { body, contentEn, contentEs, wiki: WIKI, videoId: YT_ID };
}

function buildThunderstruckPost() {
  const { body, contentEn, contentEs, wiki, videoId } = buildThunderstruckBodies();
  return artePost({
    title: 'Inspeção: Thunderstruck — AC/DC, o trovão em inglês',
    titleEn: 'Inspection: Thunderstruck — AC/DC, thunder in English',
    titleEs: 'Inspección: Thunderstruck — AC/DC, el trueno en inglés',
    excerpt:
      'Artes: Thunderstruck (AC/DC, 1990); trovão é irmã; ≠ cifra ≠ fast-food-patrocínio; Valeu !!!',
    excerptEn:
      'Arts: Thunderstruck (AC/DC, 1990); trovão is the sister word; ≠ tab ≠ fast-food ad; Valeu !!!',
    excerptEs:
      'Artes: Thunderstruck (AC/DC, 1990); trovão es hermana; ≠ cifra ≠ anuncio; ¡Valeu !!!',
    slug: 'inspecao-arte-thunderstruck',
    date: '2026-08-23T16:00:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-thunderstruck', 1),
    seriesLabel: 'Thunderstruck · AC/DC',
    coverImage: COVER,
    sourceUrl: wiki,
    videoId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildThunderstruckPost, buildThunderstruckBodies, YT, YT_ID };
