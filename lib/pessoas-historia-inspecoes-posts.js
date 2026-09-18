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
- Literatura: poesia (*A partir de amanhã…*, *Ligue os pontos*, *Sonetos…*), prosa humorística (*Put Some Farofa*), coluna na *Folha* (2013–2022).  
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
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const magnata = '/posts/post-inspecao-filme-o-magnata.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';

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
| Marcos | Dez discos de estúdio; >5 milhões de cópias; filme [*O Magnata*](${magnata}) (roteiro, 2007) |
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
- Também skatista, roteirista ([*O Magnata*](${magnata})), empresário de marcas de roupa.  
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

## Frases anotadas — positividade nos dias de luta

Citação breve (crítica editorial) de *Só os Loucos Sabem* (2009). Anotação completa na ficha Artes: [Só os Loucos Sabem](${loucos}). **Não reproduzir a letra completa.**

> «Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.»

| Frase | Em uma linha |
|-------|----------------|
| **Toda positividade** | Ânimo inteiro — desejo, não propaganda |
| **eu desejo a você** | [Gesto](${gesto}) de oferta ao outro |
| **Pois precisamos disso** | Necessidade do «nós» |
| **nos dias de luta** | Tempo duro; o [medo](${medo}) não pode cegar o sonho |

## Elo com a série Palavras

| Recurso | Por que cruzar |
|---------|----------------|
| Hub [Palavras](${palavras}) | Mesmo eixo: uso, transformação e poder do vocábulo |
| [Maconha — origem e transformação](${maconha}) | Palavra brasileira com estigma e registos múltiplos — terreno que a cultura musical dos 90/2000 atravessa |
| [Só os Loucos Sabem](${loucos}) | Artes — frases anotadas (positividade / dias de luta) |
| [*O Magnata*](${magnata}) | Artes — o longa de 2007 (roteiro); **obra ≠ esta ficha** |
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
| Artes — frases | [Só os Loucos Sabem](${loucos}) |
| Artes — cinema | [*O Magnata*](${magnata}) (2007) |
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

**Aprovado na série Pessoas** — Chorão documentado como letrista; elo principal com [Palavras](${palavras}) / [maconha](${maconha}); frases de luta anotadas em [Só os Loucos Sabem](${loucos}); cinema em [*O Magnata*](${magnata}).

[▶ Pessoas](${hub}) · [▶ Palavras](${palavras}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ O Magnata](${magnata}) · [Wikipédia](${wiki})
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

## Annotated phrases

Short quote from *Só os Loucos Sabem* (2009) — full notes on [Só os Loucos Sabem](${loucos}):

> “Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.”

Positivity · offering gesture · collective need · days of struggle.

## Status

**Approved in the People series** — primary link to Words / maconha; struggle phrases on [Só os Loucos Sabem](${loucos}); film on [*O Magnata*](${magnata}).

[▶ People](${hub}) · [▶ Words](${palavras}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ O Magnata](${magnata}) · [Wikipedia](${wiki})
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

## Frases anotadas

Cita breve de *Só os Loucos Sabem* (2009) — notas en [Só os Loucos Sabem](${loucos}):

> «Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.»

Positividad · gesto de oferta · necesidad colectiva · días de lucha.

## Estado

**Aprobado en la serie Personas** — enlace principal con Palabras / maconha; frases de lucha en [Só os Loucos Sabem](${loucos}); cine en [*O Magnata*](${magnata}).

[▶ Personas](${hub}) · [▶ Palabras](${palavras}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ O Magnata](${magnata}) · [Wikipedia](${wiki})
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

function buildJosteinGaarderBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Jostein_Gaarder';
  const wikiEn = 'https://en.wikipedia.org/wiki/Jostein_Gaarder';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const passar = '/posts/post-inspecao-palavra-passar.html';

  const body = `## Escopo

Inspeção editorial e documental de **Jostein Gaarder** (n. 1952) — escritor e professor de filosofia norueguês. O recorte BudGanja **não** é inventário de toda a obra: é a **pessoa e o método** de ensinar filosofia pela narrativa — com elo principal no livro [O Dia do Curinga](${curinga}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipédia (PT)](${wiki}) e [Wikipedia (EN)](${wikiEn}). Sem afiliação com o autor ou editoras. Distinto do [Legado](${legado}) canábico. A ficha de *O Dia do Curinga* inspeciona o **livro**; aqui inspeciona-se o **ofício** de quem o escreveu. *O Mundo de Sofia* (1991) é contexto de carreira, não ficha Artes nesta entrega.

Esta ficha é o elo **Pessoas × Artes (literatura)** — par da inspeção [O Dia do Curinga](${curinga}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Jostein Gaarder** |
| Nascimento | 8 ago. 1952, Oslo, Noruega |
| Ofícios | Escritor · professor de filosofia |
| Formação | Universidade de Oslo (línguas escandinavas e teologia) |
| Obra-âncora BudGanja | [O Dia do Curinga](${curinga}) (*Kabalmysteriet*, 1990) |
| Outra marca pública | *O Mundo de Sofia* (1991) — sucesso global; contexto, não ficha Artes aqui |
| Tipo BudGanja | Pessoa — método filosófico-narrativo × Artes |
| Elo principal | [O Dia do Curinga](${curinga}) — literatura (série Artes) |
| Fonte de partida | [Wikipédia · Jostein Gaarder](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Gaarder é um **método de iniciação**: metaficção e olhar de curiosidade para fazer o leitor **perguntar**.  
**H2:** [O Dia do Curinga](${curinga}) é o **elo de obra**; a tese do Curinga fica na ficha Artes.  
**H3:** Pessoas acolhe quem informa o laboratório pelo ofício — distinto do Legado canábico.

Passos (variante «autor × livro»):

1. Identificar a pessoa, datas e fonte pública.  
2. Extrair o **método** (como escreve / ensina), não só a bibliografia.  
3. Escolher **uma** obra Artes como elo principal ([O Dia do Curinga](${curinga})).  
4. Contraste com [Legado](${legado}) quando útil.  
5. Status.

## Quem foi / é (síntese verificável)

- Nascido em Oslo (1952); pais ligados à escola e à literatura (contexto wiki).  
- Estudos em Oslo; casamento com Siri Dannevig; período em Bergen; professor no ensino secundário (Fana).  
- Estreia literária em 1986; *Kabalmysteriet* / *O Dia do Curinga* em **1990**.  
- 1991: *O Mundo de Sofia* — tradução massiva e renome internacional; a partir de c. 1993 dedica-se à escrita a tempo inteiro (registo wiki).  
- Estilo recorrente: perspectiva jovem, histórias dentro de histórias, filosofia acessível.

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Filosofia narrada | Ensina perguntando através da trama — não só tratado |
| Metaficção | Camadas de relato (como o livrinho no pão) — auditar o que se conta |
| Olhar juvenil | Curiosidade como motor — alinhada à inspeção |
| Separar pessoa / obra | Gaarder ≠ Curinga — ofício em Pessoas, livro em Artes |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [O Dia do Curinga](${curinga}) | Obra literária — pergunta, viagem, metáforas |
| Hub [Artes](${artes}) | Livros e outras obras; não confundir com biografia |
| [passar](${passar}) | Palavras — travessia (elo via a obra) |

> Abrir primeiro [O Dia do Curinga](${curinga}) se o interesse for a **tese do livro**; esta ficha se o interesse for o **autor**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Cruzar o hábito de «não acomodar a pergunta» com o método das inspeções.  
- Não inventariar toda a bibliografia: uma obra-âncora basta para o elo.

## Como repetir o método

1. Pessoa + fonte wiki.  
2. Método (como cria), não só CV.  
3. Um elo Artes (livro/filme) com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — Jostein Gaarder documentado com elo principal em [O Dia do Curinga](${curinga}) (Artes).

[▶ Pessoas](${hub}) · [▶ O Dia do Curinga](${curinga}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Jostein Gaarder** (b. 1952) — Norwegian writer and philosophy teacher. Focus is the **person and method** of teaching philosophy through narrative, with primary link to [The Solitaire Mystery / O Dia do Curinga](${curinga}) (Arts) — **not** a full bibliography.

> **Method note:** independent audit from [Wikipedia](${wikiEn}). No affiliation. Distinct from cannabis Legacy. The Curinga sheet covers the **book**; this sheet covers the **craft** of the author.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Jostein Gaarder** |
| Born | 8 Aug 1952, Oslo |
| BudGanja anchor work | [O Dia do Curinga](${curinga}) (1990) |
| Other public mark | *Sophie’s World* (1991) — career context |
| BudGanja type | Person — philosophical-narrative method × Arts |
| Date | ${inspected} |

## Hypotheses

**H1:** value is a **method of initiation** — metafiction and a young gaze that makes readers ask.  
**H2:** [O Dia do Curinga](${curinga}) is the Arts link; Joker thesis stays there.  
**H3:** People ≠ Legacy cannabis.

## Method for BudGanja

| Trait | Gloss |
|-------|-------|
| Philosophy narrated | Teach by asking through plot |
| Metafiction | Layers of story — audit what is told |
| Person ≠ work | Gaarder in People; book in Arts |

## Status

**Approved in the People series** — primary Arts link [O Dia do Curinga](${curinga}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Jostein Gaarder** (n. 1952) — escritor y profesor de filosofía noruego. El recorte es la **persona y el método** de enseñar filosofía por la narrativa, con vínculo principal en [O Dia do Curinga](${curinga}) (Artes).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wikiEn})). Sin afiliación. Distinto del Legado cannábico. La ficha del Curinga inspecciona el **libro**; aquí, el **oficio** del autor.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Jostein Gaarder** |
| Nacimiento | 8 ago. 1952, Oslo |
| Obra ancla | [O Dia do Curinga](${curinga}) (1990) |
| Tipo BudGanja | Persona — método filosófico-narrativo × Artes |
| Fecha | ${inspected} |

## Hipótesis

**H1:** valor = **método de iniciación** (metaficción, mirada joven).  
**H2:** [O Dia do Curinga](${curinga}) es el vínculo Artes.  
**H3:** Personas ≠ Legado cannábico.

## Estado

**Aprobado en la serie Personas** — vínculo principal [O Dia do Curinga](${curinga}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildJosteinGaarderPost() {
  const { body, contentEn, contentEs, wiki } = buildJosteinGaarderBodies();
  return figuraPost({
    title:
      'Inspeção: Jostein Gaarder — filosofia narrada e elo com O Dia do Curinga',
    titleEn:
      'Inspection: Jostein Gaarder — narrated philosophy and link to The Solitaire Mystery',
    titleEs:
      'Inspección: Jostein Gaarder — filosofía narrada y vínculo con O Dia do Curinga',
    excerpt:
      'Pessoas × Artes: Jostein Gaarder — método de ensinar filosofia pela narrativa, com elo principal no livro O Dia do Curinga (1990); distinto do Legado canábico.',
    excerptEn:
      'People × Arts: Jostein Gaarder — teaching philosophy through narrative, with primary link to The Solitaire Mystery (1990); distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: Jostein Gaarder — método de enseñar filosofía por la narrativa, con vínculo principal en O Dia do Curinga (1990); distinto del Legado cannábico.',
    slug: 'inspecao-figura-jostein-gaarder',
    date: '2026-08-01T19:15:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'Jostein Gaarder · pessoa',
    coverImage: 'imagens/inspecoes/jostein-gaarder-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildAnthonyHenmanBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const erowid =
    'https://www.erowid.org/culture/characters/henman_anthony/henman_anthony.shtml';
  const neip =
    'http://neip.info/livro/diamba-sarabamba-coletanea-de-textos-brasileiros-sobre-a-maconha-sao-paulo-ground-1986/';
  const tenetehara =
    'http://www.etnolinguistica.org/biblio:henman-1983-guerra';
  const diamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';

  const body = `## Escopo

