'use strict';

/**
 * Inspeção objecto · afinador (de cordas de violão)
 * Eixos: afinar + -dor · clip / diapasão / app · lê a frequência;
 * a mão escreve tónos na tarraxa · muleta, não dono · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/afinador-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/afinador';
const WIKI = 'https://pt.wikipedia.org/wiki/Afinador';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Electronic_tuner';
const WIKT_DIA = 'https://pt.wiktionary.org/wiki/diapas%C3%A3o';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildAfinadorBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-afinador.html';
  const afinar = '/posts/post-inspecao-palavra-afinar.html';
  const violao = '/posts/post-inspecao-palavra-violao.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const guia = '/guia/palavras.html';

  const body = `## Escopo

Inspeção editorial do **objecto [afinador](${self})** — no português do Brasil, a **peça que lê o tom das [cordas](${corda}) do [violão](${violao})** (clip cromático, diapasão, app, pedal). Pedido de campo: *inspeção em afinador de cordas de violão*. O verbo é [afinar](${afinar}); esta ficha é a **coisa**. Entra no catálogo [Objetos](${objetos}) como muleta de ofício: **nomeia a frequência**; a mão, na tarraxa, **escreve o [tónos](${tonos})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · afinador](${WIKT}), [Wikipédia · afinador](${WIKI}), [electronic tuner](${WIKI_EN}), [diapasão](${WIKT_DIA}). **Ficha ≠ aula de afinação, ≠ tabela de marcas, ≠ método corda a corda.** Sem afiliação comercial. Tom: Inspetor BudGanja — o afinador **não substitui o ouvido**. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **afinador** (de [cordas](${corda}) de [violão](${violao})) |
| Classe | Substantivo masculino — agente de *afinar* + *-dor* |
| Étimo (trabalho) | *afinar* + *-dor* ← *a-* + *fino* ← lat. *fīnis* — «o que põe no tom» — confiança: **alta** ([ficha afinar](${afinar})) |
| Família | *afinar* · *afinação* · *afinado* · *desafinar* · *diapasão* |
| Cognatos / mapa | esp. *afinador* · ing. *tuner* / *clip-on tuner* · fr. *accordeur* (pessoa) / *accordeur électronique* |
| Tipo BudGanja | Objecto — leitor de tom × [gesto](${gesto}) na tarraxa |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | O verbo [afinar](${afinar}) · a tarraxa / cravelha (peça do [violão](${violao})) · o [passarinho](${afinar}) (diapasão vivo) · o afinador de **piano** (ofício de pessoa) |
| Elo matéria | [corda](${corda}) — o fio que vibra; [tónos](${tonos}) — a tensão que se gira |
| Elo ofício | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [verdade](${verdade}) |
| Fonte | [afinador](${WIKT}) · [afinador (WP)](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **leitor**. Microfone, piezo no capotraste ou ecrã de telemóvel: mede a frequência da [corda](${corda}) e devolve um [sinal](${sinal}) (agulha, LED, nota). Não aperta nada. Quem aperta é a mão na **tarraxa**.

## 2. Família do tom — quem faz o quê

| Peça / testemunha | O que é | Ofício nesta ficha |
|-------------------|---------|-------------------|
| **[Afinador](${self})** | Objecto-leitor (clip, diapasão, app) | **Lê** — verde / vermelho / agulha |
| **Tarraxa / cravelha** | Peça do [violão](${violao}) | **Escreve** [tónos](${tonos}) — um quarto de volta |
| **[Corda](${corda})** | Matéria que canta | Vibra; parte se o LED mandar demais |
| **Ouvido** | Sensor vivo | Confirma; o clip é muleta |
| **Passarinho assobiando** | Diapasão sem bateria | Já no tom — [afinar](${afinar}) · [Three Little Birds](${birds}) |
| **Afinador (pessoa)** | Ofício (piano, órgão) | Outro mapa — **não** esta peça de bolso |

**H1:** *afinador* = *afinar* + *-dor* — o que (ou quem) põe no tom (alta).  
**H2:** no BR de violão, *afinador* hoje puxa o **clip cromático** na cabeça do braço.  
**H3:** diapasão (garfo A 440) e app são a **mesma função** noutro invólucro.  
**H4:** o objecto **não afina**; **informa**. Afinar continua a ser [gesto](${gesto}).

## 3. Formas do objecto (mapa curto)

| Forma | Como lê | No lab |
|-------|---------|--------|
| **Clip cromático** | Piezo na cabeça do [violão](${violao}) — vibração, não o ar da sala | Forma-mãe contemporânea; serve com TV ligada |
| **Diapasão** (garfo) | A 440 Hz por simpatia / ouvido | Avô do objecto; pede [skill](${skill}) de comparar |
| **Sopro / pitch pipe** | Nota soprada | Vizinho do assobio — ainda é muleta |
| **App / telemóvel** | Microfone do telefone | Objecto-empréstimo; a sala desafina o microfone |
| **Pedal** | Sinal eléctrico | Mais [guitarra](${violao}) eléctrica do que nylon |
| **Embutido** | No próprio instrumento | A caixa já traz o leitor |

**Afinação-mãe do violão (padrão BR):** 6ª → 1ª = **Mi–Lá–Ré–Sol–Si–Mi** (E A D G B E). O afinador **nomeia** a nota; não escolhe o repertório.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **LED verde** | «Já está bom» | No tom **desta** referência (A 440, ou outra) — não a [verdade](${verdade}) da música |
| **Marca / SKU** | O nome da loja afina | Sem afiliação — inspecionar a **função** |
| **App** | De graça = sem objecto | Continua a ser afinador — outro invólucro |
| **Ouvido** | Superado pelo clip | O clip é [luz](${luz}) de serviço; o ouvido é ofício |
| **Desafinado** | Fracasso do objecto | Informação: falta (ou sobra) [tónos](${tonos}) |
| **Apertar até partir** | Obedecer ao vermelho | [Risco](${risco}): a [corda](${corda}) não é o LED |

**H-parece:** o afinador afina o violão.  
**H-é:** o afinador **lê**; a tarraxa **escreve**; o ouvido **assina**.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «pega o afinador» | Bom: a peça |
| **Ofício** | «afina no afinador e confirma no ouvido» | Bom: muleta + [gesto](${gesto}) |
| **Pessoa** | «o afinador vem amanhã» (piano) | Outro mapa — nomear a **pessoa** |
| **App** | «abre o afinador no celular» | Bom se a sala deixar; mau se o microfone mentir |
| **Idolatrar** | «sem o clip não toco» | Mau: [skill](${skill}) refém da bateria |
| **Partir corda** | «tava vermelho, apertei» | Mau: o LED não tem limite de newton |

**Finalidade-mãe:** nomear o **afinador de cordas de violão** para inspecionar a **coisa que lê o tom** — clip, diapasão ou app — sem virar tutorial nem vitrine, sem substituir o [afinar](${afinar}).

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Leitor de frequência — [sinal](${sinal}) na [corda](${corda}) |
| Gesto | Um quarto de volta na tarraxa — [gesto](${gesto}) com [tónos](${tonos}) |
| Anti-armadilha | Verde ≠ música; clip ≠ ouvido; aperto demais = [risco](${risco}) |
| Testemunha viva | Passarinho assobiando — [afinar](${afinar}) · [Three Little Birds](${birds}) |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** violão, hoje |
| Poema | [poema Vida](${poemMantra}) · [Diário](${diario}) |

**Veredicto:** Valeu !!! — o **afinador** é objecto-muleta: lê a [corda](${corda}) do [violão](${violao}); quem [afina](${afinar}) é a mão.

## Hipóteses (síntese)

**H1:** *afinador* < *afinar* + *-dor*.  
**H2:** função = ler frequência; acto = [gesto](${gesto}) na tarraxa.  
**H3:** clip / diapasão / app = mesma função, invólucros diferentes.  
**H4:** ≠ tarraxa ≠ verbo ≠ passarinho ≠ afinador de piano (pessoa).  
**H5:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Afinar](${afinar}) | O verbo — pôr no tom |
| [Violão](${violao}) | O objecto onde as [cordas](${corda}) cantam |
| [Corda](${corda}) | O fio que o clip lê |
| [Tónos](${tonos}) | A tensão que a tarraxa escreve |
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) | Mão com rasto |
| [Sinal](${sinal}) · [luz](${luz}) · [pattern](${pattern}) | LED / agulha / nota |
| [Risco](${risco}) | Corda demais = parte |
| [Three Little Birds](${birds}) | Diapasão vivo |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não ensina corda a corda nem escolhe marca.  
- Não calibra A 432 vs A 440 como doutrina.  
- Não trata o afinador de piano (pessoa) nem o pedal de palco como o mesmo SKU.  
- O passarinho continua na ficha [afinar](${afinar}) — aqui só como testemunha de que o clip não é dono.

## Status

**Aprovado** — **afinador** fichado como **objecto** (*afinar* + *-dor*): lê as [cordas](${corda}) do [violão](${violao}); a tarraxa escreve; o ouvido assina. Catálogo [Objetos](${objetos}). Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Afinar](${afinar}) · [▶ Violão](${violao}) · [▶ Corda](${corda}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian Portuguese **afinador** — the **object** that **reads** the pitch of [violão](${violao}) [strings](${corda}) (clip-on chromatic tuner, fork, app). The verb is [afinar](${afinar}); this sheet is the **thing**. Catalog: [Objetos](${objetos}). The tuner **names** frequency; the hand on the peg **writes** [tónos](${tonos}). Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · afinador](${WIKT}), [electronic tuner](${WIKI_EN}). Not a lesson, shop, or brand sheet. The gadget does not replace the ear.

## Object

| Field | Value |
|-------|-------|
| Thing | Pitch reader — clip / fork / app |
| Etymon | *afinar* + *-dor* — “that which tunes” |
| Not | The verb · the peg (part of the guitar) · the whistling bird · a piano tuner (person) |
| Standard | E A D G B E (Mi–Lá–Ré–Sol–Si–Mi) |
| Links | [afinar](${afinar}) · [violão](${violao}) · [corda](${corda}) · [tónos](${tonos}) |
| Date | ${inspected} |

## Seems vs is

**Seems:** the tuner tunes the guitar.  
**Is:** the tuner **reads**; the peg **writes**; the ear **signs**. Green LED ≠ music.

## Status

**Approved** — tuner as helper object; strings live on the violão; no brand affiliation.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Afinar](${afinar}) · [▶ Violão](${violao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Afinador** (portugués de Brasil) — el **objeto** que **lee** el tono de las [cuerdas](${corda}) del [violão](${violao}) (clip cromático, diapasón, app). El verbo es [afinar](${afinar}); esta ficha es la **cosa**. Catálogo: [Objetos](${objetos}). El afinador **nombra** la frecuencia; la mano en la clavija **escribe** el [tónos](${tonos}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wikcionario · afinador](${WIKT}). No es método, tienda ni marca. El gadget no sustituye el oído.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Lector de tono — clip / diapasón / app |
| Étimo | *afinar* + *-dor* |
| No es | El verbo · la clavija · el pajarito · el afinador de piano (persona) |
| Estándar | Mi–La–Re–Sol–Si–Mi (E A D G B E) |
| Vínculos | [afinar](${afinar}) · [violão](${violao}) · [corda](${corda}) |
| Fecha | ${inspected} |

## Parece × es

**Parece:** el afinador afina la guitarra.  
**Es:** el afinador **lee**; la clavija **escribe**; el oído **firma**. LED verde ≠ música.

## Estado

**Aprobada** — afinador como objeto-muleta; las cuerdas cantan en el violão; sin afiliación.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Afinar](${afinar}) · [▶ Violão](${violao}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildAfinadorPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildAfinadorBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-afinador', 199);
  return makePalavra({
    title: 'Inspeção: Afinador — o objecto que lê a corda do violão',
    titleEn: 'Inspection: Afinador — the object that reads the guitar string',
    titleEs: 'Inspección: Afinador — el objeto que lee la cuerda del violão',
    excerpt:
      'Objecto: «afinador» (afinar + -dor) — clip / diapasão / app lê a corda do violão; a tarraxa escreve o tónos; muleta, não dono; Valeu !!!',
    excerptEn:
      'Object: “afinador” (afinar + -dor) — clip / fork / app reads the guitar string; the peg writes tónos; crutch, not owner; Valeu !!!',
    excerptEs:
      'Objeto: «afinador» (afinar + -dor) — clip / diapasón / app lee la cuerda del violão; la clavija escribe el tónos; muleta, no dueño; ¡Valeu !!!',
    slug: 'inspecao-palavra-afinador',
    date: '2026-08-22T06:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Afinador · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildAfinadorPost, buildAfinadorBodies };
