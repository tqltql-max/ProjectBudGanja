'use strict';

/**
 * Inspeção Palavras · Neve
 * Lat. nix, nivis — cristal que cai / cobertura branca.
 * ≠ gelo (gelū / glaciēs) ≠ geada ≠ EN never ≠ lat. nēve («e não»).
 * Par de ofício: derreter (o sólido volta a água).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/neve-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/neve';
const WIKT_EN_NIX = 'https://en.wiktionary.org/wiki/nix#Latin';
const WIKT_NEVE_LA = 'https://en.wiktionary.org/wiki/neve#Latin';
const WIKT_SNOW = 'https://en.wiktionary.org/wiki/snow';
const WIKT_NEVER = 'https://en.wiktionary.org/wiki/never';

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
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Neve.
Não é o gelo.
O gelo prende o casco.
A neve cobre e cala.

Nix, nivis:
cristal que cai.
Não é o never inglês.
Não é o nēve latino
que diz «e não».

Branca sobre o mapa.
Ruído branco na narrativa.
Quem bebe a neve
bebe água que foi céu.

Derreter devolve o rio.
A cobertura não é prisão.

Valeu !!!
a branca certa
e o degelo no tempo.`;
}

function poemEn() {
  return `Neve.
Not ice.
Ice holds the hull.
Snow covers and hushes.

Nix, nivis:
a crystal that falls.
Not English never.
Not Latin nēve
that says “and not.”

White on the map.
White noise in the tale.
Whoever drinks the snow
drinks water that was sky.

Melting gives back the river.
The cover is not a lock.

Valeu !!!
the right white
and thaw in time.`;
}

function poemEs() {
  return `Neve.
No es el hielo.
El hielo prende el casco.
La nieve cubre y calla.

Nix, nivis:
cristal que cae.
No es el never inglés.
No es el nēve latino
que dice «y no».

Blanca sobre el mapa.
Ruido blanco en la narrativa.
Quien bebe la nieve
bebe agua que fue cielo.

Derretir devuelve el río.
La cubierta no es prisión.

¡Valeu !!!
la blanca cierta
y el deshielo a tiempo.`;
}

function buildNeveBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-neve.html';
  const derreter = '/posts/post-inspecao-palavra-derreter.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const invernagem = '/posts/post-inspecao-palavra-invernagem.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const groenlandia = '/posts/post-inspecao-palavra-groenlandia.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const elza = '/posts/post-inspecao-desenho-elza-frozen.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';
  const qa = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';

  const body = `## Escopo

Inspeção editorial da palavra **[Neve](${self})**. Pedido de campo: *inspeção palavra neve e derver*.

*Neve* é o nome português do **cristal que cai** e da **cobertura branca** que ele deixa no chão — lat. *nix, nivis*. Esta ficha cobre o étimo, o corte com [gelo](${gelo}) e geada, as colas da orelha (**never** inglês · **nēve** latino «e não» · **nix** EN «nada»), o lote Tamara / [*Bom dia, Inverno*](${bomDia}) e o par de ofício **[derreter](${derreter})** (pedido de campo *derver*).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · neve](${WIKT}), lat. [*nix*](${WIKT_EN_NIX}), lat. [*nēve*](${WIKT_NEVE_LA}), EN [*snow*](${WIKT_SNOW}), EN [*never*](${WIKT_NEVER}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}). **Ficha ≠ boletim meteorológico, ≠ manual de avalanche, ≠ receita de neve comestível.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *neve* / *neves* / *nevar* / *nevada* / *Branca de Neve* / *never* / *nieve* / *nix*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **neve** |
| Classe | Substantivo feminino (também forma do verbo *nevar*) |
| Étimo (trabalho) | Lat. *nix, nivis* «neve» ← PIE *snígʷʰs — confiança: **alta** |
| Via | Romance (it. *neve* · esp. *nieve* · fr. *neige*) |
| Família viva | *nevar* · *nevada* · *nevoeiro* (**prima** — ofício de névoa, outra ficha) · *das neves* |
| Tipo BudGanja | Palavra — matéria × paisagem × cola de orelha |
| Par de ofício | [Derreter](${derreter}) — o sólido **volta** a [água](${agua}) |
| Não é | [Gelo](${gelo}) · geada · granizo · EN *never* · lat. *nēve* («e não») · EN *nix* («nada») |
| Data | ${inspected} |
| Fonte | [neve](${WIKT}) · [*nix*](${WIKT_EN_NIX}) |

**O que é o objecto:** o vocábulo que nomeia a **precipitação cristalina** e a **manta** que ela desenha. Não é o bloco que prende o casco. Não é a geada que nasce no chão. Não é a negação inglesa.

## 2. Latim — *nix, nivis*

*Nix* (gen. *nivis*) é o substantivo latino da cobertura branca. O verbo clássico é *ningit* («neva»). O português herdou o radical *niv-* → *neve* / *nevar*. O [latim](${latim}) do laboratório já corta: a peça nua é **matéria que cai do céu**, não qualidade térmica ([frio](${calorFrio})) nem estação ([inverno](${inverno})).

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **nix, nivis** | Neve (lat.) | Alta |
| PT **neve** | Mesmo radical *niv-* | Alta |
| Esp. **nieve** · it. **neve** · fr. **neige** | Cognatos românicos | Alta |
| EN **snow** | Germânico da **mesma** raiz PIE *snígʷʰs — primo, não empréstimo | Alta |
| Lat. **nēve** | *nē* + *-ve* «e não / nem» — **homónimo** de grafia | Alta |
| EN **never** | *ne* + *ever* — **outra** árvore | Alta |
| EN **nix** («nada») | Alemão *nichts* — **outra** árvore; o olho cola no *nix* latino | Alta |

**H-uma raiz:** *neve*, *nieve*, *neige* e *snow* **rimam no céu indo-europeu**. Não são a mesma boca.  
**H-homónimo:** o [latim](${latim}) escreve *neve* para **«e não»**. A [orelha cola](${orelhaCola}); o ofício **separa**: uma é matéria; a outra é partícula de negação.

## 3. Quatro salas — a mesma boca

| Sala | Leitura | Exemplo | O que estudar |
|------|---------|---------|----------------|
| **A. Matéria** | Cristal / precipitação / manta | «caiu neve»; beber neve no Ártico | Secção 4 |
| **B. Paisagem** | Léxico Tamara / [inverno](${inverno}) | Q&A; [*Bom dia, Inverno*](${bomDia}) | Secção 5 |
| **C. Figura** | Cãs, conto, ruído branco | Branca de Neve; «cabelo de neve» | Secção 6 |
| **D. Cola** | Homónimos e falsos primos | *never* · *nēve* · *nix* | Secção 7 |

**H-uma boca:** a manta do Ártico e as cãs **rimam** em branco. Não são o mesmo ofício.

## 4. Sala A — matéria (cristal × bloco)

Aqui *neve* é **água no ar que cristaliza e cai**. O [gelo](${gelo}) é **água já sólida em massa** (casco, rio, cubo). A geada **nasce no chão** por deposição. O granizo é **bola dura**. [Derreter](${derreter}) é o gesto que **devolve** a [água](${agua}).

| Corte | Leitura |
|-------|---------|
| Neve ≠ [gelo](${gelo}) | Cai e cobre; o gelo **prende** |
| Neve ≠ geada | Céu → chão; a geada **nasce** no objecto |
| Neve ≠ [frio](${calorFrio}) | Matéria; frio é **qualidade** |
| Neve ≠ [inverno](${inverno}) | Há inverno sem nevada |
| Beber neve | Ofício ártico (Tamara); não é receita desta ficha |

**H-ciclo:** [água](${agua}) → neve / [gelo](${gelo}) → [derreter](${derreter}) → água. Sem o verbo, a cobertura finge eterno.

## 5. Sala B — paisagem (Tamara / Inverno)

No lote [*Bom dia, Inverno*](${bomDia}), *neve* é **paisagem e ruído branco** da [Groenlândia](${groenlandia}): cobre, isola, dá água. A [invernagem](${invernagem}) mede-se no [gelo](${gelo}) que prende o barco; a neve é a **manta** e o **recurso**. Fontes de campo: [Q&A Tamara](${qa}), ficha [Tamara · Legado](${tamara}).

| Peça | Papel |
|------|-------|
| Cobertura | Isola e revela o relevo |
| Água | Icebergues e neve como fonte (texto do site / Q&A) |
| Ruído branco | A narrativa que **enche** o silêncio do Ártico |
| [Risco](${risco}) | Avalancha, cegueira, hipotermia — **mapa**, não romance |

**H-Tamara:** catalogar o vocábulo ≠ vender o livro. Palavra ≠ biografia.

## 6. Sala C — figura (cãs · conto · palácio)

O Wikcionário regista *neve* como **cabelos brancos**. *Branca de Neve* é **homónimo cultural** (conto). [Elza](${elza}) empresta palácio de gelo — Artes, não étimo.

| Figura | Ofício | Corte |
|--------|--------|-------|
| Cãs | Branco do tempo no cabelo | ≠ precipitação |
| Branca de Neve | Conto / marca | Homónimo de palco |
| [Elza](${elza}) | Gelo de desenho | ≠ matéria da invernagem |
| «Ruído branco» | Metáfora de fundo | ≠ espectro de áudio (engenharia) |

## 7. Sala D — o que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **neve** = **never** | A mesma boca EN/PT | PT matéria (*nix*) × EN negação (*ne* + *ever*) |
| **neve** = lat. **nēve** | A mesma grafia | Matéria × «e não» |
| **nix** lat. = **nix** EN | A mesma peça | Neve latina × «nada» alemão |
| **neve** = [gelo](${gelo}) | «Tudo que é branco e frio» | Cristal que cai × bloco que prende |
| **neve** = [inverno](${inverno}) | A estação | Época ≠ matéria |
| *derver* | Palavra à parte | Forma de campo de **[derreter](${derreter})** |

**Anti-armadilha:** fundir neve, gelo, frio e inverno num só sopro. Outra: traduzir *never* por *neve*. Outra: ler o *nēve* latino como meteorologia.

## 8. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Nomear a manta **distinta** do [gelo](${gelo}) que prende |
| Bom | Ligar o ciclo a [derreter](${derreter}) e [água](${agua}) |
| Bom | Cortar *never* / *nēve* / *nix* EN antes de traduzir |
| Bom | Ler Tamara como paisagem, não como manual de sobrevivência |
| Mau | «Neve = gelo = frio = inverno» |
| Mau | Tutorial de avalanche ou de beber neve sem método |
| Mau | Fundir o conto *Branca de Neve* no étimo *nix* |

Fecho: [Valeu !!!](${mantra}) — a branca certa *deste* chão *hoje*.

## 9. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vidaHub}#poema=neve)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Derreter](${derreter}) | O gesto — campo *derver* |
| [Gelo](${gelo}) · [água](${agua}) | Bloco × líquido do mesmo ciclo |
| [Calor × frio](${calorFrio}) · [fogo](${fogo}) | Qualidade e fonte; neve não é o grau |
| [Inverno](${inverno}) · [invernagem](${invernagem}) · [Groenlândia](${groenlandia}) | Época, ofício, palco |
| [*Bom dia, Inverno*](${bomDia}) · [Tamara](${tamara}) · [Q&A](${qa}) | Lote de origem desta ficha |
| [Lava](${lava}) | Rocha fundida — **outro** derreter |
| [latim](${latim}) · [étimo](${etimo}) · [etimologia](${etimologia}) | *nix, nivis* / *nēve* |
| [língua portuguesa](${lingua}) · [A orelha cola](${orelhaCola}) | *neve* × *never* |
| [Guia](${guia}) · hub [Palavras](${hub}) | Mapa |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Ofício e fecho |

## Limites

- Não é boletim, guia de avalanche nem protocolo de água potável no Ártico.  
- Não vende [*Bom dia, Inverno*](${bomDia}) nem biografa [Tamara](${tamara}).  
- *Nevoeiro* fica **prima** (névoa); pode ganhar ficha própria.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **neve** fichada como lat. *nix, nivis*; cortadas [gelo](${gelo}), geada, EN *never*, lat. *nēve*, EN *nix*; par vivo **[derreter](${derreter})** (*derver* de campo). Lote Tamara / [*Bom dia, Inverno*](${bomDia}) mantido como sala B, não como étimo. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Derreter](${derreter}) · [▶ Gelo](${gelo}) · [▶ Água](${agua}) · [▶ Calor × frio](${calorFrio}) · [▶ Inverno](${inverno}) · [▶ Bom dia, Inverno](${bomDia}) · [▶ Tamara](${tamara}) · [▶ Poema Vida](${vidaHub}#poema=neve) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **Neve** (snow). Field request: *neve* and *derver*.

From Latin *nix, nivis* — the falling crystal and the white cover. Not [ice](${gelo}) (the block that holds a hull). Not English *never*. Not Latin *nēve* (“and not”). Craft pair: **[derreter](${derreter})** (field form *derver*) — solid water returning to [water](${agua}).

> Sources: [Wiktionary · neve](${WIKT}), Lat. [*nix*](${WIKT_EN_NIX}). Method: [etymology](${etimologia}). Not a weather report. Close: [Valeu !!!](${mantra}).

## Four rooms, one mouth

| Room | Reading |
|------|---------|
| **A. Matter** | Crystal that falls; [ice](${gelo}) *holds*; frost *grows* on the ground |
| **B. Landscape** | Tamara / [*Bom dia, Inverno*](${bomDia}) — cover, water, white noise |
| **C. Figure** | White hair; Snow White (stage homonym); [Elsa](${elza}) is art, not the etymon |
| **D. Glue** | *never* · Lat. *nēve* · EN *nix* (“nothing”) — [the ear glues](${orelhaCola}); craft cuts |

Water → snow / ice → [melt](${derreter}) → water. Without the verb, the cover pretends to be eternal.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Snow filed. Ice cut. *Never* cut. Pair: [derreter](${derreter}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Neve** (nieve). Pedido de campo: *neve* y *derver*.

Del latín *nix, nivis* — el cristal que cae y la cubierta blanca. No es [hielo](${gelo}) (el bloque que prende el casco). No es el inglés *never*. No es el latín *nēve* («y no»). Par de oficio: **[derreter](${derreter})** (forma de campo *derver*) — el sólido vuelve al [agua](${agua}).

> Fuentes: [Wikcionario · neve](${WIKT}), lat. [*nix*](${WIKT_EN_NIX}). Método: [etimología](${etimologia}). No es boletín del tiempo. Cierre: [¡Valeu !!!](${mantra}).

## Cuatro salas, una boca

| Sala | Lectura |
|------|---------|
| **A. Materia** | Cristal que cae; el [hielo](${gelo}) *prende*; la escarcha *nace* en el suelo |
| **B. Paisaje** | Tamara / [*Bom dia, Inverno*](${bomDia}) — cubierta, agua, ruido blanco |
| **C. Figura** | Canas; Blancanieves (homónimo de escenario); [Elsa](${elza}) es arte, no étimo |
| **D. Cola** | *never* · lat. *nēve* · EN *nix* («nada») — [la oreja pega](${orelhaCola}); el oficio corta |

Agua → nieve / hielo → [derretir](${derreter}) → agua. Sin el verbo, la cubierta finge eterna.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Nieve fichada. Hielo cortado. *Never* cortado. Par: [derreter](${derreter}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildNevePost() {
  const { body, contentEn, contentEs } = buildNeveBodies();
  const seriesOrder = pickOrder('inspecao-palavra-neve', 57);
  return makePalavra({
    title: 'Inspeção: Neve — nix, nivis; cobertura, não gelo',
    titleEn: 'Inspection: Neve — nix, nivis; cover, not ice',
    titleEs: 'Inspección: Neve — nix, nivis; cubierta, no hielo',
    excerpt:
      'Palavras: Neve ← lat. nix, nivis — cristal que cai; ≠ gelo ≠ never ≠ nēve latino; par derreter (derver); Valeu !!!',
    excerptEn:
      'Words: Neve ← Lat. nix, nivis — falling crystal; ≠ ice ≠ never ≠ Latin nēve; pair derreter (derver); Valeu !!!',
    excerptEs:
      'Palabras: Neve ← lat. nix, nivis — cristal que cae; ≠ hielo ≠ never ≠ nēve latino; par derreter (derver); ¡Valeu !!!',
    slug: 'inspecao-palavra-neve',
    date: '2026-08-24T18:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Neve',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNevePost,
  buildNeveBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_EN_NIX,
  WIKT_NEVE_LA,
  WIKT_NEVER
};
