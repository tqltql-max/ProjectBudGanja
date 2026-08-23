'use strict';

/**
 * Inspeção Expressões · formiga lava-pé
 * Nome popular BR das Solenopsis (formiga-de-fogo).
 * ≠ lavar os pés (rito) ≠ lava de vulcão ≠ larva ≠ tucandeira.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/formiga-lava-pe-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Formiga-lava-p%C3%A9s';
const WIKT_FORMIGA = 'https://pt.wiktionary.org/wiki/formiga';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 200) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Formiga lava-pé.
Não lava com água.
Sobe a perna.
Ferroa.

Não é o rito da bacia.
Não é o rio do vulcão.
Não é a larva na cratera.

Valeu !!!
com o nome no sítio,
sem virar o monte,
sem receita de picada.`;
}

function buildFormigaLavaPeBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-expressao-formiga-lava-pe.html';
  const formiga = '/posts/post-inspecao-palavra-formiga.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const larva = '/posts/post-inspecao-palavra-larva.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção da expressão / nome popular **«[formiga lava-pé](${self})»** (também *lava-pés*, *lavapés*, *formiga-de-fogo*). Pedido de campo: *inseto formiga · expressão formiga Lava Pé*, depois *inspeção palavra [lavar](${lavar}), cruzar com larva de vulcão*. [A orelha cola](${orelhaCola}) **lavar** / **[lava](${lava})** / **[larva](${larva})** / **lava-pé**. O étimo e o bicho **cortam**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Formiga-lava-pés](${WIKI}), [formiga](${WIKT_FORMIGA}). **Ficha ≠ protocolo de ferroada, ≠ veneno de jardim, ≠ rito litúrgico de Lava-pés.** Se houver alergia ou picada grave, procurar **cuidado de saúde** — esta página não trata. Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **formiga lava-pé** · *formiga-lava-pés* · *lava-pé* |
| Tipo | Nome popular BR + figura de ofício (o pé «lavado» de dor) |
| Ser | Grupo de ~20 espécies de [formiga](${formiga}) do género *Solenopsis* — no Brasil a mais citada é *S. saevissima*; *S. invicta* é a «fire ant» invasora noutros mapas |
| Porque o nome | Sobe a perna / o pé e ferroa; a dor **arde** — como se [lavasse](${lavar}) com [fogo](${fogo}) |
| Não é | Rito cristão **Lava-pés** (lavar os pés com [água](${agua})) · [lava](${lava}) de vulcão · [larva](${larva}) de vulcão · tucandeira |
| Elo | [formiga](${formiga}) · [inseto](${inseto}) · [lavar](${lavar}) · [lava](${lava}) · [risco](${risco}) · [orelha](${orelha}) |
| Fonte | [WP lava-pés](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome que a fala BR colou no bicho**. Não é ditado de pátio no sentido de moral; é **etiqueta popular** de um [inseto](${inseto}) que ferroa.

## 2. Quatro colas, quatro salas

| A boca juntou | A sala certa |
|---------------|--------------|
| **[Lavar](${lavar})** | Verbo — [água](${agua}) nas mãos / «lavar a alma» |
| **[Lava](${lava}) de vulcão** | Rocha fundida — *larva de vulcão* era o lapso |
| **[Larva](${larva})** | Jovem do [inseto](${inseto}) — não mora na cratera |
| **Formiga lava-pé** | *Solenopsis* — ferroada no pé |
| **Lava-pés (rito)** | Mandatum — lavar os pés do outro; **[água](${agua})**, não veneno |
| **Tucandeira** | Outra [formiga](${formiga}) — ficha [preguiça](${preguica}) / aula XIV; **não** receitar chá |

**H1:** o nome *lava-pé* descreve o **efeito** (arde no pé), não o étimo de [lavar](${lavar}) como higiene.  
**H2:** a [orelha](${orelha}) cola o rito, o vulcão e o inseto porque a grafia é a mesma família *lava-*.  
**H3:** *formiga-de-fogo* (ing. *fire ant*) é o mesmo ofício de nome: [fogo](${fogo}) na pele, não magma.

## 3. Limites de ofício

- Sem modo de «tratar» o ninho.  
- Sem lista de marcas de inseticida.  
- Sem copiar cantiga infantil (se houver) — o âncora é o **bicho**, não a letra.  
- Picada: [risco](${risco}) real (dor, bolha, alergia). Nomear ≠ ensinar.

\`\`\`poem
${poemPt()}
\`\`\`

## 4. Rede

| Recurso | Papel |
|---------|-------|
| [Formiga](${formiga}) | O lemma do inseto |
| [Lavar](${lavar}) · [lava](${lava}) · [larva](${larva}) | As três salas que a orelha funde |
| [Inseto](${inseto}) | Classe |
| [Fogo](${fogo}) · [risco](${risco}) | A analogia da ferroada |
| [Guia](${guia}) · [hub](${hubAll}) · [Valeu !!!](${mantra}) | Fecho |

## Status

**Aprovado** — **formiga lava-pé** = nome popular de *Solenopsis*; corta [lavar](${lavar}), [lava](${lava}), [larva](${larva}) e o rito da bacia. [Valeu !!!](${mantra}) **com o pé avisado, sem receita**.

[▶ Expressões](${hub}) · [▶ Formiga](${formiga}) · [▶ Lavar](${lavar}) · [▶ Lava](${lava}) · [▶ Larva](${larva}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **formiga lava-pé** (“foot-washing ant”) is a folk name for **fire ants** (*Solenopsis*), not the verb [lavar](${lavar}), not volcanic [lava](${lava}), not [larva](${larva}), and not the Christian foot-washing rite. Field slip *larva de vulcão* belongs on the [lava](${lava}) sheet.

**Not** a sting-treatment or pest-control guide.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Formiga lava-pé** es el nombre popular BR de las **hormigas de fuego** (*Solenopsis*), no el verbo [lavar](${lavar}), no la [lava](${lava}), no la [larva](${larva}) ni el rito de lavar los pies.

**No** es guía de picadura ni de veneno.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildFormigaLavaPePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildFormigaLavaPeBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder(
    'inspecao-expressao-formiga-lava-pe',
    275
  );
  return expressaoPost({
    title: 'Inspeção: Formiga lava-pé — o inseto que arde, não a lava do vulcão',
    titleEn: 'Inspection: Formiga lava-pé — the ant that burns, not volcano lava',
    titleEs: 'Inspección: Formiga lava-pé — el insecto que arde, no la lava del volcán',
    excerpt:
      'Expressões: formiga lava-pé (*Solenopsis*) ≠ lavar os pés ≠ lava ≠ larva; Valeu !!!',
    excerptEn:
      'Sayings: formiga lava-pé (fire ant) ≠ washing feet ≠ lava ≠ larva; Valeu !!!',
    excerptEs:
      'Dichos: formiga lava-pé ≠ lavar los pies ≠ lava ≠ larva; ¡Valeu !!!',
    slug: 'inspecao-expressao-formiga-lava-pe',
    date: '2026-08-23T16:56:00.000Z',
    seriesOrder: order,
    seriesLabel: 'formiga lava-pé · expressão',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFormigaLavaPePost,
  buildFormigaLavaPeBodies,
  poemPt
};
