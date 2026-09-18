'use strict';

/**
 * Inspeção Legado · Iberê Thenório — ofício de ciência no ecrã BR.
 * Pessoa ≠ canal: arquivo em post-inspecao-canal-manual-do-mundo.html.
 */

function pessoaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'legado-pessoas',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Iberê Thenório · legado',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  return post;
}

function buildIbereThenorioBodies(inspected) {
  const canal = '/posts/post-inspecao-canal-manual-do-mundo.html';
  const maker = '/posts/post-inspecao-manual-maker.html';
  const videos = '/videos/?channel=manualdomundo';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const crianca = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const rasmussen = '/posts/post-inspecao-richard-rasmussen.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const wiki = 'https://pt.wikipedia.org/wiki/Iberê_Thenório';
  const wikiCanal = 'https://pt.wikipedia.org/wiki/Manual_do_Mundo';
  const site = 'https://www.manualdomundo.com.br';
  const yt = 'https://www.youtube.com/@manualdomundo';

  const body = `## Escopo

Inspeção editorial e documental do **legado público** de **Iberê Francisco Thenório** (Sorocaba, 4 de dezembro de 1981) — jornalista (ECA-USP) e cofundador do [Manual do Mundo](${canal}) com Mariana Fulfaro (2008). Esta página **merece [respeito](${respeito})**: *respicere* — **olhar de novo**. Não é altar nem fã-clube. É considerar a sério quase duas décadas a **levar ciência e ofício maker ao ecrã brasileiro**. O handle do canal é o projecto; esta ficha é a **pessoa**.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikipédia · Iberê Thenório](${wiki}), [Manual do Mundo](${wikiCanal}), [site](${site}), [canal](${yt}). **Sem afiliação**. Capítulo de **Legado** de divulgação — distinto do eixo clínico Ticão–Carlini. **Pessoa ≠ canal.** O [Manual Maker](${maker}) é série **no mesmo canal**, não loja. Indexar ≠ endosso de cada demo. Esta inspeção é **[especial](${especial})**: pessoa + canal + ofício.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Iberê Francisco Thenório** |
| Nascimento | 4 de dezembro de 1981, Sorocaba (SP) |
| Formação | Jornalismo — ECA-USP |
| Ofício | Jornalista · youtuber · divulgador de ciência |
| Feito âncora | Cofundar o Manual do Mundo (2008) com Mariana Fulfaro; canal de ciência/tecnologia com recorde Guinness de inscritos (2018) |
| Canal | [Inspeção do canal](${canal}) · [Vídeos](${videos}) — **pessoa ≠ canal** |
| Destaque do arquivo | [Manual Maker](${maker}) |
| Elo BudGanja | Legado · [respeito](${respeito}) · [especial](${especial}) · [Toda criança nasce cientista](${crianca}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O laboratório já fichou [Toda criança nasce cientista](${crianca}) — vocação, não slogan vazio. Iberê é uma das vozes BR mais reconhecíveis desse ecrã: experiências, recordes, Maker. Omiti-lo seria falhar o método — **crédito a quem merece**. Colocá-lo no Legado junto de ofícios de ecrã como [Rasmussen](${rasmussen}) é continuidade de divulgação, **não** fusão de pessoas (fauna ≠ laboratório de palco).

## Respeito devido

No lab, [respeito](${respeito}) não é elogio vazio: é **voltar a olhar** e ajustar o trato.

| Alvo | O que o lab considera |
|------|------------------------|
| **O ofício** | Jornalista que apresenta ciência — não «influencer de explosão» |
| **O público** | Décadas de literacia científica em horário aberto (YouTube, Cartoon Network) |
| **O par** | Mariana Fulfaro — cofundação; esta ficha **não** apaga a sócia |
| **O recorde** | Guinness 2018 é feito de canal; [verdade](${verdade}) de palco, não paper |

## Hipóteses e método

- **H1:** o legado de Iberê é **divulgação de ciência** antes de ser «recorde no YouTube».
- **H2:** o YouTube (handle histórico *iberethenorio* → @manualdomundo) é o **arquivo vivo** do mesmo ofício.
- **H3:** o [Manual Maker](${maker}) é o recorte de **construir**; as demos de palco pedem [risco](${risco}) à vista.
- **H4:** pessoa ≠ canal ≠ Maker ≠ loja alheia (manualmaker.com.br **não** é o projecto).
- **Método:** (1) síntese biográfica pública; (2) carreira de ecrã; (3) respeito devido; (4) mérito; (5) limites; (6) elos; (7) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1981 | Nasce em Sorocaba (SP). |
| 2000s | Forma-se em jornalismo na ECA-USP. |
| 2008 | Cofunda o **Manual do Mundo** com Mariana Fulfaro — blog, depois YouTube. |
| 2010s | Canal torna-se referência BR de experiências (pasta de dente de elefante, torres, recordes). |
| 2018 | Guinness: canal de ciência e tecnologia com mais inscritos no YouTube (à data). |
| 2010s– | *Experimentos Extraordinários* (Cartoon Network). Livros e palco ao vivo. |
| 2010s– | Série **Manual Maker** no mesmo canal — Arduino, 3D, laser. |
| 2026 | Inspeção BudGanja: pessoa + canal + Maker. |

## Achados (mérito devido)

1. **Ofício de ecrã** — quase duas décadas a traduzir física, química e engenharia caseira para um público amplo, com voz reconhecível.
2. **Arquivo YouTube** — o canal próprio torna o ofício **inspeccionável** no lab: ver [ficha do canal](${canal}).
3. **Maker** — ensinar a construir (Arduino, 3D, laser) é o destaque desta entrega, não um extra de merch.
4. **Par cofundador** — Mariana Fulfaro está no nascimento do projecto; Iberê **não** é o canal sozinho.
5. **Elo lexical** — [Toda criança nasce cientista](${crianca}) como vocação de ecrã, não como diploma.

## Limites

[Respeito](${respeito}) sem [verdade](${verdade}) vira cartaz.

- **Experiências de palco** não são protocolo de laboratório. [Risco](${risco}) primeiro — explosão, electricidade, química.
- **Guinness** é recorde de inscritos, não veredicto científico.
- **Esta ficha não é biografia fechada** nem entrevista: é legado público + ponte para o [canal](${canal}).
- **Sem afiliação**, sem merch BudGanja, sem confundir com lojas homónimas.

## Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Canal · Manual do Mundo](${canal}) · [Vídeos](${videos}) | Arquivo YouTube — pessoa ≠ canal |
| [Manual Maker](${maker}) | Destaque de ofício no mesmo canal |
| [especial](${especial}) · [respeito](${respeito}) | Esta entrega: inspeção especial |
| [Toda criança nasce cientista](${crianca}) | Vocação — ecrã de ciência |
| [Rasmussen](${rasmussen}) | Outro ofício de ecrã BR — fauna ≠ lab de palco |
| [Faça o melhor!](${mantra}) | Fecho de ofício |

## Status

**Aprovado com respeito de ofício** — Iberê Thenório · Legado; canal em [Canais](${canal}); destaque [Manual Maker](${maker}). Mérito à vista; demos com [risco](${risco}). Sem afiliação.

[▶ Canal](${canal}) · [▶ Maker](${maker}) · [▶ Vídeos](${videos}) · [▶ Legado](${legado}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Iberê Francisco Thenório** (b. 4 Dec 1981, Sorocaba) — journalist (ECA-USP) and co-founder of [Manual do Mundo](${canal}) with Mariana Fulfaro (2008). **Person ≠ channel.** Highlight of the archive: [Manual Maker](${maker}). Independent audit; sources: [Wikipedia](${wiki}), [channel](${yt}). No affiliation. Cataloguing ≠ endorsement of every demo.

## Status

**Approved with craft respect** — Legacy sheet. Channel catalogued separately.

[▶ Channel](${canal}) · [▶ Maker](${maker}) · [▶ Videos](${videos})
`;

  const contentEs = `## Alcance

Inspección de **Iberê Francisco Thenório** (n. 4 dic. 1981, Sorocaba) — periodista (ECA-USP) y cofundador de [Manual do Mundo](${canal}) con Mariana Fulfaro (2008). **Persona ≠ canal.** Destaque del archivo: [Manual Maker](${maker}). Auditoría independiente; fuentes: [Wikipedia](${wiki}), [canal](${yt}). Sin afiliación.

## Estado

**Aprobada con respeto de oficio** — ficha de legado. El canal se cataloga aparte.

[▶ Canal](${canal}) · [▶ Maker](${maker}) · [▶ Vídeos](${videos})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildIbereThenorioPost(seriesOrder) {
  const inspected = '2026-08-21';
  const { body, contentEn, contentEs, wiki } = buildIbereThenorioBodies(inspected);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 11;
  return pessoaPost({
    title: 'Inspeção: Iberê Thenório — ofício de ciência no ecrã brasileiro',
    titleEn: 'Inspection: Iberê Thenório — science craft on Brazilian screens',
    titleEs: 'Inspección: Iberê Thenório — oficio de ciencia en la pantalla brasileña',
    excerpt:
      'Legado: Iberê Thenório — jornalista (ECA-USP), cofundador do Manual do Mundo (2008) com Mariana Fulfaro; pessoa ≠ canal; destaque Manual Maker.',
    excerptEn:
      'Legacy: Iberê Thenório — journalist (ECA-USP), co-founder of Manual do Mundo (2008) with Mariana Fulfaro; person ≠ channel; Manual Maker highlight.',
    excerptEs:
      'Legado: Iberê Thenório — periodista (ECA-USP), cofundador de Manual do Mundo (2008) con Mariana Fulfaro; persona ≠ canal; destaque Manual Maker.',
    slug: 'inspecao-ibere-thenorio',
    date: '2026-08-21T17:05:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Iberê Thenório · legado',
    coverImage: '/imagens/inspecoes/ibere-thenorio-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIbereThenorioPost,
  buildIbereThenorioBodies
};
