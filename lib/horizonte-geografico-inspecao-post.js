'use strict';

/**
 * Inspeção Artes · revista Horizonte Geográfico
 * Pedido de campo: Orizonte Geografico + relação com o projecto +
 * revolução das plantas / guerra entre plantas + poema.
 * Distinta de National Geographic e do livro de Mancuso.
 */

const fs = require('fs');
const path = require('path');
const { artePost } = require('./artes-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/horizonte-geografico-cover.jpg';
const WIKI_ED = 'https://pt.wikipedia.org/wiki/Editora_Horizonte';
const WIKI_AMYR = 'https://pt.wikipedia.org/wiki/Amyr_Klink';
const QUEM = 'https://edhorizonte.com.br/quem-somos/';
const PUB = 'https://edhorizonte.com.br/publicacoes/';

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
  return `A linha do horizonte não é o fim.
É o sítio onde a planta ainda disputa a luz.

Revolução: o verde chegou primeiro.
Guerra: raiz contra raiz, sem bandeira.

A revista nomeou o mapa.
O laboratório nomeia a planta.
Amyr estava no conselho.
Orizonte é a boca a comer o H.

Valeu !!!
com o dossel em marcha,
sem transformar o canteiro em quartel.`;
}

function poemEn() {
  return `The horizon line is not the end.
It is where the plant still contests the light.

Revolution: the green arrived first.
War: root against root, with no flag.

The magazine named the map.
The lab names the plant.
Amyr sat on the board.
Orizonte is the mouth eating the H.

Valeu !!!
with the canopy in gear,
without turning the bed into a barracks.`;
}

function poemEs() {
  return `La línea del horizonte no es el fin.
Es el sitio donde la planta aún disputa la luz.

Revolución: el verde llegó primero.
Guerra: raíz contra raíz, sin bandera.

La revista nombró el mapa.
El laboratorio nombra la planta.
Amyr estaba en el consejo.
Orizonte es la boca comiéndose la H.

¡Valeu !!!
con el dosel en marcha,
sin volver el cantero un cuartel.`;
}

function buildHorizonteGeograficoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-horizonte-geografico.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const canalAmyr = '/posts/post-inspecao-canal-amyrklink.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const daninha = '/posts/post-inspecao-palavra-daninha.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const cultivo = '/cultivo/';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const mancuso = '/posts/post-inspecao-arte-revolucao-das-plantas.html';

  const body = `## Escopo

Inspeção editorial da revista **«[Horizonte Geográfico](${self})»** — publicação brasileira de geografia, biomas e sustentabilidade (**1987–2016**), Editora Horizonte / Audichromo. Pedido de campo: *Orizonte Geografico* (a boca come o **H**) + **relação com o projecto** + teses **revolução das plantas** e **guerra entre plantas** + poema.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Editora Horizonte](${WIKI_ED}), [Quem somos](${QUEM}), [Publicações](${PUB}), [Amyr Klink](${WIKI_AMYR}). **Sem afiliação** com a editora, Peter Milko ou a família Klink. **Ficha ≠ reprodução de reportagens nem PDF da revista.** Não é aula de geografia escolar nem guia de herbicida. O livro [A revolução das plantas](${mancuso}) (Mancuso) tem **ficha própria** — irmã, não âncora desta.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Horizonte Geográfico** (lapso vivo: *Orizonte*) |
| Meio | Revista impressa / digital · circulação nacional |
| Génese | **1987** — conselho: **Amyr Klink**, Fábio Feldmann, Peter Milko, Roberto Falzoni, Roberto Waack |
| Fecho periódico | **2016** (ed. 160 · Anuário de Boas Práticas; distribuição gratuita citada pela editora) |
| Editora | Horizonte Educação e Comunicação (fundada **1981**) |
| Tipo BudGanja | Arte — **revista primeiro**; pessoas no Legado; plantas no hub |
| Elo projecto | [Amyr Klink](${amyr}) · [Tamara](${tamara}) · [mar](${mar}) · [caminho](${caminho}) · [Plantas](${plantas}) |
| Teses de campo | Revolução (mapa/verde primeiro) · **guerra entre plantas** (canteiro) |
| Elo livro (irmã) | [A revolução das plantas](${mancuso}) — Mancuso; **não** fundir com esta revista |
| O que **não** é | *National Geographic* · Revolução Verde (Borlaug) · guerra humana |
| Fonte | [Editora Horizonte (WP)](${WIKI_ED}) · [edhorizonte](${QUEM}) |
| Data | ${inspected} |

**Objecto:** a revista que pôs o **mapa do Brasil** em papel de bancada — e, no lab, o sítio onde o horizonte da travessia Klink encontra o catálogo de [plantas](${plantas}).

## 2. Relação com o projecto

O Inspetor BudGanja não inspeciona a HG por nostalgia de banca. Inspeciona porque o **mesmo ofício de partida** já está no Legado:

1. **Amyr no conselho de 1987** — [Wikipédia Amyr](${WIKI_AMYR}) regista-o como sócio fundador da Revista Horizonte; a ficha [Amyr Klink](${amyr}) (Cap. 7) ganha esta sala editorial, distinta do [canal](${canalAmyr}).  
2. **Horizonte lexical** — a palavra *horizonte* já vive em [mar](${mar}) (oceano da travessia) e em [caminho](${caminho}) / [passar](${passar}) (Tamara). **Não fundir:** a linha do olhar ≠ o título da revista. *Orizonte* é orelha, não outra publicação.  
3. **Plantas no mapa** — a HG olhou biomas, rios, capim, Amazónia. O lab nomeia a [planta](${planta}) espécie a espécie em [Plantas](${plantas}) e o [cultivo](${cultivo}) como ofício. A revista **não substitui** as fichas; **abre o horizonte** onde elas se vêem juntas.  
4. **Limite ético** — crédito a Amyr e à redacção; sem transformar o projecto em assessoria da editora nem em aula patrocinada.

| Sala HG | Sala BudGanja |
|---------|----------------|
| Conselho / sócio fundador | [Amyr](${amyr}) · [canal](${canalAmyr}) |
| Travessia / linha do mar | [Tamara](${tamara}) · [mar](${mar}) · [caminho](${caminho}) |
| Biomas e flora | [Plantas](${plantas}) · [planta](${planta}) · [selvagem](${selvagem}) |
| Conflito no canteiro | [daninha](${daninha}) · [cultivo](${cultivo}) · [simbiose](${simbiose}) |
| Livro-irmã (rede, não guerra) | [A revolução das plantas](${mancuso}) |

## 3. Hipóteses e método

**H1:** a âncora é a **revista** (1987–2016), não a consultoria de sustentabilidade posterior.  
**H2:** *Orizonte Geografico* = mesma obra; grafia canónica **Horizonte Geográfico**.  
**H3:** a **relação com o projecto** passa por Amyr + léxico de horizonte + hub de plantas — não por cannabis clínica.  
**H4:** nesta revista, **revolução das plantas** = o verde chegou primeiro no **mapa**; o ensaio de Mancuso vive em [A revolução das plantas](${mancuso}) — **≠** Revolução Verde agrícola.  
**H5:** **guerra entre plantas** = disputa de luz, água, solo e química (alelopatia como **nome**, não receita); **≠** guerra humana, **≠** manual de herbicida.

Passos: (1) fixar génese e conselho; (2) cruzar Amyr/Tamara/mar; (3) ler revolução × guerra no canteiro; (4) poema; (5) status.

## 4. Revolução das plantas

Antes de haver revista, já havia [planta](${planta}). A «revolução» desta ficha **não** é motim nem pacote de sementes milagrosas:

| Parece | É nesta ficha |
|--------|----------------|
| [A revolução das plantas](${mancuso}) (Mancuso / Ubu 2019) | **Ficha irmã** — rede sem centro; aqui a revista é o mapa |
| Revolução Verde (século XX) | **Corte** — pacote agronómico; não é a HG |
| As plantas «ganharam o planeta» | Tese de ofício: clorofila, raiz, tempo — crédito ao vivo vegetal |
| O lab «revoluciona» a flora | Não: o lab **inspeciona** e dá [respeito](${respeito}) à espécie |

No BudGanja a revolução lê-se no hub [Plantas](${plantas}): cada ficha é um crédito, não um troféu. A HG ensinou a **ver o mapa**; o lab ensina a **não apagar o nome da planta**.

## 5. Guerra entre plantas

A guerra aqui **não tem exército**. Tem dossel, sombra, sede e vizinho.

| Camada | Leitura | No lab |
|--------|---------|--------|
| **Luz / água / solo** | Competição por recurso | [Cultivo](${cultivo}) — o canteiro é campo, não quartel |
| **Alelopatia** | Química que inibe ou estimula a vizinha | **Nome** da interacção; **não** protocolo |
| **Daninha** | Juízo humano sobre a concorrente | [Daninha](${daninha}) — o dano é relativo ao plano |
| **Selvagem** | Da mata, não «inimiga» | [Selvagem](${selvagem}) — pode ser aliada |
| **Simbiose** | O outro lado da guerra | [Simbiose](${simbiose}) — nem tudo é disputa |
| **Guerra humana** | Metáfora militar | **Corte** — [risco](${risco}) de romantizar violência |

**H6:** chamar *guerra* sem [verdade](${verdade}) vira desenho animado de vilões verdes. A planta não odeia; **ocupa**. O [gesto](${gesto}) do cultivador decide o sítio — com [respeito](${respeito}), não com ódio à [daninha](${daninha}).

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| National Geographic Brasil | Outra marca; Amyr também aconselhou NG — **não** esta âncora |
| Revista ainda nas bancas | Periódico **encerrou 2016**; a editora segue noutros formatos |
| Manual de geografia | Divulgação com imagens; ficha ≠ caderno escolar |
| Guerra de humanos disfarçada de flora | Disputa **entre plantas**; humanos entram como juízes do canteiro |
| Endosso à editora | Crédito histórico; auditoria independente |

## 7. Limites

- Não reproduzir artigos, fotos nem PDFs da HG.  
- Não ensinar a «vencer» plantas nem a formular aleloquímicos.  
- Não fundir [Mancuso](${mancuso}), Revolução Verde e esta revista.  
- Sem afiliação canábica inventada: a HG não é ficha clínica.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Artes — **Horizonte Geográfico** = o mapa onde o projecto encontra Amyr, o [mar](${mar}) e a [planta](${planta}). Guerra = raiz contra raiz, sem quartel. O ensaio da rede verde: [A revolução das plantas](${mancuso}). Fecho: [Valeu !!!](${mantra}) **com o horizonte à vista**, sem comer o H nem o nome da espécie.

[▶ Artes](${hub}) · [▶ Amyr](${amyr}) · [▶ Mancuso](${mancuso}) · [▶ Plantas](${plantas}) · [▶ Daninha](${daninha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian magazine **«[Horizonte Geográfico](${self})»** (1987–2016). Field slip: *Orizonte Geografico*. Project link: [Amyr Klink](${amyr}) on the 1987 board. Plant theses: map-first green + **war among plants** (light, water, soil). Sister book: [A revolução das plantas](${mancuso}).

> Independent audit. Sources: [Wikipedia · Editora Horizonte](${WIKI_ED}). **Not** a reprint of the magazine.

## Object

| Field | Value |
|-------|-------|
| Work | **Horizonte Geográfico** |
| Board 1987 | Amyr Klink · Feldmann · Milko · Falzoni · Waack |
| Lab | [Amyr](${amyr}) · [mar](${mar}) · [Plantas](${plantas}) · [daninha](${daninha}) |
| Date | ${inspected} |

**H1:** magazine first.  
**H2:** *Orizonte* = same title, missing H.  
**H3:** plant war is competition, not barracks.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** map + plant credit. [Valeu !!!](${mantra})

[▶ Arts](${hub}) · [▶ Amyr](${amyr}) · [▶ Plants](${plantas}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de la revista brasileña **«[Horizonte Geográfico](${self})»** (1987–2016). Lapso: *Orizonte Geografico*. Vínculo con el proyecto: [Amyr Klink](${amyr}) en el consejo de 1987. Tesis: **revolución de las plantas** (el verde llegó primero; ≠ libro de Mancuso como âncora) y **guerra entre plantas** (luz, agua, suelo; ≠ guerra humana).

> Auditoría independiente. Fuentes: [Wikipedia · Editora Horizonte](${WIKI_ED}). **No** es reimpresión de la revista.

## Objeto

| Campo | Valor |
|-------|-------|
| Obra | **Horizonte Geográfico** |
| Consejo 1987 | Amyr Klink · Feldmann · Milko · Falzoni · Waack |
| Lab | [Amyr](${amyr}) · [mar](${mar}) · [Plantas](${plantas}) · [daninha](${daninha}) |
| Fecha | ${inspected} |

**H1:** la revista primero.  
**H2:** *Orizonte* = el mismo título.  
**H3:** la guerra vegetal es competencia, no cuartel.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** mapa + crédito a la planta. [¡Valeu !!!](${mantra})

[▶ Artes](${hub}) · [▶ Amyr](${amyr}) · [▶ Plantas](${plantas}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI_ED };
}

function buildHorizonteGeograficoPost() {
  const { body, contentEn, contentEs, wiki } = buildHorizonteGeograficoBodies();
  return artePost({
    title: 'Inspeção: Horizonte Geográfico — o mapa, a planta, o conselho de Amyr',
    titleEn: 'Inspection: Horizonte Geográfico — the map, the plant, Amyr’s board',
    titleEs: 'Inspección: Horizonte Geográfico — el mapa, la planta, el consejo de Amyr',
    excerpt:
      'Artes: revista Horizonte Geográfico (1987–2016); Amyr no conselho; guerra entre plantas; Orizonte = o H; Mancuso = ficha irmã; Valeu !!!',
    excerptEn:
      'Arts: Horizonte Geográfico magazine (1987–2016); Amyr on the board; plant war; Orizonte = dropped H; Mancuso = sister sheet; Valeu !!!',
    excerptEs:
      'Artes: revista Horizonte Geográfico (1987–2016); Amyr en el consejo; guerra entre plantas; Orizonte = la H; Mancuso = ficha hermana; ¡Valeu !!!',
    slug: 'inspecao-arte-horizonte-geografico',
    date: '2026-08-23T15:10:00.000Z',
    seriesOrder: pickOrder('inspecao-arte-horizonte-geografico', 1),
    seriesLabel: 'Horizonte Geográfico · revista',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildHorizonteGeograficoPost, buildHorizonteGeograficoBodies };
