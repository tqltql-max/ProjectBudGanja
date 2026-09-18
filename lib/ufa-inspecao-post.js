'use strict';

/**
 * Inspeção Palavras · ufa
 * Eixos: interjeição de alívio · par de aff (exasperação) ·
 * sopro depois de desatar o nó
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ufa-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/ufa';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildUfaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-ufa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da interjeição **[ufa](${self})** — o **sopro de alívio** (e, às vezes, de cansaço) no português do Brasil. Pedido de campo no cluster do [nó](${no}): depois de **[desatar o nó](${desatarNo})**, o peito solta **ufa**. Par contrastivo: **[aff](${aff})** (exasperação). Sorriso possível a seguir: **[legal](${legal})** (gíria) · **[valeu](${valeu})**.

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · ufa](${WIKT}), oralidade BR. **Ficha ≠ terapia.** Catalogar o sopro ≠ ridicularizar quem alivia. Sem afiliação a humor de internet.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **ufa** (var. *uffa*, *ufaaa*) |
| Classe | Interjeição |
| Étimo | Onomatopeia / sopro — confiança: **alta no uso**; baixa em étimo erudito |
| Tipo BudGanja | Palavra — alívio depois do aperto |
| Não é | [aff](${aff}) (enfado como fecho) · [desastre](${desastre}) (o golpe) |
| Elo cluster | [desatar](${desatar}) · [desatar o nó](${desatarNo}) · [nó na vida!](${noVida}) |
| Data | ${inspected} |

**O que é o objecto:** o ar que sai quando o laço cede. No lab: termómetro de **alívio** — irmão do [aff](${aff}) no sopro, **antónimo** no ofício.

## 2. Ufa × aff

| Forma | Ofício | Risco |
|-------|--------|-------|
| **ufa** | Alívio — o [nó](${no}) cedeu, o [desastre](${desastre}) não comeu o resto | Parar no sopro e não [Faça o melhor!](${mantra}) |
| **[aff](${aff})** | Exasperação — o peito fecha sem relatório | Veredicto sem [verdade](${verdade}) |

**H1:** ufa marca **depois**. Aff marca **basta**.  
**H2:** ufa bom = o [gesto](${gesto}) de [desatar](${desatar}) aconteceu; o peito confirma.  
**H3:** ufa mau = festejar o sopro e deixar a [corda](${corda}) outra vez em laço.

## 3. Sequência do cluster

[Nó na vida!](${noVida}) → [desatar o nó](${desatarNo}) → **ufa** → [legal](${legal}) (gíria, se couber) → [Faça o melhor!](${mantra}).

Não inverter: ufa **antes** de desatar é pose. Ufa **no lugar** de desatar é [aff](${aff}) disfarçado.

## 4. Faça o melhor!

O sopro é permitido. O ofício continua na [vida](${vida}). [Faça o melhor!](${mantra}) **depois** do ufa — não em vez do ufa.

## Status

**Aprovado** — **ufa** fichada: alívio oral BR; par de [aff](${aff}); fecho do cluster [desatar o nó](${desatarNo}).

[▶ Palavras](${hub}) · [▶ Aff](${aff}) · [▶ Desatar o nó](${desatarNo}) · [▶ Legal](${legal}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Brazilian interjection **ufa** (phew) — relief after [desatar o nó](${desatarNo}). Contrast: [aff](${aff}) (exasperation). Optional smile: [legal](${legal}) (slang “cool”). Close: [Do your best!](${mantra}).

## Status

**Approved** — phew after untying; not a substitute for the gesture.

[▶ Words](${hub}) · [▶ Aff](${aff}) · [▶ Untie the knot](${desatarNo}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Interjección BR **ufa** (uf) — alivio después de [desatar o nó](${desatarNo}). Contraste: [aff](${aff}). Sonrisa posible: [legal](${legal}) (jerga). Cierre: [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — uf después de desatar; no sustituye el gesto.

[▶ Palabras](${hub}) · [▶ Aff](${aff}) · [▶ Desatar o nó](${desatarNo}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildUfaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildUfaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-ufa', 178);
  return makePalavra({
    title: 'Inspeção: Ufa — o sopro depois de desatar o nó',
    titleEn: 'Inspection: Ufa — the puff after untying the knot',
    titleEs: 'Inspección: Ufa — el soplo después de desatar el nudo',
    excerpt:
      'Palavras: «ufa» — interjeição BR de alívio; par de aff; fecho de desatar o nó; legal (gíria) se couber; Faça o melhor!',
    excerptEn:
      'Words: “ufa” — BR phew of relief; pair of aff; close of untying the knot; slang legal if it fits; Do your best!',
    excerptEs:
      'Palabras: «ufa» — interjección BR de alivio; par de aff; cierre de desatar o nó; jerga legal si cabe; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-ufa',
    date: '2026-08-22T03:18:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Ufa · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildUfaPost, buildUfaBodies };
