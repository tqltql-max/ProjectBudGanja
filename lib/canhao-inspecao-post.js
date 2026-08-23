'use strict';

/**
 * Inspeção Palavras · Canhão (El Cristiano)
 * Eixos: lat. canna · peça de artilharia · sinos fundidos · troféu MHN
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/canhao-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/canh%C3%A3o';

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

function buildCanhaoBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-canhao.html';
  const trofeus = '/posts/post-inspecao-palavra-trofeus-de-guerra.html';
  const guerra = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const g1 = 'https://g1.globo.com/rj/rio-de-janeiro/noticia/2026/08/01/el-cristiano-governo-paraguaio-volta-a-pedir-canhao-que-esta-no-rio.ghtml';
  const globo = 'https://oglobo.globo.com/blogs/bela-megale/post/2026/08/lula-autoriza-devolucao-de-canhao-de-guerra-historico-pedido-pelo-paraguai.ghtml';
  const estadao = 'https://www.estadao.com.br/internacional/lula-sinalizou-a-mucio-aval-para-devolver-canhao-de-guerra-ao-paraguai/';
  const mhn = 'https://mhn.museus.gov.br/';

  const body = `## Escopo

Inspeção editorial da palavra **[canhão](${self})** e, neste circuito, do **objecto** **El Cristiano** (*El Cristiano* / Canhão Cristão) — peça de artilharia fundida no [Paraguai](${paraguai}) durante a [Guerra do Paraguai](${guerra}), com metal associado a **sinos de igrejas**, capturada como [troféu de guerra](${trofeus}) e exposta no **Museu Histórico Nacional** (Praça XV, Rio de Janeiro). Pedido de campo: *CANJÃO* → correção **CANHÃO**; *CANHÃO DO PARAGUAY*. O lab **não** dispara a peça: inspeciona o **tubo**, o **nome** e o **trâmite de devolução** (aval político relatado em **agosto de 2026**; entrega **sem data fechada** aqui). Elos: [fogo](${fogo}), [risco](${risco}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · canhão](${WIKI}), [G1 · 1 ago. 2026](${g1}), [O Globo · 18 ago. 2026](${globo}), [Estadão](${estadao}), [MHN](${mhn}). Massa (~12 t), tombamento IPHAN e «sinos» vêm da **imprensa e síntese pública** — não de laudo metalúrgico do lab. **Ficha ≠ manual de artilharia, ≠ decreto de destombamento.** Outros troféus pedidos por Assunção (p.ex. peças associadas a López) **não** cabem todos nesta ficha.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra âncora | **canhão** (lapso *canjão*) |
| Étimo (trabalho) | It. *cannone* < lat. *canna* («tubo / cana») — confiança: **alta** |
| Objecto âncora | **El Cristiano** — canhão / obuseiro paraguaio, [troféu](${trofeus}) da [Guerra do Paraguai](${guerra}) |
| Sítio público (ago. 2026) | [Museu Histórico Nacional](${mhn}), Rio — visitação relatada como gratuita no centenário |
| Trajecto relatado | Fundição em guerra (metal de culto → arma) → captura BR → acervo MHN (presença pública desde o séc. XX) → tombamento IPHAN (coleção; 2009 nas sínteses) → pedido paraguaio (>15 anos) → **aval** de devolução (relatos ago. 2026) |
| Tipo BudGanja | Palavra + [objecto](${objetos}) — tubo de [fogo](${fogo}) × memória |
| Data | ${inspected} |

**O que é o objecto:** um **canhão** (arma de tubo) que o lab trata como **peça de memória**, não como receita de tiro.

## 2. Palavra × peça × nome

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Canhão** | Arma de artilharia; étimo *canna* | Alta |
| **Canjão** | Homófono / lapso — **não** é a peça | Alta (campo) |
| **El Cristiano** | Nome da peça (metal de igreja → «cristão») | Alta como **nome público**; média como história de fundição em cada detalhe |
| **Troféu** | Espólio no museu do vencedor | Alta |
| **Devolução** | Autorizar ≠ entregar; falta destombamento / Itamaraty | Alta (processo aberto na imprensa) |

**H1:** o pedido *canjão* corrige-se para **canhão**.  
**H2:** El Cristiano é **um** [troféu](${trofeus}), não toda a [guerra](${guerra}).  
**H3:** «já devolveram» é **falso** enquanto não houver acto público de entrega datado.

## 3. O que parece × o que é

| Camada | Parece | É |
|--------|--------|---|
| **Sinos** | O canhão *é* a igreja | É metal **recontado** como vindo de sinos — arma, não templo |
| **Museu** | História encerrada | História **em trâmite** diplomático |
| **12 toneladas** | Número ritual | Cifra de **imprensa**; conferir no acervo |
| **Nome Cristiano** | Bênção | Nome de **peça** — o [respeito](${respeito}) não pede culto ao tubo |

**Veredicto contraste:** parece tesouro que prova 1870; é um [objecto](${objetos}) de [fogo](${fogo}) parado, com dono contestado.

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Canjão do Paraguay» | **Canhão**; país **[Paraguai](${paraguai})** / grafia *Paraguay* |
| «O canhão é a guerra» | A [guerra](${guerra}) é o conflito; o canhão é [troféu](${trofeus}) |
| «Lula já mandou o camião» | Relatos de **aval**; entrega = outro passo |
| «Fica no Rio = [verdade](${verdade}) BR» | Sítio de exposição ≠ tribunal da história |

**Veredicto correção:** **canhão = tubo.** El Cristiano = caso. Devolução = processo. *Canjão* = lapso.

## Hipóteses (síntese)

**H1:** *canhão* < *canna*; *canjão* = boca.  
**H2:** El Cristiano liga [Paraguai](${paraguai}), [guerra](${guerra}) e [troféus](${trofeus}).  
**H3:** ago. 2026 = autorização relatada, não fecho.  
**H4:** fecho [Valeu !!!](${mantra}) — o melhor é **não disparar a ficha como hino**.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Troféus de guerra](${trofeus}) | A categoria |
| [Guerra do Paraguai](${guerra}) · [Paraguai](${paraguai}) | O conflito e o país |
| [Objectos](${objetos}) · [Fogo](${fogo}) · [Risco](${risco}) | Matéria |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a operar artilharia.  
- Não lista todo o espólio pedido por Assunção.  
- Não substitui o MHN nem o IPHAN.

## Status

**Aprovado** — **canhão** fichado (étimo + peça **El Cristiano**); *canjão* corrigido; devolução como **trâmite**, não como feito.

[▶ Palavras](${hub}) · [▶ Troféus](${trofeus}) · [▶ Guerra do Paraguai](${guerra}) · [▶ Paraguai](${paraguai}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **canhão** (“cannon”; slip *canjão*) and the piece **El Cristiano** — a Paraguayan gun, church-bell metal in public telling, [war trophy](${trofeus}) from the [Paraguayan War](${guerra}), at Brazil’s National Historical Museum (Rio). Aug 2026 reports: return **authorized**, delivery **not dated here**.

## Correction

A cannon is a tube. The trophy is not the whole war. *Canjão* is a slip. Close with [Valeu !!!](${mantra}).

## Status

**Approved.** Date ${inspected}.
`;

  const contentEs = `## Alcance

Inspección de **canhão** (lapsus *canjão*) y la pieza **El Cristiano** — cañón paraguayo, metal de campanas en el relato público, [trofeo](${trofeus}) de la [Guerra del Paraguay](${guerra}), en el Museo Histórico Nacional (Río). Ago. 2026: devolución **autorizada**, entrega **sin fecha aquí**.

## Corrección

El cañón es un tubo. El trofeo no es toda la guerra. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada.** Fecha ${inspected}.
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildCanhaoPost() {
  const { body, contentEn, contentEs, wiki } = buildCanhaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-canhao', 132);
  const post = makePalavra({
    title: 'Inspeção: Canhão — El Cristiano, o lapso canjão e o troféu ainda no Rio',
    titleEn: 'Inspection: Canhão — El Cristiano, the slip canjão, and the trophy still in Rio',
    titleEs: 'Inspección: Canhão — El Cristiano, el lapsus canjão y el trofeo aún en Río',
    excerpt:
      'Palavras: canhão (*canna*); peça El Cristiano da Guerra do Paraguai; troféu no MHN; devolução autorizada (ago. 2026) ≠ entrega; Valeu !!!',
    excerptEn:
      'Words: cannon (*canna*); El Cristiano from the Paraguayan War; MHN trophy; return authorized (Aug 2026) ≠ delivery; Valeu !!!',
    excerptEs:
      'Palabras: cañón (*canna*); El Cristiano de la Guerra del Paraguay; trofeo en el MHN; devolución autorizada (ago. 2026) ≠ entrega; ¡Valeu !!!',
    slug: 'inspecao-palavra-canhao',
    date: '2026-08-20T04:28:00.000Z',
    seriesOrder,
    seriesLabel: 'Canhão · palavra',
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

module.exports = { buildCanhaoPost, buildCanhaoBodies };
