'use strict';

/**
 * Inspeção Palavras · Deus
 * Eixos: lat. deus ← PIE *dyēw- / *dyēus (céu / luz do dia) ·
 * Deus × deus · ≠ Elohim / Theos / Allah (nomes paralelos) ·
 * ≠ diabo · respeito à fé, sem catecismo · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/deus-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/Deus';
const WIKT_LA = 'https://en.wiktionary.org/wiki/deus#Latin';
const WIKT_DYEUS = 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/dy%C4%93ws';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Deus.
Uma sílaba no português.
Não é prova.
Não é catecismo.
É o nome que a boca
herdou do céu latino.

Quem crê, capitaliza.
Quem descreve um deus,
escreve minúsculo.
A ficha não escolhe a fé.
Corta o vocábulo.

Valeu !!!
com respeito —
sem sermão.`;
}

function poemEn() {
  return `Deus.
One syllable in Portuguese.
Not proof.
Not catechism.
The name the mouth
inherited from the Latin sky.

Who believes, capitalizes.
Who describes a god,
writes lowercase.
The sheet does not choose faith.
It cuts the vocable.

Valeu !!!
with respect —
no sermon.`;
}

function poemEs() {
  return `Deus.
Una sílaba en portugués.
No es prueba.
No es catecismo.
Es el nombre que la boca
heredó del cielo latino.

Quien cree, capitaliza.
Quien describe un dios,
escribe minúscula.
La ficha no elige la fe.
Corta el vocablo.

¡Valeu !!!
con respeto —
sin sermón.`;
}

function buildDeusBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubExpr = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-deus.html';
  const adeus = '/posts/post-inspecao-expressao-adeus.html';
  const fui = '/posts/post-inspecao-palavra-fui.html';
  const abencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const aBenca = '/posts/post-inspecao-expressao-a-benca.html';
  const diabo = '/posts/post-inspecao-palavra-diabo.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Deus](${self})** — o vocábulo latino que o português herdou para nomear o **céu / a luz do dia** no étimo, e, na tradição cristã viva, o **Uno**. Pedido de campo no cluster **Deus → [A Deus!!!](${adeus}) → [fui](${fui})**. Respeito à fé de quem usa o nome; **sem** catecismo nem proselitismo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · Deus](${WIKT}), lat. [*deus*](${WIKT_LA}), PIE [*dyēus*](${WIKT_DYEUS}). **Ficha ≠ teologia, ≠ prova de Deus, ≠ sermão.** Objecto = a **palavra**. Série [Palavras](${hub}).

**Gatilho:** *Deus* / *deus* / *deuses*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Deus** (também *deus*, pl. *deuses*) |
| Classe | Substantivo |
| Étimo (trabalho) | lat. *deus* ← PIE *dyēw- / *dyēus* («céu / luz do dia») — confiança: **alta** |
| Família | *divino* · *divindade* · *deidade* · *dia* · esp. *Dios* · fr. *Dieu* · it. *Dio* · lat. *Iuppiter* (*dyeu-pater*) · gr. *Zeus* (cognato, não avô do PT) |
| Tipo BudGanja | Palavra — nome × fé viva × [respeito](${respeito}) |
| Não é | étimo de *Elohim* / *Theos* / *Allah* (nomes **paralelos**, não avós desta forma PT) · [diabo](${diabo}) |
| Cluster | [A Deus!!!](${adeus}) (despedida) · [fui](${fui}) (saída do corpo) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome** que o português escreve com maiúscula quando aponta o Uno da tradição cristã, e com minúscula quando aponta uma divindade genérica. A ficha mapeia a **forma**; não decide se o referente existe.

## Hipóteses e método

**H1:** *Deus* < lat. *deus* < PIE *dyēus* — céu diurno / luz (alta).  
**H2:** *Zeus* e *Júpiter* são **cognatos** do mesmo céu indo-europeu; não são o étimo do português.  
**H3:** *Elohim*, *Theos*, *Allah* nomeiam o sagrado noutras línguas — **paralelos de uso**, não avós de *Deus*.  
**H4:** [diabo](${diabo}) é outra raiz (*diábolos*, acusador). A orelha cola o campo; o étimo corta.  
**H5:** [filho de deus](${filho}), [Deus abençoe](${abencoe}), [jesusudavi](${jesusudavi}) e [a bença](${aBenca}) são **usos** do nome — não substituem esta ficha.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo** | Céu / dia — a luz que se vê | Alta |
| **Maiúscula** | O Uno na tradição cristã de quem crê | Alta (uso, não prova) |
| **Minúscula** | Um deus, uma deidade | Alta |
| **Oral BR** | Exclamação, bênção, despedida — ver irmãs | Alta |
| **Ofício** | Nomear sem catequizar | Alta |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *Deus* (vocábulo) × fé (quem crê) × teologia (doutos) |
| Bom | Distinguir cognatos (*Zeus*) de étimo PT (*deus* latino) |
| Mau | Transformar a ficha em prova ou negação |
| Mau | Colar [diabo](${diabo}) como «o contrário etimológico» — são raízes distintas |
| Mau | Tratar *Allah* / *Elohim* como avós desta palavra |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A Deus!!!](${adeus}) · [fui](${fui}) | Cluster de saída: encomendar × partir |
| [Deus abençoe](${abencoe}) · [filho de deus](${filho}) · [a bença](${aBenca}) | Usos do nome — bênção, dignidade, pedido |
| [jesusudavi](${jesusudavi}) | Assombro oral — não é esta ficha |
| [diabo](${diabo}) | Outra raiz — acusador, não «anti-Deus» etimológico |
| [alma](${alma}) · [vida](${vida}) · [respeito](${respeito}) · [verdade](${verdade}) | Ofício |
| [Padre Ticão](${padreTicao}) | Legado de cuidado; sem doutrina nesta página |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina doutrina, oração nem juízo sobre quem crê ou não crê.  
- Não é prova da existência ou inexistência do referente.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *Deus* fichado como lat. *deus* ← *dyēus*; irmãs [A Deus!!!](${adeus}) e [fui](${fui}).

[▶ Palavras](${hub}) · [▶ Expressões](${hubExpr}) · [▶ A Deus!!!](${adeus}) · [▶ fui](${fui}) · [▶ Valeu !!!](${mantra}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Inspection of Portuguese **Deus** — Lat. *deus* ← PIE *dyēus* (sky / daylight). Field cluster: **Deus → [A Deus!!!](${adeus}) → [fui](${fui})**. Respect for faith; **no** catechism. Sheet ≠ theology. Cognates Zeus / Jupiter; Elohim / Theos / Allah are **parallel names**, not this etymon. Distinct from [diabo](${diabo}).

## Status

**Approved in Words** — vocable first; sisters [A Deus!!!](${adeus}) and [fui](${fui}).

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Deus** — lat. *deus* ← PIE *dyēus* (cielo / luz del día). Clúster: **Deus → [A Deus!!!](${adeus}) → [fui](${fui})**. Respeto a la fe; **sin** catecismo. Ficha ≠ teología. Cognados Zeus / Júpiter; Elohim / Theos / Allah son **nombres paralelos**. Distinto de [diabo](${diabo}).

## Estado

**Aprobada en Palabras** — vocablo primero; hermanas [A Deus!!!](${adeus}) y [fui](${fui}).

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildDeusPost() {
  const { body, contentEn, contentEs } = buildDeusBodies();
  const seriesOrder = pickOrder('inspecao-palavra-deus', 244);
  return makePalavra({
    title: 'Inspeção: Deus — o vocábulo do céu latino; ficha ≠ catecismo',
    titleEn: 'Inspection: Deus — the Latin-sky vocable; sheet ≠ catechism',
    titleEs: 'Inspección: Deus — el vocablo del cielo latino; ficha ≠ catecismo',
    excerpt:
      'Palavras: Deus ← lat. deus ← PIE *dyēus* (céu / dia); Deus × deus; ≠ Elohim/Theos/Allah; cluster A Deus!!! / fui; Valeu !!!',
    excerptEn:
      'Words: Deus ← Lat. deus ← PIE *dyēus*; God × a god; ≠ Elohim/Theos/Allah; cluster A Deus!!! / fui; Valeu !!!',
    excerptEs:
      'Palabras: Deus ← lat. deus ← PIE *dyēus*; Dios × un dios; ≠ Elohim/Theos/Allah; clúster A Deus!!! / fui; ¡Valeu !!!',
    slug: 'inspecao-palavra-deus',
    date: '2026-08-23T16:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Deus · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildDeusPost, buildDeusBodies, poemPt, poemEn, poemEs };
