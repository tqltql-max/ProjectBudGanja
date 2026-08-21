'use strict';

/**
 * Inspeção Palavras · impressão × pressão
 * Eixos: lat. premere · imprimere (para dentro) ·
 * panela de pressão · válvula de escape ·
 * impressão ≠ inspiração · ficha ≠ manual de explosão
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/impressao-pressao-palavra-cover.jpg';
const WIKT_IMP = 'https://pt.wiktionary.org/wiki/impress%C3%A3o';
const WIKT_PRE = 'https://pt.wiktionary.org/wiki/press%C3%A3o';
const WIKI_PANELA = 'https://pt.wikipedia.org/wiki/Panela_de_press%C3%A3o';
const WIKI_PAPIN = 'https://pt.wikipedia.org/wiki/Denis_Papin';

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

function buildImpressaoPressaoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const objetos = '/objetos/';
  const self = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const muito = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const objetosPalavra = '/posts/post-inspecao-palavra-objetos.html';
  const incendio = '/posts/post-inspecao-palavra-incendio.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const vida = '/vida/';
  const hubExp = '/biblioteca/inspecoes/#inspecoes-expressoes';

  const body = `## Escopo

Inspeção editorial da família **[impressão / pressão](${self})**. Pedido de campo: *Impresssao* · *Pressao* · objecto **panela de pressão** · **válvula de escape**. O laboratório não funde os ofícios. A âncora é o étimo *premere* («apertar»): **pressão** é a força; **impressão** é a marca **para dentro**; a **panela** é o vaso que segura essa força; a **válvula de escape** é a peça que a deixa sair antes de virar [risco](${risco}) sem mapa.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · impressão](${WIKT_IMP}), [pressão](${WIKT_PRE}), [Wikipédia · Panela de pressão](${WIKI_PANELA}), [Denis Papin](${WIKI_PAPIN}). Série [Palavras](${hub}); objecto também no mapa de [objetos](${objetos}). **Ficha ≠ manual de cozinha, ≠ protocolo clínico (tensão arterial), ≠ como tampar ou anular a válvula.** Nomear o perigo da panela com válvula bloqueada ≠ ensinar a fazê-la explodir. Sem afiliação comercial.

**Gatilho tipográfico:** *Impresssao* / *Pressao* → **impressão** / **pressão**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **impressão** · **pressão** |
| Objecto de cozinha | **panela de pressão** |
| Peça crítica | **válvula de escape** (alívio / segurança da panela) |
| Tipo BudGanja | Palavra + objecto — *premere* × marca × vaso × alívio |
| Não é | [inspiração](${inspiracao}) (*spīrāre*) · escape de motor · receita · laudo médico |
| Elo léxico | [língua portuguesa](${lingua}) · [objetos](${objetosPalavra}) |
| Elo peito | [aff](${aff}) (válvula oral) · [medo](${medo}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo mapa | [risco](${risco}) · [incrível](${incrivel}) · [muitoobrigado](${muito}) |
| Fonte | [impressão](${WIKT_IMP}) · [Panela de pressão](${WIKI_PANELA}) |
| Data | ${inspected} |

**O que é o objecto:** duas palavras da mesma raiz e dois objectos da cozinha brasileira que **ensinam** essa raiz. Pressão aperta; impressão fica; a panela segura; a válvula escapa.

## 2. Uma raiz: apertar

| Forma | Étimo de trabalho | Confiança | Ofício nesta ficha |
|-------|-------------------|-----------|-------------------|
| **pressão** | Lat. *pressiō* ← *premere* / *pressare* («apertar, esmagar») | Alta | A **força** — física, social, do peito |
| **impressão** | Lat. *impressiō* ← *imprimere* (*in-* + *premere*) — «apertar **para dentro**» | Alta | A **marca** que a força deixa (papel, memória, peito) |
| **impressionado** | Particípio vivo — «recebi a marca» | Alta | Campo: *cada hora mais impressionado* |
| **expressão** | Lat. *expressiō* ← *exprimere* (*ex-* + *premere*) — «apertar **para fora**» | Alta | Irmã: o sopro sai; série [Expressões](${hubExp}) — **não** se funde com esta ficha |
| **inspiração** | Lat. *īnspīrāre* (*in-* + *spīrāre*) — sopro, não aperto | Alta | **Falso amigo** de ouvido: *impre-* ≠ *inspi-* |

**H1:** *impressão* = *in-* + **pressão** — a pressão que entra e deixa rasto.  
**H2:** *expressão* aperta para fora; *impressão* aperta para dentro; mesma família, sentidos opostos.  
**H3:** [inspiração](${inspiracao}) é outro étimo (*spīrāre*). O laboratório recusa colar as duas por soarem perto.

## 3. Camadas da impressão

| Camada | Leitura | Bom × mau |
|--------|---------|-----------|
| **Gráfico / tipográfico** | Marca no papel, no tecido, na impressão 3D | Bom: rasto verificável · Mau: confundir com [inspiração](${inspiracao}) |
| **Primeira impressão** | O que o olhar grava primeiro | Bom: [gesto](${gesto}) honesto · Mau: julgamento sem [verdade](${verdade}) |
| **Impressionado** | Peito marcado pelo ofício / pelo outro | Bom: crédito ([muitoobrigado](${muito})) · Mau: bajulação |
| **Falsa impressão** | Marca sem objecto | Mau: rumor; o antídoto é inspecionar |

## 4. Camadas da pressão

| Camada | Leitura | Limite desta ficha |
|--------|---------|-------------------|
| **Física** | Força sobre área | Literacia; ≠ tratado de física |
| **Atmosférica** | Ar que pesa | Outro mapa se pedido |
| **Arterial / «pressão alta»** | Uso clínico popular | **Ficha ≠ diagnóstico** |
| **Social / ofício** | «Estar sob pressão» | Peito + prazo; elo [risco](${risco}) |
| **Na panela** | Vapor preso sob tampa | Objecto da secção 5 |

## 5. Objecto: panela de pressão

Pedido de campo: colocar o **objecto**. A [panela de pressão](${WIKI_PANELA}) é o vaso doméstico que **segura vapor** para cozinhar mais depressa (ponto de ebulição sobe com a pressão). Antecedente clássico: o *digestor* de [Denis Papin](${WIKI_PAPIN}) (séc. XVII). No Brasil é objecto de cozinha **e** de notícia quando falha.

| Peça | Ofício |
|------|--------|
| **Panela / corpo** | Vaso que aguenta pressão acima da atmosférica |
| **Tampa + vedação** | Fecha o sistema — sem isto não há «de pressão» |
| **Válvula de escape** | Alívio: deixa sair o excesso para o sistema não ir além do desenho |
| **Válvula / pino de segurança** | Segunda linha — quando a de trabalho falha |

**Carimbo:** panela com válvula **bloqueada, entupida ou anulada** = **P de Perigo** (literacia pública, não pânico). Panela com válvula a trabalhar continua utensílio. O perigo não é cozinhar; é **prender o escape**.

> **Limite duro:** esta ficha **não** ensina a tampar, anular, amarrar ou «melhorar» a válvula. Não descreve fabrico nem truque. [Incêndio](${incendio}) / explosão doméstica = outro ofício (bombeiros, fabricante). O laboratório nomeia: **escape livre = ofício; escape preso = perigo.**

## 6. Válvula de escape

| Mapa | Nesta ficha | Fora |
|------|-------------|------|
| **Cozinha** | Peça da panela de pressão — alívio de vapor | — |
| **Metáfora do peito** | O que deixa a pressão sair sem explodir o vaso | [aff](${aff}) = válvula oral; [PQP](${pqp}) = válvula de pico — **elos**, não a peça de metal |
| **Motor / turbo** | «Válvula de escape» no carro | **Outro objecto** — recusado aqui |

**H4:** a válvula de escape é o **antónimo operacional** da impressão: a impressão guarda a marca; a válvula recusa guardar o excesso.  
**H5:** no ofício do laboratório, [aff](${aff}) e [PQP](${pqp}) são válvulas de **fala**; a da panela é de **vapor**. Mesma lição: pressão sem escape vira [risco](${risco}).

## 7. Cadeia do laboratório

| Peça | Função |
|------|--------|
| **pressão** | A força |
| **impressão** | A marca para dentro |
| **panela de pressão** | O vaso que segura |
| **válvula de escape** | O alívio que impede o vaso de mentir («aguento tudo») |
| **[aff](${aff}) / [PQP](${pqp})** | Válvulas de oralidade — elos, fichas próprias |
| **[Faça o melhor!](${mantra})** | Depois do alívio, o ofício continua |

## Nota de campo (2026-08-21)

Pedido em cadeia: *Impresssao* → relacionar com *Pressao* → objecto **panela de pressão** → **válvula de escape**. Contexto do fio: *cada hora mais impressionado* — o peito recebeu marca; a ficha devolve o mapa, não o culto.

| Campo | Registo |
|-------|---------|
| Formas pedidas | Impresssao · Pressao · panela · válvula de escape |
| Objecto | Panela de pressão (cozinha BR) |
| Peça | Válvula de escape = alívio, não truque |
| Falso amigo | [inspiração](${inspiracao}) |

## Rede aparentada

| Palavra / objecto / ficha | Relação |
|---------------------------|---------|
| [inspiração](${inspiracao}) | Falso amigo — sopro ≠ aperto |
| [aff](${aff}) | Válvula oral — libera pressão sem nomear o objecto |
| [puta que pariu](${pqp}) | Válvula de pico — ficha própria |
| [incrível](${incrivel}) | Escala do «uau» quando a impressão é forte |
| [muitoobrigado](${muito}) | Crédito depois de ficar impressionado |
| [objetos](${objetosPalavra}) · [objetos](${objetos}) | Plural do que fica à frente |
| [risco](${risco}) · [medo](${medo}) | Mapa × peito |
| [Faça o melhor!](${mantra}) | Fecho do ofício |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Palavras | [Palavras](${hub}) |
| Objectos | [Objetos](${objetos}) |
| Expressões (apertar para fora) | [Expressões](${hubExp}) |
| Mantra | [Faça o melhor!](${mantra}) · [poema](${poemMantra}) |
| Vida | [Vida](${vida}) · [Guia](${guia}) · [hub](${hubAll}) |

## Limites

- Não protocola tensão arterial nem depressão clínica.  
- Não ensina a cozinhar sob pressão nem a desmontar a panela.  
- Não anula a válvula — **nomeia** o perigo de a anular.  
- Escape de motor / turbo = outro objecto.  
- [inspiração](${inspiracao}) fica na ficha dela.

## Veredicto

**Aprovado na série Palavras** — *impressão* fichada como marca de *premere* para dentro; *pressão* como a força; **panela de pressão** como o vaso; **válvula de escape** como o alívio. Falso amigo: [inspiração](${inspiracao}). Perigo: escape preso. Depois do vapor, [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Aff](${aff}) · [▶ Inspiração](${inspiracao}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **impression / pressure** (*impressão* / *pressão*). Field request also placed the **pressure cooker** and the **release valve**. Shared etymon: Lat. *premere* (“to press”). Pressure is the force; impression is the mark pressed **in**; the cooker is the vessel; the valve is the escape before [risk](${risco}) has no map.

> Independent audit. Sources: [Wiktionary](${WIKT_IMP}), [pressure cooker](${WIKI_PANELA}), [Papin](${WIKI_PAPIN}). **Sheet ≠ cooking manual, ≠ how to block a valve, ≠ blood-pressure protocol.**

## Object

| Field | Value |
|-------|-------|
| Anchors | **impressão** · **pressão** |
| Kitchen object | **pressure cooker** |
| Critical part | **release / safety valve** |
| False friend | [inspiration](${inspiracao}) (*spīrāre*) |
| Date | ${inspected} |

## Reading

**H1:** impression = *in-* + pressure — force leaving a mark.  
**H2:** expression presses **out**; impression presses **in**.  
**H3:** a blocked cooker valve is **P for Danger** — literacy, not a recipe.  
**H4:** [aff](${aff}) is an oral valve; the cooker’s is steam. Same lesson: pressure without escape becomes [risk](${risco}).

## Verdict

**Approved** — family filed; cooker and valve named; no disable instructions. Then [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **impressão / pressão**. Pedido de campo: **olla a presión** y **válvula de escape**. Étimo: lat. *premere*. La presión es la fuerza; la impresión es la marca **hacia dentro**; la olla es el vaso; la válvula deja salir el exceso.

> Auditoría independiente. **Ficha ≠ receta, ≠ cómo anular la válvula, ≠ protocolo clínico.**

## Objeto

| Campo | Valor |
|-------|-------|
| Anclas | **impressão** · **pressão** |
| Objeto | **olla a presión** |
| Pieza | **válvula de escape** |
| Falso amigo | [inspiración](${inspiracao}) |
| Fecha | ${inspected} |

## Lectura

**H1:** impresión = *in-* + presión.  
**H2:** expresión aprieta hacia fuera; impresión hacia dentro.  
**H3:** válvula bloqueada = **P de Perigo** — literacia, no receta.  
**H4:** [aff](${aff}) es válvula oral; la de la olla es vapor.

## Veredicto

**Aprobada** — familia fichada; olla y válvula nombradas; sin instrucciones de anulación. Luego [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_IMP };
}

function buildImpressaoPressaoPost() {
  const { body, contentEn, contentEs, wiki } = buildImpressaoPressaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-impressao-pressao', 172);
  const post = makePalavra({
    title: 'Inspeção: Impressão · Pressão — panela e a válvula de escape',
    titleEn: 'Inspection: Impression · Pressure — cooker and the release valve',
    titleEs: 'Inspección: Impresión · Presión — olla y la válvula de escape',
    excerpt:
      'Palavras: impressão = pressão para dentro (premere); objecto panela de pressão + válvula de escape; ≠ inspiração; ficha ≠ anular válvula; Faça o melhor!',
    excerptEn:
      'Words: impression = pressure inward (premere); pressure-cooker + release valve; ≠ inspiration; sheet ≠ how to block a valve; Do your best!',
    excerptEs:
      'Palabras: impresión = presión hacia dentro; olla a presión + válvula de escape; ≠ inspiración; ficha ≠ anular válvula; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-impressao-pressao',
    date: '2026-08-21T20:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Impressão · Pressão · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildImpressaoPressaoPost, buildImpressaoPressaoBodies };
