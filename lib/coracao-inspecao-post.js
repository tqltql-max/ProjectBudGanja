'use strict';

/**
 * Inspeção Palavras · coração
 * Eixos: objeto · sentidos (órgão, afeto, centro, coragem) ·
 * relação com mãos (direita/esquerda) · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildCoracaoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const jesus = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/cora%C3%A7%C3%A3o';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Cora%C3%A7%C3%A3o';

  const body = `## Escopo

Inspeção editorial da palavra **coração** — órgão, afeto, centro e coragem. Esta ficha cobre o **objeto**, os **sentidos** em camadas, a **relação com as mãos** (direita × esquerda — complementaridade, não anatomia como dogma) e o fecho [Faça o melhor!](${mantra}). Elos: [mãos](${maos}), [esquerdo](${esquerdo}), [gesto](${gesto}), [verdade](${verdade}), [alegria](${alegria}), [raiva](${raiva}), [Vida](${vida}) / [Diário](${diario}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · coração](${wiki}), [Wikipédia · Coração](${wikiEl}), série [Palavras](${hub}). **Ficha ≠ cardiologia nem aconselhamento médico** — mapa lexical e de ofício. Metáfora cultural («mão no peito», «do coração») com **limites**. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **coração** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Latim *cor* / *corātionem* (campo de *cor*, «coração») → PT *coração* — confiança: alta |
| Família | *cordial* · *coragem* · *recordar* · *misericórdia* · *acordar* (etimos vizinhos / cruzados) · *do coração* · *de coração* |
| Cognatos | esp. *corazón* · fr. *cœur* · it. *cuore* · ing. *heart* (germânico; sentido paralelo) · lat. *cor* |
| Tipo BudGanja | Palavra — órgão × afeto × centro × coragem |
| Elo mãos | [mão esquerda × direita](${maos}) · [esquerdo](${esquerdo}) |
| Elo afecto | [alegria](${alegria}) · [raiva](${raiva}) · [gesto](${gesto}) |
| Elo ofício | [verdade](${verdade}) · [Faça o melhor!](${mantra}) · [língua portuguesa](${lingua}) |
| Elo projecto | [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · coração](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **órgão** e, por extensão viva, o **afeto**, o **centro** da pessoa e a **coragem**. No BudGanja: âncora de metáfora com **limites** — inspira o ofício; não substitui ficha clínica nem dogma corporal.

## 2. Sentidos — órgão · afeto · centro · coragem

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Órgão** | Músculo cardíaco; pulsação; vida biológica | Alta (uso comum; sem pretender medicina) |
| **Afeto** | Amor, carinho, «do coração»; cruza [alegria](${alegria}) e, no limite, [raiva](${raiva}) | Alta (uso vivo) |
| **Centro** | Miolo, núcleo («no coração da cidade / do projecto») | Alta |
| **Coragem** | Ânimo, ousar («ter coração» / *coragem* na família lexical) | Alta–média (campo etimológico e uso) |
| **Sede do sentir (cultura)** | Peito como lugar do afecto na [língua](${lingua}) e na oralidade | Alta (metáfora cultural) |
| **Ofício lab** | Centro do [gesto](${gesto}) afectivo — escrever, cuidar, ficar | Média–alta (mapa BudGanja) |

**H1:** *coração* herda o *cor* — órgão e, logo, **centro** da vida nomeada.  
**H2:** no peito figurado, cruza [alegria](${alegria}) (expansão) e [raiva](${raiva}) (fogo de limite) — afecto com ofício.  
**H3:** «coragem» e «coração» partilham raiz de **ânimo** — o laboratório liga ousadia a [Faça o melhor!](${mantra}), não a bravata vazia.

## 3. Relação com as mãos (direita × esquerda)

**coração** nomeia o **centro afectivo / órgão**; [mãos](${maos}) nomeiam as **ferramentas do gesto**. O elo clássico («mão no coração», «mão esquerda sobre o peito») é **gesto cultural**, não anatomia normativa.

| Ficha | Pergunta | Resposta BudGanja |
|-------|----------|-------------------|
| **[Mãos](${maos})** | Com *quê* trabalho? | Duas ferramentas — complementaridade |
| **[Esquerdo](${esquerdo})** | Em *qual* lado? | Lado nomeado — sem moral «sinistra» |
| **Esta (coração)** | De *onde* parte o afecto / o centro? | Vocábulo do peito — metáfora com limites |
| **Juntas** | Como o ofício fecha? | [Gesto](${gesto}) com [verdade](${verdade}) → [Faça o melhor!](${mantra}) |

| Relação | Leitura |
|---------|---------|
| **Mão × peito** | «Mão no coração» = [gesto](${gesto}) de sinceridade / respeito — cultura, não dogma |
| **Esquerda × peito** | Em muitos rituais e hábitos, a mão esquerda (ou a dominante) vai ao peito — **complementaridade de craft**, não «anatomia correta» |
| **Direita × coração** | A mão direita também cumprimenta, jura, escreve «de coração» — o par [mãos](${maos}) não rivaliza com o peito |
| **Anti-dogma** | Posição exacta do órgão no tórax ≠ regra moral de qual mão «deve» tocar o peito |
| **Ofício** | Mãos executam; coração (palavra) nomeia o **porquê** afectivo do acto |

> **Aviso:** não inventamos anatomia. O laboratório mapeia **léxico e gesto cultural**. Quem faz o sinal com a outra mão, ou não o faz, não perde ofício nem [verdade](${verdade}).

**Veredicto da relação:** ler [mãos](${maos}) e [esquerdo](${esquerdo}) para o **par e o lado**; ler **coração** para o **centro afectivo**. Complementaridade — não falso mapa corporal.

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear o órgão** | Corpo, pulso, vida | Vocábulo — sem clínica nesta ficha |
| **Afeto** | Amor, cariño, «de coração» | [Alegria](${alegria}) · cuidado na [Vida](${vida}) |
| **Centro** | Miolo do assunto / lugar | Centro do projecto e do [diário](${diario}) |
| **Coragem** | Ousar, enfrentar | [Faça o melhor!](${mantra}) com ânimo — não bravata |
| **Gesto** | Mão no peito, abraço | [Gesto](${gesto}) · [mãos](${maos}) |
| **Oralidade** | Exclamações do peito | [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) — afeto / assombro (elos, não sinónimos) |
| **Fechar** | Depois do sentir, o acto | [Verdade](${verdade}) + [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** nomear o **coração** para **sentir com ofício** — centro que aquece o [gesto](${gesto}); não desculpa para mentir nem para dogma corporal.

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com este peito**, hoje — sem fingir anatomia nem forçar pose |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sinto no coração, então dispenso a [verdade](${verdade})» = falso · afecto pede inspeção |
| Par afectivo | [Alegria](${alegria}) · [raiva](${raiva}) — expansão e limite, ambos no peito nomeado |
| Par mãos | [Mãos](${maos}) · [esquerdo](${esquerdo}) — complementaridade, não dogma |
| Oralidade | [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) — sopros do peito BR |

**Veredicto:** Faça o melhor **de coração** — com [gesto](${gesto}) e [verdade](${verdade}). Coração sem [caminho](${caminho}) = pose; coração com método = centro que fica.

## Hipóteses (síntese)

**H1:** objeto = *cor* → coração (órgão + metáfora).  
**H2:** sentidos = órgão · afeto · centro · coragem.  
**H3:** elos = [mãos](${maos}) · [esquerdo](${esquerdo}) · [gesto](${gesto}) · [alegria](${alegria}) · [raiva](${raiva}).  
**H4:** fecho = [Faça o melhor!](${mantra}) de coração, com limites.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mãos](${maos}) · [Esquerdo](${esquerdo}) | Par / lado — complementaridade com o peito |
| [Gesto](${gesto}) · [Verdade](${verdade}) | Acto e inspeção |
| [Alegria](${alegria}) · [Raiva](${raiva}) | Afectos no peito nomeado |
| [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) | Oralidade do peito |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é cardiologia, diagnóstico nem aconselhamento médico.  
- Metáfora cultural («mão no coração», lado do peito) ≠ dogma anatómico.  
- Afeto ≠ licença para dispensar [verdade](${verdade}) ou ferir.

## Status

**Aprovado** — **coração** fichado: objeto (*cor*), sentidos (órgão · afeto · centro · coragem), relação com [mãos](${maos}) / [esquerdo](${esquerdo}) e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Mãos](${maos}) · [▶ Esquerdo](${esquerdo}) · [▶ Gesto](${gesto}) · [▶ Alegria](${alegria}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **coração** (heart) — organ, affect, center and courage. Covers **object**, **senses**, **relation to hands** (left/right complementarity — not anatomy as dogma), and [Do your best!](${mantra}). Links: [mãos](${maos}), [esquerdo](${esquerdo}), [gesto](${gesto}), [alegria](${alegria}), [raiva](${raiva}), [Vida](${vida}).

> Method note: [Wiktionary · coração](${wiki}), [Wikipedia · Coração](${wikiEl}). Not cardiology or medical advice. Cultural metaphor with limits.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **coração** |
| Etymon | Latin *cor* / *corātionem* field → PT *coração* |
| Lab type | Organ × affect × center × courage |
| Links | [mãos](${maos}) · [esquerdo](${esquerdo}) · [gesture](${gesto}) · [truth](${verdade}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Organ** (pulse/life — no clinical claim) · **affect** ([alegria](${alegria}) / [raiva](${raiva})) · **center** (core of place/project) · **courage** (ânimo; family with *coragem*).

## 3. Hands

[Hands](${maos}) = tools; **coração** = affective center. “Hand on heart” = cultural [gesto](${gesto}), not anatomical dogma. Left/right complementarity — either hand may mark sincerity; craft over false body maps.

## 4. Purpose

Name the organ · feel with craft · center the project · dare with [Do your best!](${mantra}) · link oral peito: [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}).

## 5. Do your best!

Best possible **with this chest**, today — without posing anatomy or skipping [truth](${verdade}). Heart without [path](${caminho}) = pose; heart with method = center that stays.

## Status

**Approved** — object · senses · hands link · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Hands](${maos}) · [▶ Esquerdo](${esquerdo}) · [▶ Gesture](${gesto}) · [▶ Alegria](${alegria}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **coração** (corazón) — órgano, afecto, centro y coraje. Cubre **objeto**, **sentidos**, **relación con las manos** (izquierda/derecha — complementariedad, no anatomía como dogma) y [¡Haz lo mejor!](${mantra}). Vínculos: [mãos](${maos}), [esquerdo](${esquerdo}), [gesto](${gesto}), [alegria](${alegria}), [raiva](${raiva}), [Vida](${vida}).

> Nota: [Wikcionario · coração](${wiki}), [Wikipedia · Coração](${wikiEl}). No es cardiología. Metáfora cultural con límites.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **coração** |
| Étimo | Latín *cor* → PT *coração* |
| Tipo lab | Órgano × afecto × centro × coraje |
| Vínculos | [mãos](${maos}) · [esquerdo](${esquerdo}) · [gesto](${gesto}) · [verdad](${verdade}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Órgano** · **afecto** ([alegria](${alegria}) / [raiva](${raiva})) · **centro** · **coraje** (*coragem* en la familia).

## 3. Manos

[Manos](${maos}) = herramientas; **coração** = centro afectivo. «Mano en el corazón» = [gesto](${gesto}) cultural, no dogma anatómico. Complementariedad izquierda/derecha.

## 4. Para qué sirve

Nombrar · sentir con oficio · centrar el proyecto · osar con [¡Haz lo mejor!](${mantra}) · oralidad del pecho: [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}).

## 5. ¡Haz lo mejor!

Lo mejor posible **con este pecho**, hoy — sin fingir anatomía ni saltar la [verdad](${verdade}).

## Estado

**Aprobada** — objeto · sentidos · vínculo manos · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Manos](${maos}) · [▶ Esquerdo](${esquerdo}) · [▶ Gesto](${gesto}) · [▶ Alegria](${alegria}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCoracaoPost() {
  const { body, contentEn, contentEs, wiki } = buildCoracaoBodies();
  return makePalavra({
    title: 'Inspeção: Coração — órgão, afeto, centro, coragem e Faça o melhor!',
    titleEn: 'Inspection: Coração — organ, affect, center, courage and Do your best!',
    titleEs: 'Inspección: Coração — órgano, afecto, centro, coraje y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «coração» (lat. *cor*) — órgão, afeto, centro e coragem; elo mãos/esquerdo; Faça o melhor de coração.',
    excerptEn:
      'Words: “coração” (Lat. *cor*) — organ, affect, center and courage; hands/esquerdo link; Do your best from the heart.',
    excerptEs:
      'Palabras: «coração» (lat. *cor*) — órgano, afecto, centro y coraje; vínculo manos/esquerdo; Haz lo mejor de corazón.',
    slug: 'inspecao-palavra-coracao',
    date: '2026-08-03T18:30:00.000Z',
    seriesOrder: 35,
    seriesLabel: 'Coração · palavra',
    coverImage: '/imagens/inspecoes/coracao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCoracaoPost,
  buildCoracaoBodies
};
