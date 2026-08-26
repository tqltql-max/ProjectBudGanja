'use strict';

/**
 * Artes · fila prioridade 2 (livros).
 * Método: obra primeiro; autor em Pessoas quando já existir ficha;
 * metáfora ≠ protocolo; sem fundir objectos homónimos.
 */

const fs = require('fs');
const path = require('path');

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
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function nextArteOrder() {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    return (orders.length ? Math.max(...orders) : 88) + 1;
  } catch (_) {
    return 89;
  }
}

function existingOrder(slug) {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
  } catch (_) {
    /* ignore */
  }
  return 0;
}

const HUB = '/biblioteca/inspecoes/#inspecoes-artes';
const INSPECTED = '2026-08-24';
const VALEU = '/posts/post-inspecao-palavra-valeu.html';

function wrapEnEs(cfg, bodyExtraEn, bodyExtraEs) {
  const contentEn = `## Scope

Editorial inspection of **${cfg.workEn}** (${cfg.kindEn}). The **start of everything** is the ${cfg.objectEn}. ${cfg.authorLineEn}

> **Method note:** independent audit. Anchor: [${cfg.sourceLabel}](${cfg.sourceUrl}). Credit: ${cfg.creditEn}. No affiliation. ${cfg.cutEn} The work is under copyright — no long quotes.

${bodyExtraEn}

## Status

**Approved in the Arts series.**

[▶ Arts](${HUB}) · [▶ Valeu !!!](${VALEU})
`;
  const contentEs = `## Alcance

Inspección editorial de **${cfg.workEs}** (${cfg.kindEs}). El **inicio de todo** es ${cfg.objectEs}. ${cfg.authorLineEs}

> **Nota metodológica:** auditoría independiente. Ancla: [${cfg.sourceLabel}](${cfg.sourceUrl}). Crédito: ${cfg.creditEs}. Sin afiliación. ${cfg.cutEs} Obra con copyright: sin citas largas.

${bodyExtraEs}

## Estado

**Aprobada en la serie Artes.**

[▶ Artes](${HUB}) · [▶ Valeu !!!](${VALEU})
`;
  return { contentEn, contentEs };
}

