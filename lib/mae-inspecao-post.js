'use strict';

/**
 * Inspeção Palavras · mãe
 * Eixos: lat. mater · tipografia fia → mãe · fia (NE/filha) ≠ mãe ·
 * Dona Maria · alma / coração / vida · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildMaeBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const donaMaria = '/posts/post-inspecao-personagem-dona-maria.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/m%C3%A3e';

  const body = `## Escopo

Inspeção editorial da palavra **mãe** — quem **gera, cria e guarda**; no português do Brasil, centro de afecto, autoridade doméstica e metáfora de origem («língua-mãe», «casa-mãe»). Pedido do lab: **alterar** a forma **fia** para a forma canónica **mãe** — tipografia e ofício, sem confundir com o oral nordestino *fia* (= *filha*).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mãe](${wiki}), série [Palavras](${hub}), personagem [Dona Maria](${donaMaria}) no hub [Vida](${vida}). **Ficha ≠ biografia clínica nem sermão familiar.** Tom: Inspetor BudGanja — *mãe* nomeia vínculo e cuidado; ofício honra sem idolatrar. Sem afiliação religiosa exclusiva.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **mãe** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *mater* → pt. *mãe* — confiança: **alta** |
| Família | *maternal* · *materno* · *madrinha* · *madrasta* · *matriz* |
| Cognatos / paralelos | esp. *madre* · fr. *mère* · it. *madre* · ing. *mother* · lat. *mater* |
| Tipografia lab | **fia → mãe** (forma canónica desta ficha) |
| Tipo BudGanja | Palavra — origem × cuidado × vínculo |
| Elo vivo | [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [respeito](${respeito}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [relação](${relacao}) · [língua portuguesa](${lingua}) |
| Elo narrativa | [Dona Maria](${donaMaria}) · hub [Vida](${vida}) |
| Fonte | [Wikcionário · mãe](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome da **ascendente feminina** e, por extensão, da origem que nutre («terra-mãe», «língua-mãe»). No lab: grafia **mãe**; não deixar *fia* (outra palavra) roubar o lugar.

## 2. Tipografia: fia → mãe

| Forma | Leitura | Ofício |
|-------|---------|--------|
| **mãe** | Forma canónica PT | Objecto desta ficha |
| **fia** (pedido / tipografia) | Lapso ou atalho a corrigir **para mãe** nesta inspeção | **fia → mãe** |
| **fia** (oral NE) | Aférese viva de **filha** («ô fia») | **≠ mãe** — parentesco inverso; não fundir |
| **filha** | Descendente feminina | Espelho de mãe, não sinónimo |

**H1:** *mãe* < lat. *mater* (alta confiança).  
**H2:** nesta ficha, **fia → mãe** é a correção tipográfica/pedido do lab.  
**H3:** o oral nordestino *fia* (= filha) é **outra** palavra — mapear, não confundir.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Parentesco** | Ascendente feminina | Alta |
| **Afecto / cuidado** | Quem cria, protege, ensina | Alta |
| **Metáfora de origem** | Língua-mãe · terra-mãe · casa-mãe | Alta |
| **Tratamento** | «mãe» como vocativo de carinho/respeito | Alta (uso vivo BR) |
| **Ofício lab** | Cuidado com [gesto](${gesto}) e [verdade](${verdade}) — ver [Dona Maria](${donaMaria}) | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *mãe* |
|-------|-------------------|
| [Dona Maria](${donaMaria}) · [Vida](${vida}) | Matriarca do laboratório — «sábia mãe do Inspetor» |
| [Alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) | Centro afectivo do cuidado |
| [Respeito](${respeito}) · [gesto](${gesto}) · [verdade](${verdade}) | Como se honra sem idolatrar |
| [Relação](${relacao}) | O «entre» familiar e social |
| [Língua portuguesa](${lingua}) | Casa da palavra *mãe* |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Minha mãe»** | Ascendente | Vínculo concreto — sem romance barato |
| **Vocativo «mãe»** | Carinho / pedido | [Respeito](${respeito}) vivo |
| **Língua-mãe / terra-mãe** | Origem | Elo [língua portuguesa](${lingua}) · cultivo |
| **«Mãe de…»** (figurado) | Origem de algo | Metáfora com rasto |
| **Ofício lab** | Cuidar como quem cria | [Dona Maria](${donaMaria}) · [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear a **mãe** para **honrar a origem com ofício** — cuidado com [gesto](${gesto}), sem confundir com *fia*/filha nem com tipografia frouxa.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **para cuidar com verdade**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Idolatrar sem [verdade](${verdade}) · apagar a mãe · misturar *fia* (filha) com *mãe* |
| Par vivo | [Dona Maria](${donaMaria}) · [alma](${alma}) · [coração](${coracao}) · [Vida](${vida}) |

