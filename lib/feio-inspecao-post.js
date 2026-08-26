'use strict';

/**
 * Inspeção Palavras · feio
 * Lat. foedus, foeda, foedum «feio, sujo, desairoso» — não o homónimo tratado.
 * Pedido: inspecao da palavra Feio (maiúscula; inspecao sem ã).
 * Corta: tutorial de insulto · Patinho Feio · tempo feio · feito (particípio).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/feio-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/feio';
const WIKT_EN = 'https://en.wiktionary.org/wiki/feio#Portuguese';
const WIKT_FOEDUS = 'https://en.wiktionary.org/wiki/foedus#Latin';
const WIKT_FEIURA = 'https://pt.wiktionary.org/wiki/feiura';
const WIKI_PATINHO = 'https://pt.wikipedia.org/wiki/O_Patinho_Feio';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Feio.
Não é feito.
Não é o tratado.

Foedus era o que desagrada o olhar —
sujo, desairoso, fora do agrado.
O outro foedus é o pacto.
A orelha cola; o étimo corta.

Não é o patinho do conto.
Não é o tempo nublado.
É a qualidade — não o golpe.

Valeu !!!
com respeito no olhar,
sem ensinar a ferir o rosto.`;
}

function poemEn() {
  return `Feio.
Not feito (done).
Not the treaty.

Foedus was what displeases the eye —
foul, unseemly, off the pleasing.
The other foedus is the pact.
The ear glues; the etymon cuts.

Not the duckling of the tale.
Not the ugly weather.
It is the quality — not the blow.

Valeu !!!
with respect in the gaze,
without teaching how to wound the face.`;
}

function poemEs() {
  return `Feio.
No es feito (hecho).
No es el tratado.

Foedus era lo que desagrada la mirada —
sucio, desairado, fuera del agrado.
El otro foedus es el pacto.
El oído pega; el étimo corta.

No es el patito del cuento.
No es el tiempo nublado.
Es la cualidad — no el golpe.

¡Valeu !!!
con respeto en la mirada,
sin enseñar a herir el rostro.`;
}

function buildFeioBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-feio.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const pessoas = '/posts/post-inspecao-palavra-pessoas.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[feio](${self})** — o adjectivo que nomeia o **desagrado do olhar** (e, no pátio, o **desagrado moral**: *que feio!*). Pedido de campo: *inspecao da palavra Feio*. [A orelha cola](${orelhaCola}) a **maiúscula** do título e *feio* em **feito** (particípio de *fazer*). O [étimo](${etimo}) **corta**: lat. *foedus, foeda, foedum* «feio, sujo, desairoso» — **não** o homónimo latino *foedus* «tratado, pacto».

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · feio](${WIKT}), [EN](${WIKT_EN}), lat. [*foedus*](${WIKT_FOEDUS}), [feiura](${WIKT_FEIURA}). Método: [etimologia](${etimologia}) · [latim](${latim}) · [língua portuguesa](${lingua}). **Ficha ≠ tutorial de insulto, ≠ guia de humilhar o corpo, ≠ monografia do [Patinho Feio](${WIKI_PATINHO}).** Tom: [respeito](${respeito}) no [gesto](${gesto}) que nomeia. Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Feio* / *feio* / *feo* (ES) / *feiura* / *que feio* → lema **feio**. *Tempo feio* → sala climática da ficha [tempo](${tempo}). *Patinho Feio* → conto; elo [pato](${pato}). *Feito* → outro vocábulo (particípio).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **feio** (adjectivo; fem. *feia*; pl. *feios* / *feias*) |
| Pedido de campo | **Feio** — maiúscula de título; *inspecao* sem ã |
| Classe | Adjectivo de dois géneros |
| Étimo (trabalho) | lat. *foedus, foeda, foedum* «feio, sujo, infame» → PT *feio* — confiança: **alta** |
| Homónimo latino | *foedus, foederis* «tratado» (família de *fidēs*) — **outra palavra** |
| Tipo BudGanja | Palavra — olhar × moral × corte (insulto / conto / clima / feito) |
| Não é | Tutorial de insulto · [Patinho Feio](${WIKI_PATINHO}) · [tempo](${tempo}) feio · *feito* · o pacto latino |
| Elo | [respeito](${respeito}) · [pessoas](${pessoas}) · [pato](${pato}) · [tempo](${tempo}) · [alma](${alma}) · [verdade](${verdade}) |
| Fonte | [feio](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português do **que desagrada à vista** — e, por extensão viva, do **que desagrada à ética do pátio**. No laboratório: fichar o vocábulo. **Não** ensinar a usá-lo contra o rosto de [pessoas](${pessoas}).

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Feio** (maiúscula) | Nome próprio / alcunha | A [palavra](${palavra}) do pedido — o adjectivo *feio* |
| **feito** | A mesma boca (*ei*) | Particípio de *fazer* — **outra** [palavra](${palavra}) |
| **feo** | Erro de *feio* | Espanhol / galego — o **mesmo** étimo, outra boca |
| **fio** | Quase a mesma sílaba | Lat. *fīlum* — linha, **não** esta âncora |
| **que feio!** | Só estética | Sala **moral** do pátio — vergonha, não só o olhar |
| **tempo feio** | O adjectivo como clima | Sala da ficha [tempo](${tempo}) — herança de *tempestas* |
| **Patinho Feio** | A âncora desta ficha | Conto (Andersen) — elo [pato](${pato}); **não** o lema |
| **foedus** (pacto) | O étimo de *feio* | Homónimo latino — *fidēs*, não *foedus* adjectivo |

**H-lapso:** *Feio* no pedido é o adjectivo em maiúscula de título. O lab **não** repreende a boca; ancora a minúscula do lema.  
**H-feito:** [A orelha cola](${orelhaCola}) *feio* e *feito*. O [étimo](${etimo}) corta: um vem de *foedus*; o outro de *facere*.  
**H-pacto:** dois *foedus* no [latim](${latim}). Só o adjectivo alimenta *feio*.  
**H-conto:** o [Patinho Feio](${WIKI_PATINHO}) **usa** a palavra; não a **é**.

## 3. Foedus — o adjectivo, não o tratado

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **foedus, foeda, foedum** | Lat. «feio, sujo, infame, que enoja» | Alta |
| **foedāre** | «Sujar, macular» — família do adjectivo | Alta |
| PT **feio** / ES **feo** / GL **feo** | Mesma árvore; PT guarda o ditongo *ei* | Alta |
| IT *brutto* / FR *laid* / EN *ugly* | Outras vias — **não** este étimo | Alta (separar) |
| **foedus, foederis** | «Tratado, liga» ← *fidēs* | Alta — **homónimo**, não pai |
| **feiura** (BR) | *feio* + *-ura* — o nome da qualidade | Alta |
| **fealdade** | Via hispânica *fealdad* — irmã culta | Alta |

**Veredicto etimológico:** *feio* não desce do pacto romano. Desce do adjectivo que nomeava o **sujo / desairoso**. O português **ditongou** o caminho (*foedus* → *feio*); o espanhol ficou em *feo*. Relacionar ≠ fundir.

## 4. Salas que não fundir

| Sala | O que é | Ficha |
|------|---------|-------|
| **A. Vocábulo / olhar** | Qualidade que desagrada à vista | **Esta** — âncora |
| **B. Moral / pátio** | *Que feio!* — vergonha do [gesto](${gesto}) | Esta, sala segunda — [respeito](${respeito}) corta o sermão |
| **C. Clima** | *O tempo está feio* | [tempo](${tempo}) |
| **D. Conto** | *O Patinho Feio* | [pato](${pato}) · [Andersen](${WIKI_PATINHO}) — elo, não lema |
| **E. Situação** | *Fica feio para…* — fica mal | Extensão ética; ainda o adjectivo, não manual |
| **F. Antónimo** | *belo* / *bonito* | Irmãos de eixo — **sem** ficha própria ainda |
| **G. Insulto** | Usar *feio* para ferir o corpo | **Corte** — nomeia-se; **não** se ensina |

A [alma](${alma}) não é o rosto. O [respeito](${respeito}) manda: inspecionar *feio* é **cortar o golpe**, não afiá-lo.

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Ancorar **feio**; ler *Feio* como maiúscula de pedido |
| Bom | Cortar *feito* × *feo* × pacto latino × Patinho × [tempo](${tempo}) |
| Bom | Nomear *que feio!* como sala moral, com [verdade](${verdade}) |
| Bom | Citar [feiura](${WIKT_FEIURA}) / *fealdade* como família, não como âncora |
| Mau | Transformar a ficha em lista de ofensas ao corpo |
| Mau | Fundir o conto, o clima e o adjectivo num só lema |
| Mau | Tratar o homónimo *foedus* (tratado) como pai de *feio* |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=feio)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [respeito](${respeito}) · [verdade](${verdade}) | O olhar que nomeia sem ferir |
| [pessoas](${pessoas}) | Quem vive — não é o alvo do adjectivo |
| [pato](${pato}) | Elo do [Patinho Feio](${WIKI_PATINHO}) |
| [tempo](${tempo}) | *Tempo feio* — clima, não âncora |
| [alma](${alma}) | O centro — distinto do rosto |
| [gesto](${gesto}) | *Que feio!* aponta o acto, não o corpo |
| [latim](${latim}) · [étimo](${etimo}) | *foedus* adjectivo × *foedus* pacto |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensinamos a insultar, a humilhar o corpo nem a montar alcunha.  
- Não é a ficha do [Patinho Feio](${WIKI_PATINHO}) nem do [tempo](${tempo}) nublado.  
- Não é *feito* (o que já se fez).  
- Não é tratado de estética nem de direito do pacto latino.

## Status

**Aprovado na série Palavras** — *feio* ← lat. *foedus* (adjectivo); *Feio* = maiúscula de campo; *feito* / Patinho / tempo / pacto noutras salas. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Respeito](${respeito}) · [▶ Pessoas](${pessoas}) · [▶ Pato](${pato}) · [▶ Tempo](${tempo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The Portuguese word **[feio](${self})** — the adjective for what **displeases the eye** (and, in the yard, the moral sting *que feio!*). Field: *inspecao da palavra Feio*. Ear-glue: capital *Feio*; *feio* × *feito* (done). Etymon: Lat. *foedus, foeda, foedum* “ugly, foul” — **not** the homonym *foedus* “treaty”. Cuts: insult how-to, [Ugly Duckling](${WIKI_PATINHO}), [ugly weather](${tempo}).

> [Wiktionary](${WIKT_EN}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *feio* filed; *feito* / duckling / weather / treaty in other rooms. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

La palabra portuguesa **[feio](${self})** — el adjetivo de lo que **desagrada la mirada** (y, en el patio, el pinchazo moral *que feio!*). Pedido: *inspecao da palavra Feio*. El oído pega la mayúscula y *feio* con *feito* (hecho). Étimo: lat. *foedus, foeda, foedum* — **no** el homónimo *foedus* «tratado». Cortes: tutorial de insulto, [Patito Feo](${WIKI_PATINHO}), [tiempo feo](${tempo}).

> [Wikcionario](${WIKT}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *feio* fichada; *feito* / patito / clima / pacto en otras salas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildFeioPost() {
  const { body, contentEn, contentEs } = buildFeioBodies();
  return makePalavra({
    title: 'Inspeção: Feio — lat. foedus; não o tratado nem o feito',
    titleEn: 'Inspection: Feio — Lat. foedus; not the treaty and not feito',
    titleEs: 'Inspección: Feio — lat. foedus; no el tratado ni o feito',
    excerpt:
      'Palavras: feio ← lat. foedus (adjectivo); Feio = maiúscula de campo; ≠ feito ≠ Patinho ≠ tempo feio ≠ insulto-manual; Valeu !!!',
    excerptEn:
      'Words: feio ← Lat. foedus (adjective); Feio = field capital; ≠ feito ≠ Ugly Duckling ≠ ugly weather ≠ insult how-to; Valeu !!!',
    excerptEs:
      'Palabras: feio ← lat. foedus (adjetivo); Feio = mayúscula de campo; ≠ feito ≠ Patito ≠ tiempo feo ≠ tutorial de insulto; ¡Valeu !!!',
    slug: 'inspecao-palavra-feio',
    date: '2026-08-26T09:50:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-feio', 367),
    seriesLabel: 'Feio · foedus',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFeioPost,
  buildFeioBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