function buildDiambaHqBodies() {
  const sarabamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const brasa = 'https://www.brasaeditora.com.br/produtos/livro-hq-diamba-2ed/';
  const wikiWord = diamba;

  const body = `## Escopo

Inspeção editorial da HQ **«Diamba — Histórias do Proibicionismo no Brasil»** (Daniel Paiva; ed. Brasa). O **início de tudo** é o **livro em quadrinhos** — reportagem desenhada sobre criminalização, raça e Estado. **Não** é a antologia [Diamba Sarabamba](${sarabamba}) (1986, Ground).

> **Nota metodológica:** auditoria independente. Fontes de partida: [página da editora (2ª ed.)](${brasa}); elo lexical [diamba](${diamba}) / [maconha](${maconha}). Crédito: Daniel Paiva / Brasa. Sem afiliação. Indexar ≠ endossar tese política completa. A HQ é **obra protegida** — sem painéis reproduzidos. Quadrinho ≠ protocolo de cultivo nem de uso.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Diamba — Histórias do Proibicionismo no Brasil** |
| Autor / arte | **Daniel Paiva** |
| Suporte | HQ / reportagem desenhada (livro) |
| Tipo BudGanja | Arte — **livro (HQ) primeiro** |
| Distinção obrigatória | ≠ [Diamba Sarabamba](${sarabamba}) (antologia 1986) |
| Elo Palavras | [diamba](${diamba}) — cognato afro-brasileiro apagado pelo estigma |
| Data da inspeção | ${INSPECTED} |

## Hipóteses e método

**H1:** o valor BudGanja é o **arquivo desenhado do proibicionismo brasileiro** — nomes, leis, raça — não um tutorial.  
**H2:** *diamba* na capa pede a ficha [diamba](${diamba}): a palavra sobrevive no desenho quando o léxico oficial a cobriu.  
**H3:** duas obras, dois objectos: Paiva 20xx ≠ Ground 1986.

## Génese (o que a ficha fixa)

| Marco | Leitura laboratorial |
|-------|----------------------|
| HQ contemporânea | Narrativa + documentação visual do Brasil proibicionista |
| Editora Brasa | Circulação independente; 2ª edição catalogada no site |
| Palavra *diamba* | Elo com a série Palavras — originalidade bantu/afro-brasileira |
| Antologia 1986 | Já inspeccionada — **não fundir** |

## Tese cultural BudGanja

A HQ **mostra** a máquina (lei, polícia, raça, mercado) em vinhetas. O laboratório **não** a usa como prova clínica nem como manifesto a copiar: usa-a como **documento de cultura** a cruzar com [diamba](${diamba}) e com a antologia que veio **antes**, noutro formato.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [Diamba Sarabamba](${sarabamba}) | Antologia 1986 — outro objecto |
| [diamba](${diamba}) · [maconha](${maconha}) | Léxico |
| [Brasa · HQ](${brasa}) | Fonte comercial/editorial de partida |
| Hub [Artes](${HUB}) | Série |

## Status

**Aprovado na série Artes** — HQ de Daniel Paiva fichada; antologia 1986 permanece na sua própria casa.

[▶ Artes](${HUB}) · [▶ Diamba (palavra)](${diamba}) · [▶ Sarabamba](${sarabamba}) · [▶ Valeu !!!](${VALEU})
`;

  const { contentEn, contentEs } = wrapEnEs(
    {
      workEn: 'Diamba — Stories of Prohibition in Brazil',
      workEs: 'Diamba — Historias del prohibicionismo en Brasil',
      kindEn: 'documentary comics, Daniel Paiva',
      kindEs: 'HQ documental, Daniel Paiva',
      objectEn: 'comics book',
      objectEs: 'el libro de historieta',
      authorLineEn: 'Distinct from the 1986 anthology Diamba Sarabamba.',
      authorLineEs: 'Distinta de la antología Diamba Sarabamba (1986).',
      sourceLabel: 'Brasa (2nd ed.)',
      sourceUrl: brasa,
      creditEn: 'Daniel Paiva / Brasa',
      creditEs: 'Daniel Paiva / Brasa',
      cutEn: 'Not a grow/use protocol. Not the 1986 Ground anthology.',
      cutEs: 'No es protocolo de cultivo. No es la antología Ground 1986.'
    },
    '**H1:** drawn archive of Brazilian prohibition. **H2:** the cover word *diamba* belongs with the Words sheet. **H3:** Paiva HQ ≠ 1986 anthology.',
    '**H1:** archivo dibujado del prohibicionismo brasileño. **H2:** la palabra *diamba* de la tapa vive en Palabras. **H3:** HQ Paiva ≠ antología 1986.'
  );
  return { body, contentEn, contentEs, wiki: brasa };
}

