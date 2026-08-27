'use strict';

/**
 * Inspeção Palavras · cortar
 * Eixos: lat. curtāre ← curtus · o étimo corta ·
 * ≠ colar ≠ copiar ≠ caedere (tesoura / -cídio) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cortar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cortar';
const WIKT_CORTE = 'https://pt.wiktionary.org/wiki/corte';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/curtare#Latin';
const WIKT_CURTUS = 'https://en.wiktionary.org/wiki/curtus#Latin';
const WIKT_CAEDERE = 'https://en.wiktionary.org/wiki/caedo#Latin';
const WIKT_TESOURA = 'https://pt.wiktionary.org/wiki/tesoura';
const WIKT_COLAR = 'https://pt.wiktionary.org/wiki/colar';
const WIKT_COPIAR = 'https://pt.wiktionary.org/wiki/copiar';

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

function buildCortarBodies() {
  const inspected = '2026-08-27';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-cortar.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const partir = '/posts/post-inspecao-palavra-partir.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const oficio = '/posts/post-inspecao-palavra-oficio.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const pessoas = '/posts/post-inspecao-palavra-pessoas.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const linhaCerol = '/posts/post-inspecao-palavra-linha-10-cerol.html';

  const body = `## Escopo

Inspeção editorial da palavra **[cortar](${self})**. Pedido de campo: *INPEÇAO NA PALABRA cortar*.

[A orelha cola](${orelhaCola}) *cortar* em tudo o que parte, fende, tesoura, mata, desliga. O [étimo](${etimo}) **corta**: **cortar** vem de lat. *curtāre* («encurtar») ← *curtus* («curto, aparado»). **Tesoura** e **-cídio** vêm de outra raiz (*caedere*). **Colar** é o gesto inverso. Um laboratório.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cortar](${WIKT}), [corte](${WIKT_CORTE}), lat. [*curtāre*](${WIKT_LAT}) / [*curtus*](${WIKT_CURTUS}), [*caedere*](${WIKT_CAEDERE}), [tesoura](${WIKT_TESOURA}), [colar](${WIKT_COLAR}), [copiar](${WIKT_COPIAR}). **Ficha ≠ manual de violência, ≠ receita de linha cortante, ≠ protocolo de poda ilícita.** Sem afiliação editorial. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *cortar* / *corte* / *cortante* / *cut* / *cortar a palavra* → lema **cortar**. *tesoura* / *incisão* / *-cídio* nesta ficha = **cortes**, não o lema.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cortar** |
| Classe | Verbo |
| Ofício | **Separar encurtando** — o gesto que tira comprimento, ligação ou sentido a mais |
| Étimo | lat. *curtāre* «encurtar, aparar» ← *curtus* «curto, cortado, aparado» — confiança: **alta** |
| Nome | **corte** · adj. **cortante** · agente **cortador** |
| Família | *recortar* · *curto* · ing. *curt* / *curtail* |
| Não é | [colar](${cola}) (grude / Ctrl+V) · *copiar* (Ctrl+C) · *caedere* (tesoura / -cídio) · [partir](${partir}) (ir embora / fender outro étimo) |
| Elo método | [étimo](${etimo}) · [orelha cola](${orelhaCola}) · [verdade](${verdade}) |
| Elo mapa | [cola](${cola}) · [conexão](${conexao}) · [relação](${relacao}) · [ligar × desligar](${ligar}) |
| Elo projecto | [gesto](${gesto}) · [ofício](${oficio}) · [língua](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · cortar](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o verbo que nomeia o **gesto de encurtar / separar**. No laboratório, é também o **método**: o étimo corta o que a orelha colou. Não é tesoura. Não é crime. Não é o botão Colar.

## 2. Hipóteses e método

**H1:** *cortar* < lat. *curtāre* < *curtus* — **encurtar**, não «matar» (alta).  
**H2:** a orelha cola *cortar* em *tesoura*, *incisão*, *genocídio* — família de *caedere*; o étimo **corta** as salas.  
**H3:** no teclado, **cortar / copiar / colar** são três gestos; no lab, **colar** e **cortar** são o par do ofício.  
**H4:** [desligar](${ligar}) corta um fluxo; o [interruptor](${interruptor}) é a peça; *cortar* é o verbo-mãe do corte, não do circuito.  
**H5:** [Valeu !!!](${mantra}) = nomear o corte certo, na ficha certa.

Passos: (1) étimo *curtāre*; (2) corte *caedere*; (3) tríade teclado; (4) camadas vivas; (5) método do lab; (6) limites.

## 3. Duas raízes que a orelha cola

| Palavra | Étimo | Ofício | Corte |
|---------|-------|--------|-------|
| **[cortar](${self})** | *curtāre* / *curtus* «curto» | Encurtar / separar | Esta âncora |
| **corte** | Nome do gesto | O resultado; também recinto, tribunal, corte de cabelo | Mesma família — nome, não lema-verbo |
| **curto** | *curtus* | O que já é pequeno | Irmão; não é o gesto |
| **tesoura** | lat. *cisoria* ← *caedere* «cortar / abater» | Ferramenta | [Wikcionário](${WIKT_TESOURA}) — **outra raiz** |
| **incisão** | *incidere* ← *caedere* | Corte médico / linha | Outra raiz |
| **-cídio** | *-cīdium* ← *caedere* | Matar um tipo (homicídio…) | Outra raiz — **não** esta ficha |
| **[partir](${partir})** | *partīre* / *partīri* «dividir; ir» | Ir embora · fender | Ficha irmã — **não** é *curtāre* |

**Anti-armadilha:** fundir *cortar* com *tesoura* e *-cídio* num só sopro. A orelha cola o ofício «fazer dois de um»; o étimo corta *curtus* (curto) de *caedere* (abater).

## 4. Cortar × colar × copiar — a tríade da mesa

No computador e no caderno, três [gestos](${gesto}):

| Gesto | Tecla | Ofício | Ficha |
|-------|-------|--------|-------|
| **cortar** | Ctrl+X | Tirar daqui e pôr na memória | Esta |
| **copiar** | Ctrl+C | Deixar aqui e pôr na memória | Nomeada — sem ficha-lema |
| **[colar](${cola})** | Ctrl+V | Pegar o que estava na memória | Grude · outra âncora |

No laboratório o par **não** é teclado: **a orelha [cola](${cola})**; o [étimo](${etimo}) **corta**. Colar junta o que a boca pôs no mesmo sopro. Cortar **separa as salas**. Copiar é o meio — repetir sem decidir.

Bom uso: «a orelha cola *ficção* em *fiação*; o étimo corta».  
Mau uso: colar dois étimos e chamar-lhe «a mesma palavra».

## 5. Camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Físico** | Tesoura, faca, tesoura de poda — o gesto na matéria | Alta (tipo; ferramenta ≠ lema) |
| **Método** | O étimo corta o que a orelha colou | Alta — ofício desta casa |
| **Sentido** | Cortar um sentido, um capítulo, uma palavra a mais | Alta |
| **Circuito** | [Desligar](${ligar}) / [interruptor](${interruptor}) — cortar o fluxo | Alta no mapa; o lema do circuito é o par ligar × desligar |
| **Vínculo** | Cortar relações · cortar conversa | Alta no uso BR |
| **Caminho** | Cortar caminho = atalho | Alta |
| **Planta** | Poda / estaca — [planta](${planta}) encurta para viver | Média — **nomear**; ≠ manual de cultivo ilícito |
| **Linha** | Linha cortante / cerol — [P de Perigo](${linhaCerol}) | Alta no mapa — **literacia, ≠ receita** |
| **≠ violência** | Ficha não ensina a ferir [pessoas](${pessoas}) | Alta — limite |

## 6. O corte do laboratório

A frase de ofício já vive na casa: **a orelha cola, o étimo corta.**

| Peça | Ofício |
|------|--------|
| **Boca** | Junta dois objectos num sopro |
| **Orelha** | [Cola](${cola}) — mesmo o «não» ainda pega |
| **Étimo** | **Corta** — devolve cada palavra à sua sala |
| **[Conexão](${conexao})** | Liga com **x**; não é corte |
| **[Relação](${relacao})** | O **entre** — relacionar **sem fundir** |

Cortar, aqui, é **carinho de método**: não deixar a cola virar origem. Sem forçar flor. Sem forçar étimo.

## Limites

- Não é tutorial de corte físico nem de arma.  
- *Tesoura*, *incisão* e *-cídio* ficam **nomeados** — não abrem ficha-lema nesta página.  
- Linha cortante / cerol: ver [cola](${cola}) e [linha 10](${linhaCerol}) — **P de Perigo**, sem receita.  
- Poda vegetal: nome do gesto; **não** é guia de cultivo.

## Status

**Aprovado na série Palavras** — **cortar** fichado: *curtāre* / *curtus*; o étimo corta o que a orelha cola; ≠ *caedere* ≠ [colar](${cola}) ≠ *copiar*. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Étimo](${etimo}) · [▶ Cola](${cola}) · [▶ Orelha cola](${orelhaCola}) · [▶ Conexão](${conexao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **cortar** (“to cut / to shorten”) — Lat. *curtāre* ← *curtus* “short, docked”. Field request: *INPEÇAO NA PALABRA cortar*. The ear glues *cortar* to scissors, -cide, unplug. The etymon **cuts**: this verb is *curtus*, not *caedere*. Close: [Valeu !!!](${mantra}).

> Sources: [Wiktionary](${WIKT}), Lat. [*curtare*](${WIKT_LAT}). **Not** a violence how-to. **Not** a cutting-line recipe.

## Object

| Field | Value |
|-------|-------|
| Word | **cortar** |
| Etymon | Lat. *curtāre* ← *curtus* |
| Not | [colar](${cola}) (glue / paste) · copy · *caedere* (scissors / -cide) · [partir](${partir}) |
| Date | ${inspected} |

## Two roots, one “cut”

| Word | Root | Craft |
|------|------|-------|
| **cortar** | *curtus* “short” | Shorten / separate — this sheet |
| **tesoura** | *caedere* | Tool — another root |
| **-cídio** | *caedere* | Killing a kind — another root |

Lab method: the ear [glues](${cola}); the [etymon](${etimo}) **cuts**. Cut / copy / paste are three desk gestures; here **colar** and **cortar** are the craft pair. [Valeu !!!](${mantra}).

## Status

**Approved** — *curtāre*; the etymon cuts what the ear glued; ≠ *caedere* ≠ paste.

[▶ Words](${hub}) · [▶ Etymon](${etimo}) · [▶ Glue](${cola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**cortar** — lat. *curtāre* ← *curtus* «corto, recortado». Pedido: *INPEÇAO NA PALABRA cortar*. El oído pega *cortar* en tijera, -cidio, apagar. El étimo **corta**: este verbo es *curtus*, no *caedere*. Cierre: [¡Valeu !!!](${mantra}).

> Fuentes: [Wikcionario](${WIKT}), lat. [*curtare*](${WIKT_LAT}). **No** es manual de violencia. **No** es receta de línea cortante.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **cortar** |
| Étimo | lat. *curtāre* ← *curtus* |
| No es | [colar](${cola}) (pegamento / pegar) · copiar · *caedere* (tijera / -cidio) · [partir](${partir}) |
| Fecha | ${inspected} |

## Dos raíces, un «corte»

| Palabra | Raíz | Oficio |
|---------|------|--------|
| **cortar** | *curtus* «corto» | Acortar / separar — esta ficha |
| **tesoura** | *caedere* | Herramienta — otra raíz |
| **-cídio** | *caedere* | Matar un tipo — otra raíz |

Método del lab: el oído [pega](${cola}); el [étimo](${etimo}) **corta**. Cortar / copiar / pegar son tres gestos de mesa; aquí **colar** y **cortar** son el par del oficio. [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — *curtāre*; el étimo corta lo que el oído pegó; ≠ *caedere* ≠ pegar.

[▶ Palabras](${hub}) · [▶ Étimo](${etimo}) · [▶ Cola](${cola}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCortarPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCortarBodies();
  const order = seriesOrder || pickOrder('inspecao-palavra-cortar', 369);
  const post = makePalavra({
    title: 'Inspeção: Cortar — o étimo corta (≠ colar ≠ caedere)',
    titleEn: 'Inspection: Cortar — the etymon cuts (≠ glue ≠ caedere)',
    titleEs: 'Inspección: Cortar — el étimo corta (≠ pegar ≠ caedere)',
    excerpt:
      'Palavras: cortar (lat. curtāre / curtus) — o étimo corta o que a orelha cola; ≠ tesoura-caedere ≠ colar ≠ copiar; Valeu !!!',
    excerptEn:
      'Words: cortar (Lat. curtāre / curtus) — the etymon cuts what the ear glued; ≠ scissors-caedere ≠ paste ≠ copy; Valeu !!!',
    excerptEs:
      'Palabras: cortar (lat. curtāre / curtus) — el étimo corta lo que el oído pegó; ≠ tijera-caedere ≠ pegar ≠ copiar; ¡Valeu !!!',
    slug: 'inspecao-palavra-cortar',
    date: '2026-08-27T14:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cortar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = order;
  return post;
}

module.exports = { buildCortarPost, buildCortarBodies };
