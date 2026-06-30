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

function loadMovrecamCatalog() {
  const file = path.join(ROOT, 'content', 'channels', 'movrecam.json');
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

function countEditionVideos(videos, editionRe) {
  return videos.filter((v) => editionRe.test(v.title || '')).length;
}

function buildMovrecamBody(ch) {
  const videos = ch.videos || [];
  const byDate = videos.slice().sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const xivCount = countEditionVideos(videos, /XIV\s*Edi[çc][ãa]o|XIV\s*Curso/i);
  const courseAulas = pick(videos, /\d+ª?\s*Aula|Aula\s+\d+|Class\b/i);

  const themes = {
    'Aulas do curso UNIFESP (arquivo por edição)': pick(videos, /XIV\s*Edi|XIII\s*Edi|XII\s*Edi|XI\s*Curso|X\s*Curso|VII\s*Curso|Curso sobre o uso terapêutico|Apresenta[çc][ãa]o.*Curso/i),
    'Fundamentos: botânica, fitoterapia e SUS': pick(videos, /botan|etnobot|fitoterap|SUS e a Cannabis|farmácia viva|quimiotipo|composi[çc][ãa]o qu[ií]mica/i),
    'Clínica e endocanabinoides': pick(videos, /endocanabin|epileps|parkinson|alzheimer|c[âa]ncer|fibromialgia|autis|TEA|dor\b|ansiedade|depress|sono|veterin|odontolog|palia|enfermagem|prescri|dosagem|titula/i),
    'Legislação, mercado e associativismo': pick(videos, /legisla|pol[ií]tic|habeas|associativ|mercado|reforma|movimento social|terceiro setor/i),
    'Cultivo, propagação e extração': pick(videos, /plantio|cultivo|clonag|extra[çc][ãa]o|org[aâ]nico/i),
    'Advocacy, lives e plantões': pick(videos, /plant[aã]o|ao vivo|live\b|redu[çc][ãa]o de danos|regulamenta/i)
  };

  const themeBlocks = Object.entries(themes)
    .filter(([, list]) => list.length)
    .map(([name, list]) => '### ' + name + '\n\n' + listVideos(list.slice(0, 24)) + (list.length > 24 ? '\n\n_… e mais ' + (list.length - 24) + ' vídeos nesta categoria._' : ''))
    .join('\n\n');

  const catalogRows = byDate.map((v, i) => {
    const date = v.published ? v.published.slice(0, 10) : (v.publishedRelative || '—');
    const views = v.views ? v.views : '—';
    return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + date + ' | ' + views + ' |';
  }).join('\n');

  const refId = 'eDy7Lgo0PoQ';

  return `## Escopo

Inspeção editorial e documental do **canal oficial** [MovReCam](${ch.channelUrl}) (${ch.handle}) — plataforma de transmissão do **curso de extensão UNIFESP** sobre cannabis medicinal e arquivo público do **Movimento pela Regulamentação da Cannabis**. Complementa a [inspeção do curso UNIFESP (XIV edição)](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html): aqui audita-se o **acervo em vídeo** (aulas, lives e material de advocacy), não apenas a ficha SIEX.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Todo o conteúdo audiovisual pertence ao MovReCam e aos palestrantes convidados pela UNIFESP. Nenhum vídeo foi replicado além dos embeds oficiais do YouTube.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | [MovReCam](${ch.channelUrl}) |
| Handle | ${ch.handle} |
| ID YouTube | \`${ch.channelId}\` |
| Site do movimento | [movrecam.org.br](${ch.website}) |
| Curso vinculado | [UNIFESP SIEX 30063](${ch.unifespCourseUrl}) |
| Contato curso | [${ch.contactEmail}](mailto:${ch.contactEmail}) |
| Idioma | Português (Brasil) |
| Linha editorial | ${ch.mission} |
| Vídeos catalogados nesta inspeção | **${ch.videoCount}** |
| Aulas identificadas (padrão «Nª Aula») | **${courseAulas.length}** |
| Uploads da XIV edição (título) | **${xivCount}** |
| Data da inspeção | ${(ch.inspectedAt || new Date().toISOString()).slice(0, 10)} |

## Hipóteses e método

- **H1:** Um canal institucional com arquivo aberto permite revisão assíncrona das aulas UNIFESP — essencial para quem perde o horário (terças/quintas 19h30) ou busca edições anteriores.
- **H2:** A sobreposição temática entre edições (mesma numeração de aula, palestrantes distintos) exige leitura atenta do **título e da edição** no nome do vídeo.
- **H3:** O acervo combina **formação clínica** com **advocacy regulatória** — complementar, mas com objetivos distintos do [Guia de Cultivo](/biblioteca/inspecoes/) e das [inspeções de ambiente indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) do laboratório BudGanja.
- **Método:** (1) inventário via página pública \`/videos\` (${ch.videoCount} uploads); (2) classificação temática por palavras-chave; (3) cruzamento com a grade SIEX da XIV edição; (4) verificação de canais oficiais (UNIFESP, e-mail do curso).

## Perfil editorial (achados)

1. **Arquivo vivo do maior curso gratuito de cannabis medicinal no Brasil** — múltiplas edições (VII a XIV) permanecem acessíveis; a XIV edição está em curso no catálogo SIEX 2026.
2. **Grade clínica densa** — neurologia, oncologia, psiquiatria, TEA, dor crônica, saúde da mulher, veterinária e odontologia, alinhada ao plano de ensino UNIFESP.
3. **Bloco legislativo e movimentos sociais** — aulas sobre associativismo, políticas comparadas e reforma — coerente com a missão MovReCam de regulamentação responsável.
4. **Módulos técnicos pontuais** — plantio, cultivo orgânico, clonagem e extração; **sem** foco em métricas de cultivo indoor (PPFD, VPD, EC) que o laboratório documenta nas [calculadoras](/calculadoras/).
5. **Presença para certificado** — cada aula ao vivo disponibiliza formulário Google (e-mail igual ao da inscrição SIEX); o arquivo YouTube serve consulta, não substitui o registo de frequência.
6. **Reconhecimento internacional** — parceria UNIFESP–MovReCam premiada no CannaPortugal Global Cannabis Awards 2025 (conforme comunicados UNIFESP).

## Mapa temático do acervo

${themeBlocks}

## Catálogo completo (${ch.videoCount} vídeos)

| # | Título | Publicação | Visualizações (snapshot) |
|---|--------|------------|--------------------------|
${catalogRows}

## Vídeo de referência (embed)

Abertura da **XIV edição** — orientações oficiais de inscrição, presença e certificado:

@youtube ${refId}

## Complementaridade com o Inspetor BudGanja

| Tema MovReCam / UNIFESP | Recurso BudGanja |
|-------------------------|------------------|
| Ficha e certificado do curso | [Inspeção: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Plantio, clonagem, cultivo orgânico | [Propagação e clonagem](/posts/post-inspecao-propagacao-clonagem.html) · [Diário de pesquisas](/cultivo/) |
| Ambiente indoor (não central no canal) | [PPFD indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) · [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd) |
| Nutrição e substrato | [Nutrição](/posts/post-inspecao-nutricao-cannabis.html) · [Solo vivo](/posts/post-inspecao-solo-vivo-organico.html) |
| Cultivo prático em PT-BR (complementar) | [Canal Jardim HG](/posts/post-inspecao-canal-jardimhg.html) |

## Créditos e referências

**Todo o mérito das aulas, palestrantes, transmissões e posicionamentos políticos pertence ao MovReCam, à UNIFESP/PROEC e aos respectivos autores convidados.**

- **Canal YouTube:** [youtube.com/c/MovReCam](${ch.channelUrl})
- **Curso UNIFESP:** [SIEX 30063](${ch.unifespCourseUrl})
- **Movimento:** [movrecam.org.br](${ch.website})
- **Vídeos citados:** © respectivos titulares — embeds via YouTube
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** registo técnico e recomendação editorial — **sem afiliação** com UNIFESP ou MovReCam

## Status

**Aprovado como referência de conteúdo e arquivo** — canal essencial para acompanhar e rever as aulas UNIFESP, com acervo histórico de advocacy em português. Recomendado cruzar módulos de cultivo com medições no [laboratório BudGanja](/cultivo/) e validar regras de certificado no [SIEX](${ch.unifespCourseUrl}) antes de cada edição.

[▶ Inscrever-se no MovReCam](${ch.channelUrl}) · [Inspeção do curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;
}

function buildMovrecamInspectionPost() {
  const ch = loadMovrecamCatalog();
  const inspected = (ch.inspectedAt || new Date().toISOString()).slice(0, 10);
  const refId = 'eDy7Lgo0PoQ';

  return {
    title: 'Inspeção: Canal MovReCam — aulas UNIFESP',
    excerpt:
      'Auditoria do canal MovReCam — ' +
      ch.videoCount +
      ' vídeos catalogados (aulas do curso UNIFESP, arquivo por edição e advocacy regulatória), complemento à inspeção do XIV curso de extensão.',
    excerptEn:
      'Audit of the MovReCam YouTube channel — ' +
      ch.videoCount +
      ' videos catalogued (UNIFESP course lectures, edition archive and regulatory advocacy), complementing the extension course inspection.',
    excerptEs:
      'Auditoría del canal MovReCam — ' +
      ch.videoCount +
      ' vídeos catalogados (clases del curso UNIFESP, archivo por edición y advocacy regulatoria), complemento a la inspección del curso de extensión.',
    slug: 'inspecao-canal-movrecam',
    date: inspected + 'T14:00:00.000Z',
    coverImage: ytThumb(refId),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'canal-movrecam',
    seriesOrder: 11,
    seriesLabel: 'MovReCam · UNIFESP',
    videoId: refId,
    content_raw: buildMovrecamBody(ch)
  };
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

const CHANNEL_INSPECOES_POSTS = [buildJardimHgInspectionPost(), buildMovrecamInspectionPost()];

module.exports = {
  CHANNEL_INSPECOES_POSTS,
  buildJardimHgInspectionPost,
  buildMovrecamInspectionPost
};