function buildDeQuinceyBodies() {
  const tosches = '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html';
  const wiki = 'https://en.wikipedia.org/wiki/Confessions_of_an_English_Opium-Eater';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Confessions_of_an_English_Opium-Eater';

  const body = `## Escopo

Inspeção editorial de **«Confessions of an English Opium-Eater»** (*Confissões de um Comedor de Ópio Inglês*) — **Thomas De Quincey**, **1821** (Londres, *London Magazine*; livro 1822). O **início de tudo** é o **ensaio autobiográfico**: memória, dose, sonho e a invenção literária moderna do «comedor de ópio».

> **Nota metodológica:** auditoria independente. Âncora: [Wikipedia · Confessions](${wiki}) · [PT](${wikiPt}). Crédito: De Quincey / domínio público do texto oitocentista. **Não é protocolo de uso.** Metáfora e estilo ≠ receita. Sem glamourizar dependência. Elo posterior: [A Última Casa de Ópio](${tosches}) (Tosches) — outro século, outro ofício (reportagem), mesma substância como **tema literário**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Confessions of an English Opium-Eater** (1821/22) |
| Autor | **Thomas De Quincey** (1785–1859) |
| Género | Ensaio autobiográfico / prosa romântica |
| Tipo BudGanja | Arte — **livro primeiro** |
| Elo Artes | [A Última Casa de Ópio](${tosches}) — eco, não substituto |
| Data da inspeção | ${INSPECTED} |

## Hipóteses

**H1:** De Quincey **funda um género** (confissão + droga + estilo) que o laboratório inspecciona como **literatura**, não como clínica.  
**H2:** «Pleasure» e «Pains» do ópio no texto são **arquitectura narrativa**, não tabela de dose.  
**H3:** Tosches procura a *casa* que já não existe; De Quincey inventa o **eu** que come ópio — dois métodos.

## Génese

| Marco | Nota |
|-------|------|
| 1821 | Publicação em revista — o texto entra na conversa vitoriana |
| Láudano | Contexto médico-comercial britânico do século XIX (ópio em álcool) — história, não conselho |
| Influência | Marca Baudelaire, a prosa de sonho, o «paraiso artificial» posterior |

## Tese BudGanja

O laboratório **lê** De Quincey para saber **de onde veio o palco literário do ópio**. Não o usa para ensinar a usar. O corte é o mesmo da série: **obra ≠ substância na banca**.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [A Última Casa de Ópio](${tosches}) | Reportagem 2002 — procura, não génese |
| [Wikipedia](${wiki}) | Âncora |
| Hub [Artes](${HUB}) | Série |

## Status

**Aprovado na série Artes** — génese literária de 1821 fichada; sem romantizar uso.

[▶ Artes](${HUB}) · [▶ Tosches](${tosches}) · [▶ Valeu !!!](${VALEU})
`;

  const { contentEn, contentEs } = wrapEnEs(
    {
      workEn: 'Confessions of an English Opium-Eater',
      workEs: 'Confesiones de un inglés comedor de opio',
      kindEn: 'De Quincey, 1821',
      kindEs: 'De Quincey, 1821',
      objectEn: 'autobiographical essay',
      objectEs: 'el ensayo autobiográfico',
      authorLineEn: 'Literary genesis of the opium confession — not a use protocol.',
      authorLineEs: 'Génesis literaria de la confesión del opio — no es protocolo de uso.',
      sourceLabel: 'Wikipedia',
      sourceUrl: wiki,
      creditEn: 'Thomas De Quincey',
      creditEs: 'Thomas De Quincey',
      cutEn: 'Metaphor ≠ dose table. Later echo: Tosches.',
      cutEs: 'Metáfora ≠ tabla de dosis. Eco posterior: Tosches.'
    },
    '**H1:** De Quincey founds a genre. **H2:** Pleasure/Pains are narrative architecture. **H3:** Tosches hunts the vanished den; De Quincey invents the eating I.',
    '**H1:** De Quincey funda un género. **H2:** placer/dolores son arquitectura narrativa. **H3:** Tosches busca la casa; De Quincey inventa el yo.'
  );
  return { body, contentEn, contentEs, wiki };
}

