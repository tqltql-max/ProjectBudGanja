'use strict';

/**
 * Inspeção Palavras · Paraty (cidade)
 * Eixos: tupi parati'y «rio dos paratis» · grafia Parati × Paraty × Paratii ·
 * peixe ≠ município ≠ veleiro Amyr · Tamara (Lorient / Recife → Paraty)
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/paraty-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Paraty';
const PREF = 'https://www.paraty.rj.gov.br/';

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

function buildParatyBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-paraty.html';
  const paraguacu = '/posts/post-inspecao-palavra-paraguacu.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const peixe = '/posts/post-inspecao-palavra-animal.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const siteTamara = '/posts/post-inspecao-site-tamaraklink.html';
  const groenlandia = '/posts/post-inspecao-palavra-groenlandia.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const navarro =
    'https://pt.wikipedia.org/wiki/Paraty#Top%C3%B4nimo';

  const body = `## Escopo

Inspeção editorial da **cidade** **[Paraty](${self})** (RJ) — e do **topónimo**. Pedido de campo: *Parati* · *topónimo significado*. A âncora oficial é **Paraty** (com *y*). A boca e o correio ainda dizem **Parati**. O veleiro de [Amyr](${amyr}) chama-se **Paratii**. Três grafias; **um** rio de peixes no étimo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Paraty](${WIKI}) (topónimo: Eduardo Navarro, *Dicionário de tupi antigo*, 2013 — *parati'y*), [Prefeitura](${PREF}). **Ficha ≠ guia turístico, ≠ história colonial completa, ≠ bula de pesca.** Indexar ≠ endosso municipal. Sem afiliação.

**Gatilho:** *Parati* / *PARATI* / *Paratii* → município **Paraty**.

## Topónimo — o significado

| Peça tupi | Leitura de trabalho | Confiança |
|-----------|---------------------|-----------|
| *parati* | O **peixe** (mugilídeo / «parati»; família das tainhas) — **não** a mandioca homónima, segundo Navarro | Alta (Navarro); média se alguém insistir na mandioca |
| *'y* | **Rio** / água que corre (tupi antigo) | Alta (família toponímica) |
| *parati'y* | **Rio dos paratis** | Alta (Navarro, 2013) |

**O que o nome diz:** o lugar onde o **parati** sobe o rio a desovar — costa da [mar](${mar}) que ainda entrega o peixe ao inverno. O município herda o **rio dos peixes**; não herda o país [Paraguai](${paraguai}) nem o [Paraguaçu](${paraguacu}).

**Gentílico:** **paratiense** (com *i*). Cidade com *y*; gente com *i* — como *Bahia* / *baiano*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Paraty** (RJ) |
| Pedido | *Parati* |
| Classe | Topónimo · município |
| Étimo (trabalho) | Tupi antigo *parati'y* «rio dos paratis» — confiança: **alta** (Navarro) |
| Grafias vivas | *Paraty* (oficial, lei municipal 1.553/2007) · *Parati* (1943–2007 / oral) · *Paratii* (veleiro [Amyr](${amyr})) |
| Tipo BudGanja | Palavra — cidade × peixe × barco |
| Elo náutico | [Tamara](${tamara}) (Lorient / Recife → Paraty) · [Amyr](${amyr}) (*Paratii*) · [barco](${barco}) · [navegar](${navegar}) |
| Não é | [Paraguai](${paraguai}) · [Paraguaçu](${paraguacu}) · [Groenlândia](${groenlandia}) |
| Fonte | [Paraty](${WIKI}) · [topónimo](${navarro}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do lugar** na Costa Verde. [A orelha cola](${orelhaCola}) cidade, peixe e veleiro. O étimo corta: primeiro o **rio dos paratis**.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Paraty** | Capricho de *y* | Grafia oficial do município (2007) |
| **Parati** | Erro | Grafia da reforma de 1943; ainda viva na boca; **o mesmo lugar** |
| **parati** (peixe) | A cidade em minúscula | O **peixe** que dá o primeiro morfo do topónimo |
| **Paratii** | Terceira cidade | Nome do **[barco](${barco})** de [Amyr](${amyr}) — homenagem ao lugar, não o mapa IBGE |
| **[Paraguai](${paraguai})** | Mesmo *para-* | País — outro mapa |
| **[Paraguaçu](${paraguacu})** | Mesmo início | Topónimo BR *guaçu* — outro rio |

**H1:** significado = **rio dos paratis** (*parati* + *'y*).  
**H2:** *Parati* no pedido = a cidade; o lab ancora **Paraty**.  
**H3:** *Paratii* = veleiro; não duplica o município.  
**H4:** paratiense leva *i*.

## Camadas da cidade (sem virar guia)

| Camada | Leitura | Limite desta ficha |
|--------|---------|-------------------|
| **Peixe / rio** | Étimo vivo na baía | ≠ receita, ≠ stock de pesca |
| **Porto colonial** | Vila 1667; pedra e maré | ≠ monografia de ouro / café |
| **Património** | Centro histórico (UNESCO, conjunto) | Catalogar ≠ visita guiada |
| **Família Klink** | [Amyr](${amyr}) *Paratii*; [Tamara](${tamara}) chega a Paraty na costa BR | Pessoa ≠ cidade |
| **[Caminho](${caminho})** | Destino de travessia (Atlântico / Recife → Paraty) | ≠ GPS |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Dizer **Paraty** no mapa; **Parati** quando a boca do pedido chega |
| Bom | Nomear o étimo: rio dos **paratis** |
| Bom | Separar o veleiro **Paratii** |
| Mau | Fundir com [Paraguai](${paraguai}) / [Paraguaçu](${paraguacu}) |
| Mau | Tratar o *y* como enfeite sem lei nem boca indígena |
| Mau | Reduzir a cidade a cartão-postal ou a «filha de Amyr» |

Fecho: [Valeu !!!](${mantra}) — o rio dos peixes, com [respeito](${respeito}) ao nome.

## Status

**Aprovado na série Palavras** — cidade **Paraty**; significado **rio dos paratis**; *Parati* lido como gatilho.

[▶ Palavras](${hub}) · [▶ Tamara](${tamara}) · [▶ Amyr](${amyr}) · [▶ Site Tamara](${siteTamara}) · [▶ Mar](${mar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the city **Paraty** (Rio de Janeiro) and its **toponym**. Field request: *Parati*. Official spelling **Paraty**. Spoken/postal **Parati**. Amyr Klink’s yacht **Paratii**.

> **Method note:** [Wikipedia · Paraty](${WIKI}). Eduardo Navarro (2013): Old Tupi *parati'y* “river of the parati (mullet)”. Not a tourist guide.

## Toponym

| Piece | Meaning |
|-------|---------|
| *parati* | the fish (Mugilidae) |
| *'y* | river |
| *parati'y* | **river of the paratis** |

Gentilic: **paratiense** (with *i*). [Valeu !!!](${mantra})

## Status

**Approved in Words** — city Paraty; meaning river of paratis; *Parati* is the trigger.
`;

  const contentEs = `## Alcance

Inspección de la ciudad **Paraty** (RJ) y su **topónimo**. Pedido: *Parati*. Grafía oficial **Paraty**. El velero de Amyr: **Paratii**.

> **Nota:** [Wikipedia · Paraty](${WIKI}). Navarro (2013): tupí antiguo *parati'y* «río de los paratis».

## Topónimo

| Pieza | Sentido |
|-------|---------|
| *parati* | el pez |
| *'y* | río |
| *parati'y* | **río de los paratis** |

Gentilicio: **paratiense**. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — ciudad Paraty; significado río de los paratis.
`;

  return { body, contentEn, contentEs };
}

function buildParatyPost() {
  const { body, contentEn, contentEs } = buildParatyBodies();
  const seriesOrder = pickOrder('inspecao-palavra-paraty', 225);
  return makePalavra({
    title: 'Inspeção: Paraty — rio dos paratis, a cidade, e o gatilho Parati',
    titleEn: 'Inspection: Paraty — river of the paratis, the town, and the trigger Parati',
    titleEs: 'Inspección: Paraty — río de los paratis, la ciudad, y el gatillo Parati',
    excerpt:
      'Cidade: Paraty (RJ). Topónimo tupi parati\'y = rio dos paratis. Parati = gatilho; Paratii = veleiro Amyr. ≠ Paraguai. Valeu !!!',
    excerptEn:
      'City: Paraty (RJ). Tupi parati\'y = river of the paratis. Parati = trigger; Paratii = Amyr’s yacht. ≠ Paraguay. Valeu !!!',
    excerptEs:
      'Ciudad: Paraty (RJ). Tupí parati\'y = río de los paratis. Parati = gatillo; Paratii = velero de Amyr. ≠ Paraguay. ¡Valeu !!!',
    slug: 'inspecao-palavra-paraty',
    date: '2026-08-22T18:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Paraty · cidade',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildParatyPost,
  buildParatyBodies
};
