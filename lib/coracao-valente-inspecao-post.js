'use strict';

/**
 * Coração Valente / Braveheart (1995) — Artes · cinema
 * Génese: poema épico de Blind Harry (séc. XV) + figura histórica de Wallace;
 * argumento de Randall Wallace; realização de Mel Gibson.
 * Ficha própria — distinta de A Paixão de Cristo.
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

const YT_ID = 'nMft5QDOHek';
const PAIXAO = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
const GIBSON = '/posts/post-inspecao-figura-mel-gibson.html';

function buildBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Braveheart';
  const wikiEn = 'https://en.wikipedia.org/wiki/Braveheart';
  const wikiHarry = 'https://en.wikipedia.org/wiki/Blind_Harry';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const shaw = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial do filme **«Braveheart»** — no Brasil, **Coração Valente** (**1995**). Realização e interpretação de **[Mel Gibson](${GIBSON})**. Argumento de **Randall Wallace**. O **início de tudo** é a **lenda**: o poema épico de **Blind Harry** (séc. XV), *The Actes and Deidis of the Illustre and Vallyeant Campioun Schir William Wallace*, sobre o Wallace histórico da Primeira Guerra da Independência da Escócia. O filme é **épico de cinema**, não tratado de história.

Esta ficha é **só** *Coração Valente*. [A Paixão de Cristo](${PAIXAO}) tem ficha **própria** — outro objecto, outro recorte, outro ano.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Braveheart](${wiki}), [Wikipedia (EN)](${wikiEn}), [Blind Harry](${wikiHarry}), trailer (${yt}). Crédito: Randall Wallace / Gibson / Icon / Ladd / Paramount / Fox / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção histórica ≠ manual de guerra nem de história da Escócia.** Não se inventa vida privada.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Coração Valente** |
| Título original | *Braveheart* (PT: *Braveheart — O Desafio do Guerreiro*) |
| Ano | **1995** (Seattle 18 mai.; EUA **24 mai.**; Brasil **14 jul.**; Portugal 15 dez.) |
| Génese | Poema de **Blind Harry** (séc. XV) + Wallace histórico (séc. XIII) |
| Argumento | **Randall Wallace** |
| Realização / produção | **[Mel Gibson](${GIBSON})** · Alan Ladd Jr. · Bruce Davey · Icon / The Ladd Company |
| Música / fotografia | **James Horner** · **John Toll** |
| Duração | ~170–177 min |
| Distribuição | Paramount (EUA/Canadá) · 20th Century Fox (internacional) |
| Orçamento / receita | ~US$ 53–72 milhões / ~US$ 209 milhões |
| Óscares (68.ª) | 10 nomeações; **5** — Filme, Realização, Fotografia, Maquilhagem, Edição de som |
| Tipo BudGanja | Arte — **lenda / poema primeiro**; filme 1995 como épico |
| Elenco âncora | [Mel Gibson](${GIBSON}) (Wallace) · Sophie Marceau · Patrick McGoohan · Catherine McCormack · Angus Macfadyen · Brendan Gleeson |
| Elo Palavras | [coração](${coracao}) · [caminho](${caminho}) · [respeito](${respeito}) · [verdade](${verdade}) · [vida](${vida}) |
| Elo Pessoas | [Mel Gibson](${GIBSON}) — ofício; pessoa ≠ Wallace |
| Ficha irmã (separada) | [A Paixão de Cristo](${PAIXAO}) — outro filme; não misturar |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **lenda** (Blind Harry + Wallace) e no **guião de Randall Wallace**; o ecrã de 1995 adapta e inventa.  
**H2:** [coração](${coracao}) no título BR é coragem + afeto (Murron), não músculo.  
**H3:** «Freedom!» é [gesto](${gesto}) de cinema no cadafalso — tese cultural, não acta notarial.  
**H4:** erros históricos (ponte de Stirling, Isabelle, *jus primae noctis*) **registam-se**; o laboratório **não** os corrige para «consertar» o filme nem os usa para anular a obra.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* épico *desta* lenda.

## O início de tudo — lenda e guião

William Wallace (c. 1270–1305) é figura histórica. O poema de **Blind Harry** (séc. XV) é a **matriz lendária** que o cinema herda — não um relatório. **Randall Wallace** escreve o guião (o apelido partilhado é coincidência de ofício, não prova de linhagem). Alan Ladd Jr. apanha o projecto na MGM; sai e leva-o. Gibson recusa, volta, quer só realizar, pensa em Brad Pitt / Jason Patric para Wallace; acaba por **realizar e interpretar**. Sean Connery recusa Longshanks. Terry Gilliam recusa realizar.

Warner pede outra *Lethal Weapon* em troca de dinheiro; Gibson recusa. Paramount (América do Norte) + Fox (resto) fecham o orçamento. Icon Productions.

## A obra de 1995

Estreia Seattle **18 mai.**; EUA **24 mai.**; Brasil **14 jul. 1995**. Cinco Óscares incluindo Filme e Realização. Receita ~US$ 209 milhões. Sequelas de legado (*Robert the Bruce*, 2019) ficam como **eco**.

Crítica: batalhas, desenho, Horner, interpretação — e **inexatidão histórica** como facto da recepção. O laboratório não transforma o filme em manual de Stirling ou de Falkirk.

## Tese cultural BudGanja

Wallace perde pai e irmão; casa em segredo com Murron; ela é executada; a revolta espalha-se. Stirling no ecrã **sem a ponte**. Isabelle negocia e avisa. Falkirk: traição dos nobres e do pai de Robert. Wallace é capturado em Edimburgo, recusa submissão, grita *Freedom!* Antes da decapitação, visão de Murron. 1314: Robert em Bannockburn, a espada cravada no chão.

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| [Coração](${coracao}) valente | Coragem + afecto — o título BR já faz o trabalho |
| Liberdade | [Gesto](${gesto}) no cadafalso; [esperança](${esperanca}) de quem fica (Robert) |
| Traição dos nobres | [Verdade](${verdade}) de ofício ≠ lealdade de cartaz |
| Murron | Motivo humano; não reduzir a «causa de guerra» |
| Robert the Bruce | [Caminho](${caminho}) de quem muda de lado e depois assume |
| Batalha | Coreografia de cinema — **não** manual de combate |
| «They may take our lives…» | Retórica de ecrã; [vida](${vida}) não se entrega ao slogan |

O laboratório **não** ensina a guerrear. Usa o filme como parábola: **o coração inspecciona-se no [respeito](${respeito}) aos mortos da lenda; a história verifica-se noutro sítio.**

## Elenco — crédito, não centro

| Pessoa | Papel | Nota |
|--------|-------|------|
| **[Mel Gibson](${GIBSON})** | Wallace + realização | Ofício duplo; a pessoa não é o herói |
| **Randall Wallace** | Argumento | Autor do **guião** — não do poema do séc. XV |
| **Catherine McCormack** | Murron | O afecto que o título BR carrega |
| **Sophie Marceau** | Isabelle | Romance de cinema — **não** é acta dinástica |
| **Patrick McGoohan** | Edward I «Longshanks» | O rei do ecrã |
| **Angus Macfadyen** | Robert the Bruce | Quem herda o [caminho](${caminho}) |
| **Brendan Gleeson** · **James Cosmo** · **Brian Cox** | Hamish · Campbell · Argyle | A turma e a casa |

## Elos

| Recurso | Papel |
|---------|-------|
| [coração](${coracao}) | Léxico do título |
| [caminho](${caminho}) · [gesto](${gesto}) · [respeito](${respeito}) | Marcha, grito, tratamento da lenda |
| [verdade](${verdade}) | Separar épico e crónica |
| [Um Sonho de Liberdade](${shaw}) | Outra ficha de liberdade — prisão, não campo de batalha |
| [A Paixão de Cristo](${PAIXAO}) | **Ficha separada** — outro objecto (2004) |
| [Mel Gibson](${GIBSON}) | Pessoa — ofício; **não** fundir as duas obras |
| [Valeu !!!](${mantra}) | O melhor *deste* recorte |

> Abrir esta ficha para **Coração Valente**. Abrir [A Paixão de Cristo](${PAIXAO}) para **esse** filme. Abrir [Mel Gibson](${GIBSON}) para o **homem e o ofício**. Não fundir as duas obras.

## Vídeo de referência (embed)

Trailer Paramount — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | Braveheart — Trailer (Paramount Movies) |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **épico**; a génese é a lenda / o poema |

## Limites

- Não é história da Escócia nem manual de batalha.  
- Inexatidões (ponte, Isabelle, *jus primae noctis*): facto da crítica — sem «corrigir» o filme.  
- Violência de guerra: **não** se reproduz.  
- Sem vida privada inventada.  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [A Paixão de Cristo](${PAIXAO}).

## Status

**Aprovado na série Artes (ficha própria)** — *Coração Valente* (1995). Lenda / Blind Harry / Randall Wallace primeiro; épico de Gibson como adaptação creditada.

[▶ Artes](${hub}) · [▶ coração](${coracao}) · [▶ Mel Gibson](${GIBSON}) · [▶ A Paixão de Cristo (outra ficha)](${PAIXAO}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **Braveheart** (1995, BR: *Coração Valente*). Directed by and starring **[Mel Gibson](${GIBSON})**. Screenplay by **Randall Wallace**. Origin: **Blind Harry**’s 15th-century epic plus the historical Wallace. The film is **cinema epic, not a Scotland textbook**.

This sheet is **only** Braveheart. [The Passion of the Christ](${PAIXAO}) has its **own** sheet. [Mel Gibson](${GIBSON}) is the People sheet.

> [Wikipedia](${wikiEn}). **Historical fiction is not a war or history manual.**

## Status

**Approved in Arts as its own sheet** — legend first; 1995 film as credited epic.

[▶ heart](${coracao}) · [▶ Mel Gibson](${GIBSON}) · [▶ Passion (separate)](${PAIXAO})
`;

  const contentEs = `## Alcance

Inspección de **Braveheart** (*Coração Valente*, 1995). Dirección e interpretación de **[Mel Gibson](${GIBSON})**. Guion de **Randall Wallace**. Origen: poema de **Blind Harry** (s. XV) y el Wallace histórico. El filme es **épica, no manual de historia**.

Esta ficha es **solo** este filme. [A Paixão de Cristo](${PAIXAO}) tiene ficha **propia**. [Mel Gibson](${GIBSON}) es la ficha de Personas.

## Estado

**Aprobado en Artes (ficha propia)** — leyenda primero; filme de 1995 como épica acreditada.

[▶ coração](${coracao}) · [▶ Mel Gibson](${GIBSON}) · [▶ Pasión (otra)](${PAIXAO})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCoracaoValentePost() {
  const { body, contentEn, contentEs, wiki } = buildBodies();
  return artePost({
    title: 'Inspeção: Coração Valente — a lenda de Wallace e o filme de 1995',
    titleEn: 'Inspection: Braveheart — the Wallace legend and the 1995 film',
    titleEs: 'Inspección: Braveheart — la leyenda de Wallace y el filme de 1995',
    excerpt:
      'Artes · cinema: Coração Valente / Braveheart (1995) — lenda de Blind Harry e Wallace; guião de Randall Wallace; Gibson realiza e interpreta. Épico ≠ crónica. Ficha própria, distinta de A Paixão de Cristo.',
    excerptEn:
      'Arts · film: Braveheart (1995) — Blind Harry’s legend and Wallace; Randall Wallace screenplay; Gibson directs and stars. Epic ≠ chronicle. Own sheet, distinct from The Passion of the Christ.',
    excerptEs:
      'Artes · cine: Braveheart / Coração Valente (1995) — leyenda de Blind Harry y Wallace; guion de Randall Wallace. Épica ≠ crónica. Ficha propia, distinta de A Paixão de Cristo.',
    slug: 'inspecao-filme-coracao-valente',
    date: '2026-08-18T07:10:00.000Z',
    seriesOrder: 55,
    seriesLabel: 'Coração Valente · Artes',
    coverImage: 'imagens/inspecoes/coracao-valente-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCoracaoValentePost, YT_ID };
