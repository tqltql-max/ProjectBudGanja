'use strict';

/**
 * Inspeção-guia: receitas de ofício com plantas do catálogo.
 * Complementa o manual de preparo de chá — não é bula.
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

const POST_HREF = '/posts/post-inspecao-guia-receitas-plantas.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  plantas: '/plantas/',
  planta: '/posts/post-inspecao-palavra-planta.html',
  cha: '/posts/post-inspecao-guia-preparo-cha-plantas.html',
  farmacia: '/posts/post-inspecao-guia-farmacia-viva.html',
  cultivo: '/cultivo/',
  faca: '/posts/post-inspecao-expressao-faca-o-melhor.html',
  vida: '/vida/',
  objetos: '/posts/post-inspecao-palavra-objetos.html',
  camomila: '/plantas/camomila/',
  hortela: '/plantas/hortela/',
  melissa: '/plantas/melissa/',
  capim: '/plantas/capim-limao/',
  cidreira: '/plantas/erva-cidreira/',
  alecrim: '/plantas/alecrim/',
  gengibre: '/plantas/gengibre/',
  maracuja: '/plantas/maracuja/',
  cannabis: '/plantas/cannabis-sativa/'
};

function buildBodies() {
  const inspected = '2026-08-03';

  const body = `## Escopo

Guia BudGanja de **receitas de ofício** com plantas do catálogo — lote inicial de **chás / tisanas** caseiras. Complementa o [manual de preparo](${L.cha}) (infusão · decoção · segurança). Cada receita aponta a ficha em [Plantas](${L.plantas}).

> **Nota metodológica (ler primeiro):** **não é bula, não é protocolo clínico, não substitui médico nem Farmácia Viva.** Medidas são **de partida** (ofício de cozinha/horta). Identificar a [planta](${L.planta}) com certeza. Cannabis e espécies de risco **fora** deste lote. Tom: [Faça o melhor!](${L.faca}) — o melhor possível **nesta receita**, hoje.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Quintal, cozinha, leitores do hub Plantas |
| Tipo BudGanja | Inspeção-guia — receitas de ofício |
| Pré-requisito | [Preparar chá de plantas](${L.cha}) |
| Grupo Guia | [Técnico](${L.guiaTec}) |
| Pergunta-guia | Que receitas simples ligam o catálogo ao copo, com medida e aviso? |
| Data | ${inspected} |

## Como ler cada receita

| Campo | Significado |
|-------|-------------|
| **Planta** | Elo obrigatório à ficha — ler contra-indicações lá |
| **Parte** | O que vai na água |
| **Modo** | Infusão ou decoção ([manual](${L.cha})) |
| **Medida** | Partida para ~150–200 ml (1 chávena) |
| **Tempo** | Tipicamente tampado |
| **Aviso** | Limite curto — não substitui a ficha |

**H1:** receita sem ficha da espécie = incompleta.  
**H2:** uma planta de cada vez no início ([objetos](${L.objetos}) com foco).  
**H3:** se houver dúvida clínica → profissional, não o Inspetor.

---

## R1 · Camomila — infusão floral

| Campo | Valor |
|-------|-------|
| Planta | [Camomila](${L.camomila}) (*Matricaria chamomilla*) |
| Parte | Capítulos florais secos |
| Modo | **Infusão** |
| Medida | 1 colher de chá rasa (~1–2 g) / 150–200 ml |
| Tempo | 5–8 min tampado |
| Aviso | Alergia a Asteraceae; gestação → orientação |

**Passos:** água fervida fora do fogo → flores → tapar → coar.

---

## R2 · Hortelã — infusão digestiva de ofício

| Campo | Valor |
|-------|-------|
| Planta | [Hortelã](${L.hortela}) (*Mentha spicata* / afins) |
| Parte | Folhas frescas ou secas |
| Modo | **Infusão** |
| Medida | Seca: 1 c. chá; fresca: 1–2 c. sopa picada / chávena |
| Tempo | 5–10 min tampado |
| Aviso | Confirmar espécie; refluxo forte → cuidado |

**Passos:** como R1; folhas frescas lavar bem.

---

## R3 · Melissa — infusão calmante leve

| Campo | Valor |
|-------|-------|
| Planta | [Melissa](${L.melissa}) (*Melissa officinalis*) |
| Parte | Folhas |
| Modo | **Infusão** |
| Medida | 1 c. chá seca / chávena |
| Tempo | 8–12 min tampado |
| Aviso | Hipotireoidismo / medicação → perguntar profissional |

---

## R4 · Capim-limão — infusão cítrica

| Campo | Valor |
|-------|-------|
| Planta | [Capim-limão](${L.capim}) (*Cymbopogon citratus*) |
| Parte | Folhas (picadas) |
| Modo | **Infusão** (ou fervura curta 2–3 min se folhas fibrosas) |
| Medida | 1–2 c. sopa fresca / chávena |
| Tempo | 8–12 min |
| Aviso | Uso culinário clássico; dose «de pote» sem exagero |

---

## R5 · Erva-cidreira — infusão BR

| Campo | Valor |
|-------|-------|
| Planta | [Erva-cidreira](${L.cidreira}) (*Lippia alba*) |
| Parte | Folhas |
| Modo | **Infusão** |
| Medida | 1 c. chá seca ou 1 c. sopa fresca / chávena |
| Tempo | 8–12 min tampado |
| Aviso | Quimiotipos variam — cheiro/sabor mudam; ler ficha |

---

## R6 · Alecrim — infusão curta / culinária

| Campo | Valor |
|-------|-------|
| Planta | [Alecrim](${L.alecrim}) (*Salvia rosmarinus*) |
| Parte | Folhas / raminhos |
| Modo | **Infusão curta** |
| Medida | ½–1 c. chá seca / chávena (amargo se longo) |
| Tempo | 5–8 min |
| Aviso | Epilepsia / gestação / dose alta → orientação; preferir culinária leve |

---

## R7 · Gengibre — decoção do rizoma

| Campo | Valor |
|-------|-------|
| Planta | [Gengibre](${L.gengibre}) (*Zingiber officinale*) |
| Parte | Rizoma fresco (finas fatias) ou seco |
| Modo | **Decocção** suave |
| Medida | ~3–5 g fresco (~2–3 fatias) / 250 ml |
| Tempo | 10–15 min em fervura baixa |
| Aviso | Azia / anticoagulantes → cuidado; ler ficha |

**Passos:** rizoma + água fria → fervura suave → coar. Opcional: limão depois de morno.

---

## R8 · Maracujá — infusão das partes aéreas

| Campo | Valor |
|-------|-------|
| Planta | [Maracujá](${L.maracuja}) (*Passiflora* — ver ficha) |
| Parte | Folhas / partes aéreas (conforme ficha; **não** confundir só com o fruto) |
| Modo | **Infusão** |
| Medida | 1 c. chá seca / chávena |
| Tempo | 8–12 min tampado |
| Aviso | Sedação / interação com calmantes → profissional; ler ficha da espécie |

---

## Fora deste lote (de propósito)

| Tema | Porquê |
|------|--------|
| [Cannabis](${L.cannabis}) | Marco legal + risco — não é «receita livre» |
| Guaco, mulungu, etc. | Exigem ficha e cuidado — não misturar com chá de mesa |
| Misturas de 4+ plantas | No início: **uma de cada vez** |

## Rede

| Camada | Elo |
|--------|-----|
| Preparo | [Chá de plantas](${L.cha}) |
| Catálogo | [Plantas](${L.plantas}) · [planta](${L.planta}) |
| Política | [Farmácia Viva](${L.farmacia}) |
| Foco | [Objetos](${L.objetos}) |
| Mantra | [Faça o melhor!](${L.faca}) · [Vida](${L.vida}) · [Cultivo](${L.cultivo}) |

## Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${L.faca}) — medir, tapar, coar, ler a ficha |
| Anti-armadilha | «Receita da internet sem nome científico» = falso ofício |
| Expansão | Novas receitas entram só com ficha no hub |

**Veredicto:** receitas boas são **planta certa + modo certo + medida + aviso**. Este lote é porta de entrada — não farmácia.

## Status

**Aprovado** — guia de receitas (lote 1: 8 tisanas) · elo [chá](${L.cha}) · [Plantas](${L.plantas}) · [Faça o melhor!](${L.faca}).

[▶ Chá / preparo](${L.cha}) · [▶ Plantas](${L.plantas}) · [▶ Faça o melhor!](${L.faca}) · [▶ Guia técnico](${L.guiaTec}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja **craft recipes** guide — initial batch of home herbal teas. Complements the [prep manual](${L.cha}). Each recipe links to [Plantas](${L.plantas}).

> **Not a medical protocol.** Start measures only. Cannabis and high-risk species out of this batch. [Do your best!](${L.faca}).

## Batch (8)

1. [Camomila](${L.camomila}) — flower infusion 5–8 min  
2. [Hortelã](${L.hortela}) — leaf infusion 5–10 min  
3. [Melissa](${L.melissa}) — leaf infusion 8–12 min  
4. [Capim-limão](${L.capim}) — leaf infusion  
5. [Erva-cidreira](${L.cidreira}) — leaf infusion  
6. [Alecrim](${L.alecrim}) — short infusion 5–8 min  
7. [Gengibre](${L.gengibre}) — rhizome decoction 10–15 min  
8. [Maracujá](${L.maracuja}) — aerial parts infusion — read species sheet  

## Status

**Approved** — recipe guide lote 1.

[▶ Prep tea](${L.cha}) · [▶ Plants](${L.plantas}) · [▶ Do your best!](${L.faca})
`;

  const contentEs = `## Alcance

Guía BudGanja de **recetas de oficio** — lote inicial de tisanas. Complementa el [manual de preparación](${L.cha}). Cada receta enlaza [Plantas](${L.plantas}).

> **No es protocolo clínico.** Medidas de partida. Cannabis y especies de riesgo fuera. [¡Haz lo mejor!](${L.faca}).

## Lote (8)

1. [Camomila](${L.camomila}) — infusión floral 5–8 min  
2. [Hortelã](${L.hortela}) — infusión de hojas 5–10 min  
3. [Melissa](${L.melissa}) — infusión 8–12 min  
4. [Capim-limão](${L.capim}) — infusión  
5. [Erva-cidreira](${L.cidreira}) — infusión  
6. [Alecrim](${L.alecrim}) — infusión corta 5–8 min  
7. [Gengibre](${L.gengibre}) — decocción del rizoma 10–15 min  
8. [Maracujá](${L.maracuja}) — infusión partes aéreas — leer ficha  

## Estado

**Aprobado** — guía de recetas lote 1.

[▶ Preparación](${L.cha}) · [▶ Plantas](${L.plantas}) · [▶ ¡Haz lo mejor!](${L.faca})
`;

  return { body, contentEn, contentEs };
}

function buildGuiaReceitasPlantasPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildBodies();
  return palavraPost({
    title: 'Inspeção: Guia — receitas de plantas (lote 1 · tisanas)',
    titleEn: 'Inspection: Guide — plant recipes (batch 1 · herbal teas)',
    titleEs: 'Inspección: Guía — recetas de plantas (lote 1 · tisanas)',
    excerpt:
      'Oito receitas de ofício (camomila, hortelã, melissa, capim-limão, erva-cidreira, alecrim, gengibre, maracujá); elo ao manual de chá; Faça o melhor!',
    excerptEn:
      'Eight craft recipes (chamomile, mint, lemon balm, lemongrass, cidreira, rosemary, ginger, passionflower); links tea manual; Do your best!',
    excerptEs:
      'Ocho recetas de oficio (manzanilla, menta, melisa, limoncillo, cidreira, romero, jengibre, maracuyá); vínculo al manual de té; ¡Haz lo mejor!',
    slug: 'inspecao-guia-receitas-plantas',
    date: '2026-08-03T17:40:00.000Z',
    coverImage: '/imagens/inspecoes/receitas-plantas-cover.jpg',
    seriesOrder: seriesOrder,
    seriesLabel: 'Guia · receitas de plantas · lote 1',
    sourceUrl: L.plantas,
    body,
    contentEn,
    contentEs
  });
}

const GUIA_RECEITAS_PLANTAS_ITEMS = [
  {
    id: 'receitas-plantas',
    word: 'receitas de plantas',
    simple:
      'Guia BudGanja lote 1: oito tisanas de ofício com elos ao catálogo Plantas e ao manual de chá.',
    simpleEn:
      'BudGanja guide batch 1: eight craft herbal teas linked to the Plants catalog and tea manual.',
    simpleEs:
      'Guía BudGanja lote 1: ocho tisanas de oficio con vínculos al catálogo Plantas y al manual de té.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'tisana-receita',
    word: 'tisana (receita)',
    simple:
      'Receita de chá de plantas no guia de receitas — medida, tempo e aviso; ver também manual de preparo.',
    simpleEn:
      'Herbal-tea recipe in the recipes guide — measure, time and caution; see also the prep manual.',
    simpleEs:
      'Receta de tisana en la guía de recetas — medida, tiempo y aviso; ver también el manual de preparación.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaReceitasPlantasPost,
  GUIA_RECEITAS_PLANTAS_ITEMS,
  POST_HREF
};
