'use strict';

/**
 * Inspeção Pessoas · Leonardo da Vinci.
 * Elo principal: mural «A Última Ceia» / Santa Ceia (série Artes).
 * Ofício: olhar, desenhar, ensaiar, anotar. Distinto do Legado canábico.
 */

function figuraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'pessoas-historia',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Pessoas',
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

function buildLeonardoDaVinciBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Leonardo_da_Vinci';
  const wikiEn = 'https://en.wikipedia.org/wiki/Leonardo_da_Vinci';
  const ceia = '/posts/post-inspecao-arte-santa-ceia.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const coelho = '/posts/post-inspecao-figura-paulo-coelho.html';
  const alquimista = '/posts/post-inspecao-arte-o-alquimista.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial e documental de **Leonardo di ser Piero da Vinci** (Anchiano, Vinci, 15 abr. 1452 — Amboise, 2 maio 1519) — pintor, desenhador, engenheiro e anatomista da República de Florença. O recorte BudGanja **não** é enciclopédia do «génio universal» nem biografia de romance: é a **pessoa e o ofício** de **olhar até o [gesto](${gesto}) falar** — com elo principal no mural [Santa Ceia / A Última Ceia](${ceia}) (série Artes).

> **Nota metodológica:** auditoria independente com base na [Wikipédia (PT)](${wiki}) e [Wikipedia (EN)](${wikiEn}). Sem afiliação com museus, o Louvre ou a Diocese de Milão. Distinto do [Legado](${legado}) canábico. A ficha da [Santa Ceia](${ceia}) inspecciona o **mural**; aqui inspecciona-se o **ofício** de quem o pintou. *Mona Lisa*, Homem Vitruviano e cadernos são **contexto de carreira**, não fichas Artes nesta entrega. Sem vida privada inventada. *The Da Vinci Code* **não** é fonte.

