'use strict';

/**
 * Pessoas · Leonardo DiCaprio.
 * Ofício: presença no ecrã. Elo: Romeu + Julieta (1996) + filmografia (série nova).
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildDicaprioBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Leonardo_DiCaprio';
  const wikiEn = 'https://en.wikipedia.org/wiki/Leonardo_DiCaprio';
  const filme = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
  const filo = '/posts/post-inspecao-filmografia-leonardo-dicaprio.html';
  const peca = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const shake = '/posts/post-inspecao-figura-william-shakespeare.html';
  const luhrmann = '/posts/post-inspecao-figura-baz-luhrmann.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const gibson = '/posts/post-inspecao-figura-mel-gibson.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const filoHub = '/biblioteca/inspecoes/#inspecoes-filmografias';

  const body = `## Escopo

Inspeção editorial e documental de **Leonardo Wilhelm DiCaprio** (Los Angeles, 11 nov. **1974**) — actor e produtor norte-americano. O recorte BudGanja **não** é tapete vermelho nem dossiê de fama: é a **pessoa e o ofício** de **estar no plano** — com elo âncora no filme [Romeu + Julieta (1996)](${filme}) ([Luhrmann](${luhrmann})) e com o **catálogo completo** na ficha irmã [Filmografia · DiCaprio](${filo}) — **inauguração** da série [Filmografias](${filoHub}).

Pedido de campo: *inspecione DiCaprio também e todos os filmes dele* · *filmografia, novo tipo, inauguração*. A **pessoa** fica aqui. Os **títulos** ficam no catálogo. Um filme — [1996](${filme}) — tem ficha Artes própria.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Leonardo DiCaprio](${wiki}), [EN](${wikiEn}). Sem afiliação com estúdios ou Appian Way. Distinto do [Legado](${legado}) canábico. Sem vida privada inventada. Activismo ambiental: **facto público**, não o centro desta ficha nem protocolo climático. Jack Dawson e Romeu são personagens; **Leo** é a ficha.

Par de ofício em Pessoas: [Keanu Reeves](${keanu}) — outro corpo no ecrã com ficha da **obra** à parte ([The Matrix](/posts/post-inspecao-filme-the-matrix.html)).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Leonardo Wilhelm DiCaprio** |
| Nascimento | 11 nov. 1974, Los Angeles, Califórnia, EUA |
| Ofícios | Actor · produtor (Appian Way, contexto) |
| Obra-âncora BudGanja | [Romeu + Julieta (1996)](${filme}) — Romeu no ecrã |
| Catálogo | [Filmografia · DiCaprio](${filo}) — **série Filmografias** (ficha fundadora) |
| Outras marcas (contexto) | *Titanic* · *A Origem* · *O Lobo de Wall Street* · *O Regresso* (Óscar de actor, 2016) · parceria Scorsese |
| Tipo BudGanja | Pessoa — **ofício de presença no ecrã** × Filmografias × Artes |
| Elo principal | [Filme 1996](${filme}) · [catálogo](${filo}) · [Luhrmann](${luhrmann}) · [peça](${peca}) |
| Elo Palavras | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [coração](${coracao}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Par Pessoas | [Keanu](${keanu}) · [Luhrmann](${luhrmann}) · [Gibson](${gibson}) · [Shakespeare](${shake}) |
| Fonte de partida | [Wikipédia · Leonardo DiCaprio](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **ofício** — [gesto](${gesto}) e [skill](${skill}) no plano — não no mito da estrela.  
**H2:** a [filmografia](${filo}) é o **tipo novo**: lista verificável de títulos; **não** trinta fichas Artes.  
**H3:** [Romeu + Julieta (1996)](${filme}) é a **obra-âncora** porque o lab chegou pelo [Shakespeare](${shake}) / [peça](${peca}) / [Luhrmann](${luhrmann}).  
**H4:** Scorsese, Óscar, *Titanic*: **contexto de carreira** no catálogo; teses ficam para fichas futuras, se o campo pedir.  
**H5:** fecho = [Valeu !!!](${mantra}) neste ofício.

## Quem é (síntese verificável)

- Nasce em Los Angeles (1974); ofício começa na televisão infantil / *Growing Pains* (contexto; ver catálogo).  
- Primeiros longas: *Critters 3*, *This Boy's Life*, *What's Eating Gilbert Grape* (nomeação ao Óscar, 1994).  
- **1996:** Romeu de [Luhrmann](${luhrmann}) — [ficha do filme](${filme}).  
- **1997:** *Titanic* — marca mundial; a tese do navio **não** se abre aqui.  
- Anos 2000–10: parceria frequente com **Martin Scorsese** (*Gangs of New York*, *The Aviator*, *The Departed*, *Shutter Island*, *The Wolf of Wall Street*, *Killers of the Flower Moon*).  
- **2016:** Óscar de melhor actor por *The Revenant*.  
- Produtor (Appian Way) e voz pública ambiental — **crédito de ofício**, sem transformar esta página em ONG.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Presença | O [gesto](${gesto}) no plano — par de [Keanu](${keanu}) |
| Romeu 1996 | Elo com [Luhrmann](${luhrmann}) e a [peça](${peca}) |
| Catálogo | [Filmografias](${filoHub}) — inauguração com o nome dele |
| Separar | Pessoa ≠ personagem ≠ lista de títulos ≠ uma obra |

## Elos

| Recurso | Papel |
|---------|-------|
| [Filmografia · DiCaprio](${filo}) | **Todos os filmes** em tabela — tipo novo |
| [Romeu + Julieta (1996)](${filme}) | Única ficha Artes deste cluster (por agora) |
| [Luhrmann](${luhrmann}) | Realizador do Romeu de ecrã |
| [Shakespeare](${shake}) · [peça](${peca}) | Génese do verso |

> Abrir o [catálogo](${filo}) se o interesse for **todos os títulos**. Abrir o [filme 1996](${filme}) se for Verona Beach. Esta ficha se for a **pessoa**.

## Limites

- Não inventaria prémios.  
- Sem vida privada inventada.  
- Sem protocolar investimentos, ONG ou clima.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas** — Leonardo DiCaprio · ofício de ecrã · inaugura [Filmografias](${filo}) · âncora [Romeu + Julieta (1996)](${filme}).

[▶ Pessoas](${hub}) · [▶ Filmografia](${filo}) · [▶ Filme 1996](${filme}) · [▶ Luhrmann](${luhrmann}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **Leonardo Wilhelm DiCaprio** (b. 11 Nov 1974, Los Angeles). Craft of **being in the frame** — not a red-carpet file. Anchor: [Romeo + Juliet (1996)](${filme}). Full title list: [DiCaprio filmography](${filo}) — founding sheet of the Filmographies series.

> Independent audit. [Wikipedia](${wikiEn}). No invented private life. Environmental advocacy is public fact, not the center.

## Status

**Approved in People** — screen craft; catalog in [Filmographies](${filo}); Arts anchor [1996 film](${filme}).

[▶ Filmography](${filo}) · [▶ 1996 film](${filme}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Leonardo Wilhelm DiCaprio** (n. 11 nov. 1974, Los Ángeles). Oficio de **estar en el plano** — no dossier de fama. Ancla: [Romeu + Julieta (1996)](${filme}). Lista de títulos: [Filmografía · DiCaprio](${filo}) — ficha fundadora de Filmografías.

> Auditoría independiente. [Wikipedia](${wiki}). Sin vida privada inventada.

## Estado

**Aprobado en Personas** — oficio de pantalla; catálogo en [Filmografías](${filo}); ancla [filme 1996](${filme}).

[▶ Filmografía](${filo}) · [▶ Filme 1996](${filme}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDicaprioPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDicaprioBodies();
  return figuraPost({
    title: 'Inspeção: Leonardo DiCaprio — ofício de presença no ecrã',
    titleEn: 'Inspection: Leonardo DiCaprio — the craft of presence on screen',
    titleEs: 'Inspección: Leonardo DiCaprio — el oficio de presencia en pantalla',
    excerpt:
      'Pessoas: Leonardo DiCaprio (n. 1974) — ofício de ecrã; inaugura a série Filmografias; âncora Romeu + Julieta (1996). Pessoa ≠ catálogo ≠ uma obra.',
    excerptEn:
      'People: Leonardo DiCaprio (b. 1974) — screen craft; founds the Filmographies series; anchor Romeo + Juliet (1996). Person ≠ catalog ≠ one work.',
    excerptEs:
      'Personas: Leonardo DiCaprio (n. 1974) — oficio de pantalla; inaugura Filmografías; ancla Romeu + Julieta (1996). Persona ≠ catálogo ≠ una obra.',
    slug: 'inspecao-figura-leonardo-dicaprio',
    date: '2026-08-22T03:40:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'DiCaprio · pessoa',
    coverImage: '/imagens/inspecoes/leonardo-dicaprio-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildDicaprioPost, buildDicaprioBodies };
