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
  const abacate = '/plantas/abacate/';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial e documental de **Heródoto de Halicarnasso** (c. 485–425 a.C.) — o grego a quem Cícero chamou «pai da história», autor das *Histórias*. O recorte BudGanja não é biografia escolar fechada: é recuperar o **método de pesquisa** (*historie* = investigação) — viagem, fontes orais, etnografia, geografia e **plantas/alimentos dos povos** — e cruzá-lo com uma espécie que ele **não pôde inspecionar**: o **[abacate](${abacate})** (*Persea americana*), planta de origem mesoamericana hoje enraizada no Brasil.

> **Nota metodológica:** auditoria independente com base na [entrada da Wikipédia em português](${wiki}) e no consenso clássico sobre as *Histórias*. **Não inventamos** encontro entre Heródoto e o abacate — o fruto é americano; o elo é **metodológico e editorial**. Sem afiliação académica. Crédito da obra e das viagens pertence a Heródoto e à tradição que o transmitiu.

Esta ficha é o **modelo** da série **Pessoas** (distinta do [Legado](${legado}) canábico contemporâneo).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Heródoto** (Ἡρόδοτος / *Hēródotos*) |
| Origem | Halicarnasso (hoje Bodrum, Turquia), c. 485 a.C. |
| Morte | Túrios (sul de Itália), tradição c. 425 a.C. (outras datas em disputa) |
| Magnum opus | *Histórias* (depois divididas em 9 livros / musas) |
| Título clássico | «Pai da história» (Cícero, *De Legibus*) — no mesmo passo, Cícero critica as «histórias fabulosas» |
| Tipo BudGanja | Pessoa — método de pesquisa e elo com planta |
| Elo botânico | [Abacate (*Persea americana*)](${abacate}) — flora que o método clássico não alcançou |
| Fonte de partida | [Wikipédia · Heródoto](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Heródoto não é a cronologia das Guerras Médicas em si — é ter transformado *historie* (pesquisa) em forma literária que combina **povos, territórios, costumes e natureza**.  
**H2:** o Livro II (Egito) e outras digressões etnográficas mostram um proto-olhar de **etnobotânica narrativa** (alimentos, plantas de pântano, cereais, hábitos).  
**H3:** ligar Heródoto ao **abacate** torna explícito o limite geográfico da Antiguidade clássica e a tarefa do laboratório: continuar a inspeção de plantas no Brasil e nas Américas.

Passos (repetíveis na série Pessoas):

1. Identificar a pessoa, datas e obra-âncora com fonte pública.  
2. Extrair o **método** (como pesquisava), não só o currículo.  
3. Mapear o que documentou sobre plantas / povos / comida.  
4. Escolher um elo botânico no catálogo — preferindo espécie brasileira ou naturalizada.  
5. Declarar se o elo é **histórico directo** ou **metodológico** (como aqui).  
6. Cruzar com Legado / Palavras / Plantas quando fizer sentido.  
7. Status claro + fila de próximas figuras.

## Quem foi (síntese verificável)

- Historiador e geógrafo grego; sucessor, na prosa sobre geografia/história, de linhas ligadas a Anaximandro e Hecateu de Mileto.  
- Viajou (com dúvidas pontuais sobre a extensão exacta) pelo Mediterrâneo, Egito, Oriente Próximo; valorizou **fontes orais**.  
- As *Histórias* narram a expansão aqueménida e o confronto com as cidades gregas, até às vitórias gregas de 479 a.C. — mas intercalam longas digressões sobre costumes e territórios.  
- Acusado desde a Antiguidade de inventar ou não criticar o suficiente o que ouviu; desde meados do séc. XX cresceu o respeito pelo rigor relativo e pelo pioneirismo em história, geografia, etnografia e antropologia.  
- Traduções modernas em português incluem edições UnB (Mario da Gama Kury), Edições 70 e Edipro (em curso).

## O método que interessa ao BudGanja

| Traço herodotiano | Tradução editorial BudGanja |
|-------------------|-----------------------------|
| *Historie* = pesquisa | Inspeção com hipóteses, fontes e status |
| Viagem + testemunho | Ir às fontes públicas; declarar o que não se viu |
| Fontes orais | Dar crédito a comunidades e tradição (com cautela) |
| Digressão etnográfica | Plantas, comida e costumes não são «nota de rodapé» |
| Escala supra-local | Ligar canal, planta, palavra e pessoa no mesmo mapa |

Heródoto não é o modelo de *peer review* moderno — é o ancestral da pergunta: **o que os povos fazem com a terra e com as plantas, e como isso explica o presente?**

## Plantas no olhar clássico (e o que falta)

Nas *Histórias*, sobretudo no Egito (Livro II), há descrições de dieta e vegetação (cereais para pão e cerveja, plantas de zona húmida como lótus e papiro, etc.). Estudos recentes de etnobotânica clássica inventariam árvores e plantas nomeadas na obra — cevada, oliveira e outras aparecem com usos culturais.

**O abacate não está nesse inventário.** *Persea americana* é nativa das Américas; só entra no Velho Mundo após 1492. Relacionar Heródoto ao abacate **sem declarar esse facto** seria erro editorial.

### Elo com o abacate (metodológico, explícito)

| Pergunta | Resposta BudGanja |
|----------|-------------------|
| Heródoto conheceu o abacate? | **Não.** |
| Por que cruzar os dois? | Para mostrar o **alcance e o limite** do método clássico — e continuar a pesquisa na flora americana/brasileira. |
| Onde vive a ficha da planta? | [Abacate — *Persea americana*](${abacate}) |
| O que inspecionar na planta? | Origem mesoamericana, naturalização no Brasil, polpa alimentar, usos tradicionais/cautelas do catálogo |

Leitura-síntese: Heródoto ensina a **perguntar pelos povos e pelas plantas**; o abacate é o exercício de aplicar essa curiosidade ao território que ele não mapeou.

## Avaliação BudGanja

### Forças desta ficha
- Abre a série **Pessoas** com método repetível e fronteira clara face ao [Legado](${legado}).  
- Usa fonte pública canónica ([Wikipédia](${wiki})) sem fingir aparato filológico completo.  
- Cruza honestamente com [abacate](${abacate}) — elo metodológico, não anacronismo escondido.

### Limites honestos
- Datas e locais de morte/viagem permanecem em disputa na tradição.  
- Não substitui edição comentada das *Histórias* nem artigo de etnobotânica clássica.  
- O elo abacate é editorial; não há menção antiga ao fruto.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Ficha da planta | [Abacate](${abacate}) |
| Hub desta série | [Inspeções · Pessoas](${hub}) |
| Legado (outro eixo) | [Inspeções · Legado](${legado}) |
| Palavras (léxico) | [Inspeções · Palavras](${palavras}) |
| Catálogo medicinal | [Plantas](/plantas/) |
| Fonte externa | [Wikipédia · Heródoto](${wiki}) |

## Como repetir o método

1. Pessoa + obra-âncora + URL de partida.  
2. Três hipóteses sobre o **método** dela.  
3. O que documentou (ou não) sobre plantas/povos.  
4. Elo com \`/plantas/<slug>/\` — declarar tipo de elo (directo / metodológico).  
5. Tabela de complementaridade + status.  
6. Enfileirar a próxima figura na sugestão do hub.

## Status

**Aprovado como ficha fundadora da série Pessoas** — Heródoto documentado pelo método de *historie*; elo com [abacate](${abacate}) declarado como ponte metodológica para a flora americana no Brasil.

[▶ Todas as inspeções · Pessoas](${hub}) · [Wikipédia](${wiki}) · [Abacate](${abacate})
`;

  const contentEn = `## Scope

Editorial inspection of **Herodotus of Halicarnassus** (c. 485–425 BCE) — author of the *Histories*, called “father of history” by Cicero. BudGanja focus: his **research method** (*historie* = inquiry) — travel, oral sources, ethnography, geography and peoples’ plants/foods — crossed with a species he **could not** inspect: **[avocado](${abacate})** (*Persea americana*).

> **Method note:** based on the [Portuguese Wikipedia entry](${wiki}) and classical consensus. We **do not invent** a meeting between Herodotus and avocado — the fruit is American; the link is **methodological**.

This sheet models the **People** series (distinct from cannabis [Legacy](${legado})).

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Herodotus** |
| Origin | Halicarnassus (Bodrum), c. 485 BCE |
| Magnum opus | *Histories* |
| BudGanja type | Person — research method + plant link |
| Botanical link | [Avocado](${abacate}) — flora classical inquiry never reached |
| Source | [Wikipedia · Heródoto](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** BudGanja value is the method that braids peoples, territories, customs and nature.  
**H2:** Egyptian and other digressions show proto-ethnobotanical narrative.  
**H3:** Linking Herodotus to avocado states the geographic limit of antiquity and the lab’s task in Brazilian/American flora.

## Method traits

| Herodotus | BudGanja translation |
|-----------|----------------------|
| *Historie* = inquiry | Inspection with hypotheses, sources, status |
| Travel + testimony | Public sources; declare what was not seen |
| Oral sources | Credit communities/tradition with caution |
| Ethnographic digression | Plants and food are not footnotes |

## Avocado link (methodological)

Herodotus **did not** know avocado (*Persea americana*, Mesoamerican). The cross-link shows the **reach and limit** of classical method — and continues plant inspection in Brazil. Sheet: [avocado](${abacate}).

## Status

**Approved as founding sheet of the People series.**

[▶ Inspections · People](${hub}) · [Wikipedia](${wiki}) · [Avocado](${abacate})
`;

  const contentEs = `## Alcance

Inspección editorial de **Heródoto de Halicarnaso** (c. 485–425 a.C.) — autor de las *Historias*, «padre de la historia» para Cicerón. Foco BudGanja: su **método de investigación** (*historie*) — viaje, fuentes orales, etnografía, geografía y plantas/alimentos de los pueblos — cruzado con una especie que **no pudo** inspeccionar: el **[aguacate / abacate](${abacate})** (*Persea americana*).

> **Nota metodológica:** basada en la [Wikipedia en portugués](${wiki}). **No inventamos** encuentro con el aguacate — el vínculo es **metodológico**.

Modelo de la serie **Personas** (distinta del [Legado](${legado}) cannábico).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Heródoto** |
| Origen | Halicarnaso, c. 485 a.C. |
| Obra | *Historias* |
| Tipo BudGanja | Persona — método + enlace botánico |
| Planta | [Abacate](${abacate}) |
| Fuente | [Wikipedia · Heródoto](${wiki}) |
| Fecha | ${inspected} |

## Hipótesis

El valor no es solo la cronología de las Guerras Médicas, sino el método que entrelaza pueblos, territorios, costumbres y naturaleza. El aguacate declara el límite geográfico de la Antigüedad y la tarea del laboratorio en la flora americana/brasileña.

## Enlace con el abacate

Heródoto **no** conoció *Persea americana*. El cruce es editorial y metodológico. Ficha: [abacate](${abacate}).

## Estado

**Aprobada como ficha fundadora de la serie Personas.**

[▶ Inspecciones · Personas](${hub}) · [Wikipedia](${wiki}) · [Abacate](${abacate})
`;

  return { body, contentEn, contentEs };
}

