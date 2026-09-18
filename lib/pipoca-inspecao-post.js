'use strict';

/**
 * Inspeção Palavras · pipoca
 * Eixos: Tupi pi'poka · milho→calor→estouro · rua / cinema ·
 * transformação com ofício · Faça o melhor!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPipocaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/pipoca';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Pipoca';

  const body = `## Escopo

Inspeção editorial da palavra **pipoca** — milho que estoura, lanche de rua e de cinema, metáfora de transformação. Esta ficha cobre o **objeto** (vocábulo tupi no português do Brasil), a **viagem** milho→calor→estouro, os **usos** culturais (carrinho, praça, sala escura) e o fecho [Faça o melhor!](${mantra}). Elos: [fogo](${fogo}) (calor que transforma), [alegria](${alegria}), [criatividade](${criatividade}), [gesto](${gesto}), [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pipoca](${wiki}), [Wikipédia · Pipoca](${wikiEl}), série [Palavras](${hub}). **Ficha ≠ guia nutricional nem aula anti-«junk food»** — mapa lexical e cultural com calor humano. Sem ficha de planta *Zea mays* no catálogo medicinal BudGanja nesta data; o elo botânico fica como **nota aberta** (milho = matéria-prima; a palavra inspecionada é o **resultado nomeado**). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **pipoca** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Tupi *pi'poka* / *pipoka* («pele que estoura» / «o que estala») → PT *pipoca* — confiança: alta (consenso dicionarístico BR) |
| Família | *pipoqueira* · *pipocar* · *pipoca doce / salgada* · *pipoca de cinema* · *ficar pipoca* (gíria regional / figurada) |
| Cognatos / paralelos | esp. *palomitas* / *pochochos* · ing. *popcorn* · fr. *pop-corn* / *maïs soufflé* (outras rotas; não étimo) |
| Tipo BudGanja | Palavra — cultura BR × transformação × partilha |
| Elo calor | [fogo](${fogo}) — calor medido que faz estourar |
| Elo afecto | [alegria](${alegria}) — lanche de encontro |
| Elo ofício | [gesto](${gesto}) · [criatividade](${criatividade}) · [verdade](${verdade}) · [Faça o melhor!](${mantra}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Vida](${vida}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · pipoca](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **milho estourado** e, por extensão viva, o **lanche de rua e de cinema**, o **cheiro do carrinho** e a **metáfora de algo que «estoura»** (ideia, riso, surpresa). No BudGanja: âncora de **transformação com ofício** — grão + calor certo + tempo; não sermonário sobre comida industrial.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Tupi *pi'poka* | Estalo / pele que rebenta — onomatopeia cultural do estouro | Alta |
| Matéria | Grão de milho (*Zea mays*) aquecido até estourar | Alta (uso comum; sem ficha planta no catálogo) |
| Rua BR | Carrinho, feira, praça, praia — partilha barata e cheirosa | Alta |
| Cinema | Casal de pipoca + filme — ritual de sala escura | Alta |
| Transformação | Duro → fofo; fechado → aberto; silêncio → estalo | Alta (metáfora de ofício) |
| Figura | «Estourou que nem pipoca» / ideia que pipoca | Média–alta (uso vivo) |
| Ofício lab | Calor medido ([fogo](${fogo})) + [gesto](${gesto}) + [alegria](${alegria}) | Média–alta (mapa BudGanja) |

**H1:** *pipoca* é herança **tupi** no português brasileiro — a língua nomeia o estalo antes de traduzir o snack americano.  
**H2:** o objecto cultural é a **transformação** (milho + calor), não o milho cru nem a marca de cinema.  
**H3:** na rua e na sala, pipoca é **partilha** — cruza [alegria](${alegria}) e [gesto](${gesto}) de oferecer o saco.

## 3. Viagem — milho · calor · estouro · cultura

| Etapa | O que acontece | Leitura BudGanja |
|-------|----------------|------------------|
| **Milho** | Grão com humidade interna | Matéria — sem ficha *Zea* no catálogo; nota aberta |
| **Calor** | [Fogo](${fogo}) / ar quente / óleo — medida | Transformação pedida; excesso queima |
| **Estouro** | Casca cede; florescência branca | O nome *pipoca* aponta para este instante |
| **Rua** | Carrinho, saquinho, sal ou açúcar | Cultura popular BR — acessível |
| **Cinema** | Balde / saco na escuridão | Ritual de presença e [alegria](${alegria}) |
| **Figura** | Ideia / riso / projecto que «pipoca» | [Criatividade](${criatividade}) · [genial](${genial}) com medida |

**Veredicto da viagem:** inspecionar **pipoca** é inspecionar o **estalo nomeado** — do tupi à praça, do milho ao saco partilhado. Não confundir com «pouca», «roça» nem «coca» (outra planta, outra ficha).

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear o lanche** | Milho estourado | Vocábulo — cultura, não rótulo nutricional |
| **Rua / feira** | Carrinho, praça | Partilha barata; cheiro de ofício popular |
| **Cinema** | Ritual da sessão | [Alegria](${alegria}) · presença · [gesto](${gesto}) |
| **Transformação** | Calor certo muda a forma | [Fogo](${fogo}) medido · [caminho](${caminho}) |
| **Criar** | Ideia que «estoura» | [Criatividade](${criatividade}) · [genial](${genial}) |
| **Língua** | Tupi vivo no dia a dia | [Língua portuguesa](${lingua}) · [guia](${guia}) |
| **Fechar** | Depois do estalo, o acto | [Verdade](${verdade}) + [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** nomear a **pipoca** para lembrar que **transformação boa pede calor certo e partilha** — não culpa alimentar, não culto do snack, não confusão com outras palavras «-oca».

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor estalo possível **com o calor que tens hoje** — sem forçar o grão nem queimar o saco |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «É só pipoca, então dispenso a [verdade](${verdade})» = falso · leveza ≠ negligência |
| Par calor | [Fogo](${fogo}) — medida, não labareda cega |
| Par afecto | [Alegria](${alegria}) · [gesto](${gesto}) — oferecer o saco |
| Ofício | [Criatividade](${criatividade}) · [caminho](${caminho}) — ideia que pipoca com método |

**Veredicto:** Faça o melhor **como pipoca boa** — calor certo, estalo limpo, partilha. Pipoca sem [caminho](${caminho}) = queimado; pipoca com ofício = florescência que fica.

## Hipóteses (síntese)

**H1:** objeto = tupi *pi'poka* → pipoca (estalo nomeado).  
**H2:** sentidos = milho estourado · rua · cinema · transformação.  
**H3:** elos = [fogo](${fogo}) · [alegria](${alegria}) · [gesto](${gesto}) · [criatividade](${criatividade}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com calor medido e partilha.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Fogo](${fogo}) | Calor que transforma — medida |
| [Alegria](${alegria}) · [Gesto](${gesto}) | Partilha e acto |
| [Criatividade](${criatividade}) · [Genial](${genial}) | Ideia que estoura |
| [Verdade](${verdade}) · [Caminho](${caminho}) | Inspeção e rumo |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical (tupi vivo) |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é ficha nutricional, dieta nem cruzada anti-junk-food.  
- Sem entrada *Zea mays* / milho no catálogo \`/plantas/\` nesta data — elo botânico em aberto.  
- Não confundir com **pouca**, **roça** ou **coca** (Erythroxylum — outra inspeção / outro eixo).  
- Cultura de cinema e rua ≠ endosso de marca comercial.

## Status

**Aprovado** — **pipoca** fichada: objeto (tupi *pi'poka*), viagem milho→calor→estouro, usos (rua · cinema · figura) e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Fogo](${fogo}) · [▶ Alegria](${alegria}) · [▶ Gesto](${gesto}) · [▶ Criatividade](${criatividade}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **pipoca** (popcorn) — corn that pops, street and cinema snack, metaphor of transformation. Covers **object** (Tupi loan in Brazilian Portuguese), the journey grain→heat→pop, cultural uses, and [Do your best!](${mantra}). Links: [fogo](${fogo}), [alegria](${alegria}), [criatividade](${criatividade}), [gesto](${gesto}).

> Method note: [Wiktionary · pipoca](${wiki}), [Wikipedia · Pipoca](${wikiEl}). Not a nutrition lecture. No *Zea mays* plant sheet in the BudGanja medicinal catalog on this date — botanical link left open. Cultural map with warmth.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **pipoca** |
| Etymon | Tupi *pi'poka* / *pipoka* (“skin that bursts” / “that which cracks”) → PT *pipoca* |
| Lab type | BR culture × transformation × sharing |
| Links | [fogo](${fogo}) · [alegria](${alegria}) · [gesture](${gesto}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Popped corn** · **street cart / square** · **cinema ritual** · **transformation** (hard→fluffy) · **figurative “ideas that pop”** ([criatividade](${criatividade})).

## 3. Journey

Grain + measured [heat](${fogo}) → pop → share. Pipoca names the **burst**, not the raw ear and not a junk-food sermon.

## 4. Purpose

Name the snack · celebrate BR street/cinema culture · map transformation with craft · close with [Do your best!](${mantra}). Not pouca / roça / coca.

## 5. Do your best!

Best possible pop **with the heat you have today** — without burning the bag or skipping [truth](${verdade}).

## Status

**Approved** — Tupi etymon · milho→heat→pop · street/cinema · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Fogo](${fogo}) · [▶ Alegria](${alegria}) · [▶ Gesture](${gesto}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **pipoca** (palomitas) — maíz que estalla, merienda de calle y cine, metáfora de transformación. Cubre **objeto** (préstamo tupí en el portugués de Brasil), el viaje grano→calor→estallido, usos culturales y [¡Haz lo mejor!](${mantra}). Vínculos: [fogo](${fogo}), [alegria](${alegria}), [criatividade](${criatividade}), [gesto](${gesto}).

> Nota: [Wikcionario · pipoca](${wiki}), [Wikipedia · Pipoca](${wikiEl}). No es clase de nutrición. Sin ficha *Zea mays* en el catálogo medicinal BudGanja en esta fecha. Mapa cultural con calor humano.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **pipoca** |
| Étimo | Tupí *pi'poka* / *pipoka* → PT *pipoca* |
| Tipo lab | Cultura BR × transformación × compartir |
| Vínculos | [fogo](${fogo}) · [alegria](${alegria}) · [gesto](${gesto}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Maíz estallado** · **calle / plaza** · **cine** · **transformación** · **figura** (idea que «estalla») — [criatividade](${criatividade}).

## 3. Viaje

Grano + [fuego](${fogo}) medido → estallido → compartir. Pipoca nombra el **estallido**, no el sermón anti-snack.

## 4. Para qué sirve

Nombrar · celebrar la cultura BR · mapear transformación con oficio · cerrar con [¡Haz lo mejor!](${mantra}). No confundir con pouca / roça / coca.

## 5. ¡Haz lo mejor!

El mejor estallido posible **con el calor que tienes hoy** — sin quemar ni saltar la [verdad](${verdade}).

## Estado

**Aprobada** — étimo tupí · milho→calor→estallido · calle/cine · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Fogo](${fogo}) · [▶ Alegria](${alegria}) · [▶ Gesto](${gesto}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPipocaPost() {
  const { body, contentEn, contentEs, wiki } = buildPipocaBodies();
  // Re-read free Cap at build time (concurrent agents: laranja/mamão/melancia…).
  let seriesOrder = 68;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-pipoca');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 160) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 68 */
  }

  return makePalavra({
    title:
      'Inspeção: Pipoca — tupi pi\'poka, milho que estoura, rua e cinema',
    titleEn:
      'Inspection: Pipoca — Tupi pi\'poka, corn that pops, street and cinema',
    titleEs:
      'Inspección: Pipoca — tupí pi\'poka, maíz que estalla, calle y cine',
    excerpt:
      'Palavras: «pipoca» (tupi *pi\'poka*) — milho→calor→estouro; rua e cinema BR; transformação com ofício; Faça o melhor!',
    excerptEn:
      'Words: “pipoca” (Tupi *pi\'poka*) — grain→heat→pop; BR street and cinema; craftful transformation; Do your best!',
    excerptEs:
      'Palabras: «pipoca» (tupí *pi\'poka*) — grano→calor→estallido; calle y cine BR; transformación con oficio; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-pipoca',
    date: '2026-08-03T23:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Pipoca · palavra',
    coverImage: '/imagens/inspecoes/pipoca-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPipocaPost,
  buildPipocaBodies
};
