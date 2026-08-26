'use strict';

/**
 * Inspeções Palavras — Classificação legal (acesso / Lei de Drogas / RDC).
 * Extensão após guias advogados/médicos. Grupo Guia: classificacao.
 */

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
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

const L = {
  guia: '/guia/palavras.html?group=classificacao',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  droga: '/posts/post-inspecao-palavra-droga.html',
  entorpecente: '/posts/post-inspecao-palavra-entorpecente-narcotico.html',
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  proibicao: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html',
  anvisa: '/posts/post-inspecao-palavra-anvisa.html',
  portaria: '/posts/post-inspecao-palavra-portaria.html',
  listaF: '/posts/post-inspecao-palavra-lista-f.html',
  substancia: '/posts/post-inspecao-palavra-substancia-controlada.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  advogados: '/posts/post-inspecao-guia-hc-seletividade-advogados.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html',
  farmaceuticos: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html',
  associacoes: '/posts/post-inspecao-guia-associacoes-pacientes.html',
  defensoria: '/posts/post-inspecao-guia-defensoria-acesso.html',
  lei: '/posts/post-inspecao-palavra-lei-11-343.html',
  porte: '/posts/post-inspecao-palavra-porte-trafico.html',
  descrim: '/posts/post-inspecao-palavra-descriminalizacao.html',
  rdc: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html'
};

function note() {
  return `> **Nota metodológica:** auditoria independente BudGanja. **Não é parecer jurídico nem aconselhamento clínico.** Indexar ≠ endossar. Normas e jurisprudência mudam — confirmar nas fontes oficiais.`;
}

function noteEn() {
  return `> **Method note:** independent BudGanja audit. **Not legal advice.** Indexing ≠ endorsement.`;
}

function noteEs() {
  return `> **Nota metodológica:** auditoría independiente BudGanja. **No es asesoría jurídica.**`;
}

function shortEn(word, reading) {
  return `## Scope

Editorial inspection of **${word}** in BudGanja’s **legal classification** layer.

${noteEn()}

## Working sense

${reading}

## Status

**Approved — first sheet.**`;
}

function shortEs(word, reading) {
  return `## Alcance

Inspección editorial de **${word}** en la capa de **clasificación legal** BudGanja.

${noteEs()}

## Sentido de trabajo

${reading}

## Estado

**Aprobado — primera ficha.**`;
}

function buildSheet(cfg) {
  const wordsLabel = cfg.wordsLabel || cfg.word;
  const body = `## Escopo

${cfg.scope}

${note()}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra(s) | **${wordsLabel}** |
| Tipo BudGanja | Palavra — classificação legal / acesso |
| Grupo no Guia | [Classificação legal](${L.guia}) |
| Elo âncora | [Entorpecente × Narcótico](${L.entorpecente}) · [Guia HC — advogados](${L.advogados}) |
| Data da inspeção | ${cfg.inspected} |

## Hipóteses e método

${cfg.hypotheses}

## Sentido de trabalho

${cfg.senseTable}

## Por que inspeccionar

${cfg.why}

## Rede no laboratório

| Camada | Fichas |
|--------|--------|
| Par penal | [Lei 11.343](${L.lei}) · [Porte × Tráfico](${L.porte}) · [Descriminalização](${L.descrim}) |
| Sanitário | [RDC × Autorização](${L.rdc}) · [ANVISA](${L.anvisa}) · [Portaria](${L.portaria}) · [Lista F](${L.listaF}) |
| Guias | [Advogados](${L.advogados}) · [Médicos](${L.medicos}) · [Farmacêuticos](${L.farmaceuticos}) · [Associações](${L.associacoes}) · [Defensoria](${L.defensoria}) |
| Política | [Proibicionismo](${L.proibicao}) · [Ilícito](${L.ilicito}) · [Droga](${L.droga}) |
| Nome / planta | [Maconha](${L.maconha}) · [Cannabis](${L.cannabis}) · [Cannabis sativa](${L.planta}) |

## Contrastes úteis

${cfg.contrasts}

## Limites

${cfg.limits}

## Status

**Aprovado — primeira ficha.** ${cfg.statusLine}

[▶ Classificação legal](${L.guia}) · [▶ Guia HC](${L.advogados}) · [▶ Hub Palavras](${L.hub})
`;

  return palavraPost({
    title: cfg.title,
    titleEn: cfg.titleEn,
    titleEs: cfg.titleEs,
    excerpt: cfg.excerpt,
    excerptEn: cfg.excerptEn,
    excerptEs: cfg.excerptEs,
    slug: cfg.slug,
    date: cfg.date,
    seriesOrder: cfg.seriesOrder,
    seriesLabel: cfg.seriesLabel,
    sourceUrl: L.guia,
    body,
    contentEn: shortEn(wordsLabel, cfg.readingEn),
    contentEs: shortEs(wordsLabel, cfg.readingEs)
  });
}