function buildSofiaBodies() {
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
  const wiki = 'https://pt.wikipedia.org/wiki/O_Mundo_de_Sofia';
  const wikiEn = 'https://en.wikipedia.org/wiki/Sophie%27s_World';

  const body = `## Escopo

Inspeção editorial de **«O Mundo de Sofia»** (*Sofies verden* / *Sophie's World*) — romance de **Jostein Gaarder**, **1991**. O **início de tudo** é o **livro**: Sofia Amundsen recebe cartas de filosofia e descobre que o curso é também uma história dentro da história. A biografia do autor fica em [Jostein Gaarder](${gaarder}).

> **Nota metodológica:** auditoria independente. Âncora: [Wikipédia · O Mundo de Sofia](${wiki}) · [EN](${wikiEn}). Crédito: Gaarder / Aschehoug / editores BR. Sem afiliação. **Não é manual universitário de filosofia** nem substituto de aula. Complementa [O Dia do Curinga](${curinga}) — outro livro do mesmo autor, outra pergunta.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **O Mundo de Sofia** (1991) |
| Autor | [Jostein Gaarder](${gaarder}) — Pessoas |
| Género | Romance didáctico-filosófico |
| Tipo BudGanja | Arte — **livro primeiro**; autor em Pessoas |
| Par Artes | [O Dia do Curinga](${curinga}) |
| Data da inspeção | ${INSPECTED} |

## Hipóteses

**H1:** o valor BudGanja é a **filosofia narrada** — história da filosofia como enredo, não como programa de curso.  
**H2:** o golpe metaficcional (Sofia / Hilde) ensina a **inspeccionar o quadro** — método próximo do laboratório.  
**H3:** Gaarder em Pessoas; *Sofia* e *Curinga* são **duas obras**, duas fichas.

## Génese

| Marco | Nota |
|-------|------|
| 1991 Noruega | *Sofies verden* — fenómeno escolar e de banca |
| Traduções | Circulação global; o laboratório inspecciona o **livro**, não a série de TV |
| Ofício Gaarder | Já fichado — aqui só o objecto-romance |

## Tese BudGanja

Sofia **aprende a perguntar**. O laboratório não adopta o sumário completo da história da filosofia ocidental: usa o romance como **máquina de curiosidade** — par do Curinga, que pergunta de outro ângulo (jogo, viagem, carta).

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [Jostein Gaarder](${gaarder}) | Pessoa / ofício |
| [O Dia do Curinga](${curinga}) | Outro livro, outra pergunta |
| Hub [Artes](${HUB}) | Série |

## Status

**Aprovado na série Artes** — romance de 1991 primeiro; autor em Gaarder.

[▶ Artes](${HUB}) · [▶ Gaarder](${gaarder}) · [▶ Curinga](${curinga}) · [▶ Valeu !!!](${VALEU})
`;

  const { contentEn, contentEs } = wrapEnEs(
    {
      workEn: "Sophie's World",
      workEs: 'El mundo de Sofía',
      kindEn: 'Gaarder, 1991',
      kindEs: 'Gaarder, 1991',
      objectEn: 'novel',
      objectEs: 'la novela',
      authorLineEn: 'Author biography lives on the Gaarder People sheet. Pair: The Solitaire Mystery.',
      authorLineEs: 'La biografía del autor vive en Personas (Gaarder). Par: El misterio del solitario.',
      sourceLabel: 'Wikipedia',
      sourceUrl: wikiEn,
      creditEn: 'Jostein Gaarder',
      creditEs: 'Jostein Gaarder',
      cutEn: 'Not a university syllabus. Not the TV adaptation.',
      cutEs: 'No es temario universitario. No es la adaptación televisiva.'
    },
    '**H1:** narrated philosophy as plot. **H2:** the metafictional twist trains inspection of the frame. **H3:** two Gaarder books, two sheets.',
    '**H1:** filosofía narrada como trama. **H2:** el golpe metaficcional entrena inspeccionar el marco. **H3:** dos libros de Gaarder, dos fichas.'
  );
  return { body, contentEn, contentEs, wiki };
}

