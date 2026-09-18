'use strict';

/**
 * Inspeção Palavras · vida
 * Eixos: objeto (lat. vīta) · sentidos (biológica · biografia · modo · animação)
 * · distinção trilha /vida/ e Árvore da Vida · elos afecto · Faça o melhor!
 * ≠ conto/poemas (trilha) — esta é a ficha da palavra.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildVidaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const trilha = '/vida/';
  const diario = '/vida/diario/';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const arvore = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const conto = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const wiki = 'https://pt.wiktionary.org/wiki/vida';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Vida';
  const wikiLa = 'https://en.wiktionary.org/wiki/vita#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **vida** — substantivo do português para o **facto de viver**, o **tempo vivido**, o **modo de viver** e o que «tem vida» (anima, pulsa, fica). Esta ficha cobre o **objeto lexical**, os **sentidos** em camadas e o fecho [Faça o melhor!](${mantra}). Tom: **ofício**, sem sermão. Elos reais: [alegria](${alegria}), [coração](${coracao}), [esperança](${esperanca}), [tristeza](${tristeza}), [caminho](${caminho}), [passar](${passar}), trilha [Vida](${trilha}) / [Diário](${diario}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · vida](${wiki}), [Wikipédia · Vida](${wikiEl}), lat. [vīta](${wikiLa}), série [Palavras](${hub}). **Esta ficha ≠** a trilha [Vida](${trilha}) (contos, poemas, diário) **nem** a figura [Árvore da Vida](${arvore}) — são elos, não a mesma inspeção. **Ficha ≠ biologia clínica, teologia nem autoajuda.** Sem afiliação comercial ou religiosa.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **vida** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Latim *vīta* («vida; modo de viver») → PT *vida* — confiança: alta |
| Família | *viver* · *vital* · *vitalício* · *reviver* · *sobrevivência* · *biografia* (vizinha) · *dar vida* · *ter vida* |
| Cognatos | esp. *vida* · fr. *vie* · it. *vita* · ing. *life* (germânico; sentido paralelo) · lat. *vīta* |
| Tipo BudGanja | Palavra — facto · tempo · modo · animação |
| Elo afecto | [alegria](${alegria}) · [coração](${coracao}) · [esperança](${esperanca}) · [tristeza](${tristeza}) · [medo](${medo}) · [emoção](${emocao}) |
| Elo trajecto | [caminho](${caminho}) · [passar](${passar}) · [gesto](${gesto}) |
| Elo trilha (≠ esta ficha) | [Vida](${trilha}) · [Diário](${diario}) · [conto laboratório](${conto}) |
| Elo figura | [Árvore da Vida](${arvore}) · [Lágrimas da Vida](${lagrimas}) (arte) |
| Elo ofício | [verdade](${verdade}) · [Faça o melhor!](${mantra}) · [língua portuguesa](${lingua}) |
| Elo projecto | [hub](${hubAll}) · [Guia](${guia}) |
| Fonte | [Wikcionário · vida](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia **viver** — não um manual de sentido da existência. No BudGanja: mapa lexical com limites; a trilha [Vida](${trilha}) é o *lugar* do projecto onde contos e poemas moram; esta ficha é a *palavra* que os nomeia.

## 2. Sentidos — facto · tempo · modo · animação

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Facto biológico** | Estar vivo; organismo que respira / pulsa | Alta (uso comum; sem pretender biologia clínica) |
| **Tempo / biografia** | «A vida de…»; o arco entre nascer e o fim que a língua nomeia | Alta |
| **Modo de viver** | Como se vive — hábitos, ofício, convívio | Alta (uso vivo) |
| **Animação / vigor** | «Ter vida», «dar vida», «página com vida» | Alta |
| **Espaço projecto** | Trilha [Vida](${trilha}) — nome de secção, não sinónimo lexical fechado | Alta (mapa BudGanja) |
| **Ofício lab** | O que fica, cresce e pede [gesto](${gesto}) — sem pose existencial | Média–alta |

**H1:** *vida* herda *vīta* — facto de viver e, logo, **modo** e **tempo**.  
**H2:** afecto dá cor à vida nomeada: [alegria](${alegria}) expande, [tristeza](${tristeza}) abranda, [coração](${coracao}) centra, [esperança](${esperanca}) aponta adiante — sem fundir as fichas.  
**H3:** [caminho](${caminho}) e [passar](${passar}) são o *como* do tempo vivido; *vida* é o nome do arco, não o sermão do arco.

## 3. Esta ficha ≠ trilha ≠ Árvore

| Recurso | O que é | O que não é |
|---------|---------|-------------|
| **Esta (palavra *vida*)** | Léxico: *vīta* → sentidos e rede | Contos, poemas, diário |
| **[Trilha Vida](${trilha})** | Secção do site: poemas, personagens, [Diário](${diario}) | Definição de dicionário |
| **[Árvore da Vida](${arvore})** | Figura / locução (semente → mudinha → árvore) | Sinónimo de *vida* |
| **[Conto laboratório](${conto})** | Narrativa da sementinha | Ficha lexical |
| **[Lágrimas da Vida](${lagrimas})** | Poema (Artes) | Definição da palavra |

> **Aviso:** não fundir. Quem lê a trilha [Vida](${trilha}) lê *lugar*; quem lê esta ficha lê *vocábulo*. A [Árvore da Vida](${arvore}) é figura sénior — elo, não substituto.

**Veredicto da distinção:** três portas, três ofícios — palavra · trilha · figura.

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear o facto** | «Há vida aqui» | Vocábulo — sem clínica nesta ficha |
| **Biografia / tempo** | História de alguém | Arco com [passar](${passar}) e [caminho](${caminho}) |
| **Modo** | Estilo de vida | Ofício: [gesto](${gesto}) + [verdade](${verdade}) |
| **Animação** | Texto / projecto «com vida» | Página e planta que ficam — [Diário](${diario}) |
| **Afecto** | Vida alegre / pesada | [Alegria](${alegria}) · [tristeza](${tristeza}) · [coração](${coracao}) · [esperança](${esperanca}) |
| **Fechar** | Depois de nomear, o acto | [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** nomear **vida** para **inspecionar o vocábulo** — sem roubar a trilha nem pregar sentido único.

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **nesta vida nomeada**, hoje — sem pose de guru |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Vida é…» fechado em sermão = falso · a ficha mapeia camadas, não dogma |
| Par afectivo | [Alegria](${alegria}) · [coração](${coracao}) · [esperança](${esperanca}) · [tristeza](${tristeza}) |
| Par trajecto | [Caminho](${caminho}) · [passar](${passar}) |
| Distinção | Trilha [Vida](${trilha}) · [Árvore da Vida](${arvore}) — elos, não fusão |

**Veredicto:** Faça o melhor **com vida** — [gesto](${gesto}) e [verdade](${verdade}). Vida sem [caminho](${caminho}) = cartaz; vida com método = arco que se pode inspecionar.

## Hipóteses (síntese)

**H1:** objeto = *vīta* → vida (facto + modo + tempo).  
**H2:** sentidos = biológico · biografia · modo · animação.  
**H3:** elos = [alegria](${alegria}) · [coração](${coracao}) · [esperança](${esperanca}) · [caminho](${caminho}) · [passar](${passar}).  
**H4:** fecho = [Faça o melhor!](${mantra}); trilha e árvore ficam à parte.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Alegria](${alegria}) · [Coração](${coracao}) · [Esperança](${esperanca}) | Afecto que colore a palavra |
| [Tristeza](${tristeza}) · [Medo](${medo}) · [Emoção](${emocao}) | Sala afectiva — sem romantizar |
| [Caminho](${caminho}) · [Passar](${passar}) · [Gesto](${gesto}) | Trajecto e acto |
| [Trilha Vida](${trilha}) · [Diário](${diario}) · [Conto](${conto}) | Lugar do projecto (≠ ficha) |
| [Árvore da Vida](${arvore}) · [Lágrimas da Vida](${lagrimas}) | Figura / arte — elos |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [Verdade](${verdade}) | Solo lexical |
| [Faça o melhor!](${mantra}) | Finalidade viva |
| [Fim da linha](${fimLinha}) · [cinta / fita](${cinta}) | O arco tem limite — fita que envolve, núcleo que fica |

## Limites

- Não é biologia clínica, teologia, nem protocolo de sentido da existência.  
- Trilha [Vida](${trilha}) e [Árvore da Vida](${arvore}) ≠ esta ficha.  
- Afecto na rede ≠ licença para dispensar [verdade](${verdade}) ou inventar slugs.

## Status

**Aprovado** — **vida** fichada: objeto (*vīta*), sentidos (facto · tempo · modo · animação), distinção trilha/figura e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Alegria](${alegria}) · [▶ Coração](${coracao}) · [▶ Esperança](${esperanca}) · [▶ Caminho](${caminho}) · [▶ Faça o melhor!](${mantra}) · [▶ Trilha Vida](${trilha})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **vida** (life) — the fact of living, lifetime, way of living, and what “has life.” Covers **object**, **senses**, distinction from the [Vida](${trilha}) trail and [Árvore da Vida](${arvore}), and [Do your best!](${mantra}). Links: [alegria](${alegria}), [coração](${coracao}), [esperança](${esperanca}), [caminho](${caminho}), [passar](${passar}).

> Method note: [Wiktionary · vida](${wiki}), [Wikipedia · Vida](${wikiEl}), Lat. [vīta](${wikiLa}). **Not** the Vida trail (stories/poems) and **not** Tree of Life — separate sheets. Not clinical biology, theology, or self-help.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **vida** |
| Etymon | Latin *vīta* → PT *vida* |
| Lab type | Fact × time × mode × animation |
| Links | [alegria](${alegria}) · [coração](${coracao}) · [esperança](${esperanca}) · [caminho](${caminho}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Biological fact** (no clinical claim) · **lifetime / biography** · **way of living** · **animation / vigor** (“has life”) · project [Vida](${trilha}) trail as place-name, not synonym.

## 3. Distinctions

This sheet = **word**. [Vida trail](${trilha}) = site section. [Árvore da Vida](${arvore}) = figure. [Conto](${conto}) / [Lágrimas da Vida](${lagrimas}) = narrative/art elos — not definitions.

## 4. Purpose

Name the fact · map time with [passar](${passar}) · mode with craft · color with [alegria](${alegria}) / [coração](${coracao}) / [esperança](${esperanca}) · close with [Do your best!](${mantra}).

## 5. Do your best!

Best possible **in this named life**, today — no guru pose. Life without [path](${caminho}) = poster; life with method = arc you can inspect.

## Status

**Approved** — object · senses · trail/figure distinction · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Alegria](${alegria}) · [▶ Coração](${coracao}) · [▶ Esperança](${esperanca}) · [▶ Do your best!](${mantra}) · [▶ Vida trail](${trilha})
`;

  const contentEs = `## Alcance

Inspección de **vida** — el hecho de vivir, el tiempo vivido, el modo de vivir y lo que «tiene vida». Cubre **objeto**, **sentidos**, distinción frente a la trama [Vida](${trilha}) y [Árvore da Vida](${arvore}), y [¡Haz lo mejor!](${mantra}). Vínculos: [alegria](${alegria}), [coração](${coracao}), [esperança](${esperanca}), [caminho](${caminho}), [passar](${passar}).

> Nota: [Wikcionario · vida](${wiki}), [Wikipedia · Vida](${wikiEl}), lat. [vīta](${wikiLa}). **No** es la trama Vida ni el Árbol de la Vida. No es biología clínica ni autoayuda.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **vida** |
| Étimo | Latín *vīta* → PT *vida* |
| Tipo lab | Hecho × tiempo × modo × animación |
| Vínculos | [alegria](${alegria}) · [coração](${coracao}) · [esperança](${esperanca}) · [caminho](${caminho}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Hecho biológico** · **biografía / tiempo** · **modo de vivir** · **animación** · trama [Vida](${trilha}) como lugar del proyecto, no sinónimo cerrado.

## 3. Distinciones

Esta ficha = **palabra**. [Trama Vida](${trilha}) = sección. [Árvore da Vida](${arvore}) = figura. [Cuento](${conto}) / [Lágrimas da Vida](${lagrimas}) = elos — no definiciones.

## 4. Para qué sirve

Nombrar · mapear el tiempo con [passar](${passar}) · modo con oficio · color con [alegria](${alegria}) / [coração](${coracao}) / [esperança](${esperanca}) · cerrar con [¡Haz lo mejor!](${mantra}).

## 5. ¡Haz lo mejor!

Lo mejor posible **en esta vida nombrada**, hoy — sin pose de gurú.

## Estado

**Aprobada** — objeto · sentidos · distinción trama/figura · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Alegria](${alegria}) · [▶ Coração](${coracao}) · [▶ Esperança](${esperanca}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Trama Vida](${trilha})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildVidaPost() {
  const { body, contentEn, contentEs, wiki } = buildVidaBodies();
  return makePalavra({
    title: 'Inspeção: Vida — facto, tempo, modo e Faça o melhor!',
    titleEn: 'Inspection: Vida — fact, time, mode and Do your best!',
    titleEs: 'Inspección: Vida — hecho, tiempo, modo y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «vida» (lat. *vīta*) — facto de viver, tempo e modo; distinta da trilha /vida/ e da Árvore da Vida; elos alegria/coração/esperança; Faça o melhor!',
    excerptEn:
      'Words: “vida” (Lat. *vīta*) — fact of living, time and mode; distinct from the Vida trail and Tree of Life; alegria/coração/esperança links; Do your best!',
    excerptEs:
      'Palabras: «vida» (lat. *vīta*) — hecho de vivir, tiempo y modo; distinta de la trama /vida/ y del Árbol de la Vida; vínculos alegria/coração/esperança; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-vida',
    date: '2026-08-03T21:45:00.000Z',
    seriesOrder: 70,
    seriesLabel: 'Vida · palavra',
    coverImage: '/imagens/inspecoes/vida-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVidaPost,
  buildVidaBodies
};