Esta ficha é o elo **Pessoas × Artes (pintura)** — par da inspeção [Santa Ceia](${ceia}). Par metodológico em Pessoas: [Paulo Coelho](${coelho}) — outro autor × obra; lá a parábola, aqui a parede.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Leonardo di ser Piero da Vinci** |
| Nascimento | 15 abr. 1452, Anchiano (Vinci), República de Florença |
| Morte | 2 maio 1519, Clos Lucé, Amboise, França |
| Ofícios | Pintor · desenhador · engenheiro · anatomista (cadernos) |
| Formação | Oficina de **Andrea del Verrocchio**, Florença |
| Obra-âncora BudGanja | [Santa Ceia / A Última Ceia](${ceia}) (1495–1498, Milão) |
| Outras marcas (contexto) | *Mona Lisa* (Louvre) · Homem Vitruviano (c. 1490) · *Virgem das Rochas* · *Dama com Arminho* · cadernos (Atlântico, Leicester, Windsor) |
| Tipo BudGanja | Pessoa — ofício de inspeção visual × Artes |
| Elo principal | [Santa Ceia](${ceia}) — pintura mural (série Artes) |
| Elo Palavras | [gesto](${gesto}) · [criatividade](${criatividade}) · [skill](${skill}) · [pattern](${pattern}) · [caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) · [Valeu !!!](${mantra}) |
| Par Pessoas | [Paulo Coelho](${coelho}) — autor × obra |
| Fonte de partida | [Wikipédia · Leonardo da Vinci](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Leonardo é um **ofício de inspeção** — ver, desenhar, ensaiar, anotar — não o mito do génio intocável.  
**H2:** [Santa Ceia](${ceia}) é o **elo de obra**; a tese da mesa e do instante fica na ficha Artes.  
**H3:** cadernos e anatomia são o mesmo método da parede: o [gesto](${gesto}) do corpo como [verdade](${verdade}) visível.  
**H4:** *Mona Lisa* e o Homem Vitruviano são **contexto**; não diluem a âncora.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* pessoa *neste* ofício.

Passos (variante «autor × obra»):

1. Fixar datas e oficinas (Vinci, Verrocchio, Sforza, França).  
2. Declarar a âncora Artes ([Santa Ceia](${ceia})).  
3. Traduzir o método (olho → mão → caderno) sem inventário de engenhos.  
4. Status + limites (romance, culto do génio, Legado).

## Quem é (síntese verificável)

- Nasce em 1452 junto a Vinci; filho de ser Piero (notário) e Caterina — nascimento fora do casamento, nas fontes.  
- Florença: aprendiz de **Verrocchio**. O [skill](${skill}) começa na oficina, não no poster.  
- **1482–1499:** Milão, Ludovico Sforza. É o tempo da [Santa Ceia](${ceia}) no refeitório de Santa Maria delle Grazie.  
- Florença de novo (c. 1500–1506): *Mona Lisa* em curso — contexto.  
- Milão outra vez; Roma (Leão X); **1516–1519:** França, Francisco I, Clos Lucé.  
- Morre em Amboise, 2 maio 1519. Sepultura tradicional: capela de Saint-Hubert, château d'Amboise (nas fontes).  
- Cadernos em escrita especular: método de trabalho, não enigma de romance.

O retrato a giz vermelho de Turim **atribui-se** por vezes a um autorretrato; a atribuição **debate-se**. O laboratório **não** fecha o rosto.

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Oficina primeiro | Verrocchio — [skill](${skill}) herdado e ensaiado, não milagre |
| Olhar o corpo | Anatomia e mesa da [Ceia](${ceia}): o [gesto](${gesto}) revela o que a boca ainda não disse |
| Tempo na parede | Recusa o fresco rápido para poder corrigir — [criatividade](${criatividade}) com custo |
| Perspectiva | [Pattern](${pattern}) ao serviço do instante, não adorno |
| Cadernos | Inspeção contínua — o laboratório reconhece o hábito, sem protocolar engenhos |
| [Caminho](${caminho}) | Vinci → Florença → Milão → França: oficinas, não turismo |
| Separar | Leonardo ≠ o mural ≠ o filme da [Paixão](${paixao}) ≠ o romance de 2003 |

## Elos com as obras (separadas)

Abrir [Santa Ceia](${ceia}) para o **mural de 1495–1498**. Abrir [A Paixão de Cristo](${paixao}) para o **filme de 2004**. Esta ficha se o interesse for o **homem e o ofício**.

| Obra | Papel nesta ficha |
|------|-------------------|
| [Santa Ceia / A Última Ceia](${ceia}) | Âncora — mesa, instante, técnica a seco |
| *Mona Lisa* · Homem Vitruviano | Contexto de ofício — **sem** ficha Artes neste passo |
| Cadernos / anatomia | Método = inspeção; **não** manual de engenharia |
| [O Alquimista](${alquimista}) / [Paulo Coelho](${coelho}) | Par «obra primeiro / autor em Pessoas» — outro século, outro género |

## Limites

- Não inventaria a obra completa nem os engenhos.  
- Sem vida privada inventada (família, sexualidade, «segredos»).  
- *The Da Vinci Code*: ficção — a tese João = Madalena fica **reprovada** na ficha da [Ceia](${ceia}).  
- Autorretrato de Turim: atribuição aberta.  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha da [Santa Ceia](${ceia}).

## Status

**Aprovado na série Pessoas com mérito de ofício** — Leonardo da Vinci · olhar / desenhar / ensaiar · elo em [Santa Ceia / A Última Ceia](${ceia}).

[▶ Pessoas](${hub}) · [▶ Santa Ceia](${ceia}) · [▶ Artes](${artes}) · [▶ gesto](${gesto}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki}) · [Vida](${vida})
`;

  const contentEn = `## Scope

Inspection of **Leonardo di ser Piero da Vinci** (15 Apr 1452, Vinci — 2 May 1519, Amboise). Craft of **looking until the [gesture](${gesto}) speaks** — not a “universal genius” poster or a novel biography. Primary Arts link: [The Last Supper / Santa Ceia](${ceia}).

> [Wikipedia](${wikiEn}) / [PT](${wiki}). No affiliation. Distinct from cannabis [Legacy](${legado}). *Mona Lisa* and the Vitruvian Man are **career context**, not Arts sheets in this delivery. *The Da Vinci Code* is **not** a source. No invented private life.

People pair: [Paulo Coelho](${coelho}) — another author × work.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Leonardo da Vinci** |
| Dates | 1452 (Vinci) — 1519 (Amboise) |
| Craft | Painter · draughtsman · engineer · anatomist (notebooks) |
| Anchor | [The Last Supper](${ceia}) (1495–1498, Milan) |
| Date | ${inspected} |

