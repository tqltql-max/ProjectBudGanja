'use strict';

/**
 * Inspeção Palavras · vomitar
 * Lat. vomitare / vomere — expulsar o que não fica.
 * Tríade: tónos (segurar) → vomitar (largar) → commitar (gravar).
 * Ficha ≠ protocolo clínico nem incentivo a purga.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/vomitar-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/vomitar';

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

function buildVomitarBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-vomitar.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const tonico = '/posts/post-inspecao-palavra-tonico.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const xiv = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiLa = 'https://en.wiktionary.org/wiki/vomito#Latin';
  const wikiVomere = 'https://en.wiktionary.org/wiki/vomo#Latin';
  const wikiEn = 'https://en.wiktionary.org/wiki/vomit';

  const body = `## Escopo

Inspeção editorial da palavra **[vomitar](${self})** — verbo (lat. *vomitare*, frequentativo de *vomere*). Pedido de campo: **[tónos](${tonos})**, **vomitar**, **[commitar](${commitar})**. Aqui o gesto é **largar o que não fica** — corpo, mito, metáfora de texto — **sem** fundir ofícios nem virar protocolo clínico.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · vomitar](${WIKI}), [vomitō](${wikiLa}), [vomō](${wikiVomere}), [vomit](${wikiEn}), aula do [XIV](${xiv}) (Vasuk / Shiva). **Ficha ≠ diagnóstico, bula antiemética, incentivo a purga nem despejo de texto.** Tom: literacia; [respeito](${respeito}) ao corpo.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **vomitar** |
| Classe | Verbo transitivo / intransitivo |
| Étimo (trabalho) | Lat. *vomere* «expulsar pela boca» → frequentativo *vomitare* → PT **vomitar** — confiança **alta** |
| Família | *vómito* · *vômito* · *emese* (técnico) · EN *vomit* · ES *vomitar* |
| Tipo BudGanja | Palavra — expulsão × tríade de ofício |
| Elo tríade | [tónos](${tonos}) (segurar) · [commitar](${commitar}) (gravar) |
| Elo tensão | [tônico](${tonico}) — crise tônico-clónica pode incluir vómito (**literacia, não diagnóstico**) |
| Elo mito / curso | [XIV](${xiv}) — a cobra ia vomitar o veneno; Shiva bebe — **mito ≠ receita** |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [Faça o melhor!](${mantra}) |
| Fonte | [vomitar](${WIKI}) |
| Data | ${inspected} |

**Objeto:** o vocábulo de **expulsar o que o corpo (ou o rasto) não deve guardar**. No lab: largar o tóxico **não** é despejar lixo no commit.

## 2. Hipóteses e método

**H1:** *vomitar* no PT é herdado latino — não gíria recente.  
**H2:** a metáfora («vomitar código», «vomitar discurso») é **expulsão sem filtro**; no lab isso é mau [gesto](${gesto}) até passar por [verdade](${verdade}).  
**H3:** na tríade, vomitar vem **depois** de [tónos](${tonos}) (saber o que aperta) e **antes** de [commitar](${commitar}) (gravar o que fica).  
**H4:** o [XIV](${xiv}) cita o veneno da cobra como **narrativa**; esta ficha **não** prescreve nada.

Passos: étimo → ofícios (corpo / metáfora / mito / lab) → tríade → limites.

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **1. Corpo** | Êmese — reflexo de defesa | Protocolo clínico nesta ficha |
| **2. Metáfora de fala** | Despejar palavras / dados / código | Licença para lixo no rasto |
| **3. Mito ([XIV](${xiv}))** | A cobra ia vomitar veneno; Shiva contém | Receita, yoga clínico ou dogma |
| **4. Ofício lab** | Largar o que envenena a ficha (hype, lapso, veneno de retaliação) | «Vomitar» o working tree inteiro no git |

**H5:** tensão ([tónos](${tonos})) que **não** se nomeia vira explosão; explosão sem [commitar](${commitar}) não deixa rasto útil.

## 4. Tríade de ofício

| Peça | Gesto | Mau uso |
|------|-------|---------|
| **[tónos](${tonos})** | Segurar — onde aperta | Engolir a tensão até rebentar |
| **[vomitar](${self})** | Largar o que não fica | Purga vazia / dump sem [verdade](${verdade}) |
| **[commitar](${commitar})** | Gravar o que fica | Commitar o vómito (ruído) |

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Nojo só** | Palavra «feia» | Verbo de **defesa** + metáfora de rasto |
| **Igual a despejar** | Qualquer output | Expulsão **selectiva** — o que não deve ficar |
| **Aula XIV** | Conselho médico | Mito de contenção do veneno — [risco](${risco}) literário |
| **Tônico-clónico** | A ficha diagnostica | Só elo de literacia com [tônico](${tonico}) |

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear a expulsão** | Corpo, nojo, urgência | Esta ficha |
| **Filtrar o rasto** | Não engolir veneno | Largar hype / lapso **antes** do [commitar](${commitar}) |
| **Ler o mito** | Shiva / Vasuk no [XIV](${xiv}) | Contenção ≠ prescrição |
| **Fechar** | Depois da náusea, o acto | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[tónos](${tonos})** | Tensão que antecede o largo |
| **[commitar](${commitar})** | Gravar o que sobrou limpo |
| [tônico](${tonico}) | Crise / tónus — literacia |
| [XIV](${xiv}) | Veneno da cobra — mito |
| [verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) | Filtro antes do rasto |
| [língua portuguesa](${lingua}) · [Faça o melhor!](${mantra}) · [Guia](${guia}) · [Vida](${vida}) | Índice e fecho |

## Limites

- Não é aconselhamento médico, obstétrico ou psiquiátrico.  
- Não incentiva purga, vómito induzido nem «limpeza» de marketing.  
- Não trata o mito do [XIV](${xiv}) como protocolo.  
- Grafia *vomitar* = o objecto; *vómito* / *vômito* = o substantivo irmão.

## Veredicto

**Aprovado na série Palavras** — *vomitar* fichado como **largar o que não fica** (corpo × metáfora × mito × ofício); tríade [tónos](${tonos}) · [commitar](${commitar}); fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ XIV](${xiv}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[vomitar](${self})** (Lat. *vomitare* / *vomere*). Field request: **[tónos](${tonos})**, **vomitar**, **[commitar](${commitar})**. Here the gesture is **release what must not stay** — body, myth, text metaphor — without fusing offices or becoming a clinical protocol.

> Independent audit. **Sheet ≠ diagnosis, antiemetic leaflet, or licence to dump text.**

## Object

| Field | Value |
|-------|-------|
| Word | **vomitar** |
| Etymon | Lat. *vomere* → *vomitare* → PT **vomitar** — **high** confidence |
| Links | [tónos](${tonos}) · [commitar](${commitar}) · [tônico](${tonico}) · [UNIFESP XIV](${xiv}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Offices (keep apart)

1. **Body** — emesis as defence; not a protocol here.  
2. **Speech metaphor** — dumping words/code; bad [gesture](${gesto}) until [truth](${verdade}) filters it.  
3. **Myth in [XIV](${xiv})** — the snake about to vomit poison; Shiva contains it — **myth ≠ recipe**.  
4. **Lab office** — drop what poisons the sheet **before** [commitar](${commitar}).

**Verdict:** release after [tónos](${tonos}), before the commit; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[vomitar](${self})** (lat. *vomitare* / *vomere*). Pedido: **[tónos](${tonos})**, **vomitar**, **[commitar](${commitar})**. El gesto es **soltar lo que no debe quedarse** — cuerpo, mito, metáfora de texto — sin fusionar oficios ni volverse protocolo clínico.

> Auditoría independiente. **Ficha ≠ diagnóstico, prospecto ni licencia para volcar texto.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **vomitar** |
| Étimo | Lat. *vomere* → *vomitare* → PT **vomitar** — confianza **alta** |
| Vínculos | [tónos](${tonos}) · [commitar](${commitar}) · [tônico](${tonico}) · [XIV](${xiv}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Oficios (separar)

1. **Cuerpo** — emesis como defensa; no hay protocolo aquí.  
2. **Metáfora** — vomitar palabras/código; mal [gesto](${gesto}) hasta filtrar con [verdad](${verdade}).  
3. **Mito en el [XIV](${xiv})** — la serpiente iba a vomitar veneno; Shiva lo contiene — **mito ≠ receta**.  
4. **Oficio lab** — soltar lo que envenena la ficha **antes** de [commitar](${commitar}).

**Veredicto:** soltar después de [tónos](${tonos}), antes del commit; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildVomitarPost() {
  const { body, contentEn, contentEs, wiki } = buildVomitarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-vomitar', 146);
  return makePalavra({
    title: 'Inspeção: Vomitar — largar o que não fica, antes do commit',
    titleEn: 'Inspection: Vomitar — release what must not stay, before the commit',
    titleEs: 'Inspección: Vomitar — soltar lo que no queda, antes del commit',
    excerpt:
      'Palavras: «vomitar» (lat. vomitare) — corpo × metáfora × mito XIV; tríade tónos / commitar; Faça o melhor!',
    excerptEn:
      'Words: “vomitar” (Lat. vomitare) — body × metaphor × XIV myth; triad tónos / commitar; Do your best!',
    excerptEs:
      'Palabras: «vomitar» (lat. vomitare) — cuerpo × metáfora × mito XIV; tríada tónos / commitar; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-vomitar',
    date: '2026-08-20T23:06:00.000Z',
    seriesOrder,
    seriesLabel: 'Vomitar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildVomitarPost, buildVomitarBodies };
