'use strict';

/**
 * Inspeções «Pessoas»: figuras cujo método de pesquisa / criação
 * (viagem, etnografia, plantas, povos, linguagem) informa o laboratório.
 * Série: pessoas-historia — tipagem no hub → 'pessoas'.
 *
 * Distinto de legado-pessoas (ecossistema canábico contemporâneo).
 * Método: biografia verificável → método → elo com /plantas/ e/ou série Palavras.
 */

function figuraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'pessoas-historia',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Pessoas',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildHerodotoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Her%C3%B3doto';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial e documental de **Heródoto de Halicarnasso** (c. 485–425 a.C.) — o grego a quem Cícero chamou «pai da história», autor das *Histórias*. O recorte BudGanja não é biografia escolar fechada: é recuperar o **método de pesquisa** (*historie* = investigação) — viagem, fontes orais, etnografia, geografia — e cruzá-lo com a palavra portuguesa **[passar](${passar})**: o que *se passou*, o *passar por* territórios e o tempo que *passa*.

> **Nota metodológica:** auditoria independente com base na [Wikipédia em português](${wiki}) e no consenso clássico sobre as *Histórias*. O elo com «passar» é **metodológico e linguístico** (série [Palavras](${palavras})), não uma citação grega da palavra portuguesa. Sem afiliação académica. Crédito da obra e das viagens pertence a Heródoto e à tradição que o transmitiu.

