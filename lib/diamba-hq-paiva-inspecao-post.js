'use strict';

/**
 * Inspeção Artes · HQ: Diamba — Histórias do Proibicionismo no Brasil
 * Daniel Paiva / Brasa (2023; 2.ª ed.). Livro primeiro.
 * Distinto de Diamba Sarabamba (Ground, 1986).
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

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildDiambaHqPaivaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const brasa = 'https://www.brasaeditora.com.br/produtos/livro-hq-diamba-2ed/';
  const uhq =
    'https://universohq.com/noticias/diamba-historias-do-proibicionismo-no-brasil-que-aborda-racismo-na-proibicao-da-cannabis-e-um-lancamento-da-brasa-editora/';
  const sarabamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const planta = '/plantas/cannabis-sativa/';
  const henman = '/posts/post-inspecao-figura-anthony-henman.html';
  const hc = '/posts/post-inspecao-guia-hc-seletividade-advogados.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const magnata = '/posts/post-inspecao-filme-o-magnata.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da HQ **«Diamba — Histórias do Proibicionismo no Brasil»** — documentário em quadrinhos de **Daniel Paiva**, **Brasa Editora** (**2023**; 2.ª ed. em catálogo). O **início de tudo** é o **livro**: pesquisa desenhada sobre criminalização e racismo estrutural. Distinto de [Diamba Sarabamba](${sarabamba}) (antologia Ground, **1986**) e da ficha-palavra [diamba](${diamba}).

> **Nota metodológica:** auditoria independente. Fontes: [Brasa · 2.ª ed.](${brasa}), [Universo HQ (25 ago. 2023)](${uhq}). Crédito: Daniel Paiva / Brasa / capa Victor Marcello (2.ª ed.) — **sem afiliação**. **Indexar ≠ endossar o manifesto de legalização** do autor. **Ficha ≠ reprodução da HQ** (não copiar pranchas nem letras de canções). Não é parecer jurídico nem incentivo a uso ilícito.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Diamba — Histórias do Proibicionismo no Brasil** |
| Autor (guião + desenho) | **Daniel Paiva** |
| Editora | Brasa Editora |
| Génese | **2023** (1.ª ed. brochura, ISBN 978-65-996161-6-7 · ~174–176 p.) |
| 2.ª ed. (catálogo) | Capa dura · **192 p.** · 155×230 mm · ISBN **978-65-989122-1-5** · Pantone verde Boldinho · capa **Victor Marcello** |
| Género | Documentário em quadrinhos · não-ficção histórica |
| Inspiração citada | *Cannabis — A Ilegalização da Maconha nos Estados Unidos* (Box Brown; Mino, 2019 no BR) |
| Tipo BudGanja | Arte — **HQ primeiro**; autor como crédito, não ficha Pessoas |
| Elo Palavras | [diamba](${diamba}) · [maconha](${maconha}) · [proibição × proibicionismo](${proibicao}) · [ilegal](${ilegal}) · [escravidão](${escravidao}) |
| Elo Artes (não confundir) | [Diamba Sarabamba](${sarabamba}) — coletânea 1986 · [Henman](${henman}) |
| Elo jurídico (referência) | [Guia HC e seletividade](${hc}) — outra sala; a HQ não o substitui |
| Fonte | [Brasa](${brasa}) · [UHQ](${uhq}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **volume desenhado de 2023** — Paiva quadriniza a versão brasileira depois de Box Brown; o laboratório lê a **obra**, não a campanha.  
**H2:** o título [diamba](${diamba}) recupera o cognato afro-brasileiro que o estigma de [maconha](${maconha}) e o latinismo clínico empurram para o arquivo.  
**H3:** a tese da HQ (proibição como controlo racial/periférico) entra como **tese do autor**; o laboratório cruza com [proibicionismo](${proibicao}), [escravidão](${escravidao}) e [seletividade](${hc}) — sem fundir manifesto e ofício.  
**H4:** [Diamba Sarabamba](${sarabamba}) é **arquivo de ensaios 1986**; esta HQ é **narrativa gráfica 2023**. Mesma palavra no título, objectos distintos.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* HQ *deste* autor.

Passos:

1. Fixar génese editorial (ano, ISBNs, 1.ª / 2.ª ed.).  
2. Declarar tese a partir do **livro**.  
3. Separar da antologia 1986 e da ficha-palavra.  
4. Indexar episódios citados (Verão da Lata, Planet Hemp…) como **nós de enredo**, não biografias.  
5. Status + fila.

## O início de tudo — génese da HQ

Paiva parte de *Cannabis* de Box Brown (EUA) e desenha o recorte brasileiro: pesquisa histórica + narrativa descontínua. [UHQ](${uhq}) (ago. 2023) anuncia pré-venda da 1.ª ed. A [Brasa](${brasa}) descreve a 2.ª ed. como sucesso de catálogo: miolo a duas cores, pintura trilateral verde.

A abertura citada pelas fontes: notícia de um jovem preso por **boné com folha** — [ilegal](${ilegal}) colado ao signo, não à planta. Daí uma rusga em favela (qualquer grande cidade) e *flashbacks*: China antiga, navegações, colonização, [escravidão](${escravidao}), proibicionismo do séc. XX, Guerra às Drogas, debate de legalização.

> **Hierarquia BudGanja:** sem o livro de 2023 não há HQ a inspecionar. A palavra [diamba](${diamba}) é elo; a antologia de 1986 é **outra** ficha.

## Tese cultural BudGanja

A editora e o autor chamam a obra de **manifesto antirracista** pela legalização. O laboratório **regista** essa autoria e **não** a adopta como protocolo: inspecionar a HQ ≠ assinar o programa político.

| Tema na obra | Tradução editorial |
|--------------|-------------------|
| Título *Diamba* | Cognato [diamba](${diamba}) — originalidade afro-atlântica, não gíria de prateleira |
| Boné / signo | Punição do símbolo — [ilegal](${ilegal}) como etiqueta social |
| Rusga na favela | [Seletividade](${hc}) no ecrã da prancha; o guia jurídico é outra sala |
| Escravidão / diáspora | Elo com [escravidão](${escravidao}) e com a viagem da palavra [maconha](${maconha}) |
| Proibição × planta | [Proibicionismo](${proibicao}) descreve política; a [planta](${planta}) é o referente botânico |
| Box Brown (EUA) | Modelo formal (HQ-documentário); o recorte BR não copia o étimo *marijuana* |

## Nós de enredo (indexar, não inventariar)

Fontes de imprensa/editora citam, na HQ: prisões de **Gilberto Gil**, **Rita Lee**, **Planet Hemp**; **Verão da Lata** (1987); **Verão do Apito** (Posto 9, 1996). Aqui são **marcos do guião**. Sem ficha Pessoas para cada nome; [Chorão](${chorao}) / Planet Hemp na genealogia cultural da casa é **referência**, não colagem biográfica. [*O Magnata*](${magnata}) é outro objecto (filme 2007).

Letras de músicas que costuram a narrativa: **não reproduzir**.

## O que esta ficha não é

| Confusão | Corte |
|----------|-------|
| [Diamba Sarabamba](${sarabamba}) (1986) | Antologia de ensaios; organizadores Henman / Pessoa Jr. |
| [diamba](${diamba}) ( Palavras ) | Vocábulo; a HQ *usa* o nome |
| *Diamba — A Utopia* (Brasa, gibi) | Outra obra do mesmo autor — eco, fora do recorte |
| *Beto e Dé e outros Quadrinhos Canábicos* | Outra HQ de Paiva — **fila** (par gráfico) |
| Manifesto de legalização | Tese do autor; o lab indexa, não assina |
| Pranchas / letra completa | Fora — [respeito](${respeito}) ao crédito da obra |

## Elo com Palavras e arquivo

| Recurso | Papel |
|---------|-------|
| [diamba](${diamba}) | Cognato no título |
| [maconha](${maconha}) | Estigma / fala corrente que a HQ historiciza |
| [proibição × proibicionismo](${proibicao}) | Camada política |
| [escravidão](${escravidao}) | Viagem atlântica no *flashback* |
| [Diamba Sarabamba](${sarabamba}) | Arquivo 1986 — **não** esta HQ |
| Hub [Palavras](${palavras}) | Método da palavra; a HQ é Artes |

## Avaliação BudGanja

### Forças
- Fecha o aviso já escrito em [Sarabamba](${sarabamba}): a HQ Paiva/Brasa tinha nome, faltava ficha.  
- Génese verificável (UHQ 2023 + catálogo Brasa 2.ª ed.).  
- Título alinhado à série Palavras sem fundir objectos.

### Limites
- Não resume prancha a prancha.  
- Não verifica cada facto histórico da HQ contra arquivo primário — a inspeção é **editorial**.  
- *A Utopia* e *Beto e Dé* ficam na fila.

## Status

**Aprovado na série Artes** — HQ 2023 primeiro; antologia 1986 em [Sarabamba](${sarabamba}); vocábulo em [diamba](${diamba}). [Valeu !!!](${mantra})

[▶ Artes](${hub}) · [▶ Diamba (palavra)](${diamba}) · [▶ Sarabamba](${sarabamba}) · [▶ Proibicionismo](${proibicao}) · [Brasa](${brasa})
`;

  const contentEn = `## Scope

Editorial inspection of the documentary comic **Diamba — Histórias do Proibicionismo no Brasil** by **Daniel Paiva** (Brasa, **2023**; 2nd ed. in catalogue). The **book** comes first. Distinct from [Diamba Sarabamba](${sarabamba}) (1986 anthology) and the word sheet [diamba](${diamba}).

> **Method note:** [Brasa](${brasa}), [Universo HQ](${uhq}). Credit: Paiva / Brasa — **no affiliation**. Indexing ≠ endorsing the author’s legalization manifesto. Do not reproduce pages or song lyrics.

## Inspected object

| Field | Value |
|-------|-------|
| Work | **Diamba — Histórias do Proibicionismo no Brasil** |
| Author | Daniel Paiva (script + art) |
| Publisher | Brasa Editora |
| Genesis | **2023** (1st paperback; 2nd hardcover, 192 pp., ISBN 978-65-989122-1-5) |
| BudGanja type | Art — **comics first** |
| Word links | [diamba](${diamba}) · [maconha](${maconha}) · [prohibition](${proibicao}) · [slavery](${escravidao}) |
| Date | ${inspected} |

## Thesis

Afro-Atlantic title · cap-as-crime as plot hinge · prohibition as population control in the author’s thesis — the lab records it, does not sign it · 1986 essay anthology is another object. [Valeu !!!](${mantra})

## Status

**Approved in Arts** — 2023 HQ first; [Sarabamba](${sarabamba}) remains 1986.

[▶ Arts](${hub}) · [▶ diamba](${diamba}) · [Brasa](${brasa})
`;

  const contentEs = `## Alcance

Inspección del cómic documental **Diamba — Histórias do Proibicionismo no Brasil** de **Daniel Paiva** (Brasa, **2023**; 2.ª ed.). Primero el **libro**. Distinto de [Diamba Sarabamba](${sarabamba}) (antología 1986) y de la ficha [diamba](${diamba}).

> **Nota metodológica:** [Brasa](${brasa}), [Universo HQ](${uhq}). Crédito: Paiva / Brasa — **sin afiliación**. Indexar ≠ respaldar el manifiesto de legalización. No reproducir viñetas ni letras.

## Objeto

| Campo | Valor |
|-------|-------|
| Obra | **Diamba — Histórias do Proibicionismo no Brasil** |
| Autor | Daniel Paiva |
| Editorial | Brasa Editora |
| Génesis | **2023** (2.ª ed. tapa dura, 192 p.) |
| Tipo lab | Arte — **HQ primero** |
| Vínculos | [diamba](${diamba}) · [maconha](${maconha}) · [prohibición](${proibicao}) |
| Fecha | ${inspected} |

## Tesis

Título afroatlántico · el signo (gorra) como bisagra · la tesis del autor sobre control racial — el lab la registra, no la firma · la antología de 1986 es otro objeto. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Artes** — HQ 2023 primero; [Sarabamba](${sarabamba}) sigue siendo 1986.

[▶ Artes](${hub}) · [▶ diamba](${diamba}) · [Brasa](${brasa})
`;

  return { body, contentEn, contentEs, brasa };
}

function buildDiambaHqPaivaPost(seriesOrder) {
  const { body, contentEn, contentEs, brasa } = buildDiambaHqPaivaBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-arte-diamba-hq-paiva', 85);
  return artePost({
    title: 'Inspeção: Diamba — a HQ do proibicionismo no Brasil (Daniel Paiva, 2023)',
    titleEn: 'Inspection: Diamba — the Brazilian prohibition comic (Daniel Paiva, 2023)',
    titleEs: 'Inspección: Diamba — el cómic del prohibicionismo en Brasil (Daniel Paiva, 2023)',
    excerpt:
      'Artes · HQ: Diamba — Histórias do Proibicionismo no Brasil (Paiva / Brasa, 2023) — livro primeiro; distinto da antologia Sarabamba 1986; Valeu !!!',
    excerptEn:
      'Arts · comics: Diamba — Histórias do Proibicionismo no Brasil (Paiva / Brasa, 2023) — the book first; distinct from the 1986 Sarabamba anthology; Valeu !!!',
    excerptEs:
      'Artes · HQ: Diamba — Histórias do Proibicionismo no Brasil (Paiva / Brasa, 2023) — el libro primero; distinta de la antología Sarabamba 1986; ¡Valeu !!!',
    slug: 'inspecao-arte-diamba-hq-paiva',
    date: '2026-08-22T16:45:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Diamba HQ · Artes',
    coverImage: '/imagens/inspecoes/diamba-hq-paiva-cover.jpg',
    sourceUrl: brasa,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDiambaHqPaivaPost,
  buildDiambaHqPaivaBodies
};
