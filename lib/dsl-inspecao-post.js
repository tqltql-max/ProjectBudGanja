'use strict';

/**
 * Inspeção Palavras · DSL (sigla)
 * Eixos: Digital Subscriber Line · linha digital do assinante ·
 * sempre no ar · ≠ internet discada · ≠ login · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/dsl-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Linha_digital_de_assinante';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Digital_subscriber_line';
const WIKT = 'https://en.wiktionary.org/wiki/DSL';

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
  return `DSL.
Três letras no cobre.
Digital Subscriber Line —
a linha do assinante,
agora digital.

Não disca de novo
a cada página.
Fica.
A voz pode falar
enquanto a net anda.

Não é o login.
É o cano que já está
antes da porta.

Valeu !!!
sempre no ar —
o ofício mudou de canto.`;
}

function poemEn() {
  return `DSL.
Three letters on copper.
Digital Subscriber Line —
the subscriber's line,
now digital.

It does not dial again
at every page.
It stays.
Voice can speak
while the net walks.

It is not the login.
It is the pipe that is already there
before the door.

Valeu !!!
always on —
the craft changed its song.`;
}

function poemEs() {
  return `DSL.
Tres letras en el cobre.
Digital Subscriber Line —
la línea del abonado,
ahora digital.

No marca de nuevo
en cada página.
Se queda.
La voz puede hablar
mientras la red anda.

No es el login.
Es el caño que ya está
antes de la puerta.

¡Valeu !!!
siempre en el aire —
el oficio cambió de canto.`;
}

function buildDslBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-dsl.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const liberdade = '/posts/post-inspecao-palavra-liberdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da sigla **[DSL](${self})** — **D**igital **S**ubscriber **L**ine (PT: **linha digital de assinante**). Pedido de campo: *DSL inspeção sigla*, no mesmo sopro que [internet discada](${discada}), [conexão](${conexao}) e [Log In](${login}). Não é catálogo de plano. Não é comparação de megabits. Objecto = as **três letras** e o ofício: um cano **digital no par de cobre do telefone**, em regra **sempre no ar**, sem discar a cada sessão.

> **Nota metodológica:** auditoria independente. Fontes: [linha digital de assinante](${WIKI}), [DSL](${WIKI_EN}), [DSL (sigla)](${WIKT}). **Ficha ≠ manual de modem ADSL, ≠ propaganda de operadora, ≠ aula de frequência.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}).

**Gatilho:** *DSL* / *ADSL* / *banda larga* (quando a boca ainda aponta este cano) / *linha digital*.

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **DSL** (sigla EN) |
| Expansão | **Digital Subscriber Line** |
| Calco PT | **linha digital de assinante** (pouco vivo na boca; a sigla ganha) |
| Família | **ADSL** (assimétrica) · SDSL · VDSL — variantes, o mesmo tronco |
| Étimo (trabalho) | Sigla inglesa dos anos 1980–90 sobre o **par de cobre** do assinante — confiança: **alta** na expansão |
| Ofício | Dados na linha telefónica **sem** ocupar a voz como a [discada](${discada}) |
| Tipo BudGanja | Palavra — **sigla** de meio × irmã da discada |
| Não é | [internet discada](${discada}) · fibra óptica · cabo TV · 4G/5G · o [login](${login}) |
| Elo | [conexão](${conexao}) (o acto) · [discada](${discada}) (o meio que disca) |
| Fonte | [DSL](${WIKI_EN}) |
| Data | ${inspected} |

**O que é o objecto:** um **nome de cano**. A discada *chama*; a DSL **fica**. O [login](${login}) continua a ser a porta — agora sobre um cano que já não canta o handshake cada vez.

## Hipóteses e método

**H1:** DSL = *Digital Subscriber Line* — alta.  
**H2:** ADSL é a variante **assimétrica** (desce mais do que sobe) que a boca BR mais ouviu; ainda é família DSL, não outro planeta.  
**H3:** o corte com a [discada](${discada}): discada **ocupa a voz**; DSL clássica **deixa falar** no mesmo cobre — a boca diz *estou livre* / *a linha está livre*. Isso é **ofício do cano**, não a palavra [liberdade](${liberdade}) (*lībertās*).  
**H3b:** *DLS* e *Nos Estamos Libre* no campo = anagrama / irmã ES; a ficha âncora da libertas é [liberdade](${liberdade}).  
**H4:** «banda larga» na boca dos 2000 muitas vezes **apontava DSL** — mas banda larga hoje é hiperónimo (fibra, cabo, móvel). Não fundir.  
**H5:** DSL ≠ [Log In](${login}) — meio ≠ porta.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **DSL** | Sigla âncora — pedido de campo |
| Digital Subscriber Line | Expansão EN |
| linha digital de assinante | Calco PT — correcto e raro na rua |
| **ADSL** | Assimétrica — a boca doméstica dos 2000 |
| VDSL / SDSL | Primos técnicos — mesma família, outro recorte |
| *banda larga* (era) | Hiperónimo de rua que **às vezes** quis dizer DSL |

**Veredicto de forma:** o laboratório ficheia a **sigla DSL** e honra ADSL como a cara doméstica. Não reduz banda larga de 2026 a estas três letras.

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Três letras** | Marca de modem | Sigla de **arquitectura** no cobre |
| **Mais rápida** | Só um número | Outro **ofício** (sempre no ar; voz à parte) |
| **Internet** | DSL = a net | DSL = **um** cano; a [conexão](${conexao}) é o acto |
| **Login** | Entrar = DSL | [Login](${login}) nomeia quem entra; DSL é o chão |
| **Fibra** | «DSL moderna» | Outro meio (luz no vidro, não cobre do assinante) |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Expandir a sigla: Digital Subscriber Line |
| Bom | Cortar DSL × [discada](${discada}) × fibra × móvel |
| Bom | Lembrar: cano ≠ [porta](${login}) |
| Mau | Folheto de megabits ou de «melhor plano» |
| Mau | Dizer que DSL *é* a [discada](${discada}) «melhorada» sem cortar o ofício (discar × ficar) |
| Mau | Confundir ADSL (variante) com outra sigla (USB, DNS, etc.) só porque tem três letras |

## DSL × discada × conexão × login

| Peça | Gesto |
|------|-------|
| **[conexão](${conexao})** | O acto de ligar — escreve-se com **x** |
| **[internet discada](${discada})** | Cano que **disca** e ocupa a voz |
| **DSL** | Cano **digital no cobre**, em regra sempre no ar |
| **[Log In](${login})** | Porta da sessão — depois do cano |
| **[Ligar × desligar](${ligar})** | O clique; na DSL o cano já pode estar ligado |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Internet discada](${discada}) | A irmã que ainda **telefona** |
| [Liberdade](${liberdade}) | *Estou livre* no cobre = linha; *lībertās* = outra ficha |
| [Conexão](${conexao}) | O nome do acto |
| [Log In](${login}) | A porta |
| [Ligar × desligar](${ligar}) · [link](${link}) · [homepage](${homepage}) | Circuito, elo, casa |
| [Língua portuguesa](${lingua}) | O calco e a sigla na boca BR |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não configura modem nem escolhe operadora.  
- ADSL/VDSL aqui são **família**, não ficha de cada norma.  
- Fibra / 5G / cabo = outros canos, outras fichas se o campo pedir.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **DSL** fichada como sigla (*Digital Subscriber Line*); irmã [internet discada](${discada}); acto [conexão](${conexao}); porta [Log In](${login}).

[▶ Palavras](${hub}) · [▶ Internet discada](${discada}) · [▶ Conexão](${conexao}) · [▶ Log In](${login}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the acronym **DSL** — **Digital Subscriber Line**. Field request: *DSL inspeção sigla*. Always-on digital pipe on the subscriber's copper, typically without occupying the voice line like [dial-up](${discada}). Not a login. Not fibre. Not an ISP flyer.

## Status

**Approved in Words** — acronym expanded; sister [dial-up](${discada}); door [Log In](${login}).

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la sigla **DSL** — **Digital Subscriber Line** (línea digital de abonado). Pedido: *DSL inspeção sigla*. Caño digital en el cobre, en general siempre en el aire, sin ocupar la voz como la [discada](${discada}). No es el login. No es fibra. No es folleto.

## Estado

**Aprobada en Palabras** — sigla expandida; hermana [discada](${discada}); puerta [Log In](${login}).

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildDslPost() {
  const { body, contentEn, contentEs } = buildDslBodies();
  const seriesOrder = pickOrder('inspecao-palavra-dsl', 284);
  return makePalavra({
    title: 'Inspeção: DSL — a sigla do cano que fica',
    titleEn: 'Inspection: DSL — the acronym of the pipe that stays',
    titleEs: 'Inspección: DSL — la sigla del caño que se queda',
    excerpt:
      'Palavras: DSL = Digital Subscriber Line; ≠ discada ≠ login ≠ fibra; Valeu !!!',
    excerptEn:
      'Words: DSL = Digital Subscriber Line; ≠ dial-up ≠ login ≠ fibre; Valeu !!!',
    excerptEs:
      'Palabras: DSL = Digital Subscriber Line; ≠ discada ≠ login ≠ fibra; ¡Valeu !!!',
    slug: 'inspecao-palavra-dsl',
    date: '2026-08-23T18:44:00.000Z',
    seriesOrder,
    seriesLabel: 'DSL · sigla',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDslPost,
  buildDslBodies,
  poemPt,
  poemEn,
  poemEs
};
