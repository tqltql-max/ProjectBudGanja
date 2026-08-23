'use strict';

/**
 * Inspeção Palavras · internet discada
 * Eixos: discar a linha · modem · sessão que ocupa o telefone ·
 * niocenchcadaro (smash) · ≠ DSL / banda larga · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/internet-discada-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Acesso_discado';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Dial-up_Internet_access';
const WIKT_DISCAR = 'https://pt.wiktionary.org/wiki/discar';

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

function poemPt() {
  return `Internet discada.
O telefone vira cano.
A linha canta —
depois, a página chega devagar.

Enquanto navega
ninguém liga.
O cano ocupa a voz.

Niocenchcadaro
é o smash do teclado
rumo à mesma porta:
conexão discada.

Valeu !!!
56k —
o ofício ainda ouve o modem.`;
}

function poemEn() {
  return `Dial-up internet.
The telephone becomes a pipe.
The line sings —
then the page arrives slowly.

While you browse
no one can call.
The pipe occupies the voice.

Niocenchcadaro
is the keyboard smash
toward the same door:
dialed connection.

Valeu !!!
56k —
the craft still hears the modem.`;
}

function poemEs() {
  return `Internet discada.
El teléfono se vuelve caño.
La línea canta —
después la página llega despacio.

Mientras navegas
nadie llama.
El caño ocupa la voz.

Niocenchcadaro
es el smash del teclado
hacia la misma puerta:
conexión discada.

¡Valeu !!!
56k —
el oficio aún oye el módem.`;
}

function buildInternetDiscadaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-internet-discada.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial de **[internet discada](${self})** — o acesso à rede que **disca a linha telefónica** (EN *dial-up*). Pedido de campo no mesmo sopro: *inspeção internet discada, conexão* · *conexão* · *niocenchcadaro* · e a sigla irmã [DSL](${dsl}). Não é história de operadora. Não é ranking de 56k. Objecto = o **nome do meio** (a linha que se chama) e o ofício de **ocupar o telefone para navegar**.

> **Nota metodológica:** auditoria independente. Fontes: [acesso discado](${WIKI}), [dial-up](${WIKI_EN}), [discar](${WIKT_DISCAR}). **Ficha ≠ manual de modem, ≠ nostalgia de marca, ≠ guia de «voltar à discada».** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}).

**Gatilho:** *internet discada* / *acesso discado* / *dial-up* / *conexão discada* / smash **niocenchcadaro**.

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **internet discada** (PT BR) |
| Irmãs | **acesso discado** · EN **dial-up** · oral *a discada* |
| Peças | *internet* (a rede) + *discada* (particípio de [discar](${WIKT_DISCAR}) — chamar um número) |
| Étimo (trabalho) | EN *dial-up* («subir o disco / discar») → calco BR **discada** — confiança: **alta** no calco; o aparelho chama-se *modem* (*modulator-demodulator*) |
| Ofício | Cada sessão **telefona** ao provedor; a linha de voz fica **ocupada** |
| Classe de velocidade (memória) | Ordem dos **kb/s** (56k como teto clássico de consumo) — não é a tese da ficha |
| Tipo BudGanja | Palavra — meio de [conexão](${conexao}) × era do telefone |
| Não é | [DSL](${dsl}) (linha digital sempre no ar) · fibra · 4G · o [login](${login}) (porta, não cano) |
| Smash de campo | **niocenchcadaro** — teclado rumo a *conexão discada* |
| Fonte | [acesso discado](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **cano que se disca**. A [conexão](${conexao}) é o acto; a discada é **como** o acto usa o telefone. O [login](${login}) só entra **depois** do canto do modem.

## Hipóteses e método

**H1:** *internet discada* = calco de *dial-up Internet* — alta.  
**H2:** *discar* aqui é **chamar um número**, não «discar» no sentido de jogar fora.  
**H3:** o meio **ocupa a voz** — enquanto navega, a linha não atende o parente. Esse é o corte cultural BR.  
**H4:** [DSL](${dsl}) é a irmã que **deixa a linha de voz** e fica no ar — outro meio, outro ofício.  
**H5:** **niocenchcadaro** é smash (como [a orelha cola](${orelha})): o lab lê **conexão discada**, não um terceiro país.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **internet discada** | Canónica de campo BR |
| acesso discado | Nome mais técnico / Wikipédia PT |
| *dial-up* | Inglês de manual |
| conexão discada | A [conexão](${conexao}) **neste** meio |
| *a discada* | Oral — o meio inteiro numa palavra |
| **niocenchcadaro** | Smash — apontar o lema, não promover o caos |
| *conecção discada* / *conecxao* | Lapsos de [conexão](${conexao}) (ç / cx) colados ao meio |

**Veredicto de forma:** ficheia-se **internet discada**. O smash *niocenchcadaro* entra como **voz de teclado**, não como grafia nova.

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Internet** | «A net» em abstracto | Um **meio** — discar a linha |
| **Conexão** | Sinónimo de discada | [Conexão](${conexao}) é o acto; discada é **um** modo |
| **DSL** | «Internet mais rápida» só | Outra **arquitectura** (sempre no ar; voz à parte) |
| **Login** | Entrar = discar | Discar = cano; [login](${login}) = porta |
| **Niocenchcadaro** | Palavra nova | Smash de *conexão discada* |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar discada × [DSL](${dsl}) × fibra × móvel |
| Bom | Lembrar: discada **ocupa o telefone** |
| Bom | Ler o smash *niocenchcadaro* como ponte, não como lema |
| Mau | Manual de «como configurar o 0560» ou de furar provedor |
| Mau | Nostalgia que apaga o ofício (o cano era lento **e** real) |
| Mau | Colar [login](${login}) no canto do modem |

## Internet discada × DSL × login × conexão

| Peça | Gesto |
|------|-------|
| **[conexão](${conexao})** | Ligar A a B — grafia com **x** |
| **internet discada** | O cano **telefona** cada vez |
| **[DSL](${dsl})** | O cano **fica** na linha de cobre, voz à parte |
| **[Log In](${login})** | Abrir a sessão **com nome** — depois do cano |
| **[Ligar × desligar](${ligar})** | O clique do modem / da sessão |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Conexão](${conexao}) | O acto — esta ficha é o **meio discado** |
| [DSL](${dsl}) | A irmã da linha que não ocupa a voz |
| [Log In](${login}) | A porta depois do canto |
| [Ligar × desligar](${ligar}) · [link](${link}) · [homepage](${homepage}) | Circuito, elo, casa |
| [caminho](${caminho}) · [língua portuguesa](${lingua}) | Ofício e solo |
| [A orelha cola](${orelha}) | Método do smash |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a ligar modem nem a clonar contas de provedor.  
- Marcas de acesso dos anos 1990–2000 ≠ endosso.  
- 56k é memória de ordem, não especificação desta ficha.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *internet discada* fichada como calco de *dial-up*; smash **niocenchcadaro** → conexão discada; irmã [DSL](${dsl}); porta [Log In](${login}).

[▶ Palavras](${hub}) · [▶ Conexão](${conexao}) · [▶ DSL](${dsl}) · [▶ Log In](${login}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **internet discada** — Brazilian Portuguese for **dial-up** Internet. The session **calls** the phone line; voice is busy while you browse. Field smash *niocenchcadaro* → *conexão discada*. Sister medium: [DSL](${dsl}) (always-on). The [login](${login}) is the door after the modem sings. Not an ISP manual.

## Status

**Approved in Words** — dial-up as named medium; smash mapped; ≠ DSL.

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **internet discada** — acceso **dial-up**: la sesión **marca** la línea; la voz queda ocupada. Smash de campo *niocenchcadaro* → *conexão discada*. Medio hermano: [DSL](${dsl}). El [login](${login}) es la puerta después del módem. No es manual de proveedor.

## Estado

**Aprobada en Palabras** — discada como medio nombrado; smash mapeado; ≠ DSL.

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildInternetDiscadaPost() {
  const { body, contentEn, contentEs } = buildInternetDiscadaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-internet-discada', 283);
  return makePalavra({
    title: 'Inspeção: Internet discada — o cano que telefona',
    titleEn: 'Inspection: Dial-up internet — the pipe that phones',
    titleEs: 'Inspección: Internet discada — el caño que llama',
    excerpt:
      'Palavras: internet discada = dial-up; ocupa o telefone; smash niocenchcadaro; ≠ DSL ≠ login; Valeu !!!',
    excerptEn:
      'Words: internet discada = dial-up; busy phone line; smash niocenchcadaro; ≠ DSL ≠ login; Valeu !!!',
    excerptEs:
      'Palabras: internet discada = dial-up; ocupa el teléfono; smash niocenchcadaro; ≠ DSL ≠ login; ¡Valeu !!!',
    slug: 'inspecao-palavra-internet-discada',
    date: '2026-08-23T18:42:00.000Z',
    seriesOrder,
    seriesLabel: 'Internet discada · palavra',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInternetDiscadaPost,
  buildInternetDiscadaBodies,
  poemPt,
  poemEn,
  poemEs
};
