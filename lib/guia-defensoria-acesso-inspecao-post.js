'use strict';

/**
 * Inspeção-guia: Defensoria e acesso gratuito — espelho do guia HC (advogados).
 * Elo: seletividade · porte/tráfico · Lei 11.343 · médicos · associações.
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
  ilicito: '/posts/post-inspecao-palavra-ilicito.html',
  proibicao: '/posts/post-inspecao-palavra-proibicao-proibicionismo.html',
  anvisa: '/posts/post-inspecao-palavra-anvisa.html',
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
  rdc: '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html'
};

function buildGuiaDefensoriaAcessoBodies() {
  const inspected = '2026-08-02';

  const body = `## Escopo

Inspeção-guia do laboratório BudGanja para **Defensoria Pública, núcleos de prática jurídica e quem não tem advogado particular**: espelho do [guia HC para advogados](${L.advogados}) — mesma tese de **seletividade**, com foco em **acesso gratuito** e nos filtros que restam mesmo sem honorários (laudo, tempo, deslocamento, estigma).

> **Nota metodológica (ler primeiro):** auditoria editorial independente. **Não é parecer jurídico, não é peça, não substitui a Defensoria local nem o juiz do caso.** Indexar ≠ endossar. Objecto = **literacia do projecto** para quem atende a ponta pobre da seletividade.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Defensores, estagiários, núcleos universitários, pacientes sem rede |
| Tipo BudGanja | Inspeção-guia — acesso gratuito × classificação |
| Par completo | [HC × seletividade — advogados](${L.advogados}) |
| Grupo Guia | [Classificação legal](${L.guia}) |
| Data | ${inspected} |

## Tese central (uma frase)

Tirar o preço do advogado **não apaga** a seletividade: sem laudo, sem tempo para judicializar, sem literacia de [porte × tráfico](${L.porte}), a pessoa continua na [Lei 11.343](${L.lei}) / abordagem — a Defensoria é a porta pública; o laboratório mapeia o **vocabulário** e os **filtros restantes**.

## Hipóteses

**H1:** HC medicinal documentado continua a exigir **prova terapêutica** — custo médico pode ser o novo filtro.  
**H2:** a ponta pobre concentra tipificações de [tráfico](${L.porte}) onde a ponta rica concentra «paciente».  
**H3:** [descriminalização](${L.descrim}) do porte reduz pena/crime em alguns casos, mas **não** entrega cultivo nem produto.  
**H4:** encaminhar a [associações](${L.associacoes}) ou [médicos](${L.medicos}) sem rede pública de saúde **reproduz** exclusão.

## Mapa rápido: o que a Defensoria costuma ver

| Situação | Leitura BudGanja |
|----------|------------------|
| **Abordagem / auto de prisão em flagrante** | Separar porte uso pessoal × indícios de mercancia ([porte × tráfico](${L.porte})) |
| **Pedido de cultivo/óleo medicinal sem dinheiro** | Mesmo checklist do [guia HC](${L.advogados}) — com foco em laudos via SUS/rede pública quando existir |
| **Só quer «descriminalizar»** | Literacia: Tema 506 ≠ HC ≠ [RDC](${L.rdc}) |
| **Já é paciente sem papel** | Encaminhar documentação clínica ([médicos](${L.medicos})) antes de peça vazia |

## Checklist de filtros que sobram (educacional)

Mesmo com assistência gratuita, a literatura de acesso aponta custos:

1. Consulta/laudo (particular se o SUS não cobre cannabis).  
2. Tempo de tramitação e comparecimento.  
3. Deslocamento e perda de diária.  
4. Estigma na família/trabalho ao «assumir» o processo.  
5. Compreensão da diferença paciente × usuário ([guia advogados](${L.advogados})).  
6. Risco de tipificação agravada se o dossiê for frágil.

**Leitura BudGanja:** Defensoria sem elo com saúde pública e associações solidárias **segura o processo**, mas não inventa o laudo.

## Âncoras (as mesmas do guia advogados — localizar, não copiar)

| Âncora | Nota |
|--------|------|
| STJ HC 783.717/PR (2023) | Salvo-conduto medicinal com prova terapêutica — ver [guia advogados](${L.advogados}) |
| STF Tema 506 (2024) | Porte uso pessoal — atipicidade penal (confirmar) |
| Lei 11.343/2006 | [Ficha](${L.lei}) |
| RDCs / autorização | [Ficha](${L.rdc}) |

## Rede BudGanja (obrigatória)

| Camada | Fichas |
|--------|--------|
| Guia irmão (completo) | [HC × seletividade — advogados](${L.advogados}) |
| Saúde | [Médicos](${L.medicos}) · [Farmacêuticos](${L.farmaceuticos}) · [Associações](${L.associacoes}) |
| Penal | [Lei 11.343](${L.lei}) · [Porte × Tráfico](${L.porte}) · [Descriminalização](${L.descrim}) |
| Política | [Proibicionismo](${L.proibicao}) · [Ilícito](${L.ilicito}) · [Entorpecente](${L.entorpecente}) |
| Glossário | [Classificação legal](${L.guia}) · [Cobertura](${L.cobertura}) |

## Contrastes

| Não confundir | Com |
|---------------|-----|
| Assistência gratuita | Ausência de filtros (laudo, tempo) |
| Defensoria | Associação que cobra mensalidade alta |
| Pedido de HC | Garantia automática de cultivo |
| Descriminalização do porte | Direito a produzir óleo |
| Orientação educacional BudGanja | Parecer da Defensoria no caso concreto |

## Limites desta ficha

- Não redige HC nem recurso.  
- Não substitui a norma interna da Defensoria estadual/federal.  
- Não promete resultado judicial.  
- Remete a doutrina e âncoras actualizadas no [guia advogados](${L.advogados}).

## Status

**Aprovado — primeira inspeção-guia para Defensoria / acesso gratuito.** Espelho da seletividade para quem não compra advogado particular.

[▶ Guia HC — advogados](${L.advogados}) · [▶ Porte × Tráfico](${L.porte}) · [▶ Lei 11.343](${L.lei}) · [▶ Médicos](${L.medicos}) · [▶ Associações](${L.associacoes}) · [▶ Classificação legal](${L.guia}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **guide for Public Defender offices and free legal aid**: mirror of the lawyers’ HC selectivity guide — same thesis, focusing on remaining filters when counsel is free (medical reports, time, stigma).

> **Not legal advice. Not a pleading.**

## Status

**Approved — first Defensoria / free-access guide sheet.**
`;

  const contentEs = `## Alcance

Guía BudGanja para **Defensoría y acceso gratuito**: espejo de la guía HC para abogados — misma tesis, con foco en los filtros que quedan sin honorarios.

> **No es asesoría jurídica ni escrito procesal.**

## Estado

**Aprobado — primera ficha-guía Defensoría / acceso gratuito.**
`;

  return { body, contentEn, contentEs };
}

function buildGuiaDefensoriaAcessoPost() {
  const { body, contentEn, contentEs } = buildGuiaDefensoriaAcessoBodies();
  return palavraPost({
    title: 'Inspeção: Guia Defensoria e acesso gratuito — seletividade sem honorários',
    titleEn: 'Inspection: Public Defender & free-access guide — selectivity without fees',
    titleEs: 'Inspección: Guía Defensoría y acceso gratuito — selectividad sin honorarios',
    excerpt:
      'Guia para Defensoria e quem não tem advogado particular: mesmos filtros de HC/seletividade (laudo, tempo, tipificação porte×tráfico) sem o preço do particular. Não é parecer.',
    excerptEn:
      'Guide for Public Defenders and those without private counsel: same HC/selectivity filters without private fees. Not legal advice.',
    excerptEs:
      'Guía para Defensoría y quien no tiene abogado particular: mismos filtros de HC/selectividad sin honorarios. No es asesoría.',
    slug: 'inspecao-guia-defensoria-acesso',
    date: '2026-08-02T11:30:00.000Z',
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
      'Assistência jurídica gratuita do Estado — porta pública do HC/defesa; não apaga filtros de laudo, tempo e tipificação (porte×tráfico).',
    simpleEn:
      'State free legal aid — public door to HC/defense; does not erase report, time and charging filters.',
    simpleEs:
      'Asistencia jurídica gratuita del Estado — puerta pública al HC/defensa; no borra filtros de informe, tiempo y tipificación.',
    group: 'classificacao',
    fromTitle: false,
    href: '/posts/post-inspecao-guia-defensoria-acesso.html'
  },
  {
    id: 'acesso-gratuito-justica',
    word: 'Acesso gratuito à justiça',
    simple:
      'Caminho sem honorários particulares — necessário, mas insuficiente sozinho contra a seletividade do estatuto paciente.',
    simpleEn:
      'Path without private fees — necessary but not enough alone against patient-status selectivity.',
    simpleEs:
      'Camino sin honorarios particulares — necesario pero insuficiente solo frente a la selectividad del estatuto paciente.',
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
