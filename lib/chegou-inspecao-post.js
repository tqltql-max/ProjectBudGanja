'use strict';

/**
 * Inspeção Palavras · chegou / chegar
 * Lat. plicāre «dobrar» → PT chegar (pl- → ch-).
 * Pedido: inpecao da palabra Chegou (falta o s; palabra ES; maiúscula; pretérito).
 * Corta: cheio (plenus) · cheiro (flagrāre) · GPS · Enter como âncora.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/chegou-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/chegar';
const WIKT_EN = 'https://en.wiktionary.org/wiki/chegar#Portuguese';
const WIKT_PLICARE = 'https://en.wiktionary.org/wiki/plico#Latin';
const WIKT_CHEGOU = 'https://pt.wiktionary.org/wiki/chegou';
const WIKT_CHEIO = 'https://pt.wiktionary.org/wiki/cheio';
const WIKT_CHEIRO = 'https://pt.wiktionary.org/wiki/cheiro';

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
  return `Chegou.
Não é cheio.
Não é cheiro.

Plicāre era dobrar —
a vela, o caminho, o corpo
até o limiar.
pl- virou ch- nesta boca.

Chega! é o mesmo verbo
quando o suficiente chegou.
Ficar é o inverso:
permanecer, não partir.

Valeu !!!
no limiar,
sem fundir o passo com o odor.`;
}

function poemEn() {
  return `Chegou.
Not cheio (full).
Not cheiro (smell).

Plicāre was to fold —
the sail, the path, the body
up to the threshold.
pl- became ch- in this mouth.

Chega! is the same verb
when enough has arrived.
To stay is the inverse:
remain, not depart.

Valeu !!!
on the threshold,
without fusing the step with the scent.`;
}

function poemEs() {
  return `Chegou.
No es cheio (lleno).
No es cheiro (olor).

Plicāre era plegar —
la vela, el camino, el cuerpo
hasta el umbral.
pl- viró ch- en esta boca.

¡Chega! es el mismo verbo
cuando lo suficiente llegó.
Quedar es el inverso:
permanecer, no partir.

¡Valeu !!!
en el umbral,
sin fundir el paso con el olor.`;
}

function buildChegouBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-chegou.html';
  const enter = '/posts/post-inspecao-palavra-enter.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const ficar = '/posts/post-inspecao-palavra-ficar.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const eminente = '/posts/post-inspecao-palavra-eminente.html';
  const marcha = '/posts/post-inspecao-expressao-meter-marcha.html';
  const semente = '/posts/post-inspecao-expressao-plantar-a-semente.html';
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

Inspeção editorial da palavra **[chegou](${self})** — pretérito de **chegar**: o [gesto](${gesto}) de **ter dobrado o [caminho](${caminho}) até o limiar**. Pedido de campo: *inpecao da palabra Chegou*. [A orelha cola](${orelhaCola}) *inpecao* (falta o *s*), *palabra* (castelhano) e a **maiúscula** do título. Cola também *chegou* em **[cheio](${WIKT_CHEIO})** e **[cheiro](${WIKT_CHEIRO})** — três *che-* que o [étimo](${etimo}) **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · chegar](${WIKT}), [chegou](${WIKT_CHEGOU}), [EN](${WIKT_EN}), lat. [*plicō / plicāre*](${WIKT_PLICARE}). Método: [etimologia](${etimologia}) · [latim](${latim}) · [língua portuguesa](${lingua}). **Ficha ≠ guia de GPS, ≠ manual de viagem, ≠ tecla [Enter](${enter}) como âncora.** Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Chegou* / *chegou* / *chegar* / *chega!* / *chegada* → lema **chegou** (forma de campo) · verbo **chegar**. *Cheio* → lat. *plēnus*. *Cheiro* → outra via (*flagrāre*). Quem entra e é recebido → [Enter / bem-vindos](${enter}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **chegou** (3.ª sg. pretérito perfeito de *chegar*) |
| Lema | **chegar** |
| Pedido de campo | **Chegou** — maiúscula; *inpecao* / *palabra* (lapsos) |
| Classe | Forma verbal (pretérito); o infinitivo é o verbo |
| Étimo (trabalho) | lat. *plicāre* «dobrar, pregar» → PT *chegar* (*pl-* → *ch-*) — confiança: **alta** |
| Tipo BudGanja | Palavra — limiar × pretérito × corte cheio/cheiro |
| Não é | [cheio](${WIKT_CHEIO}) · [cheiro](${WIKT_CHEIRO}) · GPS · [Enter](${enter}) · [caminho](${caminho}) (o leito, não o instante) |
| Elo | [ficar](${ficar}) (inverso) · [meter marcha](${marcha}) (arranque) · [tempo](${tempo}) · [ação](${acao}) · [alma](${alma}) |
| Fonte | [chegar](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **já ter chegado**. No porto antigo, *plicāre* era **dobrar** (a vela, o pano). No português, o mesmo gesto virou **chegar**. *Chegou* é o instante **fechado** — não o gerúndio *está chegando*.

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Chegou** (maiúscula) | Nome próprio / grito só | Pretérito do pedido — o verbo *chegar* |
| **inpecao / palabra** | Outra ficha | Lapsos de *inspeção* / *palavra* — [orelha](${orelhaCola}) |
| **[cheio](${WIKT_CHEIO})** | O mesmo *che-* | lat. *plēnus* — *pl-* → *ch-* **outra** árvore (*cheio* = pleno) |
| **[cheiro](${WIKT_CHEIRO})** | Ainda o mesmo *chei-* | Via *flagrāre* / odor — **não** *plicāre* |
| **chão** | Mais um *ch-* | lat. *planum* — irmão de som, não de sentido |
| **chega!** | Outro verbo | Imperativo do **mesmo** *chegar* — «é o suficiente» |
| **chegada** | A âncora | Substantivo — o nome do evento; o pedido é a **forma verbal** |
| **[Enter](${enter})** | Sinónimo de chegar | Tecla / *intrāre* / *bem-vindos* — **porta**, não pretérito |

**H-lapso:** o pedido fala espanhol (*palabra*) e come o *s* (*inpecao*). O lab honra o calor e ancora **inspeção da palavra chegou**.  
**H-cheio:** [A orelha cola](${orelhaCola}) *chegar* e *cheio* porque o português fez *pl-* → *ch-* **duas vezes** (*plicāre* e *plēnus*). O [étimo](${etimo}) corta as árvores.  
**H-cheiro:** *fl-* também pode virar *ch-* (*cheirar*). Terceira cola; terceiro corte.  
**H-forma:** *Chegou* não é o infinitivo. É o **já**. *Está chegando* ainda está no [caminho](${caminho}).

## 3. Plicāre — dobrar até o limiar

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **plicāre** (lat.) | Dobrar, pregar, enrolar | Alta |
| Hipótese do porto | Dobrar a vela ao **chegar** | Média — imagem útil, não veredicto único |
| PT **chegar** | *pl-* → *ch-* (como *chuva* < *pluvia*) | Alta |
| ES **llegar** | *pl-* → *ll-* — o mesmo étimo, outra boca | Alta |
| FR *arriver* / EN *arrive* | lat. *ad* + *rīpa* «margem» — **outra** via | Alta (separar) |
| IT *arrivare* | Mesma via da margem, não *plicāre* | Alta |
| **chegou** | Pretérito — o dobrar **já** aconteceu | Alta |

**Veredicto etimológico:** *chegou* não desce de *venire* (essa árvore alimenta [bem-vindos](${enter})). Desce de **dobrar**. O português **palatalizou** *pl-*; o espanhol fez *ll-*. Relacionar ≠ fundir.

## 4. Salas que não fundir

| Sala | O que é | Ficha |
|------|---------|-------|
| **A. Pretérito / âncora** | *Chegou* — o instante fechado | **Esta** |
| **B. Verbo** | *chegar* — o infinitivo | Esta, lema |
| **C. Bastante** | *Chega!* — o suficiente chegou | Mesmo verbo; sala de limite |
| **D. Nome** | *chegada* | Evento; não a forma do pedido |
| **E. Porta** | Entrar e ser recebido | [Enter / bem-vindos](${enter}) |
| **F. Leito** | Onde se anda | [caminho](${caminho}) · [estrada](${estrada}) |
| **G. Arranque** | Sair do ponto morto | [meter marcha](${marcha}) — inverso de tempo |
| **H. Ficar** | Permanecer | [ficar](${ficar}) — inverso de direcção |
| **I. Iminente** | Ainda vai chegar | Corte na ficha [eminente](${eminente}) |
| **J. Cheio / cheiro** | Pleno / odor | **Cortes** — outras árvores |

[Meter marcha](${marcha}) **engata**. [Plantar a semente](${semente}) **abre**. *Chegou* **fecha o passo**. Três tempos. Sem GPS.

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Ancorar **chegou**; ler *Chegou* como pretérito de campo |
| Bom | Cortar *cheio* × *cheiro* × *chão* × [Enter](${enter}) |
| Bom | Nomear *chega!* como o mesmo verbo no limite |
| Bom | Mandar o leito para [caminho](${caminho}) e a porta para [Enter](${enter}) |
| Mau | Fundir chegar, cheio e cheiro num só *che-* |
| Mau | Transformar a ficha em rota, ETA ou tutorial de viagem |
| Mau | Trocar *chegou* por *está chegando* sem marcar o [tempo](${tempo}) |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=chegou)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [caminho](${caminho}) · [estrada](${estrada}) | O leito — *chegou* é o instante no fim do leito |
| [Enter / bem-vindos](${enter}) | A porta e a saudação — *venire*, não *plicāre* |
| [ficar](${ficar}) | Inverso — permanecer |
| [meter marcha](${marcha}) | Arranque — o outro pólo do [tempo](${tempo}) |
| [plantar a semente](${semente}) | Abre; *chegou* fecha o passo |
| [eminente](${eminente}) | *iminente* = ainda vai chegar |
| [alma](${alma}) | *chegar na alma* — extensão íntima, não âncora |
| [ação](${acao}) · [gesto](${gesto}) | O fazer e o mínimo |
| [latim](${latim}) · [étimo](${etimo}) | *plicāre* · *pl-* → *ch-* |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensinamos a traçar rota nem a calcular chegada.  
- Não é a ficha de [cheio](${WIKT_CHEIO}) nem de [cheiro](${WIKT_CHEIRO}).  
- Não é [Enter](${enter}) nem [caminho](${caminho}).  
- Não é conjugação completa do verbo *chegar*.

## Status

**Aprovado na série Palavras** — *chegou* ← *chegar* ← lat. *plicāre*; *Chegou* = pretérito de campo; cheio / cheiro / Enter / GPS noutras salas. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Caminho](${caminho}) · [▶ Enter](${enter}) · [▶ Ficar](${ficar}) · [▶ Meter marcha](${marcha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The Portuguese word **[chegou](${self})** — 3rd-person preterite of **chegar**, “arrived”: the [gesture](${gesto}) of having folded the [path](${caminho}) up to the threshold. Field: *inpecao da palabra Chegou* (missing *s*; Spanish *palabra*; capital C). Ear-glue: *chegou* × *[cheio](${WIKT_CHEIO})* (full) × *[cheiro](${WIKT_CHEIRO})* (smell). Etymon: Lat. *plicāre* “to fold” (*pl-* → *ch-*). Cuts: GPS how-to, [Enter](${enter}) as âncora.

> [Wiktionary](${WIKT_EN}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *chegou* filed; *cheio* / *cheiro* / Enter / path in other rooms. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

La palabra portuguesa **[chegou](${self})** — pretérito de **chegar**, «llegó»: el [gesto](${gesto}) de haber plegado el [camino](${caminho}) hasta el umbral. Pedido: *inpecao da palabra Chegou*. El oído pega *chegou* con *[cheio](${WIKT_CHEIO})* (lleno) y *[cheiro](${WIKT_CHEIRO})* (olor). Étimo: lat. *plicāre* «plegar» (*pl-* → *ch-*). Cortes: GPS, [Enter](${enter}) como âncora.

> [Wikcionario](${WIKT}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *chegou* fichada; *cheio* / *cheiro* / Enter / camino en otras salas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildChegouPost() {
  const { body, contentEn, contentEs } = buildChegouBodies();
  return makePalavra({
    title: 'Inspeção: Chegou — pretérito de chegar; lat. plicāre',
    titleEn: 'Inspection: Chegou — preterite of chegar; Lat. plicāre',
    titleEs: 'Inspección: Chegou — pretérito de chegar; lat. plicāre',
    excerpt:
      'Palavras: chegou ← chegar ← lat. plicāre (pl- → ch-); Chegou = pretérito de campo; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; Valeu !!!',
    excerptEn:
      'Words: chegou ← chegar ← Lat. plicāre (pl- → ch-); Chegou = field preterite; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; Valeu !!!',
    excerptEs:
      'Palabras: chegou ← chegar ← lat. plicāre (pl- → ch-); Chegou = pretérito de campo; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; ¡Valeu !!!',
    slug: 'inspecao-palavra-chegou',
    date: '2026-08-26T10:00:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-chegou', 368),
    seriesLabel: 'Chegou · plicāre',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildChegouPost,
  buildChegouBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
