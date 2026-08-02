'use strict';

/**
 * Inspeção-guia: cannabis medicinal e acesso — mapa para médicos.
 * Elo: Classificação legal · ANVISA · CEBRID · UNIFESP · guia HC (advogados).
 * Não é protocolo clínico nem parecer.
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
  opioide: '/posts/post-inspecao-palavra-opioide-opiaceo.html',
  depressor: '/posts/post-inspecao-palavra-depressor.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cebrid: '/posts/post-inspecao-cebrid.html',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  xiv: '/biblioteca/unifesp/livro-xiv.html',
  eliana: '/posts/post-inspecao-eliana-rodrigues.html',
  carlini: '/posts/post-inspecao-elisaldo-carlini.html',
  sidarta: '/posts/post-inspecao-sidarta-ribeiro.html',
  hcAdvogados: '/posts/post-inspecao-guia-hc-seletividade-advogados.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  cbd: '/guia/palavras.html?q=CBD',
  thc: '/guia/palavras.html?q=THC',
  psicoativo: '/guia/palavras.html?q=Psicoativo'
};

function buildGuiaCannabisMedicosBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **médicos e profissionais de saúde**: mapa semântico e de **acesso terapêutico** à cannabis no Brasil — prescrição, produto regulado, importação, papel do laudo no HC, e a seletividade de quem consegue ser **paciente** de facto.

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é protocolo clínico, não é bula, não substitui CFM/CRM, ANVISA nem literatura peer-reviewed.** Indexar ≠ endossar. Indicações, doses e vias mudam — confirmar normas e evidência actuais. Objecto = **literacia do projecto** + **elos com a classificação legal**.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Médicos, residentes, farmacêuticos clínicos, estudantes da área da saúde |
| Tipo BudGanja | Inspeção-guia — clínica × acesso × classificação |
| Par jurídico | [Guia HC e seletividade — advogados](${L.hcAdvogados}) |
| Grupo Guia | [Classificação legal](${L.guia}) |
| Pergunta-guia | Como o acto médico (receita/laudo) abre ou fecha o caminho entre saúde regulada e risco penal do paciente? |
| Data | ${inspected} |

## Tese central (uma frase)

O médico não «legaliza a planta»; **documenta necessidade terapêutica**. Sem esse documento + caminho (produto ANVISA, importação ou HC com advogado), o mesmo paciente pode permanecer na zona de [ilícito](${L.ilicito}) / abordagem — seletividade que começa no consultório quando só quem paga chega à receita e ao dossiê.

## Hipóteses

**H1:** a dicotomia **paciente medicinal** × **usuário** começa na capacidade de obter **avaliação e receituário** — não só no tribunal.  
**H2:** produto importado/regulado e óleo artesanal via HC são **vias distintas**; confundir as duas gera risco clínico e jurídico para o paciente.  
**H3:** classes de efeito ([psicoativo](${L.psicoativo}), [depressor](${L.depressor}), [psicotrópico](${L.psicotropico})) ≠ rótulos de lista ([entorpecente](${L.entorpecente}), [Lista F](${L.listaF})).  
**H4:** formação UNIFESP/CEBRID exige literacia: nome popular ≠ científico ≠ categoria de controlo ([maconha](${L.maconha}) / [cannabis](${L.cannabis}) / [entorpecente](${L.entorpecente})).

## Mapa rápido: vias de acesso (visão clínica)

| Via | O que o médico costuma documentar | Limite BudGanja |
|-----|-----------------------------------|-----------------|
| **Produto cannabis regulado (ANVISA)** | Indicação, receita conforme regras vigentes, acompanhamento | Custo alto; acesso desigual |
| **Importação autorizada** | Prescrição + pedido sanitário do paciente | Não é autocultivo |
| **Autocultivo / óleo artesanal com HC** | Laudo e receita que sustentam o pedido judicial (via advogado) | O médico **não** emite o HC; alimenta o dossiê |
| **Sem documentação** | — | Paciente fica na zona de risco penal/social descrita no [guia para advogados](${L.hcAdvogados}) |

## Papel do médico no circuito HC (sem exercer advocacia)

1. Avaliar indicação e alternativas com método clínico.  
2. Emitir **receituário / laudo** claros (diagnóstico, justificativa terapêutica, produto pretendido quando couber).  
3. Orientar que **cultivo caseiro** sem amparo processual/sanitário não é «liberado pelo médico».  
4. Encaminhar o paciente a **orientação jurídica** quando a via for judicial — ver [guia HC](${L.hcAdvogados}).  
5. Registar acompanhamento e eventos adversos — literacia de segurança, não panfleto.

## Checklist documental (educacional — o que a literatura de acesso descreve)

Não é formulário oficial. Inventário do que costuma aparecer no caminho paciente → produto ou HC:

1. Identificação e história clínica relevante.  
2. Diagnóstico / hipótese e falhas ou limites de tratamentos prévios (quando aplicável).  
3. **Receita** compatível com a via escolhida (produto nacional regulado vs importação).  
4. **Laudo** descritivo se o paciente for judicializar cultivo/extração.  
5. Plano de acompanhamento (dose, via, interações — responsabilidade clínica do prescritor).  
6. Informação ao paciente: custo, ilegalidade residual do cultivo sem HC, diferença THC/CBD ([THC](${L.thc}) · [CBD](${L.cbd})).

**Leitura BudGanja:** cada exigência que custa consulta particular ou deslocamento **reproduz** a seletividade — o pobre atrasa ou nunca chega a ser «paciente» no papel.

## Literacia farmacológica mínima (rede do projecto)

| Termo | Ficha / Guia | Nota para o clínico |
|-------|--------------|---------------------|
| Cannabis sativa | [Planta](${L.planta}) · [Palavra](${L.cannabis}) | Espécie ≠ produto industrial |
| CBD / THC | [CBD](${L.cbd}) · [THC](${L.thc}) | Fitocanabinoides — não sinónimos de «droga» senso comum |
| Psicoativo / Psicotrópico | [Psicoativo](${L.psicoativo}) · [Psicotrópico](${L.psicotropico}) | Efeito ≠ lista policial |
| Entorpecente / Narcótico | [Par](${L.entorpecente}) | Rótulos de controlo / tradição clínica antiga |
| Opioide | [Opioide × opiáceo](${L.opioide}) | Não confundir com cannabis |
| ANVISA / Portaria | [ANVISA](${L.anvisa}) · [Portaria](${L.portaria}) | Marco sanitário — verificar vigência |

## Seletividade clínica (espelho do guia jurídico)

| Quem | O que costuma conseguir | Risco |
|------|-------------------------|-------|
| Paciente com rede + dinheiro | Consulta, produto importado, ou dossiê para HC | Ainda há custo e burocracia |
| Paciente sem rede | Atraso, abandono, automedicação informal, exposição policial | [Ilícito](${L.ilicito}) / estigma ([maconha](${L.maconha})) |
| Médico sem literacia de classificação | Prescreve «maconha» no senso comum ou evita por medo | Paciente sem caminho claro |

Ver análise processual irmã: [Guia HC e seletividade — advogados](${L.hcAdvogados}).

## Rede BudGanja (obrigatória)

| Camada | Fichas |
|--------|--------|
| Guia irmão (Direito) | [HC × seletividade — advogados](${L.hcAdvogados}) |
| Classificação | [Entorpecente × Narcótico](${L.entorpecente}) · [Psicotrópico](${L.psicotropico}) · [Lista F](${L.listaF}) · [Substância controlada](${L.substancia}) |
| Sanitário | [ANVISA](${L.anvisa}) · [Portaria](${L.portaria}) |
| Política / estigma | [Proibicionismo](${L.proibicao}) · [Droga](${L.droga}) · [Maconha](${L.maconha}) |
| Formação | [Curso UNIFESP](${L.curso}) · [CEBRID](${L.cebrid}) · [Carlini](${L.carlini}) · [Eliana Rodrigues](${L.eliana}) · [Rascunhos XIV](${L.xiv}) · [Sidarta](${L.sidarta}) |
| Glossário | [Classificação legal](${L.guia}) · [Cobertura](${L.cobertura}) |

## Contrastes que o médico deve manter vivos

| Não confundir | Com |
|---------------|-----|
| Receita / laudo | Autorização de cultivo (HC / ANVISA PJ) |
| CBD isolado | Planta inteira / full spectrum |
| Cannabis medicinal (discurso clínico) | [Maconha](${L.maconha}) como insulto policial |
| Psicotrópico (classe) | Entorpecente (lista) |
| Orientação de risco legal | Parecer jurídico (encaminhar ao advogado) |

## Limites desta ficha

- Não indica doses, CID obrigatórios nem vias.  
- Não lista produtos comerciais.  
- Não substitui normas do CFM, conselhos regionais ou bulário ANVISA.  
- Não ensina a redigir HC — isso está no [guia para advogados](${L.hcAdvogados}).

## Como o laboratório sugere ler o caso clínico-social

1. Separar **necessidade clínica** de **estatuto legal** do paciente.  
2. Escolher a via (produto regulado / importação / judicial) com literacia — não com medo genérico.  
3. Documentar com clareza: o papel médico é o que o Judiciário e a ANVISA leem.  
4. Nomear a seletividade: quem não chega à consulta já perdeu a primeira porta.  
5. Actualizar normas antes de qualquer conduta profissional real.

## Status

**Aprovado — primeira inspeção-guia para médicos.** Cannabis medicinal e acesso documentados como camada **clínica × seletividade**, irmã do [guia para advogados](${L.hcAdvogados}).

[▶ Guia HC — advogados](${L.hcAdvogados}) · [▶ Classificação legal](${L.guia}) · [▶ ANVISA](${L.anvisa}) · [▶ Curso UNIFESP](${L.curso}) · [▶ CEBRID](${L.cebrid}) · [▶ Cannabis sativa](${L.planta}) · [▶ Hub Palavras](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide inspection for physicians**: semantic and access map for medicinal cannabis in Brazil — prescription, regulated products, import, the role of medical reports in HC, and selectivity in who becomes a **patient** on paper.

> **Not a clinical protocol.** Not a substitute for medical boards or ANVISA. Indexing ≠ endorsement.

## Core thesis

Doctors do not “legalize the plant”; they **document therapeutic need**. Without that document plus a path (regulated product, import, or HC with a lawyer), the patient may stay in the illicit/police zone — selectivity that starts in the clinic.

## Sibling guide

Process map for lawyers: [HC & selectivity — lawyers](${L.hcAdvogados}).

## Status

**Approved — first physician-facing guide sheet.**
`;

  const contentEs = `## Alcance

Inspección-guía BudGanja para **médicos**: mapa semántico y de acceso a cannabis medicinal en Brasil — prescripción, producto regulado, importación, papel del informe médico en el HC y selectividad de quién llega a ser **paciente** en el papel.

> **No es protocolo clínico.** No sustituye consejos médicos ni ANVISA. Indexar ≠ respaldar.

## Tesis central

El médico no «legaliza la planta»; **documenta necesidad terapéutica**. Sin ese documento + camino (producto, importación o HC con abogado), el paciente puede quedar en zona de ilícito — selectividad que empieza en la consulta.

## Guía hermana

Mapa procesal para abogados: [HC y selectividad — abogados](${L.hcAdvogados}).

## Estado

**Aprobado — primera ficha-guía para médicos.**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaCannabisMedicosPost() {
  const { body, contentEn, contentEs } = buildGuiaCannabisMedicosBodies();
  return palavraPost({
    title: 'Inspeção: Guia cannabis medicinal — mapa para médicos (acesso × seletividade)',
    titleEn: 'Inspection: Medicinal cannabis guide — map for physicians (access × selectivity)',
    titleEs: 'Inspección: Guía cannabis medicinal — mapa para médicos (acceso × selectividad)',
    excerpt:
      'Guia para médicos: receita, laudo, produto ANVISA/importação e papel no HC — seletividade de quem vira paciente de facto. Elo com o guia para advogados. Não é protocolo clínico.',
    excerptEn:
      'Guide for physicians: prescription, report, ANVISA product/import and role in HC — selectivity in who becomes a patient on paper. Link to the lawyers’ guide. Not a clinical protocol.',
    excerptEs:
      'Guía para médicos: receta, informe, producto ANVISA/importación y papel en el HC — selectividad de quién llega a ser paciente. Vínculo con la guía para abogados. No es protocolo clínico.',
    slug: 'inspecao-guia-cannabis-medicos',
    date: '2026-08-02T09:30:00.000Z',
    seriesOrder: 34,
    seriesLabel: 'Guia · cannabis medicinal · médicos',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

const GUIA_CANNABIS_MEDICOS_GUIA_ITEMS = [
  {
    id: 'cannabis-medicinal',
    word: 'Cannabis medicinal',
    simple:
      'Uso terapêutico documentado da cannabis / canabinoides — discurso clínico distinto do nome popular «maconha» e do rótulo policial entorpecente.',
    simpleEn:
      'Documented therapeutic use of cannabis / cannabinoids — clinical discourse distinct from folk “maconha” and police-list entorpecente.',
    simpleEs:
      'Uso terapéutico documentado de cannabis / cannabinoides — discurso clínico distinto del nombre popular «maconha» y del rótulo policial entorpecente.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-medicos.html'
  },
  {
    id: 'importacao-anvisa',
    word: 'Importação ANVISA',
    simple:
      'Via sanitária para produtos de cannabis autorizados — cara e burocrática; não equivale a autocultivo nem a HC.',
    simpleEn:
      'Sanitary route for authorized cannabis products — costly and bureaucratic; not the same as home grow or HC.',
    simpleEs:
      'Vía sanitaria para productos de cannabis autorizados — cara y burocrática; no equivale a autocultivo ni a HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-medicos.html'
  },
  {
    id: 'laudo-medico',
    word: 'Laudo médico',
    simple:
      'Documento clínico que sustenta indicação terapêutica — peça-chave do dossiê quando o paciente judicializa cultivo/HC.',
    simpleEn:
      'Clinical document supporting therapeutic indication — key piece of the file when the patient litigates cultivation/HC.',
    simpleEs:
      'Documento clínico que sustenta indicación terapéutica — pieza clave del expediente cuando el paciente judicializa cultivo/HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-medicos.html'
  },
  {
    id: 'receituario',
    word: 'Receituário',
    simple:
      'Acto médico de prescrição — abre vias de produto regulado/importação; não autoriza sozinho o cultivo caseiro.',
    simpleEn:
      'Medical prescribing act — opens regulated product/import paths; alone does not authorize home cultivation.',
    simpleEs:
      'Acto médico de prescripción — abre vías de producto regulado/importación; solo no autoriza el cultivo casero.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-medicos.html'
  }
];

module.exports = {
  buildGuiaCannabisMedicosPost,
  buildGuiaCannabisMedicosBodies,
  GUIA_CANNABIS_MEDICOS_GUIA_ITEMS
};
