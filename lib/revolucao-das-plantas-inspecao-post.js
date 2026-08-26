'use strict';

/**
 * Inspeção Artes · livro A Revolução das Plantas (Stefano Mancuso).
 * Livro primeiro; autor como crédito, não ficha Pessoas.
 * Distinto da revista Horizonte Geográfico e da Revolução Verde.
 */

const fs = require('fs');
const path = require('path');
const { artePost } = require('./artes-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/revolucao-das-plantas-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/Stefano_Mancuso';
const UBU = 'https://www.ubueditora.com.br/';
const GIUNTI = 'https://giunti.it/products/plant-revolution-mancuso-stefano-9788809831360';
const ATRIA = 'https://www.simonandschuster.com/books/The-Revolutionary-Genius-of-Plants/Stefano-Mancuso/9781501187858';
const TED = 'https://www.ted.com/talks/stefano_mancuso_the_roots_of_plant_intelligence';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Não há cérebro no caule.
Há rede.
A revolução não grita.
Ocupa o chão e inventa o ar.

Guerra fica na outra sala:
raiz contra raiz no canteiro.
Aqui a planta já resolveu
o que a cidade ainda discute.

Valeu !!!
sem neurónio fingido,
com o crédito ao verde.`;
}

function poemEn() {
  return `There is no brain in the stem.
There is a network.
The revolution does not shout.
It occupies the ground and invents the air.

War stays in the other room:
root against root in the bed.
Here the plant already solved
what the city still debates.

Valeu !!!
without a fake neuron,
with credit to the green.`;
}

function poemEs() {
  return `No hay cerebro en el tallo.
Hay red.
La revolución no grita.
Ocupa el suelo e inventa el aire.

La guerra queda en la otra sala:
raíz contra raíz en el cantero.
Aquí la planta ya resolvió
lo que la ciudad aún discute.

¡Valeu !!!
sin neurona fingida,
con el crédito al verde.`;
}

function buildRevolucaoDasPlantasBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-revolucao-das-plantas.html';
  const hg = '/posts/post-inspecao-arte-horizonte-geografico.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const daninha = '/posts/post-inspecao-palavra-daninha.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const cultivo = '/cultivo/';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const taiz = 'https://doi.org/10.1016/j.tplants.2019.05.008';

  const body = `## Escopo

Inspeção editorial do livro **«[A revolução das plantas](${self})»** — ensaio de divulgação de **Stefano Mancuso**. Título italiano: *Plant Revolution. Le piante hanno già inventato il nostro futuro* (**Giunti, 2017**). No Brasil: *Revolução das plantas: um novo modelo para o futuro* (**Ubu, 2019**, trad. Regina Silva). Em inglês: *The Revolutionary Genius of Plants* (Atria, **2018**, trad. Vanessa Di Stefano). Pedido de campo: *livro do Mancuso*.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Stefano Mancuso](${WIKI}), [Giunti](${GIUNTI}), [Atria / S&S](${ATRIA}), [Ubu](${UBU}). **Sem afiliação** com o autor, LINV, Giunti, Ubu ou Atria. **Ficha ≠ reprodução do livro** (obra protegida — sem citações longas). Não é monografia botânica, nem veredicto de *peer review*, nem protocolo de cultivo. A revista [Horizonte Geográfico](${hg}) é **irmã** (mapa / guerra no canteiro), não este volume.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Revolução das plantas** (*Plant Revolution*, 2017) |
| Autor | **Stefano Mancuso** (Catanzaro, 1965) — crédito; **sem** ficha Pessoas nesta entrega |
| Ofício público | Botânico · Univ. Florença · LINV (neurobiologia vegetal) |
| BR | Ubu Editora, **2019** · trad. **Regina Silva** · ISBN **978-85-7126-034-4** · ~192 p. |
| IT | Giunti, **2017** · ISBN 978-88-09-83136-0 · Prémio Galileo **2018** |
| EN | Atria, **2018** · *The Revolutionary Genius of Plants* |
| Género | Ensaio de divulgação · biomimética · «inteligência» vegetal |
| Tipo BudGanja | Arte — **livro primeiro**; plantas no hub |
| Elo projecto | [Plantas](${plantas}) · [planta](${planta}) · [simbiose](${simbiose}) · [respeito](${respeito}) |
| Elo irmã | [Horizonte Geográfico](${hg}) — guerra entre plantas = **outra sala** |
| O que **não** é | Revolução Verde (Borlaug) · neurónio no caule · manifesto político de *A nação das plantas* |
| Fonte | [Mancuso (WP)](${WIKI}) · [Giunti](${GIUNTI}) |
| Data | ${inspected} |

