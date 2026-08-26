'use strict';

/**
 * Inspeção Palavras · balançar × balança × peso
 * Eixos: gesto de oscilar · instrumento bilanx · pensum ·
 * gatilho BAÇANÇAR · ≠ balancear · ≠ dieta · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/balancar-palavra-cover.jpg';
const WIKT_BALANCAR = 'https://pt.wiktionary.org/wiki/balançar';
const WIKT_BALANCA = 'https://pt.wiktionary.org/wiki/balan%C3%A7a';
const WIKT_PESO = 'https://pt.wiktionary.org/wiki/peso';
const WIKT_BALANCO = 'https://pt.wiktionary.org/wiki/balan%C3%A7o';
const WIKT_BILANX = 'https://en.wiktionary.org/wiki/bilanx#Latin';
const WIKT_PENDERE = 'https://en.wiktionary.org/wiki/pendere#Latin';

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

function buildBalancarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-balancar.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const objetosHub = '/objetos/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const meneia = '/posts/post-inspecao-palavra-meneia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const impressao = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra-objecto **[balançar](${self})**. Pedido de campo: *objeto balançar* · *relacione com balança* · *e peso*. O objecto desta ficha é o **gesto**: ir de um lado ao outro, como o prato que oscila. [A orelha cola](${orelhaCola}) o verbo no **instrumento** (**balança**) e no **quanto** (**peso**). O étimo **corta** em três salas, uma [relação](${relacao}).

> **Nota metodológica:** auditoria independente. Fontes: [balançar](${WIKT_BALANCAR}), [balança](${WIKT_BALANCA}), [peso](${WIKT_PESO}), [balanço](${WIKT_BALANCO}), lat. [*bilanx*](${WIKT_BILANX}), [*pendere*](${WIKT_PENDERE}). **Ficha ≠ dieta, ≠ «brigar com a balança», ≠ tabela de kg, ≠ manual de metrologia.** Sem protocolo clínico. Entra no catálogo [Objetos](${objetosHub}) como **gesto nomeado**, irmão de [objetos](${objetos}).

**Gatilho:** *BAÇANÇAR* / *balancar* / *balançar* → **balançar**. *Balança* e *peso* são elos, não o lema.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **balançar** |
| Classe | Verbo · o [gesto](${gesto}) de oscilar |
| Étimo (trabalho) | De *balanço* / *balança* ← lat. *bilanx* (*bi-* + *lanx* «prato») — confiança: **alta** |
| Instrumento (elo) | **balança** — os dois pratos |
| Quanto (elo) | **peso** ← lat. *pensum* / *pendere* «pendurar, pesar» |
| Tipo BudGanja | Palavra-objecto — gesto × ≠ instrumento × ≠ kg |
| Não é | *balancear* (equilíbrio) · *balanço* contabilístico · dieta |
| Elo gesto | [meneia](${meneia}) (mão/corpo; outro étimo) · [mãos](${maos}) |
| Elo vivo | [barco](${barco}) no [mar](${mar}) — o casco também balança |
| Fonte | [balançar](${WIKT_BALANCAR}) |
| Data | ${inspected} |

**O que é o objecto:** **balançar** = o movimento. **Balança** = a **coisa** de dois pratos. **Peso** = o que a balança **lê** (e, antes, o que *pende*). Três frases.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **balançar** | A balança a trabalhar | Verbo — [gesto](${gesto}) de ir e voltar |
| **balança** | O mesmo que balançar | Instrumento (*bilanx*) — [objeto](${objetos}) de dois pratos |
| **peso** | O que a balança «é» | *Pendere* — o quanto / o que pende; não o gesto |
| **balancear** | Sinónimo | Outro verbo — pôr em **equilíbrio**; não é oscilar |
| **balanço** | Só o movimento | Nome: oscilação **ou** conta (património) — segunda sala |
| **BAÇANÇAR** | Étimo com ç | Teclado / boca — lê-se **balançar** |
| **[meneia](${meneia})** | O mesmo balanço | Outro étimo (*mão*); irmã rítmica, não esta ficha |
| **brigar com a balança** | Esta inspeção | Fala de corpo/dieta — **não** o objecto |

**H1:** balançar herda o **prato que oscila** (*bilanx*), não o número no visor.  
**H2:** balança = instrumento; peso = leitura (*pendere*).  
**H3:** *BAÇANÇAR* não muda o lema.  
**H4:** [meneia](${meneia}) meneia; balançar balança — dois gestos, dois étimos.

## Três ofícios

| Peça | Étimo | Ofício |
|------|-------|--------|
| **balançar** | *bilanx* via *balanço* | O [gesto](${gesto}): berço, rede, [barco](${barco}), corpo |
| **balança** | lat. *bilanx* | A coisa: dois pratos (ou o sensor que os imita) |
| **peso** | lat. *pendere* / *pensum* | O quanto pende; também fardo; a moeda *peso* é **outra sala** |

A balança **mostra** peso porque os pratos **balançam** até parar. O verbo nomeia o caminho; o instrumento nomeia a peça; o peso nomeia o resultado. [Pressão](${impressao}) aperta; peso pende. Sem fundir.

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o gesto: balançar o corpo, o [barco](${barco}), a rede |
| Bom | Cortar balança (peça) e peso (quanto) quando a boca junta |
| Bom | Mandar *balancear* e o balanço da firma para outras salas |
| Mau | Transformar a ficha em dieta ou «ideal de kg» |
| Mau | Fundir com [meneia](${meneia}) porque ambos oscilam |
| Mau | Tratar *BAÇANÇAR* como étimo |

Fecho: [Valeu !!!](${mantra}) — balançar o gesto; a balança os pratos; o peso o que pende. Sem [risco](${risco}) de colar dieta no étimo.

## Status

**Aprovado na série Palavras** — *balançar* (gesto) × *balança* (instrumento) × *peso* (*pendere*).

[▶ Palavras](${hub}) · [▶ Objetos](${objetosHub}) · [▶ Meneia](${meneia}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **balançar** (to swing / rock) as a word-object. Field: relate to **balança** (scale) and **peso** (weight). The ear glues the gesture to the instrument and to the number. The etymon cuts three rooms: *bilanx* (two pans) for the scale and the swing-verb; *pendere* (“to hang, to weigh”) for weight.

> **Method note:** [balançar](${WIKT_BALANCAR}), [balança](${WIKT_BALANCA}), [peso](${WIKT_PESO}). Not a diet sheet. Not a metrology class.

## Object

| Field | Value |
|-------|-------|
| Word | **balançar** — the gesture |
| Instrument | **balança** ← Lat. *bilanx* |
| Quantity | **peso** ← Lat. *pendere* / *pensum* |
| Not | *balancear* (to equilibrate) · “fighting the scale” · currency *peso* |
| Sister | [meneia](${meneia}) — other etymon |
| Date | ${inspected} |

Swing the gesture. Weigh on the pans. [Valeu !!!](${mantra})

## Status

**Approved in Words** — swing ≠ scale ≠ weight.
`;

  const contentEs = `## Alcance

Inspección de **balançar** (balancear / mecer) como palabra-objeto. Pedido: relacionar con **balança** (báscula) y **peso**. La oreja pega el gesto al instrumento y al número. El étimo corta tres salas: *bilanx* (dos platos); *pendere* («colgar, pesar»).

> **Nota:** [balançar](${WIKT_BALANCAR}), [balança](${WIKT_BALANCA}), [peso](${WIKT_PESO}). No es ficha de dieta.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **balançar** — el gesto |
| Instrumento | **balança** ← lat. *bilanx* |
| Cantidad | **peso** ← lat. *pendere* |
| No es | *balancear* (equilibrar) · dieta · moneda *peso* |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — gesto ≠ báscula ≠ peso.
`;

  return { body, contentEn, contentEs };
}

function buildBalancarPost() {
  const { body, contentEn, contentEs } = buildBalancarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-balancar', 229);
  return makePalavra({
    title: 'Inspeção: Balançar — o gesto, a balança e o peso',
    titleEn: 'Inspection: Balançar — the gesture, the scale, and the weight',
    titleEs: 'Inspección: Balançar — el gesto, la báscula y el peso',
    excerpt:
      'Palavras: balançar (gesto, *bilanx*) × balança (instrumento) × peso (*pendere*); gatilho BAÇANÇAR; ≠ dieta ≠ meneia; Valeu !!!',
    excerptEn:
      'Words: balançar (gesture, *bilanx*) × scale × weight (*pendere*); slip BAÇANÇAR; ≠ diet ≠ meneia; Valeu !!!',
    excerptEs:
      'Palabras: balançar (gesto, *bilanx*) × báscula × peso (*pendere*); lapsus BAÇANÇAR; ≠ dieta ≠ meneia; ¡Valeu !!!',
    slug: 'inspecao-palavra-balancar',
    date: '2026-08-22T18:55:00.000Z',
    seriesOrder,
    seriesLabel: 'Balançar · palavra-objecto',
    coverImage: COVER,
    sourceUrl: WIKT_BALANCAR,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildBalancarPost, buildBalancarBodies };
