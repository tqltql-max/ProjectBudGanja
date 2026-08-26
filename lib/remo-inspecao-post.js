'use strict';

/**
 * Inspeção Palavras · remo
 * Eixos: lat. remus · pá / remar ·
 * gatilho rEMO · ≠ REM (sono / sigla lab) ≠ ramo ·
 * barco / Tamara / Amyr · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/remo-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/remo';
const WIKT_REMAR = 'https://pt.wiktionary.org/wiki/remar';
const WIKT_LA = 'https://en.wiktionary.org/wiki/remus#Latin';

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

function buildRemoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-remo.html';
  const ramela = '/posts/post-inspecao-palavra-ramela.html';
  const remSleep = '/posts/post-inspecao-palavra-sinais-rem.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[remo](${self})**. Pedido de campo: *rEMO*. A orelha cola o **objecto de madeira** no **REM** do [sono](${remSleep}). O étimo **corta**. **Remo** é lat. *rēmus* — a pá com que se [rema](${WIKT_REMAR}). **REM** é sigla inglesa (*Rapid Eye Movement*) e, no lab, mapa de ofício. Duas salas.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · remo](${WIKT}), [remar](${WIKT_REMAR}), lat. [*rēmus*](${WIKT_LA}). **Ficha ≠ aula de canoagem, ≠ polissonografia.** A ficha [sinais REM](${remSleep}) já cobre o sono e a sigla lab. Esta cobre a **pá**. Sem afiliação desportiva.

**Gatilho tipográfico:** *rEMO* / *Remo* → **remo** (minúscula no Guia).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **remo** |
| Classe | Substantivo masculino · verbo **remar** |
| Étimo (trabalho) | Lat. *rēmus* «remo, pá» — confiança: **alta** |
| Família | *remar* · *remador* · *remada* · *birem* / *trirreme* (navio) |
| Tipo BudGanja | Palavra — objecto náutico × ≠ sigla REM |
| Não é | [sinais REM](${remSleep}) · *ramo* (galho) · Remo / Remo de Rómulo (mito) · [ramelento](${ramela}) |
| Elo mar | [barco](${barco}) · [mar](${mar}) · [navegar](${navegar}) |
| Elo pessoas | [Tamara](${tamara}) · [Amyr](${amyr}) — ofício de remar / ficar |
| Fonte | [remo](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** a **pá** que empurra água. [Relação](${relacao}): o *entre* o braço e o [barco](${barco}). [A orelha cola](${orelhaCola}); o étimo corta.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **remo** | REM / dormir a remar | Lat. *rēmus* — pá náutica |
| **REM** | O mesmo vocábulo em maiúsculas | Sigla EN + mapa lab — [sinais REM](${remSleep}) |
| **remar** | Dançar na água | Verbo do [gesto](${gesto}): puxar a pá |
| **ramo** | Homófono frouxo | Galho — outra sala |
| **Remo** (mito) | Nome próprio = o objecto | Gémeo de Rómulo — **não** esta ficha |
| **ramelento** | *remo lento* (pá vagarosa) | [Ramela](${ramela}) + *-ento* — cola de orelha; **outra ficha** |

**H1:** remo = *rēmus* (pá).  
**H2:** REM = sigla; não herda o latim *rēmus*.  
**H3:** *rEMO* é teclado, não étimo.  
**H4:** [Amyr](${amyr}) aprendeu a **remar**; o sono REM não rema.

## Dois ofícios

| Ofício | Onde | Resultado |
|--------|------|-----------|
| **Remar** | [Mar](${mar}) / rio / [barco](${barco}) | O casco anda; as [mãos](${maos}) puxam |
| **REM (sono)** | [Nap](${nap}) / noite | Os olhos mexem; o corpo não rema |
| **R·E·M lab** | [sinais REM](${remSleep}) | Mapa Relaxamento · Endocanabinoide · Modular |

No gelo de [*Bom dia, Inverno*](${bomDia}) o [barco](${barco}) **não** rema: fica. O remo é peça; a invernagem é outro [gesto](${gesto}).

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o objecto: remo, remada, remador |
| Bom | Cortar remo × REM quando a boca junta |
| Bom | Ler Amyr/Tamara como ofício náutico, não como sono |
| Mau | Fundir *rEMO* no dicionário do sono |
| Mau | Transformar a ficha em tutorial de remo |
| Mau | Tratar Remo (mito) como étimo da pá |

Fecho: [Valeu !!!](${mantra}) — remar o que é pá; dormir o que é REM.

## Status

**Aprovado na série Palavras** — *remo* (*rēmus*) ≠ REM; *rEMO* lido como gatilho.

[▶ Palavras](${hub}) · [▶ Barco](${barco}) · [▶ Sinais REM](${remSleep}) · [▶ Ramela](${ramela}) · [▶ Navegar](${navegar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **remo** (oar). Field request: *rEMO*. The ear glues the wooden blade to **REM** sleep. The etymon cuts. **Remo** ← Lat. *rēmus*. **REM** is an English acronym — already on [sinais REM](${remSleep}).

> **Method note:** [remo](${WIKT}). Not a rowing class. Not a sleep study.

## Object

| Field | Value |
|-------|-------|
| Word | **remo** |
| Etymon | Lat. *rēmus* |
| Verb | *remar* (to row) |
| Not | REM · *ramo* (branch) · Remus (myth) |
| Links | [barco](${barco}) · [navegar](${navegar}) · [Tamara](${tamara}) · [Amyr](${amyr}) |
| Date | ${inspected} |

Row the blade. Sleep the acronym. [Valeu !!!](${mantra})

## Status

**Approved in Words** — oar ≠ REM.
`;

  const contentEs = `## Alcance

Inspección de **remo** (remo / pala). Pedido: *rEMO*. La oreja pega la pala al **REM** del sueño. El étimo corta. **Remo** ← lat. *rēmus*. **REM** es sigla — ya en [sinais REM](${remSleep}).

> **Nota:** [remo](${WIKT}). No es clase de remo ni estudio de sueño.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **remo** |
| Étimo | lat. *rēmus* |
| Verbo | *remar* |
| No es | REM · *ramo* · Remo (mito) |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — pala ≠ sigla REM.
`;

  return { body, contentEn, contentEs };
}

function buildRemoPost() {
  const { body, contentEn, contentEs } = buildRemoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-remo', 224);
  return makePalavra({
    title: 'Inspeção: Remo — a pá, o remar, e o lapso rEMO',
    titleEn: 'Inspection: Remo — the oar, the rowing, and the slip rEMO',
    titleEs: 'Inspección: Remo — la pala, el remar, y el lapsus rEMO',
    excerpt:
      'Palavras: remo (lat. rēmus) ≠ REM (sono / sigla lab); gatilho rEMO; elos barco, Tamara, Amyr; Valeu !!!',
    excerptEn:
      'Words: remo (Lat. rēmus) ≠ REM (sleep / lab acronym); trigger rEMO; links boat, Tamara, Amyr; Valeu !!!',
    excerptEs:
      'Palabras: remo (lat. rēmus) ≠ REM (sueño / sigla lab); gatillo rEMO; vínculos barco, Tamara, Amyr; ¡Valeu !!!',
    slug: 'inspecao-palavra-remo',
    date: '2026-08-22T18:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Remo · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRemoPost,
  buildRemoBodies
};
