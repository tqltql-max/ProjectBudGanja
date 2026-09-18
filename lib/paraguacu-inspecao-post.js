'use strict';

/**
 * Inspeção Palavras · Paraguaçu
 * Eixos: topónimo Tupi · Paraguaçu Paulista · ≠ Paraguai / Paraguay
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/paraguacu-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Paragua%C3%A7u_Paulista';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
  } catch (_) {
    /* keep */
  }
  return seriesOrder;
}

function buildParaguacuBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-paraguacu.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const guerra = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const esapp = '/posts/post-inspecao-esapp-agronomia-paraguacu-paulista.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const rio = 'https://pt.wikipedia.org/wiki/Rio_Paragua%C3%A7u';
  const wikiMun = WIKI;

  const body = `## Escopo

Inspeção editorial da palavra **[Paraguaçu](${self})** — topónimo de origem **tupi**, vivo no Brasil em rios e municípios (entre eles **Paraguaçu Paulista**, SP). O pedido *PARAGYACYY* cola este nome ao país **[Paraguai](${paraguai})**. O lab **separa**: Paraguaçu é **mapa brasileiro**; Paraguai é **Estado**. Elo local do laboratório: [ESAPP](${esapp}) (Agronomia em Paraguaçu Paulista). Elos: [língua portuguesa](${lingua}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Paraguaçu Paulista](${wikiMun}), [Rio Paraguaçu](${rio}). **Ficha ≠ guia municipal, ≠ história completa da [Guerra do Paraguai](${guerra}).** Étimo tupi: hipóteses; **não** forçar uma tradução única.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Paraguaçu** |
| Formas vivas | *paraguacu* (sem cedilha) · *Paraguayçu* (confusão com o país) |
| Classe | Topónimo |
| Família no mapa | Rio Paraguaçu (BA) · municípios homónimos · **Paraguaçu Paulista** (SP) |
| Elo lab | [ESAPP](${esapp}) — Escola Superior de Agronomia de Paraguaçu Paulista |
| Não é | [Paraguai](${paraguai}) · Paraguay · teatro da Tríplice Aliança |
| Tipo BudGanja | Palavra — lugar BR × armadilha com o país |
| Data | ${inspected} |

**O que é o objecto:** o **nome de lugar** brasileiro. O *ç* marca a boca portuguesa; o país vizinho escreve-se **Paraguai** / *Paraguay*, sem *ç*.

## 2. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Topónimo tupi** | Composto indígena reanalisado em PT (*açu* / *guaçu* = «grande» em várias leituras) | Média (família); baixa na glosa exacta |
| **Rio (BA)** | Curso d'água na Bahia — [Rio Paraguaçu](${rio}) | Alta (existência) |
| **Município SP** | Paraguaçu Paulista — oeste paulista; [ESAPP](${esapp}) | Alta |
| **Armadilha** | Som parecido com [Paraguai](${paraguai}) | Alta (lab) |

**H1:** *paraguacu* sem cedilha = a mesma âncora **Paraguaçu**.  
**H2:** *Paraguayçu* é **contaminação** da grafia *Paraguay*.  
**H3:** a [ESAPP](${esapp}) fica neste mapa, **não** no da [guerra](${guerra}).

## 3. O que parece × o que é

| Camada | Parece | É |
|--------|--------|---|
| **Ouvido** | «é o Paraguai» | Município / rio **no Brasil** |
| **Guerra** | o nome puxa o canhão | A guerra tem ficha [própria](${guerra}) e país [próprio](${paraguai}) |
| **Escola** | agronomia «paraguaia» | [ESAPP](${esapp}) em **Paraguaçu Paulista** |

**Veredicto contraste:** parece o país; é **topónimo brasileiro**.

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Paraguaçu = Paraguai» | Dois mapas |
| «A ESAPP fica no Paraguai» | Fica em **Paraguaçu Paulista** — [ESAPP](${esapp}) |
| «PARAGYACYY resolve os dois» | Abre **duas** fichas: esta e [Paraguai](${paraguai}) |

**Veredicto correção:** **Paraguaçu = lugar BR.** País = [Paraguai](${paraguai}).

## Hipóteses (síntese)

**H1:** âncora **Paraguaçu**; teclado *paraguacu*.  
**H2:** ≠ [Paraguai](${paraguai}).  
**H3:** elo local [ESAPP](${esapp}).  
**H4:** fecho [Faça o melhor!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Paraguai](${paraguai}) | O país que o som imita |
| [ESAPP](${esapp}) | Escola no município |
| [Guerra do Paraguai](${guerra}) | Outro objecto — não colar |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Status

**Aprovado** — **Paraguaçu** fichado como topónimo BR; separado de [Paraguai](${paraguai}); elo [ESAPP](${esapp}).

[▶ Palavras](${hub}) · [▶ Paraguai](${paraguai}) · [▶ ESAPP](${esapp}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **Paraguaçu** — a Brazilian **Tupi toponym** (river, towns, including Paraguaçu Paulista). The slip PARAGYACYY mixes it with the country **[Paraguai](${paraguai})**. Lab link: [ESAPP](${esapp}). **Not** the Paraguayan War theatre.

## Correction

**Paraguaçu = Brazilian place.** Country = [Paraguai](${paraguai}). Close with [Do your best!](${mantra}).

## Status

**Approved.** Date ${inspected}.

[▶ Words](${hub}) · [▶ Paraguai](${paraguai})
`;

  const contentEs = `## Alcance

Inspección de **Paraguaçu** — **topónimo tupí** brasileño (río, municipios, Paraguaçu Paulista). El lapsus PARAGYACYY lo mezcla con el país **[Paraguai](${paraguai})**. Vínculo del lab: [ESAPP](${esapp}).

## Corrección

**Paraguaçu = lugar BR.** País = [Paraguai](${paraguai}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada.** Fecha ${inspected}.

[▶ Palabras](${hub}) · [▶ Paraguai](${paraguai})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildParaguacuPost() {
  const { body, contentEn, contentEs, wiki } = buildParaguacuBodies();
  const seriesOrder = pickOrder('inspecao-palavra-paraguacu', 129);
  const post = makePalavra({
    title: 'Inspeção: Paraguaçu — topónimo brasileiro, Paraguaçu Paulista e o som que não é o país',
    titleEn: 'Inspection: Paraguaçu — Brazilian place-name, Paraguaçu Paulista, and the sound that is not the country',
    titleEs: 'Inspección: Paraguaçu — topónimo brasileño, Paraguaçu Paulista y el sonido que no es el país',
    excerpt:
      'Palavras: «Paraguaçu» — lugar BR (tupi); Paraguaçu Paulista e ESAPP; ≠ Paraguai / Paraguay; lapso PARAGYACYY; Faça o melhor!',
    excerptEn:
      'Words: “Paraguaçu” — Brazilian place; ESAPP in Paraguaçu Paulista; ≠ Paraguay; slip PARAGYACYY; Do your best!',
    excerptEs:
      'Palabras: «Paraguaçu» — lugar BR; ESAPP en Paraguaçu Paulista; ≠ Paraguay; lapsus PARAGYACYY; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-paraguacu',
    date: '2026-08-20T04:22:00.000Z',
    seriesOrder,
    seriesLabel: 'Paraguaçu · palavra',
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

module.exports = { buildParaguacuPost, buildParaguacuBodies };
