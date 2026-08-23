'use strict';

/**
 * Inspeção Palavras · nap
 * Eixos: loanword EN (sono curto) · power nap · descanso de ofício ·
 * ≠ húngaro nap («dia») · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildNapBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const empatia = '/posts/post-inspecao-palavra-emocao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://en.wiktionary.org/wiki/nap';
  const wikiPt = 'https://pt.wiktionary.org/wiki/sesta';

  const body = `## Escopo

Inspeção editorial da palavra **nap** — loanword do inglês para o **sono curto** / **cochilo** (incl. *power nap*): pausa breve para recuperar, sem virar noite inteira. No português do Brasil entra sobretudo em contextos informais, apps e gíria de produtividade. Esta ficha cobre o **objeto**, o eixo **nap × sesta × sono**, o ofício de **descansar para continuar**, o falso amigo **nap** (húngaro = «dia»), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · nap](${wiki}), [sesta](${wikiPt}), série [Palavras](${hub}). **Ficha ≠ protocolo clínico de sono.** Tom: Inspetor BudGanja — *nap* é [gesto](${gesto}) de cuidado com a [vida](${vidaPalavra}); sem afiliação de app de produtividade.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **nap** (EN em uso BR) |
| Classe | Substantivo (também verbo em EN: *to nap*) |
| Étimo (trabalho) | inglês *nap* «cochilo curto» (origem germânica / onomatopeica discutida) — confiança: **alta** no sentido vivo |
| Família (EN) | *nap* · *catnap* · *power nap* |
| Paralelos PT | *cochilo* · *sesta* · *soneca* · *descansar* |
| Tipo BudGanja | Palavra — descanso curto × ofício |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [risco](${risco}) · [sempre](${sempre}) |
| Elo vivo | [alma](${alma}) · [vida](${vidaPalavra}) · [Vida](${vida}) · [emoção](${empatia}) |
| Elo léxico | [língua portuguesa](${lingua}) · [verdade](${verdade}) · [Guia](${guia}) |
| Fonte | [Wiktionary · nap](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o **sono breve** que interrompe o dia para repor. No lab: ferramenta de ofício — às vezes o melhor próximo [gesto](${gesto}) é parar.

## 2. Nap × sesta × sono × «dia» (HU)

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **nap** | Cochilo curto (loan EN) | Uso BR informal / tech |
| **sesta / soneca** | PT nativo | Preferir em texto formal lab |
| **sono** | Ciclo maior | Nap ≠ noite completa |
| **power nap** | Pausas ~10–20 min (discurso popular) | Não é prescrição médica |
| **nap (húngaro)** | «dia» | Falso amigo no pack multilíngue |

**H1:** no lab BR, *nap* = sono curto emprestado do inglês (alta confiança no uso).  
**H2:** descanso curto pode ser ofício — não preguiça automática.  
**H3:** não confundir com húngaro *nap* («dia»).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Cochilo** | Sono breve diurno | Alta |
| **Power nap** | Pausinha estratégica (discurso) | Alta (uso vivo) |
| **Verbo EN** | *to nap* | Alta (EN) |
| **Tecido / felpa** (EN outro sentido) | *nap* da superfície de pano | Baixa no BR oral — fora do foco |
| **Ofício lab** | Parar para a [alma](${alma}) voltar | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *nap* |
|-------|-------------------|
| [Gesto](${gesto}) · [caminho](${caminho}) | Parar também é passo |
| [Alma](${alma}) · [vida](${vidaPalavra}) · [Vida](${vida}) | Onde o descanso chega |
| [Risco](${risco}) | Exaustão sem pausa |
| [Sempre](${sempre}) | «Sempre ligado» ≠ ofício sustentável |
| [Verdade](${verdade}) | Admitir cansaço sem pose |
| [Língua portuguesa](${lingua}) | Loanword × *soneca* / *sesta* |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Dar um nap»** | Cochilar rápido | [Gesto](${gesto}) de cuidado |
| **Power nap** | Produtividade / wellness | Não vira obrigação |
| **App / timer** | Contar minutos | Ferramenta — não chefe |
| **Preferir PT** | Soneca / sesta | Em fichas formais do lab |
| **Ofício** | Inspeção cansada | Às vezes o Cap. espera o nap |

**Finalidade-mãe:** nomear o **nap** para **descansar com ofício** — breve, consciente, a serviço da [vida](${vidaPalavra}) e da [alma](${alma}).

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **depois de parar um pouco**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Nap = preguiça» = falso · «pausa que devolve o gesto» = ofício |
| Par vivo | [alma](${alma}) · [gesto](${gesto}) · [vida](${vidaPalavra}) |

**Veredicto:** Valeu !!! **também ao cochilar**. Nap sem culpa = cuidado; nap como fuga eterna = outro assunto — inspecionar com [verdade](${verdade}).

## Hipóteses (síntese)

**H1:** objeto = EN *nap* → sono curto no BR vivo.  
**H2:** ofício = pausa que serve o [caminho](${caminho}).  
**H3:** elos = [gesto](${gesto}) · [alma](${alma}) · [vida](${vidaPalavra}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é prescrição médica de sono.  
- Loanword ≠ apagar *soneca* / *sesta*.  
- Húngaro *nap* ≠ este sentido.

## Status

**Aprovado** — **nap** fichado: sono curto EN, ofício de pausa, rede com alma/gesto e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Alma](${alma}) · [▶ Gesto](${gesto}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **nap** as used in Brazilian Portuguese — English loanword for a **short sleep** / power nap. Links [gesto](${gesto}), [alma](${alma}), [vida](${vidaPalavra}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · nap](${wiki}). Not a clinical sleep protocol. Hungarian *nap* (“day”) is a false friend.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **nap** |
| Sense | Short daytime sleep |
| Lab type | Brief rest × craft |
| Links | [alma](${alma}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **after a short stop**, today.

## Status

**Approved** — short rest · craft pause · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Alma](${alma}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **nap** en uso BR — préstamo del inglés para **sueño corto** / power nap. Vínculos [gesto](${gesto}), [alma](${alma}), [vida](${vidaPalavra}), [¡Valeu !!!](${mantra}).

> Nota: [Wiktionary · nap](${wiki}). No es protocolo clínico. Húngaro *nap* («día») es falso amigo.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **nap** |
| Sentido | Sueño breve diurno |
| Tipo lab | Descanso corto × oficio |
| Vínculos | [alma](${alma}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **después de parar un poco**, hoy.

## Estado

**Aprobado** — descanso corto · pausa de oficio · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Alma](${alma}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildNapPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildNapBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 100;
  return makePalavra({
    title: 'Inspeção: Nap — sono curto e pausa de ofício',
    titleEn: 'Inspection: Nap — short sleep and craft pause',
    titleEs: 'Inspección: Nap — sueño corto y pausa de oficio',
    excerpt:
      'Palavras: «nap» (EN) — cochilo / power nap no BR; elos gesto, alma, vida; Valeu !!!',
    excerptEn:
      'Words: “nap” (EN) — short sleep / power nap in BR use; links gesto, alma, vida; Valeu !!!',
    excerptEs:
      'Palabras: «nap» (EN) — siesta corta / power nap en uso BR; vínculos gesto, alma, vida; ¡Valeu !!!',
    slug: 'inspecao-palavra-nap',
    date: '2026-08-03T18:50:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Nap · palavra',
    coverImage: '/imagens/inspecoes/nap-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNapPost,
  buildNapBodies
};
