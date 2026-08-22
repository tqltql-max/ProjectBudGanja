'use strict';

/**
 * Inspeção Neurociências · Cap. 1 — Endocanabinoidoma
 * Série: neurociencias — tipagem no hub via resolveInspecaoTipo() → 'neurociencia'.
 */

function neurocienciaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'neurociencias',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Neurociências',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

function buildEndocanabinoidomaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-neurociencias';
  const hubAll = '/biblioteca/inspecoes/';
  const sidarta = '/posts/post-inspecao-sidarta-ribeiro.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const albaugh = '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const meditacao = '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const cannabis = '/posts/post-inspecao-planta-cannabis-sativa.html';
  const fito = '/posts/post-pesquisa-fitocanabinoides.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://en.wikipedia.org/wiki/Endocannabinoid_system';

  const body = `## Escopo

Inspeção de ofício do **endocanabinoidoma** — o **sistema endocanabinóide** e a rede molecular que o lab lê quando fala em cérebro, plantas e cannabis. Abre a série **Neurociências** no hub: mapa de conceitos, elos com Legado/Artigos e limites educativos. Distinto do [guia meditação × endocanabinoidoma](${meditacao}) (prática) e do [artigo Albaugh](${albaugh}) (paper).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: síntese pública do [sistema endocanabinóide](${wiki}), formação [UNIFESP](${unifesp}), [Sidarta](${sidarta}), [Carlini](${carlini}). **Ficha ≠ aconselhamento médico nem protocolo clínico.**

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Endocanabinoidoma** / sistema endocanabinóide (ECS) |
| Tipo BudGanja | Neurociência — mapa de ofício |
| Série | Neurociências · Cap. 1 |
| Componentes-chave | Ligandos endógenos · receptores (CB1, CB2…) · enzimas de síntese/degradação |
| Elo planta | [Cannabis sativa](${cannabis}) · fitocanabinóides |
| Elo Legado | [Sidarta Ribeiro](${sidarta}) · [Elisaldo Carlini](${carlini}) |
| Elo Artigo | [Albaugh · neurodesenvolvimento](${albaugh}) |
| Elo prática | [Meditação × endocanabinoidoma](${meditacao}) |
| Fonte âncora | [Wikipedia · Endocannabinoid system](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a **rede fisiológica** que produz e responde a canabinóides endógenos — presente no cérebro e em vários tecidos. No lab: lente para ler evidência, não atalho para dose.

## 2. Por que esta série existe

| Distinção | Série / ficha | Ofício |
|-----------|---------------|--------|
| **Neurociências** | Esta série | Mapas de sistema e conceito |
| **Artigos** | Papers peer-reviewed | Auditoria paper a paper |
| **Legado** | Pessoas de referência | Biografia + mérito |
| **Guia / Palavras** | Prática ou léxico | Uso ou etimologia |

**H1:** o endocanabinoidoma é o núcleo científico natural da série Neurociências no BudGanja.  
**H2:** CB1 (SNC) e CB2 (imune/periferia) são âncoras úteis de leitura — sem esgotar o mapa.  
**H3:** ficha educativa ≠ prescrição.

## 3. Mapa mínimo (camadas)

| Camada | Leitura de ofício | Confiança |
|--------|-------------------|-----------|
| **Ligandos** | AEA (anandamida), 2-AG, outros | Alta (consenso amplo) |
| **Receptores** | CB1, CB2 (+ alvos em estudo) | Alta para CB1/CB2 |
| **Enzimas** | Síntese e degradação (FAAHs, MAGL…) | Alta (quadro geral) |
| **Funções discutidas** | Homeostase, dor, humor, apetite, memória… | Média–alta (contexto-dependente) |
| **Fitocanabinóides** | THC, CBD etc. interagem com a rede | Alta (existência); efeitos = caso a caso |
| **Adolescência / córtex** | Ver [Albaugh](${albaugh}) | Alta no paper; causalidade limitada |

## 4. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Sidarta Ribeiro](${sidarta}) | Neurociência pública · Revolução Canabinóide |
| [Elisaldo Carlini](${carlini}) | Psicofarmacologia · CEBRID |
| [Curso UNIFESP](${unifesp}) | Formação de extensão |
| [Elo de ligação](${eloLigacao}) | Analogia XIV ([aula 8](${aula8}), Kassia): o cruzamento da [lemniscata](${lemniscata}) é o elo — **não** prova clínica |
| [Em pé e deitado](${emPe}) | As duas posturas da mesma fita (*bodiado* → deitado); em pé = comunicação cima↔baixo |
| [Albaugh 2021](${albaugh}) | Cannabis na adolescência × RM |
| [Meditação × endocanabinoidoma](${meditacao}) | Ponte prática (não substitui este mapa) |
| [Cannabis sativa](${cannabis}) | Planta e fitocanabinóides |
| [Fitocanabinoides](${fito}) | Catálogo de ofício (CBGA → CBN; ácidos/neutros) |

## 5. Usos no laboratório

| Uso | Ofício | Anti-armadilha |
|-----|--------|----------------|
| **Ler paper** | Localizar ECS no desenho | Não inventar mecanismo |
| **Ler divulgação** | Separar evidência de hype | [Sidarta](${sidarta}) ≠ slogan |
| **Cultivo / planta** | Entender por que a planta importa ao cérebro | Cultivo ≠ clínica |
| **Fila editorial** | Novas fichas Neurociências | Cap. seguintes = temas focados |

**Finalidade-mãe:** nomear o **endocanabinoidoma** para **inspecionar neurociência com ofício** — mapa primeiro, dose nunca nesta ficha.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **ao ler o cérebro sem virar médico**, hoje |
| Anti-armadilha | «ECS explica tudo» = hype · «ECS é mapa útil» = ofício |
| Par vivo | [Sidarta](${sidarta}) · [Albaugh](${albaugh}) · [UNIFESP](${unifesp}) |

**Veredicto:** Valeu !!! **também ao mapear**. Neurociência no lab = curiosidade com limites.

## Hipóteses (síntese)

**H1:** objecto = endocanabinoidoma / ECS.  
**H2:** abre série Neurociências (Cap. 1).  
**H3:** elos = Legado · Artigos · Guia · Planta.  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é revisão sistemática.  
- Não é protocolo clínico.  
- Mecanismos em debate ficam marcados como tal.

## Status

**Aprovado** — Cap. 1 **Neurociências**: endocanabinoidoma fichado como mapa de ofício.

[▶ Neurociências](${hub}) · [▶ Sidarta](${sidarta}) · [▶ Albaugh](${albaugh}) · [▶ Todas](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Craft inspection of the **endocannabinoidome** / **endocannabinoid system** — Cap. 1 of the **Neuroscience** series. Map of concepts and BudGanja links; not clinical advice. Distinct from the [meditation guide](${meditacao}) and the [Albaugh paper](${albaugh}).

> Method note: [Endocannabinoid system](${wiki}). Not medical advice.

## 1. Object

| Field | Value |
|-------|-------|
| Object | Endocannabinoid system / endocannabinoidome |
| Series | Neuroscience · Cap. 1 |
| Links | [Sidarta](${sidarta}) · [Albaugh](${albaugh}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **when reading the brain without playing doctor**, today.

## Status

**Approved** — Cap. 1 Neuroscience · ECS map · [Valeu !!!](${mantra}).

[▶ Neuroscience](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de oficio del **endocannabinoidoma** / **sistema endocannabinoide** — Cap. 1 de la serie **Neurociencias**. Mapa de conceptos y vínculos BudGanja; no es consejo clínico. Distinto de la [guía de meditación](${meditacao}) y del [artículo Albaugh](${albaugh}).

> Nota: [Endocannabinoid system](${wiki}). No es consejo médico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Objeto | Sistema endocannabinoide / endocannabinoidoma |
| Serie | Neurociencias · Cap. 1 |
| Vínculos | [Sidarta](${sidarta}) · [Albaugh](${albaugh}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **al leer el cerebro sin jugar a médico**, hoy.

## Estado

**Aprobado** — Cap. 1 Neurociencias · mapa ECS · [¡Valeu !!!](${mantra}).

[▶ Neurociencias](${hub}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildEndocanabinoidomaNeurocienciaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEndocanabinoidomaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 1;
  return neurocienciaPost({
    title: 'Inspeção: Endocanabinoidoma — mapa neurocientífico do ofício',
    titleEn: 'Inspection: Endocannabinoidome — neuroscience craft map',
    titleEs: 'Inspección: Endocannabinoidoma — mapa neurocientífico del oficio',
    excerpt:
      'Neurociências Cap. 1: endocanabinoidoma / ECS — receptores, ligandos e elos com Sidarta, Carlini, Albaugh e UNIFESP. Ficha educativa, não clínica.',
    excerptEn:
      'Neuroscience Cap. 1: endocannabinoidome / ECS — receptors, ligands and links to Sidarta, Carlini, Albaugh and UNIFESP. Educational sheet, not clinical.',
    excerptEs:
      'Neurociencias Cap. 1: endocannabinoidoma / ECS — receptores, ligandos y vínculos con Sidarta, Carlini, Albaugh y UNIFESP. Ficha educativa, no clínica.',
    slug: 'inspecao-neurociencia-endocanabinoidoma',
    date: '2026-08-03T21:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Endocanabinoidoma · neurociência',
    coverImage: '/imagens/inspecoes/endocanabinoidoma-neurociencia-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  neurocienciaPost,
  buildEndocanabinoidomaNeurocienciaPost,
  buildEndocanabinoidomaBodies
};
