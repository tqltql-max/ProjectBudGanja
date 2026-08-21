'use strict';

/**
 * Inspeção Canais · Instituto Conhecimento Liberta — jornalismo YouTube.
 * Cursos (icl.com.br) ≠ canal. Catalogar ≠ endosso político.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./icl-categories.js');

function loadCatalog() {
  const candidates = [
    'institutoconhecimentoliberta.json',
    'iclnoticias.json',
    'icl.json'
  ];
  for (const name of candidates) {
    try {
      const file = path.join(ROOT, 'content', 'channels', name);
      if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
      }
    } catch (e) {
      /* next */
    }
  }
  return { videos: [], categories: [], videoCount: 0 };
}

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
    series: opts.series || 'canal-icl',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'ICL · Canais',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.videoCount != null) post.videoCount = opts.videoCount;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function mdTitle(title) {
  return String(title || '').replace(/\[/g, '\\[').replace(/\|/g, ' ');
}

function pickSeed(videos) {
  const list = videos || [];
  return (
    list.find((v) => v.category === 'documentario') ||
    list.find((v) => v.category === 'historica') ||
    list.find((v) => v.category === 'entrevista') ||
    list.find((v) => v.category === 'noticias') ||
    list[0] || { id: '', title: 'Instituto Conhecimento Liberta' }
  );
}

function catTable(ch) {
  const counts = {};
  (ch.videos || []).forEach((v) => {
    const id = v.category || 'outros';
    counts[id] = (counts[id] || 0) + 1;
  });
  const rows = CATEGORIES.filter((c) => counts[c.id])
    .map((c) => '| **' + c.label + '** | ' + counts[c.id] + ' |')
    .join('\n');
  return rows || '| — | 0 |';
}

function meritSamples(ch, id, n) {
  return (ch.videos || [])
    .filter((v) => v.category === id)
    .slice(0, n || 5)
    .map((v) => '- [' + mdTitle(v.title) + '](https://www.youtube.com/watch?v=' + v.id + ')')
    .join('\n');
}

function buildIclCanalBodies(ch) {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const cursos = '/posts/post-inspecao-icl-cursos.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Instituto_Conhecimento_Liberta';
  const programacao = 'https://iclnoticias.com.br/conhecimento/icl/';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Instituto Conhecimento Liberta';
  const handle = ch.handle || '@institutoconhecimentoliberta';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@institutoconhecimentoliberta';
  const channelId = ch.channelId || 'UCaIqJHHo9TJiLINzOFJRl2Q';
  const noticias = meritSamples(ch, 'noticias', 5);
  const desperta = meritSamples(ch, 'desperta', 4);
  const historica = meritSamples(ch, 'historica', 4);
  const entrevista = meritSamples(ch, 'entrevista', 4);
  const radio = meritSamples(ch, 'radio', 4);
  const mercado = meritSamples(ch, 'mercado', 4);

  const body = `## Escopo

Inspeção editorial do canal **[${name}](${channelUrl})** (${handle}) — arquivo público de **jornalismo ao vivo** do Instituto Conhecimento Liberta. Complementa a ficha **[ICL Cursos](${cursos})**: aqui audita-se o **ecrã YouTube** (grades de ~8 h/dia, telejornais, entrevistas), não o LMS de aulas pagas.

> **Nota metodológica:** auditoria independente. Recorte de catálogo BudGanja: **${count}** vídeos recentes classificados pelo título (o canal público tem dezenas de milhares de lives — não espelhamos o arquivo inteiro no hub de cultivo). Fontes: [canal](${channelUrl}), [Wikipédia](${wiki}), [programação institucional](${programacao}). Crédito ao ICL — **sem afiliação**. **Cursos ≠ canal.** Catalogar ≠ endosso político. Este canal **não** entra no filtro principal de [/videos/](/videos/) (cultivo, ciência, natureza): o ofício aqui é jornalismo.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| URL | [${channelUrl}](${channelUrl}) |
| Desde | **2020** — mesmo ciclo da fundação do instituto |
| Missão (leitura BudGanja) | ${ch.mission || 'Jornalismo ao vivo no YouTube; cursos na plataforma paga. Cursos ≠ canal.'} |
| Itens no recorte | **${count}** (amostra recente, não o acervo completo) |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **jornalismo / debate** · Canais · distinto de [Cursos](${cursos}) |
| Elo formação | [ICL Cursos](${cursos}) · contraste [UNIFESP](${unifesp}) · [MovReCam](${movrecam}) |
| Elo Palavras | [verdade](${verdade}) · [mensagem](${mensagem}) · [respeito](${respeito}) · [risco](${risco}) · [especial](${especial}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito público do canal **não** é o LMS — é sustentar **programação jornalística diária** em directo, com nomes reconhecíveis da imprensa BR.  
**H2:** **live ≠ aula.** Uma edição de 6 h de ICL Notícias não é o curso de filosofia da assinatura.  
**H3:** o ICL **declara lado** (progressista). Indexar a grade é [verdade](${verdade}) de recorde; o laboratório **não** adopta a linha editorial.  
**H4:** volume (milhões de inscritos, milhares de vídeos) **não** cabe no hub [/videos/](/videos/) sem afogar cultivo e UNIFESP — por isso o recorte fica nesta ficha.  
**H5:** fecho = [Faça o melhor!](${mantra}).

## Programação pública (segunda a sexta, 2025)

Síntese da grade divulgada pelo próprio ICL / Wikipédia. Horários e apresentadores **mudam** — confirmar no canal.

| Faixa | Programa | Notas |
|-------|----------|-------|
| 7h–8h | **Desperta ICL** | Fábio Pannunzio |
| 8h–10h30 | **ICL Notícias 1ª edição** | Roberta Garcia, William De Lucca e convidados |
| 10h30–11h | **Em Detalhes** | Gabriela Varella / Roberta Garcia |
| 11h–11h30 | **Mercado e Investimento** | Deborah Magagna, Diego Carvalho |
| 11h30–12h30 | **Rolê ICL** | William De Lucca, Guga Noblat |
| 17h–17h30 | **ICL Urgente** | Rodrigo Vianna, Laura Kotscho |
| 17h30–19h | **ICL Notícias 2ª edição** | Varella / Garcia, Vianna, Xico Sá |
| 2ª 19h | **Chico Pinheiro Entrevista** | Semanal |
| 3ª 19h | **Precisamos Conversar** | Debate |
| 3ª 20h | **Espiritualidade na Ação** | Frei David |
| 4ª 19h | **Provocação Histórica** | Lindener Pareto |

## Mérito — o que o canal faz (ofício de ecrã)

| Formato | Porquê conta |
|---------|----------------|
| **Telejornal diário** | Duas edições longas — o núcleo quantitativo do arquivo |
| **Desperta / Rolê / Urgente** | Faixas nomeadas; voz de banca, não LMS |
| **Entrevista e história** | Chico Pinheiro, Provocação Histórica — satélites de maior densidade |
| **Documentário** | Origem ICL+ (ex. *De Quanta Terra Precisa o Homem?*) — raro no recorte de lives |
| **Rádio News / clips** | Recortes curtos da mesma banca — satélite do telejornal |
| **Aula no YouTube** | Excepção: o curso pago **não** é este canal |

### Recorte classificado (${count} vídeos)

| Formato | Vídeos no recorte |
|---------|-------------------|
${catTable(ch)}

${noticias ? '### Amostra · ICL Notícias\n\n' + noticias : ''}

${desperta ? '### Amostra · Desperta ICL\n\n' + desperta : ''}

${historica ? '### Amostra · Provocação Histórica\n\n' + historica : ''}

${entrevista ? '### Amostra · Entrevistas\n\n' + entrevista : ''}

${radio ? '### Amostra · Rádio News\n\n' + radio : ''}

${mercado ? '### Amostra · Mercado e investimento\n\n' + mercado : ''}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o ofício de ecrã; a formação densa está em [ICL Cursos](${cursos}) |

## Limites

- **Partidarização:** o canal é o braço visível de um instituto que assume esquerda. Cruzar fontes.
- **Live de 6 h:** título «ICL NOTÍCIAS — data» ≠ ementa de curso. Não tratar VOD como aula.
- **Amostra ≠ censo:** ${count} itens recentes; o YouTube público é muito maior.
- **Fora do hub de cultivo:** de propósito — para não diluir [MovReCam](${movrecam}) / plantas / natureza.
- **Homónimo:** não é o YouTube de iclcursos.com.br (concursos).

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [ICL Cursos](${cursos}) | Plataforma paga — LMS, pós, certificados. **Não** é esta página |
| [UNIFESP](${unifesp}) · [MovReCam](${movrecam}) | Extensão canábica **gratuita** — outro contrato, outro ecrã |
| [verdade](${verdade}) · [mensagem](${mensagem}) | Recorde vs propaganda; o que o ecrã diz |
| [respeito](${respeito}) · [risco](${risco}) | Crédito ao ofício jornalístico; risco de fonte única |
| [especial](${especial}) | Entrega especial: cursos + canal no mesmo dia |

## Como usar no site

1. Abrir [ICL Cursos](${cursos}) se o objecto for aula / assinatura.  
2. Abrir **este** canal no YouTube se o objecto for telejornal / debate.  
3. Não filtrar em [/videos/](/videos/) — o hub continua a ser cultivo e ciência.  
4. Fechar com [Faça o melhor!](${mantra}).

## Status

**Aprovado** — canal **${name}** documentado como **jornalismo ICL** no BudGanja; recorte de **${count}** vídeos; distinto de [ICL Cursos](${cursos}). Indexar ≠ endosso.

[▶ Canal YouTube](${channelUrl}) · [▶ ICL Cursos](${cursos}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${name}](${channelUrl})** (${handle}) — public **live journalism** archive of Instituto Conhecimento Liberta. Complements **[ICL Courses](${cursos})**. **Courses ≠ channel.** Sample: **${count}** recent videos (the public channel is far larger). **Not** in the main [/videos/](/videos/) hub (cultivation / science / nature). Cataloguing ≠ political endorsement.

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Status

**Approved** as an ICL journalism channel sheet. Distinct from the paid course platform.

[▶ YouTube](${channelUrl}) · [▶ Courses](${cursos})
`;

  const contentEs = `## Alcance

Inspección de **[${name}](${channelUrl})** (${handle}) — archivo de **periodismo en directo** del Instituto Conhecimento Liberta. Completa **[ICL Cursos](${cursos})**. **Cursos ≠ canal.** Muestra: **${count}** vídeos recientes. **No** entra en el hub principal de [/videos/](/videos/). Indexar ≠ respaldo político.

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Estado

**Aprobada** como ficha de periodismo ICL. Distinta de la plataforma de cursos.

[▶ YouTube](${channelUrl}) · [▶ Cursos](${cursos})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: channelUrl, count };
}

function buildIclCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildIclCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 17;
  return artePost({
    title: 'Inspeção: canal ICL — jornalismo YouTube do Conhecimento Liberta',
    titleEn: 'Inspection: ICL channel — Conhecimento Liberta YouTube journalism',
    titleEs: 'Inspección: canal ICL — periodismo YouTube de Conhecimento Liberta',
    excerpt:
      'Canais: Instituto Conhecimento Liberta — jornalismo ao vivo (~8 h/dia); recorte classificado; cursos ≠ canal. Fora do hub de cultivo. Catalogar ≠ endosso.',
    excerptEn:
      'Channels: Instituto Conhecimento Liberta — live journalism (~8 h/day); classified sample; courses ≠ channel. Outside the cultivation hub. Cataloguing ≠ endorsement.',
    excerptEs:
      'Canales: Instituto Conhecimento Liberta — periodismo en directo (~8 h/día); muestra clasificada; cursos ≠ canal. Fuera del hub de cultivo. Indexar ≠ respaldo.',
    slug: 'inspecao-canal-icl',
    date: '2026-08-21T16:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'ICL · Canais',
    coverImage: '/imagens/inspecoes/icl-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIclCanalPost,
  buildIclCanalBodies,
  loadCatalog
};
