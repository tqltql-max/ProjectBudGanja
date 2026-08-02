'use strict';

/**
 * Inspeção-guia: HC, salvo-conduto e seletividade — mapa para advogados.
 * Elo: Classificação legal · Proibicionismo · ANVISA · STJ/STF (âncoras públicas).
 * Não é parecer jurídico.
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
  psicotropico: '/posts/post-inspecao-palavra-psicotropico.html',
  listaF: '/posts/post-inspecao-palavra-lista-f.html',
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  proibicao: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html',
  anvisa: '/posts/post-inspecao-palavra-anvisa.html',
  portaria: '/posts/post-inspecao-palavra-portaria.html',
  substancia: '/posts/post-inspecao-palavra-substancia-controlada.html',
  estupefaciente: '/posts/post-inspecao-palavra-estupefaciente.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cebrid: '/posts/post-inspecao-cebrid.html',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  xiv: '/biblioteca/unifesp/livro-xiv.html',
  sidarta: '/posts/post-inspecao-sidarta-ribeiro.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html'
};

function buildGuiaHcSeletividadeBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **advogados e operadores do direito**: mapa semântico e processual do contraste **com habeas corpus (HC) / salvo-conduto** × **sem HC** no cultivo e porte de cannabis no Brasil — com foco na **seletividade de classe** (e, na literatura, de cor/território).

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é parecer jurídico, não é peça processual, não substitui consulta a advogado.** Indexar ≠ endossar. Jurisprudência e normas mudam — confirmar sempre nos tribunais e no Diário Oficial. Objecto = **literacia do projeto** + **âncoras públicas** para leitura crítica.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Advogados, defensores, estudantes de Direito, associações de pacientes |
| Tipo BudGanja | Inspeção-guia — classificação legal × acesso à justiça |
| Grupo Guia | [Classificação legal](${L.guia}) |
| Pergunta-guia | Por que quem tem HC pode cultivar/produzir óleo medicinal e quem não tem fica na zona de repressão? |
| Data | ${inspected} |

## Tese central (uma frase)

A planta pode ser a mesma; o que muda é o **estatuto**: quem compra o caminho processual (laudos + advogado + HC preventivo) reduz o risco penal; quem não tem acesso permanece na categoria **usuário / traficante no olhar policial** — mecanismo de **seletividade**, não «direito natural do rico».

## Hipóteses

**H1:** o HC preventivo funciona como **salvo-conduto** — remédio constitucional («remédio heroico») que obsta a persecução penal em hipóteses medicinais documentadas.  
**H2:** o custo (honorários, laudos médicos, por vezes agronómicos, tempo) transforma o direito em **filtro de renda**.  
**H3:** a dicotomia **paciente medicinal** × **usuário** não é neutra: opera como mecanismo de seletividade penal (classe; literatura também aponta cor/território).  
**H4:** omissões regulatórias (cultivo individual) empurram a saúde para o **Judiciário** — quem não judicializa fica na Lei 11.343/2006 sem escudo.

## Mapa rápido: com HC × sem HC

| Situação | Leitura BudGanja |
|----------|------------------|
| **Com HC / salvo-conduto** (fins medicinais documentados) | Conduta tipicamente amparada contra persecução penal *naquele caso*; cultivo/extração nos limites da decisão |
| **Sem HC**, porte uso pessoal (pós-STF Tema 506) | Deixa de ser infração **penal** para cannabis (ilícito administrativo); **não** legaliza; tráfico com indícios de mercancia continua |
| **Sem HC**, cultivo / produção sem amparo | Zona de risco penal clássica (Lei de Drogas) — abordagem policial e tipificação dependem do caso concreto |
| **Importação ANVISA / produto regulado** | Via sanitária cara; não resolve sozinha o autocultivo |

## Âncoras públicas (para o advogado localizar)

| Âncora | O que o laboratório indexa |
|--------|----------------------------|
| **STJ — AgRg no HC 783.717/PR (13/09/2023)** | Terceira Seção: plantio/aquisição de sementes para fins medicinais, com prova terapêutica, pode gerar **salvo-conduto**; omissão administrativa não anula o direito à saúde |
| **STF — Tema 506 / RE 635.659 (2024)** | Porte de cannabis para uso pessoal: atipicidade **penal** (ilícito extrapenal); parâmetro transitório citado na tese (~**40 g** ou **6 plantas-fêmeas** até lei); presunção relativa — mercancia continua tipificando tráfico |
| **ANVISA — RDCs 2026** (produção/cultivo institucional) | Marco sanitário para pessoas jurídicas / associações em regras próprias; **não** apaga a história do HC individual nem a seletividade do acesso |
| **Lei 11.343/2006** | Fundo tipológico onde cai quem não tem estatuto processual/sanitário |

> Confirmar sempre o inteiro teor e a vigência. O laboratório **não** reproduz ementas oficiais completas.

## Checklist documental (educacional — o que a literatura do HC descreve)

Não é roteiro de peça. É o inventário de **custos/filtros** que a pesquisa empírica associa ao HC de cultivo medicinal:

1. Identificação e narrativa do risco de constrangimento ilegal.  
2. **Receituário / laudo médico** (necessidade terapêutica).  
3. Histórico de autorização de importação ANVISA (quando existir) — elo sanitário.  
4. Eventual **laudo agronómico** / plano de cultivo e limites quantitativos.  
5. Cursos ou prova de capacidade técnica (quando exigidos na prática forense).  
6. Pedido de **salvo-conduto** com comunicação a órgãos (MP, polícia, ANVISA/MS — conforme decisão).  
7. Honorários e tempo de tramitação — o filtro de classe.

**Leitura BudGanja:** cada item que custa dinheiro ou rede profissional **aumenta** a distância entre o paciente com advogado e o pobre abordado na rua.

## Seletividade: paciente × usuário

| Rótulo | Quem costuma aceder | Efeito prático |
|--------|---------------------|----------------|
| **Paciente medicinal** | Quem monta o dossiê e judicializa | Entra no discurso de direito à saúde + HC |
| **Usuário** | Quem não judicializa / não importa | Fica no olhar da abordagem e do artigo 28 / tráfico |
| **Traficante (tipificação)** | Risco quando há indícios de mercancia — e quando a quantidade/contexto é lido sem método | Prisão e processo |

Fontes de contexto (não endosso): análises em Saúde e Sociedade (HC cultivo doméstico); trabalhos sobre cannabis, classe e cor; relatos de movimento associativo sobre elitização do HC.

## Rede BudGanja (obrigatória nesta guia)

| Camada | Fichas |
|--------|--------|
| Classificação / lista | [Entorpecente × Narcótico](${L.entorpecente}) · [Lista F](${L.listaF}) · [Substância controlada](${L.substancia}) · [Estupefaciente](${L.estupefaciente}) · [Psicotrópico](${L.psicotropico}) |
| Instituição / norma | [ANVISA](${L.anvisa}) · [Portaria](${L.portaria}) |
| Política | [Proibição × Proibicionismo](${L.proibicao}) · [Ilícito](${L.ilicito}) · [Droga](${L.droga}) |
| Nome / planta | [Maconha](${L.maconha}) · [Cannabis](${L.cannabis}) · [Cannabis sativa](${L.planta}) |
| Formação | [CEBRID](${L.cebrid}) · [Curso UNIFESP](${L.curso}) · [Rascunhos XIV](${L.xiv}) · [Sidarta](${L.sidarta}) |
| Guia irmão (Medicina) | [Cannabis medicinal — médicos](${L.medicos}) |
| Glossário | [Classificação legal](${L.guia}) · [Cobertura do Guia](${L.cobertura}) |

## Contrastes que o advogado deve manter vivos

| Não confundir | Com |
|---------------|-----|
| HC / salvo-conduto (caso concreto) | Legalização geral da cannabis |
| Paciente com dossiê | Impunidade de classe «natural» |
| Tema 506 (porte uso pessoal) | Autorização de cultivo comercial |
| Produto ANVISA importado | Autocultivo sem decisão judicial |
| Entorpecente (lista) | Nome popular ([maconha](${L.maconha})) |

## Limites desta ficha

- Não redige petição nem fixa jurisprudência local.  
- Não aconselha cometer ou omitir condutas.  
- Não substitui Defensoria, OAB ou doutrina actualizada.  
- Números (40 g / 6 plantas) são **parâmetros citados na tese STF** — verificar ata/acórdão e legislação posterior.

## Como o laboratório sugere ler o caso

1. Separar **nome** (maconha/cannabis) de **lista** (entorpecente) de **estatuto processual** (HC).  
2. Perguntar: o cliente tem **caminho de saúde documentado** ou só exposição policial?  
3. Nomear a seletividade: o problema estrutural é o **preço do estatuto**, não a botânica.  
4. Cruzar com proibicionismo e ilícito nas fichas BudGanja.  
5. Actualizar âncoras (STJ/STF/ANVISA) antes de qualquer peça real.

## Status

**Aprovado — primeira inspeção-guia para advogados.** HC × seletividade documentados como camada de **acesso à justiça** sobre a rede de [Classificação legal](${L.guia}).

[▶ Guia médicos](${L.medicos}) · [▶ Classificação legal](${L.guia}) · [▶ Entorpecente × Narcótico](${L.entorpecente}) · [▶ Proibicionismo](${L.proibicao}) · [▶ Ilícito](${L.ilicito}) · [▶ ANVISA](${L.anvisa}) · [▶ Hub Palavras](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide inspection for lawyers**: semantic/process map of **habeas corpus (HC) / safe-conduct** vs **no HC** in Brazilian cannabis cultivation and possession — focusing on **class selectivity**.

> **Not legal advice.** Indexing ≠ endorsement. Confirm courts and official gazettes.

## Core thesis

Same plant; different **status**. Paying for the procedural path (reports + lawyer + preventive HC) lowers criminal risk; those without access stay in the police gaze as user/trafficker — a **selectivity** mechanism.

## Public anchors

| Anchor | Lab note |
|--------|----------|
| STJ AgRg HC 783.717/PR (2023) | Medicinal cultivation may receive safe-conduct; administrative omission cannot erase health rights |
| STF Theme 506 (2024) | Personal-use cannabis possession: no longer a **criminal** offence (administrative illicit); trafficking with commerce signs remains |
| ANVISA RDCs 2026 | Institutional production rules — do not erase individual HC history or unequal access |

## Status

**Approved — first lawyer-facing guide sheet.**
`;

  const contentEs = `## Alcance

Inspección-guía BudGanja para **abogados**: mapa semántico/procesal de **habeas corpus (HC) / salvoconducto** vs **sin HC** en cultivo y porte de cannabis en Brasil — con foco en **selectividad de clase**.

> **No es asesoría jurídica.** Indexar ≠ respaldar. Confirmar tribunales y Diario Oficial.

## Tesis central

La misma planta; distinto **estatuto**. Quien compra el camino procesal reduce el riesgo penal; quien no tiene acceso permanece en la mirada policial — mecanismo de **selectividad**.

## Anclas públicas

| Ancla | Nota |
|-------|------|
| STJ AgRg HC 783.717/PR (2023) | Cultivo medicinal puede recibir salvoconducto |
| STF Tema 506 (2024) | Porte para uso personal deja de ser infracción **penal** (ilícito administrativo); tráfico con mercancia sigue |
| ANVISA RDC 2026 | Marco institucional — no borra la historia del HC individual ni la desigualdad de acceso |

## Estado

**Aprobado — primera ficha-guía para abogados.**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaHcSeletividadePost() {
  const { body, contentEn, contentEs } = buildGuiaHcSeletividadeBodies();
  return palavraPost({
    title: 'Inspeção: Guia HC e seletividade — mapa para advogados (com HC × sem HC)',
    titleEn: 'Inspection: HC & selectivity guide — map for lawyers (with HC vs without HC)',
    titleEs: 'Inspección: Guía HC y selectividad — mapa para abogados (con HC × sin HC)',
    excerpt:
      'Guia para advogados: habeas corpus / salvo-conduto no cultivo medicinal vs repressão sem HC — seletividade de classe, âncoras STJ/STF e rede BudGanja de classificação legal. Não é parecer jurídico.',
    excerptEn:
      'Guide for lawyers: habeas corpus / safe-conduct in medicinal cultivation vs repression without HC — class selectivity, STJ/STF anchors and BudGanja legal-classification network. Not legal advice.',
    excerptEs:
      'Guía para abogados: habeas corpus / salvoconducto en cultivo medicinal vs represión sin HC — selectividad de clase, anclas STJ/STF y red BudGanja. No es asesoría jurídica.',
    slug: 'inspecao-guia-hc-seletividade-advogados',
    date: '2026-08-02T09:00:00.000Z',
    seriesOrder: 33,
    seriesLabel: 'Guia · HC seletividade · advogados',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

const GUIA_HC_SELETIVIDADE_GUIA_ITEMS = [
  {
    id: 'autocultivo',
    word: 'Autocultivo',
    simple:
      'Cultivo próprio da planta — no Brasil, zona de disputa entre saúde (HC/salvo-conduto) e risco penal sem amparo processual.',
    simpleEn:
      'Growing the plant oneself — in Brazil, contested between health (HC/safe-conduct) and criminal risk without procedural shield.',
    simpleEs:
      'Cultivo propio de la planta — en Brasil, zona de disputa entre salud (HC/salvoconducto) y riesgo penal sin amparo procesal.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'habeas-corpus',
    word: 'Habeas corpus',
    simple:
      'Remédio constitucional («remédio heroico») usado como HC preventivo / salvo-conduto no cultivo medicinal — filtro de acesso à justiça.',
    simpleEn:
      'Constitutional remedy used as preventive HC / safe-conduct for medicinal cultivation — an access-to-justice filter.',
    simpleEs:
      'Remedio constitucional usado como HC preventivo / salvoconducto en cultivo medicinal — filtro de acceso a la justicia.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'judicializacao',
    word: 'Judicialização',
    simple:
      'Quando a saúde só se concretiza via processo (HC, fornecimento) por omissão regulatória — quem não judicializa fica exposto.',
    simpleEn:
      'When health only becomes real through litigation (HC, provision) due to regulatory omission — those who do not litigate stay exposed.',
    simpleEs:
      'Cuando la salud solo se concreta vía proceso (HC, suministro) por omisión regulatoria — quien no judicializa queda expuesto.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'paciente-medicinal',
    word: 'Paciente medicinal',
    simple:
      'Rótulo de quem documenta tratamento e judicializa — dicotomia com «usuário»; filtro de classe no acesso ao HC.',
    simpleEn:
      'Label for those who document treatment and litigate — dichotomy with “user”; class filter on HC access.',
    simpleEs:
      'Rótulo de quien documenta tratamiento y judicializa — dicotomía con «usuario»; filtro de clase en el acceso al HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'salvo-conduto',
    word: 'Salvo-conduto',
    simple:
      'Efeito prático do HC preventivo: ordem para que a persecução penal não turbe o cultivo/produção medicinal nos limites da decisão.',
    simpleEn:
      'Practical effect of preventive HC: order that criminal prosecution not hinder medicinal cultivation/production within the decision’s limits.',
    simpleEs:
      'Efecto práctico del HC preventivo: orden de que la persecución penal no turbe el cultivo/producción medicinal dentro de los límites de la decisión.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'seletividade-penal',
    word: 'Seletividade penal',
    simple:
      'Mecanismo estrutural: a mesma conduta é lida como saúde ou crime conforme classe, cor, território e acesso a advogado/HC.',
    simpleEn:
      'Structural mechanism: the same conduct is read as health or crime depending on class, race, territory and access to a lawyer/HC.',
    simpleEs:
      'Mecanismo estructural: la misma conducta se lee como salud o crimen según clase, color, territorio y acceso a abogado/HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  },
  {
    id: 'usuario-drogas',
    word: 'Usuário',
    simple:
      'Rótulo policial/social oposto a «paciente medicinal» no debate canábico — quem não judicializa costuma ficar nesta categoria.',
    simpleEn:
      'Police/social label opposed to “medicinal patient” in the cannabis debate — those who do not litigate often stay here.',
    simpleEs:
      'Rótulo policial/social opuesto a «paciente medicinal» en el debate cannábico — quien no judicializa suele quedar aquí.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-hc-seletividade-advogados.html'
  }
];

module.exports = {
  buildGuiaHcSeletividadePost,
  buildGuiaHcSeletividadeBodies,
  GUIA_HC_SELETIVIDADE_GUIA_ITEMS
};
