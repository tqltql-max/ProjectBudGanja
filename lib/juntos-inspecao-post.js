'use strict';

/**
 * Inspeção Palavras · juntos
 * Lat. iunctus ← iungere · estado de estar junto × elos (anéis que seguram)
 * Cruza com elo de ligação · ≠ sozinho · ≠ simbiose · ≠ slogan
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/juntos-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/juntos';
const WIKI_JUNTO = 'https://pt.wiktionary.org/wiki/junto';
const WIKI_JUNTAR = 'https://pt.wiktionary.org/wiki/juntar';
const WIKI_LAT = 'https://en.wiktionary.org/wiki/iunctus#Latin';
const WIKI_IUNGERE = 'https://en.wiktionary.org/wiki/iungo#Latin';
const WIKI_ELO = 'https://pt.wiktionary.org/wiki/elo';

function poemJuntosPt() {
  return `Juntos é o estado.
Elos são os anéis.

Dá para estar juntos sem elo —
multidão, slogan, coincidência.
Dá para ter elos sem estar juntos —
corrente na gaveta, link partido.

No cruzamento da fita
as duas voltas ainda são uma.
Aí o elo trabalha
e o juntos deixa de ser pose.

Valeu !!!
juntos com elos,
sem fingir que o slogan segura a corrente.`;
}

function poemJuntosEn() {
  return `Juntos is the state.
Elos are the rings.

You can be together without a link —
a crowd, a slogan, a coincidence.
You can have links without being together —
a chain in a drawer, a broken URL.

At the ribbon’s crossing
both loops are still one.
There the ring does its work
and together stops being a pose.

Valeu !!!
together with links,
without pretending a slogan holds the chain.`;
}

function poemJuntosEs() {
  return `Juntos es el estado.
Elos son los anillos.

Se puede estar juntos sin eslabón —
multitud, eslogan, coincidencia.
Se puede tener eslabones sin estar juntos —
cadena en el cajón, enlace partido.

En el cruce de la cinta
las dos vueltas aún son una.
Ahí el eslabón trabaja
y el juntos deja de ser pose.

¡Valeu !!!
juntos con eslabones,
sin fingir que el eslogan sujeta la cadena.`;
}

function buildJuntosBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-juntos.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const sozna = '/posts/post-inspecao-palavra-sozna.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const juntou = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const revoada = '/posts/post-inspecao-expressao-revoada.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[juntos](${self})** — o **estado de estar junto** (lat. *iunctus* ← *iungere*, «unir, jungir»). Pedido de campo: *inspeção da palavra Juntos cruze com elos*. Esta ficha cobre o **objecto**, o par **junto / juntos / juntas**, o verbo **juntar**, e o **cruzamento** com os **[elos](${elo})** — os anéis que seguram, não o slogan. Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · juntos](${WIKI}), [junto](${WIKI_JUNTO}), [juntar](${WIKI_JUNTAR}), lat. [*iunctus*](${WIKI_LAT}), [*iungere*](${WIKI_IUNGERE}), [elo](${WIKI_ELO}). **Ficha de palavra ≠ campanha, ≠ terapia de grupo, ≠ manual de corrente.** Sem afiliação política ou comercial. Tom: [verdade](${verdade}) do que junta de facto.

**Gatilho:** *jutos* / *jntos* / *JUNTOS* / *junto* / *juntas* → lema **juntos**. *elos* / *elo* nesta ficha = **cruzamento** — o anel já inspeccionado em [elo de ligação](${elo}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **juntos** (masc. pl.; também advérbio: «vamos juntos») |
| Par | **junto** (sg.) · **juntas** (fem. pl.) |
| Verbo da família | **juntar** — pôr junto; o estado chama-se *juntos* |
| Classe | Adjectivo / advérbio de modo |
| Étimo (trabalho) | Lat. *iunctus* («unido») ← *iungere* («unir, jungir») — confiança: **alta** |
| Família | *junto* · *juntar* · *junção* · *conjunto* · *conjugar* · *junta* |
| Cognatos | esp. *juntos* · it. *giunti* · fr. *ensemble* (outra raiz: *insimul*) · ing. *joint / join* · lat. *iunctus* |
| Tipo BudGanja | Palavra — estado × [elos](${elo}) × [relação](${relacao}) |
| Elo mínimo | **[elos](${elo})** — o anel que junta; sem elo, *juntos* pode ser pose |
| Elo ofício | [relação](${relacao}) · [conexão](${conexao}) · [respeito](${respeito}) · [gesto](${gesto}) |
| Elo vivo | [simbiose](${simbiose}) · [sozinho](${sozna}) · [vida](${vidaPalavra}) · [Vida](${vida}) |
| Fonte | [Wikcionário · juntos](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia o **estar junto** — não o anel, não o conjunto matemático, não o cartaz. No lab: *juntos* bom = estado **com elos**; *juntos* mau = slogan sem corrente.

## 2. Hipóteses e método

**H1:** *juntos* herda *iungere* — **há junção**, não só proximidade.  
**H2:** **[elos](${elo})** são o ofício do anel; *juntos* é o **estado** depois (ou durante) da junção. Cruzam-se; **não** se fundem.  
**H3:** [sozinho](${sozna}) é o outro pólo do estado; [simbiose](${simbiose}) é um **modo** de viver juntos, não o lema.  
**H4:** [Valeu !!!](${mantra}) é o juntos possível **hoje** — um elo de cada vez.

Passos: (1) étimo e formas; (2) cruzamento com elos; (3) cortes; (4) rede; (5) limites.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *iungere* | Unir, jungir, pôr sob o mesmo jugo | Alta |
| Lat. *iunctus* | Particípio — o que **já** está unido | Alta |
| PT *junto / juntos* | Adjectivo de estado; plural vira também advérbio | Alta |
| *juntar* | Verbo da mesma raiz — o gesto de pôr junto | Alta |
| *conjunto* | «posto junto» — sala de conjunto / set; **não** é este lema | Alta (corte) |
| *junta* (órgão / junta militar) | Substantivo outro ofício — **não** é o feminino de *juntos* sozinho | Alta (corte) |

**Veredicto etimológico:** origem **latina** fechada (*iungere* → *iunctus* → junto / juntos). O que oscila é a **sala de uso** (estado × slogan × órgão), não o étimo.

## 4. Juntos × elos (o cruzamento pedido)

Pedido de campo: *cruze com elos*. O laboratório lê assim:

| Peça | Papel | Sem a outra |
|------|-------|-------------|
| **juntos** | O **estado** — A e B no mesmo sítio / no mesmo ofício | Multidão, coincidência, cartaz |
| **[elo](${elo}) / elos** | O **anel** que segura A e B | Corrente na gaveta; [link](${link}) partido |
| **Cruzamento** | O ponto onde estado e anel **trabalham juntos** | Pose; elo solto |

Na [lemniscata](${lemniscata}), o [elo de ligação](${elo}) **é** o cruzamento das duas voltas. *Juntos* nomeia o facto de as voltas **ainda serem uma**. Sem o cruzamento, o oito deita-se e não comunica; sem o estado, o anel não tem quem juntar.

**Regra:** [cruzar](${relacao}) A com B ≠ fundir A e B. *Juntos* não engole *elos*; *elos* não substituem *juntos*.

| Situação | Bom (ofício) | Mau (ruído) |
|----------|--------------|-------------|
| Corrente | Anéis que encaixam + elos fechados | «Estamos juntos» com elo partido |
| Lab | Fichas que se cruzam de verdade | Hub cheio e elos soltos |
| Cultivo / [Vida](${vida}) | Ninguém cultiva [sozinho](${sozna}) — e os elos são gente, planta, mapa | Slogan de equipa sem rega |
| ∞ / aula XIV | Cruzamento = [elo de ligação](${elo}); estado = **juntos** | Colar eternidade no cartaz |

## 5. Formas e salas

| Forma | Ofício | Corte |
|-------|--------|-------|
| **junto** | Perto / unido (sg.) — «fico junto» | *junto a* = proximidade, nem sempre companhia |
| **juntos** | Estado (pl.) e advérbio — lema desta ficha | ≠ campanha eleitoral / marca homónima |
| **juntas** | Fem. pl. do adjectivo | ≠ *juntas* (articulações) ≠ *junta* (órgão) |
| **juntar** | Verbo — o [gesto](${gesto}) de pôr junto | A [boca juntou](${juntou}) dois objectos num sopro; o estado chama-se *juntos* |
| **conjunto** | Set / banda / «o conjunto» | Sala de colecção — não é o estado |
| **junção** | O sítio / o acto de unir | Geografia e gramática; irmã, não lema |

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Juntos** | Sinónimo preguiçoso de [relação](${relacao}) | Estado de estar junto — *iunctus* |
| **Elos** | Plural decorativo | Anéis com ofício — [elo de ligação](${elo}) |
| **Slogan «juntos»** | Comunidade | Pose se não houver corrente |
| **[Simbiose](${simbiose})** | Qualquer juntos | *Syn* + *bíos* — viver juntos sob camadas |
| **[Sozinho](${sozna})** | Falha de *juntos* | Outro estado; o ofício também começa só |
| **[Nó](${no})** | O mesmo que elo | O nó **aperta**; o elo **encadeia**; *juntos* **está** |
| **[Gêmeos](${gemeos})** | Juntos por étimo | Par nascido; não é este lema |
| **[Revoada](${revoada})** | Juntos no ar | Bando que levanta voo — expressão irmã de uso |

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Elo de ligação](${elo})** | O anel / o cruzamento — par pedido desta ficha |
| [Relação](${relacao}) | O *entre*; *cruzar* é o verbo que põe A e B juntos sem fundir |
| [Conexão](${conexao}) · [ligar](${ligar}) · [link](${link}) | Acção de ligar · circuito · loan EN |
| [Simbiose](${simbiose}) | Viver juntos — caso especial, não o lema |
| [Sozinho / sozna](${sozna}) | O outro pólo do estado |
| [Nó](${no}) | Laço que prende — distinto do elo que passa |
| [A orelha cola o que a boca juntou](${juntou}) | *Juntou* = o sopro; *juntos* = o estado depois |
| [Lemniscata](${lemniscata}) | A fita cujo cruzamento **é** o elo |
| [Gêmeos](${gemeos}) · [revoada](${revoada}) | Par nascido · bando no ar |
| [Gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) · [caminho](${caminho}) | Como se junta, e com que rasto |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Catálogo |
| [Vida](${vidaPalavra}) · trilha [Vida](${vida}) | Ninguém cultiva sozinho — elos no chão |
| [Valeu !!!](${mantra}) | Fechar juntos, com o elo de hoje |

### Como ler

1. Entrar pelo **estado** (esta ficha) ou pelos **[elos](${elo})**.  
2. Se vier pelo slogan, pedir o anel: onde está o elo?  
3. Se vier pelo [sozinho](${sozna}), não moralizar — são dois estados.  
4. Se vier pela [simbiose](${simbiose}), declarar a camada (biologia × metáfora).  
5. Fechar com [Valeu !!!](${mantra}).

## Poema Vida

\`\`\`poem
${poemJuntosPt()}
\`\`\`

## 8. Limites

- Não é campanha, partido, igreja nem marca homónima.  
- Não é terapia de casal nem protocolo de equipa.  
- Não inventaria todas as *juntas* anatómicas nem todas as *juntas* de governo.  
- O anel em si fica na expressão [elo de ligação](${elo}); aqui o ofício é o **cruzamento** estado × anel.  
- [Link](${link}) / Klink e [nó](${no}) ficam nas fichas deles.

## Status

**Aprovado** — **juntos** fichado: objecto (*iungere* → *iunctus*), formas (junto / juntas / juntar), **cruzamento com [elos](${elo})** (estado ≠ anel; juntos sem elo = pose), cortes ([sozinho](${sozna}) · [simbiose](${simbiose}) · conjunto · slogan); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Elo de ligação](${elo}) · [▶ Relação](${relacao}) · [▶ Sozinho](${sozna}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[juntos](${self})** — the **state of being together** (Lat. *iunctus* ← *iungere*, “to join”). Field request: *inspect the word Juntos; cross it with elos*. Covers the **object**, the forms **junto / juntos / juntas**, the verb **juntar**, and the **crossing** with **[elos](${elo})** — the rings that hold, not the slogan. Close: [Valeu !!!](${mantra}).

> Note: [Wiktionary · juntos](${WIKI}), [*iunctus*](${WIKI_LAT}), [elo](${WIKI_ELO}). Word sheet ≠ campaign, group therapy, or chain manual.

## Object

| Field | Value |
|-------|-------|
| Word | **juntos** (masc. pl.; also adverb) |
| Etymon | Lat. *iunctus* ← *iungere* (high confidence) |
| Lab type | State × **[elos](${elo})** × [relação](${relacao}) |
| Minimum link | **[elo de ligação](${elo})** — the ring that joins |
| Also | [sozinho](${sozna}) (other pole) · [simbiose](${simbiose}) (a way of living together) |
| Date | ${inspected} |

**Crossing:** *juntos* names the **state**; *elos* name the **rings**. You can be together without a link (crowd, slogan) and have links without being together (chain in a drawer). Craft: together **with** rings.

\`\`\`poem
${poemJuntosEn()}
\`\`\`

## Status

**Approved** — *iungere* path documented; state distinguished from ring, slogan, set, and [sozinho](${sozna}).

[▶ Words](${hub}) · [▶ Elo de ligação](${elo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **[juntos](${self})** — el **estado de estar junto** (lat. *iunctus* ← *iungere*, «unir»). Pedido de campo: inspeccionar *Juntos* y **cruzarlo con elos**. Cubre **objeto**, formas **junto / juntos / juntas**, el verbo **juntar**, y el **cruce** con los **[elos](${elo})** — los anillos que sujetan, no el eslogan. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · juntos](${WIKI}), [*iunctus*](${WIKI_LAT}), [elo](${WIKI_ELO}). Ficha ≠ campaña, ni terapia, ni manual de cadena.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **juntos** (masc. pl.; también adverbio) |
| Étimo | Lat. *iunctus* ← *iungere* (confianza alta) |
| Tipo lab | Estado × **[elos](${elo})** × [relação](${relacao}) |
| Vínculo mínimo | **[elo de ligação](${elo})** — el anillo que junta |
| También | [sozinho](${sozna}) (el otro polo) · [simbiose](${simbiose}) (un modo de vivir juntos) |
| Fecha | ${inspected} |

**Cruce:** *juntos* nombra el **estado**; *elos* nombran los **anillos**. Se puede estar juntos sin eslabón (multitud, eslogan) y tener eslabones sin estar juntos (cadena en el cajón). Oficio: juntos **con** anillos.

\`\`\`poem
${poemJuntosEs()}
\`\`\`

## Estado

**Aprobada** — vía *iungere* documentada; estado distinto de anillo, eslogan, conjunto y [sozinho](${sozna}).

[▶ Palabras](${hub}) · [▶ Elo de ligação](${elo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildJuntosPost() {
  const { body, contentEn, contentEs, wiki } = buildJuntosBodies();
  let seriesOrder = 292;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-juntos');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts
          .filter((p) => p.series === 'palavras-origem')
          .map((p) => p.seriesOrder)
          .filter((n) => typeof n === 'number')
      );
      const max = taken.size ? Math.max(...taken) : 291;
      seriesOrder = max + 1;
    }
  } catch (_) {
    /* keep 292 */
  }

  return makePalavra({
    title: 'Inspeção: Juntos — o estado, cruzado com os elos',
    titleEn: 'Inspection: Juntos — the state, crossed with the links',
    titleEs: 'Inspección: Juntos — el estado, cruzado con los eslabones',
    excerpt:
      'Palavras: «juntos» (lat. iunctus ← iungere) — estado de estar junto; cruza com elos (anel ≠ slogan); Valeu !!!',
    excerptEn:
      'Words: “juntos” (Lat. iunctus ← iungere) — state of being together; crosses with elos (ring ≠ slogan); Valeu !!!',
    excerptEs:
      'Palabras: «juntos» (lat. iunctus ← iungere) — estado de estar junto; cruza con elos (anillo ≠ eslogan); ¡Valeu !!!',
    slug: 'inspecao-palavra-juntos',
    date: '2026-08-24T10:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Juntos · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildJuntosPost,
  buildJuntosBodies,
  poemJuntosPt,
  poemJuntosEn,
  poemJuntosEs
};