function buildHerodotoPost() {
  const { body, contentEn, contentEs } = buildHerodotoBodies();
  return figuraPost({
    title: 'Inspeção: Heródoto — método da pesquisa e o abacate que ele não viu',
    titleEn: 'Inspection: Herodotus — research method and the avocado he never saw',
    titleEs: 'Inspección: Heródoto — método de investigación y el aguacate que no vio',
    excerpt:
      'Ficha fundadora da série Pessoas: Heródoto de Halicarnasso, *historie* como investigação, etnografia de povos e plantas — elo metodológico com o abacate (*Persea americana*) no catálogo brasileiro.',
    excerptEn:
      'Founding sheet of the People series: Herodotus of Halicarnassus, *historie* as inquiry, ethnography of peoples and plants — methodological link to avocado (*Persea americana*) in the Brazilian catalog.',
    excerptEs:
      'Ficha fundadora de la serie Personas: Heródoto de Halicarnaso, *historie* como investigación, etnografía de pueblos y plantas — vínculo metodológico con el aguacate (*Persea americana*) en el catálogo brasileño.',
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

Leitura-síntese: se [Heródoto](${herodoto}) ensina a perguntar pelos povos e pelas plantas, Duvivier ensina a perguntar **pelo que a língua faz** — e isso é exactamente o território da série Palavras.

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
| Pessoa-modelo (plantas) | [Heródoto](${herodoto}) |
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

Literature training · poetry/chronicle · sketch comedy · satirical news (*Greg News*) · stage linguistics (*O Céu da Língua*). If [Herodotus](${herodoto}) asks about peoples and plants, Duvivier asks **what language does** — the Words territory.

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

Formación en Letras · poesía/crónica · sketch · noticia satírica · lingüística en escena. Si [Heródoto](${herodoto}) pregunta por pueblos y plantas, Duvivier pregunta **qué hace la lengua**.

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

const PESSOAS_HISTORIA_INSPECOES_POSTS = [buildHerodotoPost(), buildDuvivierPost()];

module.exports = {
  PESSOAS_HISTORIA_INSPECOES_POSTS,
  buildHerodotoPost,
  buildHerodotoBodies,
  buildDuvivierPost,
  buildDuvivierBodies
};
