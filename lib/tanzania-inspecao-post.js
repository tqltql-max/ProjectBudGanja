'use strict';

/**
 * Inspeção Palavras · Tanzânia
 * Eixos: país (Tan + Zan + -ia) · hipocorístico Taz ·
 * lapso Taz Manaia (= Taz-Mania × manaia × Tanzânia) · ≠ Tasmânia
 * Ficha de topónimo/país, não guia turístico nem biografia inventada.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/tanzania-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Tanz%C3%A2nia';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 260) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildTanzaniaBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-tanzania.html';
  const tazManaia = '/posts/post-inspecao-palavra-taz-manaia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const meneia = '/posts/post-inspecao-palavra-meneia.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiEn = 'https://en.wikipedia.org/wiki/Tanzania';
  const wikiTan = 'https://pt.wikipedia.org/wiki/Tanganica';
  const wikiZan = 'https://pt.wikipedia.org/wiki/Zanzibar';
  const wikiTas = 'https://pt.wikipedia.org/wiki/Tasm%C3%A2nia';
  const wikt = 'https://en.wiktionary.org/wiki/Tanzania';

  const body = `## Escopo

Inspeção editorial da palavra **[Tanzânia](${self})** — o **país** na África Oriental (EN *Tanzania*; sw. *Tanzania*; *Jamhuri ya Muungano wa Tanzania*). Pedido de campo: *Tanzânia inspeção e relação com Taz Manaia*. O lab lê **duas âncoras coladas**: o **país** e o nome-lapso **[Taz Manaia](${tazManaia})** (boca a caminho de *Taz-Mania*, do hipocorístico **Taz**, e do māori *manaia*). Esta ficha cobre o **país**, o **étimo** (Tanganica + Zanzibar + *-ia*), a **correção** Tanzânia ≠ Tasmânia, e a **[relação](${relacao})** com [Taz Manaia](${tazManaia}). Elos: [Moçambique](${mocambique}) (vizinho e irmão de método), [meneia](${meneia}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Tanzânia](${WIKI}), [EN](${wikiEn}), [Tanganica](${wikiTan}), [Zanzibar](${wikiZan}), [Tasmânia](${wikiTas}), [Wiktionary · Tanzania](${wikt}). **Ficha ≠ guia de viagem, ≠ atlas de safári, ≠ biografia de celebridade.** *Taz Manaia* **não** está aqui tratado como pessoa pública verificada — é objecto oral; a ficha-irmã [Taz Manaia](${tazManaia}) separa as camadas. Sem afiliação a Estados.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Tanzânia** (PT) |
| Formas vivas | **Tanzania** (EN/sw./teclado) · *Tanzanie* (FR) · *Tansania* (DE) · hipocorístico **Taz** · lapso **[Taz Manaia](${tazManaia})** |
| Classe | Topónimo — Estado soberano |
| Nome oficial | República Unida da Tanzânia / *Jamhuri ya Muungano wa Tanzania* |
| Capital | **Dodoma** (oficial, 1996); **Dar es Salaam** = maior cidade e ainda sede de muita instituição |
| Línguas | **Suaíli** (kiswahili) nacional; inglês em vários ofícios oficiais |
| União | 26 de abril de **1964** (Tanganica + Zanzibar) |
| Lema | *Uhuru na Umoja* — liberdade e unidade |
| Étimo (trabalho) | Portmanteau **Tan**(ganica) + **Zan**(zibar) + sufixo **-ia** — confiança: **alta** |
| Não é | [Tasmânia](${wikiTas}) · desenho *Taz-Mania* · pessoa inventada «Taz Manaia» |
| Tipo BudGanja | Palavra — país × hipocorístico Taz × [relação](${relacao}) com o lapso |
| Elo lapso | [Taz Manaia](${tazManaia}) |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [língua portuguesa](${lingua}) |
| Fonte | [Tanzânia](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do país**. A boca pediu *relação com Taz Manaia*; a âncora escrita em PT é **Tanzânia**. O **Taz** é recorte oral do nome (e, noutro mapa, do diabo da Tasmânia). As duas rotas **não** se fundem.

## 2. Cinco camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **País** | República Unida da Tanzânia — África Oriental, Índico, vizinha de [Moçambique](${mocambique}) a sul | Alta |
| **Étimo Tan+Zan** | União de **Tanganica** (continente) e **Zanzibar** (arquipélago) + *-ia* | Alta |
| **Hipocorístico Taz** | Boca curta de *Tanz-* / *Tanzania* — alcunha de mapa, não de Estado | Média (uso oral; não é grafia oficial) |
| **Tasmânia** | Ilha australiana (Abel Tasman) — **outro** continente, **outro** étimo | Alta |
| **Lapso Taz Manaia** | *Taz-Mania* (série 1991–95) escrito como nome de pessoa + māori *manaia* — ficha [Taz Manaia](${tazManaia}) | Alta (oralidade do lab) |

**H1:** *Tanzania* no atlas = a mesma âncora **Tanzânia**.  
**H2:** *Taz Manaia* não é um segundo país — é **várias fichas coladas**.  
**H3:** **Tanzânia ≠ Tasmânia** — homofonia parcial (*Taz-*), mapas distintos.  
**H4:** a [relação](${relacao}) pedida é lexical/oral, **não** biografia.

## 3. O étimo: Tan + Zan + -ia

O nome **não** é ancestral único: é **solda de 1964**.

| Peça | Origem | Nota lab |
|------|--------|----------|
| **Tan-** | [Tanganica](${wikiTan}) (*Tanganyika*) — continente; lago homónimo | Hipóteses sw. *tanga* (vela) + *nyika* (planície) **ou** étimo do lago — confiança do detalhe: **média** |
| **Zan-** | [Zanzibar](${wikiZan}) — ár. *Zanj* / *Zanjibar* «costa dos negros» + *barr* (costa) | Arquipélago (Unguja / Pemba); sultanato; independência 1963 |
| **-ia** | Sufixo de país / terra (lat./gr. *-ia*) | O mesmo ofício que em tantos topónimos |
| **Taz** | Recorte da frente *Tanz-* | Hipocorístico; **não** entra no étimo oficial |

**Veredicto etimológico:** **Tanzânia = Tanganica × Zanzibar × -ia.** O **Taz** é alcunha de ouvido, posterior ao nome de Estado. Abel Tasman **não** baptiza este país.

## 4. Tanzânia × Tasmânia × Taz × Taz Manaia

| Forma | O que o lab lê |
|-------|----------------|
| **Tanzânia** | País — esta ficha |
| **Tanzania** | Grafia internacional / suaíli do **mesmo** país |
| **Taz** | (a) alcunha de Tanzânia · (b) personagem *Taz* (diabo-da-Tasmânia, Looney Tunes) |
| **Tasmânia** | Estado insular da Austrália — [Tasmânia](${wikiTas}) |
| **Taz-Mania** | Série animada (1991–1995) no hotel fictício *Tazmania* — **não** é Tanzânia |
| **[Taz Manaia](${tazManaia})** | Lapso de campo: *Taz-Mania* + nome de pessoa + *manaia* māori |

**H-mapa:** quem cola *Taz* ao país sem etiqueta mistura **África Oriental** e **Austrália**.  
**H-série:** *Taz-Mania* habita a **Tasmânia** de cartaz, não Dodoma.  
**H-relação:** o pedido *relação com Taz Manaia* = abrir **esta** ficha **e** a de [Taz Manaia](${tazManaia}) — ofício de [relação](${relacao}) (o **entre**), não romance inventado.

## 5. A relação pedida

A palavra **[relação](${relacao})** (lat. *relatĭō*) nomeia o **entre**. Aqui o entre é:

| Pólo A | Pólo B | O que liga | O que **não** liga |
|--------|--------|------------|-------------------|
| **Tanzânia** | **Taz** | Recorte oral *Tanz-* | Oficialidade do Estado |
| **Taz** | **Taz-Mania** | Personagem / título da série | Geografia africana |
| **Taz-Mania** | **Taz Manaia** | Homofonia + espaço no teclado | Pessoa pública verificada |
| **Manaia** | **[meneia](${meneia})** | Só o ouvido PT | Étimo (*manaia* māori ≠ *menear*) |
| **Tanzânia** | **[Moçambique](${mocambique})** | Fronteira real, Índico, método de ficha-país | O lapso *esqueiro biq* |

**Veredicto relação:** há **relação de ouvido e de mapa** (Taz como ponte perigosa). Não há, neste lab, **relação biográfica** comprovada entre o Estado e um indivíduo chamado Taz Manaia. Quem precisa da pessoa, falta fonte; quem precisa do país, fica nesta ficha.

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Som** | Tanzânia ≈ Tasmânia ≈ Taz | Três mapas; um recorte oral |
| **Nome de pessoa** | Taz Manaia é alguém famoso | Lapso que *parece* antropónimo — ver [Taz Manaia](${tazManaia}) |
| **África** | O diabo-da-Tasmânia é fauna tanzaniana | [Animal](${animal}) da Tasmânia (*Sarcophilus harrisii*), [selvagem](${selvagem}) australiano |
| **Étimo** | Taz explica o país | O país explica-se por **Tanganica + Zanzibar** |
| **Suaíli** | Nome «europeu» colado | *Tanzania* vive no suaíli; o lema é *Uhuru na Umoja* |

**Veredicto contraste:** parece um só vocábulo com mascote; são **país**, **ilha australiana**, **série** e **lapso de nome**.

## 7. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Taz Manaia é o nome certo da Tanzânia» | Âncora: **Tanzânia** / *Tanzania* |
| «Tanzânia e Tasmânia são a mesma» | África Oriental ≠ ilha australiana |
| «Taz prova que o país vem do desenho» | O Estado une-se em **1964**; a série é **1991** |
| «Taz Manaia é ficha de Pessoa» | Sem fonte pública estável = ficha de **palavra/lapso**, não de biografia |
| «manaia é só [meneia](${meneia})» | Homofonia PT; *manaia* māori tem ofício próprio — [Taz Manaia](${tazManaia}) |

**Veredicto correção:** **Tanzânia = país.** Tanzania = grafia. *Taz* = alcunha. *Taz Manaia* = lapso. Tasmânia = outro mapa. Fecho: [relação](${relacao}) nomeada, não fundida.

## 8. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Estado** | «fui à Tanzânia» | Bom: país · Mau: safári de cartaz sem Estado |
| **Grafia** | Tanzania | Bom: mesma âncora · Mau: achar que muda o mapa |
| **União** | Tanganica e Zanzibar | Bom: duas peças do nome · Mau: apagar Zanzibar |
| **Alcunha** | Taz | Bom: recorte oral etiquetado · Mau: substituir o topónimo |
| **Lapso** | Taz Manaia | Bom: pedir inspeção · Mau: inventar biografia |

## Hipóteses (síntese)

**H1:** âncora PT = **Tanzânia**; *Tanzania* = boca internacional / suaíli.  
**H2:** étimo = **Tan + Zan + -ia** (1964).  
**H3:** *Taz Manaia* = Tanzânia × *Taz-Mania* × *manaia* — ficha [Taz Manaia](${tazManaia}).  
**H4:** Tanzânia ≠ Tasmânia.  
**H5:** a [relação](${relacao}) pedida é o **entre** lexical; fecho [Faça o melhor!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Taz Manaia](${tazManaia}) | O lapso / persona oral que o pedido cola ao país |
| [Relação](${relacao}) | Método do **entre** — vínculo ≠ biografia |
| [Moçambique](${mocambique}) | Vizinho a sul; irmão de método (país × lapso de nome) |
| [Meneia](${meneia}) | Homófono PT de *manaia* — outro étimo |
| [Animal](${animal}) · [selvagem](${selvagem}) | O diabo-da-Tasmânia é fauna **outra** — não mascote do Estado |
| [Língua portuguesa](${lingua}) | Acento *Tanzânia*; grafia internacional *Tanzania* |
| [Maconha](${maconha}) | Léxico afro-atlântico — outro [caminho](${caminho}); **não** é esta ficha |
| [Verdade](${verdade}) · [respeito](${respeito}) | Não apagar Tanganica/Zanzibar nem inventar celebridade |
| [Faça o melhor!](${mantra}) · [poema Vida](${poemMantra}) | Fecho |

## Limites

- Não ensina história diplomática, ujamaa, Kilimanjaro nem guia de Zanzibar.  
- Não trata *Taz Manaia* como pessoa pública sem fonte.  
- Não funde Tanzânia com Tasmânia nem com a série Warner.  
- Não é etnografia māori — o *manaia* honra-se na ficha-irmã, sem mascote.

## Status

**Aprovado** — **Tanzânia** fichada como país (Tan+Zan+-ia); **Taz** como hipocorístico; **Taz Manaia** como lapso com ficha própria; [relação](${relacao}) lida como o **entre**, não como biografia.

[▶ Palavras](${hub}) · [▶ Taz Manaia](${tazManaia}) · [▶ Relação](${relacao}) · [▶ Moçambique](${mocambique}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **Tanzânia** — the East African **country** (EN/Swahili **Tanzania**). Field request: **relation** with **[Taz Manaia](${tazManaia})**. The name is a 1964 portmanteau: **Tan**ganyika + **Zan**zibar + **-ia**. **Tanzania ≠ Tasmania**. **Taz** is a clipping and also the Looney Tunes devil. **Taz Manaia** is a slip toward *Taz-Mania* plus Māori *manaia* — not a verified public biography. Links: [relation](${relacao}), [Mozambique](${mocambique}), [Do your best!](${mantra}).

> Sources: [Tanzânia](${WIKI}), [Tanganyika](${wikiTan}), [Zanzibar](${wikiZan}). **Not a travel guide.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Tanzânia** · **Tanzania** |
| Etymon | Tan + Zan + -ia (1964) |
| Capital | Dodoma (official); Dar es Salaam = largest city |
| Not | [Tasmania](${wikiTas}) · *Taz-Mania* · invented celebrity |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** Taz Manaia is the country’s mascot or a famous person from Tanzania.  
**Is:** Tanzania is a **state**. Taz is a **nickname** and a **cartoon**. [Taz Manaia](${tazManaia}) is an **oral slip**. The [relation](${relacao}) is lexical — the *between* — not a biography.

## 3. Correction

**Tanzânia = country.** If the mouth said *Taz Manaia*, open this sheet **and** [Taz Manaia](${tazManaia}). Close with [Do your best!](${mantra}).

## Status

**Approved** — country sheet; slip and relation separated.

[▶ Words](${hub}) · [▶ Taz Manaia](${tazManaia}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Tanzânia** — el **país** de África Oriental (EN/suajili **Tanzania**). Pedido: **relación** con **[Taz Manaia](${tazManaia})**. El nombre es portmanteau de 1964: **Tan**ganica + **Zan**zíbar + **-ia**. **Tanzanía ≠ Tasmania**. **Taz** es hipocorístico y también el diablo de Looney Tunes. **Taz Manaia** es lapsus hacia *Taz-Mania* más el *manaia* māori — no biografía pública verificada. Vínculos: [relação](${relacao}), [Moçambique](${mocambique}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [Tanzânia](${WIKI}). **No es guía de viaje.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Tanzânia** · **Tanzania** |
| Étimo | Tan + Zan + -ia (1964) |
| Capital | Dodoma (oficial); Dar es-Salam = ciudad mayor |
| No es | [Tasmania](${wikiTas}) · *Taz-Mania* · celebridad inventada |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** Taz Manaia es la mascota del país o alguien famoso.  
**Es:** Tanzania es un **Estado**. Taz es **apodo** y **dibujo**. [Taz Manaia](${tazManaia}) es **lapsus oral**. La [relação](${relacao}) es léxica — el *entre* — no biografía.

## 3. Corrección

**Tanzânia = país.** Si la boca dijo *Taz Manaia*, abrir esta ficha **y** [Taz Manaia](${tazManaia}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de país; lapsus y relación separados.

[▶ Palabras](${hub}) · [▶ Taz Manaia](${tazManaia}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTanzaniaPost() {
  const { body, contentEn, contentEs, wiki } = buildTanzaniaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-tanzania', 148);
  const post = makePalavra({
    title: 'Inspeção: Tanzânia — o país, o Taz e a relação com Taz Manaia',
    titleEn: 'Inspection: Tanzânia — the country, Taz, and the relation with Taz Manaia',
    titleEs: 'Inspección: Tanzânia — el país, el Taz y la relación con Taz Manaia',
    excerpt:
      'Palavras: «Tanzânia» — país (Tan+Zan+-ia, 1964); Taz = hipocorístico; ≠ Tasmânia; relação com o lapso Taz Manaia; Faça o melhor!',
    excerptEn:
      'Words: “Tanzânia” — country (Tan+Zan+-ia, 1964); Taz = clipping; ≠ Tasmania; relation with the slip Taz Manaia; Do your best!',
    excerptEs:
      'Palabras: «Tanzânia» — país (Tan+Zan+-ia, 1964); Taz = hipocorístico; ≠ Tasmania; relación con el lapsus Taz Manaia; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tanzania',
    date: '2026-08-21T11:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Tanzânia · palavra',
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

module.exports = { buildTanzaniaPost, buildTanzaniaBodies };
