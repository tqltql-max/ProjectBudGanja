'use strict';

/**
 * Inspeção Palavras · Gratidão
 * Eixos: qualidade (lat. tardio grātitūdō ← grātus) · peças grat- + -idão ·
 * ≠ obrigado (obligare) · ≠ valeu (valēre) · grato (adj.) · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildGratidaoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const muito = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/gratid%C3%A3o';
  const wikiEn = 'https://en.wiktionary.org/wiki/gratitude';
  const wikiGratus = 'https://en.wiktionary.org/wiki/gratus';

  const body = `## Escopo

Inspeção editorial da palavra **gratidão** — substantivo que nomeia a **qualidade de quem é grato**: reconhecimento do bem recebido. Pedido de campo depois de um sopro curto (*grato*). Esta ficha cobre o **objeto** (lat. tardio *grātitūdō* ← *grātus* + *-tūdō*), as **peças** *grat-* + *-idão* (método de [veneno](${vinganca})), o contraste duro com [muitoobrigado](${muito}) e [valeu](${valeu}), e o fecho [Faça o melhor!](${mantra}).

O lab fiche o **vocábulo**. Não prega autoajuda, nem transforma agradecer em dívida.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · gratidão](${wiki}), [gratitude](${wikiEn}), [grātus](${wikiGratus}), série [Palavras](${hub}). **Ficha ≠ etiqueta de educação, nem protocolo de obrigado.** Tom: Inspetor BudGanja — gratidão como **qualidade nomeada**, não como fórmula. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **gratidão** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. tardio / med. *grātitūdō* («qualidade de ser grato») ← *grātus* («agradável, reconhecido, grato») + *-tūdō* (sufixo de qualidade) — confiança: **alta** |
| Via PT | *gratudine* / *grātitūdine(m)* → PT **gratidão** |
| Família | *grato* · *agradecer* · *graça* · *ingrato* · *gratuito* · *grátis* · *gratificação* |
| Cognatos | esp. *gratitud* · fr. *gratitude* · it. *gratitudine* · ing. *gratitude* · lat. *grātus* / *grātia* |
| Paralelo (não étimo) | gr. χάρις *cháris* (graça / favor) — prima de sentido, **não** mãe da palavra PT |
| Tipo BudGanja | Palavra — qualidade × reconhecimento × ofício sem dívida |
| Elo sopro | [muitoobrigado](${muito}) · [valeu](${valeu}) |
| Elo acto | [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) |
| Elo afecto | [alegria](${alegria}) · [esperança](${esperanca}) |
| Elo projecto | [língua portuguesa](${lingua}) · [etimologia](${etimologia}) · [Guia](${guia}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · gratidão](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o **nome da qualidade**. *Grato* é o adjectivo sobre a pessoa; *agradecer* é o verbo; [valeu](${valeu}) e [muitoobrigado](${muito}) são **sopros**. Gratidão é o caderno que os nomeia.

## 2. Peças da palavra (como veneno)

Só nesta ficha: cada morfo, no método da tabela vermelha de [vingança / veneno](${vinganca}).

| Peça | Comum | BudGanja |
|------|-------|----------|
| **grat-** | De lat. *grātus* — agradável, bem-vindo, reconhecido | Receber bem o [gesto](${gesto}); o bem **entrou** |
| **-idão** | Sufixo de qualidade (lat. *-tūdō*, como *aptidão*, *solitude*→*solidão*) | Nomeia o **estado**, não o grito nem a conta |
| **gratidão** (junto) | «Reconhecimento do bem recebido» (Wikcionário) | Qualidade com [verdade](${verdade}) — sem pose, sem dívida |

**H1:** núcleo = *grātus* → *grātitūdō* → *gratidão* (alta).  
**H2:** *-idão* faz do adjectivo um **nome**. Por isso *grato* ≠ *gratidão*: um descreve; o outro **ficha**.  
**H3:** o étimo **não** passa por *obrigar*. Quem cola gratidão em *obrigado* mistura duas famílias.

## 3. Gratidão × obrigado × valeu × grato

Três sopros e um nome — **não** o mesmo objecto.

| Forma | Étimo | Ofício |
|-------|-------|--------|
| **gratidão** | *grātus* + *-tūdō* | Qualidade nomeada — esta ficha |
| **grato** | *grātus* | Adjectivo: «estou grato» — a qualidade **na** pessoa |
| **agradecer** | *a-* + *grato* + *-ecer* | Verbo: o acto |
| **[muitoobrigado](${muito})** | *obligare* («ligar, atar») | Fórmula BR reforçada — crédito; mapa histórico à parte |
| **[valeu](${valeu})** | *valēre* («ter força, valer») | Sopro leve / fecho oral BR |
| **graça** | *grātia* | Favor / graça — **mesma família**, outro objecto |
| **gratificação** | *grātificāre* | Extra / gorjeta — pagamento vestido de agradecimento |
| **grátis / gratuito** | *grātīs* / *grātuītus* | Sem preço — **não** é o afecto |
| **ingrato** | *in-* + *grātus* | Antónimo — o bem chegou e **não** foi recebido |

**Veredicto cola:** *obrigado* soa a gratidão no uso vivo. O étimo **não cola**. *Obligare* liga; *grātus* reconhece. O laboratório usa os dois — e **não os funde**.

## 4. Distinções duras

| Isto | Não é isto |
|------|------------|
| **Gratidão** | **[Obrigado](${muito})** (fórmula ← *obligare*) |
| **Gratidão** | **[Valeu](${valeu})** (sopro ← *valēre*) |
| **Gratidão** | **Grato** (adjectivo — irmão, não o mesmo vocábulo) |
| **Gratidão** | **Graça** (favor) |
| **Gratidão** | **Gratificação** (pagamento) |
| **Gratidão** | **Grátis / gratuito** (sem preço) |
| Qualidade com [gesto](${gesto}) | Dívida, chantagem afectiva, etiqueta vazia |
| χάρις *cháris* | Étimo desta palavra PT |

## 5. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [muitoobrigado](${muito}) | Fórmula — irmã de **uso**, prima de **étimo** (não) |
| [valeu](${valeu}) | Sopro leve — o fecho; esta ficha é o nome |
| [gesto](${gesto}) · [respeito](${respeito}) | O que a gratidão reconhece |
| [verdade](${verdade}) | Presença — senão vira cartão |
| [alegria](${alegria}) · [esperança](${esperanca}) | Afectos irmãos; cada um com a sua ficha |
| [etimologia](${etimologia}) | Método: origem ≠ uso |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno × reconhecimento |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hub}) | Mapa |
| [Faça o melhor!](${mantra}) | Fecho |

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — gratidão **não** substitui o ofício; acompanha |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Gratidão automática sem olhar = frio disfarçado · gratidão com [gesto](${gesto}) = ofício |
| Anti-dívida | «Fico te devendo» como chantagem ≠ esta palavra |
| Campo | Depois de *grato* — o lab nomeou a qualidade |

**Veredicto:** Faça o melhor — e, se o bem entrou, a palavra certa do caderno é **gratidão**. O sopro pode ser *valeu* ou *muitoobrigado*. O nome é este.

## Hipóteses (síntese)

**H1:** *grātus* → *grātitūdō* → *gratidão* (alta).  
**H2:** peças *grat-* + *-idão* = qualidade, não fórmula.  
**H3:** elos de **uso** = [muitoobrigado](${muito}) · [valeu](${valeu}) · [gesto](${gesto}); étimos **distintos**.  
**H4:** fecho = [Faça o melhor!](${mantra}).

## Limites

- Não substitui [muitoobrigado](${muito}) nem [valeu](${valeu}) na boca.  
- Não é teologia da graça nem protocolo corporativo.  
- χάρις é paralelo de sentido — **não** étimo.  
- Ficha de Palavras, não de etiqueta.

## Status

**Aprovado** — **gratidão** fichada: objeto (*grātus* / *grātitūdō*), peças *grat-* + *-idão*, contraste com [muitoobrigado](${muito}) e [valeu](${valeu}), fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ muitoobrigado](${muito}) · [▶ Valeu](${valeu}) · [▶ Gesto](${gesto}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **gratidão** — the named **quality of being grateful** (recognition of a received good). Field cue: a short *grato*. Covers Late/Med. Lat. *grātitūdō* ← *grātus* + *-tūdō*, the pieces *grat-* + *-idão*, and a hard contrast with [muitoobrigado](${muito}) (*obligare*) and [valeu](${valeu}) (*valēre*). Close: [Do your best!](${mantra}).

> Independent audit. Sources: [Wiktionary · gratitude](${wikiEn}), [grātus](${wikiGratus}). **Not etiquette. Not a debt protocol.** Do not merge *gratidão* with *obrigado*.

## Object

| Field | Value |
|-------|-------|
| Word | **gratidão** (feminine noun) |
| Etymon | *grātus* (“pleasing, thankful”) + *-tūdō* → *grātitūdō* — high confidence |
| ≠ | [obrigado](${muito}) (*obligare*, to bind) · [valeu](${valeu}) (*valēre*) · *graça* · *gratificação* · *grátis* |
| Sister (adjective) | *grato* — the quality **on** the person; this sheet names it |

## Pieces (veneno method)

| Piece | Everyday | Lab |
|-------|----------|-----|
| **grat-** | *grātus* — welcome, thankful | The good **entered** |
| **-idão** | Quality suffix | Names the **state**, not the spoken formula |
| **gratidão** | Recognition of a received good | Quality with [verdade](${verdade}) — no pose, no bill |

**Verdict:** *obrigado* sounds like gratitude in living use. The etymon **does not glue**. *Obligare* binds; *grātus* recognizes.

## Status

**Approved** — quality named; formulas stay on their own sheets. [Do your best!](${mantra})

[▶ Words](${hub}) · [▶ muitoobrigado](${muito}) · [▶ Valeu](${valeu})
`;

  const contentEs = `## Alcance

Inspección editorial de **gratidão** (PT) / **gratitud** — la **cualidad nombrada** de quien es grato: reconocimiento del bien recibido. Señal de campo: un *grato* corto. Cubre lat. tardío *grātitūdō* ← *grātus* + *-tūdō*, las piezas *grat-* + *-idão*, y el contraste duro con [muitoobrigado](${muito}) (*obligare*) y [valeu](${valeu}) (*valēre*). Cierre: [¡Haz lo mejor!](${mantra}).

> Auditoría independiente. Fuentes: [Wiktionary · gratitude](${wikiEn}), [grātus](${wikiGratus}). **No es etiqueta ni protocolo de deuda.** No fusionar *gratidão* con *obrigado*.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **gratidão** (sustantivo femenino) |
| Étimo | *grātus* («agradable, agradecido») + *-tūdō* → *grātitūdō* — confianza alta |
| ≠ | [obrigado](${muito}) (*obligare*) · [valeu](${valeu}) (*valēre*) · *graça* · *gratificação* · *grátis* |
| Hermano (adjetivo) | *grato* — la cualidad **en** la persona; esta ficha la nombra |

## Piezas (método veneno)

| Pieza | Común | Lab |
|-------|-------|-----|
| **grat-** | *grātus* — bienvenido, reconocido | El bien **entró** |
| **-idão** | Sufijo de cualidad | Nombra el **estado**, no la fórmula hablada |
| **gratidão** | Reconocimiento del bien recibido | Cualidad con [verdade](${verdade}) — sin pose, sin cuenta |

**Veredicto:** *obrigado* suena a gratitud en el uso vivo. El étimo **no pega**. *Obligare* liga; *grātus* reconoce.

## Estado

**Aprobada** — cualidad nombrada; las fórmulas quedan en sus fichas. [¡Haz lo mejor!](${mantra})

[▶ Palabras](${hub}) · [▶ muitoobrigado](${muito}) · [▶ Valeu](${valeu})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildGratidaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildGratidaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 181;
  return makePalavra({
    title: 'Inspeção: Gratidão — qualidade de grato, não fórmula de obrigado',
    titleEn: 'Inspection: Gratidão — quality of being grateful, not the obrigado formula',
    titleEs: 'Inspección: Gratidão — cualidad de grato, no fórmula de obrigado',
    excerpt:
      'Palavras: «gratidão» (lat. tardio grātitūdō ← grātus) — qualidade de quem recebe bem; peças grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); Faça o melhor!',
    excerptEn:
      'Words: “gratidão” (Late Lat. grātitūdō ← grātus) — named quality of receiving well; pieces grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); Do your best!',
    excerptEs:
      'Palabras: «gratidão» (lat. tardío grātitūdō ← grātus) — cualidad de quien recibe bien; piezas grat- + -idão; ≠ obrigado (obligare) ≠ valeu (valēre); ¡Haz lo mejor!',
    slug: 'inspecao-palavra-gratidao',
    date: '2026-08-22T04:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Gratidão · palavra',
    coverImage: '/imagens/inspecoes/gratidao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGratidaoPost,
  buildGratidaoBodies
};