function buildLei11343Post() {
  return buildSheet({
    word: 'Lei 11.343/2006',
    wordsLabel: 'Lei 11.343/2006',
    inspected: '2026-08-02',
    date: '2026-08-02T10:00:00.000Z',
    seriesOrder: 38,
    seriesLabel: 'Lei 11.343 · classificação',
    title: 'Inspeção: Lei 11.343/2006 — âncora tipológica da Lei de Drogas',
    titleEn: 'Inspection: Law 11.343/2006 — Drug Law typological anchor',
    titleEs: 'Inspección: Ley 11.343/2006 — ancla tipológica de la Ley de Drogas',
    excerpt:
      'Palavra-âncora: Lei 11.343/2006 — fundo tipológico onde cai quem não tem estatuto processual/sanitário (HC, produto ANVISA). Não é o texto integral da lei.',
    excerptEn:
      'Anchor word: Law 11.343/2006 — typological backdrop for those without procedural/sanitary status. Not the full statute text.',
    excerptEs:
      'Palabra-ancla: Ley 11.343/2006 — fondo tipológico de quien no tiene estatuto procesal/sanitario. No es el texto íntegro.',
    slug: 'inspecao-palavra-lei-11-343',
    scope:
      'Inspeção editorial de **Lei 11.343/2006** (Lei de Drogas) como **âncora tipológica** do grupo [Classificação legal](' +
      L.guia +
      ') — o «chão» penal/administrativo sobre o qual operam [porte × tráfico](' +
      L.porte +
      '), [HC](' +
      L.advogados +
      ') e vias ANVISA.',
    hypotheses: `**H1:** no discurso BudGanja, «Lei 11.343» nomeia o **regime** onde a conduta sem estatuto (HC / sanitário) é tipificada.  
**H2:** não substitui o Diário Oficial — o laboratório indexa o **papel da lei no mapa**, não o articulado completo.  
**H3:** confundir Lei 11.343 com «a planta é ilegal» apaga [descriminalização](${L.descrim}) do porte e vias medicinais.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Lei federal do Sistema Nacional de Políticas Públicas sobre Drogas |
| Uso no projecto | Âncora do contraste **com estatuto** × **sem estatuto** |
| Distinção | ≠ nome da planta · ≠ lista ANVISA · ≠ HC |
| Elo | [Porte × Tráfico](${L.porte}) · [Guia HC](${L.advogados}) · [Ilícito](${L.ilicito}) |`,
    why: `Os guias de [advogados](${L.advogados}) e [médicos](${L.medicos}) citam a Lei 11.343 como fundo. Sem ficha, o leitor não tem nó no Guia para a âncora tipológica.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Lei 11.343 (regime) | [Maconha](${L.maconha}) / nome popular |
| Tipificação genérica | Decisão judicial concreta (HC) |
| Artigo de uso | Artigo de tráfico ([porte × tráfico](${L.porte})) |
| Lei penal/administrativa | [Lista F](${L.listaF}) / [Portaria](${L.portaria}) sanitária |`,
    limits: `- Não reproduz articulado nem penas.  
- Não aconselha conduta.  
- Vigência e reformas: confirmar no Planalto / DOU.`,
    statusLine:
      'Lei 11.343 documentada como âncora tipológica da camada de classificação e acesso.',
    readingEn:
      'Federal Drug Law as typological backdrop — distinct from plant names, ANVISA lists and HC status.',
    readingEs:
      'Ley federal de Drogas como fondo tipológico — distinta de nombres de planta, listas ANVISA y estatuto de HC.'
  });
}

function buildPorteTraficoPost() {
  return buildSheet({
    word: 'porte × tráfico',
    wordsLabel: 'porte × tráfico',
    inspected: '2026-08-02',
    date: '2026-08-02T10:10:00.000Z',
    seriesOrder: 39,
    seriesLabel: 'Porte × Tráfico · classificação',
    title: 'Inspeção: Porte × Tráfico — par semântico da seletividade na rua',
    titleEn: 'Inspection: Possession × Trafficking — street selectivity semantic pair',
    titleEs: 'Inspección: Porte × Tráfico — par semántico de selectividad en la calle',
    excerpt:
      'Par: porte × tráfico — o mesmo volume pode ser lido como uso ou mercancia conforme contexto, classe e olhar policial; elo com Tema 506 e seletividade.',
    excerptEn:
      'Pair: possession × trafficking — the same amount can be read as use or commerce by context, class and police gaze; link to Tema 506 and selectivity.',
    excerptEs:
      'Par: porte × tráfico — el mismo volumen puede leerse como uso o mercancía según contexto, clase y mirada policial.',
    slug: 'inspecao-palavra-porte-trafico',
    scope:
      'Inspeção editorial do par **porte × tráfico** — eixo da [seletividade](' +
      L.advogados +
      ') na abordagem e na tipificação sob a [Lei 11.343](' +
      L.lei +
      '). Inclui o eco do **STF Tema 506** (porte uso pessoal) sem confundir com cultivo ou legalização.',
    hypotheses: `**H1:** «porte» e «tráfico» não são só quantidades — são **rótulos** que a polícia/MP/juiz aplicam com critérios contestáveis.  
**H2:** o Tema 506 (atipicidade **penal** do porte de cannabis para uso pessoal, com parâmetros) **não** apaga o tráfico com indícios de mercancia.  
**H3:** a dicotomia reproduz seletividade: pobre sem rede → risco de tipificação mais grave; paciente com dossiê → outra narrativa.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Porte (uso pessoal) | Conduta tipicamente ligada ao consumo próprio — pós-Tema 506: ilícito **extrapenal** para cannabis (confirmar vigência) |
| Tráfico | Tipificação quando há indícios de mercancia / destinação a terceiros |
| Filtro | Quantidade, embalagem, local, antecedentes, cor/território (literatura) |
| Elo | [Lei 11.343](${L.lei}) · [Descriminalização](${L.descrim}) · [Guia HC](${L.advogados}) · [Defensoria](${L.defensoria}) |`,
    why: `Sem o par, o Guia fala em seletividade sem nomear o **vocabulário da rua e do inquérito**.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Porte uso pessoal | Autorização de cultivo |
| Parâmetro ~40 g / 6 plantas (tese STF) | Direito absoluto / legalização |
| Tráfico (tipificação) | Nome popular [maconha](${L.maconha}) |
| Porte | Importação ANVISA / produto regulado |`,
    limits: `- Não fixa limiares locais nem aconselha quantitativos.  
- Parâmetros STF são **provisórios** até lei — verificar acórdão.  
- Não é defesa criminal.`,
    statusLine:
      'Porte × tráfico documentados como par da seletividade na abordagem e tipificação.',
    readingEn:
      'Possession vs trafficking as street/selectivity labels — Tema 506 does not erase trafficking with commerce indicators.',
    readingEs:
      'Porte vs tráfico como rótulos de calle/selectividad — el Tema 506 no borra el tráfico con indicios de mercancía.'
  });
}

function buildDescriminalizacaoPost() {
  return buildSheet({
    word: 'descriminalização',
    wordsLabel: 'descriminalização',
    inspected: '2026-08-02',
    date: '2026-08-02T10:20:00.000Z',
    seriesOrder: 40,
    seriesLabel: 'Descriminalização · classificação',
    title: 'Inspeção: Descriminalização — atipicidade penal ≠ legalização',
    titleEn: 'Inspection: Decriminalization — penal atypicality ≠ legalization',
    titleEs: 'Inspección: Descriminalización — atipicidad penal ≠ legalización',
    excerpt:
      'Palavra: descriminalização — no debate brasileiro, frequentemente aponta à atipicidade penal do porte (Tema 506); não é legalização nem autorização de cultivo.',
    excerptEn:
      'Word: decriminalization — in Brazil often points to penal atypicality of possession (Tema 506); not legalization or grow authorization.',
    excerptEs:
      'Palabra: descriminalización — en Brasil suele apuntar a la atipicidad penal del porte (Tema 506); no es legalización ni autorización de cultivo.',
    slug: 'inspecao-palavra-descriminalizacao',
    scope:
      'Inspeção editorial de **descriminalização** no mapa BudGanja — distinguir **deixar de ser crime** (ou atipicidade penal) de **legalizar**, de **regular sanitariamente** e de **amparar cultivo via HC**. Elo: [Porte × Tráfico](' +
      L.porte +
      ') · [Guia HC](' +
      L.advogados +
      ').',
    hypotheses: `**H1:** no senso comum, «descriminalizou» é lido como «liberou» — o laboratório corrige: **≠ legalização**.  
**H2:** o Tema 506 opera sobre **porte para uso pessoal** de cannabis — não resolve autocultivo medicinal nem tráfico.  
**H3:** descriminalização incompleta convive com seletividade: quem tem HC/produto regulado e quem só tem a rua.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Retirada ou mitigação da resposta **penal** a certa conduta |
| Uso mediático | Frequentemente = porte uso pessoal pós-STF |
| Distinção | ≠ legalização · ≠ RDC associativa · ≠ HC |
| Elo | [Porte × Tráfico](${L.porte}) · [Lei 11.343](${L.lei}) · [Proibicionismo](${L.proibicao}) |`,
    why: `Palavra saturada na imprensa; sem ficha, colapsa com «tá liberado» e apaga o [guia HC](${L.advogados}).`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Descriminalização do porte | Legalização do comércio |
| Atipicidade penal | Autorização sanitária ([RDC](${L.rdc})) |
| Tema 506 | Salvo-conduto de cultivo |
| Ilícito administrativo | «Inocente» / sem consequência |`,
    limits: `- Não afirma vigência eterna do Tema 506.  
- Não cobre todas as drogas — foco cannabis no projecto.  
- Não é panfleto político.`,
    statusLine:
      'Descriminalização documentada como atipicidade/mitigação penal ≠ legalização.',
    readingEn:
      'Decriminalization as reduced/penal-atypical response — not legalization, RDC grow, or HC cultivation shield.',
    readingEs:
      'Descriminalización como respuesta penal atenuada/atípica — no es legalización, cultivo RDC ni escudo de HC.'
  });
}

function buildRdcAutorizacaoPost() {
  return buildSheet({
    word: 'RDC × autorização sanitária',
    wordsLabel: 'RDC × autorização sanitária',
    inspected: '2026-08-02',
    date: '2026-08-02T10:30:00.000Z',
    seriesOrder: 41,
    seriesLabel: 'RDC · autorização sanitária · classificação',
    title: 'Inspeção: RDC × Autorização sanitária — camada ANVISA do acesso',
    titleEn: 'Inspection: RDC × Sanitary authorization — ANVISA access layer',
    titleEs: 'Inspección: RDC × Autorización sanitaria — capa ANVISA del acceso',
    excerpt:
      'Par: RDC × autorização sanitária — normas ANVISA (incl. marcos 2026 de cultivo/produção institucional) distintas de HC individual e de descriminalização do porte.',
    excerptEn:
      'Pair: RDC × sanitary authorization — ANVISA rules (incl. 2026 institutional grow frames) distinct from individual HC and possession decriminalization.',
    excerptEs:
      'Par: RDC × autorización sanitaria — normas ANVISA distintas del HC individual y de la descriminalización del porte.',
    slug: 'inspecao-palavra-rdc-autorizacao-sanitaria',
    scope:
      'Inspeção editorial do par **RDC** (Resolução da Diretoria Colegiada) × **autorização sanitária** — língua da [ANVISA](' +
      L.anvisa +
      ') para produtos, importação e, em marcos recentes, **cultivo/produção institucional**. Elo: [Associações](' +
      L.associacoes +
      ') · [Médicos](' +
      L.medicos +
      ') · [Portaria](' +
      L.portaria +
      ').',
    hypotheses: `**H1:** RDC é o **género textual** da agência — número muda; o laboratório indexa o tipo.  
**H2:** autorização sanitária ≠ salvo-conduto judicial ([HC](${L.advogados})).  
**H3:** marcos de cultivo **PJ / associativo** não apagam a seletividade do paciente individual sem rede.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| RDC | Norma da Diretoria Colegiada da ANVISA |
| Autorização sanitária | Acto/permissão no circuito de vigilância (produto, importação, estabelecimento) |
| Cultivo institucional (marcos 2026) | Via para pessoas jurídicas / associações sob regras próprias |
| Distinção | ≠ HC individual · ≠ [descriminalização](${L.descrim}) do porte |`,
    why: `Os guias citam «RDCs 2026» e importação; o Guia precisava do nó semântico **RDC / autorização**.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| RDC (norma ANVISA) | [Portaria](${L.portaria}) (outro género) |
| Autorização sanitária | HC / salvo-conduto |
| Cultivo PJ/associativo | Autocultivo caseiro sem amparo |
| Produto regulado | Óleo artesanal sem via |`,
    limits: `- Não lista números de RDC como eternos.  
- Não substitui consulta à ANVISA.  
- Não é manual de licenciamento.`,
    statusLine:
      'RDC × autorização sanitária documentados como camada ANVISA distinta do HC e do porte.',
    readingEn:
      'ANVISA RDC / sanitary authorization layer — distinct from HC safe-conduct and possession decriminalization.',
    readingEs:
      'Capa ANVISA de RDC / autorización sanitaria — distinta del HC y de la descriminalización del porte.'
  });
}

const CLASSIFICACAO_ACESSO_PALAVRAS_POSTS = [
  buildLei11343Post(),
  buildPorteTraficoPost(),
  buildDescriminalizacaoPost(),
  buildRdcAutorizacaoPost()
];

const CLASSIFICACAO_ACESSO_GUIA_ITEMS = [
  {
    id: 'lei-11-343',
    word: 'Lei 11.343/2006',
    simple:
      'Lei de Drogas — âncora tipológica onde cai quem não tem estatuto processual (HC) ou sanitário (ANVISA); não é o nome da planta.',
    simpleEn:
      'Drug Law — typological anchor for those without HC or ANVISA status; not the plant’s name.',
    simpleEs:
      'Ley de Drogas — ancla tipológica de quien no tiene estatuto de HC o ANVISA; no es el nombre de la planta.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-lei-11-343.html'
  },
  {
    id: 'porte',
    word: 'Porte',
    simple:
      'Conduta tipicamente ligada ao consumo próprio — no debate canábico, eixo do Tema 506; distinta de tráfico e de cultivo amparado por HC.',
    simpleEn:
      'Conduct typically tied to personal use — in the cannabis debate, Tema 506 axis; distinct from trafficking and HC-shielded grow.',
    simpleEs:
      'Conducta ligada al consumo propio — eje del Tema 506; distinta de tráfico y de cultivo amparado por HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-porte-trafico.html'
  },
  {
    id: 'trafico',
    word: 'Tráfico',
    simple:
      'Tipificação quando há indícios de mercancia — rótulo que, com porte, opera a seletividade na rua e no inquérito.',
    simpleEn:
      'Charging when commerce indicators appear — with possession, operates street/inquiry selectivity.',
    simpleEs:
      'Tipificación con indicios de mercancía — con porte, opera la selectividad en la calle y el sumario.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-porte-trafico.html'
  },
  {
    id: 'descriminalizacao',
    word: 'Descriminalização',
    simple:
      'Mitigação ou atipicidade penal de certa conduta — no Brasil canábico, frequentemente o porte uso pessoal; ≠ legalização nem HC de cultivo.',
    simpleEn:
      'Reduced or atypical penal response — in Brazilian cannabis debate often personal possession; ≠ legalization or grow HC.',
    simpleEs:
      'Respuesta penal atenuada o atípica — en el debate cannábico brasileño suele ser el porte personal; ≠ legalización ni HC de cultivo.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-descriminalizacao.html'
  },
  {
    id: 'rdc',
    word: 'RDC',
    simple:
      'Resolução da Diretoria Colegiada (ANVISA) — género normativo sanitário; números mudam, o laboratório indexa o tipo.',
    simpleEn:
      'ANVISA Collegiate Board Resolution — sanitary normative genre; numbers change, the lab indexes the type.',
    simpleEs:
      'Resolución de la Dirección Colegiada (ANVISA) — género normativo sanitario; los números cambian.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html'
  },
  {
    id: 'autorizacao-sanitaria',
    word: 'Autorização sanitária',
    simple:
      'Permissão no circuito ANVISA (produto, importação, estabelecimento) — distinta de salvo-conduto judicial (HC).',
    simpleEn:
      'Permission in the ANVISA circuit (product, import, establishment) — distinct from judicial HC safe-conduct.',
    simpleEs:
      'Permiso en el circuito ANVISA — distinto del salvoconducto judicial (HC).',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html'
  }
];

module.exports = {
  CLASSIFICACAO_ACESSO_PALAVRAS_POSTS,
  CLASSIFICACAO_ACESSO_GUIA_ITEMS,
  buildLei11343Post,
  buildPorteTraficoPost,
  buildDescriminalizacaoPost,
  buildRdcAutorizacaoPost
};
