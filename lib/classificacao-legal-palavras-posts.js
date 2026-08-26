'use strict';

/**
 * Inspeções Palavras — Classificação legal (extensão após entorpecente × narcótico).
 * Grupo Guia: classificacao. Elo: Droga · rede canábica · XIV · CEBRID.
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
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  marijuana: '/posts/post-inspecao-palavra-marijuana.html',
  erva: '/posts/post-inspecao-palavra-erva.html',
  diamba: '/posts/post-inspecao-palavra-diamba.html',
  ganja: '/posts/post-inspecao-palavra-ganja.html',
  canhamo: '/posts/post-inspecao-palavra-canhamo.html',
  planta: '/plantas/cannabis-sativa/',
  xiv: '/biblioteca/unifesp/livro-xiv.html',
  cebrid: '/posts/post-inspecao-cebrid.html',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  psicoativo: '/guia/palavras.html?q=Psicoativo',
  psicodelico: '/guia/palavras.html?q=Psicod%C3%A9lico',
  unifesp: '/biblioteca/unifesp/'
};

function note() {
  return `> **Nota metodológica:** auditoria independente BudGanja. **Não é parecer jurídico nem aconselhamento clínico.** Indexar ≠ endossar. Listas e portarias mudam — confirmar sempre nas fontes do Estado. O objecto é a **palavra e a rede semântica no projecto**.`;
}

function noteEn() {
  return `> **Method note:** independent BudGanja audit. **Not legal advice.** Indexing ≠ endorsement. Official lists change — verify state sources.`;
}

function noteEs() {
  return `> **Nota metodológica:** auditoría independiente BudGanja. **No es asesoría jurídica.** Indexar ≠ respaldar.`;
}

function redeTable() {
  return `| Recurso | Papel |
|---------|-------|
| [Entorpecente × Narcótico](${L.entorpecente}) | Par fundador do grupo Classificação legal |
| [Droga](${L.droga}) | Duplo sentido remédio ↔ ilícito no senso comum |
| [Maconha](${L.maconha}) · [Cannabis](${L.cannabis}) · [Ganja](${L.ganja}) · [Erva](${L.erva}) · [Diamba](${L.diamba}) · [Marijuana](${L.marijuana}) | Rede de nomes populares / científicos |
| [Cânhamo](${L.canhamo}) | Fibra industrial — confusão moral com «droga» |
| [Cannabis sativa](${L.planta}) | Ficha de planta |
| [Psicoativo](${L.psicoativo}) · [Psicodélico](${L.psicodelico}) | Classes de efeito (Guia · técnico) |
| [CEBRID](${L.cebrid}) · [Curso UNIFESP](${L.curso}) · [Rascunhos XIV](${L.xiv}) | Formação e informação psicotrópica |
| [Guia · Classificação legal](${L.guia}) | Porta do grupo |
| [Cobertura do Guia](${L.cobertura}) | Auditoria do glossário |`;
}

function shortEn(word, reading) {
  return `## Scope

Editorial inspection of **${word}** in the BudGanja **legal classification** layer — kept distinct from folk names and from everyday [droga](${L.droga}). Glossary: [Legal classification](${L.guia}).

${noteEn()}

## Working sense

${reading}

## Project network

Cross [Entorpecente × Narcótico](${L.entorpecente}), [Droga](${L.droga}), the cannabis name network, [Cannabis sativa](${L.planta}), [XIV drafts](${L.xiv}) and [CEBRID](${L.cebrid}).

## Status

**Approved — first sheet.**`;
}

function shortEs(word, reading) {
  return `## Alcance

Inspección editorial de **${word}** en la capa de **clasificación legal** BudGanja — separada de los nombres populares y de [droga](${L.droga}) en el habla común. Glosario: [Clasificación legal](${L.guia}).

${noteEs()}

## Sentido de trabajo

${reading}

## Red del proyecto

Cruzar [Entorpecente × Narcótico](${L.entorpecente}), [Droga](${L.droga}), la red de nombres canábicos, [Cannabis sativa](${L.planta}), [XIV](${L.xiv}) y [CEBRID](${L.cebrid}).

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
| Tipo BudGanja | Palavra — classificação legal |
| Grupo no Guia | [Classificação legal](${L.guia}) |
| Elo âncora | [Entorpecente × Narcótico](${L.entorpecente}) · [Droga](${L.droga}) |
| Elo planta | [Cannabis sativa](${L.planta}) |
| Elo formação | [Rascunhos XIV](${L.xiv}) · [CEBRID](${L.cebrid}) · [Curso UNIFESP](${L.curso}) |
| Data da inspeção | ${cfg.inspected} |

## Hipóteses e método

${cfg.hypotheses}

Passos:

1. Fixar o sentido de trabalho no laboratório.  
2. Separar de [droga](${L.droga}) no senso comum e dos nomes populares.  
3. Cruzar com [entorpecente × narcótico](${L.entorpecente}) e a rede canábica.  
4. Ligar ao Guia (grupo classificação) e à formação XIV / CEBRID.  
5. Limites + status.

## Sentido de trabalho

${cfg.senseTable}

## Por que inspeccionar

${cfg.why}

## Rede no laboratório

${redeTable()}

## Contrastes úteis

${cfg.contrasts}

## Limites

${cfg.limits}

## Status

**Aprovado — primeira ficha.** ${cfg.statusLine}

[▶ Classificação legal](${L.guia}) · [▶ Entorpecente × Narcótico](${L.entorpecente}) · [▶ Droga](${L.droga}) · [▶ Hub Palavras](${L.hub})
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

function buildPsicotropicoPost() {
  return buildSheet({
    word: 'psicotrópico',
    wordsLabel: 'psicotrópico',
    inspected: '2026-08-02',
    date: '2026-08-02T07:00:00.000Z',
    seriesOrder: 21,
    seriesLabel: 'Psicotrópico · classificação',
    title: 'Inspeção: Psicotrópico — classe clínica e controlo no laboratório',
    titleEn: 'Inspection: Psicotrópico — clinical and control class in the lab',
    titleEs: 'Inspección: Psicotrópico — clase clínica y de control en el laboratorio',
    excerpt:
      'Palavra: psicotrópico — rótulo clínico/de controlo sobre substâncias que actuam no sistema nervoso; distinto de entorpecente, narcótico e droga no senso comum.',
    excerptEn:
      'Word: psicotrópico — clinical/control label for substances acting on the nervous system; distinct from entorpecente, narcotic and everyday “drug”.',
    excerptEs:
      'Palabra: psicotrópico — rótulo clínico/de control sobre sustancias que actúan en el sistema nervioso; distinto de entorpecente, narcótico y droga en el habla común.',
    slug: 'inspecao-palavra-psicotropico',
    scope:
      'Inspeção editorial de **psicotrópico** — rótulo **clínico e de informação** (CEBRID, formação UNIFESP) que o laboratório coloca ao lado de [entorpecente × narcótico](' +
      L.entorpecente +
      ') e separado de [droga](' +
      L.droga +
      ') no senso comum. Grupo: [Classificação legal](' +
      L.guia +
      ').',
    hypotheses: `**H1:** «psicotrópico» nomeia substâncias que **alteram o sistema nervoso central** — língua da clínica e dos centros de informação.  
**H2:** não é sinónimo exacto de [entorpecente](${L.entorpecente}) (lista policial) nem de [psicoativo](${L.psicoativo}) (efeito na mente/humor).  
**H3:** misturar psicotrópico com [maconha](${L.maconha}) no senso comum apaga a literacia: nome popular ≠ classe clínica ≠ categoria de lista.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Actua no **sistema nervoso** (efeito psíquico / neurológico) |
| Uso dominante | **Clínico e institucional** — informação, ensino, farmacologia |
| Distinção | ≠ entorpecente (lista) · ≠ narcótico (rótulo antigo) · ≠ droga (senso comum) |
| Elo | [CEBRID](${L.cebrid}) · [Psicoativo](${L.psicoativo}) · [XIV](${L.xiv}) |`,
    why: `A formação BudGanja ([curso UNIFESP](${L.curso}), [CEBRID](${L.cebrid})) fala em **drogas psicotrópicas**. Sem ficha própria, o projecto colapsaria psicotrópico em «droga» ou em «entorpecente».`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Psicotrópico (classe clínica) | Entorpecente (lista / polícia) |
| Psicotrópico | [Psicoativo](${L.psicoativo}) (efeito — Guia técnico) |
| Psicotrópico | [Droga](${L.droga}) no senso comum = ilícito |
| Psicotrópico | Nome popular ([maconha](${L.maconha}), [ganja](${L.ganja})) |`,
    limits: `- Não reproduz anexos de portarias.  
- Não decide inclusão em listas.  
- Não substitui [entorpecente × narcótico](${L.entorpecente}) nem [psicoativo](${L.psicoativo}) no Guia.`,
    statusLine:
      'Psicotrópico documentado como classe clínica/de informação, cruzado com a rede de classificação e a formação XIV/CEBRID.',
    readingEn:
      'Clinical/institutional label for substances acting on the nervous system — not a synonym of control-list «entorpecente» or everyday «drug».',
    readingEs:
      'Rótulo clínico/institucional para sustancias que actúan en el sistema nervioso — no es sinónimo de «entorpecente» de lista ni de «droga» en el habla común.'
  });
}

function buildListaFPost() {
  return buildSheet({
    word: 'Lista F',
    wordsLabel: 'Lista F',
    inspected: '2026-08-02',
    date: '2026-08-02T07:10:00.000Z',
    seriesOrder: 22,
    seriesLabel: 'Lista F · classificação',
    title: 'Inspeção: Lista F — âncora brasileira das listas de controlo',
    titleEn: 'Inspection: Lista F — Brazilian control-list anchor',
    titleEs: 'Inspección: Lista F — ancla brasileña de las listas de control',
    excerpt:
      'Palavra: Lista F — âncora brasileira das listas de substâncias controladas; o laboratório indexa o tipo de linguagem, não o anexo integral da portaria.',
    excerptEn:
      'Word: Lista F — Brazilian anchor for controlled-substance lists; the lab indexes the language type, not the full ordinance annex.',
    excerptEs:
      'Palabra: Lista F — ancla brasileña de las listas de sustancias controladas; el laboratorio indexa el tipo de lenguaje, no el anexo íntegro.',
    slug: 'inspecao-palavra-lista-f',
    scope:
      'Inspeção editorial de **Lista F** — expressão que no Brasil aponta para **listas oficiais de substâncias controladas**. O laboratório trata-a como **palavra-âncora** do grupo [Classificação legal](' +
      L.guia +
      '), sem reproduzir anexos. Sugestão explícita da ficha [entorpecente × narcótico](' +
      L.entorpecente +
      ').',
    hypotheses: `**H1:** «Lista F» funciona no discurso público como **metonímia** das listas de controlo — mesmo quando o interlocutor não leu o anexo.  
**H2:** indexar a expressão ajuda a separar **nome da planta** ([Cannabis sativa](${L.planta})) de **posição numa lista do Estado**.  
**H3:** o projecto não substitui a Portaria: aponta o **tipo de linguagem**.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Referência a **listas oficiais** de substâncias controladas no Brasil |
| Uso dominante | Discurso **regulatório / jornalístico / policial** |
| Risco | Citar «está na Lista F» como insulto sem método |
| Elo | [Entorpecente](${L.entorpecente}) · [Portaria](/posts/post-inspecao-palavra-portaria.html) · [ANVISA](/posts/post-inspecao-palavra-anvisa.html) |`,
    why: `Sem «Lista F», o grupo Classificação legal fica abstracto. Com ela, o visitante vê **onde** o Estado materializa o rótulo entorpecente — sem o laboratório fingir ser Diário Oficial.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Lista F (âncora de lista) | [Droga](${L.droga}) no senso comum |
| Lista F | Nome popular ([maconha](${L.maconha})) |
| Lista F | Conteúdo integral da Portaria (fora do escopo) |
| Lista F | [Cânhamo](${L.canhamo}) industrial |`,
    limits: `- **Não** reproduz anexos nem códigos de substâncias.  
- Listas mudam — sempre verificar fonte oficial.  
- Não é aconselhamento jurídico.`,
    statusLine: 'Lista F documentada como âncora semântica das listas de controlo no projecto.',
    readingEn: 'Brazilian discourse anchor for official controlled-substance lists — not a reprint of the ordinance annex.',
    readingEs: 'Ancla del discurso brasileño para listas oficiales de sustancias controladas — no es reimpresión del anexo.'
  });
}

function buildEstupefacientePost() {
  return buildSheet({
    word: 'estupefaciente',
    wordsLabel: 'estupefaciente',
    inspected: '2026-08-02',
    date: '2026-08-02T07:20:00.000Z',
    seriesOrder: 23,
    seriesLabel: 'Estupefaciente · classificação',
    title: 'Inspeção: Estupefaciente — rótulo internacional vizinho de narcótico',
    titleEn: 'Inspection: Estupefaciente — international label next to narcotic',
    titleEs: 'Inspección: Estupefaciente — rótulo internacional vecino de narcótico',
    excerpt:
      'Palavra: estupefaciente — rótulo internacional/ONU vizinho de narcótico; o laboratório separa-o de entorpecente nas listas brasileiras modernas.',
    excerptEn:
      'Word: estupefaciente — international/UN label next to narcotic; the lab keeps it distinct from modern Brazilian «entorpecente» lists.',
    excerptEs:
      'Palabra: estupefaciente — rótulo internacional/ONU vecino de narcótico; el laboratorio lo separa de «entorpecente» en listas brasileñas modernas.',
    slug: 'inspecao-palavra-estupefaciente',
    scope:
      'Inspeção de **estupefaciente** — rótulo **internacional** (tratados, tradução de *narcotic drugs*) que o laboratório coloca ao lado de [narcótico](' +
      L.entorpecente +
      ') e distingue de **entorpecente** no uso brasileiro moderno.',
    hypotheses: `**H1:** «estupefaciente» chega ao português sobretudo pela **via internacional** (tratados, ONU).  
**H2:** é vizinho semântico de **narcótico**, não sinónimo automático de **entorpecente** nas listas nacionais.  
**H3:** indexar evita confundir língua de tratado com língua de portaria local.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Substância que «estupefaz» — tradição de controlo internacional |
| Uso dominante | Textos, traduções, discurso jurídico comparado |
| Distinção | ≠ entorpecente (lista BR) · próximo de narcótico (rótulo amplo) |
| Elo | [Entorpecente × Narcótico](${L.entorpecente}) |`,
    why: `Quem lê fontes internacionais encontra *narcotic* / estupefaciente. Sem ficha, o visitante traduz tudo por «droga».`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Estupefaciente (internacional) | Entorpecente (lista BR) |
| Estupefaciente | [Droga](${L.droga}) senso comum |
| Estupefaciente | Nome da planta ([cannabis](${L.cannabis})) |`,
    limits: `- Não traduz tratados artigo a artigo.  
- Não decide classificação nacional.`,
    statusLine: 'Estupefaciente documentado como rótulo internacional na rede de classificação.',
    readingEn: 'International/treaty-adjacent label, close to «narcotic», not an automatic synonym of Brazilian «entorpecente».',
    readingEs: 'Rótulo internacional/de tratados, cercano a «narcótico», no sinónimo automático de «entorpecente» brasileño.'
  });
}

function buildSubstanciaControladaPost() {
  return buildSheet({
    word: 'substância controlada',
    wordsLabel: 'substância controlada',
    inspected: '2026-08-02',
    date: '2026-08-02T07:30:00.000Z',
    seriesOrder: 24,
    seriesLabel: 'Substância controlada · classificação',
    title: 'Inspeção: Substância controlada — meta-rótulo das listas',
    titleEn: 'Inspection: Substância controlada — meta-label of the lists',
    titleEs: 'Inspección: Substancia controlada — meta-rótulo de las listas',
    excerpt:
      'Palavra: substância controlada — meta-rótulo do que as listas fazem; distinto de droga no senso comum e dos nomes populares da cannabis.',
    excerptEn:
      'Word: substância controlada — meta-label for what control lists do; distinct from everyday “drug” and cannabis folk names.',
    excerptEs:
      'Palabra: sustancia controlada — meta-rótulo de lo que hacen las listas; distinto de droga en el habla común y de los nombres populares.',
    slug: 'inspecao-palavra-substancia-controlada',
    scope:
      'Inspeção de **substância controlada** — **meta-rótulo** que descreve o acto de controlo estatal (listas, receituário, fiscalização), sem ser sinónimo de [droga](' +
      L.droga +
      ') no senso comum.',
    hypotheses: `**H1:** a expressão nomeia o **estatuto regulatório**, não a identidade botânica.  
**H2:** útil para falar de cannabis medicinal / pesquisa sem colapsar em insulto.  
**H3:** liga [Lista F](/posts/post-inspecao-palavra-lista-f.html), [ANVISA](/posts/post-inspecao-palavra-anvisa.html) e [entorpecente](${L.entorpecente}).`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Substância sob **regime especial** de controlo |
| Uso dominante | Regulação, farmácia, pesquisa clínica |
| Distinção | ≠ ilícito automático · ≠ nome popular |
| Elo | [Lista F](/posts/post-inspecao-palavra-lista-f.html) · [Ilícito](/posts/post-inspecao-palavra-ilicito.html) |`,
    why: `O laboratório precisa de uma palavra para o **estatuto**, quando não quer dizer «droga» nem «maconha».`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Substância controlada | [Ilícito](/posts/post-inspecao-palavra-ilicito.html) (pode haver controlo sem ser «tráfico» no senso comum) |
| Substância controlada | [Droga](${L.droga}) senso comum |
| Substância controlada | [Cannabis sativa](${L.planta}) (planta ≠ rótulo) |`,
    limits: `- Não lista substâncias.  
- Não substitui receita ou orientação profissional.`,
    statusLine: 'Substância controlada documentada como meta-rótulo regulatório.',
    readingEn: 'Meta-label for regulatory control status — not a folk name and not automatic synonym of “illicit drug”.',
    readingEs: 'Meta-rótulo del estatuto regulatorio — no es nombre popular ni sinónimo automático de «droga ilícita».'
  });
}

function buildIlicitoPost() {
  return buildSheet({
    word: 'ilícito',
    wordsLabel: 'ilícito',
    inspected: '2026-08-02',
    date: '2026-08-02T07:40:00.000Z',
    seriesOrder: 25,
    seriesLabel: 'Ilícito · classificação',
    title: 'Inspeção: Ilícito — polo jurídico do duplo sentido de droga',
    titleEn: 'Inspection: Ilícito — legal pole of the drug double sense',
    titleEs: 'Inspección: Ilícito — polo jurídico del doble sentido de droga',
    excerpt:
      'Palavra: ilícito — polo jurídico que fecha o contraste com droga (remédio ↔ ilícito no senso comum) e com substância controlada.',
    excerptEn:
      'Word: ilícito — legal pole that closes the contrast with droga (medicine ↔ illicit in common speech) and controlled substance.',
    excerptEs:
      'Palabra: ilícito — polo jurídico que cierra el contraste con droga (remedio ↔ ilícito) y sustancia controlada.',
    slug: 'inspecao-palavra-ilicito',
    scope:
      'Inspeção de **ilícito** — polo **jurídico** que a ficha [Droga](' +
      L.droga +
      ') já pressupõe (remédio ↔ ilícito no senso comum). Aqui o laboratório nomeia o pólo com método.',
    hypotheses: `**H1:** «ilícito» marca **fora da lei** — não descreve a planta.  
**H2:** o senso comum usa «droga» como atalho para ilícito; o laboratório recusa esse colapso.  
**H3:** cruzar com [proibição](/posts/post-inspecao-palavra-proibicao-proibicionismo.html) e [substância controlada](/posts/post-inspecao-palavra-substancia-controlada.html).`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Acto / bem **contrário à lei** |
| Uso dominante | Direito, polícia, senso comum |
| Risco | Chamar a planta de «ilícito» sem distinguir posse, tráfico, cultivo, pesquisa |
| Elo | [Droga](${L.droga}) · [Proibição](/posts/post-inspecao-palavra-proibicao-proibicionismo.html) |`,
    why: `Sem «ilícito», o contraste da inspeção de [Droga](${L.droga}) fica pela metade.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Ilícito | [Substância controlada](/posts/post-inspecao-palavra-substancia-controlada.html) (controlo ≠ necessariamente «crime» no discurso popular) |
| Ilícito | Nome popular ([maconha](${L.maconha})) |
| Ilícito | [Cânhamo](${L.canhamo}) industrial |`,
    limits: `- Não classifica condutas penais.  
- Não é parecer sobre política de drogas.`,
    statusLine: 'Ilícito documentado como pólo jurídico do mapa semântico BudGanja.',
    readingEn: 'Legal pole “outside the law” — closes the [droga](' + L.droga + ') double sense without renaming the plant.',
    readingEs: 'Polo jurídico «fuera de la ley» — cierra el doble sentido de [droga](' + L.droga + ') sin renombrar la planta.'
  });
}

function buildOpioideOpiaceoPost() {
  return buildSheet({
    word: 'opioide / opiáceo',
    wordsLabel: 'opioide · opiáceo',
    inspected: '2026-08-02',
    date: '2026-08-02T07:50:00.000Z',
    seriesOrder: 26,
    seriesLabel: 'Opioide · Opiáceo · classificação',
    title: 'Inspeção: Opioide e Opiáceo — tradição clínica por trás de narcótico',
    titleEn: 'Inspection: Opioide and Opiáceo — clinical tradition behind narcotic',
    titleEs: 'Inspección: Opioide y Opiáceo — tradición clínica detrás de narcótico',
    excerpt:
      'Palavras: opioide × opiáceo — tradição clínica (ópio / analgésicos) que explica parte do rótulo narcótico; distinta da rede de nomes da cannabis.',
    excerptEn:
      'Words: opioide × opiáceo — clinical tradition (opium / analgesics) behind part of the narcotic label; distinct from cannabis name network.',
    excerptEs:
      'Palabras: opioide × opiáceo — tradición clínica (opio / analgésicos) detrás del rótulo narcótico; distinta de la red de nombres del cannabis.',
    slug: 'inspecao-palavra-opioide-opiaceo',
    scope:
      'Inspeção do par **opioide** × **opiáceo** — léxico da **tradição clínica do ópio** que ilumina o rótulo **narcótico** na ficha [entorpecente × narcótico](' +
      L.entorpecente +
      '), sem confundir com cannabis.',
    hypotheses: `**H1:** **opiáceo** aponta historicamente ao **ópio e derivados naturais**; **opioide** alarga a família (incluindo sintéticos).  
**H2:** parte do uso antigo de «narcótico» vem desta tradição analgésica/sono — não da cannabis.  
**H3:** separar o par evita o erro «cannabis = narcótico = opioide».`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Opiáceo | Ligado ao **ópio** e alcaloides naturais (tradição) |
| Opioide | Família mais ampla — receptores opioides, incluindo sintéticos |
| Elo | [Narcótico](${L.entorpecente}) · [Depressor](/posts/post-inspecao-palavra-depressor.html) |
| Distinção | ≠ rede canábica ([maconha](${L.maconha}), [CBD](/guia/palavras.html?q=CBD)) |`,
    why: `Sem este par, «narcótico» na ficha fundadora fica órfão de história clínica.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Opioide / opiáceo | Cannabis / [maconha](${L.maconha}) |
| Opioide | [Entorpecente](${L.entorpecente}) (lista BR — categorias distintas) |
| Narcótico (rótulo amplo) | Opioide (família farmacológica) |`,
    limits: `- Não ensina dosagem nem tratamento de dor.  
- Não é guia de redução de danos clínico.`,
    statusLine: 'Opioide e opiáceo documentados como tradição clínica por trás de narcótico.',
    readingEn: 'Clinical opium/opioid family that explains part of the old «narcotic» label — not a cannabis synonym.',
    readingEs: 'Familia clínica del opio/opioide que explica parte del rótulo «narcótico» — no es sinónimo de cannabis.'
  });
}

function buildDepressorPost() {
  return buildSheet({
    word: 'depressor',
    wordsLabel: 'depressor',
    inspected: '2026-08-02',
    date: '2026-08-02T08:00:00.000Z',
    seriesOrder: 27,
    seriesLabel: 'Depressor · classificação',
    title: 'Inspeção: Depressor — classe de efeito no sistema nervoso',
    titleEn: 'Inspection: Depressor — effect class on the nervous system',
    titleEs: 'Inspección: Depressor — clase de efecto en el sistema nervioso',
    excerpt:
      'Palavra: depressor — classe de efeito (diminui actividade do SNC); distinta de entorpecente (lista) e de psicoativo (Guia técnico).',
    excerptEn:
      'Word: depressor — effect class (lowers CNS activity); distinct from control-list entorpecente and from psicoativo.',
    excerptEs:
      'Palabra: depressor — clase de efecto (baja actividad del SNC); distinta de entorpecente de lista y de psicoactivo.',
    slug: 'inspecao-palavra-depressor',
    scope:
      'Inspeção de **depressor** — **classe de efeito** no sistema nervoso central. Complementa [psicoativo](' +
      L.psicoativo +
      ') e distingue-se de [entorpecente](' +
      L.entorpecente +
      ') (categoria de lista).',
    hypotheses: `**H1:** «depressor» descreve **efeito**, não automaticamente crime ou lista.  
**H2:** útil no trio depressor / [estimulante](/posts/post-inspecao-palavra-estimulante.html) / [alucinógeno](/posts/post-inspecao-palavra-alucinogeno.html).  
**H3:** opioides clássicos entram na conversa de depressores — elo com [opioide](/posts/post-inspecao-palavra-opioide-opiaceo.html).`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Diminui actividade / excitabilidade do SNC |
| Uso | Ensino, toxicologia, formação XIV |
| Distinção | ≠ entorpecente (lista) · ≠ ilícito |
| Elo | [Estimulante](/posts/post-inspecao-palavra-estimulante.html) · [Alucinógeno](/posts/post-inspecao-palavra-alucinogeno.html) |`,
    why: `A formação fala em classes de efeito. Sem «depressor», o mapa fica só com rótulos legais.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Depressor (efeito) | Entorpecente (lista) |
| Depressor | [Tristeza](/posts/post-inspecao-palavra-tristeza.html) (emoção — outra série) |
| Depressor | Nome popular da cannabis |`,
    limits: `- Não classifica a cannabis como «só depressor».  
- Não é diagnóstico clínico.`,
    statusLine: 'Depressor documentado como classe de efeito na rede de classificação.',
    readingEn: 'Effect class: lowers CNS activity — not a control-list synonym.',
    readingEs: 'Clase de efecto: baja la actividad del SNC — no es sinónimo de lista de control.'
  });
}

function buildEstimulantePost() {
  return buildSheet({
    word: 'estimulante',
    wordsLabel: 'estimulante',
    inspected: '2026-08-02',
    date: '2026-08-02T08:10:00.000Z',
    seriesOrder: 28,
    seriesLabel: 'Estimulante · classificação',
    title: 'Inspeção: Estimulante — classe de efeito no sistema nervoso',
    titleEn: 'Inspection: Estimulante — effect class on the nervous system',
    titleEs: 'Inspección: Estimulante — clase de efecto en el sistema nervioso',
    excerpt:
      'Palavra: estimulante — classe de efeito (aumenta actividade do SNC); par de depressor e alucinógeno; distinta de entorpecente.',
    excerptEn:
      'Word: estimulante — effect class (raises CNS activity); pair with depressor and hallucinogen; distinct from entorpecente.',
    excerptEs:
      'Palabra: estimulante — clase de efecto (sube actividad del SNC); par de depressor y alucinógeno; distinta de entorpecente.',
    slug: 'inspecao-palavra-estimulante',
    scope:
      'Inspeção de **estimulante** — **classe de efeito** oposta/complementar a [depressor](/posts/post-inspecao-palavra-depressor.html). Ligação ao Guia ([café](/guia/palavras.html?q=Caf%C3%A9), formação XIV) sem colapsar em [droga](' +
      L.droga +
      ').',
    hypotheses: `**H1:** «estimulante» descreve **efeito**, do café quotidiano a substâncias sob lista.  
**H2:** o senso comum usa a palavra como insulto moral — o laboratório devolve o sentido técnico.  
**H3:** cruzar com [psicotrópico](/posts/post-inspecao-palavra-psicotropico.html) e [psicoativo](${L.psicoativo}).`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Aumenta alerta / actividade do SNC |
| Uso | Ensino, toxicologia, vida quotidiana (cafeína) |
| Distinção | ≠ ilícito automático · ≠ entorpecente |
| Elo | [Depressor](/posts/post-inspecao-palavra-depressor.html) · [Café](/guia/palavras.html?q=Caf%C3%A9) |`,
    why: `Fecha o trio de classes de efeito pedido pela literacia XIV.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Estimulante (efeito) | Entorpecente (lista) |
| Estimulante | [Alegria](/posts/post-inspecao-palavra-alegria.html) (emoção) |
| Estimulante | Nome da cannabis |`,
    limits: `- Não recomenda consumo.  
- Não esgota farmacologia.`,
    statusLine: 'Estimulante documentado como classe de efeito.',
    readingEn: 'Effect class: raises CNS activity — includes everyday caffeine talk without collapsing into “illicit drug”.',
    readingEs: 'Clase de efecto: sube la actividad del SNC — incluye el habla cotidiana de la cafeína sin colapsar en «droga ilícita».'
  });
}

function buildAlucinogenoPost() {
  return buildSheet({
    word: 'alucinógeno',
    wordsLabel: 'alucinógeno',
    inspected: '2026-08-02',
    date: '2026-08-02T08:20:00.000Z',
    seriesOrder: 29,
    seriesLabel: 'Alucinógeno · classificação',
    title: 'Inspeção: Alucinógeno — classe de efeito e literacia XIV',
    titleEn: 'Inspection: Alucinógeno — effect class and XIV literacy',
    titleEs: 'Inspección: Alucinógeno — clase de efecto y literacia XIV',
    excerpt:
      'Palavra: alucinógeno — classe de efeito (altera percepção); distinta de psicoativo, psicodélico e entorpecente; elo com ayahuasca/cogumelo no Guia.',
    excerptEn:
      'Word: alucinógeno — effect class (alters perception); distinct from psicoativo, psychedelic and entorpecente; link to ayahuasca/mushroom in the Guide.',
    excerptEs:
      'Palabra: alucinógeno — clase de efecto (altera percepción); distinta de psicoactivo, psicodélico y entorpecente; vínculo con ayahuasca/hongo en la Guía.',
    slug: 'inspecao-palavra-alucinogeno',
    scope:
      'Inspeção de **alucinógeno** — classe de efeito ligada a alteração forte da percepção. Cruza [psicodélico](' +
      L.psicodelico +
      '), [ayahuasca](/guia/palavras.html?q=Ayahuasca) e [cogumelo](/guia/palavras.html?q=Cogumelo) no Guia, sem confundir com cannabis nem com [entorpecente](' +
      L.entorpecente +
      ').',
    hypotheses: `**H1:** «alucinógeno» é rótulo de **efeito**, muitas vezes impreciso (nem todo psicodélico se reduz a «alucinação»).  
**H2:** a formação XIV trata psicodélicos **além** da cannabis — o laboratório deve espelhar essa separação.  
**H3:** ≠ entorpecente / ≠ nome popular da maconha.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Altera percepção / consciência de forma intensa |
| Uso | Ensino, etnobotânica, aula de psicodélicos |
| Distinção | ≠ [psicodélico](${L.psicodelico}) (vizinho, não idêntico) · ≠ cannabis automática |
| Elo | [Ayahuasca](/guia/palavras.html?q=Ayahuasca) · [Cogumelo](/guia/palavras.html?q=Cogumelo) · [XIV](${L.xiv}) |`,
    why: `Completa o trio depressor / estimulante / alucinógeno e protege a literacia das aulas XIV.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Alucinógeno | [Cannabis](${L.cannabis}) / [maconha](${L.maconha}) |
| Alucinógeno | Entorpecente (lista) |
| Alucinógeno | [Psicodélico](${L.psicodelico}) (termo vizinho no Guia) |`,
    limits: `- Não ensina ritual nem dosagem.  
- Não endossa uso.`,
    statusLine: 'Alucinógeno documentado como classe de efeito, cruzado com o léxico XIV.',
    readingEn: 'Effect class for strong perception change — kept distinct from cannabis folk names and control-list labels.',
    readingEs: 'Clase de efecto de cambio fuerte de percepción — separada de nombres populares del cannabis y de rótulos de lista.'
  });
}

function buildProibicaoPost() {
  return buildSheet({
    word: 'proibição / proibicionismo',
    wordsLabel: 'proibição · proibicionismo',
    inspected: '2026-08-02',
    date: '2026-08-02T08:30:00.000Z',
    seriesOrder: 30,
    seriesLabel: 'Proibição · Proibicionismo · classificação',
    title: 'Inspeção: Proibição e Proibicionismo — camada política da classificação',
    titleEn: 'Inspection: Proibição and Proibicionismo — political layer of classification',
    titleEs: 'Inspección: Prohibición y Prohibicionismo — capa política de la clasificación',
    excerpt:
      'Palavras: proibição × proibicionismo — camada política/histórica das listas e do estigma; elo com ilícito, maconha e formação Sidarta/CEBRID.',
    excerptEn:
      'Words: proibição × proibicionismo — political/historical layer of lists and stigma; link to illicit, maconha and Sidarta/CEBRID training.',
    excerptEs:
      'Palabras: prohibición × prohibicionismo — capa política/histórica de listas y estigma; vínculo con ilícito, maconha y formación Sidarta/CEBRID.',
    slug: 'inspecao-palavra-proibicao-proibicionismo',
    scope:
      'Inspeção do par **proibição** × **proibicionismo** — camada **política e histórica** que explica *por que* existem listas e estigmas, sem substituir [ilícito](/posts/post-inspecao-palavra-ilicito.html) nem [entorpecente](' +
      L.entorpecente +
      ').',
    hypotheses: `**H1:** **proibição** nomeia o acto/regime de proibir; **proibicionismo** nomeia a **doutrina política** que naturaliza esse regime.  
**H2:** a viagem semântica de [maconha](${L.maconha}) não se entende sem esta camada.  
**H3:** o laboratório indexa o debate (incl. vozes da formação) sem virar panfleto.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Proibição | Regime / acto de **proibir** |
| Proibicionismo | **Doutrina** e cultura política da proibição |
| Elo | [Ilícito](/posts/post-inspecao-palavra-ilicito.html) · [Maconha](${L.maconha}) · [Sidarta](/posts/post-inspecao-sidarta-ribeiro.html) |
| Distinção | ≠ farmacologia · ≠ nome científico |`,
    why: `Listas não nascem no vazio. Sem estas palavras, Classificação legal parece só técnica.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Proibição | [Ilícito](/posts/post-inspecao-palavra-ilicito.html) (resultado jurídico vs política) |
| Proibicionismo | [Entorpecente](${L.entorpecente}) (rótulo de lista) |
| Proibicionismo | Opinião do laboratório (indexar ≠ endossar) |`,
    limits: `- Não é manifesto partidário.  
- Não resume a história mundial das drogas.`,
    statusLine: 'Proibição e proibicionismo documentados como camada política da classificação.',
    readingEn: 'Political/historical layer: the act of banning vs the doctrine of prohibitionism — frames lists and stigma.',
    readingEs: 'Capa política/histórica: el acto de prohibir vs la doctrina del prohibicionismo — enmarca listas y estigma.'
  });
}

function buildAnvisaPost() {
  return buildSheet({
    word: 'ANVISA',
    wordsLabel: 'ANVISA',
    inspected: '2026-08-02',
    date: '2026-08-02T08:40:00.000Z',
    seriesOrder: 31,
    seriesLabel: 'ANVISA · classificação',
    title: 'Inspeção: ANVISA — instituição no mapa regulatório BudGanja',
    titleEn: 'Inspection: ANVISA — institution in the BudGanja regulatory map',
    titleEs: 'Inspección: ANVISA — institución en el mapa regulatorio BudGanja',
    excerpt:
      'Palavra: ANVISA — agência reguladora no mapa institucional do laboratório; elo com portaria, lista F e cannabis medicinal, sem parecer jurídico.',
    excerptEn:
      'Word: ANVISA — regulatory agency in the lab’s institutional map; link to portaria, Lista F and medicinal cannabis, not legal advice.',
    excerptEs:
      'Palabra: ANVISA — agencia reguladora en el mapa institucional; vínculo con portaria, Lista F y cannabis medicinal, sin asesoría jurídica.',
    slug: 'inspecao-palavra-anvisa',
    scope:
      'Inspeção da sigla **ANVISA** — peça do **mapa institucional** brasileiro que o projecto encontra ao falar de listas, cannabis medicinal e vigilância sanitária. Grupo [Classificação legal](' +
      L.guia +
      ').',
    hypotheses: `**H1:** ANVISA é **instituição**, não classe farmacológica.  
**H2:** aparece no discurso canábico medicinal e nas listas — deve ter entrada própria.  
**H3:** indexar ≠ interpretar normas vigentes.`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Agência reguladora de vigilância sanitária |
| Uso no projecto | Contexto de **portarias / listas / produtos** |
| Elo | [Portaria](/posts/post-inspecao-palavra-portaria.html) · [Lista F](/posts/post-inspecao-palavra-lista-f.html) · [Curso UNIFESP](${L.curso}) |
| Distinção | ≠ ONU · ≠ Polícia Federal · ≠ CEBRID (informação académica) |`,
    why: `Visitantes encontram «ANVISA» em notícias e aulas. Sem ficha, a palavra fica solta no Guia.`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| ANVISA | [CEBRID](${L.cebrid}) (centro de informação UNIFESP) |
| ANVISA | [Lista F](/posts/post-inspecao-palavra-lista-f.html) (instrumento, não a agência) |
| ANVISA | Nome da planta |`,
    limits: `- Não resume competências legais actuais.  
- Não substitui consulta ao site oficial.`,
    statusLine: 'ANVISA documentada como nó institucional da classificação.',
    readingEn: 'Brazilian health surveillance agency as an institutional node — not a plant name and not a reprint of current rules.',
    readingEs: 'Agencia brasileña de vigilancia sanitaria como nodo institucional — no es nombre de planta ni reimpresión de normas.'
  });
}

function buildPortariaPost() {
  return buildSheet({
    word: 'portaria',
    wordsLabel: 'portaria',
    inspected: '2026-08-02',
    date: '2026-08-02T08:50:00.000Z',
    seriesOrder: 32,
    seriesLabel: 'Portaria · classificação',
    title: 'Inspeção: Portaria — forma normativa das listas de controlo',
    titleEn: 'Inspection: Portaria — normative form of control lists',
    titleEs: 'Inspección: Portaria — forma normativa de las listas de control',
    excerpt:
      'Palavra: portaria — forma normativa que materializa listas e regras; elo com ANVISA, Lista F e entorpecente, sem reproduzir o texto oficial.',
    excerptEn:
      'Word: portaria — normative form that materializes lists and rules; link to ANVISA, Lista F and entorpecente, without reprinting the official text.',
    excerptEs:
      'Palabra: portaria — forma normativa que materializa listas y reglas; vínculo con ANVISA, Lista F y entorpecente, sin reproducir el texto oficial.',
    slug: 'inspecao-palavra-portaria',
    scope:
      'Inspeção de **portaria** — **forma normativa** pela qual o Estado brasileiro costuma publicar e actualizar listas e regras sanitárias. O laboratório nomeia o género textual, não um número específico.',
    hypotheses: `**H1:** sem entender «portaria», «Lista F» e «entorpecente» parecem vocabulário solto.  
**H2:** o projecto cita o **tipo** de fonte — não arquiva o PDF oficial.  
**H3:** cruzar com [ANVISA](/posts/post-inspecao-palavra-anvisa.html) e [substância controlada](/posts/post-inspecao-palavra-substancia-controlada.html).`,
    senseTable: `| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Acto administrativo normativo (ministério / agência) |
| Uso | Actualização de listas, regras de produtos, vigilância |
| Elo | [ANVISA](/posts/post-inspecao-palavra-anvisa.html) · [Lista F](/posts/post-inspecao-palavra-lista-f.html) · [Entorpecente](${L.entorpecente}) |
| Distinção | ≠ lei ordinária · ≠ tratado internacional |`,
    why: `Fecha o circuito institucional: ANVISA / portaria / lista / rótulo (entorpecente).`,
    contrasts: `| Não confundir | Com |
|---------------|-----|
| Portaria | [Lista F](/posts/post-inspecao-palavra-lista-f.html) (conteúdo vs forma) |
| Portaria | Tratado / estupefaciente internacional |
| Portaria | Parecer do laboratório |`,
    limits: `- Não cita número vigente como verdade eterna.  
- Sempre verificar a fonte oficial actualizada.`,
    statusLine: 'Portaria documentada como forma normativa no mapa de classificação.',
    readingEn: 'Normative instrument type that carries control lists — the lab names the genre, not a frozen ordinance number.',
    readingEs: 'Tipo de instrumento normativo que porta listas de control — el laboratorio nombra el género, no un número congelado.'
  });
}

const CLASSIFICACAO_LEGAL_PALAVRAS_POSTS = [
  buildPsicotropicoPost(),
  buildListaFPost(),
  buildEstupefacientePost(),
  buildSubstanciaControladaPost(),
  buildIlicitoPost(),
  buildOpioideOpiaceoPost(),
  buildDepressorPost(),
  buildEstimulantePost(),
  buildAlucinogenoPost(),
  buildProibicaoPost(),
  buildAnvisaPost(),
  buildPortariaPost()
];

/** Entradas novas / actualizadas no Guia de Palavras (grupo classificacao). */
const CLASSIFICACAO_GUIA_ITEMS = [
  {
    id: 'alucinogeno',
    word: 'Alucinógeno',
    simple:
      'Classe de efeito: altera percepção ou consciência de forma intensa — distinta de psicoativo, psicodélico e de entorpecente (lista).',
    simpleEn:
      'Effect class: strongly alters perception or consciousness — distinct from psicoativo, psychedelic and control-list entorpecente.',
    simpleEs:
      'Clase de efecto: altera percepción o conciencia de forma intensa — distinta de psicoactivo, psicodélico y entorpecente de lista.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-alucinogeno.html'
  },
  {
    id: 'anvisa',
    word: 'ANVISA',
    simple:
      'Agência reguladora de vigilância sanitária — nó institucional do mapa de portarias e listas; não é nome da planta.',
    simpleEn:
      'Brazilian health surveillance agency — institutional node for ordinances and lists; not a plant name.',
    simpleEs:
      'Agencia brasileña de vigilancia sanitaria — nodo institucional de portarias y listas; no es nombre de planta.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-anvisa.html'
  },
  {
    id: 'depressor',
    word: 'Depressor',
    simple:
      'Classe de efeito: diminui a actividade do sistema nervoso central — distinta de entorpecente (categoria de lista).',
    simpleEn:
      'Effect class: lowers central-nervous-system activity — distinct from control-list entorpecente.',
    simpleEs:
      'Clase de efecto: baja la actividad del sistema nervioso central — distinta de entorpecente de lista.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-depressor.html'
  },
  {
    id: 'estimulante',
    word: 'Estimulante',
    simple:
      'Classe de efeito: aumenta alerta ou actividade do sistema nervoso — do café quotidiano a substâncias sob lista.',
    simpleEn:
      'Effect class: raises alertness or nervous-system activity — from everyday coffee to listed substances.',
    simpleEs:
      'Clase de efecto: sube alerta o actividad del sistema nervioso — del café cotidiano a sustancias en lista.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-estimulante.html'
  },
  {
    id: 'estupefaciente',
    word: 'Estupefaciente',
    simple:
      'Rótulo internacional/de tratados, vizinho de narcótico — não é sinónimo exacto de entorpecente nas listas brasileiras modernas.',
    simpleEn:
      'International/treaty label next to narcotic — not an exact synonym of modern Brazilian entorpecente lists.',
    simpleEs:
      'Rótulo internacional/de tratados, vecino de narcótico — no es sinónimo exacto de entorpecente en listas brasileñas modernas.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-estupefaciente.html'
  },
  {
    id: 'ilicito',
    word: 'Ilícito',
    simple:
      'Polo jurídico «fora da lei» — fecha o contraste com droga (remédio ↔ ilícito no senso comum); não é o nome da planta.',
    simpleEn:
      'Legal pole “outside the law” — closes the medicine ↔ illicit contrast of droga; not the plant’s name.',
    simpleEs:
      'Polo jurídico «fuera de la ley» — cierra el contraste remedio ↔ ilícito de droga; no es el nombre de la planta.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-ilicito.html'
  },
  {
    id: 'lista-f',
    word: 'Lista F',
    simple:
      'Âncora brasileira das listas oficiais de substâncias controladas — o laboratório indexa o tipo de linguagem, não o anexo integral.',
    simpleEn:
      'Brazilian anchor for official controlled-substance lists — the lab indexes the language type, not the full annex.',
    simpleEs:
      'Ancla brasileña de las listas oficiales de sustancias controladas — el laboratorio indexa el tipo de lenguaje, no el anexo íntegro.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-lista-f.html'
  },
  {
    id: 'opiaceo',
    word: 'Opiáceo',
    simple:
      'Tradição clínica ligada ao ópio e derivados naturais — ajuda a entender o rótulo narcótico; distinto da cannabis.',
    simpleEn:
      'Clinical tradition tied to opium and natural derivatives — helps explain the narcotic label; distinct from cannabis.',
    simpleEs:
      'Tradición clínica ligada al opio y derivados naturales — ayuda a entender el rótulo narcótico; distinta del cannabis.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-opioide-opiaceo.html'
  },
  {
    id: 'opioide',
    word: 'Opioide',
    simple:
      'Família farmacológica dos receptores opioides (inclui sintéticos) — distinta da rede de nomes da cannabis e de entorpecente.',
    simpleEn:
      'Pharmacological opioid-receptor family (including synthetics) — distinct from cannabis name network and entorpecente.',
    simpleEs:
      'Familia farmacológica de receptores opioides (incluye sintéticos) — distinta de la red de nombres del cannabis y de entorpecente.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-opioide-opiaceo.html'
  },
  {
    id: 'portaria',
    word: 'Portaria',
    simple:
      'Forma normativa que materializa listas e regras sanitárias — o laboratório nomeia o género textual, não um número eterno.',
    simpleEn:
      'Normative form that materializes sanitary lists and rules — the lab names the genre, not an eternal number.',
    simpleEs:
      'Forma normativa que materializa listas y reglas sanitarias — el laboratorio nombra el género, no un número eterno.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-portaria.html'
  },
  {
    id: 'proibicao',
    word: 'Proibição',
    simple:
      'Regime ou acto de proibir — camada política das listas e do estigma; distinta do nome da planta.',
    simpleEn:
      'Regime or act of banning — political layer of lists and stigma; distinct from the plant’s name.',
    simpleEs:
      'Régimen o acto de prohibir — capa política de listas y estigma; distinta del nombre de la planta.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html'
  },
  {
    id: 'proibicionismo',
    word: 'Proibicionismo',
    simple:
      'Doutrina política que naturaliza a proibição — camada histórica do debate; indexar ≠ endossar.',
    simpleEn:
      'Political doctrine that naturalizes prohibition — historical layer of the debate; indexing ≠ endorsement.',
    simpleEs:
      'Doctrina política que naturaliza la prohibición — capa histórica del debate; indexar ≠ respaldar.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html'
  },
  {
    id: 'psicotropico',
    word: 'Psicotrópico',
    simple:
      'Rótulo clínico/institucional: substância que actua no sistema nervoso — distinto de entorpecente (lista) e de droga no senso comum.',
    simpleEn:
      'Clinical/institutional label: substance acting on the nervous system — distinct from control-list entorpecente and everyday “drug”.',
    simpleEs:
      'Rótulo clínico/institucional: sustancia que actúa en el sistema nervioso — distinto de entorpecente de lista y de droga en el habla común.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-psicotropico.html'
  },
  {
    id: 'substancia-controlada',
    word: 'Substância controlada',
    simple:
      'Meta-rótulo do estatuto regulatório (listas, receituário) — distinto de ilícito automático e dos nomes populares.',
    simpleEn:
      'Meta-label for regulatory status (lists, prescriptions) — distinct from automatic “illicit” and folk names.',
    simpleEs:
      'Meta-rótulo del estatuto regulatorio (listas, receta) — distinto de ilícito automático y de los nombres populares.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-palavra-substancia-controlada.html'
  }
];

module.exports = {
  CLASSIFICACAO_LEGAL_PALAVRAS_POSTS,
  CLASSIFICACAO_GUIA_ITEMS,
  buildPsicotropicoPost,
  buildListaFPost,
  buildEstupefacientePost,
  buildSubstanciaControladaPost,
  buildIlicitoPost,
  buildOpioideOpiaceoPost,
  buildDepressorPost,
  buildEstimulantePost,
  buildAlucinogenoPost,
  buildProibicaoPost,
  buildAnvisaPost,
  buildPortariaPost
};
