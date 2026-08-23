'use strict';

/**
 * Inspeção Palavras · Log In / Login
 * Eixos: EN log + in · porta de sessão · Longin (lapso) ·
 * ≠ Log Out · ≠ Save Game · ≠ conexão (o cano) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/login-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/log_in';
const WIKT_LOGIN = 'https://en.wiktionary.org/wiki/login';
const WIKT_LOG = 'https://en.wiktionary.org/wiki/log#English';
const WIKI = 'https://en.wikipedia.org/wiki/Login';

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
  return `Log In.
Duas peças inglesas
na porta do ecrã.

Não é o cano.
É o nome na porta —
entrar na sessão
que a conexão já trouxe.

Longin
é o teclado a correr.
O lema espera:
Login.

Quem entra sem cano
bate no ar.
Quem entra e fica
deixa rasto.

Valeu !!!
porta 1 —
o ofício ainda pede senha.`;
}

function poemEn() {
  return `Log In.
Two English pieces
on the screen door.

It is not the pipe.
It is the name on the door —
enter the session
the connection already brought.

Longin
is the keyboard running.
The lemma waits:
Login.

Whoever enters without a pipe
hits the air.
Whoever enters and stays
leaves a trail.

Valeu !!!
door 1 —
the craft still asks for a password.`;
}

function poemEs() {
  return `Log In.
Dos piezas inglesas
en la puerta de la pantalla.

No es el caño.
Es el nombre en la puerta —
entrar en la sesión
que la conexión ya trajo.

Longin
es el teclado corriendo.
El lema espera:
Login.

Quien entra sin caño
golpea el aire.
Quien entra y se queda
deja rastro.

¡Valeu !!!
puerta 1 —
el oficio aún pide contraseña.`;
}

function buildLoginBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-login.html';
  const save = '/posts/post-inspecao-palavra-save-game.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const entrarSite = '/entrar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial de **[Log In](${self})** / **Login** — composto inglês vivo no ecrã brasileiro: **entrar na sessão**. Pedido de campo no mesmo sopro: *inspeção da palavra Log In* · *Longin* · e, ao lado, [conexão](${conexao}) / [internet discada](${discada}) / [DSL](${dsl}). Não é tutorial de senha. Não é ficha de phishing. Objecto = a **fórmula de porta** (quem entra) distinta do **cano** (como chega).

> **Nota metodológica:** auditoria independente. Fontes: [log in](${WIKT}), [login](${WIKT_LOGIN}), [log](${WIKT_LOG}), [login (EN)](${WIKI}). **Ficha ≠ manual de conta, ≠ dica de furar senha, ≠ marketing de «entrar com Google».** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}).

**Gatilho:** *Log In* / *login* / *log-in* / *Longin* / *iniciar sessão* / *entrar*.

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Log In** (EN, duas peças no botão) · **login** (uma palavra — substantivo / verbo) |
| Irmãs PT | **entrar** · **iniciar sessão** · oral *fazer o login* |
| Peças | *log* (registo / diário) + *in* (para dentro) |
| Étimo (trabalho) | EN *to log in* — «registar a entrada no diário (log)» → substantivo *login* — confiança: **alta** |
| Família de ecrã | *Log Out* / *Logout* · *Sign in* · *Sign up* · *Password* |
| Tipo BudGanja | Palavra — empréstimo de porta × sessão |
| Não é | o [cano](${conexao}) · [Save Game](${save}) (gravar o rasto) · [Exit](${exit}) (sair) · a [homepage](${homepage}) (a casa depois de entrar) |
| Elo de campo | [internet discada](${discada}) · [DSL](${dsl}) — o meio; o login é a **porta** |
| Fonte | [login](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **botão de identidade**. O cano pode já estar ligado ([conexão](${conexao})); sem login, muitas salas ainda estão fechadas. Com login, o [caminho](${caminho}) tem nome.

## Hipóteses e método

**H1:** *Log In* < EN *log* + *in* — fórmula de ecrã, não frase solta (alta).  
**H2:** *login* (uma palavra) é o mesmo ofício substantivado; *log-in* (hífen) é mapa, não outro objecto.  
**H3:** *Longin* é **lapso de teclado** rumo a *Login* (n a mais / ordem) — não é lema.  
**H4:** [conexão](${conexao}) é o **acto de ligar A a B**; login é **quem** atravessa a porta.  
**H5:** [Save Game](${save}) grava o rasto; login **abre** a sessão onde o rasto pode existir.  
**H6:** [Exit](${exit}) / *Log Out* é o gesto inverso — sair, não entrar.  
**H7:** fecho = [Valeu !!!](${mantra}).

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **Log In** | Canónica de botão EN — duas peças visíveis |
| **login** | Uma palavra — substantivo (*o login*) e verbo |
| log-in | Hífen — o mesmo objecto |
| *Sign in* | Irmã de menu (entrar); *Sign up* = **criar** conta — outro gesto |
| **entrar** / iniciar sessão | PT — calco / irmã viva |
| **Longin** | Lapso de campo — apontar o lema *Login* |
| *Log Out* / *Logout* | Sair da sessão — eixo oposto |
| [Entrar](${entrarSite}) neste sítio | A porta viva do lab — não é esta ficha |

**Veredicto de forma:** o laboratório ficheia **Log In** (duas peças no botão) e **login** (uma palavra no uso BR). Honra *Longin* como voz de teclado, sem promover a grafia.

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Menu** | Mais um inglês no ecrã | Fórmula de **entrada na sessão** |
| **Wifi ligado** | «Já estou dentro» | [Conexão](${conexao}) ≠ login — cano ≠ porta |
| **Discada / DSL** | O login *é* a internet | O meio ([discada](${discada}) / [DSL](${dsl})) traz o cano; o login **nomeia** quem entra |
| **Save** | Entrar = gravar | [Save Game](${save}) persiste; login **identifica** |
| **Longin** | Palavra nova | Lapso — o lema é *Login* |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *Log In* (porta) × [conexão](${conexao}) (cano) × [discada](${discada})/[DSL](${dsl}) (meio) |
| Bom | Distinguir Sign in (entrar) × Sign up (criar) × Log out (sair) |
| Bom | Ler *Longin* como lapso, não como marca |
| Mau | Transformar a ficha em guia de furar conta ou de «recuperar senha» de terceiros |
| Mau | Colar login em [Save Game](${save}) — gravar ≠ entrar |
| Mau | Achar que [ligar](${ligar}) o modem *é* o login |

## Log In × conexão × discada × DSL × Save × Exit

| Peça | Gesto |
|------|-------|
| **[conexão](${conexao})** | Ligar A a B — o cano (grafia com **x**) |
| **[internet discada](${discada})** | O cano que **telefona** cada sessão |
| **[DSL](${dsl})** | O cano **sempre ligado** na linha |
| **Log In** | Abrir a sessão **com nome** |
| **[Save Game](${save})** | Escrever o meio da partida |
| **[Exit](${exit}) / Log Out** | Sair — da sala ou da sessão |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Conexão](${conexao}) · [Link](${link}) · [Ligar × desligar](${ligar}) | Cano / elo / clique |
| [Internet discada](${discada}) · [DSL](${dsl}) | Meios — o sopro pediu-os no mesmo fôlego |
| [Save Game](${save}) · [Exit](${exit}) · [Homepage](${homepage}) | Família de ecrã EN |
| [gesto](${gesto}) · [caminho](${caminho}) | Ofício de entrar |
| [Língua portuguesa](${lingua}) · [Valeu !!!](${mantra}) | Solo e fecho |

## Limites

- Não ensina a quebrar senhas nem a clonar sessões.  
- Não é manual do botão [Entrar](${entrarSite}) deste sítio.  
- *Sign in with…* de marca ≠ endosso comercial.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — *Log In* / *login* fichado como *log* + *in*; lapso **Longin**; porta ≠ cano ([conexão](${conexao})); meios [discada](${discada}) e [DSL](${dsl}) ao lado.

[▶ Palavras](${hub}) · [▶ Conexão](${conexao}) · [▶ Internet discada](${discada}) · [▶ DSL](${dsl}) · [▶ Save Game](${save}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **Log In** / **login** — English screen compound alive in Brazilian Portuguese: enter the session. Field slip: *Longin*. Not a password tutorial. Object = the **door**, not the **pipe** ([conexão](${conexao})). Dial-up and [DSL](${dsl}) are the medium; login **names** who enters. Opposite of Log Out / [Exit](${exit}). Distinct from [Save Game](${save}) (persist).

## Status

**Approved in Words** — *log* + *in*; slip *Longin*; door ≠ pipe.

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Log In** / **login** — compuesto inglés vivo en el menú brasileño: entrar en la sesión. Lapsus: *Longin*. No es tutorial de contraseña. Objeto = la **puerta**, no el **caño** ([conexão](${conexao})). Discada y [DSL](${dsl}) son el medio. Lo contrario de Log Out / [Exit](${exit}). Distinto de [Save Game](${save}).

## Estado

**Aprobada en Palabras** — *log* + *in*; lapsus *Longin*; puerta ≠ caño.

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildLoginPost() {
  const { body, contentEn, contentEs } = buildLoginBodies();
  const seriesOrder = pickOrder('inspecao-palavra-login', 282);
  return makePalavra({
    title: 'Inspeção: Log In — a porta da sessão, não o cano',
    titleEn: 'Inspection: Log In — the session door, not the pipe',
    titleEs: 'Inspección: Log In — la puerta de la sesión, no el caño',
    excerpt:
      'Palavras: Log In / login = log + in; lapso Longin; ≠ conexão ≠ discada ≠ DSL ≠ Save Game; Valeu !!!',
    excerptEn:
      'Words: Log In / login = log + in; slip Longin; ≠ connection ≠ dial-up ≠ DSL ≠ Save Game; Valeu !!!',
    excerptEs:
      'Palabras: Log In / login = log + in; lapsus Longin; ≠ conexão ≠ discada ≠ DSL ≠ Save Game; ¡Valeu !!!',
    slug: 'inspecao-palavra-login',
    date: '2026-08-23T18:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Log In · palavra',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLoginPost,
  buildLoginBodies,
  poemPt,
  poemEn,
  poemEs
};
