'use strict';

/**
 * Inspeção-guia: léxico «Da molécula ao lixo» — destaque e justificação das palavras novas.
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

const POST_HREF = '/posts/post-inspecao-guia-palavras-molecula-ao-lixo.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  pesquisa: '/posts/post-pesquisa-molecula-ao-lixo.html',
  pesquisas: '/biblioteca/pesquisas/',
  cobertura: '/posts/post-inspecao-guia-palavras-cobertura.html',
  leonard: '/posts/post-inspecao-arte-a-historia-das-coisas.html',
  annie: '/posts/post-inspecao-figura-annie-leonard.html',
  droga: '/posts/post-inspecao-palavra-droga.html',
  opioide: '/posts/post-inspecao-palavra-opioide-opiaceo.html',
  opio: '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html',
  derivados: '/biblioteca/inspecoes/#inspecoes-derivados',
  oms: '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html',
  hall: '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html'
};

function q(word) {
  return '/guia/palavras.html?q=' + encodeURIComponent(word);
}

function buildGuiaPalavrasMoleculaAoLixoPost() {
  const body = `## Escopo

Inspeção-guia do **lote léxico** acrescentado ao [Guia de Palavras](${L.guiaTec}) a partir da pesquisa [Da molécula ao lixo](${L.pesquisa}). Objecto: **destacar as 23 entradas novas**, justificar cada família semântica e amarrar o glossário ao mapa extrair→descartar.

> **Nota metodológica:** auditoria editorial BudGanja. **Não é parecer jurídico, ambiental nem aconselhamento clínico.** Indexar ≠ endossar tese política. Não afirma «controlo populacional» conspiratório. Complementa a [cobertura geral do Guia](${L.cobertura}) — aqui o foco é o **lote molécula→lixo**.

## Público e uso

| Campo | Valor |
|-------|-------|
| Objecto | 23 palavras técnicas (grupo [Técnico](${L.guiaTec})) |
| Âncora | [Pesquisa: Da molécula ao lixo](${L.pesquisa}) |
| Tipo BudGanja | Inspeção-guia — léxico × pesquisa |
| Hub | [Palavras](${L.hub}) · [Pesquisas](${L.pesquisas}) |
| Pergunta-guia | Por que estas palavras entraram no catálogo e como se organizam no mapa? |
| Data | 2026-08-02 |

## Tese central

Sem léxico partilhado, a pesquisa «molécula → lixo» vira panfleto. Cada entrada nova nomeia um **nó verificável** da cadeia (preço omitido, fabrico, uso, descarte, desigualdade) — para o laboratório **inspecionar**, não para acusar um comité secreto.

## Destaque: as 23 palavras (lote)

| # | Palavra | Papel no mapa |
|---|---------|---------------|
| 1 | [Externalidade](${q('Externalidade')}) | Custo fora do preço — **conceito-mãe** do lote |
| 2 | [Fármaco](${q('Fármaco')}) | Polo terapêutico industrial (≠ só [droga](${L.droga}) popular) |
| 3 | [Commodity](${q('Commodity')}) | Bem escalável — planta/açúcar deixa de ser só organismo |
| 4 | [Cadeia linear](${q('Cadeia linear')}) | Extrair→fabricar→vender→descartar ([Leonard](${L.leonard})) |
| 5 | [Economia dos materiais](${q('Economia dos materiais')}) | Leitura física do fluxo (minério → lixo) |
| 6 | [Medicalização](${q('Medicalização')}) | Motor do exagero de oferta terapêutica |
| 7 | [Ultraprocessado](${q('Ultraprocessado')}) | Caso-âncora alimentar ([Hall](${L.hall}) / [OMS](${L.oms})) |
| 8 | [Desperdício](${q('Desperdício')}) | Mecanismo gémeo do exagero |
| 9 | [Matéria-prima](${q('Matéria-prima')}) | Início da cadeia (planta, animal, minério, petróleo) |
| 10 | [Princípio activo](${q('Princípio activo')}) | Molécula do fabrico farmacêutico |
| 11 | [Excipiente](${q('Excipiente')}) | Auxiliar da fórmula — também vira resíduo |
| 12 | [Efluente](${q('Efluente')}) | Externalidade típica da síntese/fábrica |
| 13 | [Iatrogenia](${q('Iatrogenia')}) | Dano no estágio «uso» |
| 14 | [Farmacovigilância](${q('Farmacovigilância')}) | Literacia de segurança pós-uso |
| 15 | [Resíduo farmacêutico](${q('Resíduo farmacêutico')}) | Sobras/metabolitos/embalagens no ambiente |
| 16 | [Microplástico](${q('Microplástico')}) | Persistência do descarte plástico |
| 17 | [Blister](${q('Blister')}) | Embalagem concreta fármaco↔lixo |
| 18 | [Descarte](${q('Descarte')}) | Último estágio da cadeia linear |
| 19 | [Patente](${q('Patente')}) | Concentração de valor no pólo industrial |
| 20 | [Monocultura](${q('Monocultura')}) | Externalidade da extracção/cultivo |
| 21 | [Desigualdade territorial](${q('Desigualdade territorial')}) | Quem lucra vs quem absorve o dano |
| 22 | [Carga de doença](${q('Carga de doença')}) | Limite prudente («adoece» ≠ homicídio) |
| 23 | [Ópio](${q('Ópio')}) | Fronteira cultura/medicina ([opioide](${L.opioide}) · [Tosches](${L.opio})) |

## Justificação por família

### 1. Conceitos-mãe (por que o lote existe)

| Palavra | Justificação |
|---------|----------------|
| **Externalidade** | Sem esta palavra, resíduos e doença parecem «acidente»; com ela, o lab nomeia o **deslocamento de custo**. |
| **Cadeia linear** | Traduz [A História das Coisas](${L.leonard}) para fármacos/derivados — eixo operacional da pesquisa. |
| **Economia dos materiais** | Impede reduzir o tema a moralismo: o objecto é **fluxo físico**. |
| **Commodity** | Explica quando planta ou açúcar viram mercadoria escalável ([Derivados](${L.derivados})). |
| **Fármaco** | Distingue o pólo industrial terapêutico de [droga](${L.droga}) no senso comum — sem colapsar os dois. |

### 2. Exagero e oferta (por que «mais» adoece)

| Palavra | Justificação |
|---------|----------------|
| **Medicalização** | Nomeia a expansão do domínio farmacêutico sobre o quotidiano — motor do exagero. |
| **Ultraprocessado** | Caso documental (não conspiração) de commodity alimentar com [Hall](${L.hall}) / [OMS](${L.oms}). |
| **Desperdício** | Gémeo do exagero: produção/uso além da necessidade. |
| **Carga de doença** | Mantém o tom prudente: dano populacional medido ≠ plano genocida. |

### 3. Fabrico e uso (molécula na fábrica e no corpo)

| Palavra | Justificação |
|---------|----------------|
| **Matéria-prima** | Âncora do estágio 1 — plantas/animais/minérios no início. |
| **Princípio activo** · **Excipiente** | Separam o que «cura» do que só formula — ambos entram no rasto. |
| **Efluente** | Externalidade clássica da síntese, antes do consumidor ver a caixa. |
| **Iatrogenia** · **Farmacovigilância** | Nomeiam risco e monitorização no estágio uso — literacia, não panfleto. |
| **Ópio** | Caso-âncora cultural da fronteira fármaco/droga ([Última Casa de Ópio](${L.opio})). |

### 4. Descarte e desigualdade (quem paga o fim da cadeia)

| Palavra | Justificação |
|---------|----------------|
| **Descarte** | Fecha o ciclo Leonard — sem ele o mapa para no marketing. |
| **Resíduo farmacêutico** · **Blister** · **Microplástico** | Tornam o lixo **concreto** (água, embalagem, persistência). |
| **Patente** | Explica concentração de valor no pólo que lucra. |
| **Monocultura** | Dano ecológico na extracção — plantas/habitats no inventário. |
| **Desigualdade territorial** | Nomeia o dilema ético (lucro vs território) **sem** teoria da conspiração. |

## O que o lote **não** faz

- Não substitui fichas profundas palavra-a-palavra (como [Droga](${L.droga})) — é **índice justificado**.  
- Não actualiza a contagem histórica da [cobertura 139](${L.cobertura}) — o Guia cresceu; esta ficha documenta o **incremento**.  
- Não afirma intenção genocida nem «controlo populacional» planeado.

## Rede BudGanja

| Camada | Elo |
|--------|-----|
| Pesquisa-mãe | [Da molécula ao lixo](${L.pesquisa}) |
| Glossário | [Grupo Técnico](${L.guiaTec}) |
| Cultura do mapa | [História das Coisas](${L.leonard}) · [Annie Leonard](${L.annie}) |
| Léxico irmão | [Droga](${L.droga}) · [Opioide × opiáceo](${L.opioide}) |
| Cobertura | [Guia — cobertura](${L.cobertura}) |
| Hub | [Palavras](${L.hub}) · [Pesquisas](${L.pesquisas}) |

## Status

**Aprovado — inspeção-guia do lote léxico molécula→lixo (23 entradas).** Cada palavra do destaque liga ao Guia; a tese completa está na [pesquisa](${L.pesquisa}).

[▶ Pesquisa](${L.pesquisa}) · [▶ Guia Técnico](${L.guiaTec}) · [▶ Hub Palavras](${L.hub})
`;

  const contentEn = `## Scope

Guide inspection of the **23 glossary entries** added from [From molecule to waste](${L.pesquisa}). Highlights and justifies the batch on the extract→discard map.

> **Method note:** editorial audit. Not legal/clinical advice. No conspiracy claim. Complements [guide coverage](${L.cobertura}).

## Thesis

Without shared lexicon the research becomes a pamphlet. Each new entry names a **verifiable node** (externality, manufacture, use, disposal, inequality).

## Highlight table

See the Portuguese body for the full 23-word table with Guia links. Families: mother concepts · excess/supply · manufacture/use · disposal/inequality.

## Status

**Approved — molecule→waste lexicon batch guide.**
`;

  const contentEs = `## Alcance

Inspección-guía del **lote de 23 entradas** añadidas desde [De la molécula a la basura](${L.pesquisa}). Destaca y justifica el léxico en el mapa extraer→desechar.

> **Nota metodológica:** auditoría editorial. No es consejo clínico/jurídico. No afirma conspiración. Complementa la [cobertura del Guía](${L.cobertura}).

## Tesis

Sin léxico compartido la investigación vira panfleto. Cada entrada nombra un **nodo verificable**.

## Destacado

Ver el cuerpo en portugués: tabla de 23 palabras y justificación por familias.

## Estado

**Aprobado — guía del lote léxico molécula→basura.**
`;

  return palavraPost({
    title: 'Inspeção: Guia palavras — léxico «Da molécula ao lixo» (destaque e justificação)',
    titleEn: 'Inspection: Words Guide — «From molecule to waste» lexicon (highlight & justification)',
    titleEs: 'Inspección: Guía de palabras — léxico «De la molécula a la basura» (destacado y justificación)',
    excerpt:
      'As 23 palavras novas do Guia ligadas à pesquisa molécula→lixo: destaque, famílias semânticas e por que cada uma entra no catálogo.',
    excerptEn:
      'The 23 new Words Guide entries from molecule→waste research: highlights, semantic families and why each term is catalogued.',
    excerptEs:
      'Las 23 palabras nuevas de la Guía ligadas a molécula→basura: destacado, familias semánticas y por qué entran al catálogo.',
    slug: 'inspecao-guia-palavras-molecula-ao-lixo',
    date: '2026-08-02T13:00:00.000Z',
    coverImage: 'imagens/pesquisas/molecula-ao-lixo-cover.jpg',
    seriesOrder: 46,
    seriesLabel: 'Guia · léxico molécula→lixo',
    sourceUrl: 'https://inspetorbudganja.com.br/guia/palavras.html?group=tecnico',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGuiaPalavrasMoleculaAoLixoPost,
  POST_HREF
};
