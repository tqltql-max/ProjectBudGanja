'use strict';

/**
 * Inspeção Palavras · apertar × espremer
 * Eixos: pectus (peito) × exprimere (premere para fora) ·
 * gatilho EXPREMMER · ≠ esfregar ≠ exprimir (fala) ·
 * aperto / EXIT · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/apertar-espremer-palavra-cover.jpg';
const WIKT_APERTAR = 'https://pt.wiktionary.org/wiki/apertar';
const WIKT_ESPREMER = 'https://pt.wiktionary.org/wiki/espremer';
const WIKT_EXPRIMIR = 'https://pt.wiktionary.org/wiki/exprimir';
const WIKT_PREMERE = 'https://en.wiktionary.org/wiki/premo#Latin';

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

function buildApertarEspremerBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-apertar-espremer.html';
  const pressao = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const esfregar = '/posts/post-inspecao-palavra-esfregar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do par **[apertar / espremer](${self})**. Pedido de campo: *APERTAR* · *EXPREMMER*. A boca juntou dois verbos de mão. O étimo **corta**. **Apertar** aperta (fecha, cinge, aperta o peito). **Espremer** tira para fora (sumo, pano, o que estava dentro). *Expremer* / *EXPREMMER* é **lapso** de *espremer*, colado a *exprimir*.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · apertar](${WIKT_APERTAR}), [espremer](${WIKT_ESPREMER}), [exprimir](${WIKT_EXPRIMIR}), lat. [*premō*](${WIKT_PREMERE}). **Ficha ≠ receita de suco, ≠ tutorial de luta, ≠ protocolo clínico (tensão).** A família da [pressão](${pressao}) já tem ficha (panela / válvula). Esta cobre os **verbos da palma**. Sem afiliação.

**Gatilho tipográfico:** *EXPREMMER* / *expremer* → **espremer**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **apertar** · **espremer** |
| Pedido de campo | *APERTAR* · *EXPREMMER* |
| Classe | Verbos |
| Tipo BudGanja | Palavra — dois gestos, dois étimos, um lapso |
| Não é | [esfregar](${esfregar}) (atrito) · [exprimir](${WIKT_EXPRIMIR}) (fala) · bula de hipertensão |
| Elo força | [impressão / pressão](${pressao}) · [gesto](${gesto}) · [mãos](${maos}) |
| Elo peito | [EXIT](${exit}) — sair do **aperto** · [medo](${medo}) · [risco](${risco}) |
| Fonte | [apertar](${WIKT_APERTAR}) · [espremer](${WIKT_ESPREMER}) |
| Data | ${inspected} |

**O que é o objecto:** duas acções da [mão](${maos}) que **parecem a mesma pressão**. [Relação](${relacao}): o *entre* não funde. [A orelha cola](${orelhaCola}); o étimo corta.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **apertar** | Espremer / «fazer pressão» | VL *appectorāre* ← lat. *pectus* «peito» — cingir, aproximar, **apertar contra** — confiança: **alta** |
| **espremer** | Apertar mais forte | lat. *exprimere* (*ex-* + *premere*) — **premer para fora** — confiança: **alta** |
| **EXPREMMER** | Palavra terceira / marca | Lapso de **espremer** (mm extra) colado a **exprimir** |
| **exprimir** | O mesmo verbo | Mesmo avô *exprimere* — **dizer / exprimir afecto** — **outra sala** (fala, não sumo) |
| **[esfregar](${esfregar})** | A mesma palma | *fricare* — **atrito**, não pressão |
| **[pressão](${pressao})** | O substantivo destes verbos | *premere* — força; a panela já está na ficha-irmã |

**H1:** apertar = peito / fechar o vão.  
**H2:** espremer = *ex-* (para fora) + *premere*.  
**H3:** *EXPREMMER* não é étimo; é teclado.  
**H4:** *exprimir* um sentimento ≠ espremer um limão — mesmo pai latino, dois ofícios PT.

## Dois gestos

| Verbo | Palma | Resultado | Mau uso no lab |
|-------|-------|-----------|----------------|
| **Apertar** | Cinge / fecha / aperta o parafuso, a mão, o prazo | Menos vão; mais **aperto** | Apertar pessoa como objecto; apertar até [risco](${risco}) sem mapa |
| **Espremer** | Comprime para **sair** líquido / ar / resto | Há **extracto** | Espremer gente; receita de suco como se fosse a ficha |
| **Exprimir** | Boca / texto | Há **frase** | Fundir com espremer porque o latim é o mesmo |

O [EXIT](${exit}) já leu o **aperto** como o que pede saída. Esta ficha nomeia o **verbo que cria o aperto** (*apertar*) e o **verbo que tira o miolo** (*espremer*).

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Apertar a tampa / o nó com [gesto](${gesto}) certo |
| Bom | Espremer o pano depois de [lavar](${lavar}) — água para fora |
| Bom | Exprimir com [verdade](${verdade}) — outra ficha, outra sala |
| Mau | Colar *EXPREMMER* no dicionário |
| Mau | Apertar o peito alheio e chamar-lhe ofício |
| Mau | Espremer sem [respeito](${respeito}) (pessoa ≠ limão) |

Fecho: [Valeu !!!](${mantra}) — apertar o que cinge; espremer o que sai; não fundir a fala.

## Status

**Aprovado na série Palavras** — *apertar* ≠ *espremer* ≠ *exprimir*; *EXPREMMER* lido como lapso.

[▶ Palavras](${hub}) · [▶ Pressão](${pressao}) · [▶ Esfregar](${esfregar}) · [▶ EXIT](${exit}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **apertar** (to tighten / press close) and **espremer** (to squeeze out). Field request: *APERTAR* · *EXPREMMER*. *Expremer* is a slip for **espremer**, glued to **exprimir** (to express).

> **Method note:** [apertar](${WIKT_APERTAR}), [espremer](${WIKT_ESPREMER}). Not a juice recipe. Sister sheet: [pressão](${pressao}). Rubbing is [esfregar](${esfregar}).

## Object

| Field | Value |
|-------|-------|
| Pair | **apertar** · **espremer** |
| Etymons | *pectus* (chest) · *exprimere* (press out) |
| Slip | *EXPREMMER* → espremer |
| Not | exprimir (speech) · [esfregar](${esfregar}) |
| Date | ${inspected} |

Tighten the gap. Squeeze **out**. [Valeu !!!](${mantra})

## Status

**Approved in Words** — two verbs, two rooms; the misspelling is not a third etymon.
`;

  const contentEs = `## Alcance

Inspección de **apertar** (apretar / ceñir) y **espremer** (exprimir hacia fuera). Pedido: *APERTAR* · *EXPREMMER*. *Expremer* es lapsus de **espremer**, pegado a **exprimir** (hablar).

> **Nota:** [apertar](${WIKT_APERTAR}), [espremer](${WIKT_ESPREMER}). No es receta de jugo. Hermana: [pressão](${pressao}).

## Objeto

| Campo | Valor |
|-------|-------|
| Par | **apertar** · **espremer** |
| Étimos | *pectus* · *exprimere* |
| Lapsus | *EXPREMMER* → espremer |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — dos verbos, dos salas.
`;

  return { body, contentEn, contentEs };
}

function buildApertarEspremerPost() {
  const { body, contentEn, contentEs } = buildApertarEspremerBodies();
  const seriesOrder = pickOrder('inspecao-palavra-apertar-espremer', 223);
  return makePalavra({
    title: 'Inspeção: Apertar · Espremer — o peito, o para fora, e o lapso EXPREMMER',
    titleEn: 'Inspection: Apertar · Espremer — the chest, the squeeze-out, and the slip EXPREMMER',
    titleEs: 'Inspección: Apertar · Espremer — el pecho, hacia fuera, y el lapsus EXPREMMER',
    excerpt:
      'Palavras: apertar (pectus) ≠ espremer (exprimere); EXPREMMER é lapso; ≠ exprimir ≠ esfregar; Valeu !!!',
    excerptEn:
      'Words: apertar (pectus) ≠ espremer (exprimere); EXPREMMER is a slip; ≠ express ≠ rub; Valeu !!!',
    excerptEs:
      'Palabras: apertar (pectus) ≠ espremer (exprimere); EXPREMMER es lapsus; ≠ exprimir ≠ frotar; ¡Valeu !!!',
    slug: 'inspecao-palavra-apertar-espremer',
    date: '2026-08-22T18:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Apertar · Espremer · palavra',
    coverImage: COVER,
    sourceUrl: WIKT_APERTAR,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildApertarEspremerPost,
  buildApertarEspremerBodies
};
