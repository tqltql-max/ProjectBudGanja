'use strict';

/**
 * Palavras · Guaporé (rio × município RS).
 * Pedido: Guapore — no mapa de Vamos Fugir a canção não escolhe qual.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/guapore-palavra-cover.jpg';
const WIKI_RIO = 'https://pt.wikipedia.org/wiki/Rio_Guapor%C3%A9';
const WIKI_CID = 'https://pt.wikipedia.org/wiki/Guapor%C3%A9_(Rio_Grande_do_Sul)';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Guaporé.
Um n, um acento.
Pode ser rio na fronteira
ou cidade no Sul.

A canção não escolhe o qual.
Escolhe o sol em outro sítio.

Valeu !!!
com o nome no mapa,
sem fingir que o GPS fechou o verso.`;
}

function buildGuaporeBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-guapore.html';
  const fugir = '/posts/post-inspecao-arte-vamos-fugir.html';
  const marajo = '/posts/post-inspecao-palavra-marajo.html';
  const ceuAzul = '/posts/post-inspecao-arte-ceu-azul.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Guaporé](${self})** — topónimo brasileiro que **não cabe numa só sala**. Pedido de campo: *Guapore* (sem acento). Na canção [Vamos Fugir](${fugir}) o nome entra com [Marajó](${marajo}) e Irajá: **qualquer outro lugar ao [sol](${sol})**. A letra **não** diz se é o **rio** ou o **município**.

> **Nota metodológica:** auditoria independente. Fontes: [Rio Guaporé](${WIKI_RIO}), [Guaporé (RS)](${WIKI_CID}). **Ficha ≠ fronteira diplomática, ≠ guia de pesca, ≠ história municipal completa.** Sem afiliação. Étimo indígena do rio: **média** (várias hipóteses nas fontes; o lab não fecha uma).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Guaporé** |
| Rasto | *Guapore* · *Guapore* na boca |
| Sala A | **Rio Guaporé** (Itenez, no lado boliviano) — fronteira Brasil / Bolívia; sistema Mamoré–Madeira |
| Sala B | **Município de Guaporé** — Rio Grande do Sul |
| Sala C (rasto) | Vale do Guaporé / região em Rondônia — o **nome** do rio no chão |
| Tipo BudGanja | Palavra — topónimo × ambiguidade honesta × mapa da canção |
| O que **não** é | [Marajó](${marajo}) · Irajá · título [Céu Azul](${ceuAzul}) |
| Elo | [Vamos Fugir](${fugir}) · [água](${agua}) · [sol](${sol}) · [caminho](${caminho}) |
| Fonte | [Rio](${WIKI_RIO}) · [RS](${WIKI_CID}) |
| Data | ${inspected} |

**Objecto:** o **vocábulo** que a orelha cola num único sítio. Inspecionar Guaporé = **mostrar as duas (ou três) salas** e deixar a canção no convite, não no IBGE.

## 2. Rio × cidade × canção

| Forma | Ofício | Confiança |
|-------|--------|-----------|
| **Rio Guaporé** | Curso de [água](${agua}); fronteira; afluente do Mamoré | Alta (geografia) |
| **Guaporé (RS)** | Município no Sul | Alta (IBGE / wiki) |
| **Na [canção](${fugir})** | Nome no mapa do «outro lugar ao sol / ao sul» | Alta (presença do topónimo); **baixa** na escolha rio vs cidade |
| **Guapore** | Grafia sem acento | Alta (teclado) |

**H1:** *Guapore* = **Guaporé**.  
**H2:** o lab **não** decide por Gil qual Guaporé é «o certo» — a canção usa o **som do nome**.  
**H3:** «ao sul» na mesma lista **pode** puxar o ouvido para o RS; o rio também é oeste/norte amazónico — **não fechar**.

## 3. No trio Irajá · Marajó · Guaporé

Três escalas: bairro (Rio) · ilha (Pará) · rio-ou-sul. O ofício de [Vamos Fugir](${fugir}) é o **convite**; estas fichas são o **chão**.

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **Guaporé** = rio **e** município; a canção não escolhe; *Guapore* = rasto. [Valeu !!!](${mantra})

[▶ Palavras](${hub}) · [▶ Vamos Fugir](${fugir}) · [▶ Marajó](${marajo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Guaporé** is both a **border river** (Brazil/Bolivia) and a **town in Rio Grande do Sul**. Field spelling *Guapore*. [Vamos Fugir](${fugir}) uses the **name**; it does **not** pick which room.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Guaporé** es **río** de frontera y **municipio** de RS. Grafía *Guapore*. [Vamos Fugir](${fugir}) usa el **nombre**; no elige la sala.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI_RIO };
}

function buildGuaporePost() {
  const { body, contentEn, contentEs, wiki } = buildGuaporeBodies();
  return makePalavra({
    title: 'Inspeção: Guaporé — rio na fronteira e cidade no Sul',
    titleEn: 'Inspection: Guaporé — border river and a town in the South',
    titleEs: 'Inspección: Guaporé — río de frontera y ciudad en el Sur',
    excerpt:
      'Palavras: Guaporé = rio (BR/BO) × município RS; Guapore = rasto; a canção Vamos Fugir não escolhe; Valeu !!!',
    excerptEn:
      'Words: Guaporé = river (BR/BO) × RS town; Guapore = slip; Vamos Fugir does not pick; Valeu !!!',
    excerptEs:
      'Palabras: Guaporé = río × municipio RS; Guapore = lapsus; Vamos Fugir no elige; ¡Valeu !!!',
    slug: 'inspecao-palavra-guapore',
    date: '2026-08-23T18:14:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-guapore', 277),
    seriesLabel: 'Guaporé · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildGuaporePost, buildGuaporeBodies };
