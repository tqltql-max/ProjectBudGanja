'use strict';

/**
 * Inspeção Palavras · vassoura
 * Eixos: lat. versoria / verrere · utensílio de varrer · folclore da bruxa (hipótese histórica) ·
 * vassoura-de-bruxa (cacau) · ≠ grimório · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/vassoura-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/vassoura';

function buildVassouraBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-vassoura.html';
  const esfregar = '/posts/post-inspecao-palavra-esfregar.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const xiv = '/biblioteca/unifesp/livro-xiv.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiEn = 'https://en.wiktionary.org/wiki/broom';
  const wikiVersoria = 'https://en.wiktionary.org/wiki/versoria#Latin';
  const wikiWitchesBroom = 'https://en.wikipedia.org/wiki/Witches%27_broom';

  const body = `## Escopo

Inspeção editorial da palavra **[vassoura](${self})** — no português do Brasil, o **utensílio** de varrer (cabo + cerdas / piaçava / nylon) e, por extensão, o **ofício de limpar o chão**. Pedido de campo: história e curiosidades, se for permitido. Esta ficha cobre o **objeto**, o **étimo** (lat. *versōria* / família de *verrere* «varrer»), o **folclore europeu da bruxa** como *hipótese histórica documentada* (não como receita), a **doença vegetal** «vassoura-de-bruxa» e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · vassoura](${WIKI}), [broom](${wikiEn}), [versoria](${wikiVersoria}), aula XIV UNIFESP ([Livro XIV](${xiv})), série [Palavras](${hub}). **Ficha ≠ grimório, ≠ manual de unguento, ≠ incentivo a tropanos.** Nomear o folclore ≠ ensinar a reproduzi-lo. Plantas da tropa da beladona são **tóxicas**. Tom: Inspetor BudGanja — *vassoura* é primeiro **ofício de chão**; o voo é conto. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **vassoura** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *versōria* («que faz virar / varrer») ← *vertere* / família de *verrere* — confiança: **alta** ([Wikcionário](${WIKI})) |
| Família | *varrer* · *varredor* · *vassourinha* · *vassourada* |
| Cognatos / paralelos | gal. *vasoura* · esp. *escoba* (outro étimo) · ing. *broom* (planta *Cytisus* → utensílio) · fr. *balai* |
| Tipo BudGanja | Palavra — utensílio de varrer × ofício do [gesto](${gesto}) |
| Elo ofício | [esfregar](${esfregar}) · [lavar](${lavar}) · [objetos](${objetos}) · [risco](${risco}) |
| Elo vivo | [planta](${planta}) · [fogo](${fogo}) (cinza no chão) |
| Elo projecto | [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) · [Livro XIV](${xiv}) |
| Fonte | [Wikcionário · vassoura](${WIKI}) |
| Data | ${inspected} |

**O que é o objeto:** cabo + feixe que **arrasta o resto** para um sítio certo. No lab: utensílio de **higiene do chão** — primo do [lavar](${lavar}) e do [esfregar](${esfregar}), sem ser o mesmo gesto.

## 2. História

O português herda **vassoura** do latim vulgar *versōria*, ligado ao gesto de **fazer virar** o que está no chão — daí a família viva **varrer**. O inglês *broom* fez o caminho inverso: primeiro nomeou o **arbusto** (*Cytisus scoparius*, giesta / «broom»), depois o **utensílio** feito com os ramos. No Brasil, as cerdas clássicas de **piaçava** (Arecaceae amazónica) marcam o ofício doméstico e de rua; o nylon é capítulo industrial.

Na Europa moderna, a **vassoura da bruxa** entrou no imaginário dos processos e gravuras: o cabo como montaria. Historiadores e etnobotânicos discutem uma **hipótese** — não um protocolo — de unguentos com **solanáceas tropânicas** (beladona e parentes) associados a relatos de «voo». No [Livro XIV](${xiv}) do curso UNIFESP, a professora Eliana Rodrigues **corrige o estereótipo**: o tropano **não é psicadélico clássico** (age no sistema colinérgico); «tudo que der ruim ficou na conta da mulher» é leitura **enviesada**; havia também feiticeiros. O lab **documenta** essa aula; **não reproduz** o gesto.

No Brasil agrícola, **vassoura-de-bruxa** nomeia a doença do cacaueiro causada pelo fungo *Moniliophthora perniciosa* — ramos que brotam em feixe, como uma vassoura no tronco ([witches’ broom](${wikiWitchesBroom})). Aqui a metáfora é **fitopatologia**, não sabbat.

## 3. Curiosidades

| Curiosidade | Leitura BudGanja | Confiança |
|-------------|------------------|-----------|
| **Étimo ≠ escoba** | PT *vassoura* e ES *escoba* são **primos de ofício**, não o mesmo étimo | Alta |
| **Broom-planta** | Em inglês o utensílio herda o nome do arbusto | Alta |
| **Piaçava** | Fibra nativa no cabo brasileiro clássico | Alta |
| **Folclore tropano** | Hipótese histórica (UNIFESP XIV); tóxico; ≠ receita | Média (historiografia) / alta (toxicidade) |
| **Género no conto** | A «bruxa» absorveu culpa colectiva — a aula XIV desfaz o exclusivo feminino | Alta (crítica cultural) |
| **Cacau** | *Vassoura-de-bruxa* = doença; elo [planta](${planta}) sem ser a planta-vassoura | Alta |
| **Vassourada** | No BR, também **repreensão** («levar uma vassourada») | Alta (uso vivo) |

**H1:** objeto = lat. *versōria* → vassoura (alta).  
**H2:** uso vivo BR = utensílio de varrer + metáforas (repreensão, doença do cacau).  
**H3:** fichar o folclore da bruxa ≠ ensinar tropano; é literacia do conto e da aula XIV.

## 4. Vassoura × esfregar × lavar × bruxa

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **vassoura** | Varrer o chão / metáfora | O **utensílio** e o rasto |
| **[esfregar](${esfregar})** | Fricção (mão, pano, conto da lâmpada) | Gesto; no XIV, o verbo do cabo — **não copiar** |
| **[lavar](${lavar})** | Água e higiene | Outro ofício de limpeza |
| **bruxa (conto)** | Imaginário / perseguição | Não é o objeto; é a **história colada** ao cabo |
| **vassoura-de-bruxa** | Fitopatologia do cacau | Doença; sem voo |

## 5. Rede (só fichas existentes)

| Ficha | Relação com *vassoura* |
|-------|------------------------|
| [Esfregar](${esfregar}) | Gesto vizinho; verbo da aula XIV (documentar ≠ repetir) |
| [Lavar](${lavar}) | Outro ofício de limpeza |
| [Objetos](${objetos}) | Classe: coisa à frente do olhar |
| [Gesto](${gesto}) | Como se pega o cabo |
| [Risco](${risco}) | Pó, quina, tropano (toxicidade) |
| [Planta](${planta}) | Piaçava; doença do cacau; beladona = **não receitar** |
| [Fogo](${fogo}) | Cinza no chão pede vassoura + contenção |
| [Língua portuguesa](${lingua}) | Solo lexical |
| [Livro XIV](${xiv}) | Fonte da curiosidade tropânica, com correção de género |

## 6. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Passa a vassoura»** | Pedido de utensílio | Ofício de chão |
| **Vassourada** | Golpe / bronca | Metáfora de correção — sem violência |
| **Vassoura-de-bruxa** | Doença do cacau | Nome inspecionado; elo planta/fungo |
| **Bruxa no cabo** | Conto e gravura | História; **não** protocolo |
| **Varrer para debaixo do tapete** | Esconder o resto | Anti-[verdade](${verdade}) — o lab prefere o [caminho](${caminho}) visível |

**Finalidade-mãe:** nomear a **vassoura** para **varrer com ofício** — o resto vai a um sítio certo, não para debaixo do mito.

## 7. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com este chão**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «É só um cabo» = falso se o conto vira receita · tropano = [risco](${risco}) |
| Par vivo | [esfregar](${esfregar}) · [lavar](${lavar}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **no chão concreto**. Vassoura sem [gesto](${gesto}) = poeira empurrada; vassoura com inspeção = ofício que respeita a história sem copiar o veneno.

## Hipóteses (síntese)

**H1:** objeto = *versōria* → vassoura (alta confiança).  
**H2:** uso vivo BR = utensílio + vassourada + doença do cacau.  
**H3:** elos = [esfregar](${esfregar}) · [lavar](${lavar}) · [risco](${risco}) · [Livro XIV](${xiv}).  
**H4:** fecho = [Faça o melhor!](${mantra}) — varrer sem varrer a verdade para debaixo do tapete.

## Limites

- Não é manual de limpeza profissional nem catálogo de cerdas.  
- Não é grimório nem ficha de beladona / datura / meimendro.  
- Folclore do cabo = **curiosidade histórica**; a aula XIV desfaz o mito «só a bruxa».  
- Grafia canónica: **vassoura**.

## Estado

**Aprovada** — **vassoura** fichada: étimo, ofício de varrer, folclore documentado sem receita, doença do cacau, rede com esfregar/lavar e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Esfregar](${esfregar}) · [▶ Lavar](${lavar}) · [▶ Livro XIV](${xiv}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **vassoura** — chiefly the **broom** (handle + bristles), plus history and curiosities. Links [esfregar](${esfregar}), [lavar](${lavar}), [risco](${risco}), [Do your best!](${mantra}). The European “witch’s broom” appears as a **documented historical hypothesis** (UNIFESP XIV), **not** as a recipe. Tropane nightshades are **toxic**.

> Method note: [Wiktionary · vassoura](${WIKI}), [Livro XIV](${xiv}). Naming folklore ≠ teaching it.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **vassoura** |
| Etymon | Lat. *versōria* — high confidence |
| Lab type | Sweeping tool × floor craft |
| Links | [esfregar](${esfregar}) · [lavar](${lavar}) · [risco](${risco}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. History

Portuguese *vassoura* comes from Latin *versōria* (turning / sweeping). English *broom* named the **shrub** first, then the tool. Brazilian brooms often used **piaçava** fibre. Witch-hunt imagery stuck a rider to the handle; UNIFESP XIV notes tropane Solanaceae in that folklore, stresses they are **not** classic psychedelics, and refuses the cliché that only women were blamed. In Brazilian cacao, **witches’ broom** is a **fungal disease** (*Moniliophthora perniciosa*), not a sabbat.

## 3. Curiosities

PT *vassoura* and Spanish *escoba* share the job, not the etymon. *Vassourada* can mean a scolding. The lab files the tale and **does not** copy unguents.

## 4. Do your best!

Best possible **on this actual floor**, today. Sweep without sweeping [verdade](${verdade}) under the rug.

## Status

**Approved** — object · craft · documented curiosity · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Esfregar](${esfregar}) · [▶ Livro XIV](${xiv}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **vassoura** — sobre todo la **escoba** (mango + cerdas), con historia y curiosidades. Vínculos [esfregar](${esfregar}), [lavar](${lavar}), [risco](${risco}), [¡Haz lo mejor!](${mantra}). La «escoba de la bruja» entra como **hipótesis histórica documentada** (UNIFESP XIV), **no** como receta. Las solanáceas tropánicas son **tóxicas**.

> Nota: [Wikcionario · vassoura](${WIKI}), [Livro XIV](${xiv}). Nombrar el folclore ≠ enseñarlo.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **vassoura** |
| Étimo | lat. *versōria* |
| Tipo lab | Utensilio de barrer × oficio del suelo |
| Vínculos | [esfregar](${esfregar}) · [lavar](${lavar}) · [risco](${risco}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Historia

El portugués hereda *vassoura* del latín *versōria*. El inglés *broom* nombró primero el arbusto. En Brasil, la fibra de **piaçava** marca el oficio. El imaginario de la bruja pegó una jinete al mango; el Libro XIV corrige: el tropano no es psicodélico clásico, y no todo quedó «en la cuenta de la mujer». En el cacao brasileño, **escoba de bruja** es una **enfermedad fúngica**, no un aquelarre.

## 3. Curiosidades

*Vassoura* y *escoba* son primas de oficio, no el mismo étimo. *Vassourada* también es bronca. El lab ficha el cuento y **no** copia ungüentos.

## 4. ¡Haz lo mejor!

Lo mejor posible **en este suelo concreto**, hoy.

## Estado

**Aprobada** — objeto · oficio · curiosidad documentada · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Esfregar](${esfregar}) · [▶ Livro XIV](${xiv}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildVassouraPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildVassouraBodies();
  let order = Number.isFinite(seriesOrder) ? seriesOrder : 125;
  if (!Number.isFinite(seriesOrder)) {
    try {
      const fs = require('fs');
      const path = require('path');
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find((p) => p.slug === 'inspecao-palavra-vassoura');
      if (existing && typeof existing.seriesOrder === 'number') {
        order = existing.seriesOrder;
      } else {
        const taken = new Set(
          posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
        );
        while (taken.has(order) && order < 400) order += 1;
      }
    } catch (_) {
      /* keep 125 */
    }
  }
  return makePalavra({
    title: 'Inspeção: Vassoura — varrer, cabo e o conto que não é receita',
    titleEn: 'Inspection: Vassoura — sweeping, the handle, and the tale that is not a recipe',
    titleEs: 'Inspección: Vassoura — barrer, el mango y el cuento que no es receta',
    excerpt:
      'Palavras: «vassoura» (lat. versōria) — utensílio de varrer × folclore da bruxa (hipótese XIV, sem receita) × vassoura-de-bruxa do cacau; Faça o melhor!',
    excerptEn:
      'Words: “vassoura” (Lat. versōria) — broom × witch folklore (XIV hypothesis, no recipe) × cacao witches’ broom; Do your best!',
    excerptEs:
      'Palabras: «vassoura» (lat. versōria) — escoba × folclore de la bruja (hipótesis XIV, sin receta) × escoba de bruja del cacao; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-vassoura',
    date: '2026-08-19T22:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Vassoura · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVassouraPost,
  buildVassouraBodies
};
