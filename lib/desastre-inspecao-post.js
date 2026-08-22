'use strict';

/**
 * Inspeção Palavras · desastre
 * Eixos: dis- + astrum (má estrela) · ≠ desatar ·
 * relação de ofício com desatar o nó
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/desastre-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/desastre';
const WIKI = 'https://pt.wikipedia.org/wiki/Desastre';

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

function buildDesastreBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-desastre.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[desastre](${self})** — a **má estrela** (*dis-* + *astrum*), o acontecimento que desordena. Pedido de campo: *relacionar com [desatar o nó](${desatarNo})*. O ouvido cola **desastre** em **[desatar](${desatar})**. O lab declara: **não são o mesmo étimo**. A relação é de **ofício**, não de avô.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · desastre](${WIKT}), [Wikipédia · Desastre](${WIKI}). **Ficha ≠ boletim de emergência, ≠ teologia do azar, ≠ protocolo clínico.** [Etimologia](${etimologia}) popular (*desatar* + resto) = mecanismo de [trocadilho](${trocadilho}) / história que encaixa demais — **não** é o étimo. Fecho: [Faça o melhor!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **desastre** |
| Classe | Substantivo masculino |
| Étimo | fr. *désastre* / it. *disastro* ← *dis-* «mau» + lat. *astrum* «astro» — confiança: **alta** |
| Família | *desastrado* · *desastroso* · *astro* · *astronomia* (vizinha) |
| Cognatos | esp. *desastre* · fr. *désastre* · ing. *disaster* |
| Tipo BudGanja | Palavra — catástrofe × má estrela × literacia do ouvido |
| Não é | [desatar](${desatar}) (*des-* + *atar*) |
| Elo ofício | [desatar o nó](${desatarNo}) · [nó na vida!](${noVida}) · [risco](${risco}) · [medo](${medo}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **golpe que desordena** — no céu antigo, astro contra; no chão, o que a [vida](${vida}) chama de ruína. Não é o verbo de soltar.

## 2. Ouvido × étimo

| Forma | O que o ouvido diz | O que o étimo diz |
|-------|--------------------|-------------------|
| **desastre** | «parece [desatar](${desatar})» | *dis-* + *astro* — má estrela |
| **desatar** | «parece desastre» | *des-* + *atar* — soltar o [nó](${no}) |
| **[desatar o nó](${desatarNo})** | «evitar o desastre» | Ditado de ofício — **relação viva**, não família etimológica |

**H1:** desastre = **ill-starred** — o céu como culpa antiga; hoje, catástrofe nomeada.  
**H2:** a cola *desastre* / *desatar* é [etimologia](${etimologia}) popular — encaixa demais.  
**H3:** a relação pedida é **método**: um [nó na vida!](${noVida}) que não se inspeciona pode ser *vivido* como desastre; [desatar o nó](${desatarNo}) é o [gesto](${gesto}) que devolve [caminho](${caminho}).

## 3. Relação com desatar o nó

Não se funde o astro com a [corda](${corda}). Funde-se o **ofício**:

1. Nomear o [nó](${no}) — o laço.  
2. Não chamar **desastre** ao que ainda é um nó (inflação de ruína).  
3. [Desatar o nó](${desatarNo}) com [verdade](${verdade}) — puxar o fio, não o céu.  
4. Se o golpe já veio, ainda resta desatar o que sobrou.  
5. Depois: **[ufa](${ufa})** — e [Faça o melhor!](${mantra}).

**Veredicto da relação:** desastre e desatar **não partilham avô**. Partilham o **laboratório**: o aperto na [vida](${vida}) pede laço nomeado, não só má estrela.

## 4. Faça o melhor!

Não usar *desastre* para apagar o [gesto](${gesto}) possível. O [risco](${risco}) e o [medo](${medo}) cabem na ficha; o sermão do azar não. Ofício: [desatar o nó](${desatarNo}) **hoje**.

## Status

**Aprovado** — **desastre** fichado: má estrela (*astrum*); ≠ [desatar](${desatar}); relacionado por ofício a [desatar o nó](${desatarNo}).

[▶ Palavras](${hub}) · [▶ Desatar](${desatar}) · [▶ Desatar o nó](${desatarNo}) · [▶ Nó](${no}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **desastre** (disaster) from *dis-* + *astrum* (ill-starred). **Not** [desatar](${desatar}) (to untie). The requested link is **craft**: a [nó na vida!](${noVida}) left unnamed can be lived as disaster; [desatar o nó](${desatarNo}) is the gesture. Close: [Do your best!](${mantra}).

## Status

**Approved** — disaster = bad star; untying = another etymon; related by method, not by ancestor.

[▶ Words](${hub}) · [▶ Untie](${desatar}) · [▶ Untie the knot](${desatarNo}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

**Desastre** de *dis-* + *astrum* (mala estrella). **No** es [desatar](${desatar}). El vínculo pedido es **oficio**: un [nó na vida!](${noVida}) sin nombrar se vive como desastre; [desatar o nó](${desatarNo}) es el gesto. Cierre: [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobado** — desastre = mala estrella; desatar = otro étimo; relación de método, no de abuelo.

[▶ Palabras](${hub}) · [▶ Desatar](${desatar}) · [▶ Desatar o nó](${desatarNo}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildDesastrePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDesastreBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-desastre', 177);
  return makePalavra({
    title: 'Inspeção: Desastre — má estrela, não é desatar o nó',
    titleEn: 'Inspection: Desastre — ill-starred, not untying the knot',
    titleEs: 'Inspección: Desastre — mala estrella, no es desatar el nudo',
    excerpt:
      'Palavras: «desastre» (*dis-* + *astrum*) — má estrela; ≠ desatar; relação de ofício com desatar o nó; ufa depois; Faça o melhor!',
    excerptEn:
      'Words: “desastre” (*dis-* + *astrum*) — ill-starred; ≠ untying; craft link to desatar o nó; phew after; Do your best!',
    excerptEs:
      'Palabras: «desastre» (*dis-* + *astrum*) — mala estrella; ≠ desatar; vínculo de oficio con desatar o nó; ufa después; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-desastre',
    date: '2026-08-22T03:16:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Desastre · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildDesastrePost, buildDesastreBodies };