**Veredicto:** Valeu !!! **como quem cria com ofício**. Mãe sem [gesto](${gesto}) = título vazio; mãe com [verdade](${verdade}) = vínculo que nutre.

## Hipóteses (síntese)

**H1:** *mãe* < lat. *mater* (alta confiança).  
**H2:** tipografia lab = **fia → mãe**.  
**H3:** oral NE *fia* (= filha) ≠ *mãe*.  
**H4:** elos = [Dona Maria](${donaMaria}) · [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}).  
**H5:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não fecha doutrina religiosa nem terapia familiar.  
- Não é biografia de pessoa real fora do quadro [Dona Maria](${donaMaria}) / lab.  
- *Fia* nordestina (= filha) fica mapeada, sem virar sinónimo.

## Status

**Aprovado** — **mãe** fichada: *mater*, tipografia **fia → mãe**, rede com [Dona Maria](${donaMaria}) / [alma](${alma}) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Dona Maria](${donaMaria}) · [▶ Alma](${alma}) · [▶ Coração](${coracao}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **mãe** (mother) — Lat. *mater*. Lab request: correct tipography **fia → mãe**. Do not confuse NE oral *fia* (= *filha*, daughter) with *mãe*. Links [Dona Maria](${donaMaria}), [alma](${alma}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · mãe](${wiki}). Not a clinical or religious treatise.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **mãe** |
| Etymon | Lat. *mater* — high confidence |
| Tipography | **fia → mãe** |
| Lab type | Origin × care × bond |
| Links | [Dona Maria](${donaMaria}) · [alma](${alma}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **to care with truth**, today.

## Status

**Approved** — *mater* · fia→mãe · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Dona Maria](${donaMaria}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **mãe** (madre) — lat. *mater*. Pedido del lab: tipografía **fia → mãe**. No confundir el oral NE *fia* (= *filha*) con *mãe*. Vínculos [Dona Maria](${donaMaria}), [alma](${alma}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · mãe](${wiki}). No es tratado clínico ni religioso.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **mãe** |
| Étimo | lat. *mater* |
| Tipografía | **fia → mãe** |
| Tipo lab | Origen × cuidado × vínculo |
| Vínculos | [Dona Maria](${donaMaria}) · [alma](${alma}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **para cuidar con verdad**, hoy.

## Estado

**Aprobada** — *mater* · fia→mãe · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Dona Maria](${donaMaria}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMaePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMaeBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 111;
  return makePalavra({
    title: 'Inspeção: Mãe — origem, cuidado e tipografia fia → mãe',
    titleEn: 'Inspection: Mãe — origin, care and tipography fia → mãe',
    titleEs: 'Inspección: Mãe — origen, cuidado y tipografía fia → mãe',
    excerpt:
      'Palavras: «mãe» (lat. *mater*) — origem e cuidado; tipografia fia → mãe; fia (NE/filha) ≠ mãe; elos Dona Maria, alma, coração; Valeu !!!',
    excerptEn:
      'Words: “mãe” (Lat. *mater*) — origin and care; tipography fia → mãe; NE fia (= daughter) ≠ mother; links Dona Maria, alma; Valeu !!!',
    excerptEs:
      'Palabras: «mãe» (lat. *mater*) — origen y cuidado; tipografía fia → mãe; fia NE (= hija) ≠ madre; vínculos Dona Maria, alma; ¡Valeu !!!',
    slug: 'inspecao-palavra-mae',
    date: '2026-08-03T23:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mãe · palavra',
    coverImage: '/imagens/inspecoes/mae-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMaePost,
  buildMaeBodies
};
