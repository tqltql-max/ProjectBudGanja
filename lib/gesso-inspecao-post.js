'use strict';

/**
 * Inspeção Palavras · gesso
 * Eixos: gr. γύψος / lat. gypsum · sulfato que vira pasta ·
 * ≠ geologia (γῆ) — o olho cola GE- ·
 * braço direito quebrado → ingessado (gatilho ingessadado) ·
 * irmã pedra · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/gesso-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/gesso';
const WIKT_GYPSUM = 'https://en.wiktionary.org/wiki/gypsum#Latin';
const WIKT_GR = 'https://en.wiktionary.org/wiki/γύψος#Ancient_Greek';
const WIKT_GEO = 'https://pt.wiktionary.org/wiki/geologia';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) {
      const pedra = posts.find((p) => p.slug === 'inspecao-palavra-pedra');
      const n = Number(existing.seriesOrder);
      if (pedra && Number(pedra.seriesOrder) === n) return n + 1;
      return n;
    }
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildGessoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-gesso.html';
  const pedra = '/posts/post-inspecao-palavra-pedra.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[gesso](${self})** — o **sulfato** que a obra e o hospital tornam pasta, placa, molde. Pedido de campo: *inspeção da palavra GEsso*, com **geologia**, **braço direito**, **quebrado** e o lapso **ingessadado**. Irmã: **[pedra](${pedra})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · gesso](${WIKT}), lat. [*gypsum*](${WIKT_GYPSUM}), gr. [*γύψος*](${WIKT_GR}), [geologia](${WIKT_GEO}). **Ficha ≠ protocolo ortopédico, ≠ receita de argamassa, ≠ laudo.** Série [Palavras](${hub}). Sem afiliação clínica.

**Gatilho:** *GEsso* / *GEologia* / *ingessado* / *ingessadado* / *quebrado* / *braço direito* / *direitto*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **gesso** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | gr. *γύψος* → lat. *gypsum* → it. *gesso* → pt. *gesso* — confiança: **alta** |
| Família | *gessar* · *ingessado* · *gesseiro* · esp. *yeso* · fr. *gypse* / *plâtre* · ing. *gypsum* / *plaster* |
| Tipo BudGanja | Palavra — mineral tratado × molde × imobilizar o membro |
| Não é | [pedra](${pedra}) (*πέτρα*) · **geologia** (*γῆ* + *λόγος*) · cimento · giz (*creta*) |
| Elo mineral | [pedra](${pedra}) — a *pedra de gesso* é gipso; o **gesso** da obra já foi cozido |
| Elo corpo | *quebrado* → *ingessado* · **braço direito** · [gesto](${gesto}) · [risco](${risco}) · [curar](${curar}) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo do **gipso** — mineral mole que, calcinado e molhado, **pega** e **segura**. Na parede é placa; no ateliê é base de pintura; no braço é **molde que imobiliza**.

## O que o olho cola — e o étimo corta

O pedido escreveu **GE**sso e **GE**osologia. O olho vê o mesmo prefixo. Os gregos não.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **gesso** | Pedra / ciência da terra | *γύψος* — gipso, sulfato de cálcio |
| **geologia** | Família de *gesso* (GE-) | *γῆ* + *λόγος* — discurso da **terra**; outra raiz |
| **pedra de gesso** | Qualquer [pedra](${pedra}) | O mineral *gipso* ainda em bloco; depois da calcinação vira **gesso** de ofício |
| **quebrado** | Sinónimo de ingessado | Part. de *quebrar* (lat. *crepāre* — fender). O osso **quebra**; o gesso **segura** |
| **ingessado** | «Com gesso em cima» | *in-* + *gesso* + *-ado* — **posto em gesso**; o membro imobilizado |
| **ingessadado** | Palavra nova | **Lapso** de *ingessado* — a sílaba *-da-* duplicou (como *direitto* por *direito*). Gatilho de ofício, não étimo |
| **braço direito** | Só anatomia | (1) o membro que a maioria usa para o [gesto](${gesto}); (2) locução: a pessoa de confiança. O gesso no **direito** trava o ofício da mão |
| **direitto** | Grafia | Lapso de *direito* — *tt* a mais; cortar para a forma viva |

**H1:** *gesso* < *gypsum* < *γύψος* — gipso (alta).  
**H2:** *geologia* < *γῆ* — o **GE-** de *GEsso* é coincidência de letras, não família.  
**H3:** *quebrado* nomeia a **fenda**; *ingessado* nomeia o **molde**. Dois ofícios, um circuito de corpo.  
**H4:** *ingessadado* e *direitto* são gatilhos do campo — a boca/tecla colou; o laboratório corta.  
**H5:** **braço direito** na locução não é o gesso; no corpo **é** o sítio mais frequente do molde quando a mão de ofício parte.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Mineral** | Gipso — evaporito mole; *pedra de gesso* | Alta |
| **Obra** | Pasta, placa, estuque, forro | Alta |
| **Arte** | Base branca da pintura (*gesso* de tela) | Alta noutro mapa — citar |
| **Ortopedia** | Molde que imobiliza o membro [quebrado](${self}) | Alta (uso vivo); **≠** esta ficha como receita |
| **Figura** | «Estar no gesso» = parado, fora do [gesto](${gesto}) | Alta (BR oral) |
| **Lab** | Nomear o [risco](${risco}) do membro que trabalha; [curar](${curar}) é outro verbo | Alta (ofício) |

## Braço direito — três cortes

| Corte | Ofício |
|-------|--------|
| **Anatomia** | O braço do lado direito — no destros, o da ferramenta |
| **Locução** | *Braço direito* = auxiliar de confiança (não é o gesso; não é [Pedro](${pedra}) por étimo) |
| **Campo** | Braço direito **quebrado** → **ingessado** — o molde no membro de ofício |

Não fundir os três. O [respeito](${respeito}) pede o facto do corpo; a [verdade](${verdade}) recusa transformar a locução em diagnóstico.

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar GE-sso × GE-ologia (*γύψος* × *γῆ*) |
| Bom | Mandar a [pedra](${pedra}) dura para a irmã; ficar com o sulfato que pega |
| Bom | *Quebrado* = fenda; *ingessado* = molde; *ingessadado* = lapso |
| Mau | Protocolo de como pôr gesso — a ficha **não** imobiliza ninguém |
| Mau | Trocar *braço direito* (locução) pelo molde sem dizer qual corte |
| Mau | *Direitto* / *ingessadado* como se fossem formas do dicionário |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* gesso *hoje*: o mineral que **segura** o que a [pedra](${pedra}) **não** remenda sozinha. O braço direito quebrado espera o molde; o ofício espera a mão de volta.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Pedra](${pedra}) | Irmã — *πέτρα*; Pedro; perdão; geologia de casa |
| [Gesto](${gesto}) · [risco](${risco}) · [curar](${curar}) | Mão, dano, verbo que não é o gesso |
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método: olho cola GE-; étimo corta |
| [Língua portuguesa](${lingua}) | Lapsos *ingessadado* · *direitto* |
| [Valeu !!!](${mantra}) | Depois do molde |

## Limites

- Não ensina a gessar, a reduzir fratura nem a escolher tipo de tala.  
- Não é ficha de *quebrado* nem de *braço* com página própria ainda.  
- *Geologia* fica cortada aqui e na [pedra](${pedra}); não ganha ciência nesta série.  
- Cimento, cal e giz são outros vocábulos.

## Status

**Aprovado na série Palavras** — *gesso* fichado como *γύψος*; o olho cola **GE-**ologia; o étimo corta; *quebrado* → *ingessado* (gatilho *ingessadado*) no **braço direito**.

[▶ Palavras](${hub}) · [▶ Pedra](${pedra}) · [▶ Etimologia](${etimologia}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **gesso** — gypsum that becomes paste, board, mould. Field request: *GEsso*, with **geologia**, **right arm**, **quebrado** and the slip **ingessadado**. Sister: **[pedra](${pedra})**.

> **Method note:** [Wiktionary · gesso](${WIKT}), Lat. [*gypsum*](${WIKT_GYPSUM}), Gk. [*γύψος*](${WIKT_GR}). **Not** an orthopedic protocol. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **gesso** |
| Etymon | Gk. *γύψος* → Lat. *gypsum* |
| Not | [pedra](${pedra}) (*πέτρα*) · **geologia** (*γῆ* + *λόγος*) |
| Body circuit | *quebrado* (from *crepāre*) → *ingessado* · **braço direito** |
| Slip | *ingessadado* = doubled *-da-* of *ingessado*; *direitto* = *direito* |
| Date | ${inspected} |

The eye glues **GE-**sso to **GE-**ologia; the etymon cuts. The working arm in a cast is craft paused — not a recipe. [Valeu !!!](${mantra})

## Status

**Approved in Words** — *γύψος*; GE- glue cut; broken → in plaster.

[▶ Words](${hub}) · [▶ Pedra](${pedra}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **gesso** — yeso que vira pasta, placa, molde. Pedido: *GEsso*, con **geologia**, **brazo derecho**, **quebrado** y el lapsus **ingessadado**. Hermana: **[pedra](${pedra})**.

> **Nota:** [Wikcionario · gesso](${WIKT}), lat. [*gypsum*](${WIKT_GYPSUM}). **No** es protocolo ortopédico. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **gesso** |
| Étimo | Gr. *γύψος* → lat. *gypsum* |
| No es | [pedra](${pedra}) (*πέτρα*) · **geologia** (*γῆ* + *λόγος*) |
| Circuito del cuerpo | *quebrado* → *ingessado* · **brazo derecho** |
| Lapsus | *ingessadado* · *direitto* |
| Fecha | ${inspected} |

El ojo pega **GE-**sso a **GE-**ología; el étimo corta. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *γύψος*; cola GE- cortada; quebrado → enyesado.

[▶ Palabras](${hub}) · [▶ Pedra](${pedra}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildGessoPost() {
  const { body, contentEn, contentEs } = buildGessoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-gesso', 241);
  return makePalavra({
    title: 'Inspeção: Gesso — γύψος; o olho cola geologia; braço direito ingessado',
    titleEn: 'Inspection: Gesso — γύψος; the eye glues geology; right arm in plaster',
    titleEs: 'Inspección: Gesso — γύψος; el ojo pega geología; brazo derecho enyesado',
    excerpt:
      'Palavras: gesso ← gr. γύψος — ≠ geologia (γῆ); quebrado → ingessado (gatilho ingessadado); braço direito; irmã pedra; Valeu !!!',
    excerptEn:
      'Words: gesso ← Gk. γύψος — ≠ geologia (γῆ); broken → in plaster (slip ingessadado); right arm; sister pedra; Valeu !!!',
    excerptEs:
      'Palabras: gesso ← gr. γύψος — ≠ geologia (γῆ); quebrado → enyesado (lapsus ingessadado); brazo derecho; hermana pedra; ¡Valeu !!!',
    slug: 'inspecao-palavra-gesso',
    date: '2026-08-22T18:31:00.000Z',
    seriesOrder,
    seriesLabel: 'Gesso · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGessoPost,
  buildGessoBodies
};