Inspeção editorial e documental de **Anthony Richard Henman** (n. 1949) — antropólogo, ensaísta e activista antiproibicionista. O recorte BudGanja **não** é inventário de toda a obra (*Mama Coca*, ayahuasca, San Pedro, etc.): é a **pessoa e o método** de estudar psicoativos a partir do uso cultural e indígena — com elo principal na antologia [Diamba Sarabamba](${diamba}) (série Artes), que co-organizou com Osvaldo Pessoa Jr. em 1986.

> **Nota metodológica:** auditoria independente com base no [Erowid · Anthony Henman](${erowid}), [NEIP · Diamba Sarabamba](${neip}) e registo bibliográfico [Henman 1983 · Tenetehara](${tenetehara}). Sem afiliação. Distinto do [Legado](${legado}) científico (ex.: [Carlini](${carlini})). A ficha de *Diamba Sarabamba* inspeciona o **livro**; aqui inspeciona-se o **ofício** do co-organizador âncora.

Esta ficha é o elo **Pessoas × Artes (literatura/ensaio)** — par da inspeção [Diamba Sarabamba](${diamba}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Anthony Richard Henman** |
| Nascimento | **1949** (registo público; nascido em São Paulo — mãe argentina, pai inglês) |
| Ofícios | Antropólogo · ensaísta · consultor de políticas de drogas / redução de danos |
| Formação | Mestrado em Antropologia (Cambridge) |
| Obra-âncora BudGanja | [Diamba Sarabamba](${diamba}) (Ground, 1986) — co-organização |
| Marco prévio | «A guerra às drogas é uma guerra etnocida» (1983) — diamba entre os Tenetehara (MA) |
| Outra marca pública | *Mama Coca* (1978, sob pseudónimo) — coca indígena / crítica à indústria da cocaína |
| Tipo BudGanja | Pessoa — método etnobotânico/antiproibicionista × Artes |
| Elo principal | [Diamba Sarabamba](${diamba}) — antologia (série Artes) |
| Elo Palavras | [maconha](${maconha}) — léxico BR / diamba |
| Fonte de partida | [Erowid · Anthony Henman](${erowid}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Henman é um **método de campo**: ouvir o uso cultural (Tenetehara, Paez, etc.) antes de impor a narrativa proibicionista.  
**H2:** [Diamba Sarabamba](${diamba}) é o **elo de obra**; a tese da antologia fica na ficha Artes.  
**H3:** Pessoas acolhe o ofício antropológico — distinto do Legado farmacológico ([Carlini](${carlini})).

Passos (variante «organizador × livro»):

1. Identificar a pessoa, datas e fontes públicas.  
2. Extrair o **método** (etnografia + crítica da guerra às drogas).  
3. Escolher **uma** obra Artes como elo principal ([Diamba Sarabamba](${diamba})).  
4. Contraste com [Legado](${legado}) quando útil.  
5. Status.

## Quem foi / é (síntese verificável)

- Nascido em São Paulo (1949); identidade cultural híbrida (BR / Inglaterra / Argentina).  
- Cambridge (antropologia); ensino em Cauca (Colômbia) e IFCH-UNICAMP.  
- *Mama Coca* (1978) — uso indígena da folha de coca e denúncia da agenda da «guerra às drogas».  
- **1983:** estudo da diamba entre os índios Tenetehara do Maranhão — «guerra às drogas = guerra etnocida».  
- **1986:** co-organiza [Diamba Sarabamba](${diamba}) com Osvaldo Pessoa Jr. (Ground).  
- Consultorias: CONEN-SP, Parlamento Europeu, OMS, observatórios de drogas; secretário executivo da International Anti-Prohibitionist League (registo Erowid).  
- Fase posterior: pesquisa em plantas mestras do Peru (coca, San Pedro, huilca) — fora do recorte âncora desta ficha.

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Uso cultural primeiro | Partir da experiência do usuário / povo — não só da norma estatal |
| Antiproibicionismo etnográfico | Proibição como violência cultural (Tenetehara) |
| Arquivo + ensaio | Co-organizar antologia que confronta discursos (1986) |
| Separar pessoa / obra | Henman ≠ *Diamba Sarabamba* — ofício em Pessoas, livro em Artes |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [Diamba Sarabamba](${diamba}) | Antologia 1986 — arquivo pioneiro BR |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| [maconha](${maconha}) | Palavras — léxico |
| [Carlini](${carlini}) | Legado — co-contribuinte no volume |

> Abrir primeiro [Diamba Sarabamba](${diamba}) se o interesse for a **tese do livro**; esta ficha se o interesse for o **antropólogo**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Cruzar o método «controlo cultural vs autoridade» com a ficha [maconha](${maconha}).  
- Não inventariar toda a bibliografia: uma obra-âncora basta para o elo.

## Como repetir o método

1. Pessoa + fontes públicas (Erowid / NEIP / biblio).  
2. Método (como investiga), não só CV.  
3. Um elo Artes (livro) com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — Anthony Henman documentado com elo principal em [Diamba Sarabamba](${diamba}) (Artes).

[▶ Pessoas](${hub}) · [▶ Diamba Sarabamba](${diamba}) · [Erowid](${erowid})
`;

  const contentEn = `## Scope

Editorial inspection of **Anthony Richard Henman** (b. 1949) — anthropologist and anti-prohibition writer. Focus is the **person and method** of studying psychoactives from cultural/indigenous use, with primary link to [Diamba Sarabamba](${diamba}) (Arts) — **not** a full bibliography (*Mama Coca*, San Pedro, etc.).

> **Method note:** independent audit from [Erowid](${erowid}) / [NEIP](${neip}). Distinct from cannabis Legacy ([Carlini](${carlini})). The anthology sheet covers the **book**; this sheet covers the **craft** of the co-organizer.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Anthony Richard Henman** |
| Born | 1949, São Paulo |
| BudGanja anchor work | [Diamba Sarabamba](${diamba}) (1986) |
| Prior mark | Tenetehara diamba study (1983) — “war on drugs = ethnocide” |
| BudGanja type | Person — ethnobotanical / anti-prohibition method × Arts |
| Date | ${inspected} |

## Hypotheses

**H1:** value is a **field method** — cultural use before prohibition narrative.  
**H2:** [Diamba Sarabamba](${diamba}) is the Arts link.  
**H3:** People ≠ Legacy pharmacology.

## Method for BudGanja

| Trait | Gloss |
|-------|-------|
| Cultural use first | Start from users/peoples, not only the state |
| Ethnographic anti-prohibition | Ban as cultural violence |
| Person ≠ work | Henman in People; book in Arts |

## Status

**Approved in the People series** — primary Arts link [Diamba Sarabamba](${diamba}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Anthony Richard Henman** (n. 1949) — antropólogo y ensayista antiprohibicionista. El recorte es la **persona y el método** de estudiar psicoactivos desde el uso cultural/indígena, con vínculo principal en [Diamba Sarabamba](${diamba}) (Artes).

> **Nota metodológica:** auditoría independiente ([Erowid](${erowid}) / [NEIP](${neip})). Distinto del Legado ([Carlini](${carlini})). La ficha de la antología inspecciona el **libro**; aquí, el **oficio** del co-organizador.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Anthony Richard Henman** |
| Nacimiento | 1949, São Paulo |
| Obra ancla | [Diamba Sarabamba](${diamba}) (1986) |
| Tipo BudGanja | Persona — método etnobotánico/antiprohibicionista × Artes |
| Fecha | ${inspected} |

## Hipótesis

**H1:** valor = **método de campo** (uso cultural primero).  
**H2:** [Diamba Sarabamba](${diamba}) es el vínculo Artes.  
**H3:** Personas ≠ Legado farmacológico.

## Estado

**Aprobado en la serie Personas** — vínculo principal [Diamba Sarabamba](${diamba}).
`;

  return { body, contentEn, contentEs, wiki: erowid };
}

function buildAnthonyHenmanPost() {
  const { body, contentEn, contentEs, wiki } = buildAnthonyHenmanBodies();
  return figuraPost({
    title:
      'Inspeção: Anthony Henman — antropologia da diamba e elo com Diamba Sarabamba',
    titleEn:
      'Inspection: Anthony Henman — diamba anthropology and link to Diamba Sarabamba',
    titleEs:
      'Inspección: Anthony Henman — antropología de la diamba y vínculo con Diamba Sarabamba',
    excerpt:
      'Pessoas × Artes: Anthony Henman — método etnobotânico e antiproibicionista, com elo principal na antologia Diamba Sarabamba (1986); distinto do Legado canábico.',
    excerptEn:
      'People × Arts: Anthony Henman — ethnobotanical and anti-prohibition method, with primary link to Diamba Sarabamba (1986); distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: Anthony Henman — método etnobotánico y antiprohibicionista, con vínculo principal en Diamba Sarabamba (1986); distinto del Legado cannábico.',
    slug: 'inspecao-figura-anthony-henman',
    date: '2026-08-01T20:15:00.000Z',
    seriesOrder: 6,
    seriesLabel: 'Anthony Henman · pessoa',
    coverImage: 'imagens/inspecoes/anthony-henman-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildNickToschesBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://en.wikipedia.org/wiki/Nick_Tosches';
  const opio = '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const passar = '/posts/post-inspecao-palavra-passar.html';

  const body = `## Escopo

Inspeção editorial e documental de **Nicholas P. Tosches** (1949–2019) — jornalista, biógrafo, romancista e poeta norte-americano. O recorte BudGanja **não** é inventário de toda a obra (*Hellfire*, *Dino*, etc.): é a **pessoa e o método** de prosa afiada entre música, crime e obsessão cultural — com elo principal no livro [A Última Casa de Ópio](${opio}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipedia · Nick Tosches](${wiki}). Sem afiliação. Distinto do [Legado](${legado}) canábico. A ficha de *A Última Casa de Ópio* inspeciona o **livro**; aqui inspeciona-se o **ofício** de quem o escreveu. **Não romantiza o uso de ópio.**

Esta ficha é o elo **Pessoas × Artes (literatura/reportagem)** — par da inspeção [A Última Casa de Ópio](${opio}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Nick Tosches** (Nicholas P. Tosches) |
| Nascimento / morte | 23 out. 1949, Newark, NJ — 20 out. 2019, Manhattan |
| Ofícios | Jornalista · biógrafo · romancista · poeta · contributing editor (*Vanity Fair*) |
| Obra-âncora BudGanja | [A Última Casa de Ópio](${opio}) (*The Last Opium Den*, 2002) |
| Outras marcas públicas | *Hellfire* (Jerry Lee Lewis, 1982) · *Dino* (Dean Martin, 1992) · biografia Sonny Liston |
| Tipo BudGanja | Pessoa — método jornalístico-literário × Artes |
| Elo principal | [A Última Casa de Ópio](${opio}) — reportagem/viagem (série Artes) |
| Fonte de partida | [Wikipedia · Nick Tosches](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Tosches é um **método de procura**: ir ao fim do desejo cultural e auditar o que a modernidade substituiu por placebos.  
**H2:** [A Última Casa de Ópio](${opio}) é o **elo de obra**; a tese do livro fica na ficha Artes.  
**H3:** Pessoas ≠ Legado canábico — aqui o ofício é literário/jornalístico.

Passos (variante «autor × livro»):

1. Pessoa, datas e fonte wiki.  
2. Extrair o **método** (prosa, biografia, reportagem).  
3. Uma obra Artes como elo ([A Última Casa de Ópio](${opio})).  
4. Status — sem glamourizar substâncias.

## Quem foi / é (síntese verificável)

- Newark (1949); carreira inicial em crítica musical (*Creem*, *Rolling Stone*, *Fusion*) — contemporâneo da geração Lester Bangs.  
- *Hellfire* (1982) — biografia de Jerry Lee Lewis; elogio histórico da *Rolling Stone*.  
- *Dino* (Dean Martin) e outras biografias (Liston, etc.).  
- Mid-1990s: contributing editor da *Vanity Fair* — origem da peça que vira [A Última Casa de Ópio](${opio}) (2002).  
- Morre em Manhattan em 2019, três dias antes dos 70 anos.

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Prosa afiada | Auditar o mito sem sentimentalismo fácil |
| Biografia como inspeção | Despir o verniz do show business — paralelo ao método BudGanja |
| Reportagem-obsessão | Seguir uma pergunta até ao terreno ([passar](${passar})) |
| Separar pessoa / obra | Tosches ≠ casa de ópio — ofício em Pessoas, livro em Artes |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [A Última Casa de Ópio](${opio}) | Livro-reportagem 2002 — procura e crítica cultural |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| [passar](${passar}) | Palavras — périplo |

> Abrir primeiro [A Última Casa de Ópio](${opio}) se o interesse for a **tese do livro**; esta ficha se o interesse for o **autor**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Tratar ópio no corpus como **tema literário**, não protocolo.  
- Uma obra-âncora basta para o elo.

## Como repetir o método

1. Pessoa + wiki.  
2. Método (como escreve), não só CV.  
3. Um elo Artes com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — Nick Tosches documentado com elo principal em [A Última Casa de Ópio](${opio}) (Artes).

[▶ Pessoas](${hub}) · [▶ A Última Casa de Ópio](${opio}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Nick Tosches** (1949–2019) — American journalist, biographer and novelist. Focus is the **person and method**, with primary link to [The Last Opium Den / A Última Casa de Ópio](${opio}) (Arts).

> **Method note:** independent audit from [Wikipedia](${wiki}). Does **not** romanticize opium. Distinct from cannabis Legacy.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Nick Tosches** |
| Lived | 23 Oct 1949 – 20 Oct 2019 |
| Anchor work | [A Última Casa de Ópio](${opio}) (2002) |
| BudGanja type | Person — literary-journalistic method × Arts |
| Date | ${inspected} |

## Status

**Approved in the People series** — primary Arts link [A Última Casa de Ópio](${opio}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Nick Tosches** (1949–2019) — periodista, biógrafo y novelista estadounidense. El recorte es la **persona y el método**, con vínculo principal en [A Última Casa de Ópio](${opio}) (Artes).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wiki})). **No romantiza el opio.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Nick Tosches** |
| Obra ancla | [A Última Casa de Ópio](${opio}) (2002) |
| Tipo BudGanja | Persona — método periodístico-literario × Artes |
| Fecha | ${inspected} |

## Estado

**Aprobado en la serie Personas** — vínculo principal [A Última Casa de Ópio](${opio}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildNickToschesPost() {
  const { body, contentEn, contentEs, wiki } = buildNickToschesBodies();
  return figuraPost({
    title:
      'Inspeção: Nick Tosches — prosa afiada e elo com A Última Casa de Ópio',
    titleEn:
      'Inspection: Nick Tosches — sharp prose and link to The Last Opium Den',
    titleEs:
      'Inspección: Nick Tosches — prosa afilada y vínculo con A Última Casa de Ópio',
    excerpt:
      'Pessoas × Artes: Nick Tosches — método jornalístico-literário, com elo principal no livro A Última Casa de Ópio (2002); distinto do Legado canábico.',
    excerptEn:
      'People × Arts: Nick Tosches — literary-journalistic craft, with primary link to The Last Opium Den (2002); distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: Nick Tosches — oficio periodístico-literario, con vínculo principal en A Última Casa de Ópio (2002); distinto del Legado cannábico.',
    slug: 'inspecao-figura-nick-tosches',
    date: '2026-08-01T21:15:00.000Z',
    seriesOrder: 7,
    seriesLabel: 'Nick Tosches · pessoa',
    coverImage: 'imagens/inspecoes/nick-tosches-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildAnnieLeonardBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://en.wikipedia.org/wiki/Annie_Leonard';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const ricos =
    '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';

  const body = `## Escopo

Inspeção editorial e documental de **Annie Marie Leonard** (n. 1964) — activista de sustentabilidade e crítica do consumismo. O recorte BudGanja **não** é CV completo (Greenpeace USA, etc.): é a **pessoa e o método** de explicar a economia dos materiais ao público — com elo principal no livro [A História das Coisas](${historia}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipedia · Annie Leonard](${wiki}). Sem afiliação com Greenpeace, Story of Stuff Project ou editoras. Distinto do [Legado](${legado}) canábico. A ficha de *A História das Coisas* inspeciona o **livro**; aqui inspeciona-se o **ofício** de quem o escreveu e narrizou o vídeo de 2007.

Esta ficha é o elo **Pessoas × Artes (ensaio)** — par da inspeção [A História das Coisas](${historia}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Annie Marie Leonard** |
| Nascimento | **1964** (EUA) |
| Ofícios | Activista · divulgadora · autora · ex-directora executiva Greenpeace USA (a partir de 2014) |
| Obra-âncora BudGanja | [A História das Coisas](${historia}) (livro 2010; vídeo 2007) |
| Marco público | *Time* — 100 environmental heroes (2009, registo wiki/imprensa) |
| Tipo BudGanja | Pessoa — método de divulgação da economia dos materiais × Artes |
| Elo principal | [A História das Coisas](${historia}) — ensaio (série Artes) |
| Fonte de partida | [Wikipedia · Annie Leonard](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Leonard é um **método didáctico**: tornar visível o ciclo oculto das coisas (extração→lixo).  
**H2:** [A História das Coisas](${historia}) é o **elo de obra**; a tese do livro fica na ficha Artes.  
**H3:** Pessoas acolhe o ofício de divulgação ambiental — distinto do Legado canábico e do hub [Derivados](${derivados}) (cadeias concretas).

Passos (variante «autora × livro»):

1. Pessoa, datas e fonte wiki.  
2. Extrair o **método** (vídeo + livro + activismo).  
3. Uma obra Artes como elo ([A História das Coisas](${historia})).  
4. Status.

## Quem foi / é (síntese verificável)

- Décadas de trabalho sobre tráfico internacional de lixo, incineração e economia de materiais.  
- **2007:** cria/narra o vídeo animado *The Story of Stuff* (~20 min.) — fenómeno online.  
- **2010:** publica o livro homónimo (Free Press); BR Zahar 2011.  
- Projecto Story of Stuff — materiais educativos e curtas seguintes.  
- **2014:** torna-se executive director da Greenpeace USA (registo wiki).

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Ciclo completo | Auditar do minério ao lixo — paralelo à inspeção |
| Didáctica visual + livro | Vídeo abre; livro aprofunda |
| Custos ocultos | Preço de prateleira ≠ custo real |
| Separar pessoa / obra | Leonard ≠ *História das Coisas* — ofício em Pessoas, livro em Artes |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [A História das Coisas](${historia}) | Livro 2010 — mapa da máquina linear |
| [Como os ricos transformam as coisas](${ricos}) | Expressões — refrão oral do ciclo / poder |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| [passar](${passar}) | Palavras — o que se passa no ciclo |
| Hub [Derivados](${derivados}) | Cadeias materiais concretas no laboratório |

> Abrir primeiro [A História das Coisas](${historia}) se o interesse for a **tese do livro**; esta ficha se o interesse for a **autora**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Cruzar o mapa «stuff» com fichas de [Derivados](${derivados}).  
- Uma obra-âncora basta para o elo.

## Como repetir o método

1. Pessoa + wiki.  
2. Método (como divulga), não só cargos.  
3. Um elo Artes com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — Annie Leonard documentada com elo principal em [A História das Coisas](${historia}) (Artes).

[▶ Pessoas](${hub}) · [▶ A História das Coisas](${historia}) · [▶ Como os ricos…](${ricos}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Annie Leonard** (b. 1964) — sustainability advocate and critic of consumerism. Focus is the **person and method** of explaining the materials economy, with primary link to [The Story of Stuff / A História das Coisas](${historia}) (Arts).

> **Method note:** independent audit from [Wikipedia](${wiki}). Distinct from cannabis Legacy. The book sheet covers the **book**; this sheet covers the **craft**.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Annie Marie Leonard** |
| Born | 1964 |
| Anchor work | [A História das Coisas](${historia}) (book 2010; film 2007) |
| Public mark | Greenpeace USA ED (from 2014); *Time* environmental heroes 2009 |
| BudGanja type | Person — materials-economy outreach method × Arts |
| Date | ${inspected} |

## Status

**Approved in the People series** — primary Arts link [A História das Coisas](${historia}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Annie Leonard** (n. 1964) — activista de sostenibilidad y crítica del consumismo. El recorte es la **persona y el método**, con vínculo principal en [A História das Coisas](${historia}) (Artes).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wiki})). Distinto del Legado cannábico.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Annie Marie Leonard** |
| Obra ancla | [A História das Coisas](${historia}) (libro 2010) |
| Tipo BudGanja | Persona — método de divulgación × Artes |
| Fecha | ${inspected} |

## Estado

**Aprobado en la serie Personas** — vínculo principal [A História das Coisas](${historia}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildAnnieLeonardPost() {
  const { body, contentEn, contentEs, wiki } = buildAnnieLeonardBodies();
  return figuraPost({
    title:
      'Inspeção: Annie Leonard — divulgação da economia dos materiais e elo com A História das Coisas',
    titleEn:
      'Inspection: Annie Leonard — materials-economy outreach and link to The Story of Stuff',
    titleEs:
      'Inspección: Annie Leonard — divulgación de la economía de materiales y vínculo con A História das Coisas',
    excerpt:
      'Pessoas × Artes: Annie Leonard — método de explicar a economia linear das coisas, com elo principal no livro A História das Coisas (2010); distinto do Legado canábico.',
    excerptEn:
      'People × Arts: Annie Leonard — explaining the linear materials economy, with primary link to The Story of Stuff (2010); distinct from cannabis Legacy.',
    excerptEs:
      'Personas × Artes: Annie Leonard — método para explicar la economía lineal, con vínculo principal en A História das Coisas (2010); distinto del Legado cannábico.',
    slug: 'inspecao-figura-annie-leonard',
    date: '2026-08-01T21:45:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'Annie Leonard · pessoa',
    coverImage: 'imagens/inspecoes/annie-leonard-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

const { buildWilliamDavisPost } = require('./william-davis-inspecoes-posts.js');
const { buildRamonValdesPost } = require('./chaves-turma-inspecoes-posts.js');
const { buildPauloCoelhoPost } = require('./paulo-coelho-inspecao-post.js');
const { buildLeonardoDaVinciPost } = require('./leonardo-da-vinci-inspecao-post.js');

const PESSOAS_HISTORIA_INSPECOES_POSTS = [
  buildHerodotoPost(),
  buildDuvivierPost(),
  buildChoraoPost(),
  buildKeanuReevesPost(),
  buildJosteinGaarderPost(),
  buildAnthonyHenmanPost(),
  buildNickToschesPost(),
  buildAnnieLeonardPost(),
  buildWilliamDavisPost(),
  buildRamonValdesPost(),
  buildPauloCoelhoPost(),
  buildLeonardoDaVinciPost()
];

module.exports = {
  PESSOAS_HISTORIA_INSPECOES_POSTS,
  figuraPost,
  buildHerodotoPost,
  buildHerodotoBodies,
  buildDuvivierPost,
  buildDuvivierBodies,
  buildChoraoPost,
  buildChoraoBodies,
  buildKeanuReevesPost,
  buildKeanuReevesBodies,
  buildJosteinGaarderPost,
  buildJosteinGaarderBodies,
  buildAnthonyHenmanPost,
  buildAnthonyHenmanBodies,
  buildNickToschesPost,
  buildNickToschesBodies,
  buildAnnieLeonardPost,
  buildAnnieLeonardBodies,
  buildWilliamDavisPost,
  buildRamonValdesPost,
  buildPauloCoelhoPost,
  buildLeonardoDaVinciPost
};
