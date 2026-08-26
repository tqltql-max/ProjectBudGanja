'use strict';

/**
 * Inspeção Palavras · Gêmeos
 * Eixos: lat. geminus · par / signo Gemini · ≠ gênio / genial · ≠ génio da lâmpada
 * Ficha de palavra, não horóscopo nem ficha de IA.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/gemeos-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/g%C3%AAmeo';

function buildGemeosBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-gemeos.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiktEn = 'https://en.wiktionary.org/wiki/Gemini';
  const wikiSigno = 'https://pt.wikipedia.org/wiki/G%C3%AAmeos_(astrologia)';
  const wikiConst = 'https://en.wikipedia.org/wiki/Gemini_(constellation)';
  const wikiGenius = 'https://pt.wiktionary.org/wiki/g%C3%AAnio';

  const body = `## Escopo

Inspeção editorial da palavra **[gêmeos](${self})** (grafia viva **gemeos**, sem acento). Pedido de campo: *há relação com génio / genial / Aladim?* **Há uma armadilha de letra — não um étimo comum.** *Gêmeos* vem do latim *geminus* («nascido a par, duplo»). *[Gênio](${wikiGenius})* / [genial](${genial}) vem do latim *genius* (espírito tutelar / engenho). No céu, **Gemini** é o nome latino do par — daí o signo **Gêmeos**. Esta ficha cobre o **objecto**, o **par**, o **signo**, o **homónimo inglês Gemini** (marca de modelo de linguagem) e a **correção**: par não é lâmpada; lâmpada não é par. Elos: [relação](${relacao}), [mão esquerda / direita](${maos}), [pattern](${pattern}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · gêmeo](${WIKI}), [Gemini (EN)](${wiktEn}), [constelação](${wikiConst}), [signo](${wikiSigno}), [gênio](${wikiGenius}). **Ficha ≠ mapa astral, ≠ review de produto de IA, ≠ biologia de gravidez gemelar.** Sem afiliação a horóscopo nem a marca.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **gêmeos** (BR) · *gémeos* (PT-PT) · oral **gemeos** |
| Singular | **gêmeo** / *gémeo* |
| Classe | Substantivo (par de irmãos) · adjetivo («casal gêmeo») · nome do **signo** |
| Étimo | Lat. *geminus* «duplo, nascido junto» — confiança: **alta** |
| Não é | Lat. *genius* → [gênio](${wikiGenius}) → [genial](${genial}) |
| Tipo BudGanja | Palavra — par × signo × armadilha com *gênio* |
| Elo par / ofício | [relação](${relacao}) · [mão esquerda / direita](${maos}) · [gesto](${gesto}) · [skill](${skill}) |
| Elo céu / nome | [sol](${sol}) · [Grok](${grok}) · [língua portuguesa](${lingua}) |
| Elo armadilha | [genial](${genial}) · [abracadabra](${abracadabra}) · [ídolo](${idolo}) |
| Fonte | [gêmeo](${WIKI}) · [Gemini](${wiktEn}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo do **dois que nascem juntos** — e, no BR, o **nome do signo**. Não é o espírito da lâmpada nem o elogio «genial!».

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Par de nascimento** | Irmãos gêmeos; por extensão, dupla / cópia | Alta |
| **Signo / constelação** | Lat. *Gemini* = os Gêmeos (Cástor e Pólux) | Alta |
| **Marca EN *Gemini*** | Nome de modelo de linguagem (constelação, não génio da lâmpada) | Alta (nome); ficha **não** avalia o produto |
| **Armadilha BR** | *gêmeos* ≈ *gênio* na página — **étimos distintos** | Alta |
| **Lapso «Geneo»** | Boca a caminho de *gênio* (lâmpada / engenho) — **não** de *gêmeos* | Alta (oralidade do lab) |

**H1:** *gemeos* sem acento é a mesma palavra em teclado rápido.  
**H2:** Cástor e Pólux são o **mito do par no céu** — um ofício de [relação](${relacao}), não de [abracadabra](${abracadabra}).  
**H3:** quem ouve «génio» e escreve «gêmeos» misturou **duas famílias latinas**.

## 3. Gêmeos × gênio × Aladim

| Forma | Família | O que o lab lê |
|-------|---------|----------------|
| **gêmeos** | *geminus* | Par, signo, duplo |
| **gênio / genial** | *genius* | Engenho ou espírito tutelar; elogio de feito — ficha [genial](${genial}) |
| **génio da lâmpada** | o mesmo *genius* + conto | Servidor de desejos no ciclo de **Aladim** — atalho mágico, primo de [abracadabra](${abracadabra}) |
| **Gemini** (céu / marca) | *Gemini* = gêmeos | Nome latino do par; a marca pega o céu, não a lâmpada |

**Não há gémeos no conto canónico de Aladim** que o lab use como prova. A relação honesta é **negativa e útil**: o **génio da lâmpada** concede desejos; os **gêmeos** partilham nascimento. Um é [fantasioso](${abracadabra}) de atalho; o outro é [relação](${relacao}) de dois.

**H-lâmpada:** esfregar a lâmpada ≠ nascer a par.  
**H-par:** dois corpos, um [caminho](${caminho}) cada um — [Valeu !!!](${mantra}) **em cada mão**, não um desejo pelos dois.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Grafia** | *gênio* e *gêmeos* = família | Só o *gên-* coincidem na página BR |
| **Signo** | Destino escrito no céu | Nome de par mitológico; **não** é laudo |
| **IA Gemini** | «Génio» na caixa | Nome de **gêmeos** (latim); ofício = [Grok](${grok}) como *outra* marca, sem culto |
| **Aladim** | O génio é «gêmeo» do mágico | O génio é **servo de desejo**; o mágico de palco usa [abracadabra](${abracadabra}) |

**Veredicto contraste:** parece a mesma raiz; é **par** (*geminus*) contra **engenho / espírito** (*genius*).

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Gêmeos e génio é a mesma coisa» | *Geminus* ≠ *genius* |
| «O signo Gêmeos é o génio da lâmpada» | Signo = par no céu; lâmpada = conto de desejo |
| «Gemini a IA é um génio» | Nome de constelação; engenho fica na ficha [genial](${genial}) **com rasto** |
| «Sou de Gêmeos, logo sou duplo / genial» | Horóscopo ≠ [verdade](${verdade}) do feito |
| «Os dois gêmeos pensam igual» | Par não apaga o [gesto](${gesto}) de cada um |

### Ofício do par (mapa curto)

1. Se a boca pediu **gemeos**, a âncora é **gêmeos**.  
2. Se a boca pediu **Geneo / génio**, ir a [genial](${genial}) — não a esta ficha.  
3. Se a boca pediu **lâmpada / Aladim**, ir a [abracadabra](${abracadabra}) (atalho) e [genial](${genial}) (engenho ≠ desejo).  
4. Fechar com [Valeu !!!](${mantra}) **neste** corpo — o par não faz o ofício por ti.

**Veredicto correção:** **gêmeos = par.** Génio da lâmpada = desejo. Genial = engenho com rasto. Não colar os três.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Irmãos** | «são gêmeos» | Bom: facto de nascimento · Mau: fundir identidade |
| **Signo** | «sou de Gêmeos» | Bom: nomear o céu cultural · Mau: desculpa de carácter |
| **Metáfora** | «ideias gêmeas» | Bom: duas que nasceram juntas · Mau: cópia sem crédito |
| **Teclado** | «gemeos» | Bom: mesma palavra · Mau: confundir com *genios* |
| **Tech** | «o Gemini disse» | Bom: citar fonte · Mau: [ídolo](${idolo}) de caixa |

## 7. Anti-fusão · Valeu !!!

| Armadilha | Leitura |
|-----------|---------|
| **Homófono de página** | *gên-* não prova parentesco |
| **Céu como manual** | Signo não substitui [caminho](${caminho}) |
| **Lâmpada como par** | Desejo de Aladim ≠ irmão de sangue |
| **Marca como génio** | Nome *Gemini* = gêmeos; [skill](${skill}) continua humano |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — um ofício por mão, mesmo em par |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sou gêmeo do génio» = mistura de fichas |
| Rede | [relação](${relacao}) · [mãos](${maos}) · [genial](${genial}) · [verdade](${verdade}) |

## Hipóteses (síntese)

**H1:** *gêmeos* = *geminus* (par); *gênio* = *genius* (engenho / espírito).  
**H2:** Gemini no céu e na marca aponta o **par**, não a lâmpada.  
**H3:** Aladim relaciona-se por **contraste** (desejo × nascimento a dois).  
**H4:** fecho [Valeu !!!](${mantra}); ficha ≠ horóscopo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Genial](${genial}) | Engenho — o vizinho que **não** é esta palavra |
| [Abracadabra](${abracadabra}) | Fórmula / atalho — lâmpada e palco |
| [Relação](${relacao}) · [Mão esquerda / direita](${maos}) | Par com ofício, não fusão |
| [Pattern](${pattern}) · [Skill](${skill}) · [Gesto](${gesto}) | Dois que repetem **método**, não destino |
| [Grok](${grok}) · [Sol](${sol}) | Outro nome tech; astro sem horóscopo de laudo |
| [Verdade](${verdade}) · [Ídolo](${idolo}) · [Língua portuguesa](${lingua}) | Separar letras, recusar pedestal |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [Guia](${guia}) | Fecho |

## Limites

- Não diagnostica gemelaridade nem aconselha parentalidade.  
- Não lê carta astral.  
- Não avalia modelos de linguagem chamados Gemini.

## Status

**Aprovado** — **gêmeos** fichado como *geminus* (par / signo); armadilha *gênio* / Aladim / Gemini marcada; elos [relação](${relacao}) · [genial](${genial}) · [abracadabra](${abracadabra}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Genial](${genial}) · [▶ Relação](${relacao}) · [▶ Abracadabra](${abracadabra}) · [▶ Mãos](${maos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **gêmeos** (“twins”; typed **gemeos**). Field question: relation to *genius* / genial / Aladdin? **Letter-trap, not shared etymon.** *Gêmeos* ← Lat. *geminus* (twin, double). *[Gênio](${wikiGenius})* / [genial](${genial}) ← Lat. *genius*. **Gemini** is the Latin name of the pair (constellation / sign). Links: [relação](${relacao}), [Valeu !!!](${mantra}).

> Sources: [gêmeo](${WIKI}), [Gemini](${wiktEn}). **Not a horoscope, not an AI review.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **gêmeos** · oral **gemeos** |
| Path | *geminus* (twins) ≠ *genius* (spirit / ingenuity) ≠ genie of the lamp |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** *gênio* and *gêmeos* are one family.  
**Is:** two Latin roots. The lamp grants wishes ([abracadabra](${abracadabra})); twins share a birth ([relação](${relacao})).

## 3. Correction

**Twins ≠ genie ≠ “genial!”** If the mouth said Geneo / génio, see [genial](${genial}). Close with [Valeu !!!](${mantra}) in **this** pair of hands.

## Status

**Approved** — *geminus* sheet; trap with genius / Aladdin / Gemini marked.

[▶ Words](${hub}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **gêmeos** («gemelos»; teclado **gemeos**). ¿Relación con genio / genial / Aladino? **Trampa de letras, no étimo común.** *Gêmeos* ← lat. *geminus*. *[Gênio](${wikiGenius})* / [genial](${genial}) ← lat. *genius*. **Gemini** es el nombre latino del par. Vínculos: [relação](${relacao}), [¡Valeu !!!](${mantra}).

> Fuentes: [gêmeo](${WIKI}), [Gemini](${wiktEn}). **No es horóscopo ni reseña de IA.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **gêmeos** · oral **gemeos** |
| Camino | *geminus* (par) ≠ *genius* (ingenio / espíritu) ≠ genio de la lámpara |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** una sola familia.  
**Es:** dos raíces. La lámpara pide deseo ([abracadabra](${abracadabra})); los gemelos comparten nacimiento ([relação](${relacao})).

## 3. Corrección

**Gemelos ≠ genio de la lámpara ≠ «¡genial!».** Si la boca dijo Geneo / génio, ver [genial](${genial}). Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — ficha *geminus*; trampa con genio / Aladino / Gemini marcada.

[▶ Palabras](${hub}) · [▶ Genial](${genial}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildGemeosPost() {
  const { body, contentEn, contentEs, wiki } = buildGemeosBodies();
  let seriesOrder = 122;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-gemeos');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 122 */
  }

  const post = makePalavra({
    title: 'Inspeção: Gêmeos — par, signo Gemini e a armadilha com «gênio»',
    titleEn: 'Inspection: Gêmeos — twins, Gemini, and the trap with “gênio”',
    titleEs: 'Inspección: Gêmeos — gemelos, Gemini y la trampa con «gênio»',
    excerpt:
      'Palavras: «gêmeos» (gemeos) — lat. geminus (par) ≠ genius (engenho / lâmpada); signo Gemini; elos relação e genial; Valeu !!!',
    excerptEn:
      'Words: “gêmeos” — Lat. geminus (twins) ≠ genius (craft / lamp); Gemini sign; links relação and genial; Valeu !!!',
    excerptEs:
      'Palabras: «gêmeos» — lat. geminus (par) ≠ genius (ingenio / lámpara); signo Gemini; vínculos relação y genial; ¡Valeu !!!',
    slug: 'inspecao-palavra-gemeos',
    date: '2026-08-20T01:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Gêmeos · palavra',
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

module.exports = {
  buildGemeosPost,
  buildGemeosBodies
};
