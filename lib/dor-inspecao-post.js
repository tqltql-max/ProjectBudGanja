'use strict';

/**
 * Inspeção Palavras · dor
 * Eixos: lat. dolōrem ← dolēre · doer / doído / doido ·
 * ≠ pain (lat. poena) · ≠ algos · labravra · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/dor-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/dor';
const WIKT_DOER = 'https://pt.wiktionary.org/wiki/doer';
const WIKT_DOIDO = 'https://pt.wiktionary.org/wiki/doido';
const WIKT_LA = 'https://en.wiktionary.org/wiki/dolor#Latin';
const WIKT_DOLEO = 'https://en.wiktionary.org/wiki/doleo#Latin';
const WIKT_POENA = 'https://en.wiktionary.org/wiki/poena#Latin';
const WIKT_ALGOS = 'https://en.wiktionary.org/wiki/%E1%BC%84%CE%BB%CE%B3%CE%BF%CF%82#Ancient_Greek';
const WIKT_PAIN = 'https://en.wiktionary.org/wiki/pain';

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

function buildDorBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-dor.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const alivio = '/posts/post-inspecao-palavra-alivio.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const pressao = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const calor = '/posts/post-inspecao-palavra-calor-frio.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const inspecaoHub = '/biblioteca/inspecoes/';

  const body = `## Escopo

Inspeção editorial da palavra **[dor](${self})** — o **peso que se sente** no corpo e no ânimo. Pedido de campo: *inspção da labravra Dor*. [A orelha cola](${orelhaCola}) o **lab** em *palavra* (*labravra*) e come o *e* de [inspeção](${inspecaoHub}). O étimo **corta**: *dor* vem de *dolēre*; o inglês *pain* vem de *poena* (a [pena](#pena-nao-dor)).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · dor](${WIKT}), [doer](${WIKT_DOER}), [doido](${WIKT_DOIDO}), lat. [*dolor*](${WIKT_LA}) / [*doleō*](${WIKT_DOLEO}), [*poena*](${WIKT_POENA}), gr. [*álgos*](${WIKT_ALGOS}), ing. [*pain*](${WIKT_PAIN}). **Ficha ≠ protocolo clínico, ≠ dose, ≠ analgesia.** Nomear a palavra ≠ tratar a pessoa. Série [Palavras](${hub}). Sem afiliação médica.

**Gatilho:** *inspção* / *labravra* / *Dor* / *doer* / *doído* / *doido*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **dor** (pl. *dores*) |
| Classe | Substantivo feminino — *a* dor |
| Étimo (trabalho) | lat. *dolōrem* (acus. de *dolor*) ← *dolēre* «doer, lastimar-se» — confiança: **alta** |
| Família | *doer* · *doído* · *doido* · *doente* · *doença* · *doloroso* · *condolência* · *indolente* · esp. *dolor* · fr. *douleur* · it. *dolore* |
| Tipo BudGanja | Palavra — o sentir que pesa × o verbo *doer* × o falso amigo *pain* |
| Não é | [alívio](${alivio}) (tornar leve) · [curar](${curar}) (tratar / secar) · **pena** (*poena*) · **álgos** (grego da analgesia) |
| Elo corpo | [gesso](${gesso}) · [pressão](${pressao}) · [calor × frio](${calor}) · [risco](${risco}) |
| Elo sopro | [ufa](${ufa}) — o sopro *depois*; a dor é o que *estava* |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo do **magoar-se**. *Doer* é o verbo (*dói-me*). *Doído* é o particípio. *Doido* é o mesmo particípio que o português mandou para o juízo. Não é o inglês *pain*. Não é o laboratório colado na [palavra](${palavra}).

## O que a orelha cola — e o étimo corta

O pedido escreveu *inspção da labravra Dor*. Três peças, uma sala.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **inspção** | Palavra nova | Lapso de [inspeção](${inspecaoHub}) — falta o *e* |
| **labravra** | Palavra nova / *lab* + vocábulo | [Palavra](${palavra}) com o **laboratório colado** no *p*. O ofício não substitui o objecto |
| **Dor** | Marca, acrónimo, ouro (*d'or*) | Substantivo *dor* — *dolōrem* |
| **doer** | Ing. *doer* (quem faz) | Verbo PT ← *dolēre* — *dói* |
| **doído** | Só o corpo | Particípio de *doer* — quem *dói* |
| **doido** | Outra família | O **mesmo** particípio, ofício de juízo / «maluco» — [a orelha](${orelhaCola}) nem precisa de colar; a língua já fendeu o sentido |
| **pain** | Tradução óbvia de *dor* | lat. *poena* «castigo» — irmã de **pena**, não de *dolor* |
| **analgésico** | «anti-dor» do mesmo étimo | gr. *álgos* — **outra** linhagem. O corte é o mapa, não o farmacêutico |

**H1:** *dor* < lat. *dolōrem* < *dolēre* — confiança alta. PIE (*delh₁-* «cortar / lavrar», par de *dolāre*) fica **aberta**.  
**H2:** *doer* é o verbo da mesma casa; *me dói* não é *I do*.  
**H3:** ing. *pain* < fr. *peine* < *poena* — **pena / punição**. Traduzir *dor* por *pain* é uso vivo; **fundir os étimos** é erro de ofício.  
**H4:** *doído* (corpo) e *doido* (juízo) partilham o particípio; dois ofícios, uma raiz.  
**H5:** *labravra* cataloga o lab a colar-se no vocábulo; a ficha inspecciona **dor**, não o laboratório.

<span id="pena-nao-dor"></span>

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Corpo** | O que *dói* — dente, dorso, parto, queimadura | Alta |
| **Ânimo** | Dor de ausência, de ofensa, de luto (*condolência*) | Alta |
| **Doente / doença** | Quem *dói* / o estado — mesma família *dolēre* | Alta |
| **Indolente** | *in-* + *dolens* — que não dói / que não se move | Alta (mapa); **≠** insulto de ofício |
| **Doido** | Juízo «ferido» — extensão do particípio | Alta no uso; ficha **não** diagnostica |
| **Pena** | Castigo, dó, pena de escrever — *poena* / outros étimos | Alta no **corte**; não é esta ficha |
| **Clínica** | Sintoma que se nomeia; o [alívio](${alivio}) baixa; a [cura](${curar}) trata | Alta no mapa; **≠** receita |
| **Via Dolorosa / N. Sra. das Dores** | Camada de culto e caminho — *dolorosa* = cheia de *dolor* | Alta no nome; **≠** tratado teológico |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *dor* (*dolor*) × *pain* (*poena*) × *álgos* (grego) |
| Bom | Mandar o peso que baixa para [alívio](${alivio}); o sopro para [ufa](${ufa}); o trato para [curar](${curar}) |
| Bom | Nomear *doído* × *doido* sem fundir corpo e juízo |
| Bom | Catalogar *labravra* como cola do lab, não como lema |
| Mau | Prometer que a planta «tira a dor» porque a ficha existe |
| Mau | Traduzir *dor* = *pain* como se fossem o mesmo étimo |
| Mau | Transformar a ficha em bula, dose ou protocolo de [gesso](${gesso}) |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* dor *hoje*: o sentir que **pesa**; o verbo que **dói**; a pena inglesa que **não** é esta casa.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Alívio](${alivio}) · [Ufa!!!](${ufa}) | O tornar-leve e o sopro — depois da dor |
| [Curar](${curar}) | Outro verbo — tratar / secar |
| [Gesso](${gesso}) · [pressão](${pressao}) · [calor × frio](${calor}) | Corpo, válvula, qualidade térmica |
| [Risco](${risco}) | A dor também avisa |
| [Palavra](${palavra}) · [inspeção](${inspecaoHub}) | O vocábulo e o método — *labravra* / *inspção* |
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método do corte |
| [Valeu !!!](${mantra}) | Depois de nomear, sem fingir que deixou de doer |

## Limites

- Não ensina analgesia, cultivo nem dose.  
- Não abre ficha de *pena* nem de *álgos* nesta entrega.  
- *Doido* fica **indexado** como fenda do particípio — sem diagnóstico.  
- *Labravra* e *inspção* = lapsos de campo, não lemas.

## Status

**Aprovado na série Palavras** — *dor* fichada como *dolōrem*; *doer* é o verbo; *pain* é *poena*; [a orelha cola](${orelhaCola}) o lab em *labravra*; o étimo corta.

[▶ Palavras](${hub}) · [▶ Alívio](${alivio}) · [▶ Curar](${curar}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **dor** — the **weight one feels**. Field request: *inspção da labravra Dor*. [The ear glues](${orelhaCola}) the **lab** onto [palavra](${palavra}) (*labravra*) and drops the *e* of inspection. The etymon **cuts**: *dor* is from *dolēre*; English *pain* is from *poena* (penalty — PT *pena*).

> **Method note:** [Wiktionary · dor](${WIKT}), Lat. [*dolor*](${WIKT_LA}) / [*doleō*](${WIKT_DOLEO}), [*poena*](${WIKT_POENA}). **Not** a clinical protocol. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **dor** (fem.) |
| Etymon | Lat. *dolōrem* ← *dolēre* |
| Verb | **doer** — *dói* |
| Split | **doído** (aching) × **doido** (mad) — same participle, two offices |
| Not | [alívio](${alivio}) · Eng. *pain* (*poena*) · Gk. *álgos* |
| Date | ${inspected} |

Naming the word ≠ treating the person. [Valeu !!!](${mantra})

## Status

**Approved in Words** — *dolor*; *pain* is another house (*poena*).

[▶ Words](${hub}) · [▶ Alívio](${alivio}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección editorial de **dor** — el **peso que se siente**. Pedido: *inspção da labravra Dor*. [El oído pega](${orelhaCola}) el **lab** en [palavra](${palavra}) (*labravra*). El étimo **corta**: *dor* ← *dolēre*; el inglés *pain* ← *poena* (castigo — *pena*).

> **Nota:** [Wikcionario · dor](${WIKT}), lat. [*dolor*](${WIKT_LA}). **No** es protocolo clínico. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **dor** (fem.; esp. *dolor*) |
| Étimo | Lat. *dolōrem* ← *dolēre* |
| Verbo | **doer** — *dói* |
| Corte | **doído** (cuerpo) × **doido** (juicio) |
| No es | [alívio](${alivio}) · *pain* (*poena*) · *álgos* |
| Fecha | ${inspected} |

Nombrar ≠ tratar. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *dolor*; *pain* es otra casa.

[▶ Palabras](${hub}) · [▶ Alívio](${alivio}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildDorPost() {
  const { body, contentEn, contentEs } = buildDorBodies();
  const seriesOrder = pickOrder('inspecao-palavra-dor', 338);
  return makePalavra({
    title: 'Inspeção: Dor — dolōrem; doer dói; pain é poena, não esta casa',
    titleEn: 'Inspection: Dor — dolōrem; doer aches; pain is poena, not this house',
    titleEs: 'Inspección: Dor — dolōrem; doer duele; pain es poena, no esta casa',
    excerpt:
      'Palavras: dor ← lat. dolōrem ← dolēre; doer / doído / doido; pain ← poena (pena); labravra = lab colado; Valeu !!!',
    excerptEn:
      'Words: dor ← Lat. dolōrem ← dolēre; doer / doído / doido; pain ← poena (penalty); labravra = lab glued on; Valeu !!!',
    excerptEs:
      'Palabras: dor ← lat. dolōrem ← dolēre; doer / doído / doido; pain ← poena (pena); labravra = lab pegado; ¡Valeu !!!',
    slug: 'inspecao-palavra-dor',
    date: '2026-08-24T20:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Dor · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDorPost,
  buildDorBodies
};
