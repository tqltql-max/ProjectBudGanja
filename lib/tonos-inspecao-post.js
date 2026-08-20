'use strict';

/**
 * Inspeção Palavras · tónos (τόνος)
 * Étimo grego da tensão / tom / corda — raiz de tônico e isotônico.
 * Distinto da ficha-mapa «tônico» e do composto «isotônico».
 * Tríade de ofício: tónos → vomitar → commitar.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/tonos-palavra-cover.jpg';
const WIKI = 'https://en.wiktionary.org/wiki/%CF%84%CF%8C%CE%BD%CE%BF%CF%82';

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

function buildTonosBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-tonos.html';
  const tonico = '/posts/post-inspecao-palavra-tonico.html';
  const isotonico = '/posts/post-inspecao-palavra-isotonico.html';
  const vomitar = '/posts/post-inspecao-palavra-vomitar.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiTeino = 'https://en.wiktionary.org/wiki/%CF%84%CE%B5%CE%AF%CE%BD%CF%89';
  const wikiTonus = 'https://en.wiktionary.org/wiki/tonus#Latin';

  const body = `## Escopo

Inspeção editorial da palavra grega **[tónos](${self})** (τόνος; teclado vivo *tonos*). Pedido de campo: **tónos**, **[vomitar](${vomitar})**, **[commitar](${commitar})** — três gestos, três fichas. Esta é a **raiz**: tensão, tom, corda. Não é o mapa português [tônico](${tonico}) nem o composto [isotônico](${isotonico}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · τόνος](${WIKI}), [τείνω](${wikiTeino}), [tonus](${wikiTonus}), ficha-filha [tônico](${tonico}). **Ficha ≠ aula de grego antigo. Ficha ≠ diagnóstico. Ficha ≠ receita.** Sem fundir a raiz com o chá, a sílaba ou a lata.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **tónos** / τόνος (teclado *tonos*) |
| Língua | Grego antigo (eixo); transliteração de lab |
| Classe | Substantivo — «tensão, estiramento, tom, corda, acento» |
| Étimo (trabalho) | Gr. *teínō* «esticar» → *tónos* «o que está tenso» → lat. *tonus* → PT [tônico](${tonico}) — confiança **alta** |
| Tipo BudGanja | Palavra — raiz da tríade tónos / vomitar / commitar |
| Elo filha | [tônico](${tonico}) — nove ofícios no português |
| Elo composto | [isotônico](${isotonico}) — *iso-* + tensão igual |
| Elo tríade | [vomitar](${vomitar}) (largar) · [commitar](${commitar}) (gravar) |
| Elo sílaba | [língua portuguesa](${lingua}) · tónico em BI em [Moçambique](${mocambique}) |
| Elo tensão viva | [isqueiro BIC](${isqueiro}) — tónos do polegar |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [Faça o melhor!](${mantra}) |
| Fonte | [τόνος](${WIKI}) |
| Data | ${inspected} |

**Objeto:** o **vocábulo da tensão** em grego — o que aperta, o que soa, o que sustenta. No lab: a raiz **fica nesta ficha**; os ofícios portugueses ficam em [tônico](${tonico}).

## 2. Hipóteses e método

**H1:** *tónos* é **um** étimo; [tônico](${tonico}) é o **mapa** dos ofícios no PT — não o mesmo objecto.  
**H2:** no glossário, *gez: "tonos"* sob [tônico](${tonico}) é **convénção de lab**, não étimo ge'ez.  
**H3:** a tríade de ofício é sequência: **segurar** ([tónos](${self})) → **largar o que não fica** ([vomitar](${vomitar})) → **gravar o que fica** ([commitar](${commitar})).

Passos: fixar forma grega → separar raiz / filha / composto → tríade → limites.

## 3. O que a raiz cobre (sem ser o mapa PT)

| Sentido grego | Leitura lab | Onde **não** misturar |
|---------------|-------------|------------------------|
| **Tensão / estiramento** | O que aperta | Não é chá [tônico](${tonico}) |
| **Tom / pitch** | Altura do som | Não é *tone* do glossário (ficha-filha, sentido 2) |
| **Corda** | O que vibra quando tenso | Não é instrumento sozinho |
| **Acento** | Pico na palavra | Sílaba tônica = ofício PT em [língua](${lingua}) |
| **Tónus do corpo** | Tensão de fundo | Literacia; **não** diagnóstico |

**Veredicto:** a raiz **nomeia a tensão**; a filha [tônico](${tonico}) **distribui os ofícios**.

## 4. Tríade de ofício

| Peça | Gesto | Mau uso |
|------|-------|---------|
| **[tónos](${self})** | Segurar — saber onde aperta | Fundir com chá / lata / sílaba |
| **[vomitar](${vomitar})** | Largar o que envenena o rasto | Despejar texto sem [verdade](${verdade}) |
| **[commitar](${commitar})** | Gravar o que fica | «Comitar» sem [gesto](${gesto}) — pose de git |

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Grego no lab** | Enfeite clássico | Étimo de trabalho da série |
| **Mesmo que tônico** | Sinónimo preguiçoso | Raiz ≠ mapa PT |
| **gez: tonos** | Palavra etíope | Alias de lab na ficha [tônico](${tonico}) |
| **tónos em BI** | Grego no topónimo | Sílaba tônica de [Moçambique](${mocambique}) |

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear a raiz** | Filologia | Esta ficha, não o chá |
| **Não fundir ofícios** | Homónimos de *tonic* | Abrir [tônico](${tonico}) / [isotônico](${isotonico}) |
| **Segurar antes de largar** | Tensão sem explosão | Tríade → [vomitar](${vomitar}) → [commitar](${commitar}) |
| **Fechar** | Depois do mapa | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[tônico](${tonico})** | Filha PT — nove ofícios |
| **[isotônico](${isotonico})** | *iso-* + tensão igual |
| **[vomitar](${vomitar})** · **[commitar](${commitar})** | Tríade de ofício |
| [Moçambique](${mocambique}) · [isqueiro BIC](${isqueiro}) | tónos na sílaba / no polegar |
| [língua portuguesa](${lingua}) · [sinal](${sinal}) | Acento e pulso |
| [Faça o melhor!](${mantra}) · [Guia](${guia}) · [Vida](${vida}) | Fecho e índice |

## Limites

- Não ensina grego antigo nem substitui o dicionário.  
- Não diagnostica tónus, crise tônico-clónica nem «tom» de marketing.  
- *tonos* / *tónos* / τόνος = o mesmo objecto; [tônico](${tonico}) é **outra** ficha.

## Veredicto

**Aprovado na série Palavras** — *tónos* fichado como **raiz da tensão**; [tônico](${tonico}) e [isotônico](${isotonico}) ao lado; tríade [vomitar](${vomitar}) · [commitar](${commitar}); fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tônico](${tonico}) · [▶ Vomitar](${vomitar}) · [▶ Commitar](${commitar}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Greek **[tónos](${self})** (τόνος). Field request: **tónos**, **[vomitar](${vomitar})**, **[commitar](${commitar})** — three sheets. This one is the **root**: tension, pitch, string. It is **not** the Portuguese map [tônico](${tonico}) nor the compound [isotônico](${isotonico}).

> Independent audit. **Sheet ≠ Ancient Greek class, diagnosis, or recipe.**

## Object

| Field | Value |
|-------|-------|
| Word | **tónos** / τόνος |
| Etymon | Gr. *teínō* “to stretch” → *tónos* → Lat. *tonus* → PT [tônico](${tonico}) — **high** confidence |
| Links | [tônico](${tonico}) · [isotônico](${isotonico}) · [vomitar](${vomitar}) · [commitar](${commitar}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Root vs daughter

*tónos* **names the tension**. [tônico](${tonico}) **spreads the nine Portuguese offices**. Do not fuse root, tea, syllable, or sports drink.

## Office triad

1. **[tónos](${self})** — hold (know where it tightens).  
2. **[vomitar](${vomitar})** — release what must not stay.  
3. **[commitar](${commitar})** — record what stays.

**Verdict:** root sheet approved; [Do your best!](${mantra}) after the map.

[▶ Words](${hub}) · [▶ Tônico](${tonico}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del griego **[tónos](${self})** (τόνος). Pedido: **tónos**, **[vomitar](${vomitar})**, **[commitar](${commitar})**. Esta ficha es la **raíz**: tensión, tono, cuerda. **No** es el mapa PT [tônico](${tonico}) ni el compuesto [isotônico](${isotonico}).

> Auditoría independiente. **Ficha ≠ clase de griego, diagnóstico ni receta.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **tónos** / τόνος |
| Étimo | Gr. *teínō* «estirar» → *tónos* → lat. *tonus* → PT [tônico](${tonico}) — confianza **alta** |
| Vínculos | [tônico](${tonico}) · [isotônico](${isotonico}) · [vomitar](${vomitar}) · [commitar](${commitar}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Raíz × hija

*tónos* **nombra la tensión**. [tônico](${tonico}) **reparte los oficios** en portugués. No fusionar raíz, té, sílaba ni lata.

## Tríada

1. **[tónos](${self})** — sostener.  
2. **[vomitar](${vomitar})** — soltar lo que no queda.  
3. **[commitar](${commitar})** — grabar lo que queda.

**Veredicto:** raíz aprobada; [¡Haz lo mejor!](${mantra}) después del mapa.

[▶ Palabras](${hub}) · [▶ Tônico](${tonico}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTonosPost() {
  const { body, contentEn, contentEs, wiki } = buildTonosBodies();
  const seriesOrder = pickOrder('inspecao-palavra-tonos', 145);
  return makePalavra({
    title: 'Inspeção: Tónos — a raiz grega da tensão, distinta de tônico',
    titleEn: 'Inspection: Tónos — the Greek root of tension, distinct from tônico',
    titleEs: 'Inspección: Tónos — la raíz griega de la tensión, distinta de tônico',
    excerpt:
      'Palavras: «tónos» (τόνος) — raiz da tensão; ≠ mapa PT tônico; tríade vomitar / commitar; Faça o melhor!',
    excerptEn:
      'Words: “tónos” (τόνος) — root of tension; ≠ PT map tônico; triad vomitar / commitar; Do your best!',
    excerptEs:
      'Palabras: «tónos» (τόνος) — raíz de la tensión; ≠ mapa PT tônico; tríada vomitar / commitar; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tonos',
    date: '2026-08-20T23:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Tónos · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildTonosPost, buildTonosBodies };
