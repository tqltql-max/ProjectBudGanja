'use strict';

/**
 * Inspeção Palavras · palavra
 * Eixos: lat. parabola ← gr. parabolḗ · vocábulo × série × Verbo ·
 * pedido <<PALAVRA>> · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/palavra-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/palavra';
const WIKT_LA = 'https://en.wiktionary.org/wiki/parabola#Latin';
const WIKT_GR = 'https://en.wiktionary.org/wiki/παραβολή#Ancient_Greek';

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

function buildPalavraBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-palavra.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[palavra](${self})** — o vocábulo que **nomeia o vocábulo**. Pedido de campo: **«inspeção da palavra <<PALAVRA>>»**. A série [Palavras](${hub}) inspeciona dezenas de peças; esta ficha cobre **a peça-mãe**. Não é o hub. Não é a [língua](${lingua}) inteira. É o nome.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · palavra](${WIKT}), lat. [*parabola*](${WIKT_LA}), gr. [*parabolḗ*](${WIKT_GR}). **Ficha ≠ gramática normativa, ≠ tratado de Logos.** Série [Palavras](${hub}) = lugar das fichas; esta página = o **vocábulo**. Sem afiliação académica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **palavra** (pl. *palavras*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *parabola* («comparação, fala, parábola») ← gr. *parabolḗ* («lançar ao lado / comparação») — confiança: **alta** |
| Pedido de campo | *<<PALAVRA>>* — aspas de ofício: o objecto é a palavra **palavra** |
| Tipo BudGanja | Palavra — vocábulo × série × método |
| Não é | [Língua portuguesa](${lingua}) · [mensagem](${mensagem}) · Verbo teológico · classe gramatical *verbo* |
| Elo método | [etimologia](${etimologia}) · [Duvivier](${duvivier}) · [verdade](${verdade}) · [relação](${relacao}) |
| Elo orelha | [orelha](${orelha}) · [a orelha cola…](${orelhaCola}) |
| Elo série | Hub [Palavras](${hub}) · [Guia](${guia}) · modelo [maconha](${maconha}) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** a unidade de fala que o português chama **palavra**. No laboratório: cada ficha da série pergunta *de onde veio*, *por onde viajou*, *o que é hoje*. Esta pergunta o **nome dessa unidade**.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **palavra** | «O que se diz» em geral | Vocábulo PT ← *parabola* (fala / comparação) |
| **Palavras** (série) | A mesma coisa em maiúsculas | [Hub](${hub}) de fichas — **lugar**, não o étimo |
| **verbo** (gramática) | Sinónimo | Classe: acção / estado — **outro mapa** |
| **Verbo / Logos** | A Palavra com P maiúsculo | Sala teológica — **não** esta ficha |
| **[mensagem](${mensagem})** | «O que se envia» | Conteúdo; a palavra é a **peça** |
| **[língua](${lingua})** | O mesmo ofício | Sistema inteiro; palavra = **unidade** |
| **inglês *word*** | Tradução directa | Germânico — sentido paralelo, **não** o avô latino |

**H1:** *palavra* < *parabola* < *parabolḗ* — fala que **compara / lança ao lado** (alta).  
**H2:** *verbum* deu *verbo*, *verbal*, *verbete* — vizinho, **não** o pai de *palavra*.  
**H3:** <<PALAVRA>> no pedido é **citação do objecto**; não funde o vocábulo com a série.  
**H4:** a [orelha cola](${orelhaCola}) «palavra» em «Palavras»; o étimo e o ofício **cortam**.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Unidade lexical** | Vocábulo, termo, peça da frase | Alta |
| **Fala / promessa** | «Dar a palavra», «palavra de honra» | Alta (uso vivo) |
| **Série BudGanja** | Hub [Palavras](${hub}) | Alta (mapa do site) |
| **Parábola** | Mesmo avô grego — narrativa que compara | Alta noutro mapa — [etimologia](${etimologia}) declara, não funde |
| **Ofício lab** | Objecto de cada ficha *inspecao-palavra-…* | Alta |

## Palavra × série × língua × mensagem

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[palavra](${self})** | Esta ficha — o vocábulo | A unidade |
| **Série Palavras** | [Hub](${hub}) + [Guia](${guia}) | A **lista** de unidades inspecionadas |
| **[língua portuguesa](${lingua})** | O meio | O sistema onde a unidade vive |
| **[etimologia](${etimologia})** | O método | Perguntar de onde veio **esta** unidade |
| **[sugestão](${sugestao})** | A fila | Pede uma palavra; não é a palavra |
| **[maconha](${maconha})** | Ficha-modelo | Uma palavra concreta — não a palavra *palavra* |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Fichar **uma** palavra por página; citar o étimo; cortar o que a orelha cola |
| Bom | Dizer «série Palavras» quando se fala do [hub](${hub}) |
| Mau | Fundir vocábulo, série, língua e Verbo num só sopro |
| Mau | Tratar *palavra* como se viesse de *verbum* |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* palavra *hoje*.

## Status

**Aprovado na série Palavras** — *palavra* fichada como vocábulo (*parabola*); a série fica no [hub](${hub}); o método em [etimologia](${etimologia}).

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Língua](${lingua}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **palavra** (“word”) — the vocable that **names the vocable**. Field request: *inspection of the word <<PALAVRA>>*. The [Words](${hub}) series inspects many items; this sheet inspects **the mother piece**. Not the hub. Not the whole [language](${lingua}).

> **Method note:** [Wiktionary](${WIKT}), Lat. [*parabola*](${WIKT_LA}). **Not** a Logos tract. Series = place of sheets; this page = the **word**.

## Object

| Field | Value |
|-------|-------|
| Word | **palavra** |
| Etymon | Lat. *parabola* ← Gr. *parabolḗ* |
| Not | [language](${lingua}) · [message](${mensagem}) · theological Word · grammatical *verb* |
| Method | [etymology](${etimologia}) |
| Date | ${inspected} |

*Verbum* gave *verbo* / verbal — a neighbor, **not** the parent of *palavra*. [Valeu !!!](${mantra})

## Status

**Approved in Words** — vocable filed; series on the [hub](${hub}).
`;

  const contentEs = `## Alcance

Inspección de **palavra** — el vocablo que **nombra el vocablo**. Pedido: *inspección de la palabra <<PALAVRA>>*. La serie [Palabras](${hub}) inspecciona muchas piezas; esta ficha cubre **la pieza madre**. No es el hub. No es toda la [lengua](${lingua}).

> **Nota:** [Wikcionario](${WIKT}), lat. [*parabola*](${WIKT_LA}). **No** es tratado de Logos.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **palavra** |
| Étimo | Lat. *parabola* ← gr. *parabolḗ* |
| No es | [lengua](${lingua}) · [mensaje](${mensagem}) · Verbo teológico · *verbo* gramatical |
| Método | [etimología](${etimologia}) |
| Fecha | ${inspected} |

*Verbum* dio *verbo* / verbal — vecino, **no** el padre de *palavra*. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — vocablo fichado; serie en el [hub](${hub}).
`;

  return { body, contentEn, contentEs };
}

function buildPalavraPost() {
  const { body, contentEn, contentEs } = buildPalavraBodies();
  const seriesOrder = pickOrder('inspecao-palavra-palavra', 221);
  return makePalavra({
    title: 'Inspeção: Palavra — o vocábulo que nomeia a série',
    titleEn: 'Inspection: Palavra — the vocable that names the series',
    titleEs: 'Inspección: Palavra — el vocablo que nombra la serie',
    excerpt:
      'Palavras: palavra ← lat. parabola / gr. parabolḗ — o vocábulo, não o hub; ≠ verbo ≠ Verbo; Valeu !!!',
    excerptEn:
      'Words: palavra ← Lat. parabola / Gr. parabolḗ — the vocable, not the hub; ≠ verb ≠ the Word; Valeu !!!',
    excerptEs:
      'Palabras: palavra ← lat. parabola / gr. parabolḗ — el vocablo, no el hub; ≠ verbo ≠ Verbo; ¡Valeu !!!',
    slug: 'inspecao-palavra-palavra',
    date: '2026-08-22T18:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Palavra · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPalavraPost,
  buildPalavraBodies
};
