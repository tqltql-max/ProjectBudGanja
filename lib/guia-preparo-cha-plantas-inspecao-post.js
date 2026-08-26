'use strict';

/**
 * Inspeção-guia / manual: preparar chá de plantas (infusão, decoção, segurança).
 * Ofício caseiro + literacia — não é bula nem protocolo clínico.
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

const POST_HREF = '/posts/post-inspecao-guia-preparo-cha-plantas.html';
const L = {
  guiaTec: '/guia/palavras.html?group=tecnico',
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  plantas: '/plantas/',
  planta: '/posts/post-inspecao-palavra-planta.html',
  farmacia: '/posts/post-inspecao-guia-farmacia-viva.html',
  cultivo: '/cultivo/',
  faca: '/posts/post-inspecao-palavra-valeu.html',
  vida: '/vida/',
  camomila: '/plantas/camomila/',
  hortela: '/plantas/hortela/',
  melissa: '/plantas/melissa/',
  capim: '/plantas/capim-limao/',
  cidreira: '/plantas/erva-cidreira/',
  alecrim: '/plantas/alecrim/',
  guaco: '/plantas/guaco/',
  mulungu: '/plantas/mulungu/',
  maracuja: '/plantas/maracuja/',
  cannabis: '/plantas/cannabis-sativa/',
  daninha: '/posts/post-inspecao-palavra-daninha.html'
};

function buildBodies() {
  const inspected = '2026-08-03';

  const body = `## Escopo

Manual BudGanja de **como preparar chá de plantas** em casa: **infusão**, **decoção**, proporções de ofício, higiene e limites de segurança. Serve quem [cultiva](${L.cultivo}) ou usa o catálogo [Plantas](${L.plantas}) — sem virar receita médica.

> **Nota metodológica (ler primeiro):** auditoria de ofício caseiro. **Não é bula, não substitui médico, farmacêutico nem orientação de Farmácia Viva.** Identificar a [planta](${L.planta}) com certeza; dose e espécie mudam o risco. Cannabis e plantas com alcaloides fortes **não** entram neste manual como «chá livre». Tom: [Valeu !!!](${L.faca}) — o melhor possível **neste copo**, hoje.

## Público e uso

| Campo | Valor |
|-------|-------|
| Público | Cultivadores caseiros, leitores do hub Plantas, ofício de chá culinário / tradicional |
| Tipo BudGanja | Inspeção-guia — manual de preparo |
| Grupo Guia | [Técnico](${L.guiaTec}) |
| Elo vivo | [Plantas](${L.plantas}) · [planta](${L.planta}) · [Farmácia Viva](${L.farmacia}) |
| Pergunta-guia | Como preparar chá com ofício: água, tempo, parte da planta e cuidado? |
| Data | ${inspected} |

## 1. Três modos (mapa rápido)

| Modo | Quando usar | Água | Tempo típico (ofício) |
|------|-------------|------|------------------------|
| **Infusão** | Folhas, flores, partes tenras | Quente (já fervida, fora do fogo) | 5–15 min tampado |
| **Decocção** | Raízes, cascas, sementes duras, rizomas | Em ebulição suave | 10–20 min (às vezes mais) |
| **Maceração** | Extrair a frio / evitar calor forte | Fria ou morna | Horas (ex.: noite) |

**Tisana** no lab = chá de plantas (infusão ou decoção caseira), sem confundir com chá preto de *Camellia sinensis*.

**H1:** o modo segue a **parte** e a **dureza** do vegetal, não o gosto.  
**H2:** tempo a mais ≠ sempre «mais forte» — pode amargar ou degradar aroma.  
**H3:** planta errada ou dose «de ouvido» é o maior risco — não o formato da xícara.

## 2. Material

| Item | Nota |
|------|------|
| Água potável | Preferir filtrada / boa qualidade |
| Recipiente | Louça, vidro ou aço inox; evitar alumínio reactivo com ácidos/taninos |
| Tampa | Essencial na infusão (guarda voláteis) |
| Coador / filtro | Tecido limpo, filtro de papel ou peneira |
| Balança ou colher | Medir; anotar o que funcionou |
| Planta seca ou fresca | Seca: mais estável; fresca: lavar bem, usar logo |

## 3. Infusão — passo a passo

Para **folhas e flores** (ex.: [camomila](${L.camomila}), [hortelã](${L.hortela}), [melissa](${L.melissa}), [capim-limão](${L.capim}), [erva-cidreira](${L.cidreira}), [alecrim](${L.alecrim}) em quantidade culinária).

1. **Identificar** a planta (nome popular + científico quando possível) e a parte usada.  
2. **Medir** (ofício caseiro de partida):  
   - seca: **1 colher de chá rasa (~1–2 g)** por **150–200 ml** de água; ou  
   - fresca: **1–2 colheres de sopa** picada por chávena (ajustar ao aroma).  
3. Ferver a água; **desligar o fogo**.  
4. Deitar a água quente sobre a planta no recipiente.  
5. **Tapar** 5–15 min (flores delicadas ~5–8; folhas aromáticas ~8–12).  
6. Coar. Beber morno; adoçar só se fizer sentido para ti (mel após arrefecer um pouco).  
7. **Não guardar** horas a fio à temperatura ambiente — preparar o que vais beber.

## 4. Decocção — passo a passo

Para **partes duras** (raízes, cascas, sementes resistentes). No catálogo BudGanja, várias fichas citam decocto tradicional — **sempre ler a ficha da espécie** (ex.: [mulungu](${L.mulungu}) exige cuidado; não é «chá de mesa»).

1. Identificar planta e parte; confirmar se o uso em chá/decocto é o da tradição **e** se a ficha não contra-indica.  
2. Partir / esmagar levemente para aumentar superfície.  
3. Medida de partida (seca): **1 colher de sopa (~3–5 g)** por **250 ml** de água (ajustar pela ficha / ofício).  
4. Pôr planta + água fria na panela; levar a **fervura suave**.  
5. Manter em ebulição baixa **10–20 min** (tampado parcial evita evaporar tudo).  
6. Coar. Volume final ≈ uma chávena se evaporou — completar com água quente se necessário.  
7. Descartar o bagaço; não reutilizar material já fervido sem critério.

## 5. Fresca × seca

| Forma | Ofício |
|-------|--------|
| **Seca** | Mais concentrada por peso; guardar em pote opaco, seco, fresco |
| **Fresca** | Mais água no tecido → usar volume maior; lavar; evitar folhas com agroquímico residual |
| **Horta** | Colher de manhã após orvalho secar; não misturar com [daninha](${L.daninha}) sem saber o nome |

## 6. Segurança (checklist)

| Regra | Porquê |
|-------|--------|
| Nome certo da planta | Parecidos matam o ofício |
| Uma planta de cada vez (no início) | Saber o que fez efeito / mal |
| Gestantes, crianças, doentes crónicos | Pedir orientação profissional |
| Plantas com alcaloides / toxicidade | Fora do «chá livre» — ler ficha ([guaco](${L.guaco}), [mulungu](${L.mulungu}), etc.) |
| Interacções | Chá também é química — médico/farmacêutico |
| Mofo / cheiro estranho | Descartar |
| Cannabis | Ver ficha [Cannabis sativa](${L.cannabis}) + marco legal; **este manual não ensina chá de cannabis medicinal** |
| Farmácia Viva | Política e cadeia pública: [guia](${L.farmacia}) — distinto do chá caseiro |

## 7. Exemplos no catálogo (só entrada — ler a ficha)

| Planta | Modo habitual de ofício | Elo |
|--------|-------------------------|-----|
| Camomila | Infusão de capítulos florais | [camomila](${L.camomila}) |
| Hortelã | Infusão de folhas | [hortelã](${L.hortela}) |
| Melissa / erva-cidreira | Infusão de folhas | [melissa](${L.melissa}) · [erva-cidreira](${L.cidreira}) |
| Capim-limão | Infusão de folhas | [capim-limão](${L.capim}) |
| Alecrim | Infusão curta / culinária | [alecrim](${L.alecrim}) |
| Maracujá | Infusão (parte indicada na ficha) | [maracujá](${L.maracuja}) |

## 8. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${L.faca}) — medir, tapar, coar, respeitar a planta |
| Hub | [Plantas](${L.plantas}) · [Cultivo](${L.cultivo}) · [Vida](${L.vida}) |
| Anti-armadilha | «Se é natural, não faz mal» = falso · «identifiquei, medi, li a ficha» = ofício |

**Veredicto:** chá bom é **planta certa + modo certo + medida + higiene**. Infusão para o tenro; decoção para o duro; dúvida clínica → profissional, não o Inspetor.

## Hipóteses (síntese)

**H1:** modo = parte da planta.  
**H2:** tampas e tempos curtos preservam aroma; fervura longa serve dureza.  
**H3:** segurança > intensidade.  
**H4:** fecho = [Valeu !!!](${L.faca}) · rede [Plantas](${L.plantas}).

## Limites

- Não é dosagem terapêutica padronizada.  
- Não cobre extratos alcoólicos, óleos nem encapsulados.  
- Não é manual de cannabis medicinal.  
- Fichas de espécie prevalecem sobre este guia geral.

## Status

**Aprovado** — manual de preparo de chá de plantas: infusão · decoção · segurança · elos Plantas / Farmácia Viva / [Valeu !!!](${L.faca}).

[▶ Plantas](${L.plantas}) · [▶ Planta](${L.planta}) · [▶ Farmácia Viva](${L.farmacia}) · [▶ Valeu !!!](${L.faca}) · [▶ Guia técnico](${L.guiaTec}) · [▶ Hub](${L.hub})
`;

  const contentEn = `## Scope

BudGanja home manual for **plant tea**: **infusion**, **decoction**, craft ratios, hygiene and safety. Links to [Plantas](${L.plantas}). **Not a medical protocol.**

> Identify the plant; cannabis and strong alkaloids are **out of scope** as free tea. [Valeu !!!](${L.faca}).

## Modes

| Mode | Use for | Typical time |
|------|---------|--------------|
| **Infusion** | Leaves, flowers | Hot water off boil, 5–15 min covered |
| **Decoction** | Roots, bark, hard seeds | Gentle boil 10–20 min |
| **Maceration** | Cold extract | Hours |

## Infusion (short)

1. ID plant + part. 2. Dry: ~1 tsp / 150–200 ml. 3. Pour boiled water off heat. 4. Cover 5–15 min. 5. Strain. Drink soon.

## Decoction (short)

1. ID plant. 2. Crush lightly. 3. Cold water + plant → gentle boil 10–20 min. 4. Strain. Read species sheet first.

## Safety

Correct ID · one plant at a time when learning · pregnancy/children/chronic illness → professional · mold out · not a cannabis medical tea guide · [Living Pharmacy](${L.farmacia}) is public policy, not this kitchen cup.

## Status

**Approved** — plant-tea prep guide.

[▶ Plants](${L.plantas}) · [▶ Valeu !!!](${L.faca})
`;

  const contentEs = `## Alcance

Manual BudGanja de **té / tisana de plantas**: **infusión**, **decocción**, proporciones de oficio, higiene y seguridad. Vínculo [Plantas](${L.plantas}). **No es protocolo clínico.**

> Identificar la planta; cannabis y alcaloides fuertes **fuera** del «té libre». [¡Valeu !!!](${L.faca}).

## Modos

| Modo | Uso | Tiempo típico |
|------|-----|---------------|
| **Infusión** | Hojas, flores | Agua caliente (fuera del fuego), 5–15 min tapado |
| **Decocción** | Raíces, cortezas, semillas duras | Hervor suave 10–20 min |
| **Maceración** | Extracción en frío | Horas |

## Infusión (corto)

1. Identificar. 2. Seca: ~1 cucharadita / 150–200 ml. 3. Agua hirviendo fuera del fuego. 4. Tapar 5–15 min. 5. Colar.

## Decocción (corto)

1. Identificar. 2. Triturar. 3. Agua fría + planta → hervor suave 10–20 min. 4. Colar. Leer ficha de especie.

## Seguridad

Nombre correcto · una planta al inicio · embarazo/niños/enfermedades → profesional · moho fuera · no es guía de té medicinal de cannabis · [Farmacia Viva](${L.farmacia}) ≠ taza casera.

## Estado

**Aprobado** — manual de preparación de tisana.

[▶ Plantas](${L.plantas}) · [▶ ¡Valeu !!!](${L.faca})
`;

  return { body, contentEn, contentEs };
}

function buildGuiaPreparoChaPlantasPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildBodies();
  return palavraPost({
    title: 'Inspeção: Guia — preparar chá de plantas (infusão e decoção)',
    titleEn: 'Inspection: Guide — preparing plant tea (infusion and decoction)',
    titleEs: 'Inspección: Guía — preparar tisana de plantas (infusión y decocción)',
    excerpt:
      'Manual: infusão e decoção caseiras — material, tempos, proporções de ofício, segurança e elos com Plantas; Valeu !!!',
    excerptEn:
      'Manual: home infusion and decoction — gear, times, craft ratios, safety, links to Plants; Valeu !!!',
    excerptEs:
      'Manual: infusión y decocción caseras — material, tiempos, proporciones, seguridad y vínculos con Plantas; ¡Valeu !!!',
    slug: 'inspecao-guia-preparo-cha-plantas',
    date: '2026-08-03T16:30:00.000Z',
    coverImage: '/imagens/inspecoes/cha-plantas-cover.jpg',
    seriesOrder: seriesOrder,
    seriesLabel: 'Guia · chá de plantas · preparo',
    sourceUrl: L.plantas,
    body,
    contentEn,
    contentEs
  });
}

const GUIA_PREPARO_CHA_PLANTAS_ITEMS = [
  {
    id: 'cha-plantas',
    word: 'chá de plantas',
    simple:
      'Manual BudGanja: infusão / decoção caseira — tempos, proporções de ofício e segurança; elos Plantas e Farmácia Viva.',
    simpleEn:
      'BudGanja manual: home infusion / decoction — times, craft ratios and safety; links Plants and Living Pharmacy.',
    simpleEs:
      'Manual BudGanja: infusión / decocción casera — tiempos, proporciones y seguridad; vínculos Plantas y Farmacia Viva.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'infusao',
    word: 'infusão',
    simple:
      'Água quente (fora do fogo) sobre folhas/flores, 5–15 min tampado — modo do manual de chá de plantas.',
    simpleEn: 'Hot water (off boil) over leaves/flowers, 5–15 min covered — plant-tea manual mode.',
    simpleEs: 'Agua caliente (fuera del fuego) sobre hojas/flores, 5–15 min tapado — modo del manual de tisana.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'decocao',
    word: 'decoção',
    simple:
      'Fervura suave de raízes/cascas/sementes duras, ~10–20 min — modo do manual de chá de plantas.',
    simpleEn: 'Gentle boil of roots/bark/hard seeds, ~10–20 min — plant-tea manual mode.',
    simpleEs: 'Hervor suave de raíces/cortezas/semillas duras, ~10–20 min — modo del manual de tisana.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'tisana',
    word: 'tisana',
    simple:
      'Chá de plantas (infusão ou decoção) — no lab, distinto do chá preto de Camellia; ver manual de preparo.',
    simpleEn: 'Herbal tea (infusion or decoction) — in the lab, distinct from Camellia black tea; see prep manual.',
    simpleEs: 'Tisana (infusión o decocción) — en el lab, distinta del té negro de Camellia; ver manual de preparación.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  },
  {
    id: 'maceracao',
    word: 'maceração',
    simple:
      'Extracção a frio (horas) quando o calor forte não convém — citado no manual de chá de plantas.',
    simpleEn: 'Cold extract (hours) when strong heat is unsuitable — cited in the plant-tea manual.',
    simpleEs: 'Extracción en frío (horas) cuando el calor fuerte no conviene — citado en el manual de tisana.',
    group: 'tecnico',
    fromTitle: false,
    href: POST_HREF
  }
];

module.exports = {
  buildGuiaPreparoChaPlantasPost,
  GUIA_PREPARO_CHA_PLANTAS_ITEMS,
  POST_HREF
};
