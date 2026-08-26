'use strict';

/**
 * Inspeção Palavras · alívio
 * Eixos: lat. alleviare ← ad- + levis (tornar leve) ·
 * aliviado (estado) · a orelha cola veado/viado ·
 * o étimo corta · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/alivio-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/alívio';
const WIKT_ALIVIAR = 'https://pt.wiktionary.org/wiki/aliviar';
const WIKT_ALIVIADO = 'https://pt.wiktionary.org/wiki/aliviado';
const WIKT_VEADO = 'https://pt.wiktionary.org/wiki/veado';
const WIKT_LA = 'https://en.wiktionary.org/wiki/allevio#Latin';
const WIKT_LEVIS = 'https://en.wiktionary.org/wiki/levis#Latin';
const WIKT_VENATUS = 'https://en.wiktionary.org/wiki/venatus#Latin';
const WIKI_VEADO = 'https://pt.wikipedia.org/wiki/Veado';

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

function buildAlivioBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-alivio.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const pressao = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';

  const body = `## Escopo

Inspeção editorial da palavra **[alívio](${self})** — o acto de **tornar leve**. Pedido de campo: *inspeção na palavra Alivio* · **Aliviado** · relação com o [animal](${animal}) **veado** (lapso *aninal*). [A orelha cola](${orelhaCola}) *aliviado* em *viado/veado*. O étimo **corta**: um vem de *levis* (leve); o outro vem da **caça**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · alívio](${WIKT}), [aliviar](${WIKT_ALIVIAR}), [aliviado](${WIKT_ALIVIADO}), [veado](${WIKT_VEADO}), lat. [*alleviō*](${WIKT_LA}) / [*levis*](${WIKT_LEVIS}), [*venātus*](${WIKT_VENATUS}), [Wikipédia · veado](${WIKI_VEADO}). **Ficha ≠ protocolo clínico, ≠ monografia de cervídeo, ≠ insulto.** Série [Palavras](${hub}). Sem afiliação médica. O [animal](${animal}) fica animal — como em [bode](${bode}) e [preguiça](${preguica}).

**Gatilho:** *alivio* / *alívio* / *aliviado* / *veado* / *viado* / *aninal*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **alívio** (pl. *alívios*) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | lat. *alleviāre* ← *ad-* + *levis* («leve») — tornar leve — confiança: **alta** |
| Família | *aliviar* · *aliviado* · *aliviante* · esp. *alivio* · fr. *allègement* · ing. *relief* / *alleviate* |
| Tipo BudGanja | Palavra — peso que baixa × estado *aliviado* × par ilusório *veado* |
| Não é | [curar](${curar}) (tratar / sarar) · [ufa](${ufa}) (o **sopro**, não o nome) · **veado** (o cervídeo) |
| Elo corpo | [gesso](${gesso}) (o molde; o alívio chega quando cede) · [pressão](${pressao}) (válvula de escape) |
| Elo animal | **veado** · [animal](${animal}) · hub [Animais](${animais}) · [bode](${bode}) (método: animal primeiro) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo do **peso que diminui** — dor, aperto, conta, vapor. *Aliviado* é quem **já** foi tornado leve. Não é o cervo da mata.

## O que a orelha cola — e o étimo corta

O pedido escreveu *Alivio* (sem acento) e *aninal Veado*. O olho, no particípio, lê **ali + viado**.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **alívio** | O sopro [ufa](${ufa}) | *alleviāre* — o **nome** do tornar-leve |
| **aliviar** | O mesmo que [curar](${curar}) | O **verbo**: baixar o peso; a cura é outro ofício |
| **aliviado** | *viado* / *veado* (o rabo da palavra) | Particípio — **estado** de quem foi aliviado |
| **veado** | Pedaço de *aliviado* | lat. *venātus* («caçado») ← *vēnārī* — o [animal](${animal}) cervídeo; *cervo* é *cervus* |
| **viado** | O animal na fala | Grafia da orelha; no BR também **gíria** — camada lexical, **não** ofício desta ficha |
| **aninal** | Palavra nova | Lapso de [animal](${animal}) — gatilho de campo |

**H1:** *alívio* / *aliviado* < *alleviāre* < *ad-* + *levis* — tornar leve (alta).  
**H2:** *veado* < *venātus* — o **caçado**, o cervídeo popular; *cervo* guarda *cervus*. Não é família de *levis*.  
**H3:** [a orelha cola](${orelhaCola}) *aliviado* em *viado/veado* porque o particípio **acaba** nesse som; o [étimo](${etimologia}) corta.  
**H4:** o [animal](${animal}) fica animal — método [bode](${bode}): referente biológico primeiro; gíria à parte, com [respeito](${respeito}).  
**H5:** **[Ufa!!!](${ufa})** é o **sopro** do alívio; *que alívio* é a frase; *alívio* é o **vocábulo**.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Peso / aperto** | Dor, conta, nó, vapor que baixa | Alta |
| **Estado** | *Aliviado* — quem já passou pelo verbo | Alta |
| **Válvula** | Alívio de [pressão](${pressao}) — escape, não truque | Alta (mapa lab) |
| **Clínica** | Sintoma que cede; ≠ [curar](${curar}) a causa | Alta no uso; **≠** protocolo |
| **Gesso** | Braço no molde: o alívio é o que se **espera**, não o gesso | Média (elo de campo) |
| **Animal** | **Veado** — cervídeo; sem ficha própria no hub [Animais](${animais}) ainda | Alta (zoologia popular) |
| **Gíria BR** | *Veado/viado* como insulto — **indexar**; esta ficha **não** exerce o pejorativo | Alta (existe o vocábulo); ofício = recusar o dano |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *alívio* (nome) × *aliviado* (estado) × *veado* (animal) |
| Bom | Mandar o sopro para [ufa](${ufa}); a cura para [curar](${curar}) |
| Bom | Nomear o cervídeo com [respeito](${respeito}) — o animal não é a gíria |
| Mau | Fundir *aliviado* com *veado* porque a boca cola o rabo da palavra |
| Mau | Usar a gíria como se fosse o ofício da ficha |
| Mau | Prometer cura onde só há alívio temporário |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* alívio *hoje*: o peso que **baixa**; o estado de quem **já** baixou; o **veado** que a orelha cola e o étimo solta na mata.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Ufa!!!](${ufa}) | Sopro de alívio · locução **que alívio** |
| [Curar](${curar}) | Outro verbo — tratar / sarar |
| [Gesso](${gesso}) · [pressão](${pressao}) | Molde e válvula — o corpo à espera do leve |
| [Animal](${animal}) · [bode](${bode}) · [preguiça](${preguica}) | Método: animal primeiro |
| [Animais](${animais}) | Hub de seres — veado ainda sem página de espécie |
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método do corte |
| [Respeito](${respeito}) · [verdade](${verdade}) · [gesto](${gesto}) | Nomear o cervídeo; não exercer o insulto |
| [Valeu !!!](${mantra}) | Depois do peso baixar |

## Limites

- Não ensina analgesia nem caça.  
- Não abre ficha de espécie no hub [Animais](${animais}) nesta entrega.  
- *Veado* fica **cortado nesta ficha**; gíria indexada, sem uso de ofício.  
- *Aninal* = lapso, não lema.

## Status

**Aprovado na série Palavras** — *alívio* fichado como *alleviāre* (tornar leve); *aliviado* é o estado; [a orelha cola](${orelhaCola}) o [animal](${animal}) **veado**; o étimo corta.

[▶ Palavras](${hub}) · [▶ Ufa](${ufa}) · [▶ Animal](${animal}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **alívio** — the act of **making light**. Field request: *Alivio* · **Aliviado** · relation to the [animal](${animal}) **veado** (slip *aninal*). [The ear glues](${orelhaCola}) *aliviado* to *viado/veado*. The etymon **cuts**: one from *levis* (light); the other from the **hunt**.

> **Method note:** [Wiktionary · alívio](${WIKT}), Lat. [*alleviō*](${WIKT_LA}) / [*levis*](${WIKT_LEVIS}), [*venātus*](${WIKT_VENATUS}). **Not** a clinical protocol. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **alívio** |
| Etymon | Lat. *alleviāre* ← *ad-* + *levis* |
| State | **aliviado** — the one already lightened |
| Not | [curar](${curar}) · **veado** (deer < *venātus*) |
| Glue | *aliviado* ends in the sound of *viado/veado* |
| Date | ${inspected} |

The [animal](${animal}) stays animal — [bode](${bode}) method. BR slang on *veado* is indexed, not used as craft. [Ufa](${ufa}) is the puff; *alívio* is the name. [Valeu !!!](${mantra})

## Status

**Approved in Words** — made light (*levis*); ear-glue to *veado* cut.

[▶ Words](${hub}) · [▶ Animal](${animal}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **alívio** — el acto de **aligerar**. Pedido: *Alivio* · **Aliviado** · relación con el [animal](${animal}) **veado** (lapsus *aninal*). [El oído pega](${orelhaCola}) *aliviado* a *viado/veado*. El étimo **corta**: uno viene de *levis*; el otro de la **caza**.

> **Nota:** [Wikcionario · alívio](${WIKT}), lat. [*alleviō*](${WIKT_LA}). **No** es protocolo clínico. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **alívio** |
| Étimo | Lat. *alleviāre* ← *ad-* + *levis* |
| Estado | **aliviado** — quien ya fue aligerado |
| No es | [curar](${curar}) · **veado** (ciervo < *venātus*) |
| Cola | *aliviado* acaba en el sonido de *viado/veado* |
| Fecha | ${inspected} |

El [animal](${animal}) queda animal — método [bode](${bode}). [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — aligerar (*levis*); cola de oído con *veado* cortada.

[▶ Palabras](${hub}) · [▶ Animal](${animal}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildAlivioPost() {
  const { body, contentEn, contentEs } = buildAlivioBodies();
  const seriesOrder = pickOrder('inspecao-palavra-alivio', 242);
  return makePalavra({
    title: 'Inspeção: Alívio — tornar leve; aliviado é o estado; a orelha cola veado',
    titleEn: 'Inspection: Alívio — making light; aliviado is the state; the ear glues veado',
    titleEs: 'Inspección: Alívio — aligerar; aliviado es el estado; el oído pega veado',
    excerpt:
      'Palavras: alívio ← lat. alleviāre (ad- + levis) — tornar leve; aliviado = estado; a orelha cola veado (venātus); Valeu !!!',
    excerptEn:
      'Words: alívio ← Lat. alleviāre (ad- + levis) — to make light; aliviado = state; the ear glues veado (venātus); Valeu !!!',
    excerptEs:
      'Palabras: alívio ← lat. alleviāre (ad- + levis) — aligerar; aliviado = estado; el oído pega veado (venātus); ¡Valeu !!!',
    slug: 'inspecao-palavra-alivio',
    date: '2026-08-22T19:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Alívio · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAlivioPost,
  buildAlivioBodies
};
