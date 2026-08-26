'use strict';

/**
 * Inspeção-guia: cannabis medicinal — mapa para farmacêuticos.
 * Elo: médicos · ANVISA · RDC · receituário · classificação legal.
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
  anvisa: '/posts/post-inspecao-palavra-anvisa.html',
  portaria: '/posts/post-inspecao-palavra-portaria.html',
  listaF: '/posts/post-inspecao-palavra-lista-f.html',
  substancia: '/posts/post-inspecao-palavra-substancia-controlada.html',
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cebrid: '/posts/post-inspecao-cebrid.html',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  advogados: '/posts/post-inspecao-guia-hc-seletividade-advogados.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html',
  associacoes: '/posts/post-inspecao-guia-associacoes-pacientes.html',
  defensoria: '/posts/post-inspecao-guia-defensoria-acesso.html',
  rdc: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html',
  cbd: '/guia/palavras.html?q=CBD',
  thc: '/guia/palavras.html?q=THC'
};

function buildGuiaCannabisFarmaceuticosBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **farmacêuticos e estudantes de Farmácia**: mapa de **dispensação e literacia sanitária** da cannabis — produto regulado, importação, limites da farmácia, contraste com óleo artesanal/HC, e seletividade de quem chega à farmácia com papel.

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é protocolo clínico, não é bulário, não substitui CFF/CRF, ANVISA nem literatura peer-reviewed.** Indexar ≠ endossar. Normas de receituário e listas mudam — confirmar vigência. Objecto = **literacia do projecto**.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Farmacêuticos, técnicos, estudantes, gestores de farmácia |
| Tipo BudGanja | Inspeção-guia — dispensação × classificação × acesso |
| Par clínico | [Cannabis medicinal — médicos](${L.medicos}) |
| Par jurídico | [HC × seletividade — advogados](${L.advogados}) |
| Grupo Guia | [Classificação legal](${L.guia}) |
| Data | ${inspected} |

## Tese central (uma frase)

O farmacêutico **não legaliza a planta**: opera no circuito de **produto + receita + regras de lista**; fora desse circuito (óleo artesanal sem via, cultivo sem HC) a mesma substância pode estar na zona de [ilícito](${L.ilicito}) — e o acesso à farmácia com papel já é filtro de classe.

## Hipóteses

**H1:** dispensação de cannabis regulada exige literacia de [substância controlada](${L.substancia}) / [Lista F](${L.listaF}) / [receituário](${L.medicos}) — não basta «conhecer maconha».  
**H2:** produto ANVISA/importação ≠ óleo artesanal via HC; confundir gera risco sanitário e jurídico para o paciente.  
**H3:** CRF/CFF e [RDC / autorização sanitária](${L.rdc}) definem o perímetro da farmácia — o médico indica; o Judiciário (HC) é outro braço.  
**H4:** farmácia sem estoque ou sem capacitação **reproduz seletividade**: só quem pode pagar outro canal (importação, associação, particular) continua.

## Mapa rápido: o que a farmácia costuma ver

| Situação | Papel do farmacêutico (literacia) | Limite BudGanja |
|----------|-----------------------------------|-----------------|
| **Produto cannabis regulado** | Conferir receita, armazenamento, orientação de uso seguro | Custo e disponibilidade desiguais |
| **Importação autorizada** | Orientar circuito sanitário — não «despachar mato» | Não é cultivo |
| **Receita sem produto no mercado** | Encaminhar ao médico / vias alternativas documentadas | Não improvisar manipulação ilegal |
| **Pedido de óleo artesanal / cultivo** | Explicar que HC é via **jurídica** ([advogados](${L.advogados})) | Farmácia ≠ cartório de HC |

## Checklist de literacia (educacional)

1. Separar [maconha](${L.maconha}) (nome popular) de [cannabis](${L.cannabis}) / produto industrial.  
2. Ler a receita no quadro de listas e [portaria](${L.portaria}) vigentes — não de memória antiga.  
3. Distinguir CBD/THC no discurso do paciente ([CBD](${L.cbd}) · [THC](${L.thc})) sem colapsar em «droga».  
4. Registar dúvidas e interações — segurança, não panfleto.  
5. Encaminhar lacunas legais a [Defensoria](${L.defensoria}) / advogado — não exercer advocacia no balcão.  
6. Conhecer o elo associativo ([Associações](${L.associacoes})) sem confundir com drogaria comum.

**Leitura BudGanja:** cada barreira de preço, estoque ou medo profissional **aumenta** a distância entre paciente com rede e paciente sem rede.

## Rede BudGanja (obrigatória)

| Camada | Fichas |
|--------|--------|
| Guias irmãos | [Médicos](${L.medicos}) · [Advogados](${L.advogados}) · [Associações](${L.associacoes}) · [Defensoria](${L.defensoria}) |
| Sanitário | [ANVISA](${L.anvisa}) · [RDC × Autorização](${L.rdc}) · [Portaria](${L.portaria}) · [Lista F](${L.listaF}) |
| Classificação | [Entorpecente × Narcótico](${L.entorpecente}) · [Substância controlada](${L.substancia}) |
| Formação | [CEBRID](${L.cebrid}) · [Curso UNIFESP](${L.curso}) · [Cannabis sativa](${L.planta}) |
| Glossário | [Classificação legal](${L.guia}) · [Cobertura](${L.cobertura}) |

## Contrastes que o farmacêutico deve manter vivos

| Não confundir | Com |
|---------------|-----|
| Dispensação de produto regulado | Autorização de cultivo |
| Manipulação sob regras | Óleo informal sem via |
| Orientação sanitária | Parecer jurídico |
| Recusa por medo | Recusa fundamentada em norma vigente |
| [Droga](${L.droga}) senso comum | [Substância controlada](${L.substancia}) |

## Limites desta ficha

- Não indica doses nem intercambia produtos comerciais.  
- Não substitui CFF, CRF regional ou bulário ANVISA.  
- Não ensina a redigir HC.  
- Não endossa associações ou marcas.

## Status

**Aprovado — primeira inspeção-guia para farmacêuticos.** Dispensação e literacia sanitária como camada entre [médicos](${L.medicos}) e o paciente na farmácia.

[▶ Médicos](${L.medicos}) · [▶ Advogados](${L.advogados}) · [▶ Associações](${L.associacoes}) · [▶ RDC](${L.rdc}) · [▶ ANVISA](${L.anvisa}) · [▶ Classificação legal](${L.guia}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide for pharmacists**: dispensing and sanitary literacy for cannabis — regulated product, import, pharmacy limits vs artisanal oil/HC, and selectivity of who reaches the counter with papers.

> **Not a clinical protocol. Not legal advice.** Confirm CFF/CRF and ANVISA.

## Status

**Approved — first pharmacist guide sheet.**
`;

  const contentEs = `## Alcance

Guía BudGanja para **farmacéuticos**: dispensación y literacia sanitaria del cannabis — producto regulado, importación, límites de la farmacia vs aceite artesanal/HC.

> **No es protocolo clínico ni asesoría jurídica.**

## Estado

**Aprobado — primera ficha-guía para farmacéuticos.**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaCannabisFarmaceuticosPost() {
  const { body, contentEn, contentEs } = buildGuiaCannabisFarmaceuticosBodies();
  return palavraPost({
    title: 'Inspeção: Guia cannabis medicinal — mapa para farmacêuticos (dispensação × seletividade)',
    titleEn: 'Inspection: Medicinal cannabis guide — map for pharmacists (dispensing × selectivity)',
    titleEs: 'Inspección: Guía cannabis medicinal — mapa para farmacéuticos (dispensación × selectividad)',
    excerpt:
      'Guia para farmacêuticos: produto regulado, importação, limites da farmácia vs óleo/HC, CRF/ANVISA e seletividade de quem chega ao balcão. Não é protocolo clínico.',
    excerptEn:
      'Guide for pharmacists: regulated product, import, pharmacy limits vs oil/HC, CRF/ANVISA and selectivity at the counter. Not a clinical protocol.',
    excerptEs:
      'Guía para farmacéuticos: producto regulado, importación, límites de farmacia vs aceite/HC, CRF/ANVISA y selectividad. No es protocolo clínico.',
    slug: 'inspecao-guia-cannabis-farmaceuticos',
    date: '2026-08-02T11:00:00.000Z',
    seriesOrder: 35,
    seriesLabel: 'Guia · cannabis medicinal · farmacêuticos',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

const GUIA_CANNABIS_FARMACEUTICOS_GUIA_ITEMS = [
  {
    id: 'dispensacao',
    word: 'Dispensação',
    simple:
      'Acto farmacêutico de fornecer medicamento conforme receita e normas — na cannabis, circuito de produto regulado distinto de óleo artesanal/HC.',
    simpleEn:
      'Pharmacist act of supplying medicine per prescription and rules — for cannabis, regulated-product circuit distinct from artisanal oil/HC.',
    simpleEs:
      'Acto farmacéutico de suministrar medicamento según receta y normas — en cannabis, circuito de producto regulado distinto de aceite artesanal/HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html'
  },
  {
    id: 'crf',
    word: 'CRF',
    simple:
      'Conselho Regional de Farmácia — perímetro ético/profissional da dispensação; não autoriza cultivo nem substitui ANVISA ou HC.',
    simpleEn:
      'Regional Pharmacy Council — ethical/professional perimeter of dispensing; does not authorize grow or replace ANVISA/HC.',
    simpleEs:
      'Consejo Regional de Farmacia — perímetro ético/profesional de la dispensación; no autoriza cultivo ni sustituye ANVISA/HC.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html'
  }
];

module.exports = {
  buildGuiaCannabisFarmaceuticosPost,
  buildGuiaCannabisFarmaceuticosBodies,
  GUIA_CANNABIS_FARMACEUTICOS_GUIA_ITEMS
};
