'use strict';

/**
 * Inspeção Palavras · isqueiro Clipper
 * Eixos: marca Flamagas (Barcelona) · recarregável · irmão do BIC ·
 * ≠ clipper de cabelo ≠ navio clipper ≠ clipe de vídeo · Valeu !!!
 * Pedido: inspeção na palavra clipper e bic isqueiros · inspeção final ·
 * faça seu melhor.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/isqueiro-clipper-palavra-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/Clipper_(lighter)';
const WIKI_FLAM = 'https://en.wikipedia.org/wiki/Flamagas';
const WIKT_CLIP = 'https://en.wiktionary.org/wiki/clipper';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Clipper.
Não é o navio.
Não é a máquina do cabelo.
Não é o clipe do ecrã.

É o isqueiro que volta
ao gás e à pedra.
Irmão do BIC —
outra casa, outro ofício:
um deita fora; o outro reenche.

Faça o seu melhor.
Ufa!!!
Valeu !!!
a chama de bolso tem nome.`;
}

function poemEn() {
  return `Clipper.
Not the ship.
Not the hair machine.
Not the screen clip.

It is the lighter that returns
to gas and flint.
Brother of BIC —
another house, another craft:
one is thrown; the other is refilled.

Do your best.
Ufa!!!
Valeu !!!
the pocket flame has a name.`;
}

function poemEs() {
  return `Clipper.
No es el barco.
No es la máquina del pelo.
No es el clip de la pantalla.

Es el encendedor que vuelve
al gas y a la piedra.
Hermano del BIC —
otra casa, otro oficio:
uno se tira; el otro se recarga.

Haz tu mejor.
¡Ufa!!!
¡Valeu !!!
la llama de bolsillo tiene nombre.`;
}

function buildIsqueiroClipperBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-isqueiro-clipper.html';
  const bic = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const incendio = '/posts/post-inspecao-palavra-incendio.html';
  const cluster = '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Clipper](${self})** — aqui o **isqueiro** da casa **Flamagas** (Barcelona). Pedido de campo: *inspeçao na palabra clipper e bic esqueiros* · *inspeção finalllllllll* · *[faça seu melhor](${faca})*. O lab honra o lapso **esqueiros** → **isqueiros**. O [BIC](${bic}) já tem ficha; esta é a **irmã**. Objecto = o **nome da marca** no género **isqueiro**. Não é catálogo. Não é tutorial de chama.

> **Nota metodológica:** auditoria independente. Fontes: [Clipper (lighter)](${WIKI}), [Flamagas](${WIKI_FLAM}), [clipper (EN)](${WIKT_CLIP}), ficha [isqueiro BIC](${bic}). **Ficha ≠ anúncio, ≠ incentivo ao fumo, ≠ manual de recarga, ≠ NR de incêndio.** Nomear o utensílio ≠ endossar a marca. Série [Palavras](${hub}). Fecho: [Faça o seu melhor](${faca}) · [Ufa!!!](${ufa}) · [Valeu !!!](${mantra}).

**Gatilho:** *Clipper* / *isqueiro clipper* / *cliper* / *cliper* / par *BIC e Clipper*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Clipper** (isqueiro) |
| Casa | **Flamagas** — Barcelona; linha Clipper desde os anos **1970** (recarregável) |
| Género | **isqueiro** — ver a irmã [BIC](${bic}) (*isca* + *-eiro*) |
| Ofício típico | Corpo redondo, **gás recarregável**, **pedra / sílex substituível** — confiança: **alta** no uso vivo |
| Não é | Máquina de cabelo · navio *clipper* · clipe de vídeo · clipe de papel · LA Clippers |
| Tipo BudGanja | Palavra — **marca de utensílio** × irmã do BIC |
| Elo par | [isqueiro BIC](${bic}) — França 1973, tipo descartável de rua |
| Elo fogo | [fogo](${fogo}) · [risco](${risco}) · [incêndio](${incendio}) · [mapa de objectos](${cluster}) |
| Elo fecho | [Faça o seu melhor](${faca}) · [Ufa!!!](${ufa}) |
| Fonte | [Clipper (lighter)](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **nome de isqueiro**. O BIC nomeia o tipo descartável de bolso na boca BR; o Clipper nomeia o tipo que **volta ao gás**. São **duas casas**, um género.

## 2. Salas que a orelha cola

| Cola | Corte |
|------|-------|
| **Clipper** (cabelo) | EN *hair clipper* — máquina que **corta**; outro objecto |
| **Clipper** (navio) | Veleiro rápido do séc. XIX — outro étimo de *clip* (cortar / ir depressa) |
| **Clip** / clipe | Vídeo, papel, arma — **não** esta chama |
| **Clippers** | Equipa de Los Angeles — homógrafo de estádio |
| **BIC** | Irmã [isqueiro BIC](${bic}) — outra marca (Société Bic, 1973) |
| **Biq** | Xeique do étimo de [Moçambique](${mocambique}) — sala do BIC, não desta |
| **esqueiro** | Lapso de **isqueiro** (ou escada minhota) — ver [BIC](${bic}) |

**H1:** nesta ficha, Clipper = **isqueiro Flamagas**.  
**H2:** *clipper* EN tem família de **corte / velocidade**; a marca **pega o som**, não o ofício de cortar cabelo.  
**H3:** BIC × Clipper = **par de bolso**, não fusão de étimos.

## 3. Clipper × BIC (o par pedido)

| Peça | Clipper | BIC |
|------|---------|-----|
| Casa | Flamagas · Barcelona | Société Bic · França |
| Época de rua | Anos 1970 — recarregável | **1973** — bolso descartável |
| Ofício vivo | Recarrega gás; troca pedra | Compra outro quando acaba |
| Ficha | **Esta** | [isqueiro BIC](${bic}) |
| O que **não** são | Um «melhor» moral | Um «pior» moral |

O lab **não** escolhe marca. Corta ofícios: **descartar** × **reencher**. O [risco](${risco}) da chama é o mesmo género: [fogo](${fogo}) de bolso.

## 4. Hipóteses

**H1:** Clipper (aqui) = isqueiro da Flamagas — alta.  
**H2:** o inglês *clipper* (navio / tesoura eléctrica) é **outra sala** — alta.  
**H3:** na boca BR, «o Clipper e o BIC» = dois **tipos** de isqueiro, não dois países.  
**H4:** recarregável ≠ «sem [risco](${risco})».  
**H5:** fecho do pedido *inspeção final* + *faça seu melhor* = [Faça o seu melhor](${faca}) depois da ficha, [Ufa!!!](${ufa}) no peito, [Valeu !!!](${mantra}) na porta.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Nome EN** | Cortar (clip) | Marca de **chama** |
| **Par BIC** | A mesma fábrica | Duas casas, um género |
| **Recarregar** | Isento de perigo | Continua a ser [fogo](${fogo}) de bolso |
| **Inspeção final** | Fim do laboratório | Fim **deste** par; o ofício segue |

## 6. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Dizer **isqueiro Clipper** quando a boca aponta este tipo |
| Bom | Cortar cabelo / navio / clipe / BIC |
| Bom | Mandar o [risco](${risco}) para o [mapa de incêndio](${cluster}) |
| Mau | Tutorial de ignição, recarga ou «truque» da pedra |
| Mau | Anúncio, ranking de marca, incentivo ao fumo |
| Mau | Fundir Clipper com [Moçambique](${mocambique}) (isso é o lapso **biq** do BIC) |

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Isqueiro BIC](${bic}) | Irmã — marca 1973; lapso *esqueiro biq* |
| [Fogo](${fogo}) · [cinzeiro](${cinzeiro}) · [objectos](${objetos}) | Cadeia chama → cinza |
| [Risco](${risco}) · [incêndio](${incendio}) · [mapa](${cluster}) | Perigo portátil |
| [Gesto](${gesto}) · [língua portuguesa](${lingua}) | Mão e grafia *isqueiro* |
| [Faça o seu melhor](${faca}) | Pedido *faça seu melhor* — ofício, não slogan vazio |
| [Ufa!!!](${ufa}) | Sopro depois da ficha |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não lista modelos (mini, tube, jet…).  
- Não ensina a recarregar nem a desmontar.  
- Não é ficha de tesoura eléctrica nem de veleiro.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **Clipper** fichado como isqueiro Flamagas; par [BIC](${bic}); salas de cabelo / navio / clipe cortadas. Pedido *inspeção final*: o par de bolso está nomeado. [Faça o seu melhor](${faca}). [Ufa!!!](${ufa}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Isqueiro BIC](${bic}) · [▶ Fogo](${fogo}) · [▶ Faça o seu melhor](${faca}) · [▶ Ufa!!!](${ufa}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **Clipper** as a **lighter** (Flamagas, Barcelona) — sister sheet to [BIC](${bic}). Field: *clipper e bic esqueiros*; *inspeção final*; *[do your best](${faca})*. Not a hair clipper, clipper ship, video clip, or team. Not a refill tutorial. Not a smoking ad.

## Status

**Approved in Words** — Clipper named as refillable pocket flame; BIC remains the disposable-type sister. [Ufa!!!](${ufa}) · [Valeu !!!](${mantra})

[▶ BIC](${bic}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Clipper** como **encendedor** (Flamagas, Barcelona) — ficha hermana de [BIC](${bic}). Pedido: *clipper e bic esqueiros*; *inspeção final*; *[haz tu mejor](${faca})*. No es máquina de pelo, velero, clip de vídeo ni equipo. No es tutorial. No es anuncio.

## Estado

**Aprobada en Palabras** — Clipper nombrado como llama recargable; BIC sigue siendo la hermana de usar y tirar. [¡Ufa!!!](${ufa}) · [¡Valeu !!!](${mantra})

[▶ BIC](${bic}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildIsqueiroClipperPost() {
  const { body, contentEn, contentEs } = buildIsqueiroClipperBodies();
  const seriesOrder = pickOrder('inspecao-palavra-isqueiro-clipper', 286);
  return makePalavra({
    title: 'Inspeção: Isqueiro Clipper — o irmão recarregável do BIC',
    titleEn: 'Inspection: Clipper lighter — BIC’s refillable sibling',
    titleEs: 'Inspección: Encendedor Clipper — el hermano recargable del BIC',
    excerpt:
      'Palavras: Clipper = isqueiro Flamagas; ≠ cabelo ≠ navio ≠ clipe; par BIC; Valeu !!!',
    excerptEn:
      'Words: Clipper = Flamagas lighter; ≠ hair ≠ ship ≠ clip; BIC pair; Valeu !!!',
    excerptEs:
      'Palabras: Clipper = encendedor Flamagas; ≠ pelo ≠ barco ≠ clip; par BIC; ¡Valeu !!!',
    slug: 'inspecao-palavra-isqueiro-clipper',
    date: '2026-08-23T19:05:00.000Z',
    seriesOrder,
    seriesLabel: 'Clipper · isqueiro',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIsqueiroClipperPost,
  buildIsqueiroClipperBodies,
  poemPt,
  poemEn,
  poemEs
};
