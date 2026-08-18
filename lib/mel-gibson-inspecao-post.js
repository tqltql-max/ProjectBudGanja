'use strict';

/**
 * Mel Gibson — Pessoas × Artes
 * Ofício: actor / realizador / produtor (Icon).
 * Elos: Coração Valente (1995) e A Paixão de Cristo (2004) — fichas Artes separadas.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

const VALENTE = '/posts/post-inspecao-filme-coracao-valente.html';
const PAIXAO = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';

function buildBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Mel_Gibson';
  const wikiEn = 'https://en.wikipedia.org/wiki/Mel_Gibson';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const curtis = '/posts/post-inspecao-figura-richard-curtis.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Mel Colm-Cille Gerard Gibson** (Peekskill, Nova Iorque, 3 de janeiro de 1956). Actor, realizador e produtor. O recorte BudGanja **não** é cartaz de acção nem dossiê de escândalo: é a **pessoa e o ofício** — corpo no ecrã, casa de produção, realização de épicos — com elos em [Coração Valente](${VALENTE}) (1995) e [A Paixão de Cristo](${PAIXAO}) (2004). As duas obras **permanecem fichas separadas**.

> **Nota metodológica:** auditoria independente. [Wikipédia · Mel Gibson](${wiki}), [EN](${wikiEn}). Sem afiliação. Distinto do [Legado](${legado}) canábico. Wallace e o Jesus de Caviezel são personagens / recortes de obra; **Mel** é a ficha. Sem vida privada inventada. Controvérsias públicas (nomeadamente 2006) **registam-se como facto**; **não** são o centro nem se citam para chacota.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Mel Colm-Cille Gerard Gibson** |
| Nascimento | 3 jan. 1956, Peekskill, Nova Iorque, EUA |
| Formação / terra | Família muda-se para Sydney aos 12 anos; **NIDA** (Sydney) — *Romeo and Juliet* com Judy Davis |
| Ofícios | Actor · realizador · produtor |
| Casa | **Icon Productions** (com Bruce Davey, 1989) — alternativa ao estúdio, nas fontes |
| Obras-âncora BudGanja | [Coração Valente](${VALENTE}) (1995) · [A Paixão de Cristo](${PAIXAO}) (2004) |
| Outras marcas (contexto) | *Mad Max* · *Gallipoli* · *Lethal Weapon* · *Hamlet* (Zeffirelli) · *The Man Without a Face* · *Apocalypto* · *Hacksaw Ridge* |
| Tipo BudGanja | Pessoa — **ofício de ecrã e realização** × Artes |
| Elo principal | As **duas** fichas Artes — sem as fundir |
| Elo Palavras | [gesto](${gesto}) · [skill](${skill}) · [respeito](${respeito}) · [caminho](${caminho}) · [coração](${coracao}) · [filho de deus](${filho}) |
| Par Pessoas | [Keanu Reeves](${keanu}) — actor/método · [Richard Curtis](${curtis}) — autor/realizador |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor é o **ofício duplo** — interpretar e realizar — não o mito do «herói de cartaz».  
**H2:** [Coração Valente](${VALENTE}) e [A Paixão de Cristo](${PAIXAO}) são **elos de obra**; a tese de cada filme fica **lá**.  
**H3:** Icon é [caminho](${caminho}) de autonomia (Hamlet primeiro; depois os épicos).  
**H4:** 2006 e outras falas públicas: facto + recepção — [respeito](${respeito}) sem apagar, sem transformar esta ficha em tribunal.  
**H5:** fecho = [respeito](${respeito}) + [Faça o melhor!](${mantra}) — o melhor recorte *desta* pessoa *neste* ofício.

## Quem é (síntese verificável)

- Nasce em Peekskill (1956); sexto de onze filhos; pai Hutton Gibson (escritor); mãe Anne Patricia Reilly (Longford, Irlanda). Nomes Mel / Colm-Cille de linhagem irlandesa.  
- Infância nos EUA; **Austrália** a partir dos 12 (Sydney).  
- NIDA: palco clássico; ecrã em *Summer City* (1977); *Mad Max* (1979) — marca mundial; *Tim* e *Gallipoli* (1981, Peter Weir) — AFI de actor.  
- *Lethal Weapon* (1987) — Riggs como ofício de acção, contexto, não ficha.  
- 1989–90: Icon; *Hamlet* (Zeffirelli) — primeira produção da casa.  
- 1993: *The Man Without a Face* — **primeira** realização de longa.  
- **1995:** realiza, produz e interpreta [Coração Valente](${VALENTE}) — Óscar de Filme e de Realização (68.ª).  
- **2004:** realiza e (co)escreve [A Paixão de Cristo](${PAIXAO}) — êxito de receita; recepção polarizada (ficha da obra).  
- 2006: *Apocalypto* (maia, séc. XVI) — ofício de realização em língua que não é a do espectador.  
- 2016: *Hacksaw Ridge* — realiza sem se interpretar; nomeações ao Óscar (contexto).

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Palco → ecrã | NIDA primeiro — [skill](${skill}) de actor, não só de estrela |
| Icon | Casa própria — [caminho](${caminho}) de quem produz para poder realizar |
| Realizar e estar no plano | Wallace: ofício duplo; Jesus: **Caviezel** no corpo, Gibson na realização — separar |
| Língua e recorte | Paixão em aramaico/latim; Apocalypto em maia — [gesto](${gesto}) de estranhamento |
| Duas fichas Artes | [Coração](${VALENTE}) = lenda; [Paixão](${PAIXAO}) = Evangelhos — **não** um «ciclo Gibson» |
| Separar | «Mel Gibson» ≠ Wallace ≠ o filme da Paixão ≠ a pessoa |

## Elos com as obras (separadas)

Abrir [Coração Valente](${VALENTE}) para o **épico de 1995**. Abrir [A Paixão de Cristo](${PAIXAO}) para o **recorte de 2004**. Esta ficha se o interesse for o **homem e o ofício**.

| Obra | Papel nesta ficha |
|------|-------------------|
| [Coração Valente](${VALENTE}) | Realização + interpretação; lenda / Randall Wallace primeiro |
| [A Paixão de Cristo](${PAIXAO}) | Realização + coargumento; Evangelhos primeiro; Caviezel no ecrã |
| *Hamlet* / Icon | Contexto de casa — sem ficha Artes neste passo |
| *Apocalypto* · *Hacksaw Ridge* | Contexto de realização — sem duplicar teses |

## Limites

- Não inventaria a filmografia.  
- Sem vida privada inventada (família, filhos, relacionamentos).  
- 2006 e outras falas públicas: facto de imprensa — **sem** centro moralista e **sem** citação para escárnio.  
- Controvérsia da [Paixão](${PAIXAO}): fica na ficha da **obra**.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas com mérito de ofício** — Mel Gibson · actor / realizador / Icon · elos em [Coração Valente](${VALENTE}) e [A Paixão de Cristo](${PAIXAO}), fichas **separadas**.

[▶ Pessoas](${hub}) · [▶ Coração Valente](${VALENTE}) · [▶ A Paixão de Cristo](${PAIXAO}) · [▶ respeito](${respeito}) · [▶ Faça o melhor!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage to **Mel Colm-Cille Gerard Gibson** (b. 3 Jan 1956, Peekskill). Craft of acting, directing and producing (Icon) — not an action poster or a scandal file. Arts links: [Braveheart](${VALENTE}) (1995) and [The Passion of the Christ](${PAIXAO}) (2004), **separate** sheets.

> [Wikipedia](${wikiEn}). Public controversies (including 2006) are fact — **not** the center. No invented private life.

## Status

**Approved in People** — Mel Gibson; Wallace and the Passion cut are works; this sheet is the man.

[▶ Braveheart](${VALENTE}) · [▶ Passion](${PAIXAO})
`;

  const contentEs = `## Alcance

Homenaje a **Mel Colm-Cille Gerard Gibson** (n. 3 ene. 1956, Peekskill). Oficio de actor, director y productor (Icon) — no cartel de acción ni ficha de escándalo. Vínculos: [Coração Valente](${VALENTE}) y [A Paixão de Cristo](${PAIXAO}), fichas **separadas**.

> [Wikipedia](${wikiEn}). Controversias públicas: hecho — **no** el centro. Sin vida privada inventada.

## Estado

**Aprobado en Personas** — Mel Gibson; las obras tienen ficha propia; esta ficha es el hombre.

[▶ Braveheart](${VALENTE}) · [▶ Pasión](${PAIXAO})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMelGibsonPost() {
  const { body, contentEn, contentEs, wiki } = buildBodies();
  return figuraPost({
    title: 'Inspeção: Mel Gibson — ofício de ecrã, realização e as duas obras',
    titleEn: 'Inspection: Mel Gibson — screen craft, directing and the two works',
    titleEs: 'Inspección: Mel Gibson — oficio de pantalla, dirección y las dos obras',
    excerpt:
      'Pessoas × Artes: Mel Gibson — actor, realizador e Icon; elos em Coração Valente (1995) e A Paixão de Cristo (2004), fichas separadas. Pessoa e ofício, não cartaz nem dossiê.',
    excerptEn:
      'People × Arts: Mel Gibson — actor, director and Icon; links to Braveheart (1995) and The Passion of the Christ (2004), separate sheets. The person and craft, not a poster or a dossier.',
    excerptEs:
      'Personas × Artes: Mel Gibson — actor, director e Icon; vínculos en Braveheart (1995) y A Paixão de Cristo (2004), fichas separadas. Persona y oficio, no cartel ni dossier.',
    slug: 'inspecao-figura-mel-gibson',
    date: '2026-08-18T07:30:00.000Z',
    seriesOrder: 17,
    seriesLabel: 'Mel Gibson · pessoa',
    coverImage: 'imagens/inspecoes/mel-gibson-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMelGibsonPost };
