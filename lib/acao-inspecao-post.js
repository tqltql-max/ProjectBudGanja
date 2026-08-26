'use strict';

/**
 * Inspeção Palavras · ação
 * Lat. āctiō ← agere · gesto × bolsa × processo × filme
 * Grafia: ação (BR/AO90) · acção (PT tradicional)
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/acao-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/a%C3%A7%C3%A3o';
const WIKI_LAT = 'https://en.wiktionary.org/wiki/actio#Latin';
const WIKI_AGERE = 'https://en.wiktionary.org/wiki/ago#Latin';
const WIKI_WP = 'https://pt.wikipedia.org/wiki/A%C3%A7%C3%A3o';

function buildAcaoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-acao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const marcha = '/posts/post-inspecao-expressao-meter-marcha.html';
  const melhor = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const cultivo = '/guia/cultivo-basico.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const ao90 = '/posts/post-inspecao-palavra-ao90.html';

  const body = `## Escopo

Inspeção editorial da palavra **[ação](${self})** — o **fazer nomeado**. [Étimo](${etimo}): latim *āctiō* ← *agere* («fazer, impulsionar»). Pedido de campo: *inspeção da palavra ação*. Esta ficha cobre o **objecto**, a grafia **ação** (BR / [AO90](${ao90})) × **acção** (PT tradicional), os **sentidos** (ofício · processo · bolsa · filme · física) e o corte com o **[gesto](${gesto})**. Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ação](${WIKI}), lat. [*āctiō*](${WIKI_LAT}), [*agere*](${WIKI_AGERE}), [Wikipédia · Ação](${WIKI_WP}). **Ficha de palavra ≠ manual de produtividade, ≠ código de processo, ≠ dica de bolsa, ≠ crítica de filme de acção.** Sem afiliação comercial. Tom: [verdade](${verdade}) do que a mão faz.

**Gatilho:** *acao* / *acção* / *ações* / *action* → lema **ação**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **ação** (plural **ações**) |
| Grafia irmã | **acção** — PT europeu tradicional (o *cc* marca o étimo) |
| Classe | Substantivo feminino |
| [Étimo](${etimo}) (trabalho) | Lat. *āctiō, -ōnis* ← *agere / āctus* («fazer, impulsionar») — confiança: **alta** · peça na ficha [étimo](${etimo}) |
| Família | *ato* / *acto* · *actor* · *ativo* · *agência* · *reagente* · *transação* |
| Cognatos | esp. *acción* · fr. *action* · it. *azione* · ing. *action* · lat. *āctiō* |
| Tipo BudGanja | Palavra — ofício × [gesto](${gesto}) × salas (bolsa · processo · filme) |
| Elo mínimo | **[gesto](${gesto})** — o acto concreto da [mão](${mao}) |
| Elo ofício | [caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) · [Faça o melhor](${melhor}) |
| Elo arranque | [Meter marcha](${marcha}) — pôr a ação em movimento |
| Elo vivo | [cultivo](${cultivo}) · [Vida](${vida}) · [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · ação](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia o **fazer** — não a pose, não o plano na gaveta. No lab: ação boa = [gesto](${gesto}) com [caminho](${caminho}) e [verdade](${verdade}). Ação má = ruído, processo vazio, ou «já fiz» sem rasto.

## 2. Hipóteses e método

**H1:** *ação* herda *agere* — **há impulso**, não só discurso.  
**H2:** o **[gesto](${gesto})** é a unidade mínima; a **ação** é o fazer nomeado (um gesto, ou uma cadeia).  
**H3:** **ações** da bolsa, **ação** judicial e **filme de ação** são **outras salas** — mesma grafia, outros ofícios.  
**H4:** [Valeu !!!](${mantra}) é a melhor ação possível **hoje** — sem esperar o filme.

Passos: (1) étimo e grafia; (2) sentidos; (3) cortes; (4) rede; (5) limites.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *āctiō* ← *agere* | Fazer, conduzir, impulsionar → o nome do feito | Alta |
| *acto* / *ato* | O facto pontual; *ação* é o processo / a qualidade do fazer | Alta |
| Grafia **acção** | Conserva o *ct* latino (*actio*) na tradição europeia | Alta (história) |
| Grafia **ação** | BR e [AO90](${ao90}) — o *ç* absorve o *ct* na fala | Alta (uso vivo) |
| Ing. *action* | Cognato, não étimo do português | Alta (paralelo) |

**Veredicto etimológico:** origem **latina** fechada (*agere* → *āctiō* → ação / acção). Gloss de campo: «fazer, impulsionar». O que oscila é a **sala de uso**, não o [étimo](${etimo}). Ofício da procura: [etimologia](${etimologia}).

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Ofício / fazer | «passar à ação»; [meter marcha](${marcha}) | Lema desta ficha — a mão no [caminho](${caminho}) |
| Gesto | regar, escrever, inspecionar | Unidade mínima — ficha **[gesto](${gesto})** |
| Processo | ação judicial; «entrar com uma ação» | Sala jurídica — não é o cultivo |
| Bolsa | **ações** (papéis, cotação) | Plural financeiro — **não** é o plural do ofício |
| Ecrã | filme de ação; herói de ação | Género — sem glamourizar dano |
| Física | ação e reação (Newton) | Par mecânico — outra sala |
| Lab | cultivar, fichar, [Valeu !!!](${mantra}) | Ação com [verdade](${verdade}) e limite |

## 5. Gesto ≠ ação (e as outras salas)

| Termo | Papel | Exemplo |
|-------|-------|---------|
| **[Gesto](${gesto})** | Acto mínimo — o como se faz | Abrir a torneira; citar a fonte |
| **Ação** | Fazer nomeado — o quê se empreende | Inspecionar; cultivar; pedir desculpa |
| **Ato / acto** | Facto pontual, muitas vezes formal | Ato notarial; acto médico |
| **Ações** (bolsa) | Título de propriedade | Comprar ações ≠ passar à ação |
| **Ação** (juízo) | Processo em tribunal | Entrar com ação ≠ [gesto](${gesto}) de cuidado |

**Regra:** o [gesto](${gesto}) **faz**; a **ação** **nomeia a cadeia**. Confundir ação com ações da bolsa, ou com o filme, vira ficha oca — barulho sem mão.

| Situação | Bom (ofício) | Mau (ruído) |
|----------|--------------|-------------|
| Cultivo | [Gesto](${gesto}) no [cultivo](${cultivo}) | Plano eterno sem rega |
| Inspeção | Fichar com [verdade](${verdade}) | Slogan sem fonte |
| Comunidade | [Faça o melhor](${melhor}) nesta mão | «Já fiz» sem rasto |
| Bolsa / juízo | Nomear a sala certa | Fundir cotação com ofício |

## 6. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Fazer** | Passar à ação | [Gesto](${gesto}) + [caminho](${caminho}) |
| **Arrancar** | Começar | [Meter marcha](${marcha}) |
| **Qualidade** | Boa ação / má ação | [Faça o melhor](${melhor}) · [respeito](${respeito}) |
| **Plural ofício** | Várias ações (feitos) | Cadeia de gestos — ≠ papéis da bolsa |
| **Fechar** | Depois de fazer | [Valeu !!!](${mantra}) — a melhor ação **hoje** |

**Finalidade-mãe:** nomear a **ação** para **separar ofício de pose** — *agere* com destino; [gesto](${gesto}) na mão; salas (bolsa · juízo · filme) cortadas.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[gesto](${gesto})** | Unidade mínima do fazer |
| [caminho](${caminho}) · [verdade](${verdade}) | Percurso e conteúdo verificável |
| [Meter marcha](${marcha}) · [Faça o melhor](${melhor}) | Arranque e qualidade |
| [mão](${mao}) · [respeito](${respeito}) | Quem faz, e como trata o outro |
| [cultivo](${cultivo}) · [Vida](${vida}) | Onde a ação vira planta e rasto |
| [étimo](${etimo}) · [etimologia](${etimologia}) | Peça *āctiō* ← *agere* · ofício de a procurar |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Catálogo |
| [Valeu !!!](${mantra}) | Ação viva — o melhor possível nesta mão |

### Como ler

1. Entrar pelo **fazer** (esta ficha) ou pelo **[gesto](${gesto})**.  
2. Se vier pelas **ações** da bolsa ou pelo **juízo**, voltar ao étimo *agere* e cortar a sala.  
3. Se vier pelo filme, não glamourizar dano — género ≠ ofício.  
4. Fechar com [Valeu !!!](${mantra}).  
5. Voltar ao [hub](${hubAll}).

## 8. Limites

- Não é protocolo de produtividade nem coaching.  
- Não é código de processo civil nem manual da bolsa.  
- Não inventaria todos os filmes de ação.  
- Física (ação-reação) fica apontada, não derivada.

## Status

**Aprovado** — **ação** / **acção** fichada: objeto (*agere* → *āctiō*), grafia BR-AO90 × PT tradicional, sentidos (ofício · juízo · bolsa · filme), corte **[gesto](${gesto}) ≠ ação ≠ ações**; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Étimo](${etimo}) · [▶ Gesto](${gesto}) · [▶ Caminho](${caminho}) · [▶ Meter marcha](${marcha}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ação** (action; EU traditional spelling **acção**) — Latin *āctiō* ← *agere* (“to do, to drive”). Field request: inspect the word *ação*. Covers **object**, **senses** (craft · lawsuit · stock shares · action film · physics), and the cut with **[gesto](${gesto})** (minimal act). Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · ação](${WIKI}), [*āctiō*](${WIKI_LAT}). Word sheet ≠ productivity manual, civil procedure, stock tip, or action-movie review.

## Object

| Field | Value |
|-------|-------|
| Word | **ação** / **acção** (plural **ações**) |
| Etymon | Lat. *āctiō* ← *agere* (high confidence) |
| Lab type | Craft × [gesto](${gesto}) × other rooms (shares · lawsuit · film) |
| Links | [gesto](${gesto}) · [caminho](${caminho}) · [Meter marcha](${marcha}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Cut:** [gesto](${gesto}) is the minimal act; **ação** names the doing. Stock **ações**, a lawsuit, and an action film are **other rooms**.

## Status

**Approved** — *agere* path documented; craft distinguished from shares, court and genre.

[▶ Words](${hub}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **ação** (acción; grafía PT tradicional **acção**) — lat. *āctiō* ← *agere* («hacer, impulsar»). Pedido de campo: inspeccionar *ação*. Cubre **objeto**, **sentidos** (oficio · juicio · acciones bursátiles · cine de acción · física) y el corte con **[gesto](${gesto})**. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · ação](${WIKI}), [*āctiō*](${WIKI_LAT}). Ficha ≠ manual de productividad, ni de bolsa, ni de cine.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **ação** / **acção** (plural **ações**) |
| Étimo | Lat. *āctiō* ← *agere* (confianza alta) |
| Tipo lab | Oficio × [gesto](${gesto}) × otras salas (bolsa · juicio · cine) |
| Vínculos | [gesto](${gesto}) · [caminho](${caminho}) · [Meter marcha](${marcha}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Corte:** el [gesto](${gesto}) hace; la **ação** nombra el hacer. Las **ações** de bolsa, el juicio y el filme son **otras salas**.

## Estado

**Aprobada** — vía *agere* documentada; oficio distinto de bolsa, tribunal y género.

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildAcaoPost() {
  const { body, contentEn, contentEs, wiki } = buildAcaoBodies();
  let seriesOrder = 291;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-acao');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts
          .filter((p) => p.series === 'palavras-origem')
          .map((p) => p.seriesOrder)
          .filter((n) => typeof n === 'number')
      );
      const max = taken.size ? Math.max(...taken) : 290;
      seriesOrder = max + 1;
    }
  } catch (_) {
    /* keep 291 */
  }

  return makePalavra({
    title: 'Inspeção: Ação — o fazer nomeado, o gesto e as outras salas',
    titleEn: 'Inspection: Ação — named doing, the gesture, and the other rooms',
    titleEs: 'Inspección: Ação — el hacer nombrado, el gesto y las otras salas',
    excerpt:
      'Palavras: «ação» / acção — étimo lat. āctiō ← agere («fazer, impulsionar»); gesto ≠ ação ≠ ações da bolsa; Valeu !!!',
    excerptEn:
      'Words: “ação” / acção — etymon Lat. āctiō ← agere (“to do, to drive”); gesture ≠ action ≠ stock shares; Valeu !!!',
    excerptEs:
      'Palabras: «ação» / acção — étimo lat. āctiō ← agere («hacer, impulsar»); gesto ≠ acción ≠ acciones de bolsa; ¡Valeu !!!',
    slug: 'inspecao-palavra-acao',
    date: '2026-08-24T10:22:00.000Z',
    seriesOrder,
    seriesLabel: 'Ação · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAcaoPost,
  buildAcaoBodies
};
