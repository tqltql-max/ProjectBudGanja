'use strict';

/**
 * Inspeção Palavras · Moçambique
 * Eixos: país lusófono · étimo Mussa Bin Bique / Musa ibn Bique ·
 * tónos na sílaba BI · lapso «esqueiro biq» (Biq × isqueiro BIC)
 * Ficha de topónimo/país, não guia turístico nem manifesto colonial.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mocambique-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Mo%C3%A7ambique';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildMocambiqueBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-mocambique.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const tonico = '/posts/post-inspecao-palavra-tonico.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiEn = 'https://en.wikipedia.org/wiki/Mozambique';
  const wikiIlha = 'https://pt.wikipedia.org/wiki/Ilha_de_Mo%C3%A7ambique';
  const wikiMusa = 'https://en.wikipedia.org/wiki/Musa_ibn_Bique';
  const wikt = 'https://en.wiktionary.org/wiki/Mozambique';

  const body = `## Escopo

Inspeção editorial da palavra **[Moçambique](${self})** — o **país** no Índico (EN *Mozambique*; sw. *Msumbiji*). Pedido de campo: *inspeção em Moçambique relacionando tónos com esqueiro biq*. O lab lê **três âncoras coladas**: o **país**, o **[tônico](${tonico})** da palavra (gr. *tónos* — o pico cai em **BI**), e o lapso **esqueiro biq** = **[isqueiro BIC](${isqueiro})** × **Biq** (xeique *Mussa Bin Bique* / *Musa ibn Bique*, étimo tradicional do topónimo). Esta ficha cobre o **país**, o **nome**, o **tónos da sílaba** e a **correção**: país ≠ marca de isqueiro. Elos: [isqueiro BIC](${isqueiro}), [tônico](${tonico}), [língua portuguesa](${lingua}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Moçambique](${WIKI}), [EN](${wikiEn}), [Ilha de Moçambique](${wikiIlha}), [Musa ibn Bique](${wikiMusa}), [Wiktionary · Mozambique](${wikt}). **Ficha ≠ guia de viagem, ≠ história completa da independência, ≠ laudo colonial.** O étimo do nome é **tradicional** (várias grafias do xeique). Homofonia **Biq × BIC** = coincidência de ouvido, **não** parentesco de marca. Sem afiliação a Estados nem à Société Bic.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Moçambique** (PT) |
| Formas vivas | **Mozambique** (EN/FR) · sw. *Msumbiji* · teclado *Mocambique* · lapso **esqueiro biq** |
| Classe | Topónimo — Estado soberano |
| Capital | Maputo |
| Língua oficial | **Português** (outras línguas nacionais: emakhuwa, xichangana, elomwe, cisena…) |
| Independência | 25 de junho de 1975 |
| Étimo (trabalho) | Ilha de Moçambique ← xeique **Mussa Bin Bique** / *Musa ibn Bique* / *Musa al-Big* (séc. XV–XVI) — confiança: **média–alta** (tradição historiográfica; grafias oscilam) |
| Não é | [isqueiro BIC](${isqueiro}) · marca Bic · escada minhota *esqueiro* |
| Tipo BudGanja | Palavra — país × étimo Biq × tónos da sílaba **BI** |
| Elo tónos | [tônico](${tonico}) — pico *Mo-çam-**BI**-que* |
| Elo objecto | [isqueiro BIC](${isqueiro}) — o que o lapso cola ao nome |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [língua portuguesa](${lingua}) |
| Fonte | [Moçambique](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do país**. A boca do lab pediu *tónos* e *esqueiro biq*; a âncora escrita em PT é **Moçambique**. O **BI** tónico do vocábulo é o mesmo som que **Biq** (xeique) e **BIC** (isqueiro) — três ofícios, um pico.

## 2. Quatro camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **País** | República de Moçambique — Estado na África Oriental | Alta |
| **Ilha** | [Ilha de Moçambique](${wikiIlha}) (Nampula) — primeira capital colonial; o nome **saiu da ilha** para o território | Alta |
| **Étimo Biq** | Xeique *Mussa Bin Bique* / *Musa ibn Bique* — comerciante omanita na ilha antes de 1544 | Média–alta (nome tradicional; grafias *Bin Bique*, *Ben Mbiki*, *al-Big*, *ibn Malik*…) |
| **Tónos da palavra** | Sílaba tónica = **BI** (*Mo-çam-**BI**-que*, paroxítona) | Alta |
| **Lapso esqueiro biq** | Teclado/boca a caminho de **isqueiro BIC** **e** **Biq** | Alta (oralidade do lab) |

**H1:** *Mozambique* no atlas = a mesma âncora **Moçambique**.  
**H2:** *esqueiro biq* não é um terceiro país — é **duas fichas coladas** (país × [isqueiro](${isqueiro})).  
**H3:** o [tônico](${tonico}) de *Moçambique* cai em **BI** — o mesmo pico que o lapso nomeia.  
**H4:** **Biq** (xeique) ≠ **BIC** (marca francesa, 1973) — homofonia, não genealogia.

## 3. O tónos: por que BI

Na [língua portuguesa](${lingua}), **sílaba tónica** é o pico de força na boca — ofício 1 da ficha [tônico](${tonico}) (gr. *tónos*, tensão / tom / corda).

| Peça | Onde aperta | Leitura lab |
|------|-------------|-------------|
| **Mo-** | átona | Ataque |
| **-çam-** | átona | Corpo nasal |
| **-BI-** | **tónica** | O pico — *Biq* / *BIC* mora aqui |
| **-que** | átona | Queda |

**Veredicto tónico:** relacionar *tónos* com *esqueiro biq* **em Moçambique** não é metáfora solta. É ouvir onde a palavra **aperta**: o país carrega o nome no **BI**. O [isqueiro BIC](${isqueiro}) é o objecto que o ouvido cola a esse pico; o xeique **Biq** é o étimo que o pico conserva.

## 4. Moçambique × Biq × BIC × esqueiro

| Forma | O que o lab lê |
|-------|----------------|
| **Moçambique** | País — esta ficha |
| **Mozambique** | Grafia internacional do **mesmo** país |
| **Mussa Bin Bique / Musa ibn Bique** | Pessoa tradicional do étimo — *Biq* / *Bique* |
| **BIC** | Marca do [isqueiro](${isqueiro}) (Marcel Bich → BIC, isqueiro de bolso 1973) |
| **isqueiro** | Utensílio (*isca* + *-eiro*, lat. *esca*) — ficha [isqueiro BIC](${isqueiro}) |
| **esqueiro** | Lapso de *isqueiro* (grafia viva BR/PT); em PT-PT minhoto, também **escada de mão** (outro objecto) |
| **esqueiro biq** | Lapso de campo: isqueiro + Biq — ler **esta** ficha **e** a do [isqueiro](${isqueiro}) |

**H-nome:** quem escreve *esqueiro biq* misturou **país** (Biq) e **utensílio** (isqueiro BIC).  
**H-marca:** a BIC tem presença comercial em Moçambique (ex. Bic Moçambique, Lda, Matola) — isso **não** faz do país um produto Bic.  
**H-tónos:** a tensão da sílaba (**BI**) e a tensão do polegar no isqueiro são dois ofícios do mesmo *tónos* — sem fundir.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Som** | Moçambique ≈ BIC | País ≠ marca; o pico **BI** é homófono |
| **Étimo** | O isqueiro *explica* o nome | O nome vem da **ilha** e do **xeique**; o isqueiro é de 1973 |
| **Esqueiro** | Palavra nova / erro total | Lapso de *isqueiro*; em Minho, outro objecto (escada) |
| **África lusófona** | Só colónia na ficha | Estado soberano; português oficial **entre** línguas africanas |
| **Tónos** | «Tom» vago | Sílaba tónica **e** tensão do gesto no [isqueiro](${isqueiro}) |

**Veredicto contraste:** parece um só vocábulo; são **país**, **pessoa do étimo** e, no lapso, um **isqueiro**.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «esqueiro biq é o nome certo» | Âncora: **Moçambique** (país) ou **[isqueiro BIC](${isqueiro})** (objecto) |
| «Moçambique vem da marca BIC» | Étimo tradicional = **Mussa Bin Bique**; BIC = homofonia posterior |
| «tónos não tem nada a ver» | O pico da palavra *é* **BI** — ofício 1 de [tônico](${tonico}) |
| «esqueiro é a forma BR» | Forma canónica: **isqueiro** (*isca* + *-eiro*) |
| «o país é só a ilha» | A ilha **deu o nome**; o Estado é o território |

**Veredicto correção:** **Moçambique = país.** Mozambique = grafia. *esqueiro biq* = lapso. Biq = étimo. BIC = [isqueiro](${isqueiro}). *tónos* = o pico **BI**.

## 7. Usos no português (BR e MZ)

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Estado** | «fui a Moçambique» | Bom: país · Mau: reduzir a colónia ou a ilha |
| **Grafia** | Mozambique | Bom: mesma âncora · Mau: achar que muda o mapa |
| **Étimo** | Mussa Bin Bique | Bom: tradição do nome · Mau: uma só grafia como facto fechado |
| **Lapso** | esqueiro biq | Bom: pedir inspeção · Mau: fundir com [isqueiro BIC](${isqueiro}) sem etiqueta |
| **Tónos** | «o BI de Moçambique» | Bom: sílaba tónica · Mau: fundir com chá tónico |

## Hipóteses (síntese)

**H1:** âncora PT = **Moçambique**; *Mozambique* = boca internacional.  
**H2:** *esqueiro biq* = Moçambique (Biq) × [isqueiro BIC](${isqueiro}).  
**H3:** o [tônico](${tonico}) da palavra cai em **BI** — daí relacionar *tónos* com *biq*.  
**H4:** étimo do xeique ≠ genealogia da marca Bic.  
**H5:** fecho [Faça o melhor!](${mantra}); ficha ≠ atlas nem história da Frelimo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Isqueiro BIC](${isqueiro}) | O objecto que o lapso cola ao **BI** |
| [Tônico](${tonico}) | Mapa de *tónos* — aqui, sílaba tónica |
| [Língua portuguesa](${lingua}) | Português oficial em Moçambique; travessia atlântica |
| [Fogo](${fogo}) · [cinzeiro](${cinzeiro}) | Cadeia do acender — sem endosso de fumo |
| [Maconha](${maconha}) | Léxico afro-atlântico (diamba / bantu) — outro [caminho](${caminho}) África ↔ BR; **não** é esta ficha |
| [Paraguai](${paraguai}) | Irmão de método: país × lapso de nome |
| [Verdade](${verdade}) · [respeito](${respeito}) | Não apagar o xeique nem inflar a marca |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Limites

- Não ensina história diplomática, guerra colonial nem independência completa.  
- Não escolhe **uma** grafia do xeique como facto único.  
- Não trata o país como produto Bic nem o isqueiro como étimo.  
- Não é incentivo ao tabaco — o [isqueiro](${isqueiro}) é utensílio de [fogo](${fogo}).

## Status

**Aprovado** — **Moçambique** fichado como país; **Biq** como étimo tradicional; **esqueiro biq** como lapso rumo a [isqueiro BIC](${isqueiro}); *tónos* lido na sílaba **BI**.

[▶ Palavras](${hub}) · [▶ Isqueiro BIC](${isqueiro}) · [▶ Tônico](${tonico}) · [▶ Língua portuguesa](${lingua}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **Moçambique** — the **country** (EN **Mozambique**; Swahili *Msumbiji*). Field request: relate **tónos** with **esqueiro biq**. The slip mixes **[BIC lighter](${isqueiro})** with **Biq** (sheikh *Musa ibn Bique*, traditional etymon). The word’s stress (*tónos*) falls on **BI**. Links: [tonic](${tonico}), [Portuguese](${lingua}), [Do your best!](${mantra}).

> Sources: [Moçambique](${WIKI}), [Musa ibn Bique](${wikiMusa}). **Not a travel guide.** Homophony Biq × BIC is **not** brand genealogy.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Moçambique** · **Mozambique** |
| Stress | *Mo-çam-**BI**-que* |
| Not | [BIC lighter](${isqueiro}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** the country is named after a lighter.  
**Is:** the name comes from the **island** and the **sheikh**; BIC (1973) is a later homophone. *esqueiro* is a slip for *isqueiro* (and, in Minho, a small ladder).

## 3. Correction

**Moçambique = country.** If the mouth said *esqueiro biq*, open this sheet **and** [BIC lighter](${isqueiro}). The [tonic](${tonico}) of the word is **BI**. Close with [Do your best!](${mantra}).

## Status

**Approved** — country sheet; slip and *tónos* separated.

[▶ Words](${hub}) · [▶ Lighter](${isqueiro}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Moçambique** — el **país** (EN **Mozambique**; sw. *Msumbiji*). Pedido: relacionar **tónos** con **esqueiro biq**. El lapsus mezcla el **[encendedor BIC](${isqueiro})** con **Biq** (jeque *Musa ibn Bique*, étimo tradicional). El acento (*tónos*) cae en **BI**. Vínculos: [tônico](${tonico}), [portugués](${lingua}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [Moçambique](${WIKI}), [Musa ibn Bique](${wikiMusa}). **No es guía de viaje.** Homofonía Biq × BIC **no** es genealogía de marca.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Moçambique** · **Mozambique** |
| Acento | *Mo-çam-**BI**-que* |
| No es | [encendedor BIC](${isqueiro}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** el país se llama como un encendedor.  
**Es:** el nombre viene de la **isla** y del **jeque**; BIC (1973) es homófono posterior. *esqueiro* es lapsus de *isqueiro*.

## 3. Corrección

**Moçambique = país.** Si la boca dijo *esqueiro biq*, abrir esta ficha **y** [encendedor BIC](${isqueiro}). El [tônico](${tonico}) de la palabra es **BI**. Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de país; lapsus y *tónos* separados.

[▶ Palabras](${hub}) · [▶ Encendedor](${isqueiro}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildMocambiquePost() {
  const { body, contentEn, contentEs, wiki } = buildMocambiqueBodies();
  const seriesOrder = pickOrder('inspecao-palavra-mocambique', 143);
  const post = makePalavra({
    title: 'Inspeção: Moçambique — o país, o tónos em BI e o lapso esqueiro biq',
    titleEn: 'Inspection: Moçambique — the country, the tónos on BI, and the slip esqueiro biq',
    titleEs: 'Inspección: Moçambique — el país, el tónos en BI y el lapsus esqueiro biq',
    excerpt:
      'Palavras: «Moçambique» — país lusófono; étimo Mussa Bin Bique; tónico em BI; lapso esqueiro biq = Biq × isqueiro BIC; Faça o melhor!',
    excerptEn:
      'Words: “Moçambique” — lusophone country; etymon Musa ibn Bique; stress on BI; slip esqueiro biq = Biq × BIC lighter; Do your best!',
    excerptEs:
      'Palabras: «Moçambique» — país lusófono; étimo Musa ibn Bique; tónico en BI; lapsus esqueiro biq = Biq × encendedor BIC; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-mocambique',
    date: '2026-08-20T22:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Moçambique · palavra',
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

module.exports = { buildMocambiquePost, buildMocambiqueBodies };
