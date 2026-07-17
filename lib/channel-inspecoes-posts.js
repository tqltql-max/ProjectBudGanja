'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function loadJardimHgCatalog() {
  const file = path.join(ROOT, 'content', 'channels', 'jardimhg.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadInspetorBudGanjaCatalog() {
  const file = path.join(ROOT, 'content', 'youtube-feed.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function videoMd(v) {
  const title = String(v.title || v.id).replace(/\[/g, '\\[');
  return '[' + title + '](https://www.youtube.com/watch?v=' + v.id + ')';
}

function pick(videos, re) {
  return videos.filter((v) => re.test(v.title || ''));
}

function listVideos(videos) {
  if (!videos.length) return '_—_';
  return videos.map((v) => '- ' + videoMd(v)).join('\n');
}

function normalizeDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function pickByTitle(videos, re) {
  return videos.filter((v) => re.test(v.title || ''));
}

function buildJardimHgBody(ch) {
  const videos = ch.videos || [];
  const byDate = videos.slice().sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const themes = {
    'Arranque, sementes e germinação': pick(videos, /semente|germin|plantar|zero|super aula|genética|preserv/i),
    'Substrato, solo vivo e coco': pick(videos, /solo|substrato|coco|turfa|perlita|vermiculita|orgânico|inerte|tampon|preparou o solo|drenagem/i),
    'Nutrição, EC/PPM e overfert': pick(videos, /ec|ppm|nutri|fertiliz|overfert|bioestimul|microrganismo|fox tail/i),
    'Manejo, treino e arquitetura': pick(videos, /lst|scrog|poda|treinamento|supercrop|colher a planta|no-veg|vegetativ/i),
    'Clonagem e propagação': pick(videos, /clon|aeroclon|estaca/i),
    'Pragas, defesas e microbiologia': pick(videos, /ácar|tripe|mosca|bioinset|trichoderma|fungo/i),
    'Floração, colheita, secagem e pós-colheita': pick(videos, /colheita|secar|hash|congelad|fresh frozen|inverno|frio/i),
    'Ambiente, pH, CO₂ e equipamentos': pick(videos, /ph|co2|temperatura|puffco|vaporizer|utillian|adaptador|led/i),
    'Medicinal, ética e comunidade': pick(videos, /medicinal|recreativ|bate papo|perguntas|50k|live|inscrit/i),
    'Genéticas e reviews': pick(videos, /strain review|beleaf|tricho jordan/i)
  };

  const themeBlocks = Object.entries(themes)
    .filter(([, list]) => list.length)
    .map(([name, list]) => '### ' + name + '\n\n' + listVideos(list))
    .join('\n\n');

  const catalogRows = byDate.map((v, i) => {
    const date = v.published ? v.published.slice(0, 10) : '—';
    const views = v.views ? v.views : '—';
    return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + date + ' | ' + views + ' |';
  }).join('\n');

  return `## Escopo

Inspeção editorial e técnica do **canal de referência** [Jardim HG](${ch.channelUrl}) (${ch.handle}) — auditoria do acervo público de vídeos sobre cultivo medicinal de *Cannabis sativa* L. em português (Brasil), com mapeamento temático, avaliação de consistência pedagógica e registo completo do catálogo inspecionado.

> **Nota metodológica:** esta inspeção foi produzida pelo laboratório Inspetor BudGanja de forma **independente**. Todo o conteúdo audiovisual pertence ao criador do canal Jardim HG. Nenhum vídeo foi replicado além dos embeds oficiais do YouTube.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | [Jardim HG](${ch.channelUrl}) |
| Handle | ${ch.handle} |
| ID YouTube | \`${ch.channelId}\` |
| Instagram | [@jardimhg](${ch.instagram}) |
| Idioma | Português (Brasil) |
| Linha editorial | ${ch.mission} |
| Canal ativo desde | ${(ch.publishedAt || '').slice(0, 10) || '2023-03-08'} |
| Vídeos catalogados nesta inspeção | **${ch.videoCount}** |
| Data da inspeção | ${(ch.inspectedAt || new Date().toISOString()).slice(0, 10)} |

## Hipóteses e método

- **H1:** Canais educativos consistentes em PT-BR preenchem lacuna entre prática de campo e literatura técnica acessível ao cultivador doméstico.
- **H2:** A diversidade temática (substrato → colheita) correlaciona-se com retenção de audiência e profundidade de comunidade.
- **Método:** (1) levantamento via feed RSS e página pública de uploads; (2) verificação de autoria por oEmbed (autor \`Jardim HG\`); (3) classificação temática por palavras-chave; (4) revisão cruzada com calculadoras e inspeções do Inspetor BudGanja.

## Perfil editorial (achados)

1. **Abordagem dual indoor/outdoor** — fotoperíodo, sementes automáticas vs. fotoperiódicas e implicações sazonais (ex.: [Cannabis no Inverno](https://www.youtube.com/watch?v=6hs9DdGcSoE)).
2. **Rigor prático em substratos** — receitas de solo orgânico, tamponamento de coco, drenagem em cultivo mineral e transição inerte → orgânico.
3. **Nutrição quantitativa** — EC/PPM, overfert e flush contextualizado para solo vivo e inerte ([Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) do laboratório).
4. **Ciência aplicada** — comentários a estudos recentes (no-veg, fase vegetativa) com leitura crítica, não apenas opinião.
5. **Propagação clonal** — aeroclonagem documentada, alinhada às [inspeções de clonagem](/posts/post-inspecao-propagacao-clonagem.html) do Inspetor BudGanja.
6. **Comunidade ativa** — lives de perguntas e respostas, Telegram (link na bio do Instagram) e parcerias declaradas com códigos de desconto.

## Mapa temático do acervo

${themeBlocks}

## Catálogo completo (${ch.videoCount} vídeos)

| # | Título | Publicação | Visualizações (snapshot) |
|---|--------|------------|--------------------------|
${catalogRows}

## Vídeo de referência (embed)

Super aula introdutória do canal — ponto de entrada recomendado para iniciantes:

@youtube yCBfY-Rg81g

## Complementaridade com o Inspetor BudGanja

| Tema Jardim HG | Ferramenta / inspeção BudGanja |
|----------------|--------------------------------|
| EC/PPM, overfert | [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) · [Inspeção: Nutrição](/posts/post-inspecao-nutricao-cannabis.html) |
| Solo orgânico / super-solo | [Calculadora Super-Solo](/calculadoras/super-solo.html) · [Inspeção: Solo Vivo](/posts/post-inspecao-solo-vivo-organico.html) |
| Ambiente indoor | [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd) · [Inspeção: Cultivo Indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) |
| Aeroclonagem | [Manual clonadora 12 estacas](/equipamentos/clonadora-12-estacas.html) · [Loja clonadora](/loja/#clonadora-12) |
| Armazenamento de sementes | [Termo-higrômetro](/loja/#cultivo-indoor) para monitorizar ambiente de guarda |

## Créditos e referências

**Todo o mérito do conteúdo audiovisual, roteiros, grows documentados e opiniões técnicas pertence exclusivamente ao canal [Jardim HG](${ch.channelUrl}) e ao seu criador.**

- **Canal YouTube:** [youtube.com/@jardimhg](${ch.channelUrl})
- **Instagram:** [@jardimhg](${ch.instagram})
- **Comunidade:** Telegram (link disponível na bio do Instagram @jardimhg)
- **Vídeos citados:** © respective owners — embeds via YouTube conforme termos da plataforma
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** recomendação editorial e registo técnico — **sem afiliação comercial** entre Inspetor BudGanja e Jardim HG

_Códigos de parceiros mencionados nos vídeos do canal (Farmhouse Solutions \`JARDIMHG\`, Flora Urbana 420 \`JARDIMHG10\`, Cultlight \`JARDIMHG\`) são promovidos pelo próprio Jardim HG; não são códigos do Inspetor BudGanja._

## Status

**Aprovado como referência externa** — canal consistente, educativo e alinhado com cultivo responsável. Recomendado como complemento à biblioteca de inspeções do Inspetor BudGanja para cultivadores em português.

[▶ Inscrever-se no Jardim HG](${ch.channelUrl}) · [Ver todas as inspeções](/biblioteca/inspecoes/)`;
}

function buildInspetorBudGanjaBody(ch) {
  const videos = ch.videos || [];
  const byDate = videos.slice().sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const earliest = byDate.length ? normalizeDate(byDate[byDate.length - 1].published) : '';
  const themes = {
    'Fundação do ciclo e arranque': pickByTitle(videos, /inicio|otimizando|cultivo/i),
    'Nutrição, solo e ambiente': pickByTitle(videos, /nutrição|solo|ambient|indoor/i),
    'Arquitetura, propagação e manejo': pickByTitle(videos, /arquitetura|propagação|clonagem/i),
    'Floração e refinamento do método': pickByTitle(videos, /floração|ciência da floração/i)
  };

  const themeBlocks = Object.entries(themes)
    .filter(([, list]) => list.length)
    .map(([name, list]) => '### ' + name + '\n\n' + listVideos(list))
    .join('\n\n');

  const catalogRows = byDate.map((v, i) => {
    const date = v.published ? v.published.slice(0, 10) : '—';
    const summary = v.summary ? String(v.summary).replace(/\|/g, '\\|') : '—';
    return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + date + ' | ' + summary + ' |';
  }).join('\n');

  return `## Escopo

Inspeção editorial do **canal oficial** [${ch.channelName}](${ch.channelUrl}) (@InspetorBudGanja) — leitura do catálogo inicial de vídeos do laboratório, com foco em método, sequência pedagógica e relação directa com as ferramentas do site.

A inspeção considera a intenção declarada do canal: **promover conhecimento científico aplicado ao cultivo vegetal**, traduzindo conceitos técnicos em protocolos práticos, verificáveis e replicáveis dentro do projeto Inspetor BudGanja.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | [${ch.channelName}](${ch.channelUrl}) |
| Handle | @InspetorBudGanja |
| ID YouTube | \`${ch.channelId}\` |
| Idioma | Português (Brasil) |
| Linha editorial | Conteúdo técnico, prático e educacional sobre cultivo, ferramentas e documentação de campo |
| Canal ativo desde | ${earliest ? earliest.slice(0, 10) : '2026-06-27'} |
| Vídeos catalogados nesta inspeção | **${videos.length}** |
| Data da inspeção | ${(ch.updatedAt || new Date().toISOString()).slice(0, 10)} |

## Hipóteses e método

- **H1:** Um canal técnico consistente funciona melhor quando a sequência editorial vai do básico ao aplicado.
- **H2:** Cada vídeo do canal deve mapear para uma ferramenta, um manual ou uma inspeção complementar no site.
- **Método:** (1) inventário do feed público do canal; (2) leitura dos títulos e resumos; (3) agrupamento temático por palavras-chave; (4) cruzamento com calculadoras, manuais e inspeções já publicadas; (5) revisão final do texto e dos links.

## Intenção científica do canal

1. **Popularização científica:** converter fundamentos de fisiologia vegetal, ambiente e nutrição em linguagem acessível sem perder rigor técnico.
2. **Padronização de método:** estimular decisões baseadas em variáveis mensuráveis (luz, pH, EC, temperatura, humidade e fotoperíodo).
3. **Reprodutibilidade:** organizar episódios em trilha de aprendizagem para que o utilizador possa repetir o processo e comparar resultados no Diário de Cultivo.
4. **Integração projeto-canal:** usar o canal como camada audiovisual e o site como camada de documentação, cálculo e auditoria técnica.

## Perfil editorial (achados)

1. **Sequência didática curta** — o canal abre com o ciclo básico e segue para nutrição, estrutura da planta e propagação.
2. **Foco em aplicação** — cada tema conversa com uma ferramenta do site: VPD, EC, Super Solo, luxímetro e diário.
3. **Linguagem de laboratório** — o conteúdo é pensado como documentação reutilizável, não só como vídeo isolado.
4. **Base para séries futuras** — o canal já nasce como uma trilha que pode ser expandida em novas inspeções por tema.

## Mapa temático do acervo

${themeBlocks}

## Catálogo completo (${videos.length} vídeos)

| # | Título | Publicação | Síntese |
|---|--------|------------|---------|
${catalogRows}

## Vídeo de referência (embed)

Ponto de entrada recomendado para a leitura do canal:

@youtube 38uUEL1B-v4

## Complementaridade com o Inspetor BudGanja

| Tema do canal | Ferramenta / inspeção BudGanja |
|---------------|--------------------------------|
| Início do ciclo | [Inspeção: O Início do Cultivo](/posts/post-inspecao-cultivo-inicio.html) · [Diário de Cultivo](/cultivo/) |
| Nutrição e substrato | [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) · [Inspeção: Nutrição](/posts/post-inspecao-nutricao-cannabis.html) |
| Solo e estrutura | [Calculadora Super Solo](/calculadoras/super-solo.html) · [Inspeção: Solo Vivo](/posts/post-inspecao-solo-vivo-organico.html) |
| Arquitetura e treino | [Inspeção: Arquitetura](/posts/post-inspecao-arquitetura-cannabis.html) · [Calculadora Watts/m²](/calculadoras/cultivo-lab.html?mode=watts-m2) |
| Propagação | [Inspeção: Propagação e Clonagem](/posts/post-inspecao-propagacao-clonagem.html) · [Manual clonadora](/equipamentos/manual-clonadora.html) |
| Ambiente indoor | [Inspeção: Otimização do Cultivo Indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) · [Luxímetro](/calculadoras/luximetro.html) |

## Análise do projeto e relação com o canal

| Camada do projeto | Papel no site | Relação com o canal oficial |
|-------------------|---------------|-----------------------------|
| Biblioteca / inspeções | Consolida relatórios técnicos em formato pesquisável | Cada vídeo origina ou reforça uma inspeção temática com contexto escrito, links e referências |
| Calculadoras de cultivo | Apoia decisão por métricas (VPD, EC, Super Solo, luz) | O conteúdo em vídeo explica o conceito; a calculadora operacionaliza o conceito em números |
| Diário de Cultivo | Registo de práticas e resultados por utilizador | O canal fornece o protocolo base; o diário fecha o ciclo com evidência prática e histórico |
| Equipamentos e manuais | Documenta montagem, operação e manutenção | Episódios de propagação e indoor apontam para guias operacionais aplicáveis em campo |
| Pipeline de conteúdo (build + feed YouTube) | Mantém catálogo, busca e indexação atualizados | A cadência de publicação do canal alimenta descoberta no site e mantém a trilha científica viva |

Síntese: o canal não atua apenas como divulgação. Ele funciona como **porta de entrada científica** do projeto, enquanto o site fornece estrutura para validação, aprofundamento e aplicação contínua.

## Como repetir o método

Para futuras inspeções do canal, siga o roteiro documentado em [docs/roteiro-inspecoes.md](../docs/roteiro-inspecoes.md): levantar o catálogo, separar temas, cruzar com ferramentas do site e fechar o relatório com links úteis e um vídeo de referência.

## Status

**Aprovado como canal de referência interna** — serve como índice editorial do laboratório e como vetor de alfabetização científica aplicada, com ligação directa às ferramentas, inspeções e registos do projeto.

[▶ Ver o canal](${ch.channelUrl}) · [Ver todas as inspeções](/biblioteca/inspecoes/)`;
}

function buildJardimHgInspectionPost() {
  const ch = loadJardimHgCatalog();
  const inspected = (ch.inspectedAt || new Date().toISOString()).slice(0, 10);

  return {
    title: 'Inspeção: Canal Jardim HG (@jardimhg)',
    excerpt:
      'Auditoria editorial do canal Jardim HG — ' +
      ch.videoCount +
      ' vídeos catalogados sobre cultivo medicinal indoor/outdoor, com créditos integrais ao criador.',
    slug: 'inspecao-canal-jardimhg',
    date: inspected + 'T12:00:00.000Z',
    coverImage: ytThumb('yCBfY-Rg81g'),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'canal-jardimhg',
    seriesOrder: 10,
    seriesLabel: 'Canal Jardim HG',
    videoId: 'yCBfY-Rg81g',
    content_raw: buildJardimHgBody(ch)
  };
}

function buildInspetorBudGanjaInspectionPost() {
  const ch = loadInspetorBudGanjaCatalog();
  const inspected = (ch.updatedAt || new Date().toISOString()).slice(0, 10);

  return {
    title: 'Inspeção: Canal Inspetor BudGanja (@InspetorBudGanja)',
    excerpt:
      'Auditoria editorial do canal oficial — ' +
      ((ch.videos || []).length || 0) +
      ' vídeos catalogados como trilha técnica do laboratório, com foco em conhecimento científico aplicado e integração com as ferramentas do projeto.',
    slug: 'inspecao-canal-inspetorbudganja',
    date: inspected + 'T12:00:00.000Z',
    coverImage: ytThumb('38uUEL1B-v4'),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'canal-inspetorbudganja',
    seriesOrder: 3,
    seriesLabel: 'Canal Inspetor BudGanja',
    videoId: '38uUEL1B-v4',
    content_raw: buildInspetorBudGanjaBody(ch)
  };
}

const CHANNEL_INSPECOES_POSTS = [buildJardimHgInspectionPost(), buildInspetorBudGanjaInspectionPost()];

module.exports = { CHANNEL_INSPECOES_POSTS, buildJardimHgInspectionPost, buildInspetorBudGanjaInspectionPost };