function buildPollanBodies() {
  const stuff = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const plantas = '/plantas/';
  const maca = '/posts/post-inspecao-planta-maca.html';
  const wiki = 'https://en.wikipedia.org/wiki/The_Botany_of_Desire';

  const body = `## Escopo

Inspeção editorial de **«The Botany of Desire»** (*A Botânica do Desejo*) — ensaio de **Michael Pollan**, **2001**. O **início de tudo** é o **livro**: quatro plantas (maçã, tulipa, cannabis, batata) e a tese de que **elas também nos domesticam**. O documentário PBS (2009) é **eco**, não o objecto desta ficha.

> **Nota metodológica:** auditoria independente. Âncora: [Wikipedia · The Botany of Desire](${wiki}). Crédito: Michael Pollan / Random House. Sem afiliação. **Não é ficha de cultivo** nem endosso de uma espécie. Cruzar com o catálogo [Plantas](${plantas}) e com [A História das Coisas](${stuff}) (outra máquina: materiais, não desejo).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **The Botany of Desire** (2001) |
| Autor | **Michael Pollan** |
| Género | Ensaio / narrativa de ciências e cultura |
| Tipo BudGanja | Arte — **livro primeiro** (PBS = eco) |
| Capítulos-planta | Maçã · tulipa · cannabis · batata |
| Elo Plantas | [catálogo](${plantas}) · [maçã](${maca}) |
| Elo Artes | [A História das Coisas](${stuff}) |
| Data da inspeção | ${INSPECTED} |

## Hipóteses

**H1:** a tese útil ao laboratório é a **co-evolução** — desejo humano × estratégia da planta — sem virar misticismo.  
**H2:** o capítulo cannabis entra como **história cultural da planta**, não como receita.  
**H3:** Leonard mapeia o ciclo *coisa*; Pollan mapeia o ciclo *desejo* — complementares, não idênticos.

## Génese

| Marco | Nota |
|-------|------|
| 2001 | Livro — quatro desejos: doçura, beleza, intoxicação, controlo |
| 2009 PBS | Documentário posterior — não substitui o ensaio |
| Maçã | Par natural com a ficha [maçã](${maca}) e com derivados de suco |

## Tese BudGanja

Pollan **inverte a pergunta**: não só «o que fazemos às plantas», mas «o que as plantas fazem connosco». O laboratório guarda a inversão como **método de inspeção** — e recusa transformar o ensaio em guia de jardim ou de uso.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [Plantas](${plantas}) | Catálogo de espécies |
| [Maçã](${maca}) | Capítulo doçura / fruto |
| [A História das Coisas](${stuff}) | Outra economia (materiais) |
| [Wikipedia](${wiki}) | Âncora |

## Status

**Aprovado na série Artes** — ensaio 2001 primeiro; PBS como eco.

[▶ Artes](${HUB}) · [▶ Plantas](${plantas}) · [▶ Leonard](${stuff}) · [▶ Valeu !!!](${VALEU})
`;

  const { contentEn, contentEs } = wrapEnEs(
    {
      workEn: 'The Botany of Desire',
      workEs: 'La botánica del deseo',
      kindEn: 'Michael Pollan, 2001',
      kindEs: 'Michael Pollan, 2001',
      objectEn: 'essay',
      objectEs: 'el ensayo',
      authorLineEn: 'PBS 2009 is an echo, not this sheet’s object.',
      authorLineEs: 'El PBS 2009 es eco, no el objeto de esta ficha.',
      sourceLabel: 'Wikipedia',
      sourceUrl: wiki,
      creditEn: 'Michael Pollan',
      creditEs: 'Michael Pollan',
      cutEn: 'Not a grow sheet. Four plants: apple, tulip, cannabis, potato.',
      cutEs: 'No es ficha de cultivo. Cuatro plantas: manzana, tulipán, cannabis, patata.'
    },
    '**H1:** co-evolution without mysticism. **H2:** cannabis chapter = cultural history, not a recipe. **H3:** Leonard maps stuff; Pollan maps desire.',
    '**H1:** coevolución sin misticismo. **H2:** el capítulo cannabis es historia cultural, no receta. **H3:** Leonard mapea la cosa; Pollan, el deseo.'
  );
  return { body, contentEn, contentEs, wiki };
}

