'use strict';

/**
 * Inspeção objecto · mola / molas
 * Pedido: inspeção do objeto Molas · relação com animal mula.
 * Eixos: it. molla ← molle / lat. mollis · cede e volta (Hooke) ·
 * ≠ mula (lat. mūla) · ≠ mó (lat. mola, mó de moinho) · ≠ muleta ·
 * carroça de feixe · passo equino · catálogo /objetos/ · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mola-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/mola';
const WIKT_MULA = 'https://pt.wiktionary.org/wiki/mula';
const WIKT_MOLLE = 'https://en.wiktionary.org/wiki/molle#Italian';
const WIKT_MOLLIS = 'https://en.wiktionary.org/wiki/mollis#Latin';
const WIKT_MULA_LA = 'https://en.wiktionary.org/wiki/mula#Latin';
const WIKI_MOLA = 'https://pt.wikipedia.org/wiki/Mola_%28dispositivo%29';
const WIKI_MULA = 'https://pt.wikipedia.org/wiki/Mula';
const WIKI_HOOKE = 'https://pt.wikipedia.org/wiki/Lei_de_Hooke';

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

function buildMolaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-mola.html';
  const mula = '/posts/post-inspecao-animal-mula.html';
  const mulaFicha = '/animais/mula/';
  const cavalo = '/posts/post-inspecao-animal-cavalo.html';
  const cavaloFicha = '/animais/cavalo/';
  const animais = '/animais/';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const colchao = '/posts/post-inspecao-palavra-colchao.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const codorna = '/posts/post-inspecao-animal-codorna.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const pressao = '/posts/post-inspecao-palavra-impressao-pressao.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const racao = '/posts/post-inspecao-derivado-racao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [mola](${self})** (pedido de campo: *Molas*) — a **peça elástica** que **cede e volta**. Pedido irmão: [relação](${relacao}) com o animal **[mula](${mula})**. O ouvido cola *mola* e *mula* (um **o** / um **u**); o lab **separa**. Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa**. A mula entra no hub [Animais](${animais}) como **ser vivo** (*Equus asinus* × *Equus ferus caballus*). Par de método: [corda](${corda}) × [codorna](${codorna}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mola](${WIKT}), [mula](${WIKT_MULA}), it. [*molle*](${WIKT_MOLLE}) / lat. [*mollis*](${WIKT_MOLLIS}), lat. [*mūla*](${WIKT_MULA_LA}), [WP · mola](${WIKI_MOLA}), [mula](${WIKI_MULA}), [lei de Hooke](${WIKI_HOOKE}). **Ficha ≠ manual de mola, ≠ protocolo equino, ≠ receita de colchão.** Sem afiliação comercial de molas nem de criação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *MOLAS* / *mola* / *molas* → lema **mola** (objecto). *mula* / *mulo* → ficha [animal](${mula}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **mola** (lema); fala e catálogo muitas vezes **molas** (o jogo, o feixe, o colchão) |
| Classe | Substantivo feminino — peça elástica |
| Étimo (trabalho) | it. *molla* «mola» ← *molle* «mole / que cede» ← lat. *mollis* — confiança: **alta** |
| Família verdadeira | *elástico* · *elasticidade* · *ressalto* · esp. *muelle* · it. *molla* |
| Homónimo recusado | lat. *mola* «mó de moinho» → PT **mó** — **não** é este objecto |
| Tipo BudGanja | Objecto — cede e volta × amortece × armazena |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | [mula](${mula}) (animal) · **mó** (moinho) · **muleta** (apoio) · [colchão](${colchao}) inteiro |
| Elo animal | [mula](${mula}) · ficha [/animais/mula/](${mulaFicha}) · [cavalo](${cavalo}) |
| Elo ofício | [pressão](${pressao}) · [pular](${pular}) · [gesto](${gesto}) · [risco](${risco}) |
| Fonte | [mola](${WIKT}) · [dispositivo (WP)](${WIKI_MOLA}) |
| Data | ${inspected} |

**O que é o objecto:** um corpo (metal, em regra) que **deforma com carga e recupera a forma** quando a carga sai — dentro do limite elástico. No lab: a mola **não** é teimosia nem animal; é **coisa que cede e volta**.

## 2. Mola × mula × mó × muleta

| Forma | Étimo | Ofício |
|-------|-------|--------|
| **mola** | it. *molla* ← *mollis* «mole» | Objecto elástico — esta ficha |
| **[mula](${mula})** | lat. *mūla* | Animal — híbrido jumento × égua; ficha [animal](${animal}) |
| **mulo** | lat. *mūlus* | Macho do mesmo híbrido — mesma ficha animal |
| **mó** | lat. *mola* «pedra de moinho» | Outro objecto — **homónimo latino**, não este |
| **muleta** | apoio / muleta de toureio | Outro objecto — a orelha cola com *mula*; **não** é mola |
| **bardoto** | égua invertida (garanhão × jumenta) | Outro híbrido — **não** a mula clássica |
| **[corda](${corda}) / [codorna](${codorna})** | *chorda* / *coturnīx* | Par de método: ouvido cola, étimo corta |

**H1:** *mola* (peça) vem da via **mole / que cede** (*mollis*), não da *mūla* do estábulo.  
**H2:** *mola* / *mula* é vizinhança de [trocadilho](${trocadilho}) — um fonema; dois ofícios.  
**H3:** a [relação](${relacao}) de campo **não** é étimo comum: é **uso** (carroça com feixe) + **passo** (tendão) + **figura** (cede × resiste).  
**H4:** lat. *mola* (mó) é armadilha de dicionário — no PT actual a pedra é **mó**.

## 3. A relação com a mula (o pedido)

Três camadas — sem fundir:

| Camada | O que **é** | O que **não** é |
|--------|-------------|-----------------|
| **Ouvido** | *mola* soa *mula* | Não prova parentesco |
| **Carroça** | O **feixe de molas** amortece o passo da [mula](${mula}) no carro | A mula **não** é a mola |
| **Corpo** | O membro distal do equídeo funciona como **mola viva** (tendão, ligamento suspensor) | Não transforma o animal em peça de aço |
| **Figura** | A mola **cede e volta** (Hooke); a fala chama a mula de **teimosa** | Estereótipo ≠ laudo; o animal tem ofício, não vício |
| **Folk** | *mula-sem-cabeça* (lenda BR) | Folclore ≠ Equidae desta ficha |
| **Gíria** | *mula de carga*, *picar a mula*, *cabeça-dura* | Camadas da fala — não o objecto |

**Leitura lab:** inspecionar a **mola** na carroça **e** o **passo** da mula **sem** baptizar o animal com o nome da peça. O par [corda](${corda})/[codorna](${codorna}) já ensinou: a orelha cola; o [étimo](${etimo}) corta.

## 4. Peças e formas do objecto

| Forma | Leitura lab |
|-------|-------------|
| **Helicoidal / espiral** | A mola «de caderno» e de suspensão — a imagem mais falada |
| **Feixe / lâmina** | A da **carroça** e do camião — elo directo com a [mula](${mula}) de tração |
| **Torção** | Porta, ratoeira, palheta — gira e devolve |
| **Prato / belleville** | Disco que cede no eixo — outra geometria, mesmo ofício |
| **Pneumática** | Ar no lugar do aço — ainda é mola de função, outro material |
| **Colchão de molas** | As molas **dentro** do [colchão](${colchao}) — o colchão é o sítio de dormir; as molas são esta ficha |
| **Mola de roupa (PT-PT)** | Pregador — sentido regional; no BR o lema desta ficha é a peça elástica |

Lei de [Hooke](${WIKI_HOOKE}) (mapa, não aula): *F = −kx* — a força devolve **proporcional** ao quanto se apertou, **enquanto** se está no regime elástico. Fora disso a mola **cede e não volta**: é [risco](${risco}) de peça, não teimosia.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Animal** | Mola = mula | Objecto ≠ [mula](${mula}) |
| **Mó** | Mesma grafia latina *mola* | No PT: **mó** de moinho · outro objecto |
| **Muleta** | Soa a mula | Apoio / capa — outra coisa |
| **Colchão** | O colchão *é* as molas | O [colchão](${colchao}) é a superfície; as molas são peças **dentro** |
| **Pulo** | Mola = [pular](${pular}) | O pulo é o [gesto](${gesto}); a mola é o que **devolve** o gesto |
| **Teimosia** | Quem não cede «é mula»; quem cede «é mola» | Figura de fala — não étimo, não laudo |
| **Marca** | O colchão da loja prova a física | Sem afiliação — inspecionar a **função** |

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «a mola quebrou», «trocar as molas» | Bom: a coisa |
| **Colchão** | «colchão de molas» | Bom: tipo; mau: fundir com a ficha [colchão](${colchao}) |
| **Carroça / carro** | «mola de feixe» | Bom: elo com a [mula](${mula}) de tração |
| **Corpo** | «mola do passo», tendão | Bom se declarado: metáfora anatómica |
| **Figura** | «tem mola» (recupera), «sem mola» (não volta) | Bom se se nomeia a figura |
| **Trocadilho** | *mola* / *mula* | Bom no [trocadilho](${trocadilho}); mau como étimo |
| **Gíria da mula** | «trabalha que nem mula» | Ficha [mula](${mula}) — não esta peça |
| **PT-PT** | mola = pregador | Regional — anotar, não fundir com o lema BR |

**Finalidade-mãe:** nomear as **molas** para inspecionar a **coisa que cede e volta**, e cruzar com a [mula](${mula}) **sem** colar o animal na peça.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Peça elástica — catálogo [Objetos](${objetos}) |
| Animal | [Mula](${mula}) — híbrido; ficha [/animais/mula/](${mulaFicha}) |
| Par de método | [Corda](${corda}) × [codorna](${codorna}) |
| Irmão equídeo | [Cavalo](${cavalo}) · [/animais/cavalo/](${cavaloFicha}) |
| Sono | [Colchão](${colchao}) de molas — sítio ≠ peça |
| Força | [Pressão](${pressao}) · [pular](${pular}) · [risco](${risco}) |
| Mantra | [Valeu !!!](${mantra}) — o melhor **nesta** peça, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **mola** é objecto (*mollis* / *molla*); **mula** é animal (*mūla*). A carroça junta os dois no **feixe**; o étimo não.

## Hipóteses (síntese)

**H1:** *mola* (peça) < it. *molla* < *molle* < lat. *mollis* — alta.  
**H2:** *mula* < lat. *mūla* — alta; **não** é o mesmo avô.  
**H3:** a [relação](${relacao}) de campo = ouvido + carroça + passo + figura.  
**H4:** lat. *mola* (mó) ≠ esta ficha.  
**H5:** colchão de molas = [colchão](${colchao}) + **estas** peças.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mula](${mula}) · [/animais/mula/](${mulaFicha}) | O animal do pedido |
| [Cavalo](${cavalo}) · [Animais](${animais}) · [animal](${animal}) | Família Equidae · hub |
| [Corda](${corda}) · [codorna](${codorna}) | Par de método (orelha × étimo) |
| [Colchão](${colchao}) | Onde as molas dormem — outra ficha |
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Trocadilho](${trocadilho}) · [relação](${relacao}) | O jogo e o *entre* |
| [Pressão](${pressao}) · [pular](${pular}) · [risco](${risco}) | Força, salto, limite elástico |
| [Ração](${racao}) | Tigela do animal — não a peça |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Tesoura |
| [Gesto](${gesto}) · [verdade](${verdade}) | Apertar sem romper |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é dimensionamento de mola, catálogo de marcas nem aula de resistência dos materiais.  
- Não é protocolo veterinário, treino equestre nem laudo de bem-estar.  
- *Mula* gíria (carga ilícita, xingo) fica **nomeada** como camada da fala — esta ficha não a ensina.  
- *Mula-sem-cabeça* é folclore; fica fora do ofício Equidae.  
- PT-PT *mola* (pregador) é nota regional, não o lema BR desta inspeção.

## Status

**Aprovado** — **mola** / **molas** fichadas como **objecto** (it. *molla* ← *mollis*); catálogo [Objetos](${objetos}); [relação](${relacao}) com a [mula](${mula}) (*mūla*) por ouvido, carroça e passo — **sem** fundir étimos. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Mula](${mula}) · [▶ Cavalo](${cavalo}) · [▶ Colchão](${colchao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **mola** / **molas** — the **object**: an elastic piece that **yields and returns**. Field request: relation with the animal **[mula](${mula})** (mule). The ear glues *mola* and *mula* (o / u); the lab **splits** them. Catalog: [Objetos](${objetos}). Method pair: [corda](${corda}) × [codorna](${codorna}). Close: [Valeu !!!](${mantra}).

> Independent audit. [mola](${WIKT}), [mula](${WIKT_MULA}), Lat. [*mollis*](${WIKT_MOLLIS}), [*mūla*](${WIKT_MULA_LA}), [Hooke](${WIKI_HOOKE}). Not a spring-design manual. Not a veterinary protocol.

## Object

| Field | Value |
|-------|-------|
| Thing | Elastic piece (coil, leaf, torsion…) that stores and returns energy |
| Etymon | It. *molla* ← *molle* ← Lat. *mollis* “soft / yielding” |
| Not | The [mule](${mula}) · millstone (PT **mó** ← Lat. *mola*) · crutch (*muleta*) · the whole [mattress](${colchao}) |
| Field link | Leaf springs on a cart the mule pulls; equine distal limb as a living spring |
| Catalog | [Objetos](${objetos}) |

**H1:** spring and mule do **not** share an etymon.  
**H2:** the requested [relação](${relacao}) is ear + wagon + gait + figure (yield vs stubborn talk).  
**H3:** Hooke *F = −kx* maps the object until the elastic limit — then the piece **fails**, it does not “act like a mule.”

## Status

**Approved** — **mola** as thing (*mollis*); **mula** as animal (*mūla*); catalog [Objetos](${objetos}).

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Mule](${mula}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Portugués **mola** / **molas** — el **objeto**: pieza elástica que **cede y vuelve**. Pedido de campo: [relación](${relacao}) con el animal **[mula](${mula})**. El oído pega *mola* y *mula* (o / u); el lab **separa**. Catálogo: [Objetos](${objetos}). Par de método: [corda](${corda}) × [codorna](${codorna}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [mola](${WIKT}), [mula](${WIKT_MULA}), lat. [*mollis*](${WIKT_MOLLIS}), [*mūla*](${WIKT_MULA_LA}), [Hooke](${WIKI_HOOKE}). No es manual de muelle. No es protocolo veterinario.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Pieza elástica (helicoidal, de ballesta, de torsión…) |
| Étimo | it. *molla* ← *molle* ← lat. *mollis* «blando / que cede» |
| No es | La [mula](${mula}) · muela de molino (PT **mó**) · muleta · el [colchón](${colchao}) entero |
| Vínculo de campo | Ballestas del carro que tira la mula; miembro distal equino como muelle vivo |
| Catálogo | [Objetos](${objetos}) |

**H1:** muelle y mula **no** comparten étimo.  
**H2:** la relación pedida es oído + carro + paso + figura (ceder × «terco»).  
**H3:** Hooke *F = −kx* mapea el objeto hasta el límite elástico.

## Estado

**Aprobada** — **mola** como cosa (*mollis*); **mula** como animal (*mūla*); catálogo [Objetos](${objetos}).

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Mula](${mula}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildMolaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMolaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-mola', 200);
  return makePalavra({
    title: 'Inspeção: Mola — o objecto que cede e volta (≠ mula)',
    titleEn: 'Inspection: Mola — the object that yields and returns (≠ mule)',
    titleEs: 'Inspección: Mola — el objeto que cede y vuelve (≠ mula)',
    excerpt:
      'Objecto: mola / molas (it. molla ← mollis) — peça elástica; ≠ mula (lat. mūla) ≠ mó; feixe da carroça e passo equino; catálogo Objetos; Valeu !!!',
    excerptEn:
      'Object: mola / molas (It. molla ← mollis) — elastic piece; ≠ mule (Lat. mūla) ≠ millstone; wagon leaf-spring and equine gait; Objects catalog; Valeu !!!',
    excerptEs:
      'Objeto: mola / molas (it. molla ← mollis) — pieza elástica; ≠ mula (lat. mūla) ≠ muela; ballesta del carro y paso equino; catálogo Objetos; ¡Valeu !!!',
    slug: 'inspecao-palavra-mola',
    date: '2026-08-24T12:48:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mola · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMolaPost, buildMolaBodies, COVER, WIKT, WIKT_MULA, WIKI_MOLA, WIKI_MULA };