## Who (verifiable)

Verrocchio’s workshop in Florence. Milan under Ludovico Sforza: the years of [The Last Supper](${ceia}). Later Florence, Rome, France (Francis I, Clos Lucé). Mirror-written notebooks are a **work method**, not a thriller cipher. The Turin red-chalk portrait is a **debated** self-portrait — this lab does not close the face.

## Craft for this lab

| Trait | Gloss |
|-------|-------|
| Workshop first | [Skill](${skill}) inherited and rehearsed |
| Body and table | Anatomy and the [Supper](${ceia}): [gesture](${gesto}) as visible [truth](${verdade}) |
| Time on the wall | Dry technique — [creativity](${criatividade}) that pays in decay |
| Perspective | [Pattern](${pattern}) in service of the instant |
| Close | [Valeu !!!](${mantra}) |

Open [The Last Supper](${ceia}) for the **mural**. Open [The Passion of the Christ](${paixao}) for the **2004 film**. This sheet is the **person**.

## Status

**Approved in People** — Leonardo da Vinci; primary link [The Last Supper](${ceia}).

[▶ Last Supper](${ceia}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Leonardo di ser Piero da Vinci** (15 abr. 1452, Vinci — 2 mayo 1519, Amboise). Oficio de **mirar hasta que el [gesto](${gesto}) hable** — no póster del «genio universal» ni biografía de novela. Vínculo principal: [Santa Ceia / La última cena](${ceia}).

> [Wikipedia](${wikiEn}) / [PT](${wiki}). Distinto del [Legado](${legado}) cannábico. *Mona Lisa* y el Hombre de Vitruvio son **contexto**. *The Da Vinci Code* **no** es fuente. Sin vida privada inventada.

Par en Personas: [Paulo Coelho](${coelho}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Leonardo da Vinci** |
| Fechas | 1452 (Vinci) — 1519 (Amboise) |
| Oficio | Pintor · dibujante · ingeniero · anatomista (cuadernos) |
| Ancla | [La última cena](${ceia}) (1495–1498, Milán) |
| Fecha | ${inspected} |

## Oficio para este laboratorio

Taller de Verrocchio primero. Milán / Sforza: los años de la [Cena](${ceia}). Cuadernos en especular = **método**, no cifrado de thriller. Cierre: [¡Valeu !!!](${mantra}).

Abrir [Santa Ceia](${ceia}) para el **mural**. Abrir [A Paixão de Cristo](${paixao}) para el **filme de 2004**. Esta ficha es la **persona**.

## Estado

**Aprobado en Personas** — Leonardo da Vinci; vínculo principal [Santa Ceia](${ceia}).

[▶ Santa Ceia](${ceia}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLeonardoDaVinciPost() {
  const { body, contentEn, contentEs, wiki } = buildLeonardoDaVinciBodies();
  return figuraPost({
    title:
      'Inspeção: Leonardo da Vinci — ofício de olhar e elo com a Santa Ceia',
    titleEn:
      'Inspection: Leonardo da Vinci — the craft of looking and the Last Supper',
    titleEs:
      'Inspección: Leonardo da Vinci — el oficio de mirar y La última cena',
    excerpt:
      'Pessoas × Artes: Leonardo da Vinci — olhar, desenhar, ensaiar; elo principal no mural Santa Ceia / A Última Ceia (1495–1498). Distinto do Legado e do Código Da Vinci.',
    excerptEn:
      'People × Arts: Leonardo da Vinci — looking, drawing, rehearsing; primary link to The Last Supper mural (1495–1498). Distinct from cannabis Legacy and from The Da Vinci Code.',
    excerptEs:
      'Personas × Artes: Leonardo da Vinci — mirar, dibujar, ensayar; vínculo principal en La última cena (1495–1498). Distinto del Legado y del Código Da Vinci.',
    slug: 'inspecao-figura-leonardo-da-vinci',
    date: '2026-08-20T22:45:00.000Z',
    seriesOrder: 19,
    seriesLabel: 'Leonardo da Vinci · pessoa',
    coverImage: 'imagens/inspecoes/leonardo-da-vinci-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLeonardoDaVinciPost,
  buildLeonardoDaVinciBodies
};
