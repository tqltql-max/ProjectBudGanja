'use strict';

/**
 * Palavras · caminhão
 * Veículo de carga; esp. camión. Pedido: inspeção em caminhão.
 * Elos: Thunderstruck (volume na estrada), fast food (food truck).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/caminhao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/caminh%C3%A3o';

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

function buildCaminhaoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-caminhao.html';
  const song = '/posts/post-inspecao-arte-thunderstruck.html';
  const trovao = '/posts/post-inspecao-palavra-trovao.html';
  const fast = '/posts/post-inspecao-palavra-fast-food.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const circular = '/posts/post-inspecao-palavra-circular.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[caminhão](${self})** — veículo de **carga** (e, por extensão, o food truck). Pedido: *inspeção em caminhão*. Cruzamento de campo: o [trovão](${trovao}) na estrada — o motor que **estronda** — e [Thunderstruck](${song}) no rádio da cabina. Isso é **metáfora de volume**, não étimo nem aula de condução.

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · caminhão](${WIKT}) (via esp. *camión*). **Ficha ≠ CNH, ≠ manual de carga, ≠ tuning.** Sem afiliação a marcas. [Risco](${risco}) na via é nomeado, não ensinado como truque.

## Objecto

| Campo | Valor |
|-------|-------|
| Palavra | **caminhão** (PT-PT *camião*) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Esp. *camión* (e fr. *camion*) → PT *caminhão* — confiança **alta** |
| Tipo | Palavra — [objeto](${objetos}) de carga × [caminho](${caminho}) |
| Elo céu | [trovão](${trovao}) — orelha: o barulho; **não** o étimo |
| Elo arte | [Thunderstruck](${song}) — faixa que a estrada empresta |
| Elo refeição | [fast food](${fast}) — cozinha sobre rodas / entrega |
| Data | ${inspected} |

**H1:** *caminhão* é o **veículo que leva**.  
**H2:** o [caminho](${caminho}) é a via; o caminhão é quem a **pesa**.  
**H3:** [circular](${circular}) é o verbo da rota; aqui o nome da máquina.  
**H4:** food truck = [fast food](${fast}) **em cima** deste objeto — duas fichas, um cruzamento.

## Veredicto

**Aprovado** — **caminhão** = carga sobre o [caminho](${caminho}). O trovão da canção não é o motor; só a orelha cola. Fecho: [Valeu !!!](${mantra}) **na faixa da direita**, sem tutorial.

[▶ Palavras](${hub}) · [▶ Caminho](${caminho}) · [▶ Thunderstruck](${song}) · [▶ Fast food](${fast}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **caminhão** (truck) from Sp. *camión*. Road weight; metaphor of volume with [trovão](${trovao}) / [Thunderstruck](${song}); food-truck crossing with [fast food](${fast}). **Not** a driving lesson.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Caminhão** (camión) del esp. *camión*. Peso en la vía; metáfora de volumen con [trovão](${trovao}) / [Thunderstruck](${song}); cruce con [fast food](${fast}). **No** es clase de conducir.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCaminhaoPost() {
  const { body, contentEn, contentEs, wiki } = buildCaminhaoBodies();
  return makePalavra({
    title: 'Inspeção: Caminhão — a carga na via',
    titleEn: 'Inspection: Caminhão — the load on the road',
    titleEs: 'Inspección: Caminhão — la carga en la vía',
    excerpt:
      'Palavras: caminhão (esp. camión); volume na estrada ≠ étimo de trovão; food truck × fast food; Valeu !!!',
    excerptEn:
      'Words: caminhão (Sp. camión); road volume ≠ etymon of thunder; food truck × fast food; Valeu !!!',
    excerptEs:
      'Palabras: caminhão (esp. camión); volumen en la vía ≠ étimo del trueno; food truck; ¡Valeu !!!',
    slug: 'inspecao-palavra-caminhao',
    date: '2026-08-23T16:03:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-caminhao', 267),
    seriesLabel: 'Caminhão · carga',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCaminhaoPost, buildCaminhaoBodies };
