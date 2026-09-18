'use strict';

/**
 * Inspeção Palavras · isqueiro BIC
 * Eixos: isca + -eiro · marca BIC (1973) · tónos do polegar (tensão / 42 N) ·
 * lapso «esqueiro biq» × Biq de Moçambique
 * Ficha de utensílio, não incentivo ao fumo nem anúncio da marca.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/isqueiro-bic-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Isqueiro';

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

function buildIsqueiroBicBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const tonico = '/posts/post-inspecao-palavra-tonico.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const papel = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiIsca = 'https://pt.wiktionary.org/wiki/isqueiro';
  const wikiBic = 'https://pt.wikipedia.org/wiki/Bic_(empresa)';

  const body = `## Escopo

Inspeção editorial da palavra **[isqueiro BIC](${self})** — o **utensílio** que produz [fogo](${fogo}) de bolso, e a **marca** que o tornou objecto-tipo (Société Bic; isqueiro de bolso **1973**). Pedido de campo (em [Moçambique](${mocambique})): relacionar **tónos** com **esqueiro biq**. O lab lê o lapso **esqueiro** → **isqueiro** e **biq** → **BIC** (marca) **e** **Biq** (xeique do étimo de Moçambique). Esta ficha cobre o **objecto**, o **étimo** (*isca* + *-eiro*, lat. *esca*), o **[tônico](${tonico}) físico** (tensão do polegar / norma de força) e a **correção**: isqueiro ≠ país. Elos: [Moçambique](${mocambique}), [tônico](${tonico}), [fogo](${fogo}), [cinzeiro](${cinzeiro}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · isqueiro](${wikiIsca}), [Wikipédia · Isqueiro](${WIKI}), [Bic (empresa)](${wikiBic}). **Ficha ≠ incentivo ao tabaco, ≠ manual de chama, ≠ anúncio.** Nomear o utensílio ≠ endossar fumar. Sem afiliação à Société Bic. Homofonia **BIC × Biq** = coincidência; o étimo de [Moçambique](${mocambique}) **não** é a marca.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **isqueiro BIC** |
| Formas vivas | *isqueiro* (género) · *BIC* / *Bic* (marca) · lapso **esqueiro** · lapso **biq** |
| Classe | Substantivo masculino (utensílio) + nome comercial |
| Étimo (palavra) | *isca* + *-eiro* ← lat. *esca* («pasto, isca, matéria que pega fogo») — confiança: **alta** |
| Étimo (marca) | Apelido **Bich** (Marcel Bich) → **BIC**; isqueiro de bolso lançado em **1973** (após compra da Flaminaire, 1971) — confiança: **alta** |
| Não é | País [Moçambique](${mocambique}) · xeique *Mussa Bin Bique* · escada minhota *esqueiro* |
| Tipo BudGanja | Palavra — utensílio × marca × *tónos* do gesto |
| Elo tónos | [tônico](${tonico}) — tensão do polegar; EN 13869 ≈ **42 N** no botão (isqueiros de ignição linear, actualização 2017) |
| Elo país | [Moçambique](${mocambique}) — lapso *esqueiro biq*; sílaba tónica **BI** |
| Elo ofício | [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}) · [cinzeiro](${cinzeiro}) |
| Fonte | [isqueiro](${wikiIsca}) |
| Data | ${inspected} |

**O que é o objecto:** o **aparelho de acender** e, neste circuito, o **tipo BIC** (plástico oval, chama de gás, pedra/roda). No lab: ferramenta de [fogo](${fogo}) com **medida** — o *tónos* é a **tensão** que o polegar aplica.

## 2. Três peças (não misturar)

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **isqueiro** | Utensílio — *isca* + *-eiro* (como [cinzeiro](${cinzeiro}) = cinza + *-eiro*) | Alta |
| **BIC** | Marca francesa; isqueiro de bolso 1973; presença comercial também em Moçambique (ex. Bic Moçambique, Lda, Matola) | Alta (marca); média (filial como dado local) |
| **esqueiro** | Lapso de *isqueiro*; em PT-PT (Minho), **escada de mão** pequena — outro objecto | Alta (lapso) / média (regionalismo) |
| **biq** | No pedido: **BIC** (marca) **e** **Biq** (xeique) — ver [Moçambique](${mocambique}) | Alta (oralidade do lab) |

**H1:** forma canónica = **isqueiro**, não *esqueiro*.  
**H2:** **BIC** nomeia a marca, não o país.  
**H3:** relacionar com *tónos* = inspecionar a **tensão** do gesto, não beber um tónico.

## 3. O tónos do isqueiro

Na ficha [tônico](${tonico}), gr. *tónos* = tensão, tom, corda. No isqueiro, o mesmo étimo vira **ofício da mão**:

| Camada | Tensão | Elo |
|--------|--------|-----|
| **Roda / pedra** | Atrito — o polegar *aperta* e gira | [gesto](${gesto}) |
| **Mola / botão** | Força mínima para a chama (norma de segurança infantil EN 13869: **42 newton** no percurso linear do botão, actualização 2017) | [risco](${risco}) · *tónos* medido |
| **Gás** | Pressão no reservatório — outra tensão, invisível | [fogo](${fogo}) |
| **Sílaba BI** | Em [Moçambique](${mocambique}), o pico da **palavra** é o mesmo som | [tônico](${tonico}) ofício 1 |

**Veredicto tónico:** o isqueiro BIC é uma lição física de *tónos* — sem tensão medida, não há faísca; com tensão demais, há [risco](${risco}). Os **42 N** são o tónico do botão: pico de força, não chá.

## 4. Isqueiro × esqueiro × BIC × Biq

| Forma | O que o lab lê |
|-------|----------------|
| **isqueiro** | Utensílio — esta ficha (género) |
| **isqueiro BIC** | Tipo / marca — objecto-âncora do pedido |
| **esqueiro** | Lapso **ou** escada minhota (não é este objecto) |
| **BIC / Bic** | Marca (canetas, isqueiros, lâminas) — não o país |
| **Biq / Bique** | Xeique do étimo de [Moçambique](${mocambique}) |
| **esqueiro biq** | Lapso de campo — ler **esta** ficha **e** [Moçambique](${mocambique}) |

**H-grafia:** Dicio e uso BR: *isqueiro* com **i**; *esqueiro* como forma do utensílio é erro comum.  
**H-país:** Bic Moçambique, Lda (Matola) vende material de escrita e afins — **não** rebaptiza o Estado.  
**H-fogo:** o isqueiro **produz** [fogo](${fogo}); o [cinzeiro](${cinzeiro}) **recebe** a cinza; o [papel de enrolar](${papel}) é outra ficha — não fundir.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Nome** | BIC *explica* Moçambique | Homofonia com **Biq**; étimo do país = xeique / ilha |
| **Esqueiro** | Palavra certa | Lapso de *isqueiro* (ou escada, noutro mapa) |
| **Objecto** | Só «para cigarro» | Utensílio de [fogo](${fogo}): fogão, vela, acampamento, lab |
| **Tónos** | Tom de voz | Tensão do polegar **e** sílaba **BI** em [Moçambique](${mocambique}) |
| **Marca** | O isqueiro *é* a BIC | A BIC é **um** tipo; *isqueiro* é o género |

**Veredicto contraste:** parece um país em plástico; é um **utensílio** cujo nome de marca **rima** com o pico de outro nome.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «esqueiro é como se escreve» | Âncora: **isqueiro** (*isca* + *-eiro*) |
| «Moçambique vem do isqueiro BIC» | País ← **Mussa Bin Bique**; ver [Moçambique](${mocambique}) |
| «tónos não entra aqui» | Entra como **tensão** do gesto e como sílaba **BI** |
| «fichar o isqueiro = promover fumo» | Literacia do [objecto](${objetos}) e do [risco](${risco}) |
| «todos os isqueiros são BIC» | BIC = marca; isqueiro = género |

**Veredicto correção:** **isqueiro BIC = utensílio + marca.** *esqueiro biq* = lapso. Biq = étimo do país. *tónos* = tensão da mão e pico **BI**.

## 7. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Utensílio** | «empresta o isqueiro» | Bom: objecto · Mau: apagar o [risco](${risco}) |
| **Marca** | «um BIC» | Bom: tipo reconhecível · Mau: achar que a marca *é* Moçambique |
| **Lapso** | esqueiro / biq | Bom: pedir inspeção · Mau: fundir com o país sem etiqueta |
| **Ofício** | acender fogão / vela | Bom: [fogo](${fogo}) com medida · Mau: chama sem [gesto](${gesto}) |

## Hipóteses (síntese)

**H1:** âncora = **isqueiro**; BIC = marca de 1973.  
**H2:** *esqueiro biq* = isqueiro BIC × [Moçambique](${mocambique}) (Biq).  
**H3:** *tónos* no objecto = tensão do polegar (incl. ~42 N); *tónos* no país = sílaba **BI**.  
**H4:** fichar ≠ promover fumo; fecho [Faça o melhor!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Moçambique](${mocambique}) | O país cujo **BI** o lapso cola à marca |
| [Tônico](${tonico}) | Mapa de *tónos* — tensão / sílaba |
| [Fogo](${fogo}) · [cinzeiro](${cinzeiro}) · [papel de enrolar](${papel}) | Cadeia acender → cinza |
| [Gesto](${gesto}) · [risco](${risco}) · [objetos](${objetos}) | Mão, limite, coisa |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) | Grafia *isqueiro* |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Limites

- Não é catálogo de modelos (J25, Mini, Maxi…).  
- Não reproduz procedimento de ignição como tutorial.  
- Não trata a filial moçambicana como prova de étimo.  
- Não endossa consumo de tabaco.

## Status

**Aprovado** — **isqueiro BIC** fichado como utensílio + marca; **esqueiro biq** como lapso rumo a [Moçambique](${mocambique}); *tónos* lido na **tensão** da mão e no pico **BI**.

[▶ Palavras](${hub}) · [▶ Moçambique](${mocambique}) · [▶ Tônico](${tonico}) · [▶ Fogo](${fogo}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **isqueiro BIC** — the pocket **lighter** (Lat. *esca* → *isca* + *-eiro*) and the **BIC** brand (1973). Field slip **esqueiro biq** mixes the lighter with **Biq** (sheikh behind [Moçambique](${mocambique})). **Tónos** here is thumb **tension** (EN 13869 ~**42 N** on linear-button lighters) and the stressed **BI** of the country name. Links: [tonic](${tonico}), [fire](${fogo}), [Do your best!](${mantra}).

> Sources: [isqueiro](${wikiIsca}). **Not a smoking ad. Not a brand endorsement.** Homophony BIC × Biq is **not** etymology of Mozambique.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **isqueiro BIC** |
| Not | [Moçambique](${mocambique}) the country |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** Mozambique is named after a lighter.  
**Is:** the lighter is a **tool**; the country keeps **Biq** from a sheikh. *esqueiro* is a slip for *isqueiro*.

## 3. Correction

**Isqueiro BIC = tool + brand.** If the mouth said *esqueiro biq*, open this sheet **and** [Moçambique](${mocambique}). Close with [Do your best!](${mantra}).

## Status

**Approved** — object sheet; slip and *tónos* labeled.

[▶ Words](${hub}) · [▶ Mozambique](${mocambique}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **isqueiro BIC** — el **encendedor** de bolsillo (lat. *esca* → *isca* + *-eiro*) y la marca **BIC** (1973). El lapsus **esqueiro biq** mezcla el encendedor con **Biq** (jeque detrás de [Moçambique](${mocambique})). **Tónos** aquí es la **tensión** del pulgar (EN 13869 ~**42 N**) y el **BI** tónico del nombre del país. Vínculos: [tônico](${tonico}), [fogo](${fogo}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [isqueiro](${wikiIsca}). **No es anuncio de tabaco ni de la marca.** Homofonía BIC × Biq **no** es el étimo de Mozambique.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **isqueiro BIC** |
| No es | el país [Moçambique](${mocambique}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** Mozambique se llama como un encendedor.  
**Es:** el encendedor es **utensilio**; el país guarda **Biq** de un jeque. *esqueiro* es lapsus de *isqueiro*.

## 3. Corrección

**Isqueiro BIC = utensilio + marca.** Si la boca dijo *esqueiro biq*, abrir esta ficha **y** [Moçambique](${mocambique}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de objeto; lapsus y *tónos* etiquetados.

[▶ Palabras](${hub}) · [▶ Mozambique](${mocambique}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildIsqueiroBicPost() {
  const { body, contentEn, contentEs, wiki } = buildIsqueiroBicBodies();
  const seriesOrder = pickOrder('inspecao-palavra-isqueiro-bic', 144);
  const post = makePalavra({
    title: 'Inspeção: Isqueiro BIC — tónos do polegar e o lapso esqueiro biq',
    titleEn: 'Inspection: BIC lighter — thumb tónos and the slip esqueiro biq',
    titleEs: 'Inspección: Encendedor BIC — tónos del pulgar y el lapsus esqueiro biq',
    excerpt:
      'Palavras: «isqueiro BIC» — isca+eiro; marca 1973; tónos = tensão (~42 N); lapso esqueiro biq ≠ Moçambique; Faça o melhor!',
    excerptEn:
      'Words: “isqueiro BIC” — tinder+suffix; 1973 brand; tónos = tension (~42 N); slip esqueiro biq ≠ Mozambique; Do your best!',
    excerptEs:
      'Palabras: «isqueiro BIC» — isca+eiro; marca 1973; tónos = tensión (~42 N); lapsus esqueiro biq ≠ Mozambique; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-isqueiro-bic',
    date: '2026-08-20T22:41:00.000Z',
    seriesOrder,
    seriesLabel: 'Isqueiro BIC · palavra',
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

module.exports = { buildIsqueiroBicPost, buildIsqueiroBicBodies };