**Objecto:** o ensaio que diz que as [plantas](${plantas}) **já inventaram** soluções (energia, rede, resiliência) — para o lab ler com [verdade](${verdade}), sem transformar metáfora em anatomia animal.

## 2. Relação com o projecto

O BudGanja não adopta Mancuso como guru. Cruza o livro com o ofício já fichado:

1. **Crédito à [planta](${planta})** — o hub [Plantas](${plantas}) nomeia espécies; o livro pede um olhar de **sujeito** (rede viva), não de insumo. Isso alinha com [respeito](${respeito}).  
2. **[Simbiose](${simbiose})** — Mancuso insiste na arquitectura **distribuída**, sem centro de comando; o lab já tem a palavra para «viver com».  
3. **Guerra ≠ esta âncora** — *guerra entre plantas* (luz, água, [daninha](${daninha})) vive na [Horizonte Geográfico](${hg}). Aqui a tese é **rede**; lá o canteiro disputa. Não fundir.  
4. **[Cultivo](${cultivo})** — ofício humano no canteiro; o livro **não** vira receita nem «democracia verde» protocolar.  
5. **Limite clínico** — sem afiliação canábica inventada; o ensaio não é ficha de *Cannabis sativa*.

| Tese Mancuso | Sala BudGanja |
|--------------|----------------|
| Rede sem cérebro | [simbiose](${simbiose}) · [planta](${planta}) |
| Crédito ao verde | [Plantas](${plantas}) · [respeito](${respeito}) |
| Competição / daninha | [Horizonte Geográfico](${hg}) · [daninha](${daninha}) · [cultivo](${cultivo}) |
| [Gesto](${gesto}) de ler | [caminho](${caminho}) — inspecionar, não idolatrar |

## 3. Hipóteses e método

**H1:** a âncora é **este volume** (2017/2019), não a carreira inteira nem *Verde brillante* (2013).  
**H2:** «inteligência» no livro = capacidade de **resolver problemas** em organismo modular — definição de trabalho do autor, não neurónio escondido.  
**H3:** a maioria dos botânicos **rejeita** consciência vegetal ao modo animal (ex.: [Taiz et al., 2019](${taiz})); o lab regista o **debate**, não escolhe igreja.  
**H4:** Revolução Verde agrícola é **corte** — pacote do século XX, outro étimo.  
**H5:** relação com o projecto = [respeito](${respeito}) + hub de plantas + contraste com a [guerra do canteiro](${hg}).

Passos: (1) bibliografia; (2) teses do ensaio; (3) limites científicos; (4) cruzamento lab; (5) poema; (6) status.

## 4. Teses do ensaio (sem copiar o miolo)

| Tese | Leitura no lab |
|------|----------------|
| As plantas chegaram primeiro e **inventaram** o futuro (fotossíntese, carbono, colonização) | Crédito histórico ao vivo vegetal — [planta](${planta}) |
| Arquitectura **modular / distribuída**, sem órgão-comando | Rede; [simbiose](${simbiose}); **≠** cérebro no caule |
| Aprendizagem, memória, comunicação (sinais químicos, raízes) | Divulgação; inspecionar metáfora × evidência |
| Biomimética (plantóide, estufa flutuante, cidades) | Horizonte técnico — **não** protocolo BudGanja |
| «Democracias verdes» (decisão sem centro) | Figura; **não** manual político |

Livros irmãos (não esta âncora): *Verde brillante* (2013, com Alessandra Viola) · *A incrível viagem das plantas* · *A nação das plantas*. Palestra TED 2010 ([raízes da inteligência vegetal](${TED})) = eco, não génese do volume 2017.

## 5. O que parece × o que é

| Parece | É |
|--------|---|
| As plantas «têm cérebro» | O autor fala de *cervello diffuso* — metáfora de rede; **sem** encéfalo animal |
| Consenso científico | Programa de investigação **discutido**; consciência vegetal é rejeitada por muitos pares |
| Revolução Verde | Outro objecto (melhoramento agronómico do séc. XX) |
| Guerra entre plantas | [Ficha HG](${hg}) — competição no mapa/canteiro |
| Manual de cultivo / herbicida | **Não** — ensaio; [cultivo](${cultivo}) e [daninha](${daninha}) noutros sítios |
| Ficha Pessoas | Crédito ao autor; âncora = **livro** |

## 6. Limites

