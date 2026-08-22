'use strict';

/**
 * Inspeção Palavras · colchão
 * Eixos: culcita · colcha · ação de dormir ·
 * tudo o que parece (cola, colar, chão, conexão) ·
 * Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/colchao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/colch%C3%A3o';
const WIKT_COLCHA = 'https://pt.wiktionary.org/wiki/colcha';
const WIKT_CULCITA = 'https://en.wiktionary.org/wiki/culcita';

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

function buildColchaoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-colchao.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const rem = '/posts/post-inspecao-palavra-sinais-rem.html';
  const benca = '/posts/post-inspecao-expressao-a-benca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[colchão](${self})** — o **chão mole da ação de dormir**. Pedido de campo: *colchão* × **tudo o que parece** ([cola](${cola}), colar, colcha, chão, [conexão](${conexao})). A orelha cola; o étimo corta. O ofício desta ficha é o **sono**: deitar, dormir, [noite](${noite}), [nap](${nap}), [sinais REM](${rem}). Fecho: [Valeu !!!](${mantra}) — também **ao deitar**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · colchão](${WIKT}), [colcha](${WIKT_COLCHA}), lat. [culcita](${WIKT_CULCITA}). **Ficha ≠ laudo de colchão, ≠ protocolo de insónia.** Palavra ≠ móvel de marca. Sem afiliação comercial.

**Gatilho tipográfico:** *colchao* / *COLCHÃO* → **colchão**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **colchão** |
| Classe | Substantivo masculino |
| Ofício | Superfície onde se **dorme** |
| Étimo (trabalho) | lat. *culcita* «almofada / colchão» → PT *colcha* + aumentativo **-ão** — confiança: **alta** |
| Família verdadeira | **colcha** (cobre-cama) · *colchoaria* · *colchoeiro* |
| Família da orelha | [cola](${cola}) · colar · chão · [conexão](${conexao}) |
| Tipo BudGanja | Palavra — objecto do sono × mapa do que parece |
| Elo dormir | [noite](${noite}) · [nap](${nap}) · [sinais REM](${rem}) · [a bença](${benca}) (*dorme com Deus*) |
| Elo peito | [gesto](${gesto}) · [alma](${alma}) · [vida](${vidaPalavra}) · [verdade](${verdade}) |
| Fonte | [colchão](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **leito macio**. Não é a [cama](${guia}) inteira (armação); é a peça onde o corpo **deita** para a ação **dormir**.

## 2. Ação de dormir

**H1:** *colchão* nomeia o **sítio** da ação; *dormir* nomeia a **ação**. Sem misturar as fichas: aqui o objecto é a palavra do sítio.  
**H2:** [noite](${noite}) é o tempo; [nap](${nap}) é o sono curto; [sinais REM](${rem}) é o campo do sono paradoxal — o colchão serve os três, não os define.  
**H3:** [a bença](${benca}) fecha o dia com *dorme com Deus* — o colchão é onde essa frase pousa.

| Peça | Ofício | Nesta ficha |
|------|--------|-------------|
| **Dormir** | A ação | O que o colchão **recebe** |
| **Sono** | O estado | O que se busca em cima dele |
| **Cama** | A armação | Outro objecto — o colchão deita *na* cama |
| **Colchão** | A superfície | Âncora |
| **[Noite](${noite})** | A fase | Quando o ofício é deitar |
| **[Nap](${nap})** | Cochilo | Pode ser no colchão ou fora |
| **[REM](${rem})** | Marca do sono | Não é marca do tecido |

**Leitura:** deitar no colchão é [gesto](${gesto}) de [vida](${vidaPalavra}). [Valeu !!!](${mantra}) **também** é dormir o suficiente para o ofício de amanhã.

## 3. Tudo o que parece (orelha cola, étimo corta)

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **[cola](${cola}) / colar** | O mesmo *col-* | Grude / jóia / pipa — [outra ficha](${cola}) · lat. *colla* / *collum* |
| **cola + chão** | *colchão* = «grude no piso» | **Etimologia popular** — recusada. Avô = *culcita*, não cola |
| **colcha** | Quase a mesma palavra | **Família verdadeira** — o cobertor; o colchão é o aumentativo / a peça de deitar |
| **chão** | A segunda metade ouvida | Piso. O colchão **não** é o chão; é o que **separa** o corpo do chão |
| **[conexão](${conexao})** | *conectar + ação* · soa a -ção | **conexão** (com **x**) — [ficha irmã](${conexao}) · não é colchão |
| **[link](${link}) / Klink** | Elo / sobrenome Tamara | Outro mapa de [relação](${relacao}) — não é colchão |

**H4:** o laboratório lista o que **parece** para não fundir. Como na [aglutinação](${aglutinacao}): a solda do ouvido ≠ origem.  
**H5:** *colchão* e *colcha* **sim** partilham avô (*culcita*). *Cola* **não**.

## 4. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *culcita* | Almofada, colchão recheado | Alta |
| PT *colcha* | Cobre-cama da mesma raiz | Alta |
| *colcha* + **-ão** | Peça maior / o leito | Alta (forma PT) |
| cola + chão | Folk | **Recusada** |
| Cognatos | esp. *colchón* · *colcha* · fr. *coussin* (almofada, mesma *culcita*) | Alta |

**Veredicto etimológico:** **colchão** = família da *culcita*. A orelha que ouve [cola](${cola}) está a inspecionar **outra** palavra.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Dormir** | «cair no colchão», «virar o colchão» | Bom: âncora da ação |
| **Tipo** | molas, espuma, látex, inflável | Bom como léxico · mau como anúncio |
| **Metáfora** | «colchão financeiro», amortecer | Bom se declarado: amortecedor, não cama |
| **Camping / inflável** | colchão de ar | Ainda é superfície de sono — outro material |
| **Cola** | «é a mesma família da cola» | Mau: étimo errado |

## 6. Valeu !!!

A forma canónica do laboratório é **[Valeu !!!](${mantra})** (pedido de campo *faça o seu melhor* = o mesmo ofício). No colchão:

| Camada | Ligação |
|--------|---------|
| Mantra | Dormir **também** é ofício — o melhor possível **hoje**, inclusive deitar |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Dormir é preguiça» = falso · «pausa que devolve o [gesto](${gesto})» = ofício |
| Par vivo | [nap](${nap}) · [noite](${noite}) · [alma](${alma}) · [vida](${vida}) |

**Veredicto:** Valeu !!! **também ao deitar**. Colchão inspecionado ≠ culto do colchão; é literacia do sono.

## Hipóteses (síntese)

**H1:** objecto = superfície da ação **dormir**.  
**H2:** étimo = *culcita* → *colcha* → *colchão*.  
**H3:** tudo o que parece ([cola](${cola}), chão, [conexão](${conexao})) = mapa, não fusão.  
**H4:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Cola / colar](${cola}) | O que **parece** e não é |
| [Conexão](${conexao}) | *conectar + -ção* — grafia com **x** |
| [Link · Klink](${link}) | Outro «parece» (Tamara) |
| [Noite](${noite}) · [nap](${nap}) · [REM](${rem}) · [a bença](${benca}) | Ação / tempo / marcas / fecho do dia |
| [Relação](${relacao}) · [aglutinação](${aglutinacao}) | O *entre* e a solda falsa |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Fecho |
| [Guia](${guia}) · [hub](${hubAll}) | Solo |

## Limites

- Não é teste de colchão nem conselho médico de sono.  
- *Cama* e *travesseiro* ficam nomeados, não fichados aqui.  
- Folk cola+chão só se recusa, não se ensina como origem.

## Status

**Aprovado** — **colchão** fichado como sítio da ação **dormir**; família *culcita* / *colcha*; mapa do que parece; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Cola](${cola}) · [▶ Conexão](${conexao}) · [▶ Noite](${noite}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **colchão** (mattress) — the soft ground of the **act of sleeping**. Lookalikes: [cola](${cola}) (glue), *chão* (floor), [conexão](${conexao}). The ear glues; the etymon (*culcita*) cuts. Close: [Valeu !!!](${mantra}) — also by lying down.

> Independent audit. [Wiktionary · colchão](${WIKT}). Not a product review or sleep protocol.

## Object

| Field | Value |
|-------|-------|
| Word | **colchão** |
| Craft | Surface of **sleeping** |
| True family | **colcha** (bedspread) ← Lat. *culcita* |
| False family | glue + floor |
| Date | ${inspected} |

**Verdict:** mattress ≠ glue. Sleeping on it is craft. Valeu !!! **also** by sleeping.

## Status

**Approved** — sleep-site word filed; lookalikes mapped; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Glue](${cola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **colchão** (colchón) — el suelo blando de la **acción de dormir**. Lo que parece: [cola](${cola}), chão, [conexão](${conexao}). El oído pega; el étimo (*culcita*) corta. Cierre: [¡Valeu !!!](${mantra}) — también al acostarse.

> Auditoría independiente. [Wikcionario · colchão](${WIKT}). No es ficha de marca ni protocolo de sueño.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **colchão** |
| Oficio | Superficie de **dormir** |
| Familia verdadera | **colcha** ← lat. *culcita* |
| Fecha | ${inspected} |

## Estado

**Aprobada** — sitio del dormir fichado; lo parecido mapeado; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Cola](${cola}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildColchaoPost() {
  const { body, contentEn, contentEs, wiki } = buildColchaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-colchao', 173);
  const post = makePalavra({
    title: 'Inspeção: Colchão — a ação de dormir e tudo o que parece (cola, colcha, chão)',
    titleEn: 'Inspection: Colchão — the act of sleeping and everything that looks like it (glue, quilt, floor)',
    titleEs: 'Inspección: Colchão — la acción de dormir y todo lo que parece (cola, colcha, suelo)',
    excerpt:
      'Palavras: colchão — sítio de dormir (culcita/colcha); ≠ cola+chão; mapa do que parece; Valeu !!! também ao deitar.',
    excerptEn:
      'Words: colchão — sleep surface (culcita); ≠ glue+floor; lookalike map; Valeu !!! also by lying down.',
    excerptEs:
      'Palabras: colchão — sitio de dormir (culcita); ≠ cola+suelo; mapa de lo parecido; Valeu !!! también al acostarte.',
    slug: 'inspecao-palavra-colchao',
    date: '2026-08-21T20:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Colchão · palavra',
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

module.exports = { buildColchaoPost, buildColchaoBodies };