function buildCarsonBodies() {
  const wiki = 'https://en.wikipedia.org/wiki/Silent_Spring';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Primavera_Silenciosa';
  const stuff = '/posts/post-inspecao-arte-a-historia-das-coisas.html';

  const body = `## Escopo

Inspeção editorial de **«Silent Spring»** (*Primavera Silenciosa*) — ensaio de **Rachel Carson**, **1962**. O **início de tudo** é o **livro**: DDT e pesticidas organoclorados, cadeias alimentares, e a pergunta de uma primavera **sem canto de aves**. Não é biografia da autora (Pessoas, se vier) nem manual de agronomia.

> **Nota metodológica:** auditoria independente. Âncora: [Wikipedia · Silent Spring](${wiki}) · [PT](${wikiPt}). Crédito: Rachel Carson / Houghton Mifflin. Sem afiliação. O laboratório **não** transforma o ensaio em protocolo de pragas nem em processo contra uma marca. História ambiental ≠ ficha de derivado alimentar (açúcar); o par mais próximo em Artes é [A História das Coisas](${stuff}) — outra máquina, mesmo hábito de **seguir a cadeia**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Silent Spring** (1962) |
| Autora | **Rachel Carson** (1907–1964) |
| Género | Ensaio de ciência e opinião pública |
| Tipo BudGanja | Arte — **livro primeiro** |
| Tema | Pesticidas sintéticos · ecologia · literacia de risco |
| Elo Artes | [A História das Coisas](${stuff}) — seguir a cadeia |
| Data da inspeção | ${INSPECTED} |

## Hipóteses

**H1:** Carson **ensina a inspeccionar o invisível** (resíduo, bioacumulação, silêncio) — método irmão do laboratório.  
**H2:** o valor não é nostalgia rural: é **prova narrativa + ciência pública** contra a evidência que a indústria queria estreita.  
**H3:** DDT aqui é **capítulo histórico**; não confundir com a série Derivados de fruto/açúcar.

## Génese

| Marco | Nota |
|-------|------|
| 1962 | Publicação — debate EUA, EPA posterior (contexto histórico) |
| Título | Primavera sem vozes — metáfora ecológica, não poema ornamental |
| Ofício | Bióloga e escritora — a ficha inspecciona o **livro**, não o CV completo |

## Tese BudGanja

Carson pede **seguir a substância na cadeia** (solo, água, gordura, ovo, canto). O laboratório reconhece o gesto: é o mesmo que, noutro eixo, pede seguir o **açúcar** no rótulo. Sem misturar os eixos.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [A História das Coisas](${stuff}) | Cadeia material / descarte |
| [Wikipedia](${wiki}) | Âncora |
| Hub [Artes](${HUB}) | Série |

## Status

**Aprovado na série Artes** — ensaio fundador de 1962 fichado como literacia ecológica, não como manual de campo.

[▶ Artes](${HUB}) · [▶ Leonard](${stuff}) · [▶ Valeu !!!](${VALEU})
`;

  const { contentEn, contentEs } = wrapEnEs(
    {
      workEn: 'Silent Spring',
      workEs: 'Primavera silenciosa',
      kindEn: 'Rachel Carson, 1962',
      kindEs: 'Rachel Carson, 1962',
      objectEn: 'essay',
      objectEs: 'el ensayo',
      authorLineEn: 'Founding ecological essay — not a pest-control manual.',
      authorLineEs: 'Ensayo ecológico fundador — no es manual de plagas.',
      sourceLabel: 'Wikipedia',
      sourceUrl: wiki,
      creditEn: 'Rachel Carson',
      creditEs: 'Rachel Carson',
      cutEn: 'DDT here is historical chapter, not a fruit-sugar derivative sheet.',
      cutEs: 'El DDT aquí es capítulo histórico, no ficha de derivado de azúcar.'
    },
    '**H1:** inspecting the invisible (residue, silence). **H2:** public science vs narrowed industry evidence. **H3:** don’t mix this axis with fruit-sugar derivatives.',
    '**H1:** inspeccionar lo invisible. **H2:** ciencia pública contra evidencia estrecha. **H3:** no mezclar este eje con derivados de azúcar.'
  );
  return { body, contentEn, contentEs, wiki };
}

function assignOrders(builders) {
  let next = nextArteOrder();
  return builders.map((fn) => {
    const post = fn(0);
    const keep = existingOrder(post.slug);
    if (keep) return fn(keep);
    const out = fn(next);
    next += 1;
    return out;
  });
}

