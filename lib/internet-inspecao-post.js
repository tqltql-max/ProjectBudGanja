'use strict';

/**
 * Inspeção Palavras · Internet
 * EN inter- + net (internetwork) — a rede das redes.
 * Pedido: inspeçao da palavra Intenet (lapso: cai o r).
 * Corta: WWW · discada · login · intranet · interne (estágio).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/internet-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/Internet';
const WIKT_EN = 'https://en.wiktionary.org/wiki/Internet';
const WIKI = 'https://pt.wikipedia.org/wiki/Internet';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Internet';
const WIKI_WWW = 'https://pt.wikipedia.org/wiki/World_Wide_Web';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Internet.
Não é Intenet.

A boca come o r
de inter-.
O étimo devolve:
entre redes.

Não é a discada.
Não é o login.
Não é a teia WWW.
É o mapa no meio.

Valeu !!!
o cano é meio;
a Internet é o entre.`;
}

function poemEn() {
  return `Internet.
Not Intenet.

The mouth drops the r
of inter-.
The etymon gives it back:
between networks.

Not dial-up.
Not the login.
Not the WWW web.
It is the map in the middle.

Valeu !!!
the pipe is a medium;
the Internet is the between.`;
}

function poemEs() {
  return `Internet.
No es Intenet.

La boca se come la r
de inter-.
El étimo la devuelve:
entre redes.

No es la discada.
No es el login.
No es la telaraña WWW.
Es el mapa en el medio.

¡Valeu !!!
el caño es medio;
la Internet es el entre.`;
}

function buildInternetBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-internet.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const tecnologia = '/posts/post-inspecao-palavra-tecnologia.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const techHub = '/tecnologia/';

  const body = `## Escopo

Inspeção editorial da palavra **[Internet](${self})** — a **rede das redes**. Pedido de campo: *inspeçao da palavra Intenet*. [A orelha cola](${orelhaCola}) **Intenet** (cai o *r* de *inter-*). O [étimo](${etimo}) **corta** e devolve a âncora: EN *inter-* + *net* ← *internetwork*. A [palavra](${palavra}) nomeia o **entre**; não o [login](${login}), não a [discada](${discada}), não a teia [WWW](${WIKI_WWW}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário PT](${WIKT}), [EN](${WIKT_EN}), [Wikipédia PT](${WIKI}), [EN](${WIKI_EN}). Método: [etimologia](${etimologia}) · [língua portuguesa](${lingua}). **Ficha ≠ manual de provedor, ≠ aula de protocolo, ≠ guia de acesso não autorizado.** Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Intenet* / *Internete* / *a net* / *Internet* → lema **Internet**. Meio que disca → [internet discada](${discada}). Porta de sessão → [login](${login}). Acto de ligar → [conexão](${conexao}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Internet** (substantivo; em PT também *a internet*) |
| Pedido de campo | **Intenet** — lapso: falta o *r* de *inter-* |
| Classe | Nome próprio técnico / substantivo feminino no PT (*a Internet*) |
| Étimo (trabalho) | EN *Internet* ← *internetwork* (*inter-* «entre» + *net* «rede») — confiança: **alta** |
| Tipo BudGanja | Palavra — empréstimo EN × lapso × corte WWW/meio/porta |
| Não é | [WWW](${WIKI_WWW}) · [internet discada](${discada}) · [DSL](${dsl}) · [login](${login}) · intranet · *interne* (estágio) |
| Elo cano | [conexão](${conexao}) · [ligar / desligar](${ligar}) · [node](${node}) · [link](${link}) |
| Elo página | [homepage](${homepage}) — a casa **na** teia, não a rede |
| Fonte | [Internet](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome da **internetwork** — redes que se falam **entre** si. No laboratório: fichar o vocábulo. Os meios ([discada](${discada}), [DSL](${dsl}), fibra, móvel) são **canos**. O [login](${login}) é a **porta**. A WWW é a **teia de páginas** que corre **em cima**.

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Intenet** | Outra palavra / «interne» + t | Lapso de **Internet** — cai o *r* (como [abacadabra](${abracadabra}) cai o *r* da fórmula) |
| **Internete** | Plural / «mais internet» | Oral BR — ainda o mesmo lema |
| **a net** | A rede inteira num recorte | Clipping de *Internet* / *network* |
| **WWW / web** | Sinónimo da Internet | [World Wide Web](${WIKI_WWW}) — serviço de **páginas** sobre a rede |
| **[internet discada](${discada})** | «A Internet antiga» | Um **meio** (discar a linha), não o mapa |
| **[login](${login})** | Entrar = a rede | Porta de sessão — depois do cano |
| **intranet** | A mesma Internet por dentro | Rede **privada** — *intra-* ≠ *inter-* |
| **interne** / internato | A mesma boca | Lat. *internus* «de dentro» — estágio / internato, **não** a rede |

**H-lapso:** *Intenet* = *Internet* em trânsito. O lab **não** repreende a boca; ancora o *r*.  
**H-teia:** WWW ≠ Internet. Podes ter Internet sem abrir a teia; a teia não existe sem a rede por baixo.  
**H-meio:** [discada](${discada}) e [DSL](${dsl}) são **como** se chega; Internet é **o quê** se alcança.  
**H-intra:** *inter-* = entre (redes públicas que se falam); *intra-* = dentro (rede da casa / da firma).

## 3. Duas peças — inter- + net

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **inter-** | Lat. *inter* «entre, no meio» | Alta |
| **net** | EN *net* / *network* — malha, rede | Alta |
| **internetwork** | Composto EN (anos 1970) — redes interligadas | Alta |
| **Internet** | Recorte do composto; nome da internetwork global | Alta |
| **ARPANET** | Precursor histórico — **não** é o lema desta ficha | Alta (separar) |

**Veredicto etimológico:** *Internet* não desce de um verbo português. É empréstimo inglês cuja primeira peça é latina (*inter*). O *r* que *Intenet* perde é o *r* de **entre**.

## 4. Salas que não fundir

| Sala | O que é | Ficha |
|------|---------|-------|
| **A. Vocábulo** | A rede das redes | **Esta** |
| **B. Meio** | Como a sessão chega (telefone, cobre, fibra, rádio) | [discada](${discada}) · [DSL](${dsl}) |
| **C. Acto** | Ligar um ponto a outro | [conexão](${conexao}) · [ligar](${ligar}) |
| **D. Porta** | Entrar na sessão com nome | [login](${login}) |
| **E. Teia** | Páginas e hiperligações | [WWW](${WIKI_WWW}) · [homepage](${homepage}) · [link](${link}) |
| **F. Nó** | Ponto de junção | [node](${node}) |

A [relação](${relacao}) pede o **entre**: Internet é o mapa; o resto são peças. Sem tutorial de burlar porta nem de «cair o servidor» como receita.

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Ancorar **Internet**; ler *Intenet* como lapso |
| Bom | Cortar WWW × rede × meio × [login](${login}) |
| Bom | Mandar a linha que disca para [internet discada](${discada}) |
| Mau | Fundir a teia com a rede («Internet = Google / WWW») |
| Mau | Transformar a ficha em manual de acesso, invasão ou bypass |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=internet)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [internet discada](${discada}) | O **meio** que telefona |
| [DSL](${dsl}) | O cano digital no cobre |
| [conexão](${conexao}) · [ligar / desligar](${ligar}) | O acto |
| [login](${login}) | A porta |
| [homepage](${homepage}) · [link](${link}) | Casa e elo **na teia** |
| [node](${node}) | O nó — não a malha inteira |
| [tecnologia](${tecnologia}) · hub [Tecnologia](${techHub}) | Catálogo de ofício |
| [restore](${restore}) | Quando a sessão volta — sem receita de queda |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a ligar o modem nem a furar a porta.  
- Não é história completa da ARPANET.  
- Não funde WWW, intranet e Internet.

## Status

**Aprovado na série Palavras** — *Internet* ← *inter-* + *net*; *Intenet* = lapso (cai o *r*); WWW / discada / login noutras salas. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Internet discada](${discada}) · [▶ Login](${login}) · [▶ Conexão](${conexao}) · [▶ DSL](${dsl}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The word **Internet** — the **network of networks**. Field request: inspect *Intenet* (the *r* of *inter-* drops). Etymon: EN *inter-* + *net* ← *internetwork*. Not the [WWW](${WIKI_WWW}). Not [dial-up](${discada}). Not the [login](${login}) door.

> [Wiktionary](${WIKT_EN}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *Internet* filed; *Intenet* = slip; web / medium / door in other rooms. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

La palabra **Internet** — la **red de redes**. Pedido: inspeccionar *Intenet* (cae la *r* de *inter-*). Étimo: EN *inter-* + *net* ← *internetwork*. No es la [WWW](${WIKI_WWW}). No es la [discada](${discada}). No es el [login](${login}).

> [Wikcionario](${WIKT}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *Internet* fichada; *Intenet* = lapsus; teia / medio / puerta en otras salas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildInternetPost() {
  const { body, contentEn, contentEs } = buildInternetBodies();
  return makePalavra({
    title: 'Inspeção: Internet — inter- + net; o lapso Intenet',
    titleEn: 'Inspection: Internet — inter- + net; the slip Intenet',
    titleEs: 'Inspección: Internet — inter- + net; el lapsus Intenet',
    excerpt:
      'Palavras: Internet ← inter- + net; Intenet = lapso (cai o r); ≠ WWW ≠ discada ≠ login; Valeu !!!',
    excerptEn:
      'Words: Internet ← inter- + net; Intenet = slip (drops the r); ≠ WWW ≠ dial-up ≠ login; Valeu !!!',
    excerptEs:
      'Palabras: Internet ← inter- + net; Intenet = lapsus (cae la r); ≠ WWW ≠ discada ≠ login; ¡Valeu !!!',
    slug: 'inspecao-palavra-internet',
    date: '2026-08-26T12:50:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-internet', 366),
    seriesLabel: 'Internet · inter- + net',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInternetPost,
  buildInternetBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
