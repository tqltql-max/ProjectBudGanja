'use strict';

/**
 * Inspeção Palavras · Paraguai
 * Eixos: país · grafia Paraguay · lapso PARAGYACYY · ≠ Paraguaçu
 * Ficha de topónimo/país, não guia turístico nem manifesto de fronteira.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/paraguai-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Paraguai';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildParaguaiBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-paraguai.html';
  const paraguacu = '/posts/post-inspecao-palavra-paraguacu.html';
  const guerra = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const trofeus = '/posts/post-inspecao-palavra-trofeus-de-guerra.html';
  const canhao = '/posts/post-inspecao-palavra-canhao.html';
  const esapp = '/posts/post-inspecao-esapp-agronomia-paraguacu-paulista.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiEn = 'https://en.wikipedia.org/wiki/Paraguay';
  const wikt = 'https://en.wiktionary.org/wiki/Paraguay';

  const body = `## Escopo

Inspeção editorial da palavra **[Paraguai](${self})** — o **país** no mapa (castelhano / inglês **Paraguay**; guarani *Paraguái*). Pedido de campo: *INSPECAO PARAGYACYY*. O lab lê um **lapso de teclado** que mistura duas âncoras: **Paraguai** (república) e **[Paraguaçu](${paraguacu})** (topónimo brasileiro, incl. Paraguaçu Paulista / [ESAPP](${esapp})). Esta ficha cobre o **país**, a **grafia**, o **étimo contestado** e a **correção**: país ≠ município paulista. Elos: [Guerra do Paraguai](${guerra}), [troféus de guerra](${trofeus}), [canhão](${canhao}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Paraguai](${WIKI}), [EN](${wikiEn}), [Wiktionary · Paraguay](${wikt}). **Ficha ≠ guia de viagem, ≠ laudo de fronteira, ≠ história completa da guerra.** O étimo do nome é **disputado**. Sem afiliação a Estados.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Paraguai** (PT) |
| Formas vivas | **Paraguay** (ES/EN) · *Paraguái* (guarani) · lapso **PARAGYACYY** |
| Classe | Topónimo — Estado soberano |
| Capital | Assunção |
| Línguas oficiais | Castelhano e **guarani** |
| Étimo (trabalho) | Hipóteses em disputa (rio / povo Payaguá / *para-gua-y*) — confiança: **baixa–média** |
| Não é | [Paraguaçu](${paraguacu}) · [ESAPP](${esapp}) |
| Tipo BudGanja | Palavra — país × grafia × armadilha de nome |
| Elo conflito | [Guerra do Paraguai](${guerra}) · [troféus](${trofeus}) · [canhão](${canhao}) |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [língua portuguesa](${lingua}) |
| Fonte | [Paraguai](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do país**. A boca do lab pediu *Paraguay* / *PARAGYACYY*; a âncora escrita em PT é **Paraguai**.

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **País** | República do Paraguai — Estado no Cone Sul | Alta |
| **Grafia** | PT *Paraguai* · ES/EN *Paraguay* · guarani *Paraguái* | Alta |
| **Lapso PARAGYACYY** | Teclado a caminho de Paraguay **e** Paraguaçu | Alta (oralidade do lab) |
| **Étimo** | Várias etimologias populares; **sem** consenso único | Baixa–média |

**H1:** *Paraguay* no pedido = a mesma âncora **Paraguai**.  
**H2:** *PARAGYACYY* não é um terceiro país — é **duas fichas coladas**.  
**H3:** o étimo **não** decide a [Guerra do Paraguai](${guerra}).

## 3. Paraguai × Paraguaçu × guerra

| Forma | O que o lab lê |
|-------|----------------|
| **Paraguai** | País — esta ficha |
| **Paraguay** | Grafia internacional do **mesmo** país |
| **Paraguaçu** | Topónimo BR (rio / município) — ficha [Paraguaçu](${paraguacu}) |
| **Guerra do Paraguai** | Nome PT do conflito 1864–1870 — ficha [guerra](${guerra}) |
| **Canhão / troféus** | Objectos de memória — [canhão](${canhao}) · [troféus](${trofeus}) |

**H-nome:** quem escreve *Paraguayçu* ou *PARAGYACYY* misturou **país** e **topónimo paulista**.  
**H-guerra:** a guerra leva o nome do país; o município [Paraguaçu Paulista](${esapp}) **não** é o teatro da Tríplice Aliança.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Som** | Paraguai ≈ Paraguaçu | Dois mapas |
| **Guerra** | O nome do país *é* a guerra | A guerra é um [caminho](${caminho}) histórico; o país continua |
| **Troféu** | O bronze *é* o Paraguai | O bronze é [troféu](${trofeus}); o país é gente e território |
| **Teclado** | PARAGYACYY = palavra nova | Lapso — ler as duas fichas |

**Veredicto contraste:** parece um só vocábulo; são **país** e, no lapso, um **topónimo brasileiro**.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Paraguayçu / PARAGYACYY é o nome certo» | Âncora: **Paraguai** (país) ou **Paraguaçu** (BR) |
| «Paraguai = só a guerra» | O país não se reduz ao conflito |
| «Devolver o canhão apaga o Paraguai» | Objecto ≠ Estado; ver [canhão](${canhao}) |
| «Paraguaçu Paulista é no Paraguai» | São Paulo; ver [ESAPP](${esapp}) |

**Veredicto correção:** **Paraguai = país.** Paraguay = grafia. PARAGYACYY = lapso. Paraguaçu = outra ficha.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Estado** | «fui ao Paraguai» | Bom: país · Mau: colar à guerra sem recorte |
| **Grafia** | Paraguay | Bom: mesma âncora · Mau: achar que muda o mapa |
| **Guerra** | «Guerra do Paraguai» | Nome PT do conflito — ficha [guerra](${guerra}) |
| **Lapso** | PARAGYACYY | Bom: pedir inspeção · Mau: fundir com [Paraguaçu](${paraguacu}) |

## Hipóteses (síntese)

**H1:** âncora PT = **Paraguai**; *Paraguay* = boca internacional.  
**H2:** PARAGYACYY = Paraguai × [Paraguaçu](${paraguacu}).  
**H3:** étimo do nome ≠ veredicto da [guerra](${guerra}).  
**H4:** fecho [Faça o melhor!](${mantra}); ficha ≠ atlas.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Paraguaçu](${paraguacu}) · [ESAPP](${esapp}) | O nome que **não** é este país |
| [Guerra do Paraguai](${guerra}) · [Troféus](${trofeus}) · [Canhão](${canhao}) | Conflito e objectos |
| [Língua portuguesa](${lingua}) · [Verdade](${verdade}) · [Respeito](${respeito}) | Grafia e tom |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Limites

- Não ensina história diplomática completa.  
- Não escolhe uma etimologia como facto.  
- Não trata o país como sinónimo de [troféu](${trofeus}).

## Status

**Aprovado** — **Paraguai** fichado como país; **Paraguay** como grafia; **PARAGYACYY** como lapso rumo a [Paraguaçu](${paraguacu}); elos [guerra](${guerra}) e [canhão](${canhao}).

[▶ Palavras](${hub}) · [▶ Paraguaçu](${paraguacu}) · [▶ Guerra do Paraguai](${guerra}) · [▶ Canhão](${canhao}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **Paraguai** — the **country** (ES/EN **Paraguay**). Field slip **PARAGYACYY** mixes the country with Brazilian **[Paraguaçu](${paraguacu})**. The etymon is **disputed**. Links: [Paraguayan War](${guerra}), [war trophies](${trofeus}), [cannon](${canhao}), [Do your best!](${mantra}).

> Sources: [Paraguai](${WIKI}). **Not a travel guide. Not a border ruling.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Paraguai** · **Paraguay** |
| Not | [Paraguaçu](${paraguacu}) (Brazil) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** one mashed name.  
**Is:** country ≠ Brazilian toponym. The war is a [path](${caminho}), not the whole country.

## 3. Correction

**Paraguai = country.** If the mouth said PARAGYACYY, open this sheet **and** [Paraguaçu](${paraguacu}). Close with [Do your best!](${mantra}).

## Status

**Approved** — country sheet; slip separated.

[▶ Words](${hub}) · [▶ War](${guerra}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Paraguai** — el **país** (ES/EN **Paraguay**). El lapsus **PARAGYACYY** mezcla el país con el topónimo brasileño **[Paraguaçu](${paraguacu})**. El étimo está **en disputa**. Vínculos: [Guerra](${guerra}), [trofeos](${trofeus}), [cañón](${canhao}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [Paraguai](${WIKI}). **No es guía de viaje ni fallo de frontera.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Paraguai** · **Paraguay** |
| No es | [Paraguaçu](${paraguacu}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** un solo nombre aplastado.  
**Es:** país ≠ topónimo brasileño.

## 3. Corrección

**Paraguai = país.** Si la boca dijo PARAGYACYY, abrir esta ficha **y** [Paraguaçu](${paraguacu}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de país; lapsus separado.

[▶ Palabras](${hub}) · [▶ Guerra](${guerra}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildParaguaiPost() {
  const { body, contentEn, contentEs, wiki } = buildParaguaiBodies();
  const seriesOrder = pickOrder('inspecao-palavra-paraguai', 128);
  const post = makePalavra({
    title: 'Inspeção: Paraguai — o país, a grafia Paraguay e o lapso PARAGYACYY',
    titleEn: 'Inspection: Paraguai — the country, the spelling Paraguay, and the slip PARAGYACYY',
    titleEs: 'Inspección: Paraguai — el país, la grafía Paraguay y el lapsus PARAGYACYY',
    excerpt:
      'Palavras: «Paraguai» / Paraguay — país no Cone Sul; lapso PARAGYACYY mistura com Paraguaçu (BR); ≠ guerra nem canhão; Faça o melhor!',
    excerptEn:
      'Words: “Paraguai” / Paraguay — the country; slip PARAGYACYY mixes it with Brazilian Paraguaçu; ≠ the war or the cannon; Do your best!',
    excerptEs:
      'Palabras: «Paraguai» / Paraguay — el país; el lapsus PARAGYACYY lo mezcla con Paraguaçu (BR); ≠ la guerra ni el cañón; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-paraguai',
    date: '2026-08-20T04:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Paraguai · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildParaguaiPost, buildParaguaiBodies };