function buildDiambaHqPost(order) {
  const { body, contentEn, contentEs, wiki } = buildDiambaHqBodies();
  return artePost({
    title:
      'Inspeção: Diamba (HQ, Daniel Paiva) — histórias do proibicionismo no Brasil',
    titleEn:
      'Inspection: Diamba (comics, Daniel Paiva) — stories of prohibition in Brazil',
    titleEs:
      'Inspección: Diamba (HQ, Daniel Paiva) — historias del prohibicionismo en Brasil',
    excerpt:
      'Artes: HQ de Daniel Paiva sobre criminalização e raça no Brasil — distinta da antologia Diamba Sarabamba (1986). Livro primeiro; palavra diamba como elo.',
    excerptEn:
      'Arts: Daniel Paiva’s comics on criminalization and race in Brazil — distinct from the 1986 Diamba Sarabamba anthology. Book first; diamba as word-link.',
    excerptEs:
      'Artes: HQ de Daniel Paiva sobre criminalización y raza en Brasil — distinta de la antología 1986. Libro primero; diamba como vínculo léxico.',
    slug: 'inspecao-arte-diamba-hq-paiva',
    date: '2026-08-24T14:00:00.000Z',
    seriesOrder: order || 89,
    seriesLabel: 'Diamba HQ · Artes',
    coverImage: 'imagens/inspecoes/diamba-hq-paiva-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildDeQuinceyPost(order) {
  const { body, contentEn, contentEs, wiki } = buildDeQuinceyBodies();
  return artePost({
    title:
      'Inspeção: Confissões de um Comedor de Ópio — De Quincey e a génese literária',
    titleEn:
      'Inspection: Confessions of an English Opium-Eater — De Quincey and literary genesis',
    titleEs:
      'Inspección: Confesiones de un inglés comedor de opio — De Quincey y la génesis literaria',
    excerpt:
      'Artes: De Quincey, 1821 — o ensaio que funda a confissão moderna do ópio. Livro primeiro; metáfora ≠ protocolo; elo com Tosches.',
    excerptEn:
      'Arts: De Quincey, 1821 — the essay that founds the modern opium confession. Book first; metaphor ≠ protocol; link to Tosches.',
    excerptEs:
      'Artes: De Quincey, 1821 — el ensayo que funda la confesión moderna del opio. Libro primero; metáfora ≠ protocolo; vínculo con Tosches.',
    slug: 'inspecao-arte-confissoes-comedor-opio',
    date: '2026-08-24T14:10:00.000Z',
    seriesOrder: order || 90,
    seriesLabel: 'De Quincey · Artes',
    coverImage: 'imagens/inspecoes/confissoes-comedor-opio-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildSofiaPost(order) {
  const { body, contentEn, contentEs, wiki } = buildSofiaBodies();
  return artePost({
    title: 'Inspeção: O Mundo de Sofia — Gaarder e a filosofia narrada',
    titleEn: "Inspection: Sophie's World — Gaarder and narrated philosophy",
    titleEs: 'Inspección: El mundo de Sofía — Gaarder y la filosofía narrada',
    excerpt:
      'Artes: O Mundo de Sofia (1991) — romance de Jostein Gaarder; filosofia como enredo. Livro primeiro; autor em Pessoas; par com O Dia do Curinga.',
    excerptEn:
      "Arts: Sophie's World (1991) — Gaarder’s novel; philosophy as plot. Book first; author in People; pair with The Solitaire Mystery.",
    excerptEs:
      'Artes: El mundo de Sofía (1991) — novela de Gaarder; filosofía como trama. Libro primero; autor en Personas; par con O Dia do Curinga.',
    slug: 'inspecao-arte-o-mundo-de-sofia',
    date: '2026-08-24T14:20:00.000Z',
    seriesOrder: order || 91,
    seriesLabel: 'O Mundo de Sofia · Artes',
    coverImage: 'imagens/inspecoes/o-mundo-de-sofia-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildPollanPost(order) {
  const { body, contentEn, contentEs, wiki } = buildPollanBodies();
  return artePost({
    title:
      'Inspeção: A Botânica do Desejo — Pollan e as plantas que nos domesticam',
    titleEn:
      'Inspection: The Botany of Desire — Pollan and the plants that domesticate us',
    titleEs:
      'Inspección: La botánica del deseo — Pollan y las plantas que nos domestican',
    excerpt:
      'Artes: The Botany of Desire (2001) — maçã, tulipa, cannabis, batata; co-evolução do desejo. Livro primeiro; PBS como eco; elo Plantas × História das Coisas.',
    excerptEn:
      'Arts: The Botany of Desire (2001) — apple, tulip, cannabis, potato; co-evolution of desire. Book first; PBS as echo; Plants × Story of Stuff link.',
    excerptEs:
      'Artes: La botánica del deseo (2001) — manzana, tulipán, cannabis, patata. Libro primero; PBS como eco; vínculo Plantas × Historia de las cosas.',
    slug: 'inspecao-arte-botanica-do-desejo',
    date: '2026-08-24T14:30:00.000Z',
    seriesOrder: order || 92,
    seriesLabel: 'Botânica do Desejo · Artes',
    coverImage: 'imagens/inspecoes/botanica-do-desejo-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildCarsonPost(order) {
  const { body, contentEn, contentEs, wiki } = buildCarsonBodies();
  return artePost({
    title:
      'Inspeção: Primavera Silenciosa — Rachel Carson e a cadeia invisível',
    titleEn:
      'Inspection: Silent Spring — Rachel Carson and the invisible chain',
    titleEs:
      'Inspección: Primavera silenciosa — Rachel Carson y la cadena invisible',
    excerpt:
      'Artes: Silent Spring (1962) — ensaio fundador de Carson sobre pesticidas e o silêncio das aves. Livro primeiro; literacia ecológica, não manual de pragas.',
    excerptEn:
      'Arts: Silent Spring (1962) — Carson’s founding essay on pesticides and birdsong gone quiet. Book first; ecological literacy, not a pest manual.',
    excerptEs:
      'Artes: Primavera silenciosa (1962) — ensayo fundador de Carson. Libro primero; literacia ecológica, no manual de plagas.',
    slug: 'inspecao-arte-primavera-silenciosa',
    date: '2026-08-24T14:40:00.000Z',
    seriesOrder: order || 93,
    seriesLabel: 'Primavera Silenciosa · Artes',
    coverImage: 'imagens/inspecoes/primavera-silenciosa-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

const ARTES_FILA_PRI2_POSTS = assignOrders([
  buildDiambaHqPost,
  buildDeQuinceyPost,
  buildSofiaPost,
  buildPollanPost,
  buildCarsonPost
]);

const ARTES_FILA_PRI2_META = [
  {
    sugId: 'arte-diamba-hq-paiva',
    slug: 'inspecao-arte-diamba-hq-paiva',
    coverTitle: 'Diamba HQ',
    coverSub: 'Daniel Paiva · proibicionismo'
  },
  {
    sugId: 'arte-confissoes-comedor-opio',
    slug: 'inspecao-arte-confissoes-comedor-opio',
    coverTitle: 'De Quincey',
    coverSub: 'Confissões · 1821'
  },
  {
    sugId: 'arte-o-mundo-de-sofia',
    slug: 'inspecao-arte-o-mundo-de-sofia',
    coverTitle: 'O Mundo de Sofia',
    coverSub: 'Gaarder · 1991'
  },
  {
    sugId: 'arte-botany-of-desire',
    slug: 'inspecao-arte-botanica-do-desejo',
    coverTitle: 'Botânica do Desejo',
    coverSub: 'Pollan · 2001'
  },
  {
    sugId: 'arte-primavera-silenciosa',
    slug: 'inspecao-arte-primavera-silenciosa',
    coverTitle: 'Primavera Silenciosa',
    coverSub: 'Carson · 1962'
  }
];

module.exports = {
  ARTES_FILA_PRI2_POSTS,
  ARTES_FILA_PRI2_META,
  buildDiambaHqPost,
  buildDeQuinceyPost,
  buildSofiaPost,
  buildPollanPost,
  buildCarsonPost
};
