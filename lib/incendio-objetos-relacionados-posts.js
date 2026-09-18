'use strict';

/**
 * Palavras relacionadas ao cluster de incêndio indoor:
 * tenda · extintor · incêndio · fonte · extensão · exaustor
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');
const {
  LINKS: L,
  DATE,
  DATE_ISO,
  pickPalavrasOrder
} = require('./incendio-objetos-shared.js');

function shortEnEs(opts) {
  const contentEn = `## Scope

${opts.enScope}

> ${opts.enNote}

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **${opts.word}** |
| Path | ${opts.enPath} |
| Cluster | [Fire-control map](${L.cluster}) |
| Date | ${DATE} |

## 2. Seems vs is

**Seems:** ${opts.enSeems}  
**Is:** ${opts.enIs}

## 3. BudGanja correction

${opts.enFix} Close with [Do your best!](${L.mantra}).

## Status

**Approved** — ${opts.word}; [fire cluster](${L.cluster}); [Do your best!](${L.mantra}).

[▶ Words](${L.hub}) · [▶ Fire cluster](${L.cluster}) · [▶ Do your best!](${L.mantra})
`;
  const contentEs = `## Alcance

${opts.esScope}

> ${opts.esNote}

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **${opts.word}** |
| Camino | ${opts.esPath} |
| Clúster | [Mapa de incendio](${L.cluster}) |
| Fecha | ${DATE} |

## 2. Parece × es

**Parece:** ${opts.esSeems}  
**Es:** ${opts.esIs}

## 3. Corrección BudGanja

${opts.esFix} Cerrar con [¡Haz lo mejor!](${L.mantra}).

## Estado

**Aprobado** — ${opts.word}; [clúster](${L.cluster}); [¡Haz lo mejor!](${L.mantra}).

[▶ Palabras](${L.hub}) · [▶ Clúster incendio](${L.cluster}) · [▶ ¡Haz lo mejor!](${L.mantra})
`;
  return { contentEn, contentEs };
}

function buildTendaPost() {
  const wiki = 'https://pt.wiktionary.org/wiki/tenda';
  const self = L.tenda;
  const body = `## Escopo

Inspeção editorial da palavra **[tenda](${self})** — o **recinto** de tecido que fecha [luz](${L.luz}), odor e calor no indoor. Pedido de campo: objectos relacionados a Mars Hydro / Vivosun para [controle de incêndio](${L.cluster}). Esta ficha cobre o **étimo**, o **objecto grow tent** e a **correção**: tenda ≠ cofre à prova de [fogo](${L.fogo}). Elos: [exaustor](${L.exaustor}), [ventilação](${L.ventilacao}), [lâmpada](${L.lampada}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · tenda](${wiki}), [Wikipédia · Tenda](https://pt.wikipedia.org/wiki/Tenda). **Ficha ≠ manual de montagem nem certificado de tecido ignífugo.** Oxford 1680D / Mylar 98% são *claims* de catálogo — medir no lab.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **tenda** (grow tent · estufa de cultivo, no jargão BR) |
| Étimo | Lat. *tenda* / *tendere* «esticar» — lona esticada sobre armação | confiança **alta** |
| Papel no cluster | Recinto — **concentra** calor, reflecte [luz](${L.luz}), esconde odor |
| Coluna | **Perigo** (combustível + caixa) *e* ferramenta de cultivo |
| Marcas no corredor | [Mars Hydro](${L.marsPalavra}) · [Vivosun](${L.vivosunPalavra}) |
| Data | ${DATE} |

## 2. Origem e usos

Esticar pano (*tendere*) → abrigo de campanha → **caixa indoor** com zíper e Mylar. O que muda no lab: deixa de ser acampamento e passa a ser **volume com watts lá dentro**.

## 3. O que parece × o que é

**Parece:** caixa mágica que «aumenta PPFD 25%» e não pega fogo.  
**É:** tecido + metal + [objectos](${L.objetosPalavra}) suspensos ([lâmpada](${L.lampada}), filtro, [exaustor](${L.exaustor})). Reflexão ≠ medição ([Luxímetro](${L.lux})). Recinto **fecha** o calor da [fonte](${L.fonte}).

## 4. Correção BudGanja

Não pendurar a [fonte](${L.fonte}) contra o Mylar; não tapar o [exaustor](${L.exaustor}); [interruptor](${L.interruptor}) fora do pano se possível. Tenda da marca ≠ laudo. Fechar com [Faça o melhor!](${L.mantra}).

## Status

**Aprovado** — **tenda** (*tendere*): recinto do cluster; elos [Mars Hydro](${L.marsPalavra}) · [Vivosun](${L.vivosunPalavra}); [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Exaustor](${L.exaustor}) · [▶ Ventilação](${L.ventilacao}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'tenda',
    enScope: `Inspection of Portuguese **tenda** (grow tent) — stretched cloth enclosure. Related to Mars Hydro / Vivosun fire-control objects.`,
    enNote: `Sources: [tenda](${wiki}). Not a fire-rating certificate.`,
    enPath: 'Lat. *tendere* “to stretch” → indoor tent',
    enSeems: 'a fireproof magic box',
    enIs: 'fabric + frame concentrating heat from the [driver](' + L.fonte + ')',
    enFix: '**Tent ≠ fire safe.** Keep drivers off the mylar; ventilate.',
    esScope: `Inspección de **tenda** (carpa de cultivo) — recinto de tela. Objetos relacionados Mars Hydro / Vivosun.`,
    esNote: `Fuentes: [tenda](${wiki}). No es certificado ignífugo.`,
    esPath: 'Lat. *tendere* «estirar» → carpa indoor',
    esSeems: 'una caja mágica a prueba de fuego',
    esIs: 'tela + armazón que concentra el calor de la [fonte](' + L.fonte + ')',
    esFix: '**Carpa ≠ segura contra incendio.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-tenda', 159);
  return makePalavra({
    title: 'Inspeção: Tenda — recinto, Mylar e o calor fechado',
    titleEn: 'Inspection: Tenda — enclosure, mylar, and trapped heat',
    titleEs: 'Inspección: Tenda — recinto, Mylar y el calor cerrado',
    excerpt:
      'Palavras: «tenda» (lat. tendere) — grow tent concentra luz e calor; objecto do cluster de incêndio; Faça o melhor!',
    excerptEn:
      'Words: “tenda” (Lat. tendere) — grow tent traps light and heat; fire-cluster object; Do your best!',
    excerptEs:
      'Palabras: «tenda» (lat. tendere) — la carpa concentra luz y calor; objeto del clúster de incendio; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tenda',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Tenda · palavra',
    coverImage: '/imagens/inspecoes/tenda-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildExtintorPost() {
  const wiki = 'https://pt.wiktionary.org/wiki/extintor';
  const self = L.extintor;
  const body = `## Escopo

Inspeção editorial da palavra **[extintor](${self})** — o **objecto de controle** que apaga ou abafa o [incêndio](${L.incendio}). Pedido de campo: objectos perigosos **para controle** de incêndio. Esta ficha cobre o **étimo** (*extinguir*), a **coluna controle** (≠ coluna perigo) e a **correção**: ter um cilindro vermelho na foto ≠ ofício. Elos: [fogo](${L.fogo}), [risco](${L.risco}), [interruptor](${L.interruptor}), [cluster](${L.cluster}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · extintor](${wiki}), [Wikipédia · Extintor](https://pt.wikipedia.org/wiki/Extintor). **Ficha ≠ treino de combate, ≠ escolha de classe ABC/CO₂ para o teu município, ≠ NR-23.** Electricista e corpo de bombeiros não se substituem por glossário.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **extintor** |
| Étimo | *Extinguir* ← lat. *exstinguere* «apagar, fazer cessar» | confiança **alta** |
| Coluna do cluster | **Controle** (apaga / abafa) — não é o painel LED |
| Par lab | [Interruptor](${L.interruptor}) (corta) · detector de fumo (avisa) · [água](${L.agua}) **não** no quadro |
| Data | ${DATE} |

## 2. Origem e usos

*Ex-stinguere*: tirar a chama. No indoor, o extintor é o **último gesto** — o primeiro é [desligar](${L.ligar}) a carga. Classes (A sólidos, B líquidos, C eléctricos, etc.) **existem**; esta ficha **nomeia** a diferença, não certifica o teu cilindro.

## 3. O que parece × o que é

**Parece:** com extintor na estufa, Mars Hydro / Vivosun «já está controlado».  
**É:** objecto de **corte do evento**, inútil se estiver atrás de vasos, vencido, ou da classe errada para [fonte](${L.fonte}) / quadro. Marca de LED ≠ classe de extintor.

## 4. Correção BudGanja

Controle = aviso + corte + (depois) extintor. Não atirar [água](${L.agua}) ao driver. Não transformar o cilindro em [ídolo](${L.idolo}) de segurança. [Faça o melhor!](${L.mantra}) **antes** da labareda: circuito e [extensão](${L.extensao}).

## Status

**Aprovado** — **extintor** (*exstinguere*): coluna controle do [cluster](${L.cluster}); ≠ manual de bombeiros; [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Incêndio](${L.incendio}) · [▶ Fogo](${L.fogo}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'extintor',
    enScope: `Inspection of Portuguese **extintor** (fire extinguisher) — the **control** object. Not a firefighting course.`,
    enNote: `Sources: [extintor](${wiki}). Not NR-23.`,
    enPath: 'Lat. *exstinguere* “to quench”',
    enSeems: 'a red cylinder makes the tent safe',
    enIs: 'a last-resort **control** object; first gesture is to [switch off](' + L.ligar + ')',
    enFix: '**Extinguisher ≠ brand certificate.** Class matters; water on the driver does not.',
    esScope: `Inspección de **extintor** — objeto de **control**. No es curso de bomberos.`,
    esNote: `Fuentes: [extintor](${wiki}).`,
    esPath: 'Lat. *exstinguere* «apagar»',
    esSeems: 'el cilindro rojo ya controla la carpa',
    esIs: 'objeto de **último gesto**; primero [desligar](' + L.ligar + ')',
    esFix: '**Extintor ≠ certificado de marca.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-extintor', 160);
  return makePalavra({
    title: 'Inspeção: Extintor — apagar, classe e o último gesto',
    titleEn: 'Inspection: Extintor — quench, class, and the last gesture',
    titleEs: 'Inspección: Extintor — apagar, clase y el último gesto',
    excerpt:
      'Palavras: «extintor» (lat. exstinguere) — objecto de controle; ≠ NR-23; elos incêndio, interruptor; Faça o melhor!',
    excerptEn:
      'Words: “extintor” (Lat. exstinguere) — control object; not a fire code; Do your best!',
    excerptEs:
      'Palabras: «extintor» (lat. exstinguere) — objeto de control; no es NR-23; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-extintor',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Extintor · palavra',
    coverImage: '/imagens/inspecoes/extintor-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildIncendioPost() {
  const wiki = 'https://pt.wiktionary.org/wiki/inc%C3%AAndio';
  const self = L.incendio;
  const body = `## Escopo

Inspeção editorial da palavra **[incêndio](${self})** — o **evento** descontrolado (lat. *incendium*). Pedido de campo: *controle de incêndio*. Distingue-se de **[fogo](${L.fogo})** (lat. *focus*, elemento / lareira). Elos: [risco](${L.risco}), [extintor](${L.extintor}), [cluster](${L.cluster}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · incêndio](${wiki}), [Wikipédia · Incêndio](https://pt.wikipedia.org/wiki/Inc%C3%AAndio). **Ficha ≠ relatório de sinistro nem plano de fuga.**

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **incêndio** |
| Étimo | Lat. *incendium* ← *incendere* «atear, pôr fogo» | confiança **alta** |
| Contraste | **[fogo](${L.fogo})** = elemento / metáfora · **incêndio** = evento que saiu do *focus* |
| Coluna | O **acontecimento** que o cluster tenta **não** deixar nascer |
| Data | ${DATE} |

## 2. Origem e usos

*In-candēre / incendere*: fazer brilhar até queimar. Incêndio é o [fogo](${L.fogo}) **sem ofício** — já não é lareira. No indoor, o rasto típico é eléctrico: [fonte](${L.fonte}), [extensão](${L.extensao}), motor do [exaustor](${L.exaustor}), tecido da [tenda](${L.tenda}).

## 3. O que parece × o que é

**Parece:** incêndio = qualquer chama ([isqueiro](${L.isqueiro}), fogão).  
**É:** o **descontrole**. Controle de incêndio = impedir o evento (circuito) e, se nascer, cortar / avisar / [extintor](${L.extintor}). Marca LED não lê esta palavra.

## 4. Correção BudGanja

Não fundir [fogo](${L.fogo}) (ofício, medida, metáfora) com incêndio (sinistro). [Faça o melhor!](${L.mantra}) **antes** do evento: nomear os [objectos](${L.objetosPalavra}) do [cluster](${L.cluster}).

## Status

**Aprovado** — **incêndio** (*incendium*) ≠ [fogo](${L.fogo}) (*focus*); eixo do [mapa](${L.cluster}); [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Fogo](${L.fogo}) · [▶ Extintor](${L.extintor}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'incêndio',
    enScope: `Inspection of Portuguese **incêndio** (uncontrolled fire event) vs [fogo](${L.fogo}) (element / hearth).`,
    enNote: `Sources: [incêndio](${wiki}).`,
    enPath: 'Lat. *incendium* ← *incendere* “to set alight”',
    enSeems: 'any flame',
    enIs: 'the **uncontrolled event** the cluster tries to prevent',
    enFix: '**Incêndio ≠ fogo.** Craft stays with the hearth; the event is the failure.',
    esScope: `Inspección de **incêndio** (evento descontrolado) frente a [fogo](${L.fogo}) (elemento).`,
    esNote: `Fuentes: [incêndio](${wiki}).`,
    esPath: 'Lat. *incendium* ← *incendere*',
    esSeems: 'cualquier llama',
    esIs: 'el **evento** que el clúster intenta no dejar nacer',
    esFix: '**Incêndio ≠ fogo.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-incendio', 161);
  return makePalavra({
    title: 'Inspeção: Incêndio — o evento, não o elemento',
    titleEn: 'Inspection: Incêndio — the event, not the element',
    titleEs: 'Inspección: Incêndio — el evento, no el elemento',
    excerpt:
      'Palavras: «incêndio» (lat. incendium) ≠ fogo (focus); evento descontrolado; eixo do cluster da tenda; Faça o melhor!',
    excerptEn:
      'Words: “incêndio” (Lat. incendium) ≠ fogo (focus); uncontrolled event; tent cluster; Do your best!',
    excerptEs:
      'Palabras: «incêndio» (lat. incendium) ≠ fogo (focus); evento descontrolado; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-incendio',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Incêndio · palavra',
    coverImage: '/imagens/inspecoes/incendio-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildFontePost() {
  const wiki = 'https://pt.wiktionary.org/wiki/fonte';
  const self = L.fonte;
  const body = `## Escopo

Inspeção editorial da palavra **[fonte](${self})** no sentido de **fonte de alimentação** (driver do LED, fonte da fonte). Pedido de campo: objectos perigosos da tenda. Esta ficha cobre o **étimo** (lat. *fons*, nascente) e o **desvio BR** (a «fonte» que **alimenta watts**, não o rio). Elos: [lâmpada](${L.lampada}), [extensão](${L.extensao}), [cluster](${L.cluster}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · fonte](${wiki}). **Ficha ≠ esquema electrónico nem recall de SKU.** A fonte é o ponto cego atrás do «sol» [Vivosun](${L.vivosunPalavra}) / painel [Mars Hydro](${L.marsPalavra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra âncora | **fonte** (eléctrica / driver) |
| Outras camadas | Nascente de [água](${L.agua}) · fonte tipográfica · fonte de informação — **não** são esta ficha |
| Étimo | Lat. *fons, fontis* «nascente, origem» | confiança **alta** |
| Coluna | **Perigo** escondido — calor e carga no recinto |
| Data | ${DATE} |

## 2. Origem e desvio

*Fons* = onde a água nasce. No português técnico BR, a mesma palavra passou a nomear o **bloco que converte a rede em corrente para o LED**. O choque lab: a palavra da **água** nomeia o objecto que **esquenta o cabo**. Eco com *Hydro* em [Mars Hydro](${L.marsPalavra}).

## 3. O que parece × o que é

**Parece:** o perigo é o painel (os díodos).  
**É:** muitas vezes o **driver** — [fonte](${self}) mal ventilada, encostada ao Mylar, ou em [extensão](${L.extensao}) subdimensionada.

## 4. Correção BudGanja

Nomear a fonte como [objecto](${L.objetosPalavra}) distinto da [lâmpada](${L.lampada}). Não a esconder na [tenda](${L.tenda}) sem ar. [Interruptor](${L.interruptor}) a montante. [Faça o melhor!](${L.mantra}).

## Status

**Aprovado** — **fonte** (*fons* → driver): ponto cego do [cluster](${L.cluster}); [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Extensão](${L.extensao}) · [▶ Lâmpada](${L.lampada}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'fonte',
    enScope: `Inspection of Portuguese **fonte** as **power supply / LED driver** (Lat. *fons* “spring”). The hidden fire object behind the panel.`,
    enNote: `Sources: [fonte](${wiki}). Other senses (spring, typeface, source) are not this sheet.`,
    enPath: 'Lat. *fons* → BR electrical slang “PSU / driver”',
    enSeems: 'the diodes are the hazard',
    enIs: 'often the **driver** against the mylar or on a skinny strip',
    enFix: '**Name the driver as its own object.** Ventilate it; switch upstream.',
    esScope: `Inspección de **fonte** como **fuente de alimentación / driver**. Objeto peligroso escondido.`,
    esNote: `Fuentes: [fonte](${wiki}).`,
    esPath: 'Lat. *fons* → argot BR «fuente / driver»',
    esSeems: 'el peligro son los diodos',
    esIs: 'muchas veces el **driver**',
    esFix: '**Nombrar el driver como objeto propio.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-fonte', 162);
  return makePalavra({
    title: 'Inspeção: Fonte — a nascente que agora é o driver',
    titleEn: 'Inspection: Fonte — the spring that became the driver',
    titleEs: 'Inspección: Fonte — el manantial que ahora es el driver',
    excerpt:
      'Palavras: «fonte» (lat. fons) — no indoor é o driver; perigo escondido do cluster; Faça o melhor!',
    excerptEn:
      'Words: “fonte” (Lat. fons) — indoors it is the LED driver; hidden cluster hazard; Do your best!',
    excerptEs:
      'Palabras: «fonte» (lat. fons) — en indoor es el driver; peligro escondido; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-fonte',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Fonte · palavra',
    coverImage: '/imagens/inspecoes/fonte-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildExtensaoPost() {
  const wiki = 'https://pt.wiktionary.org/wiki/extens%C3%A3o';
  const self = L.extensao;
  const body = `## Escopo

Inspeção editorial da palavra **[extensão](${self})** — cabo / régua / *benjamim* que **estica** a tomada até à [tenda](${L.tenda}). Pedido de campo: objectos perigosos para [controle de incêndio](${L.cluster}). Elos: [fonte](${L.fonte}), [interruptor](${L.interruptor}), [risco](${L.risco}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · extensão](${wiki}). **Ficha ≠ tabela de ampere nem norma ABNT da tua casa.** Sobrecarga é o [incêndio](${L.incendio}) mais banal do indoor doméstico.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **extensão** (também régua, benjamim, filtro de linha — camadas vizinhas) |
| Étimo | Lat. *extendere* «esticar» | confiança **alta** |
| Coluna | **Perigo** — multiplica tomadas sem multiplicar o circuito |
| Data | ${DATE} |

## 2. Origem e usos

*Ex-tendere*: esticar. A tenda (*tendere*) e a extensão (*extendere*) partilham o gesto de **esticar** — uma estica pano, a outra estica cobre. No lab, esticar demais o circuito é o anti-ofício.

## 3. O que parece × o que é

**Parece:** «a régua de 6 tomadas aguenta o kit Mars / Vivosun».  
**É:** o limite é o **fio da parede** e a bitola da extensão, não o número de buracos. LED + [exaustor](${L.exaustor}) + humidifier no mesmo benjamim = soma escondida.

## 4. Correção BudGanja

Não empilhar extensões. Preferir circuito dedicado quando o watt do [catálogo](${L.marsEquip}) / [Vivosun](${L.vivosunEquip}) pede. [Interruptor](${L.interruptor}) acessível. [Faça o melhor!](${L.mantra}).

## Status

**Aprovado** — **extensão** (*extendere*): perigo banal do [cluster](${L.cluster}); [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Fonte](${L.fonte}) · [▶ Interruptor](${L.interruptor}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'extensão',
    enScope: `Inspection of Portuguese **extensão** (extension cord / power strip) — stretching the outlet to the tent.`,
    enNote: `Sources: [extensão](${wiki}). Not an ampacity table.`,
    enPath: 'Lat. *extendere* “to stretch”',
    enSeems: 'six sockets can feed the whole kit',
    enIs: 'the wall circuit does not multiply with the holes',
    enFix: '**Do not daisy-chain strips.** Switch reachable.',
    esScope: `Inspección de **extensão** (alargador / regleta) — estirar el enchufe hasta la carpa.`,
    esNote: `Fuentes: [extensão](${wiki}).`,
    esPath: 'Lat. *extendere* «estirar»',
    esSeems: 'seis tomas aguantan el kit',
    esIs: 'el circuito de la pared no se multiplica',
    esFix: '**No apilar alargadores.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-extensao', 163);
  return makePalavra({
    title: 'Inspeção: Extensão — esticar a tomada até à tenda',
    titleEn: 'Inspection: Extensão — stretching the outlet to the tent',
    titleEs: 'Inspección: Extensão — estirar el enchufe hasta la carpa',
    excerpt:
      'Palavras: «extensão» (lat. extendere) — régua/benjamim; perigo banal do cluster; Faça o melhor!',
    excerptEn:
      'Words: “extensão” (Lat. extendere) — strip/cord; banal cluster hazard; Do your best!',
    excerptEs:
      'Palabras: «extensão» (lat. extendere) — regleta; peligro banal del clúster; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-extensao',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Extensão · palavra',
    coverImage: '/imagens/inspecoes/extensao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildExaustorPost() {
  const wiki = 'https://pt.wiktionary.org/wiki/exaustor';
  const self = L.exaustor;
  const body = `## Escopo

Inspeção editorial da palavra **[exaustor](${self})** — o **motor** que tira ar da [tenda](${L.tenda}) (inline, duto, filtro). Pedido de campo: objectos relacionados Mars Hydro / Vivosun (iFresh, AeroWave). Elos: [ventilação](${L.ventilacao}), [tenda](${L.tenda}), [cluster](${L.cluster}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** [Wikcionário · exaustor](${wiki}). Medições de fluxo vivem na [Inspeção: Ventilação da tenda](${L.ventilacao}). **Ficha ≠ curva CFM nem ruído homologado.** Motor + pó + cabo = coluna **perigo**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **exaustor** (inline / duct fan) |
| Étimo | *Exaurir* / *exausto* ← lat. *exhaurīre* «esgotar, tirar até ao fim» | confiança **alta** |
| Papel | Renovar volume; puxar odor pelo carvão; **também** aquece rolamento |
| Marcas no corredor | Mars iFresh · Vivosun AeroWave / kits de duto |
| Data | ${DATE} |

## 2. Origem e usos

*Ex-haurīre*: esgotar. O exaustor esgota o ar velho. Sem ele, a tenda vira caixa térmica; com ele mal dimensionado, o motor trabalha sujo e quente. Cruza a [verificação de ventilação](${L.ventilacao}).

## 3. O que parece × o que é

**Parece:** ventilação = só clima / VPD.  
**É:** também **objecto eléctrico** (motor, capacitor, ficha) colado a tecido e filtro (combustível + restrição). App GrowHub / iControl **não** lubrifica o rolamento.

## 4. Correção BudGanja

Dimensionar com a [ficha de ventilação](${L.ventilacao}) e [VPD](${L.vpd}). Não estrangular o duto. Cabo na [extensão](${L.extensao}) conta na soma. [Faça o melhor!](${L.mantra}).

## Status

**Aprovado** — **exaustor** (*exhaurīre*): ar × motor no [cluster](${L.cluster}); [Faça o melhor!](${L.mantra}).

[▶ Cluster](${L.cluster}) · [▶ Tenda](${L.tenda}) · [▶ Ventilação](${L.ventilacao}) · [▶ Faça o melhor!](${L.mantra})
`;
  const i18n = shortEnEs({
    word: 'exaustor',
    enScope: `Inspection of Portuguese **exaustor** (inline / exhaust fan) — the motor that empties the tent. Related to Mars iFresh and Vivosun AeroWave.`,
    enNote: `Sources: [exaustor](${wiki}). Airflow numbers live in the [ventilation sheet](${L.ventilacao}).`,
    enPath: 'Lat. *exhaurīre* “to drain / exhaust”',
    enSeems: 'ventilation is only climate',
    enIs: 'also an electrical motor against fabric and a carbon filter',
    enFix: '**Size the fan; don’t pinch the duct; count its watts on the strip.**',
    esScope: `Inspección de **exaustor** (ventilador inline) — el motor que vacía la carpa.`,
    esNote: `Fuentes: [exaustor](${wiki}).`,
    esPath: 'Lat. *exhaurīre* «agotar»',
    esSeems: 'ventilación es solo clima',
    esIs: 'también un motor eléctrico junto a la tela',
    esFix: '**Dimensionar el ventilador; no estrangular el ducto.**'
  });
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-exaustor', 164);
  return makePalavra({
    title: 'Inspeção: Exaustor — esgotar o ar, não o motor',
    titleEn: 'Inspection: Exaustor — exhaust the air, not the motor',
    titleEs: 'Inspección: Exaustor — agotar el aire, no el motor',
    excerpt:
      'Palavras: «exaustor» (lat. exhaurīre) — motor inline na tenda; perigo × clima; elos ventilação, Mars/Vivosun; Faça o melhor!',
    excerptEn:
      'Words: “exaustor” (Lat. exhaurīre) — inline motor in the tent; hazard × climate; Do your best!',
    excerptEs:
      'Palabras: «exaustor» (lat. exhaurīre) — motor inline; peligro × clima; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-exaustor',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Exaustor · palavra',
    coverImage: '/imagens/inspecoes/exaustor-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn: i18n.contentEn,
    contentEs: i18n.contentEs
  });
}

function buildRelacionadosPosts() {
  return [
    buildTendaPost(),
    buildExtintorPost(),
    buildIncendioPost(),
    buildFontePost(),
    buildExtensaoPost(),
    buildExaustorPost()
  ];
}

module.exports = {
  buildRelacionadosPosts,
  buildTendaPost,
  buildExtintorPost,
  buildIncendioPost,
  buildFontePost,
  buildExtensaoPost,
  buildExaustorPost
};
