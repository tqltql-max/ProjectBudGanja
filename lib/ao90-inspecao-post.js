'use strict';

/**
 * Inspeção Palavras · AO90 (sigla)
 * Eixos: Acordo Ortográfico de 1990 · o 90 é o ano ·
 * grafia ≠ étimo · Brasil já escrevia assim · ≠ AOC · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ao90-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Acordo_Ortogr%C3%A1fico_de_1990';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Portuguese_Language_Orthographic_Agreement_of_1990';

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
  return `AO90.
Noventa não é hertz.
É o ano:
mil novecentos e noventa.

Acordo Ortográfico.
Não muda o étimo.
Muda a letra
que a boca já não diz.

objecto → objeto
acção → ação
O c caiu.
A origem ficou.

AOC é outra sala:
três letras no ecrã.

Valeu !!!
grafia, não origem.`;
}

function poemEn() {
  return `AO90.
Ninety is not hertz.
It is the year:
nineteen ninety.

Orthographic Agreement.
It does not change the etymon.
It changes the letter
the mouth no longer says.

objecto → objeto
acção → ação
The c fell.
The origin stayed.

AOC is another room:
three letters on a screen.

Valeu !!!
spelling, not origin.`;
}

function poemEs() {
  return `AO90.
Noventa no es hertz.
Es el año:
mil novecientos noventa.

Acuerdo Ortográfico.
No cambia el étimo.
Cambia la letra
que la boca ya no dice.

objecto → objeto
acção → ação
La c cayó.
El origen quedó.

AOC es otra sala:
tres letras en la pantalla.

¡Valeu !!!
grafía, no origen.`;
}

function buildAo90Bodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-ao90.html';
  const aoc = '/posts/post-inspecao-palavra-aoc.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da sigla **[AO90](${self})** — **A**cordo **O**rtográfico de **1990**. Pedido de campo: *Brasil / AO90 etimografia* e *qual é desses números?*. Objecto = as **letras AO** + o **número 90**. Não é aula completa de reforma. Não é dicionário. **90 = o ano de 1990**, não hertz de ecrã, não modelo de [AOC](${aoc}).

> **Nota metodológica:** auditoria independente. Fontes: [Acordo Ortográfico de 1990](${WIKI}), [Orthographic Agreement of 1990](${WIKI_EN}). **Ficha ≠ manual da reforma, ≠ juízo de gosto BR×PT, ≠ etimologia nova.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Sem afiliação institucional.

**Gatilho:** *AO90* / *AO-90* / *Brasil / AO90* / *etimografia* / *noventa* (quando a boca aponta esta sigla).

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **AO90** (também **AO-90**) |
| Expansão | **Acordo Ortográfico da Língua Portuguesa de 1990** |
| O número | **90** = **1990** — ano da **assinatura** em Lisboa (16 dez.), não o ano em que entrou em vigor em cada país |
| O que muda | **Ortografia** (como se escreve) |
| O que **não** muda | **Étimo** (de onde a palavra vem) |
| Tipo BudGanja | Palavra — **sigla** de acordo × etiqueta de grafia do lab BR |
| Não é | [AOC](${aoc}) (marca de monitor) · 90 Hz · modelo de ecrã · «etimologia nova» |
| Elo grafia | [ação](${acao}) (*ação* × *acção*) · [objetos](${objetos}) (*objeto* × *objecto*) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [AO90](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **nome de acordo**. O laboratório escreve **Brasil / AO90** para marcar a **grafia** das fichas (*ação*, *objeto*, *fato*), não para inventar outro étimo.

## Hipóteses e método

**H1:** AO = *Acordo Ortográfico*; **90 = 1990** — alta.  
**H2:** o acordo **não cria origens**. *Ação* continua a vir de lat. *āctiō* ← *agere*; só cai o *ct* na letra. Isso corta a palavra de campo *etimografia* (mistura de [etimologia](${etimologia}) + ortografia): a orelha cola; o ofício **separa**. O [étimo](${etimo}) fica; a grafia muda.  
**H3:** **Brasil / AO90** não são duas etimologias. O Brasil **já escrevia** muitas destas formas (*ação*, *objeto*) **antes** de 1990. O acordo alinha a CPLP (Portugal larga consoantes mudas: *objecto* → *objeto*, *acção* → *ação*).  
**H4:** [a orelha cola](${orelha}) **AO90** em **[AOC](${aoc})** (monitor, [objeto](${objetos}) electrónico na mesa). Corte: AO90 é letra de Estado; AOC é marca de fábrica. O *c* que o acordo largou em *objecto* **não é** o C da sigla AOC.  
**H5:** **90 ≠ 90 Hz**. Hertz é frequência do ecrã; noventa aqui é **ano**.  
**H5b:** **90 não vira [3](${tres})**. Duas colas de fórmula: (a) a [AOC](${aoc}) tem **três letras**; (b) 9+0=9 e 9=3×3. Corte: três letras = **contagem da marca** (três palavras EN); 3×3 = **conta do dígito 9**, não o ano a transformar-se. O 90 **fica 1990**.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Os números

| Leitura | Ofício | Confiança |
|---------|--------|-----------|
| **90** = **1990** | Ano da assinatura do acordo | Alta |
| **90 Hz** | Taxa de refresco de um monitor | Alta — **outra sala** |
| Modelo «AO90» de ecrã | SKU / marketing | Não é esta sigla |
| Nota 90 / 90 % | Escola, sondagem | Outra sala |
| **90 → [3](${tres})** | «Fórmula»: 9+0=9 e 9=3×3; ou a [AOC](${aoc}) tem três letras | Cola — o 90 **não** se transforma |
| Vigência BR | Decreto 6.583/2008; transição até 31 dez. 2015 | Alta (calendário, não o «90» da sigla) |

**Veredicto dos números:** nesta ficha, **noventa nomeia o ano**. O resto é cola.

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **AO90** / **AO-90** | Sigla âncora |
| Acordo Ortográfico de 1990 | Expansão plena |
| *Brasil / AO90* | Etiqueta do lab: grafia BR alinhada ao acordo |
| *etimografia* | Blend de campo — **não** é termo técnico; ver H2 |
| Grafia PT tradicional | *acção*, *objecto*, *facto* — história, não erro do étimo |

**Veredicto de forma:** o laboratório ficheia **AO90** como sigla de **ortografia**. Étimo fica nas fichas de cada palavra ([ação](${acao}), [objetos](${objetos})).

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **AO90** | Prima da [AOC](${aoc}) | Acordo de **1990**; a irmã de três letras é outra ficha |
| **90** | Hertz / modelo / nota / «vira 3» | **Ano** da assinatura |
| **90 → 3** | Fórmula que fecha o círculo com a [AOC](${aoc}) | [Três](${tres}) letras da marca ≠ o ano; 3×3 é conta do **9**, não do **90** |
| **Brasil / AO90** | Duas origens da palavra | Uma **grafia** (BR já a usava; o acordo generaliza) |
| **Etimografia** | Ciência nova | Cola de *etimologia* + *ortografia* — o acordo só toca a segunda |
| **Caiu o c** | A palavra mudou de pai | Mudou a **letra**; o pai latino **fica** |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Expandir: Acordo Ortográfico de **1990** |
| Bom | Cortar grafia × étimo; cortar AO90 × [AOC](${aoc}) |
| Bom | Dizer que o Brasil já escrevia *ação* / *objeto* |
| Mau | Tratar AO90 como étimo de [ação](${acao}) ou de [objetos](${objetos}) |
| Mau | Ler 90 como hertz do monitor [AOC](${aoc}) |
| Mau | Transformar a ficha em guerra BR×PT |

## AO90 × AOC × objetos

| Peça | Gesto |
|------|-------|
| **AO90** | Acordo: **como se escreve** em 1990+ |
| **[AOC](${aoc})** | Sigla de fábrica — [objeto](${objetos}) electrónico (monitor) |
| **[objetos](${objetos})** | Lema: lat. *obiectum*; grafia AO90 **sem c** (*objeto*) |
| **[ação](${acao})** | Lema: lat. *āctiō*; grafia AO90 **ação** × *acção* |
| **[A orelha cola](${orelha})** | AO90 soa perto de AOC; o étimo **corta** |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [AOC](${aoc}) | A irmã que a orelha cola — marca de ecrã, não acordo |
| [Objetos](${objetos}) | O *c* que caiu na letra (*objecto* → *objeto*) |
| [Ação](${acao}) | O *ct* que o *ç* absorveu |
| [Étimo](${etimo}) · [etimologia](${etimologia}) | A peça e o ofício — o acordo **não** os substitui |
| [Língua portuguesa](${lingua}) | O solo onde o acordo pisa |
| [Verdade](${verdade}) | Nomear grafia sem fingir étimo novo |
| [A orelha cola](${orelha}) | Método do corte |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não ensina a reforma inteira (hífen, trema, acentos).  
- Não escolhe «melhor português».  
- Calendários de vigência por país = nota, não o núcleo da sigla.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **AO90** fichada como sigla (*Acordo Ortográfico de 1990*); **90 = ano**; grafia ≠ étimo; irmã colada [AOC](${aoc}).

[▶ Palavras](${hub}) · [▶ AOC](${aoc}) · [▶ Objetos](${objetos}) · [▶ Ação](${acao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the acronym **AO90** — Portuguese **Orthographic Agreement of 1990**. Field request: *Brasil / AO90 etimografia* and *what are these numbers?*. **90 = the year 1990**, not hertz, not an [AOC](${aoc}) monitor model. The agreement changes **spelling**, not etymology. Brazil already wrote *ação* / *objeto* before 1990.

## Status

**Approved in Words** — acronym expanded; 90 is a year; sister [AOC](${aoc}) is another room.

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la sigla **AO90** — **Acuerdo Ortográfico de 1990**. Pedido: *Brasil / AO90 etimografia* y *¿qué son esos números?*. **90 = el año 1990**, no hertz, no un modelo de monitor [AOC](${aoc}). El acuerdo cambia la **grafía**, no el étimo. Brasil ya escribía *ação* / *objeto* antes de 1990.

## Estado

**Aprobada en Palabras** — sigla expandida; 90 es año; hermana [AOC](${aoc}) es otra sala.

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAo90Post() {
  const { body, contentEn, contentEs } = buildAo90Bodies();
  const seriesOrder = pickOrder('inspecao-palavra-ao90', 292);
  return makePalavra({
    title: 'Inspeção: AO90 — o acordo, o ano e o que não é étimo',
    titleEn: 'Inspection: AO90 — the agreement, the year, and what is not an etymon',
    titleEs: 'Inspección: AO90 — el acuerdo, el año y lo que no es étimo',
    excerpt:
      'Palavras: AO90 = Acordo Ortográfico de 1990; 90 é o ano; grafia ≠ étimo; ≠ AOC; Valeu !!!',
    excerptEn:
      'Words: AO90 = 1990 Orthographic Agreement; 90 is the year; spelling ≠ etymon; ≠ AOC; Valeu !!!',
    excerptEs:
      'Palabras: AO90 = Acuerdo Ortográfico de 1990; 90 es el año; grafía ≠ étimo; ≠ AOC; ¡Valeu !!!',
    slug: 'inspecao-palavra-ao90',
    date: '2026-08-24T10:40:00.000Z',
    seriesOrder,
    seriesLabel: 'AO90 · sigla',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAo90Post,
  buildAo90Bodies,
  poemPt,
  poemEn,
  poemEs
};
