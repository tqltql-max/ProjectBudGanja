'use strict';

/**
 * Palavras · trovão
 * Lat. turbo (turbilhão) → PT trovão. ≠ EN thunder (étimo germânico).
 * Irmã: Thunderstruck (AC/DC).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/trovao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/trov%C3%A3o';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 340) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildTrovaoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-trovao.html';
  const song = '/posts/post-inspecao-arte-thunderstruck.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const caminhao = '/posts/post-inspecao-palavra-caminhao.html';
  const fast = '/posts/post-inspecao-palavra-fast-food.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[trovão](${self})** — o **estrondo** que segue o raio. Pedido: *palanba Trovão*. Cruzamento pedido: **Thunder** / [Thunderstruck](${song}) (AC/DC). O céu é o mesmo; os **étimos não**.

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · trovão](${WIKT}) (lat. *turbo* / *turben* «turbilhão», metátese; datação séc. XIII). **Ficha ≠ aula de meteorologia, ≠ cifra da canção.** Sem afiliação à banda.

## Objecto

| Campo | Valor |
|-------|-------|
| Palavra | **trovão** (lapso: *palanba* → palavra) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *turbo, -inis* «turbilhão» → PT *trovão* — confiança **alta** (Wikcionário) |
| EN *thunder* | Germânico (*þunraz*) — **mesmo fenómeno, outra família** |
| Canção | [Thunderstruck](${song}) — título EN; não traduz o étimo |
| Elos | [fogo](${fogo}) (raio) · [água](${agua}) (chuva) · [caminhão](${caminhao}) (volume na estrada) |
| Data | ${inspected} |

**H1:** *trovão* nomeia o **som**; o raio é a luz.  
**H2:** *thunder* ≠ *trovão* na genealogia — a orelha cola, o étimo corta.  
**H3:** [Thunderstruck](${song}) é arte; esta ficha é o vocábulo.  
**H4:** [fast food](${fast}) pede **instante**; o trovão também é instante — metáfora, não cardápio.

## Veredicto

**Aprovado** — **trovão** fichado. O inglês da canção vive em [Thunderstruck](${song}). Fecho: [Valeu !!!](${mantra}) **depois do estrondo**, sem copiar o riff.

[▶ Palavras](${hub}) · [▶ Thunderstruck](${song}) · [▶ Fogo](${fogo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **trovão** (thunderclap) from Lat. *turbo* “whirlwind”. English **thunder** is Germanic — same sky, other family. Sister song: [Thunderstruck](${song}).

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Trovão** (trueno) del lat. *turbo*. El inglés *thunder* es germánico. Canción hermana: [Thunderstruck](${song}).

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildTrovaoPost() {
  const { body, contentEn, contentEs, wiki } = buildTrovaoBodies();
  return makePalavra({
    title: 'Inspeção: Trovão — o estrondo, não o riff',
    titleEn: 'Inspection: Trovão — the clap, not the riff',
    titleEs: 'Inspección: Trovão — el estruendo, no el riff',
    excerpt:
      'Palavras: trovão (lat. turbo); thunder é outro étimo; irmã Thunderstruck; Valeu !!!',
    excerptEn:
      'Words: trovão (Lat. turbo); thunder is another etymon; sister Thunderstruck; Valeu !!!',
    excerptEs:
      'Palabras: trovão (lat. turbo); thunder es otro étimo; hermana Thunderstruck; ¡Valeu !!!',
    slug: 'inspecao-palavra-trovao',
    date: '2026-08-23T16:01:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-trovao', 265),
    seriesLabel: 'Trovão · estrondo',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildTrovaoPost, buildTrovaoBodies };
