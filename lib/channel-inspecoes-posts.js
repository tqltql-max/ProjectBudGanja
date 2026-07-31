'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function loadMovrecamCatalog() {
  const file = path.join(ROOT, 'content', 'channels', 'movrecam.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadCanabinallCatalog() {
  const file = path.join(ROOT, 'content', 'channels', 'canabinall.json');
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
3. **Reprodutibilidade:** organizar episódios em trilha de aprendizagem para que o utilizador possa repetir o processo e comparar resultados no Diário de Pesquisas.
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
| Início do ciclo | [Diário de Pesquisas](/cultivo/) · [Diário de Pesquisas](/cultivo/) |
| Nutrição e substrato | [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) · [Inspeção: Nutrição](/calculadoras/cultivo-lab.html?mode=ec) |
| Solo e estrutura | [Calculadora Super Solo](/calculadoras/super-solo.html) · [Inspeção: Solo Vivo](/calculadoras/super-solo.html) |
| Arquitetura e treino | [Inspeção: Arquitetura](/biblioteca/inspecoes/) · [Calculadora Watts/m²](/calculadoras/cultivo-lab.html?mode=watts-m2) |
| Propagação | [Inspeção: Propagação e Clonagem](/equipamentos/clonadora-6-estacas.html) · [Manual clonadora](/equipamentos/manual-clonadora.html) |
| Ambiente indoor | [Inspeção: Otimização do Cultivo Indoor](/calculadoras/luximetro.html) · [Luxímetro](/calculadoras/luximetro.html) |

## Análise do projeto e relação com o canal

| Camada do projeto | Papel no site | Relação com o canal oficial |
|-------------------|---------------|-----------------------------|
| Biblioteca / inspeções | Consolida relatórios técnicos em formato pesquisável | Cada vídeo origina ou reforça uma inspeção temática com contexto escrito, links e referências |
| Calculadoras de cultivo | Apoia decisão por métricas (VPD, EC, Super Solo, luz) | O conteúdo em vídeo explica o conceito; a calculadora operacionaliza o conceito em números |
| Diário de Pesquisas | Registo de práticas e resultados por utilizador | O canal fornece o protocolo base; o diário fecha o ciclo com evidência prática e histórico |
| Equipamentos e manuais | Documenta montagem, operação e manutenção | Episódios de propagação e indoor apontam para guias operacionais aplicáveis em campo |
| Pipeline de conteúdo (build + feed YouTube) | Mantém catálogo, busca e indexação atualizados | A cadência de publicação do canal alimenta descoberta no site e mantém a trilha científica viva |

Síntese: o canal não atua apenas como divulgação. Ele funciona como **porta de entrada científica** do projeto, enquanto o site fornece estrutura para validação, aprofundamento e aplicação contínua.

## Como repetir o método

Para futuras inspeções do canal, siga o roteiro documentado em [docs/roteiro-inspecoes.md](../docs/roteiro-inspecoes.md): levantar o catálogo, separar temas, cruzar com ferramentas do site e fechar o relatório com links úteis e um vídeo de referência.

## Status

**Aprovado como canal de referência interna** — serve como índice editorial do laboratório e como vetor de alfabetização científica aplicada, com ligação directa às ferramentas, inspeções e registos do projeto.

[▶ Ver o canal](${ch.channelUrl}) · [Ver todas as inspeções](/biblioteca/inspecoes/)`;
}


function aulaNumber(title) {
  const m = String(title || '').match(/(\d+)\s*ª?\s*Aula|Aula\s+(\d+)/i);
  if (!m) return 999;
  return Number(m[1] || m[2] || 999);
}

function sortXivAulas(list) {
  return (list || []).slice().sort((a, b) => {
    const na = aulaNumber(a.title);
    const nb = aulaNumber(b.title);
    if (na !== nb) return na - nb;
    return String(a.published || '').localeCompare(String(b.published || ''));
  });
}

function shortAulaHeading(title) {
  const raw = String(title || '').trim();
  const cleaned = raw
    .replace(/^XIV\s*Edi[cç][aã]o\s*[-–—:]?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned || raw || 'Aula';
}

function buildMovrecamBody(ch) {
  const videos = ch.videos || [];
  const byDate = videos.slice().sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const xivRecent = pick(videos, /XIV\s*Edi|XIV\s*Curso/i);
  const xivWindow = sortXivAulas(
    videos.filter((v) => {
      const d = v.published ? new Date(v.published) : null;
      return d && d >= new Date('2026-06-16T00:00:00Z') && /\d+ª?\s*Aula|Aula\s+\d+/i.test(v.title || '');
    })
  );
  const courseAulas = pick(videos, /\d+ª?\s*Aula|Aula\s+\d+|Class\b/i);

  const themes = {
    'XIV edição (aulas 2026 em curso)': xivWindow.length ? xivWindow : xivRecent,
    'Fundamentos: botânica, fitoterapia e SUS': pick(
      videos,
      /botan|etnobot|fitoterap|SUS e a Cannabis|farmácia viva|quimiotipo|composi[çc][ãa]o qu[ií]mica|endocanabin|canabimim/i
    ),
    'Clínica, saúde mental e psicodélicos': pick(
      videos,
      /psicod|endocanabin|epileps|parkinson|alzheimer|c[âa]ncer|fibromialgia|autis|TEA|dor\b|ansiedade|depress|sono|veterin|odontolog|palia|enfermagem|prescri|dosagem|titula|saúde mental/i
    ),
    'Legislação, mercado e associativismo': pick(
      videos,
      /legisla|pol[ií]tic|habeas|associativ|mercado|reforma|movimento social|terceiro setor/i
    ),
    'Cultivo, propagação e extração': pick(videos, /plantio|cultivo|clonag|extra[çc][ãa]o|org[aâ]nico/i),
    'Advocacy, lives e plantões': pick(videos, /plant[ãa]o|ao vivo|live\b|redu[çc][ãa]o de danos|regulamenta/i)
  };

  const themeBlocks = Object.entries(themes)
    .filter(([, list]) => list.length)
    .map(([name, list]) => {
      const shown = list.slice(0, 24);
      const more =
        list.length > 24 ? '\n\n_… e mais ' + (list.length - 24) + ' vídeos nesta categoria._' : '';
      return '### ' + name + '\n\n' + listVideos(shown) + more;
    })
    .join('\n\n');

  const catalogRows = byDate
    .map((v, i) => {
      const date = v.published ? v.published.slice(0, 10) : v.publishedRelative || '—';
      const views = v.views ? v.views : '—';
      return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + date + ' | ' + views + ' |';
    })
    .join('\n');

  const xivWatchBlocks = xivWindow
    .map((v) => {
      const heading = shortAulaHeading(v.title);
      const date = v.published ? v.published.slice(0, 10) : '';
      const meta = [
        date ? 'Publicada em ' + date : '',
        v.url ? '[Abrir no YouTube](' + v.url + ')' : ''
      ]
        .filter(Boolean)
        .join(' · ');
      return (
        '### ' +
        heading +
        '\n\n' +
        (meta ? meta + '\n\n' : '') +
        '@youtube ' +
        v.id
      );
    })
    .join('\n\n');

  const xivWatchSection = xivWindow.length
    ? `## Assistir aulas da XIV edição

As **${xivWindow.length} aulas** catalogadas desta edição estão embutidas abaixo, em ordem cronológica, para os alunos reverem aqui no site (o arquivo oficial continua no [canal MovReCam](${ch.channelUrl})).

> **Presença e certificado:** o embed serve para estudo. A frequência do curso continua a registar-se pelo formulário Google de cada aula ao vivo (e-mail igual ao da inscrição SIEX).

${xivWatchBlocks}`
    : '';

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
| Aulas da XIV edição (desde 16/06/2026) | **${xivWindow.length}** |
| Data da inspeção | ${(ch.inspectedAt || new Date().toISOString()).slice(0, 10)} |

${xivWatchSection}

## Hipóteses e método

- **H1:** Um canal institucional com arquivo aberto permite revisão assíncrona das aulas UNIFESP — essencial para quem perde o horário (terças/quintas 19h30) ou busca edições anteriores.
- **H2:** A sobreposição temática entre edições (mesma numeração de aula, palestrantes distintos) exige leitura atenta do **título e da edição** no nome do vídeo.
- **H3:** O acervo combina **formação clínica** com **advocacy regulatória** — complementar, mas com objetivos distintos do [Inspeções](/biblioteca/inspecoes/) e das [inspeções de ambiente indoor](/calculadoras/luximetro.html) do laboratório BudGanja.
- **Método:** (1) inventário via página pública \`/videos\` (${ch.videoCount} uploads); (2) classificação temática por palavras-chave; (3) embeds in-page das aulas XIV para revisão pelos alunos; (4) cruzamento com a grade SIEX e canais oficiais.

## Perfil editorial (achados)

1. **Arquivo vivo do maior curso gratuito de cannabis medicinal no Brasil** — múltiplas edições permanecem acessíveis; a XIV edição está em curso no catálogo SIEX 2026.
2. **Grade clínica densa** — neurologia, oncologia, psiquiatria, TEA, dor crónica, saúde da mulher, veterinária e odontologia, alinhada ao plano de ensino UNIFESP.
3. **Bloco de saúde mental / psicodélicos em expansão** — episódios sobre ansiedade, depressão, endocanabinoidoma e temas afins.
4. **Bloco legislativo e movimentos sociais** — associativismo, políticas comparadas e reforma — coerente com a missão MovReCam de regulamentação responsável.
5. **Módulos técnicos pontuais** — plantio, cultivo orgânico, clonagem e extração; **sem** foco em métricas de cultivo indoor (PPFD, VPD, EC) que o laboratório documenta nas [calculadoras](/calculadoras/).
6. **Presença para certificado** — cada aula ao vivo disponibiliza formulário Google (e-mail igual ao da inscrição SIEX); o arquivo YouTube (e os embeds desta página) serve consulta, não substitui o registo de frequência.

## Mapa temático do acervo

${themeBlocks}

## Catálogo completo (${ch.videoCount} vídeos)

| # | Título | Publicação | Visualizações (snapshot) |
|---|--------|------------|--------------------------|
${catalogRows}

## Complementaridade com o Inspetor BudGanja

| Tema MovReCam / UNIFESP | Recurso BudGanja |
|-------------------------|------------------|
| Ficha e certificado do curso | [Inspeção: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |
| Plantio, clonagem, cultivo orgânico | [Propagação e clonagem](/equipamentos/clonadora-6-estacas.html) · [Diário de pesquisas](/cultivo/) |
| Ambiente indoor (não central no canal) | [PPFD indoor](/calculadoras/luximetro.html) · [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd) |
| Nutrição e substrato | [Nutrição](/calculadoras/cultivo-lab.html?mode=ec) · [Solo vivo](/calculadoras/super-solo.html) |

## Créditos e referências

**Todo o mérito das aulas, palestrantes, transmissões e posicionamentos políticos pertence ao MovReCam, à UNIFESP/PROEC e aos respectivos autores convidados.**

- **Canal YouTube:** [youtube.com/@MovReCam](${ch.channelUrl})
- **Curso UNIFESP:** [SIEX 30063](${ch.unifespCourseUrl})
- **Movimento:** [movrecam.org.br](${ch.website})
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** registo técnico e recomendação editorial — **sem afiliação** com UNIFESP ou MovReCam

## Status

**Aprovado como referência de conteúdo e arquivo** — canal essencial para acompanhar e rever as aulas UNIFESP, com acervo histórico de advocacy em português. A secção **Assistir aulas da XIV edição** reúne os embeds para estudo in-page. Cruzar módulos de cultivo com medições no [laboratório BudGanja](/cultivo/) e validar regras de certificado no [SIEX](${ch.unifespCourseUrl}).

[Canal MovReCam](${ch.channelUrl}) · [Inspeção do curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;
}

function buildMovrecamInspectionPost() {
  const ch = loadMovrecamCatalog();
  const inspected = (ch.inspectedAt || new Date().toISOString()).slice(0, 10);
  const xivCover =
    sortXivAulas(
      (ch.videos || []).filter((v) => {
        const d = v.published ? new Date(v.published) : null;
        return d && d >= new Date('2026-06-16T00:00:00Z') && /\d+ª?\s*Aula|Aula\s+\d+/i.test(v.title || '');
      })
    )[0] || null;
  const refId = (xivCover && xivCover.id) || 'eDy7Lgo0PoQ';

  return {
    title: 'Inspeção: Canal MovReCam — aulas UNIFESP',
    titleEn: 'Inspection: MovReCam channel — UNIFESP lectures',
    titleEs: 'Inspección: canal MovReCam — clases UNIFESP',
    excerpt:
      'Auditoria do canal MovReCam — ' +
      ch.videoCount +
      ' vídeos catalogados, com embeds das aulas da XIV edição UNIFESP para revisão in-page.',
    excerptEn:
      'Editorial audit of the MovReCam channel — ' +
      ch.videoCount +
      ' catalogued videos, with in-page embeds of UNIFESP’s 14th-edition lectures.',
    excerptEs:
      'Auditoría editorial del canal MovReCam — ' +
      ch.videoCount +
      ' vídeos catalogados, con embeds de las clases de la XIV edición UNIFESP para revisión en la página.',
    slug: 'inspecao-canal-movrecam',
    date: inspected + 'T14:00:00.000Z',
    coverImage: ytThumb(refId),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'canal-movrecam',
    seriesOrder: 11,
    seriesLabel: 'Canal MovReCam',
    videoId: refId,
    content_raw: buildMovrecamBody(ch)
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

/** Ponto de entrada pedagógico do CANABinALL (conceitos básicos). */
const CANABINALL_HIGHLIGHT = {
  id: '4TVwESEe2vo',
  title: 'CONCEITOS BÁSICOS #1'
};

/** Assinatura etnobotânica do canal (maior alcance no catálogo). */
const CANABINALL_SIGNATURE = {
  id: 'hMMWyff8ENQ',
  title: 'CIGARRO TIRA-CAPETA - Série Plantas Sagradas'
};

function buildCanabinallBody(ch) {
  const videos = ch.videos || [];
  const byDate = videos.slice().sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const highlight = videos.find((v) => v.id === CANABINALL_HIGHLIGHT.id) || {
    id: CANABINALL_HIGHLIGHT.id,
    title: CANABINALL_HIGHLIGHT.title,
    url: 'https://www.youtube.com/watch?v=' + CANABINALL_HIGHLIGHT.id
  };
  const signature = videos.find((v) => v.id === CANABINALL_SIGNATURE.id) || {
    id: CANABINALL_SIGNATURE.id,
    title: CANABINALL_SIGNATURE.title,
    url: 'https://www.youtube.com/watch?v=' + CANABINALL_SIGNATURE.id
  };

  const themes = {
    'Fundamentos: conceitos, evidência e acesso': pick(
      videos,
      /CONCEITOS B[AÁ]SICOS|APRESENTA[CÇ][AÃ]O|POR QUE CANAB|EXISTEM EVID[EÊ]NCIAS|TEMOS ESTUDOS|DEMOCRATIZA[CÇ][AÃ]O|FORMAS DE (USO|ACESSO)|COMO OBTER|ORIGEM DOS PRODUTOS|THC PODE SER|PANACEIA|É DROGA|RA[IÍ]ZES|DIVINDADES/i
    ),
    'Clínica humana (dor, neuro, mental, onco)': pick(
      videos,
      /ANSIEDADE|DEPRESS[AÃ]O|EPILEPSIA|ALZHEIMER|PARKINSON|FIBROMIALGIA|ESCLEROSE|ESQUIZOFRENIA|AUTISMO|TDAH|TEPT|T\.E\.P\.T|BURNOUT|INS[OÔ]NIA|DORES CR[OÔ]NICAS|ONCOLOGIA|GLAUCOMA|HIPERTENS[AÃ]O|OBESIDADE|DIABETES|AVC|NEUROINFLAMA|CALV[IÍ]CIE|PSOR[IÍ]ASE|SEXUALIDADE|C[OÓ]LICAS|GESTANTES|MATERNIDADE|MICRODOSES|P\.E\.A|CBD|CBG|ADIC[AÃ]O|USO CR[OÔ]NICO|COGNI[CÇ][AÃ]O|T[OÔ]NUS DO SEC/i
    ),
    'Etnoveterinária e saúde animal': pick(
      videos,
      /C[AÃ]ES|GATOS|ESTRESSE EM C|DERMATOL[OÓ]GICO EM C|DORES EM GATOS|DORES CR[OÔ]NICAS EM C/i
    ),
    'Plantas sagradas, etnobotânica e fitoterapia': pick(
      videos,
      /PLANTAS SAGRADAS|CIGARRO|AYAHUASCA|IAMH[OÔ]|COPA[IÍ]BA|LAVANDA|GUACO|AYURVEDA|TRICOMAS|QUANTAS ESP[EÉ]CIES|NOMES POPULARES|CH[AÁ] DE CANN|INFUS[AÃ]O|DECOC[CÇ][AÃ]O|S[OÓ] AS FLORES|PR[AÁ]TICAS INTEGRATIVAS|BIOENERGIA|ET[UÚ] ESER[EÊ]/i
    ),
    'Temporada na Europa (jardins, museus, acesso)': pick(
      videos,
      /TEMPORADA NA EUROPA|JARDIM BOT[AÂ]NICO|HORTO|ORTO BOTANICO|INSTITUT BOT|UNIVERSIDADE SALAMANCA|CHRISTIANIA|ONDE TEM|MINHAS LOJAS|MUSEU DA PLANTA|HERBOLARIO|LOJA DA PLANTA|BIBLIOTECAS EM SALAMANCA|DESPEDIDA DA EUROPA|ERVA E A SUA BOA|NA ESPANHA|NUTEBIS/i
    ),
    'Eventos adversos, psicoativos e redução de danos': pick(
      videos,
      /EVENTOS ADVERSOS|REAC[AÃ]O OU INTOXICA|INTERA[CÇ][OÕ]ES|PSICOATIVOS|PSICOD[EÉ]LICOS|ALUCIN[OÓ]GENOS|PROIBICIONISMO|USO N[AÃ]O M[EÉ]DICO|TRATAMENTO NA PERIFERIA/i
    ),
    'Associativismo, congressos e divulgação': pick(
      videos,
      /CULTIVE|ASSOCIA[CÇ][AÃ]O|CONGRESSO|SIMP[OÓ]SIO|COTECANN|CHAMADA|EQUIPE|TEMPORADA|RELATO|DRA\. CAROLINA|ODONTOLOGIA|ESTILO DE VIDA|MEDITA/i
    )
  };

  const themeBlocks = Object.entries(themes)
    .filter(([, list]) => list.length)
    .map(([name, list]) => {
      const shown = list.slice(0, 28);
      const more =
        list.length > 28 ? '\n\n_… e mais ' + (list.length - 28) + ' vídeos nesta categoria._' : '';
      return '### ' + name + '\n\n' + listVideos(shown) + more;
    })
    .join('\n\n');

  const catalogRows = byDate
    .map((v, i) => {
      const date = v.published ? v.published.slice(0, 10) : v.publishedRelative || '—';
      const views = v.views ? v.views : '—';
      const mark =
        v.id === CANABINALL_HIGHLIGHT.id ? ' ★' : v.id === CANABINALL_SIGNATURE.id ? ' ◆' : '';
      return '| ' + (i + 1) + ' | ' + videoMd(v) + mark + ' | ' + date + ' | ' + views + ' |';
    })
    .join('\n');

  const europaCount = themes['Temporada na Europa (jardins, museus, acesso)'].length;
  const clinicaCount = themes['Clínica humana (dor, neuro, mental, onco)'].length;
  const plantasCount = themes['Plantas sagradas, etnobotânica e fitoterapia'].length;

  return `## Escopo

Inspeção editorial e documental do **canal oficial** [${ch.channelName}](${ch.channelUrl}) (${ch.handle}) — projeto de **extensão universitária da UNIFESP** idealizado e curado pela **Profa. Dra. Eliana Rodrigues**, Professora Titular do ICAQF/Campus Diadema, fundadora e coordenadora do [Centro de Estudos Etnobotânicos e Etnofarmacológicos (CEE)](${ch.unifespCeeUrl || 'https://site.unifesp.br/cee/coordenacao'}).

Este relatório audita o **acervo de divulgação científica** do CANABinALL («tudo sobre os canabinoides»), distinto do arquivo de aulas ao vivo do [MovReCam](/posts/post-inspecao-canal-movrecam.html) e complementar à [inspeção do curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html). Aqui o foco é a **tradução semanal da literatura** — fitocanabinoides, endocanabinoides e canabinoides sintéticos — para o público leigo e profissional, com rigor académico e generosidade pedagógica.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Todo o conteúdo audiovisual, a curadoria científica e o mérito intelectual pertencem à Profa. Dra. Eliana Rodrigues, à UNIFESP/CEE/Observatório PharMacon e aos colaboradores do projeto. Nenhum vídeo foi replicado além dos embeds oficiais do YouTube. **Sem afiliação** institucional.

## Por que esta inspeção importa

A Profa. Dra. Eliana Rodrigues é uma das vozes mais sólidas da ciência canábica e etnobotânica no Brasil. Bióloga (USP), com mestrado em Geografia Física (USP), doutorado e pós-doutorado na Escola Paulista de Medicina, coordena desde 1995 linhas de etnofarmacologia, etnobotânica e conservação, reações adversas de fitoterápicos, etnoveterinária e zoofarmacognosia. Orienta no Programa de Biologia Química da UNIFESP e lidera o CEE — referência nacional em estudo de plantas medicinais junto a culturas e biomas diversos.

O CANABinALL nasceu para enfrentar um problema real: **dezenas de milhares de publicações** sobre medicina canabinoide na literatura (ordem de magnitude citada pelo próprio projeto na CAEC Diadema) tornam impossível o acompanhamento leigo sem mediação. Eliana faz exactamente isso — todas as quartas, em linguagem clara, sem diluir o método científico. O canal é dedicado ao **Prof. Emérito Elisaldo Carlini**, marco ético e histórico da pesquisa canábica brasileira. Em colaboração com o MovReCam e o Observatório PharMacon, o projeto une extensão universitária, advocacy responsável e arquivo vivo de evidências.

A temporada europeia (jardins botânicos, herbolários, museus e instituições como o Institut Botànic de Barcelona / CANNUSE) documenta ainda a dimensão internacional da sua investigação etnobotânica sobre *Cannabis sativa* L. no Brasil — trabalho que reforça bases de dados globais de usos tradicionais. **Mérito máximo a esta professora:** poucas iniciativas no YouTube brasileiro combinam titulação académica plena, cadência editorial estável, ética de citação e generosidade didáctica como o CANABinALL.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | [${ch.channelName}](${ch.channelUrl}) |
| Handle | ${ch.handle} |
| ID YouTube | \`${ch.channelId}\` |
| Coordenação / curadoria | **Profa. Dra. Eliana Rodrigues** (UNIFESP) |
| Contato | [${ch.contactEmail || 'e.rodrigues@unifesp.br'}](mailto:${ch.contactEmail || 'e.rodrigues@unifesp.br'}) |
| Página CEE | [CANABinALL no CEE](${ch.website || 'https://site.unifesp.br/cee/extensao/canabinall'}) |
| CAEC Diadema | [Ficha do projeto](${ch.caecUrl || 'https://site.unifesp.br/caec.diadema/programas-e-projetos/programas-e-projetos-no-campus/canabinall'}) |
| Instagram | [@Canabinall](${ch.instagram || 'https://www.instagram.com/Canabinall/'}) |
| Curso vinculado | [UNIFESP SIEX 30063](${ch.unifespCourseUrl || 'https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info'}) |
| Idioma | Português (Brasil) |
| Linha editorial | ${ch.mission} |
| Vídeos catalogados nesta inspeção | **${ch.videoCount}** |
| Blocos clínicos identificados | **${clinicaCount}** |
| Episódios etnobotânicos / plantas | **${plantasCount}** |
| Episódios temporada Europa | **${europaCount}** |
| Data da inspeção | ${(ch.inspectedAt || new Date().toISOString()).slice(0, 10)} |

## Vídeos em destaque

### Entrada pedagógica ★

**[${highlight.title}](https://www.youtube.com/watch?v=${highlight.id})** — ponto de partida recomendado para quem chega ao canal sem base prévia.

| Campo | Valor |
|-------|-------|
| Vídeo | [${highlight.id}](https://www.youtube.com/watch?v=${highlight.id}) |
| Snapshot de alcance | ${highlight.views || '—'} |
| Publicação (relativa) | ${highlight.publishedRelative || highlight.published || '—'} |

### Assinatura etnobotânica ◆

**[${signature.title}](https://www.youtube.com/watch?v=${signature.id})** — episódio de maior alcance no inventário; exemplifica a série *Plantas Sagradas*, onde Eliana articula conhecimento tradicional, história cultural e leitura científica sem romantizar nem estigmatizar.

| Campo | Valor |
|-------|-------|
| Vídeo | [${signature.id}](https://www.youtube.com/watch?v=${signature.id}) |
| Snapshot de alcance | ${signature.views || '—'} |
| Publicação (relativa) | ${signature.publishedRelative || signature.published || '—'} |

## Hipóteses e método

- **H1:** Um canal de extensão universitária com cadência semanal e curadoria por Professora Titular reduz a assimetria de informação entre papers Scopus e o público brasileiro.
- **H2:** O acervo mistura **literatura clínica actual**, **etnobotânica comparada** e **campo europeu** — três camadas que se reforçam e distinguem o CANABinALL de canais só clínicos ou só advocacy.
- **H3:** A complementaridade com MovReCam (aulas longas) e com o laboratório BudGanja (métricas de cultivo) é clara: aqui o valor é **literacia científica e ética do uso**, não PPFD/VPD/EC.
- **Método:** (1) inventário da página pública \`/videos\` (${ch.videoCount} uploads); (2) agrupamento temático por palavras-chave nos títulos; (3) destaque pedagógico + assinatura cultural; (4) cruzamento com CEE, curso SIEX, MovReCam e ferramentas BudGanja; (5) créditos explícitos à coordenadora.

## Perfil editorial (achados)

1. **Curadoria de excelência** — Eliana não «opina no vazio»: apresenta artigo, desenho do estudo, resultados e limites, em tom acessível. Isso é extensão universitária de manual.
2. **Arquivo clínico denso** — ansiedade, depressão, epilepsia, Alzheimer, Parkinson, fibromialgia, TEA/autismo, TDAH, dor crónica, oncologia, glaucoma, odontologia e muito mais; a grade acompanha a fronteira terapêutica sem vender panaceia (*PANACEIA?*, *É DROGA?*, *EXISTEM EVIDÊNCIAS?*).
3. **Ética e segurança em primeiro plano** — temporada de eventos adversos, interações, formas de acesso, gestantes, uso crónico/cognição: o canal ensina a perguntar melhor, não a automedicar.
4. **Etnobotânica como coluna vertebral** — série *Plantas Sagradas* (ayahuasca, iamhô, cigarro tira-capeta, nomes populares, espécies) liga Cannabis a um continuum de plantas medicinais brasileiras e rituais, coerente com a trajetória do CEE desde 1995.
5. **Temporada na Europa** — dezenas de episódios em jardins botânicos, museus e herbolários (Salamanca, Barcelona, Amesterdão, Berlim, Lisboa, Copenhaga…) documentam a estada de investigação e aproximam o público do trabalho com a base CANNUSE / Institut Botànic de Barcelona.
6. **Etnoveterinária presente** — dores e epilepsia em cães, stress, uso dermatológico: linha de pesquisa própria da coordenadora, rara em canais de divulgação.
7. **Dedicatória a Carlini e parceria MovReCam** — âncora histórica e institucional; o CANABinALL não compete com as aulas longas do MovReCam — **alimenta o ecossistema** com micro-aulas de paper.
8. **Tom humano, sem clickbait** — relatos, meditação, estilo de vida, periferia, associação Cultive: ciência com empatia, sem perder o rigor.

## Mapa temático do acervo

${themeBlocks}

## Catálogo completo (${ch.videoCount} vídeos)

| # | Título | Publicação | Visualizações (snapshot) |
|---|--------|------------|--------------------------|
${catalogRows}

★ entrada pedagógica · ◆ assinatura etnobotânica

## Vídeo de referência (embed)

**Conceitos básicos #1** — porta de entrada recomendada:

@youtube ${CANABINALL_HIGHLIGHT.id}

**Série Plantas Sagradas** — assinatura cultural do canal:

@youtube ${CANABINALL_SIGNATURE.id}

## Complementaridade com o Inspetor BudGanja

| Tema CANABinALL / Eliana Rodrigues | Recurso BudGanja |
|------------------------------------|------------------|
| Aulas longas UNIFESP (mesma coordenadora RTC) | [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Hub formativo académico | [Biblioteca UNIFESP](/biblioteca/unifesp/) |
| Fitoterapia e plantas brasileiras | [Hub Plantas](/plantas/) · [Pesquisas](/biblioteca/pesquisas/) |
| Evidência, SEC, quimiotipos (aprofundamento em aula) | [MovReCam — composição e endocanabinoidoma](/posts/post-inspecao-canal-movrecam.html) |
| Cultivo indoor / métricas (fora do foco deste canal) | [PPFD indoor](/calculadoras/luximetro.html) · [Calculadoras](/calculadoras/) |
| Propagação e clonagem (quando o tema surgir em congressos) | [Propagação](/equipamentos/clonadora-6-estacas.html) · [Diário de pesquisas](/cultivo/) |

## Créditos e referências

**Todo o mérito científico, pedagógico e editorial deste canal pertence à Profa. Dra. Eliana Rodrigues e à equipa do projeto CANABinALL / UNIFESP.** Esta inspeção apenas documenta, recomenda e celebra o trabalho — sem apropriação de conteúdo.

- **Coordenação:** Profa. Dra. Eliana Rodrigues — Professora Titular UNIFESP, CEE
- **Canal YouTube:** [youtube.com/@canabinall](${ch.channelUrl})
- **CEE / extensão:** [CANABinALL](${ch.website || 'https://site.unifesp.br/cee/extensao/canabinall'})
- **CAEC Diadema:** [ficha do projeto](${ch.caecUrl || 'https://site.unifesp.br/caec.diadema/programas-e-projetos/programas-e-projetos-no-campus/canabinall'})
- **Contato:** [${ch.contactEmail || 'e.rodrigues@unifesp.br'}](mailto:${ch.contactEmail || 'e.rodrigues@unifesp.br'})
- **Instagram:** [@Canabinall](${ch.instagram || 'https://www.instagram.com/Canabinall/'})
- **Curso UNIFESP:** [SIEX 30063](${ch.unifespCourseUrl || 'https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info'})
- **Parceiro de ecossistema:** [MovReCam](https://www.youtube.com/@MovReCam) · [movrecam.org.br](https://movrecam.org.br/)
- **Dedicatória do projeto:** Prof. Emérito Elisaldo Carlini
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** registo técnico e recomendação editorial — **sem afiliação** com UNIFESP, CEE ou MovReCam

## Status

**Aprovado com mérito máximo como referência de divulgação científica** — canal essencial para quem quer literacia canábica séria em português, sob curadoria de uma Professora Titular com décadas de etnobotânica e etnofarmacologia. Nesta passagem, **Conceitos básicos #1** é a entrada pedagógica; **Cigarro tira-capeta** ilustra a profundidade etnobotânica. Cruzar com as [aulas MovReCam](/posts/post-inspecao-canal-movrecam.html) para formação longa e com o [laboratório BudGanja](/cultivo/) apenas quando o interesse for métrica de cultivo.

[▶ Conceitos básicos #1](https://www.youtube.com/watch?v=${CANABINALL_HIGHLIGHT.id}) · [◆ Plantas Sagradas](https://www.youtube.com/watch?v=${CANABINALL_SIGNATURE.id}) · [Canal CANABinALL](${ch.channelUrl}) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;
}

function buildCanabinallInspectionPost() {
  const ch = loadCanabinallCatalog();
  const inspected = (ch.inspectedAt || new Date().toISOString()).slice(0, 10);
  const refId = CANABINALL_HIGHLIGHT.id;

  return {
    title: 'Inspeção: Canal CANABinALL — Profa. Dra. Eliana Rodrigues',
    titleEn: 'Inspection: CANABinALL channel — Prof. Dr. Eliana Rodrigues',
    titleEs: 'Inspección: canal CANABinALL — Profa. Dra. Eliana Rodrigues',
    excerpt:
      'Auditoria do canal CANABinALL (@canabinall) — ' +
      ch.videoCount +
      ' vídeos catalogados; divulgação científica UNIFESP sob curadoria da Profa. Dra. Eliana Rodrigues (CEE), com destaque a Conceitos básicos #1 e à série Plantas Sagradas.',
    excerptEn:
      'Editorial audit of the CANABinALL channel (@canabinall) — ' +
      ch.videoCount +
      ' catalogued videos; UNIFESP science outreach curated by Prof. Dr. Eliana Rodrigues (CEE), highlighting Basics #1 and the Sacred Plants series.',
    excerptEs:
      'Auditoría editorial del canal CANABinALL (@canabinall) — ' +
      ch.videoCount +
      ' vídeos catalogados; divulgación científica UNIFESP con curaduría de la Profa. Dra. Eliana Rodrigues (CEE), con destaque a Conceptos básicos #1 y la serie Plantas Sagradas.',
    slug: 'inspecao-canal-canabinall',
    date: inspected + 'T15:00:00.000Z',
    coverImage: ytThumb(refId),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'canal-canabinall',
    seriesOrder: 3.6,
    seriesLabel: 'Canal CANABinALL',
    videoId: refId,
    filename: 'posts/post-inspecao-canal-canabinall.html',
    url: '/posts/post-inspecao-canal-canabinall.html',
    content_raw: buildCanabinallBody(ch)
  };
}

/** Plantamemo e Inspetor BudGanja removidos das inspeções (ver REMOVED_INSPECAO_SLUGS). */
const CHANNEL_INSPECOES_POSTS = [
  buildMovrecamInspectionPost(),
  buildCanabinallInspectionPost()
];

module.exports = {
  CHANNEL_INSPECOES_POSTS,
  buildMovrecamInspectionPost,
  buildCanabinallInspectionPost
};
