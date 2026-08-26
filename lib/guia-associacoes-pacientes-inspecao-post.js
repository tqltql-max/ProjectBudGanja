'use strict';

/**
 * Inspeção-guia: associações de pacientes e cultivo institucional.
 * Elo: RDC · ANVISA · HC · médicos · seletividade.
 * Não é manual de licenciamento nem parecer.
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
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  proibicao: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html',
  maconha: '/posts/post-inspecao-palavra-maconha.html',
  cannabis: '/posts/post-inspecao-palavra-cannabis.html',
  planta: '/plantas/cannabis-sativa/',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  advogados: '/posts/post-inspecao-guia-hc-seletividade-advogados.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html',
  farmaceuticos: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html',
  defensoria: '/posts/post-inspecao-guia-defensoria-acesso.html',
  rdc: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html',
  lei: '/posts/post-inspecao-palavra-lei-11-343.html',
  descrim: '/posts/post-inspecao-palavra-descriminalizacao.html'
};

function buildGuiaAssociacoesPacientesBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **associações de pacientes, cuidadores e gestores associativos**: mapa do **cultivo/produção institucional** e do custo de virar **paciente de facto** — entre [RDC / autorização sanitária](${L.rdc}), HC individual e seletividade de quem entra na associação.

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é manual de licenciamento, não é estatuto modelo, não substitui advogado nem ANVISA.** Indexar ≠ endossar associação ou marca. Marcos 2026 e decisões judiciais mudam — confirmar nas fontes. Objecto = **literacia do projecto**.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Associações, pacientes organizados, advogados associativos, pesquisadores |
| Tipo BudGanja | Inspeção-guia — acesso colectivo × classificação |
| Par sanitário | [RDC × Autorização](${L.rdc}) · [ANVISA](${L.anvisa}) |
| Par jurídico | [HC — advogados](${L.advogados}) · [Defensoria](${L.defensoria}) |
| Grupo Guia | [Classificação legal](${L.guia}) |
| Data | ${inspected} |

## Tese central (uma frase)

A associação pode **reduzir** o preço unitário do acesso — mas **mensalidade, laudo, deslocamento e literacia** ainda filtram quem vira membro; cultivo institucional (PJ/RDC) **não** apaga a história do HC individual nem a [Lei 11.343](${L.lei}) para quem fica de fora.

## Hipóteses

**H1:** «associação de pacientes» é actor **híbrido** (saúde + direito + cuidado) — não é farmácia nem escritório.  
**H2:** marcos ANVISA de cultivo/produção **institucional** abrem via PJ distinta do autocultivo caseiro com HC.  
**H3:** elitização do HC individual empurra gente para associações — e associações sem transparência podem reproduzir outro filtro.  
**H4:** [descriminalização](${L.descrim}) do porte **não** autoriza cultivo associativo por si só.

## Mapa rápido: vias colectivas × individuais

| Via | O que costuma exigir | Limite BudGanja |
|-----|----------------------|-----------------|
| **Associação + produto/óleo sob regras** | Vínculo associativo, receita/laudo, quotas | Custo e fila |
| **Cultivo institucional (RDC/PJ)** | Pessoa jurídica, autorização sanitária | Não é HC individual |
| **HC individual (autocultivo)** | Advogado + dossiê médico | Filtro de renda ([guia](${L.advogados})) |
| **Sem rede** | — | Zona [ilícito](${L.ilicito}) / abordagem |

## Checklist de literacia associativa (educacional)

1. Separar **membro paciente** de **fornecedor informal**.  
2. Documentar indicação médica — elo com [guia médicos](${L.medicos}).  
3. Distinguir autorização sanitária ([RDC](${L.rdc})) de salvo-conduto ([HC](${L.advogados})).  
4. Transparência de custos: mensalidade é filtro de classe.  
5. Encaminhar quem não pode pagar a [Defensoria](${L.defensoria}) / políticas públicas — não só «indique um particular».  
6. Literacia de classificação: [entorpecente](${L.entorpecente}) ≠ [maconha](${L.maconha}) no discurso interno.

**Leitura BudGanja:** associação que só serve quem já tem dinheiro e laudo **espelha** a seletividade que denuncia.

## Rede BudGanja (obrigatória)

| Camada | Fichas |
|--------|--------|
| Guias | [Advogados](${L.advogados}) · [Médicos](${L.medicos}) · [Farmacêuticos](${L.farmaceuticos}) · [Defensoria](${L.defensoria}) |
| Sanitário | [RDC × Autorização](${L.rdc}) · [ANVISA](${L.anvisa}) · [Portaria](${L.portaria}) |
| Penal / política | [Lei 11.343](${L.lei}) · [Descriminalização](${L.descrim}) · [Proibicionismo](${L.proibicao}) |
| Planta / nome | [Cannabis sativa](${L.planta}) · [Cannabis](${L.cannabis}) · [Maconha](${L.maconha}) |
| Glossário | [Classificação legal](${L.guia}) · [Cobertura](${L.cobertura}) |

## Contrastes

| Não confundir | Com |
|---------------|-----|
| Associação de pacientes | Farmácia / drogaria |
| Cultivo institucional (PJ) | Autocultivo caseiro sem amparo |
| Quota associativa | Direito universal ao produto |
| RDC | Descriminalização do porte |
| Cuidado colectivo | Tráfico ([porte × tráfico](/posts/post-inspecao-palavra-porte-trafico.html)) |

## Limites desta ficha

- Não licencia associação nem redige estatuto.  
- Não endossa modelos de negócio.  
- Não lista RDCs por número eterno.  
- Não substitui assessoria jurídica/sanitária.

## Status

**Aprovado — primeira inspeção-guia para associações de pacientes.** Acesso colectivo documentado como camada entre HC individual e mercado regulado.

[▶ RDC](${L.rdc}) · [▶ Advogados](${L.advogados}) · [▶ Médicos](${L.medicos}) · [▶ Defensoria](${L.defensoria}) · [▶ Classificação legal](${L.guia}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide for patient associations**: institutional cultivation/production and the cost of becoming a patient in practice — between ANVISA RDC, individual HC and selectivity of membership.

> **Not a licensing manual. Not legal advice.**

## Status

**Approved — first associations guide sheet.**
`;

  const contentEs = `## Alcance

Guía BudGanja para **asociaciones de pacientes**: cultivo/producción institucional y el coste de llegar a ser paciente de facto — entre RDC ANVISA, HC individual y selectividad.

> **No es manual de licenciamiento ni asesoría jurídica.**

## Estado

**Aprobado — primera ficha-guía para asociaciones.**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaAssociacoesPacientesPost() {
  const { body, contentEn, contentEs } = buildGuiaAssociacoesPacientesBodies();
  return palavraPost({
    title: 'Inspeção: Guia associações de pacientes — cultivo institucional × seletividade',
    titleEn: 'Inspection: Patient associations guide — institutional grow × selectivity',
    titleEs: 'Inspección: Guía asociaciones de pacientes — cultivo institucional × selectividad',
    excerpt:
      'Guia para associações: cultivo/produção institucional (RDC/PJ), custo de ser membro-paciente, contraste com HC individual e seletividade. Não é manual de licenciamento.',
    excerptEn:
      'Guide for associations: institutional grow/production (RDC/PJ), cost of membership, contrast with individual HC and selectivity. Not a licensing manual.',
    excerptEs:
      'Guía para asociaciones: cultivo/producción institucional (RDC/PJ), coste de membresía, contraste con HC individual y selectividad. No es manual de licenciamiento.',
    slug: 'inspecao-guia-associacoes-pacientes',
    date: '2026-08-02T11:15:00.000Z',
    seriesOrder: 36,
    seriesLabel: 'Guia · associações de pacientes',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

const GUIA_ASSOCIACOES_PACIENTES_GUIA_ITEMS = [
  {
    id: 'associacao-pacientes',
    word: 'Associação de pacientes',
    simple:
      'Organização colectiva de acesso terapêutico à cannabis — actor híbrido (cuidado + direito + sanitário); distinta de farmácia e de tráfico.',
    simpleEn:
      'Collective organization for therapeutic cannabis access — hybrid actor (care + law + sanitary); distinct from pharmacy and trafficking.',
    simpleEs:
      'Organización colectiva de acceso terapéutico — actor híbrido; distinta de farmacia y de tráfico.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-associacoes-pacientes.html'
  },
  {
    id: 'cultivo-institucional',
    word: 'Cultivo institucional',
    simple:
      'Cultivo/produção sob pessoa jurídica e regras ANVISA (marcos RDC) — distinto do autocultivo caseiro com HC individual.',
    simpleEn:
      'Grow/production under a legal entity and ANVISA rules (RDC frames) — distinct from home grow with individual HC.',
    simpleEs:
      'Cultivo/producción bajo persona jurídica y reglas ANVISA — distinto del autocultivo casero con HC individual.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-associacoes-pacientes.html'
  }
];

module.exports = {
  buildGuiaAssociacoesPacientesPost,
  buildGuiaAssociacoesPacientesBodies,
  GUIA_ASSOCIACOES_PACIENTES_GUIA_ITEMS
};
