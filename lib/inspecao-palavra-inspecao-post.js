'use strict';

/**
 * Inspeção Palavras · inspeção
 * Eixos: lat. inspectio ← inspicere (in- + specere «olhar») ·
 * vocábulo × hub × Inspetor ·
 * a orelha cola incisão (caedere) · Valeu !!!
 * Gatilho: inpeção → inspeção
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/inspecao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/inspe%C3%A7%C3%A3o';
const WIKT_INSPICERE = 'https://en.wiktionary.org/wiki/inspicio#Latin';
const WIKT_INSPECTIO = 'https://en.wiktionary.org/wiki/inspectio#Latin';
const WIKT_INCISIO = 'https://en.wiktionary.org/wiki/incisio#Latin';

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

function buildInspecaoPalavraBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-inspecao.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const eminente = '/posts/post-inspecao-palavra-eminente.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const inspetor = '/posts/post-inspecao-personagem-inspetor.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[inspeção](${self})** — o vocábulo que **nomeia o ofício**. Pedido de campo: **«inspeção em <Inspeção>»**. O arquivo vive em [Inspeções](${hubAll}); esta ficha cobre **o nome do gesto**. Não é o hub. Não é o [Inspetor](${inspetor}). É o substantivo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · inspeção](${WIKT}), lat. [*inspectio*](${WIKT_INSPECTIO}) / [*inspiciō*](${WIKT_INSPICERE}). **Ficha ≠ vistoria sanitária, ≠ auditoria contabilística, ≠ perícia forense.** Série [Palavras](${hub}) = lugar das fichas; esta página = a **palavra do método**. Sem afiliação institucional.

**Gatilho:** *inpeção* / *<Inspeção>* → **inspeção**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **inspeção** (pl. *inspeções*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *inspectio* ← *inspicere* — *in-* («para dentro») + *specere* / *spicere* («olhar») — confiança: **alta** |
| Família | *inspecionar* · *inspetor* · *inspectoria* · ing. *inspection* · esp. *inspección* · fr. *inspection* · *aspecto* · [respeito](${respeito}) (*respicere*) |
| Tipo BudGanja | Palavra — ofício × arquivo × personagem |
| Não é | **incisão** (lat. *incisio* ← *caedere*, **cortar**) · [inspiração](${inspiracao}) (*spīrāre*, **soprar**) · o [hub](${hubAll}) · o [Inspetor](${inspetor}) |
| Elo método | [etimologia](${etimologia}) · [palavra](${palavra}) · [sugestão](${sugestao}) · [verdade](${verdade}) · [gesto](${gesto}) |
| Elo orelha | [orelha](${orelha}) · [a orelha cola…](${orelhaCola}) · [eminente](${eminente}) (par ilusório irmão) |
| Elo série | Hub [Inspeções](${hubAll}) · [Guia](${guia}) · fecho [ufa](${ufa}) / [Valeu !!!](${mantra}) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que diz «olhar **para dentro** com método e **publicar** o que se viu». No laboratório: cada ficha *é* uma inspeção; esta pergunta o **nome**.

## O que a orelha cola — e o étimo corta

O pedido *inpeção em incisão* já colou as duas. Mesmo *in-*; verbos distintos.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **inspeção** | «Cortar / abrir para ver» | *in-* + *specere* — **olhar** para dentro |
| **incisão** | O mesmo ofício | *in-* + *caedere* — **cortar** para dentro |
| **[inspiração](${inspiracao})** | Prima de prefixo | *in-* + *spīrāre* — **soprar** para dentro |
| **Inspeções** (hub) | A palavra em maiúsculas | [Arquivo](${hubAll}) — **lugar**, não o étimo |
| **[Inspetor](${inspetor})** | A mesma raiz | *inspector* — **quem** olha; personagem / marca |
| **vistoria / auditoria / perícia** | Sinónimos de ofício | Mapas vizinhos (visita, contas, laudo) — **não** esta ficha |

**H1:** *inspeção* < *inspectio* < *inspicere* — olhar **para dentro** (alta).  
**H2:** *incisão* < *incisio* < *incidere* — cortar **para dentro** (alta). A [orelha cola](${orelhaCola}); o [étimo](${etimologia}) corta.  
**H3:** *<Inspeção>* no pedido é **citação do objecto**; não funde o vocábulo com o [hub](${hubAll}).  
**H4:** [respeito](${respeito}) (*respicere*, olhar de novo) é primo; não substitui a inspeção.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ofício lab** | Olhar, anotar, publicar a ficha | Alta (mapa do site) |
| **Arquivo** | [Inspeções](${hubAll}) — a prateleira no plural | Alta |
| **Agente** | [Inspetor](${inspetor}) — quem exerce o ofício | Alta noutro mapa |
| **Institucional** | Vistoria, fiscalização, inspeção do trabalho | Alta noutro mapa — citar, não fundir |
| **Pedido de campo** | [Sugestão](${sugestao}) vira inspeção quando ganha objecto e [gesto](${gesto}) | Alta (fila do lab) |

## Inspeção × hub × Inspetor × incisão

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[inspeção](${self})** | Esta ficha — o vocábulo | O **gesto** nomeado |
| **Inspeções** | [Hub](${hubAll}) | A **lista** de gestos publicados |
| **[Inspetor](${inspetor})** | Personagem / marca | **Quem** olha |
| **[palavra](${palavra})** | A unidade lexical | O que a inspeção de Palavras toma por objecto |
| **[sugestão](${sugestao})** | A fila | Pede uma inspeção; ainda não é a inspeção |
| **incisão** | Corte físico / figura | Outro étimo; ficha própria **ainda não** |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Fichar **um** objecto por página; olhar com [verdade](${verdade}); publicar |
| Bom | Dizer «hub Inspeções» quando se fala do [arquivo](${hubAll}) |
| Bom | Depois do relatório: [ufa](${ufa}) se o peito aliviar; [Valeu !!!](${mantra}) sempre |
| Mau | Fundir vocábulo, hub, personagem e incisão num só sopro |
| Mau | Tratar inspeção como se viesse de *caedere* (corte) |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* palavra *hoje*: olhar para dentro; não cortar o nome no ouvido.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Palavra](${palavra}) · [etimologia](${etimologia}) · [sugestão](${sugestao}) | Método da série |
| [A orelha cola…](${orelhaCola}) · [eminente](${eminente}) | Tesoura de som × origem |
| [Inspetor](${inspetor}) · Hub [Inspeções](${hubAll}) | Agente e arquivo |
| [Inspiração](${inspiracao}) | Prima *in-* (sopro, não olhar) |
| [Ufa](${ufa}) · [Valeu !!!](${mantra}) · [Guia](${guia}) | Depois do olhar |

## Limites

- Não é manual de vistoria nem código de inspeção do trabalho.  
- Não inventaria todas as séries do hub.  
- *Incisão* fica **cortada nesta ficha**; não ganha página própria ainda.  
- *inpeção* = gatilho tipográfico; não é étimo.

## Status

**Aprovado na série Palavras** — *inspeção* fichada como *inspicere* (olhar para dentro); o arquivo fica no [hub](${hubAll}); a [orelha cola](${orelhaCola}) *incisão*; o étimo corta.

[▶ Palavras](${hub}) · [▶ Hub Inspeções](${hubAll}) · [▶ Inspetor](${inspetor}) · [▶ Etimologia](${etimologia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **inspeção** — the vocable that **names the craft**. Field request: *inspection of <Inspeção>*. The archive lives on [Inspections](${hubAll}); this sheet inspects **the name of the gesture**. Not the hub. Not the [Inspector](${inspetor}).

> **Method note:** [Wiktionary](${WIKT}), Lat. [*inspectio*](${WIKT_INSPECTIO}) / [*inspiciō*](${WIKT_INSPICERE}). **Not** a sanitary visit or forensic report.

**Trigger:** *inpeção* → **inspeção**.

## Object

| Field | Value |
|-------|-------|
| Word | **inspeção** |
| Etymon | Lat. *inspectio* ← *inspicere* (*in-* + *specere* “to look”) |
| Not | **incisão** (*caedere*, to cut) · [inspiração](${inspiracao}) (*spīrāre*) · the [hub](${hubAll}) · the [Inspector](${inspetor}) |
| Method | [etymology](${etimologia}) · [the ear glues…](${orelhaCola}) |
| Date | ${inspected} |

The ear glues *inspeção* to *incisão* (same *in-*; look vs cut). After the report: [ufa](${ufa}) if the chest eases; [Valeu !!!](${mantra}) always.

## Status

**Approved in Words** — look inward (*inspicere*); archive on the [hub](${hubAll}); ear-glue to *incisão* cut.

[▶ Words](${hub}) · [▶ Inspections](${hubAll}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **inspeção** — el vocablo que **nombra el oficio**. Pedido: *inspección de <Inspeção>*. El archivo vive en [Inspecciones](${hubAll}); esta ficha cubre **el nombre del gesto**. No es el hub. No es el [Inspector](${inspetor}).

> **Nota:** [Wikcionario](${WIKT}), lat. [*inspectio*](${WIKT_INSPECTIO}). **No** es vistoria sanitaria ni pericia.

**Gatillo:** *inpeção* → **inspeção**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **inspeção** |
| Étimo | Lat. *inspectio* ← *inspicere* (*in-* + *specere* «mirar») |
| No es | **incisão** (*caedere*, cortar) · [inspiração](${inspiracao}) (*spīrāre*) · el [hub](${hubAll}) · el [Inspector](${inspetor}) |
| Método | [etimología](${etimologia}) · [el oído pega…](${orelhaCola}) |
| Fecha | ${inspected} |

El oído pega *inspeção* a *incisão* (mismo *in-*; mirar × cortar). Después del informe: [ufa](${ufa}) si el pecho alivia; [¡Valeu !!!](${mantra}) siempre.

## Estado

**Aprobada en Palabras** — mirar hacia dentro (*inspicere*); archivo en el [hub](${hubAll}); cola de oído con *incisão* cortada.

[▶ Palabras](${hub}) · [▶ Inspecciones](${hubAll}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildInspecaoPalavraPost() {
  const { body, contentEn, contentEs } = buildInspecaoPalavraBodies();
  const seriesOrder = pickOrder('inspecao-palavra-inspecao', 231);
  return makePalavra({
    title: 'Inspeção: Inspeção — o vocábulo que nomeia o ofício',
    titleEn: 'Inspection: Inspeção — the vocable that names the craft',
    titleEs: 'Inspección: Inspeção — el vocablo que nombra el oficio',
    excerpt:
      'Palavras: inspeção ← lat. inspectio / inspicere (olhar para dentro) — o vocábulo, não o hub; ≠ incisão ≠ Inspetor; Valeu !!!',
    excerptEn:
      'Words: inspeção ← Lat. inspectio / inspicere (look inward) — the vocable, not the hub; ≠ incisão ≠ Inspector; Valeu !!!',
    excerptEs:
      'Palabras: inspeção ← lat. inspectio / inspicere (mirar hacia dentro) — el vocablo, no el hub; ≠ incisão ≠ Inspector; ¡Valeu !!!',
    slug: 'inspecao-palavra-inspecao',
    date: '2026-08-22T18:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Inspeção · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInspecaoPalavraPost,
  buildInspecaoPalavraBodies
};
