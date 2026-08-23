'use strict';

/**
 * Inspeção Palavras · conexão
 * Eixos: conectar + -ção · grafia com x · ≠ conecção ·
 * ≠ colchão · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/conexao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/conex%C3%A3o';
const WIKT_CONECTAR = 'https://pt.wiktionary.org/wiki/conectar';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/connexio';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildConexaoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-conexao.html';
  const colchao = '/posts/post-inspecao-palavra-colchao.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const letraX = '/posts/post-inspecao-palavra-letra-x.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[conexão](${self})** — pedido de campo: *nem sei como se escreve* · **conectar + ação** · *conecxao* · *inspeção em conexão* · smash *niocenchcadaro*. O ofício é a **ação (e o efeito) de conectar**. A grafia canónica traz **x** (*conexão*), não ç no meio (*conecção*) e não *conectação*. Parece [colchão](${colchao}); **não** é. No sopro digital: [internet discada](${discada}), [DSL](${dsl}), [Log In](${login}). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · conexão](${WIKT}), [conectar](${WIKT_CONECTAR}), lat. [connexio](${WIKT_LAT}). **Ficha ≠ manual de rede.** Irmãs: [link](${link}) (elo EN) · [relação](${relacao}) · [ligar](${ligar}).

**Gatilho:** *conexao* / *conecção* / *coneção* / *conecxao* / *conexión* / smash *niocenchcadaro* → lema **conexão** (e, no smash, [internet discada](${discada})).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **conexão** |
| Classe | Substantivo feminino |
| Ofício | Nome da **ação / efeito de conectar** |
| Étimo | lat. *cōnexiō* ← *cōnectere* (*con-* + *nectere* «atar») — confiança: **alta** |
| Verbo | **conectar** |
| Grafia | **x** + **ão** — *cone**x**ão* |
| Não é | *conecção* · *conectação* · [colchão](${colchao}) · [cola](${cola}) |
| Elo | [link](${link}) · [relação](${relacao}) · [ligar](${ligar}) · [elo de ligação](${eloLigacao}) · [língua](${lingua}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português do **acto de ligar A a B**. No lab digital, irmã do [link](${link}); no peito, irmã da [relação](${relacao}).

## 2. Conectar + ação — o que o ouvido pede e o que a letra dá

**H1:** o sentido é mesmo **a ação de conectar**.  
**H2:** a forma **não** se escreve como *conectar* + *-ção* colados (*conectação*). O nome herdado é **conexão** (lat. *connexio* / *nexus*).  
**H3:** o ouvido ouve **-ção** (como em *ação*) e escreve **ç**. O étimo traz **x** (nexo, anexo, complexo).  
**H4:** espanhol *conexión* também tem **x** — não copiar o ç de *ação*.  
**H-xis:** o **x** desta palavra é a [letra X](${letraX}) a fazer ofício de *nexus* — não a app, não o chili.

| Forma | Status |
|-------|--------|
| **conexão** | Canónica |
| *conexao* | Sem acento — teclado; apontar o lema |
| *conecção* | Erro frequente (ç de *ação*) |
| *coneção* | Erro (falta o x) |
| *conecxao* | Lapso de campo (c+x) — ainda o lema **conexão** |
| *conectação* | Analogia com *aceitação* — **não** é o nome usual |
| *conexión* | Espanhol |
| *connection* | Inglês |
| **niocenchcadaro** | Smash → *conexão discada* — ver [internet discada](${discada}) |

## 3. O que parece

| Forma | Parece | É |
|-------|--------|---|
| [colchão](${colchao}) | *col-* + -ão | Dormir / *culcita* |
| [cola](${cola}) | *col-* | Grude |
| [link](${link}) | Elo | Loan EN · ≠ Klink |
| [ligar](${ligar}) | Ligar o circuito | *ligāre* — irmã de ofício, outro étimo |
| [elo de ligação](${eloLigacao}) | Anel que junta | Locução — cruzamento do ∞; ≠ esta grafia |

## Hipóteses (síntese)

**H1:** objecto = ação/efeito de conectar.  
**H2:** grafia = **conexão** (x).  
**H3:** fecho = [Valeu !!!](${mantra}) — ligar com [verdade](${verdade}) e [gesto](${gesto}).

## 4. O cano digital (sopro de campo)

A boca pediu a **grafia** e, no mesmo fôlego, o **meio**: internet discada, DSL, Log In. Três salas, um acto.

| Sala | O que é | O que não é |
|------|---------|-------------|
| **conexão** | O acto / efeito de ligar A a B | O modem, a senha, a sigla |
| **[internet discada](${discada})** | O cano que **disca** o telefone | «A internet» em abstracto |
| **[DSL](${dsl})** | Sigla: *Digital Subscriber Line* — cano que **fica** | A discada «melhorada» sem corte |
| **[Log In](${login})** | A **porta** da sessão | O cano |
| **[letra X](${letraX})** | O **xis** do nexo nesta grafia | A app, o chili, a marca |

*Niocenchcadaro* não abre terceira grafia: é o teclado a caminho de **conexão discada**.

## Limites

- Não é curso de ortografia completo.  
- *Nexo* / *anexo* só se apontam.

## Status

**Aprovado** — **conexão** fichada: conectar + ação no sentido; **x** na letra; ≠ colchão; elos [discada](${discada}), [DSL](${dsl}), [Log In](${login}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Colchão](${colchao}) · [▶ Link](${link}) · [▶ Internet discada](${discada}) · [▶ DSL](${dsl}) · [▶ Log In](${login}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **conexão** — the **act/effect of connecting**. Spelling uses **x** (*conexão*), not *conecção*. Not [colchão](${colchao}). Close: [Valeu !!!](${mantra}).

## Status

**Approved** — connect + action in sense; **x** in letters.

[▶ Words](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**conexão** — la **acción/efecto de conectar**. Grafía con **x**, no *conecção*. No es [colchão](${colchao}). Cierre: [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — sentido conectar+acción; letra **x**.

[▶ Palabras](${hub}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildConexaoPost() {
  const { body, contentEn, contentEs, wiki } = buildConexaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-conexao', 174);
  const post = makePalavra({
    title: 'Inspeção: Conexão — conectar + ação (e por que se escreve com x)',
    titleEn: 'Inspection: Conexão — connect + action (and why it is spelled with x)',
    titleEs: 'Inspección: Conexão — conectar + acción (y por qué se escribe con x)',
    excerpt:
      'Palavras: conexão — a ação de conectar; grafia com x (não conecção); ≠ colchão; Valeu !!!',
    excerptEn:
      'Words: conexão — the act of connecting; spelled with x (not conecção); ≠ mattress; Valeu !!!',
    excerptEs:
      'Palabras: conexão — la acción de conectar; grafía con x; ≠ colchón; ¡Valeu !!!',
    slug: 'inspecao-palavra-conexao',
    date: '2026-08-21T20:32:00.000Z',
    seriesOrder,
    seriesLabel: 'Conexão · palavra',
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

module.exports = { buildConexaoPost, buildConexaoBodies };
