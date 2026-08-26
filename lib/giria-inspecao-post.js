'use strict';

/**
 * Inspeção Palavras · gíria
 * Eixos: fala de grupo (étimo controverso / jerigonza) ·
 * a orelha cola girino (γυρῖνος, o animal) ·
 * gatilho anival gerino · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/giria-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/gíria';
const WIKT_GIRINO = 'https://pt.wiktionary.org/wiki/girino';
const WIKT_GYRINUS = 'https://en.wiktionary.org/wiki/gyrinus';
const WIKI_GIRIA = 'https://pt.wikipedia.org/wiki/Gíria';
const WIKI_GIRINO = 'https://pt.wikipedia.org/wiki/Girino';
const CIBER = 'https://ciberduvidas.iscte-iul.pt/consultorio/perguntas/a-origem-da-palavra-giria/10956';

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

function buildGiriaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const expressoes = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-giria.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const alivio = '/posts/post-inspecao-palavra-alivio.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const total = '/posts/post-inspecao-palavra-total.html';
  const ganja = '/posts/post-inspecao-palavra-ganja.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';

  const body = `## Escopo

Inspeção editorial da palavra **[gíria](${self})** — a **fala de grupo**. Pedido de campo: *inspeção da palabra giria* · página dedicada às gírias · **inspeção do anival gerino**. [A orelha cola](${orelhaCola}) *gíria* no [animal](${animal}) **girino**. O étimo **corta**: uma é vocabulário de grupo; o outro é a **larva redonda**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · gíria](${WIKT}), [girino](${WIKT_GIRINO}), lat. [*gyrinus*](${WIKT_GYRINUS}), [Wikipédia · Gíria](${WIKI_GIRIA}), [Girino](${WIKI_GIRINO}), [Ciberdúvidas · origem](${CIBER}). **Ficha ≠ dicionário de gírias BR, ≠ protocolo de herpetologia.** Étimo de *gíria*: **controverso** (média). Série [Palavras](${hub}). O [animal](${animal}) fica animal — método [bode](${bode}). Esta ficha é a **sala** das gírias já indexadas no laboratório.

**Gatilho:** *giria* / *gíria* / *anival* / *gerino* / *girino* / *palabra giria*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **gíria** (pl. *gírias*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Esp. *jerigonza* / *geringonça* — derivação regressiva; Corominas: *gíriga* — confiança: **média** (origem controversa) |
| Família viva | *giriar* (raro) · esp. *jerga* / *jerigonza* · fr. *jargon* / *argot* · ing. *slang* / *jargon* |
| Tipo BudGanja | Palavra — fala de grupo × par ilusório **girino** × sala das gírias |
| Não é | **girino** (a larva) · **jargão** (fala de ofício) · **calão** (camada grosseira) · [expressão](${expressoes}) (frase feita) |
| Elo animal | **girino** · [animal](${animal}) · hub [Animais](${animais}) · [bode](${bode}) · [alívio / veado](${alivio}) |
| Fonte | [Wikcionário](${WIKT}) · [Ciberdúvidas](${CIBER}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia a **linguagem de grupo** — nova, metafórica, às vezes ininteligível de fora. Não é o girino da poça.

## O animal — girino

Pedido: *inspeção do anival gerino*. *Anival* = [animal](${animal}). *Gerino* = **girino** (e por e).

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **girino** | Pedaço de *gíria* | Gr. γυρῖνος via lat. *gyrinus* — larva de anfíbio; γῦρος = redondo |
| **gerino** | Palavra nova | Lapso de *girino* — gatilho de campo |
| **gíria** | O bicho na poça | Fala de grupo — *jerigonza* / origem controversa |
| **anival** | Palavra nova | Lapso de [animal](${animal}) — como *aninal* em [alívio](${alivio}) |

O girino **nada em círculo** antes da metamorfose. Sem página de espécie no hub [Animais](${animais}) ainda. Método [bode](${bode}): o animal fica animal.

## O que a orelha cola — e o étimo corta

O olho lê GI-RI nas duas: *gí**ria*** / *gi**rino***.

**H1:** *gíria* < esp. *jerigonza* (regressiva) / *gíriga* (Corominas) — fala especial, difícil de fora. **Média.** José Pedro Machado e Cunha marcam origem **obscura**.  
**H2:** *girino* < γυρῖνος / *gyrinus* — o redondo da larva. **Alta.** ≠ *gíria*.  
**H3:** [a orelha cola](${orelhaCola}) porque o som parte igual; o [étimo](${etimologia}) corta.  
**H4:** *gíria* ≠ **jargão** (vocabulário de ofício) ≠ **calão** (camada rude). Três andares, um edifício.  
**H5:** esta ficha **indexa** gírias já cortadas noutras salas; **não** inventaria o Brasil inteiro.

## Camadas vivas de *gíria*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Grupo** | Vocabulário que distingue quem está dentro | Alta |
| **Vocábulo** | Uma peça (*uma gíria*) | Alta |
| **Astúcia** | Uso popular: manha / levar vantagem | Média (dicionários) |
| **Jargão** | Fala de ofício (médico, lab, código) — primo, não sinónimo | Alta no corte |
| **Calão** | Camada grosseira / obscena | Alta no uso; **≠** ofício desta ficha |

## Sala das gírias — o que o laboratório já cortou

A página dedicada **é esta ficha**. Cada gíria vive na palavra-mãe; aqui só o **índice**.

| Gíria / camada | Onde o étimo corta |
|----------------|-------------------|
| [legal](${legal}) «bacana» | *legālis* — a lei primeiro |
| [total](${total}) «total!» | *tōtus* — o inteiro primeiro |
| [bode](${bode}) «estar de bode» | o macho caprino primeiro |
| [veado](${alivio}) (gíria BR) | o cervídeo *venātus* primeiro — indexar, sem ofício |
| [ganja](${ganja}) / [maconha](${maconha}) | rota e nome; gíria e marca por cima |
| [ufa](${ufa}) | o sopro; *legal* se couber o sorriso |
| **girino** | o animal — nesta ficha |

Bom ofício: **indexar** a camada, voltar ao étimo, [respeito](${respeito}). Mau: usar a gíria como se fosse o nome da coisa.

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* par *hoje*: a fala de grupo tem nome; o girino tem poça; a orelha cola e o étimo solta.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Girino](${WIKI_GIRINO}) · [animal](${animal}) · [Animais](${animais}) | O bicho — ainda sem ficha de espécie |
| [Bode](${bode}) · [alívio / veado](${alivio}) | Método: animal primeiro |
| [Legal](${legal}) · [total](${total}) · [ganja](${ganja}) | Camadas de gíria já cortadas |
| [Expressões](${expressoes}) | Frase feita — outro andar |
| [Língua portuguesa](${lingua}) · [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) | Método do corte |
| [Respeito](${respeito}) · [verdade](${verdade}) · [gesto](${gesto}) | Indexar sem exercer o dano |
| [Guia de Palavras](${guia}) · [Valeu !!!](${mantra}) | Glossário e fecho |

## Limites

- Não é dicionário de gírias regionais.  
- Étimo de *gíria* fica **controverso** — não fechar dogma.  
- Não abre ficha de espécie no hub [Animais](${animais}) nesta entrega.  
- *Anival* / *gerino* = lapsos, não lemas.

## Status

**Aprovado na série Palavras** — *gíria* fichada como fala de grupo (origem controversa); [a orelha cola](${orelhaCola}) o [animal](${animal}) **girino** (γυρῖνος); esta ficha é a sala das gírias.

[▶ Palavras](${hub}) · [▶ Girino (Wikipédia)](${WIKI_GIRINO}) · [▶ Animal](${animal}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **gíria** — **in-group speech**. Field request: *palabra giria* · dedicated slang room · **anival gerino**. [The ear glues](${orelhaCola}) *gíria* to the [animal](${animal}) **girino** (tadpole). The etymon **cuts**: one is group talk; the other is the **round larva**.

> **Method note:** [Wiktionary · gíria](${WIKT}), [girino](${WIKT_GIRINO}), Lat. [*gyrinus*](${WIKT_GYRINUS}). Etymon of *gíria*: **controversial** (medium). **Not** a slang dictionary. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **gíria** |
| Etymon | Sp. *jerigonza* / *geringonça* (regressive); Corominas *gíriga* — medium |
| Animal | **girino** ← Gk. γυρῖνος / Lat. *gyrinus* — tadpole |
| Glue | GI-RI in *gíria* and *girino*; slip *gerino* / *anival* |
| Date | ${inspected} |

This sheet is the lab’s **slang room**: layers already cut ([legal](${legal}), [total](${total}), [bode](${bode}), [veado](${alivio})) stay on their mother words. [Valeu !!!](${mantra})

## Status

**Approved in Words** — in-group speech; ear-glue to *girino* cut.

[▶ Words](${hub}) · [▶ Animal](${animal}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **gíria** — **habla de grupo**. Pedido: *palabra giria* · sala de jergas · **anival gerino**. [El oído pega](${orelhaCola}) *gíria* al [animal](${animal}) **girino** (renacuajo). El étimo **corta**: una es habla de grupo; el otro es la **larva redonda**.

> **Nota:** [Wikcionario · gíria](${WIKT}), [girino](${WIKT_GIRINO}). Étimo de *gíria*: **controvertido** (media). **No** es diccionario de jergas. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **gíria** |
| Étimo | Esp. *jerigonza* / *geringonça*; Corominas *gíriga* — media |
| Animal | **girino** ← gr. γυρῖνος / lat. *gyrinus* — renacuajo |
| Cola | GI-RI; lapsus *gerino* / *anival* |
| Fecha | ${inspected} |

Esta ficha es la **sala de jergas** del laboratorio. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — habla de grupo; cola de oído con *girino* cortada.

[▶ Palabras](${hub}) · [▶ Animal](${animal}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildGiriaPost() {
  const { body, contentEn, contentEs } = buildGiriaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-giria', 243);
  return makePalavra({
    title: 'Inspeção: Gíria — fala de grupo; a orelha cola girino (o animal)',
    titleEn: 'Inspection: Gíria — in-group speech; the ear glues girino (the tadpole)',
    titleEs: 'Inspección: Gíria — habla de grupo; el oído pega girino (el renacuajo)',
    excerpt:
      'Palavras: gíria (origem controversa / jerigonza) — fala de grupo; a orelha cola girino (γυρῖνος); gatilho anival gerino; Valeu !!!',
    excerptEn:
      'Words: gíria (controversial / jerigonza) — in-group speech; the ear glues girino (γυρῖνος); slip anival gerino; Valeu !!!',
    excerptEs:
      'Palabras: gíria (origen controvertido / jerigonza) — habla de grupo; el oído pega girino (γυρῖνος); lapsus anival gerino; ¡Valeu !!!',
    slug: 'inspecao-palavra-giria',
    date: '2026-08-22T21:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Gíria · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGiriaPost,
  buildGiriaBodies
};
