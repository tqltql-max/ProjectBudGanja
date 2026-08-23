'use strict';

/**
 * Inspeção Palavras · Chile (país)
 * Eixos: topónimo / Estado soberano · étimo em disputa ·
 * ≠ chile/chili (pimenta náuatle) · ≠ chilly (EN frio) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/chile-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Chile';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Chile';
const WIKT = 'https://en.wiktionary.org/wiki/Chile';
const WIKT_PEPPER = 'https://en.wiktionary.org/wiki/chile#Spanish';
const WIKI_CHILI = 'https://pt.wikipedia.org/wiki/Pimenta';
const WIKI_MAPUCHE = 'https://pt.wikipedia.org/wiki/Mapuches';

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

function poemPt() {
  return `Chile.
Uma faixa no mapa —
cordilheira de um lado,
Pacífico do outro.

O nome não fechou o étimo.
Mapuche, quéchua, vale, pássaro:
hipóteses. Não sentença.

A orelha cola a pimenta.
O náuatle ficou no México.
No Chile o ají tem outro nome.

País não é condimento.
Faixa não é postal.
Valeu !!!
neste mapa,
sem colar o chili no Andes.`;
}

function poemEn() {
  return `Chile.
A strip on the map —
range on one side,
Pacific on the other.

The name did not close the etymon.
Mapuche, Quechua, valley, bird:
hypotheses. Not a verdict.

The ear glues the pepper.
Nahuatl stayed in Mexico.
In Chile the hot pod is ají.

A country is not a condiment.
A strip is not a postcard.
Valeu !!!
on this map,
without gluing chili to the Andes.`;
}

function poemEs() {
  return `Chile.
Una franja en el mapa —
cordillera de un lado,
Pacífico del otro.

El nombre no cerró el étimo.
Mapuche, quechua, valle, pájaro:
hipótesis. No sentencia.

La oreja pega el chile.
El náhuatl se quedó en México.
En Chile el ají tiene otro nombre.

País no es condimento.
Franja no es postal.
¡Valeu !!!
en este mapa,
sin pegar el chili a los Andes.`;
}

function buildChileBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-chile.html';
  const mexico = '/posts/post-inspecao-palavra-mexico.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const horizonte = '/posts/post-inspecao-arte-horizonte-geografico.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Chile](${self})** — o **país**. Pedido de campo: *inspeção em Chile País*. Objecto = o **topónimo** e o **Estado** na faixa andina do Pacífico. Não é guia de viagem. Não é atlas de cobre. Não é diploma sanitário. Não é tribunal de fronteira.

[A orelha cola](${orelhaCola}) **Chile** (país) em **chile / chili / chilli** (pimenta). O étimo **corta**. A pimenta vem do náuatle *chīlli* e mora na ficha [México](${mexico}). No próprio Chile, o fruto picante costuma chamar-se **ají**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Chile](${WIKI}), [EN](${WIKI_EN}), [Wiktionary · Chile](${WIKT}), [chile (pimenta)](${WIKT_PEPPER}), [pimenta](${WIKI_CHILI}), [Mapuche](${WIKI_MAPUCHE}). **Étimo do nome do país = disputa** (confiança baixa–média). Via náuatle da pimenta = **alta**. **Ficha ≠ postal de Rapa Nui, ≠ antropologia mapuche completa, ≠ manifesto político.** Sem afiliação a Estados. Tom: [respeito](${respeito}) do mapa; [verdade](${verdade}) do nome.

**Gatilho:** *Chile* / *Chile País* / *chileno* / *chili* colado no mapa.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Chile** (PT/ES/EN — o país) |
| Gentílico | **chileno** / **chilena** |
| Classe | Topónimo — Estado soberano |
| Capital | Santiago |
| Língua oficial | Castelhano; línguas indígenas vivas (mapudungun, aimará, rapa nui, quéchua, entre outras) |
| Forma no mapa | Faixa N–S: Andes a leste, Pacífico a oeste; Atacama ao norte, Patagónia ao sul |
| Étimo (trabalho) | **Disputado** — mapudungun *chilli* («onde a terra acaba») · quéchua *chiri* («frio») / *chilli* («neve») · vale chamado Chili pelos incas · onomatopeia de ave (*trile*) — confiança **baixa–média** |
| Tipo BudGanja | Palavra — país × homógrafo da pimenta |
| Não é | **chile/chili** (Capsicum, náuatle) · **ají** (nome andino do fruto) · **chilly** (EN «frio») · guia turístico |
| Elo mapa | [México](${mexico}) · [Paraguai](${paraguai}) · [Moçambique](${mocambique}) · [Tanzânia](${tanzania}) |
| Elo ofício | [calor × frio](${calorFrio}) · [horizonte geográfico](${horizonte}) · [caminho](${caminho}) · [língua portuguesa](${lingua}) |
| Fonte | [Chile](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do país**. A boca pediu *Chile País* para não deixar a pimenta sentar na cadeira.

## 2. Hipóteses e método

**H1:** *Chile* nesta ficha = a **república** na costa do Pacífico sul — alta.  
**H2:** o étimo do topónimo **não** está fechado; o laboratório lista hipóteses e não escolhe rei — alta (método).  
**H3:** *chile* / *chili* / *chilli* (pimenta) < náuatle *chīlli* → castelhano mexicano *chile* — **outra palavra**, outro mapa ([México](${mexico})) — alta.  
**H4:** no Chile-país, o fruto picante é em regra **ají**; chamar-lhe *chile* é copiar o espanhol do México — alta na distinção de uso.  
**H5:** EN *chilly* («frio») rima com a hipótese quéchua *chiri*; rima **não** prova étimo — média.  
**H6:** fecho = [Valeu !!!](${mantra}).

## 3. Duas salas (não misturar)

| Sala | O que é | Étimo (trabalho) | Confiança |
|------|---------|------------------|-----------|
| **Chile** (país) | Estado soberano; faixa Andes–Pacífico | Disputa (mapuche / quéchua / vale / ave) | Alta no referente; baixa–média no étimo |
| **chile / chili** (pimenta) | Fruto de *Capsicum*; condimento | Náuatle *chīlli* | Alta |
| **ají** | Nome andino (incl. no Chile) do fruto picante | Taíno *axí* / via caribe — outra via | Média–alta na distinção de uso |
| **chilly** | EN «frio / fresco» | Germânico *chile* «frio» (inglês) | Alta no inglês; **não** decide o país |

**H-orelha:** [a orelha cola](${orelhaCola}) o país na pimenta porque a grafia EN/ES quase coincide. O ofício é **etiquetar o entre**.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Som PT/EN** | Chile ≈ chili | País ≠ condimento |
| **Menu** | «chile» no taco = o país | No taco mexicano, *chile* é a **pimenta**; o país fica no mapa |
| **Frio** | Chile = terra fria (nome) | Hipótese quéchua *chiri*; o Atacama também **quema**; ver [calor × frio](${calorFrio}) |
| **Ilha** | Chile = estátuas | Rapa Nui é território com povo próprio; **≠** postal desta ficha |
| **Cobre / vinho** | O nome *é* o minério / a cave | Indústria ≠ topónimo |

**Veredicto contraste:** parece um só vocábulo picante; são **dois mapas**.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Chile é a pimenta» | **Chile** = país. Pimenta = *chile* (MX) / *chili* (EN) / **ají** (Andes) |
| «O nome vem da pimenta» | A pimenta é mesoamericana (náuatle). O país é o Cone Sul. **Não** é o mesmo étimo |
| «Chile quer dizer frio» | Uma **hipótese** (quéchua *chiri*); não é facto fechado |
| «Chile quer dizer fim da terra» | Outra **hipótese** (mapudungun *chilli*); honrar o [Mapuche](${WIKI_MAPUCHE}) ≠ fechar o dicionário |
| «Pedir Chile País é redundante» | No lab é **âncora**: país, não condimento |

**Veredicto correção:** **Chile = país.** Se a boca disse *chili* no mesmo sopro, abrir esta ficha **e** [México](${mexico}).

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Estado** | «fui ao Chile» | Bom: país · Mau: achar que pediu pimenta |
| **Gentílico** | chileno / chilena | Bom: pessoa / cultura · Mau: estereótipo de postal |
| **Pimenta** | chili / chile no cardápio | Bom: etiquetar **condimento** (via MX) · Mau: colar no Estado |
| **Ají** | ají no Cone Sul | Bom: nome andino do fruto · Mau: traduzir à força por «chile» |

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [México](${mexico}) | O outro mapa do homógrafo — *chile* náuatle |
| [Paraguai](${paraguai}) · [Moçambique](${mocambique}) · [Tanzânia](${tanzania}) | Irmãs de ficha-país |
| [calor × frio](${calorFrio}) | Qualidade térmica; a hipótese *chiri* passa aqui **sem** virar sentença |
| [horizonte geográfico](${horizonte}) | O lab já tem horizonte; esta ficha é o **país**, não a revista |
| [caminho](${caminho}) · [respeito](${respeito}) · [verdade](${verdade}) | Ofício do mapa |
| [língua portuguesa](${lingua}) · [Guia](${guia}) | Grafia PT *Chile* |
| [A orelha cola](${orelhaCola}) | Método do homógrafo |
| [Valeu !!!](${mantra}) | Fecho |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não ensina história diplomática nem escolhe lado em disputa de fronteira.  
- Não fecha o étimo do topónimo.  
- Não é guia de vinho, cobre, ski ou ilha.  
- Não fala pelos povos mapuche, aimará ou rapa nui.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *Chile* fichado como **país**; *chile/chili* cortado para a pimenta náuatle ([México](${mexico})); étimo do nome em disputa; ofício = mapa, não condimento.

[▶ Palavras](${hub}) · [▶ México](${mexico}) · [▶ Paraguai](${paraguai}) · [▶ calor × frio](${calorFrio}) · [▶ Valeu !!!](${mantra}) · [Chile](${WIKI})
`;

  const contentEn = `## Scope

Inspection of **[Chile](${self})** — the **country**. Field request: *Chile País*. Not a travel guide. Not a copper atlas. Not a border ruling.

[The ear glues](${orelhaCola}) the country to **chile / chili** (pepper). The etymon **cuts**. The pepper is Nahuatl *chīlli* — see [México](${mexico}). In Chile itself the hot pod is usually **ají**.

The **place-name etymon is disputed** (Mapudungun *chilli* “where the land ends”; Quechua *chiri* “cold”; an Inca valley name; a bird-call). Confidence: low–medium. The pepper path is **high** and **other**.

## Object

| Field | Value |
|-------|-------|
| Anchor | **Chile** — sovereign State; capital Santiago |
| Not | chili pepper · [México](${mexico})'s *chile* · EN *chilly* |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** country ≠ condiment. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ México](${mexico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Chile](${self})** — el **país**. Pedido de campo: *Chile País*. No es guía de viaje. No es atlas de cobre. No es fallo de frontera.

[La oreja pega](${orelhaCola}) el país al **chile / chili** (pimienta). El étimo **corta**. La pimienta es náhuatl *chīlli* — ver [México](${mexico}). En el Chile-país el fruto picante suele ser **ají**.

El **étimo del topónimo está en disputa**. Confianza baja–media. La vía de la pimienta es **alta** y **otra**.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Chile** — Estado soberano; capital Santiago |
| No es | chile/chili (Capsicum) · *chilly* (EN frío) |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** país ≠ condimento. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ México](${mexico}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildChilePost() {
  const { body, contentEn, contentEs } = buildChileBodies();
  const seriesOrder = pickOrder('inspecao-palavra-chile', 281);
  return makePalavra({
    title: 'Inspeção: Chile — o país, não a pimenta',
    titleEn: 'Inspection: Chile — the country, not the pepper',
    titleEs: 'Inspección: Chile — el país, no el chile',
    excerpt:
      'Palavras: Chile = país (étimo em disputa); ≠ chile/chili náuatle; no Cone Sul o fruto é ají; Valeu !!!',
    excerptEn:
      'Words: Chile = country (etymon disputed); ≠ Nahuatl chile/chili; in the Southern Cone the pod is ají; Valeu !!!',
    excerptEs:
      'Palabras: Chile = país (étimo en disputa); ≠ chile náhuatl; en el Cono Sur el fruto es ají; ¡Valeu !!!',
    slug: 'inspecao-palavra-chile',
    date: '2026-08-23T18:25:00.000Z',
    seriesOrder,
    seriesLabel: 'Chile · país',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildChilePost,
  buildChileBodies,
  poemPt,
  poemEn,
  poemEs
};
