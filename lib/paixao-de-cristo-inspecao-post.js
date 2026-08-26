'use strict';

/**
 * A Paixão de Cristo / The Passion of the Christ (2004) — Artes · cinema
 * Génese: Evangelhos canónicos; fontes piedosas secundárias (Emmerich).
 * Ficha própria — distinta de Coração Valente.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const YT_ID = '4Aif1qEB_JU';
const VALENTE = '/posts/post-inspecao-filme-coracao-valente.html';
const GIBSON = '/posts/post-inspecao-figura-mel-gibson.html';
const CHOSEN = '/posts/post-inspecao-serie-the-chosen.html';

function buildBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/A_Paix%C3%A3o_de_Cristo';
  const wikiEn = 'https://en.wikipedia.org/wiki/The_Passion_of_the_Christ';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const doze = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const ceia = '/posts/post-inspecao-arte-santa-ceia.html';

  const body = `## Escopo

Inspeção editorial do filme **«The Passion of the Christ»** — no Brasil e em Portugal, **A Paixão de Cristo** (**2004**). Coescrito, coproduzido e realizado por **[Mel Gibson](${GIBSON})**, com **Benedict Fitzgerald**. O **início de tudo** é o **texto canónico**: a Paixão nos Evangelhos de **Mateus, Marcos, Lucas e João**. O filme é **adaptação cinematográfica** — um recorte das últimas horas — não o Evangelho, não catecismo, não acta do século I.

Fontes piedosas secundárias (visões atribuídas a **Ana Catarina Emmerich**, *The Dolorous Passion*; Sexta-feira das Dores) entram como **camada do guião**, declaradas, não como origem.

Esta ficha é **só** *A Paixão de Cristo*. [Coração Valente](${VALENTE}) tem ficha **própria** — outro filme. [The Chosen](${CHOSEN}) tem ficha **própria** — série do ministério (2019–), não as últimas horas. [Santa Ceia / A Última Ceia](${ceia}) (Leonardo, 1495–1498) também.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · A Paixão de Cristo](${wiki}), [Wikipedia (EN)](${wikiEn}), trailer (${yt}). Crédito: Evangelhos (tradição) / Fitzgerald / Gibson / Icon / Newmarket / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção / adaptação bíblica ≠ manual teológico, histórico ou de violência.** Sem proselitismo. Sem vida privada inventada. A controvérsia sobre antissemitismo **regista-se como facto da recepção** — o laboratório **não** transforma o filme em acusação a um povo.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR / PT | **A Paixão de Cristo** |
| Título original | *The Passion of the Christ* |
| Ano | **2004** (EUA **25 fev.**; Brasil **19 mar.**) |
| Génese | **Evangelhos canónicos** (Paixão de Jesus) |
| Camada piedosa (secundária) | Ana Catarina Emmerich · Sexta-feira das Dores |
| Argumento | Benedict Fitzgerald · [Mel Gibson](${GIBSON}) |
| Realização / produção | [Mel Gibson](${GIBSON}) · Bruce Davey · Stephen McEveety · Icon Productions |
| Música / fotografia | **John Debney** · **Caleb Deschanel** |
| Línguas | Aramaico · hebraico · latim (estreia BR em legendas, nas fontes) |
| Duração | ~126–127 min |
| Distribuição | Newmarket (EUA) · 20th Century Fox (Brasil) |
| Orçamento / receita | ~US$ 30 milhões / ~US$ 612 milhões |
| Tipo BudGanja | Arte — **texto canónico primeiro**; filme 2004 como adaptação |
| Elenco âncora | Jim Caviezel (Jesus) · Maia Morgenstern (Maria) · Monica Bellucci (Madalena) · Hristo Shopov (Pilatos) |
| Elo Palavras / expressões | [filho de deus](${filho}) · [os doze apóstolos](${doze}) · [coração](${coracao}) · [caminho](${caminho}) · [respeito](${respeito}) · [verdade](${verdade}) · [alma](${alma}) |
| Elo Pessoas | [Mel Gibson](${GIBSON}) — ofício; pessoa ≠ o recorte de Jesus |
| Ficha irmã (separada) | [Coração Valente](${VALENTE}) — outro filme; [The Chosen](${CHOSEN}) — outra série; não misturar |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa nos **Evangelhos**; o filme **escolhe um recorte** (prisão, julgamento, via-sacra, cruz).  
**H2:** Emmerich é **fonte secundária** do guião — declarar, não confundir com cânone.  
**H3:** a violência gráfica é **escolha de ecrã**; a crítica polarizou (experiência «santa» vs excesso). O laboratório **não** reproduz nem prescreve.  
**H4:** o debate sobre antissemitismo é **recepção pública**; [respeito](${respeito}) exige não reduzir judeus a vilões de cinema nem apagar a controvérsia.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* filme *deste* texto, sem púlpito.

## O início de tudo — o texto

A Paixão é narrativa dos quatro Evangelhos. O laboratório **não** inspecciona a Bíblia inteira nesta ficha: inspecciona o **filme** que diz partir desse texto. *The Dolorous Passion of Our Lord Jesus Christ* (Emmerich) e a tradição da Sexta-feira das Dores alimentam imagens e ênfases — **camada**, não génese.

Gibson e Fitzgerald escrevem. Icon produz. Caviezel interpreta Jesus; Morgenstern, Maria; Bellucci, Madalena. Diálogo em línguas antigas: o ecrã pede ouvido e legenda, não dobragem como origem.

## A obra de 2004

EUA **25 fev. 2004**; Brasil **19 mar.** Orçamento relativamente baixo; receita global ~US$ 612 milhões — um dos maiores êxitos independentes da época. Recepção **polarizada**: elogio a interpretação, realização, Debney, valores de produção; crítica à brutalidade; acusações de antissemitismo e defesa em contrário. O laboratório **documenta os dois lados da recepção** e **não** fecha teologia.

A sequela anunciada (*The Resurrection of the Christ*) é **eco futuro** — não objecto desta ficha.

## Tese cultural BudGanja

O filme segue as últimas horas: Getsémani, prisão, Sinédrio, Pilatos, Herodes, flagelação, cruz, morte. Flashbacks breves (ensino, infância, [Santa Ceia / última ceia](${ceia})) abrem o [caminho](${caminho}) sem virar biopic completo. O mural de Leonardo tem ficha **própria**.

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Paixão | Sofrimento narrado — [coração](${coracao}) / [alma](${alma}), não espectáculo de ferida |
| [Filho de Deus](${filho}) | Título teológico já fichado como **expressão**; aqui o ecrã é adaptação |
| Via-sacra | [Caminho](${caminho}) de um dia — recorte, não enciclopédia |
| Maria / Madalena | Presença de quem fica — [respeito](${respeito}) de ofício, não nota de rodapé |
| Línguas antigas | Estranhamento: o filme **não** fala a língua do espectador |
| Violência | Escolha formal — **não** é protocolo nem prova histórica de cada golpe |
| Controvérsia | [Verdade](${verdade}) de recepção: o debate existe; o lab não o transforma em sentença |

O laboratório **não** evangeliza nem «desmente» a fé. Usa a ficha para **separar texto, filme e púlpito**.

## Elenco — crédito, não centro

| Pessoa | Papel | Nota |
|--------|-------|------|
| **Jim Caviezel** | Jesus | O corpo do recorte; pessoa ≠ figura de culto do laboratório |
| **Maia Morgenstern** | Maria | A mãe no ecrã |
| **Monica Bellucci** | Maria Madalena | Presença, não redução |
| **Hristo Shopov** | Pôncio Pilatos | O governador do recorte |
| **[Mel Gibson](${GIBSON})** | Guião + realização | Ofício deste filme; **não** fundir com [Coração Valente](${VALENTE}) |
| **Benedict Fitzgerald** | Coargumento | Crédito de escrita |

## Elos

| Recurso | Papel |
|---------|-------|
| [filho de deus](${filho}) | Expressão — título, oralidade, dignidade; sem proselitismo |
| [os doze apóstolos](${doze}) | Mesa dos enviados — conjunto; Tomé inspecciona; ficha ≠ santoral |
| [coração](${coracao}) · [alma](${alma}) · [vida](${vida}) | Léxico da paixão sem virar sermão |
| [caminho](${caminho}) · [gesto](${gesto}) · [respeito](${respeito}) | Via, corpo, tratamento de povos e textos |
| [verdade](${verdade}) | Texto ≠ filme ≠ crónica judicial |
| [Coração Valente](${VALENTE}) | **Ficha separada** — outro objecto (1995) |
| [The Chosen](${CHOSEN}) | **Ficha separada** — série 2019–; ministério, não as últimas horas |
| [Mel Gibson](${GIBSON}) | Pessoa — ofício; **não** fundir as duas obras |
| [Santa Ceia / A Última Ceia](${ceia}) | Mural de Leonardo — **ficha própria**; o *flashback* da ceia no filme não substitui a parede |
| [Valeu !!!](${mantra}) | O melhor *deste* recorte |

> Abrir esta ficha para **A Paixão de Cristo**. Abrir [Coração Valente](${VALENTE}) para **esse** filme. Abrir [The Chosen](${CHOSEN}) para **essa** série. Abrir [Mel Gibson](${GIBSON}) para o **homem e o ofício**. Não fundir as obras.

## Vídeo de referência (embed)

Trailer de 2004 — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | The Passion of the Christ (2004) Official Trailer |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **adaptação**; a génese é o texto canónico |

## Limites

- Não é catecismo, homilia nem tratado de história antiga.  
- Não se reproduz violência.  
- Emmerich ≠ Evangelho.  
- Controvérsia antissemita: facto de recepção — **sem** acusar um povo e **sem** apagar o debate.  
- Sem vida privada inventada (elenco, Gibson).  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [Coração Valente](${VALENTE}).  
- **Não** é ficha de [The Chosen](${CHOSEN}).
- **Não** é ficha da [Santa Ceia](${ceia}).

## Status

**Aprovado na série Artes (ficha própria)** — *A Paixão de Cristo* (2004). Evangelhos primeiro; filme como adaptação creditada; camadas piedosas declaradas; elenco com nome.

[▶ Artes](${hub}) · [▶ filho de deus](${filho}) · [▶ Mel Gibson](${GIBSON}) · [▶ Coração Valente (outra ficha)](${VALENTE}) · [▶ The Chosen (outra ficha)](${CHOSEN}) · [▶ Santa Ceia](${ceia}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **The Passion of the Christ** (2004, BR/PT: *A Paixão de Cristo*). Co-written and directed by **[Mel Gibson](${GIBSON})** with **Benedict Fitzgerald**. Origin: the **canonical Gospels**. The film is a **cinematic cut** of the last hours — not Scripture, not catechism.

This sheet is **only** this film. [Braveheart](${VALENTE}) has its **own** sheet. [The Chosen](${CHOSEN}) has its **own** sheet (ministry series, 2019–). [Mel Gibson](${GIBSON}) is the People sheet.

> [Wikipedia](${wikiEn}). Emmerich is a **secondary** script layer. Graphic violence is a formal choice — not a protocol. The antisemitism debate is **reception fact**; this lab does not turn the film into a charge against a people. No proselytism.

## Status

**Approved in Arts as its own sheet** — Gospels first; 2004 film as credited adaptation.

[▶ son of God](${filho}) · [▶ Mel Gibson](${GIBSON}) · [▶ Braveheart (separate)](${VALENTE}) · [▶ The Chosen (separate)](${CHOSEN})
`;

  const contentEs = `## Alcance

Inspección de **The Passion of the Christ** (*A Paixão de Cristo*, 2004). Coguion y dirección de **[Mel Gibson](${GIBSON})** con **Benedict Fitzgerald**. Origen: los **Evangelios canónicos**. El filme es un **recorte** de las últimas horas — no el texto, no un catecismo.

Esta ficha es **solo** este filme. [Coração Valente](${VALENTE}) tiene ficha **propia**. [The Chosen](${CHOSEN}) tiene ficha **propia** (serie del ministerio, 2019–). [Mel Gibson](${GIBSON}) es la ficha de Personas.

> [Wikipedia](${wiki}). Emmerich es capa secundaria. La controversia sobre antisemitismo es **hecho de recepción**. Sin proselitismo.

## Estado

**Aprobado en Artes (ficha propia)** — Evangelios primero; filme de 2004 como adaptación.

[▶ filho de deus](${filho}) · [▶ Mel Gibson](${GIBSON}) · [▶ Braveheart (otra)](${VALENTE}) · [▶ The Chosen (otra)](${CHOSEN})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPaixaoDeCristoPost() {
  const { body, contentEn, contentEs, wiki } = buildBodies();
  return artePost({
    title: 'Inspeção: A Paixão de Cristo — os Evangelhos e o filme de 2004',
    titleEn: 'Inspection: The Passion of the Christ — the Gospels and the 2004 film',
    titleEs: 'Inspección: La Pasión de Cristo — los Evangelios y el filme de 2004',
    excerpt:
      'Artes · cinema: A Paixão de Cristo (2004, Gibson / Fitzgerald) — génese nos Evangelhos; Emmerich como camada secundária. Adaptação ≠ catecismo. Ficha própria, distinta de Coração Valente.',
    excerptEn:
      'Arts · film: The Passion of the Christ (2004, Gibson / Fitzgerald) — origin in the Gospels; Emmerich as secondary layer. Adaptation ≠ catechism. Own sheet, distinct from Braveheart.',
    excerptEs:
      'Artes · cine: A Paixão de Cristo (2004, Gibson / Fitzgerald) — origen en los Evangelios; Emmerich como capa secundaria. Adaptación ≠ catecismo. Ficha propia, distinta de Braveheart.',
    slug: 'inspecao-filme-a-paixao-de-cristo',
    date: '2026-08-18T07:15:00.000Z',
    seriesOrder: 56,
    seriesLabel: 'A Paixão de Cristo · Artes',
    coverImage: 'imagens/inspecoes/paixao-de-cristo-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildPaixaoDeCristoPost, YT_ID };