- Não reproduzir capítulos, fotos nem o PDF-trecho da Ubu.  
- Não protocolar «inteligência vegetal» como facto clínico ou conselho agronómico.  
- Não romantizar consciência; [Taiz et al.](${taiz}) fica à vista.  
- Sem transformar o lab em sucursal do LINV.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Artes — **A revolução das plantas** = o ensaio da **rede** que o projecto cruza com [Plantas](${plantas}) e [simbiose](${simbiose}), sem neurónio fingido. A **guerra** do canteiro fica em [Horizonte Geográfico](${hg}). Fecho: [Valeu !!!](${mantra}) **com o crédito ao verde**, sem igreja nem receita.

[▶ Artes](${hub}) · [▶ Plantas](${plantas}) · [▶ Simbiose](${simbiose}) · [▶ HG](${hg}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **«[A revolução das plantas](${self})»** — Stefano Mancuso’s *Plant Revolution* (Giunti **2017**; Ubu BR **2019**; EN *The Revolutionary Genius of Plants*, Atria **2018**). Field: *livro do Mancuso*.

> Independent audit. [Wikipedia · Mancuso](${WIKI}). **Not** a reprint. Sister magazine: [Horizonte Geográfico](${hg}) (plant war = other room).

## Object

| Field | Value |
|-------|-------|
| Book | **Plant Revolution** / *Revolução das plantas* |
| Author | Stefano Mancuso (b. 1965) — credit, not a Pessoas sheet |
| Lab | [Plantas](${plantas}) · [simbiose](${simbiose}) · [respeito](${respeito}) |
| Not | Green Revolution · a brain in the stem · herbicide guide |
| Date | ${inspected} |

**H1:** this volume first.  
**H2:** “intelligence” = problem-solving in a modular body.  
**H3:** plant consciousness is **debated** ([Taiz et al., 2019](${taiz})).

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** network, not barracks. [Valeu !!!](${mantra})

[▶ Arts](${hub}) · [▶ Plants](${plantas}) · [▶ HG](${hg}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **«[A revolução das plantas](${self})»** — *Plant Revolution* de Stefano Mancuso (Giunti **2017**; Ubu BR **2019**; EN Atria **2018**). Pedido: *livro do Mancuso*.

> Auditoría independiente. [Wikipedia · Mancuso](${WIKI}). **No** es reimpresión. Revista hermana: [Horizonte Geográfico](${hg}).

## Objeto

| Campo | Valor |
|-------|-------|
| Libro | **Plant Revolution** / *Revolução das plantas* |
| Autor | Stefano Mancuso (n. 1965) — crédito, no ficha Pessoas |
| Lab | [Plantas](${plantas}) · [simbiose](${simbiose}) · [respeito](${respeito}) |
| No es | Revolución Verde · cerebro en el tallo · manual de herbicida |
| Fecha | ${inspected} |

**H1:** este volumen primero.  
**H2:** «inteligencia» = resolver problemas en un cuerpo modular.  
**H3:** la conciencia vegetal está **en debate**.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** red, no cuartel. [¡Valeu !!!](${mantra})

[▶ Artes](${hub}) · [▶ Plantas](${plantas}) · [▶ HG](${hg}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildRevolucaoDasPlantasPost() {
  const { body, contentEn, contentEs, wiki } = buildRevolucaoDasPlantasBodies();
  return artePost({
    title: 'Inspeção: A revolução das plantas — Mancuso, a rede sem cérebro',
    titleEn: 'Inspection: The Revolutionary Genius of Plants — Mancuso’s network without a brain',
    titleEs: 'Inspección: La revolución de las plantas — Mancuso, la red sin cerebro',
    excerpt:
      'Artes: livro Revolução das plantas (Mancuso, 2017/Ubu 2019); rede modular; ≠ Revolução Verde ≠ guerra do canteiro (HG); Valeu !!!',
    excerptEn:
      'Arts: Plant Revolution (Mancuso, 2017/Ubu 2019); modular network; ≠ Green Revolution ≠ plant-war (HG); Valeu !!!',
    excerptEs:
      'Artes: Revolução das plantas (Mancuso, 2017/Ubu 2019); red modular; ≠ Revolución Verde ≠ guerra del cantero (HG); ¡Valeu !!!',
    slug: 'inspecao-arte-revolucao-das-plantas',
    date: '2026-08-23T15:20:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-revolucao-das-plantas', 1),
    seriesLabel: 'Revolução das plantas · Mancuso',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildRevolucaoDasPlantasPost, buildRevolucaoDasPlantasBodies };