Esta ficha é o **modelo** da série **Pessoas** (distinta do [Legado](${legado}) canábico contemporâneo), com elo principal em **Palavras**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Heródoto** (Ἡρόδοτος / *Hēródotos*) |
| Origem | Halicarnasso (hoje Bodrum, Turquia), c. 485 a.C. |
| Morte | Túrios (sul de Itália), tradição c. 425 a.C. (outras datas em disputa) |
| Magnum opus | *Histórias* (depois divididas em 9 livros / musas) |
| Título clássico | «Pai da história» (Cícero, *De Legibus*) — no mesmo passo, Cícero critica as «histórias fabulosas» |
| Tipo BudGanja | Pessoa — método de pesquisa e elo com Palavras |
| Elo principal | [passar](${passar}) — verbo da passagem, do acontecido e da travessia |
| Fonte de partida | [Wikipédia · Heródoto](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Heródoto não é só a cronologia das Guerras Médicas — é ter transformado *historie* (pesquisa) no ofício de perguntar **o que se passou** entre povos e territórios.  
**H2:** viajar, ouvir e narrar é um modo de **passar por** (geografia) e de fazer o leitor **passar** o tempo da investigação.  
**H3:** a ficha [passar](${passar}) torna explícito o elo Pessoas × Palavras: a história clássica como laboratório do verbo da passagem.

Passos (repetíveis na série Pessoas):

1. Identificar a pessoa, datas e obra-âncora com fonte pública.  
2. Extrair o **método** (como pesquisava), não só o currículo.  
3. Escolher elo com [Palavras](${palavras}) e/ou \`/plantas/<slug>/\` — declarar se é histórico ou metodológico.  
4. Cruzar com Legado quando fizer sentido (por contraste ou continuidade).  
5. Status claro + fila.

## Quem foi (síntese verificável)

- Historiador e geógrafo grego; sucessor, na prosa sobre geografia/história, de linhas ligadas a Anaximandro e Hecateu de Mileto.  
- Viajou (com dúvidas pontuais sobre a extensão exacta) pelo Mediterrâneo, Egito, Oriente Próximo; valorizou **fontes orais**.  
- As *Histórias* narram a expansão aqueménida e o confronto com as cidades gregas, até às vitórias gregas de 479 a.C. — intercalando digressões sobre costumes e territórios.  
- Acusado desde a Antiguidade de inventar ou não criticar o suficiente o que ouviu; desde meados do séc. XX cresceu o respeito pelo rigor relativo e pelo pioneirismo em história, geografia, etnografia e antropologia.  
- Traduções modernas em português incluem edições UnB (Mario da Gama Kury), Edições 70 e Edipro (em curso).

## O método que interessa ao BudGanja

| Traço herodotiano | Tradução editorial | Elo com «passar» |
|-------------------|--------------------|------------------|
| *Historie* = pesquisa | Inspeção com hipóteses, fontes e status | O que **se passou** (acontecimento) |
| Viagem + testemunho | Ir às fontes; declarar o que não se viu | **Passar por** lugares e povos |
| Fontes orais | Crédito a tradição (com cautela) | O que **passa** de boca em boca |
| Digressão etnográfica | Costumes e natureza no mapa | Narrativa que **passa** de um tema a outro |
| Escala supra-local | Ligar palavra, pessoa e planta | Rede que **ultrapassa** a cidade-estado |

Heródoto não é o modelo de *peer review* moderno — é o ancestral da pergunta: **o que se passou, por onde se passou, e o que isso ainda faz passar no presente?**

## Elo com a palavra «passar»

| Pergunta | Resposta BudGanja |
|----------|-------------------|
| Heródoto escreveu em português a palavra «passar»? | **Não** — o elo é metodológico. |
| Por que cruzar os dois? | *Historie* = investigar o **passado** / o que **passou**; a viagem é **passar por**; a série Palavras inspeciona esse verbo. |
| Onde vive a ficha da palavra? | [Inspeção: passar](${passar}) |
| Tipo de elo | Pessoas × Palavras (metodológico) |

Leitura-síntese: Heródoto ensina a **perguntar pelo que passou**; a ficha [passar](${passar}) ensina a **abrir o verbo** — origem latina, sentidos no português, rede semântica.

## Avaliação BudGanja

### Forças desta ficha
- Abre a série **Pessoas** com método repetível e fronteira clara face ao [Legado](${legado}).  
- Cruza com [Palavras · passar](${passar}) sem anacronismo escondido.  
- Usa fonte pública canónica ([Wikipédia](${wiki})).

### Limites honestos
- Datas e locais de morte/viagem permanecem em disputa na tradição.  
- Não substitui edição comentada das *Histórias*.  
- O elo «passar» é editorial-linguístico, não filologia grega da palavra portuguesa.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Ficha da palavra | [passar](${passar}) |
| Hub Palavras | [Inspeções · Palavras](${palavras}) |
| Hub desta série | [Inspeções · Pessoas](${hub}) |
| Legado (outro eixo) | [Inspeções · Legado](${legado}) |
| Fonte externa | [Wikipédia · Heródoto](${wiki}) |

## Como repetir o método

1. Pessoa + obra-âncora + URL de partida.  
2. Três hipóteses sobre o **método** dela.  
3. Elo com \`inspecao-palavra-*\` e/ou \`/plantas/<slug>/\` — declarar tipo.  
4. Tabela de complementaridade + status.  
5. Enfileirar a próxima figura.

## Status

**Aprovado como ficha fundadora da série Pessoas** — Heródoto documentado pelo método de *historie*; elo principal com a palavra [passar](${passar}).

[▶ Pessoas](${hub}) · [▶ passar](${passar}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Herodotus of Halicarnassus** (c. 485–425 BCE) — author of the *Histories*. BudGanja focus: his **research method** (*historie* = inquiry) crossed with the Portuguese word **[passar](${passar})** (“to pass / what happened / to travel through”).

> **Method note:** based on [Portuguese Wikipedia](${wiki}). The link to “passar” is **methodological and linguistic**, not a Greek quote of the Portuguese verb.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Herodotus** |
| Magnum opus | *Histories* |
| Main link | [passar](${passar}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** value is asking **what happened** (*o que se passou*) across peoples and lands.  
**H2:** travel is **passar por**; oral tradition is what **passa** mouth to mouth.  
**H3:** People × Words — [passar](${passar}) makes the verb of passage explicit.

## Link to “passar”

Herodotus did not write Portuguese “passar”; the sheet inspects the verb that names passage, event and crossing. See [passar](${passar}).

## Status

**Approved as founding sheet of the People series** — primary link to [passar](${passar}).

[▶ People](${hub}) · [▶ passar](${passar}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial de **Heródoto de Halicarnaso** (c. 485–425 a.C.). Foco BudGanja: su **método de investigación** (*historie*) cruzado con la palabra portuguesa **[passar](${passar})** (pasar / lo ocurrido / atravesar).

> **Nota metodológica:** basada en [Wikipedia](${wiki}). El vínculo con «passar» es **metodológico y lingüístico**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Heródoto** |
| Obra | *Historias* |
| Enlace principal | [passar](${passar}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Enlace con «passar»

Heródoto no escribió el portugués «passar»; la ficha inspecciona el verbo de la pasada, el acontecimiento y la travesía. Ver [passar](${passar}).

## Estado

**Aprobada como ficha fundadora de Personas** — enlace principal con [passar](${passar}).

[▶ Personas](${hub}) · [▶ passar](${passar}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs };
}

function buildHerodotoPost() {
  const { body, contentEn, contentEs } = buildHerodotoBodies();
  return figuraPost({
    title: 'Inspeção: Heródoto — método da pesquisa e a palavra passar',
    titleEn: 'Inspection: Herodotus — research method and the word passar',
    titleEs: 'Inspección: Heródoto — método de investigación y la palabra passar',
    excerpt:
      'Ficha fundadora da série Pessoas: Heródoto de Halicarnasso, *historie* como investigação do que se passou — elo metodológico com a palavra «passar» na série Palavras.',
    excerptEn:
      'Founding sheet of the People series: Herodotus of Halicarnassus, *historie* as inquiry into what happened — methodological link to the Portuguese word “passar” in the Words series.',
    excerptEs:
      'Ficha fundadora de la serie Personas: Heródoto de Halicarnaso, *historie* como investigación de lo ocurrido — vínculo metodológico con la palabra «passar» en la serie Palabras.',
    slug: 'inspecao-figura-herodoto',
    date: '2026-08-01T06:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Heródoto · pessoa',
    coverImage: '/imagens/inspecoes/herodoto-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Her%C3%B3doto',
    body,
    contentEn,
    contentEs
  });
}

function buildDuvivierBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Greg%C3%B3rio_Duvivier';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';

  const body = `## Escopo

Inspeção editorial e documental de **Gregorio Byington Duvivier** (Rio de Janeiro, 11 de abril de 1986) — ator, humorista, letrólogo, roteirista e escritor. O recorte BudGanja não é ficha de celebridade: é recuperar o **método da palavra** — formação em Letras, poesia, crônica, sátira política (*Greg News*) e o espetáculo **O Céu da Língua** — e cruzá-lo com a série **[Palavras](${palavras})**, cujo modelo [maconha](${maconha}) inspeciona origem e transformação de vocábulos.

> **Nota metodológica:** auditoria independente com base na [Wikipédia em português](${wiki}). Sem afiliação com Porta dos Fundos, HBO/Max, Companhia das Letras ou qualquer marca. Crédito da obra e do humor pertence a Duvivier e aos coletivos/parceiros citados nas fontes. **Não é endosso político.**

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Gregorio Byington Duvivier** |
| Nascimento | 11 de abril de 1986, Rio de Janeiro |
| Formação | Letras — PUC-Rio |
| Ofícios | Ator, humorista, roteirista, poeta, cronista |
| Marcos de linguagem | Porta dos Fundos (2012–); *Greg News* (HBO, 2017–2024); *O Céu da Língua* (2024–); livros de poesia/crônica |
| Tipo BudGanja | Pessoa — método da palavra |
| Elo principal | Série [Palavras](${palavras}) · ficha [maconha](${maconha}) |
| Fonte de partida | [Wikipédia · Gregório Duvivier](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Duvivier não é o meme ou o clique — é tratar a **língua** como instrumento de pesquisa pública (poesia, crônica, sátira).  
**H2:** *O Céu da Língua* e a formação em Letras alinham-no ao mesmo eixo da série Palavras: **origem, uso e poder do vocábulo**.  
**H3:** cruzar Pessoas ↔ Palavras evita silos — a pessoa que trabalha com palavras e a ficha que inspeciona uma palavra ([maconha](${maconha})) iluminam-se mutuamente.

Passos (variante «elo com Palavras»):

1. Biografia verificável + obra-âncora de linguagem.  
2. Extrair o **método da palavra** (como escreve/performa/satiriza).  
3. Mapear registos: poesia · crônica · esquete · monólogo linguístico · sátira noticiosa.  
4. Elo obrigatório com \`#inspecoes-palavras\` e, quando couber, com uma ficha \`inspecao-palavra-*\`.  
5. Declarar limites (humor ≠ paper; sátira ≠ aconselhamento).  
6. Status + fila.

## Quem foi / o que faz (síntese)

- Carioca; filho de Edgar Duvivier e Olivia Byington; graduado em **Letras** (PUC-Rio).  
- Teatro desde os 9 anos (Tablado); stand-up *Z.É.* (2003+); monólogos e turnês.  
- Cofundador do **Porta dos Fundos** (2012) — roteiro e atuação em esquetes.  
- Apresentou **Greg News** (HBO, sete temporadas / ~170 episódios) — sátira política no formato *Last Week Tonight*.  
- Literatura: poesia (*A partir de amanhã…*, *Ligue os pontos*, *Sonetos…*), prosa humorística (*Put Some Farofa*), infantil, coluna na *Folha* (2013–2022).  
- Espetáculo **O Céu da Língua** — stand-up + poesia falada sobre a influência da linguagem na percepção do mundo; crítica descreveu como ode à língua portuguesa e ao poder da palavra. Ordem do Mérito Cultural (2025). Livro *Aos pés da letra* (2026) na esteira da peça.

## O método da palavra (o que interessa ao BudGanja)

| Traço | Tradução editorial |
|-------|-------------------|
| Formação em Letras | Vocabulário e forma não são acidentes — são ofício |
| Poesia e crônica | A palavra no papel: densidade, humor, registo culto/popular |
| Esquete / Porta dos Fundos | A palavra em cena curta — sentido social em minutos |
| *Greg News* | A palavra como **inspeção satírica** do noticiário (hipóteses + evidências + punch) |
| *O Céu da Língua* | A palavra como tema explícito — linguística acessível em palco |

Leitura-síntese: se [Heródoto](${herodoto}) ensina a perguntar **pelo que se passou**, Duvivier ensina a perguntar **pelo que a língua faz** — território da série Palavras.

## Elo com a série Palavras

| Recurso Palavras | Por que cruzar |
|------------------|----------------|
| Hub [Palavras](${palavras}) | Mesmo eixo: origem, uso, transformação e poder do vocábulo |
| [Maconha — origem e transformação](${maconha}) | Modelo da série: uma palavra brasileira, estigma, registos (popular / clínico / legal) — terreno em que humor e sátira também operam sentidos |
| Próximas fichas (ganja, diamba, cannabis) | Rede semântica que a cultura pop e a sátira atravessam sem sempre nomear a etimologia |

**Tipo de elo:** metodológico e temático (linguagem), não biográfico inventado — não afirmamos que Duvivier «fundou» a ficha maconha; afirmamos que o **laboratório da palavra** é o elo justo.

### Rede de registos (espelho da tabela semântica das Palavras)

| Registo | Em Duvivier | Em Palavras (ex.: maconha) |
|---------|-------------|----------------------------|
| Popular / rua | Esquete, gíria, punch | «maconha», erva |
| Literário | Poesia, soneto, crônica | História do vocábulo |
| Institucional / noticioso | *Greg News*, coluna | *cannabis* clínico-legal |
| Performático | *O Céu da Língua* | Inspeção que torna a etimologia legível |

## Avaliação BudGanja

### Forças
- Abre o braço contemporâneo da série **Pessoas** com elo claro a **Palavras**.  
- Fonte pública estável ([Wikipédia](${wiki})); obra de linguagem documentada (peça + livros).  
- Separa humor de endosso e de ciência.

### Limites
- Não inventaria todo o acervo Porta dos Fundos nem cada episódio de *Greg News*.  
- Não julga alinhamento político — só o método da palavra.  
- Controvérsias pontuais (ex.: pedido de desculpas pelo esquete «Travesti», 2015) ficam registadas na fonte; não são o centro desta ficha.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Hub Pessoas | [Inspeções · Pessoas](${hub}) |
| Hub Palavras | [Inspeções · Palavras](${palavras}) |
| Ficha-modelo Palavras | [Maconha](${maconha}) |
| Pessoa × Palavras (passar) | [Heródoto](${herodoto}) |
| Legado (outro eixo) | [Inspeções · Legado](${legado}) |
| Fonte | [Wikipédia · Gregório Duvivier](${wiki}) |

## Como repetir o método

1. Pessoa contemporânea ou histórica com **ofício de linguagem** explícito.  
2. Três hipóteses sobre o método da palavra.  
3. Tabela de registos (popular / literário / institucional / performático).  
4. Elo com [Palavras](${palavras}) + 1 ficha \`inspecao-palavra-*\` quando existir.  
5. Status claro.

## Status

**Aprovado na série Pessoas** — Duvivier documentado pelo método da palavra; elo principal com [Palavras](${palavras}) e a ficha [maconha](${maconha}).

[▶ Pessoas](${hub}) · [▶ Palavras](${palavras}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Gregorio Duvivier** (Rio de Janeiro, 11 April 1986) — actor, comedian, writer, Literature graduate. BudGanja focus: his **method of the word** — poetry, satire (*Greg News*), and the show **O Céu da Língua** — crossed with the **[Words](${palavras})** series and the model sheet [maconha](${maconha}).

> **Method note:** based on [Portuguese Wikipedia](${wiki}). No affiliation. **Not a political endorsement.**

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Gregorio Byington Duvivier** |
| Training | Literature — PUC-Rio |
| Language landmarks | Porta dos Fundos; *Greg News*; *O Céu da Língua*; poetry/chronicle books |
| Main link | [Words](${palavras}) · [maconha](${maconha}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** value is treating language as public inquiry, not celebrity.  
**H2:** *O Céu da Língua* + Literature degree align him with the Words series.  
**H3:** People ↔ Words cross-links avoid silos.

## Method of the word

Literature training · poetry/chronicle · sketch comedy · satirical news (*Greg News*) · stage linguistics (*O Céu da Língua*). If [Herodotus](${herodoto}) asks **what happened** (*passar*), Duvivier asks **what language does** — the Words territory.

## Link to Words

Hub [Words](${palavras}) and sheet [maconha](${maconha}) (origin, stigma, registers). Link type: methodological/thematic — not a fabricated biography claim.

## Status

**Approved in the People series** — primary link to Words / maconha.

[▶ People](${hub}) · [▶ Words](${palavras}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial de **Gregorio Duvivier** (Río de Janeiro, 11 de abril de 1986) — actor, humorista, escritor, graduado en Letras. Foco BudGanja: su **método de la palabra** — poesía, sátira (*Greg News*) y el espectáculo **O Céu da Língua** — cruzado con la serie **[Palabras](${palavras})** y la ficha [maconha](${maconha}).

> **Nota metodológica:** basada en la [Wikipedia en portugués](${wiki}). Sin afiliación. **No es respaldo político.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Gregorio Byington Duvivier** |
| Formación | Letras — PUC-Rio |
| Hitos de lenguaje | Porta dos Fundos; *Greg News*; *O Céu da Língua*; poesía/crónica |
| Enlace principal | [Palabras](${palavras}) · [maconha](${maconha}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Método de la palabra

Formación en Letras · poesía/crónica · sketch · noticia satírica · lingüística en escena. Si [Heródoto](${herodoto}) pregunta por **lo ocurrido** (*passar*), Duvivier pregunta **qué hace la lengua**.

## Enlace con Palabras

Hub [Palabras](${palavras}) y ficha [maconha](${maconha}). Tipo de enlace: metodológico/temático.

## Estado

**Aprobado en la serie Personas** — enlace principal con Palabras / maconha.

[▶ Personas](${hub}) · [▶ Palabras](${palavras}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs };
}

function buildDuvivierPost() {
  const { body, contentEn, contentEs } = buildDuvivierBodies();
  return figuraPost({
    title: 'Inspeção: Gregorio Duvivier — o método da palavra e a série Palavras',
    titleEn: 'Inspection: Gregorio Duvivier — the method of the word and the Words series',
    titleEs: 'Inspección: Gregorio Duvivier — el método de la palabra y la serie Palabras',
    excerpt:
      'Pessoas × Palavras: Gregorio Duvivier (Letras, poesia, Greg News, O Céu da Língua) — o ofício da linguagem cruzado com a ficha maconha e o hub de vocábulos.',
    excerptEn:
      'People × Words: Gregorio Duvivier (Literature, poetry, Greg News, O Céu da Língua) — language craft crossed with the maconha sheet and the Words hub.',
    excerptEs:
      'Personas × Palabras: Gregorio Duvivier (Letras, poesía, Greg News, O Céu da Língua) — el oficio del lenguaje cruzado con la ficha maconha y el hub de vocablos.',
    slug: 'inspecao-figura-duvivier',
    date: '2026-08-01T07:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Duvivier · pessoa',
    coverImage: '/imagens/inspecoes/duvivier-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Greg%C3%B3rio_Duvivier',
    body,
    contentEn,
    contentEs
  });
}

function buildChoraoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Chor%C3%A3o_(cantor)';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const planta = '/plantas/cannabis-sativa/';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';

  const body = `## Escopo

Inspeção editorial e documental de **Chorão** — nome artístico de **Alexandre Magno Abrão** (São Paulo, 9 de abril de 1970 — São Paulo, 6 de março de 2013). Vocalista, **principal letrista** e cofundador do **Charlie Brown Jr.** O recorte BudGanja não é hagiografia de rockstar: é recuperar o **método da palavra na rua** — letra como poesia urbana, gíria, skate e mistura de géneros — e cruzá-lo com a série **[Palavras](${palavras})**, sobretudo a ficha **[maconha](${maconha})** (vocábulo, estigma e registos no Brasil).

> **Nota metodológica:** auditoria independente com base na [Wikipédia · Chorão (cantor)](${wiki}). Sem afiliação com a banda, gravadoras ou marcas do artista. **Não romantiza dependência nem overdose.** A morte por overdose de cocaína (2013) regista-se como facto biográfico; o foco editorial é o **ofício de letrista**. Crédito das canções e do legado musical pertence a Chorão e aos demais integrantes citados nas fontes.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Alexandre Magno Abrão** |
| Nome artístico | **Chorão** |
| Nascimento / morte | 9 abr. 1970 (SP) — 6 mar. 2013 (SP), 42 anos |
| Banda | Charlie Brown Jr. (Santos, 1992–2013) — único em todas as formações |
| Ofício BudGanja | Principal letrista / voz — método da palavra urbana |
| Marcos | Dez discos de estúdio; >5 milhões de cópias; filme *O Magnata* (roteiro, 2007) |
| Influências citadas | Raimundos, Nirvana, RHCP, Nação Zumbi, **Planet Hemp**, entre outras |
| Tipo BudGanja | Pessoa — método da palavra |
| Elo principal | [Palavras](${palavras}) · [maconha](${maconha}) |
| Elo botânico (secundário) | [Cannabis sativa](${planta}) — catálogo; não confundir obra com endosso de uso |
| Fonte | [Wikipédia · Chorão](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Chorão é a **letra** — traduzir angústia, liberdade, amizade e rua em português popular que viram refrão nacional.  
**H2:** a geração CBJr dialoga com o mesmo território lexical da série Palavras (registo popular vs estigma vs cultura); Planet Hemp aparece nas influências — ponte cultural, não biografia clínica.  
**H3:** cruzar Chorão ↔ [maconha](${maconha}) inspeciona **como a palavra vive na cultura**, sem transformar a ficha em apologia nem em moralismo.

Passos (variante «letrista / Palavras»):

1. Biografia verificável + papel de letrista.  
2. Extrair o método da palavra (gíria, refrão, mistura rap/rock/reggae).  
3. Tabela de registos (rua · palco · disco · memória póstuma).  
4. Elo com Palavras + ficha maconha; link opcional à [planta](${planta}).  
5. Declarar limites (overdose, dependência — facto, não centro).  
6. Status.

## Quem foi (síntese verificável)

- Paulistano radicado em Santos; infância/adolescência difíceis; skate como eixo cultural.  
- Cofunda o Charlie Brown Jr. em 1992 com Champignon, Renato Pelado, Marcão Britto e Thiago Castanho.  
- Nome da banda: barraca de água de coco com o desenho do Charlie Brown + «Jr.» por serem «filhos do rock» (citação atribuída a Chorão na fonte).  
- Estreia de impacto: *Transpiração Contínua Prolongada* (1997) — faixas como «Proibida pra Mim», «O Côro Vai Comê!».  
- Discografia: dez álbuns de estúdio; sonoridade skate punk / rap rock / reggae / hardcore.  
- Também skatista, roteirista (*O Magnata*), empresário de marcas de roupa.  
- Morte em 6 de março de 2013, overdose de cocaína — facto público; a inspeção não especula além da fonte.

## O método da palavra (o que interessa ao BudGanja)

| Traço | Tradução editorial |
|-------|-------------------|
| Letra como ofício principal | A palavra antecede o mito do frontman |
| Português de rua + refrão | Vocabulário popular que circula — objecto da série Palavras |
| Mistura de géneros | Rap, reggae, hardcore: a língua muda de ritmo sem perder o sentido |
| Poesia urbana | Angústia / luta / glória — frases que viram memória colectiva |
| Influência Planet Hemp (entre outras) | Diálogo com a cultura canábica na música BR dos 90 — elo cultural com [maconha](${maconha}) / [planta](${planta}) |

Se [Duvivier](${duvivier}) inspeciona a palavra no palco e na sátira, Chorão inspeciona a palavra no **skate, no refrão e na periferia simbólica** do rock brasileiro.

## Elo com a série Palavras

| Recurso | Por que cruzar |
|---------|----------------|
| Hub [Palavras](${palavras}) | Mesmo eixo: uso, transformação e poder do vocábulo |
| [Maconha — origem e transformação](${maconha}) | Palavra brasileira com estigma e registos múltiplos — terreno que a cultura musical dos 90/2000 atravessa |
| [Cannabis sativa](${planta}) | Ficha botânica do catálogo — outro eixo; não substitui a análise da letra |

**Tipo de elo:** metodológico e cultural (linguagem / cultura urbana). Não afirmamos que cada canção «seja sobre» a palavra maconha; afirmamos que o laboratório da palavra é o elo justo.

### Rede de registos

| Registo | Em Chorão / CBJr | Em Palavras (ex.: maconha) |
|---------|------------------|----------------------------|
| Rua / skate | Gíria, atitude, letra falada | «maconha», erva — fala corrente |
| Disco / rádio | Refrão nacional | Circulação do vocábulo na cultura |
| Influência | Planet Hemp na genealogia citada | Rede semântica canábica |
| Memória | Frases que ficaram após 2013 | História do sentido social da palavra |

## Avaliação BudGanja

### Forças
- Continua o braço **Pessoas × Palavras** com um letrista central do rock BR.  
- Fonte pública estável; papel de letrista inequívoco.  
- Separa legado lírico de romantização da overdose.

### Limites
- Não inventaria o catálogo completo de letras/álbuns.  
- Não faz análise literária verso a verso.  
- Dependência e morte: registadas; não são o objecto da série.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Hub Pessoas | [Inspeções · Pessoas](${hub}) |
| Hub Palavras | [Inspeções · Palavras](${palavras}) |
| Ficha-modelo Palavras | [Maconha](${maconha}) |
| Planta (secundário) | [Cannabis sativa](${planta}) |
| Outra Pessoa × Palavras | [Gregorio Duvivier](${duvivier}) |
| Pessoa × passar | [Heródoto](${herodoto}) |
| Legado (outro eixo) | [Inspeções · Legado](${legado}) |
| Fonte | [Wikipédia · Chorão](${wiki}) |

## Como repetir o método

1. Pessoa com ofício explícito de **letra / poesia / voz**.  
2. Três hipóteses sobre o método da palavra.  
3. Tabela de registos (rua · palco · disco · memória).  
4. Elo com [Palavras](${palavras}) + ficha \`inspecao-palavra-*\`.  
5. Se houver droga na biografia: facto + limite — sem centro moralista.  
6. Status.

## Status

**Aprovado na série Pessoas** — Chorão documentado como letrista; elo principal com [Palavras](${palavras}) / [maconha](${maconha}).

[▶ Pessoas](${hub}) · [▶ Palavras](${palavras}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Chorão** (Alexandre Magno Abrão, 1970–2013) — lead vocalist and **main lyricist** of **Charlie Brown Jr.** BudGanja focus: the **urban method of the word** — street Portuguese, refrains, skate culture — crossed with **[Words](${palavras})** and the sheet **[maconha](${maconha})**.

> **Method note:** based on [Wikipedia](${wiki}). **Does not romanticize addiction or overdose.** Focus is lyric craft.

## Inspected object

| Field | Value |
|-------|-------|
| Civil name | Alexandre Magno Abrão |
| Stage name | Chorão |
| Band | Charlie Brown Jr. (1992–2013) |
| Main link | [Words](${palavras}) · [maconha](${maconha}) |
| Secondary | [Cannabis sativa](${planta}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** BudGanja value is the lyric — popular Portuguese that became national memory.  
**H2:** CBJr’s generation shares lexical territory with the Words series; Planet Hemp appears among cited influences.  
**H3:** Chorão ↔ maconha inspects how the word lives in culture — neither apology nor moralism.

## Method of the word

Lyric as primary craft · street register + refrain · genre blend (rap/rock/reggae) · urban poetry. If [Duvivier](${duvivier}) works language on stage/satire, Chorão works it in skate and Brazilian rock refrains.

## Status

**Approved in the People series** — primary link to Words / maconha.

[▶ People](${hub}) · [▶ Words](${palavras}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial de **Chorão** (Alexandre Magno Abrão, 1970–2013) — vocalista y **letrista principal** de **Charlie Brown Jr.** Foco BudGanja: el **método urbano de la palabra** — portugués callejero, estribillos, cultura skate — cruzado con **[Palabras](${palavras})** y la ficha **[maconha](${maconha})**.

> **Nota metodológica:** basada en [Wikipedia](${wiki}). **No romantiza la adicción ni la overdose.** El foco es el oficio de letrista.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | Alexandre Magno Abrão / Chorão |
| Banda | Charlie Brown Jr. (1992–2013) |
| Enlace principal | [Palabras](${palavras}) · [maconha](${maconha}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Método de la palabra

Letra como oficio · registro callejero · fusión de géneros · poesía urbana. Influencia citada: Planet Hemp, entre otras — puente cultural con [maconha](${maconha}).

## Estado

**Aprobado en la serie Personas** — enlace principal con Palabras / maconha.

[▶ Personas](${hub}) · [▶ Palabras](${palavras}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs };
}

function buildChoraoPost() {
  const { body, contentEn, contentEs } = buildChoraoBodies();
  return figuraPost({
    title: 'Inspeção: Chorão — letra urbana, Charlie Brown Jr. e a série Palavras',
    titleEn: 'Inspection: Chorão — urban lyrics, Charlie Brown Jr. and the Words series',
    titleEs: 'Inspección: Chorão — letra urbana, Charlie Brown Jr. y la serie Palabras',
    excerpt:
      'Pessoas × Palavras: Chorão (Alexandre Magno Abrão), letrista do Charlie Brown Jr. — poesia urbana, gíria e refrão cruzados com a ficha maconha e o hub de vocábulos.',
    excerptEn:
      'People × Words: Chorão (Alexandre Magno Abrão), Charlie Brown Jr. lyricist — urban poetry, slang and refrains crossed with the maconha sheet and the Words hub.',
    excerptEs:
      'Personas × Palabras: Chorão (Alexandre Magno Abrão), letrista de Charlie Brown Jr. — poesía urbana, jerga y estribillos cruzados con la ficha maconha y el hub de vocablos.',
    slug: 'inspecao-figura-chorao',
    date: '2026-08-01T08:00:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Chorão · pessoa',
    coverImage: '/imagens/inspecoes/chorao-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Chor%C3%A3o_(cantor)',
    body,
    contentEn,
    contentEs
  });
}

function buildKeanuReevesBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Keanu_Reeves';
  const wikiEn = 'https://en.wikipedia.org/wiki/Keanu_Reeves';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial e documental de **Keanu Charles Reeves** (n. 1964) — actor canadiano cuja carreira cruza *blockbuster*, cinema de género e presença física disciplinada. O recorte BudGanja **não** é crítica de um único filme: é a **pessoa e o método actoral** — com elo principal na obra [The Matrix](${matrix}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipédia (PT)](${wiki}) e [Wikipedia (EN)](${wikiEn}). Sem afiliação com o actor, agentes ou estúdios. Distinto do [Legado](${legado}) canábico contemporâneo. A ficha de *Matrix* inspeciona o **filme**; aqui inspeciona-se o **ofício** de quem interpretou Neo.

Esta ficha é o elo **Pessoas × Artes (cinema)** — par da inspeção [The Matrix](${matrix}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Keanu Charles Reeves** |
| Nascimento | 2 set. 1964, Beirute (Líbano); criado no Canadá |
| Nacionalidade | Canadiana |
| Ofícios | Actor · ocasionalmente músico / produtor |
| Obra-âncora BudGanja | [The Matrix](${matrix}) (1999) — Neo |
| Outras marcas públicas | *Bill & Ted*, *Speed*, *John Wick* (franquia) — contexto de carreira, não fichas Artes |
| Tipo BudGanja | Pessoa — método actoral e elo com Artes |
| Elo principal | [The Matrix](${matrix}) — cinema (série Artes) |
| Fonte de partida | [Wikipédia · Keanu Reeves](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Reeves não é fandom: é um **método de presença** — economia de gesto, treino físico e longeviedade em géneros de acção/ficção.  
**H2:** [The Matrix](${matrix}) é o **elo de obra** que liga Pessoas a Artes; não se duplica aqui a tese da simulação.  
**H3:** a série Pessoas acolhe figuras cujo ofício informa o laboratório; Reeves ilustra **disciplina de corpo e ecrã** — distinto do Legado académico/canábico.

Passos (variante «actor × filme»):

1. Identificar a pessoa, datas e fonte pública.  
2. Extrair o **método** (como trabalha), não só a filmografia.  
3. Escolher **uma** obra Artes como elo principal ([Matrix](${matrix})).  
4. Declarar contraste com [Legado](${legado}) quando útil.  
5. Status.

## Quem foi / é (síntese verificável)

- Nascido em Beirute; infância e formação no Canadá (Toronto); carreira iniciada no teatro/TV canadianas antes de Hollywood.  
- Anos 80/90: *Bill & Ted*, *Point Break*, *Speed* — registos de presença jovem e *action*.  
- 1999: Neo em *The Matrix* — marco global de imagem e de treino marcial para cinema.  
- Décadas seguintes: regressos (*Matrix Reloaded* / *Revolutions* / *Resurrections*) e reinvenção em *John Wick* (coreografia de armas / movimento).  
- Reputação pública de discreção e solidariedade com equipas técnicas (relatos de imprensa; tratar como contexto, não hagiografia).

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Presença contida | Menos discurso, mais corpo e olhar — «mostrar» em vez de «explicar» |
| Treino físico | Preparação repetível (artes marciais, armas de cena) — método antes do take |
| Longevidade em género | Revisitar personagens (Neo, Wick) com disciplina, não só nostalgia |
| Separar pessoa / personagem | Neo ≠ Keanu — obra em Artes, ofício em Pessoas |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [The Matrix](${matrix}) | Obra cinematográfica — simulação, escolha, verificação |
| Hub [Artes](${artes}) | Filmes e outras obras; não confundir com biografia |

> Abrir primeiro [The Matrix](${matrix}) se o interesse for a **tese do filme**; esta ficha se o interesse for o **actor**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Cruzar a disciplina de «ver por si» (Matrix) com o método das inspeções.  
- Não inventariar toda a filmografia: uma obra-âncora basta para o elo.

## Como repetir o método

1. Pessoa + fonte wiki.  
2. Método (como cria), não só CV.  
3. Um elo Artes (filme/série/canção) com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — Keanu Reeves documentado com elo principal em [The Matrix](${matrix}) (Artes).

[▶ Pessoas](${hub}) · [▶ The Matrix](${matrix}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Keanu Charles Reeves** (b. 1964) — Canadian actor. Focus is the **person and acting craft**, with primary link to [The Matrix](${matrix}) (Arts series) — **not** a full film review of Matrix alone.

> **Method note:** independent audit from [Wikipedia](${wikiEn}). No affiliation. Distinct from cannabis Legacy. The Matrix sheet covers the **film**; this sheet covers the **craft** of the actor who played Neo.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Keanu Charles Reeves** |
| Born | 2 Sep 1964, Beirut; raised in Canada |
| BudGanja anchor work | [The Matrix](${matrix}) (1999) — Neo |
| Other public marks | *Bill & Ted*, *Speed*, *John Wick* — career context |
| BudGanja type | Person — acting method × Arts link |
| Date | ${inspected} |

## Hypotheses

**H1:** value is a **method of presence** — economy of gesture, physical training, longevity in action/genre.  
**H2:** [The Matrix](${matrix}) is the Arts link; simulation thesis stays on that sheet.  
**H3:** People series hosts figures whose craft informs the lab — not Legacy cannabis.

## Who (verifiable sketch)

Born Beirut; raised Canada; path through Canadian TV/theatre to Hollywood. 1990s landmarks (*Bill & Ted*, *Speed*); 1999 Neo in *The Matrix*; later *John Wick* reinvention. Public reputation for discretion — context, not hagiography.

## Method for BudGanja

| Trait | Editorial gloss |
|-------|-----------------|
| Contained presence | Show more than explain |
| Physical training | Repeatable prep before the take |
| Person ≠ character | Neo in Arts; Keanu in People |

## Status

**Approved in the People series** — primary Arts link [The Matrix](${matrix}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Keanu Charles Reeves** (n. 1964) — actor canadiense. El recorte es la **persona y el oficio actoral**, con vínculo principal en [The Matrix](${matrix}) (serie Artes) — **no** una crítica completa del filme sola.

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wikiEn})). Sin afiliación. Distinto del Legado cannábico. La ficha de Matrix inspecciona el **filme**; aquí, el **oficio** de quien interpretó a Neo.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Keanu Charles Reeves** |
| Nacimiento | 2 sep. 1964, Beirut; criado en Canadá |
| Obra ancla | [The Matrix](${matrix}) (1999) — Neo |
| Tipo BudGanja | Persona — método actoral × Artes |
| Fecha | ${inspected} |

## Hipótesis

**H1:** valor = **método de presencia** (gesto, entrenamiento, longevidad).  
**H2:** [The Matrix](${matrix}) es el vínculo Artes; la tesis de la simulación queda en esa ficha.  
**H3:** Personas ≠ Legado cannábico.

## Estado

**Aprobado en la serie Personas** — vínculo principal [The Matrix](${matrix}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildKeanuReevesPost() {
  const { body, contentEn, contentEs, wiki } = buildKeanuReevesBodies();
  return figuraPost({
    title: 'Inspeção: Keanu Reeves — presença, treino e elo com The Matrix',
    titleEn: 'Inspection: Keanu Reeves — presence, training and link to The Matrix',
    titleEs: 'Inspección: Keanu Reeves — presencia, entrenamiento y vínculo con The Matrix',
    excerpt:
      'Pessoas × Artes: Keanu Reeves — método actoral e presença física, com elo principal no filme The Matrix (1999); distinto do Legado canábico.',
    excerptEn:
      'People × Arts: Keanu Reeves — acting craft and physical presence, with primary link to The Matrix (1999); distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: Keanu Reeves — oficio actoral y presencia física, con vínculo principal en The Matrix (1999); distinto del Legado cannábico.',
    slug: 'inspecao-figura-keanu-reeves',
    date: '2026-08-01T16:15:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'Keanu Reeves · pessoa',
    coverImage: '/imagens/inspecoes/keanu-reeves-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

const PESSOAS_HISTORIA_INSPECOES_POSTS = [
  buildHerodotoPost(),
  buildDuvivierPost(),
  buildChoraoPost(),
  buildKeanuReevesPost()
];

module.exports = {
  PESSOAS_HISTORIA_INSPECOES_POSTS,
  buildHerodotoPost,
  buildHerodotoBodies,
  buildDuvivierPost,
  buildDuvivierBodies,
  buildChoraoPost,
  buildChoraoBodies,
  buildKeanuReevesPost,
  buildKeanuReevesBodies
};
