'use strict';

/**
 * Inspeção-guia: Defensoria Pública e o acesso gratuito à justiça.
 * Eixos: assistência jurídica gratuita · critérios de vulnerabilidade · limites do remédio heroico.
 * Roteiro de Scaffolding e Rastreabilidade do Laboratório BudGanja.
 * Não é parecer jurídico nem peça.
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
  substancia: '/posts/post-inspecao-palavra-substancia-controlada.html',
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  proibicao: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html',
  anvisa: '/posts/post-inspecao-palavra-anvisa.html',
  portaria: '/posts/post-inspecao-palavra-portaria.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  advogados: '/posts/post-inspecao-guia-hc-seletividade-advogados.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html',
  farmaceuticos: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html',
  associacoes: '/posts/post-inspecao-guia-associacoes-pacientes.html',
  lei: '/posts/post-inspecao-palavra-lei-11-343.html',
  porte: '/posts/post-inspecao-palavra-porte-trafico.html',
  descrim: '/posts/post-inspecao-palavra-descriminalizacao.html',
  rdc: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html',
  mantra: '/posts/post-inspecao-palavra-valeu.html'
};

const SRC = {
  cf: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  lc80: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp80.htm',
  dpu: 'https://www.dpu.def.br/',
  dpuAtendimento: 'https://www.dpu.def.br/atendimento',
  stfTema506:
    'https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=4032040&numeroProcesso=635659&classeProcesso=RE&numeroTema=506'
};

function buildGuiaDefensoriaAcessoBodies() {
  const inspected = '2026-08-19';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **pacientes, defensores e operadores do direito**: mapa conceitual e institucional do papel da **Defensoria Pública** como porta de entrada para o **acesso gratuito à justiça** no cultivo medicinal de cannabis no Brasil — critérios de triagem social, filtros que restam sem honorários, e os limites práticos do remédio constitucional face à omissão do Estado. Espelho do [guia HC para advogados](${L.advogados}): mesma tese de **seletividade**, com foco em quem **não compra** advogado particular.

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é parecer jurídico, não substitui consulta formal à Defensoria ou advogado cadastrado, e não é peça processual.** O laboratório documenta o fluxo institucional a partir da literatura de acesso à justiça e das âncoras públicas. Indexar ≠ endossar. Confirmar os critérios locais de hipossuficiência em cada núcleo estadual ou federal. Jurisprudência e tabelas de renda mudam.

## Público e Uso

| Parâmetro | Mapeamento no ecossistema |
|-----------|---------------------------|
| **Público-alvo** | Pacientes de baixa renda, defensores públicos, núcleos de prática jurídica e estudantes de direito |
| **Tipo de inspeção** | Inspeção-guia — acesso à justiça × direito à saúde |
| **Grupo classificação** | [Classificação legal](${L.guia}) |
| **Par completo** | [HC × seletividade — advogados](${L.advogados}) |
| **Pergunta-guia** | Como o paciente sem recursos financeiros disputa o estatuto jurídico de cultivo/uso medicinal através do Estado — e o que a triagem **não** garante? |
| **Data** | ${inspected} |

## Tese Central

A **Defensoria Pública** é o principal instrumento de mitigação da seletividade de classe no acesso à justiça canábica; contudo, o custo de laudos médicos externos e a sobrecarga estrutural do órgão ainda operam como filtros severos — tirar o preço do advogado **não apaga** a seletividade.

## Hipóteses de Trabalho

**H1:** a via pública remove o obstáculo dos honorários advocatícios particulares, permitindo que a população vulnerável dispute o estatuto jurídico de paciente medicinal.  
**H2:** a exigência de documentação clínica robusta empurra o assistido de volta para a fila do SUS (ou para laudo particular), gerando um gargalo temporal que atrasa o ajuizamento do *habeas corpus*.  
**H3:** os núcleos especializados de direitos humanos e saúde das Defensorias Estaduais e da União servem como pólos de padronização processual contra a violência policial — sem substituir o [guia HC](${L.advogados}) nem o laudo.  
**H4:** [descriminalização](${L.descrim}) do porte reduz pena/crime em alguns casos, mas **não** entrega cultivo, semente nem óleo.

## Âncoras Públicas ou Científicas

| Fonte / autoridade | Recorte documental | Rastreabilidade |
|--------------------|--------------------|-----------------|
| **Art. 134, CF/88** | Defensoria Pública como instituição essencial à função jurisdicional do Estado, assistência jurídica integral e gratuita aos que comprovem insuficiência de recursos | [Constituição Federal](${SRC.cf}) |
| **LC 80/1994** | Lei orgânica nacional da Defensoria — organização, atribuições e princípios (incluindo DPU e diretrizes das DPEs) | [Lei Complementar 80/1994](${SRC.lc80}) |
| **DPU — atendimento** | Porta federal de assistência; critérios e fluxos de triagem **locais** (não há corte nacional único de renda) | [Defensoria Pública da União](${SRC.dpu}) · [Atendimento](${SRC.dpuAtendimento}) |
| **STJ — AgRg no HC 783.717/PR (13/09/2023)** | Terceira Seção: plantio/aquisição de sementes para fins medicinais, com prova terapêutica, pode gerar **salvo-conduto**; omissão administrativa não anula o direito à saúde | Inteiro teor no STJ · mapa no [guia HC](${L.advogados}) |
| **STF — Tema 506 / RE 635.659 (2024)** | Porte de cannabis para uso pessoal: atipicidade **penal** (ilícito extrapenal); **não** é autorização de cultivo nem legalização | [Andamento Tema 506](${SRC.stfTema506}) · [Descriminalização](${L.descrim}) |
| **Lei 11.343/2006** | Fundo tipológico onde cai quem não tem estatuto processual/sanitário | [Ficha da lei](${L.lei}) |
| **RDCs / autorização sanitária** | Camada ANVISA distinta do HC individual | [RDC × Autorização](${L.rdc}) · [ANVISA](${L.anvisa}) |

> Confirmar sempre o inteiro teor, a vigência e a **tabela de hipossuficiência do núcleo** que vai atender. O laboratório **não** reproduz ementas oficiais completas nem fixa corte de renda.

## Mapa rápido: o que a Defensoria costuma ver

| Situação | Leitura BudGanja |
|----------|------------------|
| **Abordagem / auto de prisão em flagrante** | Separar porte uso pessoal × indícios de mercancia ([porte × tráfico](${L.porte})) |
| **Pedido de cultivo/óleo medicinal sem dinheiro** | Mesmo checklist do [guia HC](${L.advogados}) — com foco em laudos via SUS/rede pública quando existir |
| **Só quer «descriminalizar»** | Literacia: Tema 506 ≠ HC ≠ [RDC](${L.rdc}) |
| **Já é paciente sem papel** | Encaminhar documentação clínica ([médicos](${L.medicos})) antes de peça vazia |
| **Triagem recusada (renda / documentação)** | Não é «não tem direito» — é filtro institucional; rever núcleo, DPU × DPE, e provas de hipossuficiência |

## Checklist de filtros que sobram (educacional)

Mesmo com assistência gratuita, a literatura de acesso aponta custos:

1. Consulta/laudo (particular se o SUS não cobre cannabis).  
2. Tempo de tramitação e comparecimento.  
3. Deslocamento e perda de diária.  
4. Estigma na família/trabalho ao «assumir» o processo.  
5. Compreensão da diferença paciente × usuário ([guia advogados](${L.advogados})).  
6. Risco de tipificação agravada se o dossiê for frágil.

**Leitura BudGanja:** Defensoria sem elo com saúde pública e associações solidárias **segura o processo**, mas não inventa o laudo.

## Redes de Conexão Obrigatórias

| Camada | Fichas |
|--------|--------|
| **Processual / litígio** | [Guia HC e seletividade](${L.advogados}) · [Lei 11.343](${L.lei}) · [Porte × Tráfico](${L.porte}) · [Descriminalização](${L.descrim}) |
| **Suporte clínico** | [Médicos](${L.medicos}) · [Farmacêuticos](${L.farmaceuticos}) · [Associações](${L.associacoes}) |
| **Sanitário / controlo** | [ANVISA](${L.anvisa}) · [RDC](${L.rdc}) · [Portaria](${L.portaria}) · [Lista F](${L.listaF}) · [Substância controlada](${L.substancia}) |
| **Léxico / política** | [Droga](${L.droga}) · [Entorpecente](${L.entorpecente}) · [Psicotrópico](${L.psicotropico}) · [Ilícito](${L.ilicito}) · [Proibicionismo](${L.proibicao}) |
| **Botânica** | [Maconha](${L.maconha}) · [Cannabis](${L.cannabis}) · [Cannabis sativa](${L.planta}) |
| **Glossário** | [Classificação legal](${L.guia}) · [Cobertura](${L.cobertura}) · [Hub Palavras](${L.hub}) |

## Contrastes e Limites (Não Confundir)

| Não confundir | Com |
|---------------|-----|
| Atendimento da Defensoria (hipossuficiência / vulnerabilidade) | Advocacia dativa geral, OAB particular ou ONG privada |
| Triagem deferida | Fornecimento automático de óleo, semente ou cultivo pelo Estado |
| Pedido de HC / salvo-conduto | Garantia de resultado judicial |
| Assistência gratuita | Ausência de filtros (laudo, tempo, deslocamento, estigma) |
| Descriminalização do porte ([Tema 506](${SRC.stfTema506})) | Direito a produzir óleo ou cultivar |
| Orientação educacional BudGanja | Parecer da Defensoria no caso concreto |

- Não redige HC nem recurso.  
- Não substitui a norma interna da Defensoria estadual/federal.  
- Não promete resultado judicial.  
- Não fixa corte de renda nacional — cada núcleo publica a sua tabela.  
- Remete a doutrina e âncoras actualizadas no [guia advogados](${L.advogados}).

## Conclusão de Ofício

O acesso gratuito à justiça é o calço democrático sobre a estrutura penal desigual. Para que o direito não vire letra morta no papel de quem não compra advogado, o ofício da Defensoria exige rigor técnico e compromisso humanitário — e o laboratório mapeia o **vocabulário** e os **filtros restantes**. Diante da barreira estrutural, [Valeu !!!](${L.mantra})

## Status

**Aprovado — revisão da inspeção-guia Defensoria / acesso gratuito** (scaffolding 2026-08-19). Espelho da seletividade para quem não compra advogado particular.

[▶ Guia HC — advogados](${L.advogados}) · [▶ Porte × Tráfico](${L.porte}) · [▶ Lei 11.343](${L.lei}) · [▶ Médicos](${L.medicos}) · [▶ Associações](${L.associacoes}) · [▶ Classificação legal](${L.guia}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja guide inspection for **patients, public defenders and law students**: institutional map of Brazil’s **Defensoria Pública** (Public Defender’s Office) as the free-access door to justice in medicinal cannabis cultivation — screening criteria, remaining filters when counsel is free, and the limits of the constitutional remedy against State omission. Mirror of the [HC selectivity guide](${L.advogados}).

> **Method note:** independent editorial audit. **Not legal advice, not a pleading, not a substitute for the local Defender’s Office.** Confirm regional means-test tables. Indexing ≠ endorsement.

## Audience and use

| Field | Value |
|-------|-------|
| Audience | Low-income patients, public defenders, legal-aid clinics |
| Inspection type | Access-to-justice guide × health rights |
| Glossary group | [Legal classification](${L.guia}) |
| Guiding question | How can a patient without private fees dispute medicinal status through the State — and what screening does **not** guarantee? |

## Central thesis

The Public Defender’s Office is the main tool against **class selectivity** in cannabis litigation; medical-report costs and institutional overload remain severe filters — removing private legal fees does **not** erase selectivity.

## Working hypotheses

**H1:** the public path removes private counsel fees so vulnerable people can claim patient status.  
**H2:** robust clinical documentation pushes the assisted person back into the SUS queue (or a paid report), delaying *habeas corpus*.  
**H3:** specialised human-rights/health units standardise procedure against police violence — they do not replace the [HC guide](${L.advogados}) or the medical report.  
**H4:** [decriminalization](${L.descrim}) of possession does not deliver grow rights, seeds or oil.

## Public anchors

| Source | Lab note | Locate |
|--------|----------|--------|
| CF/88 art. 134 | Defender’s Office as essential to jurisdiction; free legal aid for those who prove insufficient means | [Federal Constitution](${SRC.cf}) |
| Complementary Law 80/1994 | National organic statute of the Defender’s Office | [LC 80/1994](${SRC.lc80}) |
| DPU intake | Federal door; **local** screening — no single national income cut-off | [DPU](${SRC.dpu}) · [Intake](${SRC.dpuAtendimento}) |
| STJ AgRg HC 783.717/PR (2023) | Medicinal cultivation may receive safe-conduct; administrative omission cannot erase health rights | [HC guide](${L.advogados}) |
| STF Theme 506 (2024) | Personal-use possession: no longer a **criminal** offence — not grow authorization | [Theme 506](${SRC.stfTema506}) |

## Mandatory network

| Layer | Sheets |
|-------|--------|
| Process | [HC guide](${L.advogados}) · [Law 11.343](${L.lei}) · [Possession × Trafficking](${L.porte}) · [Decriminalization](${L.descrim}) |
| Clinical | [Physicians](${L.medicos}) · [Pharmacists](${L.farmaceuticos}) · [Associations](${L.associacoes}) |
| Sanitary | [ANVISA](${L.anvisa}) · [RDC](${L.rdc}) · [List F](${L.listaF}) · [Controlled substance](${L.substancia}) |
| Botany | [Cannabis sativa](${L.planta}) |

## Do not confuse

Defender’s Office intake (vulnerability) ≠ private counsel, court-appointed dative counsel, or NGOs. A granted screening ≠ automatic oil, seed or State-supplied grow. HC petition ≠ guaranteed result. Possession decriminalization ≠ right to produce oil.

## Status

**Approved — Defensoria / free-access guide revision (2026-08-19).**
`;

  const contentEs = `## Alcance

Inspección-guía del laboratorio BudGanja para **pacientes, defensores y estudiantes de derecho**: mapa institucional del rol de la **Defensoria Pública** como puerta de **acceso gratuito a la justicia** en el cultivo medicinal de cannabis en Brasil — criterios de triaje, filtros que quedan sin honorarios, y los límites del remedio constitucional frente a la omisión del Estado. Espejo de la [guía HC](${L.advogados}).

> **Nota metodológica:** auditoría editorial independiente. **No es asesoría jurídica, no es escrito procesal, no sustituye a la Defensoría local.** Confirmar las tablas locales de hiposuficiencia. Indexar ≠ respaldar.

## Público y uso

| Campo | Valor |
|-------|-------|
| Público | Pacientes de baja renta, defensores públicos, núcleos de práctica jurídica |
| Tipo | Guía de acceso a la justicia × derecho a la salud |
| Grupo | [Clasificación legal](${L.guia}) |
| Pregunta-guía | ¿Cómo disputa el paciente sin recursos el estatuto medicinal a través del Estado — y qué **no** garantiza el triaje? |

## Tesis central

La Defensoría Pública es el principal instrumento contra la **selectividad de clase** en el litigio cannábico; el coste de informes médicos y la sobrecarga del órgano siguen siendo filtros severos — quitar los honorarios **no borra** la selectividad.

## Hipótesis de trabajo

**H1:** la vía pública elimina los honorarios particulares y permite disputar el estatuto de paciente.  
**H2:** la documentación clínica robusta empuja al asistido a la fila del SUS (o a un informe de pago) y retrasa el *habeas corpus*.  
**H3:** los núcleos de derechos humanos y salud estandarizan el proceso frente a la violencia policial — no sustituyen la [guía HC](${L.advogados}) ni el informe.  
**H4:** la [descriminalización](${L.descrim}) del porte no entrega cultivo, semilla ni aceite.

## Anclas públicas

| Fuente | Recorte | Localizar |
|--------|---------|-----------|
| CF/88 art. 134 | Institución esencial a la jurisdicción; asistencia jurídica gratuita a quien pruebe insuficiencia de recursos | [Constitución](${SRC.cf}) |
| LC 80/1994 | Ley orgánica nacional de la Defensoría | [LC 80/1994](${SRC.lc80}) |
| DPU | Puerta federal; triaje **local** — no hay corte nacional único de renta | [DPU](${SRC.dpu}) · [Atención](${SRC.dpuAtendimento}) |
| STJ AgRg HC 783.717/PR (2023) | Cultivo medicinal puede recibir salvoconducto | [Guía HC](${L.advogados}) |
| STF Tema 506 (2024) | Porte de uso personal: atipicidad **penal** — no es autorización de cultivo | [Tema 506](${SRC.stfTema506}) |

## Red obligatoria

| Capa | Fichas |
|------|--------|
| Proceso | [Guía HC](${L.advogados}) · [Ley 11.343](${L.lei}) · [Porte × Tráfico](${L.porte}) · [Descriminalización](${L.descrim}) |
| Clínica | [Médicos](${L.medicos}) · [Farmacéuticos](${L.farmaceuticos}) · [Asociaciones](${L.associacoes}) |
| Sanitaria | [ANVISA](${L.anvisa}) · [RDC](${L.rdc}) · [Lista F](${L.listaF}) · [Sustancia controlada](${L.substancia}) |
| Botánica | [Cannabis sativa](${L.planta}) |

## No confundir

Atención de la Defensoría (vulnerabilidad) ≠ abogacía particular, dativa general u ONG. Triaje concedido ≠ aceite, semilla o cultivo suministrado por el Estado. Petición de HC ≠ resultado garantizado. Descriminalización del porte ≠ derecho a producir aceite.

## Estado

**Aprobado — revisión de la ficha-guía Defensoría / acceso gratuito (2026-08-19).**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaDefensoriaAcessoPost() {
  const { body, contentEn, contentEs } = buildGuiaDefensoriaAcessoBodies();
  return palavraPost({
    title: 'Inspeção: Defensoria Pública — acesso gratuito à justiça e Valeu !!!',
    titleEn: 'Inspection: Defensoria Pública — free access to justice and Valeu !!!',
    titleEs: 'Inspección: Defensoria Pública — acceso gratuito a la justicia y Valeu !!!',
    excerpt:
      'Guia de acesso: Defensoria Pública e a assistência jurídica gratuita no cultivo medicinal; critérios de hipossuficiência, laudos, HC e os filtros que restam sem honorários. Não é parecer.',
    excerptEn:
      'Access guide: Defensoria Pública and free legal aid for medicinal cultivation; means-test, medical reports, HC and remaining filters without private fees. Not legal advice.',
    excerptEs:
      'Guía de acceso: Defensoria Pública y la asistencia jurídica gratuita en el cultivo medicinal; hiposuficiencia, informes, HC y filtros que quedan sin honorarios. No es asesoría.',
    slug: 'inspecao-guia-defensoria-acesso',
    date: '2026-08-19T03:00:00.000Z',
    seriesOrder: 37,
    seriesLabel: 'Guia · Defensoria · acesso gratuito',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

const GUIA_DEFENSORIA_ACESSO_GUIA_ITEMS = [
  {
    id: 'defensoria-publica',
    word: 'Defensoria Pública',
    simple:
      'Assistência jurídica gratuita do Estado — porta pública do HC/defesa; não apaga filtros de laudo, tempo, triagem local e tipificação (porte×tráfico).',
    simpleEn:
      'State free legal aid — public door to HC/defense; does not erase report, time, local screening and charging filters.',
    simpleEs:
      'Asistencia jurídica gratuita del Estado — puerta pública al HC/defensa; no borra filtros de informe, tiempo, triaje local y tipificación.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-defensoria-acesso.html'
  },
  {
    id: 'acesso-gratuito-justica',
    word: 'Acesso gratuito à justiça',
    simple:
      'Caminho sem honorários particulares — necessário, mas insuficiente sozinho contra a seletividade do estatuto paciente (laudo, tempo, sobrecarga da Defensoria).',
    simpleEn:
      'Path without private fees — necessary but not enough alone against patient-status selectivity (reports, time, Defender overload).',
    simpleEs:
      'Camino sin honorarios particulares — necesario pero insuficiente solo frente a la selectividad del estatuto paciente (informe, tiempo, sobrecarga).',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-defensoria-acesso.html'
  }
];

module.exports = {
  buildGuiaDefensoriaAcessoPost,
  buildGuiaDefensoriaAcessoBodies,
  GUIA_DEFENSORIA_ACESSO_GUIA_ITEMS
};
